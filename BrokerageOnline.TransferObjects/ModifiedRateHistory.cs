using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{    
    ///<summary>
    ///Transfer Objects -> Payment List -> Modified Rate History
    ///</summary>
    [DataContract]
    public class ModifiedRateHistory
    {
        /////<summary>
        /////Audit ID
        /////</summary>
        //[DataMember]
        //public Int64 AuditId { get; set; }

        ///<summary>
        ///ID of PaymentList
        ///</summary>
        [DataMember]
        public int PaymentListId { get; set; }


        ///<summary>
        ///ID of Payment Memo
        ///</summary>
        [DataMember]
        public Int64 PaymentMemoId { get; set; }

        ///<summary>
        ///Scheme ID
        ///</summary>
        [DataMember]
        public string SchemeId { get; set; }

        ///<summary>
        ///Scheme
        ///</summary>
        [DataMember]
        public string Scheme { get; set; }

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
        ///Action Performed
        ///</summary>
        [DataMember]
        public string Action { get; set; }

        ///<summary>
        ///Action Taken By
        ///</summary>
        [DataMember]
        public string ActionTakenBy { get; set; }

        ///<summary>
        ///Role
        ///</summary>
        [DataMember]
        public string Role { get; set; }

        ///<summary>
        ///Scheme Category Name
        ///</summary>
        [DataMember]
        public string SchemeCategoryName { get; set; }

        ///<summary>
        ///ID of Payment Memo
        ///</summary>
        [DataMember]
        public Int64 SIPRowId { get; set; }
    }
}
