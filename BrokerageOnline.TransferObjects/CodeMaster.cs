using System.Runtime.Serialization;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> CodeMaster
    ///</summary>
    [DataContract]
    public partial class CodeMaster
    {
        ///<summary>
        ///ID of Code 
        ///</summary>
        [DataMember]
        public int CodeID { get; set; }

        ///<summary>
        ///Name of Code 
        ///</summary>
        [DataMember]
        public string CodeName { get; set; }

        ///<summary>
        ///Code Description 
        ///</summary>
        [DataMember]
        public string CodeDescription { get; set; }
    }
}
