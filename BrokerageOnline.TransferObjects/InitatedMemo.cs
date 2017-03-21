using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class InitatedMemo
    {
        [DataMember]
        public Int64 MemoTypeId { get; set; }

        [DataMember]
        public string MemoTypeName { get; set; }

        [DataMember]
        public Int64 Initiated { get; set; }

        [DataMember]
        public Int64 Reviewed { get; set; }

        [DataMember]
        public Int64 Approved { get; set; }

        [DataMember]
        public Int64 Discarded { get; set; }
    }
}
