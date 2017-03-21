using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Distributor -> DistributorCategory
    ///</summary>
    [DataContract]
    public class DistributorCategory 
    {
        ///<summary>
        ///ID of DistributorCategory 
        ///</summary>
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

    }
}
