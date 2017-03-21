using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> User -> Roles
    ///</summary>
    [DataContract]
    public class GetRoles
    {
        ///<summary>
        ///ID of Role Sequence
        ///</summary>
        [DataMember]
        public Int64 RoleSeqNo { get; set; }

        ///<summary>
        ///ID of Role
        ///</summary>
        [DataMember]
        public Int64 RoleId { get; set; }

        ///<summary>
        ///Role Name
        ///</summary>
        [DataMember]
        public string RoleName { get; set; }

        ///<summary>
        ///Is Active
        ///</summary>
        [DataMember]
        public bool isActive { get; set; }

        ///<summary>
        ///Description of Role
        ///</summary>
        [DataMember]
        public string Description { get; set; }

        ///<summary>
        ///Created By Name
        ///</summary>
        [DataMember]
        public string BRR { get; set; }

        ///<summary>
        ///Modified by Name
        ///</summary>
        [DataMember]
        public string BRRId { get; set; }

        ///<summary>
        ///Created By Name
        ///</summary>
        [DataMember]
        public string Tieup { get; set; }

        ///<summary>
        ///Modified by Name
        ///</summary>
        [DataMember]
        public string TieupId { get; set; }


        ///<summary>
        ///Created By Name
        ///</summary>
        [DataMember]
        public string Adhoc { get; set; }

        ///<summary>
        ///Modified by Name
        ///</summary>
        [DataMember]
        public string AdhocId { get; set; }

        ///<summary>
        ///Created By Name
        ///</summary>
        [DataMember]
        public string Sip { get; set; }

        ///<summary>
        ///Modified by Name
        ///</summary>
        [DataMember]
        public string SipId { get; set; }

        ///<summary>
        ///Created By Name
        ///</summary>
        [DataMember]
        public string Overview { get; set; }

        ///<summary>
        ///Modified by Name
        ///</summary>
        [DataMember]
        public string OverviewId { get; set; }

        ///<summary>
        ///Created By Name
        ///</summary>
        [DataMember]
        public string Reports { get; set; }

        ///<summary>
        ///Modified by Name
        ///</summary>
        [DataMember]
        public string ReportsId { get; set; }

        ///<summary>
        ///Created By Name
        ///</summary>
        [DataMember]
        public string Masters { get; set; }

        ///<summary>
        ///Modified by Name
        ///</summary>
        [DataMember]
        public string MastersId { get; set; }

        ///<summary>
        ///Created By Name
        ///</summary>
        [DataMember]
        public string BRRAccess { get; set; }

        ///<summary>
        ///Modified by Name
        ///</summary>
        [DataMember]
        public string TieupAccess { get; set; }

        ///<summary>
        ///Created By Name
        ///</summary>
        [DataMember]
        public string AdhocAccess { get; set; }

        ///<summary>
        ///Modified by Name
        ///</summary>
        [DataMember]
        public string SipAccess { get; set; }

        ///<summary>
        ///Created By Name
        ///</summary>
        [DataMember]
        public string OverviewAccess { get; set; }

        ///<summary>
        ///Modified by Name
        ///</summary>
        [DataMember]
        public string ReportsAccess { get; set; }

        ///<summary>
        ///Modified by Name
        ///</summary>
        [DataMember]
        public string MastersAccess { get; set; }

        ///<summary>
        ///Modified by Name
        ///</summary>
        [DataMember]
        public string EffectiveDate { get; set; }

        ///<summary>
        ///RoleStatus
        ///</summary>
        [DataMember]
        public string RoleStatus { get; set; }
    }
}
