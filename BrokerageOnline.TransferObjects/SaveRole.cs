using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Memo/WorkFlow Hierarchy -> PaymentMemo
    ///</summary>
    [DataContract]
    [Serializable]
    public class SaveRole
    {
        ///<summary>
        ///ID of Payment Memo 
        ///</summary>
        [DataMember]
        public Int64 ModuleId { get; set; }

        [DataMember]
        public Int64 MenuId { get; set; }

        [DataMember]
        public Int64 ViewAccess { get; set; }

        [DataMember]
        public Int64 EditAccess { get; set; }

        [DataMember]
        public Int64 CopyAccess { get; set; }

        [DataMember]
        public Int64 DeleteAccess { get; set; }

    }
}
