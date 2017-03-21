using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup("NotificationStartup", typeof(BrokerageOnline.Host.NotificationStartup))]
namespace BrokerageOnline.Host
{    
    public class NotificationStartup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}