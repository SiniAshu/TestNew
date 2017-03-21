using BrokerageOnline.BusinessLogic;
using BrokerageOnline.TransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Activation;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace BrokerageOnline.Services
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "MasterService" in both code and config file together.
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class OverviewService : IOverviewService
    {
        public bool UpdateNotificationStatus(Notification InputData)
        {
            try
            {
                OverviewBL bl = new OverviewBL();
                return bl.UpdateNotificationStatus(InputData);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
