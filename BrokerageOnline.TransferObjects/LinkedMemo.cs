using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class LinkedMemo
    {
        ///<summary>
        ///MemoId 
        ///</summary>
        [DataMember]
        public Int64 MemoId { get; set; }

        ///<summary>
        ///MemoNumber
        ///</summary>
        [DataMember]
        public string MemoNumber { get; set; }
    }
}
