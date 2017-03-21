using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Distributor -> Location
    ///</summary>
    [DataContract]
    public class Location : CRUDInfo
    {
        ///<summary>
        ///ID of Location
        ///</summary>
        [DataMember]
        public Int64 LocationId { get; set; }

        ///<summary>
        ///Code of location
        ///</summary>
        [DataMember]
        public Int64 LocationCode { get; set; }

        ///<summary>
        ///Name Of location
        ///</summary>
        [DataMember]
        public Int64 LocationName { get; set; }
    }
}
