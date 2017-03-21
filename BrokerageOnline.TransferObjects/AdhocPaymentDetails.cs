using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class AdhocPaymentDetails
    {
        ///<summary>
        ///AdhocBatch ID
        ///</summary>
        [DataMember]
        public int AdhocBatchID { get; set; }

        ///<summary>
        ///Memo Type ID
        ///</summary>
        [DataMember]
        public int MemoTypeID { get; set; }

        /////<summary>
        /////Serial No.
        /////</summary>
        //[DataMember]
        //public Int64 SerialNo { get; set; }

        ///<summary>
        ///Employee Name
        ///</summary>
        [DataMember]
        public string EmployeeName { get; set; }

        ///<summary>
        ///Memo Number   
        ///</summary>
        [DataMember]
        public string MemoNumber { get; set; }

        ///<summary>
        ///Memo Type Name   
        ///</summary>
        [DataMember]
        public string MemoTypeName { get; set; }

        ///<summary>
        ///RaisedOn   
        ///</summary>
        [DataMember]
        public string RaisedOn { get; set; }

        ///<summary>
        ///Sub Region Name   
        ///</summary>
        [DataMember]
        public string SubRegionName { get; set; }

        ///<summary>
        ///Region Name   
        ///</summary>
        [DataMember]
        public string RegionName { get; set; }

        ///<summary>
        ///Zone Name   
        ///</summary>
        [DataMember]
        public string ZoneName { get; set; }

        ///<summary>
        ///IsRejected   
        ///</summary>
        [DataMember]
        public bool IsRejected { get; set; }

        ///<summary>
        ///Channel Name   
        ///</summary>
        [DataMember]
        public string ChannelName { get; set; }

        ///<summary>
        ///Email   
        ///</summary>
        [DataMember]
        public string Email { get; set; }

        ///<summary>
        ///Email   
        ///</summary>
        [DataMember]
        public string SecondaryEmail { get; set; }

        ///<summary>
        ///Remarks   
        ///</summary>
        [DataMember]
        public string Remarks { get; set; }
    }
}
