using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class BrokerageNotes
    {
        [DataMember]
        public Int64 NotesId { get; set; }

        [DataMember]
        public Int64 MemoTypeId { get; set; } 

        [DataMember]
        public string MemoFormatId { get; set; }

        [DataMember]
        public string BrkgNotes { get; set; } 

        [DataMember]
        public string MemoTypeName { get; set; }
        //memoformat
        [DataMember]
        public string Memoformat { get; set; }

        [DataMember]
        public string ChannelId { get; set; }

        [DataMember]
        public string ChannelName { get; set; }

        [DataMember]
        public string DistributorCategoryId { get; set; }

        [DataMember]
        public string DistributorCategoryName { get; set; }

        [DataMember]
        public string EffectiveDate { get; set; }
    }
}
