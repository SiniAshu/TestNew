using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class SIPRateHistoryDetails
    {
        ///<summary>
        ///SchemeId 
        ///</summary>
        [DataMember]
        public string SchemeId { get; set; }

        ///<summary>
        ///Scheme
        ///</summary>
        [DataMember]
        public string Scheme { get; set; }

        ///<summary>
        ///SchemeCategoryId 
        ///</summary>
        [DataMember]
        public string SchemeCategoryId { get; set; }

        ///<summary>
        ///Scheme Category
        ///</summary>
        [DataMember]
        public string SchemeCategory { get; set; }

        ///<summary>
        ///InstallmentAmount 
        ///</summary>
        [DataMember]
        public string InstallmentAmount { get; set; }

        ///<summary>
        ///Tenure 
        ///</summary>
        [DataMember]
        public string Tenure { get; set; }

        ///<summary>
        ///UpfrontPaymentType 
        ///</summary>
        [DataMember]
        public string UpfrontPaymentType { get; set; }

        ///<summary>
        ///UpfrontValue 
        ///</summary>
        [DataMember]
        public string UpfrontValue { get; set; }

        ///<summary>
        ///Calculation 
        ///</summary>
        [DataMember]
        public string Calculation { get; set; }

        ///<summary>
        ///PaymentType 
        ///</summary>
        [DataMember]
        public string PaymentType { get; set; }

        ///<summary>
        ///SchemeId 
        ///</summary>
        [DataMember]
        public string Clawback { get; set; }

        ///<summary>
        ///SIPIncentiveRemarks 
        ///</summary>
        [DataMember]
        public string SIPIncentiveRemarks { get; set; }

        ///<summary>
        ///SIPRowId 
        ///</summary>
        [DataMember]
        public Int64 SIPRowId { get; set; }

         ///<summary>
        ///ActionBy 
        ///</summary>
        [DataMember]
        public string ActionBy { get; set; }

        ///<summary>
        ///ActionBy 
        ///</summary>
        [DataMember]
        public string Action { get; set; }

         ///<summary>
        ///RoleName 
        ///</summary>
        [DataMember]
        public string RoleName { get; set; }

        ///<summary>
        ///RoleId 
        ///</summary>
        [DataMember]
        public Int64 RoleId { get; set; }
        
        ///<summary>
        ///PaymentListId 
        ///</summary>
        [DataMember]
        public int PaymentListId { get; set; }
         
        ///<summary>
        ///Action Date Time 
        ///</summary>
        [DataMember]
        public string ActionDateTime { get; set; }

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
    }
}
