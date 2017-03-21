using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class DistributorCategoryMaster
    {
        [DataMember]
        public Int64 DistributorCategoryId { get; set; }

        ///<summary>
        ///Name of Category 
        ///</summary>
        [DataMember]
        public string DistributorCategoryName { get; set; }

        ///<summary>
        ///Code of DistributorCategory 
        ///</summary>
        [DataMember]
        public string DistributorCategoryCode { get; set; }

        [DataMember]
        public string Slab { get; set; }

        [DataMember]
        public string SIPSlab { get; set; }

        [DataMember]
        public string IsActive { get; set; }

        [DataMember]
        public string ActiveStatus { get; set; }

        [DataMember]
        public string EffectiveDate { get; set; }

    }
}
