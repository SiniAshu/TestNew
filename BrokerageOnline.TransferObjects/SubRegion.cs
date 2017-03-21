using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Channel/Zone/Branch -> SubRegion
    ///</summary>
    [DataContract]
    public class SubRegion  
    {
        ///<summary>
        ///ID for Sub Region
        ///</summary>
        [DataMember]
        public Int64 SubRegionId { get; set; }

        ///<summary>
        ///Name Of Sub region
        ///</summary>
        [DataMember]
        public string SubRegionName { get; set; }

        ///<summary>
        ///ID for Region
        ///</summary>
        [DataMember]
        public Int64 RegionId { get; set; }
    }
}
