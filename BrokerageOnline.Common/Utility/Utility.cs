using BrokerageOnline.TransferObjects;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;


namespace BrokerageOnline.Common.Utility
{
    public class Utility
    {
        /// <summary>
        /// Method To Send Email
        /// </summary>
        /// <param name="EmailDetails" Type Email></param>
        public void SendEmail(Email EmailDetails)
        {
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(ConfigurationManager.AppSettings["NetworkCredentialUserName"].ToString());
            string[] sendto = EmailDetails.Emailto.Split(',');
            for (int i = 0; i < sendto.Length; i++)
            {
                if (sendto[i] != "")
                     mail.To.Add(sendto[i].ToString());
                   // mail.To.Add("nityaprakash@hexagonglobal.in");
            }
            string[] sendcc = EmailDetails.EmailCC.Split(',');
            for (int i = 0; i < sendcc.Length; i++)
            {
                if (sendcc[i] != "")
                    mail.CC.Add(sendcc[i].ToString());
                    //mail.CC.Add("nityaprakash@hexagonglobal.in");
            }
            string[] sendbcc = EmailDetails.EmailBCC.Split(',');
            for (int i = 0; i < sendbcc.Length; i++)
            {
                if (sendbcc[i] != "")
                    mail.Bcc.Add(sendbcc[i].ToString());
                   // mail.Bcc.Add("nityaprakash@hexagonglobal.in");
            }
            mail.Subject = EmailDetails.Subject;
            mail.Body = EmailDetails.Body;
            if (!String.IsNullOrEmpty(EmailDetails.attach))
            {
                mail.Attachments.Add(new System.Net.Mail.Attachment(EmailDetails.attach));
            }
            mail.IsBodyHtml = true;
            //using (SmtpClient client = new SmtpClient(ConfigurationManager.AppSettings["SmtpClient"].ToString()))
            //{
            //    client.UseDefaultCredentials = true;
            //    //client.Credentials = new System.Net.NetworkCredential("<user name>", "<password>");

            //    client.DeliveryMethod = SmtpDeliveryMethod.Network;
            //    client.Send(mail);
            //}

            SmtpClient SmtpServer = new SmtpClient(ConfigurationManager.AppSettings["SmtpClient"].ToString());
            SmtpServer.Port = Convert.ToInt32(ConfigurationManager.AppSettings["SmtpPort"]);
            SmtpServer.Host = ConfigurationManager.AppSettings["SmtpClient"].ToString();
            SmtpServer.Credentials = new NetworkCredential(ConfigurationManager.AppSettings["NetworkCredentialUserName"].ToString(), ConfigurationManager.AppSettings["NetworkCredentialPassword"].ToString());
            SmtpServer.EnableSsl = true;
            SmtpServer.Send(mail);
            EmailLog(EmailDetails);
        }

        public void SendEmailOnlineattachement(Email EmailDetails, Stream attach)
        {
            MailMessage mail = new MailMessage();
            //SmtpClient SmtpServer = new SmtpClient(ConfigurationManager.AppSettings["SmtpClient"].ToString());
            mail.From = new MailAddress(ConfigurationManager.AppSettings["NetworkCredentialUserName"].ToString());
            string[] sendto = EmailDetails.Emailto.Split(',');
            for (int i = 0; i < sendto.Length; i++)
            {
                if (sendto[i] != "")
                    mail.To.Add(sendto[i].ToString());
                    //mail.To.Add("nityaprakash@hexagonglobal.in");
            }
            string[] sendcc = EmailDetails.EmailCC.Split(',');
            for (int i = 0; i < sendcc.Length; i++)
            {
                if (sendcc[i] != "")
                    mail.CC.Add(sendcc[i].ToString());
                   // mail.CC.Add("nityaprakash@hexagonglobal.in");
            }
            string[] sendbcc = EmailDetails.EmailBCC.Split(',');
            for (int i = 0; i < sendbcc.Length; i++)
            {
                if (sendbcc[i] != "")
                    mail.Bcc.Add(sendbcc[i].ToString());
                   // mail.Bcc.Add("nityaprakash@hexagonglobal.in");
            }
            mail.Subject = EmailDetails.Subject;
            mail.Body = EmailDetails.Body;
            if (EmailDetails.attach != "")
            {
                mail.Attachments.Add(new System.Net.Mail.Attachment(attach, EmailDetails.attach));
            }
            mail.IsBodyHtml = true;
            //using (SmtpClient client = new SmtpClient(ConfigurationManager.AppSettings["SmtpClient"].ToString()))
            //{
            //    try
            //    {
            //        client.UseDefaultCredentials = true;
            //        //client.Credentials = new System.Net.NetworkCredential("<user name>", "<password>");

            //        client.DeliveryMethod = SmtpDeliveryMethod.Network;
            //        client.Send(mail);
            //        EmailDetails.Status = "Success";
            //    }
            //    catch (Exception ex)
            //    {
            //        EmailDetails.Status = ex.Message;
            //    }
            //}
            try
            {
                SmtpClient SmtpServer = new SmtpClient(ConfigurationManager.AppSettings["SmtpClient"].ToString());
                SmtpServer.Port = Convert.ToInt32(ConfigurationManager.AppSettings["SmtpPort"]);
                SmtpServer.Host = ConfigurationManager.AppSettings["SmtpClient"].ToString();
                SmtpServer.Credentials = new NetworkCredential(ConfigurationManager.AppSettings["NetworkCredentialUserName"].ToString(), ConfigurationManager.AppSettings["NetworkCredentialPassword"].ToString());
                //SmtpServer.UseDefaultCredentials = true;
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);
                EmailDetails.Status = "Success";
            }
            catch (Exception ex)
            {
                EmailDetails.Status = ex.Message;
            }
          
            int x = EmailDetails.attach.LastIndexOf('.');
            string lhs = x < 0 ? EmailDetails.attach : EmailDetails.attach.Substring(0, x),
            rhs = x < 0 ? "" : EmailDetails.attach.Substring(x);
            EmailDetails.FileName = lhs;
            EmailDetails.FileType = rhs;
            EmailLog(EmailDetails);

            //SmtpClient SmtpServer = new SmtpClient(ConfigurationManager.AppSettings["SmtpClient"].ToString());
            //SmtpServer.Port = Convert.ToInt32(ConfigurationManager.AppSettings["SmtpPort"]);
            //SmtpServer.Host = ConfigurationManager.AppSettings["SmtpClient"].ToString();
            //SmtpServer.Credentials = new NetworkCredential(ConfigurationManager.AppSettings["NetworkCredentialUserName"].ToString(), ConfigurationManager.AppSettings["NetworkCredentialPassword"].ToString());
            ////SmtpServer.UseDefaultCredentials = true;
            //SmtpServer.EnableSsl = true;
            //SmtpServer.Send(mail);
        }

        /// <summary>
        /// SendNotificationEmail
        /// </summary>
        /// <param name="MemoId"></param>
        /// <param name="Status"></param>
        /// <returns>True/False</returns>
        public bool SendNotificationEmail(string MemoId, string Status, string Distributors, Int64 UserID)  //method not in use
        {
            bool retval = true;
            string content = "";

            Email em = new Email();
            em.Emailto = "benhan@hexagonglobal.in";
            em.EmailCC = "";
            em.EmailBCC = "";
            em.Body = content;
            em.Subject = "test";
            em.attach = "";
            em.Emailfrom = "kathirvel@hexagonglobal.in";
            SendEmail(em);

            switch (Status)
            {
                case "Rejected":
                    //string content = "Dear Madam/Sir, <br><br> The memo No. ##MemoNo## for distributor/category(s) ARN-10670 and Gold Upfront has been rejected by Monil Maniar. <br>";
                    //content += "You can check the status of memo under Smart Search. <br>";
                    //content += "Click on the link given below to Login to the system <br>";
                    //content += "https://192.168.1.1/dspbosapp/login.apsx";
                    //content += " <br> This is a system generated e-mail and please do not reply. Add donotreply@dspblackrockobs.com to your white list / safe sender list. Else, your mailbox filter or ISP (Internet Service Provider) may stop you from receiving e-mails. ";
                    //content += " <br> Should you need any further assistance, contact us at obs@bspblackrock.com";
                    //content += "<br> Regards, ";
                    //content += "<br> OBS Team, ";
                    //content += "<br> DSP Black Rock";
                    break;
                case "Discarded":

                    break;
                //default:

                //    break;
            }
            return retval;
        }

        public void DownloadFileFromURL(string URL,string TargetFolderAndFileName)
        {
            //HttpWebRequest wr = (HttpWebRequest)WebRequest.Create(URL);
            //HttpWebResponse ws = (HttpWebResponse)wr.GetResponse();
            //Stream str = ws.GetResponseStream();
            //byte[] inBuf = new byte[100000];
            //int bytesToRead = (int)inBuf.Length;
            //int bytesRead = 0;
            //while (bytesToRead > 0)
            //{
            //    int n = str.Read(inBuf, bytesRead, bytesToRead);
            //    if (n == 0)
            //        break;
            //    bytesRead += n;
            //    bytesToRead -= n;
            //}
            //FileStream fstr = new FileStream(TargetFolderAndFileName, FileMode.OpenOrCreate, FileAccess.Write);
            //fstr.Write(inBuf, 0, bytesRead);
            //str.Close();
            //fstr.Close();
            using (WebClient Client = new WebClient())
            {
                Client.DownloadFile(URL, TargetFolderAndFileName);
            }
        }

        #region Compare Collection

        public bool CompareList<T>(List<T> lstCompareFrom, List<T> lstCompareTo)
        {
            if (lstCompareFrom == null && lstCompareTo == null)
                return true;
            else if (lstCompareFrom == null || lstCompareTo == null)
                return false;
            else if (lstCompareFrom.Count != lstCompareTo.Count)
                return false;
            for (int i = 0; i < lstCompareFrom.Count; i++)
            {
                if (!CompareBO(lstCompareFrom[i], lstCompareTo[i]))
                    return false;
            }
            return true;
        }

        public static bool CompareBO<T>(T BOCompareFrom, T BOCompareTo)
        {
            bool Equal = true;
            if (BOCompareFrom == null && BOCompareTo == null)
                Equal = true;
            else if (BOCompareFrom == null || BOCompareTo == null)
                return false;
            else if (BOCompareFrom.GetType().GetProperty("Count") != null && Convert.ToInt64(BOCompareFrom.GetType().GetProperty("Count").GetValue(BOCompareFrom, null)) > 0)
            {
                if (BOCompareFrom.Equals(BOCompareTo))
                    Equal = true;
                else
                    return false;
            }
            else
            {
                foreach (System.Reflection.PropertyInfo prop in BOCompareFrom.GetType().GetProperties())
                {
                    if (CheckClassObject(prop.PropertyType.UnderlyingSystemType.ToString()))
                    {
                        if (!CompareBO((BOCompareFrom).GetType().GetProperty(prop.Name).GetValue((BOCompareFrom), null), (BOCompareTo).GetType().GetProperty(prop.Name).GetValue((BOCompareTo), null)))
                            return false;
                    }
                    else
                    {
                        if ((BOCompareFrom).GetType().GetProperty(prop.Name).GetValue(BOCompareFrom, null) == null && (BOCompareTo).GetType().GetProperty(prop.Name).GetValue(BOCompareTo, null) == null)
                            Equal = true;
                        else if ((BOCompareFrom).GetType().GetProperty(prop.Name).GetValue(BOCompareFrom, null) == null || (BOCompareTo).GetType().GetProperty(prop.Name).GetValue(BOCompareTo, null) == null)
                            return false;
                        else if (!((BOCompareFrom).GetType().GetProperty(prop.Name).GetValue(BOCompareFrom, null)).Equals(((BOCompareTo).GetType().GetProperty(prop.Name).GetValue(BOCompareTo, null))))
                            return false;
                    }
                }
            }
            return Equal;
        }

        static bool CheckClassObject(string Type)
        {
            switch (Type)
            {
                case "System.String":
                    return false;
                case "System.Int16":
                    return false;
                case "System.Int32":
                    return false;
                case "System.Int64":
                    return false;
                case "System.Decimal":
                    return false;
                case "System.Boolean":
                    return false;
                case "System.Char":
                    return false;
                case "System.Byte":
                    return false;
                case "System.DateTime":
                    return false;
                case "System.Double":
                    return false;

                case "System.Nullable`1[System.String]":
                    return false;
                case "System.Nullable`1[System.Int16]":
                    return false;
                case "System.Nullable`1[System.Int32]":
                    return false;
                case "System.Nullable`1[System.Int64]":
                    return false;
                case "System.Nullable`1[System.Decimal]":
                    return false;
                case "System.Nullable`1[System.Boolean]":
                    return false;
                case "System.Nullable`1[System.Char]":
                    return false;
                case "System.Nullable`1[System.Byte]":
                    return false;
                case "System.Nullable`1[System.DateTime]":
                    return false;
                case "System.Nullable`1[System.Double]":
                    return false;
            }
            return true;
        }

        #endregion

        private string EmailLog(Email emailDetails)
        {
            string result = string.Empty;
            try
            {
                BrokerageOnline.DataAccess.EmailLog elog = new DataAccess.EmailLog();
                elog.EmailLogging(emailDetails);
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return result;
        }
    }
}
