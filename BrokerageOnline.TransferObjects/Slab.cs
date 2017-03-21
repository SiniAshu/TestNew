using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Distributor -> Slab
    ///</summary>
    [DataContract]
    public class Slab : CRUDInfo
    {
        ///<summary>
        ///ID of Slab 
        ///</summary>
        [DataMember]
        public Int64 SlabId { get; set; }

        ///<summary>
        ///Slab Amount
        ///</summary>
        [DataMember]
        public decimal SlabAmount { get; set; }

        ///<summary>
        ///Description of Slab
        ///</summary>
        [DataMember]
        public string SlabDesc { get; set; }

        ///<summary>
        ///Status of Slab
        ///</summary>
        [DataMember]
        public string SlabStatus { get; set; }
    }
}
