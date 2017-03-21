using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> User -> Department
    ///</summary>
    [DataContract]
    public class Department : CRUDInfo
    {
        ///<summary>
        ///ID of Department
        ///</summary>
        [DataMember]
        public Int64 DepartmentId { get; set; }

        ///<summary>
        ///Department Code
        ///</summary>
        [DataMember]
        public Int64 DepartmentCode { get; set; }

        ///<summary>
        ///Department Name
        ///</summary>
        [DataMember]
        public string DepartmentName { get; set; }


    }
}
