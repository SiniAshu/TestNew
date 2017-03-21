using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class ChatHistory
    {
        ///<summary>
        ///ID of Sent from
        ///</summary>
        [DataMember]
        public Int64 SentFrom { get; set; }
        
        ///<summary>
        ///ID of Sent To
        ///</summary>
        [DataMember]
        public Int64 SentTo { get; set; }

        ///<summary>
        ///Date Time of Chat
        ///</summary>
        [DataMember]
        public string ChatDate { get; set; }

        ///<summary>
        ///Messages of chat
        ///</summary>
        [DataMember]
        public string Message { get; set; }

        ///<summary>
        ///Messages of chat
        ///</summary>
        [DataMember]
        public int Offline { get; set; }

        ///<summary>
        ///Messages of chat
        ///</summary>
        [DataMember]
        public int CountMsg { get; set; }
    }
}
