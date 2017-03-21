using BrokerageOnline.TransferObjects;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace BrokerageOnline.Utilities
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
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

            mail.From = new MailAddress(EmailDetails.Emailfrom);
            mail.To.Add(EmailDetails.Emailto);
            mail.Subject = EmailDetails.Subject;
            mail.Body = EmailDetails.Body;

            mail.IsBodyHtml = true;

            SmtpServer.Port = 587;
            SmtpServer.Host = "smtp.gmail.com";
            SmtpServer.Credentials = new NetworkCredential(ConfigurationManager.AppSettings["NetworkCredentialUserName"].ToString(), ConfigurationManager.AppSettings["NetworkCredentialPassword"].ToString());
            SmtpServer.EnableSsl = true;
            SmtpServer.Send(mail);
        }
    }
}
