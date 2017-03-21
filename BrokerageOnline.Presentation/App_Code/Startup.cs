using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup("NotificationStartup", typeof(BrokerageOnline.Presentation.App_Code.NotificationStartup))]
namespace BrokerageOnline.Presentation.App_Code
{    
    public class NotificationStartup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}