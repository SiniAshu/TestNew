using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Threading.Tasks;
using BrokerageOnline.TransferObjects;

namespace BrokerageOnline.Common.SessionManagement
{
    [ServiceContract]
    public interface ISessionManager
    {
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/CreateSession")]
        [OperationContract]
        string CreateSession();

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GetSessionValue")]
        [OperationContract]
        string GetSessionValue(string sessionId, string key);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GetSession")]
        [OperationContract]
        string GetSession(string sessionId, List<string> keys);

        [WebInvoke(Method = "POST",
        RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/SetSessionValue")]
        [OperationContract]
        void SetSessionValue(string sessionId, string key, dynamic value);
        
        [WebInvoke(Method = "POST",
        RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/SetSession")]
        [OperationContract]
        void SetSession(string sessionId, List<SessionObject> sessionObjects);

        [WebInvoke(Method = "POST",
       RequestFormat = WebMessageFormat.Json,
       ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
       UriTemplate = "/RemoveSession")]
        [OperationContract]
        void RemoveSession(string sessionId);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
            UriTemplate = "/IsValidSession")]
        [OperationContract]
        bool IsValidSession(string sessionId);
    }
}
