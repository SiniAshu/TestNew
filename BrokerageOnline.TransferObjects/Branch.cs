using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Channel/Zone/Branch -> Branch
    ///</summary>
    [DataContract]
    public class Branch : CRUDInfo
    {
        ///<summary>
        ///ID of Branch 
        ///</summary>
        [DataMember]
        public Int64 BranchId { get; set; }

        ///<summary>
        ///ID of Zone 
        ///</summary>
        [DataMember]
        public Int64 ZoneId { get; set; }

        ///<summary>
        ///Code of Branch
        ///</summary>
        [DataMember]
        public string BranchCode { get; set; }

        ///<summary>
        ///Name of Branch
        ///</summary>
        [DataMember]
        public string BranchName { get; set; }

        ///<summary>
        ///Status of Branch
        ///</summary>
        [DataMember]
        public string BranchStatus { get; set; }
    }
}
