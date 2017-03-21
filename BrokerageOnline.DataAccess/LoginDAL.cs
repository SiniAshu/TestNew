//using BrokerageOnline.DataAccess.Database;
using BrokerageOnline.TransferObjects;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BrokerageOnline.DataAccess
{
    public class LoginDAL
    {
        private Database _db = DatabaseFactory.CreateDatabase(Constants.connection);

        //validate user is valid or not 
        public Users ValidateUser(Credentials credential, out Exception error)
        {
            try
            {
                return ValidateUser(credential, Constants.SpValidateUserLogin, out error);
            }
            catch (Exception)
            {
                throw;
            }

        }

        //Get User Details based on username
        public Users GetUser(Credentials credential, out Exception error)
        {
            try
            {
                return GetUser(credential, Constants.SpGetUser, out error);
            }
            catch (Exception)
            {
                throw;
            }

        }

        //Validate Forget password and update change password = 1 and update the password to genereated reset password
        public bool ForgetPassword(string username, string email, string resetpassword, out Exception error)
        {
            try
            {
                return ValidateForgetPassword(username, email, resetpassword, Constants.SpValidateForgetPassword, out error);
            }
            catch (Exception)
            {
                throw;
            }

        }

        //Reset Password 
        public bool ResetPassword(Credentials credential, out Exception error)
        {
            try
            {
                DataMapper<Credentials> dataMapper = new DataMapper<Credentials>(Constants.connection, Constants.SpResetPassword);
                return dataMapper.Create(credential, out error);
            }
            catch (Exception)
            {
                throw;
            }
        }


        #region Intenal Methods
        /// <summary>
        /// Validate User Login
        /// </summary>
        /// <param name="instance"></param>
        /// <param name="exError"></param>
        /// <returns>user object</returns>
        public Users ValidateUser(Credentials credential, string _commandText, out Exception exError)
        {
            Users returnValue = new Users();
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
                        parameter.ParameterName = "@username";
                        parameter.Value = credential.UserName;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@password";
                        parameter.Value = credential.Password;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = _db.ExecuteReader(command))
                        {
                            returnValue = ConvertDataReaderToList<Users>(reader).First();
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
        /// Get User
        /// </summary>
        /// <param name="instance"></param>
        /// <param name="exError"></param>
        /// <returns>user object</returns>
        public Users GetUser(Credentials credential, string _commandText, out Exception exError)
        {
            Users returnValue = new Users();
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
                        parameter.ParameterName = "@username";
                        parameter.Value = credential.UserName;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            returnValue = ConvertDataReaderToList<Users>(reader).First();
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
        /// Validate Forget Password
        /// </summary>
        /// <param name="instance"></param>
        /// <param name="exError"></param>
        /// <returns>user object</returns>
        public bool ValidateForgetPassword(string username, string email, string resetpassword, string _commandText, out Exception exerror)
        {
            exerror = null;
            bool returnValue = true;
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@username";
                        parameter.Value = username;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@email";
                        parameter.Value = email;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@resetpassword";
                        parameter.Value = resetpassword;
                        command.Parameters.Add(parameter);

                        command.ExecuteNonQuery();
                        connection.Close();
                    }
                }
            }
            catch (InvalidOperationException invalid)
            {
                exerror = invalid;
                returnValue = false;
            }
            catch (Exception ex)
            {
                exerror = ex;
                returnValue = false;
            }

            return returnValue;
        }

        /// <summary>
        /// Reset Password
        /// </summary>
        /// <param name="instance"></param>
        /// <param name="exError"></param>
        /// <returns>True/False</returns>
        public bool ResetPassword(Credentials credential, string _commandText, out Exception exerror)
        {
            exerror = null;
            bool returnValue = true;
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@username";
                        parameter.Value = credential.UserName;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@password";
                        parameter.Value = credential.Password;
                        command.Parameters.Add(parameter);

                        command.ExecuteNonQuery();
                        connection.Close();
                    }
                }
            }
            catch (InvalidOperationException invalid)
            {
                exerror = invalid;
                returnValue = false;
            }
            catch (Exception ex)
            {
                exerror = ex;
                returnValue = false;
            }

            return returnValue;
        }

        /// <summary>
        /// convert datareader to list<T>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dr"></param>
        /// <returns>T is return type(ClassName) and dr is parameter to mapping DataReader</returns>
        private static List<T> ConvertDataReaderToList<T>(IDataReader dr)
        {
            List<T> list = new List<T>();
            T obj = default(T);
            while (dr.Read())
            {
                obj = Activator.CreateInstance<T>();
                foreach (PropertyInfo prop in obj.GetType().GetProperties())
                {
                    if (!object.Equals(dr[prop.Name], DBNull.Value))
                    {
                        prop.SetValue(obj, dr[prop.Name], null);
                    }
                }
                list.Add(obj);
            }
            return list;
        }
        #endregion

        public string InsertUpdateEmployeeLogs(EmployeeLogs EmployeeLogsBO, string _commandText, out Exception error)
        {
            string Output = string.Empty;

            string hostName = Dns.GetHostName(); // Retrive the Name of HOST
            // Get the IP
            string myIP = Dns.GetHostByName(hostName).AddressList[0].ToString();
            try
            {
                error = null;
                try
                {
                    using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                    {
                        using (DbConnection connection = _db.CreateConnection())
                        {
                            connection.Open();
                            command.Connection = connection;

                            EmployeeLogsBO.IPAddress = myIP;

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@UserLoginID";
                            parameter.Value = EmployeeLogsBO.EmployeeID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@EmployeeLogID";
                            parameter.Value = EmployeeLogsBO.EmployeeLogID;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@LoggedInTime";
                            parameter.Value = EmployeeLogsBO.LoggedInTime;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@LoggedOutTime";
                            parameter.Value = EmployeeLogsBO.LoggedOutTime;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@LastAccessedTime";
                            parameter.Value = EmployeeLogsBO.LastAccessedTime;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@IPAddress";
                            parameter.Value = EmployeeLogsBO.IPAddress;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@MessageLog";
                            parameter.Value = EmployeeLogsBO.MessageLog;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@LoggedOutBy";
                            parameter.Value = EmployeeLogsBO.LoggedOutBy;
                            command.Parameters.Add(parameter);

                            parameter = command.CreateParameter();
                            parameter.ParameterName = "@StatusID";
                            parameter.Value = EmployeeLogsBO.StatusID;
                            command.Parameters.Add(parameter);

                            Output = command.ExecuteScalar().ToString();
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


        public List<UserRoleRights> GetUserMenuPermission(string UserID, int MainMenuID, string _commandText)
        {
            List<UserRoleRights> objUsers = new List<UserRoleRights>();
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserEmail";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MainMenuID";
                        parameter.Value = MainMenuID;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                UserRoleRights newItem = new UserRoleRights();
                                newItem.UserId = Convert.ToInt64(reader["UserId"]);
                                newItem.FirstName = reader["FirstName"].ToString();
                                newItem.RoleName = reader["RoleName"].ToString();
                                newItem.RightName = reader["RightName"].ToString();
                                newItem.Email = reader["Email"].ToString();
                                newItem.RoleID = Convert.ToInt64(reader["RoleId"]);
                                newItem.MenuName = reader["RightName"].ToString();
                                newItem.ParentMenuName = reader["ParentMenuName"].ToString();
                                newItem.MenuID = Convert.ToInt64(reader["MenuID"]);
                                newItem.ParentMenuID = Convert.ToInt32(reader["ParentID"]);
                                newItem.NavigateURL = reader["NavigateURL"].ToString();
                                newItem.NavigateMenu = reader["NavigateMenu"].ToString();

                                //newItem.UserId = reader.GetInt32(0);
                                //newItem.FirstName = reader.GetString(1);
                                //newItem.RoleName = reader.GetString(2);
                                //newItem.RightName = reader.GetString(3);
                                //newItem.Email = reader.GetString(4);
                                //newItem.RoleID = reader.GetInt32(5);
                                //newItem.MenuName = reader.GetString(6);
                                //newItem.MenuID = reader.GetInt32(7);

                                HttpContext.Current.Session["userid"] = Convert.ToString(reader["UserId"]);
                                objUsers.Add(newItem);
                            }
                        }
                        connection.Close();
                    }
                }
            }
            catch (Exception)
            {

            }

            return objUsers;
        }


        public List<UserRoleRights> GetUserModuleMenu(string UserID, int MainMenuID, string _commandText)
        {
            List<UserRoleRights> objUsers = new List<UserRoleRights>();
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@UserID";
                        parameter.Value = UserID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ModuleID";
                        parameter.Value = MainMenuID;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                UserRoleRights newItem = new UserRoleRights();
                                newItem.UserId = Convert.ToInt64(reader["UserId"]);
                                newItem.RoleName = reader["RoleName"].ToString();
                                newItem.RightName = reader["RightName"].ToString();
                                newItem.RoleID = Convert.ToInt64(reader["RoleId"]);
                                newItem.MenuName = reader["RightName"].ToString();
                                newItem.ParentMenuName = reader["ParentMenuName"].ToString();
                                newItem.MenuID = Convert.ToInt64(reader["MenuID"]);
                                newItem.ParentMenuID = Convert.ToInt32(reader["ParentID"]);
                                newItem.NavigateURL = reader["NavigateURL"].ToString();
                                newItem.NavigateMenu = reader["NavigateMenu"].ToString();
                                objUsers.Add(newItem);
                            }
                        }
                        connection.Close();
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }

            return objUsers;
        }
    }
}
