using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;


namespace BrokerageOnline.TransferObjects
{
    public class SchemeDropdown
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
        ///Name of SchemeCategory
        ///</summary>
        [DataMember]
        public string SchemeCategoryName { get; set; }

        ///<summary>
        ///Code of Scheme
        ///</summary>
        [DataMember]
        public string SchemeCode { get; set; }
    }
}
