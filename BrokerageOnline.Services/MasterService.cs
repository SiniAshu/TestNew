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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "MasterService" in both code and config file together.
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class MasterService : IMasterService
    {
        public List<GetRoles> GetRoles(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetRoles(SearchText);
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<GetRoles> GetDependentRoles(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetDependentRoles(SearchText);
            }
            catch (Exception)
            {
                throw;
            }

        }

        public bool Insert_Update_Role(Roles InputData)
        {
            try
            {

                MasterBL bl = new MasterBL();
                return bl.Insert_Update_Role(InputData);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool DeleteRole(Int64 RoleSeqNo)
        {
            try
            {


                MasterBL bl = new MasterBL();
                return bl.DeleteRole(RoleSeqNo);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool DeleteUser(Int64 UserID)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.DeleteUser(UserID);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool DeleteBranch(Int64 BranchID)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.DeleteBranch(BranchID);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool DeleteDistributorCategory(Int64 DistributorCategoryId)
        {
            try
            {


                MasterBL bl = new MasterBL();
                return bl.DeleteDistributorCategory(DistributorCategoryId);

            }
            catch (Exception)
            {
                throw;
            }
        }


        public List<GetUsers> GetUserView(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetUserView(SearchText);
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<DistributorCategoryMaster> GetMasterDistributorCategory(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetMasterDistributorCategory(SearchText);
            }
            catch (Exception)
            {
                throw;
            }

        }

        public bool Insert_Update_Distributorcategory(DistributorCategoryMaster InputData)
        {
            try
            {

                MasterBL bl = new MasterBL();
                return bl.Insert_Update_Distributorcategory(InputData);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SchemeMaster> GetMasterScheme(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetMasterScheme(SearchText);
            }
            catch (Exception)
            {
                throw;
            }

        }

        public bool Insert_Update_User(UserMaster InputData, string Roledetails)
        {
            try
            {

                MasterBL bl = new MasterBL();
                return bl.Insert_Update_User(InputData, Roledetails);

            }
            catch (Exception)
            {
                throw;
            }
        }


        public List<RightsMaster> GetMasterRights(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetMasterRights(SearchText);
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<PasswordPolicy> GetPasswordPolicy(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetPasswordPolicy(SearchText);
            }
            catch (Exception)
            {
                throw;
            }

        }

        public bool Insert_Update_PasswordPolicy(PasswordPolicy InputData)
        {
            try
            {

                MasterBL bl = new MasterBL();
                return bl.Insert_Update_PasswordPolicy(InputData);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Zone> Getzoneandregion(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.Getzoneandregion(SearchText);
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<BranchMaster> GetBranchMaster(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetBranchMaster(SearchText);
            }
            catch (Exception)
            {
                throw; //
            }

        }

        public bool Insert_Update_BranchMaster(BranchMaster InputData)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.Insert_Update_BranchMaster(InputData);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Exit_Load> GetMasterExitLoad(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetMasterExitLoad(SearchText);
            }
            catch (Exception)
            {
                throw; //
            }

        }

        public bool Insert_Update_ExitLoad(Exit_Load InputData)
        {
            try
            {

                MasterBL bl = new MasterBL();
                return bl.Insert_Update_ExitLoad(InputData);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool DeleteExitLoad(Int64 ExitLoadID)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.DeleteExitLoad(ExitLoadID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<MemoFormatType> GetMemoTypes(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetMemoTypes(SearchText);
            }
            catch (Exception)
            {
                throw; //
            }

        }

        public List<BrokerageNotes> GetBrokerageNotes(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetBrokerageNotes(SearchText);
            }
            catch (Exception)
            {
                throw; //GetBrokerageNotes
            }

        }

        public string Insert_Update_BrokerageNotes(BrokerageNotes InputData)
        {
            try
            {

                MasterBL bl = new MasterBL();
                return bl.Insert_Update_BrokerageNotes(InputData);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool DeleteBrokerageNotes(Int64 NotesId)
        {
            try
            {


                MasterBL bl = new MasterBL();
                return bl.DeleteBrokerageNotes(NotesId);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SchemeModule> GetSchemeModule(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetSchemeModule(SearchText);
            }
            catch (Exception)
            {
                throw; //GetBrokerageNotes
            }

        }

        public bool Insert_Update_Scheme_module(SchemeModule InputData)
        {
            try
            {

                MasterBL bl = new MasterBL();
                return bl.Insert_Update_Scheme_module(InputData);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool DeleteSchemeModule(Int64 NotesId)
        {
            try
            {


                MasterBL bl = new MasterBL();
                return bl.DeleteSchemeModule(NotesId);

            }
            catch (Exception)
            {
                throw;
            }
        }


        public List<AccessMenu> GET_AccessMenu(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GET_AccessMenu(SearchText);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<AccessMatrix> GET_AccessMatrix(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GET_AccessMatrix(SearchText);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<MemoParent> GET_MemoParent(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GET_MemoParent(SearchText);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool SaveRoleInformation(Roles[] Roledetail, SaveRole[] RoleData)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.SaveRoleInformation(Roledetail.ToList().First(), RoleData.ToList());
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string SaveExitLoad(string SchemeCategory, string Scheme, Int64 ExitLoadId, string EffectiveDate, Exit_Load[] ExitLoadDetails, string ExitHoldingPeriod)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.SaveExitLoad(SchemeCategory, Scheme, ExitLoadId, EffectiveDate, ExitLoadDetails.ToList(), ExitHoldingPeriod);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SubMenu> GetSubmenu(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetSubmenu(SearchText);
            }
            catch (Exception)
            {
                throw; //
            }

        }

        public Object GetDistributorEmailTo(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                List<MailingList> dist_list = new List<MailingList>();
                dist_list = bl.GetDistributorEmailTo(SearchText);
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

        public List<MailingList> GetMailingListMaster(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetMailingListMaster(SearchText);
            }
            catch (Exception)
            {
                throw;
            }

        }
        public List<NotificationMailContent> GetNotificationMailContent(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetNotificationMailContent(SearchText);
            }
            catch (Exception)
            {
                throw;
            }

        }

        public bool Insert_Update_MailingList_Master(MailingList InputData, NotificationMailContent NotificationData)
        {
            try
            {

                MasterBL bl = new MasterBL();
                return bl.Insert_Update_MailingList_Master(InputData, NotificationData);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool DeleteMailingListMaster(Int64 MailingListId)
        {
            try
            {


                MasterBL bl = new MasterBL();
                return bl.DeleteMailingListMaster(MailingListId);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<CodeMaster> GetCodeMaster(string CodeType)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetCodeMaster(CodeType);
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<EmployeeLogs> SearchUserLogs(string UserIDs, string Status, string PeriodFrom, string PeriodTo, string IPAddress, string SearchFilter)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.SearchUserLogs(UserIDs, Status, PeriodFrom, PeriodTo, IPAddress, SearchFilter);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SmartSearchBO> GetSmartSearchScreen(string Channel, string DistributorCategory, string ARN, string SchemeCategory, string Scheme, string Zone, string Branch, string MemoType, string MemoStatus, string PeriodFrom, string PeriodTo, string CreatedBy, string SearchFilter)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetSmartSearchScreen(Channel, DistributorCategory, ARN, SchemeCategory, Scheme, Zone, Branch, MemoType, MemoStatus, PeriodFrom, PeriodTo, CreatedBy, SearchFilter);
            }
            catch (Exception)
            {
                throw; //GetBrokerageNotes
            }
        }

        public bool GenerateAuditMaster(AuditMasters[] InputData)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GenerateAuditMaster(InputData.ToList());
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<AuditMasters> GetAuditMaster(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetAuditMaster(SearchText);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<ApplicationLock> GetApplicationLock(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetApplicationLock(SearchText);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool UpdateApplicationLock(string Lock, string unlock, string ViewRoles, string LockNotes)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.UpdateApplicationLock(Lock, unlock, ViewRoles, LockNotes);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<UnlockUsers> GetUnlockUsers(string UserName, Int64 IsDisabled)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetUnlockUsers(UserName, IsDisabled);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool UpdateUnLockUsers(string Lock, string unlock, string reset)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.UpdateUnLockUsers(Lock, unlock, reset);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<DashboardOverview> GetDashboardOverview(string SearchText)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetDashboardOverview(SearchText);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<InitatedMemo> GetSelfInitiatedMemo(string SearchText, bool self)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetSelfInitiatedMemo(SearchText, self);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<DashboardOverview> GetUndefinedStructure(Int64 MemoTypeId, string StructureType)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetUndefinedStructure(MemoTypeId, StructureType);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<EmployeeLogs> LoginAdministration(string UserName, string SearchFilter)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.LoginAdministration(UserName, SearchFilter);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<ListSearchColumns> GetListSearchColumns(int ModuleID, string StoreProcedure)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetListSearchColumns(ModuleID, StoreProcedure);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool UpdateSchemeSequence(Scheme[] SchemeList, SchemeCategory[] SchemeCategoryList)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.UpdateSchemeSequence(SchemeList.ToList(), SchemeCategoryList.ToList());
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<Notification> GetNotification()
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetNotification();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string GetAdditionalNotes(Int64 MemoTypeID, string Channel, string DistributorCategory, string ARNNO)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.GetAdditionalNotes(MemoTypeID, Channel, DistributorCategory, ARNNO);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool DeleteAllNotifications(string SearchText)
        {
            try
            {


                MasterBL bl = new MasterBL();
                return bl.DeleteAllNotifications(SearchText);

            }
            catch (Exception)
            {
                throw;
            }
        }


        public List<ChatHistory> GetChatHistory(int SentFrom, int SentTo)
        {
            List<ChatHistory> listChat = new List<ChatHistory>();
            try
            {
                MasterBL bl = new MasterBL();
                listChat = bl.GetChatHistory(SentFrom, SentTo);
            }
            catch (Exception)
            {
                throw;
            }
            return listChat;
        }

        public bool SaveChat(ChatHistory chatHistory)
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.SaveChat(chatHistory);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string CopyOfExitLoad()
        {
            try
            {
                MasterBL bl = new MasterBL();
                return bl.CopyOfExitLoad();
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public List<Email> GetEmailLog()
        {
            List<Email> emailLogs = new List<Email>();
            try
            {
                EmailLog bl = new EmailLog();
                emailLogs = bl.GetEmailLog();
            }
            catch (Exception ex)
            {
                throw;
            }
            return emailLogs;
        }

        public List<DistributorMaster> GetAllDistributors()
        {
            List<DistributorMaster> DistributorList = new List<DistributorMaster>();
            try
            {
                DistirbutorBL bl = new DistirbutorBL();
                DistributorList = bl.GetAllDistributors();
            }
            catch (Exception ex)
            {
                throw;
            }
            return DistributorList;
        }

        public List<SubRegion> GetAllSubRegions()
        {
            List<SubRegion> subRegionList = new List<SubRegion>();
            try
            {
                DistirbutorBL bl = new DistirbutorBL();
                subRegionList = bl.GetAllSubReigons();
            }
            catch (Exception ex)
            {
                throw;
            }
            return subRegionList;
        }

        public List<DistributorCategory> GetAllDistributorCategories()
        {
            List<DistributorCategory> DistributorCategoryList = new List<DistributorCategory>();
            try
            {
                DistirbutorBL bl = new DistirbutorBL();
                DistributorCategoryList = bl.GetAllDistributorCategories();
            }
            catch (Exception ex)
            {
                throw;
            }
            return DistributorCategoryList;
        }

        public string InsertUpdateDistributor(DistributorMaster distributor)
        {
            string result = string.Empty;
            try
            {
                DistirbutorBL bl = new DistirbutorBL();
                result = bl.InsertUpdateDistributor(distributor);
            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }

        public string DeleteDistributorById(string distributorId)
        {
            string result = string.Empty;
            try
            {
                DistirbutorBL bl = new DistirbutorBL();
                result = bl.DeleteDistributorById(distributorId);
            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }

        public string ResentEmail(Email emailDetail)
        {
            string result = string.Empty;
            try
            {
                EmailLog bl = new EmailLog();
                result = bl.ResentEmail(emailDetail);
            }
            catch (Exception ex) { throw; }
            return result;
        }
    }
}