using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Abstact Class for CRUD Information Created By, Created Date, Updated By, Updated Date, IsActive
    ///</summary>
    [DataContract]
    public abstract class CRUDInfo
    {
        ///<summary>
        ///Active Flag
        ///</summary>
        [DataMember]
        public bool IsActive { get; set; }

        ///<summary>
        ///Created By User ID
        ///</summary>
        [DataMember]
        public Int64 CreatedBy { get; set; }

        ///<summary>
        ///Created Date
        ///</summary>
        [DataMember]
        public DateTime CreatedDate { get; set; }

        ///<summary>
        ///Modified By User ID
        ///</summary>
        [DataMember]
        public Int64 ModifiedBy { get; set; }

        ///<summary>
        ///Modified Date
        ///</summary>
        [DataMember]
        public DateTime ModifiedDate { get; set; }  
    }
}
