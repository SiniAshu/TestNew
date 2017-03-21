using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class NotificationMailContent
    {
        ///<summary>
        ///Notification Mail Id
        ///</summary>
        [DataMember]
        public Int64 NotificationMailId { get; set; }

        ///<summary>
        ///Notification Mail Id
        ///</summary>
        [DataMember]
        public Int64 MailingListId { get; set; }

        ///<summary>
        ///Subject
        ///</summary>
        [DataMember]
        public string Subject { get; set; }

        ///<summary>
        ///Body
        ///</summary>
        [DataMember]
        public string Body { get; set; }

        ///<summary>
        ///Status
        ///</summary>
        [DataMember]
        public string Status { get; set; }

        ///<summary>
        ///IsActive
        ///</summary>
        [DataMember]
        public bool IsActive { get; set; }
    }
}
