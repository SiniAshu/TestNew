using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class UserMaster
    {
        [DataMember]
        public Int64 UserId { get; set; }

        [DataMember]
        public string LoginId { get; set; }

        [DataMember]
        public Int64 EmployeeId { get; set; }
        
        [DataMember]
        public string EmployeeName { get; set; }

        [DataMember]
        public string Role { get; set; }

        [DataMember]
        public string Branch { get; set; }

        [DataMember]
        public string Supervisor { get; set; }

        [DataMember]
        public string Salesposition { get; set; }

        [DataMember]
        public string Phone { get; set; }

        [DataMember]
        public string Mobile { get; set; }

        [DataMember]
        public string Email { get; set; }

        [DataMember]
        public bool IsActive { get; set; }

        [DataMember]
        public string EffectiveDate { get; set; }

        [DataMember]
        public string WorkflowReporting { get; set; }

        [DataMember]
        public string IsChat { get; set; }

    }
}
