using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BrokerageOnline.TransferObjects;
using BrokerageOnline.Common.Utility;

namespace BrokerageOnline.BusinessLogic
{
    public class EmailLog
    {
        public List<Email> GetEmailLog()
        {
            List<Email> eList = new List<Email>();
            try
            {
                BrokerageOnline.DataAccess.EmailLog dal = new DataAccess.EmailLog();
                eList = dal.GetEmailLog();
            }
            catch (Exception ex)
            {
                throw;
            }
            return eList;
        }

        public string ResentEmail(Email emailDetail)
        {
            string result = string.Empty;
            try
            {
                Utility utility = new Utility();

                if (String.IsNullOrEmpty(emailDetail.FilePath))
                    utility.SendEmail(emailDetail);
                else
                {
                    emailDetail.attach = emailDetail.FileName + emailDetail.FileType;
                    var stream = new System.Net.WebClient().OpenRead(emailDetail.FilePath);
                    utility.SendEmailOnlineattachement(emailDetail, stream);
                }
                result = "Email sent successfully";
            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }
    }
}