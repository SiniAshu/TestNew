var CommonValidate = {
    TempMenuList: [],

    LogOut: function () {
        Utility.ServiceCall("POST", 'AuthorizationService.svc/InsertUpdateEmployeeLogs', JSON.stringify({ LoginUserID: parseInt(sessionStorage.UserID), StatusID: 3 }), "json", false, false, function (result) {
            var rightItems = result.InsertUpdateEmployeeLogsResult;
        });

        sessionStorage.clear();
        window.location.href = "../Login.aspx?mode=logout";
        return false;
    },

    SetOverViewMenu: function () {
        sessionStorage.setItem("IsmainmenuClicked", false);
        sessionStorage.setItem("ActiveMainMenu", 0);
        $("ul.secondary-nav-ul li").removeClass("active");
        $(".secondary-nav-ul-li:eq(0)").addClass("active");
    },


    GetNewMenu: function (outputArray, CurrentMenu) {
        for (var j = 0; j < outputArray.length; j++) {

            var idtag = outputArray[j].replace(/\s+/g, "_");
            var messageCenterAnchor = $('<a/>', {
                href: "#",
                html: outputArray[j]
            });
            var tagdiv = $('<div/>', {
                class: "arrow-down"
            });
            var newListItem = $('<li/>', {
                html: messageCenterAnchor,
                class: "has-menu",
                id: "li_menu_" + idtag
            });
            if (CurrentMenu == "Admin")
                $("#ul_admin_menu_body").append(newListItem);
            else if (CurrentMenu == "Module")
                $("#ul_menu_body").append(newListItem);



            // Loading Sub menu inside the Main menu

            var ul_sub_menu = $('<ul/>', {
                class: "sub-menu",
                id: "ul_sub_menu_" + idtag
            });
            $("#li_menu_" + idtag).append(ul_sub_menu);

            for (var i = 0; i < CommonValidate.TempMenuList.length; i++) {

                if (CommonValidate.TempMenuList[i].ParentMenuName == outputArray[j]) {
                    var ul_sub_menu_Anchor = $('<a/>', {
                        href: CommonValidate.TempMenuList[i].NavigateURL,
                        html: CommonValidate.TempMenuList[i].MenuName,
                        onclick: 'CommonValidate.SubMenuClick("' + CommonValidate.TempMenuList[i].NavigateMenu + '")'
                    });

                    var li_sub_menu = $('<li/>', {
                        html: ul_sub_menu_Anchor
                    });

                    $("#ul_sub_menu_" + idtag).append(li_sub_menu);

                    if (CurrentMenu == "report") {
                        $("#ul_report_menu_body").append(li_sub_menu);
                    }
                    else if (CurrentMenu == "Discarded") {
                        $('#anch_discarded_queue').attr('href', CommonValidate.TempMenuList[i].NavigateURL);
                    }
                    else if (CurrentMenu == "Master_Queue") {
                        $('#anch_master_queue').attr('href', CommonValidate.TempMenuList[i].NavigateURL);
                    }
                }
            }
        }
    },

    SubMenuClick: function (NavigateMenu) {
        sessionStorage.CurrentMenuselected = NavigateMenu;
    },


    GetUserMenu: function () {
        // Get Menu  
        Utility.ServiceCall("POST", 'AuthorizationService.svc/GetUserMenuPermission', JSON.stringify({ UserID: sessionStorage.LoginId, MainMenuID: 0, _commandText: "GET_USER_MENU_RIGHTS" }), "json", false, false, function (result) {
            var rightItems = result.GetUserMenuPermissionResult;

            CommonValidate.TempMenuList = rightItems;

            if (rightItems.length > 0) {

                var SelectedModuleParentMenus = [];
                var SelectedAdminParentMenus = [];
                var SelectedReportParentMenus = [];
                var SelectedMasterQueueMenus = [];
                var SelectedDiscardedMenus = [];

                for (var i = 0; i < rightItems.length; i++) {
                    if (rightItems[i].ParentMenuID > 0 && rightItems[i].NavigateMenu == "report")
                        SelectedReportParentMenus.push(rightItems[i].ParentMenuName);
                    else if (rightItems[i].ParentMenuID > 0 && rightItems[i].NavigateMenu == "Master_Queue")
                        SelectedMasterQueueMenus.push(rightItems[i].ParentMenuName);
                    else if (rightItems[i].ParentMenuID > 0 && rightItems[i].NavigateMenu == "Discarded")
                        SelectedDiscardedMenus.push(rightItems[i].ParentMenuName);
                    else if (rightItems[i].ParentMenuID > 0 && rightItems[i].NavigateMenu == "admin")
                        SelectedAdminParentMenus.push(rightItems[i].ParentMenuName);
                    else if (rightItems[i].ParentMenuID > 0 && rightItems[i].NavigateMenu != "admin")
                        SelectedModuleParentMenus.push(rightItems[i].ParentMenuName);
                }

                var outputModuleArray = Utility.removeDuplicates(SelectedModuleParentMenus);
                var outputAdminArray = Utility.removeDuplicates(SelectedAdminParentMenus);
                var outputReportArray = Utility.removeDuplicates(SelectedReportParentMenus);

                if (outputModuleArray.length > 0)
                    CommonValidate.GetNewMenu(outputModuleArray, 'Module');
                else
                    $('#li_module').hide();

                if (outputAdminArray.length > 0)
                    CommonValidate.GetNewMenu(outputAdminArray, 'Admin');
                else
                    $('#li_administrator').hide();

                if (outputReportArray.length > 0)
                    CommonValidate.GetNewMenu(outputReportArray, 'report');
                else
                    $('#li_reports').hide();

                if (SelectedDiscardedMenus.length == 0)
                    $('#li_discarded_queue').hide();

                if (SelectedMasterQueueMenus.length == 0)
                    $('#li_master_queue').hide();

                var RoleID = rightItems[0].RoleID;
                sessionStorage.setItem("RoleID", RoleID);
                sessionStorage.setItem("UserName", rightItems[0].FirstName);
                sessionStorage.setItem("RoleName", rightItems[0].RoleName);
            }
        });
    },
};


$(function () {
    // Get Menu 
    $("#a_rolemanager").attr("href", "rolemaster.html");
    $("#a_usermanager").attr("href", "usermaster.html");
    $("#a_distcategmanager").attr("href", "distributorcategorymaster.html");
    $("#a_branchmanager").attr("href", "branchmaster.html");
    $("#a_passwordpolicy").attr("href", "passwordpolicy.html");
    $("#a_exitload").attr("href", "exitloadmaster.html");
    $("#a_brokeragenotes").attr("href", "brokeragenotes.html");
    $("#a_schemetomodule").attr("href", "SchemeToModuleMaster.html");
    $("#a_mailinglist").attr("href", "MailingListMaster.html");
    $("#a_userlog").attr("href", "UserLog.html");
    $("#a_applicationlock").attr("href", "ApplicationLock.html");
    $("#a_audit_trail").attr("href", "AuditTrail.html");
    $("#a_login_Admin").attr("href", "LoginAdministration.html");
    $("#a_unlock_User").attr("href", "UnlockUsers.html");

    CommonValidate.GetUserMenu();
});