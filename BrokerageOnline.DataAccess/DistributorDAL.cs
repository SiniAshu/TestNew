using System;
using System.Collections.Generic;
using BrokerageOnline.TransferObjects;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;

namespace BrokerageOnline.DataAccess
{
    public class DistributorDAL
    {
        private Database _db = DatabaseFactory.CreateDatabase(Constants.connection);

        public List<DistributorMaster> GetAllDistributors()
        {
            List<DistributorMaster> DistributorList = new List<DistributorMaster>();
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetAllDistributors))
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
                                    string CreatedOn = String.Empty;
                                    DistributorMaster distributor = new DistributorMaster();
                                    distributor.DistributorId = Convert.ToInt32(dr["DistributorId"]);
                                    distributor.ARN = Convert.ToString(dr["ARN_NO"]);
                                    distributor.MergCode = Convert.ToString(dr["Merg_CODE"]);
                                    distributor.DistributorName = Convert.ToString(dr["DistributorName"]);
                                    distributor.DistributorCategoryName = Convert.ToString(dr["DistributorCategoryName"]);
                                    distributor.DistributorCategoryId = Convert.ToInt32(dr["DistributorCategoryId"]);
                                    distributor.SubRegionId = Convert.ToInt32(dr["SubRegionId"]);
                                    distributor.SubRegion = Convert.ToString(dr["SubRegionName"]);
                                    distributor.TaxNo = Convert.ToString(dr["TaxNo"]);
                                    distributor.DistributorParentId = Convert.ToString(dr["DistributorParentId"]);
                                    distributor.DistributorStatus = Convert.ToBoolean(dr["IsActive"]) ? "Active" : "Inactive";
                                    distributor.CreatedOn = Convert.ToString(dr["CreatedOn"]);
                                    DistributorList.Add(distributor);
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
            return DistributorList;
        }

        public List<SubRegion> GetAllSubRegion()
        {
            List<SubRegion> subRegionList = new List<SubRegion>();
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetAllSubRegions))
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
                                    SubRegion Subregion = new SubRegion();
                                    Subregion.SubRegionId = Convert.ToInt32(dr["SubRegionId"]);
                                    Subregion.SubRegionName = Convert.ToString(dr["SubRegionName"]);
                                    subRegionList.Add(Subregion);
                                }
                            }
                        }

                        connection.Close();
                    }
                }
            }
            catch (Exception ex) { }
            return subRegionList;
        }

        public List<DistributorCategory> GetAllDistributorCategories()
        {
            List<DistributorCategory> DistributorCategoryList = new List<DistributorCategory>();
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpGetAllDistributorCategories))
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
                                    DistributorCategory DistributorCategories = new DistributorCategory();
                                    DistributorCategories.DistributorCategoryId = Convert.ToInt32(dr["DistributorCategoryId"]);
                                    DistributorCategories.DistributorCategoryName = Convert.ToString(dr["DistributorCategoryName"]);
                                    DistributorCategories.DistributorCategoryCode = Convert.ToString(dr["DistributorCategoryCode"]);
                                    DistributorCategoryList.Add(DistributorCategories);
                                }
                            }
                        }

                        connection.Close();
                    }
                }
            }
            catch (Exception ex) { }
            return DistributorCategoryList;
        }

        public string InsertUpdateDistributor(DistributorMaster distributor)
        {
            string result = string.Empty;
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpInsertUpdateDistributor))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@DistributorId";
                        parameter.Value = distributor.DistributorId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ARN_NO";
                        parameter.Value = distributor.ARN;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Merg_CODE";
                        parameter.Value = distributor.MergCode;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@DistributorName";
                        parameter.Value = distributor.DistributorName;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@DistributorCategoryId";
                        parameter.Value = distributor.DistributorCategoryId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@SubRegionId";
                        parameter.Value = distributor.SubRegionId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@TaxNo";
                        parameter.Value = distributor.TaxNo;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@DistributorParentId";
                        parameter.Value = distributor.MergCode;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@IsActive";
                        parameter.Value = distributor.DistributorStatus;
                        command.Parameters.Add(parameter);

                        result = command.ExecuteScalar().ToString();
                        connection.Close();
                    }
                }
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
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpDeleteDistributorById))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@DistributorId";
                        parameter.Value = distributorId;
                        command.Parameters.Add(parameter);

                        result = command.ExecuteScalar().ToString();
                        connection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }
    }
}