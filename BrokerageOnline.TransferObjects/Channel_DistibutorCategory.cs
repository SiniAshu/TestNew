using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
     [DataContract]
    public class Channel_DistibutorCategory
    {
        ///<summary>
        ///ID of Channel Distributor
        ///</summary>
        [DataMember]
         public Int64 ChannelDistributorId { get; set; }

        ///<summary>
        ///ID of Distributor Category ID
        ///</summary>
        [DataMember]
        public Int64 DistributorCategoryId { get; set; }

        ///<summary>
        ///ID of Channel
        ///</summary>
        [DataMember]
        public Int64 ChannelID { get; set; }

        ///<summary>
        ///Is Active
        ///</summary>
        [DataMember]
        public Boolean IsActive { get; set; }

    }
}
