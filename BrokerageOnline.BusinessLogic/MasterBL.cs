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
    public class MasterBL
    {
        string UserSessionId = SessionObject.sessionValue;

        public List<GetRoles> GetRoles(string SearchText)
        {
            List<GetRoles> DistCategory = new List<GetRoles>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.GetRoles(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<GetRoles> GetDependentRoles(string SearchText)
        {
            List<GetRoles> DistCategory = new List<GetRoles>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.GetDependentRoles(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Insert_Update_Role(Roles InputData)
        {
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {

                    MasterDAL dal = new MasterDAL();
                    return dal.Insert_Update_Role(InputData, Convert.ToInt64(HttpContext.Current.Session["userid"]));
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

        public bool DeleteRole(Int64 RoleSeqNo)
        {
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {

                    MasterDAL dal = new MasterDAL();
                    return dal.DeleteRole(RoleSeqNo, Convert.ToInt64(HttpContext.Current.Session["userid"]));
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


        public bool DeleteBranch(Int64 BranchID)
        {
            try
            {
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                if (UserId != 0)
                {
                    MasterDAL dal = new MasterDAL();
                    string DeleteBranchQuery = @"UPDATE SubRegion SET IsActive = 0 , ModifiedOn = GETDATE(),ModifiedBy = " + UserId + " WHERE SubRegionId = " + BranchID;

                    return dal.ExecuteQuery(DeleteBranchQuery);
                }
                else
                {
                    Exception ex = new Exception("Invalid User ID. Please Login Again");
                    throw ex;
                }
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
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                if (UserId != 0)
                {
                    MasterDAL dal = new MasterDAL();
                    string DeleteUserQuery = @"UPDATE Users SET IsActive = 0 , ModifiedDate = GETDATE(),ModifiedBy = " + UserId + " WHERE UserId = " + UserID;

                    return dal.ExecuteQuery(DeleteUserQuery);
                }
                else
                {
                    Exception ex = new Exception("Invalid User ID. Please Login Again");
                    throw ex;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool DeleteDistributorCategory(Int64 DistributorCategoryId)
        {
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {

                    MasterDAL dal = new MasterDAL();
                    return dal.DeleteDistributorCategory(DistributorCategoryId, Convert.ToInt64(HttpContext.Current.Session["userid"]));
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

        public List<GetUsers> GetUserView(string SearchText)
        {
            List<GetUsers> DistCategory = new List<GetUsers>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.GetUserView(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }


        public List<DistributorCategoryMaster> GetMasterDistributorCategory(string SearchText)
        {
            List<DistributorCategoryMaster> DistCategory = new List<DistributorCategoryMaster>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.GetMasterDistributorCategory(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Insert_Update_Distributorcategory(DistributorCategoryMaster InputData)
        {
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {

                    MasterDAL dal = new MasterDAL();
                    return dal.Insert_Update_Distributorcategory(InputData);
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

        public List<SchemeMaster> GetMasterScheme(string SearchText)
        {
            List<SchemeMaster> DistCategory = new List<SchemeMaster>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.GetMasterScheme(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Insert_Update_User(UserMaster InputData, string Roledetails)
        {
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {

                    MasterDAL dal = new MasterDAL();
                    return dal.Insert_Update_User(InputData, Roledetails, Convert.ToInt64(HttpContext.Current.Session["userid"]));
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

        public List<RightsMaster> GetMasterRights(string SearchText)
        {
            List<RightsMaster> DistCategory = new List<RightsMaster>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.GetMasterRights(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PasswordPolicy> GetPasswordPolicy(string SearchText)
        {
            List<PasswordPolicy> DistCategory = new List<PasswordPolicy>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.GetPasswordPolicy(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Insert_Update_PasswordPolicy(PasswordPolicy InputData)
        {
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {

                    MasterDAL dal = new MasterDAL();
                    return dal.Insert_Update_PasswordPolicy(InputData, Convert.ToInt64(HttpContext.Current.Session["userid"]));
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

        public List<Zone> Getzoneandregion(string SearchText)
        {
            List<Zone> DistCategory = new List<Zone>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.Getzoneandregion(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<BranchMaster> GetBranchMaster(string SearchText)
        {
            List<BranchMaster> DistCategory = new List<BranchMaster>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.GetBranchMaster(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Insert_Update_BranchMaster(BranchMaster InputData)
        {
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {

                    MasterDAL dal = new MasterDAL();
                    return dal.Insert_Update_BranchMaster(InputData, Convert.ToInt64(HttpContext.Current.Session["userid"]));
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


        public List<Exit_Load> GetMasterExitLoad(string SearchText)
        {
            List<Exit_Load> DistCategory = new List<Exit_Load>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.GetMasterExitLoad(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Insert_Update_ExitLoad(Exit_Load InputData)
        {
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {

                    MasterDAL dal = new MasterDAL();
                    return dal.Insert_Update_ExitLoad(InputData, Convert.ToInt64(HttpContext.Current.Session["userid"]));
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

        public bool DeleteExitLoad(Int64 ExitLoadID)
        {
            try
            {
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                if (UserId != 0)
                {
                    MasterDAL dal = new MasterDAL();
                    string DeleteExitLoadQuery = @"UPDATE ExitLoadScheme SET IsActive = 0  WHERE ExitLoadId = " + ExitLoadID;
                    return dal.ExecuteQuery(DeleteExitLoadQuery);
                }
                else
                {
                    Exception ex = new Exception("Invalid User ID. Please Login Again");
                    throw ex;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }


        public List<MemoFormatType> GetMemoTypes(string SearchText)
        {
            List<MemoFormatType> DistCategory = new List<MemoFormatType>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.GetMemoTypes(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<BrokerageNotes> GetBrokerageNotes(string SearchText)
        {
            List<BrokerageNotes> DistCategory = new List<BrokerageNotes>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.GetBrokerageNotes(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string Insert_Update_BrokerageNotes(BrokerageNotes InputData)
        {
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {

                    MasterDAL dal = new MasterDAL();
                    return dal.Insert_Update_BrokerageNotes(InputData, Convert.ToInt64(HttpContext.Current.Session["userid"]));
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return string.Empty;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool DeleteBrokerageNotes(Int64 NotesId)
        {
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {

                    MasterDAL dal = new MasterDAL();
                    return dal.DeleteBrokerageNotes(NotesId, Convert.ToInt64(HttpContext.Current.Session["userid"]));
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

        public bool DeleteAllNotifications(string SearchText)
        {
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {

                    MasterDAL dal = new MasterDAL();
                    return dal.DeleteAllNotifications(Convert.ToInt64(HttpContext.Current.Session["userid"]));
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

        public List<SchemeModule> GetSchemeModule(string SearchText)
        {
            List<SchemeModule> DistCategory = new List<SchemeModule>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.GetSchemeModule(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Insert_Update_Scheme_module(SchemeModule InputData)
        {
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {

                    MasterDAL dal = new MasterDAL();
                    return dal.Insert_Update_Scheme_module(InputData, Convert.ToInt64(HttpContext.Current.Session["userid"]));
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

        public bool DeleteSchemeModule(Int64 NotesId)
        {
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {

                    MasterDAL dal = new MasterDAL();
                    return dal.DeleteSchemeModule(NotesId, Convert.ToInt64(HttpContext.Current.Session["userid"]));
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


        public List<AccessMenu> GET_AccessMenu(string SearchText)
        {
            List<AccessMenu> DistCategory = new List<AccessMenu>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.GET_AccessMenu(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }


        public List<AccessMatrix> GET_AccessMatrix(string SearchText)
        {
            List<AccessMatrix> DistCategory = new List<AccessMatrix>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.GET_AccessMatrix(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<MemoParent> GET_MemoParent(string SearchText)
        {
            List<MemoParent> DistCategory = new List<MemoParent>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.GET_MemoParent(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }


        public bool SaveRoleInformation(Roles Roledetail, List<SaveRole> RoleData)
        {
            try
            {
                if (Roledetail.RoleSeqNo == 0)
                {
                    InsertRole(Roledetail, RoleData);
                }
                else
                {
                    UpdateRoles(Roledetail, RoleData);
                }
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        private void InsertRole(Roles Roledetail, List<SaveRole> RoleData)
        {
            try
            {
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                if (UserId != 0)
                {
                    MasterDAL dal = new MasterDAL();
                    string RoleInsertQuery = @"INSERT INTO [Roles] ([RoleId],[RoleName],[isActive],[Description],[CreatedBy],[CreatedDate],[ModifiedBy],[ModifiedDate],[EffectiveDate])
			                                    VALUES (@RoleID,@RoleName,1,@Description,@CreatedBy,GETDATE(),@ModifiedBy,GETDATE(),@EffectiveDate)" +
                                                    "  SELECT SCOPE_IDENTITY()";

                    Int64 Roleseqid = dal.SaveRole(Roledetail, UserId, RoleInsertQuery);
                    if (Roleseqid > 0)
                    {
                        if (Roledetail.RoleId == 0)
                        {
                            RoleInsertQuery = "UPDATE Roles set RoleId=" + Roleseqid + " where RoleSeqNo=" + Roleseqid;
                            dal.ExecuteQuery(RoleInsertQuery);
                        }
                        InsertRoleDetails(Roleseqid, RoleData);
                    }
                    else
                    {
                        Exception ex = new Exception("Duplicate Role Exists already.");
                        throw ex;
                    }
                }
                else
                {
                    Exception ex = new Exception("Invalid User ID. Please Login Again");
                    throw ex;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        private void InsertRoleDetails(Int64 Roleseqid, List<SaveRole> RoleData)
        {
            try
            {
                MasterDAL dal = new MasterDAL();
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                string RoleDetailsQuery = "";
                foreach (SaveRole det in RoleData)
                {
                    if (det.ModuleId == 7)
                    {
                        RoleDetailsQuery += @"INSERT INTO [RoleAccess]([RoleSeqId],[ModuleId],[MenuId],[SubMenuId],[ViewAccess],[EditAccess],
                                        [CopyAccess],[DeleteAccess],[IsActive],[CreatedBy],[CreatedDate],[ModifiedBy],[ModifiedDate])
                                        VALUES (" + Roleseqid + "," + det.ModuleId + @"," + det.MenuId + @"," + det.MenuId + "," + det.ViewAccess + @"," + det.EditAccess + @",
                                        " + det.CopyAccess + @"," + det.DeleteAccess + @",1," + UserId + ",GETDATE()," + UserId + ",GETDATE())";
                    }
                    else
                    {
                        RoleDetailsQuery += @"INSERT INTO [RoleAccess]([RoleSeqId],[ModuleId],[MenuId],[ViewAccess],[EditAccess],
                                        [CopyAccess],[DeleteAccess],[IsActive],[CreatedBy],[CreatedDate],[ModifiedBy],[ModifiedDate])
                                        VALUES (" + Roleseqid + "," + det.ModuleId + @"," + det.MenuId + @"," + det.ViewAccess + @"," + det.EditAccess + @",
                                        " + det.CopyAccess + @"," + det.DeleteAccess + @",1," + UserId + ",GETDATE()," + UserId + ",GETDATE())";
                    }
                }
                RoleDetailsQuery += @" UPDATE ra SET  MenuId = sm. AccessMenuId FROM RoleAccess ra JOIN SubMenu sm ON sm.SubMenuId=ra.SubMenuId WHERE ra.RoleSeqId=" + Roleseqid + " and ModuleId=7";
                if (RoleDetailsQuery != "")
                    dal.ExecuteQuery(RoleDetailsQuery);

            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Update Base Rack Rate
        /// </summary>
        /// <param name="Memo"></param>
        /// <param name="List"></param>
        /// <param name="Details"></param>
        private void UpdateRoles(Roles Roledetail, List<SaveRole> RoleData)
        {
            try
            {
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                if (UserId != 0)
                {
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    string Roleupdatequery = @"UPDATE [Roles] SET [RoleId] =" + Roledetail.RoleId + ",[RoleName] = '" + Roledetail.RoleName + @"'
			                                ,[isActive] = '" + Roledetail.isActive + @"',[Description] = '" + Roledetail.Description + @"',[ModifiedBy] = " + UserId + @"
			                                ,[ModifiedDate] = GETDATE(),[EffectiveDate]= Convert(date, '" + Roledetail.EffectiveDate + "' , 3) WHERE RoleSeqNo = " + Roledetail.RoleSeqNo + "";
                    dal.ExecuteQuery(Roleupdatequery);
                    Int64 Rolesequenceno = Convert.ToInt64(Roledetail.RoleSeqNo); //dal.SavePaymentMemo(Memo, UserId, PaymentMemoInsertQuery);

                    //////DELETE EXISTING LIST AND DETAILS/////
                    string DeleteListQuery = "";
                    DeleteListQuery += "DELETE FROM RoleAccess WHERE RoleSeqId = " + Rolesequenceno;
                    dal.ExecuteQuery(DeleteListQuery);
                    ////Insert List And Details////
                    InsertRoleDetails(Rolesequenceno, RoleData);
                }
                else
                {
                    Exception ex = new Exception("Invalid User ID. Please Login Again");
                    throw ex;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// Exit Load Starts //////

        public string SaveExitLoad(string SchemeCategory, string Scheme, Int64 ExitLoadId, string EffectiveDate, List<Exit_Load> ExitLoadDetail, string ExitHoldingPeriod)
        {
            MasterDAL dal = new MasterDAL();
            string returnvalue = string.Empty;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;

                    returnvalue = dal.Inser_Update_ExitLoad(SchemeCategory, Scheme, ExitLoadId, EffectiveDate, ExitLoadDetail, ExitHoldingPeriod, out error);

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


            //try
            //{
            //    if (ExitLoadId == 0)
            //    {
            //        InsertExitLoad(SchemeCategory, Scheme, EffectiveDate, ExitLoadDetail);
            //    }
            //    else
            //    {
            //        UpdateExitLoad(SchemeCategory, Scheme, ExitLoadId, EffectiveDate, ExitLoadDetail);
            //    }


            //    return true;
            //}
            //catch (Exception)
            //{
            //    throw;
            //}
        }

        private void InsertExitLoad(string SchemeCategory, string Scheme, string EffectiveDate, List<Exit_Load> ExitLoadDetail)
        {
            try
            {
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                if (UserId != 0)
                {
                    MasterDAL dal = new MasterDAL();
                    string ExitLoadInsertQuery = @"INSERT INTO [ExitLoad] ([CreatedBy],[CreatedDate],[EffectiveDate])
			                                        VALUES (@UserId,GETDATE(),Convert(date, '" + EffectiveDate + "' , 3)) " +
                                                    "  SELECT SCOPE_IDENTITY()";

                    Int64 ExitLoadid = dal.SaveExitLoad(UserId, ExitLoadInsertQuery);
                    InsertExitLoadScheme(SchemeCategory, Scheme, ExitLoadid);
                    InsertExitLoadDetails(ExitLoadid, ExitLoadDetail);
                }
                else
                {
                    Exception ex = new Exception("Invalid User ID. Please Login Again");
                    throw ex;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        private void InsertExitLoadScheme(string SchemeCategory, string Scheme, Int64 ExitLoadId)
        {
            try
            {
                MasterDAL dal = new MasterDAL();
                string ExitLoadSchemeQuery = "";
                string[] schemevalues = Scheme.Split(',');

                string DeleteSchemeQuery = "";
                DeleteSchemeQuery += "DELETE FROM ExitLoadScheme WHERE ExitLoadId = " + ExitLoadId;
                dal.ExecuteQuery(DeleteSchemeQuery);

                foreach (string schemeid in schemevalues)
                {
                    ExitLoadSchemeQuery += @"INSERT INTO [ExitLoadScheme] ([ExitLoadId],[SchemeCategoryId],[SchemeId],[IsActive],[FundLevel])
                                              VALUES (" + ExitLoadId + ",' ','" + schemeid + @"',1,'') ";
                }
                ExitLoadSchemeQuery += @" UPDATE es SET  SchemeCategoryId = sm.SchemeCategoryId FROM ExitLoadScheme es JOIN Scheme sm ON sm.SchemeId=es.SchemeId
                                        WHERE es.ExitLoadId=" + ExitLoadId;
                if (ExitLoadSchemeQuery != "")
                    dal.ExecuteQuery(ExitLoadSchemeQuery);

            }
            catch (Exception)
            {

                throw;
            }
        }

        private void InsertExitLoadDetails(Int64 ExitLoadid, List<Exit_Load> ExitLoadDetail)
        {
            try
            {
                MasterDAL dal = new MasterDAL();
                string ExitLoadDetailsQuery = "";
                string DeleteListQuery = "";
                DeleteListQuery += "DELETE FROM ExitLoadDetails WHERE ExitLoadId = " + ExitLoadid;
                dal.ExecuteQuery(DeleteListQuery);
                foreach (Exit_Load det in ExitLoadDetail)
                {
                    ExitLoadDetailsQuery += @"INSERT INTO [ExitLoadDetails] ([ExitLoadId],[HoldingPeriod],[ExitLoad],[PeriodSlab],[Others])
                                              VALUES (" + ExitLoadid + ",N'" + det.HoldingPeriod + @"',N'" + det.ExitLoad + @"',N'" + det.PeriodSlab + @"',N'" + det.Others + @"')";
                }
                if (ExitLoadDetailsQuery != "")
                    dal.ExecuteQuery(ExitLoadDetailsQuery);
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Update Base Rack Rate
        /// </summary>
        /// <param name="Memo"></param>
        /// <param name="List"></param>
        /// <param name="Details"></param>
        private void UpdateExitLoad(string SchemeCategory, string Scheme, Int64 ExitLoadId, string EffectiveDate, List<Exit_Load> ExitLoadDetail)
        {
            try
            {
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                if (UserId != 0)
                {
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    string ExitLoadQuery = " UPDATE ExitLoad SET  EffectiveDate = Convert(date, '" + EffectiveDate + "' , 3)  WHERE ExitLoadId=" + ExitLoadId;
                    if (ExitLoadQuery != "")
                        dal.ExecuteQuery(ExitLoadQuery);

                    InsertExitLoadScheme(SchemeCategory, Scheme, ExitLoadId);
                    ////Insert List And Details////
                    InsertExitLoadDetails(ExitLoadId, ExitLoadDetail);
                }
                else
                {
                    Exception ex = new Exception("Invalid User ID. Please Login Again");
                    throw ex;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<SubMenu> GetSubmenu(string SearchText)
        {
            List<SubMenu> DistCategory = new List<SubMenu>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.GetSubmenu(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<MailingList> GetDistributorEmailTo(string Searchtext)
        {
            List<MailingList> Dist = new List<MailingList>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    Dist = dal.GetDistributorEmailTo(Searchtext, out error);
                    if (error == null)
                        return Dist;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Dist;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// GetMailingListMaster
        /// </summary>
        /// <param name="SearchText"></param>
        /// <returns></returns>
        public List<MailingList> GetMailingListMaster(string SearchText)
        {
            List<MailingList> DistCategory = new List<MailingList>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.GetMailingListMaster(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Insert_Update_MailingList_Master(MailingList InputData, NotificationMailContent NotificationData)
        {
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {

                    MasterDAL dal = new MasterDAL();
                    return dal.Insert_Update_MailingList_Master(InputData, NotificationData, Convert.ToInt64(HttpContext.Current.Session["userid"]));
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


        public List<SmartSearchBO> GetSmartSearchScreen(string Channel, string DistributorCategory, string ARN, string SchemeCategory, string Scheme, string Zone, string Branch, string MemoType, string MemoStatus, string PeriodFrom, string PeriodTo, string CreatedBy, string SearchFilter)
        {
            List<SmartSearchBO> SmartSearch = new List<SmartSearchBO>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    SmartSearch = dal.GetSmartSearchScreen(Channel, DistributorCategory, ARN, SchemeCategory, Scheme, Zone, Branch, MemoType, MemoStatus, PeriodFrom, PeriodTo, CreatedBy, SearchFilter, out error);
                    if (error == null)
                        return SmartSearch;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return SmartSearch;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }


        public bool DeleteMailingListMaster(Int64 MailingListId)
        {
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {

                    MasterDAL dal = new MasterDAL();
                    return dal.DeleteMailingListMaster(MailingListId, Convert.ToInt64(HttpContext.Current.Session["userid"]));
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


        public bool GenerateAuditMaster(List<AuditMasters> InputData)
        {
            try
            {
                string hostName = Dns.GetHostName();
                string myIP = Dns.GetHostByName(hostName).AddressList[0].ToString();
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                MasterDAL dal = new MasterDAL();
                string GenerateAuditMasterQuery = "";
                foreach (AuditMasters det in InputData)
                {
                    GenerateAuditMasterQuery += @"INSERT INTO [AuditMasters] ([ScreenName],[UserId],[IpAddress]
                                                    ,[ActionType],[ReferenceId],[FieldName],[OldValue],[NewValue],[ModifiedDate]) 
                                                    Values ('" + det.ScreenName + "'," + UserId + ",'" + myIP + @"','" + det.ActionType + @"'
                                                    ,'" + det.ReferenceId + "','" + det.FieldName + "','" + det.OldValue + "','" + det.NewValue + "',GETDATE())";
                }
                if (GenerateAuditMasterQuery != "")
                    dal.ExecuteQuery(GenerateAuditMasterQuery);
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<AuditMasters> GetAuditMaster(string SearchText)
        {
            List<AuditMasters> Dist = new List<AuditMasters>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    Dist = dal.GetAuditMaster(SearchText, out error);
                    if (error == null)
                        return Dist;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Dist;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<ApplicationLock> GetApplicationLock(string SearchText)
        {
            List<ApplicationLock> Dist = new List<ApplicationLock>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    Dist = dal.GetApplicationLock(SearchText, out error);
                    if (error == null)
                        return Dist;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Dist;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool UpdateApplicationLock(string Lock, string unlock, string ViewRoles, string LockNotes)
        {
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {

                    MasterDAL dal = new MasterDAL();
                    return dal.UpdateApplicationLock(Lock, unlock, ViewRoles, LockNotes, Convert.ToInt64(HttpContext.Current.Session["userid"]));
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

        public List<CodeMaster> GetCodeMaster(string CodeType)
        {
            List<CodeMaster> CodeMaster = new List<CodeMaster>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    CodeMaster = dal.GetCodeMaster(CodeType, out error);
                    if (error == null)
                        return CodeMaster;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return CodeMaster;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<EmployeeLogs> SearchUserLogs(string UserIDs, string Status, string PeriodFrom, string PeriodTo, string IPAddress, string SearchFilter)
        {
            List<EmployeeLogs> EmployeeLogsBO = new List<EmployeeLogs>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    EmployeeLogsBO = dal.SearchUserLogs(UserIDs, Status, PeriodFrom, PeriodTo, IPAddress, SearchFilter, out error);
                    if (error == null)
                        return EmployeeLogsBO;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return EmployeeLogsBO;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }


        public List<UnlockUsers> GetUnlockUsers(string UserName, Int64 IsDisabled)
        {
            List<UnlockUsers> Dist = new List<UnlockUsers>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    Dist = dal.GetUnlockUsers(UserName, IsDisabled, out error);
                    if (error == null)
                        return Dist;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Dist;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool UpdateUnLockUsers(string Lock, string unlock, string reset)
        {
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {

                    MasterDAL dal = new MasterDAL();
                    return dal.UpdateUnLockUsers(Lock, unlock, reset, Convert.ToInt64(HttpContext.Current.Session["userid"]));
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

        public List<DashboardOverview> GetDashboardOverview(string SearchText)
        {
            List<DashboardOverview> Dist = new List<DashboardOverview>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    Dist = dal.GetDashboardOverview(SearchText, out error);
                    if (error == null)
                        return Dist;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Dist;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<InitatedMemo> GetSelfInitiatedMemo(string SearchText, bool self)
        {
            List<InitatedMemo> Dist = new List<InitatedMemo>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    Dist = dal.GetSelfInitiatedMemo(SearchText, self, out error);
                    if (error == null)
                        return Dist;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Dist;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<DashboardOverview> GetUndefinedStructure(Int64 MemoTypeId, string StructureType)
        {
            List<DashboardOverview> Dist = new List<DashboardOverview>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    Dist = dal.GetUndefinedStructure(MemoTypeId, StructureType, out error);
                    if (error == null)
                        return Dist;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Dist;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<EmployeeLogs> LoginAdministration(string UserName, string SearchFilter)
        {
            List<EmployeeLogs> EmployeeLogsBO = new List<EmployeeLogs>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    EmployeeLogsBO = dal.LoginAdministration(UserName, SearchFilter, out error);
                    if (error == null)
                        return EmployeeLogsBO;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return EmployeeLogsBO;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<ListSearchColumns> GetListSearchColumns(int ModuleID, string StoreProcedure)
        {
            List<ListSearchColumns> ListSearchColumnsBO = new List<ListSearchColumns>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    ListSearchColumnsBO = dal.GetListSearchColumns(ModuleID, StoreProcedure, out error);
                    if (error == null)
                        return ListSearchColumnsBO;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return ListSearchColumnsBO;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool UpdateSchemeSequence(List<Scheme> SchemeList, List<SchemeCategory> SchemeCategoryList)
        {
            bool ObjResult = false;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    ObjResult = dal.UpdateSchemeSequence(SchemeList, SchemeCategoryList, out error);
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

        public List<Notification> GetNotification()
        {
            List<Notification> Dist = new List<Notification>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    Dist = dal.GetNotification();
                    if (error == null)
                        return Dist;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Dist;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<NotificationMailContent> GetNotificationMailContent(string SearchText)
        {
            List<NotificationMailContent> DistCategory = new List<NotificationMailContent>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    DistCategory = dal.GetNotificationMailContent(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string GetAdditionalNotes(long MemoTypeID, string Channel, string DistributorCategory, string ARNNO)
        {
            string Output = "";
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    Output = dal.GetAdditionalNotes(MemoTypeID, Channel, DistributorCategory, ARNNO, out error);
                    if (error == null)
                        return Output;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Output;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<UserDetail> GetChatUsers()
        {
            List<UserDetail> chatUsers = new List<UserDetail>();

            try
            {
                Exception error = null;
                ChatDataAccess dal = new ChatDataAccess();
                chatUsers = dal.GetChatUsers(out error);
                if (error == null)
                    return chatUsers;
                else
                    throw error;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<ChatHistory> GetOfflineChats(int SentTo)
        {
            List<ChatHistory> chatHistory = new List<ChatHistory>();
            try
            {
                Exception error = null;
                ChatDataAccess dal = new ChatDataAccess();
                chatHistory = dal.GetOfflineChats(SentTo, out error);
                if (error == null)
                    return chatHistory;
                else
                    throw error;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool SaveChat(ChatHistory chatHistory)
        {
            bool result = true;
            try
            {
                Exception error = null;
                ChatDataAccess chatDAL = new ChatDataAccess();
                result = chatDAL.SaveChat(chatHistory);
                if (error == null)
                    return result;
                else
                    throw error;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public List<ChatHistory> GetChatHistory(int SentFrom, int SentTo)
        {
            List<ChatHistory> chatHistory = new List<ChatHistory>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    MasterDAL dal = new MasterDAL();
                    chatHistory = dal.GetChatHistory(SentFrom, SentTo, out error);
                    if (error == null)
                        return chatHistory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return chatHistory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string CopyOfExitLoad()
        {
            string Message;
            try
            {
                MasterDAL dal = new MasterDAL();
                Message = dal.CopyOfExitLoad();
            }
            catch (Exception ex)
            {
                Message = ex.Message;
            }
            return Message;
        }
    }
}