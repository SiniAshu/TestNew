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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IMasterService" in both code and config file together.
    [ServiceContract]
    interface IOverviewService
    {
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
         UriTemplate = "/UpdateNotificationStatus")]
        [OperationContract]
        bool UpdateNotificationStatus(Notification InputData);
    }
}
