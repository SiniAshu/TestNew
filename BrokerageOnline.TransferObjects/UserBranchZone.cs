using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> User -> UserBranchZone
    ///</summary>
    [DataContract]
    public class UserBranchZone : CRUDInfo
    {
        ///<summary>
        ///ID of User Branch Zone
        ///</summary>
        [DataMember]
        public Int64 UserBranchZoneId { get; set; }

        ///<summary>
        ///ID of User
        ///</summary>
        [DataMember]
        public Int64 UserId { get; set; }

        ///<summary>
        ///ID of Branch
        ///</summary>
        [DataMember]
        public Int64 BranchId { get; set; }

        ///<summary>
        ///ID of Zone
        ///</summary>
        [DataMember]
        public Int64 ZoneId { get; set; }
    }
}
