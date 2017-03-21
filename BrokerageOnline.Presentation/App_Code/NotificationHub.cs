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
using System.Globalization;
using BrokerageOnline.Common.SessionManagement;
using BrokerageOnline.TransferObjects;
using Microsoft.AspNet.SignalR.Hubs;
using BrokerageOnline.BusinessLogic;
using BrokerageOnline.Presentation.SecurityServiceRef;

namespace BrokerageOnline.Presentation.App_Code
{
    [HubName("notificationHub")]
    public class NotificationHub : Hub
    {
        #region Data Members

        static List<BrokerageOnline.TransferObjects.UserDetail> ConnectedUsers = new List<BrokerageOnline.TransferObjects.UserDetail>();
        static List<MessageDetail> CurrentMessage = new List<MessageDetail>();

        #endregion

        #region Methods

        public static BrokerageOnline.TransferObjects.UserDetail[] GetChatUsers()
        {
            SecurityServiceClient pxy = new SecurityServiceClient();
            return pxy.GetChatUsers();
        }

        public static ChatHistory[] GetOfflineChats(int SentTo)
        {
            SecurityServiceClient pxy = new SecurityServiceClient();
            return pxy.GetOfflineChats(SentTo);
        }

        public static bool SaveChat(ChatHistory chatHistory)
        {
            SecurityServiceClient pxy = new SecurityServiceClient();
            return pxy.SaveChat(chatHistory);
        }

        public void Connect(string userName, Int64 userId)
        {
            var offlineUsers = new List<UserDetail>();
            var id = Context.ConnectionId;
            var offlineChats = new ChatHistory[]{};

            if (ConnectedUsers.Count(x => x.ConnectionId == id) == 0)
            {
                ConnectedUsers.Add(new UserDetail { ConnectionId = id, UserName = userName, UserId = userId });

                var connId = from con in ConnectedUsers select con.UserId;
                var connIdList = connId.ToList();

                try
                {

                    var listUsers = GetChatUsers();

                    if (listUsers.Count() > 0)
                    {
                        var tempClist = listUsers.Where(x => !connIdList.Contains(Convert.ToInt64(x.UserId))).ToList();
                        offlineUsers = tempClist;
                        foreach (var item in offlineUsers)
                        {
                          ConnectedUsers.Add(item);
                        }
                    }

                  offlineChats = GetOfflineChats((int)(userId));
                }
                catch (Exception)
                {
                    throw;
                }
                //var distinctUsers = ConnectedUsers.GroupBy(x => (x.UserId != null) && (x.ConnectionId != null)).Select(x => x.First()).ToList();
                //var duplicates = (List<UserDetail>)ConnectedUsers.GroupBy(x => x.UserId)
                //   .Where(g => g.Count() > 1)
                //   .Select(g => new { g.Key, Values = g.ToList() });
                //var dup = duplicates.Where(d => d.ConnectionId != null);

                var result = ConnectedUsers
                                .GroupBy(item => item.UserId)
                                .SelectMany(g => g.Count() > 1 ? g.Where(x => x.ConnectionId != null) : g);

                ConnectedUsers = result.ToList();
                // send to caller
                Clients.Caller.onConnected(id, userName, ConnectedUsers, CurrentMessage, offlineChats);

                // send to all except caller client
                Clients.AllExcept(id).onNewUserConnected(id, userName, userId, offlineChats);

            }

        }

        public void SendPrivateMessage(string toUserId, string message, string oppUserId)
        {
            var chatHistory = new ChatHistory();
            string fromUserId = Context.ConnectionId;

            var toUser = ConnectedUsers.FirstOrDefault(x => x.ConnectionId == toUserId);
            var fromUser = ConnectedUsers.FirstOrDefault(x => x.ConnectionId == fromUserId);

            if (toUser != null && fromUser != null)
            {
                // send to 
                Clients.Client(toUserId).sendPrivateMessage(fromUserId, fromUser.UserName, message, fromUser.UserId);

                // send to caller user
                Clients.Caller.sendPrivateMessage(toUserId, fromUser.UserName, message, toUser.UserId);


                chatHistory.SentFrom = fromUser.UserId;
                chatHistory.SentTo = toUser.UserId;
                chatHistory.Message = fromUser.UserName + ": " + message + "<br>";
                chatHistory.Offline = 0;
                try
                {
                    var success = SaveChat(chatHistory);
                }
                catch (Exception)
                {
                    throw;
                }
            }
            else
            {
                chatHistory.SentFrom = fromUser.UserId;
                chatHistory.SentTo = Convert.ToInt64(oppUserId);
                chatHistory.Message = fromUser.UserName + ": " + message + "<br>";
                chatHistory.Offline = 1;
                try
                {
                    var success = SaveChat(chatHistory);
                }
                catch (Exception)
                {
                    throw;
                }

                // send to caller user
                Clients.Caller.sendPrivateMessage(toUserId, fromUser.UserName, message, oppUserId);
            }
        }

        public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
        {
            var item = ConnectedUsers.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);
            if (item != null)
            {
                ConnectedUsers.Remove(item);

                var id = Context.ConnectionId;
                Clients.All.onUserDisconnected(id, item.UserName, item.UserId);

            }

            return base.OnDisconnected(true);
        }

        #endregion
    }
}