using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    [DataContract]
    public class PasswordPolicy
    {
        [DataMember]
        public Int64 PolicyId { get; set; }

        [DataMember]
        public Int64 DisableAttemptCount { get; set; }

        [DataMember]
        public Int64 ExpiryDays { get; set; }
        
        [DataMember]
        public Int64 ExpirePromptDays { get; set; }

        [DataMember]
        public Int64 MinLength { get; set; }

        [DataMember]
        public Int64 MaxCharacters { get; set; }

        [DataMember]
        public Int64 MinCharacters { get; set; }

        [DataMember]
        public Int64 MinDigitCount { get; set; }

        [DataMember]
        public Int64 MinUpperCaseCount { get; set; }

        [DataMember]
        public Int64 MinLowerCaseCount { get; set; }

        [DataMember]
        public Int64 MinSplCharCount { get; set; }

        [DataMember]
        public Int64 HistoryNumber { get; set; }

        [DataMember]
        public Int64 DigitsCount { get; set; }

        [DataMember]
        public Int64 CharsCount { get; set; }

        [DataMember]
        public Int64 PwdUIdSame { get; set; }
    }
}
