using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class DashboardOverview
    {
        [DataMember]
        public Int64 MemoTypeId { get; set; }

        [DataMember]
        public string MemoTypeName { get; set; }

        [DataMember]
        public Int64 CurrentCategoryWiseCount { get; set; }

        [DataMember]
        public Int64 CurrentARNSpecificCount { get; set; }

        [DataMember]
        public Int64 CurrentTotal { get; set; }

        [DataMember]
        public Int64 UndefinedCategoryWiseCount { get; set; }

        [DataMember]
        public Int64 UndefinedARNSpecific { get; set; }

        [DataMember]
        public Int64 PreviousCategoryWiseCount { get; set; }

        [DataMember]
        public Int64 PreviousARNSpecificCount { get; set; }

        [DataMember]
        public Int64 PreviousTotal { get; set; }

        [DataMember]
        public string Value { get; set; }
    }
}
