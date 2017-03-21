using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Threading.Tasks;
using BrokerageOnline.TransferObjects;


namespace BrokerageOnline.Services
{
    [ServiceContract]
    public interface IAuthorizationService
    {
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GetUserMenuPermission")]
        [OperationContract]
        List<UserRoleRights> GetUserMenuPermission(string UserID, int MainMenuID, string _commandText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/InsertUpdateEmployeeLogs")]
        [OperationContract]
        void InsertUpdateEmployeeLogs(int LoginUserID,int EmployeeLogID, int StatusID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GetUserModuleMenu")]
        [OperationContract]
        List<UserRoleRights> GetUserModuleMenu(string UserID, int MainMenuID, string _commandText);
    }
}
