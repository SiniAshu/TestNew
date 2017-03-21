using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BrokerageOnline.TransferObjects;
using BrokerageOnline.DataAccess;

namespace BrokerageOnline.Workflow.HelperClass
{
    public class RackRate
    {
        public ViewAction GetViewAction(Int32 PaymentmemoId, Int32 UserID)
        {
            try
            {
                BaseRackRateDAL Dal = new BaseRackRateDAL();
                return Dal.GetViewAction(PaymentmemoId,UserID,1);
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        public WorkFlowHierarchy[] GetWorkFlowHierarchy(Int32 MemoTypeID)
        {
            try
            {
                BaseRackRateDAL Dal = new BaseRackRateDAL();
                return Dal.GetWorkFlowHierarchy(1).ToArray();
            }
            catch (Exception)
            {
                
                throw;
            }
        }
    }
}
