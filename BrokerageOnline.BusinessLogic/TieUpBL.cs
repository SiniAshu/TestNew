using BrokerageOnline.DataAccess;
using BrokerageOnline.TransferObjects;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BrokerageOnline.Common;
using BrokerageOnline.Common.SessionManagement;
using System.Web;
using System.Globalization;

namespace BrokerageOnline.BusinessLogic
{
    public class TieUpBL
    {
        string UserSessionId = SessionObject.sessionValue;


        public List<RackRateSearchResult> SearchTieUp(string Channel, string DistributorCategory, string ARNNo, string Status, string MasterQueueStatus, string ARNName, string SchemeCategory, string scheme, string SearchFilter, string DateFrom, string DateTo, string MemoLevel)
        {
            List<RackRateSearchResult> result = new List<RackRateSearchResult>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    TieUpDAL dal = new TieUpDAL();
                    result = dal.SearchTieUp(Channel, DistributorCategory, ARNNo, Status, MasterQueueStatus, ARNName, SchemeCategory, scheme, Convert.ToInt32(HttpContext.Current.Session["userid"]), SearchFilter,DateFrom,DateTo, Constants.SpSearchTieUp,MemoLevel, out error);
                    if (error == null)
                        return result;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return result;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
