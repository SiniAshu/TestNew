using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    public class DistributorMaster
    {
        ///<summary>
        ///ID for Distributor
        ///</summary>
        [DataMember]
        public Int64 DistributorId { get; set; }
        ///<summary>
        ///ID of Distributor Category
        ///</summary>
        [DataMember]
        public string DistributorCategoryName { get; set; }

        ///<summary>
        ///ID of Distributor Category
        ///</summary>
        [DataMember]
        public Int64 DistributorCategoryId { get; set; }

        ///<summary>
        ///ID of Distributor Parent
        ///</summary>
        [DataMember]
        public Int64 DistributorParent { get; set; }

        ///<summary>
        ///ARN Number of Distributor
        ///</summary>
        [DataMember]
        public string DistributorParentId { get; set; }

        ///<summary>
        ///ARN Number of Distributor
        ///</summary>
        [DataMember]
        public string ARN { get; set; }

        ///<summary>
        ///Name of Distributor
        ///</summary>
        [DataMember]
        public string DistributorName { get; set; }

        ///<summary>
        ///ID for Distributor Status 
        ///</summary>
        [DataMember]
        public string DistributorStatus { get; set; }

        ///<summary>
        ///Hybrid AUM amount for Distributor 
        ///</summary>
        [DataMember]
        public string HybridAUM { get; set; }

        ///<summary>
        ///Equity AUM amount for Distributor 
        ///</summary>
        [DataMember]
        public string EquityAUM { get; set; }

        ///<summary>
        ///Hybrid AUM amount for Distributor 
        ///</summary>
        [DataMember]
        public string Debt { get; set; }

        ///<summary>
        ///FOF AUM amount for Distributor 
        ///</summary>
        [DataMember]
        public string FOF { get; set; }

        ///<summary>
        ///TotalA UM amount for Distributor 
        ///</summary>
        [DataMember]
        public string TotalAUM { get; set; }

        ///<summary>
        ///TotalA UM amount for Distributor 
        ///</summary>
        [DataMember]
        public string TaxNo { get; set; }

        ///<summary>
        ///ID for Distributor Status 
        ///</summary>
        [DataMember]
        public string PanNumber { get; set; }

        [DataMember]
        public string MergCode { get; set; }///<summary>
        ///ID of Distributor Category
        ///</summary>
        [DataMember]
        public Int64 SubRegionId { get; set; }

        ///<summary>
        ///Sub Region for distributor
        ///</summary>
        [DataMember]
        public string SubRegion { get; set; }

        ///<summary>
        ///Distributor Entriy made on date
        ///</summary>
        [DataMember]
        public string CreatedOn { get; set; }
    }
}
