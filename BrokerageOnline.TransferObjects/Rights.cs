using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> User -> Rights
    ///</summary>
    [DataContract]
    public class Rights : CRUDInfo
    {
        ///<summary>
        ///ID of Rights
        ///</summary>
        [DataMember]
        public Int64 RightId { get; set; }

        ///<summary>
        ///Name of Right
        ///</summary>
        [DataMember]
        public string RightName { get; set; }

        ///<summary>
        ///Description
        ///</summary>
        [DataMember]
        public Int64 Description { get; set; }
    }
}
