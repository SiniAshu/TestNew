using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class SchemeModule
    {
        [DataMember]
        public Int64 SchemeModuleId { get; set; }

        [DataMember]
        public string SchemeId { get; set; }

        [DataMember]
        public string SchemeName { get; set; }

        [DataMember]
        public string SchemeCategoryId { get; set; }

        [DataMember]
        public string SchemeCategoryName { get; set; }

        [DataMember]
        public string ModuleId { get; set; }

        [DataMember]
        public string ModuleName { get; set; }

        [DataMember]
        public Int64 UserID { get; set; }

        [DataMember]
        public string EffectiveDate { get; set; }
    }
}
