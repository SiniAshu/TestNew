using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Memo/WorkFlow Hierarchy -> MemoType
    ///</summary>
    [DataContract]
    public class UnlockUsers
    {
        ///<summary>
        ///ID of Memo Type 
        ///</summary>
        [DataMember]
        public Int64 UserId { get; set; }

        ///<summary>
        ///Name of Memo Type
        ///</summary>
        [DataMember]
        public string LoginId { get; set; }

        ///<summary>
        ///Name of Memo Type
        ///</summary>
        [DataMember]
        public string EmployeeName { get; set; }

        ///<summary>
        ///ID of Memo Type 
        ///</summary>
        [DataMember]
        public Int64 IsActive { get; set; }

        ///<summary>
        ///ID of Memo Type 
        ///</summary>
        [DataMember]
        public Int64 LoginDisabled { get; set; }

        ///<summary>
        ///ID of Memo Type 
        ///</summary>
        [DataMember]
        public Int64 ActiveStatus { get; set; }

        ///<summary>
        ///Name of Memo Type
        ///</summary>
        [DataMember]
        public string ChangeText { get; set; }

        ///<summary>
        ///Name of Memo Type
        ///</summary>
        [DataMember]
        public string CurrentStatus { get; set; }

        ///<summary>
        ///Name of Memo Type
        ///</summary>
        [DataMember]
        public Int64 Reset { get; set; }

    }
}
