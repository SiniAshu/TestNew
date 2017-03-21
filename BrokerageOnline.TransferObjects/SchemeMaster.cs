using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class SchemeMaster
    {
        [DataMember]
        public Int64 SubRegionId { get; set; }

        [DataMember]
        public string SubRegionName { get; set; }

        [DataMember]
        public Int64 RegionId { get; set; }

        [DataMember]
        public bool IsActive { get; set; }

        [DataMember]
        public string ActiveStatus { get; set; }
    }
}
