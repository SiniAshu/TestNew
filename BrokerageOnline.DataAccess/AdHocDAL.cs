using BrokerageOnline.TransferObjects;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Globalization;
using System.Web;

namespace BrokerageOnline.DataAccess
{
    public class AdHocDAL
    {
        private Database _db = DatabaseFactory.CreateDatabase(Constants.connection);
        Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);

        #region Get and Search Methods

        public List<MemoType> GetMemoTypes(int MemoParentID, out Exception error)
        {
            try
            {
                List<MemoType> returnValue = new List<MemoType>();
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetMemoTypes))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@MemoParentId";
                            parameter.Value = MemoParentID;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = _db.ExecuteReader(command))
                            {
                                while (reader.Read())
                                {
                                    MemoType temp = new MemoType();
                                    temp.MemoTypeId = Convert.ToInt64(reader["MemoTypeId"]);
                                    temp.MemoParentId = Convert.ToInt64(reader["MemoParentId"]);
                                    temp.MemoTypeName = reader["MemoTypeName"].ToString();
                                    temp.MemoTypeStatus = reader["MemoTypeStatus"].ToString();
                                    temp.IsActive = true;
                                    temp.CreatedBy = 0;
                                    temp.CreatedDate = DateTime.Now;
                                    temp.ModifiedBy = 0;
                                    temp.ModifiedDate = DateTime.Now;

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

        public List<SubRegion> GetSubRegion(out Exception error)
        {
            try
            {
                List<SubRegion> returnValue = new List<SubRegion>();
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetSubRegion))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@UserID";
                            parameter.Value = UserId;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = _db.ExecuteReader(command))
                            {
                                returnValue = Conversion.ConvertDataReaderToList<SubRegion>(reader);
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

        public List<AdHocSearchResults> GetAdHocDetails(int PaymentTypeID, string AdhocStatus, int AdhocBatchID, int CreatedByID, string SearchFilter, out Exception error)
        {
            try
            {
                List<AdHocSearchResults> returnValue = new List<AdHocSearchResults>();
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetAdHocDetails))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@PaymentTypeID";
                            parameter.Value = PaymentTypeID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@AdhocStatus";
                            parameter.Value = AdhocStatus;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@AdhocBatchID";
                            parameter.Value = AdhocBatchID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@CreatedByID";
                            parameter.Value = UserId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SearchFilter";
                            parameter.Value = SearchFilter;
                            command.Parameters.Add(parameter);


                            //using (IDataReader reader = _db.ExecuteReader(command))
                            //{
                            //    returnValue = Conversion.ConvertDataReaderToList<AdHocSearchResults>(reader);
                            //}

                            using (IDataReader reader = _db.ExecuteReader(command))
                            {
                                while (reader.Read())
                                {
                                    AdHocSearchResults temp = new AdHocSearchResults();
                                    temp.SerialNo = Convert.ToInt32(reader["SerialNo"]);
                                    temp.PaymentMemoId = Convert.ToInt32(reader["PaymentMemoId"]);
                                    temp.PaymentListId = Convert.ToInt32(reader["PaymentListId"]);
                                    temp.SchemeId = Convert.ToInt32(reader["SchemeId"]);
                                    temp.SchemeName = reader["Scheme"].ToString();
                                    temp.ARNNo = reader["ARNNo"].ToString();
                                    temp.ARNName = reader["ARNName"].ToString();
                                    temp.DateFrom = reader["DateFrom"].ToString();
                                    temp.DateTo = reader["DateTo"].ToString();
                                    temp.PaymentAmount = reader["PaymentAmount"].ToString();
                                    temp.BranchId = Convert.ToInt32(reader["BranchId"]);
                                    temp.BranchName = reader["Branch"].ToString();
                                    temp.MemoTypeID = Convert.ToInt32(reader["MemoTypeID"]);
                                    temp.MemoTypeName = reader["MemoType"].ToString();
                                    temp.AmountBasisID = Convert.ToInt32(reader["AmountBasisID"]);
                                    temp.AmountBasisName = reader["AmountBasis"].ToString();
                                    temp.MobilizationAmount = reader["AUM_Gross_Sales"].ToString();
                                    temp.Rate = reader["Rate"].ToString();
                                    temp.Remarks = reader["Remarks"].ToString();
                                    temp.MemoNumber = reader["MemoNumber"].ToString();
                                    temp.DistributorCategoryId = reader["DistributorCategoryId"].ToString();
                                    temp.DistributorCategoryName = reader["DistributorCategoryName"].ToString();
                                    temp.CreatedByName = reader["RaisedBy"].ToString();
                                    temp.MemoStatus = reader["MemoStatus"].ToString();
                                    temp.FreeTextField1 = reader["ActualAmountPayable"].ToString();
                                    temp.FreeTextField2 = reader["FreeTextField2"].ToString();
                                    temp.PanNumber = reader["PanNumber"].ToString();
                                    temp.IsRequired = Convert.ToBoolean(reader["IsRequired"]);
                                    temp.MemoStatusDisplay = reader["MemoStatusDisplay"].ToString();
                                    temp.RaisedOnDate = reader["RaisedOnDate"].ToString();
                                    temp.RaisedOnTime = reader["RaisedOnTime"].ToString();
                                    temp.Ageing = Convert.ToInt32(reader["Ageing"]);
                                    temp.ModifiedByName = reader["ModifiedByName"].ToString();
                                    temp.SchemeCategoryId = Convert.ToInt32(reader["SchemeCategoryId"]);
                                    temp.ChannelName = reader["Channel"].ToString();
                                    temp.RaisedByEmail = reader["RaisedByEmail"].ToString();
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

        public List<AdHocSearchResults> GetDuplicateAdHocDetails(int PaymentListID, string ARNNO, int SchemeID, int PaymentMemoTypeID, string AmountBasis, string PeriodFrom, string PeriodTo, out Exception error)
        {
            try
            {
                List<AdHocSearchResults> returnValue = new List<AdHocSearchResults>();
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetDuplicateAdHocDetails))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@PaymentListID";
                            parameter.Value = PaymentListID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@ARNNO";
                            parameter.Value = ARNNO;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SchemeID";
                            parameter.Value = SchemeID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PaymentMemoTypeID";
                            parameter.Value = PaymentMemoTypeID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@AmountBasis";
                            parameter.Value = AmountBasis;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PeriodFrom";
                            parameter.Value = (PeriodFrom == "" ? null : DateTime.ParseExact(PeriodFrom.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture));
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PeriodTo";
                            parameter.Value = (PeriodTo == "" ? null : DateTime.ParseExact(PeriodTo.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture));
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = _db.ExecuteReader(command))
                            {
                                returnValue = Conversion.ConvertDataReaderToList<AdHocSearchResults>(reader);
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


        public AdHocSearchResults GetAdHocPaymentDetails(int PaymentListID, out Exception error)
        {
            try
            {
                AdHocSearchResults returnValue = new AdHocSearchResults();
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetAdHocPaymentDetails))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@PaymentListID";
                            parameter.Value = PaymentListID;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = _db.ExecuteReader(command))
                            {
                                while (reader.Read())
                                {
                                    returnValue.PaymentMemoId = Convert.ToInt32(reader["PaymentMemoId"]);
                                    returnValue.SchemeId = Convert.ToInt32(reader["SchemeId"]);
                                    returnValue.SchemeName = reader["SchemeName"].ToString();
                                    returnValue.ARNNo = reader["ARNNo"].ToString();
                                    returnValue.ARNName = reader["ARNName"].ToString();
                                    returnValue.DateFrom = reader["DateFrom"].ToString();
                                    returnValue.DateTo = reader["DateTo"].ToString();
                                    returnValue.MemoTypeID = Convert.ToInt32(reader["MemoTypeID"]);
                                    returnValue.BranchId = Convert.ToInt32(reader["BranchId"]);
                                    returnValue.AmountBasisName = reader["AmountBasisName"].ToString();
                                    returnValue.PaymentAmount = reader["PaymentAmount"].ToString();
                                    returnValue.Rate = reader["Rate"].ToString();
                                    returnValue.MobilizationAmount = reader["MobilizationAmount"].ToString();
                                    returnValue.FreeTextField1 = reader["FreeTextField1"].ToString();
                                    returnValue.FreeTextField2 = reader["FreeTextField2"].ToString();
                                    returnValue.Remarks = reader["Remarks"].ToString();
                                    returnValue.PanNumber = reader["PanNumber"].ToString();
                                    //returnValue.ChannelName = reader["Channel"].ToString();
                                    //returnValue.ChannelName = string.Empty;
                                    returnValue.SchemeCategoryId = Convert.ToInt32(reader["SchemeCategoryId"]);
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

        public List<AdhocPaymentDetails> GetAdHocBatchDetails(string AdhocStatus, int MemoTypeID, int RaisedByID, string SearchFilter, out Exception error)
        {
            try
            {
                List<AdhocPaymentDetails> returnValue = new List<AdhocPaymentDetails>();
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetAdHocBatchProcess))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@AdhocStatus";
                            parameter.Value = AdhocStatus;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@RaisedByID";
                            parameter.Value = UserId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@MemoTypeID";
                            parameter.Value = MemoTypeID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SearchFilter";
                            parameter.Value = SearchFilter;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = _db.ExecuteReader(command))
                            {
                                returnValue = Conversion.ConvertDataReaderToList<AdhocPaymentDetails>(reader);
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

        public List<RemarksHistory> GetAuditPaymentDetails(int ID, out Exception error)
        {
            try
            {
                List<RemarksHistory> returnValue = new List<RemarksHistory>();
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetAuditPaymentProcess))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@ID";
                            parameter.Value = ID;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = _db.ExecuteReader(command))
                            {
                                while (reader.Read())
                                {
                                    RemarksHistory temp = new RemarksHistory();
                                    temp.Remarks = reader["Remarks"].ToString();
                                    temp.RemarksBy = reader["ModifiedBy"].ToString();
                                    temp.Date = reader["ModifiedDate"].ToString();
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


        public string GetDistributor_AUM_Gross(string ARNNumbers, int SchemeID, int SubRegionID, string PeriodFrom, string PeriodTo, string AmountBasisType, out Exception error)
        {
            string Output = string.Empty;
            try
            {
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetDistributorAum))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@ARNNumbers";
                            parameter.Value = ARNNumbers;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SchemeID";
                            parameter.Value = SchemeID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SubRegionID";
                            parameter.Value = SubRegionID;
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
                            parameter.ParameterName = "@AmountBasisType";
                            parameter.Value = AmountBasisType;
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

        public List<AdhocPaymentDetails> GetAdHocApproverMail(string AdhocBatchIDs, out Exception error)
        {
            try
            {
                List<AdhocPaymentDetails> returnValue = new List<AdhocPaymentDetails>();
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetAdhocApproverMail))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@AdhocListIDs";
                            parameter.Value = AdhocBatchIDs;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@RaisedByID";
                            parameter.Value = UserId;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = _db.ExecuteReader(command))
                            {
                                while (reader.Read())
                                {
                                    AdhocPaymentDetails temp = new AdhocPaymentDetails();
                                    temp.ChannelName = Convert.ToString(reader["ChannelId"]);
                                    temp.MemoNumber = reader["AdhocMemo"].ToString();
                                    temp.Email = reader["Email"].ToString();
                                    temp.SecondaryEmail = reader["SecondaryMail"].ToString();
                                    temp.Remarks = reader["ChannelName"].ToString();
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

        public string[] ExecuteReader(string _commandText)
        {
            string[] stringarray = new string[5];
            try
            {
                using (DbCommand command = _db.GetSqlStringCommand(_commandText))
                {

                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;
                        using (IDataReader reader = _db.ExecuteReader(command))
                        {
                            while (reader.Read())
                            {
                                stringarray[0] = (reader["MemoNumber"]).ToString();
                                stringarray[1] = (reader["MemoTypeID"]).ToString();
                            }
                        }
                        connection.Close();
                    }
                }
                return stringarray;
            }
            catch (Exception)
            {
                throw;
            }
        }


        #endregion

        #region Save / Update / Delete Methods

        public string UpdateAdhocRemarks(int AdhocID, string Remarks, out Exception error)
        {
            string queryString = "UPDATE AdhocPaymentDetails SET Remarks = " + "'" + Remarks + "'" + "WHERE ID = " + AdhocID;
            string returnValue = "";
            try
            {
                error = null;
                try
                {
                    using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings[Constants.connection].ToString()))
                    {
                        SqlCommand command = new SqlCommand(queryString, connection);
                        command.Connection.Open();
                        command.ExecuteNonQuery();
                        returnValue = "Updated Successfully";
                    }

                }
                catch (InvalidOperationException invalid)
                {
                    error = invalid;
                    returnValue = "Updated Failed";
                }
                catch (Exception ex)
                {
                    error = ex;
                    returnValue = "Updated Failed";
                }
                return returnValue;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public bool DeleteAdHocPayment(string PaymentListIDs, string AdhocStatus, out Exception error)
        {
            bool returnValue = false;
            try
            {
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpDeleteAdHocDetails))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@PaymentListIDs";
                            parameter.Value = PaymentListIDs;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@AdhocStatus";
                            parameter.Value = AdhocStatus;
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

        public bool SaveAdHocPaymentList(List<AdHocSearchResults> InputData, out Exception error)
        {
            bool returnValue = false;
            try
            {
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpUpdateAdHocPaymentList))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@AdHocPaymentList";
                            parameter.Value = Conversion.ConvertCollectionToXML(InputData);
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@ModifiedByID";
                            parameter.Value = UserId;
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

        public string CreateAdhocBatchProcess(string AdhocListIDs, string AdhocStatus, string Remarks, int ApprovalRoleID, out Exception error)
        {
            string Output = string.Empty;
            try
            {
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpCreateAdHocBatchProcess))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@AdhocListIDs";
                            parameter.Value = AdhocListIDs;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@AdhocStatus";
                            parameter.Value = AdhocStatus;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Remarks";
                            parameter.Value = Remarks;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@ApprovalRoleID";
                            parameter.Value = ApprovalRoleID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@RaisedBy";
                            parameter.Value = UserId;
                            command.Parameters.Add(parameter);

                            Output = command.ExecuteScalar().ToString();
                            //command.ExecuteNonQuery();
                            connection.Close();
                        }
                    }
                }
                catch (InvalidOperationException invalid)
                {
                    error = invalid;
                    Output = "failed";
                }
                catch (Exception ex)
                {
                    error = ex;
                    Output = "failed";
                }
                return Output;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string UpdateAdHocDetails(AdHocSearchResults InputData, out Exception error)
        {
            string Output = string.Empty;
            try
            {
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpUpdateAdHocDetails))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@PaymentListID";
                            parameter.Value = InputData.PaymentListId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SchemeID";
                            parameter.Value = InputData.SchemeId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SchemeCategoryID";
                            parameter.Value = InputData.SchemeCategoryId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PeriodFrom";
                            parameter.Value = (InputData.DateFrom == "" ? null : DateTime.ParseExact(InputData.DateFrom.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture));
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PeriodTo";
                            parameter.Value = (InputData.DateTo == "" ? null : DateTime.ParseExact(InputData.DateTo.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture));
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@BranchID";
                            parameter.Value = InputData.BranchId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@AmountBasis";
                            parameter.Value = InputData.AmountBasisName;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@MobilizationAmount";
                            parameter.Value = InputData.MobilizationAmount;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Rate";
                            parameter.Value = InputData.Rate;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PanNumber";
                            parameter.Value = InputData.PanNumber;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PaymentAmount";
                            parameter.Value = InputData.PaymentAmount;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@FreeTextOne";
                            parameter.Value = InputData.FreeTextField1;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@FreeTextTwo";
                            parameter.Value = InputData.FreeTextField2;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@ModifiedBy";
                            parameter.Value = UserId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Remarks";
                            parameter.Value = InputData.Remarks;
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

        public string SaveAdHocDetails(AdHocSearchResults InputData, out Exception error)
        {
            string Output = string.Empty;
            try
            {
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpInsertAdHocDetails))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@ARNNO";
                            parameter.Value = InputData.ARNNo;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@MemoTypeID";
                            parameter.Value = InputData.MemoTypeID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SchemeID";
                            parameter.Value = InputData.SchemeId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SchemeCategoryID";
                            parameter.Value = InputData.SchemeCategoryId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PeriodFrom";
                            parameter.Value = (InputData.DateFrom == "" ? null : DateTime.ParseExact(InputData.DateFrom.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture));
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PeriodTo";
                            parameter.Value = (InputData.DateTo == "" ? null : DateTime.ParseExact(InputData.DateTo.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture));
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@BranchID";
                            parameter.Value = InputData.BranchId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@AmountBasis";
                            parameter.Value = InputData.AmountBasisName;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@MobilizationAmount";
                            parameter.Value = InputData.MobilizationAmount;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Rate";
                            parameter.Value = InputData.Rate;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PanNumber";
                            parameter.Value = InputData.PanNumber;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PaymentAmount";
                            parameter.Value = InputData.PaymentAmount;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@FreeTextOne";
                            parameter.Value = InputData.FreeTextField1;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@FreeTextTwo";
                            parameter.Value = InputData.FreeTextField2;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@MemoStatus";
                            parameter.Value = InputData.MemoStatus;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@IsActive";
                            parameter.Value = true;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@CreatedBy";
                            parameter.Value = UserId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Remarks";
                            parameter.Value = InputData.Remarks;
                            command.Parameters.Add(parameter);

                            Output = command.ExecuteScalar().ToString();
                            //if (Output == "Inserted Successfully")
                            //    returnValue = true;
                            //else if (Output == "Inserted Successfully")
                            //else
                            //    returnValue = false;
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

        #endregion

    }
}
