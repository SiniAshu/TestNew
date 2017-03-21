using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class EmployeeLogs
    { 
        ///<summary>
        ///Employee Log ID
        ///</summary>
        [DataMember]
        public int EmployeeLogID { get; set; }

        ///<summary>
        ///Employee ID
        ///</summary>
        [DataMember]
        public int EmployeeID { get; set; }

        ///<summary>
        ///UserLogin
        ///</summary>
        [DataMember]
        public string UserLogin { get; set; }

        ///<summary>
        ///Employee Name
        ///</summary>
        [DataMember]
        public string EmployeeName { get; set; }

        ///<summary>
        ///IPAddress
        ///</summary>
        [DataMember]
        public string IPAddress { get; set; }

        ///<summary>
        ///LoggedInTime   
        ///</summary>
        [DataMember]
        public DateTime? LoggedInTime { get; set; }

        ///<summary>
        ///LoggedOutTime   
        ///</summary>
        [DataMember]
        public DateTime? LoggedOutTime { get; set; }

        ///<summary>
        ///LastAccessedTime   
        ///</summary>
        [DataMember]
        public DateTime? LastAccessedTime { get; set; }
         
        ///<summary>
        ///MessageLog   
        ///</summary>
        [DataMember]
        public string MessageLog { get; set; }

        ///<summary>
        ///IsDeleted
        ///</summary>
        [DataMember]
        public bool IsDeleted { get; set; }

        ///<summary>
        ///StatusID
        ///</summary>
        [DataMember]
        public int StatusID { get; set; }

        ///<summary>
        ///LoggedOutBy
        ///</summary>
        [DataMember]
        public int LoggedOutBy { get; set; }

        ///<summary>
        ///LoggedOutByUser
        ///</summary>
        [DataMember]
        public string LoggedOutUser { get; set; }

        ///<summary>
        ///BranchID 
        ///</summary>
        [DataMember]
        public int BranchID { get; set; }

        ///<summary>
        ///SubRegionName
        ///</summary>
        [DataMember]
        public string SubRegionName { get; set; }

        ///<summary>
        ///StatusName
        ///</summary>
        [DataMember]
        public string StatusName { get; set; }

        //***********************************************************************************************************************************
        ///<summary>
        ///LoggedInTime _str  
        ///</summary>
        [DataMember]
        public string LoggedInTime_str { get; set; }

        ///<summary>
        ///LoggedOutTime  _str 
        ///</summary>
        [DataMember]
        public string LoggedOutTime_str { get; set; }

        ///<summary>
        ///LastAccessedTime _str  
        ///</summary>
        [DataMember]
        public string LastAccessedTime_str { get; set; }


    }
}
