using BrokerageOnline.TransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BrokerageOnline.BusinessLogic;
using System.ServiceModel.Activation;

namespace BrokerageOnline.Services
{
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class AuthorizationService : IAuthorizationService
    {
        public List<UserRoleRights> GetUserMenuPermission(string UserID, int MainMenuID, string _commandText)
        {
            List<UserRoleRights> ObjMenu = new List<UserRoleRights>();
            LoginBL Bl = new LoginBL();
            ObjMenu = Bl.GetUserMenuPermission(UserID, MainMenuID, _commandText);
            return ObjMenu;
        }

        public List<UserRoleRights> GetUserModuleMenu(string UserID, int MainMenuID, string _commandText)
        {
            List<UserRoleRights> ObjMenu = new List<UserRoleRights>();
            LoginBL Bl = new LoginBL();
            ObjMenu = Bl.GetUserModuleMenu(UserID, MainMenuID, _commandText);
            return ObjMenu;
        }

        //User Logs when Logs Out
        public void InsertUpdateEmployeeLogs(int LoginUserID, int EmployeeLogID, int StatusID)
        {
            Exception exError;
            LoginBL Bl = new LoginBL();
            EmployeeLogs EmployeeLogsBO = new EmployeeLogs();
            EmployeeLogsBO.StatusID = StatusID;  
            EmployeeLogsBO.LoggedOutTime = DateTime.Now;
            EmployeeLogsBO.LastAccessedTime = DateTime.Now;
            EmployeeLogsBO.UserLogin = "";
            EmployeeLogsBO.EmployeeID = LoginUserID;
            EmployeeLogsBO.EmployeeLogID = EmployeeLogID;

            string val = Bl.InsertUpdateEmployeeLogs(EmployeeLogsBO, out exError);
            val = exError == null ? val : exError.Message;
        }
    }
}
