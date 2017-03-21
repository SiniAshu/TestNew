using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.EnterpriseLibrary.Data.Sql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.DataAccess
{
    public class DataMapper<T> :IDataMapper<T> where T: class
    {
        private readonly string _commandText;

        private Database _db;

        public DataMapper(string Connection, string commandText)
        {
            _commandText = commandText;
            _db = DatabaseFactory.CreateDatabase(Connection);
        }

        /// <summary>
        /// method to select all records from database
        /// </summary>
        /// <param name="exError"></param>
        /// <returns>Returns Generic List</returns>
        public override List<T> Get(out Exception exError)
        {
            List<T> returnValue = new List<T>();
            exError = null;

            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            returnValue = ConvertDataReaderToList<T>(reader);
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
        /// method to read record by primary key
        /// </summary>
        /// <param name="ID"></param>
        /// <param name="exError"></param>
        /// <returns>Return Generic Object</returns>
        public override T Get(Int64 ID, out Exception exError)
        {
            List<T> returnValue = new List<T>();
            exError = null;

            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText, ID))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            returnValue = ConvertDataReaderToList<T>(reader);
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

            return returnValue.SingleOrDefault();
        }

        /// <summary>
        /// method to read record by unique identifiers
        /// </summary>
        /// <param name="instance"></param>
        /// <param name="exError"></param>
        /// <returns> Return Generic Object </returns>
        public override T Get(T instance, out Exception exError)
        {
            List<T> returnValue = new List<T>();
            exError = null;

            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        Type classType = instance.GetType();
                        object obj = Activator.CreateInstance(classType);

                        foreach (PropertyInfo field in obj.GetType().GetProperties())
                        {
                            object fieldName = field.Name;
                            object fieldType = field.PropertyType;
                            object fieldValue = field.GetValue(instance);

                            if (!string.IsNullOrEmpty(Convert.ToString(fieldValue)))
                            {
                                var parameter = command.CreateParameter();
                                parameter.ParameterName = "@" + fieldName.ToString();
                                parameter.Value = fieldValue.ToString();

                                command.Parameters.Add(parameter);
                            }
                        }

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            returnValue = ConvertDataReaderToList<T>(reader);
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

            return returnValue.SingleOrDefault();
        }

        /// <summary>
        /// method to search record by unique identifiers
        /// </summary>
        /// <param name="instance"></param>
        /// <param name="exError"></param>
        /// <returns> Return Generic List of search details </returns>
        public override List<T> GetListByID(Int64 ID, out Exception exError)
        {
            List<T> returnValue = new List<T>();
            exError = null;

            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText, ID))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            returnValue = ConvertDataReaderToList<T>(reader);
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
        /// method to search record by unique identifiers
        /// </summary>
        /// <param name="instance"></param>
        /// <param name="exError"></param>
        /// <returns> Return Generic List of search details </returns>
        public override List<T> GetList(T instance, out Exception exError)
        {
            List<T> returnValue = new List<T>();
            exError = null;

            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        Type classType = instance.GetType();
                        object obj = Activator.CreateInstance(classType);

                        foreach (PropertyInfo field in obj.GetType().GetProperties())
                        {
                            object fieldName = field.Name;
                            object fieldType = field.PropertyType;
                            object fieldValue = field.GetValue(instance);

                            if (!string.IsNullOrEmpty(Convert.ToString(fieldValue)))
                            {
                                var parameter = command.CreateParameter();
                                parameter.ParameterName = "@" + fieldName.ToString();
                                parameter.Value = fieldValue.ToString();

                                command.Parameters.Add(parameter);
                            }
                        }

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            returnValue = ConvertDataReaderToList<T>(reader);
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
        /// method to search record by Search Text string
        /// </summary>
        /// <param name="instance"></param>
        /// <param name="exError"></param>
        /// <returns> Return Generic List of search details </returns>
        public override List<T> Search(string searchText, out Exception exError)
        {
            List<T> returnValue = new List<T>();
            exError = null;

            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText, searchText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            returnValue = ConvertDataReaderToList<T>(reader);
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
        /// SearchByMemo
        /// </summary>
        /// <param name="searchText"></param>
        /// <param name="exError"></param>
        /// <returns></returns>
        public override List<T> SearchByMemoType(string searchText, Int64 MemoTypeID, out Exception exError)
        {
            List<T> returnValue = new List<T>();
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
                        parameter.ParameterName = "@SearchText";
                        parameter.Value = searchText;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ModuleID";
                        parameter.Value = MemoTypeID;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            returnValue = ConvertDataReaderToList<T>(reader);
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
        /// SearchByMemo
        /// </summary>
        /// <param name="searchText"></param>
        /// <param name="exError"></param>
        /// <returns></returns>
        public override List<T> SearchByMemoTypeAndIsclosed(string searchText, Int64 MemoTypeID, Int64 IsCloseEnded, out Exception exError)
        {
            List<T> returnValue = new List<T>();
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
                        parameter.ParameterName = "@SearchText";
                        parameter.Value = searchText;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ModuleID";
                        parameter.Value = MemoTypeID;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@IsCloseEnded";
                        parameter.Value = IsCloseEnded;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            returnValue = ConvertDataReaderToList<T>(reader);
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
        /// method to search record for Create BRR
        /// </summary>
        /// <param name="instance"></param>
        /// <param name="exError"></param>
        /// <returns> Return Generic List of search details </returns>
        public override List<T> Get(string ArnNo, string Channel, string DistributorCategory, out Exception exError)
        {
            List<T> returnValue = new List<T>();
            exError = null;

            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Close();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@ARNNO";
                        parameter.Value = ArnNo;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@Channel";
                        parameter.Value = Channel;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@DistributorCategory";
                        parameter.Value = DistributorCategory;
                        command.Parameters.Add(parameter);

                        using (IDataReader reader = command.ExecuteReader())
                        {
                            returnValue = ConvertDataReaderToList<T>(reader);
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
        /// method to insert record into database
        /// </summary>
        /// <param name="instance"></param>
        /// <param name="exError"></param>
        /// <returns>True/False</returns>
        public override bool Create(T instance, out Exception exError)
        {
            bool returnValue = false;
            exError = null;
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        Type classType = instance.GetType();
                        object obj = Activator.CreateInstance(classType);

                        foreach (PropertyInfo field in obj.GetType().GetProperties())
                        {
                            object fieldName = field.Name;
                            object fieldType = field.PropertyType;
                            object fieldValue = field.GetValue(instance);

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@" + fieldName.ToString();
                            parameter.Value = fieldValue.ToString();

                            command.Parameters.Add(parameter);
                        }

                        command.ExecuteNonQuery();
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
        /// method to update record by unique identifiers
        /// </summary>
        /// <param name="instance"></param>
        /// <param name="exError"></param>
        /// <returns>True/False</returns>
        public override bool Update(T instance, out Exception exError)
        {
            bool returnValue = false;
            exError = null;

            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        Type classType = instance.GetType();
                        object obj = Activator.CreateInstance(classType);

                        foreach (PropertyInfo field in obj.GetType().GetProperties())
                        {
                            object fieldName = field.Name;
                            object fieldType = field.PropertyType;
                            object fieldValue = field.GetValue(instance);

                            var parameter = command.CreateParameter();
                            parameter.ParameterName = "@" + fieldName.ToString();
                            parameter.Value = fieldValue.ToString();

                            command.Parameters.Add(parameter);
                        }

                        int result = command.ExecuteNonQuery();
                        connection.Close();
                        if (result > 0)
                            returnValue = true;
                        else
                            exError = new Exception("Failed to update record in database");
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
        /// method to delete the record from database
        /// </summary>
        /// <param name="ID"></param>
        /// <param name="exError"></param>
        /// <returns>True/False</returns>
        public override bool Delete(int ID, out Exception exError)
        {
            bool returnValue = false;
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
                        parameter.ParameterName = "@ID";
                        parameter.Value = ID.ToString();
                        command.Parameters.Add(parameter);

                        int result = command.ExecuteNonQuery();
                        connection.Close();
                        if (result > 0)
                            returnValue = true;
                        else
                            exError = new Exception("Failed to insert record in database");
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
        /// method to delete record by unique identifiers
        /// </summary>
        /// <param name="instance"></param>
        /// <param name="exError"></param>
        /// <returns>True/Flase</returns>
        public override bool Delete(T instance, out Exception exError)
        {
            bool returnValue = false;
            exError = null;

            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(_commandText))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        Type classType = instance.GetType();
                        object obj = Activator.CreateInstance(classType);

                        foreach (PropertyInfo field in obj.GetType().GetProperties())
                        {
                            object fieldName = field.Name;
                            object fieldType = field.PropertyType;
                            object fieldValue = field.GetValue(instance);

                            if (!string.IsNullOrEmpty(Convert.ToString(fieldValue)))
                            {
                                var parameter = command.CreateParameter();
                                parameter.ParameterName = "@" + fieldName.ToString();
                                parameter.Value = fieldValue.ToString();

                                command.Parameters.Add(parameter);
                            }
                        }

                        int result = command.ExecuteNonQuery();
                        connection.Close();
                        if (result > 0)
                            returnValue = true;
                        else
                            exError = new Exception("Failed to insert record in database");
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



        #region internal methods
        /// <summary>
        /// convert datareader to list<T>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dr"></param>
        /// <returns>T is return type(ClassName) and dr is parameter to mapping DataReader</returns>
        private static List<T> ConvertDataReaderToList<T>(IDataReader dr)
        {
            T obj = default(T);
            List<T> list = new List<T>();
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
    }
}
