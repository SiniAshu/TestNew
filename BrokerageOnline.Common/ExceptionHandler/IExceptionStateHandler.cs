using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Threading.Tasks;
using System.Diagnostics;

namespace BrokerageOnline.Common.ExceptionHandler
{
    [ServiceContract]
    public interface IExceptionStateHandler
    {
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, UriTemplate = "/LogException")]
        [OperationContract]
        void LogException(Exception actualException, int eventId, int priority);

        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, UriTemplate = "/LogState")]
        [OperationContract]
        void LogState(string message, TraceEventType traceEventType, int eventId, int priority);
    }
}
