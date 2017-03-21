using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Memo/WorkFlow Hierarchy -> PaymentList
    ///</summary>
    [DataContract]
    public class PaymentList
    {
        ///<summary>
        ///ID of Payment List 
        ///</summary>
        [DataMember]
        public string PaymentListId { get; set; }

        ///<summary>
        ///ID of Scheme Id
        ///</summary>
        [DataMember]
        public string SchemeId { get; set; }

        ///<summary>
        ///ID of Scheme Name
        ///</summary>
        [DataMember]
        public string SchemeName { get; set; }

        ///<summary>
        ///ID of Scheme Category ID
        ///</summary>
        [DataMember]
        public string SchemeCategoryId { get; set; }

        ///<summary>
        ///ID of Scheme Category Name
        ///</summary>
        [DataMember]
        public string SchemeCategoryName { get; set; }

        ///<summary>
        ///ID of Distributor Category ID
        ///</summary>
        [DataMember]
        public string DistributorCategoryId { get; set; }

        ///<summary>
        ///ID of Distributor Category Name
        ///</summary>
        [DataMember]
        public string DistributorCategoryName { get; set; }

        ///<summary>
        ///ID of Payment Memo ID 
        ///</summary>
        [DataMember]
        public string PaymentMemoId { get; set; }

        ///<summary>
        ///Payment Type
        ///</summary>
        [DataMember]
        public string PaymentType { get; set; }

        ///<summary>
        ///ARN Number
        ///</summary>
        [DataMember]
        public string ARNNO { get; set; }

        ///<summary>
        ///ARN Name
        ///</summary>
        [DataMember]
        public string ARNName { get; set; }

        ///<summary>
        ///From Date
        ///</summary>
        [DataMember]
        public string DateFrom { get; set; }

        ///<summary>
        ///To Date
        ///</summary>
        [DataMember]
        public string DateTo { get; set; }

        ///<summary>
        ///Slab Type
        ///</summary>
        [DataMember]
        public string SlabType { get; set; }

        ///<summary>
        ///Slab Amount
        ///</summary>
        [DataMember]
        public string SlabAmount { get; set; }

        ///<summary>
        ///Payment Basis
        ///</summary>
        [DataMember]
        public string PaymentBasis { get; set; }

        ///<summary>
        ///Target
        ///</summary>
        [DataMember]
        public string Target { get; set; }

        ///<summary>
        ///Target Period
        ///</summary>
        [DataMember]
        public string TargetPeriod { get; set; }

        ///<summary>
        ///Interest Rate
        ///</summary>
        [DataMember]
        public string InterestRate { get; set; }

        ///<summary>
        ///Condition for Installment
        ///</summary>
        [DataMember]
        public string InstallmentCondition { get; set; }

        ///<summary>
        ///Installment Range From
        ///</summary>
        [DataMember]
        public string InstallmentRangeFrom { get; set; }

        ///<summary>
        ///Installment Range To
        ///</summary>
        [DataMember]
        public string InstallmentRangeTo { get; set; }

        ///<summary>
        ///Tenure Condition
        ///</summary>
        [DataMember]
        public string TenureCondition { get; set; }

        ///<summary>
        ///Tenure Months
        ///</summary>
        [DataMember]
        public string TenureMonths { get; set; }

        ///<summary>
        ///Upfront Payment Type
        ///</summary>
        [DataMember]
        public string UpfrontPaymentType { get; set; }

        ///<summary>
        ///Upfront Value
        ///</summary>
        [DataMember]
        public string UpfrontValue { get; set; }

        ///<summary>
        ///Calculation
        ///</summary>
        [DataMember]
        public string Calculation { get; set; }

        ///<summary>
        ///Clawback
        ///</summary>
        [DataMember]
        public string Clawback { get; set; }

        ///<summary>
        ///SIP Incentive Remarks
        ///</summary>
        [DataMember]
        public string SIPIncentiveRemarks { get; set; }

        ///<summary>
        ///SIP Row Id
        ///</summary>
        [DataMember]
        public string SIPRowId { get; set; }

        ///<summary>
        ///Free Text Field 1
        ///</summary>
        [DataMember]
        public string FreeTextField1 { get; set; }

        ///<summary>
        ///Free Text Field 2
        ///</summary>
        [DataMember]
        public string FreeTextField2 { get; set; }

        ///<summary>
        ///Onwards
        ///</summary>
        [DataMember]
        public string Onwards { get; set; }

        ///<summary>
        ///Folio
        ///</summary>
        [DataMember]
        public string Folio { get; set; }

        ///<summary>
        ///Folio
        ///</summary>
        [DataMember]
        public string SIPSlab { get; set; }

        ///<summary>
        ///IsUpdated
        ///</summary>
        [DataMember]
        public bool IsUpdated { get; set; }

        ///<summary>
        ///Folio
        ///</summary>
        [DataMember]
        public string RaisedBy { get; set; }

        ///<summary>
        ///Folio
        ///</summary>
        [DataMember]
        public string AuditMemoId { get; set; }

        ///<summary>
        ///RoleSeqNo
        ///</summary>
        [DataMember]
        public string RoleSeqNo { get; set; }

        ///<summary>
        ///MemoNumber
        ///</summary>
        [DataMember]
        public string MemoNumber { get; set; }

        ///<summary>
        ///ModifiedDateAndTime
        ///</summary>
        [DataMember]
        public string ModifiedDateAndTime { get; set; }
    }
}
