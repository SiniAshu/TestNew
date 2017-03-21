using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using BrokerageOnline.TransferObjects;
using System.Xml.Linq;

namespace BrokerageOnline.Workflow
{
    public class RackRateRepository
    {
        /*
        // retrieve a Request for Proposal from the repository by Id 
        public static RackRateRequest Retrieve(Guid id)
        {
            // load the document
            XElement doc = XElement.Load(IOHelper.GetAllRfpsFileName());

            // erase nodes for the current rfp
            IEnumerable<RackRateRequest> current =
                                    from r in doc.Elements("RackRateRequest")
                                    where r.Attribute("id").Value.Equals(id.ToString())
                                    select MapFrom(r);

            return current.First<RackRateRequest>();
        }

        // retrieve all active Requests for Proposals
        public static IEnumerable<RackRateRequest> RetrieveActive()
        {
            //  if no persistence file, exit
            if (!File.Exists(IOHelper.GetAllRfpsFileName()))
                return new List<RackRateRequest>();

            // load the document
            XElement doc = XElement.Load(IOHelper.GetAllRfpsFileName());

            // fetch active rfps
            return
                from rfp in doc.Descendants("RackRateRequest")
                where (rfp.Attribute("status").Value.Equals("active"))
                select MapFrom(rfp);
        }

        // retrieve all finished Requests for Proposals
        public static IEnumerable<RackRateRequest> RetrieveFinished()
        {
            //  if no persistence file, exit
            if (!File.Exists(IOHelper.GetAllRfpsFileName()))
                return new List<RackRateRequest>();

            // load the document
            XElement doc = XElement.Load(IOHelper.GetAllRfpsFileName());

            // fetch active rfps
            return
                from rfp in doc.Descendants("RackRateRequest")
                where (rfp.Attribute("status").Value.Equals("finished"))
                select MapFrom(rfp);
        }

        // map a Request for Proposal from a Linq to Xml XElement
        static RackRateRequest MapFrom(XElement elem)
        {            
            RackRateRequest rfp = new RackRateRequest();

           
            rfp.ID = new Guid(elem.Attribute("id").Value);
            rfp.Status = elem.Attribute("status").Value;
            rfp.Title = elem.Element("title").Value;
            rfp.Description = elem.Element("description").Value;
            rfp.CreationDate = DateTime.Parse(elem.Element("creationDate").Value, new CultureInfo("EN-us"));

            if (elem.Element("completionDate") != null)
                rfp.CompletionDate = DateTime.Parse(elem.Element("completionDate").Value, new CultureInfo("EN-us"));

            // invited vendors
            foreach (XElement vendorElem in elem.Element("invitedVendors").Elements("vendor"))
            {
                Vendor vendor = VendorRepository.Retrieve(Convert.ToInt32(vendorElem.Attribute("id").Value, new CultureInfo("EN-us")));
                rfp.InvitedVendors.Add(vendor);
            }

            // map received proposals in the list
            foreach (var proposal in elem.Element("vendorProposals").Elements("vendorProposal"))
            {
                Vendor vendor = VendorRepository.Retrieve(int.Parse(proposal.Attribute("vendorId").Value, new CultureInfo("EN-us")));
                VendorProposal vendorProposal = new VendorProposal(vendor);
                vendorProposal.Value = double.Parse(proposal.Attribute("value").Value, new CultureInfo("EN-us"));
                vendorProposal.Date = DateTime.Parse(proposal.Attribute("date").Value, new CultureInfo("EN-us"));
                rfp.VendorProposals.Add(vendor.Id, vendorProposal);
            }

            // map best proposal
            if (elem.Element("bestProposal") != null)
            {
                Vendor bestVendor = VendorRepository.Retrieve(Convert.ToInt32(elem.Element("bestProposal").Attribute("vendorId").Value, new CultureInfo("EN-us")));
                rfp.BestProposal = new VendorProposal(bestVendor);
                rfp.BestProposal.Value = double.Parse(elem.Element("bestProposal").Attribute("value").Value, new CultureInfo("EN-us"));
                rfp.BestProposal.Date = DateTime.Parse(elem.Element("bestProposal").Attribute("date").Value, new CultureInfo("EN-us"));
            }
            return rfp;
        }
        */
    }
}
