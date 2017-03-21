using System;
using System.Runtime.Serialization;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class ListSearchColumns
    { 
        ///<summary>
        ///ID
        ///</summary>
        [DataMember]
        public int ID { get; set; }
         
        ///<summary>
        ///ModuleID
        ///</summary>
        [DataMember]
        public int ModuleID { get; set; }

        ///<summary>
        ///ColumnNames   
        ///</summary>
        [DataMember]
        public string ColumnNames { get; set; }

        ///<summary>
        ///ColumnDescription   
        ///</summary>
        [DataMember]
        public string ColumnDescription { get; set; }

        ///<summary>
        ///StoreProcedure   
        ///</summary>
        [DataMember]
        public string StoreProcedure { get; set; }

        ///<summary>
        ///ColumnType   
        ///</summary>
        [DataMember]
        public string ColumnType { get; set; }

        ///<summary>
        ///IsDeleted
        ///</summary>
        [DataMember]
        public bool IsDeleted { get; set; }
    }
}
