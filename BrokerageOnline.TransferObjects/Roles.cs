using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> User -> Roles
    ///</summary>
    [DataContract]
    public class Roles
    {
        ///<summary>
        ///ID of Role Sequence
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
        ///Is Active
        ///</summary>
        [DataMember]
        public bool isActive { get; set; }

        ///<summary>
        ///Description of Role
        ///</summary>
        [DataMember]
        public string Description { get; set; }

        ///<summary>
        ///Created By Name
        ///</summary>
        [DataMember]
        public string CreatedByName { get; set; }

        ///<summary>
        ///Modified by Name
        ///</summary>
        [DataMember]
        public string ModifiedByName { get; set; }

        ///<summary>
        ///Created By Name
        ///</summary>
        [DataMember]
        public string Rolefunction { get; set; }

        ///<summary>
        ///Modified by Name
        ///</summary>
        [DataMember]
        public string AccesssMatrix { get; set; }
            
        ///<summary>
        ///Modified by Name
        ///</summary>
        [DataMember]
        public string RolefunctionID { get; set; }


        ///<summary>
        ///Modified by Name
        ///</summary>
        [DataMember]
        public string EffectiveDate { get; set; }
    }
}
