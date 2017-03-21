var CommonValidate = {

    LogOut: function () {

        Utility.ServiceCall("POST", 'AuthorizationService.svc/InsertUpdateEmployeeLogs', JSON.stringify({ LoginUserID: parseInt(sessionStorage.UserID),EmployeeLogID : 0, StatusID: 3 }), "json", false, false, function (result) {
            var rightItems = result.InsertUpdateEmployeeLogsResult;
        });

        sessionStorage.clear();
        window.location.href = "../Login.aspx?mode=logout";
        return false;
    },

    //Rack Rate Methods Start
    ViewCreateRackRate: function () {
        sessionStorage.ismasterqueue = "";
        CommonValidate.SetRackRateMenu();
        sessionStorage.CurrentMenuselected = "nav_create";
        //var memono = Utility.GetParameterValues('memono');
        //if (memono == undefined || memono == "")
        window.location.href = "CreateRackRate.html";
        return false;
    },

    ViewRackRateInformation: function () {
        CommonValidate.SetRackRateMenu();
        sessionStorage.CurrentMenuselected = "nav_information";
        var memono = Utility.GetParameterValues('memono');
        if (memono == undefined || memono == "")
            window.location.href = "RackRateInitiate.html";
        return false;
    },

    ViewInitiateRackRate: function () {
        sessionStorage.ismasterqueue = "";
        CommonValidate.SetRackRateMenu();
        sessionStorage.CurrentMenuselected = "nav_initiate";
        window.location.href = "RackRateInitiate.html";
        return false;
    },

    ViewRackRateReview: function () {
        sessionStorage.ismasterqueue = "";
        CommonValidate.SetRackRateMenu();
        sessionStorage.CurrentMenuselected = "nav_review";
        window.location.href = "RackRateReview.html";
        return false;
    },

    ViewRackRateApproval: function () {
        sessionStorage.ismasterqueue = "";
        CommonValidate.SetRackRateMenu();
        sessionStorage.CurrentMenuselected = "nav_approval";
        window.location.href = "RackRateReview.html";
        return false;
    },

    ViewFreezeRackRate: function () {
        sessionStorage.ismasterqueue = "";
        CommonValidate.SetRackRateMenu();
        sessionStorage.CurrentMenuselected = "nav_freeze";
        window.location.href = "RackRateReview.html";
        return false;
    },

    ViewManageRackRate: function () {
        sessionStorage.ismasterqueue = "";
        CommonValidate.SetRackRateMenu();
        sessionStorage.CurrentMenuselected = "nav_manage";
        window.location.href = "RackRateInitiate.html";
        return false;
    },
    // Rack Rate Methods End


    // TIE- UP Methods Starts


    ViewCreateTieUp: function () {
        CommonValidate.SetTieUpMenu();
        sessionStorage.CurrentMenuselected = "nav_create";
        window.location.href = "CreateTieUp.html";
        return false;
    },

    ViewTieUpInformation: function () {
        CommonValidate.SetTieUpMenu();
        sessionStorage.CurrentMenuselected = "nav_information";
        var memono = Utility.GetParameterValues('memono');
        if (memono == undefined || memono == "")
            window.location.href = "TieUpInformation.html";
        return false;
    },

    ViewInitiateTieUp: function () {
        CommonValidate.SetTieUpMenu();
        sessionStorage.CurrentMenuselected = "nav_initiate";
        window.location.href = "TieUpInformation.html";
        return false;
    },

    ViewTieUpReview: function () {
        CommonValidate.SetTieUpMenu();
        sessionStorage.CurrentMenuselected = "nav_review";
        window.location.href = "TieUpInformation.html";
        return false;
    },

    ViewTieUpApproval: function () {
        CommonValidate.SetTieUpMenu();
        sessionStorage.CurrentMenuselected = "nav_approval";
        window.location.href = "TieUpInformation.html";
        return false;
    },

    ViewFreezeTieUp: function () {
        CommonValidate.SetTieUpMenu();
        sessionStorage.CurrentMenuselected = "nav_freeze";
        window.location.href = "TieUpInformation.html";
        return false;
    },

    ViewManageTieUp: function () {
        CommonValidate.SetTieUpMenu();
        sessionStorage.CurrentMenuselected = "nav_manage";
        window.location.href = "TieUpInformation.html";
        return false;
    },
    // TIE- UP Methods End

    //Ad Hoc Payment

    ViewCreateAdHoc: function () {
        CommonValidate.SetAdhocMenu();
        sessionStorage.CurrentMenuselected = "nav_create";
        window.location.href = "CreateAdHoc.html";
        return false;
    },

    ViewAdHocInitiate: function () {
        CommonValidate.SetAdhocMenu();
        sessionStorage.CurrentMenuselected = "nav_initiate";
        window.location.href = "ProcessAdHoc.html";
        return false;
    },

    ViewAdHocZonalProcessing: function () {
        CommonValidate.SetAdhocMenu();
        sessionStorage.CurrentMenuselected = "nav_zonalProcessing";
        window.location.href = "ProcessAdHoc.html";
        return false;
    },

    ViewAdHocSalesProcessing: function () {
        CommonValidate.SetAdhocMenu();
        sessionStorage.CurrentMenuselected = "nav_salesprocessing";
        window.location.href = "ProcessAdHoc.html";
        return false;
    },

    ViewAdHocReview: function () {
        CommonValidate.SetAdhocMenu();
        sessionStorage.CurrentMenuselected = "nav_review";
        window.location.href = "ProcessAdHoc.html";
        return false;
    },

    ViewAdHocApproval: function () {
        CommonValidate.SetAdhocMenu();
        sessionStorage.CurrentMenuselected = "nav_approve";
        window.location.href = "ProcessAdHoc.html";
        return false;
    },

    ViewAdHocFreeze: function () {
        CommonValidate.SetAdhocMenu();
        sessionStorage.CurrentMenuselected = "nav_freeze";
        window.location.href = "ProcessAdHoc.html";
        return false;
    },
    //Ad Hoc End

    //SIP Payment 
    ViewCreateSIP: function () {
        CommonValidate.SetSIPMenu();
        sessionStorage.CurrentMenuselected = "nav_create";
        window.location.href = "CreateSIP.html";
        return false;
    },

    ViewSIPInformation: function () {
        CommonValidate.SetSIPMenu();
        sessionStorage.CurrentMenuselected = "nav_information";
        var memono = Utility.GetParameterValues('memono');
        if (memono == undefined || memono == "")
            window.location.href = "SIPInformation.html";
        return false;
    },

    ViewInitiateSIP: function () {
        CommonValidate.SetSIPMenu();
        sessionStorage.CurrentMenuselected = "nav_initiate";
        window.location.href = "SIPInformation.html";
        return false;
    },

    ViewSIPReview: function () {
        CommonValidate.SetSIPMenu();
        sessionStorage.CurrentMenuselected = "nav_review";
        window.location.href = "SIPInformation.html";
        return false;
    },

    ViewSIPApproval: function () {
        CommonValidate.SetSIPMenu();
        sessionStorage.CurrentMenuselected = "nav_approval";
        window.location.href = "SIPInformation.html";
        return false;
    },

    ViewFreezeSIP: function () {
        CommonValidate.SetSIPMenu();
        sessionStorage.CurrentMenuselected = "nav_freeze";
        window.location.href = "SIPInformation.html";
        return false;
    },

    ViewManageSIP: function () {
        CommonValidate.SetSIPMenu();
        sessionStorage.CurrentMenuselected = "nav_manage";
        window.location.href = "SIPInformation.html";
        return false;
    },
    //SIP End

    GetMenuValidate: function (htmltag, idtag, navtag, looptag) {
        for (var j = 1; j <= looptag; j++) {
            if (j == 2) {
                idtag = 'nav_information';
                if (sessionStorage.ActiveMainMenu == "1") {
                    htmltag = 'Rack Rate Information';
                    navtag = 'CommonValidate.ViewRackRateInformation()';
                }
                else if (sessionStorage.ActiveMainMenu == "2") {
                    htmltag = 'Tie-Up Information';
                    navtag = 'CommonValidate.ViewTieUpInformation()';
                }
                else if (sessionStorage.ActiveMainMenu == "4") {
                    htmltag = 'SIP Information';
                    navtag = 'CommonValidate.ViewSIPInformation()';
                }
            }
            var tabSpan = $('<span/>', {
                html: htmltag
            });
            var messageCenterAnchor = $('<a/>', {
                href: "#",
                id: idtag,
                html: htmltag,
                onclick: navtag,
            });
            var tagdiv = $('<div/>', {
                class: "arrow-down"
            });
            var newListItem = $('<li/>', {
                html: messageCenterAnchor,
                class: "btm-nav-ul-li-" + idtag
            });

            $(".btm-nav-ul").append(newListItem);
            $(".btm-nav-ul-li-" + idtag).append(tagdiv);
        }
    },


    SetTieUpMenu: function () {
        sessionStorage.setItem("IsmainmenuClicked", false);
        sessionStorage.setItem("ActiveMainMenu", 2);
        CommonValidate.SelectActiveMainMenu(sessionStorage.ActiveMainMenu);
    },

    SetRackRateMenu: function () {
        sessionStorage.setItem("IsmainmenuClicked", false);
        sessionStorage.setItem("ActiveMainMenu", 1);
        CommonValidate.SelectActiveMainMenu(sessionStorage.ActiveMainMenu);
    },

    SetAdhocMenu: function () {
        sessionStorage.setItem("IsmainmenuClicked", false);
        sessionStorage.setItem("ActiveMainMenu", 3);
        CommonValidate.SelectActiveMainMenu(sessionStorage.ActiveMainMenu);
    },

    SetSIPMenu: function () {
        sessionStorage.setItem("IsmainmenuClicked", false);
        sessionStorage.setItem("ActiveMainMenu", 4);
        CommonValidate.SelectActiveMainMenu(sessionStorage.ActiveMainMenu);
    },

    SetOverViewMenu: function () {

        sessionStorage.setItem("IsmainmenuClicked", false);
        sessionStorage.setItem("ActiveMainMenu", 0);
        $("ul.secondary-nav-ul li").removeClass("active");
        $(".secondary-nav-ul-li:eq(0)").addClass("active");
    },

    // this could be make dynamic which coming to main menu dashboard implementation

    GetUserOverviewMenu: function () {
        sessionStorage.CurrentMenuselected = ""
        sessionStorage.setItem("IsmainmenuClicked", true);
        sessionStorage.setItem("ActiveMainMenu", 0);
        window.location.href = "Overview.html";
        //sessionStorage.setItem("CurrentMenuselected", "");
        //sessionStorage.setItem("IsmainmenuClicked", true);
        //sessionStorage.setItem("ActiveMainMenu", 0);
        //CommonValidate.SelectActiveMainMenu(sessionStorage.ActiveMainMenu);
        //CommonValidate.GetUserMenu();
        //$('.btm-nav-ul li').remove();
    },

    GetUserBRRMenu: function () {

        sessionStorage.setItem("CurrentMenuselected", "");
        sessionStorage.setItem("IsmainmenuClicked", true);
        sessionStorage.setItem("ActiveMainMenu", 1);
        $('.btm-nav-ul li').remove();
        CommonValidate.SelectActiveMainMenu(sessionStorage.ActiveMainMenu);
        CommonValidate.GetUserMenu();
    },

    GetUserTieUpMenu: function () {

        sessionStorage.setItem("CurrentMenuselected", "");
        sessionStorage.setItem("IsmainmenuClicked", true);
        sessionStorage.setItem("ActiveMainMenu", 2);
        $('.btm-nav-ul li').remove();
        CommonValidate.SelectActiveMainMenu(sessionStorage.ActiveMainMenu);
        CommonValidate.GetUserMenu();
    },

    GetUserAdhocMenu: function () {
        sessionStorage.setItem("CurrentMenuselected", "");
        sessionStorage.setItem("IsmainmenuClicked", true);
        sessionStorage.setItem("ActiveMainMenu", 3);
        $('.btm-nav-ul li').remove();
        CommonValidate.SelectActiveMainMenu(sessionStorage.ActiveMainMenu);
        CommonValidate.GetUserMenu();
    },

    GetUserSIPMenu: function () {
        sessionStorage.CurrentMenuselected = ""
        sessionStorage.setItem("IsmainmenuClicked", true);
        sessionStorage.setItem("ActiveMainMenu", 4);
        window.location.href = "CreateSIP.html";
    },

    GetUserReportMenu: function () {
        sessionStorage.setItem("CurrentMenuselected", "");
        sessionStorage.setItem("IsmainmenuClicked", true);
        sessionStorage.setItem("ActiveMainMenu", 5);
        $('.btm-nav-ul li').remove();
        CommonValidate.SelectActiveMainMenu(sessionStorage.ActiveMainMenu);
    },

    GetUserMasterMenu: function () {
        sessionStorage.setItem("CurrentMenuselected", "");
        sessionStorage.setItem("IsmainmenuClicked", true);
        sessionStorage.setItem("ActiveMainMenu", 6);
        $('.btm-nav-ul li').remove();
        CommonValidate.SelectActiveMainMenu(sessionStorage.ActiveMainMenu);
    },

    GetMasterMenu: function () {
        sessionStorage.setItem("CurrentMenuselected", "");
        sessionStorage.setItem("IsmainmenuClicked", true);
        sessionStorage.setItem("ActiveMainMenu", 7);
        window.location.href = "RoleMaster.html";
    },
    // End

    SelectActiveMainMenu: function (ActiveMainMenu) {
        $("ul.secondary-nav-ul li").removeClass("active");
        $('.secondary-nav-ul-li:eq(' + parseInt(ActiveMainMenu) + ')').addClass("active");
    },
    // End

    GetUserMenu: function () {
        // Get Menu  
        Utility.ServiceCall("POST", 'AuthorizationService.svc/GetUserMenuPermission', JSON.stringify({ UserID: sessionStorage.LoginId, MainMenuID: parseInt(sessionStorage.ActiveMainMenu), _commandText: "GET_USER_MENU_RIGHTS" }), "json", false, false, function (result) {
            var rightItems = result.GetUserMenuPermissionResult;
            if (rightItems.length > 0) {
                var RoleID = rightItems[0].RoleID;
                sessionStorage.setItem("RoleID", RoleID);

                sessionStorage.setItem("UserName", rightItems[0].FirstName);
                sessionStorage.setItem("RoleName", rightItems[0].RoleName);
                var looptag = 0;

                var nav_create_hit = 0;
                var nav_initiate_hit = 0;
                var nav_review_hit = 0;
                var nav_approval_hit = 0;
                var nav_freeze_hit = 0;
                var nav_manage_hit = 0;
                var nav_overview_hit = 0;

                var nav_create_Tieup_hit = 0;
                var nav_zonalProcessing_hit = 0;
                var nav_salesprocessing_hit = 0;

                for (var i = 0; i < rightItems.length; i++) {
                    if (rightItems[i].MenuID > 0) {
                        var idtag = "";
                        var htmltag = rightItems[i].MenuName;

                        switch (rightItems[i].MenuID) {
                            // Base Rack Rate
                            case 6:
                                idtag = 'nav_create';
                                var navtag = 'CommonValidate.ViewCreateRackRate()';
                                looptag = 2;
                                if (nav_create_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_create_hit = 1;
                                break;

                            case 8:
                                idtag = 'nav_initiate';
                                var navtag = 'CommonValidate.ViewInitiateRackRate()';
                                looptag = 1;
                                if (nav_initiate_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_initiate_hit = 1;
                                break;
                            case 9:
                                idtag = 'nav_review';
                                var navtag = 'CommonValidate.ViewRackRateReview()';
                                looptag = 1;
                                if (nav_review_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_review_hit = 1;
                                break;

                            case 10:
                                idtag = 'nav_approval';
                                var navtag = 'CommonValidate.ViewRackRateApproval()';
                                looptag = 1;
                                if (nav_approval_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_approval_hit = 1;
                                break;

                            case 11:
                                idtag = 'nav_freeze';
                                var navtag = 'CommonValidate.ViewFreezeRackRate()';
                                looptag = 1;
                                if (nav_freeze_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_freeze_hit = 1;
                                break;

                            case 12:
                                idtag = 'nav_manage';
                                var navtag = 'CommonValidate.ViewManageRackRate()';
                                looptag = 1;
                                if (nav_manage_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_manage_hit = 1;
                                break;
                                // Base Rack Rate Ends

                                // Tie - Up

                            case 13://"CreateTIEUP"
                                idtag = 'nav_create';
                                var navtag = 'CommonValidate.ViewCreateTieUp()';
                                looptag = 2;
                                if (nav_create_Tieup_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_create_Tieup_hit = 1;
                                break;

                            case 15:
                                idtag = 'nav_initiate';
                                var navtag = 'CommonValidate.ViewInitiateTieUp()';
                                looptag = 1;
                                if (nav_initiate_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_initiate_hit = 1;
                                break;
                            case 16:
                                idtag = 'nav_review';
                                var navtag = 'CommonValidate.ViewTieUpReview()';
                                looptag = 1;
                                if (nav_review_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_review_hit = 1;
                                break;

                            case 17:
                                idtag = 'nav_approval';
                                var navtag = 'CommonValidate.ViewTieUpApproval()';
                                looptag = 1;
                                if (nav_approval_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_approval_hit = 1;
                                break;
                            case 18:
                                idtag = 'nav_freeze';
                                var navtag = 'CommonValidate.ViewFreezeTieUp()';
                                looptag = 1;
                                if (nav_freeze_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_freeze_hit = 1;
                                break;
                            case 19:
                                idtag = 'nav_manage';
                                var navtag = 'CommonValidate.ViewManageTieUp()';
                                looptag = 1;
                                if (nav_manage_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_manage_hit = 1;
                                break;

                                // AdHoc
                            case 20:
                                idtag = 'nav_create';
                                var navtag = 'CommonValidate.ViewCreateAdHoc()';
                                looptag = 1;
                                if (nav_create_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_create_hit = 1;
                                break;
                            case 21:
                                idtag = 'nav_initiate';
                                var navtag = 'CommonValidate.ViewAdHocInitiate()';
                                looptag = 1;
                                if (nav_manage_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_manage_hit = 1;
                                break;
                            case 22:
                                idtag = 'nav_zonalProcessing';
                                var navtag = 'CommonValidate.ViewAdHocZonalProcessing()';
                                looptag = 1;
                                if (nav_zonalProcessing_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_zonalProcessing_hit = 1;
                                break;
                            case 23:
                                idtag = 'nav_salesprocessing';
                                var navtag = 'CommonValidate.ViewAdHocSalesProcessing()';
                                looptag = 1;
                                if (nav_salesprocessing_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_salesprocessing_hit = 1;
                                break;
                            case 24:
                                idtag = 'nav_review';
                                var navtag = 'CommonValidate.ViewAdHocReview()';
                                looptag = 1;
                                if (nav_review_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_review_hit = 1;
                                break;
                            case 25:
                                idtag = 'nav_approve';
                                var navtag = 'CommonValidate.ViewAdHocApproval()';
                                looptag = 1;
                                if (nav_approval_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_approval_hit = 1;
                                break;
                            case 26:
                                idtag = 'nav_freeze';
                                var navtag = 'CommonValidate.ViewAdHocFreeze()';
                                looptag = 1;
                                if (nav_freeze_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_freeze_hit = 1;
                                break;
                            case 27:
                                idtag = 'nav_create';
                                var navtag = 'CommonValidate.ViewCreateSIP()';
                                looptag = 2;
                                if (nav_create_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_create_hit = 1;
                                break;
                            case 29:
                                idtag = 'nav_initiate';
                                var navtag = 'CommonValidate.ViewInitiateSIP()';
                                looptag = 1;
                                if (nav_initiate_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_initiate_hit = 1;
                                break;
                            case 30:
                                idtag = 'nav_review';
                                var navtag = 'CommonValidate.ViewSIPReview()';
                                looptag = 1;
                                if (nav_review_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_review_hit = 1;
                                break;
                            case 31:
                                idtag = 'nav_approval';
                                var navtag = 'CommonValidate.ViewSIPApproval()';
                                looptag = 1;
                                if (nav_approval_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_approval_hit = 1;
                                break;
                            case 32:
                                idtag = 'nav_freeze';
                                var navtag = 'CommonValidate.ViewFreezeSIP()';
                                looptag = 1;
                                if (nav_freeze_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_freeze_hit = 1;
                                break;
                            case 33:
                                idtag = 'nav_manage';
                                var navtag = 'CommonValidate.ViewManageSIP()';
                                looptag = 1;
                                if (nav_manage_hit == 0)
                                    CommonValidate.GetMenuValidate(htmltag, idtag, navtag, looptag);
                                nav_manage_hit = 1;
                                break;
                        }
                        if (i == 1)
                            sessionStorage.setItem("idtag", idtag);
                    }
                    else {
                        //if (rightItems.length == 1) {
                        //    var loc = window.location.toString();
                        //    if (loc.indexOf('Overview') == -1)
                        //        window.location.href = "Overview.html";
                        //}
                    }
                }

                if (sessionStorage.IsmainmenuClicked != undefined && sessionStorage.idtag != undefined && sessionStorage.IsmainmenuClicked == "true" && sessionStorage.idtag != "") {

                    var selectcurrentmenu = "";
                    if (sessionStorage.CurrentMenuselected != undefined && sessionStorage.CurrentMenuselected != "")
                        selectcurrentmenu = sessionStorage.CurrentMenuselected;
                    else
                        selectcurrentmenu = sessionStorage.idtag;

                    //$("#div_main_content ul.btm-nav-ul").removeClass("active");
                    //$("#div_main_content ul.btm-nav-ul li").find("#" + selectcurrentmenu).parent().addClass("active");

                    //$('#' + selectcurrentmenu + '').trigger('click');
                    $('#' + selectcurrentmenu + '').trigger('click');
                }
                //else
                //{
                //    if (sessionStorage.idtag == "nav_approval") {
                //        sessionStorage.CurrentMenuselected = "nav_approval";
                //    }

                //}
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
    //if (sessionStorage.ActiveMainMenu != undefined && sessionStorage.ActiveMainMenu != "") {
    //    CommonValidate.SelectActiveMainMenu(sessionStorage.ActiveMainMenu);
    //    CommonValidate.GetUserMenu();
    //}
    //else

    if (sessionStorage.ActiveMainMenu == undefined || (sessionStorage.ActiveMainMenu != undefined && sessionStorage.ActiveMainMenu == "0"))
        sessionStorage.setItem("ActiveMainMenu", 0);

    CommonValidate.SelectActiveMainMenu(sessionStorage.ActiveMainMenu);
    CommonValidate.GetUserMenu();
});