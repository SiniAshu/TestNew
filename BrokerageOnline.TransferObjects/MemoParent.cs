using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class MemoParent
    {
        [DataMember]
        public Int64 MemoParentId { get; set; }

        [DataMember]
        public string MemoParentName { get; set; }

        [DataMember]
        public Int64 IsActive { get; set; }
    }
}
