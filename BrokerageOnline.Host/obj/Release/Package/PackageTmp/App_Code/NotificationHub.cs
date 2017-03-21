using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Web;
using System.Linq;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Globalization;
using BrokerageOnline.Common.SessionManagement;

namespace BrokerageOnline.Host
{
    [HubName("notificationHub")]
    public class NotificationHub : Hub
    {
        private static readonly ConcurrentDictionary<string, User> Users = new ConcurrentDictionary<string, User>(StringComparer.InvariantCultureIgnoreCase);

        #region Methods
        /// <summary>
        /// Provides the handler for SignalR OnConnected event
        /// supports async threading
        /// </summary>
        /// <returns></returns>
        public override Task OnConnected()
        {
            string UserId = Context.QueryString["userid"];
            if (HttpContext.Current.Session != null)
            {
                UserId = HttpContext.Current.Session["userid"].ToString();
            }

            string profileId = UserId;  //Context.QueryString["id"];
            string connectionId = Context.ConnectionId;
            var user = Users.GetOrAdd(profileId, _ => new User
            {
                ProfileId = profileId,
                ConnectionIds = new HashSet<string>()
            });
            lock (user.ConnectionIds)
            {
                user.ConnectionIds.Add(connectionId);
                Groups.Add(connectionId, user.ProfileId);
            }
            return base.OnConnected();
        }

        /// <summary>
        /// Provides the handler for SignalR OnDisconnected event
        /// supports async threading
        /// </summary>
        /// <returns></returns>
        public override Task OnDisconnected(bool stopCalled = true)
        {
            string UserId = Context.QueryString["userid"];
            if (HttpContext.Current.Session != null)
            {
                UserId = HttpContext.Current.Session["userid"].ToString();
            }

            string profileId = UserId; //Context.QueryString["id"];
            string connectionId = Context.ConnectionId;
            User user;
            Users.TryGetValue(profileId, out user);
            if (user != null)
            {
                lock (user.ConnectionIds)
                {
                    user.ConnectionIds.RemoveWhere(cid => cid.Equals(connectionId));
                    Groups.Remove(connectionId, user.ProfileId);
                    if (!user.ConnectionIds.Any())
                    {
                        User removedUser;
                        Users.TryRemove(profileId, out removedUser);
                    }
                }
            }
            return base.OnDisconnected(stopCalled);
        }

        /// <summary>
        /// Provides the handler for SignalR OnReconnected event
        /// supports async threading
        /// </summary>
        /// <returns></returns>
        public override Task OnReconnected()
        {
            return base.OnReconnected();
        }

        /// <summary>
        /// Provides the facility to send individual user notification message
        /// </summary>
        /// <param name="profileId">
        /// Set to the ProfileId of user who will receive the notification
        /// </param>
        /// <param name="message">
        /// set to the notification message
        /// </param>
        public void Send(string profileId, string message)
        {
            //Clients.User(profileId).send(message);
        }

        /// <summary>
        /// Provides the facility to send group notification message
        /// </summary>
        /// <param name="username">
        /// set to the user groupd name who will receive the message
        /// </param>
        /// <param name="message">
        /// set to the notification message
        /// </param>
        public void SendUserMessage(String username, String message)
        {
            Clients.Group(username).sendUserMessage(message);
        }

        /// <summary>
        /// Provides the ability to get User from the dictionary for passed in profileId
        /// </summary>
        /// <param name="profileId">
        /// set to the profileId of user that need to be fetched from the dictionary
        /// </param>
        /// <returns>
        /// return User object if found otherwise returns null
        /// </returns>
        private User GetUser(string profileId)
        {
            User user;
            Users.TryGetValue(profileId, out user);
            return user;
        }

        /// <summary>
        /// Provide theability to get currently connected user
        /// </summary>
        /// <returns>
        /// profileId of user based on current connectionId
        /// </returns>
        public IEnumerable<string> GetConnectedUser()
        {
            return Users.Where(x =>
            {
                lock (x.Value.ConnectionIds)
                {
                    return !x.Value.ConnectionIds.Contains(Context.ConnectionId, StringComparer.InvariantCultureIgnoreCase);
                }
            }).Select(x => x.Key);
        }
        #endregion

        [HubMethodName("sendNotifications")]
        public IEnumerable<Notification> SendNotifications()
        {
            
            //string UserId = "42";
            string UserId = Context.QueryString["userid"];

            List<Notification> notifications = new List<Notification>();
            //string UserSessionId = SessionObject.sessionValue; 
            //if (SessionManager.IsValidSession(UserSessionId))
            //{
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["BrokerageOnline"].ConnectionString))
            {
                string query = "SELECT NotificationId, NotificationTo, NotificationMessage, NotificationContent, MemoId, IsActive, CreatedBy, CreatedDate FROM [dbo].[Notification] WHERE NotificationTo=" + UserId + " and IsActive = 1 ORDER BY NotificationId desc";
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    try
                    {
                        command.Notification = null;
                        SqlDependency dependency = new SqlDependency(command);
                        dependency.OnChange += new OnChangeEventHandler(dependency_OnChange);
                        if (connection.State == ConnectionState.Closed)
                            connection.Open();
                        var reader = command.ExecuteReader();
                        while (reader.Read())
                        {
                            DateTime date = (DateTime)reader["CreatedDate"];
                            string formatedDate = date.ToString("dd MMM yyyy", CultureInfo.CreateSpecificCulture("en-US")); //05 Dec 2014
                            string formatedTime = date.ToString("hh:mm tt", CultureInfo.InvariantCulture); //02:59 PM

                            notifications.Add(new Notification
                            {
                                NotificationId = (int)reader["NotificationId"],
                                NotificationTo = (string)reader["NotificationTo"],
                                NotificationContent = (string)reader["NotificationContent"],
                                NotificationMessage = (string)reader["NotificationMessage"],
                                MemoId = reader["MemoId"].ToString(),
                                IsActive = (bool)reader["IsActive"],
                                CreatedBy = (string)reader["CreatedBy"],
                                CreatedDate = formatedDate,
                                CreatedTime = formatedTime
                            });
                        }
                        connection.Close();
                    }
                    catch (Exception)
                    {
                        throw;
                    }
                }
            }
            //}
            //else
            //{
            //    SessionManager.RemoveSession(UserSessionId, true);
            //}

            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();
            return context.Clients.All.RecieveNotification(notifications);
        }

        private void dependency_OnChange(object sender, SqlNotificationEventArgs e)
        {
            if (e.Type == SqlNotificationType.Change)
            {
                NotificationHub nHub = new NotificationHub();
                nHub.SendNotifications();
            }
        }
    }
}