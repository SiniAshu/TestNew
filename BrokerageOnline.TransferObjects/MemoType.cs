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
    public class MemoType : CRUDInfo
    {
        ///<summary>
        ///ID of Memo Type 
        ///</summary>
        [DataMember]
        public Int64 MemoTypeId { get; set; }

        ///<summary>
        ///ID of Memo Parent
        ///</summary>
        [DataMember]
        public Int64 MemoParentId { get; set; }

        ///<summary>
        ///Name of Memo Type
        ///</summary>
        [DataMember]
        public string MemoTypeName { get; set; }

        ///<summary>
        ///Status of Memo Type
        ///</summary>
        [DataMember]
        public string MemoTypeStatus { get; set; }
    }
}
