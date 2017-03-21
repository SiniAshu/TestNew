using BrokerageOnline.DataAccess;
using BrokerageOnline.TransferObjects;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BrokerageOnline.Common;
using BrokerageOnline.Common.SessionManagement;
using System.Web;
using System.Globalization;
using BrokerageOnline.Workflow;
using System.Activities;
using System.Threading;
using System.Net;
using System.IO;
using BrokerageOnline.Common.Utility;
using System.Configuration;

namespace BrokerageOnline.BusinessLogic
{
    public class BaseRackRateBL
    {
        string UserSessionId = SessionObject.sessionValue;

        BaseRackRateDAL dal = new BaseRackRateDAL();


        public List<DistributorCategory> GetDistributorCategory(string SearchText)
        {
            List<DistributorCategory> DistCategory = new List<DistributorCategory>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    DistCategory = dal.GetDistributorCategory(SearchText, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<SchemeCategory> GetSchemeCategory(string SearchText, Int64 MemoTypeId, Int64 IsCloseEnded)
        {
            List<SchemeCategory> DistCategory = new List<SchemeCategory>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    DistCategory = dal.GetSchemeCategory(SearchText, MemoTypeId, IsCloseEnded, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SchemeDropdown> GetScheme(string SearchText, Int64 MemoTypeId, Int64 IsCloseEnded)
        {
            List<SchemeDropdown> DistCategory = new List<SchemeDropdown>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    DistCategory = dal.GetScheme(SearchText, MemoTypeId, IsCloseEnded, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SchemeDropdown> GetSchemeAndCategory(string SearchText, Int64 MemoTypeId)
        {
            List<SchemeDropdown> DistCategory = new List<SchemeDropdown>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    DistCategory = dal.GetSchemeAndCategory(SearchText, MemoTypeId, out error);
                    if (error == null)
                        return DistCategory;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return DistCategory;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Exit_Load> GetExitLoad(Int64 ID)
        {
            List<Exit_Load> exitLoad = new List<Exit_Load>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    exitLoad = dal.GetExitLoad(ID, out error);
                    if (error == null)
                        return exitLoad;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return exitLoad;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SchemeAndCategory> GetSchemeWithSchemeCategory(string[] SchemeID, string[] SchemeCategoryID)
        {
            try
            {
                Exception error = null;
                BaseRackRateDAL Dal = new BaseRackRateDAL();
                List<SchemeAndCategory> category = new List<SchemeAndCategory>();

                List<SchemeCategory> SchemeCategoryList = new List<SchemeCategory>();
                SchemeCategoryList = dal.GetSchemeCategory("", 0, 2, out error);


                foreach (string categoryID in SchemeCategoryID)
                {
                    List<SchemeDropdown> schemelist = new List<SchemeDropdown>();
                    schemelist = dal.GetScheme(categoryID, 0, 2, out error);
                    var selcategory = from cust in SchemeCategoryList
                                      where cust.SchemeCategoryId == Convert.ToInt64(categoryID)
                                      select cust;
                    foreach (string scheme in SchemeID)
                    {
                        if (categoryID == "")
                        {
                            var schemeExists = from cust in schemelist
                                               where cust.SchemeId == Convert.ToInt64(scheme)
                                               select cust;
                            if (schemeExists.Count() > 0)
                            {
                                SchemeAndCategory data = new SchemeAndCategory();
                                data.SchemeCategoryId = 0;
                                data.SchemeCategoryName = "";
                                data.SchemeId = Convert.ToInt64(scheme);
                                data.SchemeName = schemeExists.First().SchemeName;
                                category.Add(data);
                            }
                        }
                        else
                        {
                            var schemeExists = from cust in schemelist
                                               where cust.SchemeId == Convert.ToInt64(scheme) && cust.SchemeCategoryId == Convert.ToInt64(categoryID)
                                               select cust;
                            if (scheme != "")
                            {
                                if (schemeExists.Count() > 0)
                                {
                                    SchemeAndCategory data = new SchemeAndCategory();
                                    data.SchemeCategoryId = Convert.ToInt64(categoryID);
                                    data.SchemeCategoryName = selcategory.First().SchemeCategoryName;
                                    data.SchemeId = Convert.ToInt64(scheme);
                                    data.SchemeName = schemeExists.First().SchemeName;
                                    category.Add(data);
                                }
                                else
                                {
                                    List<SchemeDropdown> Allschemelist = new List<SchemeDropdown>();
                                    Allschemelist = dal.GetAllScheme(categoryID, out error);

                                    var catExists = from cust in category
                                                    where cust.SchemeId == Convert.ToInt64(Allschemelist.First().SchemeId) && cust.SchemeCategoryId == Convert.ToInt64(categoryID)
                                                    select cust;
                                    if (catExists.Count() == 0)
                                    {
                                        SchemeAndCategory data = new SchemeAndCategory();
                                        data.SchemeCategoryId = Convert.ToInt64(categoryID);
                                        data.SchemeCategoryName = selcategory.First().SchemeCategoryName;



                                        data.SchemeId = Convert.ToInt64(Allschemelist.First().SchemeId);
                                        data.SchemeName = Allschemelist.First().SchemeName;

                                        if (data.SchemeName == "All Schemes")
                                        {
                                            bool added = false;
                                            foreach (SchemeAndCategory val in category)
                                            {
                                                if (val.SchemeCategoryId == data.SchemeCategoryId)
                                                {
                                                    added = true;
                                                }
                                            }

                                            if (!added)
                                                category.Add(data);
                                        }

                                    }
                                }
                            }
                            else
                            {
                                List<SchemeDropdown> Allschemelist = new List<SchemeDropdown>();
                                Allschemelist = dal.GetAllScheme(categoryID, out error);

                                var catExists = from cust in category
                                                where cust.SchemeId == Convert.ToInt64(Allschemelist.First().SchemeId) && cust.SchemeCategoryId == Convert.ToInt64(categoryID)
                                                select cust;
                                if (catExists.Count() == 0)
                                {
                                    SchemeAndCategory data = new SchemeAndCategory();
                                    data.SchemeCategoryId = Convert.ToInt64(categoryID);
                                    data.SchemeCategoryName = selcategory.First().SchemeCategoryName;



                                    data.SchemeId = Convert.ToInt64(Allschemelist.First().SchemeId);
                                    data.SchemeName = Allschemelist.First().SchemeName;

                                    category.Add(data);
                                }
                            }
                        }
                    }
                }
                List<SchemeAndCategory> allsch = new List<SchemeAndCategory>();
                List<SchemeAndCategory> otherschemes = new List<SchemeAndCategory>();
                foreach (SchemeAndCategory sc in category)
                {
                    if (sc.SchemeName == "All Schemes")
                    {
                        allsch.Add(sc);
                    }
                    else
                    {
                        otherschemes.Add(sc);
                    }
                }
                foreach (SchemeAndCategory sc in allsch)
                {
                    foreach (SchemeAndCategory oscheme in otherschemes)
                    {
                        if (sc.SchemeCategoryId == oscheme.SchemeCategoryId)
                        {
                            category.Remove(sc);
                        }
                    }
                }

                var tempSchemeCategoryID=new List<string>(SchemeCategoryID);

                var temp = from schcate in tempSchemeCategoryID
                           join cate in category on schcate equals Convert.ToString(cate.SchemeCategoryId)
                           select schcate;

                var tempList = tempSchemeCategoryID.Where(x => temp.Any(y => y != x));
                var tempCategoryList = tempList.ToList();

                foreach (var item in tempCategoryList)
                {                    
                    List<SchemeDropdown> schemelist = new List<SchemeDropdown>();
                    schemelist = dal.GetScheme(item, 0, 2, out error);
                    foreach (var schemes in schemelist)
                    {
                        SchemeAndCategory schcate = new SchemeAndCategory();
                        schcate.SchemeCategoryId = schemes.SchemeCategoryId;
                        schcate.SchemeCategoryName = schemes.SchemeCategoryName;
                        schcate.SchemeId = schemes.SchemeId;
                        schcate.SchemeName = schemes.SchemeName;
                        category.Add(schcate);
                    }
                }

                if(SchemeID.Count()==1&&SchemeID[0]=="")
                {
                    foreach (var item in SchemeCategoryID)
                    {
                        List<SchemeDropdown> schemelist = new List<SchemeDropdown>();
                        schemelist = dal.GetScheme(item, 0, 2, out error);
                        foreach (var schemes in schemelist)
                        {
                            SchemeAndCategory schcate = new SchemeAndCategory();
                            schcate.SchemeCategoryId = schemes.SchemeCategoryId;
                            schcate.SchemeCategoryName = schemes.SchemeCategoryName;
                            schcate.SchemeId = schemes.SchemeId;
                            schcate.SchemeName = schemes.SchemeName;
                            category.Add(schcate);
                        }
                    }
                }

                var distinctCategory=category.GroupBy(x => x.SchemeId).Select(x => x.First()).ToList();

                return distinctCategory;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Distributor> GetDistributor(string SearchText, int SubregionID)
        {
            List<Distributor> Dist = new List<Distributor>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    Dist = dal.GetDistributor(SearchText, SubregionID, out error);
                    if (error == null)
                        return Dist;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Dist;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Distributor> GetDistributorBasedOnID(string SearchText, int SubregionID)
        {
            List<Distributor> Dist = new List<Distributor>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    Dist = dal.GetDistributorBasedOnID(SearchText, SubregionID, out error);
                    if (error == null)
                        return Dist;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Dist;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Distributor> GetChildArn(string ArnNo)
        {
            List<Distributor> Dist = new List<Distributor>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    Dist = dal.GetChildArn(ArnNo, out error);
                    if (error == null)
                        return Dist;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Dist;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string GetSlab(string DistributorCategoryID, string Arnno)
        {
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    return dal.GetSlab(DistributorCategoryID, Arnno);
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return "";
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string GetSlabAvailability(string DistributorCategoryID, string Arnno)
        {
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    return dal.GetSlabAvailability(DistributorCategoryID, Arnno);
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return "";
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string GetSIPSlab(string DistributorCategoryID, string Arnno)
        {
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    return dal.GetSIPSlab(DistributorCategoryID, Arnno);
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return "";
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string GetSIPSlabAvailability(string DistributorCategoryID, string Arnno)
        {
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    return dal.GetSIPSlabAvailability(DistributorCategoryID, Arnno);
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return "";
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Distributor> GetARN(string SearchText, int SubregionID)
        {
            List<Distributor> Dist = new List<Distributor>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    Dist = dal.GetARN(SearchText, SubregionID, out error);
                    if (error == null)
                        return Dist;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Dist;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Distributor> GetARNForChannelAndDistributorCategory(string Channel, string DistributorCategory)
        {
            List<Distributor> Dist = new List<Distributor>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    Dist = dal.GetARNForChannelAndDistributorCategory(Channel, DistributorCategory, out error);
                    if (error == null)
                        return Dist;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Dist;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Channel> GetChannel(string SearchText)
        {
            List<Channel> channel = new List<Channel>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    channel = dal.GetChannel(SearchText, out error);
                    if (error == null)
                        return channel;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return channel;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<RemarksHistory> GetRemarksHistory(string PaymentMemoId)
        {
            List<RemarksHistory> channel = new List<RemarksHistory>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    channel = dal.GetRemarksHistory(PaymentMemoId, out error);
                    if (error == null)
                        return channel;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return channel;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<ModifiedRateHistory> GetModifiedRateHistory(string PaymentMemoId)
        {
            List<ModifiedRateHistory> channel = new List<ModifiedRateHistory>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    channel = dal.GetModifiedRateHistory(PaymentMemoId, out error);
                    if (error == null)
                    {
                        //for (int i = 0; i < channel.Count; i++)
                        //{
                        //    string rettable = dal.getrackrateinfo(Convert.ToInt32(channel[i].PaymentMemoId), Convert.ToInt32(channel[i].SchemeId), out error);
                        //    if (rettable.Contains("<td"))
                        //    {
                        //    }
                        //    else
                        //    {
                        //        channel.Remove(channel[i]);
                        //    }
                        //}
                        return channel;
                    }
                    else
                    {
                        throw error;
                    }
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return channel;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<ModifiedRateHistory> GetSIPModifiedRateHistory(string PaymentMemoId)
        {
            List<ModifiedRateHistory> channel = new List<ModifiedRateHistory>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    channel = dal.GetSIPModifiedRateHistory(PaymentMemoId, out error);
                    if (error == null)
                    {
                        return channel;
                    }
                    else
                    {
                        throw error;
                    }
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return channel;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SIPRateHistoryDetails> GetSIPModifiedRateHistoryDetails(Int64 PaymentMemoId, Int64 SchemeID, Int64 SIPRowId)
        {
            List<SIPRateHistoryDetails> channel = new List<SIPRateHistoryDetails>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    channel = dal.GetSIPModifiedRateHistoryDetails(PaymentMemoId, SchemeID, SIPRowId);
                    if (error == null)
                    {
                        return channel;
                    }
                    else
                    {
                        throw error;
                    }
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return channel;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<AssignToUser> GetUserBasedOnRole(Int64 RoleId, string ChannelId)
        {
            List<AssignToUser> channel = new List<AssignToUser>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    channel = dal.GetUserBasedOnRole(RoleId, ChannelId);
                    if (error == null)
                    {
                        return channel;
                    }
                    else
                    {
                        throw error;
                    }
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return channel;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<RackRateSearchResult> GetCreateBaseRackRate(string ArnNo, string Channel, string DistributorCategory, string Status, string MasterQueueStatus, string ARNName, string SearchFilter, string MemoLevel)
        {
            List<RackRateSearchResult> result = new List<RackRateSearchResult>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    result = dal.GetCreateBaseRackRate(ArnNo, Channel, DistributorCategory, Status, MasterQueueStatus, ARNName, SearchFilter, Convert.ToInt32(HttpContext.Current.Session["userid"]), MemoLevel, out error);
                    if (error == null)
                        return result;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return result;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetPaymentList(Int64 PaymentMemoID)
        {
            List<PaymentList> payment = new List<PaymentList>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    payment = dal.GetPaymentList(PaymentMemoID, out error);
                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetPaymentListWithInactive(Int64 PaymentMemoID)
        {
            List<PaymentList> payment = new List<PaymentList>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    payment = dal.GetPaymentListWithInactive(PaymentMemoID, out error);
                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetAuditPaymentList(Int64 PaymentMemoID, Int64 SchemeID)
        {
            List<PaymentList> payment = new List<PaymentList>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    payment = dal.GetAuditPaymentList(PaymentMemoID, SchemeID, out error);
                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentDetails> GetAuditPaymentDetails(Int64 PaymentMemoID, Int64 SchemeId)
        {
            List<PaymentDetails> payment = new List<PaymentDetails>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    payment = dal.GetAuditPaymentDetails(PaymentMemoID, SchemeId, out error);
                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetTieUpAuditPaymentList(Int64 PaymentMemoID, string Scheme, string Category, string ARN, string DateFrom, string DateTo)
        {
            List<PaymentList> payment = new List<PaymentList>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    payment = dal.GetTieUpAuditPaymentList(PaymentMemoID, Scheme, Category, ARN, DateFrom, DateTo, out error);
                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentDetails> GetTieUpAuditPaymentDetails(Int64 PaymentMemoID, string Scheme, string Category, string ARN, string DateFrom, string DateTo)
        {
            List<PaymentDetails> payment = new List<PaymentDetails>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    payment = dal.GetTieUpAuditPaymentDetails(PaymentMemoID, Scheme, Category, ARN, DateFrom, DateTo, out error);
                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetTieUpARNCategory(Int64 PaymentMemoID)
        {
            List<PaymentList> payment = new List<PaymentList>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    return dal.GetTieUpARNCategory(PaymentMemoID);
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetPaymentListTieUp(Int64 PaymentListID)
        {
            List<PaymentList> payment = new List<PaymentList>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    payment = dal.GetPaymentListTieUp(PaymentListID, out error);
                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetPaymentListSIP(Int64 PaymentListID)
        {
            List<PaymentList> payment = new List<PaymentList>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    payment = dal.GetPaymentListSIP(PaymentListID, out error);
                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetPaymentListAll(Int64 PaymentListID)
        {
            List<PaymentList> payment = new List<PaymentList>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    payment = dal.GetPaymentListAll(PaymentListID, out error);
                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetPaymentListForModifyValidity(Int64 PaymentListID)
        {
            List<PaymentList> payment = new List<PaymentList>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    payment = dal.GetPaymentListForModifyValidity(PaymentListID, out error);
                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentDetails> GetPaymentDetails(Int64 PaymentMemoID)
        {
            List<PaymentDetails> payment = new List<PaymentDetails>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    payment = dal.GetPaymentDetails(PaymentMemoID, out error);
                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentMemo> GetPaymentMemo(Int64 PaymentMemoID)
        {
            List<PaymentMemo> payment = new List<PaymentMemo>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    payment = dal.GetPaymentMemo(PaymentMemoID, out error);
                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public PaymentList GetPaymentListByScheme(Int64 SchemeID, string ARN, string DistributorCategory)
        {
            PaymentList payment = new PaymentList();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    payment = dal.GetPaymentListByScheme(SchemeID, ARN, DistributorCategory, out error);
                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public PaymentList GetAvailableSchemeTieup(Int64 SchemeID, string ARN, string DistributorCategory, string DateFrom, string DateTo)
        {
            PaymentList payment = new PaymentList();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    payment = dal.GetAvailableSchemeTieup(Convert.ToString(SchemeID), ARN, DistributorCategory, DateFrom, DateTo, out error);
                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public PaymentList GetPaymentListForTieupOnCreate(Int64 SchemeID, string ARN, string DistributorCategory, string DateFrom, string DateTo)
        {
            PaymentList payment = new PaymentList();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    payment = dal.GetPaymentListForTieupOnCreate(Convert.ToString(SchemeID), ARN, DistributorCategory, DateFrom, DateTo, out error);
                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentList> GetPaymentListByARN(string ARN, string DistributorCategory, string DateFrom, string DateTo)
        {
            List<PaymentList> payment = new List<PaymentList>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    payment = dal.GetPaymentListByARN(ARN, DistributorCategory, DateFrom, DateTo, out error);
                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PaymentDetails> GetPaymentDetailsByScheme(Int64 schemeID, Int64 PaymentMemoID)
        {
            List<PaymentDetails> payment = new List<PaymentDetails>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    payment = dal.GetPaymentDetailsByScheme(schemeID, PaymentMemoID, out error);
                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string MemoExists(string ArnNo, string Channel, string DistributorCategory, string schemeid, string DateFrom, string DateTo, string MemoId, string TransactionType, string MemoType)
        {
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    return dal.MemoExists(ArnNo, Channel, DistributorCategory, schemeid, DateFrom, DateTo, MemoId, TransactionType, MemoType, Constants.SpGetMemoExists);
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return "";
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string SIPMemoExists(string ArnNo, string DistributorCategory, string schemeid, string schemeCategoryid, string DateFrom, string DateTo, string MemoId, string TransactionType)
        {
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    return dal.SIPMemoExists(ArnNo, DistributorCategory, schemeid, schemeCategoryid, DateFrom, DateTo, MemoId, TransactionType, Constants.SpGetSIPMemoExists); ;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return "";
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool UpdateAssignToRole(string MemoNumber, string AssignTo, string AssignToBH)
        {
            Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    string[] memoids = MemoNumber.Split(',');
                    string[] BHids = AssignToBH.Split(',');
                    foreach (string memoId in memoids)
                    {
                        if (!ValidateReview(Convert.ToInt32(memoId), "Reviewed", 1))
                        {
                            Exception ex = new Exception("Created User is not allowed to Review");
                            throw ex;
                        }
                        //if (!RackRateValidate(Convert.ToInt32(memoId), "Reviewed"))
                        //{
                        //    Exception ex = new Exception("Created User is not allowed to Review");
                        //    throw ex;
                        //}
                        BaseRackRateDAL dal = new BaseRackRateDAL();
                        result = dal.UpdateAssignToRole(MemoNumber, AssignTo, Convert.ToString(HttpContext.Current.Session["userid"]), Constants.SpUpdateAssignToRole);

                        string DeleteListQuery = "";
                        DeleteListQuery += "DELETE FROM PaymentMemoAssignedTo WHERE PaymentMemoId = " + memoId;
                        dal.ExecuteQuery(DeleteListQuery);

                        string InsertListQuery = "";
                        foreach (string bh in BHids)
                        {
                            if (bh != "")
                            {
                                InsertListQuery += "INSERT INTO [dbo].[PaymentMemoAssignedTo]" +
                                                           "([PaymentMemoId]" +
                                                           ",[AssignedToUserId]" +
                                                           ",[RoleId]" +
                                                           ",[ApprovedStatus]" +
                                                           ",[IsActive]" +
                                                           ",[CreatedBy]" +
                                                           ",[CreatedDate]" +
                                                           ",[ModifiedBy]" +
                                                           ",[ModifiedDate])" +
                                                     " VALUES " +
                                                           "('" + memoId + "'" +
                                                           ",'" + bh + "'" +
                                                           ",6" +
                                                           ",''" +
                                                           ",1" +
                                                           "," + UserId +
                                                           ",GETDATE()" +
                                                            "," + UserId +
                                                           ",GETDATE())";

                            }
                        }
                        if (InsertListQuery != "")
                        {
                            dal.ExecuteQuery(InsertListQuery);
                        }

                        if (Convert.ToInt32(AssignTo) > 6)
                        {
                            List<PaymentList> List = new List<PaymentList>();
                            List = dal.GetCategoryArnforMemo(memoId);

                            List<string> Distributors = new List<string>();

                            List<string> DistributorId = new List<string>();

                            List<string> Arn = new List<string>();

                            foreach (PaymentList plist in List)
                            {
                                string[] DistributorCategory = Convert.ToString(plist.DistributorCategoryName).Split(',');
                                string[] DistributorCategoryIds = Convert.ToString(plist.DistributorCategoryId).Split(',');
                                foreach (string DistributorCategoryId in DistributorCategory)
                                {
                                    if (DistributorCategoryId != "")
                                    {
                                        if (!Distributors.Contains(DistributorCategoryId))
                                        {
                                            Distributors.Add(DistributorCategoryId);
                                           
                                        }
                                    }
                                }

                                foreach (string DistributorCategoryId in DistributorCategoryIds)
                                {
                                    if (DistributorCategoryId != "")
                                    {
                                        if (!Distributors.Contains(DistributorCategoryId))
                                        {
                                            DistributorId.Add(DistributorCategoryId);
                                        }
                                    }
                                }

                                string[] ArnNo = Convert.ToString(plist.ARNNO).Split(',');
                                for (int i = 0; i < ArnNo.Count(); i++)
                                {
                                    if (ArnNo[i] != "")
                                    {
                                        if (!Distributors.Contains(ArnNo[i]))
                                        {
                                            Distributors.Add(ArnNo[i]);
                                            Arn.Add(ArnNo[i]);
                                        }
                                    }
                                }

                            }

                            string Distributor_Arn = string.Join(",", Distributors.ToArray());

                            SendSkippingNotification(memoId, "Skipped", String.Join(",", DistributorId.ToArray()).ToString(), String.Join(",", Arn.ToArray()).ToString(), String.Join(",", Distributors.ToArray()).ToString());

                            SendNotification(memoId, "Approval", Distributor_Arn, AssignTo);

                           
                        }

                    }
                    return true;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return result;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        private void SendSkippingNotification(string PaymentMemoId, string MemoStatus, string DistributorId, string Arn, string Distributor_Arn)
        {
            try
            {
                Exception error = null;
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                BaseRackRateDAL dal = new BaseRackRateDAL();

                List<string> channelid = new List<string>();
                channelid = GetChannelForARNAndDistributorCategory(Arn, DistributorId);

                List<AssignToUser> assuser = new List<AssignToUser>();
                assuser = GetUserBasedOnRole(6, String.Join(",", channelid.ToArray()).ToString());

               // List<string> UserMail = new List<string>();
                foreach(AssignToUser obj in assuser)
                {
                   // UserMail.Add(obj.Email);

                    string EmailTo = obj.Email;

                    string subject = "";
                    string Body = "";

                    List<NotificationMailContent> MailContent = new List<NotificationMailContent>();
                    MailContent = dal.GetNotificationMailContent(MemoStatus, out error);

                    if (MailContent.Count > 0)
                    {
                        subject = MailContent.First().Subject;
                        Body = MailContent.First().Body;

                        Body = Body.Replace("###MemoNo###", PaymentMemoId);
                        Body = Body.Replace("###Distributor###", Distributor_Arn);
                        Body = Body.Replace("###User###", dal.GetUserBasedOnUserID(UserId));

                        #region SendEmail
                        Utility util = new Utility();
                        Email em = new Email();
                        em.Emailto = EmailTo;
                        em.EmailCC = "";
                        em.EmailBCC = "";
                        em.Subject = subject;
                        em.Body = Body;
                        em.attach = "";
                        em.Emailfrom = "brokerageonline3@gmail.com";
                        util.SendEmail(em);
                        #endregion
                    }
                }
               


            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool UpdateBatchStatus(string MemoNumber, string Status, string Remarks, string memotypeid)
        {
            string UserId = Convert.ToString(HttpContext.Current.Session["userid"]);
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    string[] memoids = MemoNumber.Split(',');
                    foreach (string memoId in memoids)
                    {
                        //if (ViewAction(memoId, Status))
                        //{
                        if (Status == "Reviewed")
                        {
                            if (!ValidateReview(Convert.ToInt32(memoId), Status, Convert.ToInt32(memotypeid)))
                            {
                                Exception ex = new Exception("Created User is not allowed to Review");
                                throw ex;
                            }
                            //if (!RackRateValidate(Convert.ToInt32(memoId), Status))
                            //{
                            //    Exception ex = new Exception("Created User is not allowed to Review");
                            //    throw ex;
                            //}
                        }
                        BaseRackRateDAL dal = new BaseRackRateDAL();
                        bool val = dal.UpdateBatchStatus(memoId, Status, Remarks, Convert.ToString(HttpContext.Current.Session["userid"]), memotypeid, Constants.SpUpdateBatchStatus);

                        InsUpdPaymentMemoRemarks(Remarks, memoId, Status);

                        if (Status == "Approved")
                        {
                            dal = new BaseRackRateDAL();
                            dal.GenereateMemoNumber(memoId, Status, "", UserId, memotypeid, Constants.SpUpdateBatchStatus);
                        }
                        if (Status != "Discarded")
                            dal.UpdatePaymentMemoAssignTo(memoId, UserId, Status, Constants.SpUpdatePaymentMemoAssignTo);
                        if (Status == "Active")
                        {
                            Utility util = new Utility();
                            string fileUrl = "";
                            BaseRackRateDAL basedal = new BaseRackRateDAL();
                            string PaymentMemoNumber = basedal.GetPaymentMemoNumber(memoId);
                            string targetFolder = ConfigurationManager.AppSettings["CAMSTargetFolder"].ToString() + PaymentMemoNumber + ".pdf";
                            string Host = HttpContext.Current.Request.Url.Host;
                            if (memotypeid == "1")
                            {
                                fileUrl = "http://" + GetReportURLHostAndPort() + "/pentaho/content/reporting/execute/DSP_BlackRock/CAMS_BRRnull?solution=DSP_BlackRock&path=&name=CAMS_BRR.prpt&Memonumber_P=###MemoNumber###&output-target=pageable%2Fpdf&userid=joe&password=password";
                                fileUrl = fileUrl.Replace("###MemoNumber###", PaymentMemoNumber);
                                util.DownloadFileFromURL(fileUrl, targetFolder);
                            }
                            if (memotypeid == "2")
                            {
                                fileUrl = "http://" + GetReportURLHostAndPort() + "/pentaho/content/reporting/execute/DSP_BlackRock/CAMS_TieUpnull?solution=DSP_BlackRock&path=&name=CAMS_TieUp.prpt&Memonumber_P=###MemoNumber###&output-target=pageable%2Fpdf&userid=joe&password=password";
                                fileUrl = fileUrl.Replace("###MemoNumber###", PaymentMemoNumber);
                                util.DownloadFileFromURL(fileUrl, targetFolder);
                            }
                        }

                        if (Status == "Rejected" || Status == "Discarded" || Status == "Approved")
                        {
                            List<PaymentList> List = new List<PaymentList>();
                            List = dal.GetCategoryArnforMemo(memoId);

                            List<string> Distributors = new List<string>();
                            foreach (PaymentList plist in List)
                            {
                                string[] DistributorCategory = Convert.ToString(plist.DistributorCategoryName).Split(',');
                                foreach (string DistributorCategoryId in DistributorCategory)
                                {
                                    if (DistributorCategoryId != "")
                                    {
                                        if (!Distributors.Contains(DistributorCategoryId))
                                            Distributors.Add(DistributorCategoryId);
                                    }
                                }

                                string[] ArnNo = Convert.ToString(plist.ARNNO).Split(',');
                                for (int i = 0; i < ArnNo.Count(); i++)
                                {
                                    if (ArnNo[i] != "")
                                    {
                                        if (!Distributors.Contains(ArnNo[i]))
                                            Distributors.Add(ArnNo[i]);
                                    }
                                }

                            }

                            string Distributor_Arn = string.Join(",", Distributors.ToArray());
                            Status = Status == "Approved" ? "Approval" : Status;
                            SendNotification(memoId, Status, Distributor_Arn, "");
                        }
                    }
                    return true;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return result;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void InsUpdPaymentMemoRemarks(string Remarks, string PaymentMemoId, string MemoStatus)
        {
            bool result = true;
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    result = dal.InsUpdPaymentMemoRemarks(Remarks, PaymentMemoId, MemoStatus, Convert.ToString(HttpContext.Current.Session["userid"]), Constants.SpInsUpdPaymentMemoRemarks);
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool ViewAction(string MemoId, string currentScreen)
        {
            try
            {
                AutoResetEvent syncEvent = new AutoResetEvent(false);
                string UserID = Convert.ToString(HttpContext.Current.Session["userid"]);
                IDictionary<string, object> inputs = new Dictionary<string, object>();
                inputs.Add("PaymentMemoID", Convert.ToInt32(MemoId));
                inputs.Add("UserID", Convert.ToInt32(UserID));
                WorkflowApplication wfApp = new WorkflowApplication(new BaseRackRateView(), inputs);

                bool result = false;

                wfApp.Completed = delegate(WorkflowApplicationCompletedEventArgs e)
                {
                    syncEvent.Set();
                    result = (bool)e.Outputs["EnableAction"];
                };

                wfApp.Run();

                syncEvent.WaitOne();

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool RackRateValidate(Int32 PaymentMemoID, string Status)
        {
            try
            {
                AutoResetEvent syncEvent = new AutoResetEvent(false);
                string UserID = Convert.ToString(HttpContext.Current.Session["userid"]);
                IDictionary<string, object> inputs = new Dictionary<string, object>();
                inputs.Add("Status", Convert.ToString(Status));
                inputs.Add("UserID", Convert.ToInt32(UserID));
                inputs.Add("PaymentMemoID", Convert.ToInt32(PaymentMemoID));


                WorkflowApplication wfApp = new WorkflowApplication(new RackRateValidation(), inputs);

                bool result = false;
                wfApp.Completed = delegate(WorkflowApplicationCompletedEventArgs e)
                {
                    syncEvent.Set();
                    result = (bool)e.Outputs["Allow"];
                };

                wfApp.Run();

                syncEvent.WaitOne();

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Validate and save Rejected Memos
        /// </summary>
        /// <param name="Memo"></param>
        /// <param name="List"></param>
        /// <param name="Details"></param>
        /// <returns></returns>
        public bool SaveRejectedMemo(PaymentMemo Memo, List<PaymentList> List, List<PaymentDetails> Details, string updateStatus)
        {
            try
            {
                bool ischanged = false;
                if (Memo.PaymentMemoId == "" || Memo.PaymentMemoId == "0")
                {
                    Exception ex = new Exception("Invalid Memo ID");
                    throw ex;
                }
                else
                {
                    List<PaymentList> payDBlist = new List<PaymentList>();
                    payDBlist = GetPaymentList(Convert.ToInt64(Memo.PaymentMemoId));

                    List<PaymentDetails> payDBdetails = new List<PaymentDetails>();
                    payDBdetails = GetPaymentDetails(Convert.ToInt64(Memo.PaymentMemoId));

                    if (payDBlist.Count < List.Count)
                    {
                        ischanged = true;
                        UpdateRackRate(Memo, List, Details);
                        return true;
                    }
                    else
                    {
                        if (payDBdetails.Count < Details.Count)
                        {
                            ischanged = true;
                            UpdateRackRate(Memo, List, Details);
                            return true;
                        }
                        else
                        {
                            if (payDBdetails.Count == Details.Count)
                            {
                                Utility util = new Utility();
                                //ischanged = util.CompareList(payDBdetails, Details);
                                foreach (PaymentDetails dbdetail in payDBdetails)
                                {
                                    foreach (PaymentDetails detail in Details)
                                    {
                                        if (dbdetail.BrokerageTypeId == detail.BrokerageTypeId && dbdetail.SchemeId == detail.SchemeId && dbdetail.PeriodStart == detail.PeriodStart && dbdetail.PeriodEnd == detail.PeriodEnd)
                                        {
                                            if (dbdetail.AdditionalIncentives != detail.AdditionalIncentives || dbdetail.LumpSumGreaterTieup != detail.LumpSumGreaterTieup ||
                                                dbdetail.BaseUpfront != detail.BaseUpfront || dbdetail.LumpSumLessTieup != detail.LumpSumLessTieup ||
                                                dbdetail.SIPSlabGreater != detail.SIPSlabGreater || dbdetail.SIPSlabLess != detail.SIPSlabLess ||
                                                dbdetail.SlabTotal != detail.SlabTotal || dbdetail.LumpSumGreater != detail.LumpSumGreater)
                                            {
                                                ischanged = true;
                                            }
                                        }
                                    }
                                }
                                if (ischanged == true)
                                {
                                    UpdateRackRate(Memo, List, Details);
                                    return true;
                                }
                                //else
                                //{
                                //    foreach (PaymentList dbli in payDBlist)
                                //    {
                                //        foreach (PaymentList li in List)
                                //        {
                                //            if (dbli.SchemeId == li.SchemeId)
                                //            {
                                //                if(dbli.DateFrom !=li.DateFrom || )
                                //            }
                                //        }
                                //    }
                                //}

                            }
                        }
                    }

                    //var q = List.Where(item => payDBlist.Select(item2 => item2).Contains(item));

                    if (ischanged == false)
                    {
                        if (updateStatus == "Initiated")
                        {
                            Exception ex = new Exception("Kindly Modify the Rejected memo before Resubmitting");
                            throw ex;
                        }
                        else
                        {
                            Exception ex = new Exception("Kindly Modify the Rejected memo before Resubmitting");
                            throw ex;
                        }
                    }
                }
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool SaveBaseRackRate(PaymentMemo Memo, List<PaymentList> List, List<PaymentDetails> Details)
        {
            try
            {
                if (Memo.MemoStatus == "Reviewed")
                {
                    if (!ValidateReview(Convert.ToInt32(Memo.PaymentMemoId), Memo.MemoStatus, Convert.ToInt32(Memo.MemoTypeId)))
                    {
                        Exception ex = new Exception("Created User is not allowed to Review");
                        throw ex;
                    }
                    //if (!RackRateValidate(Convert.ToInt32(Memo.PaymentMemoId), Memo.MemoStatus))
                    //{
                    //    Exception ex = new Exception("Created User is not allowed to Review");
                    //    throw ex;
                    //}
                }
                if (Memo.PaymentMemoId == "" || Memo.PaymentMemoId == "0")
                {
                    InsertRackRate(Memo, List, Details);
                }
                else
                {
                    UpdateRackRate(Memo, List, Details);

                    if (Memo.MemoStatus == "Rejected" || Memo.MemoStatus == "Discarded")
                        sendNotificationOnSave(Memo, List, Details, "");

                    string param = HttpContext.Current.Request.UrlReferrer.Query;
                    string[] strarr = param.Split(new string[] { "ptype=" }, StringSplitOptions.None);
                    if (strarr.Length >= 2)
                    {
                        if (strarr[1] == "mq")
                        {
                            sendNotificationOnSave(Memo, List, Details, "mq");
                        }
                    }
                }
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool ValidateReview(Int32 paymentMemoId, string Status, Int32 MemoTypeId)
        {
            bool allow = true;
            int UserID = Convert.ToInt32(HttpContext.Current.Session["userid"]);
            if (Status == "Reviewed")
            {
                ViewAction MemoDetail = new ViewAction();
                MemoDetail = GetViewAction(paymentMemoId, MemoTypeId);
                if (MemoDetail.CurrentUserRole == 3 || MemoDetail.CurrentUserRole == 10 || MemoDetail.CurrentUserRole == 6 || MemoDetail.CurrentUserRole == 7)
                {
                    if (MemoDetail.CurrentUserRole == 3)
                    {
                        if (MemoDetail.ModifiedByRole == MemoDetail.CurrentUserRole)
                        {
                            allow = false;
                        }
                        else
                        {
                            allow = true;
                        }
                    }
                    else
                    {
                        allow = true;
                    }
                }
                else
                {
                    if (MemoDetail.CreatedBy == UserID)
                    {
                        allow = false;
                    }
                    else
                    {
                        allow = true;
                    }
                }
            }
            else
            {
                allow = true;
            }

            return allow;
        }

        private void sendNotificationOnSave(PaymentMemo Memo, List<PaymentList> List, List<PaymentDetails> Details, string Status)
        {

            List<string> Distributors = new List<string>();
            Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
            foreach (PaymentList plist in List)
            {
                string[] DistributorCategory = Convert.ToString(plist.DistributorCategoryName).Split(',');
                foreach (string DistributorCategoryId in DistributorCategory)
                {
                    if (DistributorCategoryId != "")
                    {
                        if (!Distributors.Contains(DistributorCategoryId))
                            Distributors.Add(DistributorCategoryId);
                    }
                }

                string[] ArnNo = Convert.ToString(plist.ARNNO).Split(',');
                for (int i = 0; i < ArnNo.Count(); i++)
                {
                    if (ArnNo[i] != "")
                    {
                        if (!Distributors.Contains(ArnNo[i]))
                            Distributors.Add(ArnNo[i]);
                    }
                }

            }

            string Distributor_Arn = string.Join(",", Distributors.ToArray());

            if (Memo.MemoStatus == "Discarded" || Memo.MemoStatus == "Rejected")
            {
                SendNotification(Memo.PaymentMemoId, Memo.MemoStatus, Distributor_Arn, "");
            }
            else if (Memo.MemoStatus == "Approved")
            {
                if (dal.GetRoleIdBasedOnUserID(UserId) < 7)
                {
                    SendNotification(Memo.PaymentMemoId, "Approval", Distributor_Arn, "");
                }
            }
            else
            {
                if (Memo.IsSaved == false)
                {
                    SendNotification(Memo.PaymentMemoId, "Skipped", Distributor_Arn, "");
                }
            }
        }

        private void SendNotification(string PaymentMemoId, string MemoStatus, string Distributor_Arn, string assignTo)
        {
            try
            {
                Exception error = null;
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                BaseRackRateDAL dal = new BaseRackRateDAL();



                string EmailTo = "";
                if (MemoStatus == "Skipped")
                {
                    EmailTo = dal.GetSkippedUsers(PaymentMemoId);
                }
                else
                {
                    EmailTo = dal.GetEmailofMemoModifiedUsers(PaymentMemoId);
                }

                string subject = "";
                string Body = "";
                if (EmailTo != "")
                {
                    List<NotificationMailContent> MailContent = new List<NotificationMailContent>();
                    MailContent = dal.GetNotificationMailContent(MemoStatus, out error);

                    if (MailContent.Count > 0)
                    {
                        subject = MailContent.First().Subject;
                        Body = MailContent.First().Body;

                        Body = Body.Replace("###MemoNo###", PaymentMemoId);
                        Body = Body.Replace("###Distributor###", Distributor_Arn);
                        Body = Body.Replace("###User###", dal.GetUserBasedOnUserID(UserId));

                        if (MemoStatus == "Approval")
                            Body = Body.Replace("###ForwardedTo###", dal.GetMemoForwardedToUserName(assignTo));

                        #region SendEmail
                        Utility util = new Utility();
                        Email em = new Email();
                        em.Emailto = EmailTo;
                        em.EmailCC = "";
                        em.EmailBCC = "";
                        em.Subject = subject;
                        em.Body = Body;
                        em.attach = "";
                        em.Emailfrom = "brokerageonline3@gmail.com";
                        util.SendEmail(em);
                        #endregion
                    }
                }

            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Insert Base Rack Rate
        /// </summary>
        /// <param name="Memo"></param>
        /// <param name="List"></param>
        /// <param name="Details"></param>
        private void InsertRackRate(PaymentMemo Memo, List<PaymentList> List, List<PaymentDetails> Details)
        {
            try
            {
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                if (UserId != 0)
                {
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    /////////////////////////////////////////////////////////////
                    ///////////Query to Insert Payment Memo//////////////////////
                    /////////////////////////////////////////////////////////////

                    string PaymentMemoInsertQuery = "INSERT INTO [PaymentMemo] " +
                                                    "([BranchId],[ZoneId],[MemoTypeId],[PaymentAmount],[DateFrom],[DateTo],[ApplicableTo],[TransactionType]," +
                                                    "[SlabType],[SlabAmount],[SlabCondition],[Remarks],[Comments],[MemoStatus],[CreatedBy],[CreatedDate],[ModifiedBy],[ModifiedDate], [IsActive],[TransactionTypeOthers],[CopiedMemoID],[SIPNotes],[IsCloseEnded],[PaymentMemoLinkId],[LumpsumSIPTypeId],[IsSaved]) VALUES(" +
                                                    "@BranchId, @ZoneId, @MemoTypeId, @PaymentAmount, @DateFrom, @DateTo, @ApplicableTo, @TransactionType," +
                                                    "@SlabType, @SlabAmount, @SlabCondition, @Remarks, @Comments,@MemoStatus,@CreatedBy, @CreatedDate, @ModifiedBy,@ModifiedDate,@IsActive,@TransactionTypeOthers,@CopiedMemoID,@SIPNotes,@IsCloseEnded,@PaymentMemoLinkId,@LumpsumSIPTypeId,@IsSaved)" +
                                                    "  SELECT SCOPE_IDENTITY()";
                    Int64 PaymentMemoID = dal.SavePaymentMemo(Memo, UserId, PaymentMemoInsertQuery);

                    ////Insert List And Details////
                    InsertListDetails(PaymentMemoID, List, Details);

                    if (Memo.MemoStatus == "Active")
                    {
                        UpdateBatchStatus(PaymentMemoID.ToString(), "Active", Memo.Remarks, "1");
                    }
                    else
                    {
                        InsUpdPaymentMemoRemarks(Memo.Remarks, Convert.ToString(PaymentMemoID), Memo.MemoStatus);
                    }
                }
                else
                {
                    Exception ex = new Exception("Invalid User ID. Please Login Again");
                    throw ex;
                }
            }

            catch (Exception)
            {

                throw;
            }
        }

        private void InsertListDetails(Int64 PaymentMemoID, List<PaymentList> List, List<PaymentDetails> Details)
        {
            try
            {
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                /////////////////////////////////////////////////////////////
                ///////////Query to Insert Payment List//////////////////////
                /////////////////////////////////////////////////////////////
                string PaymentListQuery = "";
                foreach (PaymentList plist in List)
                {
                    string[] DistributorCategory = Convert.ToString(plist.DistributorCategoryId).Split(',');
                    foreach (string DistributorCategoryId in DistributorCategory)
                    {
                        if (DistributorCategoryId != "")
                        {
                            PaymentListQuery += "INSERT INTO [PaymentList] " +
                                                            "([SchemeId],[SchemeCategoryId],[DistributorCategoryId],[PaymentMemoId],[PaymentType],[DateFrom]," +
                                                            "[DateTo],[SlabType],[SlabAmount],[PaymentBasis],[Target],[TargetPeriod],[InterestRate],[InstalmentCondition],[InstallmentRangeFrom],[InstallmentRangeTo]," +
                                                            "[TenureCondition],[TenureMonths],[UpfrontPaymentType],[UpfrontValue],[Calculation],[Clawback],[SIPIncentiveRemarks],[SIPRowId],[FreeTextField1],[FreeTextField2],[Onwards],[CreatedBy],[CreatedDate],[ModifiedBy],[ModifiedDate],[IsActive],[Folio],[IsUpdated],[SIPSlab]) VALUES (" +
                                                            "'" + plist.SchemeId + "','" + plist.SchemeCategoryId + "','" + DistributorCategoryId + "','" + PaymentMemoID + "' , '" + plist.PaymentType + "',Convert(date, '" + plist.DateFrom + "' , 3), " +
                                                            "Convert(date, '" + plist.DateTo + "' , 3)" +
                                                            ",'" + plist.SlabType + "','" + plist.SlabAmount + "','" + plist.PaymentBasis + "','" + plist.Target + "', '" + plist.TargetPeriod + "','" + plist.InterestRate + "',N'" + plist.InstallmentCondition + "','" + plist.InstallmentRangeFrom + "','" + plist.InstallmentRangeTo + "',N'" +
                                                            plist.TenureCondition + "','" + plist.TenureMonths + "','" + plist.UpfrontPaymentType + "','" + plist.UpfrontValue + "','" + plist.Calculation + "','" + plist.Clawback + "','" + plist.SIPIncentiveRemarks + "','" + plist.SIPRowId + "','" + plist.FreeTextField1 + "','" + plist.FreeTextField2 +
                                                            "','" + plist.Onwards + "','" + UserId + "',GETDATE(), " + UserId + ",GETDATE()," + 1 + ",'" + plist.Folio + "','" + plist.IsUpdated + "','" + plist.SIPSlab + "') ";
                        }
                    }

                    string[] ArnNo = Convert.ToString(plist.ARNNO).Split(',');
                    string[] ArnName = Convert.ToString(plist.ARNName).Split(',');
                    for (int i = 0; i < ArnNo.Count(); i++)
                    {
                        if (ArnNo[i] != "")
                        {
                            var arnNam=string.Empty;
                            arnNam = ArnName.Length-1 >= i ? ArnName[i] : null;
                            PaymentListQuery += "INSERT INTO [PaymentList] " +
                                                            "([SchemeId],[SchemeCategoryId],[PaymentMemoId],[PaymentType],[ARNNO],[ARNName],[DateFrom]," +
                                                            "[DateTo],[SlabType],[SlabAmount],[PaymentBasis],[Target],[TargetPeriod],[InterestRate],[InstalmentCondition],[InstallmentRangeFrom],[InstallmentRangeTo]," +
                                                            "[TenureCondition],[TenureMonths],[UpfrontPaymentType],[UpfrontValue],[Calculation],[Clawback],[SIPIncentiveRemarks],[SIPRowId],[FreeTextField1],[FreeTextField2],[Onwards],[CreatedBy],[CreatedDate],[ModifiedBy],[ModifiedDate],[IsActive],[Folio],[IsUpdated],[SIPSlab]) VALUES (" +
                                                             "'" + plist.SchemeId + "','" + plist.SchemeCategoryId + "','" + PaymentMemoID + "' , '" + plist.PaymentType + "','" + ArnNo[i] + "','" + arnNam + "', Convert(date, '" + plist.DateFrom + "' , 3), " +
                                                            " Convert(date, '" + plist.DateTo + "' , 3) " +
                                                            ",'" + plist.SlabType + "','" + plist.SlabAmount + "','" + plist.PaymentBasis + "','" + plist.Target + "', '" + plist.TargetPeriod + "','" + plist.InterestRate + "',N'" + plist.InstallmentCondition + "','" + plist.InstallmentRangeFrom + "','" + plist.InstallmentRangeTo + "',N'" +
                                                            plist.TenureCondition + "','" + plist.TenureMonths + "','" + plist.UpfrontPaymentType + "','" + plist.UpfrontValue + "','" + plist.Calculation + "','" + plist.Clawback + "','" + plist.SIPIncentiveRemarks + "','" + plist.SIPRowId + "','" + plist.FreeTextField1 + "','" + plist.FreeTextField2 +
                                                            "','" + plist.Onwards + "','" + UserId + "',GETDATE(), " + UserId + ",GETDATE()," + 1 + ",'" + plist.Folio + "','" + plist.IsUpdated + "','" + plist.SIPSlab + "') ";
                        }
                    }
                }
                dal.ExecuteQuery(PaymentListQuery);

                /////////////////////////////////////////////////////////////
                ///////////Query to Insert Payment Details///////////////////
                /////////////////////////////////////////////////////////////
                string PaymentDetailsQuery = "";
                foreach (PaymentDetails det in Details)
                {

                    PaymentDetailsQuery += " INSERT INTO [PaymentDetails] " +
                                            "([PaymentMemoId],[SchemeId],[BrokerageTypeId],[LumpSumLessTieup],[LumpSumGreaterTieup],[BaseUpfront],[AdditionalIncentive],[Total],[SIPSlabLess],[SIPSlabGreater],[PeriodType]," +
                                            "[PeriodStart],[PeriodEnd],[SlabTotal],[CreatedBy],[CreatedDate],[ModifiedBy],[ModifiedDate],[IsActive],[IsSlabLess],[LumpSumGreater],[LumpSumGreaterTotal],[IsCopied]) VALUES(" +
                                             PaymentMemoID + ", " + det.SchemeId + ", " + det.BrokerageTypeId + "," + det.LumpSumLessTieup + ", " + det.LumpSumGreaterTieup + ", " + det.BaseUpfront + "," +
                                             det.AdditionalIncentives + "," + det.Total + ",'" + det.SIPSlabLess + "','" + det.SIPSlabGreater + "'," + det.PeriodType + "," +
                                             det.PeriodStart + "," + det.PeriodEnd + "," + det.SlabTotal + "," + UserId + ", GETDATE() ," + UserId + ",GETDATE()," + 1 + "," +
                                             det.IsSlabLess + ",'" + det.LumpSumGreater + "','" + det.LumpSumGreaterTotal + "'," + Convert.ToString(det.IsCopied == null ? 0 : Convert.ToInt16(det.IsCopied)) + ")";
                }
                if (PaymentDetailsQuery != "")
                    dal.ExecuteQuery(PaymentDetailsQuery);
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Update Base Rack Rate
        /// </summary>
        /// <param name="Memo"></param>
        /// <param name="List"></param>
        /// <param name="Details"></param>
        private void UpdateRackRate(PaymentMemo Memo, List<PaymentList> List, List<PaymentDetails> Details)
        {
            try
            {
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                if (UserId != 0)
                {
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    string Status = Memo.MemoStatus;

                    InsUpdPaymentMemoRemarks(Memo.Remarks, Memo.PaymentMemoId, Memo.MemoStatus);
                    /////////////////////////////////////////////////////////////
                    ///////////Query to Insert Payment Memo//////////////////////
                    /////////////////////////////////////////////////////////////

                    Memo.Remarks = Memo.Remarks == "" ? "''" : "'" + Memo.Remarks.Replace("'", "`") + "'";
                    Memo.Comments = Memo.Comments == "" ? "''" : "'" + Memo.Comments.Replace("'", "`") + "'";
                    Memo.SIPNotes = Memo.SIPNotes == "" ? "''" : "'" + Memo.SIPNotes.Replace("'", "`") + "'";
                    string PaymentMemoUpdateQuery = "UPDATE [dbo].[PaymentMemo] " +
                                                           " SET [BranchId] = '" + Memo.BranchId + "'" +
                                                             " ,[ZoneId] = '" + Memo.ZoneId + "'" +
                                                             " ,[MemoTypeId] = '" + Memo.MemoTypeId + "'" +
                                                             " ,[PaymentAmount] = '" + Memo.PaymentAmount + "'" +
                                                             " ,[DateFrom] =  Convert(date, '" + Memo.DateFrom + "' , 3) " +
                                                             " ,[DateTo] = Convert(date, '" + Memo.DateTo + "' , 3)" +
                                                             " ,[ApplicableTo] = '" + Memo.ApplicableTo + "'" +
                                                             " ,[TransactionType] = '" + Memo.TransactionType + "'" +
                                                             " ,[SlabType] = '" + Memo.SlabType + "'" +
                                                             " ,[SlabAmount] = '" + Memo.SlabAmount + "'" +
                                                             " ,[SlabCondition] = '" + Memo.SlabCondition + "'" +
                                                             " ,[Remarks] = " + Memo.Remarks +
                                                             " ,[Comments] = " + Memo.Comments +
                                                             " ,[MemoStatus] = '" + Status + "'" +
                                                             " ,[IsActive] = '" + 1 + "'" +
                                                             " ,[ModifiedBy] = '" + UserId + "'" +
                                                             " ,[ModifiedDate] = GETDATE()" +
                                                             " ,[TransactionTypeOthers] = '" + Memo.TransactionTypeOthers + "'" +
                                                             " ,[SIPNotes] = '" + Memo.SIPNotes + "'" +
                                                             " ,[IsCloseEnded] = '" + Memo.IsCloseEnded + "'" +
                                                             " ,[LumpsumSIPTypeId] = '" + Memo.LumpsumSIPTypeId + "'" +
                                                             " ,[IsSaved] = '" + Memo.IsSaved + "'" +
                                                         " WHERE PaymentMemoId = '" + Memo.PaymentMemoId + "'";
                    dal.ExecuteQuery(PaymentMemoUpdateQuery);
                    Int64 PaymentMemoID = Convert.ToInt64(Memo.PaymentMemoId); //dal.SavePaymentMemo(Memo, UserId, PaymentMemoInsertQuery);

                    //////DELETE EXISTING LIST AND DETAILS/////
                    string DeleteListQuery = "";
                    DeleteListQuery += "DELETE FROM paymentlist WHERE PaymentMemoId = " + PaymentMemoID;
                    DeleteListQuery += " DELETE FROM paymentdetails WHERE PaymentMemoId = " + PaymentMemoID;
                    dal.ExecuteQuery(DeleteListQuery);
                    ////Insert List And Details////
                    InsertListDetails(PaymentMemoID, List, Details);
                    if (Status != "Discarded")
                        dal.UpdatePaymentMemoAssignTo(PaymentMemoID.ToString(), UserId.ToString(), Status, Constants.SpUpdatePaymentMemoAssignTo);
                    if (Status == "Approved")
                        dal.GenereateMemoNumber(PaymentMemoID.ToString(), Status, "", UserId.ToString(), Memo.MemoTypeId, Constants.SpUpdateBatchStatus);
                }
                else
                {
                    Exception ex = new Exception("Invalid User ID. Please Login Again");
                    throw ex;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void ModifyValidity(List<PaymentList> list)
        {
            try
            {
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                if (UserId != 0)
                {
                    string ModifyValidityQuery = "";
                    foreach (PaymentList li in list)
                    {
                        if (li.PaymentMemoId != null)
                        {
                            if (li.DateTo != null)
                            {
                                ModifyValidityQuery += "IF NOT EXISTS(SELECT 1 FROM PaymentList WHERE PaymentMemoId = " + li.PaymentMemoId +
                                    " AND DateFrom =  Convert(date, '" + li.DateFrom + "' , 3)" + " AND DateTo = Convert(date, '" + li.DateTo + "' , 3)  " +
                                    " AND (distributorcategoryID = '" + li.DistributorCategoryId + "' OR ARNNo = '" + li.ARNNO + "'))" +
                                        "BEGIN " +
                                    // " UPDATE PaymentMemo SET DateFrom	= Convert(date, '" + list.DateFrom + "' , 3) , " +
                                    //"DateTo = Convert(date, '" + list.DateTo + "' , 3) , " +
                                    //"ModifiedBy	= '" + UserId.ToString() + "', " +
                                    //"ModifiedDate= GETDATE(), MemoStatus ='InActive' " +
                                    //"WHERE PaymentMemoId = '" + list.PaymentMemoId +

                                        " UPDATE PaymentList SET DateFrom	=  Convert(date, '" + li.DateFrom + "' , 3) , " +
                                        "DateTo = Convert(date, '" + li.DateTo + "' , 3) , " +
                                        "ModifiedBy	= '" + UserId.ToString() + "', " +
                                        "ModifiedDate= GETDATE(), " +
                                         "IsActive = 1 " +
                                        "WHERE PaymentMemoId = '" + li.PaymentMemoId + "' AND (distributorcategoryID = '" + li.DistributorCategoryId + "' OR ARNNo = '" + li.ARNNO + "') END ";
                            }
                        }
                    }
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    dal.ExecuteQuery(ModifyValidityQuery);

                    //string ModifyMemo = "";
                    //foreach (PaymentList li in list)
                    //{
                    //    if (li.PaymentMemoId != null)
                    //    {
                    //        ModifyMemo += "IF NOT EXISTS(SELECT 1 FROM PaymentList WHERE PaymentMemoId = " + li.PaymentMemoId +
                    //            " AND IsActive = 1)  " +
                    //                "BEGIN " +
                    //             " UPDATE PaymentMemo " +
                    //            "ModifiedBy	= '" + UserId.ToString() + "', " +
                    //            "ModifiedDate= GETDATE(), MemoStatus ='InActive' " +
                    //            "WHERE PaymentMemoId = '" + li.PaymentMemoId +
                    //                "' END ";
                    //    }

                    //}

                    //dal = new BaseRackRateDAL();
                    //dal.ExecuteQuery(ModifyMemo);
                }
            }
            catch (Exception)
            {

                throw;
            }

        }

        public string SendEmailMemo(string strURLFileandPath, string strFileSaveFileandPath, string sendto, string sendcc, int typeval, int ModuleID, string MailStatus, string sendbcc)
        {
            string msg = "No";
            try
            {
                string filename = strFileSaveFileandPath + ".pdf";
                //HttpWebRequest wr = (HttpWebRequest)WebRequest.Create(strURLFileandPath);
                //HttpWebResponse ws = (HttpWebResponse)wr.GetResponse();
                //Stream str = ws.GetResponseStream();
                //byte[] inBuf = new byte[100000];
                //int bytesToRead = (int)inBuf.Length;
                //int bytesRead = 0;
                //while (bytesToRead > 0)
                //{
                //    int n = str.Read(inBuf, bytesRead, bytesToRead);
                //    if (n == 0)
                //        break;
                //    bytesRead += n;
                //    bytesToRead -= n;
                //}
                //FileStream fstr = new FileStream(HttpContext.Current.Server.MapPath(filename), FileMode.OpenOrCreate, FileAccess.Write);
                //fstr.Write(inBuf, 0, bytesRead);
                //str.Close();
                //fstr.Close();


                Exception error = null;
                string subject = "";
                string Body = "";
                string PeriodFromDate = "";
                string PeriodToDate = "";

                List<NotificationMailContent> MailContent = new List<NotificationMailContent>();
                MailContent = dal.GetNotificationMailContent(MailStatus,out error);

                MailStatus = MailStatus.Split('$')[0];

                if (MailStatus == "Distributor Mail BRR")
                {
                    string MemoDate = dal.GetMemoFromAndToDate(strFileSaveFileandPath);
                    string[] Memodate_arr = MemoDate.Split(':');
                    PeriodFromDate = Memodate_arr[0];
                    PeriodToDate = Memodate_arr[1];
                }

                if (MailStatus != string.Empty && (MailContent == null || (MailContent != null && MailContent.Count > 0)))
                {
                    subject = MailContent.First().Subject;
                    Body = MailContent.First().Body;

                    switch (ModuleID)
                    {
                        case 1: // BRR
                            Body = Body.Replace("###FROMDATE###", PeriodFromDate);
                            Body = Body.Replace("###TODATE###", PeriodToDate);
                            break;
                        case 2: // Tie-UP
                            Body = Body.Replace("###FROMDATE###", PeriodFromDate);
                            Body = Body.Replace("###TODATE###", PeriodToDate);
                            break;
                        case 3: // Adhoc
                            Body = Body.Replace("###MEMONO###", strFileSaveFileandPath);
                            break;
                        case 4: // SIP
                            Body = Body.Replace("###FROMDATE###", PeriodFromDate);
                            Body = Body.Replace("###TODATE###", PeriodToDate);
                            break;
                        default:
                            Body = "Dear Sir, <br> Please find the attachement of the " + strFileSaveFileandPath + " Details";
                            subject = strFileSaveFileandPath;
                            break;
                    }
                }
                else
                {
                    Body = "Dear Sir, <br> Please find the attachement of the " + strFileSaveFileandPath + " Details";
                    subject = strFileSaveFileandPath;
                }

                if (typeval == 1 && sendto != "")
                {
                    Email em = new Email();
                    em.Emailto = sendto;
                    em.EmailCC = sendcc;
                    em.EmailBCC = sendbcc;
                    em.Body = Body;
                    em.Subject = subject;
                    em.Emailfrom = ConfigurationManager.AppSettings["NetworkCredentialUserName"].ToString();
                    em.attach = filename;// HttpContext.Current.Server.MapPath(filename);
                    em.FilePath = strURLFileandPath;
                    var stream = new WebClient().OpenRead(strURLFileandPath);
                    Common.Utility.Utility utl = new Common.Utility.Utility();
                    utl.SendEmailOnlineattachement(em, stream);
                }
                else if (typeval == 2)
                {
                    //string filePath = HttpContext.Current.Server.MapPath(filename);
                    ////This is used to get the current response.
                    //HttpResponse res = HttpContext.Current.Response;
                    //res.Clear();
                    //res.AppendHeader("content-disposition", "attachment; filename=" + filePath);
                    //res.ContentType = "application/octet-stream";
                    //res.WriteFile(filePath);
                    //res.Flush();
                    //res.End();
                    ////using (WebClient client = new WebClient())
                    ////{
                    ////    client.DownloadFile(HttpContext.Current.Server.MapPath(filename), filename);
                    ////}

                    //string strURL = filename;
                    //WebClient req = new WebClient();
                    //HttpResponse response = HttpContext.Current.Response;
                    //response.Clear();
                    //response.ClearContent();
                    //response.ClearHeaders();
                    //response.Buffer = true;
                    //response.AddHeader("Content-Disposition", "attachment;filename=\"" + HttpContext.Current.Server.MapPath(strURL) + "\"");
                    //byte[] data = req.DownloadData(HttpContext.Current.Server.MapPath(strURL));
                    //response.BinaryWrite(data);
                    //response.End();

                    //HttpContext.Current.Response.ContentType = "Application/pdf";
                    //HttpContext.Current.Response.AppendHeader("Content-Disposition", "attachment; filename=" + filename);
                    //HttpContext.Current.Response.TransmitFile(HttpContext.Current.Server.MapPath(filename));
                    //HttpContext.Current.Response.End();
                }
                msg = "yes";
            }
            catch (Exception)
            {
                throw;
            }
            return msg;
        }

        public List<string> getmailinglist(string SearchText)
        {
            List<string> Mailinglist = new List<string>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    Mailinglist = dal.getmailinglist(SearchText, out error);
                    if (error == null)
                        return Mailinglist;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Mailinglist;
                }
            }
            catch (Exception)
            {
                throw;
            }

        }

        public string getrackrateinfo(int Paymentmemoid, int Schemeid)
        {
            string Mailinglist = "";
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    Mailinglist = dal.getrackrateinfo(Paymentmemoid, Schemeid, out error);
                    if (error == null)
                        return Mailinglist;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Mailinglist;
                }
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<Channel_DistibutorCategory> GetChannelDistributorCategory(string channel)
        {
            List<Channel_DistibutorCategory> list = new List<Channel_DistibutorCategory>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    list = dal.GetChannelDistributorCategory(channel, out error);
                    if (error == null)
                        return list;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return list;
                }
            }
            catch (Exception)
            {
                throw;
            }

        }
        public List<Channel_DistibutorCategory> GetChannelCategory(string channel, string category)
        {
            var newCategory = string.Empty;
            List<Channel_DistibutorCategory> list = new List<Channel_DistibutorCategory>();
            var finalList = new List<Channel_DistibutorCategory>();
            var distCategory = new List<DistributorCategory>();
            var listCategory = new List<string>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    list = dal.GetChannelCategory(channel, out error);
                    if (error == null)
                    {
                        var tempCategory = category.Split(',').ToList();
                        //take list of distributor category with selected categories
                        var tempchlist = list.Where(x => tempCategory.Contains(Convert.ToString(x.DistributorCategoryId))).ToList();

                        //select channel ids from selected category list
                        var tempChannels = from li in tempchlist select li.ChannelID.ToString();

                        var tempChannelsList = tempChannels.ToList();
                        //select category list without selected category channels
                        var tempClist = list.Where(x => !tempChannelsList.Contains(Convert.ToString(x.ChannelID))).ToList();

                        finalList = tempClist.ToList();

                        finalList = finalList.Concat(tempchlist).ToList();
                        return finalList;
                    }
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return finalList;
                }
            }
            catch (Exception)
            {
                throw;
            }

        }


        public ViewAction GetViewAction(Int32 PaymentMemoID, Int32 MemoTypeID)
        {
            ViewAction payment = new ViewAction();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    int UserID = Convert.ToInt32(HttpContext.Current.Session["userid"]);
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    payment = dal.GetViewAction(PaymentMemoID, UserID, MemoTypeID);
                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Distributor> GetParentARN(string ARN)
        {
            List<Distributor> Dist = new List<Distributor>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    Dist = dal.GetParentARN(ARN, out error);
                    if (error == null)
                        return Dist;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Dist;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<MailingList> getmailinglistobject(string Searchtext, string Module)
        {
            List<MailingList> Dist = new List<MailingList>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    Dist = dal.getmailinglistobject(Searchtext, Module, out error);
                    if (error == null)
                        return Dist;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Dist;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<string> GetSchemeForArnCategory(string Arn, string Dist_category)
        {
            List<string> list = new List<string>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    list = dal.GetSchemeForArnCategory(Arn, Dist_category, out error);
                    if (error == null)
                        return list;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return list;
                }
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<MailingList> GetDistributorEmail(string Searchtext, string Module)
        {
            List<MailingList> Dist = new List<MailingList>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    Dist = dal.GetDistributorEmail(Searchtext, Module, out error);
                    if (error == null)
                        return Dist;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return Dist;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void ValidateSchemeSlabAmount(string SchemeID)
        {
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    dal.ValidateSchemeSlabAmount(SchemeID);
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<RackRateSearchResult> GetCreateSIP(string ArnNo, string Channel, string DistributorCategory, string Status, string MasterQueueStatus, string ARNName, string SearchFilter, string MemoLevel)
        {
            List<RackRateSearchResult> result = new List<RackRateSearchResult>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    result = dal.GetCreateSIP(ArnNo, Channel, DistributorCategory, Status, MasterQueueStatus, ARNName, SearchFilter, Convert.ToInt32(HttpContext.Current.Session["userid"]), MemoLevel, out error);
                    if (error == null)
                        return result;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return result;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<RackRateSearchResult> GetDiscardedQueue(string Status)
        {
            List<RackRateSearchResult> result = new List<RackRateSearchResult>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    result = dal.GetDiscardedQueue(Status, out error);
                    if (error == null)
                        return result;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return result;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<string> GetChannelForARNAndDistributorCategory(string ARN, string DistributorCategory)
        {
            List<string> result = new List<string>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    result = dal.GetChannelForARNAndDistributorCategory(ARN, DistributorCategory, out error);
                    if (error == null)
                        return result;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return result;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string ValidateAvailableSchemeTieup(string SchemeID, string ARN, string DistributorCategory, string DateFrom, string DateTo)
        {
            string payment = "";
            //string returnMessage = "Rate are different/not defined for the selected schemes, kindly select the schemes having same rates/clawback/Slab";
            string NoBRR = "Selected scheme doesn't have Base Rate.";
            string differentRate = "Selected schemes have different Rates hence cannot raise tie-up. Raise separate tie up memo.";
            string differentClawback = "Selected schemes have different Clawback/Rate, hence cannot raise tie up. Raise separate tie up memo.";
            string differentSlab = "Selected schemes have different Slab, hence cannot raise tie up. Raise separate tie up memo.";

            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();

                    string[] schemes;
                    schemes = SchemeID.Split(',');

                    /////Payment List Compare////
                    List<PaymentList> List = new List<PaymentList>();
                    foreach (string scheme in schemes)
                    {
                        string[] dist;
                        dist = DistributorCategory.Split(',');
                        foreach (string cat in dist)
                        {
                            if (cat != "")
                            {
                                PaymentList listobj = new PaymentList();
                                listobj = dal.GetAvailableSchemeTieup(scheme, "", cat, DateFrom, DateTo, out error);
                                if (listobj == null)
                                {
                                    return NoBRR;
                                }
                                else
                                {
                                    bool notexist = true;
                                    foreach (PaymentList li in List)
                                    {
                                        if (li.SchemeId == listobj.SchemeId && li.PaymentMemoId == listobj.PaymentMemoId && li.DistributorCategoryId == listobj.DistributorCategoryId)
                                        {
                                            notexist = false;
                                            break;
                                        }
                                    }
                                    if (notexist)
                                    {
                                        List.Add(listobj);
                                    }
                                }
                            }
                        }

                        string[] arnsplit;
                        arnsplit = ARN.Split(',');
                        foreach (string arn in arnsplit)
                        {
                            if (arn != "")
                            {
                                PaymentList listobj = new PaymentList();
                                listobj = dal.GetAvailableSchemeTieup(scheme, arn, "", DateFrom, DateTo, out error);
                                if (listobj == null)
                                {
                                    return NoBRR;
                                }
                                else
                                {
                                    bool notexist = true;
                                    foreach (PaymentList li in List)
                                    {
                                        if (li.SchemeId == listobj.SchemeId && li.PaymentMemoId == listobj.PaymentMemoId && li.ARNNO == listobj.ARNNO)
                                        {
                                            notexist = false;
                                            break;
                                        }
                                    }
                                    if (notexist)
                                    {
                                        List.Add(listobj);
                                    }
                                }
                            }
                        }
                    }
                    if (List.Count > 0)
                    {
                        if (List.Count != schemes.Length)
                        {
                            return NoBRR;
                        }
                        else
                        {
                            foreach (PaymentList list1 in List)
                            {
                                foreach (PaymentList list2 in List)
                                {
                                    if (list1.SchemeId != list2.SchemeId)
                                    {
                                        if (list1.SlabType != list2.SlabType || list1.SlabAmount != list2.SlabAmount || list1.SIPSlab != list2.SIPSlab)
                                        {
                                            return differentSlab;
                                        }
                                        if (list1.Clawback != list2.Clawback)
                                        {
                                            return differentClawback;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    /////Payment Detail Compare////
                    List<PaymentDetails> Detail = new List<PaymentDetails>();
                    List<PaymentDetails> UpfrontDetail = new List<PaymentDetails>();
                    List<PaymentDetails> AdditionalDetail = new List<PaymentDetails>();
                    List<PaymentDetails> TrailDetail = new List<PaymentDetails>();
                    foreach (PaymentList li in List)
                    {
                        //foreach (string scheme in schemes)
                        //{
                        List<PaymentDetails> DbDetail = new List<PaymentDetails>();
                        DbDetail = dal.GetPaymentDetailsByScheme(Convert.ToInt64(li.SchemeId), Convert.ToInt64(li.PaymentMemoId), out error);
                        foreach (PaymentDetails det in DbDetail)
                        {
                            Detail.Add(det);
                            switch (det.BrokerageTypeId)
                            {
                                case "1":
                                    UpfrontDetail.Add(det);
                                    break;
                                case "2":
                                    AdditionalDetail.Add(det);
                                    break;
                                case "3":
                                    TrailDetail.Add(det);
                                    break;
                            }
                        }
                        //}
                    }

                    ///Check Upfront 
                    foreach (PaymentDetails upfront1 in UpfrontDetail)
                    {
                        foreach (PaymentDetails upfront2 in UpfrontDetail)
                        {
                            if (upfront1.SchemeId != upfront2.SchemeId)
                            {
                                if (upfront1.BaseUpfront != upfront2.BaseUpfront || upfront1.AdditionalIncentives != upfront2.AdditionalIncentives
                                    || upfront1.SIPSlabLess != upfront2.SIPSlabLess || upfront1.SIPSlabGreater != upfront2.SIPSlabGreater)
                                {
                                    return differentRate;
                                }
                            }
                        }
                    }

                    ///Check Additional Incentive
                    foreach (PaymentDetails additional1 in AdditionalDetail)
                    {
                        foreach (PaymentDetails additional2 in AdditionalDetail)
                        {
                            if (additional1.SchemeId != additional2.SchemeId)
                            {
                                if (additional1.BaseUpfront != additional2.BaseUpfront)
                                {
                                    return differentRate;
                                }
                            }
                        }
                    }
                    List<string> monthPeriod = new List<string>();
                    List<PaymentDetails> MonthList = new List<PaymentDetails>();
                    List<PaymentDetails> YearList = new List<PaymentDetails>();
                    foreach (string scheme in schemes)
                    {
                        string months = "";
                        Int64 Year = 0;
                        foreach (PaymentDetails trail in TrailDetail)
                        {
                            if (scheme == trail.SchemeId)
                            {
                                if (trail.PeriodType == "1")
                                {
                                    MonthList.Add(trail);
                                    if (months != "")
                                        months += ",";
                                    months += trail.PeriodStart + " - " + trail.PeriodEnd;
                                }
                                else
                                {
                                    ++Year;
                                    YearList.Add(trail);
                                }
                            }
                        }
                        string mnth = months + "~" + Convert.ToString(Year);
                        monthPeriod.Add(mnth);
                    }

                    foreach (string period1 in monthPeriod)
                    {
                        foreach (string period2 in monthPeriod)
                        {
                            if (period1 != period2)
                            {
                                return differentRate;
                            }
                        }
                    }

                    foreach (PaymentDetails det1 in MonthList)
                    {
                        foreach (PaymentDetails det2 in MonthList)
                        {
                            if (det1.SchemeId != det2.SchemeId)
                                if (det1.PeriodStart == det2.PeriodStart && det1.PeriodEnd == det2.PeriodEnd)
                                {
                                    if (det1.BaseUpfront != det2.BaseUpfront || det1.AdditionalIncentives != det2.AdditionalIncentives || det1.SIPSlabLess != det2.SIPSlabLess
                                        || det1.SIPSlabGreater != det2.SIPSlabGreater)
                                    {
                                        return differentRate;
                                    }
                                }
                        }
                    }

                    foreach (PaymentDetails det1 in YearList)
                    {
                        foreach (PaymentDetails det2 in YearList)
                        {
                            if (det1.SchemeId != det2.SchemeId)
                                if (det1.PeriodStart == det2.PeriodStart)
                                {
                                    if (det1.BaseUpfront != det2.BaseUpfront || det1.AdditionalIncentives != det2.AdditionalIncentives || det1.SIPSlabLess != det2.SIPSlabLess
                                        || det1.SIPSlabGreater != det2.SIPSlabGreater)
                                    {
                                        return differentRate;
                                    }
                                }
                        }
                    }

                    if (error == null)
                        return payment;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return payment;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool ValidateBranchPaymentMemo(string PaymentMemoID)
        {
            try
            {
                bool returnvalue = false;
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    returnvalue = dal.ValidateBranchPaymentMemo(PaymentMemoID, Convert.ToString(HttpContext.Current.Session["userid"]));
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                }
                return returnvalue;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<LinkedMemo> GetLinkedMemos(string MemoIds)
        {
            List<LinkedMemo> result = new List<LinkedMemo>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    result = dal.GetLinkedMemos(MemoIds, out error);
                    if (error == null)
                        return result;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return result;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string GetReportURLHostAndPort()
        {
            try
            {
                return ConfigurationManager.AppSettings["ReportURLHostAndPort"].ToString();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Int64 SaveRegenerateBaseRackRate(PaymentMemo Memo, List<PaymentList> List, List<PaymentDetails> Details)
        {
            try
            {

                return InsertRegenerateRackRate(Memo, List, Details);


            }
            catch (Exception)
            {
                throw;
            }
        }

        private Int64 InsertRegenerateRackRate(PaymentMemo Memo, List<PaymentList> List, List<PaymentDetails> Details)
        {
            try
            {
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                if (UserId != 0)
                {
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    /////////////////////////////////////////////////////////////
                    ///////////Query to Insert Payment Memo//////////////////////
                    /////////////////////////////////////////////////////////////

                    string PaymentMemoInsertQuery = "INSERT INTO [RegeneratePaymentMemo] " +
                                                    "([BranchId],[ZoneId],[MemoTypeId],[PaymentAmount],[DateFrom],[DateTo],[ApplicableTo],[TransactionType]," +
                                                    "[SlabType],[SlabAmount],[SlabCondition],[Remarks],[Comments],[MemoStatus],[CreatedBy],[CreatedDate],[ModifiedBy],[ModifiedDate], [IsActive],[TransactionTypeOthers],[CopiedMemoID],[SIPNotes],[IsCloseEnded],[PaymentMemoLinkId],[LumpsumSIPType]) VALUES(" +
                                                    "@BranchId, @ZoneId, @MemoTypeId, @PaymentAmount, @DateFrom, @DateTo, @ApplicableTo, @TransactionType," +
                                                    "@SlabType, @SlabAmount, @SlabCondition, @Remarks, @Comments,@MemoStatus,@CreatedBy, @CreatedDate, @ModifiedBy,@ModifiedDate,@IsActive,@TransactionTypeOthers,@CopiedMemoID,@SIPNotes,@IsCloseEnded,@PaymentMemoLinkId,@LumpsumSIPType)" +
                                                    "  SELECT SCOPE_IDENTITY()";
                    Int64 PaymentMemoID = dal.SavePaymentMemo(Memo, UserId, PaymentMemoInsertQuery);

                    ////Insert List And Details////
                    InsertRegenerateListDetails(PaymentMemoID, List, Details);

                    return PaymentMemoID;

                }
                else
                {
                    Exception ex = new Exception("Invalid User ID. Please Login Again");
                    throw ex;
                }
            }

            catch (Exception)
            {

                throw;
            }
        }

        private void InsertRegenerateListDetails(Int64 PaymentMemoID, List<PaymentList> List, List<PaymentDetails> Details)
        {
            try
            {
                Int64 UserId = Convert.ToInt64(HttpContext.Current.Session["userid"]);
                /////////////////////////////////////////////////////////////
                ///////////Query to Insert Payment List//////////////////////
                /////////////////////////////////////////////////////////////
                string PaymentListQuery = "";
                foreach (PaymentList plist in List)
                {
                    string[] DistributorCategory = Convert.ToString(plist.DistributorCategoryId).Split(',');
                    foreach (string DistributorCategoryId in DistributorCategory)
                    {
                        if (DistributorCategoryId != "")
                        {
                            PaymentListQuery += "INSERT INTO [RegeneratePaymentList] " +
                                                            "([SchemeId],[SchemeCategoryId],[DistributorCategoryId],[PaymentMemoId],[PaymentType],[DateFrom]," +
                                                            "[DateTo],[SlabType],[SlabAmount],[PaymentBasis],[Target],[TargetPeriod],[InterestRate],[InstalmentCondition],[InstallmentRangeFrom],[InstallmentRangeTo]," +
                                                            "[TenureCondition],[TenureMonths],[UpfrontPaymentType],[UpfrontValue],[Calculation],[Clawback],[SIPIncentiveRemarks],[SIPRowId],[FreeTextField1],[FreeTextField2],[Onwards],[CreatedBy],[CreatedDate],[ModifiedBy],[ModifiedDate],[IsActive],[Folio],[IsUpdated],[SIPSlab]) VALUES (" +
                                                            "'" + plist.SchemeId + "','" + plist.SchemeCategoryId + "','" + DistributorCategoryId + "','" + PaymentMemoID + "' , '" + plist.PaymentType + "',Convert(date, '" + plist.DateFrom + "' , 3), " +
                                                            "Convert(date, '" + plist.DateTo + "' , 3)" +
                                                            ",'" + plist.SlabType + "','" + plist.SlabAmount + "','" + plist.PaymentBasis + "','" + plist.Target + "', '" + plist.TargetPeriod + "','" + plist.InterestRate + "',N'" + plist.InstallmentCondition + "','" + plist.InstallmentRangeFrom + "','" + plist.InstallmentRangeTo + "',N'" +
                                                            plist.TenureCondition + "','" + plist.TenureMonths + "','" + plist.UpfrontPaymentType + "','" + plist.UpfrontValue + "','" + plist.Calculation + "','" + plist.Clawback + "','" + plist.SIPIncentiveRemarks + "','" + plist.SIPRowId + "','" + plist.FreeTextField1 + "','" + plist.FreeTextField2 +
                                                            "','" + plist.Onwards + "','" + UserId + "',GETDATE(), " + UserId + ",GETDATE()," + 1 + ",'" + plist.Folio + "','" + plist.IsUpdated + "','" + plist.SIPSlab + "') ";
                        }
                    }

                    string[] ArnNo = Convert.ToString(plist.ARNNO).Split(',');
                    string[] ArnName = Convert.ToString(plist.ARNName).Split(',');
                    for (int i = 0; i < ArnNo.Count(); i++)
                    {
                        if (ArnNo[i] != "")
                        {
                            PaymentListQuery += "INSERT INTO [RegeneratePaymentList] " +
                                                            "([SchemeId],[SchemeCategoryId],[PaymentMemoId],[PaymentType],[ARNNO],[ARNName],[DateFrom]," +
                                                            "[DateTo],[SlabType],[SlabAmount],[PaymentBasis],[Target],[TargetPeriod],[InterestRate],[InstalmentCondition],[InstallmentRangeFrom],[InstallmentRangeTo]," +
                                                            "[TenureCondition],[TenureMonths],[UpfrontPaymentType],[UpfrontValue],[Calculation],[Clawback],[SIPIncentiveRemarks],[SIPRowId],[FreeTextField1],[FreeTextField2],[Onwards],[CreatedBy],[CreatedDate],[ModifiedBy],[ModifiedDate],[IsActive],[Folio],[IsUpdated],[SIPSlab]) VALUES (" +
                                                             "'" + plist.SchemeId + "','" + plist.SchemeCategoryId + "','" + PaymentMemoID + "' , '" + plist.PaymentType + "','" + ArnNo[i] + "','" + ArnName[i] + "', Convert(date, '" + plist.DateFrom + "' , 3), " +
                                                            " Convert(date, '" + plist.DateTo + "' , 3) " +
                                                            ",'" + plist.SlabType + "','" + plist.SlabAmount + "','" + plist.PaymentBasis + "','" + plist.Target + "', '" + plist.TargetPeriod + "','" + plist.InterestRate + "',N'" + plist.InstallmentCondition + "','" + plist.InstallmentRangeFrom + "','" + plist.InstallmentRangeTo + "',N'" +
                                                            plist.TenureCondition + "','" + plist.TenureMonths + "','" + plist.UpfrontPaymentType + "','" + plist.UpfrontValue + "','" + plist.Calculation + "','" + plist.Clawback + "','" + plist.SIPIncentiveRemarks + "','" + plist.SIPRowId + "','" + plist.FreeTextField1 + "','" + plist.FreeTextField2 +
                                                            "','" + plist.Onwards + "','" + UserId + "',GETDATE(), " + UserId + ",GETDATE()," + 1 + ",'" + plist.Folio + "','" + plist.IsUpdated + "','" + plist.SIPSlab + "') ";
                        }
                    }
                }
                dal.ExecuteQuery(PaymentListQuery);

                /////////////////////////////////////////////////////////////
                ///////////Query to Insert Payment Details///////////////////
                /////////////////////////////////////////////////////////////
                string PaymentDetailsQuery = "";
                foreach (PaymentDetails det in Details)
                {

                    PaymentDetailsQuery += " INSERT INTO [RegeneratePaymentDetails] " +
                                            "([PaymentMemoId],[SchemeId],[BrokerageTypeId],[LumpSumLessTieup],[LumpSumGreaterTieup],[BaseUpfront],[AdditionalIncentive],[Total],[SIPSlabLess],[SIPSlabGreater],[PeriodType]," +
                                            "[PeriodStart],[PeriodEnd],[SlabTotal],[CreatedBy],[CreatedDate],[ModifiedBy],[ModifiedDate],[IsActive],[IsSlabLess],[LumpSumGreater],[LumpSumGreaterTotal],[IsCopied]) VALUES(" +
                                             PaymentMemoID + ", " + det.SchemeId + ", " + det.BrokerageTypeId + "," + det.LumpSumLessTieup + ", " + det.LumpSumGreaterTieup + ", " + det.BaseUpfront + "," +
                                             det.AdditionalIncentives + "," + det.Total + ",'" + det.SIPSlabLess + "','" + det.SIPSlabGreater + "'," + det.PeriodType + "," +
                                             det.PeriodStart + "," + det.PeriodEnd + "," + det.SlabTotal + "," + UserId + ", GETDATE() ," + UserId + ",GETDATE()," + 1 + "," +
                                             det.IsSlabLess + ",'" + det.LumpSumGreater + "','" + det.LumpSumGreaterTotal + "'," + Convert.ToString(det.IsCopied == null ? 0 : Convert.ToInt16(det.IsCopied)) + ")";
                }
                if (PaymentDetailsQuery != "")
                    dal.ExecuteQuery(PaymentDetailsQuery);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<SchemeDropdown> GetMissingSchemeInExitLoadScheme()
        {
            List<SchemeDropdown> missingScheme = new List<SchemeDropdown>();
            try
            {
                BaseRackRateDAL dal = new BaseRackRateDAL();
                missingScheme = dal.GetMissingSchemeInExitLoadScheme();
            }
            catch (Exception ex)
            {
                throw;
            }
            return missingScheme;
        }

        public string SaveExitLoadChanges()
        {
            string result = string.Empty;
            try { BaseRackRateDAL dal = new BaseRackRateDAL(); result = dal.SaveExitLoadChanges(); }
            catch (Exception ex) { }
            return result;
        }

        public List<LumpsumSIPType> GetLumpsumSIPType(string SearchText)
        {
            List<LumpsumSIPType> channel = new List<LumpsumSIPType>();
            try
            {
                if (SessionManager.IsValidSession(UserSessionId))
                {
                    Exception error = null;
                    BaseRackRateDAL dal = new BaseRackRateDAL();
                    channel = dal.GetLumpsumSIPType(SearchText, out error);
                    if (error == null)
                        return channel;
                    else
                        throw error;
                }
                else
                {
                    SessionManager.RemoveSession(UserSessionId, true);
                    return channel;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
