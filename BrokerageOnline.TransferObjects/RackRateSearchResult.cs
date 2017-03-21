using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Base Rack Rate -> Search Result
    ///This Class is inherited with AdHocSearchResults.cs , if any new properties added here, this should reflect the same in respected SP's
    ///</summary>
    [DataContract]
    public class RackRateSearchResult
    {
        ///<summary>
        ///ID of Payment Memo ID
        ///</summary>
        [DataMember]
        public Int64 PaymentMemoId { get; set; }

        ///<summary>
        ///Memo Number
        ///</summary>
        [DataMember]
        public string MemoNumber { get; set; }

        ///<summary>
        ///Memo Type ID
        ///</summary>
        [DataMember]
        public Int64 MemoTypeID { get; set; }

        ///<summary>
        ///Memo Type Name   
        ///</summary>
        [DataMember]
        public string MemoTypeName { get; set; }

        ///<summary>
        ///Distributor Category Name
        ///</summary>
        [DataMember]
        public string DistributorCategoryId { get; set; }

        ///<summary>
        ///Distributor Category Name
        ///</summary>
        [DataMember]
        public string DistributorCategoryName { get; set; }

        ///<summary>
        ///ARN Number
        ///</summary>
        [DataMember]
        public string ARNNo { get; set; }

        ///<summary>
        ///ARN Name
        ///</summary>
        [DataMember]
        public string ARNName { get; set; }


        ///<summary>
        ///Scheme
        ///</summary>
        [DataMember]
        public string Scheme { get; set; }

        ///<summary>
        ///Scheme Category
        ///</summary>
        [DataMember]
        public string SchemeCategory { get; set; }

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
        ///Status
        ///</summary>
        [DataMember]
        public string MemoStatus { get; set; }

        ///<summary>
        ///Status
        ///</summary>
        [DataMember]
        public string MemoStatusDisplay { get; set; }

        ///<summary>
        ///Created By Name
        ///</summary>
        [DataMember]
        public string CreatedByName { get; set; }

        ///<summary>
        ///Raised On Date
        ///</summary>
        [DataMember]
        public string RaisedOnDate { get; set; }

        ///<summary>
        ///Raised On Time
        ///</summary>
        [DataMember]
        public string RaisedOnTime { get; set; }

        ///<summary>
        ///Ageing
        ///</summary>
        [DataMember]
        public Int64 Ageing { get; set; }

        ///<summary>
        ///Raised On Date
        ///</summary>
        [DataMember]
        public string ModifiedByName { get; set; }

        ///<summary>
        ///Pending With
        ///</summary>
        [DataMember]
        public string PendingWith { get; set; }

        ///<summary>
        ///Pending With
        ///</summary>
        [DataMember]
        public bool IsCloseEnded { get; set; }

        ///<summary>
        ///MemoLevel
        ///</summary>
        [DataMember]
        public string MemoLevel { get; set; }


        ///<summary>
        ///isParentId
        ///</summary>
        [DataMember]
        public int isParentId { get; set; }

        ///<summary>
        ///MemoLevel
        ///</summary>
        [DataMember]
        public string LumpsumSIPType { get; set; }
    }
}
