﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BrokerageOnline.Presentation.SessionServiceRef {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="SessionServiceRef.ISessionManager")]
    public interface ISessionManager {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISessionManager/CreateSession", ReplyAction="http://tempuri.org/ISessionManager/CreateSessionResponse")]
        string CreateSession();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISessionManager/CreateSession", ReplyAction="http://tempuri.org/ISessionManager/CreateSessionResponse")]
        System.Threading.Tasks.Task<string> CreateSessionAsync();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISessionManager/GetSessionValue", ReplyAction="http://tempuri.org/ISessionManager/GetSessionValueResponse")]
        string GetSessionValue(string sessionId, string key);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISessionManager/GetSessionValue", ReplyAction="http://tempuri.org/ISessionManager/GetSessionValueResponse")]
        System.Threading.Tasks.Task<string> GetSessionValueAsync(string sessionId, string key);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISessionManager/GetSession", ReplyAction="http://tempuri.org/ISessionManager/GetSessionResponse")]
        string GetSession(string sessionId, string[] keys);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISessionManager/GetSession", ReplyAction="http://tempuri.org/ISessionManager/GetSessionResponse")]
        System.Threading.Tasks.Task<string> GetSessionAsync(string sessionId, string[] keys);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISessionManager/SetSessionValue", ReplyAction="http://tempuri.org/ISessionManager/SetSessionValueResponse")]
        [System.ServiceModel.ServiceKnownTypeAttribute(typeof(string[]))]
        [System.ServiceModel.ServiceKnownTypeAttribute(typeof(BrokerageOnline.Common.SessionManagement.SessionObject[]))]
        [System.ServiceModel.ServiceKnownTypeAttribute(typeof(BrokerageOnline.Common.SessionManagement.SessionObject))]
        void SetSessionValue(string sessionId, string key, object value);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISessionManager/SetSessionValue", ReplyAction="http://tempuri.org/ISessionManager/SetSessionValueResponse")]
        System.Threading.Tasks.Task SetSessionValueAsync(string sessionId, string key, object value);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISessionManager/SetSession", ReplyAction="http://tempuri.org/ISessionManager/SetSessionResponse")]
        void SetSession(string sessionId, BrokerageOnline.Common.SessionManagement.SessionObject[] sessionObjects);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISessionManager/SetSession", ReplyAction="http://tempuri.org/ISessionManager/SetSessionResponse")]
        System.Threading.Tasks.Task SetSessionAsync(string sessionId, BrokerageOnline.Common.SessionManagement.SessionObject[] sessionObjects);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISessionManager/RemoveSession", ReplyAction="http://tempuri.org/ISessionManager/RemoveSessionResponse")]
        void RemoveSession(string sessionId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISessionManager/RemoveSession", ReplyAction="http://tempuri.org/ISessionManager/RemoveSessionResponse")]
        System.Threading.Tasks.Task RemoveSessionAsync(string sessionId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISessionManager/IsValidSession", ReplyAction="http://tempuri.org/ISessionManager/IsValidSessionResponse")]
        bool IsValidSession(string sessionId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ISessionManager/IsValidSession", ReplyAction="http://tempuri.org/ISessionManager/IsValidSessionResponse")]
        System.Threading.Tasks.Task<bool> IsValidSessionAsync(string sessionId);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface ISessionManagerChannel : BrokerageOnline.Presentation.SessionServiceRef.ISessionManager, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class SessionManagerClient : System.ServiceModel.ClientBase<BrokerageOnline.Presentation.SessionServiceRef.ISessionManager>, BrokerageOnline.Presentation.SessionServiceRef.ISessionManager {
        
        public SessionManagerClient() {
        }
        
        public SessionManagerClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public SessionManagerClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public SessionManagerClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public SessionManagerClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public string CreateSession() {
            return base.Channel.CreateSession();
        }
        
        public System.Threading.Tasks.Task<string> CreateSessionAsync() {
            return base.Channel.CreateSessionAsync();
        }
        
        public string GetSessionValue(string sessionId, string key) {
            return base.Channel.GetSessionValue(sessionId, key);
        }
        
        public System.Threading.Tasks.Task<string> GetSessionValueAsync(string sessionId, string key) {
            return base.Channel.GetSessionValueAsync(sessionId, key);
        }
        
        public string GetSession(string sessionId, string[] keys) {
            return base.Channel.GetSession(sessionId, keys);
        }
        
        public System.Threading.Tasks.Task<string> GetSessionAsync(string sessionId, string[] keys) {
            return base.Channel.GetSessionAsync(sessionId, keys);
        }
        
        public void SetSessionValue(string sessionId, string key, object value) {
            base.Channel.SetSessionValue(sessionId, key, value);
        }
        
        public System.Threading.Tasks.Task SetSessionValueAsync(string sessionId, string key, object value) {
            return base.Channel.SetSessionValueAsync(sessionId, key, value);
        }
        
        public void SetSession(string sessionId, BrokerageOnline.Common.SessionManagement.SessionObject[] sessionObjects) {
            base.Channel.SetSession(sessionId, sessionObjects);
        }
        
        public System.Threading.Tasks.Task SetSessionAsync(string sessionId, BrokerageOnline.Common.SessionManagement.SessionObject[] sessionObjects) {
            return base.Channel.SetSessionAsync(sessionId, sessionObjects);
        }
        
        public void RemoveSession(string sessionId) {
            base.Channel.RemoveSession(sessionId);
        }
        
        public System.Threading.Tasks.Task RemoveSessionAsync(string sessionId) {
            return base.Channel.RemoveSessionAsync(sessionId);
        }
        
        public bool IsValidSession(string sessionId) {
            return base.Channel.IsValidSession(sessionId);
        }
        
        public System.Threading.Tasks.Task<bool> IsValidSessionAsync(string sessionId) {
            return base.Channel.IsValidSessionAsync(sessionId);
        }
    }
}
