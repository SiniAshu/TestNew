using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Channel/Zone/Branch -> Branch
    ///</summary>
    [DataContract]
    public class AuditMasters
    {
        ///<summary>
        ///ID of Branch 
        ///</summary>
        [DataMember]
        public Int64 AuditId { get; set; }

        ///<summary>
        ///ID of Branch 
        ///</summary>
        [DataMember]
        public Int64 UserId { get; set; }

        ///<summary>
        ///Name of Branch
        ///</summary>
        [DataMember]
        public string EmployeeName { get; set; }

        ///<summary>
        ///Name of Branch
        ///</summary>
        [DataMember]
        public string EmployeeCode { get; set; }

        ///<summary>
        ///Name of Branch
        ///</summary>
        [DataMember]
        public string LoginId { get; set; }

        ///<summary>
        ///Status of Branch
        ///</summary>
        [DataMember]
        public string Branch { get; set; }

        ///<summary>
        ///ID of Zone 
        ///</summary>
        [DataMember]
        public string IpAddress { get; set; }
        ///<summary>
        ///Modified Date
        ///</summary>
        [DataMember]
        public string ModifiedDate { get; set; }

        ///<summary>
        ///Code of Branch
        ///</summary>
        [DataMember]
        public string ActionType { get; set; }

        ///<summary>
        ///ID of Zone 
        ///</summary>
        [DataMember]
        public string ScreenName { get; set; }

        ///<summary>
        ///Name of Branch
        ///</summary>
        [DataMember]
        public string ReferenceId { get; set; }

        ///<summary>
        ///Status of Branch
        ///</summary>
        [DataMember]
        public string FieldName { get; set; }

        ///<summary>
        ///Code of Branch
        ///</summary>
        [DataMember]
        public string OldValue { get; set; }

        ///<summary>
        ///Name of Branch
        ///</summary>
        [DataMember]
        public string NewValue { get; set; }
    }
}
