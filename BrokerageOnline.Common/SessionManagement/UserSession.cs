using System;
using System.Web.SessionState;

namespace BrokerageOnline.Common.SessionManagement
{
    public class UserSession
    {
        /// <summary>
        /// Return object with custom timeout period.
        /// </summary>
        /// <param name="timeOut"></param>
        public UserSession(int timeOut)
        {
            TimeOut = timeOut;
            LastAccess = DateTime.Now;
            SessionValues = new SessionStateItemCollection();
        }

        public string UserSessionId { get; set; }
        public DateTime LastAccess { get; set; }
        public int TimeOut { get; set; }
        public SessionStateItemCollection SessionValues { get; set; }
    }
}
