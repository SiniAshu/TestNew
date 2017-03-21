using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BrokerageOnline.Presentation.SecurityServiceRef;

namespace BrokerageOnline.Presentation.UserControl
{
    public partial class ForgetPassword : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btn_forget_password_Click(object sender, EventArgs e)
        {
            try
            {
                lbl_error.Text = "";
                string popupScript = "";
                SecurityServiceClient pxy = new SecurityServiceClient();
                string error = "";
                if(pxy.ForgetPassword(txt_user_name.Text, txt_email_id.Text, out error))
                {
                    if (error != "")
                    {
                        popupScript = "<script language='javascript'>showErrorToast('"+ error +"');</script>";
                        Page.ClientScript.RegisterStartupScript(typeof(Page), "popupScript", popupScript);
                    }
                    else
                    {
                        popupScript = "<script language='javascript'>showsuccessToast('Email has been send successfully');</script>";
                        Page.ClientScript.RegisterStartupScript(typeof(Page), "popupScript", popupScript);
                    }
                }
                else
                {
                    if (error != "")
                    {
                        popupScript = "<script language='javascript'>showErrorToast('" + error.Replace("'","") + "');</script>";
                        Page.ClientScript.RegisterStartupScript(typeof(Page), "popupScript", popupScript);
                    }
                    else
                    {
                        popupScript = "<script language='javascript'>showErrorToast('Email Sending Failed');</script>";
                        Page.ClientScript.RegisterStartupScript(typeof(Page), "popupScript", popupScript);
                    }
                }
            }
            catch (Exception)
            {
                
                throw;
            }
        }
    }
}