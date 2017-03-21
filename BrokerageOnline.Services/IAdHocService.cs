using BrokerageOnline.TransferObjects;
using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace BrokerageOnline.Services
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IAdHocService" in both code and config file together.
    [ServiceContract]
    public interface IAdHocService
    {
        #region Get / Search Services

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GetMemoTypes")]
        [OperationContract]
        List<MemoType> GetMemoTypes(int MemoParentID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GetSubRegion")]
        [OperationContract]
        List<SubRegion> GetSubRegion();

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GetAdHocBatchDetails")]
        [OperationContract]
        List<AdhocPaymentDetails> GetAdHocBatchDetails(string AdhocStatus, int MemoTypeID, int RaisedByID, string SearchFilter);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GetAdHocDetails")]
        [OperationContract]
        List<AdHocSearchResults> GetAdHocDetails(int PaymentTypeID, string AdhocStatus, int AdhocBatchID, int CreatedByID, string SearchFilter);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GetAdHocPaymentDetails")]
        [OperationContract]
        AdHocSearchResults GetAdHocPaymentDetails(int PaymentListID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GetAuditPaymentDetails")]
        [OperationContract]
        List<RemarksHistory> GetAuditPaymentDetails(int ID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GetDistributor_AUM_Gross")]
        [OperationContract]
        string GetDistributor_AUM_Gross(string ARNNumbers, int SchemeID, int SubRegionID, string PeriodFrom, string PeriodTo, string AmountBasisType);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GetDuplicateAdHocDetails")]
        [OperationContract]
        List<AdHocSearchResults> GetDuplicateAdHocDetails(int PaymentListID, string ARNNO, int SchemeID, int PaymentMemoTypeID, string AmountBasis, string PeriodFrom, string PeriodTo);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GetAdHocApproverMail")]
        [OperationContract]
        List<AdhocPaymentDetails> GetAdHocApproverMail(string AdhocBatchIDs);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/SendDeletePaymentMail")]
        [OperationContract]
        bool SendDeletePaymentMail(string PaymentNo, string Distributor, string UserName, string ToUser, string Status);

        #endregion

        #region Save / Update / Delete Services

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/DeleteAdHocPayment")]
        [OperationContract]
        bool DeleteAdHocPayment(string PaymentListIDs, string AdhocStatus);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/SaveAdHocPaymentList")]
        [OperationContract]
        bool SaveAdHocPaymentList(AdHocSearchResults[] InputData);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/CreateAdhocBatchProcess")]
        [OperationContract]
        string CreateAdhocBatchProcess(string AdhocListIDs, string AdhocStatus, string Remarks, int ApprovalRoleID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/SaveAdHocDetails")]
        [OperationContract]
        string SaveAdHocDetails(AdHocSearchResults[] InputData);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/UpdateAdhocRemarks")]
        [OperationContract]
        string UpdateAdhocRemarks(int AdhocID, string Remarks);

        #endregion

        #region WorkFlow

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/ViewAdhocAction")]
        [OperationContract]
        bool ViewAdhocAction(int RoleID, string NavigateKey);

        #endregion

    }
}
