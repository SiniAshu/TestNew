using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Masters -> MailingList
    ///</summary>
    [DataContract]
    public class MailingList
    {
        ///<summary>
        ///ID of Mailing List
        ///</summary>
        [DataMember]
        public Int64 MailingListId { get; set; }

        ///<summary>
        ///ListName
        ///</summary>
        [DataMember]
        public string ListName { get; set; }

        ///<summary>
        ///Description
        ///</summary>
        [DataMember]
        public string Description { get; set; }

        ///<summary>
        ///Email
        ///</summary>
        [DataMember]
        public string Email { get; set; }

        ///<summary>
        ///TO
        ///</summary>
        [DataMember]
        public string EmailTo { get; set; }

        ///<summary>
        ///CC
        ///</summary>
        [DataMember]
        public string EmailCC { get; set; }

        ///<summary>
        ///BCC
        ///</summary>
        [DataMember]
        public string EmailBCC { get; set; }

        ///<summary>
        ///IsActive
        ///</summary>
        [DataMember]
        public bool IsActive { get; set; }

        ///<summary>
        ///Modified By
        ///</summary>
        [DataMember]
        public Int64 CreatedBy { get; set; }

        ///<summary>
        ///BCC
        ///</summary>
        [DataMember]
        public string CreatedByName { get; set; }

        ///<summary>
        ///BCC
        ///</summary>
        [DataMember]
        public DateTime CreatedDate { get; set; }

        ///<summary>
        ///Modified By
        ///</summary>
        [DataMember]
        public Int64 ModifiedBy { get; set; }

        ///<summary>
        ///BCC
        ///</summary>
        [DataMember]
        public string ModifiedByName { get; set; }

        ///<summary>
        ///BCC
        ///</summary>
        [DataMember]
        public DateTime ModifiedDate { get; set; }
        ///<summary>
        ///BCC
        ///</summary>
        [DataMember]
        public string EffectiveDate { get; set; }


        ///<summary>
        ///BCC
        ///</summary>
        [DataMember]
        public string Subject { get; set; }

        ///<summary>
        ///BCC
        ///</summary>
        [DataMember]
        public string Body { get; set; }

    }
}
