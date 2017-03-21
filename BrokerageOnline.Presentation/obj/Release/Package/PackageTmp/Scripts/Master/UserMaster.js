var UserMaster = {
    AddNewUser: function () {
        UserMaster.ClearEditScreen();
        UserMaster.LoadRole();
        UserMaster.LoadAccessMenu();
        //UserMaster.LoadAccessMatrix();
        UserMaster.LoadBranch();
        UserMaster.LoadSupervisors();
        $('#mdl_Edit_User').modal('show');
    },

    EditRole: function () {
        var search = $('#dd_role').val();
        if (search != "") {
            Utility.ServiceCall("POST", 'MasterService.svc/GetRoles', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
                var ret = result.GetRolesResult;
                UserMaster.LoadAccessMenu();
                if (ret.length > 0) {
                    $('#dd_brr_rights').multiselect('clearSelection');
                    var BRRIdArr = ret[0].BRRId.split(",");
                    for (i = 0; i < BRRIdArr.length; i++) {
                        $('#dd_brr_rights').multiselect('select', BRRIdArr[i]);
                    }

                    $('#dd_tu_rights').multiselect('clearSelection');
                    var TieupIdArr = ret[0].TieupId.split(",");
                    for (i = 0; i < TieupIdArr.length; i++) {
                        $('#dd_tu_rights').multiselect('select', TieupIdArr[i]);
                    }

                    $('#dd_adh_rights').multiselect('clearSelection');
                    var AdhocIdArr = ret[0].AdhocId.split(",");
                    for (i = 0; i < AdhocIdArr.length; i++) {
                        $('#dd_adh_rights').multiselect('select', AdhocIdArr[i]);
                    }

                    $('#dd_sip_rights').multiselect('clearSelection');
                    var SipIdArr = ret[0].SipId.split(",");
                    for (i = 0; i < SipIdArr.length; i++) {
                        $('#dd_sip_rights').multiselect('select', SipIdArr[i]);
                    }

                    $('#dd_ov_rights').multiselect('clearSelection');
                    var OverviewIdArr = ret[0].OverviewId.split(",");
                    for (i = 0; i < OverviewIdArr.length; i++) {
                        $('#dd_ov_rights').multiselect('select', OverviewIdArr[i]);
                    }

                    $('#dd_rpt_rights').multiselect('clearSelection');
                    var ReportsIdArr = ret[0].ReportsId.split(",");
                    for (i = 0; i < ReportsIdArr.length; i++) {
                        $('#dd_rpt_rights').multiselect('select', ReportsIdArr[i]);
                    }

                    $('#dd_adm_rights').multiselect('clearSelection');
                    var MasterIdArr = ret[0].MastersId.split("~");
                    for (i = 0; i < MasterIdArr.length; i++) {
                        if (i == 0) {
                            UserMaster.GetSubmenu(MasterIdArr[0]);
                            var masteradmin = MasterIdArr[0].split(',');
                            for (j = 0; j < masteradmin.length; j++) {
                                $('#dd_adm_rights').multiselect('select', masteradmin[j]);
                            }
                        }
                        if (i == 1) {
                            var masteradmin = MasterIdArr[1].split(',');
                            for (j = 0; j < masteradmin.length; j++) {
                                $('#dd_sub_rights').multiselect('select', masteradmin[j]);
                            }
                        }
                    }
                }
            });
        }
    },

    ClearEditScreen: function () {
        $('#hidden_rowid').val("");
        $('#hidden_user_id').val("");
        $('#txt_loginid').val("");
        $('#txt_empid').val("");
        $('#txt_empname').val("");
        $("#dt_effective").val("");
        $('#dd_role').val("");
        $('#dd_branch').val("");
        $('#dd_supervisor').val("");

        $('#txt_salesposition').val("");
        $('#txt_email').val("");
        $('#txt_phone').val("");

        $('#txt_mobile').val("");
        $('#dd_status').val("");
    },

    EditUser: function (RowId) {
        var User = $("#grid_users").getRowData(RowId);
        $('#hidden_rowid').val(RowId);
        $('#hidden_user_id').val(User.UserId);
        $('#txt_loginid').val(User.LoginId);
        $('#txt_empid').val(User.EmployeeId);
        $('#txt_empname').val(User.FullName);
        $("#dt_effective").val(User.EffectiveDate);
        UserMaster.LoadRole();
        $('#dd_role').val(User.RoleSeqNo);
        UserMaster.LoadBranch();
        $('#dd_branch').val(User.BranchId);
        UserMaster.LoadSupervisors();
        $('#dd_supervisor').val(User.Supervisor);
        $("#dd_wfreporting").val(User.ReportingManagerId);
        $('#txt_salesposition').val(User.Salesposition);
        $('#txt_email').val(User.Email);
        $('#txt_phone').val(User.Phone);
        $('#txt_mobile').val(User.Mobile);
        //if (User.IsActive == '1') {
        $('#dd_status').val(User.isActive);
        //}
        //else {
        //    $('#dd_status').val("0");
        //}
        UserMaster.LoadAccessMenu();
        $('#dd_brr_rights').multiselect('clearSelection');
        var BRRIdArr = User.BRRId.split(",");
        for (i = 0; i < BRRIdArr.length; i++) {
            $('#dd_brr_rights').multiselect('select', BRRIdArr[i]);
        }

        $('#dd_tu_rights').multiselect('clearSelection');
        var TieupIdArr = User.TieupId.split(",");
        for (i = 0; i < TieupIdArr.length; i++) {
            $('#dd_tu_rights').multiselect('select', TieupIdArr[i]);
        }

        $('#dd_adh_rights').multiselect('clearSelection');
        var AdhocIdArr = User.AdhocId.split(",");
        for (i = 0; i < AdhocIdArr.length; i++) {
            $('#dd_adh_rights').multiselect('select', AdhocIdArr[i]);
        }

        $('#dd_sip_rights').multiselect('clearSelection');
        var SipIdArr = User.SipId.split(",");
        for (i = 0; i < SipIdArr.length; i++) {
            $('#dd_sip_rights').multiselect('select', SipIdArr[i]);
        }

        $('#dd_ov_rights').multiselect('clearSelection');
        var OverviewIdArr = User.OverviewId.split(",");
        for (i = 0; i < OverviewIdArr.length; i++) {
            $('#dd_ov_rights').multiselect('select', OverviewIdArr[i]);
        }

        $('#dd_rpt_rights').multiselect('clearSelection');
        var ReportsIdArr = User.ReportsId.split(",");
        for (i = 0; i < ReportsIdArr.length; i++) {
            $('#dd_rpt_rights').multiselect('select', ReportsIdArr[i]);
        }

        $('#dd_adm_rights').multiselect('clearSelection');
        var MasterIdArr = User.MastersId.split("~");
        for (i = 0; i < MasterIdArr.length; i++) {
            if (i == 0) {
                UserMaster.GetSubmenu(MasterIdArr[0]);
                var masteradmin = MasterIdArr[0].split(',');
                for (j = 0; j < masteradmin.length; j++) {
                    $('#dd_adm_rights').multiselect('select', masteradmin[j]);
                }
            }
            if (i == 1) {
                var masteradmin = MasterIdArr[1].split(',');
                for (j = 0; j < masteradmin.length; j++) {
                    $('#dd_sub_rights').multiselect('select', masteradmin[j]);
                }
            }
        }
        $('#mdl_Edit_User').modal('show');
    },

    DeleteUser: function (RowId) {
        if (confirm("Are you sure you want to delete!")) {
            var ret = $("#grid_users").getRowData(RowId);
            var UserId = ret.UserId;
            Utility.ServiceCall("POST", 'MasterService.svc/DeleteUser', JSON.stringify({ UserID: UserId }), "json", false, false, function (result) {
                var result_d = result.DeleteUserResult;
                if (result_d) {
                    Utility.writeNotification("success", "User Deleted Successfully", "", true);
                    UserMaster.LoadUsers();
                }
            });
        }
    },

    LoadRole: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetRoles', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetRolesResult;
            $("#dd_role").empty();
            $("<option />").text("Select Role").val("").appendTo("#dd_role");
            for (var i = 0; i < data.length; i++) {
                $("<option />").text(data[i].Description).val(data[i].RoleSeqNo).appendTo("#dd_role");
            }
        });
    },

    LoadAccessMenu: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GET_AccessMenu', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GET_AccessMenuResult;
            $("#dd_ov_rights").multiselect('destroy');
            $("#dd_ov_rights").empty();
            $("#dd_brr_rights").multiselect('destroy');
            $("#dd_brr_rights").empty();
            $("#dd_tu_rights").multiselect('destroy');
            $("#dd_tu_rights").empty();
            $("#dd_adh_rights").multiselect('destroy');
            $("#dd_adh_rights").empty();
            $("#dd_sip_rights").multiselect('destroy');
            $("#dd_sip_rights").empty();
            $("#dd_rpt_rights").multiselect('destroy');
            $("#dd_rpt_rights").empty();
            $("#dd_adm_rights").multiselect('destroy');
            $("#dd_adm_rights").empty();
            for (var i = 0; i < data.length; i++) {
                switch (data[i].ModuleId) {
                    case 1:
                        $("<option />").text(data[i].AccessMenuName).val(data[i].AccessMenuId).appendTo("#dd_brr_rights");
                        break;
                    case 2:
                        $("<option />").text(data[i].AccessMenuName).val(data[i].AccessMenuId).appendTo("#dd_tu_rights");
                        break;
                    case 3:
                        $("<option />").text(data[i].AccessMenuName).val(data[i].AccessMenuId).appendTo("#dd_adh_rights");
                        break;
                    case 4:
                        $("<option />").text(data[i].AccessMenuName).val(data[i].AccessMenuId).appendTo("#dd_sip_rights");
                        break;
                    case 5:
                        $("<option />").text(data[i].AccessMenuName).val(data[i].AccessMenuId).appendTo("#dd_ov_rights");
                        break;
                    case 6:
                        $("<option />").text(data[i].AccessMenuName).val(data[i].AccessMenuId).appendTo("#dd_rpt_rights");
                        break;
                    case 7:
                        $("<option />").text(data[i].AccessMenuName).val(data[i].AccessMenuId).appendTo("#dd_adm_rights");
                        break;
                }
            }
            $('#dd_ov_rights').attr("multiple", "multiple");
            $('#dd_ov_rights').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
            });
            $('#dd_ov_rights').multiselect('clearSelection');
            $('#dd_brr_rights').attr("multiple", "multiple");
            $('#dd_brr_rights').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
            });
            $('#dd_brr_rights').multiselect('clearSelection');
            $('#dd_tu_rights').attr("multiple", "multiple");
            $('#dd_tu_rights').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
            });
            $('#dd_tu_rights').multiselect('clearSelection');
            $('#dd_adh_rights').attr("multiple", "multiple");
            $('#dd_adh_rights').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
            });
            $('#dd_adh_rights').multiselect('clearSelection');
            $('#dd_sip_rights').attr("multiple", "multiple");
            $('#dd_sip_rights').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
            });
            $('#dd_sip_rights').multiselect('clearSelection');
            $('#dd_rpt_rights').attr("multiple", "multiple");
            $('#dd_rpt_rights').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
            });
            $('#dd_rpt_rights').multiselect('clearSelection');
            $('#dd_adm_rights').attr("multiple", "multiple");
            $('#dd_adm_rights').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                onChange: function (element, checked) {
                    var brands = $('#dd_adm_rights option:selected');
                    var selected = [];
                    $(brands).each(function (index, brand) {
                        selected.push([$(this).val()]);
                    });
                    if (selected.valueOf() != "") {
                        UserMaster.GetSubmenu(selected.valueOf());
                    }
                    else {
                        $("#dd_sub_rights").multiselect('destroy');
                        $("#dd_sub_rights").empty();
                        $('#dd_sub_rights').multiselect('rebuild');
                    }
                }
            });
            $('#dd_adm_rights').multiselect('clearSelection');

            $("#dd_sub_rights").multiselect('destroy');
            $("#dd_sub_rights").empty();
            // $('#dd_sub_rights').multiselect('rebuild');
        });

    },

    LoadAccessMatrix: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GET_AccessMatrix', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GET_AccessMatrixResult;
            $("#dd_ov_access").multiselect('destroy');
            $("#dd_ov_access").empty();
            $("#dd_brr_access").multiselect('destroy');
            $("#dd_brr_access").empty();
            $("#dd_tu_access").multiselect('destroy');
            $("#dd_tu_access").empty();
            $("#dd_adh_access").multiselect('destroy');
            $("#dd_adh_access").empty();
            $("#dd_sip_access").multiselect('destroy');
            $("#dd_sip_access").empty();
            $("#dd_rpt_access").multiselect('destroy');
            $("#dd_rpt_access").empty();
            for (var i = 0; i < data.length; i++) {
                $("<option />").text(data[i].AccessName).val(data[i].AccessId).appendTo("#dd_ov_access");
                $("<option />").text(data[i].AccessName).val(data[i].AccessId).appendTo("#dd_brr_access");
                $("<option />").text(data[i].AccessName).val(data[i].AccessId).appendTo("#dd_tu_access");
                $("<option />").text(data[i].AccessName).val(data[i].AccessId).appendTo("#dd_adh_access");
                $("<option />").text(data[i].AccessName).val(data[i].AccessId).appendTo("#dd_sip_access");
                $("<option />").text(data[i].AccessName).val(data[i].AccessId).appendTo("#dd_rpt_access");
            }
            $('#dd_ov_access').attr("multiple", "multiple");
            $('#dd_ov_access').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
            });
            $('#dd_ov_access').multiselect('clearSelection');
            $('#dd_brr_access').attr("multiple", "multiple");
            $('#dd_brr_access').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
            });
            $('#dd_brr_access').multiselect('clearSelection');
            $('#dd_tu_access').attr("multiple", "multiple");
            $('#dd_tu_access').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
            });
            $('#dd_tu_access').multiselect('clearSelection');
            $('#dd_adh_access').attr("multiple", "multiple");
            $('#dd_adh_access').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
            });
            $('#dd_adh_access').multiselect('clearSelection');
            $('#dd_sip_access').attr("multiple", "multiple");
            $('#dd_sip_access').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
            });
            $('#dd_sip_access').multiselect('clearSelection');
            $('#dd_rpt_access').attr("multiple", "multiple");
            $('#dd_rpt_access').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
            });
            $('#dd_rpt_access').multiselect('clearSelection');
        });

    },

    LoadBranch: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetMasterScheme', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetMasterSchemeResult;
            $("#dd_branch").empty();
            for (var i = 0; i < data.length; i++) {
                $("<option />").text(data[i].SubRegionName).val(data[i].SubRegionId).appendTo("#dd_branch");
            }
        });
    },

    LoadSupervisors: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetUserView', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetUserViewResult;
            $("#dd_wfreporting").empty();
            $("#dd_supervisor").empty();
            $("<option />").text("Select").val("0").appendTo("#dd_supervisor");
            $("<option />").text("Select").val("0").appendTo("#dd_wfreporting");
            for (var i = 0; i < data.length; i++) {
                $("<option />").text(data[i].FullName).val(data[i].UserId).appendTo("#dd_supervisor");
                $("<option />").text(data[i].FullName).val(data[i].UserId).appendTo("#dd_wfreporting");
            }
        });
    },

    LoadUsers: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetUserView', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetUserViewResult;

            $('#grid_users').jqGrid('clearGridData');
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++)
                    jQuery("#grid_users").jqGrid('addRowData', data[i].id, data[i]);
            }
            else {
                Utility.writeNotification("error", "No Records Found", "", true);
            }
        });
    },

    SaveUser: function () {
        if (UserMaster.UserValid()) {
            var User = {};
            User.UserId = $('#hidden_user_id').val() == "" ? 0 : $('#hidden_user_id').val();
            User.LoginId = $('#txt_loginid').val();
            User.EmployeeId = $('#txt_empid').val();
            User.EmployeeName = $('#txt_empname').val();
            User.Role = $('#dd_role').val();
            User.Branch = $('#dd_branch').val();
            User.Supervisor = $('#dd_supervisor').val();
            User.Salesposition = $('#txt_salesposition').val();
            User.Email = $('#txt_email').val();
            User.IsActive = (parseInt($('#dd_status').val()) == 0 ? false : true);
            User.Mobile = $('#txt_mobile').val();
            User.Phone = $('#txt_phone').val();
            User.Status = $('#dd_status').val();
            User.EffectiveDate = $("#dt_effective").val();
            User.WorkflowReporting = $('#dd_wfreporting').val();

            var Roledetail = "0";
            var Brrmenu = "";
            var Brrselected = $('#dd_brr_rights option:selected');
            $(Brrselected).each(function () {
                if (Roledetail == "") {
                    Roledetail = "1" + "," + $(this).val();
                }
                else {
                    Roledetail = Roledetail + "," + "1" + "," + $(this).val();
                }
                Brrmenu = Brrmenu == "" ? $(this).text() : Brrmenu + "," + $(this).text();
            });

            var TUselected = $('#dd_tu_rights option:selected');
            var TUmenu = "";
            $(TUselected).each(function () {
                if (Roledetail == "") {
                    Roledetail = "2" + "," + $(this).val();
                }
                else {
                    Roledetail = Roledetail + "," + "2" + "," + $(this).val();
                }
                TUmenu = TUmenu == "" ? $(this).text() : TUmenu + "," + $(this).text();
            });

            var adhselected = $('#dd_adh_rights option:selected');
            var adhmenu = "";
            $(adhselected).each(function () {
                if (Roledetail == "") {
                    Roledetail = "3" + "," + $(this).val();
                }
                else {
                    Roledetail = Roledetail + "," + "3" + "," + $(this).val();
                }
                adhmenu = adhmenu == "" ? $(this).text() : adhmenu + "," + $(this).text();
            });

            var sipselected = $('#dd_sip_rights option:selected');
            var sipmenu = "";
            $(sipselected).each(function () {
                if (Roledetail == "") {
                    Roledetail = "4" + "," + $(this).val();
                }
                else {
                    Roledetail = Roledetail + "," + "4" + "," + $(this).val();
                }
                sipmenu = sipmenu == "" ? $(this).text() : sipmenu + "," + $(this).text();
            });

            var Overviewselected = $('#dd_ov_rights option:selected');
            var Overviewmenu = "";
            $(Overviewselected).each(function () {
                if (Roledetail == "") {
                    Roledetail = "5" + "," + $(this).val();
                }
                else {
                    Roledetail = Roledetail + "," + "5" + "," + $(this).val();
                }
                Overviewmenu = Overviewmenu == "" ? $(this).text() : Overviewmenu + "," + $(this).text();
            });

            var rptselected = $('#dd_rpt_rights option:selected');
            var rptmenu = "";
            $(rptselected).each(function () {
                if (Roledetail == "") {
                    Roledetail = "6" + "," + $(this).val();
                }
                else {
                    Roledetail = Roledetail + "," + "6" + "," + $(this).val();
                }
                rptmenu = rptmenu == "" ? $(this).text() : rptmenu + "," + $(this).text();
            });

            var admselected = $('#dd_sub_rights option:selected');
            var admmenu = "";
            $(admselected).each(function () {
                if (Roledetail == "") {
                    Roledetail = "7" + "," + $(this).val();
                }
                else {
                    Roledetail = Roledetail + "," + "7" + "," + $(this).val();
                }
                admmenu = admmenu == "" ? $(this).text() : admmenu + "," + $(this).text();
            });

            var RowId = $('#hidden_rowid').val();
            var OldDetails = $("#grid_users").getRowData(RowId);
            var ChangedValues = [];
            var actiontype = "Insert";
            if (User.UserId == 0) {
                actiontype = "Insert";
            } else {
                actiontype = "Modified";
            }
            if (OldDetails.LoginId != $('#txt_loginid').val()) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.LoginId;
                listitem["NewValue"] = $('#txt_loginid').val();
                listitem["FieldName"] = "LoginId";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.EmployeeId != $('#txt_empid').val()) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.EmployeeId;
                listitem["NewValue"] = $('#txt_empid').val();
                listitem["FieldName"] = "EmployeeId";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.FullName != $('#txt_empname').val()) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.FullName;
                listitem["NewValue"] = $('#txt_empname').val();
                listitem["FieldName"] = "EmployeeName";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.RoleDescription != $("#dd_role option:selected").text()) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.RoleDescription;
                listitem["NewValue"] = $("#dd_role option:selected").text();
                listitem["FieldName"] = "Role";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.Branch != $("#dd_branch option:selected").text()) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.Branch;
                listitem["NewValue"] = $("#dd_branch option:selected").text();
                listitem["FieldName"] = "Branch";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.ReportingManagerName != $("#dd_supervisor option:selected").text()) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.ReportingManagerName;
                listitem["NewValue"] = $("#dd_supervisor option:selected").text();
                listitem["FieldName"] = "WorkFlow Reporting";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.Salesposition != $('#txt_salesposition').val()) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.Salesposition;
                listitem["NewValue"] = $('#txt_salesposition').val();
                listitem["FieldName"] = "Salesposition";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.Email != $('#txt_email').val()) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.Email;
                listitem["NewValue"] = $('#txt_email').val();
                listitem["FieldName"] = "Email";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.Mobile != $('#txt_mobile').val()) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.Mobile;
                listitem["NewValue"] = $('#txt_mobile').val();
                listitem["FieldName"] = "Mobile";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.Phone != $('#txt_phone').val()) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.Phone;
                listitem["NewValue"] = $('#txt_phone').val();
                listitem["FieldName"] = "Phone";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.isActive != $("#dd_status option:selected").text()) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.isActive;
                listitem["NewValue"] = $("#dd_status option:selected").text();
                listitem["FieldName"] = "IsActive";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.EffectiveDate != $('#dt_effective').val()) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.EffectiveDate;
                listitem["NewValue"] = $('#dt_effective').val();
                listitem["FieldName"] = "Effective Date";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.BRR != Brrmenu) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.BRR;
                listitem["NewValue"] = Brrmenu;
                listitem["FieldName"] = "BRR RoleFunction";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.Tieup != TUmenu) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.Tieup;
                listitem["NewValue"] = TUmenu;
                listitem["FieldName"] = "TieUp RoleFunction";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.Adhoc != adhmenu) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.Adhoc;
                listitem["NewValue"] = adhmenu;
                listitem["FieldName"] = "Adhoc RoleFunction";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.Sip != sipmenu) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.Sip;
                listitem["NewValue"] = sipmenu;
                listitem["FieldName"] = "SIP RoleFunction";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.Overview != Overviewmenu) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.Overview;
                listitem["NewValue"] = Overviewmenu;
                listitem["FieldName"] = "Overview RoleFunction";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }

            if (OldDetails.Reports != rptmenu) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.Reports;
                listitem["NewValue"] = rptmenu;
                listitem["FieldName"] = "Reports RoleFunction";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.Masters != admmenu) {
                listitem = {};
                listitem["ScreenName"] = "Employees";
                listitem["OldValue"] = OldDetails.Masters;
                listitem["NewValue"] = admmenu;
                listitem["FieldName"] = "Masters RoleFunction";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }


            Utility.ServiceCall("POST", 'MasterService.svc/Insert_Update_User', JSON.stringify({ InputData: User, Roledetails: Roledetail }), "json", false, false, function (result) {
                if (User.UserId == 0)
                    Utility.writeNotification("success", "User details Added Successfully", "", false);
                else
                    Utility.writeNotification("success", "User details Updated Successfully", "", false);

                $('#mdl_Edit_User').modal('hide');

                Utility.ServiceCall("POST", 'MasterService.svc/GenerateAuditMaster', JSON.stringify({ InputData: ChangedValues }), "json", false, false, function (result) {
                });

                UserMaster.LoadUsers();
            });

        }
    },

    UserValid: function () {
        var error = "";
        if ($('#txt_loginid').val() == "")
            error += "Login Id Required. <br/>"

        if ($('#txt_empid').val() == "")
            error += "Employee Id Required. <br/>"

        if ($('#txt_empname').val() == "")
            error += "Employee Name Required. <br/>"

        if ($('#dd_role').val() == "")
            error += "Role Name  Required. <br/>"

        if ($('#dd_branch').val() == "" || $('#dd_branch').val() == "undefined" || $('#dd_branch').val() == null)
            error += "Branch Name Required. <br/>"

        if ($('#dd_supervisor').val() == "" || $('#dd_supervisor').val() == "undefined" || $('#dd_supervisor').val() == null)
            error += "Supervisor Required. <br/>"

        if ($('#txt_salesposition').val() == "")
            error += "Sales Position Required. <br/>"

        if ($('#txt_email').val() == "")
            error += "Email Id Required. <br/>"

        if ($('#txt_mobile').val() == "")
            error += "Mobile Number Required. <br/>"

        if ($('#dd_status').val() == "" || $('#dd_status').val() == "undefined" || $('#dd_status').val() == null)
            error += "Status Required. <br/>"

        if ($("#dt_effective").val() == "")
            error += "Effective Date Required. <br/>"

        if (error == "")
            return true;
        else {
            Utility.writeNotification("warning", error, "", true);
            return false;
        }
    },

    Cancel: function () {
        UserMaster.ClearEditScreen();
        $('#mdl_Edit_User').modal('hide');
    },

    GetSubmenu: function (SearchText) {
        var arr = SearchText == "" ? "" : SearchText.toString();
        arr = JSON.stringify(arr)

        Utility.ServiceCall("POST", 'MasterService.svc/GetSubmenu', '{"SearchText": ' + arr + '}', "json", false, false, function (result) {
            var arrItems = result.GetSubmenuResult;
            $("#dd_sub_rights").multiselect('destroy');
            $("#dd_sub_rights").empty();
            $('#dd_sub_rights').attr("multiple", "multiple");
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SubMenuName).val(arrItems[i].SubMenuId).appendTo('#dd_sub_rights');
            }
            $('#dd_sub_rights').multiselect('rebuild');
        });
    },
}

$(function () {
    $("#grid_users").jqGrid({
        height: 400,
        datatype: "local",
        width: null,
        shrinkToFit: false,
        //sortable: true,
        rowNum: -1,
        colNames: ['Action', 'Reference ID', 'Full Name', 'Designation', 'Reporting Manager Name', 'Email', 'LoginId', 'Effective Date', 'Emp Code', 'Employee Id',
             'Role', 'Role Description', 'BRRId', 'TieupId', 'AdhocId', 'SipId', 'OverviewId', 'ReportsId', 'MastersId', 'Phone', 'Mobile', 'SalesPosition', 'Branchid', 'Reportingid', 'IsActive', 'RoleSeqNo', 'BranchName', '', '', '', '', '', '', '', 'Supervisor'],
        colModel: [
                    { name: 'act', index: 'act', align: 'center', sortable: false },
                    { name: 'UserId', index: 'UserId', align: 'center', sortable: false },
                    { name: 'FullName', index: 'FullName', sortable: false },
                    { name: 'Designation', index: 'Designation',width: 200, sortable: false },
                    { name: 'ReportingManagerName', index: 'ReportingManagerName', width: 210, sortable: false },
                    { name: 'Email', index: 'Email', width:250,sortable: false },
                    { name: 'LoginId', index: 'LoginId', width: 100, sortable: false },
                    { name: 'EffectiveDate', index: 'EffectiveDate', sortable: false },
                    { name: 'EmpCode', index: 'EmpCode', width: 100, sortable: false },
                    //{ name: 'EmployeeCode', index: 'EmployeeCode' },
                    { name: 'EmployeeId', index: 'EmployeeId', width: 100, sortable: false },
                    { name: 'RoleName', index: 'RoleName',width: 70, sortable: false },
                    { name: 'RoleDescription', index: 'RoleDescription', sortable: false },
                    { name: 'BRRId', index: 'BRRId', hidden: true, sortable: false },
                    { name: 'TieupId', index: 'TieupId', hidden: true, sortable: false },
                    { name: 'AdhocId', index: 'AdhocId', hidden: true, sortable: false },
                    { name: 'SipId', index: 'SipId', hidden: true, sortable: false },
                    { name: 'OverviewId', index: 'OverviewId', hidden: true, sortable: false },
                    { name: 'ReportsId', index: 'ReportsId', hidden: true, sortable: false },
                    { name: 'MastersId', index: 'MastersId', hidden: true, sortable: false },
                    { name: 'Phone', index: 'Phone', hidden: true, sortable: false },
                    { name: 'Mobile', index: 'Mobile', hidden: true, sortable: false },
                    { name: 'Salesposition', index: 'Salesposition', hidden: true, sortable: false },
                    { name: 'BranchId', index: 'BranchId', hidden: true, sortable: false },
                    { name: 'ReportingManagerId', index: 'ReportingManagerId', hidden: true, sortable: false },
                    { name: 'isActive', index: 'isActive', hidden: true, sortable: false },
                    { name: 'RoleSeqNo', index: 'RoleSeqNo', hidden: true, sortable: false },
                    { name: 'BranchName', index: 'BranchName', hidden: true, sortable: false },

                    { name: 'BRR', index: 'BRR', hidden: true, sortable: false },
                    { name: 'Tieup', index: 'TieupId', hidden: true, sortable: false },
                    { name: 'Adhoc', index: 'Adhoc', hidden: true, sortable: false },
                    { name: 'Sip', index: 'Sip', hidden: true, sortable: false },
                    { name: 'Overview', index: 'OverviewId', hidden: true, sortable: false },
                    { name: 'Reports', index: 'ReportsId', hidden: true, sortable: false },
                    { name: 'Masters', index: 'Masters', hidden: true, sortable: false },
                    { name: 'Supervisor', index: 'Supervisor', hidden: true, sortable: false },
        ],
        gridComplete: function () {
            var ids = jQuery("#grid_users").jqGrid('getDataIDs');
            if (ids.length > 0) {
                var i = ids.length - 1;
                var cl = ids[i];
                var be = "<a  href='#' onclick=\"UserMaster.EditUser('" + cl + "');\" ><i class='fa fa-pencil blue'></i> </a>&nbsp;&nbsp;";
                var de = "<a  href='#' onclick=\"UserMaster.DeleteUser('" + cl + "');\"><i class='fa  fa-trash-o red '></i> </a>";
                jQuery("#grid_users").jqGrid('setRowData', ids[i], { act: be + de });
                $("#" + $('#grid_users').jqGrid('getGridParam', 'selrow')).focus();
            }

            //for (var i = 0; i < ids.length; i++) {
            //    var cl = ids[i];
            //    be = "<a  href='#' onclick=\"UserMaster.EditUser('" + cl + "');\" ><i class='fa fa-pencil blue'></i> </a>";
            //    de = "<a  href='#' onclick=\"UserMaster.DeleteUser('" + cl + "');\"><i class='fa  fa-trash-o red '></i> </a>";
            //    jQuery("#grid_users").jqGrid('setRowData', ids[i], { act: be + de });
            //    $("#" + $('#grid_users').jqGrid('getGridParam', 'selrow')).focus();
            //}
        },
        cmTemplate: { title: false },
    });
    $("#dt_effective").datepicker({
        dateFormat: 'dd/mm/y',
        changeMonth: true,
        changeYear: true,
    });

    UserMaster.LoadUsers();
});