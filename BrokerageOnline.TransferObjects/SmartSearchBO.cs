using System;
using System.Runtime.Serialization;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class SmartSearchBO
    {
        ///<summary>
        ///PaymentMemoId 
        ///</summary>
        [DataMember]
        public int PaymentMemoId { get; set; }

        ///<summary>
        ///PaymentListId 
        ///</summary>
        [DataMember]
        public int PaymentListId { get; set; }

        ///<summary>
        ///AdhocBatchID 
        ///</summary>
        [DataMember]
        public int AdhocBatchID { get; set; }

        ///<summary>
        ///MemoTypeId 
        ///</summary>
        [DataMember]
        public int MemoTypeId { get; set; }

        ///<summary>
        ///Serial No.
        ///</summary>
        [DataMember]
        public Int64 SerialNo { get; set; }

        ///<summary>
        ///Memo Number   
        ///</summary>
        [DataMember]
        public string MemoNumber { get; set; }

        ///<summary>
        ///DistributorCategoryName   
        ///</summary>
        [DataMember]
        public string DistributorCategoryName { get; set; }

        ///<summary>
        ///ARNNo   
        ///</summary>
        [DataMember]
        public string ARNNo { get; set; }

        ///<summary>
        ///ARNName   
        ///</summary>
        [DataMember]
        public string ARNName { get; set; }

        ///<summary>
        ///Sub Region Name   
        ///</summary>
        [DataMember]
        public string SubRegionName { get; set; }

        ///<summary>
        ///SchemeName   
        ///</summary>
        [DataMember]
        public string SchemeName { get; set; }

        ///<summary>
        ///SchemeCategoryName   
        ///</summary>
        [DataMember]
        public string SchemeCategoryName { get; set; }

        ///<summary>
        ///Zone Name   
        ///</summary>
        [DataMember]
        public string ZoneName { get; set; }

        ///<summary>
        ///Channel Name   
        ///</summary>
        [DataMember]
        public string ChannelName { get; set; }

        ///<summary>
        ///Date From
        ///</summary>
        [DataMember]
        public string DateFrom { get; set; }

        ///<summary>
        ///Date To
        ///</summary>
        [DataMember]
        public string DateTo { get; set; }

        ///<summary>
        ///MemoTypeName
        ///</summary>
        [DataMember]
        public string MemoTypeName { get; set; }

        ///<summary>
        ///MemoStatusName
        ///</summary>
        [DataMember]
        public string MemoStatusName { get; set; }

        ///<summary>
        ///RaisedByName
        ///</summary>
        [DataMember]
        public string RaisedByName { get; set; }

    }
}
