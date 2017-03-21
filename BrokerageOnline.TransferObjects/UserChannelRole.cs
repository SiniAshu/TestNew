using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> User -> UserchannelRole
    ///</summary>
    [DataContract]
    public class UserChannelRole : CRUDInfo
    {
        ///<summary>
        ///ID of User Channel Role
        ///</summary>
        [DataMember]
        public Int64 UserChannelRoleId { get; set; }

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

        ///<summary>
        ///ID of Channel
        ///</summary>
        [DataMember]
        public Int64 ChannelId { get; set; }
    }
}
