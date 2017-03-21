using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Channel/Zone/Branch -> Channel
    ///</summary>
    [DataContract]
    public partial class Channel : CRUDInfo
    {
        ///<summary>
        ///ID of Channel 
        ///</summary>
        [DataMember]
        public Int64 ChannelId { get; set; }

        ///<summary>
        ///Name of channel 
        ///</summary>
        [DataMember]
        public string ChannelName { get; set; }

        ///<summary>
        ///Status of Channel 
        ///</summary>
        [DataMember]
        public string ChannelStatus { get; set; }
    }
}
