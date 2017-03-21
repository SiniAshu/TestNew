using System;
using System.Activities.Tracking;
using System.IO;

namespace BrokerageOnline.Workflow
{
    public class SaveAllEventsToTrackingParticipant : TrackingParticipant
    {
        protected override void Track(TrackingRecord record, TimeSpan timeout)
        {
            // get the tracking path
            string fileName = IOHelper.GetTrackingFilePath(record.InstanceId);

            // create a writer and open the file
            using (StreamWriter tw = File.AppendText(fileName))
            {
                // write a line of text to the file
                tw.WriteLine(record.ToString());
            }
        }
    }
}
