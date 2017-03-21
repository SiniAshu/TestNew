using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Scheme -> Scheme
    ///</summary>
    [DataContract]
    public class Scheme : CRUDInfo
    {
        ///<summary>
        ///ID of Scheme
        ///</summary>
        [DataMember]
        public Int64 SchemeId { get; set; }

        ///<summary>
        ///ID of SchemeType 
        ///</summary>
        [DataMember]
        public Int64 SchemeTypeId { get; set; }

        ///<summary>
        ///ID of Scheme Category
        ///</summary>
        [DataMember]
        public Int64 SchemeCategoryId { get; set; }

        ///<summary>
        ///Name of Scheme
        ///</summary>
        [DataMember]
        public string SchemeName { get; set; }

        ///<summary>
        ///Code of Scheme
        ///</summary>
        [DataMember]
        public string SchemeCode { get; set; }

        ///<summary>
        ///Is Scheme Close Ended
        ///</summary>
        [DataMember]
        public bool SchemeIsCloseEnded { get; set; }

        ///<summary>
        ///Account number Of Scheme
        ///</summary>
        [DataMember]
        public float SchemeAccountNumber { get; set; }

        ///<summary>
        ///Purchase Pays in Days
        ///</summary>
        [DataMember]
        public Int64 PurchasePaysInDays { get; set; }

        ///<summary>
        ///RedemptionPayInDays
        ///</summary>
        [DataMember]
        public Int64 RedemptionPayInDays { get; set; }

        ///<summary>
        ///NFO Start Date
        ///</summary>
        [DataMember]
        public DateTime NFOStartDate { get; set; }

        ///<summary>
        ///Start Date of Scheme
        ///</summary>
        [DataMember]
        public DateTime StartDate { get; set; }

        ///<summary>
        ///End Date of Scheme
        ///</summary>
        [DataMember]
        public DateTime EndDate { get; set; }

        ///<summary>
        ///Scheme Maturity Date
        ///</summary>
        [DataMember]
        public DateTime MaturityDate { get; set; }

        

        ///<summary>
        ///Face Value
        ///</summary>
        [DataMember]
        public Int64 FaceValue { get; set; }

        ///<summary>
        ///IssuerValue
        ///</summary>
        [DataMember]
        public Int64 IssuerValue { get; set; }

        ///<summary>
        ///Capital
        ///</summary>
        [DataMember]
        public Decimal Capital { get; set; }

        ///<summary>
        ///EntryLoad
        ///</summary>
        [DataMember]
        public Decimal EntryLoad { get; set; }

        ///<summary>
        ///ExitLoad
        ///</summary>
        [DataMember]
        public Decimal ExitLoad { get; set; }

        ///<summary>
        ///DematAccountNumber1
        ///</summary>
        [DataMember]
        public string DematAccountNumber1 { get; set; }

        ///<summary>
        ///DematAccountNumber2
        ///</summary>
        [DataMember]
        public string DematAccountNumber2 { get; set; }

        ///<summary>
        ///DematAccountNumber3
        ///</summary>
        [DataMember]
        public string DematAccountNumber3 { get; set; }

        ///<summary>
        ///UCCCode  
        ///</summary>
        [DataMember]
        public string UCCCode { get; set; }

        ///<summary>
        ///NSDLCode
        ///</summary>
        [DataMember]
        public string NSDLCode { get; set; }

        ///<summary>
        ///MigrationCode
        ///</summary>
        [DataMember]
        public string MigrationCode { get; set; }

        ///<summary>
        ///PLAccountCode
        ///</summary>
        [DataMember]
        public string PLAccountCode { get; set; }

        ///<summary>
        ///CustodianCode
        ///</summary>
        [DataMember]
        public string CustodianCode { get; set; }

        ///<summary>
        ///PromotionFeeCode
        ///</summary>
        [DataMember]
        public string PromotionFeeCode { get; set; }

        ///<summary>
        ///ManagementFeeCode
        ///</summary>
        [DataMember]
        public string ManagementFeeCode { get; set; }

        ///<summary>
        ///TrusteeFeeCode
        ///</summary>
        [DataMember]
        public string TrusteeFeeCode { get; set; }

        ///<summary>
        ///IsSuspended
        ///</summary>
        [DataMember]
        public Boolean IsSuspended { get; set; }

        ///<summary>
        ///ID Of Manager
        ///</summary>
        [DataMember]
        public Int64 ManagerID { get; set; }

        ///<summary>
        ///ID Of Currency
        ///</summary>
        [DataMember]
        public Int64 CurrencyID { get; set; }

        ///<summary>
        ///Sequence
        ///</summary>
        [DataMember]
        public Int64 Sequence { get; set; }

        ///<summary>
        ///ID Of Index
        ///</summary>
        [DataMember]
        public Int64 IndexID { get; set; }

        ///<summary>
        ///SchemeSequence
        ///</summary>
        [DataMember]
        public Int64 SchemeSequence { get; set; }

    }
}
