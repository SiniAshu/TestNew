using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class WorkFlowPayment
    {
        /// <summary>
        /// Payment Memo Information
        /// </summary>
        private PaymentMemo memo;
        [DataMember]
        public PaymentMemo Memo
        {
            get { return memo; }
            set { memo = value; }
        }

        /// <summary>
        /// Payment List
        /// </summary>
        private List<PaymentList> list;
        [DataMember]
        public List<PaymentList> List
        {
            get { return list; }
            set { list = value; }
        }

        /// <summary>
        /// Payment Details
        /// </summary>
        private List<PaymentDetails> details;
        [DataMember]
        public List<PaymentDetails> Details
        {
            get { return details; }
            set { details = value; }
        }
    }
}
