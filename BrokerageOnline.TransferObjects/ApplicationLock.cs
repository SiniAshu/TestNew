using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class ApplicationLock
    {
        ///<summary>
        ///RoleSeqNo
        ///</summary>
        [DataMember]
        public Int64 RoleSeqNo { get; set; }

        ///<summary>
        ///ID of Role 
        ///</summary>
        [DataMember]
        public Int64 RoleId { get; set; }

        ///<summary>
        ///Role Name
        ///</summary>
        [DataMember]
        public string RoleName { get; set; }

        ///<summary>
        ///Description
        ///</summary>
        [DataMember]
        public string Description { get; set; }

        ///<summary>
        ///isActive
        ///</summary>
        [DataMember]
        public bool isActive { get; set; }

        ///<summary>
        ///isLocked
        ///</summary>
        [DataMember]
        public bool isLocked { get; set; }

        ///<summary>
        ///IsView
        ///</summary>
        [DataMember]
        public bool IsView { get; set; }

        ///<summary>
        ///ChangeText
        ///</summary>
        [DataMember]
        public string ChangeText { get; set; }

        ///<summary>
        ///CurrentStatus
        ///</summary>
        [DataMember]
        public string CurrentStatus { get; set; }

        ///<summary>
        ///LockNotes
        ///</summary>
        [DataMember]
        public string LockNotes { get; set; }
    }
}
