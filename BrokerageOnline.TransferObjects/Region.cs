using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Channel/Zone/Branch -> Region
    ///</summary>
    [DataContract]
    partial class Region : CRUDInfo
    {
        ///<summary>
        ///ID for Region
        ///</summary>
        [DataMember]
        public Int64 RegionId { get; set; }

        ///<summary>
        ///Name Of region
        ///</summary>
        [DataMember]
        public Int64 RegionName { get; set; }
    }
}
