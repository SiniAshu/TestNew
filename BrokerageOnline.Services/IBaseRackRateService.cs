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
    [ServiceContract]
    public interface IBaseRackRateService
    {
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
           UriTemplate = "/GetDistributorCategory")]
        [OperationContract]
        List<DistributorCategory> GetDistributorCategory(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
           UriTemplate = "/GetSchemeCategory")]
        [OperationContract]
        List<SchemeCategory> GetSchemeCategory(string SearchText, Int64 MemoTypeId, Int64 IsCloseEnded);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
           UriTemplate = "/GetScheme")]
        [OperationContract]
        List<SchemeDropdown> GetScheme(string SearchText, Int64 MemoTypeId, Int64 IsCloseEnded);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
         UriTemplate = "/GetSchemeAndCategory")]
        [OperationContract]
        List<SchemeDropdown> GetSchemeAndCategory(string SearchText, Int64 MemoTypeId);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
          UriTemplate = "/GetSchemeWithSchemeCategory")]
        [OperationContract]
        List<SchemeAndCategory> GetSchemeWithSchemeCategory(string Scheme, string SchemeCategory);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
          UriTemplate = "/GetDistributor")]
        [OperationContract]
        List<Distributor> GetDistributor(string SearchText, int SubregionID = 0);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
         UriTemplate = "/GetDistributorBasedOnID")]
        [OperationContract]
        List<Distributor> GetDistributorBasedOnID(string SearchText, int SubregionID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
          UriTemplate = "/GetChildArn")]
        [OperationContract]
        List<Distributor> GetChildArn(string ArnNo);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
          UriTemplate = "/GetSlab")]
        [OperationContract]
        string GetSlab(string DistributorCategoryID, string Arnno);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
         UriTemplate = "/GetSIPSlab")]
        [OperationContract]
        string GetSIPSlab(string DistributorCategoryID, string Arnno);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
         UriTemplate = "/GetARN")]
        [OperationContract]
        Object GetARN(string SearchText, int SubregionID = 0);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
       UriTemplate = "/GetARNName")]
        [OperationContract]
        Object GetARNName(string SearchText, int SubregionID = 0);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
          UriTemplate = "/GetChannel")]
        [OperationContract]
        List<Channel> GetChannel(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
       UriTemplate = "/GetChannelCategory")]
        [OperationContract]
        List<Channel_DistibutorCategory> GetChannelCategory(string Channel, string category);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
         UriTemplate = "/GetRemarksHistory")]
        [OperationContract]
        List<RemarksHistory> GetRemarksHistory(string PaymentMemoId);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
         UriTemplate = "/GetModifiedRateHistory")]
        [OperationContract]
        List<ModifiedRateHistory> GetModifiedRateHistory(string PaymentMemoId);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetSIPModifiedRateHistory")]
        [OperationContract]
        List<ModifiedRateHistory> GetSIPModifiedRateHistory(string PaymentMemoId);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
         UriTemplate = "/GetCreateBaseRackRate")]
        [OperationContract]
        List<RackRateSearchResult> GetCreateBaseRackRate(string ArnNo, string Channel, string DistributorCategory, string Status, string MasterQueueStatus, string ARNName, string SearchFilter, string MemoLevel);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/ViewAction")]
        [OperationContract]
        bool ViewAction(string MemoId, string currentScreen);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
         UriTemplate = "/SaveBaseRackRateInformation")]
        [OperationContract]
        bool SaveBaseRackRateInformation(PaymentMemo[] Memo, PaymentList[] list, PaymentDetails[] details);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/SaveRejectedMemo")]
        [OperationContract]
        bool SaveRejectedMemo(PaymentMemo[] Memo, PaymentList[] list, PaymentDetails[] details, string updateStatus);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
         UriTemplate = "/GetPaymentMemo")]
        [OperationContract]
        List<PaymentMemo> GetPaymentMemo(Int64 PaymentMemoID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetPaymentListByScheme")]
        [OperationContract]
        PaymentList GetPaymentListByScheme(Int64 SchemeID, string ARN, string DistributorCategory);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
 UriTemplate = "/GetAvailableSchemeTieup")]
        [OperationContract]
        PaymentList GetAvailableSchemeTieup(Int64 SchemeID, string ARN, string DistributorCategory, string DateFrom, string DateTo);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
UriTemplate = "/GetPaymentListForTieupOnCreate")]
        [OperationContract]
        PaymentList GetPaymentListForTieupOnCreate(Int64 SchemeID, string ARN, string DistributorCategory, string DateFrom, string DateTo);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
       UriTemplate = "/GetPaymentListByARN")]
        [OperationContract]
        List<PaymentList> GetPaymentListByARN(string ARN, string DistributorCategory, string DateFrom, string DateTo);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
      UriTemplate = "/GetPaymentDetailsByScheme")]
        [OperationContract]
        List<PaymentDetails> GetPaymentDetailsByScheme(Int64 SchemeID, Int64 PaymentMemoID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
       UriTemplate = "/UpdateBatchStatus")]
        [OperationContract]
        bool UpdateBatchStatus(string MemoNumber, string Status, string Remarks, string MemoTypeId);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
       UriTemplate = "/UpdateAssignToRole")]
        [OperationContract]
        bool UpdateAssignToRole(string MemoNumber, string AssignTo, string AssignToBH);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
         UriTemplate = "/GetPaymentList")]
        [OperationContract]
        List<PaymentList> GetPaymentList(Int64 PaymentMemoID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
       UriTemplate = "/GetPaymentListWithInactive")]
        [OperationContract]
        List<PaymentList> GetPaymentListWithInactive(Int64 PaymentMemoID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetPaymentListTieUp")]
        [OperationContract]
        List<PaymentList> GetPaymentListTieUp(Int64 PaymentMemoID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
       UriTemplate = "/GetPaymentListSIP")]
        [OperationContract]
        List<PaymentList> GetPaymentListSIP(Int64 PaymentMemoID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
       UriTemplate = "/GetPaymentListAll")]
        [OperationContract]
        List<PaymentList> GetPaymentListAll(Int64 PaymentMemoID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
   UriTemplate = "/GetPaymentListForModifyValidity")]
        [OperationContract]
        List<PaymentList> GetPaymentListForModifyValidity(Int64 PaymentMemoID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
         UriTemplate = "/GetPaymentDetails")]
        [OperationContract]
        List<PaymentDetails> GetPaymentDetails(Int64 PaymentMemoID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
       UriTemplate = "/getvalue")]
        [OperationContract]
        List<PaymentMemo> getvalue(string se);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
      UriTemplate = "/MemoExists")]
        [OperationContract]
        string MemoExists(string ArnNo, string Channel, string DistributorCategory, string schemeid, string DateFrom, string DateTo, string MemoId, string TransactionType, string MemoType);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
    UriTemplate = "/SIPMemoExists")]
        [OperationContract]
        string SIPMemoExists(string ArnNo, string DistributorCategory, string schemeid, string schemeCategoryid, string DateFrom, string DateTo, string MemoId, string TransactionType);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
      UriTemplate = "/SendEmailMemo")]
        [OperationContract]
        string SendEmailMemo(string fileurl, string filename, string sendto, string sendcc, int typeval, int ModuleID, string MailStatus, string sendbcc);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
      UriTemplate = "/getmailinglist")]
        [OperationContract]
        List<string> getmailinglist(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
   UriTemplate = "/GetExitLoad")]
        [OperationContract]
        List<Exit_Load> GetExitLoad(Int64 ID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
      UriTemplate = "/getrackrateinfo")]
        [OperationContract]
        string getrackrateinfo(int Paymentmemoid, int Schemeid);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
     UriTemplate = "/GetChannelDistributorCategory")]
        [OperationContract]
        List<Channel_DistibutorCategory> GetChannelDistributorCategory(string Channel);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
      UriTemplate = "/GetViewAction")]
        [OperationContract]
        ViewAction GetViewAction(Int32 PaymentMemoID, Int32 MemoTypeID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
  UriTemplate = "/GetSlabAvailability")]
        [OperationContract]
        string GetSlabAvailability(string DistributorCategoryID, string Arnno);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
UriTemplate = "/GetSIPSlabAvailability")]
        [OperationContract]
        string GetSIPSlabAvailability(string DistributorCategoryID, string Arnno);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
UriTemplate = "/GetARNForChannelAndDistributorCategory")]
        [OperationContract]
        Object GetARNForChannelAndDistributorCategory(string Channel, string DistributorCategory);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
         UriTemplate = "/GetParentARN")]
        [OperationContract]
        Object GetParentARN(string ARN);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
      UriTemplate = "/getmailinglistobject")]
        [OperationContract]
        Object getmailinglistobject(string SearchText, string Module = "");

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
     UriTemplate = "/GetSchemeForArnCategory")]
        [OperationContract]
        List<string> GetSchemeForArnCategory(string Arn, string Dist_category);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
    UriTemplate = "/ModifyValidity")]
        [OperationContract]
        void ModifyValidity(List<PaymentList> list);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
  UriTemplate = "/GetDistributorEmail")]
        [OperationContract]
        Object GetDistributorEmail(string SearchText, string Module = "");

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
  UriTemplate = "/ValidateSchemeSlabAmount")]
        [OperationContract]
        void ValidateSchemeSlabAmount(string SchemeID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
  UriTemplate = "/GetTieUpARNCategory")]
        [OperationContract]
        List<PaymentList> GetTieUpARNCategory(Int64 PaymentMemoID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
  UriTemplate = "/GetCreateSIP")]
        [OperationContract]
        List<RackRateSearchResult> GetCreateSIP(string ArnNo, string Channel, string DistributorCategory, string Status, string MasterQueueStatus, string ARNName, string SearchFilter, string MemoLevel);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetDiscardedQueue")]
        [OperationContract]
        List<RackRateSearchResult> GetDiscardedQueue(string Status);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetSIPModifiedRateHistoryDetails")]
        [OperationContract]
        List<SIPRateHistoryDetails> GetSIPModifiedRateHistoryDetails(Int64 PaymentMemoId, Int64 SchemeID, Int64 SIPRowId);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetUserBasedOnRole")]
        [OperationContract]
        List<AssignToUser> GetUserBasedOnRole(Int64 RoleID, string ChannelId);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
       UriTemplate = "/GetChannelForARNAndDistributorCategory")]
        [OperationContract]
        List<string> GetChannelForARNAndDistributorCategory(string ARN, string DistributorCategory);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
       UriTemplate = "/GetAuditPaymentList")]
        [OperationContract]
        List<PaymentList> GetAuditPaymentList(Int64 PaymentMemoID, Int64 SchemeId);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
       UriTemplate = "/GetAuditPaymentDetails")]
        [OperationContract]
        List<PaymentDetails> GetAuditPaymentDetails(Int64 PaymentMemoID, Int64 SchemeId);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
      UriTemplate = "/GetTieUpAuditPaymentList")]
        [OperationContract]
        List<PaymentList> GetTieUpAuditPaymentList(Int64 PaymentMemoID, string Scheme, string Category, string ARN, string DateFrom, string DateTo);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
      UriTemplate = "/GetTieUpAuditPaymentDetails")]
        [OperationContract]
        List<PaymentDetails> GetTieUpAuditPaymentDetails(Int64 PaymentMemoID, string Scheme, string Category, string ARN, string DateFrom, string DateTo);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
     UriTemplate = "/ValidateAvailableSchemeTieup")]
        [OperationContract]
        string ValidateAvailableSchemeTieup(string SchemeID, string ARN, string DistributorCategory, string DateFrom, string DateTo);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
  UriTemplate = "/ValidateBranchPaymentMemo")]
        [OperationContract]
        bool ValidateBranchPaymentMemo(string PaymentMemoID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
  UriTemplate = "/GetLinkedMemos")]
        [OperationContract]
        List<LinkedMemo> GetLinkedMemos(string MemoIds);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
 UriTemplate = "/GetReportURLHostAndPort")]
        [OperationContract]
        string GetReportURLHostAndPort();

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
       UriTemplate = "/SaveRegenerateBaseRackRateInformation")]
        [OperationContract]
        Int64 SaveRegenerateBaseRackRateInformation(PaymentMemo[] Memo, PaymentList[] list, PaymentDetails[] details);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
       UriTemplate = "/GetMissingSchemeInExitLoadScheme")]
        [OperationContract]
        List<SchemeDropdown> GetMissingSchemeInExitLoadScheme();

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
       UriTemplate = "/SaveExitLoadChanges")]
        [OperationContract]
        string SaveExitLoadChanges();

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
       UriTemplate = "/GetLumpsumSIPType")]
        [OperationContract]
        List<LumpsumSIPType> GetLumpsumSIPType(string SearchText);
    }
}
