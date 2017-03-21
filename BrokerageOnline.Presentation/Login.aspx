<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs"  Inherits="BrokerageOnline.Presentation.Login" %>

<%@ Register Src="~/UserControl/ForgetPassword.ascx" TagPrefix="uc1" TagName="ForgetPassword" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Login</title>
    <%--<script src="js/jquery.js"></script>--%>
    <%--<script src="Scripts/jquery-1.11.1.min.js"></script>--%>
    <script src="js/jquery-1.11.1.min.js"></script>
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/bootstrap-responsive.css" rel="stylesheet" />
    <script src="js/bootstrap.min.js"></script>
    <link href="css/toastr.min.css" rel="stylesheet" />
    <script src="js/toastr.min.js"></script>
    <script src="js/jquery.timer.min.js"></script>
    <script src="../js/Utility.js"></script>
    <link href="css/login.css" rel="stylesheet" />
    <script type="text/javascript"> 
        function showsuccessToast(val) {
            Utility.writeNotification("success", val);
        }
        function showErrorToast(val) {
            Utility.writeNotification("error", val);
        }

        function setsession(sessionId, LoginID, UserID) {
            sessionStorage.setItem("sessionId", sessionId);
            sessionStorage.setItem("LoginId", LoginID);
            sessionStorage.setItem("UserID", UserID);
            window.location.href = "Pages/Dashboard.html";
        }

        </script>
</head>
<body style="background-color:black">
    <form id="loginForm" runat="server">
        <asp:ScriptManager runat="server" EnablePageMethods="true"></asp:ScriptManager>
                  <asp:UpdatePanel runat="server">
              <ContentTemplate>
        <p class="validation-summary-errors" style="margin: 20px">
            <asp:Literal runat="server" ID="FailureText" />
        </p>
        <fieldset>

            <table style="margin: 0; margin-left: 20px">
                <tr>
                    <td>
                        <img src="img/main_logo.png" />
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <ol>

                            <li>
                                <asp:Label runat="server" Text="SYSTEM LOGIN" Style="color: white; font-weight: bold; font-size: large; text-decoration: underline;"></asp:Label>
                            </li>
                            <li>
                                <asp:Label ID="Label7" CssClass="label_text" runat="server" Text="Please Enter your Credential to access the system"></asp:Label>

                            </li>
                            <li>
                                <asp:Label ID="Label1" CssClass="label_text" runat="server" Text="USERNAME"></asp:Label>
                                <asp:Label ID="Label2" runat="server" Text="*" ForeColor="Red" />

                            </li>
                            <li>
                                <asp:TextBox ID="UserName" MaxLength="10" runat="server"></asp:TextBox>
                            </li>
                            <li>
                                <asp:RequiredFieldValidator ID="RequiredFieldValidator1"  ValidationGroup="login" Display="Dynamic" runat="server" ControlToValidate="UserName" CssClass="field-validation-error" ErrorMessage="The user name is required." />
                                 <%--<asp:RegularExpressionValidator   ID="RegularExpressionValidator1" ValidationGroup="login" runat="server"  CssClass="field-validation-error" Display="Dynamic" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"  ControlToValidate="UserName"  ErrorMessage="Enter valid email address!"  >  </asp:RegularExpressionValidator>--%>  
                                <%--  <asp:RegularExpressionValidator ID="exp_val"  runat ="server"  ValidationExpression="^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$"  ControlToValidate="UserName"  CssClass="field-validation-error" ErrorMessage="Enter Valid Email ID"></asp:RegularExpressionValidator></li>--%>
                            </li>
                            <li>
                                <asp:Label ID="Label3" CssClass="label_text" runat="server" Text="PASSWORD"></asp:Label>
                                <asp:Label ID="Label4" runat="server" Text="*" ForeColor="Red" />
                            </li>
                            <li>
                                <asp:TextBox ID="Password" TextMode="Password" MaxLength="10" runat="server"></asp:TextBox>
                            </li>
                            <li>
                                <asp:RequiredFieldValidator ID="RequiredFieldValidator2" ValidationGroup="login" Display="Dynamic" runat="server" ControlToValidate="Password" CssClass="field-validation-error" ErrorMessage="The password is required." />
                            </li>
                            <li>

                                <%--<button type="submit" id="btn_login" class="btn btn-primary"> Log in</button>--%>
                                <asp:LinkButton ID="lnk_forget_password"  data-target="#div_forget_password" data-toggle="modal" runat="server" Style=" color:white;background-color:black" Text="Forgot Password?"></asp:LinkButton>
                            </li>
                            <li>
                                <asp:Button ID="btn_login" runat="server" CommandName="Login" Text="Log in" OnClick="btn_login_Click" ValidationGroup="login" Style="align-items: center; margin-left: 250px" />
                    </li>
                            <li>
                                <asp:Label ID="Label6" runat="server" Style="color: white">
       Copyright &copy 2014. All rights reserved in this software <br /> belong solely to <a style="color:white;background:black;" href="http://www.hexagonglobal.in" target="_blank">Hexagon Global IT Services pvt ltd</a>

                                </asp:Label>

                            </li>
                        </ol>
                    </td>
                </tr>
            </table>
    
        </fieldset>
                   </ContentTemplate>
          </asp:UpdatePanel>   
        <div id="div_forget_password" class="modal fade" role="dialog" aria-labelledby="basicModal">
             <div class="modal-dialog  modal-sm">
                  <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only"></span></button>
                <h1 class="modal-title" id="myModalLabel">Forget Password</h1>
            </div>
            <div class="modal-body">
                <uc1:ForgetPassword ID="ctrl_forget_pwd" runat="server" />
            </div>
            </div>
      </div>
        </div>
    </form>
   
           <%--         <script type="text/javascript">
                        $(function () {
                            $.support.cors = true;

                            $('#<%=btn_login.ClientID%>').click(function (e) {
                                $.ajax({

                                    type: "POST",
                                    url: "http://localhost/BrokerageService/SecurityService.svc/Authenticate",// + $("#lbl_login_UserName").val() +'/'+ $("#lbl_login_Password").val(),

                                    data: '{"detail":{"username":"' + $("#<%=UserName.ClientID%>").val() + '", "password":"' + $("#<%= Password.ClientID  %>").val() + '"}}',
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    crossDomain: true,
                                    ProcessData: true,
                                    success: function (data) {

                                        if (data.AuthenticateUserResult == "")
                                            window.location.href = "create.html";
                                        else
                                            alert(data.AuthenticateUserResult);
                                    },
                                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                                        alert(data);
                                        alert("Login Failed!");
                                    }
                                });

                                return false;
                            });--%>

                            <%--  $('#<%=lnk_forget_password.ClientID%>').click(function (e) {
                                $("#div_forget_password").modal({ show: true });
                            });--%>


                    <%--    });
                    </script>--%>
       

</body>
</html>
