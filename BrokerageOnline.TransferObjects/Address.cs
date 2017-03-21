using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> User -> Address
    ///</summary>
    [DataContract]
    public class Address : CRUDInfo
    {
        ///<summary>
        ///ID of Address
        ///</summary>
        [DataMember]
        public Int64 AddressId { get; set; }

        ///<summary>
        ///Address Of 
        ///</summary>
        [DataMember]
        public string AddressOf { get; set; }

        ///<summary>
        ///Type of Address
        ///</summary>
        [DataMember]
        public string AddressType { get; set; }

        ///<summary>
        ///Address
        ///</summary>
        [DataMember]
        public string address { get; set; }

        ///<summary>
        ///Street
        ///</summary>
        [DataMember]
        public string Street { get; set; }

        ///<summary>
        ///Area
        ///</summary>
        [DataMember]
        public string Area { get; set; }

        ///<summary>
        ///City
        ///</summary>
        [DataMember]
        public string City { get; set; }

        ///<summary>
        ///State Or province
        ///</summary>
        [DataMember]
        public string StateOrProvince { get; set; }

        ///<summary>
        ///Country
        ///</summary>
        [DataMember]
        public string Country { get; set; }

        ///<summary>
        ///Primary Phone Number
        ///</summary>
        [DataMember]
        public string PrimaryPhone { get; set; }

        ///<summary>
        ///Secondary phone Number
        ///</summary>
        [DataMember]
        public string SecondaryPhone { get; set; }

        ///<summary>
        ///Email ID
        ///</summary>
        [DataMember]
        public string EmailId { get; set; }

    }
}
