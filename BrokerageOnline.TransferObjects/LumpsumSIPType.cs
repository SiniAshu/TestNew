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
    public class LumpsumSIPType 
    {
        ///<summary>
        ///ID of TransactionType 
        ///</summary>
        [DataMember]
        public string LumpsumSIPId { get; set; }

        ///<summary>
        ///Name of TransactionType 
        ///</summary>
        [DataMember]
        public string LumpsumSIPName { get; set; }


    }
}
