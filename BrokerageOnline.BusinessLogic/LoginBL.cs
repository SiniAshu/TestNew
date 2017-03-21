using BrokerageOnline.DataAccess;
using BrokerageOnline.TransferObjects;
using BrokerageOnline.Common.Utility;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.DirectoryServices;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web.Security;
using System.Web;

namespace BrokerageOnline.BusinessLogic
{
    public class LoginBL
    {
        /// <summary>
        /// Authenticate User By Active Directory
        /// </summary>
        /// <param name="detail"></param>
        /// <returns>Success/Failure Flag</returns>
        public bool AuthenticateByADS(Credentials credential, out Exception exError, out string ReturnURL)
        {
            ReturnURL = "";
            exError = null;
            string new_path;
            try
            {
                if (Convert.ToBoolean(ConfigurationManager.AppSettings["enableads"].ToString()))
                {
                    string path = ConfigurationManager.AppSettings["LDAPPath"].ToString();
                    DirectoryEntry entry;
                    if (credential.Password == "")
                        entry = new DirectoryEntry(path);
                    else
                        entry = new DirectoryEntry(path, credential.UserName, credential.Password);
                    DirectorySearcher search = new DirectorySearcher(entry);
                    search.Filter = "(SAMAccountName=" + credential.UserName + ")";
                    search.PropertiesToLoad.Add("cn");
                    SearchResult result = search.FindOne();
                    if (null == result)
                    {
                        throw new Exception("Invalid User");
                    }
                    new_path = result.Path;
                }
                else
                {
                    AuthenticateByDB(credential, out exError, out ReturnURL);
                }
                return true;
            }
            catch (Exception ex)
            {
                exError = ex;
                return false;
            }
        }

        /// <summary>
        /// Authenticate User By DB
        /// </summary>
        /// <param name="detail"></param>
        /// <returns>Success/Failure Flag</returns>
        public bool AuthenticateByDB(Credentials credential, out Exception exError, out string ReturnURL)
        {
            ReturnURL = "";
            exError = null;
            Users detail = new Users();
            LoginDAL dal = new LoginDAL();
            credential.Password = FormsAuthentication.HashPasswordForStoringInConfigFile(credential.Password, "SHA1");
            detail = dal.ValidateUser(credential, out exError);
            if (exError != null)
            {
                if (exError.Message.Contains("Account Locked"))
                {
                    dal = new LoginDAL();
                    Exception Error = null;
                    Users UserDetail = new Users();
                    UserDetail = dal.GetUser(credential, out Error);
                    if (UserDetail.LoginDisabled == true && UserDetail.ChangePassword == true)
                        ReturnURL = ReturnResetpasswordURL(credential.UserName, UserDetail.Password);
                }
            }
            return true;
        }

        public string GetUser(Credentials credential)
        {
            try
            {
                Exception Error = null;
                LoginDAL dal = new LoginDAL();
                Users UserDetail = new Users();
                UserDetail = dal.GetUser(credential, out Error);
                HttpContext.Current.Session["userid"] = Convert.ToString(UserDetail.UserId);
                return UserDetail.UserId.ToString();
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        /// <summary>
        /// Forget password
        /// </summary>
        /// <param name="detail"></param>
        /// <returns>Success/Failure Flag</returns>
        public bool ForgetPassword(string username, string email, out Exception exError)
        {
            try
            {
                exError = null;
                LoginDAL dal = new LoginDAL();
                string resetpassword = CreatePassword(5);
                bool ret = dal.ForgetPassword(username, email, FormsAuthentication.HashPasswordForStoringInConfigFile(resetpassword, "SHA1"), out exError);
                if (exError == null && ret == true)
                {
                    Utility util = new Utility();
                    Email emaildetail = new Email();
                    emaildetail.Emailto = email;
                    emaildetail.EmailCC = "";
                    emaildetail.attach = "";
                    emaildetail.Emailfrom = "brokerageonline3@gmail.com";
                    emaildetail.Subject = "Your Brokerage Online Password";
                    emaildetail.Body = "<html><body>This message was created by Brokerage Online Administration. <br/><br/>";
                    emaildetail.Body += "*** PLEASE DO NOT REPLY THIS MESSAGE ***<br/><br/>";
                    emaildetail.Body += "<table><tr><td>UserName : </td><td> " + username + " </td></tr>";
                    emaildetail.Body += "<tr><td>Password : </td><td>" + resetpassword + "</td></tr></table><br/>";
                    emaildetail.Body += "You can click the following link to reset password <br/>";
                    emaildetail.Body += ReturnResetpasswordURL(username, resetpassword);
                    emaildetail.Body += "<br/><br/>Sincerely <br/> Brokerage Online Admin</body></html>";
                    util.SendEmail(emaildetail);
                    return ret;
                }
                else
                {
                    return ret;
                }
            }
            catch (Exception)
            {          
                throw;
            }           
        }

        /// <summary>
        /// Reset Password
        /// </summary>
        /// <param name="detail"></param>
        /// <returns>Success/Failure Flag</returns>
        public bool ResetPassword(Credentials credential, out Exception exError)
        {
            try
            {
                LoginDAL dal = new LoginDAL();
                return dal.ResetPassword(credential, out exError);
            }
            catch (Exception)
            {               
                throw;
            }   
        }


        #region INTERNAL METHODS
        /// <summary>
        /// Create Reset Password
        /// </summary>
        /// <param name="length"></param>
        /// <returns></returns>
        public string CreatePassword(int length)
        {
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder res = new StringBuilder();
            Random rnd = new Random();
            while (0 < length--)
            {
                res.Append(valid[rnd.Next(valid.Length)]);
            }
            return res.ToString();
        }

        /// <summary>
        /// Return Reset Password URL
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public string ReturnResetpasswordURL(string username, string reset)
        {
            return ConfigurationManager.AppSettings["ResetPasswordURL"].ToString() + "?value=" + encrypt(username + "," + reset);
        }

        /// <summary>
        /// Encrype username and password for reset password
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public string encrypt(string Text)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] clearBytes = Encoding.Unicode.GetBytes(Text);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    Text = Convert.ToBase64String(ms.ToArray());
                }
            }
            return Text;
        }
        #endregion

        public List<UserRoleRights> GetUserMenuPermission(string UserID, int MainMenuID,string _commandText)
        {
            try
            {
                LoginDAL dal = new LoginDAL();
                return dal.GetUserMenuPermission(UserID,MainMenuID, Constants.SpGetUserMenuRights);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<UserRoleRights> GetUserModuleMenu(string UserID, int MainMenuID, string _commandText)
        {
            try
            {
                LoginDAL dal = new LoginDAL();
                return dal.GetUserModuleMenu(HttpContext.Current.Session["userid"].ToString(), MainMenuID, Constants.SpGetUserModuleMenu);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public string InsertUpdateEmployeeLogs(EmployeeLogs EmployeeLogsBO, out Exception error)
        {
            try
            {
                LoginDAL dal = new LoginDAL();
                if (EmployeeLogsBO.EmployeeID == 0)
                    EmployeeLogsBO.EmployeeID = Convert.ToInt32(HttpContext.Current.Session["userid"]);
                return dal.InsertUpdateEmployeeLogs(EmployeeLogsBO, Constants.SpUserLogs, out error);               
            }
            catch (Exception)
            {
                throw;
            }
        } 
    }
}
