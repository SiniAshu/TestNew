using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Email
    ///</summary>
    [DataContract]
    public class Email
    {

        ///<summary>
        ///Id for attatchment
        ///</summary>
        [DataMember]
        public int LogId;
        
        ///<summary>
        ///From Email ID
        ///</summary>
        [DataMember]
        public string Emailfrom { get; set; }

        ///<summary>
        ///To Email ID/s
        ///</summary>
        [DataMember]
        public string To { get; set; }

        ///<summary>
        ///To Email ID/s
        ///</summary>
        [DataMember]
        public string Emailto { get; set; }

        ///<summary>
        ///Subject of mail
        ///</summary>
        [DataMember]
        public string Subject { get; set; }

        ///<summary>
        ///Body of mail
        ///</summary>
        [DataMember]
        public string Body { get; set; }

        ///<summary>
        ///Attachments if any
        ///</summary>
        [DataMember]
        public string attach { get; set; }

        ///<summary>
        ///CC Email ID/s
        ///</summary>
        [DataMember]
        public string CC { get; set; }

        ///<summary>
        ///CC Email ID/s
        ///</summary>
        [DataMember]
        public string EmailCC { get; set; }

        ///<summary>
        ///BCC Email ID/s
        ///</summary>
        [DataMember]
        public string BCC { get; set; }


        ///<summary>
        ///BCC Email ID/s
        ///</summary>
        [DataMember]
        public string EmailBCC { get; set; }

        ///<summary>
        ///Attachments if any
        ///</summary>
        [DataMember]
        public string Action { get; set; }

        ///<summary>
        ///FilePath of Attachments
        ///</summary>
        [DataMember]
        public string FilePath { get; set; }

        ///<summary>
        ///Id for attatchment
        ///</summary>
        [DataMember]
        public int AttatchmentId;

        ///<summary>
        ///Filename of the file
        ///</summary>
        [DataMember]
        public string FileName;

        ///<summary>
        ///Filetype of the file
        ///</summary>
        [DataMember]
        public string FileType;

        ///<summary>
        ///Date when the email sent
        ///</summary>
        [DataMember]
        public string SentDate;

        ///<summary>
        ///Id for attatchment
        ///</summary>
        [DataMember]
        public string SentTime;

        ///<summary>
        ///Id for attatchment
        ///</summary>
        [DataMember]
        public string Status;

    }
}
