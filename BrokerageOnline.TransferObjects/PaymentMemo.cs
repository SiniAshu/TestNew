using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Memo/WorkFlow Hierarchy -> PaymentMemo
    ///</summary>
    [DataContract]
    [Serializable]
    public class PaymentMemo
    {
        ///<summary>
        ///ID of Payment Memo 
        ///</summary>
        [DataMember]
        public string PaymentMemoId { get; set; }

        ///<summary>
        ///Memo Number
        ///</summary>
        [DataMember]
        public string MemoNumber { get; set; }

        ///<summary>
        ///ID of Branch
        ///</summary>
        [DataMember]
        public string BranchId { get; set; }

        ///<summary>
        ///ID of Zone
        ///</summary>
        [DataMember]
        public string ZoneId { get; set; }

        ///<summary>
        ///ID of Memo Type
        ///</summary>
        [DataMember]
        public string MemoTypeId { get; set; }

        ///<summary>
        ///ID of Payment Amount 
        ///</summary>
        [DataMember]
        public string PaymentAmount { get; set; }

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
        ///Applicable To
        ///</summary>
        [DataMember]
        public string ApplicableTo { get; set; }

        ///<summary>
        ///Type of Transaction
        ///</summary>
        [DataMember]
        public string TransactionType { get; set; }

        ///<summary>
        ///Type of Slab
        ///</summary>
        [DataMember]
        public string SlabType { get; set; }

        ///<summary>
        ///Slab Amount
        ///</summary>
        [DataMember]
        public string SlabAmount { get; set; }

        ///<summary>
        ///Slab Condition
        ///</summary>
        [DataMember]
        public string SlabCondition { get; set; }

        ///<summary>
        ///Remarks
        ///</summary>
        [DataMember]
        public string Remarks { get; set; }

        ///<summary>
        ///Comments
        ///</summary>
        [DataMember]
        public string Comments { get; set; }

        ///<summary>
        ///Comments
        ///</summary>
        [DataMember]
        public string MemoStatus { get; set; }

        ///<summary>
        ///CreatedBy user ID
        ///</summary>
        [DataMember]
        public string CreatedBy { get; set; }

          ///<summary>
        ///CreatedBy user ID
        ///</summary>
        [DataMember]
        public string LoginId { get; set; }

        ///<summary>
        ///Transaction Type Others
        ///</summary>
        [DataMember]
        public string TransactionTypeOthers { get; set; }

        ///<summary>
        ///Copied From Memo ID
        ///</summary>
        [DataMember]
        public string CopiedMemoID { get; set; }

        ///<summary>
        ///SIPNotes
        ///</summary>
        [DataMember]
        public string SIPNotes { get; set; }

        ///<summary>
        ///IsCloseEnded
        ///</summary>
        [DataMember]
        public string IsCloseEnded { get; set; }

        ///<summary>
        ///PaymentMemoLinkId
        ///</summary>
        [DataMember]
        public Int64 PaymentMemoLinkId { get; set; }

        ///<summary>
        ///LumpsumSIPType
        ///</summary>
        [DataMember]
        public Int64 LumpsumSIPTypeId { get; set; }

        ///<summary>
        ///LumpsumSIPType
        ///</summary>
        [DataMember]
        public string LumpsumSIPType { get; set; }

        ///<summary>
        ///IsSaved
        ///</summary>
        [DataMember]
        public bool IsSaved { get; set; }

        /////<summary>
        /////ID of Branch
        /////</summary>
        //[DataMember]
        //public Int64 BranchId { get; set; }

        /////<summary>
        /////ID of Zone
        /////</summary>
        //[DataMember]
        //public Int64 ZoneId { get; set; }

        /////<summary>
        /////ID of Memo Type
        /////</summary>
        //[DataMember]
        //public Int64 MemoTypeId { get; set; }

        /////<summary>
        /////ID of Payment Amount 
        /////</summary>
        //[DataMember]
        //public Int64 PaymentAmount { get; set; }

        /////<summary>
        /////From Date
        /////</summary>
        //[DataMember]
        //public DateTime DateFrom { get; set; }

        /////<summary>
        /////To Date
        /////</summary>
        //[DataMember]
        //public DateTime DateTo { get; set; }

        /////<summary>
        /////Applicable To
        /////</summary>
        //[DataMember]
        //public String ApplicableTo { get; set; }

        /////<summary>
        /////Type of Transaction
        /////</summary>
        //[DataMember]
        //public Int64 TransactionType { get; set; }

        /////<summary>
        /////Type of Slab
        /////</summary>
        //[DataMember]
        //public Int64 SlabType { get; set; }

        /////<summary>
        /////Slab Amount
        /////</summary>
        //[DataMember]
        //public Int64 SlabAmount { get; set; }

        /////<summary>
        /////Slab Condition
        /////</summary>
        //[DataMember]
        //public Int64 SlabCondition { get; set; }

        /////<summary>
        /////Remarks
        /////</summary>
        //[DataMember]
        //public string Remarks { get; set; }

        /////<summary>
        /////Comments
        /////</summary>
        //[DataMember]
        //public string Comments { get; set; }
    }
}
