using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BrokerageOnline.TransferObjects;
using System.Reflection;
using System.Web.Configuration;

namespace BrokerageOnline.DataAccess
{
    public class ChatDataAccess
    {
        public bool SaveChat(ChatHistory chatHistory)
        {
            var Output = string.Empty;

            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BrokerageOnline"].ConnectionString);
            try
            {

                con.Open();
                SqlCommand command = new SqlCommand(Constants.SpSaveChat, con);
                command.CommandType = CommandType.StoredProcedure;
                var parameter = command.CreateParameter();
                parameter.ParameterName = "@SENT_FROM";
                parameter.Value = chatHistory.SentFrom;
                command.Parameters.Add(parameter);

                parameter = command.CreateParameter();
                parameter.ParameterName = "@SENT_TO";
                parameter.Value = chatHistory.SentTo;
                command.Parameters.Add(parameter);

                parameter = command.CreateParameter();
                parameter.ParameterName = "@MESSAGE";
                parameter.Value = chatHistory.Message;
                command.Parameters.Add(parameter);

                parameter = command.CreateParameter();
                parameter.ParameterName = "@OFFLINE";
                parameter.Value = chatHistory.Offline;
                command.Parameters.Add(parameter);

                Output = command.ExecuteScalar().ToString();
                con.Close();

                if (Output == "INSERTED SUCCESSFULLY")
                {
                    return true;
                }
                else if (Output == "INSERT FAILED")
                {
                    return false;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        //public List<ChatHistory> GetChatHistory(int SentFrom, int SentTo, out Exception error)
        //{
        //    var Output = string.Empty;
        //    error = null;
            
        //    List<ChatHistory> listChat = new List<ChatHistory>();
        //    //SqlConnection con = new SqlConnection("Data Source=182.75.9.197;Initial Catalog=BrokerageOnlineHex;User Id=ben;Password=ben");
        //    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BrokerageOnline"].ToString());
        //    try
        //    {
        //        con.Open();
        //        SqlCommand command = new SqlCommand(Constants.SpGetChatHistory, con);
        //        command.CommandType = CommandType.StoredProcedure;

        //        var parameter = command.CreateParameter();
        //        parameter.ParameterName = "@SENT_FROM";
        //        parameter.Value = SentFrom;
        //        command.Parameters.Add(parameter);

        //        parameter = command.CreateParameter();
        //        parameter.ParameterName = "@SENT_TO";
        //        parameter.Value = SentTo;
        //        command.Parameters.Add(parameter);

        //        using (IDataReader reader = command.ExecuteReader())
        //        {

        //            SqlDataReader dr = (SqlDataReader)reader;
        //            if (dr.HasRows)
        //            {
        //                while (dr.Read())
        //                {
        //                    ChatHistory chatObj = new ChatHistory();
        //                    chatObj.Message = (string)dr["Message"];
        //                    chatObj.ChatDate = Convert.ToString(dr["Chat_Date"]);
        //                    listChat.Add(chatObj);
        //                }
        //            }
        //        }
        //        con.Close();
        //    }
        //    catch (InvalidOperationException invalid)
        //    {
        //        error = invalid;
        //    }
        //    catch (Exception ex)
        //    {
        //        error = ex;
        //    }

        //    return listChat;
        //}

        public List<UserDetail> GetChatUsers(out Exception error)
        {
            var Output = string.Empty;
            error = null;

            List<UserDetail> listUsers = new List<UserDetail>();
            string conn = ConfigurationManager.ConnectionStrings["BrokerageOnline"].ConnectionString;
            SqlConnection con = new SqlConnection(conn);
            try
            {
                con.Open();
                SqlCommand command = new SqlCommand(Constants.SpGetChatUsers, con);
                command.CommandType = CommandType.StoredProcedure;

                using (IDataReader reader = command.ExecuteReader())
                {

                    SqlDataReader dr = (SqlDataReader)reader;
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            UserDetail userObj = new UserDetail();
                            var id = (int)dr["UserId"];
                            userObj.UserId = Convert.ToInt64(id);
                            userObj.UserName = Convert.ToString(dr["USERNAME"]);
                            listUsers.Add(userObj);
                        }
                    }
                }
                con.Close();
            }
            catch (InvalidOperationException invalid)
            {
                error = invalid;
            }
            catch (Exception ex)
            {
                error = ex;
            }

            return listUsers;
        }

        public List<ChatHistory> GetOfflineChats(int SentTo, out Exception error)
        {
            var Output = string.Empty;
            error = null;

            List<ChatHistory> listChat = new List<ChatHistory>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BrokerageOnline"].ConnectionString);
            try
            {
                con.Open();
                SqlCommand command = new SqlCommand(Constants.SpGetOfflineChats, con);
                command.CommandType = CommandType.StoredProcedure;

                var parameter = command.CreateParameter();
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
                            chatObj.CountMsg = (int)dr["CountMsg"];
                            var sentFrom = dr["Sent_From"];
                            chatObj.SentFrom = Convert.ToInt64(sentFrom);
                            listChat.Add(chatObj);
                        }
                    }
                }
                con.Close();
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
