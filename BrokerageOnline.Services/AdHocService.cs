using BrokerageOnline.BusinessLogic;
using BrokerageOnline.TransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Activation;

namespace BrokerageOnline.Services
{
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class AdHocService : IAdHocService
    {

        #region Common Declaration

        AdHocBL Bl = new AdHocBL();

        #endregion

        #region Get and Search Methods

        public List<MemoType> GetMemoTypes(int MemoParentID)
        {
            return Bl.GetMemoTypes(MemoParentID);
        }

        public List<SubRegion> GetSubRegion()
        {
            return Bl.GetSubRegion();
        }

        public List<AdHocSearchResults> GetAdHocDetails(int PaymentTypeID, string AdhocStatus, int AdhocBatchID, int CreatedByID, string SearchFilter)
        {
            return Bl.GetAdHocDetails(PaymentTypeID, AdhocStatus, AdhocBatchID, CreatedByID, SearchFilter);
        }

        public AdHocSearchResults GetAdHocPaymentDetails(int PaymentListID)
        {
            return Bl.GetAdHocPaymentDetails(PaymentListID);
        }

        public List<AdhocPaymentDetails> GetAdHocBatchDetails(string AdhocStatus, int MemoTypeID, int RaisedByID, string SearchFilter)
        {
            return Bl.GetAdHocBatchDetails(AdhocStatus, MemoTypeID, RaisedByID, SearchFilter);
        }

        public List<RemarksHistory> GetAuditPaymentDetails(int ID)
        {
            return Bl.GetAuditPaymentDetails(ID);
        }

        public string GetDistributor_AUM_Gross(string ARNNumbers, int SchemeID, int SubRegionID, string PeriodFrom, string PeriodTo, string AmountBasisType)
        {
            return Bl.GetDistributor_AUM_Gross(ARNNumbers, SchemeID, SubRegionID, PeriodFrom, PeriodTo, AmountBasisType);
        }

        public List<AdHocSearchResults> GetDuplicateAdHocDetails(int PaymentListID, string ARNNO, int SchemeID, int PaymentMemoTypeID, string AmountBasis, string PeriodFrom, string PeriodTo)
        {
            return Bl.GetDuplicateAdHocDetails(PaymentListID, ARNNO, SchemeID, PaymentMemoTypeID, AmountBasis, PeriodFrom, PeriodTo);
        }

        public List<AdhocPaymentDetails> GetAdHocApproverMail(string AdhocBatchIDs)
        {
            return Bl.GetAdHocApproverMail(AdhocBatchIDs);
        }

        public bool SendDeletePaymentMail(string PaymentNo, string Distributor, string UserName, string ToUser, string Status)
        {
            return Bl.SendDeletePaymentMail(PaymentNo, Distributor, UserName, ToUser, Status);
        }

        #endregion

        #region Save , Update and Delete Methods

        public string SaveAdHocDetails(AdHocSearchResults[] InputData)
        {
            return Bl.SaveAdHocDetails(InputData.ToList().First());
        }

        public bool DeleteAdHocPayment(string PaymentListIDs, string AdhocStatus)
        {
            return Bl.DeleteAdHocPayment(PaymentListIDs, AdhocStatus);
        }

        public bool SaveAdHocPaymentList(AdHocSearchResults[] InputData)
        {
            return Bl.SaveAdHocPaymentList(InputData.ToList());
        }

        public string CreateAdhocBatchProcess(string AdhocListIDs, string AdhocStatus, string Remarks, int ApprovalRoleID)
        {
            return Bl.CreateAdhocBatchProcess(AdhocListIDs, AdhocStatus, Remarks, ApprovalRoleID);
        }

        public string UpdateAdhocRemarks(int AdhocID, string Remarks)
        {
            return Bl.UpdateAdhocRemarks(AdhocID, Remarks);
        }


        #endregion

        #region Work Flow

        public bool ViewAdhocAction(int RoleID, string NavigateKey)
        {
            return Bl.ViewAdhocAction(RoleID, NavigateKey);
        }

        #endregion
    }
}
