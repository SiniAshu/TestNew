<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ForgetPassword.ascx.cs" EnableTheming="true" Inherits="BrokerageOnline.Presentation.UserControl.ForgetPassword" %>
<table>
    <tr>
        <td >
            <asp:Label ID="lbl_error" runat ="server" ForeColor="Red"></asp:Label>
        </td>
    </tr>
    <tr>
        <td>
            <asp:Label ID="Label1" CssClass="label_text" runat="server" Text="UserName" ForeColor="Black"></asp:Label>
             <asp:Label ID="Label5" runat="server" Text="*" ForeColor="Red" />
        </td>
       
    </tr>
    <tr>
         <td>
             <asp:TextBox ID="txt_user_name" runat="server"></asp:TextBox><br />
             <%--<asp:RegularExpressionValidator   ID="RegularExpressionValidator1"  runat="server" ValidationGroup="forgetpassword" CssClass="field-validation-error" Display="Dynamic" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"  ControlToValidate="txt_user_name"  ErrorMessage="Enter valid email address!"  >  </asp:RegularExpressionValidator>--%>  
             <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ValidationGroup="forgetpassword" ControlToValidate="txt_user_name" CssClass="field-validation-error" ErrorMessage="The user name field is required." />
        </td>
    </tr>
    <tr>
        <td>
            <asp:Label ID="Label2" CssClass="label_text" runat="server" Text="Email ID" ForeColor="Black"></asp:Label>
             <asp:Label ID="Label6" runat="server" Text="*" ForeColor="Red" />
        </td>
       
    </tr>
    <tr>
         <td>
             <asp:TextBox ID="txt_email_id" runat="server"></asp:TextBox><br />
             <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ValidationGroup="forgetpassword" ControlToValidate="txt_email_id" Display="Dynamic" CssClass="field-validation-error" ErrorMessage="Email ID is required." />
              <asp:RegularExpressionValidator   ID="Regularalidator2" ValidationGroup="forgetpassword" runat="server"  CssClass="field-validation-error" Display="Dynamic" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"  ControlToValidate="txt_email_id"  ErrorMessage="Enter valid email address!"  >  </asp:RegularExpressionValidator>  
        </td>
    </tr>
   <%-- <tr>
        <td>
            <asp:Label ID="Label3"  runat="server" Text="Date Of Birth"></asp:Label>
        </td>
        <td>
             <asp:TextBox ID="txt_dob" runat="server"></asp:TextBox>
        </td>
    </tr>
    <tr>
         <td>
            <asp:Label ID="Label4" runat="server" Text="PAN Number"></asp:Label>
        </td>
        <td>
             <asp:TextBox ID="txt_pan_number" runat="server"></asp:TextBox>
        </td>
    </tr>--%>
   
</table>
  <div class="modal-footer">
        <asp:Button CssClass="btn btn-primary" runat="server" Text="Reset Password" style="background-color:#3071a9" ValidationGroup="forgetpassword" ID="btn_forget_password" OnClick="btn_forget_password_Click"></asp:Button>
                  </div>
<%--<script type="text/javascript">
    $(function () {
        $("#<%= txt_dob.ClientID  %>").datepicker({ dateFormat: 'mm-dd-yyyy' }).on('changeDate', function (ev) {

            $('#<%= txt_dob.ClientID  %>').datepicker('hide');
        });
    });
</script>--%>