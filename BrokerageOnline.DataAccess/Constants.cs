using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.DataAccess
{
    public static class Constants
    {
        public const string connection = "BrokerageOnline";

        #region SP Constants
        //////////////////LOGIN////////////////
        public const string SpGetUser = "GET_USER";
        public const string SpValidateUserLogin = "VALIDATE_USER_LOGIN";
        public const string SpValidateForgetPassword = "VALIDATE_FORGET_PASSWORD";
        public const string SpResetPassword = "RESET_PASSWORD";
        public const string SpUserLogs = "INSERT_UPDATE_EMPLOYEE_LOG";

        //////////////////MEMO////////////////
        public const string SpGetDistributorCategory = "GET_DISTRIBUTOR_CATEGORY";
        public const string SpGetChannelDistributorCategory = "GET_CHANNEL_DISTRIBUTORCATEGORY";
        public const string SpGetChannelCategory = "GET_CHANNEL_CATEGORY";
        public const string SpGetDistributor = "GET_DISTRIBUTOR";
        public const string SpGetDistributorBasedOnID = "GET_DISTRIBUTOR_BASED_ON_ID";
        public const string SpGetARNForChannelAndDistCategory = "GET_ARN_FOR_CHANNEL_DIST_CATEGORY";
        public const string SpGetChannelForARNAndDistributorCategory = "GET_CHANNEL_FOR_ARN_DISTRIBUTOR_CATEGORY";
        public const string SpGetChildARN = "GET_CHILD_ARN";
        public const string SpGetParentARN = "GET_PARENT_ARN";

        public const string SpGetSlab = "GET_SLAB";
        public const string SpGetSlabAvailable = "GET_SLAB_AVAILABILITY";

        public const string SpGetSIPSlab = "GET_SIP_SLAB";
        public const string SpGetSIPSlabAvailable = "GET_SIP_SLAB_AVAILABILITY";

        public const string SpGetSchemeCategory = "GET_SCHEME_CATEGORY";
        public const string SpGetScheme = "GET_SCHEME";
        public const string SpGetSchemeAndCategory = "GET_SCHEME_AND_CATEGORY";
        public const string SpGetAllScheme = "GET_ALL_SCHEMES";
        public const string SpGetChannel = "GET_CHANNEL";
        public const string SpGetCreateBaseRackRate = "GET_CREATE_BASE_RACK_RATE";
        public const string SpGetDiscardedQueue = "GET_DISCARDED_QUEUE";
        public const string SpGetUserMenuRights = "GET_USER_MENU_RIGHTS";
        public const string SpGetUserModuleMenu = "GET_USER_MODULE_MENU";
        public const string SpGetRemarksHistory = "GET_REMARKS_HISTORY";
        public const string SpGetModifiedRateHistory = "GET_MODIFIED_RATE_HISTORY";
        public const string SpGetMemoExists = "GET_MEMO_EXISTS";
        public const string SpGetSIPMemoExists = "GET_SIP_MEMO_EXISTS";
        public const string SpGetLinkedMemos = "GET_LINKED_MEMOS";

        public const string SpGetPaymentList = "GET_PAYMENT_LIST";
        public const string SpGetPaymentListWithInactive = "GET_PAYMENT_LIST_WITH_INACTIVE";
        public const string SpGetAuditPaymentList = "GET_AUDIT_PAYMENT_LIST";
        public const string SpGetAuditPaymentDetails = "GET_AUDIT_PAYMENT_DETAILS";
        public const string SpGetPaymentListTieup = "GET_PAYMENT_LIST_TIE_UP";
        public const string SpGetPaymentDetails = "GET_PAYMENT_DETAILS";
        public const string SpGetPaymentMemo = "GET_PAYMENT_MEMO";
        public const string SpGetPaymentListByScheme = "GET_PAYMENT_LIST_BY_SCHEME";
        public const string SpGetAvailableSchemeTieup = "GET_AVALIABLE_SCHEME_TIEUP";
        public const string SpGetPaymentListByARN = "GET_PAYMENT_LIST_BY_ARN";
        public const string SpGetPaymentDetailsByScheme = "GET_PAYMENT_DETAILS_BY_SCHEME";
        public const string SpGetExitLoad = "GET_EXIT_LOAD";
        public const string SpSaveBaseRackRate = "SAVE_BASE_RACK_RATE";
        public const string SpGetTieUpArnCategory = "GET_TIEUP_ARN_CATEGORY";
        public const string SpGetUserBasedOnRole = "GET_USER_BASED_ON_ROLE";
        public const string SpGetUserBasedOnUserID = "GET_USER_BASED_ON_USER_ID";
        public const string SpGetEmailofMemoModifiedUsers = "GET_EMAIL_MEMO_MODIFIED_USERS";
        public const string SpGetSkippedUsers = "GET_SKIPPED_USERS";
        public const string SpGetMemoForwardedToUserName = "GET_MEMO_FORWARDED_TO_NAME_ROLE";
        public const string SpGetRoleIdBasedOnUserID = "GET_ROLE_ID_ON_USER_ID";

        public const string SpUpdateBatchStatus = "UPDATE_BATCH_STATUS";
        public const string SpUpdateAssignToRole = "UPDATE_ASSIGN_TO_ROLE";
        public const string SpInsUpdPaymentMemoRemarks = "INS_UPD_PAYMENTMEMOREMARKS";

        public const string SpGetDistributorEmail = "GET_MEMO_DISTRIBUTOR_EMAIL";
        public const string SpUpdatePaymentMemoAssignTo = "UPDATE_PAYMENT_MEMO_ASSIGNED_TO";

        public const string SpGetNotificationMailContent = "GET_NOTIFICATION_MAIL_CONTENT";
        public const string SpGetCategoryArnforMemo = "GET_CATEGORY_ARN_PAYMENT_MEMO";
        // Tie Up Constants
        public const string SpSearchTieUp = "GET_SEARCH_TIEUP";
        public const string SpGetSchemeForArnCategory = "GET_SCHEME_FOR_ARN_CATEGORY";
        public const string SpValidateSchemeSlab = "VALIDATE_SCHEMES_SLAB_AMOUNT";
        public const string SpGetTieUpAuditPaymentList = "GET_TIEUP_AUDIT_PAYMENT_LIST";
        public const string SpGetTieUpAuditPaymentDetails = "GET_TIEUP_AUDIT_PAYMENT_DETAILS";
        public const string SpGetPaymentListForTieupOnCreate = "GET_PAYMENT_LIST_FOR_TIEUP_ON_CREATE";

        /// Ad Hoc Constants
        public const string SpGetMemoTypes = "GET_MEMOTYPES";
        public const string SpGetSubRegion = "GET_SUB_REGIONS";
        public const string SpGetAdHocDetails = "VIEW_ADHOC_PAYMENT_BY_MEMOID";
        public const string SpGetDuplicateAdHocDetails = "GET_DUPLICATE_ADHOC_PAYMENT";
        public const string SpGetAdHocPaymentDetails = "VIEW_ADHOC_PAYMENT";
        public const string SpInsertAdHocDetails = "INSERT_ADHOC_PAYMENT";
        public const string SpUpdateAdHocDetails = "UPDATE_ADHOC_PAYMENT";
        public const string SpDeleteAdHocDetails = "DELETE_ADHOC_PAYMENT";
        public const string SpUpdateAdHocPaymentList = "UPDATE_ADHOC_PAYMENT_LIST";
        public const string SpCreateAdHocBatchProcess = "CREATE_ADHOC_BATCH_STATUS";
        public const string SpGetAdHocBatchProcess = "VIEW_ADHOC_BATCH_PROCESS";
        public const string SpGetAuditPaymentProcess = "VIEW_AUDIT_PAYMENT_REMARKS";
        public const string SpGetDistributorAum = "GET_DISTRIBUTOR_AUM";
        public const string SpGetAdhocApproverMail = "GET_ADHOC_APPROVER_MAIL";
        

        ////////////////WORKFLOW/////////////////
        public const string SpGetWorkFlowHierarchy = "GET_WORKFLOWHIERARCHY";
        public const string SpGetViewAction = "GET_VIEW_ACTION";
        public const string SpGetMailingList = "VIEW_MAILING_LIST";
        public const string SpGetMemoDetails = "GET_PAYMENT_MEMO_DETAILS";

        ///////////////SIP/////////////////////
        public const string SpGetCreateSIP = "GET_CREATE_SIP";
        public const string SpGetPaymentListSIP = "GET_PAYMENT_LIST_SIP";
        public const string SpGetSIPModifiedRateHistory = "GET_SIP_MODIFIED_RATE_HISTORY";
        public const string SpGetSIPModifiedRateHistoryDetails = "GET_SIP_MODIFIED_RATE_HISTORY_DETAILS";
        public const string SpGetPaymentListALL = "GET_PAYMENT_LIST_ALL";
        public const string SpGetPaymentListForModifyValidity = "GET_PAYMENT_LIST_FOR_MODIFY_VALIDITY";

        ///////////////MASTER///////////////////
        public const string SpGetRole = "GET_ROLE";
        public const string SpGetDependentRole = "GET_DEPENDENT_ROLE";
        public const string SpInsertUpdateRole = "INSERT_UPDATE_ROLE";
        public const string SpDeleteRole = "DELETE_ROLE";

        public const string SpGetUserView = "GET_USER_VIEW";
        public const string SpGetMasterDistributorCategory = "GET_MASTER_DISTRIBUTORCATEGORY";
        public const string SpInsertUpdateDistributorCategory = "INSUPD_MASTER_DISTRIBUTORCATEGORY";
        public const string SpDeleteDistributorCategory = "DELETE_DISTRIBUTOR_CATEGORY";

        public const string SpGetMasterScheme = "GET_MASTER_SCHEME";
        public const string SpInsertUpdateUser = "INSUPD_MASTER_USER";
        public const string SpGetMasterRights = "GET_MASTER_RIGHTS";
        public const string SpInsertUpdatePasswordPolicy = "Insert_Update_PasswordPolicy";
        public const string SpGetMasterPasswordPolicy = "GET_PasswordPolicy";
        public const string SpGetzoneandregion = "GET_ZONEANDREGION";
        public const string SpGetBranchMaster = "GET_BranchMaster";

        public const string SpInsertUpdateBranchMaster = "INSUPD_BranchMaster";
        public const string SpInsertUpdateExitload = "INSUPD_ExitloadMaster";
        
        public const string SpGetMemoFormatType = "GET_MEMOFORMATTYPES_MASTER";

        public const string SpGetBrokerageNotes = "GET_BROKERAGENOTES";
        public const string SpInsertUpdateBrokerageNotes = "INSUPD_BrokerageNotes";
        public const string SpDeleteBrokerageNotes = "DELETE_BrokerageNotes";

        public const string SpGetSchemeModule = "GET_SCHEME_MODULE";
        public const string SpInsertUpdateSchemeModule = "INSUPD_SCHEME_MODULE";
        public const string SpDeleteSchemeModule = "DELETE_SCHEME_MODULE";

        public const string SpGetAccessMenu = "GET_AccessMenu";
        public const string SpGetAccessMatrix = "GET_AccessMatrix";

        public const string SpGetMemoParent = "GET_MemoParent";
        public const string SpGetListSearchColumns = "GET_LISTSEARCHCOLUMNS";
        public const string SpInsertRoleMaster = "INSERT_ROLE_MASTER";
        
        public const string SpGetDistributorEmailTo = "GET_DISTRIBUTOR_EMAIL";
        public const string SpGetMailingListMaster = "GET_MAILING_LIST_MASTER";
        public const string SpInsertUpdateMailingListMaster = "INSUPD_MAILING_LIST_MASTER";
        public const string SpInsertUpdateNotificationMailContent = "INSUPD_NOTIFICATIONMAILCONTENT";
        public const string SpDeleteMailingListMaster = "DELETE_MAILING_LIST_MASTER";
		public const string SpGetSmartSearchScreen = "GET_SMART_SEARCH";
        public const string SpGetSmartSearchFilterScreen = "GET_SMART_SEARCH_FILTER";
		public const string SpGetSearchUserLogs = "SEARCH_USER_LOGS";
		public const string SpGetCodeMaster = "GET_CODEMASTER";
		public const string SpGetApplicationLock = "GET_APPLICATIONLOCK";
        public const string SpUpdateApplicationLock = "UPDATE_APPLICATION_LOCK";
        public const string SpUpdateSchemeSequence = "UPDATE_SCHEME_SEQUENCE_LIST";
        public const string SpGetAdditionalNotes = "GET_ADDITIONAL_NOTES";
        public const string SpInsertUpdateExitLoadMaster = "INSUPD_EXIT_LOAD";

        public const string SpGetOfflineChats = "GET_OFFLINE_CHATS";
        public const string SpGetChatUsers = "GET_CHAT_USERS";
        public const string SpSaveChat = "SAVE_CHAT";
        public const string SpGetChatHistory = "GET_CHAT_HISTORY";
		///////////////OVERVIEW///////////////////
		public const string SpUpdateNotificationStatus = "UPDATE_NOTIFICATION_STATUS";
		public const string SpGetSubMenu = "GetSubMenu";
        public const string SpGetAuditMaster = "GET_MASTERAUDIT";
        public const string SpGetUnlockUsers = "GET_UNLOCKUSERS";
        public const string SpUpdateUnLockUsers = "UPDATE_UNLOCKUSERS";

        public const string SpGetDashboardOverview = "GET_DASHBOARD_OVERVIEW";
        public const string SpGetSelfInitiatedMemo = "GET_SELF_INITIATED_MEMO";
        public const string SpGetUndefinedStructure = "GET_UNDEFINED_STRUCTURE";
        public const string SpGetLoginAdministration = "GET_Login_Administration";
        #endregion

        public const string SpGetPaymentMemoNumber = "GET_PAYMENT_MEMO_NUMBER";
        public const string SpGetNotification = "GET_NOTIFICATION";

        public const string SpDeleteAllNotification = "DELETE_ALL_NOTIFICATION";
        public const string SpValidateBranchPaymentMemo = "VALIDATE_BRANCH_PAYMENT_MEMO";

        public const string SpGetAllDistributors = "GET_ALL_DISTRIBUTORS";
        public const string SpGetAllSubRegions = "GET_ALL_SUB_REGIONS";
        public const string SpGetAllDistributorCategories = "GET_ALL_DISTRIBUTOR_CATEGORIES";
        public const string SpInsertUpdateDistributor = "INSUPD_DISTRIBUTOR";
        public const string SpDeleteDistributorById = "DELETE_DISTRIBUTOR_BY_ID";


        ///////////////COPY OF EXIT LOAD/////////////
        public const string CopyOfExitLoad = "COPY_OF_EXITLOAD";
        public const string ValidateExitLoadScheme = "GET_MISSING_SCHEME_EXITLOADSCHEME";
        public const string SaveExitLoadChanges = "SAVE_EXITLOAD_CHANGES";

        //////////////EMAIL LOGGING/////////////////
        public const string EmailLogging = "EMAIL_LOG";
        public const string GetEmailLog = "GET_EMAIL_LOG";

        public const string spGetLumpsumsipType = "GET_LumpsumSIPType";
    }
}
