using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Memo/WorkFlow Hierarchy -> BrokerageType
    ///</summary>
    [DataContract]
    public class BrokerageType : CRUDInfo
    {
        ///<summary>
        ///ID of BrokerageType 
        ///</summary>
        [DataMember]
        public Int64 BrokerageTypeId { get; set; }

        ///<summary>
        ///Name of BrokerageType 
        ///</summary>
        [DataMember]
        public string BrokerageTypeName { get; set; }

    }
}
