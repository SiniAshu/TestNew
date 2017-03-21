using BrokerageOnline.Presentation.BindingUtilities;
using BrokerageOnline.Presentation.SecurityServiceRef;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using BrokerageOnline.TransferObjects;
namespace BrokerageOnline.Presentation.Pages
{
    public partial class ResetPassword : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                try
                {
                    if (!string.IsNullOrEmpty(Request.QueryString["value"]))
                    {
                        String Value = Request.QueryString["value"].ToString().Replace(' ','+');
                        if (Value != null)
                        {
                            string[] Query = LoginUtilities.decrypt(Value).Split(',');
                            txt_user_name.Text = Query[0];
                        }
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        protected void btn_reset_password_Click(object sender, EventArgs e)
        {
            try
            {
                lbl_error.Text = "";

                string error;
                Credentials credential = new Credentials();
                credential.UserName = txt_user_name.Text;
                credential.Password = FormsAuthentication.HashPasswordForStoringInConfigFile(txt_confirm_new_password.Text, "SHA1");//LoginUtilities.PasswordHash(txt_user_name.Text + txt_confirm_new_password.Text);
                bool returnvalue = LoginUtilities.ResetPassword(credential, out error);
                lbl_error.Text = error;
                if (error == "")
                {
                    string popupScript = "";
                    popupScript = "<script language='javascript'>showsuccessToast('Password has been updated successfully');</script>";
                    Page.ClientScript.RegisterStartupScript(typeof(Page), "popupScript", popupScript);
                    Response.Redirect("~/Login.aspx");
                }

            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}