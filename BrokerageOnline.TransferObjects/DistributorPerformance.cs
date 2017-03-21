using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Distributor -> DistributorPerformance
    ///</summary>
    [DataContract]
    public class DistributorPerformance : CRUDInfo
    {
        ///<summary>
        ///ID of Performance 
        ///</summary>
        [DataMember]
        public Int64 PerformanceId { get; set; }

        ///<summary>
        ///ID of Location
        ///</summary>
        [DataMember]
        public Int64 LocationId { get; set; }

        ///<summary>
        ///ID of Distibutor 
        ///</summary>
        [DataMember]
        public Int64 DistributorId { get; set; }

        ///<summary>
        ///ID of Scheme
        ///</summary>
        [DataMember]
        public Int64 SchemeId { get; set; }

        ///<summary>
        ///Assets under management 
        ///</summary>
        [DataMember]
        public string AUM { get; set; }

        ///<summary>
        ///Gross Sales
        ///</summary>
        [DataMember]
        public string GrossSales { get; set; }

        ///<summary>
        ///Net Sales
        ///</summary>
        [DataMember]
        public string NetSales { get; set; }

        ///<summary>
        ///Valid From Date
        ///</summary>
        [DataMember]
        public DateTime FromDate { get; set; }

        ///<summary>
        ///Valid Date to
        ///</summary>
        [DataMember]
        public DateTime ToDate { get; set; }
    }
}
