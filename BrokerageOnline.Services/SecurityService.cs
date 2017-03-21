using BrokerageOnline.TransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BrokerageOnline.BusinessLogic;
using System.ServiceModel.Activation;

namespace BrokerageOnline.Services
{
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class SecurityService : ISecurityService
    {
        //Authenticate User
        public bool AuthenticateUser(Credentials credential, out string error, out string ReturnURL)
        {
            Exception exError;
            LoginBL Bl = new LoginBL();
            bool val = Bl.AuthenticateByADS(credential, out exError, out ReturnURL);
            error = exError == null ? "" : exError.Message;
            return val;
        }

        //Forget password
        public bool ForgetPassword(string username, string email, out string error)
        {
            Exception exError;
            LoginBL Bl = new LoginBL();
            bool val = Bl.ForgetPassword(username, email, out exError);
            error = exError == null ? "" : exError.Message;
            return val;
        }

        //Reset Password
        public bool ResetPassword(Credentials credential, out string error)
        {
            Exception exError;
            LoginBL Bl = new LoginBL();
            bool val = Bl.ResetPassword(credential, out exError);
            error = exError == null ? "" : exError.Message;
            return val;
        }

 		//User Logs
        public string InsertUpdateEmployeeLogs(EmployeeLogs EmployeeLogsBO, out string error)
        {
            Exception exError;
            LoginBL Bl = new LoginBL();
            string val = Bl.InsertUpdateEmployeeLogs(EmployeeLogsBO, out exError);
            error = exError == null ? "" : exError.Message;
            return val;
        }

        public string GetUserID(string UserName)
        {
            Credentials cred = new Credentials();
            cred.UserName = UserName;
            LoginBL Bl = new LoginBL();
            return Bl.GetUser(cred);
        }

        public List<UserDetail> GetChatUsers()
        {

            MasterBL Bl = new MasterBL();
            return Bl.GetChatUsers();
        }

        public List<ChatHistory> GetOfflineChats(int SentTo)
        {

            MasterBL Bl = new MasterBL();
            return Bl.GetOfflineChats(SentTo);
        }

        public bool SaveChat(ChatHistory chatHistory)
        {

            MasterBL Bl = new MasterBL();
            return Bl.SaveChat(chatHistory);
        }
    }
}
