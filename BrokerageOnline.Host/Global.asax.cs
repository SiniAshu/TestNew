using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using System.Diagnostics;
using Microsoft.Practices.EnterpriseLibrary.Logging;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using BrokerageOnline.Common.ExceptionHandler;
using BrokerageOnline.Common.SessionManagement;
using System.Threading;
using System.Configuration;
using BrokerageOnline.Services;

namespace BrokerageOnline.Host
{
    public class Global : System.Web.HttpApplication
    {
        AuthorizationService m_authorizationService = new AuthorizationService();
        protected void Application_Start(object sender, EventArgs e)
        {
            DatabaseFactory.SetDatabaseProviderFactory(new DatabaseProviderFactory());
            IConfigurationSource configurationSource = ConfigurationSourceFactory.Create();
            LogWriterFactory logWriterFactory = new LogWriterFactory(configurationSource);
            Logger.SetLogWriter(logWriterFactory.Create());

            //System.Data.SqlClient.SqlDependency.Start(ConfigurationManager.ConnectionStrings["BrokerageOnline"].ConnectionString);

            SessionManager.IsSessionMonitorStopped = false;
            Thread monitSession = new Thread(SessionManager.MoniterSession);
            monitSession.Start();
        }

        protected void Session_Start(object sender, EventArgs e)
        {
            EnableCrossDomainAjaxCall();
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {
            Exception ex = Server.GetLastError();
            ExceptionStateHandler logexception = new ExceptionStateHandler();
            logexception.LogException(ex, 2001, 2);

            CallUserEndLog(4);
            SessionManager.IsSessionMonitorStopped = true;
            SessionObject.sessionValue = string.Empty;
        }

        protected void Session_End(object sender, EventArgs e)
        {
            //CallUserEndLog(10);
            Session.Clear();
            SessionObject.sessionValue = string.Empty;
        }

        protected void Application_End(object sender, EventArgs e)
        {
            CallUserEndLog(4);
            
            //System.Data.SqlClient.SqlDependency.Stop(ConfigurationManager.ConnectionStrings["BrokerageOnline"].ConnectionString);
            SessionManager.IsSessionMonitorStopped = true;
            SessionObject.sessionValue = string.Empty;
            Session.Clear();
        }

        private void CallUserEndLog(int StatusID)
        {
            m_authorizationService.InsertUpdateEmployeeLogs(0,0, StatusID);
            //4 => Logged Out By System
            //10 => Session Timeout
        }

        private void EnableCrossDomainAjaxCall()
        {
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");

            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST");
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
                HttpContext.Current.Response.AddHeader("Access-Control-Max-Age", "1728000");
                HttpContext.Current.Response.End();
            }
        }
    }
}