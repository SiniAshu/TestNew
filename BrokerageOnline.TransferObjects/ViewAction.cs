using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> PaymentMemo -> View Action
    ///</summary>
    [DataContract]
    public class ViewAction
    {
        ///<summary>
        /// Current Status
        ///</summary>
        [DataMember]
        public string CurrentStatus { get; set; }

        ///<summary>
        /// Created By
        ///</summary>
        [DataMember]
        public Int32 CreatedBy { get; set; }

        ///<summary>
        /// Modified By
        ///</summary>
        [DataMember]
        public Int32 ModifiedBy { get; set; }

        ///<summary>
        /// Created By Role
        ///</summary>
        [DataMember]
        public Int32 CreatedByRole { get; set; }

        ///<summary>
        /// Modified By Role
        ///</summary>
        [DataMember]
        public Int32 ModifiedByRole { get; set; }

        ///<summary>
        /// Current User Role
        ///</summary>
        [DataMember]
        public Int32 CurrentUserRole { get; set; }

        ///<summary>
        /// Last Modified By user
        ///</summary>
        [DataMember]
        public Int32 LastModifiedBy { get; set; }

        ///<summary>
        /// Last Modified Status
        ///</summary>
        [DataMember]
        public string LastModifiedStatus { get; set; }

        ///<summary>
        /// Current User Role
        ///</summary>
        [DataMember]
        public Int32 ApprovalRoleID { get; set; }

        ///<summary>
        /// MemoLevel
        ///</summary>
        [DataMember]
        public string MemoLevel { get; set; }

        ///<summary>
        /// IsSaved
        ///</summary>
        [DataMember]
        public bool IsSaved { get; set; }
    }
}
