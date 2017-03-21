using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BrokerageOnline.Presentation.App_Code
{
    public class User
    {
        #region Constructor
        public User()
        {
            //
            // TODO: Add constructor logic here
            //
        }
        #endregion


        #region Properties

        /// <summary>
        /// Property to get/set ProfileId
        /// </summary>
        public string ProfileId
        {
            get;
            set;
        }

        /// <summary>
        /// Propoerty to get/set multiple ConnectionId
        /// </summary>
        public HashSet<string> ConnectionIds
        {
            get;
            set;
        }

        #endregion
    }

    public class Notification
    {
        public int NotificationId { get; set; }

        public string NotificationTo { get; set; }

        public string NotificationMessage { get; set; }

        public string NotificationContent { get; set; }

        public string MemoId { get; set; }

        public bool IsActive { get; set; }

        public string CreatedBy { get; set; }

        public string CreatedDate { get; set; }

        public string CreatedTime { get; set; }
    }
}