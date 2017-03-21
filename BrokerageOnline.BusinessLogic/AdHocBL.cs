using BrokerageOnline.Common.SessionManagement;
using BrokerageOnline.Common.Utility;
using BrokerageOnline.DataAccess;
using BrokerageOnline.TransferObjects;
using BrokerageOnline.Workflow.Workflows.AdHoc;
using System;
using System.Activities;
using System.Collections.Generic;
using System.Threading;
using System.Web;
using System.Linq;

namespace BrokerageOnline.BusinessLogic
{
    public class AdHocBL
    {
        #region Common Declaration

        string UserSessionId = SessionObject.sessionValue;
        AdHocDAL dal = new AdHocDAL();

        #endregion

        #region Get and Search Methods

        public List<MemoType> GetMemoTypes(int MemoParentID)
        {
            List<MemoType> ObjMemoType = new List<MemoType>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    ObjMemoType = dal.GetMemoTypes(MemoParentID, out error);
                    if (error == null)
                        return ObjMemoType;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return ObjMemoType;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SubRegion> GetSubRegion()
        {
            List<SubRegion> ObjSubRegion = new List<SubRegion>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    ObjSubRegion = dal.GetSubRegion(out error);
                    if (error == null)
                        return ObjSubRegion;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return ObjSubRegion;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<AdHocSearchResults> GetAdHocDetails(int PaymentTypeID, string AdhocStatus, int AdhocBatchID, int CreatedByID, string SearchFilter)
        {
            List<AdHocSearchResults> ObjResult = new List<AdHocSearchResults>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    ObjResult = dal.GetAdHocDetails(PaymentTypeID, AdhocStatus, AdhocBatchID, CreatedByID, SearchFilter, out error);
                    if (error == null)
                        return ObjResult;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return ObjResult;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string GetDistributor_AUM_Gross(string ARNNumbers, int SchemeID, int SubRegionID, string PeriodFrom, string PeriodTo, string AmountBasisType)
        {
            string ObjResult = string.Empty;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    ObjResult = dal.GetDistributor_AUM_Gross(ARNNumbers, SchemeID, SubRegionID, PeriodFrom, PeriodTo, AmountBasisType, out error);
                    if (error == null)
                        return ObjResult;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return ObjResult;
                }
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<AdHocSearchResults> GetDuplicateAdHocDetails(int PaymentListID, string ARNNO, int SchemeID, int PaymentMemoTypeID, string AmountBasis, string PeriodFrom, string PeriodTo)
        {
            List<AdHocSearchResults> ObjResult = new List<AdHocSearchResults>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    ObjResult = dal.GetDuplicateAdHocDetails(PaymentListID, ARNNO, SchemeID, PaymentMemoTypeID, AmountBasis, PeriodFrom, PeriodTo, out error);
                    if (error == null)
                        return ObjResult;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return ObjResult;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public AdHocSearchResults GetAdHocPaymentDetails(int PaymentListID)
        {
            AdHocSearchResults ObjResult = new AdHocSearchResults();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    ObjResult = dal.GetAdHocPaymentDetails(PaymentListID, out error);
                    if (error == null)
                        return ObjResult;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return ObjResult;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<AdhocPaymentDetails> GetAdHocBatchDetails(string AdhocStatus, int MemoTypeID, int RaisedByID, string SearchFilter)
        {
            List<AdhocPaymentDetails> ObjResult = new List<AdhocPaymentDetails>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    ObjResult = dal.GetAdHocBatchDetails(AdhocStatus, MemoTypeID, RaisedByID, SearchFilter, out error);
                    if (error == null)
                        return ObjResult;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return ObjResult;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<RemarksHistory> GetAuditPaymentDetails(int ID)
        {
            List<RemarksHistory> ObjResult = new List<RemarksHistory>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    ObjResult = dal.GetAuditPaymentDetails(ID, out error);
                    if (error == null)
                        return ObjResult;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return ObjResult;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<AdhocPaymentDetails> GetAdHocApproverMail(string AdhocBatchIDs)
        {
            List<AdhocPaymentDetails> ObjResult = new List<AdhocPaymentDetails>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    ObjResult = dal.GetAdHocApproverMail(AdhocBatchIDs, out error);
                    if (error == null)
                        return ObjResult;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return ObjResult;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool SendDeletePaymentMail(string PaymentNo, string Distributor, string UserName, string ToUser, string Status)
        {
            bool ObjResult = false;

            try
            {
                Exception error = null;
                BaseRackRateDAL dal = new BaseRackRateDAL();
                string subject = "";
                string Body = "";

                List<NotificationMailContent> MailContent = new List<NotificationMailContent>();
                MailContent = dal.GetNotificationMailContent(Status, out error);

                if (MailContent.Count > 0)
                {
                    subject = MailContent.First().Subject;
                    Body = MailContent.First().Body;

                    Body = Body.Replace("###PAYMENTNO###", PaymentNo);
                    Body = Body.Replace("###DISTRIBUTOR###", Distributor);
                    Body = Body.Replace("###USER###", UserName);

                    // NEED TO GET REVERT AFTER IMPLEMENT IN LIVE

                    ToUser = "shantanu@hexagonglobal.in";

                    // NEED TO GET REVERT AFTER IMPLEMENT IN LIVE

                    #region SendEmail
                    Utility util = new Utility();
                    Email em = new Email();
                    em.Emailto = ToUser;
                    em.EmailCC = "";
                    em.EmailBCC = "";
                    em.Subject = subject;
                    em.Body = Body;
                    em.attach = "";
                    em.Emailfrom = "brokerageonline3@gmail.com";
                    util.SendEmail(em);
                    #endregion
                }

                ObjResult = true;
            }
            catch (Exception)
            {
                ObjResult = false;
                throw;
            }
            return ObjResult;
        }

        #endregion

        #region Save / Update / Delete Methods

        public bool DeleteAdHocPayment(string PaymentListIDs, string AdhocStatus)
        {
            bool ObjResult = false;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    ObjResult = dal.DeleteAdHocPayment(PaymentListIDs, AdhocStatus, out error);
                    if (error == null)
                        return ObjResult;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return ObjResult;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string SaveAdHocDetails(AdHocSearchResults InputData)
        {
            string returnvalue = string.Empty;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;

                    if (InputData.PaymentListId > 0)
                        returnvalue = dal.UpdateAdHocDetails(InputData, out error);
                    else
                        returnvalue = dal.SaveAdHocDetails(InputData, out error);
                    if (error == null)
                        return returnvalue;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return returnvalue;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool SaveAdHocPaymentList(List<AdHocSearchResults> InputData)
        {
            bool ObjResult = false;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    ObjResult = dal.SaveAdHocPaymentList(InputData, out error);
                    if (error == null)
                        return ObjResult;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return ObjResult;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string CreateAdhocBatchProcess(string AdhocListIDs, string AdhocStatus, string Remarks, int ApprovalRoleID)
        {
            string ObjResult = string.Empty;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    ObjResult = dal.CreateAdhocBatchProcess(AdhocListIDs, AdhocStatus, Remarks, ApprovalRoleID, out error);
                    if (error == null)
                    {
                        if (AdhocStatus == "approve")
                            Upload_Adhoc_CAMSFormatToPath(AdhocListIDs, AdhocStatus);
                        return ObjResult;
                    }
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return ObjResult;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        private void Upload_Adhoc_CAMSFormatToPath(string AdhocListIDs, string AdhocStatus)
        {
            string[] arr = AdhocListIDs.Split(',').ToArray();
            string[] reader;
            string fileUrl = "";

            string GetReportURLHostAndPort = System.Configuration.ConfigurationManager.AppSettings["ReportURLHostAndPort"].ToString();

            for (int i = 0; i < arr.Count(); i++)
            {
                string MemoNumber = string.Empty;
                int MemoType = 0;

                string GetMemoQuery = @"select AR.MemoNumber, AR.MemoTypeID from AdhocPaymentDetails AR
                inner join AdhocPaymentDetails ADH on AR.PaymentListIDs = ADH.PaymentListIDs
                where ADH.ID = " + arr[i] + " AND AR.AdhocStatus = '" + AdhocStatus + "'";

                reader = dal.ExecuteReader(GetMemoQuery);
                MemoNumber = reader[0];
                MemoType = Convert.ToInt32(reader[1]);

                string targetFolder = System.Configuration.ConfigurationManager.AppSettings["CAMSTargetFolder"].ToString() + MemoNumber + ".pdf";

                if (MemoType == 3)
                    fileUrl = "http://" + GetReportURLHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/CAMS_AdHoc_MBnull?MemoNumber_P=###MemoNumber###&Channel_P=###Channel###&output-target=pageable%2Fpdf&solution=DSP_BlackRock&path=&name=CAMS_AdHoc_MB.prpt&userid=joe&password=password";
                else
                    fileUrl = "http://" + GetReportURLHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/CAMS_AdHoc_FBnull?MemoNumber_P=###MemoNumber###&Channel_P=###Channel###&output-target=pageable%2Fpdf&solution=DSP_BlackRock&path=&name=CAMS_AdHoc_FB.prpt&userid=joe&password=password";

                if (MemoNumber != "")
                {
                    Utility util = new Utility();
                    fileUrl = fileUrl.Replace("###MemoNumber###", MemoNumber);
                    fileUrl = fileUrl.Replace("###Channel###", " ");
                    util.DownloadFileFromURL(fileUrl, targetFolder);
                }
            }
        }

        public string UpdateAdhocRemarks(int AdhocID, string Remarks)
        {
            string ObjResult = string.Empty;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    ObjResult = dal.UpdateAdhocRemarks(AdhocID, Remarks, out error);
                    if (error == null)
                        return ObjResult;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return ObjResult;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }


        #endregion

        #region Work Flow

        public bool ViewAdhocAction(int RoleID, string NavigateKey)
        {
            try
            {
                AutoResetEvent syncEvent = new AutoResetEvent(false);
                IDictionary<string, object> inputs = new Dictionary<string, object>();
                inputs.Add("RoleID", RoleID);
                inputs.Add("NavigateKey", NavigateKey);
                WorkflowApplication wfApp = new WorkflowApplication(new AdHoc(), inputs);

                bool result = false;

                wfApp.Completed = delegate(WorkflowApplicationCompletedEventArgs e)
                {
                    syncEvent.Set();
                    result = (bool)e.Outputs["OutputStatus"];
                };

                wfApp.Run();

                syncEvent.WaitOne();

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

    }
}
