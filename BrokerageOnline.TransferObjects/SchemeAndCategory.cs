using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
     [DataContract]
    public class SchemeAndCategory
    {
         [DataMember]
         public Int64 SchemeId { get; set; }

         [DataMember]
         public string SchemeName { get; set; }

         [DataMember]
         public Int64 SchemeCategoryId { get; set; }

         [DataMember]
         public string SchemeCategoryName { get; set; }
    }
}
