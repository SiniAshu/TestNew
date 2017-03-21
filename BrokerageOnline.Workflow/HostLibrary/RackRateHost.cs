using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Activities;
using System.Activities.Hosting;
using BrokerageOnline.TransferObjects;
using BrokerageOnline.Workflow;

namespace BrokerageOnline.Workflow
{
    public class RackRateHost : IRackRateHost
    {
        IDictionary<Guid, WorkflowApplication> instances;

        public RackRateHost()
        {
            instances = new Dictionary<Guid, WorkflowApplication>();
        }

        // load and resume a workflow instance. If the instance is in memory, 
        // will return the version from memory. If not, will load it from the 
        // persistent store
        public WorkflowApplication LoadInstance(Guid instanceId)
        {
            // if the instance is in memory, return it
            if (this.instances.ContainsKey(instanceId))
                return this.instances[instanceId];

            // load the instance
            XmlWorkflowInstanceStore instStore = new XmlWorkflowInstanceStore(instanceId);
            WorkflowApplication instance = new WorkflowApplication(new BrokerageOnline.Workflow.BaseRackRate());
            instance.InstanceStore = instStore;
            instance.Completed += OnWorkflowCompleted;
            instance.Idle += OnIdle;

            // add a tracking participant
            instance.Extensions.Add(new SaveAllEventsToTrackingParticipant());

            // add the instance to the list of running instances in the host
            instance.Load(instanceId);
            this.instances.Add(instanceId, instance);
            return instance;
        }

        // creates a workflow application, binds parameters, links extensions and run it
        public WorkflowApplication CreateAndRun(WorkFlowPayment rfp)
        {
            // input parameters for the WF program
            IDictionary<string, object> inputs = new Dictionary<string, object>();
            inputs.Add("RackRateData", rfp);

            // create and run the WF instance
            Activity wf = new BrokerageOnline.Workflow.BaseRackRate();
            WorkflowApplication instance = new WorkflowApplication(wf, inputs);
            XmlWorkflowInstanceStore store = new XmlWorkflowInstanceStore(instance.Id);
            instance.InstanceStore = store;
            instance.PersistableIdle += OnIdleAndPersistable;
            instance.Completed += OnWorkflowCompleted;
            instance.Idle += OnIdle;

            //Create the persistence Participant and add it to the workflow instance
            XmlPersistenceParticipant xmlPersistenceParticipant = new XmlPersistenceParticipant(instance.Id);
            instance.Extensions.Add(xmlPersistenceParticipant);

            // add a tracking participant
            instance.Extensions.Add(new SaveAllEventsToTrackingParticipant());

            // add instance to the host list of running instances
            this.instances.Add(instance.Id, instance);

            // continue executing this instance
            instance.Run();

            return instance;
        }

        // creates a workflow application, binds parameters, links extensions and run it
        public WorkflowApplication CreateAndRunViewAction(Int32 PaymentMemoid)
        {
            // input parameters for the WF program
            IDictionary<string, object> inputs = new Dictionary<string, object>();
            inputs.Add("PaymentMemoID", PaymentMemoid);

            // create and run the WF instance
            Activity wf = new BrokerageOnline.Workflow.BaseRackRateView();
            WorkflowApplication instance = new WorkflowApplication(wf, inputs);
            XmlWorkflowInstanceStore store = new XmlWorkflowInstanceStore(instance.Id);
            instance.InstanceStore = store;
            instance.PersistableIdle += OnIdleAndPersistable;
            instance.Completed += OnWorkflowViewCompleted;
            instance.Idle += OnIdle;

            //Create the persistence Participant and add it to the workflow instance
            XmlPersistenceParticipant xmlPersistenceParticipant = new XmlPersistenceParticipant(instance.Id);
            instance.Extensions.Add(xmlPersistenceParticipant);

            // add a tracking participant
            instance.Extensions.Add(new SaveAllEventsToTrackingParticipant());

            // add instance to the host list of running instances
            this.instances.Add(instance.Id, instance);

            // continue executing this instance
            instance.Run();

            return instance;
        }
        public IDictionary<string, object> result;
        public void OnWorkflowViewCompleted(WorkflowApplicationCompletedEventArgs e)
        {
             result = e.Outputs;
        }

        // executed when instance goes idle
        public void OnIdle(WorkflowApplicationIdleEventArgs e)
        {
        }

        public PersistableIdleAction OnIdleAndPersistable(WorkflowApplicationIdleEventArgs e)
        {
            return PersistableIdleAction.Persist;
        }

        // executed when instance is persisted
        public void OnWorkflowCompleted(WorkflowApplicationCompletedEventArgs e)
        {
        }

        // submit a proposal to a user. To submit the proposal, a bookmark is resumed
        public void SubmitUserProposal(Guid instanceId, int userId, double value)
        {
            WorkflowApplication instance = this.LoadInstance(instanceId);
            string bookmarkName = "waitingFor_" + userId.ToString();
            instance.ResumeBookmark(bookmarkName, value);
        }

        // returns true if the instance is waiting for proposals (has pending user bookmarks)
        public bool IsInstanceWaitingForProposals(Guid instanceId)
        {
            WorkflowApplication instance = this.LoadInstance(instanceId);
            return instance.GetBookmarks().Count > 0;
        }

        // returns true if a user can submit a proposal to an instance by 
        // checking if there is a pending bookmark for that user
        public bool CanSubmitProposalToInstance(Guid instanceId, int userId)
        {
            WorkflowApplication instance = this.LoadInstance(instanceId);

            // if there are no bookmarks, the process has finalized
            if (instance.GetBookmarks().Count == 0)
            {
                return false;
            }
            else // if there are bookmarks, check if one of them correspond with the "logged" user
            {
                foreach (BookmarkInfo bookmarkInfo in instance.GetBookmarks())
                {
                    if (bookmarkInfo.BookmarkName.Equals("waitingFor_" + userId))
                    {
                        return true;
                    }
                }
                return false;
            }
        }
    }
}
