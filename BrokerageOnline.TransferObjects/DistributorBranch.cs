using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Distributor -> DistributorBranch
    ///</summary>
    [DataContract]
    public class DistributorBranch : CRUDInfo
    {
        ///<summary>
        ///ID of Distributor Branch
        ///</summary>
        [DataMember]
        public Int64 DistributorBranchId { get; set; }

        ///<summary>
        ///ID of Branch
        ///</summary>
        [DataMember]
        public Int64 BranchId { get; set; }

        ///<summary>
        ///ID of Distributor
        ///</summary>
        [DataMember]
        public Int64 DistributorId { get; set; }
    }
}
