using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Distributor -> DistributorScheme
    ///</summary>
    [DataContract]
    public class DistributorScheme : CRUDInfo
    {
        ///<summary>
        ///ID of Distributor Scheme
        ///</summary>
        [DataMember]
        public Int64 DistributorSchemeId { get; set; }

        ///<summary>
        ///ID of Scheme
        ///</summary>
        [DataMember]
        public Int64 SchemeId { get; set; }

        ///<summary>
        ///ID of Distributor
        ///</summary>
        [DataMember]
        public Int64 DistributorId { get; set; }
    }
}
