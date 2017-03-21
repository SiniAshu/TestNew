using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Distributor -> DistributorCategorySlab
    ///</summary>
    [DataContract]
    public class DistributorCategorySlab : CRUDInfo
    {
        ///<summary>
        ///ID of Distributor Category Slab Id
        ///</summary>
        [DataMember]
        public Int64 DistributorCategorySlabId { get; set; }

        ///<summary>
        ///ID of Distributor Category
        ///</summary>
        [DataMember]
        public Int64 DistributorCategoryId { get; set; }

        ///<summary>
        ///ID of Slab
        ///</summary>
        [DataMember]
        public Int64 SlabId { get; set; }
    }
}
