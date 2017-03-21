using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> User -> UserRole
    ///</summary>
    [DataContract]
    public class UserRole : CRUDInfo
    {
        ///<summary>
        ///ID of User
        ///</summary>
        [DataMember]
        public Int64 UserId { get; set; }

        ///<summary>
        ///ID of Role
        ///</summary>
        [DataMember]
        public Int64 RoleId { get; set; }
    }
}
