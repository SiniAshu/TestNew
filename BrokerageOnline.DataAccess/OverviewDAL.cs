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
    public class OverviewDAL
    {
        private Database _db = DatabaseFactory.CreateDatabase(Constants.connection);

        public bool UpdateNotificationStatus(Notification InputData)
        {
            try
            {
                using (DbCommand command = _db.GetStoredProcCommand(Constants.SpUpdateNotificationStatus))
                {
                    using (DbConnection connection = _db.CreateConnection())
                    {
                        connection.Open();
                        command.Connection = connection;

                        var parameter = command.CreateParameter();
                        parameter.ParameterName = "@NotificationId";
                        parameter.Value = InputData.NotificationId;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@MemoId";
                        parameter.Value = InputData.NotificationMemoId == 0 ? null : InputData.NotificationMemoId.ToString();
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@IsActive";
                        parameter.Value = InputData.NotificationMemoId == 0 ? (InputData.IsActive ? "1" : "0") : null;
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@IsEmailed";
                        parameter.Value = InputData.NotificationMemoId == 0 ? null : (InputData.IsEmailed ? "1" : "0");
                        command.Parameters.Add(parameter);

                        parameter = command.CreateParameter();
                        parameter.ParameterName = "@ModifiedBy";
                        parameter.Value = InputData.ModifiedBy;
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
    }
}
