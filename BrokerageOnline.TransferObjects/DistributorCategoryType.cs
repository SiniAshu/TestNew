using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Masters -> DistributorCategoryType
    ///</summary>
    [DataContract]
    public class DistributorCategoryType : CRUDInfo
    {
        ///<summary>
        ///ID of DistributorCategoryType 
        ///</summary>
        [DataMember]
        public Int64 DistributorCategoryTypeId { get; set; }

        ///<summary>
        ///Name of DistributorCategoryType
        ///</summary>
        [DataMember]
        public string DistributorCategoryTypeName { get; set; }

        ///<summary>
        ///Status of DistributorCategoryType
        ///</summary>
        [DataMember]
        public string DistributorCategoryTypeStatus { get; set; }

    }
}
