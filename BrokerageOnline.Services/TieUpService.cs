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
    public class TieUpService : ITieUpService
    {
        TieUpBL bl = new TieUpBL();
        public List<RackRateSearchResult> SearchTieUp(string Channel, string DistributorCategory, string ARNNo, string Status, string MasterQueueStatus, string ARNName, string SchemeCategory, string scheme, string SearchFilter, string DateFrom, string DateTo, string MemoLevel)
        {
            try
            {
                return bl.SearchTieUp(Channel, DistributorCategory, ARNNo, Status, MasterQueueStatus, ARNName, SchemeCategory, scheme, SearchFilter, DateFrom, DateTo, MemoLevel);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
