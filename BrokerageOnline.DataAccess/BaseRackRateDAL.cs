//using BrokerageOnline.DataAccess.Database;
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
    public class BaseRackRateDAL
    {
        private Database _db = DatabaseFactory.CreateDatabase(Constants.connection);

        /// <summary>
        /// Get Distributor Category
        /// </summary>
        /// <param name="SearchText"></param>
        /// <param name="error"></param>
        /// <returns>List<DistributorCategory></returns>
        public List<DistributorCategory> GetDistributorCategory(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<DistributorCategory> dataMapper = new DataMapper<DistributorCategory>(Constants.connection, Constants.SpGetDistributorCategory);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Get Scheme Category
        /// </summary>
        /// <param name="SearchText"></param>
        /// <param name="error"></param>
        /// <returns>List<SchemeCategory> </returns>
        public List<SchemeCategory> GetSchemeCategory(string SearchText, Int64 MemoTypeId, Int64 IsCloseEnded, out Exception error)
        {
            try
            {
                DataMapper<SchemeCategory> dataMapper = new DataMapper<SchemeCategory>(Constants.connection, Constants.SpGetSchemeCategory);
                return dataMapper.SearchByMemoTypeAndIsclosed(SearchText, MemoTypeId, IsCloseEnded == null ? 2 : IsCloseEnded, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Get Scheme
        /// </summary>
        /// <param name="SearchText"></param>
        /// <param name="error"></param>
        /// <returns>List<SchemeDropdown></returns>
        public List<SchemeDropdown> GetScheme(string SearchText, Int64 MemoTypeId, Int64 IsCloseEnded, out Exception error)
        {
            try
            {
                DataMapper<SchemeDropdown> dataMapper = new DataMapper<SchemeDropdown>(Constants.connection, Constants.SpGetScheme);
                return dataMapper.SearchByMemoTypeAndIsclosed(SearchText, MemoTypeId, IsCloseEnded == null ? 2 : IsCloseEnded, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Get Scheme And Category
        /// </summary>
        /// <param name="SearchText"></param>
        /// <param name="error"></param>
        /// <returns>List<SchemeDropdown></returns>
        public List<SchemeDropdown> GetSchemeAndCategory(string SearchText, Int64 MemoTypeId, out Exception error)
        {
            try
            {
                DataMapper<SchemeDropdown> dataMapper = new DataMapper<SchemeDropdown>(Constants.connection, Constants.SpGetSchemeAndCategory);
                return dataMapper.SearchByMemoType(SearchText, MemoTypeId, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SchemeDropdown> GetAllScheme(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<SchemeDropdown> dataMapper = new DataMapper<SchemeDropdown>(Constants.connection, Constants.SpGetAllScheme);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Get Distributor
        /// </summary>
        /// <param name="SearchText"></param>
        /// <param name="error"></param>
        /// <returns> List<Distributor></returns>
        //public List<Distributor> GetDistributor(string SearchText, out Exception error)
        //{
        //    try
        //    {
        //        DataMapper<Distributor> dataMapper = new DataMapper<Distributor>(Constants.connection, Constants.SpGetDistributor);
        //        return dataMapper.Search(SearchText, out error);
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}


        public List<Distributor> GetDistributor(string SearchText, int SubregionID, out Exception error)
        {
            //DataMapper<Distributor> dataMapper = new DataMapper<Distributor>(Constants.connection, Constants.SpGetDistributor);
            //return dataMapper.Search(SearchText, SubregionID, out error);
            try
            {
                List<Distributor> returnValue = new List<Distributor>();
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetDistributor))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@SearchText";
                            parameter.Value = SearchText;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SubregionID";
                            parameter.Value = SubregionID;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = _db.ExecuteReader(command))
                            {
                                returnValue = Conversion.ConvertDataReaderToList<Distributor>(reader);
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

        public List<Distributor> GetDistributorBasedOnID(string SearchText, int SubregionID, out Exception error)
        {
            //DataMapper<Distributor> dataMapper = new DataMapper<Distributor>(Constants.connection, Constants.SpGetDistributor);
            //return dataMapper.Search(SearchText, SubregionID, out error);
            try
            {
                List<Distributor> returnValue = new List<Distributor>();
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetDistributorBasedOnID))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@SearchText";
                            parameter.Value = SearchText;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SubregionID";
                            parameter.Value = SubregionID;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = _db.ExecuteReader(command))
                            {
                                returnValue = Conversion.ConvertDataReaderToList<Distributor>(reader);
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


        /// <summary>
        /// Get Child ARNS
        /// </summary>
        /// <param name="ArnNo"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        public List<Distributor> GetChildArn(string ArnNo, out Exception error)
        {
            try
            {
                DataMapper<Distributor> dataMapper = new DataMapper<Distributor>(Constants.connection, Constants.SpGetChildARN);
                return dataMapper.Search(ArnNo, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// GET SLAB
        /// </summary>
        /// <param name="_commandText"></param>
        /// <returns>string</returns>
        public string GetSlab(string DistributorCategoryID, string Arnno)
        {
            try
            {
                string slab = "";
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetSlab))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;
                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@DistributorCategoryID";
                        parameter.Value = DistributorCategoryID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ArnNo";
                        parameter.Value = Arnno;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            SqlDataReader dr = (SqlDataReader)reader;
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    slab = Convert.ToString(dr["Slab"]);
                                }
                            }
                        }
                        connection.Close();
                    }
                }
                return slab;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// GET SLAB AVAILABILITY
        /// </summary>
        /// <param name="DistributorCategoryID"></param>
        /// <param name="Arnno"></param>
        /// <returns></returns>
        public string GetSlabAvailability(string DistributorCategoryID, string Arnno)
        {
            try
            {
                string slab = "";
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetSlabAvailable))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;
                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@DistributorCategoryID";
                        parameter.Value = DistributorCategoryID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ArnNo";
                        parameter.Value = Arnno;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            SqlDataReader dr = (SqlDataReader)reader;
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    slab = Convert.ToString(dr["Slab"]);
                                }
                            }
                        }
                        connection.Close();
                    }
                }
                return slab;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// GET SIP SLAB
        /// </summary>
        /// <param name="_commandText"></param>
        /// <returns>string</returns>
        public string GetSIPSlab(string DistributorCategoryID, string Arnno)
        {
            try
            {
                string slab = "";
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetSIPSlab))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;
                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@DistributorCategoryID";
                        parameter.Value = DistributorCategoryID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ArnNo";
                        parameter.Value = Arnno;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            SqlDataReader dr = (SqlDataReader)reader;
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    slab = Convert.ToString(dr["Slab"]);
                                }
                            }
                        }
                        connection.Close();
                    }
                }
                return slab;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// GET SIP SLAB AVAILABILITY
        /// </summary>
        /// <param name="DistributorCategoryID"></param>
        /// <param name="Arnno"></param>
        /// <returns></returns>
        public string GetSIPSlabAvailability(string DistributorCategoryID, string Arnno)
        {
            try
            {
                string slab = "";
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetSIPSlabAvailable))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;
                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@DistributorCategoryID";
                        parameter.Value = DistributorCategoryID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ArnNo";
                        parameter.Value = Arnno;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            SqlDataReader dr = (SqlDataReader)reader;
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    slab = Convert.ToString(dr["Slab"]);
                                }
                            }
                        }
                        connection.Close();
                    }
                }
                return slab;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Get ARN List
        /// </summary>
        /// <param name="SearchText"></param>
        /// <param name="error"></param>
        /// <returns>List<Distributor></returns>
        //public List<Distributor> GetARN(string SearchText, out Exception error)
        //{
        //    try
        //    {
        //        List<Distributor> returnValue = new List<Distributor>();
        //        error = null;

        //        try
        //        {
        //            using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetDistributor))
        //            {
        //                using (DbConnection connection = _db.CreateConnection())
        //                {
        //                    connection.Open();
        //                    command.Connection = connection;

        //                    var parameter = command.CreateParameter();
        //                    parameter.ParameterName = "@SearchText";
        //                    parameter.Value = SearchText;
        //                    command.Parameters.Add(parameter);

        //                    using (IDataReader reader = command.ExecuteReader())
        //                    {
        //                        SqlDataReader dr = (SqlDataReader)reader;
        //                        if (dr.HasRows)
        //                        {
        //                            while (dr.Read())
        //                            {
        //                                Distributor dist = new Distributor();
        //                                dist.DistributorId = Convert.ToInt64(dr["DistributorId"]);
        //                                dist.DistributorCategoryId = Convert.ToInt64(dr["DistributorCategoryId"]);
        //                                dist.ARN = Convert.ToString(dr["ARN"]);
        //                                dist.DistributorName = Convert.ToString(dr["DistributorName"]);
        //                                returnValue.Add(dist);
        //                            }
        //                        }
        //                    }
        //                    connection.Close();
        //                }
        //            }
        //        }
        //        catch (InvalidOperationException invalid)
        //        {
        //            error = invalid;
        //        }
        //        catch (Exception ex)
        //        {
        //            error = ex;
        //        }

        //        return returnValue;
        //        //return dataMapper.Search(SearchText, out error);
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}


        public List<Distributor> GetARN(string SearchText, int SubregionID, out Exception error)
        {
            try
            {
                List<Distributor> returnValue = new List<Distributor>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetDistributor))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@SearchText";
                            parameter.Value = SearchText;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SubregionID";
                            parameter.Value = SubregionID;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                SqlDataReader dr = (SqlDataReader)reader;
                                if (dr.HasRows)
                                {
                                    while (dr.Read())
                                    {
                                        Distributor dist = new Distributor();
                                        dist.DistributorId = Convert.ToInt64(dr["DistributorId"]);
                                        dist.DistributorCategoryId = Convert.ToInt64(dr["DistributorCategoryId"]);
                                        dist.ARN = Convert.ToString(dr["ARN"]);
                                        dist.DistributorName = Convert.ToString(dr["DistributorName"]);
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

        /// <summary>
        /// Get Arn For channel and distributor
        /// </summary>
        /// <param name="SearchText"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        public List<Distributor> GetARNForChannelAndDistributorCategory(string Channel, string DistributorCategory, out Exception error)
        {
            try
            {
                List<Distributor> returnValue = new List<Distributor>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetARNForChannelAndDistCategory))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@Channel";
                            parameter.Value = Channel;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Dist";
                            parameter.Value = DistributorCategory;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                SqlDataReader dr = (SqlDataReader)reader;
                                if (dr.HasRows)
                                {
                                    while (dr.Read())
                                    {
                                        Distributor dist = new Distributor();
                                        dist.DistributorId = Convert.ToInt64(dr["DistributorId"]);
                                        dist.DistributorCategoryId = Convert.ToInt64(dr["DistributorCategoryId"]);
                                        dist.ARN = Convert.ToString(dr["ARN"]);
                                        dist.DistributorName = Convert.ToString(dr["DistributorName"]);
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

        /// <summary>
        /// Get Channel List
        /// </summary>
        /// <param name="SearchText"></param>
        /// <param name="error"></param>
        /// <returns>List<Channel></returns>
        public List<Channel> GetChannel(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<Channel> dataMapper = new DataMapper<Channel>(Constants.connection, Constants.SpGetChannel);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Get Remarks History
        /// </summary>
        /// <param name="PaymentMemoId"></param>
        /// <param name="error"></param>
        /// <returns>List<RemarksHistory></returns>
        public List<RemarksHistory> GetRemarksHistory(string PaymentMemoId, out Exception error)
        {
            try
            {
                List<RemarksHistory> returnValue = new List<RemarksHistory>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetRemarksHistory, PaymentMemoId))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    RemarksHistory list = new RemarksHistory();
                                    list.AuditId = reader["AuditId"].ToString();
                                    list.PaymentMemoId = reader["PaymentMemoId"].ToString();
                                    list.Date = reader["Date"].ToString();
                                    list.Time = reader["Time"].ToString();
                                    list.Remarks = reader["Remarks"].ToString();
                                    list.RemarksBy = reader["RemarksBy"].ToString();
                                    list.Action = reader["Action"].ToString();
                                    returnValue.Add(list);
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

        /// <summary>
        /// Get Modified Rate History
        /// </summary>
        /// <param name="SearchText"></param>
        /// <param name="error"></param>
        /// <returns>List<ModifiedRateHistory></returns>
        public List<ModifiedRateHistory> GetModifiedRateHistory(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<ModifiedRateHistory> dataMapper = new DataMapper<ModifiedRateHistory>(Constants.connection, Constants.SpGetModifiedRateHistory);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// GetSIPModifiedRateHistory
        /// </summary>
        /// <param name="SearchText"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        public List<ModifiedRateHistory> GetSIPModifiedRateHistory(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<ModifiedRateHistory> dataMapper = new DataMapper<ModifiedRateHistory>(Constants.connection, Constants.SpGetSIPModifiedRateHistory);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Get Create Base rack Rate Details
        /// </summary>
        /// <param name="ArnNo"></param>
        /// <param name="Channel"></param>
        /// <param name="DistributorCategory"></param>
        /// <param name="Status"></param>
        /// <param name="MasterQueueStatus"></param>
        /// <param name="error"></param>
        /// <returns>List<RackRateSearchResult></returns>
        public List<RackRateSearchResult> GetCreateBaseRackRate(string ArnNo, string Channel, string DistributorCategory, string Status, string MasterQueueStatus, string ARNName, string SearchFilter, int UserID, string MemoLevel, out Exception error)
        {
            try
            {
                return GetSearchResult(Channel, DistributorCategory, ArnNo, Status, MasterQueueStatus, ARNName, SearchFilter, UserID, Constants.SpGetCreateBaseRackRate, MemoLevel, out error);

            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Get Payment List
        /// </summary>
        /// <param name="PaymentMemoID"></param>
        /// <param name="error"></param>
        /// <returns>List<PaymentList></returns>
        public List<PaymentList> GetPaymentList(Int64 PaymentMemoID, out Exception error)
        {
            try
            {
                List<PaymentList> returnValue = new List<PaymentList>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetPaymentList, PaymentMemoID))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    PaymentList list = new PaymentList();
                                    //list.PaymentListId = reader["PaymentListId"].ToString();
                                    list.SchemeId = reader["SchemeId"].ToString();
                                    list.SchemeName = reader["SchemeName"].ToString();
                                    list.SchemeCategoryId = reader["SchemeCategoryId"].ToString();
                                    list.SchemeCategoryName = reader["SchemeCategoryName"].ToString();
                                    list.DistributorCategoryId = reader["DistributorCategoryId"].ToString();
                                    list.DistributorCategoryName = reader["DistributorCategoryName"].ToString();
                                    list.PaymentMemoId = reader["PaymentMemoId"].ToString();
                                    list.PaymentType = reader["PaymentType"].ToString();
                                    list.ARNNO = reader["ARNNO"].ToString();
                                    list.ARNName = HttpUtility.HtmlDecode(reader["ARNName"].ToString());
                                    list.DateFrom = reader["DateFrom"].ToString();
                                    list.DateTo = reader["DateTo"].ToString();
                                    list.SlabType = reader["SlabType"].ToString();
                                    list.SlabAmount = reader["SlabAmount"].ToString();
                                    list.PaymentBasis = reader["PaymentBasis"].ToString();
                                    list.Target = Convert.ToInt64(reader["Target"]).ToString();
                                    list.TargetPeriod = reader["TargetPeriod"].ToString();
                                    list.InterestRate = reader["InterestRate"].ToString();
                                    list.InstallmentCondition = reader["InstalmentCondition"].ToString();
                                    list.InstallmentRangeFrom = reader["InstallmentRangeFrom"].ToString();
                                    list.InstallmentRangeTo = reader["InstallmentRangeTo"].ToString();
                                    list.TenureCondition = reader["TenureCondition"].ToString();
                                    list.TenureMonths = reader["TenureMonths"].ToString();
                                    list.UpfrontPaymentType = reader["UpfrontPaymentType"].ToString();
                                    list.UpfrontValue = reader["UpfrontValue"].ToString();
                                    list.Calculation = reader["Calculation"].ToString();
                                    list.Clawback = reader["Clawback"].ToString();
                                    list.SIPIncentiveRemarks = reader["SIPIncentiveRemarks"].ToString();
                                    list.FreeTextField1 = reader["FreeTextField1"].ToString();
                                    list.FreeTextField2 = reader["FreeTextField2"].ToString();
                                    list.Onwards = reader["Onwards"].ToString();
                                    list.Folio = reader["Folio"].ToString();
                                    list.SIPSlab = reader["SIPSlab"].ToString();
                                    list.IsUpdated = Convert.ToBoolean(reader["IsUpdated"]);
                                    //memo.IsActive = Convert.ToBoolean(reader["IsActive"]);
                                    //memo.CreatedBy = Convert.ToInt64(reader["CreatedBy"]);
                                    //memo.CreatedBy = Convert.ToInt64(reader["CreatedBy"]);
                                    //memo.CreatedBy = Convert.ToInt64(reader["CreatedBy"]);
                                    returnValue.Add(list);
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

        /// <summary>
        /// Get Payment List With Inactive
        /// </summary>
        /// <param name="PaymentMemoID"></param>
        /// <param name="error"></param>
        /// <returns>List<PaymentList></returns>
        public List<PaymentList> GetPaymentListWithInactive(Int64 PaymentMemoID, out Exception error)
        {
            try
            {
                List<PaymentList> returnValue = new List<PaymentList>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetPaymentListWithInactive, PaymentMemoID))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    PaymentList list = new PaymentList();
                                    //list.PaymentListId = reader["PaymentListId"].ToString();
                                    list.SchemeId = reader["SchemeId"].ToString();
                                    list.SchemeName = reader["SchemeName"].ToString();
                                    list.SchemeCategoryId = reader["SchemeCategoryId"].ToString();
                                    list.SchemeCategoryName = reader["SchemeCategoryName"].ToString();
                                    list.DistributorCategoryId = reader["DistributorCategoryId"].ToString();
                                    list.DistributorCategoryName = reader["DistributorCategoryName"].ToString();
                                    list.PaymentMemoId = reader["PaymentMemoId"].ToString();
                                    list.PaymentType = reader["PaymentType"].ToString();
                                    list.ARNNO = reader["ARNNO"].ToString();
                                    list.ARNName = HttpUtility.HtmlDecode(reader["ARNName"].ToString());
                                    list.DateFrom = reader["DateFrom"].ToString();
                                    list.DateTo = reader["DateTo"].ToString();
                                    list.SlabType = reader["SlabType"].ToString();
                                    list.SlabAmount = reader["SlabAmount"].ToString();
                                    list.PaymentBasis = reader["PaymentBasis"].ToString();
                                    list.Target = Convert.ToInt64(reader["Target"]).ToString();
                                    list.TargetPeriod = reader["TargetPeriod"].ToString();
                                    list.InterestRate = reader["InterestRate"].ToString();
                                    list.InstallmentCondition = reader["InstalmentCondition"].ToString();
                                    list.InstallmentRangeFrom = reader["InstallmentRangeFrom"].ToString();
                                    list.InstallmentRangeTo = reader["InstallmentRangeTo"].ToString();
                                    list.TenureCondition = reader["TenureCondition"].ToString();
                                    list.TenureMonths = reader["TenureMonths"].ToString();
                                    list.UpfrontPaymentType = reader["UpfrontPaymentType"].ToString();
                                    list.UpfrontValue = reader["UpfrontValue"].ToString();
                                    list.Calculation = reader["Calculation"].ToString();
                                    list.Clawback = reader["Clawback"].ToString();
                                    list.SIPIncentiveRemarks = reader["SIPIncentiveRemarks"].ToString();
                                    list.FreeTextField1 = reader["FreeTextField1"].ToString();
                                    list.FreeTextField2 = reader["FreeTextField2"].ToString();
                                    list.Onwards = reader["Onwards"].ToString();
                                    list.Folio = reader["Folio"].ToString();
                                    list.SIPSlab = reader["SIPSlab"].ToString();
                                    list.IsUpdated = Convert.ToBoolean(reader["IsUpdated"]);
                                    //memo.IsActive = Convert.ToBoolean(reader["IsActive"]);
                                    //memo.CreatedBy = Convert.ToInt64(reader["CreatedBy"]);
                                    //memo.CreatedBy = Convert.ToInt64(reader["CreatedBy"]);
                                    //memo.CreatedBy = Convert.ToInt64(reader["CreatedBy"]);
                                    returnValue.Add(list);
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

        /// <summary>
        /// GetAuditPaymentList
        /// </summary>
        /// <param name="PaymentMemoID"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        public List<PaymentList> GetAuditPaymentList(Int64 PaymentMemoID, Int64 SchemeId, out Exception error)
        {
            try
            {
                List<PaymentList> returnValue = new List<PaymentList>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetAuditPaymentList))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@SchemeId";
                            parameter.Value = SchemeId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PaymentMemoId";
                            parameter.Value = PaymentMemoID;
                            command.Parameters.Add(parameter);
                            using (IDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    PaymentList list = new PaymentList();
                                    list.PaymentListId = reader["ID"].ToString();
                                    list.SchemeId = reader["SchemeId"].ToString();
                                    list.SchemeName = reader["SchemeName"].ToString();
                                    list.SchemeCategoryId = reader["SchemeCategoryId"].ToString();
                                    list.SchemeCategoryName = reader["SchemeCategoryName"].ToString();
                                    //list.DistributorCategoryId = reader["DistributorCategoryId"].ToString();
                                    //list.DistributorCategoryName = reader["DistributorCategoryName"].ToString();
                                    list.PaymentMemoId = reader["PaymentMemoId"].ToString();
                                    list.PaymentType = reader["PaymentType"].ToString();
                                    list.DateFrom = reader["DateFrom"].ToString();
                                    list.DateTo = reader["DateTo"].ToString();
                                    list.SlabType = reader["SlabType"].ToString();
                                    list.SlabAmount = reader["SlabAmount"].ToString();
                                    list.PaymentBasis = reader["PaymentBasis"].ToString();
                                    list.Target = Convert.ToInt64(reader["Target"]).ToString();
                                    list.TargetPeriod = reader["TargetPeriod"].ToString();
                                    list.InterestRate = reader["InterestRate"].ToString();
                                    list.InstallmentCondition = reader["InstalmentCondition"].ToString();
                                    list.InstallmentRangeFrom = reader["InstallmentRangeFrom"].ToString();
                                    list.InstallmentRangeTo = reader["InstallmentRangeTo"].ToString();
                                    list.TenureCondition = reader["TenureCondition"].ToString();
                                    list.TenureMonths = reader["TenureMonths"].ToString();
                                    list.UpfrontPaymentType = reader["UpfrontPaymentType"].ToString();
                                    list.UpfrontValue = reader["UpfrontValue"].ToString();
                                    list.Calculation = reader["Calculation"].ToString();
                                    list.Clawback = reader["Clawback"].ToString();
                                    list.SIPIncentiveRemarks = reader["SIPIncentiveRemarks"].ToString();
                                    list.FreeTextField1 = reader["FreeTextField1"].ToString();
                                    list.FreeTextField2 = reader["FreeTextField2"].ToString();
                                    list.Onwards = reader["Onwards"].ToString();
                                    list.Folio = reader["Folio"].ToString();
                                    list.SIPSlab = reader["SIPSlab"].ToString();
                                    list.IsUpdated = Convert.ToBoolean(reader["IsUpdated"]);
                                    list.AuditMemoId = Convert.ToString(reader["AuditMemoId"]);
                                    list.RaisedBy = Convert.ToString(reader["RaisedBy"]);
                                    list.RoleSeqNo = Convert.ToString(reader["RoleSeqNo"]);
                                    list.ModifiedDateAndTime = Convert.ToString(reader["ModifiedDateAndTime"]);
                                    returnValue.Add(list);
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

        /// <summary>
        /// GetAuditPaymentDetails
        /// </summary>
        /// <param name="PaymentListID"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        public List<PaymentDetails> GetAuditPaymentDetails(Int64 PaymentMemoID, Int64 SchemeId, out Exception error)
        {
            try
            {
                List<PaymentDetails> returnValue = new List<PaymentDetails>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetAuditPaymentDetails))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@SchemeId";
                            parameter.Value = SchemeId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PaymentMemoId";
                            parameter.Value = PaymentMemoID;
                            command.Parameters.Add(parameter);
                            using (IDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    PaymentDetails detail = new PaymentDetails();
                                    detail.PaymentDetailsId = reader["PaymentDetailsId"].ToString();
                                    detail.PaymentMemoId = reader["PaymentMemoId"].ToString();
                                    detail.SchemeId = reader["SchemeId"].ToString();
                                    detail.BrokerageTypeId = reader["BrokerageTypeId"].ToString();
                                    detail.PaymentListId = reader["PaymentListId"].ToString();
                                    detail.LumpSumLessTieup = reader["LumpSumLessTieup"].ToString();
                                    detail.LumpSumGreaterTieup = reader["LumpSumGreaterTieup"].ToString();
                                    detail.BaseUpfront = reader["BaseUpfront"].ToString();
                                    detail.AdditionalIncentives = reader["AdditionalIncentive"].ToString();
                                    detail.Total = reader["Total"].ToString();
                                    detail.SIPSlabLess = reader["SIPSlabLess"].ToString();
                                    detail.SIPSlabGreater = reader["SIPSlabGreater"].ToString();
                                    detail.PeriodType = reader["PeriodType"].ToString();
                                    detail.PeriodStart = reader["PeriodStart"].ToString();
                                    detail.PeriodEnd = reader["PeriodEnd"].ToString();
                                    detail.SlabTotal = reader["SlabTotal"].ToString();
                                    detail.IsSlabLess = reader["IsSlabLess"].ToString();
                                    detail.LumpSumGreater = reader["LumpSumGreater"].ToString();
                                    detail.AuditMemoId = Convert.ToString(reader["AuditMemoId"]);
                                    detail.IsCopied = Convert.ToBoolean(reader["IsCopied"]);
                                    returnValue.Add(detail);
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

        /// <summary>
        /// GetTieUpAuditPaymentList
        /// </summary>
        /// <param name="PaymentMemoID"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        public List<PaymentList> GetTieUpAuditPaymentList(Int64 PaymentMemoID, string Scheme, string Category, string ARN, string DateFrom, string DateTo, out Exception error)
        {
            try
            {
                List<PaymentList> returnValue = new List<PaymentList>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetTieUpAuditPaymentList))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PaymentMemoId";
                            parameter.Value = PaymentMemoID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@DistributorCategoryID";
                            parameter.Value = Category;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@ARNNo";
                            parameter.Value = ARN;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SchemeID";
                            parameter.Value = Scheme;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@datefrom";
                            parameter.Value = DateFrom;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@dateto";
                            parameter.Value = DateTo;
                            command.Parameters.Add(parameter);
                            using (IDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    PaymentList list = new PaymentList();
                                    list.PaymentListId = reader["ID"].ToString();
                                    list.SchemeId = reader["SchemeId"].ToString();
                                    list.SchemeName = reader["SchemeName"].ToString();
                                    list.SchemeCategoryId = reader["SchemeCategoryId"].ToString();
                                    list.SchemeCategoryName = reader["SchemeCategoryName"].ToString();
                                    //list.DistributorCategoryId = reader["DistributorCategoryId"].ToString();
                                    //list.DistributorCategoryName = reader["DistributorCategoryName"].ToString();
                                    list.PaymentMemoId = reader["PaymentMemoId"].ToString();
                                    list.PaymentType = reader["PaymentType"].ToString();
                                    list.DateFrom = reader["DateFrom"].ToString();
                                    list.DateTo = reader["DateTo"].ToString();
                                    list.SlabType = reader["SlabType"].ToString();
                                    list.SlabAmount = reader["SlabAmount"].ToString();
                                    list.PaymentBasis = reader["PaymentBasis"].ToString();
                                    list.Target = Convert.ToInt64(reader["Target"]).ToString();
                                    list.TargetPeriod = reader["TargetPeriod"].ToString();
                                    list.InterestRate = reader["InterestRate"].ToString();
                                    list.InstallmentCondition = reader["InstalmentCondition"].ToString();
                                    list.InstallmentRangeFrom = reader["InstallmentRangeFrom"].ToString();
                                    list.InstallmentRangeTo = reader["InstallmentRangeTo"].ToString();
                                    list.TenureCondition = reader["TenureCondition"].ToString();
                                    list.TenureMonths = reader["TenureMonths"].ToString();
                                    list.UpfrontPaymentType = reader["UpfrontPaymentType"].ToString();
                                    list.UpfrontValue = reader["UpfrontValue"].ToString();
                                    list.Calculation = reader["Calculation"].ToString();
                                    list.Clawback = reader["Clawback"].ToString();
                                    list.SIPIncentiveRemarks = reader["SIPIncentiveRemarks"].ToString();
                                    list.FreeTextField1 = reader["FreeTextField1"].ToString();
                                    list.FreeTextField2 = reader["FreeTextField2"].ToString();
                                    list.Onwards = reader["Onwards"].ToString();
                                    list.Folio = reader["Folio"].ToString();
                                    list.SIPSlab = reader["SIPSlab"].ToString();
                                    list.IsUpdated = Convert.ToBoolean(reader["IsUpdated"]);
                                    list.AuditMemoId = Convert.ToString(reader["AuditMemoId"]);
                                    list.RaisedBy = Convert.ToString(reader["RaisedBy"]);
                                    list.RoleSeqNo = Convert.ToString(reader["RoleSeqNo"]);
                                    list.MemoNumber = Convert.ToString(reader["MemoNumber"]);
                                    list.ModifiedDateAndTime = Convert.ToString(reader["ModifiedDateAndTime"]);
                                    returnValue.Add(list);
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

        /// <summary>
        /// GetTieUpAuditPaymentDetails
        /// </summary>
        /// <param name="PaymentListID"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        public List<PaymentDetails> GetTieUpAuditPaymentDetails(Int64 PaymentMemoID, string Scheme, string Category, string ARN, string DateFrom, string DateTo, out Exception error)
        {
            try
            {
                List<PaymentDetails> returnValue = new List<PaymentDetails>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetTieUpAuditPaymentDetails))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;
                            command.CommandTimeout = 0;
                            var parameter = command.CreateParameter();

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PaymentMemoId";
                            parameter.Value = PaymentMemoID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@DistributorCategoryID";
                            parameter.Value = Category;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@ARNNo";
                            parameter.Value = ARN;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@SchemeID";
                            parameter.Value = Scheme;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@datefrom";
                            parameter.Value = DateFrom;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@dateto";
                            parameter.Value = DateTo;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    PaymentDetails detail = new PaymentDetails();
                                    detail.PaymentDetailsId = reader["PaymentDetailsId"].ToString();
                                    detail.PaymentMemoId = reader["PaymentMemoId"].ToString();
                                    detail.SchemeId = reader["SchemeId"].ToString();
                                    detail.BrokerageTypeId = reader["BrokerageTypeId"].ToString();
                                    detail.PaymentListId = reader["PaymentListId"].ToString();
                                    detail.LumpSumLessTieup = reader["LumpSumLessTieup"].ToString();
                                    detail.LumpSumGreaterTieup = reader["LumpSumGreaterTieup"].ToString();
                                    detail.BaseUpfront = reader["BaseUpfront"].ToString();
                                    detail.AdditionalIncentives = reader["AdditionalIncentive"].ToString();
                                    detail.Total = reader["Total"].ToString();
                                    detail.SIPSlabLess = reader["SIPSlabLess"].ToString();
                                    detail.SIPSlabGreater = reader["SIPSlabGreater"].ToString();
                                    detail.PeriodType = reader["PeriodType"].ToString();
                                    detail.PeriodStart = reader["PeriodStart"].ToString();
                                    detail.PeriodEnd = reader["PeriodEnd"].ToString();
                                    detail.SlabTotal = reader["SlabTotal"].ToString();
                                    detail.IsSlabLess = reader["IsSlabLess"].ToString();
                                    detail.LumpSumGreater = reader["LumpSumGreater"].ToString();
                                    detail.AuditMemoId = Convert.ToString(reader["AuditMemoId"]);
                                    detail.LumpSumGreaterTotal = Convert.ToString(reader["LumpSumGreaterTotal"]);
                                    detail.IsCopied = Convert.ToBoolean(reader["IsCopied"]);
                                    returnValue.Add(detail);
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

        /// <summary>
        /// GetPaymentListAll
        /// </summary>
        /// <param name="PaymentMemoID"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        public List<PaymentList> GetPaymentListAll(Int64 PaymentMemoID, out Exception error)
        {
            try
            {
                List<PaymentList> returnValue = new List<PaymentList>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetPaymentListALL, PaymentMemoID))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    PaymentList list = new PaymentList();
                                    //list.PaymentListId = reader["PaymentListId"].ToString();
                                    list.SchemeId = reader["SchemeId"].ToString();
                                    list.SchemeName = reader["SchemeName"].ToString();
                                    list.SchemeCategoryId = reader["SchemeCategoryId"].ToString();
                                    list.SchemeCategoryName = reader["SchemeCategoryName"].ToString();
                                    list.DistributorCategoryId = reader["DistributorCategoryId"].ToString();
                                    list.DistributorCategoryName = reader["DistributorCategoryName"].ToString();
                                    list.PaymentMemoId = reader["PaymentMemoId"].ToString();
                                    list.PaymentType = reader["PaymentType"].ToString();
                                    list.ARNNO = reader["ARNNO"].ToString();
                                    list.ARNName = HttpUtility.HtmlDecode(reader["ARNName"].ToString());
                                    list.DateFrom = reader["DateFrom"].ToString();
                                    list.DateTo = reader["DateTo"].ToString();
                                    list.SlabType = reader["SlabType"].ToString();
                                    list.SlabAmount = reader["SlabAmount"].ToString();
                                    list.PaymentBasis = reader["PaymentBasis"].ToString();
                                    list.Target = Convert.ToInt64(reader["Target"]).ToString();
                                    list.TargetPeriod = reader["TargetPeriod"].ToString();
                                    list.InterestRate = reader["InterestRate"].ToString();
                                    list.InstallmentCondition = reader["InstalmentCondition"].ToString();
                                    list.InstallmentRangeFrom = reader["InstallmentRangeFrom"].ToString();
                                    list.InstallmentRangeTo = reader["InstallmentRangeTo"].ToString();
                                    list.TenureCondition = reader["TenureCondition"].ToString();
                                    list.TenureMonths = reader["TenureMonths"].ToString();
                                    list.UpfrontPaymentType = reader["UpfrontPaymentType"].ToString();
                                    list.UpfrontValue = reader["UpfrontValue"].ToString();
                                    list.Calculation = reader["Calculation"].ToString();
                                    list.Clawback = reader["Clawback"].ToString();
                                    list.SIPIncentiveRemarks = reader["SIPIncentiveRemarks"].ToString();
                                    list.FreeTextField1 = reader["FreeTextField1"].ToString();
                                    list.FreeTextField2 = reader["FreeTextField2"].ToString();
                                    list.Onwards = reader["Onwards"].ToString();
                                    list.Folio = reader["Folio"].ToString();
                                    list.SIPSlab = reader["SIPSlab"].ToString();
                                    list.SIPRowId = reader["SIPRowId"].ToString();
                                    //memo.IsActive = Convert.ToBoolean(reader["IsActive"]);
                                    //memo.CreatedBy = Convert.ToInt64(reader["CreatedBy"]);
                                    //memo.CreatedBy = Convert.ToInt64(reader["CreatedBy"]);
                                    //memo.CreatedBy = Convert.ToInt64(reader["CreatedBy"]);
                                    returnValue.Add(list);
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

        /// <summary>
        /// GetPaymentListAll
        /// </summary>
        /// <param name="PaymentMemoID"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        public List<PaymentList> GetPaymentListForModifyValidity(Int64 PaymentMemoID, out Exception error)
        {
            try
            {
                List<PaymentList> returnValue = new List<PaymentList>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetPaymentListForModifyValidity, PaymentMemoID))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    PaymentList list = new PaymentList();
                                    list.DistributorCategoryId = reader["DistributorCategoryId"].ToString();
                                    list.DistributorCategoryName = reader["DistributorCategoryName"].ToString();
                                    list.ARNNO = reader["ARNNO"].ToString();
                                    list.ARNName = HttpUtility.HtmlDecode(reader["ARNName"].ToString());
                                    list.DateFrom = reader["DateFrom"].ToString();
                                    list.DateTo = reader["DateTo"].ToString();

                                    returnValue.Add(list);
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

        /// <summary>
        /// GetPaymentListTieUp
        /// </summary>
        /// <param name="PaymentMemoID"></param>
        /// <param name="error"></param>
        /// <returns>List<PaymentList></returns>
        public List<PaymentList> GetPaymentListTieUp(Int64 PaymentMemoID, out Exception error)
        {
            try
            {
                List<PaymentList> returnValue = new List<PaymentList>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetPaymentListTieup, PaymentMemoID))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    PaymentList list = new PaymentList();
                                    list.PaymentListId = reader["PaymentListId"].ToString();
                                    list.SchemeId = reader["SchemeId"].ToString();
                                    list.SchemeName = reader["SchemeName"].ToString();
                                    list.SchemeCategoryId = reader["SchemeCategoryId"].ToString();
                                    list.SchemeCategoryName = reader["SchemeCategoryName"].ToString();
                                    list.DistributorCategoryId = reader["DistributorCategoryId"].ToString();
                                    list.DistributorCategoryName = reader["DistributorCategoryName"].ToString();
                                    list.PaymentMemoId = reader["PaymentMemoId"].ToString();
                                    list.PaymentType = reader["PaymentType"].ToString();
                                    list.ARNNO = reader["ARNNO"].ToString();
                                    list.ARNName = HttpUtility.HtmlDecode(reader["ARNName"].ToString());
                                    list.DateFrom = reader["DateFrom"].ToString();
                                    list.DateTo = reader["DateTo"].ToString();
                                    list.SlabType = reader["SlabType"].ToString();
                                    list.SlabAmount = reader["SlabAmount"].ToString();
                                    list.PaymentBasis = reader["PaymentBasis"].ToString();
                                    list.Target = Convert.ToInt64(reader["Target"]).ToString();
                                    list.TargetPeriod = reader["TargetPeriod"].ToString();
                                    list.InterestRate = reader["InterestRate"].ToString();
                                    list.InstallmentCondition = reader["InstalmentCondition"].ToString();
                                    list.InstallmentRangeFrom = reader["InstallmentRangeFrom"].ToString();
                                    list.InstallmentRangeTo = reader["InstallmentRangeTo"].ToString();
                                    list.TenureCondition = reader["TenureCondition"].ToString();
                                    list.TenureMonths = reader["TenureMonths"].ToString();
                                    list.UpfrontPaymentType = reader["UpfrontPaymentType"].ToString();
                                    list.UpfrontValue = reader["UpfrontValue"].ToString();
                                    list.Calculation = reader["Calculation"].ToString();
                                    list.Clawback = reader["Clawback"].ToString();
                                    list.SIPIncentiveRemarks = reader["SIPIncentiveRemarks"].ToString();
                                    list.FreeTextField1 = reader["FreeTextField1"].ToString();
                                    list.FreeTextField2 = reader["FreeTextField2"].ToString();
                                    list.Onwards = reader["Onwards"].ToString();
                                    list.Folio = reader["Folio"].ToString();
                                    //memo.IsActive = Convert.ToBoolean(reader["IsActive"]);
                                    //memo.CreatedBy = Convert.ToInt64(reader["CreatedBy"]);
                                    //memo.CreatedBy = Convert.ToInt64(reader["CreatedBy"]);
                                    //memo.CreatedBy = Convert.ToInt64(reader["CreatedBy"]);
                                    returnValue.Add(list);
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

        /// <summary>
        /// GetPaymentListSIP
        /// </summary>
        /// <param name="PaymentMemoID"></param>
        /// <param name="error"></param>
        /// <returns>List<PaymentList></returns>
        public List<PaymentList> GetPaymentListSIP(Int64 PaymentMemoID, out Exception error)
        {
            try
            {
                List<PaymentList> returnValue = new List<PaymentList>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetPaymentListSIP, PaymentMemoID))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    PaymentList list = new PaymentList();
                                    list.SIPRowId = reader["SIPRowId"].ToString();
                                    list.SchemeCategoryId = reader["SchemeCategoryId"].ToString();
                                    list.SchemeCategoryName = reader["SchemeCategoryName"].ToString();
                                    list.SchemeId = reader["SchemeId"].ToString();
                                    list.SchemeName = reader["SchemeName"].ToString();
                                    list.DistributorCategoryId = reader["DistributorCategoryId"].ToString();
                                    list.DistributorCategoryName = reader["DistributorCategoryName"].ToString();
                                    list.PaymentMemoId = reader["PaymentMemoId"].ToString();
                                    list.PaymentType = reader["PaymentType"].ToString();
                                    list.SlabType = reader["SlabType"].ToString();
                                    //list.ARNNO = reader["ARNNO"].ToString();
                                    //list.ARNName = HttpUtility.HtmlDecode(reader["ARNName"].ToString());
                                    //list.DateFrom = reader["DateFrom"].ToString();
                                    //list.DateTo = reader["DateTo"].ToString();

                                    list.SlabAmount = reader["SlabAmount"].ToString();
                                    list.PaymentBasis = reader["PaymentBasis"].ToString();
                                    list.Target = Convert.ToInt64(reader["Target"]).ToString();
                                    list.TargetPeriod = reader["TargetPeriod"].ToString();
                                    list.InterestRate = reader["InterestRate"].ToString();
                                    list.InstallmentCondition = reader["InstalmentCondition"].ToString();
                                    list.InstallmentRangeFrom = reader["InstallmentRangeFrom"].ToString();
                                    list.InstallmentRangeTo = reader["InstallmentRangeTo"].ToString();
                                    list.TenureCondition = reader["TenureCondition"].ToString();
                                    list.TenureMonths = reader["TenureMonths"].ToString();
                                    list.UpfrontPaymentType = reader["UpfrontPaymentType"].ToString();
                                    list.UpfrontValue = reader["UpfrontValue"].ToString();
                                    list.Calculation = reader["Calculation"].ToString();
                                    list.Clawback = reader["Clawback"].ToString();
                                    list.SIPIncentiveRemarks = reader["SIPIncentiveRemarks"].ToString();
                                    list.FreeTextField1 = reader["FreeTextField1"].ToString();
                                    list.FreeTextField2 = reader["FreeTextField2"].ToString();
                                    list.Onwards = reader["Onwards"].ToString();
                                    list.Folio = reader["Folio"].ToString();
                                    returnValue.Add(list);
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

        public List<PaymentList> GetTieUpARNCategory(Int64 PaymentMemoID)
        {
            try
            {
                List<PaymentList> returnValue = new List<PaymentList>();

                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetTieUpArnCategory, PaymentMemoID))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                PaymentList list = new PaymentList();

                                list.DistributorCategoryId = reader["DistributorCategoryId"].ToString();
                                list.DistributorCategoryName = reader["DistributorCategoryName"].ToString();
                                list.PaymentMemoId = reader["PaymentMemoId"].ToString();
                                //list.PaymentType = reader["PaymentType"].ToString();
                                list.ARNNO = reader["ARNNO"].ToString();
                                list.ARNName = HttpUtility.HtmlDecode(reader["ARNName"].ToString());
                                list.DateFrom = reader["DateFrom"].ToString();
                                list.DateTo = reader["DateTo"].ToString();

                                returnValue.Add(list);
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

        /// <summary>
        /// Get Payment Details
        /// </summary>
        /// <param name="PaymentListID"></param>
        /// <param name="error"></param>
        /// <returns>List<PaymentDetails></returns>
        public List<PaymentDetails> GetPaymentDetails(Int64 PaymentListID, out Exception error)
        {
            try
            {
                List<PaymentDetails> returnValue = new List<PaymentDetails>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetPaymentDetails, PaymentListID))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    PaymentDetails detail = new PaymentDetails();
                                    detail.PaymentDetailsId = reader["PaymentDetailsId"].ToString();
                                    detail.PaymentMemoId = reader["PaymentMemoId"].ToString();
                                    detail.SchemeId = reader["SchemeId"].ToString();
                                    detail.BrokerageTypeId = reader["BrokerageTypeId"].ToString();
                                    detail.PaymentListId = reader["PaymentListId"].ToString();
                                    detail.LumpSumLessTieup = reader["LumpSumLessTieup"].ToString();
                                    detail.LumpSumGreaterTieup = reader["LumpSumGreaterTieup"].ToString();
                                    detail.BaseUpfront = reader["BaseUpfront"].ToString();
                                    detail.AdditionalIncentives = reader["AdditionalIncentive"].ToString();
                                    detail.Total = reader["Total"].ToString();
                                    detail.SIPSlabLess = reader["SIPSlabLess"].ToString();
                                    detail.SIPSlabGreater = reader["SIPSlabGreater"].ToString();
                                    detail.PeriodType = reader["PeriodType"].ToString();
                                    detail.PeriodStart = reader["PeriodStart"].ToString();
                                    detail.PeriodEnd = reader["PeriodEnd"].ToString();
                                    detail.SlabTotal = reader["SlabTotal"].ToString();
                                    detail.IsSlabLess = reader["IsSlabLess"].ToString();
                                    detail.LumpSumGreater = reader["LumpSumGreater"].ToString();
                                    detail.LumpSumGreaterTotal = reader["LumpSumGreaterTotal"].ToString();
                                    detail.IsCopied = Convert.ToBoolean(reader["IsCopied"]);
                                    returnValue.Add(detail);
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

        /// <summary>
        /// Get Payment Memo
        /// </summary>
        /// <param name="PaymentMemoID"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        public List<PaymentMemo> GetPaymentMemo(Int64 PaymentMemoID, out Exception error)
        {
            try
            {
                List<PaymentMemo> returnValue = new List<PaymentMemo>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetPaymentMemo, PaymentMemoID))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    PaymentMemo memo = new PaymentMemo();
                                    memo.PaymentMemoId = reader["PaymentMemoId"].ToString();
                                    memo.MemoNumber = reader["MemoNumber"].ToString();
                                    memo.BranchId = reader["BranchId"].ToString();
                                    memo.ZoneId = reader["ZoneId"].ToString();
                                    memo.MemoTypeId = reader["MemoTypeId"].ToString();
                                    memo.PaymentAmount = reader["PaymentAmount"].ToString();
                                    memo.DateFrom = reader["DateFrom"].ToString();
                                    memo.DateTo = reader["DateTo"].ToString(); //reader["DateTo"].ToString();
                                    memo.ApplicableTo = reader["ApplicableTo"].ToString();
                                    memo.TransactionType = reader["TransactionType"].ToString();
                                    memo.SlabType = reader["SlabType"].ToString();
                                    memo.SlabAmount = reader["SlabAmount"].ToString();
                                    memo.SlabCondition = reader["SlabCondition"].ToString();
                                    memo.Remarks = reader["Remarks"].ToString();
                                    memo.Comments = reader["Comments"].ToString();
                                    memo.MemoStatus = reader["MemoStatus"].ToString();
                                    memo.CreatedBy = reader["CreatedBy"].ToString();
                                    memo.LoginId = reader["LoginId"].ToString();
                                    memo.TransactionTypeOthers = reader["TransactionTypeOthers"].ToString();
                                    memo.SIPNotes = reader["SIPNotes"].ToString();
                                    memo.IsCloseEnded = reader["IsCloseEnded"].ToString();
                                    memo.LumpsumSIPTypeId = Convert.ToInt64(reader["LumpsumSIPId"]);
                                    memo.LumpsumSIPType = reader["LumpsumSIPType"].ToString();
                                    //memo.IsActive = Convert.ToBoolean(reader["IsActive"]);
                                    //memo.CreatedBy = Convert.ToInt64(reader["CreatedBy"]);
                                    //memo.CreatedBy = Convert.ToInt64(reader["CreatedBy"]);
                                    //memo.CreatedBy = Convert.ToInt64(reader["CreatedBy"]);
                                    returnValue.Add(memo);
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

                //DataMapper<PaymentMemo> dataMapper = new DataMapper<PaymentMemo>(Constants.connection, Constants.SpGetPaymentMemo);
                //return dataMapper.Get(PaymentMemoID, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="PaymentMemoID"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        public PaymentList GetPaymentListByScheme(Int64 SchemeID, string ARN, string DistributorCategory, out Exception error)
        {
            try
            {
                List<PaymentList> returnValue = new List<PaymentList>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetPaymentListByScheme))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@SchemeId";
                            parameter.Value = SchemeID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@ARN";
                            parameter.Value = ARN;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@DistributorCategory";
                            parameter.Value = DistributorCategory;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    PaymentList list = new PaymentList();
                                    list.SchemeId = reader["SchemeId"].ToString();
                                    list.SchemeName = reader["SchemeName"].ToString();
                                    list.SchemeCategoryId = reader["SchemeCategoryId"].ToString();
                                    list.SchemeCategoryName = reader["SchemeCategoryName"].ToString();
                                    list.PaymentMemoId = reader["PaymentMemoId"].ToString();
                                    list.SlabType = reader["SlabType"].ToString();
                                    list.SlabAmount = reader["SlabAmount"].ToString();
                                    list.PaymentType = reader["PaymentType"].ToString();
                                    list.PaymentBasis = reader["PaymentBasis"].ToString();
                                    list.Target = Convert.ToInt64(reader["Target"]).ToString();
                                    list.TargetPeriod = reader["TargetPeriod"].ToString();
                                    list.InterestRate = reader["InterestRate"].ToString();
                                    list.InstallmentCondition = reader["InstalmentCondition"].ToString();
                                    list.InstallmentRangeFrom = reader["InstallmentRangeFrom"].ToString();
                                    list.InstallmentRangeTo = reader["InstallmentRangeTo"].ToString();
                                    list.TenureCondition = reader["TenureCondition"].ToString();
                                    list.TenureMonths = reader["TenureMonths"].ToString();
                                    list.UpfrontPaymentType = reader["UpfrontPaymentType"].ToString();
                                    list.UpfrontValue = reader["UpfrontValue"].ToString();
                                    list.Calculation = reader["Calculation"].ToString();
                                    list.Clawback = reader["Clawback"].ToString();
                                    list.SIPIncentiveRemarks = reader["SIPIncentiveRemarks"].ToString();
                                    list.FreeTextField1 = reader["FreeTextField1"].ToString();
                                    list.FreeTextField2 = reader["FreeTextField2"].ToString();
                                    list.Onwards = reader["Onwards"].ToString();
                                    list.Folio = reader["Folio"].ToString();
                                    list.SIPSlab = reader["SIPSlab"].ToString();
                                    returnValue.Add(list);
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

                return returnValue.FirstOrDefault();
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// GetAvailableSchemeTieup
        /// </summary>
        /// <param name="PaymentMemoID"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        public PaymentList GetAvailableSchemeTieup(string SchemeID, string ARN, string DistributorCategory, string DateFrom, string DateTo, out Exception error)
        {
            try
            {
                List<PaymentList> returnValue = new List<PaymentList>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetAvailableSchemeTieup))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@SchemeId";
                            parameter.Value = SchemeID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@ARN";
                            parameter.Value = ARN;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@DistributorCategory";
                            parameter.Value = DistributorCategory;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@DateFrom";
                            parameter.Value = DateFrom;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@DateTo";
                            parameter.Value = DateTo;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    PaymentList list = new PaymentList();
                                    list.SchemeId = reader["SchemeId"].ToString();
                                    list.SchemeName = reader["SchemeName"].ToString();
                                    list.SchemeCategoryId = reader["SchemeCategoryId"].ToString();
                                    list.SchemeCategoryName = reader["SchemeCategoryName"].ToString();
                                    list.PaymentMemoId = reader["PaymentMemoId"].ToString();
                                    list.SlabType = reader["SlabType"].ToString();
                                    list.SlabAmount = reader["SlabAmount"].ToString();
                                    list.PaymentType = reader["PaymentType"].ToString();
                                    list.PaymentBasis = reader["PaymentBasis"].ToString();
                                    list.Target = Convert.ToInt64(reader["Target"]).ToString();
                                    list.TargetPeriod = reader["TargetPeriod"].ToString();
                                    list.InterestRate = reader["InterestRate"].ToString();
                                    list.InstallmentCondition = reader["InstalmentCondition"].ToString();
                                    list.InstallmentRangeFrom = reader["InstallmentRangeFrom"].ToString();
                                    list.InstallmentRangeTo = reader["InstallmentRangeTo"].ToString();
                                    list.TenureCondition = reader["TenureCondition"].ToString();
                                    list.TenureMonths = reader["TenureMonths"].ToString();
                                    list.UpfrontPaymentType = reader["UpfrontPaymentType"].ToString();
                                    list.UpfrontValue = reader["UpfrontValue"].ToString();
                                    list.Calculation = reader["Calculation"].ToString();
                                    list.Clawback = reader["Clawback"].ToString();
                                    list.SIPIncentiveRemarks = reader["SIPIncentiveRemarks"].ToString();
                                    list.FreeTextField1 = reader["FreeTextField1"].ToString();
                                    list.FreeTextField2 = reader["FreeTextField2"].ToString();
                                    list.Onwards = reader["Onwards"].ToString();
                                    list.Folio = reader["Folio"].ToString();
                                    list.SIPSlab = reader["SIPSlab"].ToString();
                                    returnValue.Add(list);
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

                return returnValue.FirstOrDefault();
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// GetPaymentListForTieupOnCreate
        /// </summary>
        /// <param name="PaymentMemoID"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        public PaymentList GetPaymentListForTieupOnCreate(string SchemeID, string ARN, string DistributorCategory, string DateFrom, string DateTo, out Exception error)
        {
            try
            {
                List<PaymentList> returnValue = new List<PaymentList>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetPaymentListForTieupOnCreate))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@SchemeId";
                            parameter.Value = SchemeID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@ARN";
                            parameter.Value = ARN;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@DistributorCategory";
                            parameter.Value = DistributorCategory;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@DateFrom";
                            parameter.Value = DateFrom;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@DateTo";
                            parameter.Value = DateTo;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    PaymentList list = new PaymentList();
                                    list.SchemeId = reader["SchemeId"].ToString();
                                    list.SchemeName = reader["SchemeName"].ToString();
                                    list.SchemeCategoryId = reader["SchemeCategoryId"].ToString();
                                    list.SchemeCategoryName = reader["SchemeCategoryName"].ToString();
                                    list.PaymentMemoId = reader["PaymentMemoId"].ToString();
                                    list.SlabType = reader["SlabType"].ToString();
                                    list.SlabAmount = reader["SlabAmount"].ToString();
                                    list.PaymentType = reader["PaymentType"].ToString();
                                    list.PaymentBasis = reader["PaymentBasis"].ToString();
                                    list.Target = Convert.ToInt64(reader["Target"]).ToString();
                                    list.TargetPeriod = reader["TargetPeriod"].ToString();
                                    list.InterestRate = reader["InterestRate"].ToString();
                                    list.InstallmentCondition = reader["InstalmentCondition"].ToString();
                                    list.InstallmentRangeFrom = reader["InstallmentRangeFrom"].ToString();
                                    list.InstallmentRangeTo = reader["InstallmentRangeTo"].ToString();
                                    list.TenureCondition = reader["TenureCondition"].ToString();
                                    list.TenureMonths = reader["TenureMonths"].ToString();
                                    list.UpfrontPaymentType = reader["UpfrontPaymentType"].ToString();
                                    list.UpfrontValue = reader["UpfrontValue"].ToString();
                                    list.Calculation = reader["Calculation"].ToString();
                                    list.Clawback = reader["Clawback"].ToString();
                                    list.SIPIncentiveRemarks = reader["SIPIncentiveRemarks"].ToString();
                                    list.FreeTextField1 = reader["FreeTextField1"].ToString();
                                    list.FreeTextField2 = reader["FreeTextField2"].ToString();
                                    list.Onwards = reader["Onwards"].ToString();
                                    list.Folio = reader["Folio"].ToString();
                                    list.SIPSlab = reader["SIPSlab"].ToString();
                                    returnValue.Add(list);
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

                return returnValue.FirstOrDefault();
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Get Payment List By ARN
        /// </summary>
        /// <param name="SchemeID"></param>
        /// <param name="ARN"></param>
        /// <param name="DistributorCategory"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        public List<PaymentList> GetPaymentListByARN(string ARN, string DistributorCategory, string DateFrom, string DateTo, out Exception error)
        {
            try
            {
                List<PaymentList> returnValue = new List<PaymentList>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetPaymentListByARN))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@ARN";
                            parameter.Value = ARN;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@DistributorCategory";
                            parameter.Value = DistributorCategory;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@DateFrom";
                            parameter.Value = DateFrom;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@DateTo";
                            parameter.Value = DateTo;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    PaymentList list = new PaymentList();
                                    list.SchemeId = reader["SchemeId"].ToString();
                                    list.SchemeName = reader["SchemeName"].ToString();
                                    list.SchemeCategoryId = reader["SchemeCategoryId"].ToString();
                                    list.SchemeCategoryName = reader["SchemeCategoryName"].ToString();
                                    list.PaymentMemoId = reader["PaymentMemoId"].ToString();
                                    list.SlabType = reader["SlabType"].ToString();
                                    list.SlabAmount = reader["SlabAmount"].ToString();
                                    list.PaymentType = reader["PaymentType"].ToString();
                                    list.PaymentBasis = reader["PaymentBasis"].ToString();
                                    list.Target = Convert.ToInt64(reader["Target"]).ToString();
                                    list.TargetPeriod = reader["TargetPeriod"].ToString();
                                    list.InterestRate = reader["InterestRate"].ToString();
                                    list.InstallmentCondition = reader["InstalmentCondition"].ToString();
                                    list.InstallmentRangeFrom = reader["InstallmentRangeFrom"].ToString();
                                    list.InstallmentRangeTo = reader["InstallmentRangeTo"].ToString();
                                    list.TenureCondition = reader["TenureCondition"].ToString();
                                    list.TenureMonths = reader["TenureMonths"].ToString();
                                    list.UpfrontPaymentType = reader["UpfrontPaymentType"].ToString();
                                    list.UpfrontValue = reader["UpfrontValue"].ToString();
                                    list.Calculation = reader["Calculation"].ToString();
                                    list.Clawback = reader["Clawback"].ToString();
                                    list.SIPIncentiveRemarks = reader["SIPIncentiveRemarks"].ToString();
                                    list.FreeTextField1 = reader["FreeTextField1"].ToString();
                                    list.FreeTextField2 = reader["FreeTextField2"].ToString();
                                    list.Onwards = reader["Onwards"].ToString();
                                    list.Folio = reader["Folio"].ToString();
                                    list.SIPSlab = reader["SIPSlab"].ToString();
                                    returnValue.Add(list);
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

        /// <summary>
        /// GetPaymentDetailsByScheme
        /// </summary>
        /// <param name="PaymentListID"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        public List<PaymentDetails> GetPaymentDetailsByScheme(Int64 SchemeID, Int64 PaymentMemoID, out Exception error)
        {
            try
            {
                List<PaymentDetails> returnValue = new List<PaymentDetails>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetPaymentDetailsByScheme))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@SchemeID";
                            parameter.Value = SchemeID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@PaymentMemoID";
                            parameter.Value = PaymentMemoID;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    PaymentDetails detail = new PaymentDetails();
                                    detail.PaymentDetailsId = reader["PaymentDetailsId"].ToString();
                                    detail.PaymentMemoId = reader["PaymentMemoId"].ToString();
                                    detail.SchemeId = reader["SchemeId"].ToString();
                                    detail.BrokerageTypeId = reader["BrokerageTypeId"].ToString();
                                    detail.PaymentListId = reader["PaymentListId"].ToString();
                                    detail.LumpSumLessTieup = reader["LumpSumLessTieup"].ToString();
                                    detail.LumpSumGreaterTieup = reader["LumpSumGreaterTieup"].ToString();
                                    detail.BaseUpfront = reader["BaseUpfront"].ToString();
                                    detail.AdditionalIncentives = reader["AdditionalIncentive"].ToString();
                                    detail.Total = reader["Total"].ToString();
                                    detail.SIPSlabLess = reader["SIPSlabLess"].ToString();
                                    detail.SIPSlabGreater = reader["SIPSlabGreater"].ToString();
                                    detail.PeriodType = reader["PeriodType"].ToString();
                                    detail.PeriodStart = reader["PeriodStart"].ToString();
                                    detail.PeriodEnd = reader["PeriodEnd"].ToString();
                                    detail.SlabTotal = reader["SlabTotal"].ToString();
                                    detail.IsSlabLess = reader["IsSlabLess"].ToString();
                                    detail.LumpSumGreater = reader["LumpSumGreater"].ToString();
                                    detail.LumpSumGreaterTotal = reader["LumpSumGreaterTotal"].ToString();
                                    detail.IsCopied = Convert.ToBoolean(reader["IsCopied"]);
                                    returnValue.Add(detail);
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

        /// <summary>
        /// Get Exit Load
        /// </summary>
        /// <param name="ID"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        public List<Exit_Load> GetExitLoad(Int64 ID, out Exception error)
        {
            try
            {
                DataMapper<Exit_Load> dataMapper = new DataMapper<Exit_Load>(Constants.connection, Constants.SpGetExitLoad);
                return dataMapper.GetListByID(ID, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Get Search Result for Create Base Rack Rate
        /// </summary>
        /// <param name="Channel"></param>
        /// <param name="DistributorCategory"></param>
        /// <param name="ARNNo"></param>
        /// <param name="exError"></param>
        /// <returns>List<RackRateSearchResult></returns>
        public List<RackRateSearchResult> GetSearchResult(string Channel, string DistributorCategory, string ARNNo, string Status, string MasterQueueStatus, string ARNName, string SearchFilter, Int32 UserID, string _commandText, string MemoLevel, out Exception exError)
        {
            List<RackRateSearchResult> returnValue = new List<RackRateSearchResult>();
            exError = null;
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@Channel";
                        parameter.Value = Channel;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@DistributorCategory";
                        parameter.Value = DistributorCategory;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ARNNO";
                        parameter.Value = ARNNo;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ARNName";
                        parameter.Value = ARNName;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Status";
                        parameter.Value = Status;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MasterQueueStatus";
                        parameter.Value = MasterQueueStatus;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@SearchFilter";
                        parameter.Value = SearchFilter;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MemoLevel";
                        parameter.Value = MemoLevel;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = _db.ExecuteReader(command))
                        {
                            returnValue = Conversion.ConvertDataReaderToList<RackRateSearchResult>(reader);
                        }
                        connection.Close();
                    }
                }
            }
            catch (InvalidOperationException invalid)
            {
                exError = invalid;
            }
            catch (Exception ex)
            {
                exError = ex;
            }
            return returnValue;
        }

        /// <summary>
        /// Save Base Rack Rate
        /// </summary>
        /// <param name="Memo"></param>
        /// <param name="List"></param>
        /// <param name="Details"></param>
        /// <returns>bool</returns>
        public bool SaveBaseRackRate(DataTable Memo, DataTable List, DataTable Details, string _commandText)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@PaymentMemo";
                        parameter.Value = Memo;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@paymentList";
                        parameter.Value = List;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@paymentDetails";
                        parameter.Value = Details;
                        command.Parameters.Add(parameter);

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

        /// <summary>
        /// MemoExists
        /// </summary>
        /// <param name="ArnNo"></param>
        /// <param name="Channel"></param>
        /// <param name="DistributorCategory"></param>
        /// <returns></returns>
        public string MemoExists(string ArnNo, string Channel, string DistributorCategory, string schemeid, string DateFrom, string DateTo, string MemoId, string TransactionType, string MemoType, string _commandText)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@channel";
                        parameter.Value = Channel;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@distributorcategory";
                        parameter.Value = DistributorCategory;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@arnNo";
                        parameter.Value = ArnNo;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@schemeId";
                        parameter.Value = schemeid;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@datefrom";
                        parameter.Value = DateFrom;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@dateto";
                        parameter.Value = DateTo;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@memoid";
                        parameter.Value = MemoId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@TransactionType";
                        parameter.Value = TransactionType;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MemoTypeId";
                        parameter.Value = MemoType;
                        command.Parameters.Add(parameter);

                        command.ExecuteNonQuery();
                        connection.Close();
                    }
                }
                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        /// <summary>
        /// SIPMemoExists
        /// </summary>
        /// <param name="ArnNo"></param>
        /// <param name="Channel"></param>
        /// <param name="DistributorCategory"></param>
        /// <param name="schemeid"></param>
        /// <param name="DateFrom"></param>
        /// <param name="DateTo"></param>
        /// <param name="MemoId"></param>
        /// <param name="TransactionType"></param>
        /// <param name="_commandText"></param>
        /// <returns></returns>
        public string SIPMemoExists(string ArnNo, string DistributorCategory, string schemeid, string schemeCategoryid, string DateFrom, string DateTo, string MemoId, string TransactionType, string _commandText)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@arnNo";
                        parameter.Value = ArnNo;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@distributorcategory";
                        parameter.Value = DistributorCategory;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@schemeId";
                        parameter.Value = schemeid;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@schemeCategoryId";
                        parameter.Value = schemeCategoryid;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@datefrom";
                        parameter.Value = DateFrom;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@dateto";
                        parameter.Value = DateTo;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@memoid";
                        parameter.Value = MemoId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@TransactionType";
                        parameter.Value = TransactionType;
                        command.Parameters.Add(parameter);

                        command.ExecuteNonQuery();
                        connection.Close();
                    }
                }
                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        /// <summary>
        /// Insert Payment Memo and return inserted Payment Memo ID
        /// </summary>
        /// <param name="Memo"></param>
        /// <param name="List"></param>
        /// <param name="Details"></param>
        /// <returns>Int64</returns>
        public Int64 SavePaymentMemo(PaymentMemo Memo, Int64 UserId, string _commandText)
        {
            try
            {
                Int64 PaymentMemoID = 0;
                using (DbCommand command = _db.GetSqlStringCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@BranchId";
                        parameter.Value = Memo.BranchId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ZoneId";
                        parameter.Value = Memo.ZoneId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MemoTypeId";
                        parameter.Value = Memo.MemoTypeId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@PaymentAmount";
                        parameter.Value = Memo.PaymentAmount;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@DateFrom";
                        parameter.Value = DateTime.ParseExact(Memo.DateFrom.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@DateTo";
                        parameter.Value = DateTime.ParseExact(Memo.DateTo.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ApplicableTo";
                        parameter.Value = Memo.ApplicableTo;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@TransactionType";
                        parameter.Value = Memo.TransactionType;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@SlabType";
                        parameter.Value = Memo.SlabType;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@SlabAmount";
                        parameter.Value = Memo.SlabAmount;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@SlabCondition";
                        parameter.Value = Memo.SlabCondition;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Remarks";
                        parameter.Value = Memo.Remarks.Replace("'", "`");
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Comments";
                        parameter.Value = Memo.Comments.Replace("'", "`");
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MemoStatus";
                        parameter.Value = Memo.MemoStatus;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@CreatedBy";
                        parameter.Value = UserId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@CreatedDate";
                        parameter.Value = DateTime.Now;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ModifiedBy";
                        parameter.Value = UserId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ModifiedDate";
                        parameter.Value = DateTime.Now;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@IsActive";
                        parameter.Value = true;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@TransactionTypeOthers";
                        parameter.Value = Memo.TransactionTypeOthers;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@CopiedMemoID";
                        parameter.Value = Memo.CopiedMemoID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@SIPNotes";
                        parameter.Value = Memo.SIPNotes.Replace("'", "`");
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@IsCloseEnded";
                        parameter.Value = Memo.IsCloseEnded;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@PaymentMemoLinkId";
                        parameter.Value = Memo.PaymentMemoLinkId == null ? 0 : Memo.PaymentMemoLinkId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@LumpsumSIPTypeId";
                        parameter.Value = Memo.LumpsumSIPTypeId == null ? 0 : Memo.LumpsumSIPTypeId;
                        command.Parameters.Add(parameter);


                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@IsSaved";
                        parameter.Value = Memo.IsSaved == null ? false : Memo.IsSaved;
                        command.Parameters.Add(parameter);

                        PaymentMemoID = Convert.ToInt64(command.ExecuteScalar());
                        connection.Close();
                    }
                }
                return PaymentMemoID;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Insert Payment List
        /// </summary>
        /// <param name="Memo"></param>
        /// <param name="List"></param>
        /// <param name="Details"></param>
        /// <returns>bool</returns>
        public bool SavePaymentList(PaymentList pList, Int64 PaymentMemoID, Int64 UserId, string _commandText)
        {
            try
            {
                using (DbCommand command = _db.GetSqlStringCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@SchemeId";
                        parameter.Value = pList.SchemeId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@SchemeCategoryId";
                        parameter.Value = pList.SchemeCategoryId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@DistributorCategoryId";
                        parameter.Value = pList.DistributorCategoryId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@PaymentMemoID";
                        parameter.Value = PaymentMemoID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@PaymentType";
                        parameter.Value = pList.PaymentType;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ARNNO";
                        parameter.Value = pList.ARNNO;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ARNName";
                        parameter.Value = pList.ARNName;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@DateFrom";
                        parameter.Value = DateTime.ParseExact(pList.DateFrom.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@DateTo";
                        parameter.Value = DateTime.ParseExact(pList.DateTo.Insert(6, "20"), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@SlabType";
                        parameter.Value = pList.SlabType;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@SlabAmount";
                        parameter.Value = pList.SlabAmount;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@PaymentBasis";
                        parameter.Value = pList.PaymentBasis;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Target";
                        parameter.Value = pList.Target;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@TargetPeriod";
                        parameter.Value = pList.TargetPeriod;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@InterestRate";
                        parameter.Value = pList.InterestRate;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@InstalmentCondition";
                        parameter.Value = pList.InstallmentCondition;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@InstallmentRangeFrom";
                        parameter.Value = pList.InstallmentRangeFrom;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@InstallmentRangeTo";
                        parameter.Value = pList.InstallmentRangeTo;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@TenureCondition";
                        parameter.Value = pList.TenureCondition;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@TenureMonths";
                        parameter.Value = pList.TenureMonths;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UpfrontPaymentType";
                        parameter.Value = pList.UpfrontPaymentType;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UpfrontValue";
                        parameter.Value = pList.UpfrontValue;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Calculation";
                        parameter.Value = pList.Calculation;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Clawback";
                        parameter.Value = pList.Clawback;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@SIPIncentiveRemarks";
                        parameter.Value = pList.SIPIncentiveRemarks;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@FreeTextField1";
                        parameter.Value = pList.FreeTextField1;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@FreeTextField2";
                        parameter.Value = pList.FreeTextField2;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Onwards";
                        parameter.Value = pList.Onwards;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@CreatedBy";
                        parameter.Value = UserId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@CreatedDate";
                        parameter.Value = Convert.ToString(DateTime.Now);
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ModifiedBy";
                        parameter.Value = UserId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ModifiedDate";
                        parameter.Value = Convert.ToString(DateTime.Now);
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@IsActive";
                        parameter.Value = 1;
                        command.Parameters.Add(parameter);

                        command.ExecuteNonQuery();
                        connection.Close();
                        //Int64 id = Convert.ToInt64(command.ExecuteScalar());
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
        /// Insert Payment Details
        /// </summary>
        /// <param name="_commandText"></param>
        /// <returns>bool</returns>
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

        /// <summary>
        /// Check weather Payment list ID is exists in DB to perforn Insert or update
        /// </summary>
        /// <param name="_commandText"></param>
        /// <returns>bool</returns>
        public bool PaymentListExists(string _commandText)
        {
            try
            {
                using (DbCommand command = _db.GetSqlStringCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;
                        using (IDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                return Convert.ToBoolean(reader["paymentlistexists"]);
                            }

                        }
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
        /// Update Batch Staus 
        /// </summary>
        /// <param name="MemoNumber"></param>
        /// <param name="Status"></param>
        /// <param name="UserId"></param>
        /// <param name="_commandText"></param>
        /// <returns>bool</returns>
        public bool UpdateBatchStatus(string MemoNumber, string Status, string Remarks, string UserId, string memoTypeid, string _commandText)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@Memonumber";
                        parameter.Value = MemoNumber;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Status";
                        parameter.Value = Status;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Remarks";
                        parameter.Value = Remarks;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserId";
                        parameter.Value = UserId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MemoTypeId";
                        parameter.Value = memoTypeid;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MemoLevel";
                        parameter.Value = Status == "Active" ? "F" : "";
                        command.Parameters.Add(parameter);


                        command.ExecuteNonQuery();
                        command.Dispose();
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

        public void GenereateMemoNumber(string MemoNumber, string Status, string Remarks, string UserId, string memoTypeid, string _commandText)
        {
            try
            {

                Int64 RoleId = GetRoleIdBasedOnUserID(Convert.ToInt64(UserId));

                if (Status == "Approved" && RoleId > 6)
                {
                    using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@Memonumber";
                            parameter.Value = MemoNumber;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Status";
                            parameter.Value = "Active";
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Remarks";
                            parameter.Value = "";
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@UserId";
                            parameter.Value = UserId;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@MemoTypeId";
                            parameter.Value = memoTypeid;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@MemoLevel";
                            parameter.Value = "A";
                            command.Parameters.Add(parameter);

                            command.ExecuteNonQuery();
                            command.Dispose();
                            connection.Close();
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool UpdateAssignToRole(string MemoNumber, string AssignTo, string UserId, string _commandText)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@Memonumber";
                        parameter.Value = MemoNumber;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@AssignTo";
                        parameter.Value = AssignTo;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserId";
                        parameter.Value = UserId;
                        command.Parameters.Add(parameter);

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

        /// <summary>
        /// InsUpdPaymentMemoRemarks
        /// </summary>
        /// <param name="Remarks"></param>
        /// <param name="PaymentMemoId"></param>
        /// <param name="MemoStatus"></param>
        /// <param name="UserId"></param>
        /// <param name="_commandText"></param>
        /// <returns></returns>
        public bool InsUpdPaymentMemoRemarks(string Remarks, string PaymentMemoId, string MemoStatus, string UserId, string _commandText)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@Remarks";
                        parameter.Value = Remarks;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@PaymentMemoID";
                        parameter.Value = PaymentMemoId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MemoStatus";
                        parameter.Value = MemoStatus;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserId;
                        command.Parameters.Add(parameter);

                        command.ExecuteNonQuery();
                        command.Dispose();
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

        public bool UpdatePaymentMemoAssignTo(string MemoNumber, string UserId, string Status, string _commandText)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@PaymentMemoId";
                        parameter.Value = MemoNumber;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@InsertUserID";
                        parameter.Value = UserId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Status";
                        parameter.Value = Status;
                        command.Parameters.Add(parameter);

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

        /// <summary>
        /// Get View Action
        /// </summary>
        /// <param name="PaymentListID"></param>
        /// <param name="error"></param>
        /// <returns>List<PaymentDetails></returns>
        public ViewAction GetViewAction(Int32 PaymentMemoID, Int32 UserID, Int32 MemoTypeID)
        {
            try
            {
                List<ViewAction> returnValue = new List<ViewAction>();
                object[] Param = { PaymentMemoID, UserID, MemoTypeID };
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetViewAction, Param))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                ViewAction detail = new ViewAction();
                                detail.CurrentStatus = reader["CurrentStatus"].ToString();
                                detail.CreatedBy = Convert.ToInt32(reader["CreatedBy"]);
                                detail.ModifiedBy = Convert.ToInt32(reader["ModifiedBy"]);
                                detail.CreatedByRole = Convert.ToInt32(reader["CreatedByRole"]);
                                detail.ModifiedByRole = Convert.ToInt32(reader["ModifiedByRole"]);
                                detail.CurrentUserRole = Convert.ToInt32(reader["CurrentUserRole"]);
                                detail.LastModifiedBy = Convert.ToInt32(reader["LastModifiedBy"]);
                                detail.LastModifiedStatus = reader["LastModifiedStatus"].ToString();
                                detail.ApprovalRoleID = Convert.ToInt32(reader["ApprovalRoleID"]);
                                detail.MemoLevel = reader["MemoLevel"].ToString();
                                detail.IsSaved = Convert.ToBoolean(reader["IsSaved"]);
                                returnValue.Add(detail);
                            }
                        }
                        connection.Close();
                    }
                }

                return returnValue.SingleOrDefault();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<WorkFlowHierarchy> GetWorkFlowHierarchy(Int32 MemoTypeID)
        {
            try
            {
                Exception error = null;
                DataMapper<WorkFlowHierarchy> dataMapper = new DataMapper<WorkFlowHierarchy>(Constants.connection, Constants.SpGetWorkFlowHierarchy);
                return dataMapper.GetListByID(MemoTypeID, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<string> getmailinglist(string SearchText, out Exception error)
        {
            //try
            //{


            //    DataMapper<Users> dataMapper = new DataMapper<Users>(Constants.connection, Constants.SpGetMailingList);
            //    return dataMapper.Search(SearchText, out error);
            //}
            //catch (Exception)
            //{
            //    throw;
            //}
            error = null;
            List<string> objUsers = new List<string>();
            //string[] objUsers=new string[]{"kathirvelindian@gmail.com","kathirvel@hexagonglobal.in"};
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetMailingList))
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
                            while (reader.Read())
                            {
                                //objUsers.Insert(i, reader.GetString(0));
                                objUsers.Add(reader.GetString(0));
                                //Users newItem = new Users();
                                //newItem.Email = reader.GetString(0);
                                //objUsers.Add(newItem);
                            }
                        }
                        connection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex;
            }
            return objUsers;
        }

        string getvalues(DataTable dt, string express, string column)
        {
            string res = "-";
            DataRow[] dr = new DataRow[100];
            dr = dt.Select(express);
            if (dr.Length > 0)
            {
                if (column == "Onwards")
                {
                    res = dr[0]["Onwards"].ToString();
                    if (res.ToLower() == "true")
                    {
                        res = " & Onwards";
                    }
                    else
                    {
                        res = "";
                    }
                }
                else
                {
                    foreach (DataRow val in dr)
                    {
                        res = val[column].ToString();
                    }
                }
            }
            if (column.ToLower() == "slabamount")
            {
                if (res == "")
                {
                    res = "All Amt";
                }
            }
            return res;
        }

        string getmonths(DataTable dt, string express, string column, int rowval)
        {
            string res = "-";
            DataRow[] dr = new DataRow[100];
            dr = dt.Select(express);
            if (dr.Length > 0)
            {
                if (rowval <= dr.Length)
                {
                    if (column == "")
                    {
                        res = Convert.ToString(dr[rowval]["PeriodStart"]) + " - " + Convert.ToString(dr[rowval]["PeriodEnd"]);
                    }
                    else
                    {
                        res = Convert.ToString(dr[rowval][column]);
                    }
                }
            }
            return res;
        }

        int getmonthcount(DataTable dt, string express)
        {
            int res = 0;
            DataRow[] dr = new DataRow[100];
            dr = dt.Select(express);
            if (dr.Length > 0)
            {
                res = dr.Length;
            }
            return res;
        }

        int getmonthcountall(DataTable dt, string express)
        {
            int res = 0;
            DataRow[] dr = new DataRow[100];
            dr = dt.Select(express);
            if (dr.Length > 0)
            {
                res = dr.Length;
            }
            return res;
        }

        bool checkvaluechange(DataTable dt, string express, int typeval)
        {
            bool retval = true; string com = "";
            DataRow[] dr = new DataRow[1000];
            dr = dt.Select(express);
            string clawback = "-"; string slabamount = "-"; string slabless = "-"; string slabgreater = "-"; string userid = "";
            string total = "-"; string baseupfront = "-"; string additionalincentive = "-"; int periodstart = 0; int periodend = 0;
            int i = 1;
            if (dr.Length > 0)
            {
                switch (typeval)
                {
                    case 0:
                        {
                            foreach (DataRow val in dr)
                            {
                                if ((clawback == Convert.ToString(val["Clawback"])) && (slabamount == Convert.ToString(val["SlabAmount"])) && (slabless == Convert.ToString(val["SlabLess"])) && (slabgreater == Convert.ToString(val["SlabGreater"])) && (total == Convert.ToString(val["Total"])) && (baseupfront == Convert.ToString(val["BaseUpfront"])) && (additionalincentive == Convert.ToString(val["AdditionalIncentive"])))
                                {
                                    retval = false;
                                    //return false;
                                }
                                else
                                {
                                    userid = Convert.ToString(val["UserId"]);
                                    clawback = Convert.ToString(val["Clawback"]);
                                    slabamount = Convert.ToString(val["SlabAmount"]);
                                    slabless = Convert.ToString(val["SlabLess"]);
                                    slabgreater = Convert.ToString(val["SlabGreater"]);
                                    total = Convert.ToString(val["Total"]);
                                    baseupfront = Convert.ToString(val["BaseUpfront"]);
                                    additionalincentive = Convert.ToString(val["AdditionalIncentive"]);
                                    if (i != 1)
                                    {
                                        com = "True";
                                    }
                                }
                                i += 1;
                            }
                            if (com == "True")
                            {
                                retval = true;
                            }
                            else
                            {
                                return false;
                            }
                            break;
                        }
                    case 3:
                        {
                            foreach (DataRow val in dr)
                            {
                                if ((clawback == Convert.ToString(val["Clawback"])) && (slabamount == Convert.ToString(val["SlabAmount"])) && (slabless == Convert.ToString(val["SlabLess"])) && (slabgreater == Convert.ToString(val["SlabGreater"])) && (total == Convert.ToString(val["Total"])) && (baseupfront == Convert.ToString(val["BaseUpfront"])) && (additionalincentive == Convert.ToString(val["AdditionalIncentive"])) && (periodstart == Convert.ToInt32(val["PeriodStart"])) && (periodend == Convert.ToInt32(val["PeriodEnd"])))
                                {
                                    retval = false;
                                }
                                else
                                {
                                    userid = Convert.ToString(val["UserId"]);
                                    periodend = Convert.ToInt32(val["PeriodEnd"]);
                                    periodstart = Convert.ToInt32(val["PeriodStart"]);
                                    clawback = Convert.ToString(val["Clawback"]);
                                    slabamount = Convert.ToString(val["SlabAmount"]);
                                    slabless = Convert.ToString(val["SlabLess"]);
                                    slabgreater = Convert.ToString(val["SlabGreater"]);
                                    total = Convert.ToString(val["Total"]);
                                    baseupfront = Convert.ToString(val["BaseUpfront"]);
                                    additionalincentive = Convert.ToString(val["AdditionalIncentive"]);
                                    if (i != 1)
                                    {
                                        com = "True";
                                    }
                                }
                                i += 1;
                            }
                            if (com == "True")
                            {
                                retval = true;
                            }
                            else
                            {
                                return false;
                            }
                            break;
                        }
                    case 4:
                        {
                            foreach (DataRow val in dr)
                            {
                                if ((clawback == Convert.ToString(val["Clawback"])) && (slabamount == Convert.ToString(val["SlabAmount"])) && (slabless == Convert.ToString(val["SlabLess"])) && (slabgreater == Convert.ToString(val["SlabGreater"])) && (total == Convert.ToString(val["Total"])) && (baseupfront == Convert.ToString(val["BaseUpfront"])) && (additionalincentive == Convert.ToString(val["AdditionalIncentive"])) && (periodstart == Convert.ToInt32(val["PeriodStart"]) && Convert.ToInt32(val["PeriodStart"]) != 0))
                                {
                                    return false;
                                }
                                else
                                {
                                    userid = Convert.ToString(val["UserId"]);
                                    periodstart = Convert.ToInt32(val["PeriodStart"]);
                                    clawback = Convert.ToString(val["Clawback"]);
                                    slabamount = Convert.ToString(val["SlabAmount"]);
                                    slabless = Convert.ToString(val["SlabLess"]);
                                    slabgreater = Convert.ToString(val["SlabGreater"]);
                                    total = Convert.ToString(val["Total"]);
                                    baseupfront = Convert.ToString(val["BaseUpfront"]);
                                    additionalincentive = Convert.ToString(val["AdditionalIncentive"]);
                                    if (i != 1)
                                    {
                                        com = "True";
                                    }
                                }
                                i += 1;
                            }
                            if (com == "True")
                            {
                                retval = true;
                            }
                            else
                            {
                                return false;
                            }
                            break;
                        }
                }
            }
            return retval;
        }

        public string getrackrateinfo(int Paymentmemoid, int Schemeid, out Exception error)
        {
            error = null;
            DataTable dt = new DataTable();
            DataTable dtdistinct = new DataTable();
            int monthcount = 0; int yearcount = 0;
            string rackrateinfo = "";
            string rackratecolsinfo = "";
            try
            {
                string[] bgcolors = new string[] { "", "orange", "lightseablue", "lightblue", "orange", "tan", "grey", "lightgrey", "darkgrey", "lightblue", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" };
                SqlConnection sqlcon = new SqlConnection(ConfigurationManager.ConnectionStrings[Constants.connection].ToString());
                SqlDataAdapter adapter = new SqlDataAdapter();
                SqlCommand cmd = new SqlCommand(Constants.SpGetMemoDetails, sqlcon);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@PaymentMemoId", DbType.Int32));
                cmd.Parameters["@PaymentMemoId"].Value = Paymentmemoid;

                cmd.Parameters.Add(new SqlParameter("@SchemeID", DbType.Int32));
                cmd.Parameters["@SchemeID"].Value = Schemeid;
                adapter.SelectCommand = cmd;
                adapter.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    if (checkvaluechange(dt, "BrokerageTypeId=1", 0) || checkvaluechange(dt, "BrokerageTypeId=2", 0) || checkvaluechange(dt, "BrokerageTypeId=3 and PeriodType=1", 3) || checkvaluechange(dt, "BrokerageTypeId=3 and PeriodType=2", 4)) // && checkvaluechange(dt, "BrokerageTypeId=3 and PeriodType=2", 4)
                    {
                        string[] args = new string[3];
                        args[0] = "MemoStatus";
                        args[1] = "Userid";
                        args[2] = "roleid";
                        dtdistinct = dt.DefaultView.ToTable(true, args);
                        foreach (DataRow drs in dtdistinct.Rows)
                        {
                            int currentmonthcount = getmonthcount(dt, "BrokerageTypeId=3 and PeriodType=1 and MemoStatus='" + Convert.ToString(drs["MemoStatus"]) + "' and Userid='" + Convert.ToString(drs["Userid"]) + "'");
                            if (currentmonthcount > monthcount)
                            {
                                monthcount = currentmonthcount;
                            }
                            int currentyearcount = getmonthcount(dt, "BrokerageTypeId=3 and PeriodType=2 and MemoStatus='" + Convert.ToString(drs["MemoStatus"]) + "' and Userid='" + Convert.ToString(drs["Userid"]) + "'");
                            if (currentyearcount > yearcount)
                            {
                                yearcount = currentyearcount;
                            }
                        }
                        int headercolspan = 0;
                        int headersubcolspan = 0;
                        if (monthcount != 0)
                        {
                            headercolspan += monthcount * 5;
                            headersubcolspan = monthcount * 5;
                            if (yearcount != 0)
                            {
                                if (yearcount != 1)
                                {
                                    headercolspan += yearcount;
                                }
                            }
                        }
                        if (yearcount != 0)
                        {
                            if (monthcount == 0)
                            {
                                if (yearcount != 1)
                                {
                                    headercolspan = (yearcount - 1) + 5;
                                    headersubcolspan = 5;
                                }
                                else if (yearcount == 1)
                                {
                                    headercolspan = 5;
                                    headersubcolspan = 5;
                                }
                            }
                            else
                            {
                                // headercolspan = (yearcount) + 5;
                                headersubcolspan = monthcount * 5;
                            }
                        }
                        string yearheader = ""; string onwardstext = "";
                        if (yearcount > 0)
                        {
                            if (monthcount == 0)
                            {
                                for (int i = 1; i < yearcount; i++)
                                {
                                    if (i == (yearcount - 1))
                                    {
                                        onwardstext = getvalues(dt, "", "Onwards");
                                    }
                                    int j = i + 1;
                                    yearheader += @"<th  class='pd-cmn-side-5 wbt wbl' rowspan='4'> Year " + j + onwardstext + "</th>";
                                }
                            }
                            else
                            {
                                for (int i = 1; i <= yearcount; i++)
                                {
                                    if (i == (yearcount))
                                    {
                                        onwardstext = getvalues(dt, "", "Onwards");
                                    }
                                    int j = i + 1;
                                    yearheader += @"<th  class='pd-cmn-side-5 wbt wbl' rowspan='4'> Year " + j + onwardstext + "</th>";
                                }
                            }
                            onwardstext = "";
                        }
                        else
                        {
                            onwardstext = getvalues(dt, "", "Onwards");
                        }
                        rackrateinfo += @"<div class='row mr-top-01' id='div_detail'> 
                                                <div class='col-md-12 col-sm-12 '><table id='tbl_rate_history' class='rrd-table' width='100%' border='0' align='center' cellpadding='0' cellspacing='0'><thead>
                                                <tr class='rrd-tbl-hdr'><th rowspan='6' class='pd-cmn-side-5 wbt bl'>Raised By </th><th style='display:none;' rowspan='6' class='pd-cmn-side-5 wbt bl'>Status </th><th rowspan='6' class='pd-cmn-side-5 wbt wbl'>Category </th><th rowspan='6' class='pd-cmn-side-5 wbt wbl'>Scheme</th><th rowspan='6' class='pd-cmn-side-5 wbt wbl'>Clawback</th><th rowspan='6' class='pd-cmn-side-5 wbt wbl'>Slab</th>
                                                <th colspan='5' class='pd-cmn-side-5 wbt wbl'>Upfront Brokerage in T15 & B15</th><th class='pd-cmn-side-5 wbt wbl'>Additional Upfront in B15</th><th rowspan='2' class='pd-cmn-side-5 wbt wbl' colspan='" + headercolspan + @"'>Trail Brokerage </th>
                                                </tr>
                                                <tr class='rrd-tbl-hdr'> 
                                                <th class='pd-cmn-side-5 wbt wbl' colspan='3'> </th><th colspan='2' class='pd-cmn-side-5 wbt wbl'> Slab</th><th rowspan='5' class='pd-cmn-side-5 wbt wbl'> </th></tr>
                                                <tr class='rrd-tbl-hdr'>
                                                <th rowspan='4' class='pd-cmn-side-5 wbt wbl'>Base Upfront </th><th rowspan='4' class='pd-cmn-side-5 wbt wbl'>Addl Incentive </th><th rowspan='4' class='pd-cmn-side-5 wbt wbl'> Total</th><th rowspan='4' class='pd-cmn-side-5 wbt wbl'> &le; Slab</th><th rowspan='4' class='pd-cmn-side-5 wbt wbl'> >Slab</th>";
                        rackrateinfo += @" <th class='pd-cmn-side-5 wbt wbl' colspan='" + headersubcolspan + @"'>Year 1 " + onwardstext + "</th>" + yearheader + @" </tr><tr class='rrd-tbl-hdr'>";

                        if (monthcount != 0)
                        {
                            for (int i = 0; i < monthcount; i++)
                            {
                                rackrateinfo += @" <th class='pd-cmn-side-5 wbt wbl' colspan='5'>" + getmonths(dt, "BrokerageTypeId=3 and PeriodType=1", "", i) + @" Month </th>";
                            }
                            rackrateinfo += "</tr> <tr class='rrd-tbl-hdr'>";
                            for (int i = 0; i < monthcount; i++)
                            {
                                rackrateinfo += @" <th class='pd-cmn-side-5 wbt wbl' colspan='3'> </th><th class='pd-cmn-side-5 wbt wbl' colspan='2'>Slab</th> ";
                            }
                            rackrateinfo += "</tr> <tr class='rrd-tbl-hdr'>";
                            for (int i = 0; i < monthcount; i++)
                            {
                                rackrateinfo += @"<th class='pd-cmn-side-5 wbt wbl'>Base Trail </th><th class='pd-cmn-side-5 wbt wbl'>Addl Incentive</th><th class='pd-cmn-side-5 wbt wbl'>Total </th><th class='pd-cmn-side-5 wbt wbl'>&le; Slab</th><th class='pd-cmn-side-5 wbt wbl'>> Slab</th>";
                            }
                        }
                        if (monthcount == 0)
                        {
                            //rackrateinfo += @"<tr class='rrd-tbl-hdr'><th class='pd-cmn-side-5 wbt wbl' colspan='5'> </th></tr> <tr class='rrd-tbl-hdr'><th class='pd-cmn-side-5 wbt wbl' colspan='5'> </th></tr><tr class='rrd-tbl-hdr'>";
                            rackrateinfo += @"<tr class='rrd-tbl-hdr'><th class='pd-cmn-side-5 wbt wbl'>Base Trail </th><th class='pd-cmn-side-5 wbt wbl'>Addl Incentive</th><th class='pd-cmn-side-5 wbt wbl'>Total </th><th class='pd-cmn-side-5 wbt wbl'>&le; Slab</th><th class='pd-cmn-side-5 wbt wbl'>> Slab</th>";
                            //for (int i = 0; i < yearcount; i++)
                            //{
                            //    if (i == 0)
                            //    {
                            //        rackrateinfo += @"<th class='pd-cmn-side-5 wbt wbl'>Base Trail </th><th class='pd-cmn-side-5 wbt wbl'>Addl Incentive</th><th class='pd-cmn-side-5 wbt wbl'>Total </th><th class='pd-cmn-side-5 wbt wbl'>&le; Slab</th><th class='pd-cmn-side-5 wbt wbl'>> Slab</th>";
                            //    }
                            //    else
                            //    {
                            //        rackrateinfo += @"<th class='pd-cmn-side-5 wbt wbl'> </th>";
                            //    }
                            //} 
                        }
                        rackrateinfo += "</tr></thead><tbody>";
                        for (int i = 0; i < dtdistinct.Rows.Count; i++)
                        {
                            //                            rackratecolsinfo += @"<tr><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "FirstName") + "</span></td><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "SchemeCategoryName") + "</span></td><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "SchemeName") + @"</span></td>
                            //                                            <td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "Clawback") + @"</span></td><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "SlabAmount") + "</span></td><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "BaseUpfront") + "</span></td><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "AdditionalIncentive") + "</span></td><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "Total") + "</span></td><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "SlabLess") + "</span></td><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "SlabGreater") + "</span></td><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=2 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "BaseUpfront") + @"</span></td>";
                            rackratecolsinfo += @"<tr style='background-color:" + bgcolors[Convert.ToInt32(dtdistinct.Rows[i]["roleid"])] + @"'><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "FirstName") + "</span></td><td style='display:none;' class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "</span></td><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "SchemeCategoryName") + "</span></td><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "SchemeName") + @"</span></td>
                                            <td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "Clawback") + @"</span></td><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "SlabAmount") + "</span></td><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "BaseUpfront") + "</span></td><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "AdditionalIncentive") + "</span></td><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "Total") + "</span></td><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "SlabLess") + "</span></td><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "SlabGreater") + "</span></td><td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=2 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "BaseUpfront") + @"</span></td>";

                            if (monthcount != 0 || yearcount == 1)
                            {
                                for (int j = 0; j < monthcount; j++)
                                {
                                    rackratecolsinfo += @" <td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getmonths(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=3 and PeriodType=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "BaseUpfront", j) + @"</span></td>
                                    <td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getmonths(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=3 and PeriodType=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "AdditionalIncentive", j) + @"</span></td>
                                    <td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getmonths(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=3 and PeriodType=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "Total", j) + @"</span></td>
                                    <td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getmonths(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=3 and PeriodType=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "SlabLess", j) + @"</span></td>
                                    <td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getmonths(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=3 and PeriodType=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "SlabGreater", j) + @"</span></td>";
                                }
                            }
                            if (yearcount > 0)
                            {
                                if (monthcount == 0)
                                {
                                    for (int k = 0; k < yearcount; k++)
                                    {
                                        int r = k + 2;
                                        if (k == 0)
                                        {
                                            rackratecolsinfo += @" <td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getmonths(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=3 and PeriodType=2 and periodstart=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "BaseUpfront", k) + @"</span></td>
                                                <td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getmonths(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=3 and PeriodType=2 and periodstart=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "AdditionalIncentive", k) + @"</span></td>
                                                <td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getmonths(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=3 and PeriodType=2 and periodstart=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "Total", k) + @"</span></td>
                                                <td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getmonths(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=3 and PeriodType=2 and periodstart=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "SlabLess", k) + @"</span></td>
                                                <td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getmonths(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=3 and PeriodType=2 and periodstart=1 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "'", "SlabGreater", k) + @"</span></td>";
                                        }
                                        else
                                        {
                                            int a = k + 1;
                                            rackratecolsinfo += @" <td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=3 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "' and periodstart=" + a + " and periodtype=2", "BaseUpfront") + @"</span></td>";
                                        }
                                    }
                                }
                                else
                                {
                                    for (int k = 1; k <= yearcount; k++)
                                    {
                                        int r = k + 1;
                                        rackratecolsinfo += @" <td class='pd-cmn-side-5 pad-top-a pad-btm-a bt bl'><span class='rrd-tbl-label-bld'>" + getvalues(dt, "MemoStatus='" + Convert.ToString(dtdistinct.Rows[i]["MemoStatus"]) + "' and BrokerageTypeId=3 and Userid='" + Convert.ToString(dtdistinct.Rows[i]["Userid"]) + "' and periodstart=" + r + " and periodtype=2", "BaseUpfront") + @"</span></td>";
                                    }
                                }
                            }
                            rackratecolsinfo += "</tr>";
                        }
                        rackrateinfo += rackratecolsinfo;
                        rackrateinfo += "</tbody></table></div></div>";
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex;
            }
            finally
            {
                dt = null;
                dtdistinct = null;
            }
            return rackrateinfo;
        }

        public List<Channel_DistibutorCategory> GetChannelDistributorCategory(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<Channel_DistibutorCategory> dataMapper = new DataMapper<Channel_DistibutorCategory>(Constants.connection, Constants.SpGetChannelDistributorCategory);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<Channel_DistibutorCategory> GetChannelCategory(string SearchText, out Exception error)
        {
            try
            {
                DataMapper<Channel_DistibutorCategory> dataMapper = new DataMapper<Channel_DistibutorCategory>(Constants.connection, Constants.SpGetChannelCategory);
                return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Get Parent ARN List
        /// </summary>
        /// <param name="SearchText"></param>
        /// <param name="error"></param>
        /// <returns>List<Distributor></returns>
        public List<Distributor> GetParentARN(string ARN, out Exception error)
        {
            try
            {
                List<Distributor> returnValue = new List<Distributor>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetParentARN))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@ARN_NO";
                            parameter.Value = ARN;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                SqlDataReader dr = (SqlDataReader)reader;
                                if (dr.HasRows)
                                {
                                    while (dr.Read())
                                    {
                                        Distributor dist = new Distributor();
                                        dist.DistributorId = Convert.ToInt64(dr["DistributorId"]);
                                        dist.ARN = Convert.ToString(dr["ARN_NO"]);
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

        public List<MailingList> getmailinglistobject(string Searchtext, string Module, out Exception error)
        {
            try
            {
                List<MailingList> returnValue = new List<MailingList>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetMailingList))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@Searchtext";
                            parameter.Value = Searchtext;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Module";
                            parameter.Value = (Module == null ? string.Empty : Module);
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
                                        dist.Email = Convert.ToString(dr["Email"]);
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

        public List<string> GetSchemeForArnCategory(string Arn, string Dist_category, out Exception error)
        {
            error = null;
            List<string> objUsers = new List<string>();
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetSchemeForArnCategory))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@arn";
                        parameter.Value = Arn;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@dist_cat";
                        parameter.Value = Dist_category;
                        command.Parameters.Add(parameter);
                        using (IDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                objUsers.Add(reader["SchemeId"].ToString());
                            }
                        }
                        connection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex;
            }
            return objUsers;
        }

        public List<MailingList> GetDistributorEmail(string Searchtext, string Module, out Exception error)
        {
            try
            {
                List<MailingList> returnValue = new List<MailingList>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetDistributorEmail))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@Searchtext";
                            parameter.Value = Searchtext;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Module";
                            parameter.Value = (Module == null ? string.Empty : Module);
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
                                        dist.Email = Convert.ToString(dr["Email"]);
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

        /// <summary>
        /// Validate Scheme Slab Amount are same
        /// </summary>
        /// <param name="SchemeID"></param>
        public void ValidateSchemeSlabAmount(string SchemeID)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpValidateSchemeSlab))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@SchemeIds";
                        parameter.Value = SchemeID;
                        command.Parameters.Add(parameter);

                        command.ExecuteNonQuery();
                        connection.Close();
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// GetCreateSIP
        /// </summary>
        /// <param name="ArnNo"></param>
        /// <param name="Channel"></param>
        /// <param name="DistributorCategory"></param>
        /// <param name="Status"></param>
        /// <param name="MasterQueueStatus"></param>
        /// <param name="ARNName"></param>
        /// <param name="UserID"></param>
        /// <param name="error"></param>
        /// <returns>RackRateSearchResult</returns>
        public List<RackRateSearchResult> GetCreateSIP(string ArnNo, string Channel, string DistributorCategory, string Status, string MasterQueueStatus, string ARNName, string SearchFilter, Int32 UserID, string MemoLevel, out Exception error)
        {
            try
            {
                return GetSearchResult(Channel, DistributorCategory, ArnNo, Status, MasterQueueStatus, ARNName, SearchFilter, UserID, Constants.SpGetCreateSIP, MemoLevel, out error);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<RackRateSearchResult> GetDiscardedQueue(string Status, out Exception error)
        {
            List<RackRateSearchResult> returnValue = new List<RackRateSearchResult>();
            error = null;
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetDiscardedQueue))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@Status";
                        parameter.Value = Status;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = _db.ExecuteReader(command))
                        {
                            returnValue = Conversion.ConvertDataReaderToList<RackRateSearchResult>(reader);
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

        public List<SIPRateHistoryDetails> GetSIPModifiedRateHistoryDetails(Int64 PaymentMemoId, Int64 SchemeID, Int64 SIPRowId)
        {
            List<SIPRateHistoryDetails> returnValue = new List<SIPRateHistoryDetails>();
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetSIPModifiedRateHistoryDetails))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@PaymentMemoID";
                        parameter.Value = PaymentMemoId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@SchemeID";
                        parameter.Value = SchemeID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@SIPRowID";
                        parameter.Value = SIPRowId;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = _db.ExecuteReader(command))
                        {
                            returnValue = Conversion.ConvertDataReaderToList<SIPRateHistoryDetails>(reader);
                        }
                        connection.Close();
                    }
                }
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public List<AssignToUser> GetUserBasedOnRole(Int64 RoleId, string ChannelId)
        {
            List<AssignToUser> returnValue = new List<AssignToUser>();
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetUserBasedOnRole))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@RoleID";
                        parameter.Value = RoleId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ChannelID";
                        parameter.Value = ChannelId;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = _db.ExecuteReader(command))
                        {
                            returnValue = Conversion.ConvertDataReaderToList<AssignToUser>(reader);
                        }
                        connection.Close();
                    }
                }
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public string GetMemoFromAndToDate(string MemoNumber)
        {
            string queryString = "select CONVERT(VARCHAR(20),DateFrom) + ':' + CONVERT(VARCHAR(20),DateTo) from PaymentMemo where MemoNumber = '" + MemoNumber + "'";

            string returnValue = "";
            try
            {
                using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings[Constants.connection].ToString()))
                {
                    SqlCommand command = new SqlCommand(queryString, connection);
                    command.Connection.Open();
                    returnValue = command.ExecuteScalar().ToString();
                }
                return returnValue;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public Int64 GetRoleIdBasedOnUserID(Int64 UserId)
        {
            Int64 returnValue = 0;
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetRoleIdBasedOnUserID))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@userId";
                        parameter.Value = UserId;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            SqlDataReader dr = (SqlDataReader)reader;
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    returnValue = Convert.ToInt64(dr["RoleID"]);
                                }
                            }
                        }
                        connection.Close();
                    }
                }
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
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

        public string GetUserBasedOnUserID(Int64 UserId)
        {
            try
            {
                string UserName = "";
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetUserBasedOnUserID))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserId;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            SqlDataReader dr = (SqlDataReader)reader;
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    UserName = Convert.ToString(dr["UserName"]);
                                }
                            }
                        }
                        connection.Close();
                    }
                }
                return UserName;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public string GetEmailofMemoModifiedUsers(string MemoId)
        {
            try
            {
                List<string> UserName = new List<string>();
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetEmailofMemoModifiedUsers))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@MemoID";
                        parameter.Value = MemoId;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            SqlDataReader dr = (SqlDataReader)reader;
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    UserName.Add(Convert.ToString(dr["Email"]));
                                }
                            }
                        }
                        connection.Close();
                    }

                }
                return string.Join(",", UserName.ToArray());
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public string GetSkippedUsers(string MemoId)
        {
            try
            {
                List<string> UserName = new List<string>();
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetSkippedUsers))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@MemoID";
                        parameter.Value = MemoId;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            SqlDataReader dr = (SqlDataReader)reader;
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    UserName.Add(Convert.ToString(dr["Email"]));
                                }
                            }
                        }
                        connection.Close();
                    }

                }
                return string.Join(",", UserName.ToArray());
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public List<PaymentList> GetCategoryArnforMemo(string PaymentMemoID)
        {
            try
            {
                List<PaymentList> returnValue = new List<PaymentList>();


                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetCategoryArnforMemo))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@PaymentMemoId";
                        parameter.Value = PaymentMemoID;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            SqlDataReader dr = (SqlDataReader)reader;
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    PaymentList dist = new PaymentList();
                                    dist.DistributorCategoryId = Convert.ToString(dr["DistributorCategoryId"]);
                                    dist.DistributorCategoryName = Convert.ToString(dr["DistributorCategoryName"]);
                                    dist.ARNNO = Convert.ToString(dr["ARNNO"]);
                                    dist.ARNName = Convert.ToString(dr["ARNName"]);
                                    returnValue.Add(dist);
                                }
                            }
                        }
                        connection.Close();
                    }
                }


                return returnValue;
                //return dataMapper.Search(SearchText, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string GetMemoForwardedToUserName(string UserId)
        {
            try
            {
                string UserName = "";
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetMemoForwardedToUserName))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserId;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            SqlDataReader dr = (SqlDataReader)reader;
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    UserName = Convert.ToString(dr["Name_Role"]);
                                }
                            }
                        }
                        connection.Close();
                    }
                }
                return UserName;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        /// <summary>
        /// Get Arn For channel and distributor
        /// </summary>
        /// <param name="SearchText"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        public List<string> GetChannelForARNAndDistributorCategory(string ARN, string DistributorCategory, out Exception error)
        {
            try
            {
                List<string> returnValue = new List<string>();
                error = null;

                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetChannelForARNAndDistributorCategory))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@ARN_No";
                            parameter.Value = ARN;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Dist_Category";
                            parameter.Value = DistributorCategory;
                            command.Parameters.Add(parameter);

                            using (IDataReader reader = command.ExecuteReader())
                            {
                                SqlDataReader dr = (SqlDataReader)reader;
                                if (dr.HasRows)
                                {
                                    while (dr.Read())
                                    {
                                        returnValue.Add(Convert.ToString(dr["ChannelID"]));
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

        /// <summary>
        /// ValidateBranchPaymentMemo
        /// </summary>
        /// <param name="PaymentMemoID"></param>
        public bool ValidateBranchPaymentMemo(string PaymentMemoID, string UserId)
        {
            try
            {
                bool returnvalue = false;
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpValidateBranchPaymentMemo))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@PaymentMemoId";
                        parameter.Value = PaymentMemoID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserId;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            SqlDataReader dr = (SqlDataReader)reader;
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    returnvalue = Convert.ToBoolean(dr["Returnvalue"]);
                                }
                            }
                        }
                        connection.Close();
                    }
                }
                return returnvalue;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<LinkedMemo> GetLinkedMemos(string MemoIds, out Exception error)
        {
            List<LinkedMemo> returnValue = new List<LinkedMemo>();
            error = null;
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetLinkedMemos))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@MemoId";
                        parameter.Value = MemoIds;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = _db.ExecuteReader(command))
                        {
                            returnValue = Conversion.ConvertDataReaderToList<LinkedMemo>(reader);
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

        public string GetPaymentMemoNumber(string MemoId)
        {
            try
            {
                string UserName = "";
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetPaymentMemoNumber))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@MemoID";
                        parameter.Value = MemoId;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            SqlDataReader dr = (SqlDataReader)reader;
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    UserName = Convert.ToString(dr["MemoNumber"]);
                                }
                            }
                        }
                        connection.Close();
                    }
                }
                return UserName;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public List<SchemeDropdown> GetMissingSchemeInExitLoadScheme()
        {
            List<SchemeDropdown> missingScheme = new List<SchemeDropdown>();
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.ValidateExitLoadScheme))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            SqlDataReader dr = (SqlDataReader)reader;
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    SchemeDropdown scheme = new SchemeDropdown();
                                    scheme.SchemeId = Convert.ToInt32(dr["SchemeId"]);
                                    scheme.SchemeName = Convert.ToString(dr["SchemeName"]);
                                    missingScheme.Add(scheme);
                                }
                            }
                        }
                        connection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return missingScheme;
        }

        public string SaveExitLoadChanges()
        {
            string result = string.Empty;
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SaveExitLoadChanges))
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

                        result = Convert.ToString(parameter.Value);

                        connection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return result;
        }

        public List<LumpsumSIPType> GetLumpsumSIPType(string SearchText, out Exception error)
        {
            DataMapper<LumpsumSIPType> dataMapper = new DataMapper<LumpsumSIPType>(Constants.connection, Constants.spGetLumpsumsipType);
            return dataMapper.Search(SearchText, out error);

        }
    }
}
