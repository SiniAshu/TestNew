using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Masters -> AlertMessage
    ///</summary>
    [DataContract]
    public class AlertMessage
    {
        ///<summary>
        ///ID of Alert Message
        ///</summary>
        [DataMember]
        public Int64 AlertMessageId { get; set; }

        ///<summary>
        ///Alert Message Type
        ///</summary>
        [DataMember]
        public string AlertMessageType { get; set; }

        ///<summary>
        ///Alert Message
        ///</summary>
        [DataMember]
        public string Alert_Message { get; set; }    
    }
}
