using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BrokerageOnline.Presentation.SecurityServiceRef;
using BrokerageOnline.Presentation.SessionServiceRef;
using System.ServiceModel;
using System.Web.Security;
using BrokerageOnline.Presentation.BindingUtilities;
using BrokerageOnline.TransferObjects;

namespace BrokerageOnline.Presentation
{
    public partial class Login : System.Web.UI.Page
    {
        SessionManagerClient SessionClient = new SessionManagerClient();
        SecurityServiceClient SecurityClient = new SecurityServiceClient();
        EmployeeLogs EmployeeLogsBO = new EmployeeLogs();
        string ErrorMessage = "";

        protected void Page_Load(object sender, EventArgs e)
        {

            try
            {

                FailureText.Text = "";
                if (!IsPostBack)
                {
                    string ReturnURL;
                    if (Request.QueryString["mode"] == null)
                    {


                        string strCurrentUser = Request.LogonUserIdentity.Name.Substring(Request.LogonUserIdentity.Name.LastIndexOf(@"\") + 1);
                        //string strCurrentUser =Page.Identity.Name;// Membership.GetUser().UserName;  //System.Environment.UserName;//System.Security.Principal.WindowsIdentity.GetCurrent().Name;//.Substring(System.Security.Principal.WindowsIdentity.GetCurrent().Name.LastIndexOf(@"\") + 1);
                        //string ped = Membership.GetUser().GetPassword();
                        if (strCurrentUser != "IUSR")
                        {
                            Credentials credential = new Credentials();
                            credential.UserName = strCurrentUser;
                            credential.Password = "";
                            UserName.Text = strCurrentUser;
                            string error;
                            if (LoginUtilities.AuthenticateUser(credential, out error, out ReturnURL))
                            {
                                if (Convert.ToString(error) == "")
                                {
                                    if (ReturnURL == "")
                                    {
                                        string UserID = LoginUtilities.GetUserID(UserName.Text);
                                        if (UserID != "0")
                                        {
                                            string tokenresult = SessionClient.CreateSession().ToString();
                                            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "setsession", "setsession('" + tokenresult + "','" + UserName.Text + "','" + UserID + "');", true);
                                            //Response.Redirect("Pages/Overview.html?tokenkey=" + tokenresult + "&user=" + UserName.Text, false);
                                            Context.ApplicationInstance.CompleteRequest();

                                            EmployeeLogsBO.StatusID = 2; // Logged IN
                                            EmployeeLogsBO.LoggedInTime = DateTime.Now;
                                            EmployeeLogsBO.LoggedOutTime = null;
                                            EmployeeLogsBO.LastAccessedTime = null;
                                            InsertOrUpdateEmployeeLogs();
                                        }
                                        else
                                        {
                                            FailureText.Text = "Invalid User";
                                        }
                                    }
                                    else
                                    {
                                        Response.Redirect(ReturnURL);
                                    }
                                }
                                else
                                {
                                    if (ReturnURL == "")
                                    {
                                        ErrorMessage = SetErrorMsg(error);
                                        EmployeeLogsBO.StatusID = 5; // Login Failed (Authentication)
                                        EmployeeLogsBO.MessageLog = FailureText.Text;
                                        InsertOrUpdateEmployeeLogs();

                                        ErrorMessage = SetErrorMsg(error);
                                        FailureText.Text = ErrorMessage;
                                    }
                                    else
                                    {
                                        ErrorMessage = SetErrorMsg(error);
                                        EmployeeLogsBO.MessageLog = ErrorMessage;
                                        EmployeeLogsBO.StatusID = 5; // Login Failed (Authentication)
                                        InsertOrUpdateEmployeeLogs();
                                        Response.Redirect(ReturnURL);
                                    }
                                }
                            }
                            else
                            {
                                FailureText.Text = error;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                SetErrorMsg(ex.Message);
                EmployeeLogsBO.StatusID = 4; // Logged Out By System
                EmployeeLogsBO.MessageLog = ex.Message;
                InsertOrUpdateEmployeeLogs();
                throw;
            }
            UserName.Focus();
        }

        private void InsertOrUpdateEmployeeLogs()
        {
            string error;
            EmployeeLogsBO.UserLogin = UserName.Text;
            string UserID = LoginUtilities.GetUserID(UserName.Text);
            EmployeeLogsBO.EmployeeID = Convert.ToInt32(UserID);
            string a = SecurityClient.InsertUpdateEmployeeLogs(EmployeeLogsBO, out error);
        }


        /// <summary>
        /// Method on login button Click Call to service, Bl and based on EnableADS Flag login occurs
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void btn_login_Click(object sender, EventArgs e)
        {
            FailureText.Text = "";
            try
            {
                if (this.IsValid)
                {
                    string error;
                    string ReturnURL;
                    Credentials credential = new Credentials();
                    credential.UserName = UserName.Text;
                    credential.Password = Password.Text;//FormsAuthentication.HashPasswordForStoringInConfigFile(Password.Text, "SHA1");//LoginUtilities.PasswordHash(UserName.Text + Password.Text);
                    if (LoginUtilities.AuthenticateUser(credential, out error, out ReturnURL))
                    {
                        if (Convert.ToString(error) == "")
                        {
                            if (ReturnURL == "")
                            {
                                string UserID = LoginUtilities.GetUserID(UserName.Text);
                                if (UserID != "0")
                                {
                                    string tokenresult = SessionClient.CreateSession().ToString();
                                    ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "setsession", "setsession('" + tokenresult + "','" + UserName.Text + "','" + UserID + "');", true);
                                    Context.ApplicationInstance.CompleteRequest();

                                    EmployeeLogsBO.StatusID = 2; // Logged IN
                                    EmployeeLogsBO.LoggedInTime = DateTime.Now;
                                    EmployeeLogsBO.LoggedOutTime = null;
                                    EmployeeLogsBO.LastAccessedTime = null;
                                    InsertOrUpdateEmployeeLogs();
                                }
                                else
                                {
                                    FailureText.Text = "Invalid User";
                                }
                            }
                            else
                            {
                                Response.Redirect(ReturnURL);
                            }
                        }
                        else
                        {
                            if (ReturnURL == "")
                            {
                                ErrorMessage = SetErrorMsg(error);
                                //ErrorMessage = error;
                                EmployeeLogsBO.StatusID = 5; // Login Failed (Authentication)
                                EmployeeLogsBO.MessageLog = FailureText.Text;
                                InsertOrUpdateEmployeeLogs();
                            }
                            else
                            {
                                ErrorMessage = SetErrorMsg(error);
                                EmployeeLogsBO.MessageLog = ErrorMessage;
                                EmployeeLogsBO.StatusID = 5; // Login Failed (Authentication)
                                InsertOrUpdateEmployeeLogs();
                                Response.Redirect(ReturnURL);
                            }
                        }
                    }
                    else
                    {
                        FailureText.Text = error;
                    }
                }
            }
            catch (Exception ex)
            {
                SetErrorMsg(ex.Message);
                EmployeeLogsBO.StatusID = 4; // Logged Out By System
                EmployeeLogsBO.MessageLog = ex.Message;
                InsertOrUpdateEmployeeLogs();
                throw;
            }
        }


        public string SetErrorMsg(string ErrorMessage)
        {
            string[] Errors = ErrorMessage.Split(':');

            string Main_Error = "";

            if (Errors.Count() > 1)
            {
                FailureText.Text = Errors[0] +'.'+ Errors[1];
                Main_Error = Errors[0];

                //ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "showErrorToast", "showErrorToast('" + Errors[1] + "');", true);
            }
            else
            {
                Main_Error = ErrorMessage;
                FailureText.Text = ErrorMessage;
            }

            return ErrorMessage;
        }
    }
}