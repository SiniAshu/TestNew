﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BrokerageOnline.Presentation.SecurityServiceRef {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="SecurityServiceRef.ISecurityService")]
    public interface ISecurityService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISecurityService/AuthenticateUser", ReplyAction="http://tempuri.org/ISecurityService/AuthenticateUserResponse")]
        BrokerageOnline.Presentation.SecurityServiceRef.AuthenticateUserResponse AuthenticateUser(BrokerageOnline.Presentation.SecurityServiceRef.AuthenticateUserRequest request);
        
        // CODEGEN: Generating message contract since the operation has multiple return values.
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISecurityService/AuthenticateUser", ReplyAction="http://tempuri.org/ISecurityService/AuthenticateUserResponse")]
        System.Threading.Tasks.Task<BrokerageOnline.Presentation.SecurityServiceRef.AuthenticateUserResponse> AuthenticateUserAsync(BrokerageOnline.Presentation.SecurityServiceRef.AuthenticateUserRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISecurityService/ForgetPassword", ReplyAction="http://tempuri.org/ISecurityService/ForgetPasswordResponse")]
        BrokerageOnline.Presentation.SecurityServiceRef.ForgetPasswordResponse ForgetPassword(BrokerageOnline.Presentation.SecurityServiceRef.ForgetPasswordRequest request);
        
        // CODEGEN: Generating message contract since the operation has multiple return values.
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISecurityService/ForgetPassword", ReplyAction="http://tempuri.org/ISecurityService/ForgetPasswordResponse")]
        System.Threading.Tasks.Task<BrokerageOnline.Presentation.SecurityServiceRef.ForgetPasswordResponse> ForgetPasswordAsync(BrokerageOnline.Presentation.SecurityServiceRef.ForgetPasswordRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISecurityService/ResetPassword", ReplyAction="http://tempuri.org/ISecurityService/ResetPasswordResponse")]
        BrokerageOnline.Presentation.SecurityServiceRef.ResetPasswordResponse ResetPassword(BrokerageOnline.Presentation.SecurityServiceRef.ResetPasswordRequest request);
        
        // CODEGEN: Generating message contract since the operation has multiple return values.
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISecurityService/ResetPassword", ReplyAction="http://tempuri.org/ISecurityService/ResetPasswordResponse")]
        System.Threading.Tasks.Task<BrokerageOnline.Presentation.SecurityServiceRef.ResetPasswordResponse> ResetPasswordAsync(BrokerageOnline.Presentation.SecurityServiceRef.ResetPasswordRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISecurityService/GetUserID", ReplyAction="http://tempuri.org/ISecurityService/GetUserIDResponse")]
        string GetUserID(string UserName);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISecurityService/GetUserID", ReplyAction="http://tempuri.org/ISecurityService/GetUserIDResponse")]
        System.Threading.Tasks.Task<string> GetUserIDAsync(string UserName);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISecurityService/GetChatUsers", ReplyAction="http://tempuri.org/ISecurityService/GetChatUsersResponse")]
        BrokerageOnline.TransferObjects.UserDetail[] GetChatUsers();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISecurityService/GetChatUsers", ReplyAction="http://tempuri.org/ISecurityService/GetChatUsersResponse")]
        System.Threading.Tasks.Task<BrokerageOnline.TransferObjects.UserDetail[]> GetChatUsersAsync();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISecurityService/GetOfflineChats", ReplyAction="http://tempuri.org/ISecurityService/GetOfflineChatsResponse")]
        BrokerageOnline.TransferObjects.ChatHistory[] GetOfflineChats(int SentTo);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISecurityService/GetOfflineChats", ReplyAction="http://tempuri.org/ISecurityService/GetOfflineChatsResponse")]
        System.Threading.Tasks.Task<BrokerageOnline.TransferObjects.ChatHistory[]> GetOfflineChatsAsync(int SentTo);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISecurityService/SaveChat", ReplyAction="http://tempuri.org/ISecurityService/SaveChatResponse")]
        bool SaveChat(BrokerageOnline.TransferObjects.ChatHistory chatHistory);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISecurityService/SaveChat", ReplyAction="http://tempuri.org/ISecurityService/SaveChatResponse")]
        System.Threading.Tasks.Task<bool> SaveChatAsync(BrokerageOnline.TransferObjects.ChatHistory chatHistory);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISecurityService/InsertUpdateEmployeeLogs", ReplyAction="http://tempuri.org/ISecurityService/InsertUpdateEmployeeLogsResponse")]
        BrokerageOnline.Presentation.SecurityServiceRef.InsertUpdateEmployeeLogsResponse InsertUpdateEmployeeLogs(BrokerageOnline.Presentation.SecurityServiceRef.InsertUpdateEmployeeLogsRequest request);
        
        // CODEGEN: Generating message contract since the operation has multiple return values.
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISecurityService/InsertUpdateEmployeeLogs", ReplyAction="http://tempuri.org/ISecurityService/InsertUpdateEmployeeLogsResponse")]
        System.Threading.Tasks.Task<BrokerageOnline.Presentation.SecurityServiceRef.InsertUpdateEmployeeLogsResponse> InsertUpdateEmployeeLogsAsync(BrokerageOnline.Presentation.SecurityServiceRef.InsertUpdateEmployeeLogsRequest request);
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.MessageContractAttribute(WrapperName="AuthenticateUser", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class AuthenticateUserRequest {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public BrokerageOnline.TransferObjects.Credentials credential;
        
        public AuthenticateUserRequest() {
        }
        
        public AuthenticateUserRequest(BrokerageOnline.TransferObjects.Credentials credential) {
            this.credential = credential;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.MessageContractAttribute(WrapperName="AuthenticateUserResponse", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class AuthenticateUserResponse {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public bool AuthenticateUserResult;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=1)]
        public string error;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=2)]
        public string ReturnURL;
        
        public AuthenticateUserResponse() {
        }
        
        public AuthenticateUserResponse(bool AuthenticateUserResult, string error, string ReturnURL) {
            this.AuthenticateUserResult = AuthenticateUserResult;
            this.error = error;
            this.ReturnURL = ReturnURL;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.MessageContractAttribute(WrapperName="ForgetPassword", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class ForgetPasswordRequest {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public string username;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=1)]
        public string email;
        
        public ForgetPasswordRequest() {
        }
        
        public ForgetPasswordRequest(string username, string email) {
            this.username = username;
            this.email = email;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.MessageContractAttribute(WrapperName="ForgetPasswordResponse", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class ForgetPasswordResponse {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public bool ForgetPasswordResult;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=1)]
        public string error;
        
        public ForgetPasswordResponse() {
        }
        
        public ForgetPasswordResponse(bool ForgetPasswordResult, string error) {
            this.ForgetPasswordResult = ForgetPasswordResult;
            this.error = error;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.MessageContractAttribute(WrapperName="ResetPassword", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class ResetPasswordRequest {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public BrokerageOnline.TransferObjects.Credentials credential;
        
        public ResetPasswordRequest() {
        }
        
        public ResetPasswordRequest(BrokerageOnline.TransferObjects.Credentials credential) {
            this.credential = credential;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.MessageContractAttribute(WrapperName="ResetPasswordResponse", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class ResetPasswordResponse {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public bool ResetPasswordResult;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=1)]
        public string error;
        
        public ResetPasswordResponse() {
        }
        
        public ResetPasswordResponse(bool ResetPasswordResult, string error) {
            this.ResetPasswordResult = ResetPasswordResult;
            this.error = error;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.MessageContractAttribute(WrapperName="InsertUpdateEmployeeLogs", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class InsertUpdateEmployeeLogsRequest {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public BrokerageOnline.TransferObjects.EmployeeLogs EmployeeLogsBO;
        
        public InsertUpdateEmployeeLogsRequest() {
        }
        
        public InsertUpdateEmployeeLogsRequest(BrokerageOnline.TransferObjects.EmployeeLogs EmployeeLogsBO) {
            this.EmployeeLogsBO = EmployeeLogsBO;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.MessageContractAttribute(WrapperName="InsertUpdateEmployeeLogsResponse", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class InsertUpdateEmployeeLogsResponse {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public string InsertUpdateEmployeeLogsResult;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=1)]
        public string error;
        
        public InsertUpdateEmployeeLogsResponse() {
        }
        
        public InsertUpdateEmployeeLogsResponse(string InsertUpdateEmployeeLogsResult, string error) {
            this.InsertUpdateEmployeeLogsResult = InsertUpdateEmployeeLogsResult;
            this.error = error;
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface ISecurityServiceChannel : BrokerageOnline.Presentation.SecurityServiceRef.ISecurityService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class SecurityServiceClient : System.ServiceModel.ClientBase<BrokerageOnline.Presentation.SecurityServiceRef.ISecurityService>, BrokerageOnline.Presentation.SecurityServiceRef.ISecurityService {
        
        public SecurityServiceClient() {
        }
        
        public SecurityServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public SecurityServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public SecurityServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public SecurityServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        BrokerageOnline.Presentation.SecurityServiceRef.AuthenticateUserResponse BrokerageOnline.Presentation.SecurityServiceRef.ISecurityService.AuthenticateUser(BrokerageOnline.Presentation.SecurityServiceRef.AuthenticateUserRequest request) {
            return base.Channel.AuthenticateUser(request);
        }
        
        public bool AuthenticateUser(BrokerageOnline.TransferObjects.Credentials credential, out string error, out string ReturnURL) {
            BrokerageOnline.Presentation.SecurityServiceRef.AuthenticateUserRequest inValue = new BrokerageOnline.Presentation.SecurityServiceRef.AuthenticateUserRequest();
            inValue.credential = credential;
            BrokerageOnline.Presentation.SecurityServiceRef.AuthenticateUserResponse retVal = ((BrokerageOnline.Presentation.SecurityServiceRef.ISecurityService)(this)).AuthenticateUser(inValue);
            error = retVal.error;
            ReturnURL = retVal.ReturnURL;
            return retVal.AuthenticateUserResult;
        }
        
        public System.Threading.Tasks.Task<BrokerageOnline.Presentation.SecurityServiceRef.AuthenticateUserResponse> AuthenticateUserAsync(BrokerageOnline.Presentation.SecurityServiceRef.AuthenticateUserRequest request) {
            return base.Channel.AuthenticateUserAsync(request);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        BrokerageOnline.Presentation.SecurityServiceRef.ForgetPasswordResponse BrokerageOnline.Presentation.SecurityServiceRef.ISecurityService.ForgetPassword(BrokerageOnline.Presentation.SecurityServiceRef.ForgetPasswordRequest request) {
            return base.Channel.ForgetPassword(request);
        }
        
        public bool ForgetPassword(string username, string email, out string error) {
            BrokerageOnline.Presentation.SecurityServiceRef.ForgetPasswordRequest inValue = new BrokerageOnline.Presentation.SecurityServiceRef.ForgetPasswordRequest();
            inValue.username = username;
            inValue.email = email;
            BrokerageOnline.Presentation.SecurityServiceRef.ForgetPasswordResponse retVal = ((BrokerageOnline.Presentation.SecurityServiceRef.ISecurityService)(this)).ForgetPassword(inValue);
            error = retVal.error;
            return retVal.ForgetPasswordResult;
        }
        
        public System.Threading.Tasks.Task<BrokerageOnline.Presentation.SecurityServiceRef.ForgetPasswordResponse> ForgetPasswordAsync(BrokerageOnline.Presentation.SecurityServiceRef.ForgetPasswordRequest request) {
            return base.Channel.ForgetPasswordAsync(request);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        BrokerageOnline.Presentation.SecurityServiceRef.ResetPasswordResponse BrokerageOnline.Presentation.SecurityServiceRef.ISecurityService.ResetPassword(BrokerageOnline.Presentation.SecurityServiceRef.ResetPasswordRequest request) {
            return base.Channel.ResetPassword(request);
        }
        
        public bool ResetPassword(BrokerageOnline.TransferObjects.Credentials credential, out string error) {
            BrokerageOnline.Presentation.SecurityServiceRef.ResetPasswordRequest inValue = new BrokerageOnline.Presentation.SecurityServiceRef.ResetPasswordRequest();
            inValue.credential = credential;
            BrokerageOnline.Presentation.SecurityServiceRef.ResetPasswordResponse retVal = ((BrokerageOnline.Presentation.SecurityServiceRef.ISecurityService)(this)).ResetPassword(inValue);
            error = retVal.error;
            return retVal.ResetPasswordResult;
        }
        
        public System.Threading.Tasks.Task<BrokerageOnline.Presentation.SecurityServiceRef.ResetPasswordResponse> ResetPasswordAsync(BrokerageOnline.Presentation.SecurityServiceRef.ResetPasswordRequest request) {
            return base.Channel.ResetPasswordAsync(request);
        }
        
        public string GetUserID(string UserName) {
            return base.Channel.GetUserID(UserName);
        }
        
        public System.Threading.Tasks.Task<string> GetUserIDAsync(string UserName) {
            return base.Channel.GetUserIDAsync(UserName);
        }
        
        public BrokerageOnline.TransferObjects.UserDetail[] GetChatUsers() {
            return base.Channel.GetChatUsers();
        }
        
        public System.Threading.Tasks.Task<BrokerageOnline.TransferObjects.UserDetail[]> GetChatUsersAsync() {
            return base.Channel.GetChatUsersAsync();
        }
        
        public BrokerageOnline.TransferObjects.ChatHistory[] GetOfflineChats(int SentTo) {
            return base.Channel.GetOfflineChats(SentTo);
        }
        
        public System.Threading.Tasks.Task<BrokerageOnline.TransferObjects.ChatHistory[]> GetOfflineChatsAsync(int SentTo) {
            return base.Channel.GetOfflineChatsAsync(SentTo);
        }
        
        public bool SaveChat(BrokerageOnline.TransferObjects.ChatHistory chatHistory) {
            return base.Channel.SaveChat(chatHistory);
        }
        
        public System.Threading.Tasks.Task<bool> SaveChatAsync(BrokerageOnline.TransferObjects.ChatHistory chatHistory) {
            return base.Channel.SaveChatAsync(chatHistory);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        BrokerageOnline.Presentation.SecurityServiceRef.InsertUpdateEmployeeLogsResponse BrokerageOnline.Presentation.SecurityServiceRef.ISecurityService.InsertUpdateEmployeeLogs(BrokerageOnline.Presentation.SecurityServiceRef.InsertUpdateEmployeeLogsRequest request) {
            return base.Channel.InsertUpdateEmployeeLogs(request);
        }
        
        public string InsertUpdateEmployeeLogs(BrokerageOnline.TransferObjects.EmployeeLogs EmployeeLogsBO, out string error) {
            BrokerageOnline.Presentation.SecurityServiceRef.InsertUpdateEmployeeLogsRequest inValue = new BrokerageOnline.Presentation.SecurityServiceRef.InsertUpdateEmployeeLogsRequest();
            inValue.EmployeeLogsBO = EmployeeLogsBO;
            BrokerageOnline.Presentation.SecurityServiceRef.InsertUpdateEmployeeLogsResponse retVal = ((BrokerageOnline.Presentation.SecurityServiceRef.ISecurityService)(this)).InsertUpdateEmployeeLogs(inValue);
            error = retVal.error;
            return retVal.InsertUpdateEmployeeLogsResult;
        }
        
        public System.Threading.Tasks.Task<BrokerageOnline.Presentation.SecurityServiceRef.InsertUpdateEmployeeLogsResponse> InsertUpdateEmployeeLogsAsync(BrokerageOnline.Presentation.SecurityServiceRef.InsertUpdateEmployeeLogsRequest request) {
            return base.Channel.InsertUpdateEmployeeLogsAsync(request);
        }
    }
}
