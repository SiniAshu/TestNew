using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Masters -> Notification
    ///</summary>
    [DataContract]
    public class Notification 
    {
        ///<summary>
        ///ID of Notification
        ///</summary>
        [DataMember]
        public Int64 NotificationId { get; set; }

        ///<summary>
        ///Notification To
        ///</summary>
        [DataMember]
        public string NotificationTo { get; set; }

        ///<summary>
        ///Notification Message
        ///</summary>
        [DataMember]
        public string NotificationMessage { get; set; }

        ///<summary>
        ///Content of Notification
        ///</summary>
        [DataMember]
        public string NotificationContent { get; set; }

        ///<summary>
        ///Notification Message
        ///</summary>
        [DataMember]
        public string CreatedTime { get; set; }


        ///<summary>
        ///Notification Message
        ///</summary>
        [DataMember]
        public string CreatedDate { get; set; }

        ///<summary>
        ///Notification Message
        ///</summary>
        [DataMember]
        public string CreatedBy { get; set; }

        ///<summary>
        ///Content of Notification Memo Id
        ///</summary>
        [DataMember]
        public Int64 NotificationMemoId { get; set; }

        ///<summary>
        ///Content of Notification Memo Id
        ///</summary>
        [DataMember]
        public Int64 MemoId { get; set; }

        ///<summary>
        ///Content of Notification Memo Id
        ///</summary>
        [DataMember]
        public bool IsActive { get; set; }

        ///<summary>
        ///Notification Message
        ///</summary>
        [DataMember]
        public Int64 ModifiedBy { get; set; }

        ///<summary>
        ///Is Emailed to User?
        ///</summary>
        [DataMember]
        public bool IsEmailed { get; set; }
    }
}
