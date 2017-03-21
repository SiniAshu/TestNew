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
    public interface ITieUpService
    {
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/SearchTieUp")]
        [OperationContract]
        List<RackRateSearchResult> SearchTieUp(string Channel, string DistributorCategory, string ARNNo, string Status, string MasterQueueStatus, string ARNName, string SchemeCategory, string scheme, string SearchFilter, string DateFrom, string DateTo, string MemoLevel);

    }
}
