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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IMasterService" in both code and config file together.
    [ServiceContract]
    public interface IMasterService
    {
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetRoles")]
        [OperationContract]
        List<GetRoles> GetRoles(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetChatHistory")]
        [OperationContract]
        List<ChatHistory> GetChatHistory(int SentFrom, int SentTo);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/SaveChat")]
        [OperationContract]
        bool SaveChat(ChatHistory chatHistory);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
     UriTemplate = "/GetDependentRoles")]
        [OperationContract]
        List<GetRoles> GetDependentRoles(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/Insert_Update_Role")]
        [OperationContract]
        bool Insert_Update_Role(Roles InputData);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/DeleteRole")]
        [OperationContract]
        bool DeleteRole(Int64 RoleSeqNo);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/DeleteUser")]
        [OperationContract]
        bool DeleteUser(Int64 UserID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/DeleteBranch")]
        [OperationContract]
        bool DeleteBranch(Int64 BranchID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/DeleteExitLoad")]
        [OperationContract]
        bool DeleteExitLoad(Int64 ExitLoadID);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetUserView")]
        [OperationContract]
        List<GetUsers> GetUserView(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetMasterDistributorCategory")]
        [OperationContract]
        List<DistributorCategoryMaster> GetMasterDistributorCategory(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/Insert_Update_Distributorcategory")]
        [OperationContract]
        bool Insert_Update_Distributorcategory(DistributorCategoryMaster InputData);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetMasterScheme")]
        [OperationContract]
        List<SchemeMaster> GetMasterScheme(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/Insert_Update_User")]
        [OperationContract]
        bool Insert_Update_User(UserMaster InputData, string Roledetails);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetMasterRights")]
        [OperationContract]
        List<RightsMaster> GetMasterRights(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetPasswordPolicy")]
        [OperationContract]
        List<PasswordPolicy> GetPasswordPolicy(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/Insert_Update_PasswordPolicy")]
        [OperationContract]
        bool Insert_Update_PasswordPolicy(PasswordPolicy InputData);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/Getzoneandregion")]
        [OperationContract]
        List<Zone> Getzoneandregion(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetBranchMaster")]
        [OperationContract]
        List<BranchMaster> GetBranchMaster(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/Insert_Update_BranchMaster")]
        [OperationContract]
        bool Insert_Update_BranchMaster(BranchMaster InputData);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetMasterExitLoad")]
        [OperationContract]
        List<Exit_Load> GetMasterExitLoad(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/Insert_Update_ExitLoad")]
        [OperationContract]
        bool Insert_Update_ExitLoad(Exit_Load InputData);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetMemoTypes")]
        [OperationContract]
        List<MemoFormatType> GetMemoTypes(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetBrokerageNotes")]
        [OperationContract]
        List<BrokerageNotes> GetBrokerageNotes(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/Insert_Update_BrokerageNotes")]
        [OperationContract]
        string Insert_Update_BrokerageNotes(BrokerageNotes InputData);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/DeleteBrokerageNotes")]
        [OperationContract]
        bool DeleteBrokerageNotes(Int64 NotesId);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetSchemeModule")]
        [OperationContract]
        List<SchemeModule> GetSchemeModule(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/Insert_Update_Scheme_module")]
        [OperationContract]
        bool Insert_Update_Scheme_module(SchemeModule InputData);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/DeleteSchemeModule")]
        [OperationContract]
        bool DeleteSchemeModule(Int64 NotesId);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GET_AccessMenu")]
        [OperationContract]
        List<AccessMenu> GET_AccessMenu(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GET_AccessMatrix")]
        [OperationContract]
        List<AccessMatrix> GET_AccessMatrix(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GET_MemoParent")]
        [OperationContract]
        List<MemoParent> GET_MemoParent(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/SaveRoleInformation")]
        [OperationContract]
        bool SaveRoleInformation(Roles[] Roledetail, SaveRole[] RoleData);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/SaveExitLoad")]
        [OperationContract]
        string SaveExitLoad(string SchemeCategory, string Scheme, Int64 ExitLoadId, string EffectiveDate, Exit_Load[] ExitLoadDetails, string ExitHoldingPeriod);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetSubmenu")]
        [OperationContract]
        List<SubMenu> GetSubmenu(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetMailingListMaster")]
        [OperationContract]
        List<MailingList> GetMailingListMaster(string SearchText);


        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/Insert_Update_MailingList_Master")]
        [OperationContract]
        bool Insert_Update_MailingList_Master(MailingList InputData, NotificationMailContent NotificationData);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/DeleteMailingListMaster")]
        [OperationContract]
        bool DeleteMailingListMaster(Int64 MailingListId);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetDistributorEmailTo")]
        [OperationContract]
        Object GetDistributorEmailTo(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/DeleteDistributorCategory")]
        [OperationContract]
        bool DeleteDistributorCategory(Int64 DistributorCategoryId);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetSmartSearchScreen")]
        [OperationContract]
        List<SmartSearchBO> GetSmartSearchScreen(string Channel, string DistributorCategory, string ARN, string SchemeCategory, string Scheme, string Zone, string Branch, string MemoType, string MemoStatus, string PeriodFrom, string PeriodTo, string CreatedBy, string SearchFilter);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GenerateAuditMaster")]
        [OperationContract]
        bool GenerateAuditMaster(AuditMasters[] InputData);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetAuditMaster")]
        [OperationContract]
        List<AuditMasters> GetAuditMaster(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetApplicationLock")]
        [OperationContract]
        List<ApplicationLock> GetApplicationLock(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/UpdateApplicationLock")]
        [OperationContract]
        bool UpdateApplicationLock(string Lock, string unlock, string ViewRoles, string LockNotes);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetCodeMaster")]
        [OperationContract]
        List<CodeMaster> GetCodeMaster(string CodeType);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/SearchUserLogs")]
        [OperationContract]
        List<EmployeeLogs> SearchUserLogs(string UserIDs, string Status, string PeriodFrom, string PeriodTo, string IPAddress, string SearchFilter);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetUnlockUsers")]
        [OperationContract]
        List<UnlockUsers> GetUnlockUsers(string UserName, Int64 IsDisabled);


        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/UpdateUnLockUsers")]
        [OperationContract]
        bool UpdateUnLockUsers(string Lock, string unlock, string reset);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetDashboardOverview")]
        [OperationContract]
        List<DashboardOverview> GetDashboardOverview(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetSelfInitiatedMemo")]
        [OperationContract]
        List<InitatedMemo> GetSelfInitiatedMemo(string SearchText, bool self);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetUndefinedStructure")]
        [OperationContract]
        List<DashboardOverview> GetUndefinedStructure(Int64 MemoTypeId, string StructureType);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/LoginAdministration")]
        [OperationContract]
        List<EmployeeLogs> LoginAdministration(string UserName, string SearchFilter);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetListSearchColumns")]
        [OperationContract]
        List<ListSearchColumns> GetListSearchColumns(int ModuleID, string StoreProcedure);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/UpdateSchemeSequence")]
        [OperationContract]
        bool UpdateSchemeSequence(Scheme[] SchemeList, SchemeCategory[] SchemeCategoryList);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GetNotification")]
        [OperationContract]
        List<Notification> GetNotification();

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetNotificationMailContent")]
        [OperationContract]
        List<NotificationMailContent> GetNotificationMailContent(string SearchText);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/GetAdditionalNotes")]
        [OperationContract]
        string GetAdditionalNotes(Int64 MemoTypeID, string Channel, string DistributorCategory, string ARNNO);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/DeleteAllNotifications")]
        [OperationContract]
        bool DeleteAllNotifications(string SearchText);

        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "/CopyOfExitLoad")]
        [OperationContract]
        string CopyOfExitLoad();

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GetEmailLog")]
        [OperationContract]
        List<Email> GetEmailLog();

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
           UriTemplate = "/GetAllDistributors")]
        [OperationContract]
        List<DistributorMaster> GetAllDistributors();

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
            UriTemplate = "/GetAllSubRegions")]
        [OperationContract]
        List<SubRegion> GetAllSubRegions();

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
            UriTemplate = "/GetAllDistributorCategories")]
        [OperationContract]
        List<DistributorCategory> GetAllDistributorCategories();

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
            UriTemplate = "/InsertUpdateDistributor")]
        [OperationContract]
        string InsertUpdateDistributor(DistributorMaster distributor);

        [WebGet(RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
            UriTemplate = "/DeleteDistributorById/{distributorId}")]
        [OperationContract]
        string DeleteDistributorById(string distributorId);

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
            UriTemplate = "/ResentEmail")]
        [OperationContract]
        string ResentEmail(Email emailDetail);
    }
}