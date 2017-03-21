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
using BrokerageOnline.Workflow;
using System.Activities;
using System.Threading;
using System.Net;
using System.IO;
using BrokerageOnline.Common.Utility;

namespace BrokerageOnline.BusinessLogic
{
    public class OverviewBL
    {
        #region Common Declaration

        string UserSessionId = SessionObject.sessionValue;
        OverviewDAL dal = new OverviewDAL();

        #endregion

        #region Get Methods

        public Int64 GetCurrrentUserId()
        {
            Int64 CurrrentUserId = 0;
            try
            {
                CurrrentUserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
            }
            catch (Exception)
            {
                CurrrentUserId = 0;
            }

            return CurrrentUserId;
        }

        #endregion

        #region Save / Update / Delete Methods

        public bool UpdateNotificationStatus(Notification InputData)
        {
            bool result = true;

            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    InputData.ModifiedBy = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                    result = dal.UpdateNotificationStatus(InputData);
                    if (result)
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

        #endregion
    }
}
