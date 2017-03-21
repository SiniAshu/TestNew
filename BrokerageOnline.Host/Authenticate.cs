using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BrokerageOnline.Common;
using BrokerageOnline.Common.SessionManagement;

namespace BrokerageOnline.Host
{
    public class Authenticate:IHttpModule 
    {
        public void Dispose()
        {

        }

        public void Init(HttpApplication app)
        {
            app.AuthenticateRequest += app_AuthenticateRequest;
        }

        void app_AuthenticateRequest(Object sender, EventArgs e)
        {
            //SessionObject aa = new SessionObject();
            HttpApplication app = (HttpApplication)sender;
            HttpContext context = app.Context;
            SessionObject.sessionValue = app.Request.Headers["SessionID"];
        }
    }
}