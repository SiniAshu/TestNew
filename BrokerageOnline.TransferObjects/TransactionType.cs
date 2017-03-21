using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Masters -> TransactionType
    ///</summary>
    [DataContract]
    public class TransactionType : CRUDInfo
    {
        ///<summary>
        ///ID of TransactionType 
        ///</summary>
        [DataMember]
        public Int64 TransactionTypeId { get; set; }

        ///<summary>
        ///Name of TransactionType 
        ///</summary>
        [DataMember]
        public string TransactionTypeName { get; set; }

        ///<summary>
        ///Status of TransactionType 
        ///</summary>
        [DataMember]
        public string TransactionTypeStatus { get; set; }

    }
}
