using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Activities;
using BrokerageOnline.TransferObjects;
using BrokerageOnline.Workflow;

namespace BrokerageOnline.Workflow
{
    interface IRackRateHost
    {
        bool CanSubmitProposalToInstance(Guid instanceId, int vendorId);
        WorkflowApplication CreateAndRun(WorkFlowPayment rfp);
        WorkflowApplication CreateAndRunViewAction(Int32 PaymentMemoid);
        bool IsInstanceWaitingForProposals(Guid instanceId);
        WorkflowApplication LoadInstance(Guid instanceId);
        void SubmitUserProposal(Guid instanceId, int vendorId, double value);
    }
}
