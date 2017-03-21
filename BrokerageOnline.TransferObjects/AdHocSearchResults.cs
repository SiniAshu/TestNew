using System;
using System.Runtime.Serialization;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class AdHocSearchResults : RackRateSearchResult
    {
        ///<summary>
        ///PaymentList ID
        ///</summary>
        [DataMember]
        public int PaymentListId { get; set; }

        ///<summary>
        ///Serial No.
        ///</summary>
        [DataMember]
        public Int64 SerialNo { get; set; }

        ///<summary>
        ///Scheme ID
        ///</summary>
        [DataMember]
        public int SchemeId { get; set; }

        ///<summary>
        ///Scheme Name   
        ///</summary>
        [DataMember]
        public string SchemeName { get; set; }

        ///<summary>
        ///Scheme Category ID
        ///</summary>
        [DataMember]
        public int SchemeCategoryId { get; set; }

        ///<summary>
        ///Payment Amount   
        ///</summary>
        [DataMember]
        public string PaymentAmount { get; set; }

        ///<summary>
        ///Branch ID
        ///</summary>
        [DataMember]
        public int BranchId { get; set; }

        ///<summary>
        ///Branch Name   
        ///</summary>
        [DataMember]
        public string BranchName { get; set; }

        ///<summary>
        ///Amount Basis ID
        ///</summary>
        [DataMember]
        public int AmountBasisID { get; set; }

        ///<summary>
        ///Amount Basis Name   
        ///</summary>
        [DataMember]
        public string AmountBasisName { get; set; }

        ///<summary>
        ///Mobilization Amount   
        ///</summary>
        [DataMember]
        public string MobilizationAmount { get; set; }

        ///<summary>
        ///Rate
        ///</summary>
        [DataMember]
        public string Rate { get; set; }

        ///<summary>
        ///Remarks
        ///</summary>
        [DataMember]
        public string Remarks { get; set; }

        ///<summary>
        ///Free Text Box1
        ///</summary>
        [DataMember]
        public string FreeTextField1 { get; set; }

        ///<summary>
        ///Free Text Box2
        ///</summary>
        [DataMember]
        public string FreeTextField2 { get; set; }

        ///<summary>
        ///Pan Number
        ///</summary>
        [DataMember]
        public string PanNumber { get; set; }

        ///<summary>
        ///Required Items
        ///</summary>
        [DataMember]
        public bool IsRequired { get; set; }

        ///<summary>
        ///Channel Name
        ///</summary>
        [DataMember]
        public string ChannelName { get; set; }

        ///<summary>
        ///RaisedByEmail
        ///</summary>
        [DataMember]
        public string RaisedByEmail { get; set; }
    }
}
