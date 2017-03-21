using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;


namespace BrokerageOnline.Common.SessionManagement
{
    [DataContract]
    public class SessionObject
    {
        [DataMember]
        public string Key { get; set; }
        [DataMember]
        public object Value { get; set; }
        public static string sessionValue { get; set; }        
    }
}
