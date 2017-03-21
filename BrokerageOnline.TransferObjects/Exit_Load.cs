using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.TransferObjects
{
    ///<summary>
    ///Transfer Objects -> Scheme -> Exit_Load
    ///</summary>
    [DataContract]
    public class Exit_Load
    {
        ///<summary>
        ///Exit Load ID
        ///</summary>
        [DataMember]
        public Int64 ExitLoadId { get; set; }

        ///<summary>
        ///ExitLoad
        ///</summary>
        [DataMember]
        public string ExitLoad { get; set; }

        ///<summary>
        ///ExitLoad
        ///</summary>
        [DataMember]
        public string ExitLoadValue { get; set; }

        ///<summary>
        ///Active
        ///</summary>
        [DataMember]
        public Boolean IsActive { get; set; }

        ///<summary>
        ///Scheme Category ID
        ///</summary>
        [DataMember]
        public string SchemeCategoryId { get; set; }

        [DataMember]
        public string SchemeCategory { get; set; }

        ///<summary>
        ///Fund Level
        ///</summary>
        [DataMember]
        public string FundLevel { get; set; }

        ///<summary>
        ///Period Slab
        ///</summary>
        [DataMember]
        public string Scheme { get; set; }

        ///<summary>
        ///Scheme ID
        ///</summary>
        [DataMember]
        public string SchemeId { get; set; }

        ///<summary>
        ///Holding Period
        ///</summary>
        [DataMember]
        public string HoldingPeriod { get; set; }

        ///<summary>
        ///Period Slab
        ///</summary>
        [DataMember]
        public string PeriodSlab { get; set; }

        ///<summary>
        ///Period Slab
        ///</summary>
        [DataMember]
        public string Others { get; set; }

        ///<summary>
        ///Period Slab
        ///</summary>
        [DataMember]
        public string EffectiveDate { get; set; }

    }
}
