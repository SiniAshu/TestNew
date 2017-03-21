using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> User -> Users
    ///</summary>
    [DataContract]
    public class GetUsers
    {
        ///<summary>
        ///ID of User
        ///</summary>
        [DataMember]
        public Int64 UserId { get; set; }

        ///<summary>
        ///ID of Department
        ///</summary>
        [DataMember]
        public Int64 DepartmentId { get; set; }

        ///<summary>
        ///ID of Branch
        ///</summary>
        [DataMember]
        public Int64 BranchId { get; set; }

        ///<summary>
        ///Name of Branch
        ///</summary>
        [DataMember]
        public string BranchName { get; set; }

        ///<summary>
        ///User Pass
        ///</summary>
        [DataMember]
        public Int64 UserPass { get; set; }

        ///<summary>
        ///ID of Alternate user
        ///</summary>
        [DataMember]
        public Int64 AlternateId { get; set; }

        ///<summary>
        ///Status Of userx
        ///</summary>
        [DataMember]
        public string UserStatus { get; set; }

        ///<summary>
        ///First Name
        ///</summary>
        [DataMember]
        public string FirstName { get; set; }

        ///<summary>
        ///Last Name
        ///</summary>
        [DataMember]
        public string LastName { get; set; }

        ///<summary>
        ///Designation
        ///</summary>
        [DataMember]
        public string Designation { get; set; }

        ///<summary>
        ///Report Manager ID
        ///</summary>
        [DataMember]
        public Int64 ReportingManagerId { get; set; }

        ///<summary>
        ///ReportingManagerName
        ///</summary>
        [DataMember]
        public string ReportingManagerName { get; set; }

        ///<summary>
        ///Expires In
        ///</summary>
        [DataMember]
        public Int64 ExpiresIn { get; set; }

        ///<summary>
        ///Change Password
        ///</summary>
        [DataMember]
        public bool ChangePassword { get; set; }

        ///<summary>
        ///Date Of Join
        ///</summary>
        [DataMember]
        public string DateOfJoin { get; set; }

        ///<summary>
        ///Date Of Leave
        ///</summary>
        [DataMember]
        public string DateOfLeave { get; set; }

        ///<summary>
        ///Last Login Date
        ///</summary>
        [DataMember]
        public DateTime LastLogin { get; set; }

        ///<summary>
        ///Last Password Changed Date
        ///</summary>
        [DataMember]
        public DateTime LastPasswordChanged { get; set; }

        ///<summary>
        ///Number of Invalid Login attempts
        ///</summary>
        [DataMember]
        public Int64 InvalidLoginAttempts { get; set; }

        ///<summary>
        ///Password
        ///</summary>
        [DataMember]
        public string Password { get; set; }

        ///<summary>
        ///Diable Login Flag
        ///</summary>
        [DataMember]
        public bool LoginDisabled { get; set; }

        ///<summary>
        ///Email Id Of user
        ///</summary>
        [DataMember]
        public string Email { get; set; }

        ///<summary>
        ///Employee Code
        ///</summary>
        [DataMember]
        public Int64 EmpCode { get; set; }

        ///<summary>
        ///Login ID
        ///</summary>
        [DataMember]
        public string LoginId { get; set; }


        ///<summary>
        ///User Full Name
        ///</summary>
        [DataMember]
        public string FullName { get; set; }

        ///<summary>
        ///Employee Code
        ///</summary>
        [DataMember]
        public string EmployeeCode { get; set; }

        ///<summary>
        ///Employee Id
        ///</summary>
        [DataMember]
        public Int64 EmployeeId { get; set; }

        ///<summary>
        ///Role ID
        ///</summary>
        [DataMember]
        public Int64 RoleId { get; set; }

        ///<summary>
        ///User Code
        ///</summary>
        [DataMember]
        public string UserCode { get; set; }

        ///<summary>
        ///Reporting User ID
        ///</summary>
        [DataMember]
        public Int64 ReportingUserId { get; set; }

        ///<summary>
        ///Reporting User Name
        ///</summary>
        [DataMember]
        public string ReportingUserName { get; set; }

        ///<summary>
        ///Sales Reporting Manager ID
        ///</summary>
        [DataMember]
        public Int64 SalesReportingManagerId { get; set; }

        ///<summary>
        ///Sales Reporting Manager Name
        ///</summary>
        [DataMember]
        public string SalesReportingManagerName { get; set; }

        ///<summary>
        ///Role Seq No
        ///</summary>
        [DataMember]
        public Int64 RoleSeqNo { get; set; }

        ///<summary>
        ///Role Name
        ///</summary>
        [DataMember]
        public string RoleName { get; set; }

        ///<summary>
        /// Role Description
        ///</summary>
        [DataMember]
        public string RoleDescription { get; set; }

        ///<summary>
        ///Is Active
        ///</summary>
        [DataMember]
        public Int32 isActive { get; set; }

        ///<summary>
        ///Created By UserName
        ///</summary>
        [DataMember]
        public string CreatedByName { get; set; }

        ///<summary>
        ///Created Date
        ///</summary>
        [DataMember]
        public string CreatedDate { get; set; }

        ///<summary>
        ///Modified By UserName
        ///</summary>
        [DataMember]
        public string ModifiedByName { get; set; }

        ///<summary>
        ///Modified Date
        ///</summary>
        [DataMember]
        public string ModifiedDate { get; set; }

        [DataMember]
        public string Phone { get; set; }

        [DataMember]
        public string Mobile { get; set; }

        [DataMember]
        public string Salesposition { get; set; }

        [DataMember]
        public string BRRId { get; set; }

        [DataMember]
        public string TieupId { get; set; }

        [DataMember]
        public string AdhocId { get; set; }

        [DataMember]
        public string SipId { get; set; }

        [DataMember]
        public string OverviewId { get; set; }

        [DataMember]
        public string ReportsId { get; set; }

        [DataMember]
        public string MastersId { get; set; }

        [DataMember]
        public string BRR { get; set; }

        [DataMember]
        public string Tieup { get; set; }

        [DataMember]
        public string Adhoc { get; set; }

        [DataMember]
        public string Sip { get; set; }

        [DataMember]
        public string Overview { get; set; }

        [DataMember]
        public string Reports { get; set; }

        [DataMember]
        public string Masters { get; set; }

        [DataMember]
        public string EffectiveDate { get; set; }

        [DataMember]
        public int Supervisor { get; set; }

    }
}
