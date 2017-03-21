using System;
using BrokerageOnline.TransferObjects;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Collections.Generic;
using System.Globalization;

namespace BrokerageOnline.DataAccess
{
    public class EmailLog
    {
        private Database _db = DatabaseFactory.CreateDatabase(Constants.connection);

        public void EmailLogging(Email emailDetail)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.EmailLogging))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@Emailfrom";
                        parameter.Value = emailDetail.Emailfrom;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Emailto";
                        parameter.Value = emailDetail.Emailto;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@EmailCC";
                        parameter.Value = emailDetail.EmailCC;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@EmailBCC";
                        parameter.Value = emailDetail.EmailBCC;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@FilePath";
                        parameter.Value = string.IsNullOrWhiteSpace(emailDetail.FilePath) == true ? "" : emailDetail.FilePath;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@FileType";
                        parameter.Value = string.IsNullOrWhiteSpace(emailDetail.FileType) == true ? "" : emailDetail.FileType;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@FileName";
                        parameter.Value = string.IsNullOrWhiteSpace(emailDetail.FileName) == true ? "" : emailDetail.FileName;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Body";
                        parameter.Value = emailDetail.Body;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Subject";
                        parameter.Value = emailDetail.Subject;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Status";
                        parameter.Value = string.IsNullOrWhiteSpace(emailDetail.Status) == true ? "" : emailDetail.Status;
                        command.Parameters.Add(parameter);

                        //parameter = command.CreateParameter();
                        //parameter.ParameterName = "@ReturnMessage";
                        //parameter.Value = string.Empty;
                        //parameter.Direction = System.Data.ParameterDirection.Output;
                        //parameter.DbType = System.Data.DbType.String;
                        //parameter.Size = 50;
                        //command.Parameters.Add(parameter);

                        command.ExecuteScalar();

                        connection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<Email> GetEmailLog()
        {
            List<Email> eList = new List<Email>();
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.GetEmailLog))
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
                                    Email email = new Email();
                                    email.LogId = Convert.ToInt32(dr["LogId"]);
                                    email.Emailfrom = Convert.ToString(dr["Emailfrom"]);
                                    email.Emailto = Convert.ToString(dr["Emailto"]);
                                    email.To = Convert.ToString(dr["To"]);
                                    email.EmailCC = Convert.ToString(dr["EmailCC"]);
                                    email.CC = Convert.ToString(dr["CC"]);
                                    email.EmailBCC = Convert.ToString(dr["EmailBCC"]);
                                    email.BCC = Convert.ToString(dr["BCC"]);
                                    email.Body = Convert.ToString(dr["Body"]);
                                    email.Subject = Convert.ToString(dr["Subject"]);
                                    email.Action = Convert.ToString(dr["Action"]);
                                    email.FilePath = Convert.ToString(dr["FilePath"]);
                                    email.FileName = Convert.ToString(dr["FileName"]);
                                    email.FileType = Convert.ToString(dr["FileType"]);
                                    email.SentDate = DateTime.Parse(dr["LogDate"].ToString()).ToString("dd-MM-yy");
                                    email.SentTime = DateTime.Parse(dr["LogDate"].ToString()).ToString("HH:m");
                                    email.Status = Convert.ToString(dr["Status"]);
                                    eList.Add(email);
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
            return eList;
        }
    }

}