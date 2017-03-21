using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Web.Script.Serialization;

namespace BrokerageOnline.Common.SessionManagement
{
    
        // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "VendorPortalSessionService" in code, svc and config file together.
        // NOTE: In order to launch WCF Test Client for testing this service, please select VendorPortalSessionService.svc or VendorPortalSessionService.svc.cs at the Solution Explorer and start debugging.
        public class SessionService : ISessionManager
        {
            private static string applicationName = ConfigurationManager.AppSettings["ApplicationName"];

            /// <summary>
            /// To Create Session
            /// </summary>
            /// <returns>Session Id</returns>
            public string CreateSession()
            {
                try
                {
                    return SessionManager.CreateSession();
                }
                catch (Exception)
                {
                    throw;
                }
            }


            /// <summary>
            /// To get session value
            /// </summary>
            /// <param name="sessionId">Session Id</param>
            /// <param name="key">Session key</param>
            /// <returns>Value of session key</returns>
            public string GetSessionValue(string sessionId, string key)
            {
                try
                {
                    var returnvalue = SessionManager.GetSessionValue(sessionId, key);
                    JavaScriptSerializer objJss = new JavaScriptSerializer();
                    return objJss.Serialize(returnvalue);
                }
                catch (Exception)
                {
                    throw;
                }
            }

            /// <summary>
            /// To get list of session values
            /// </summary>
            /// <param name="sessionId">Session Id</param>
            /// <param name="keys">List of session keys</param>
            /// <returns>List of session key values</returns>
            public string GetSession(string sessionId, List<string> keys)
            {
                try
                {
                    IDictionary<string, dynamic> returnvalue = SessionManager.GetSession(sessionId, keys);
                    JavaScriptSerializer objJss = new JavaScriptSerializer();
                    return objJss.Serialize(returnvalue);
                }
                catch (Exception)
                {
                    throw;
                }
            }

            /// <summary>
            /// To set session value
            /// </summary>
            /// <param name="sessionId">Session Id</param>
            /// <param name="key">Session key</param>
            /// <param name="value">Value</param>
            public void SetSessionValue(string sessionId, string key, object value)
            {
                try
                {
                    SessionManager.SetSessionValue(sessionId, key, value);
                }
                catch (Exception)
                {
                    throw;
                }
            }

            /// <summary>
            /// To set list of session values
            /// </summary>
            /// <param name="sessionId">Session Id</param>
            /// <param name="sessionObjects">List of session key and value</param>
            public void SetSession(string sessionId, List<SessionObject> sessionObjects)
            {
                try
                {
                    SessionManager.SetSession(sessionId, sessionObjects);
                }
                catch (Exception)
                {
                    throw;
                }
            }

            /// <summary>
            /// To delete session
            /// </summary>
            /// <param name="sessionId">Session Id</param>
            public void RemoveSession(string sessionId)
            {
                try
                {
                    SessionManager.RemoveSession(sessionId);
                }
                catch (Exception)
                {
                    throw;
                }
            }

            /// <summary>
            /// Return session Id is valid or not
            /// </summary>
            /// <param name="sessionId">Session Id</param>
            /// <returns>bool</returns>
            public bool IsValidSession(string sessionId)
            {
                try
                {
                    return SessionManager.IsValidSession(sessionId);
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }
    

}
