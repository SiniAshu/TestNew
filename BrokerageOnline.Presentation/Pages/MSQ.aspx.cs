using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
//using BrokerageOnline.TransferObjects;
using BrokerageOnline.BusinessLogic;
using System.ServiceModel.Activation;
using System.Data.Common;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using BrokerageOnline.DataAccess;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.Script.Services;
using System.Reflection;


namespace BrokerageOnline.Presentation.Pages
{

    public partial class MSQ : System.Web.UI.Page
    {
        List<RackRateSearchResult> returnData = new List<RackRateSearchResult>();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
            }
        }

        [WebMethod]
        public static List<RackRateSearchResult> GetCreateBaseRackRate(string ArnNo, string Channel, string ARNName, string DistributorCategory, string Status, string MasterQueueStatus, string SearchFilter, string MemoLevel, string UserID)
        {
            try
            {
                // var watch = System.Diagnostics.Stopwatch.StartNew();
                List<RackRateSearchResult> returnData = new List<RackRateSearchResult>();
                string str = ConfigurationManager.ConnectionStrings["MSQConString"].ToString();
                //string str = "Data Source=182.75.9.197;Initial Catalog=BrokerageOnlineHex;User Id=ben;Password=ben";
                SqlConnection connection = new SqlConnection(str);
                using (SqlCommand cmd = new SqlCommand("exec [GET_CREATE_BASE_RACK_RATE] '" + ArnNo + "','" + Channel + "','" + DistributorCategory + "','" + ARNName + "','" + Status + "','" + MasterQueueStatus + "','" + UserID + "','" + MemoLevel + "'", connection))
                //using (SqlCommand cmd = new SqlCommand("exec [Master_Queue_Test_Abdul] '" + UserID + "'", connection))
                {
                    cmd.CommandType = CommandType.Text;
                    connection.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    if (dr.HasRows)
                    {
                        returnData = Conversion.ConvertDataReaderToList<RackRateSearchResult>(dr);
                    }

                    //#region dr.read
                    //while (dr.Read())
                    //{
                    //    //cnt = (int)dr["PaymentMemoId"];
                    //    returnData = Conversion.ConvertDataReaderToList<RackRateSearchResult>(dr);
                    //    // returnData = DataReaderMapToList<RackRateSearchResult>(dr);
                    //}
                    //#endregion
                    connection.Close();

                }
                //watch.Stop();
                // var elapsedMs = watch.ElapsedMilliseconds;
                return returnData;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public class RackRateSearchResult
        {
            public Int64 PaymentMemoId { get; set; }
            public string MemoNumber { get; set; }
            public Int64 MemoTypeID { get; set; }
            public string MemoTypeName { get; set; }
            public string DistributorCategoryId { get; set; }
            public string DistributorCategoryName { get; set; }
            public string ARNNo { get; set; }
            public string ARNName { get; set; }
            public string DateFrom { get; set; }
            public string DateTo { get; set; }
            public string MemoStatus { get; set; }
            public string MemoStatusDisplay { get; set; }
            public string CreatedByName { get; set; }
            public string RaisedOnDate { get; set; }
            public string RaisedOnTime { get; set; }
            public Int64 Ageing { get; set; }
            public string ModifiedByName { get; set; }
            public string PendingWith { get; set; }
            public bool IsCloseEnded { get; set; }
            public string MemoLevel { get; set; }
            public int isParentId { get; set; }
        }



    }
}