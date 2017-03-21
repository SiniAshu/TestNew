using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Memo/WorkFlow Hierarchy -> PaymentDetails
    ///</summary>
    [DataContract]
    public class PaymentDetails
    {
        ///<summary>
        ///ID of Payment Details 
        ///</summary>
        [DataMember]
        public string PaymentDetailsId { get; set; }

        ///<summary>
        ///ID of Payment Memo 
        ///</summary>
        [DataMember]
        public string PaymentMemoId { get; set; }

        ///<summary>
        ///ID of Scheme
        ///</summary>
        [DataMember]
        public string SchemeId { get; set; }

        ///<summary>
        ///ID of Brokerage Type
        ///</summary>
        [DataMember]
        public string BrokerageTypeId { get; set; }

        ///<summary>
        ///ID of Payment List 
        ///</summary>
        [DataMember]
        public string PaymentListId { get; set; }

        ///<summary>
        ///Live Tie Up
        ///</summary>
        [DataMember]
        public string LumpSumLessTieup { get; set; }

        ///<summary>
        ///Base Upfront
        ///</summary>
        [DataMember]
        public string BaseUpfront { get; set; }

        ///<summary>
        ///Additional Incentives
        ///</summary>
        [DataMember]
        public string AdditionalIncentives { get; set; }

        ///<summary>
        ///Slab Less than or equals
        ///</summary>
        [DataMember]
        public string SIPSlabLess { get; set; }

        ///<summary>
        ///Slab Greater
        ///</summary>
        [DataMember]
        public string SIPSlabGreater { get; set; }

        ///<summary>
        ///Total
        ///</summary>
        [DataMember]
        public string Total { get; set; }

        ///<summary>
        ///Period Type
        ///</summary>
        [DataMember]
        public string PeriodType { get; set; }

        ///<summary>
        ///Period Start Date
        ///</summary>
        [DataMember]
        public string PeriodStart { get; set; }

        ///<summary>
        ///Period End Date
        ///</summary>
        [DataMember]
        public string PeriodEnd { get; set; }

        ///<summary>
        ///Sub Total
        ///</summary>
        [DataMember]
        public string SlabTotal { get; set; }

        ///<summary>
        ///Is Slab Less Or Greater
        ///</summary>
        [DataMember]
        public string IsSlabLess { get; set; }

        ///<summary>
        ///LumpSum Greater Slab
        ///</summary>
        [DataMember]
        public string LumpSumGreater { get; set; }

        ///<summary>
        ///LumpSum Greater Tieup
        ///</summary>
        [DataMember]
        public string LumpSumGreaterTieup { get; set; }

        ///<summary>
        ///Folio
        ///</summary>
        [DataMember]
        public string AuditMemoId { get; set; }

        /// <summary>
        /// LumpSumGreaterTotal
        /// </summary>
        [DataMember]
        public string LumpSumGreaterTotal { get; set; }

        /// <summary>
        /// IsCopied
        /// </summary>
        [DataMember]
        public bool IsCopied { get; set; }
    }
}
