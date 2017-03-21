using BrokerageOnline.TransferObjects;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BrokerageOnline.DataAccess
{
    public class MasterDAL
    {
        private Database _db = DatabaseFactory.CreateDatabase(Constants.connection);
        Int64 LoginUserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);

        /// <summary>
        /// GetRoles
        /// </summary>
        /// <param name="SearchText"></param>
        /// <param name="error"></param>
        /// <returns>List<Roles></returns>
        public List<GetRoles> GetRoles(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<GetRoles> dataMapper = new DataMapper<GetRoles>(Constants.connection, Constants.SpGetRole);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// GetDependentRoles
        /// </summary>
        /// <param name="SearchText"></param>
        /// <param name="error"></param>
        /// <returns>List<Roles></returns>
        public List<GetRoles> GetDependentRoles(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<GetRoles> dataMapper = new DataMapper<GetRoles>(Constants.connection, Constants.SpGetDependentRole);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Insert_Update_Role
        /// </summary>
        /// <param name="InputData"></param>
        /// <param name="UserID"></param>
        /// <returns>bool</returns>
        public bool Insert_Update_Role(Roles InputData, Int64 UserID)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpInsertUpdateRole))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@RoleSeqNo";
                        parameter.Value = InputData.RoleSeqNo;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@RoleID";
                        parameter.Value = InputData.RoleId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@RoleName";
                        parameter.Value = InputData.RoleName;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Description";
                        parameter.Value = InputData.Description;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@IsActive";
                        parameter.Value = 1;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Rolefunction";
                        parameter.Value = InputData.Rolefunction;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@AccesssMatrix";
                        parameter.Value = InputData.AccesssMatrix;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        command.ExecuteScalar();
                        connection.Close();
                    }
                }
                return true;

            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// DeleteRole
        /// </summary>
        /// <param name="RoleSeqID"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public bool DeleteRole(Int64 RoleSeqNo, Int64 UserID)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpDeleteRole))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@RoleSeqNo";
                        parameter.Value = RoleSeqNo;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        command.ExecuteScalar();
                        connection.Close();
                    }
                }
                return true;

            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="RoleSeqNo"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public bool DeleteDistributorCategory(Int64 DistributorCategoryId, Int64 UserID)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpDeleteDistributorCategory))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@DistributorCategoryId";
                        parameter.Value = DistributorCategoryId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        command.ExecuteScalar();
                        connection.Close();
                    }
                }
                return true;

            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// GetRoles
        /// </summary>
        /// <param name="SearchText"></param>
        /// <param name="error"></param>
        /// <returns>List<Users></returns>
        public List<GetUsers> GetUserView(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<GetUsers> dataMapper = new DataMapper<GetUsers>(Constants.connection, Constants.SpGetUserView);
                return dataMapper.Search(SearchText, out error);

                //List<GetUsers> returnValue = new List<GetUsers>();
                //error = null;

                //try
                //{
                //    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetUserView))
                //    {
                //        using (DbConnection connection = _db.CreateConnection())
                //        {
                //            connection.Open();
                //            command.Connection = connection;

                //            var parameter = command.CreateParameter();
                //            parameter.ParameterName = "@username";
                //            parameter.Value = SearchText;
                //            command.Parameters.Add(parameter);

                //            using (IDataReader reader = command.ExecuteReader())
                //            {
                //                SqlDataReader dr = (SqlDataReader)reader;
                //                if (dr.HasRows)
                //                {
                //                    while (dr.Read())
                //                    {
                //                        GetUsers usr = new GetUsers();
                //                        usr.UserId = Convert.ToInt64(dr["UserId"]);
                //                        usr.DepartmentId = Convert.ToInt64(dr["DepartmentId"]);
                //                        usr.BranchId = Convert.ToInt64(dr["BranchId"]);
                //                        usr.BranchName = Convert.ToString(dr["BranchName"]);
                //                        usr.UserPass = Convert.ToInt64(dr["UserPass"]);
                //                        usr.AlternateId = Convert.ToInt64(dr["AlternateId"]);
                //                        usr.UserStatus = Convert.ToString(dr["UserStatus"]);
                //                        usr.FirstName = Convert.ToString(dr["FirstName"]);
                //                        usr.LastName = Convert.ToString(dr["LastName"]);
                //                        usr.Designation = Convert.ToString(dr["Designation"]);
                //                        usr.ReportingManagerName = Convert.ToString(dr["ReportingManagerName"]);
                //                        usr.ExpiresIn = Convert.ToInt64(dr["ExpiresIn"]);
                //                        usr.ChangePassword = Convert.ToBoolean(dr["ChangePassword"]);
                //                        usr.DateOfJoin = Convert.ToString(dr["DateOfJoin"]);
                //                        usr.DateOfLeave = Convert.ToString(dr["DateOfLeave"]);
                //                        usr.LastLogin = Convert.ToDateTime(dr["LastLogin"]);
                //                        usr.LastPasswordChanged = Convert.ToDateTime(dr["LastPasswordChanged"]);
                //                        usr.InvalidLoginAttempts = Convert.ToInt64(dr["InvalidLoginAttempts"]);
                //                        usr.LoginDisabled = Convert.ToBoolean(dr["LoginDisabled"]);
                //                        usr.Email = Convert.ToString(dr["Email"]);
                //                        usr.EmpCode = Convert.ToInt64(dr["EmpCode"]);
                //                        usr.LoginId = Convert.ToString(dr["LoginId"]);
                //                        usr.FullName = Convert.ToString(dr["FullName"]);
                //                        usr.EmployeeCode = Convert.ToString(dr["EmployeeCode"]);
                //                        usr.EmployeeId = Convert.ToInt64(dr["EmployeeId"]);
                //                        usr.RoleId = Convert.ToInt64(dr["RoleId"]);
                //                        usr.UserCode = Convert.ToString(dr["UserCode"]);
                //                        usr.ReportingUserId = Convert.ToInt64(dr["ReportingUserId"]);
                //                        usr.ReportingUserName = Convert.ToString(dr["ReportingUserName"]);
                //                        usr.SalesReportingManagerId = Convert.ToInt64(dr["SalesReportingManagerId"]);
                //                        usr.SalesReportingManagerName = Convert.ToString(dr["SalesReportingManagerName"]);
                //                        usr.RoleSeqNo = Convert.ToInt64(dr["RoleSeqNo"]);
                //                        usr.RoleName = Convert.ToString(dr["RoleName"]);
                //                        usr.RoleDescription = Convert.ToString(dr["RoleDescription"]);
                //                        usr.isActive = Convert.ToInt32(dr["isActive"]);
                //                        usr.CreatedByName = Convert.ToString(dr["CreatedByName"]);
                //                        usr.CreatedDate = Convert.ToString(dr["CreatedDate"]);
                //                        usr.ModifiedByName = Convert.ToString(dr["ModifiedByName"]);
                //                        usr.ModifiedDate = Convert.ToString(dr["ModifiedDate"]);

                //                        returnValue.Add(usr);
                //                    }
                //                }
                //            }
                //            connection.Close();
                //        }
                //    }
                //}
                //catch (InvalidOperationException invalid)
                //{
                //    error = invalid;
                //}
                //catch (Exception ex)
                //{
                //    error = ex;
                //}

                //return returnValue;
                ////return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<DistributorCategoryMaster> GetMasterDistributorCategory(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<DistributorCategoryMaster> dataMapper = new DataMapper<DistributorCategoryMaster>(Constants.connection, Constants.SpGetMasterDistributorCategory);
                return dataMapper.Search(SearchText, out error);
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
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpInsertUpdateDistributorCategory))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@DistributorCategoryId";
                        parameter.Value = InputData.DistributorCategoryId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@DistributorCategoryName";
                        parameter.Value = InputData.DistributorCategoryName;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@DistributorCategoryCode";
                        parameter.Value = InputData.DistributorCategoryCode;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Slab";
                        parameter.Value = InputData.Slab;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@SIPSlab";
                        parameter.Value = InputData.SIPSlab;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@IsActive";
                        parameter.Value = InputData.IsActive;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@EffectiveDate";
                        parameter.Value = DateTime.ParseExact(InputData.EffectiveDate.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
                        command.Parameters.Add(parameter);

                        command.ExecuteScalar();
                        connection.Close();
                    }
                }
                return true;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SchemeMaster> GetMasterScheme(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<SchemeMaster> dataMapper = new DataMapper<SchemeMaster>(Constants.connection, Constants.SpGetMasterScheme);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public bool Insert_Update_User(UserMaster InputData, string Roledetails, Int64 UserID)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpInsertUpdateUser))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserId";
                        parameter.Value = InputData.UserId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@LoginId";
                        parameter.Value = InputData.LoginId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@EmployeeId";
                        parameter.Value = InputData.EmployeeId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@EmployeeName";
                        parameter.Value = InputData.EmployeeName;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Role";
                        parameter.Value = InputData.Role;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Branch";
                        parameter.Value = InputData.Branch;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Supervisor";
                        parameter.Value = InputData.Supervisor;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Salesposition";
                        parameter.Value = InputData.Salesposition;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Phone";
                        parameter.Value = InputData.Phone;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Mobile";
                        parameter.Value = InputData.Mobile;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Email";
                        parameter.Value = InputData.Email;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Createdby";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@IsActive";
                        parameter.Value = InputData.IsActive;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Rolesdetails";
                        parameter.Value = Roledetails;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@EffectiveDate";
                        parameter.Value = DateTime.ParseExact(InputData.EffectiveDate.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@WorkflowReporting";
                        parameter.Value = InputData.WorkflowReporting;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@IsChat";
                        parameter.Value = InputData.IsChat;
                        command.Parameters.Add(parameter);

                        command.ExecuteScalar();
                        connection.Close();
                    }
                }
                return true;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<RightsMaster> GetMasterRights(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<RightsMaster> dataMapper = new DataMapper<RightsMaster>(Constants.connection, Constants.SpGetMasterRights);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PasswordPolicy> GetPasswordPolicy(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<PasswordPolicy> dataMapper = new DataMapper<PasswordPolicy>(Constants.connection, Constants.SpGetMasterPasswordPolicy);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Insert_Update_Role
        /// </summary>
        /// <param name="InputData"></param>
        /// <param name="UserID"></param>
        /// <returns>bool</returns>
        public bool Insert_Update_PasswordPolicy(PasswordPolicy InputData, Int64 UserID)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpInsertUpdatePasswordPolicy))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@PolicyId";
                        parameter.Value = InputData.PolicyId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@DisableAttemptCount";
                        parameter.Value = InputData.DisableAttemptCount;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ExpiryDays";
                        parameter.Value = InputData.ExpiryDays;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ExpirePromptDays";
                        parameter.Value = InputData.ExpirePromptDays;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MinLength";
                        parameter.Value = InputData.MinLength;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MaxCharacters";
                        parameter.Value = InputData.MaxCharacters;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MinCharacters";
                        parameter.Value = InputData.MinCharacters;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MinDigitCount";
                        parameter.Value = InputData.MinDigitCount;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MinUpperCaseCount";
                        parameter.Value = InputData.MinUpperCaseCount;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MinLowerCaseCount";
                        parameter.Value = InputData.MinLowerCaseCount;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MinSplCharCount";
                        parameter.Value = InputData.MinSplCharCount;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@HistoryNumber";
                        parameter.Value = InputData.HistoryNumber;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@DigitsCount";
                        parameter.Value = InputData.DigitsCount;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@CharsCount";
                        parameter.Value = InputData.CharsCount;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@PwdUIdSame";
                        parameter.Value = InputData.PwdUIdSame;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        command.ExecuteScalar();
                        connection.Close();
                    }
                }
                return true;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Zone> Getzoneandregion(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<Zone> dataMapper = new DataMapper<Zone>(Constants.connection, Constants.SpGetzoneandregion);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<BranchMaster> GetBranchMaster(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<BranchMaster> dataMapper = new DataMapper<BranchMaster>(Constants.connection, Constants.SpGetBranchMaster);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Insert_Update_BranchMaster(BranchMaster InputData, Int64 UserID)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpInsertUpdateBranchMaster))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@BranchId";
                        parameter.Value = InputData.BranchId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@BranchName";
                        parameter.Value = InputData.BranchName;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@RegionID";
                        parameter.Value = InputData.RegionID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ZoneId";
                        parameter.Value = InputData.ZoneId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@IsActive";
                        parameter.Value = InputData.IsActive;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@EffectiveDate";
                        parameter.Value = DateTime.ParseExact(InputData.EffectiveDate.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
                        command.Parameters.Add(parameter);

                        command.ExecuteScalar();
                        connection.Close();
                    }
                }
                return true;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Exit_Load> GetMasterExitLoad(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<Exit_Load> dataMapper = new DataMapper<Exit_Load>(Constants.connection, Constants.SpGetExitLoad);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Insert_Update_ExitLoad(Exit_Load InputData, Int64 UserID)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpInsertUpdateExitload))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@ExitLoadId";
                        parameter.Value = InputData.ExitLoadId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@SchemeCategoryId";
                        parameter.Value = InputData.SchemeCategoryId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@SchemeId";
                        parameter.Value = InputData.SchemeId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@HoldingPeriod";
                        parameter.Value = InputData.HoldingPeriod;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@PeriodSlab";
                        parameter.Value = InputData.PeriodSlab;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ExitLoad";
                        parameter.Value = InputData.ExitLoad;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@FundLevel";
                        parameter.Value = InputData.FundLevel;
                        command.Parameters.Add(parameter);


                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@IsActive";
                        parameter.Value = InputData.IsActive;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        command.ExecuteScalar();
                        connection.Close();
                    }
                }
                return true;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<MemoFormatType> GetMemoTypes(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<MemoFormatType> dataMapper = new DataMapper<MemoFormatType>(Constants.connection, Constants.SpGetMemoFormatType);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<BrokerageNotes> GetBrokerageNotes(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<BrokerageNotes> dataMapper = new DataMapper<BrokerageNotes>(Constants.connection, Constants.SpGetBrokerageNotes);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string Insert_Update_BrokerageNotes(BrokerageNotes InputData, Int64 UserID)
        {
            string Output = string.Empty;
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpInsertUpdateBrokerageNotes))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@NotesId";
                        parameter.Value = InputData.NotesId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@BrokerageNotes";
                        parameter.Value = InputData.BrkgNotes;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MemoTypeId";
                        parameter.Value = InputData.MemoTypeId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MemoFormatId";
                        parameter.Value = InputData.MemoFormatId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ChannelId";
                        parameter.Value = InputData.ChannelId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@DistributorCategoryId";
                        parameter.Value = InputData.DistributorCategoryId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@IsActive";
                        parameter.Value = 1;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@EffectiveDate";
                        parameter.Value = DateTime.ParseExact(InputData.EffectiveDate.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
                        command.Parameters.Add(parameter);

                        Output = Convert.ToString(command.ExecuteScalar());
                        connection.Close();
                    }
                }
                return Output;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool DeleteBrokerageNotes(Int64 NotesId, Int64 UserID)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpDeleteBrokerageNotes))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@NotesId";
                        parameter.Value = NotesId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        command.ExecuteScalar();
                        connection.Close();
                    }
                }
                return true;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SchemeModule> GetSchemeModule(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<SchemeModule> dataMapper = new DataMapper<SchemeModule>(Constants.connection, Constants.SpGetSchemeModule);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Insert_Update_Scheme_module(SchemeModule InputData, Int64 UserID)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpInsertUpdateSchemeModule))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@SchemeModuleId";
                        parameter.Value = InputData.SchemeModuleId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@SchemeId";
                        parameter.Value = InputData.SchemeId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ModuleId";
                        parameter.Value = InputData.ModuleId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@EffectiveDate";
                        parameter.Value = DateTime.ParseExact(InputData.EffectiveDate.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
                        command.Parameters.Add(parameter);

                        command.ExecuteScalar();
                        connection.Close();
                    }
                }
                return true;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool DeleteSchemeModule(Int64 ModuleId, Int64 UserID)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpDeleteSchemeModule))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@ModuleId";
                        parameter.Value = ModuleId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        command.ExecuteScalar();
                        connection.Close();
                    }
                }
                return true;

            }
            catch (Exception)
            {
                throw;
            }
        }


        public List<AccessMenu> GET_AccessMenu(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<AccessMenu> dataMapper = new DataMapper<AccessMenu>(Constants.connection, Constants.SpGetAccessMenu);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<AccessMatrix> GET_AccessMatrix(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<AccessMatrix> dataMapper = new DataMapper<AccessMatrix>(Constants.connection, Constants.SpGetAccessMatrix);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<MemoParent> GET_MemoParent(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<MemoParent> dataMapper = new DataMapper<MemoParent>(Constants.connection, Constants.SpGetMemoParent);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Int64 SaveRole(Roles Role, Int64 UserId, string _commandText)
        {
            try
            {
                Int64 RoleseqID = 0;
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpInsertRoleMaster))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@RoleID";
                        parameter.Value = Role.RoleId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@RoleName";
                        parameter.Value = Role.RoleName;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Description";
                        parameter.Value = Role.Description;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@CreatedBy";
                        parameter.Value = UserId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ModifiedBy";
                        parameter.Value = UserId;
                        command.Parameters.Add(parameter);

                        //parameter = command.CreateParameter();
                        //parameter.ParameterName = "@IsActive";
                        //parameter.Value = 1;
                        //command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@EffectiveDate";
                        parameter.Value = (Role.EffectiveDate == "" ? null : DateTime.ParseExact(Role.EffectiveDate.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture));
                        command.Parameters.Add(parameter);

                        RoleseqID = Convert.ToInt64(command.ExecuteScalar());
                        connection.Close();
                    }
                }
                return RoleseqID;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool ExecuteQuery(string _commandText)
        {
            try
            {
                using (DbCommand command = _db.GetSqlStringCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;
                        command.ExecuteNonQuery();
                        connection.Close();
                    }
                }
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Int64 SaveExitLoad(Int64 UserId, string _commandText)
        {
            try
            {
                Int64 ExitLoadID = 0;
                using (DbCommand command = _db.GetSqlStringCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserId";
                        parameter.Value = UserId;
                        command.Parameters.Add(parameter);

                        ExitLoadID = Convert.ToInt64(command.ExecuteScalar());
                        connection.Close();
                    }
                }
                return ExitLoadID;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SubMenu> GetSubmenu(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<SubMenu> dataMapper = new DataMapper<SubMenu>(Constants.connection, Constants.SpGetSubMenu);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<MailingList> GetDistributorEmailTo(string Searchtext, out Exception error)
        {
            try
            {
                List<MailingList> returnValue = new List<MailingList>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetDistributorEmailTo))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@Searchtext";
                            parameter.Value = Searchtext;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                SqlDataReader dr = (SqlDataReader)reader;
                                if (dr.HasRows)
                                {
                                    while (dr.Read())
                                    {
                                        MailingList dist = new MailingList();
                                        dist.MailingListId = Convert.ToInt64(dr["Id"]);
                                        dist.Email = Convert.ToString(dr["EmailId"]);
                                        returnValue.Add(dist);
                                    }
                                }
                            }
                            connection.Close();
                        }
                    }
                }
                catch (InvalidOperationException invalid)
                {
                    error = invalid;
                }
                catch (Exception ex)
                {
                    error = ex;
                }

                return returnValue;
                //return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<MailingList> GetMailingListMaster(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<MailingList> dataMapper = new DataMapper<MailingList>(Constants.connection, Constants.SpGetMailingListMaster);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<NotificationMailContent> GetNotificationMailContent(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<NotificationMailContent> dataMapper = new DataMapper<NotificationMailContent>(Constants.connection, Constants.SpGetNotificationMailContent);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public bool Insert_Update_MailingList_Master(MailingList InputData, NotificationMailContent NotificationData, Int64 UserID)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpInsertUpdateMailingListMaster))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@MailingListId";
                        parameter.Value = InputData.MailingListId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ListName";
                        parameter.Value = InputData.ListName;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Description";
                        parameter.Value = InputData.Description;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@EmailTo";
                        parameter.Value = InputData.EmailTo;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@EmailCC";
                        parameter.Value = InputData.EmailCC;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@EmailBCC";
                        parameter.Value = InputData.EmailBCC;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@IsActive";
                        parameter.Value = InputData.IsActive;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@EffectiveDate";
                        parameter.Value = DateTime.ParseExact(InputData.EffectiveDate.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
                        command.Parameters.Add(parameter);

                        //object objListId = (int)command.ExecuteScalar();
                        if (InputData.MailingListId <= 0)
                            NotificationData.MailingListId = Convert.ToInt64(command.ExecuteScalar());
                        else
                            NotificationData.MailingListId = InputData.MailingListId;


                        using (DbCommand notificationcommand = _db.GetStoredProcCommand(Constants.SpInsertUpdateNotificationMailContent))
                        {
                            notificationcommand.Connection = connection;
                            parameter = notificationcommand.CreateParameter();
                            parameter.ParameterName = "@MailingListId";
                            parameter.Value = NotificationData.MailingListId;
                            notificationcommand.Parameters.Add(parameter);
                            
                            notificationcommand.Connection = connection;
                            parameter = notificationcommand.CreateParameter();
                            parameter.ParameterName = "@Mail_Subject";
                            parameter.Value = NotificationData.Subject;
                            notificationcommand.Parameters.Add(parameter);

                            parameter = notificationcommand.CreateParameter();
                            parameter.ParameterName = "@Mail_Body";
                            parameter.Value = NotificationData.Body;
                            notificationcommand.Parameters.Add(parameter);

                            parameter = notificationcommand.CreateParameter();
                            parameter.ParameterName = "@UserId";
                            parameter.Value = UserID;
                            notificationcommand.Parameters.Add(parameter);

                            notificationcommand.ExecuteScalar();

                            connection.Close();
                        }
                    }
                }
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool DeleteMailingListMaster(Int64 MailingListId, Int64 UserID)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpDeleteMailingListMaster))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@MailingListId";
                        parameter.Value = MailingListId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        command.ExecuteScalar();
                        connection.Close();
                    }
                }
                return true;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SmartSearchBO> GetSmartSearchScreen(string Channel, string DistributorCategory, string ARN, string SchemeCategory, string Scheme, string Zone, string Branch, string MemoType, string MemoStatus, string PeriodFrom, string PeriodTo, string CreatedBy, string SearchFilter, out Exception error)
        {
            try
            {
                List<SmartSearchBO> returnValue = new List<SmartSearchBO>();
                error = null;
                try
                {
                    string SmartSearchProcedure = "";
                    if (Channel.Length > 0 || DistributorCategory.Length > 0 || ARN.Length > 0 || SchemeCategory.Length > 0 || Scheme.Length > 0 || Zone.Length > 0 || Branch.Length > 0 || MemoType.Length > 0 || MemoStatus.Length > 0 || PeriodFrom.Length > 0 || PeriodTo.Length > 0 || CreatedBy.Length > 0 || SearchFilter.Length > 0)
                    {
                        SmartSearchProcedure = Constants.SpGetSmartSearchFilterScreen;
                    }
                    else
                    {
                        SmartSearchProcedure = Constants.SpGetSmartSearchScreen;                        
                    }
                    using (DbCommand command = _db.GetStoredProcCommand(SmartSearchProcedure))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;
                            command.CommandTimeout = 0;
                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@Channel";
                            parameter.Value = Channel;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@DistributorCategory";
                            parameter.Value = DistributorCategory;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@ARN";
                            parameter.Value = ARN;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SchemeCategory";
                            parameter.Value = SchemeCategory;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Scheme";
                            parameter.Value = Scheme;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Zone";
                            parameter.Value = Zone;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Branch";
                            parameter.Value = Branch;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@MemoType";
                            parameter.Value = MemoType;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@MemoStatus";
                            parameter.Value = MemoStatus;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PeriodFrom";
                            parameter.Value = (PeriodFrom == "" ? null : DateTime.ParseExact(PeriodFrom.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture));
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PeriodTo";
                            parameter.Value = (PeriodTo == "" ? null : DateTime.ParseExact(PeriodTo.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture));
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@CreatedBy";
                            parameter.Value = CreatedBy;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SearchFilter";
                            parameter.Value = SearchFilter;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@LoginUserID";
                            parameter.Value = LoginUserId;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = _db.ExecuteReader(command))
                            {
                                while (reader.Read())
                                {
                                    SmartSearchBO temp = new SmartSearchBO();
                                    //temp.SerialNo = Convert.ToInt64(reader["SerialNo"]);
                                    temp.MemoNumber = reader["MemoNumber"].ToString();
                                    temp.MemoStatusName = reader["MemoStatus"].ToString();
                                    temp.MemoTypeName = reader["MemoType"].ToString();
                                    temp.PaymentMemoId = Convert.ToInt32(reader["PaymentMemoId"]);
                                    temp.PaymentListId = Convert.ToInt32(reader["PaymentListId"]);
                                    temp.MemoTypeId = Convert.ToInt32(reader["MemoTypeId"]);
                                    temp.AdhocBatchID = Convert.ToInt32(reader["AdhocBatchID"]);
                                    temp.RaisedByName = reader["CreatedBy"].ToString();
                                    temp.SchemeCategoryName = reader["SchemeCategory"].ToString();
                                    temp.SchemeName = reader["Scheme"].ToString();
                                    temp.SubRegionName = reader["Branch"].ToString();
                                    temp.ZoneName = reader["Zone"].ToString();
                                    temp.ARNName = reader["ARNName"].ToString();
                                    temp.ARNNo = reader["ARNNo"].ToString();
                                    temp.ChannelName = reader["Channel"].ToString();
                                    temp.DateFrom = reader["DateFrom"].ToString();
                                    temp.DateTo = reader["DateTo"].ToString();
                                    temp.DistributorCategoryName = reader["DistributorCategory"].ToString();

                                    returnValue.Add(temp);
                                }
                            }
                            connection.Close();
                        }
                    }
                }
                catch (InvalidOperationException invalid)
                {
                    error = invalid;
                }
                catch (Exception ex)
                {
                    error = ex;
                }
                return returnValue;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<AuditMasters> GetAuditMaster(string SearchText, out Exception error)
        {
            try
            {
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                //SearchText = Convert.ToString(UserId);
                List<AuditMasters> returnValue = new List<AuditMasters>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetAuditMaster))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@SearchText";
                            parameter.Value = SearchText;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                SqlDataReader dr = (SqlDataReader)reader;
                                if (dr.HasRows)
                                {
                                    while (dr.Read())
                                    {
                                        AuditMasters aud = new AuditMasters();
                                        aud.UserId = Convert.ToInt64(dr["EmpID"]);
                                        aud.LoginId = Convert.ToString(dr["UserName"]);
                                        aud.Branch = Convert.ToString(dr["Branch"]);
                                        aud.IpAddress = Convert.ToString(dr["IPAddress"]);
                                        aud.EmployeeName = Convert.ToString(dr["EmployeeName"]);
                                        aud.ActionType = Convert.ToString(dr["Action"]);
                                        aud.ScreenName = Convert.ToString(dr["Masters"]);
                                        aud.ReferenceId = Convert.ToString(dr["ReferenceID"]);
                                        aud.FieldName = Convert.ToString(dr["FieldName"]);
                                        aud.OldValue = Convert.ToString(dr["PreviousValue"]);
                                        aud.NewValue = Convert.ToString(dr["NewValue"]);
                                        aud.ModifiedDate = Convert.ToString(dr["Date_Time"]);
                                        returnValue.Add(aud);
                                    }
                                }
                            }
                            connection.Close();
                        }
                    }
                }
                catch (InvalidOperationException invalid)
                {
                    error = invalid;
                }
                catch (Exception ex)
                {
                    error = ex;
                }

                return returnValue;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<ApplicationLock> GetApplicationLock(string SearchText, out Exception error)
        {
            try
            {
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                List<ApplicationLock> returnValue = new List<ApplicationLock>();
                error = null;


                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetApplicationLock))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@SearchText";
                        parameter.Value = SearchText;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            SqlDataReader dr = (SqlDataReader)reader;
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    ApplicationLock aud = new ApplicationLock();
                                    aud.RoleSeqNo = Convert.ToInt64(dr["RoleSeqNo"]);
                                    aud.RoleId = Convert.ToInt64(dr["RoleId"]);
                                    aud.RoleName = Convert.ToString(dr["RoleName"]);
                                    aud.Description = Convert.ToString(dr["Description"]);
                                    aud.isActive = Convert.ToBoolean(dr["isActive"]);
                                    aud.isLocked = Convert.ToBoolean(dr["isLocked"]);
                                    aud.IsView = Convert.ToBoolean(dr["IsView"]);
                                    aud.ChangeText = Convert.ToString(dr["ChangeText"]);
                                    aud.CurrentStatus = Convert.ToString(dr["CurrentStatus"]);
                                    aud.LockNotes = Convert.ToString(dr["LockNotes"]);
                                    returnValue.Add(aud);
                                }
                            }
                        }
                        connection.Close();
                    }
                }


                return returnValue;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool UpdateApplicationLock(string Lock, string unlock, string ViewRoles, string LockNotes, Int64 UserID)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpUpdateApplicationLock))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserId";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Lock";
                        parameter.Value = Lock;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UnLock";
                        parameter.Value = unlock;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ViewRoles";
                        parameter.Value = ViewRoles;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@LockNotes";
                        parameter.Value = LockNotes;
                        command.Parameters.Add(parameter);

                        command.ExecuteScalar();
                        connection.Close();
                    }
                }
                return true;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<CodeMaster> GetCodeMaster(string CodeType, out Exception error)
        {
            try
            {
                DataMapper<CodeMaster> dataMapper = new DataMapper<CodeMaster>(Constants.connection, Constants.SpGetCodeMaster);
                return dataMapper.Search(CodeType, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<EmployeeLogs> SearchUserLogs(string UserIDs, string Status, string PeriodFrom, string PeriodTo, string IPAddress, string SearchFilter, out Exception error)
        {
            try
            {
                List<EmployeeLogs> returnValue = new List<EmployeeLogs>();
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetSearchUserLogs))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@UserIDs";
                            parameter.Value = UserIDs;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Status";
                            parameter.Value = Status;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@IPAddress";
                            parameter.Value = IPAddress;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PeriodFrom";
                            parameter.Value = (PeriodFrom == "" ? null : DateTime.ParseExact(PeriodFrom.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture));
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PeriodTo";
                            parameter.Value = (PeriodTo == "" ? null : DateTime.ParseExact(PeriodTo.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture));
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SearchFilter";
                            parameter.Value = SearchFilter;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = _db.ExecuteReader(command))
                            {
                                while (reader.Read())
                                {
                                    EmployeeLogs temp = new EmployeeLogs();
                                    temp.EmployeeID = Convert.ToInt32(reader["EmpID"]);
                                    temp.EmployeeName = reader["EmployeeName"].ToString();
                                    temp.UserLogin = reader["UserName"].ToString();
                                    temp.IPAddress = reader["IPAddress"].ToString();
                                    temp.SubRegionName = reader["Branch"].ToString();
                                    temp.LoggedOutUser = reader["LoggedOutBy"].ToString();
                                    temp.StatusName = reader["Status"].ToString();
                                    temp.LoggedInTime_str = (reader["Login"]).ToString();
                                    temp.LoggedOutTime_str = (reader["LogOut"]).ToString();
                                    temp.LastAccessedTime_str = (reader["LastAccessed"]).ToString();
                                    returnValue.Add(temp);
                                }
                            }
                            connection.Close();
                        }
                    }
                }
                catch (InvalidOperationException invalid)
                {
                    error = invalid;
                }
                catch (Exception ex)
                {
                    error = ex;
                }
                return returnValue;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<UnlockUsers> GetUnlockUsers(string UserName, Int64 IsDisabled, out Exception error)
        {
            try
            {
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                //SearchText = Convert.ToString(UserId);
                List<UnlockUsers> returnValue = new List<UnlockUsers>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetUnlockUsers))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@UserName";
                            parameter.Value = UserName;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@IsDisbled";
                            parameter.Value = IsDisabled;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                SqlDataReader dr = (SqlDataReader)reader;
                                if (dr.HasRows)
                                {
                                    while (dr.Read())
                                    {
                                        UnlockUsers aud = new UnlockUsers();
                                        aud.UserId = Convert.ToInt64(dr["UserId"]);
                                        aud.LoginId = Convert.ToString(dr["LoginId"]);
                                        aud.EmployeeName = Convert.ToString(dr["EmployeeName"]);
                                        aud.IsActive = Convert.ToInt64(dr["isActive"]);
                                        aud.EmployeeName = Convert.ToString(dr["EmployeeName"]);
                                        aud.LoginDisabled = Convert.ToInt64(dr["LoginDisabled"]);
                                        aud.ActiveStatus = Convert.ToInt64(dr["ActiveStatus"]);
                                        aud.ChangeText = Convert.ToString(dr["ChangeText"]);
                                        aud.CurrentStatus = Convert.ToString(dr["CurrentStatus"]);
                                        aud.Reset = Convert.ToInt64(dr["Reset"]);
                                        returnValue.Add(aud);
                                    }
                                }
                            }
                            connection.Close();
                        }
                    }
                }
                catch (InvalidOperationException invalid)
                {
                    error = invalid;
                }
                catch (Exception ex)
                {
                    error = ex;
                }

                return returnValue;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool UpdateUnLockUsers(string Lock, string unlock, string reset, Int64 UserID)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpUpdateUnLockUsers))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserId";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Lock";
                        parameter.Value = Lock;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UnLock";
                        parameter.Value = unlock;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Reset";
                        parameter.Value = reset;
                        command.Parameters.Add(parameter);

                        command.ExecuteScalar();
                        connection.Close();
                    }
                }
                return true;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<DashboardOverview> GetDashboardOverview(string SearchText, out Exception error)
        {
            try
            {
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                //SearchText = Convert.ToString(UserId);
                List<DashboardOverview> returnValue = new List<DashboardOverview>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetDashboardOverview))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@USERID";
                            parameter.Value = UserId;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                SqlDataReader dr = (SqlDataReader)reader;
                                if (dr.HasRows)
                                {
                                    while (dr.Read())
                                    {
                                        DashboardOverview aud = new DashboardOverview();
                                        aud.MemoTypeId = Convert.ToInt64(dr["MemoTypeId"]);
                                        aud.MemoTypeName = Convert.ToString(dr["MemoTypeName"]);
                                        aud.CurrentCategoryWiseCount = Convert.ToInt64(dr["CurrentCategoryWiseCount"]);
                                        aud.CurrentARNSpecificCount = Convert.ToInt64(dr["CurrentARNSpecificCount"]);
                                        aud.CurrentTotal = Convert.ToInt64(dr["CurrentTotal"]);
                                        aud.UndefinedCategoryWiseCount = Convert.ToInt64(dr["UndefinedCategoryWiseCount"]);
                                        aud.UndefinedARNSpecific = Convert.ToInt64(dr["UndefinedARNSpecific"]);
                                        aud.PreviousCategoryWiseCount = Convert.ToInt64(dr["PreviousCategoryWiseCount"]);
                                        aud.PreviousARNSpecificCount = Convert.ToInt64(dr["PreviousARNSpecificCount"]);
                                        aud.PreviousTotal = Convert.ToInt64(dr["PreviousTotal"]);
                                        returnValue.Add(aud);
                                    }
                                }
                            }
                            connection.Close();
                        }
                    }
                }
                catch (InvalidOperationException invalid)
                {
                    error = invalid;
                }
                catch (Exception ex)
                {
                    error = ex;
                }

                return returnValue;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<InitatedMemo> GetSelfInitiatedMemo(string SearchText, bool self, out Exception error)
        {
            try
            {
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                //SearchText = Convert.ToString(UserId);
                List<InitatedMemo> returnValue = new List<InitatedMemo>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetSelfInitiatedMemo))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@USERID";
                            parameter.Value = UserId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Self";
                            parameter.Value = self;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                SqlDataReader dr = (SqlDataReader)reader;
                                if (dr.HasRows)
                                {
                                    while (dr.Read())
                                    {
                                        InitatedMemo aud = new InitatedMemo();
                                        aud.MemoTypeId = Convert.ToInt64(dr["MemoTypeId"]);
                                        aud.MemoTypeName = Convert.ToString(dr["MemoTypeName"]);
                                        aud.Initiated = Convert.ToInt64(dr["Initiated"]);
                                        aud.Reviewed = Convert.ToInt64(dr["Reviewed"]);
                                        aud.Approved = Convert.ToInt64(dr["Approved"]);
                                        aud.Discarded = Convert.ToInt64(dr["Discarded"]);
                                        returnValue.Add(aud);
                                    }
                                }
                            }
                            connection.Close();
                        }
                    }
                }
                catch (InvalidOperationException invalid)
                {
                    error = invalid;
                }
                catch (Exception ex)
                {
                    error = ex;
                }

                return returnValue;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<DashboardOverview> GetUndefinedStructure(Int64 MemoTypeId, string StructureType, out Exception error)
        {
            try
            {
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                //SearchText = Convert.ToString(UserId);
                List<DashboardOverview> returnValue = new List<DashboardOverview>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetUndefinedStructure))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@UserId";
                            parameter.Value = UserId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@MemoTypeID";
                            parameter.Value = MemoTypeId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@StructureType";
                            parameter.Value = StructureType;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                SqlDataReader dr = (SqlDataReader)reader;
                                if (dr.HasRows)
                                {
                                    while (dr.Read())
                                    {
                                        DashboardOverview aud = new DashboardOverview();
                                        aud.Value = Convert.ToString(dr["Value"]);
                                        returnValue.Add(aud);
                                    }
                                }
                            }
                            connection.Close();
                        }
                    }
                }
                catch (InvalidOperationException invalid)
                {
                    error = invalid;
                }
                catch (Exception ex)
                {
                    error = ex;
                }

                return returnValue;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<EmployeeLogs> LoginAdministration(string UserName, string SearchFilter, out Exception error)
        {
            try
            {
                List<EmployeeLogs> returnValue = new List<EmployeeLogs>();
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetLoginAdministration))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@UserName";
                            parameter.Value = UserName;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SearchFilter";
                            parameter.Value = SearchFilter;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = _db.ExecuteReader(command))
                            {
                                while (reader.Read())
                                {
                                    EmployeeLogs temp = new EmployeeLogs();
                                    temp.EmployeeLogID = Convert.ToInt32(reader["ID"]);
                                    temp.EmployeeID = Convert.ToInt32(reader["UserId"]);

                                    temp.EmployeeName = reader["UserName"].ToString();
                                    temp.UserLogin = reader["LoginID"].ToString();
                                    temp.IPAddress = reader["IPAddress"].ToString();
                                    temp.LoggedInTime_str = (reader["LoginTime"]).ToString();
                                    temp.LastAccessedTime_str = (reader["LastAccessTime"]).ToString();
                                    returnValue.Add(temp);
                                }
                            }
                            connection.Close();
                        }
                    }
                }
                catch (InvalidOperationException invalid)
                {
                    error = invalid;
                }
                catch (Exception ex)
                {
                    error = ex;
                }
                return returnValue;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<ListSearchColumns> GetListSearchColumns(int ModuleID, string StoreProcedure, out Exception error)
        {
            try
            {
                List<ListSearchColumns> returnValue = new List<ListSearchColumns>();
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetListSearchColumns))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@ModuleID";
                            parameter.Value = ModuleID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@StoreProcedure";
                            parameter.Value = StoreProcedure;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = _db.ExecuteReader(command))
                            {
                                returnValue = Conversion.ConvertDataReaderToList<ListSearchColumns>(reader);
                            }
                            connection.Close();
                        }
                    }
                }
                catch (InvalidOperationException invalid)
                {
                    error = invalid;
                }
                catch (Exception ex)
                {
                    error = ex;
                }
                return returnValue;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool UpdateSchemeSequence(List<Scheme> SchemeList, List<SchemeCategory> SchemeCategoryList, out Exception error)
        {
            bool returnValue = false;
            try
            {
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpUpdateSchemeSequence))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@SchemeSequenceList";
                            parameter.Value = Conversion.ConvertCollectionToXML(SchemeList);
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SchemeCategorySequenceList";
                            parameter.Value = Conversion.ConvertCollectionToXML(SchemeCategoryList);
                            command.Parameters.Add(parameter);

                            command.ExecuteNonQuery();
                            connection.Close();
                            returnValue = true;
                        }
                    }
                }
                catch (InvalidOperationException invalid)
                {
                    error = invalid;
                    returnValue = false;
                }
                catch (Exception ex)
                {
                    error = ex;
                    returnValue = false;
                }
                return returnValue;
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
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                List<Notification> returnValue = new List<Notification>();
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetNotification))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserId";
                        parameter.Value = UserId;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            SqlDataReader dr = (SqlDataReader)reader;
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    Notification aud = new Notification();
                                    aud.NotificationId = Convert.ToInt64(dr["NotificationId"]);
                                    aud.NotificationTo = Convert.ToString(dr["NotificationTo"]);
                                    aud.NotificationMessage = Convert.ToString(dr["NotificationMessage"]);
                                    aud.NotificationContent = Convert.ToString(dr["NotificationContent"]);
                                    aud.MemoId = Convert.ToInt64(dr["MemoId"]);
                                    aud.CreatedBy = Convert.ToString(dr["CreatedBy"]);
                                    DateTime date = (DateTime)reader["CreatedDate"];
                                    aud.CreatedDate = date.ToString("dd MMM yyyy", CultureInfo.CreateSpecificCulture("en-US"));
                                    aud.CreatedTime = date.ToString("hh:mm tt", CultureInfo.InvariantCulture);
                                    returnValue.Add(aud);
                                }
                            }
                        }
                        connection.Close();
                    }
                }

                return returnValue;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string GetAdditionalNotes(long MemoTypeID, string Channel, string DistributorCategory, string ARNNO, out Exception error)
        {
            string Output = string.Empty;
            try
            {
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetAdditionalNotes))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@MemoTypeID";
                            parameter.Value = MemoTypeID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Channel";
                            parameter.Value = Channel;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@DistributorCategory";
                            parameter.Value = DistributorCategory;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@ARNNO";
                            parameter.Value = ARNNO;
                            command.Parameters.Add(parameter);

                            Output = Convert.ToString(command.ExecuteScalar());
                            connection.Close();
                        }
                    }
                }
                catch (InvalidOperationException invalid)
                {
                    error = invalid;
                }
                catch (Exception ex)
                {
                    error = ex;
                }
                return Output;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool DeleteAllNotifications(Int64 UserID)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpDeleteAllNotification))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        command.ExecuteScalar();
                        connection.Close();
                    }
                }
                return true;

            }
            catch (Exception)
            {
                throw;
            }
        }


        public string Inser_Update_ExitLoad(string SchemeCategory, string Scheme, Int64 ExitLoadId, string EffectiveDate, List<Exit_Load> ExitLoadDetail, string ExitHoldingPeriod, out Exception error)
        {
            string Output = string.Empty;
            try
            {
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpInsertUpdateExitLoadMaster))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@ExitLoadDetail";
                            parameter.Value = Conversion.ConvertCollectionToXML(ExitLoadDetail);
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@ExitLoadID";
                            parameter.Value = ExitLoadId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@UserID";
                            parameter.Value = LoginUserId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Scheme";
                            parameter.Value = Scheme;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@ExitHoldingPeriod";
                            parameter.Value = ExitHoldingPeriod;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@EffectiveDate";
                            parameter.Value = (EffectiveDate == "" ? null : DateTime.ParseExact(EffectiveDate.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture));
                            command.Parameters.Add(parameter);

                            Output = command.ExecuteScalar().ToString();
                            connection.Close();
                        }
                    }
                }
                catch (InvalidOperationException invalid)
                {
                    error = invalid;
                }
                catch (Exception ex)
                {
                    error = ex;
                }
                return Output;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string CopyOfExitLoad()
        {
            string Output = string.Empty;
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.CopyOfExitLoad))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@ReturnMessage";
                        parameter.Value = string.Empty;
                        parameter.Direction = System.Data.ParameterDirection.Output;
                        parameter.DbType = System.Data.DbType.String;
                        parameter.Size = 50;
                        command.Parameters.Add(parameter);

                        command.ExecuteScalar();

                        Output = Convert.ToString(parameter.Value);

                        connection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                Output = ex.Message;
            }
            return Output;
        }

        public List<ChatHistory> GetChatHistory(int SentFrom, int SentTo, out Exception error)
        {
            List<ChatHistory> listChat = new List<ChatHistory>();
            var Output = string.Empty;
            error = null;
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetChatHistory))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@SENT_FROM";
                        parameter.Value = SentFrom;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@SENT_TO";
                        parameter.Value = SentTo;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {

                            SqlDataReader dr = (SqlDataReader)reader;
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    ChatHistory chatObj = new ChatHistory();
                                    chatObj.Message = (string)dr["Message"];
                                    chatObj.ChatDate = Convert.ToString(dr["Chat_Date"]);
                                    listChat.Add(chatObj);
                                }
                            }
                        }
                        connection.Close();
                    }
                }
            }
            catch (InvalidOperationException invalid)
            {
                error = invalid;
            }
            catch (Exception ex)
            {
                error = ex;
            }

            return listChat;
        }

    }
}