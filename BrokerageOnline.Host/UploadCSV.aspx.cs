using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Odbc;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BrokerageOnline.Host
{
    public partial class UploadCSV : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            DataSet ds = new DataSet();
            try
            {
                string strConnection = ConfigurationManager.ConnectionStrings["BrokerageOnline"].ToString();
                string fileName = ConfigurationManager.AppSettings["DistributorMaster"].ToString().Split('/').Last();
                string location = ConfigurationManager.AppSettings["DistributorMaster"].ToString().Replace(fileName,"");
               
                // Creates and opens an ODBC connection
                string strConnString = "Driver={Microsoft Text Driver (*.txt; *.csv)};Dbq=" + location + ";Extensions=asc,csv,tab,txt;Persist Security Info=False";
                string sql_select;
                OdbcConnection conn;
                conn = new OdbcConnection(strConnString.Trim());
                conn.Open();
                //Creates the select command text
                sql_select = "select * from "+ fileName;

                //Creates the data adapter
                OdbcDataAdapter obj_oledb_da = new OdbcDataAdapter(sql_select, conn);
                //Fills dataset with the records from CSV file
                obj_oledb_da.Fill(ds, "csv");

                //closes the connection
                conn.Close();

                DataTable dt = ds.Tables[0];

                SqlBulkCopy sqlBulk = new SqlBulkCopy(strConnection);
                sqlBulk.DestinationTableName = "Distributor_Temp";
                sqlBulk.WriteToServer(dt);
                using (SqlConnection con = new SqlConnection(strConnection))
                {
                    using (SqlCommand sqlcmd = new SqlCommand("DISTRIBUTOR_UploadExcel", con))
                    {
                        sqlcmd.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        sqlcmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex) //Error
            {
                Response.Write(ex.Message.ToString());
            }
        }
    }
}