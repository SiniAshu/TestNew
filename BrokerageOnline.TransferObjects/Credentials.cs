using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class Credentials
    {
        ///<summary>
        ///User Name
        ///</summary>
        [DataMember]
        public string UserName { get; set; }

        ///<summary>
        ///User Name
        ///</summary>
        [DataMember]
        public string Password { get; set; }
    }
}
