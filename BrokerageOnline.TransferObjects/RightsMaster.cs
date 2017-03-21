using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class RightsMaster
    {
        [DataMember]
        public Int64 RightId { get; set; }

        [DataMember]
        public string RightName { get; set; } 

        [DataMember]
        public string Description { get; set; }

        [DataMember]
        public Int64 ParentRightId { get; set; } 

        [DataMember]
        public Int64 IsActive { get; set; }

        [DataMember]
        public string ActiveStatus { get; set; }
    }
}
