using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> User -> RoleRights
    ///</summary>
    [DataContract]
    public class RoleRights : CRUDInfo
    {
        ///<summary>
        ///ID of Role Right
        ///</summary>
        [DataMember]
        public Int64 RoleRightId { get; set; }

        ///<summary>
        ///ID of Rights
        ///</summary>
        [DataMember]
        public Int64 RightId { get; set; }

        ///<summary>
        ///ID of Role
        ///</summary>
        [DataMember]
        public Int64 RoleId { get; set; }
    }
}
