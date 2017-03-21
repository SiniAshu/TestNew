using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{ 
    ///<summary>
    ///Transfer Objects -> PaymentMemo -> Remarks Histort
    ///</summary>
    [DataContract]
    public class RemarksHistory
    {
        ///<summary>
        ///ID Audit
        ///</summary>
        [DataMember]
        public string AuditId { get; set; }

        ///<summary>
        ///ID Payment Memo
        ///</summary>
        [DataMember]
        public string PaymentMemoId { get; set; }

        ///<summary>
        ///Date
        ///</summary>
        [DataMember]
        public string Date { get; set; }

        ///<summary>
        ///Time
        ///</summary>
        [DataMember]
        public string Time { get; set; }

        ///<summary>
        ///Remarks
        ///</summary>
        [DataMember]
        public string Remarks { get; set; }

        ///<summary>
        ///Remarks
        ///</summary>
        [DataMember]
        public string RemarksBy { get; set; }

        ///<summary>
        ///Action
        ///</summary>
        [DataMember]
        public string Action { get; set; }
    }
}
