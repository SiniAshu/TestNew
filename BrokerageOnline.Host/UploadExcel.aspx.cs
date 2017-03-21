using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BrokerageOnline.Host
{
    public partial class UploadExcel : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            DataTable dtfinal = new DataTable();
            DataTable dt = new DataTable();
            DataTable dtupl = new DataTable();
            try
            {
                //string strConnection = Convert.ToString(ConfigurationManager.ConnectionStrings["BrokerageOnline"]);
                string strConnection = ConfigurationManager.ConnectionStrings["BrokerageOnline"].ToString();

                string DistributorExcelPath = ConfigurationManager.AppSettings["DistributorMaster"].ToString();
                //   string excelConnectionString = @"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + path + ";Extended Properties=Excel 12.0;Persist Security Info=False";
                if (File.Exists(DistributorExcelPath))
                {
                    string query = "Select top 10 * from [Sheet2$]";
                    query = @"Select SL_NO AS DistributorId,BROK_DLR_CODE AS ARN_NO,[Merg_CODE],BROK_DLR_NAME AS DistributorName,BROK_DLR_CATG AS DistributorCategoryId,Branch AS SubRegionId,ADDRESS1 AS Address,ADDRESS2 AS Street,
                            ADDRESS3 AS Area,CITY AS City,PINCODE AS Pin,PHONE_OFF AS PrimaryPhone,PHONE_RES AS SecondaryPhone,EMAIL AS EmailId,MOBILE_NO AS MobileNo,ARN_EXPIRY_DATE AS ARNExpiryDate,TAX_NO AS TaxNo,[Gender],
                            CONS_CODE AS ConsCode,DATE_OF_BIRTH AS DateOfBirth,GENERATE_DATE AS GenerateDate,KYD_RECEIVED AS KYDReceived,PAYEE_BANK_NAME AS PayeeBankName,PAYEE_BANK_BRANCH AS PayeeBankBranch,PAYEE_AC_TYPE AS PayeeAcType,
                            PAYEE_AC_NO AS PayeeAccountNumber,PAYEE_SWIFT_CODE AS PayeeSwiftCode,IFSC_CODE AS IFCSCode,PAYEE_PAYOUT_MECHANISM AS PayeePayoutMechanism,PAYEE_BANK_ADROF1 AS PayeeBankAddress,PAYEE_BANK_ADROF2 AS PayeeBankStreet,
                            PAYEE_BANK_ADROF3 AS PayeeBankArea,PAYEE_CITY_NAME AS PayeeCityName,PAYEE_PINCODE AS PayeePinCode,HYBRID_AUM AS HybridAUM,EQUITY_AUM AS EquityAUM,DEBT_AUM AS Debt,FOF_AUM AS FOF,Tot_AUM AS TotalAUM,
                            [BDNA-Hold] AS BDNAHold,'1' AS CreatedBy,NOW() AS CreatedOn,'1' AS ModifiedBy,NOW() AS ModifiedOn,BROK_DLR_CODE AS DistributorParentId from [Sheet2$]"; //
                    //"Select '1' AS DepartmentId,'1' AS BranchId,'1' AS UserPass,'1' AS AlternateId,[UserStatus],[EMPFNAME],[EMPLNAME],[Designation],'1' AS ReportingManagerId,'' AS CreatedBy,NOW() AS CreatedDate,'' AS ModifiedBy,NOW() AS ModifiedDate,'' AS ExpiresIn,[IsActive],[ChangePassword],[DateOfJoin],[DateOfLeave],[LastLogin],[LastPasswordChanged],[InvalidLoginAttempts],[LoginDisabled],[Email],[Password],[EmpCode],[LoginId],[EmpFullName],EmpCode AS EmployeeCode,[EmployeeId],'' AS RoleId,[UserCode],'' AS ReportingUserId,'' AS SalesReportingManagerId,'' AS RoleSeqNo from [Sheet1$]"
                    string excelConnectionString = "";
                    OleDbConnection excelConnection = new OleDbConnection();
                    OleDbCommand cmd = new OleDbCommand();

                    if (DistributorExcelPath.EndsWith(".xls"))
                    {
                        excelConnectionString = @"Provider=Microsoft.ACE.OLEDB.12.0;data source=" + DistributorExcelPath + ";Extended Properties=Excel 12.0;";
                        //excelConnectionString = @"provider=microsoft.jet.oledb.4.0;data source=" + DistributorExcelPath + ";extended properties=" + "\"excel 8.0;hdr=yes;\"";
                        excelConnection = new OleDbConnection(excelConnectionString);
                        cmd = new OleDbCommand(query, excelConnection);
                        excelConnection.Open();
                    }
                    else
                    {
                        //excelConnectionString = @"Provider=Microsoft.ACE.OLEDB.12.0;" + "Data Source=" + DistributorExcelPath + "Extended Properties=Excel 12.0 Xml;HDR=yes";
                        excelConnectionString = String.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 8.0;HDR=YES\"", DistributorExcelPath);
                        excelConnection = new OleDbConnection(excelConnectionString);
                        cmd = new OleDbCommand(query, excelConnection);
                        excelConnection.Open();
                    }
                    OleDbDataAdapter da = new OleDbDataAdapter(cmd);
                    da.Fill(dt);
                    SqlBulkCopy sqlBulk = new SqlBulkCopy(strConnection);
                    sqlBulk.DestinationTableName = "Distributor_Temp";
                    sqlBulk.BulkCopyTimeout = 0;
                    sqlBulk.WriteToServer(dt);
                    excelConnection.Close();
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
                else
                {
                    Response.Write("Distributor File Not Found In The Particular Path.");
                }

                string GrossExcelPath = ConfigurationManager.AppSettings["GrossMaster"].ToString();
                if (File.Exists(GrossExcelPath))
                {
                    string query = "Select top 10 * from [Sheet1$]";
                    query = "Select MONTHID,MERGED_DIST,MERGED_DIST_NAME,CRM_SCHEME_NAME,GROSS_SALES, NOW() AS PeriodMonth, 0 AS SchemeID, '' AS Period from [Sheet1$]"; //

                    string excelConnectionString = "";
                    OleDbConnection excelConnection = new OleDbConnection();
                    OleDbCommand cmd = new OleDbCommand();

                    if (GrossExcelPath.EndsWith(".xls"))
                    {
                        excelConnectionString = @"provider=microsoft.jet.oledb.4.0;data source=" + GrossExcelPath + ";extended properties=" + "\"excel 8.0;hdr=yes;\"";
                        excelConnection = new OleDbConnection(excelConnectionString);
                        cmd = new OleDbCommand(query, excelConnection);
                        excelConnection.Open();
                    }
                    else
                    {
                        excelConnectionString = @"Provider=Microsoft.ACE.OLEDB.12.0;" + "Data Source=" + GrossExcelPath + "Extended Properties=Excel 12.0 Xml;HDR=YES;";
                        excelConnection = new OleDbConnection(excelConnectionString);
                        cmd = new OleDbCommand(query, excelConnection);
                        excelConnection.Open();
                    }
                    dt = new DataTable();
                    OleDbDataAdapter da = new OleDbDataAdapter(cmd);
                    da.Fill(dt);
                    SqlBulkCopy sqlBulk = new SqlBulkCopy(strConnection);
                    sqlBulk.DestinationTableName = "DistributorGross_temp";
                    sqlBulk.WriteToServer(dt);
                    excelConnection.Close();
                    using (SqlConnection con = new SqlConnection(strConnection))
                    {
                        using (SqlCommand sqlcmd = new SqlCommand("DistributorGross_UploadExcel", con))
                        {
                            sqlcmd.CommandType = CommandType.StoredProcedure;
                            con.Open();
                            sqlcmd.ExecuteNonQuery();
                        }
                    }
                }
                else
                {
                    Response.Write("Distributor Gross File Not Found In The Particular Path.");
                }


                string AUMExcelPath = ConfigurationManager.AppSettings["AUMMaster"].ToString();
                //   string excelConnectionString = @"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + path + ";Extended Properties=Excel 12.0;Persist Security Info=False";
                if (File.Exists(AUMExcelPath))
                {
                    string query = "Select top 10 * from [Sheet1$]";
                    query = "Select ARNNo,DistributorName,SchemeName,Schemecode,location,AUM, Month,0 as TempSchemeID, '' as GrossSales from [Sheet1$]"; //
                    //"Select '1' AS DepartmentId,'1' AS BranchId,'1' AS UserPass,'1' AS AlternateId,[UserStatus],[EMPFNAME],[EMPLNAME],[Designation],'1' AS ReportingManagerId,'' AS CreatedBy,NOW() AS CreatedDate,'' AS ModifiedBy,NOW() AS ModifiedDate,'' AS ExpiresIn,[IsActive],[ChangePassword],[DateOfJoin],[DateOfLeave],[LastLogin],[LastPasswordChanged],[InvalidLoginAttempts],[LoginDisabled],[Email],[Password],[EmpCode],[LoginId],[EmpFullName],EmpCode AS EmployeeCode,[EmployeeId],'' AS RoleId,[UserCode],'' AS ReportingUserId,'' AS SalesReportingManagerId,'' AS RoleSeqNo from [Sheet1$]"
                    string excelConnectionString = "";
                    OleDbConnection excelConnection = new OleDbConnection();
                    OleDbCommand cmd = new OleDbCommand();


                    if (AUMExcelPath.EndsWith(".xls"))
                    {
                       
                        excelConnectionString = @"provider=microsoft.jet.oledb.4.0;data source=" + AUMExcelPath + ";extended properties=" + "\"excel 8.0;hdr=yes;\"";
                        //"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + path + ";Extended Properties=Excel 12.0;";
                        excelConnection = new OleDbConnection(excelConnectionString);
                        cmd = new OleDbCommand(query, excelConnection);
                        excelConnection.Open();
                    }
                    else
                    {
                        excelConnectionString = @"Provider=Microsoft.ACE.OLEDB.12.0;" + "Data Source=" + AUMExcelPath + "Extended Properties=Excel 12.0 Xml;HDR=NO;";
                        excelConnection = new OleDbConnection(excelConnectionString);
                        cmd = new OleDbCommand(query, excelConnection);
                        excelConnection.Open();
                    }

                        
                    dt = new DataTable();
                    OleDbDataAdapter da = new OleDbDataAdapter(cmd);
                    da.Fill(dt);
                    SqlBulkCopy sqlBulk = new SqlBulkCopy(strConnection);
                    sqlBulk.DestinationTableName = "DistributorAUM_temp";
                    sqlBulk.BulkCopyTimeout = 0;
                    sqlBulk.WriteToServer(dt);
                    excelConnection.Close();
                    using (SqlConnection con = new SqlConnection(strConnection))
                    {
                        using (SqlCommand sqlcmd = new SqlCommand("DistributorAUM_UploadExcel", con))
                        {
                            sqlcmd.CommandType = CommandType.StoredProcedure;
                            con.Open();
                            sqlcmd.ExecuteNonQuery();
                        }
                    }
                }
                else
                {
                    Response.Write("Distributor AUM File Not Found In The Particular Path.");
                }

            }
            catch (Exception ex)
            {
                Response.Write(ex.Message.ToString());
            }
            finally
            {
                dtfinal = null;
                dt = null;
                dtupl = null;
            }
        }
    }
}