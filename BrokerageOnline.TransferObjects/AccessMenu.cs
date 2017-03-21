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
    public class AccessMenu
    {
        ///<summary>
        ///ID of Memo Type 
        ///</summary>
        [DataMember]
        public Int64 AccessMenuId { get; set; }

        ///<summary>
        ///ID of Memo Type 
        ///</summary>
        [DataMember]
        public Int64 ModuleId { get; set; }

        ///<summary>
        ///Name of Memo Type
        ///</summary>
        [DataMember]
        public string AccessMenuName { get; set; }

        ///<summary>
        ///Status of Memo Type
        ///</summary>
        [DataMember]
        public string MemoParentName { get; set; }

        ///<summary>
        ///ID of Memo Type 
        ///</summary>
        [DataMember]
        public Int64 IsActive { get; set; }
    }
}
