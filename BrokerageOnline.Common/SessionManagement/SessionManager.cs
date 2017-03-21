using System;
using System.Collections.Generic;
using System.Configuration;
using System.Reflection;
using System.Web.Script.Serialization;

namespace BrokerageOnline.Common.SessionManagement
{
    /// <summary>
    /// To create and maintain session
    /// </summary>
    public static class SessionManager
    {
        public static IDictionary<string, UserSession> SessionDictionary = new Dictionary<string, UserSession>();

        public static bool IsSessionMonitorStopped { get; set; }

        // private static SessionDataAccess sessionDataAccess = new SessionDataAccess();
        private static int timeOut = Convert.ToInt32(ConfigurationManager.AppSettings["SessionTimeOut"]);
        private static string applicationName = ConfigurationManager.AppSettings["ApplicationName"];

        /// <summary>
        /// To create new session and it will return session id which was created.
        /// </summary>
        /// <returns></returns>
        public static string CreateSession()
        {
            try
            {
                Guid guid = Guid.NewGuid();
                string token = guid.ToString().Replace("-", string.Empty)+DateTime.Now.ToString("MMddyyyyhhmmssfff");

                UserSession session = new UserSession(timeOut)
                {
                    UserSessionId = token
                };
                SessionDictionary.Add(token, session);
                //sessionDataAccess.CreateSession(token, applicationName, timeOut);
                return token;
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        /// <summary>
        /// To get session object value
        /// </summary>
        /// <param name="sessionId">Session Id</param>
        /// <param name="key">Session Key</param>
        /// <returns>Value of session key</returns>
        public static dynamic GetSessionValue(string sessionId, string key)
        {
            try
            {
                if (SessionDictionary.ContainsKey(sessionId))
                {
                    UserSession currentUserSession = SessionDictionary[sessionId];
                    currentUserSession.LastAccess = DateTime.Now;
                    //currentUserSession.SessionValues = sessionDataAccess.GetSession(sessionId, applicationName);
                    return currentUserSession.SessionValues[key];
                }
                return "Session Expired.";
            }
            catch (Exception)
            {
               
                throw;
            }
        }

        /// <summary>
        /// To get session object value
        /// </summary>
        /// <param name="sessionId">Session Id</param>
        /// <param name="keys">Session Key</param>
        /// <returns>Value of session key</returns>
        public static IDictionary<string, dynamic> GetSession(string sessionId, List<string> keys)
        {
            try
            {
                if (SessionDictionary.ContainsKey(sessionId))
                {
                    UserSession currentUserSession = SessionDictionary[sessionId];
                    currentUserSession.LastAccess = DateTime.Now;
                    //currentUserSession.SessionValues = sessionDataAccess.GetSession(sessionId, applicationName);
                    IDictionary<string, dynamic> lstSessionObjects = new Dictionary<string, dynamic>();
                    foreach (string sessionKey in keys)
                    {

                        lstSessionObjects[sessionKey] = currentUserSession.SessionValues[sessionKey];

                    }
                    return lstSessionObjects;
                }
                return null;
            }
            catch (Exception)
            {
               
                throw;
            }
        }

        /// <summary>
        /// To set session object value
        /// </summary>
        public static void SetSessionValue(string sessionId, string key, dynamic value)
        {
            try
            {
                if (SessionDictionary.ContainsKey(sessionId))
                {
                    UserSession currentUserSession = SessionDictionary[sessionId];
                    currentUserSession.LastAccess = DateTime.Now;
                    currentUserSession.SessionValues[key] = value;
                    //Insert session values to database.
                    // sessionDataAccess.UpdateSession(sessionId, applicationName, "FALSE", currentUserSession.SessionValues, 0, "", timeOut);
                }
            }
            catch (Exception)
            {
               
                throw;
            }
        }

        /// <summary>
        /// To set list of session objects
        /// </summary>
        /// <param name="sessionId">Session Id</param>
        /// <param name="sessionObjects">List of Session Objects</param>
        public static void SetSession(string sessionId, List<SessionObject> sessionObjects)
        {
            try
            {
                if (SessionDictionary.ContainsKey(sessionId))
                {
                    UserSession currentUserSession = SessionDictionary[sessionId];
                    currentUserSession.LastAccess = DateTime.Now;
                    foreach (SessionObject sessionObject in sessionObjects)
                    {
                        currentUserSession.SessionValues[sessionObject.Key] = sessionObject.Value;

                    }
                    //Insert session values to database.
                    //sessionDataAccess.UpdateSession(sessionId, applicationName, "FALSE", currentUserSession.SessionValues, 0, "", timeOut);
                }
            }
            catch (Exception)
            {
               
                throw;
            }
        }

        /// <summary>
        /// Remove session and it's objects
        /// </summary>
        public static void RemoveSession(string sessionId, bool fromMoniterThread = false)
        {
            if (sessionId == null)
                sessionId = string.Empty;
            try
            {
                if (SessionDictionary.ContainsKey(sessionId))
                {
                    if (!fromMoniterThread)
                    {
                        //Delete session details from database.
                        //sessionDataAccess.RemoveSession(sessionId, applicationName, 0);
                    }
                    SessionDictionary.Remove(sessionId);

                }
            }
            catch (Exception)
            {
               
                throw;
            }
        }

        /// <summary>
        /// Return session Id is valid or not
        /// </summary>
        public static bool IsValidSession(string sessionId)
        {
            if (sessionId == null)
                sessionId = string.Empty;
            try
            {
                if (SessionDictionary.ContainsKey(sessionId))
                {
                    UserSession currentUserSession = SessionDictionary[sessionId];
                    currentUserSession.LastAccess = DateTime.Now;
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
               
                throw;
            }
        }

        /// <summary>
        /// Remove session object value
        /// </summary>
        public static void RemoveSessionValue(string sessionId, string key)
        {
            try
            {
                if (SessionDictionary.ContainsKey(sessionId))
                {
                    UserSession currentUserSession = SessionDictionary[sessionId];
                    currentUserSession.LastAccess = DateTime.Now;
                    currentUserSession.SessionValues.Remove(key);
                    //Update session values to database.
                    //sessionDataAccess.UpdateSession(sessionId, applicationName, "FALSE", currentUserSession.SessionValues, 0, "", timeOut);
                }
            }
            catch (Exception)
            {
              
                throw;
            }
        }

        /// <summary>
        /// Moniter application sessions
        /// </summary>
        public static void MoniterSession()
        {
            try
            {

                while (true)
                {
                    List<string> allKeys = new List<string>();

                    if (IsSessionMonitorStopped)
                    {
                        break;
                    }
                    foreach (KeyValuePair<string, UserSession> userDict in SessionDictionary)
                    {
                        if ((DateTime.Now - userDict.Value.LastAccess).TotalMinutes > userDict.Value.TimeOut)
                        {
                            allKeys.Add(userDict.Key);
                        }
                    }
                    foreach (string key in allKeys)
                    {
                        //Remove expired sessions from database.
                        RemoveSession(key, true);
                        //sessionDataAccess.RemoveExpiredSession(key, applicationName);

                    }
                    allKeys.Clear();
                    System.Threading.Thread.Sleep(60000);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
