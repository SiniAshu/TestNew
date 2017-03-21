using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;
using System.Diagnostics.Tracing;
using Microsoft.Practices.EnterpriseLibrary.Logging;

namespace BrokerageOnline.Common.ExceptionHandler
{
    public class ExceptionStateHandler : IExceptionStateHandler
    {
        /// <summary>
        /// Log Exception
        /// </summary>
        /// <param name="actualException">Exception Object</param>
        public void LogException(Exception actualException, int eventId, int priority)
        {
            //BrokerageOnline.BusinessLogic.ExceptionStateHandler.LogException(actualException);
            try
            {
                LogEntry logEntry;
                if (actualException.InnerException != null)
                {
                    logEntry = new LogEntry
                    {
                        Message = actualException.InnerException.Message + "\n" + actualException.InnerException.StackTrace + "\n" + actualException.InnerException.InnerException,
                        Severity = TraceEventType.Error,
                        EventId = eventId,
                        Priority = priority
                    };
                }
                else
                {
                    logEntry = new LogEntry
                    {
                        Message = actualException.Message + "\n" + actualException.StackTrace + "\n" + actualException.InnerException,
                        Severity = TraceEventType.Error,
                        EventId = eventId,
                        Priority = priority
                    };
                }
                Logger.Write(logEntry);
            }
            catch
            {
                throw;
            }

        }

        /// <summary>
        /// Log state
        /// </summary>
        /// <param name="message">State message</param>
        /// <param name="traceEventType">Trace event type  e.g  TraceEventType.Start, TraceEventType.Stop</param>
        public void LogState(string message, TraceEventType traceEventType, int eventId, int priority)
        {
            //BrokerageOnline.BusinessLogic.ExceptionStateHandler.LogState(message, traceEventType);
            try
            {
                LogEntry logEntry = new LogEntry { Message = message, Severity = traceEventType, EventId = eventId, Priority = priority };
                Logger.Write(logEntry);
            }
            catch
            {
                throw;
            }
        }
    }
}
