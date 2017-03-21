using System;
using System.Collections.Generic;
using BrokerageOnline.TransferObjects;
using BrokerageOnline.DataAccess;

namespace BrokerageOnline.BusinessLogic
{
    public class DistirbutorBL
    {
        public List<DistributorMaster> GetAllDistributors()
        {
            List<DistributorMaster> DistributorList = new List<DistributorMaster>();
            try
            {
                DistributorDAL dal = new DistributorDAL();
                DistributorList = dal.GetAllDistributors();
            }
            catch (Exception ex)
            {
                throw;
            }
            return DistributorList;
        }

        public List<SubRegion> GetAllSubReigons()
        {
            List<SubRegion> subRegionList = new List<SubRegion>();
            try
            {
                DistributorDAL dal = new DistributorDAL();
                subRegionList = dal.GetAllSubRegion();
            }
            catch (Exception ex)
            {
                throw;
            }
            return subRegionList;
        }

        public List<DistributorCategory> GetAllDistributorCategories()
        {
            List<DistributorCategory> DistributorCategoryList = new List<DistributorCategory>();
            try
            {
                DistributorDAL dal = new DistributorDAL();
                DistributorCategoryList = dal.GetAllDistributorCategories();
            }
            catch (Exception ex)
            {
                throw;
            }
            return DistributorCategoryList;
        }

        public string InsertUpdateDistributor(DistributorMaster distributor)
        {
            string result = string.Empty;
            try
            {
                DistributorDAL dal = new DistributorDAL();
                result = dal.InsertUpdateDistributor(distributor);
            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }

        public string DeleteDistributorById(string DistirbutorId)
        {
            string result = string.Empty;
            try
            {
                DistributorDAL dal = new DistributorDAL();
                result = dal.DeleteDistributorById(DistirbutorId);
            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }
    }
}