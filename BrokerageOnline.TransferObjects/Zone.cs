using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Channel/Zone/Branch -> Zone
    ///</summary>
    [DataContract]
    public class Zone 
    {
        ///<summary>
        ///ID of Zone
        ///</summary>
        [DataMember]
        public Int64 ZoneId { get; set; }

        ///<summary>
        ///Zone Name
        ///</summary>
        [DataMember]
        public string ZoneName { get; set; }

        ///<summary>
        ///Status of Zone
        ///</summary>
        [DataMember]
        public Int64 ZoneStatus { get; set; }
    }
}
