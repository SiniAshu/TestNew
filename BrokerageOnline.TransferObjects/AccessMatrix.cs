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
    public class AccessMatrix
    {
        ///<summary>
        ///ID of Memo Type 
        ///</summary>
        [DataMember]
        public Int64 AccessId { get; set; }

        ///<summary>
        ///Name of Memo Type
        ///</summary>
        [DataMember]
        public string AccessName { get; set; }

        ///<summary>
        ///ID of Memo Type 
        ///</summary>
        [DataMember]
        public Int64 IsActive { get; set; }
    }
}
