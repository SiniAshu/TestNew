using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Memo/WorkFlow Hierarchy -> WorkFlowHierarchy
    ///</summary>
    [DataContract]
    public class WorkFlowHierarchy
    {
        ///<summary>
        ///ID of WorkFlowHierarchy 
        ///</summary>
        [DataMember]
        public Int32 WorkFlowHierarchyId { get; set; }

        ///<summary>
        ///ID of Role
        ///</summary>
        [DataMember]
        public Int32 RoleId { get; set; }

        ///<summary>
        ///ID of Memo Type
        ///</summary>
        [DataMember]
        public Int32 MemoTypeId { get; set; }

        ///<summary>
        ///Level Number
        ///</summary>
        [DataMember]
        public Int32 LevelNo { get; set; }

        ///<summary>
        ///Memo Status
        ///</summary>
        [DataMember]
        public string Memostatus { get; set; }

        ///<summary>
        ///Flag to skip level
        ///</summary> 
        [DataMember]
        public bool IsSkippable { get; set; }
    }
}
