<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ResetPassword.aspx.cs" Inherits="BrokerageOnline.Presentation.Pages.ResetPassword" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Brokerage Online Solution</title>
  <script src="../Scripts/jquery-1.11.1.js"></script>
    <link href="../css/bootstrap.css" rel="stylesheet" />
    <link href="../css/bootstrap-responsive.css" rel="stylesheet" />
    <script src="../js/bootstrap.js"></script>
    <link href="../css/toastr.css" rel="stylesheet" />
    <script src="../js/toastr.js"></script>
    <script src="../js/Utility.js"></script>
    <link href="../css/font-awesome.css" rel="stylesheet" />
    <link href="../css/token-input-facebook.css" rel="stylesheet" />
    <link href="../css/token-input.css" rel="stylesheet" />
    <script src="../js/jquery.tokeninput.js"></script> 
    <script src="../js/bootstrap-multiselect.js"></script>
    <script src="../js/bootstrap-datepicker.js"></script>
    <link href="../css/datepicker.css" rel="stylesheet" />
    <link href="../css/login.css" rel="stylesheet" />
      <script type="text/javascript">
          function showsuccessToast(val) {
              Utility.writeNotification("success", val);
          }
          function showErrorToast(val) {
              Utility.writeNotification("error", val);
          }
        </script>
</head>
<body>
    <form id="form1" runat="server">
    <div style="width:400px">
        <div class="modal-header">
                <h1 class="modal-title" id="myModalLabel">Reset Password</h1>
            </div>
        <asp:Label ID="lbl_error" runat ="server" ForeColor="Red"></asp:Label>
    <table style="margin-left:50px;">
    <tr>
        <td>
            <asp:Label ID="Label1"  CssClass="label_text" ForeColor="Black" runat="server" Text="UserName"></asp:Label>
             <asp:Label ID="Label5" runat="server" Text="*" ForeColor="Red" />
        </td>
       
    </tr>
    <tr>
         <td>
             <asp:TextBox ID="txt_user_name" runat="server"></asp:TextBox><br />
             <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txt_user_name" CssClass="field-validation-error" Display="Dynamic" ErrorMessage="The user name field is required." />
        </td>
    </tr>
   <tr>
        <td>
            <asp:Label ID="Label3" CssClass="label_text" ForeColor="Black" runat="server" Text="New Password"></asp:Label>
             <asp:Label ID="Label4" runat="server" Text="*" ForeColor="Red" />
        </td>
       
    </tr>
    <tr>
         <td>
             <asp:TextBox ID="txt_new_password" runat="server" TextMode ="Password"></asp:TextBox><br />
             <asp:RequiredFieldValidator ID="RequiredFieldValidatornew" runat="server" ControlToValidate="txt_new_password" CssClass="field-validation-error" Display="Dynamic" ErrorMessage="New password is required." />
        </td>
    </tr>
   <tr>
        <td>
            <asp:Label ID="Label7" CssClass="label_text" ForeColor="Black" runat="server" Text="Confirm Password"></asp:Label>
             <asp:Label ID="Label8" runat="server" Text="*" ForeColor="Red" />
        </td>
       
    </tr>
    <tr>
         <td>
             <asp:TextBox ID="txt_confirm_new_password" runat="server" TextMode ="Password"></asp:TextBox><br />
             <asp:RequiredFieldValidator ID="RequiredFieldValidatorconfirm" runat="server" ControlToValidate="txt_confirm_new_password" CssClass="field-validation-error" ErrorMessage="Confirm password is required." />
            <br />
                <asp:CompareValidator id="comparePasswords" 
              runat="server" CssClass="field-validation-error" 
              ControlToCompare="txt_new_password"
              ControlToValidate="txt_confirm_new_password"
              ErrorMessage="Your passwords do not match up!"
              Display="Dynamic" />
        </td>
    </tr>
</table>
         <div class="modal-footer">
        <asp:Button class="btn btn-primary" runat="server" style="background-color:#3071a9" Text="Reset Password" ID="btn_reset_password" OnClick="btn_reset_password_Click"></asp:Button>
                  </div>
    </div>
         
    </form>
</body>
</html>
