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
namespace BrokerageOnline.DataAccess
{
    public class TieUpDAL
    {
        private Database _db = DatabaseFactory.CreateDatabase(Constants.connection);
        public List<RackRateSearchResult> SearchTieUp(string Channel, string DistributorCategory, string ARNNo, string Status, string MasterQueueStatus, string ARNName, string SchemeCategory, string scheme, Int32 UserID, string SearchFilter,string DateFrom, string DateTo, string _commandText, string MemoLevel, out Exception error)
        {
            try
            {
                List<RackRateSearchResult> returnValue = new List<RackRateSearchResult>();
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(Constants.SpSearchTieUp))
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
                            parameter.ParameterName = "@SchemeCategory";
                            parameter.Value = SchemeCategory;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@Scheme";
                            parameter.Value = scheme;
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
                            parameter.ParameterName = "@DateFrom";
                            parameter.Value = DateFrom == "" ? "01/01/01" : DateFrom;
                            command.Parameters.Add(parameter);

                           
                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@DateTo";
                            parameter.Value = DateTo == "" ? "01/01/49" : DateTo;
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
    }
}
