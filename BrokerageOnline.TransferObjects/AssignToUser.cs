using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class AssignToUser
    {
        ///<summary>
        ///ID of Channel 
        ///</summary>
        [DataMember]
        public Int64 UserID { get; set; }

        ///<summary>
        ///Name of channel 
        ///</summary>
        [DataMember]
        public string UserName { get; set; }

        ///<summary>
        ///Name of channel 
        ///</summary>
        [DataMember]
        public string Email { get; set; }
    }
}
