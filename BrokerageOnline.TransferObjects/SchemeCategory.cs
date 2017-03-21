using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Scheme -> SchemeCategory
    ///</summary>
    [DataContract]
    public class SchemeCategory : CRUDInfo
    {
        ///<summary>
        ///ID of SchemeCategory 
        ///</summary>
        [DataMember]
        public Int64 SchemeCategoryId { get; set; }

        ///<summary>
        ///Name of SchemeCategory 
        ///</summary>
        [DataMember]
        public string SchemeCategoryName { get; set; }

        ///<summary>
        ///Code of SchemeCategory 
        ///</summary>
        [DataMember]
        public string SchemeCategoryCode { get; set; }
        
        ///<summary>
        ///ID of SchemeCategory 
        ///</summary>
        [DataMember]
        public Int64 CategorySequence { get; set; }

    }
}
