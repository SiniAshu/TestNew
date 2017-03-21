using BrokerageOnline.BusinessLogic;
using BrokerageOnline.TransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.Services
{
    [ServiceContract]
    public interface ISecurityService
    {
        [OperationContract]
        bool AuthenticateUser(Credentials credential, out string error, out string ReturnURL);

        [OperationContract]
        bool ForgetPassword(string username, string email, out string error);

        [OperationContract]
        bool ResetPassword(Credentials credential, out string error);

        [OperationContract]
        string GetUserID(string UserName);

        [OperationContract]
        List<UserDetail> GetChatUsers();

        [OperationContract]
        List<ChatHistory> GetOfflineChats(int SentTo);

        [OperationContract]
        bool SaveChat(ChatHistory chatHistory);

		[OperationContract]
        string InsertUpdateEmployeeLogs(EmployeeLogs EmployeeLogsBO, out string error);
    }


}
