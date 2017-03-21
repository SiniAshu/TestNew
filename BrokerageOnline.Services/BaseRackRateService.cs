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
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class BaseRackRateService : IBaseRackRateService
    {
        public List<DistributorCategory> GetDistributorCategory(string SearchText)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetDistributorCategory(SearchText);
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<SchemeCategory> GetSchemeCategory(string SearchText, Int64 MemoTypeId, Int64 IsCloseEnded)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetSchemeCategory(SearchText, MemoTypeId, IsCloseEnded);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SchemeDropdown> GetScheme(string SearchText, Int64 MemoTypeId, Int64 IsCloseEnded)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetScheme(SearchText, MemoTypeId, IsCloseEnded);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SchemeDropdown> GetSchemeAndCategory(string SearchText, Int64 MemoTypeId)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetSchemeAndCategory(SearchText, MemoTypeId);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SchemeAndCategory> GetSchemeWithSchemeCategory(string Scheme, string SchemeCategory)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetSchemeWithSchemeCategory(Scheme.Split(','), SchemeCategory.Split(','));
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Distributor> GetDistributor(string SearchText, int SubregionID)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetDistributor(SearchText, SubregionID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Distributor> GetDistributorBasedOnID(string SearchText, int SubregionID)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                var ARNName=bl.GetDistributorBasedOnID(SearchText, SubregionID);
                return ARNName;
                //return bl.GetDistributorBasedOnID(SearchText, SubregionID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Distributor> GetChildArn(string ArnNo)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                //return bl.GetChildArn(ArnNo);
                var childARn = bl.GetChildArn(ArnNo);
                return childARn;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string GetSlab(string DistributorCategoryID, string Arnno)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetSlab(DistributorCategoryID, Arnno);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string GetSlabAvailability(string DistributorCategoryID, string Arnno)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetSlabAvailability(DistributorCategoryID, Arnno);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string GetSIPSlab(string DistributorCategoryID, string Arnno)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetSIPSlab(DistributorCategoryID, Arnno);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string GetSIPSlabAvailability(string DistributorCategoryID, string Arnno)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetSIPSlabAvailability(DistributorCategoryID, Arnno);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Object GetARN(string SearchText, int SubregionID)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                List<Distributor> dist_list = new List<Distributor>();
                dist_list = bl.GetARN(SearchText, SubregionID);
                var jsonData =
              from row in dist_list
              select new
              {
                  id = row.DistributorId,
                  name = row.ARN
              };
                return (new JavaScriptSerializer()).Serialize(jsonData);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Object GetARNForChannelAndDistributorCategory(string Channel, string DistributorCategory)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                List<Distributor> dist_list = new List<Distributor>();
                dist_list = bl.GetARNForChannelAndDistributorCategory(Channel, DistributorCategory);
                var jsonData =
              from row in dist_list
              select new
              {
                  id = row.DistributorId,
                  name = row.ARN
              };
                return (new JavaScriptSerializer()).Serialize(jsonData);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Object GetARNName(string SearchText, int SubregionID)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                List<Distributor> dist_list = new List<Distributor>();
                dist_list = bl.GetARN(SearchText, SubregionID);
                var jsonData =
              from row in dist_list
              select new
              {
                  id = row.DistributorId,
                  name = row.DistributorName
              };
                jsonData = jsonData.GroupBy(test => test.name)
                     .Select(grp => grp.First());
                return (new JavaScriptSerializer()).Serialize(jsonData);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Channel> GetChannel(string SearchText)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetChannel(SearchText);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<RemarksHistory> GetRemarksHistory(string PaymentMemoId)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetRemarksHistory(PaymentMemoId);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SIPRateHistoryDetails> GetSIPModifiedRateHistoryDetails(Int64 PaymentMemoId, Int64 SchemeID, Int64 SIPRowId)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetSIPModifiedRateHistoryDetails(PaymentMemoId, SchemeID, SIPRowId);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<AssignToUser> GetUserBasedOnRole(Int64 RoleID, string ChannelId)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetUserBasedOnRole(RoleID, ChannelId);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<ModifiedRateHistory> GetModifiedRateHistory(string PaymentMemoId)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetModifiedRateHistory(PaymentMemoId);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<ModifiedRateHistory> GetSIPModifiedRateHistory(string PaymentMemoId)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetSIPModifiedRateHistory(PaymentMemoId);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<RackRateSearchResult> GetCreateBaseRackRate(string ArnNo, string Channel, string DistributorCategory, string Status, string MasterQueueStatus, string ARNName, string SearchFilter, string MemoLevel)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetCreateBaseRackRate(ArnNo, Channel, DistributorCategory, Status, MasterQueueStatus, ARNName, SearchFilter, MemoLevel);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool ViewAction(string MemoId, string currentScreen)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.ViewAction(MemoId, currentScreen);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool SaveBaseRackRateInformation(PaymentMemo[] Memo, PaymentList[] list, PaymentDetails[] details)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.SaveBaseRackRate(Memo.ToList().First(), list.ToList(), details.ToList());
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool SaveRejectedMemo(PaymentMemo[] Memo, PaymentList[] list, PaymentDetails[] details, string updateStatus)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.SaveRejectedMemo(Memo.ToList().First(), list.ToList(), details.ToList(), updateStatus);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentMemo> GetPaymentMemo(Int64 PaymentMemoID)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetPaymentMemo(PaymentMemoID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string MemoExists(string ArnNo, string Channel, string DistributorCategory, string schemeid, string DateFrom, string DateTo, string MemoId, string TransactionType, string MemoType)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.MemoExists(ArnNo, Channel, DistributorCategory, schemeid, DateFrom, DateTo, MemoId, TransactionType, MemoType);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string SIPMemoExists(string ArnNo, string DistributorCategory, string schemeid, string schemeCategoryid, string DateFrom, string DateTo, string MemoId, string TransactionType)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.SIPMemoExists(ArnNo, DistributorCategory, schemeid, schemeCategoryid, DateFrom, DateTo, MemoId, TransactionType);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool UpdateBatchStatus(string MemoNumber, string Status, string Remarks, string MemoTypeId)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.UpdateBatchStatus(MemoNumber, Status, Remarks, MemoTypeId);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool UpdateAssignToRole(string MemoNumber, string AssignTo, string AssignToBH)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.UpdateAssignToRole(MemoNumber, AssignTo, AssignToBH);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetPaymentList(Int64 PaymentMemoID)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetPaymentList(PaymentMemoID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetPaymentListWithInactive(Int64 PaymentMemoID)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetPaymentListWithInactive(PaymentMemoID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetAuditPaymentList(Int64 PaymentMemoID, Int64 SchemeId)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetAuditPaymentList(PaymentMemoID, SchemeId);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentDetails> GetAuditPaymentDetails(Int64 PaymentMemoID, Int64 SchemeId)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetAuditPaymentDetails(PaymentMemoID, SchemeId);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetTieUpAuditPaymentList(Int64 PaymentMemoID, string Scheme, string Category, string ARN, string DateFrom, string DateTo)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetTieUpAuditPaymentList(PaymentMemoID, Scheme, Category, ARN, DateFrom, DateTo);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentDetails> GetTieUpAuditPaymentDetails(Int64 PaymentMemoID, string Scheme, string Category, string ARN, string DateFrom, string DateTo)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetTieUpAuditPaymentDetails(PaymentMemoID, Scheme, Category, ARN, DateFrom, DateTo);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetPaymentListTieUp(Int64 PaymentMemoID)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetPaymentListTieUp(PaymentMemoID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetPaymentListSIP(Int64 PaymentMemoID)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetPaymentListSIP(PaymentMemoID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetPaymentListAll(Int64 PaymentMemoID)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetPaymentListAll(PaymentMemoID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetPaymentListForModifyValidity(Int64 PaymentMemoID)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetPaymentListForModifyValidity(PaymentMemoID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentDetails> GetPaymentDetails(Int64 PaymentMemoID)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetPaymentDetails(PaymentMemoID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public PaymentList GetPaymentListByScheme(Int64 SchemeID, string ARN, string DistributorCategory)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetPaymentListByScheme(SchemeID, ARN, DistributorCategory);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public PaymentList GetAvailableSchemeTieup(Int64 SchemeID, string ARN, string DistributorCategory, string DateFrom, string DateTo)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetAvailableSchemeTieup(SchemeID, ARN, DistributorCategory, DateFrom, DateTo);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public PaymentList GetPaymentListForTieupOnCreate(Int64 SchemeID, string ARN, string DistributorCategory, string DateFrom, string DateTo)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetPaymentListForTieupOnCreate(SchemeID, ARN, DistributorCategory, DateFrom, DateTo);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetPaymentListByARN(string ARN, string DistributorCategory, string DateFrom, string DateTo)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetPaymentListByARN(ARN, DistributorCategory, DateFrom, DateTo);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentDetails> GetPaymentDetailsByScheme(Int64 SchemeID, Int64 PaymentMemoID)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetPaymentDetailsByScheme(SchemeID, PaymentMemoID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentMemo> getvalue(string se)
        {
            try
            {
                List<PaymentMemo> mem = new List<PaymentMemo>();
                PaymentMemo val = new PaymentMemo();
                val.ApplicableTo = "";
                val.BranchId = "";
                val.ZoneId = "0";
                val.MemoTypeId = "tyet";
                val.PaymentAmount = "tyet";
                val.PaymentMemoId = "tyet";
                val.Remarks = "";
                val.SlabAmount = "tyet";
                val.SlabCondition = "tyet";
                val.SlabType = "tysgsdget";
                val.TransactionType = "tysdgset";
                val.Comments = "";
                val.DateFrom = DateTime.Now.ToString();
                val.DateTo = DateTime.Now.ToString();

                mem.Add(val);
                return mem;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string SendEmailMemo(string fileurl, string filename, string sendto, string sendcc, int typeval, int ModuleID, string MailStatus, string sendbcc = "")
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();

                // For Testing Purpose and So Need To Remove at the time of real implementation

                //sendto = "shantanu@hexagonglobal.in";
                //sendcc = "shantanu@hexagonglobal.in";
                //if (sendbcc != null && sendbcc != "")
                //    sendbcc = "shantanu@hexagonglobal.in";

                // End Here to Remove Test Code 

                return bl.SendEmailMemo(fileurl, filename, sendto, sendcc, typeval, ModuleID, MailStatus, sendbcc);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<string> getmailinglist(string SearchText)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.getmailinglist(SearchText);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Exit_Load> GetExitLoad(Int64 ID)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetExitLoad(ID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string getrackrateinfo(int Paymentmemoid, int Schemeid)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.getrackrateinfo(Paymentmemoid, Schemeid);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Channel_DistibutorCategory> GetChannelDistributorCategory(string Channel)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetChannelDistributorCategory(Channel);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<Channel_DistibutorCategory> GetChannelCategory(string Channel, string category)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetChannelCategory(Channel, category);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public ViewAction GetViewAction(Int32 PaymentMemoID, Int32 MemoTypeID)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetViewAction(PaymentMemoID, MemoTypeID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Object GetParentARN(string ARN)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                List<Distributor> dist_list = new List<Distributor>();
                dist_list = bl.GetParentARN(ARN);
                var jsonData =
              from row in dist_list
              select new
              {
                  id = row.DistributorId,
                  name = row.ARN
              };
                return (new JavaScriptSerializer()).Serialize(jsonData);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Object getmailinglistobject(string SearchText, string Module)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                List<MailingList> dist_list = new List<MailingList>();
                dist_list = bl.getmailinglistobject(SearchText, Module);
                var jsonData =
              from row in dist_list
              select new
              {
                  id = row.MailingListId,
                  name = row.Email
              };
                return (new JavaScriptSerializer()).Serialize(jsonData);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<string> GetSchemeForArnCategory(string Arn, string Dist_category)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetSchemeForArnCategory(Arn, Dist_category);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void ModifyValidity(List<PaymentList> list)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                bl.ModifyValidity(list);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Object GetDistributorEmail(string SearchText, string Module)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                List<MailingList> dist_list = new List<MailingList>();
                dist_list = bl.GetDistributorEmail(SearchText, Module);
                var jsonData =
              from row in dist_list
              select new
              {
                  id = row.MailingListId,
                  name = row.Email
              };
                return (new JavaScriptSerializer()).Serialize(jsonData);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void ValidateSchemeSlabAmount(string SchemeID)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                bl.ValidateSchemeSlabAmount(SchemeID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetTieUpARNCategory(Int64 PaymentMemoID)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetTieUpARNCategory(PaymentMemoID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<RackRateSearchResult> GetCreateSIP(string ArnNo, string Channel, string DistributorCategory, string Status, string MasterQueueStatus, string ARNName, string SearchFilter, string MemoLevel)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetCreateSIP(ArnNo, Channel, DistributorCategory, Status, MasterQueueStatus, ARNName, SearchFilter, MemoLevel);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public List<RackRateSearchResult> GetDiscardedQueue(string Status)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetDiscardedQueue(Status);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<string> GetChannelForARNAndDistributorCategory(string ARN, string DistributorCategory)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetChannelForARNAndDistributorCategory(ARN, DistributorCategory);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string ValidateAvailableSchemeTieup(string SchemeID, string ARN, string DistributorCategory, string DateFrom, string DateTo)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.ValidateAvailableSchemeTieup(SchemeID, ARN, DistributorCategory, DateFrom, DateTo);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool ValidateBranchPaymentMemo(string PaymentMemoID)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.ValidateBranchPaymentMemo(PaymentMemoID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<LinkedMemo> GetLinkedMemos(string MemoIds)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetLinkedMemos(MemoIds);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string GetReportURLHostAndPort()
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetReportURLHostAndPort();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Int64 SaveRegenerateBaseRackRateInformation(PaymentMemo[] Memo, PaymentList[] list, PaymentDetails[] details)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.SaveRegenerateBaseRackRate(Memo.ToList().First(), list.ToList(), details.ToList());
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SchemeDropdown> GetMissingSchemeInExitLoadScheme()
        {
            List<SchemeDropdown> missingScheme = new List<SchemeDropdown>();
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                missingScheme = bl.GetMissingSchemeInExitLoadScheme();

                return missingScheme;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public string SaveExitLoadChanges() {
            string result = string.Empty;
            try { 
                BaseRackRateBL bl = new BaseRackRateBL();
                result = bl.SaveExitLoadChanges();
            }
            catch { 
            }
            return result;

        }
        
        public List<LumpsumSIPType> GetLumpsumSIPType(string SearchText)
        {
            try
            {
                BaseRackRateBL bl = new BaseRackRateBL();
                return bl.GetLumpsumSIPType(SearchText);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
