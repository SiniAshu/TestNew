using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class SubMenu
    {
        [DataMember]
        public Int64 SubMenuId { get; set; }

        [DataMember]
        public string SubMenuName { get; set; }

        [DataMember]
        public Int64 IsActive { get; set; }

        [DataMember]
        public Int64 AccessMenuId { get; set; }
    }
}
