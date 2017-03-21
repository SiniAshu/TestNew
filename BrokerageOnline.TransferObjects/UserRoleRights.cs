using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;


namespace BrokerageOnline.TransferObjects
{
    public class UserRoleRights 
    {
        ///<summary>
        ///ID of User
        ///</summary>
        [DataMember]
        public Int64 UserId { get; set; }

        ///<summary>
        ///RoleID of User
        ///</summary>
        [DataMember]
        public Int64 RoleID { get; set; }

        ///<summary>
        ///First Name
        ///</summary>
        [DataMember]
        public string FirstName { get; set; }

        ///<summary>
        ///Email Id Of user
        ///</summary>
        [DataMember]
        public string Email { get; set; }

        ///<summary>
        ///Role Name Of user
        ///</summary>
        [DataMember]
        public string RoleName { get; set; }

        ///<summary>
        ///Right Name Of user
        ///</summary>
        [DataMember]
        public string RightName { get; set; }

        ///<summary>
        ///Menu Name
        ///</summary>
        [DataMember]
        public string MenuName { get; set; }

        ///<summary>
        ///ParentMenuName
        ///</summary>
        [DataMember]
        public string ParentMenuName { get; set; }

        ///<summary>
        ///NavigateURL
        ///</summary>
        [DataMember]
        public string NavigateURL { get; set; }
        
        ///<summary>
        ///NavigateMenu
        ///</summary>
        [DataMember]
        public string NavigateMenu { get; set; }

        ///<summary>
        ///ID of Menu
        ///</summary>
        [DataMember]
        public Int64 MenuID { get; set; }

        ///<summary>
        ///ID of Menu
        ///</summary>
        [DataMember]
        public Int32 ParentMenuID { get; set; }
    }
}
