var RoleMaster = {
    AddNewRole: function () {
        RoleMaster.ClearEditScreen();
        $('#mdl_Edit_Role').modal('show');
        $("#dd_sub_rights").multiselect('destroy');
        $("#dd_sub_rights").empty();
        $('#dd_sub_rights').multiselect('rebuild');



        //RoleMaster.LoadAccessMatrix();
        RoleMaster.LoadAccessMenu();

        $('#dd_sub_rights').multiselect({
            includeSelectAllOption: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true
        });
    },

    ClearEditScreen: function () {
        $('#hidden_role_seq_no').val("");
        $('#dd_parentrole').val("0");
        $('#txt_role_name').val("");
        $('#txt_description').val("");
        $("#dt_effective").val("");
    },

    LoadRoles: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetDependentRoles', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetDependentRolesResult;
            $("#dd_parentrole").empty();
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    $("<option />").text(data[i].Description).val(data[i].RoleSeqNo).appendTo("#dd_parentrole");
                }
            }
            else {
                Utility.writeNotification("error", "No Records Found", "", true);
            }
        });

        Utility.ServiceCall("POST", 'MasterService.svc/GetRoles', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetRolesResult;
            $('#grid_role').jqGrid('clearGridData');
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    jQuery("#grid_role").jqGrid('addRowData', data[i].id, data[i]);
                }
            }
            else {
                Utility.writeNotification("error", "No Records Found", "", true);
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
                        RoleMaster.GetSubmenu(selected.valueOf());
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

    ParentRoleOnChange: function () {
        var ParentRoleValue = $('#dd_parentrole option:selected').val();
        var gridData = jQuery("#grid_role").jqGrid('getRowData');
        var ret;
        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].RoleSeqNo == ParentRoleValue) {
                ret = gridData[i];
                break;
            }
        }

        //$('#hidden_rowid').val(RowId);
        //RoleMaster.LoadAccessMenu();
        //$('#hidden_role_seq_no').val(ret.RoleSeqNo);
        //$('#dd_parentrole').val(ret.RoleId);
        //$('#txt_role_name').val(ret.RoleName);
        //$('#txt_description').val(ret.Description);
        //$("#dt_effective").val(ret.EffectiveDate);

        //if (ret.RoleStatus == 'Active')
        //    $('#dd_status').val(1);
        //else
        //    $('#dd_status').val(0);

        $('#dd_brr_rights').multiselect('clearSelection');
        var BRRIdArr = ret.BRRId.split(",");
        for (i = 0; i < BRRIdArr.length; i++) {
            $('#dd_brr_rights').multiselect('select', BRRIdArr[i]);
        }

        $('#dd_tu_rights').multiselect('clearSelection');
        var TieupIdArr = ret.TieupId.split(",");
        for (i = 0; i < TieupIdArr.length; i++) {
            $('#dd_tu_rights').multiselect('select', TieupIdArr[i]);
        }

        $('#dd_adh_rights').multiselect('clearSelection');
        var AdhocIdArr = ret.AdhocId.split(",");
        for (i = 0; i < AdhocIdArr.length; i++) {
            $('#dd_adh_rights').multiselect('select', AdhocIdArr[i]);
        }

        $('#dd_sip_rights').multiselect('clearSelection');
        var SipIdArr = ret.SipId.split(",");
        for (i = 0; i < SipIdArr.length; i++) {
            $('#dd_sip_rights').multiselect('select', SipIdArr[i]);
        }

        $('#dd_ov_rights').multiselect('clearSelection');
        var OverviewIdArr = ret.OverviewId.split(",");
        for (i = 0; i < OverviewIdArr.length; i++) {
            $('#dd_ov_rights').multiselect('select', OverviewIdArr[i]);
        }

        $('#dd_rpt_rights').multiselect('clearSelection');
        var ReportsIdArr = ret.ReportsId.split(",");
        for (i = 0; i < ReportsIdArr.length; i++) {
            $('#dd_rpt_rights').multiselect('select', ReportsIdArr[i]);
        }

        $('#dd_adm_rights').multiselect('clearSelection');
        var MasterIdArr = ret.MastersId.split("~");
        for (i = 0; i < MasterIdArr.length; i++) {
            if (i == 0) {
                RoleMaster.GetSubmenu(MasterIdArr[0]);
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
    },


    EditRole: function (RowId) {
        var ret = $("#grid_role").getRowData(RowId);
        $('#hidden_rowid').val(RowId);
        // RoleMaster.LoadAccessMatrix();
        RoleMaster.LoadAccessMenu();
        $('#hidden_role_seq_no').val(ret.RoleSeqNo);
        $('#dd_parentrole').val(ret.RoleId);
        $('#txt_role_name').val(ret.RoleName);
        $('#txt_description').val(ret.Description);
        $("#dt_effective").val(ret.EffectiveDate);

        if (ret.RoleStatus == 'Active')
            $('#dd_status').val(1);
        else
            $('#dd_status').val(0);

        $('#dd_brr_rights').multiselect('clearSelection');
        var BRRIdArr = ret.BRRId.split(",");
        for (i = 0; i < BRRIdArr.length; i++) {
            $('#dd_brr_rights').multiselect('select', BRRIdArr[i]);
        }

        $('#dd_tu_rights').multiselect('clearSelection');
        var TieupIdArr = ret.TieupId.split(",");
        for (i = 0; i < TieupIdArr.length; i++) {
            $('#dd_tu_rights').multiselect('select', TieupIdArr[i]);
        }

        $('#dd_adh_rights').multiselect('clearSelection');
        var AdhocIdArr = ret.AdhocId.split(",");
        for (i = 0; i < AdhocIdArr.length; i++) {
            $('#dd_adh_rights').multiselect('select', AdhocIdArr[i]);
        }

        $('#dd_sip_rights').multiselect('clearSelection');
        var SipIdArr = ret.SipId.split(",");
        for (i = 0; i < SipIdArr.length; i++) {
            $('#dd_sip_rights').multiselect('select', SipIdArr[i]);
        }

        $('#dd_ov_rights').multiselect('clearSelection');
        var OverviewIdArr = ret.OverviewId.split(",");
        for (i = 0; i < OverviewIdArr.length; i++) {
            $('#dd_ov_rights').multiselect('select', OverviewIdArr[i]);
        }

        $('#dd_rpt_rights').multiselect('clearSelection');
        var ReportsIdArr = ret.ReportsId.split(",");
        for (i = 0; i < ReportsIdArr.length; i++) {
            $('#dd_rpt_rights').multiselect('select', ReportsIdArr[i]);
        }

        $('#dd_adm_rights').multiselect('clearSelection');
        var MasterIdArr = ret.MastersId.split("~");
        for (i = 0; i < MasterIdArr.length; i++) {
            if (i == 0) {
                RoleMaster.GetSubmenu(MasterIdArr[0]);
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

        //$('#dd_sub_rights').multiselect('clearSelection');
        //var SubmenuIdArr = ret.SubmenuId.split(",");
        //for (i = 0; i < SubmenuIdArr.length; i++) {
        //    $('#dd_sub_rights').multiselect('select', SubmenuIdArr[i]);
        //} 

        $('#mdl_Edit_Role').modal('show');

    },

    DeleteRole: function (RowId) {
        if (confirm("Are you sure you want to delete!")) {
            var ret = $("#grid_role").getRowData(RowId);
            var roleSeqNo = ret.RoleSeqNo;
            Utility.ServiceCall("POST", 'MasterService.svc/DeleteRole', JSON.stringify({ RoleSeqNo: roleSeqNo }), "json", false, false, function (result) {
                Utility.writeNotification("error", "Role Deleted Successfully", "", false);
                RoleMaster.LoadRoles();
            });
        }
    },

    SaveRole: function () {
        if (RoleMaster.RoleValid()) {
            var Roledetail = [];
            var RoleData = [{
                RoleSeqNo: $('#hidden_role_seq_no').val() == "" ? 0 : $('#hidden_role_seq_no').val(),
                RoleId: $('#dd_parentrole').val() == "" ? 0 : $('#dd_parentrole').val(),
                RoleName: $('#txt_role_name').val(),
                Description: $('#txt_description').val(),
                EffectiveDate: $('#dt_effective').val(),
                isActive: (parseInt($('#dd_status').val()) == 0 ? false : true),
                CreatedByName: "",
                ModifiedByName: "",
                Rolefunction: "",
                AccesssMatrix: "",
                RolefunctionID: ""
            }];

            var Brrselected = $('#dd_brr_rights option:selected');
            var Brrmenu = "";
            $(Brrselected).each(function () {
                listitem = {};
                listitem["ModuleId"] = 1;
                listitem["MenuId"] = $(this).val();
                listitem["ViewAccess"] = 1;
                listitem["EditAccess"] = 1;
                listitem["CopyAccess"] = 1;
                listitem["DeleteAccess"] = 1;
                Roledetail.push(listitem);
                Brrmenu = Brrmenu == "" ? $(this).text() : Brrmenu + "," + $(this).text();
            });

            var TUselected = $('#dd_tu_rights option:selected');
            var TUmenu = "";
            $(TUselected).each(function () {
                listitem = {};
                listitem["ModuleId"] = 2;
                listitem["MenuId"] = $(this).val();
                listitem["ViewAccess"] = 1;
                listitem["EditAccess"] = 1;
                listitem["CopyAccess"] = 1;
                listitem["DeleteAccess"] = 1;
                Roledetail.push(listitem);
                TUmenu = TUmenu == "" ? $(this).text() : TUmenu + "," + $(this).text();
            });

            var adhselected = $('#dd_adh_rights option:selected');
            var adhmenu = "";
            $(adhselected).each(function () {
                listitem = {};
                listitem["ModuleId"] = 3;
                listitem["MenuId"] = $(this).val();
                listitem["ViewAccess"] = 1;
                listitem["EditAccess"] = 1;
                listitem["CopyAccess"] = 1;
                listitem["DeleteAccess"] = 1;
                Roledetail.push(listitem);
                adhmenu = adhmenu == "" ? $(this).text() : adhmenu + "," + $(this).text();
            });

            var sipselected = $('#dd_sip_rights option:selected');
            var sipmenu = "";
            $(sipselected).each(function () {
                listitem = {};
                listitem["ModuleId"] = 4;
                listitem["MenuId"] = $(this).val();
                listitem["ViewAccess"] = 1;
                listitem["EditAccess"] = 1;
                listitem["CopyAccess"] = 1;
                listitem["DeleteAccess"] = 1;
                Roledetail.push(listitem);
                sipmenu = sipmenu == "" ? $(this).text() : sipmenu + "," + $(this).text();
            });

            var Overviewselected = $('#dd_ov_rights option:selected');
            var Overviewmenu = "";
            $(Overviewselected).each(function () {
                listitem = {};
                listitem["ModuleId"] = 5;
                listitem["MenuId"] = $(this).val();
                listitem["ViewAccess"] = 1;
                listitem["EditAccess"] = 1;
                listitem["CopyAccess"] = 1;
                listitem["DeleteAccess"] = 1;
                Roledetail.push(listitem);
                Overviewmenu = Overviewmenu == "" ? $(this).text() : Overviewmenu + "," + $(this).text();
            });

            var rptselected = $('#dd_rpt_rights option:selected');
            var rptmenu = "";
            $(rptselected).each(function () {
                listitem = {};
                listitem["ModuleId"] = 6;
                listitem["MenuId"] = $(this).val();
                listitem["ViewAccess"] = 1;
                listitem["EditAccess"] = 1;
                listitem["CopyAccess"] = 1;
                listitem["DeleteAccess"] = 1;
                Roledetail.push(listitem);
                rptmenu = rptmenu == "" ? $(this).text() : rptmenu + "," + $(this).text();
            });

            var admselected = $('#dd_sub_rights option:selected');
            var admmenu = "";
            $(admselected).each(function () {
                listitem = {};
                listitem["ModuleId"] = 7;
                listitem["MenuId"] = $(this).val();
                listitem["ViewAccess"] = 1;
                listitem["EditAccess"] = 1;
                listitem["CopyAccess"] = 1;
                listitem["DeleteAccess"] = 1;
                Roledetail.push(listitem);
                admmenu = admmenu == "" ? $(this).text() : admmenu + "," + $(this).text();
            });


            var RowId = $('#hidden_rowid').val();
            var OldDetails = $("#grid_role").getRowData(RowId);
            var ChangedValues = [];
            var actiontype = "Insert";
            if (RoleData.RoleSeqNo == 0) {
                actiontype = "Insert";
            } else {
                actiontype = "Modified";
            }

            if (OldDetails.RoleName != $('#txt_role_name').val()) {
                listitem = {};
                listitem["ScreenName"] = "Roles";
                listitem["OldValue"] = OldDetails.RoleName;
                listitem["NewValue"] = $('#txt_role_name').val();
                listitem["FieldName"] = "Role Name";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.Description != $('#txt_description').val()) {
                listitem = {};
                listitem["ScreenName"] = "Roles";
                listitem["OldValue"] = OldDetails.Description;
                listitem["NewValue"] = $('#txt_description').val();
                listitem["FieldName"] = "Description";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.EffectiveDate != $('#dt_effective').val()) {
                listitem = {};
                listitem["ScreenName"] = "Roles";
                listitem["OldValue"] = OldDetails.EffectiveDate;
                listitem["NewValue"] = $('#dt_effective').val();
                listitem["FieldName"] = "Effective Date";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.BRR != Brrmenu) {
                listitem = {};
                listitem["ScreenName"] = "Roles";
                listitem["OldValue"] = OldDetails.BRR;
                listitem["NewValue"] = Brrmenu;
                listitem["FieldName"] = "BRR RoleFunction";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.Tieup != TUmenu) {
                listitem = {};
                listitem["ScreenName"] = "Roles";
                listitem["OldValue"] = OldDetails.Tieup;
                listitem["NewValue"] = TUmenu;
                listitem["FieldName"] = "TieUp RoleFunction";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.Adhoc != adhmenu) {
                listitem = {};
                listitem["ScreenName"] = "Roles";
                listitem["OldValue"] = OldDetails.Adhoc;
                listitem["NewValue"] = adhmenu;
                listitem["FieldName"] = "Adhoc RoleFunction";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.Sip != sipmenu) {
                listitem = {};
                listitem["ScreenName"] = "Roles";
                listitem["OldValue"] = OldDetails.Sip;
                listitem["NewValue"] = sipmenu;
                listitem["FieldName"] = "SIP RoleFunction";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.Overview != Overviewmenu) {
                listitem = {};
                listitem["ScreenName"] = "Roles";
                listitem["OldValue"] = OldDetails.Overview;
                listitem["NewValue"] = Overviewmenu;
                listitem["FieldName"] = "Overview RoleFunction";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }

            if (OldDetails.Reports != rptmenu) {
                listitem = {};
                listitem["ScreenName"] = "Roles";
                listitem["OldValue"] = OldDetails.Reports;
                listitem["NewValue"] = rptmenu;
                listitem["FieldName"] = "Reports RoleFunction";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.Masters != admmenu) {
                listitem = {};
                listitem["ScreenName"] = "Roles";
                listitem["OldValue"] = OldDetails.Masters;
                listitem["NewValue"] = admmenu;
                listitem["FieldName"] = "Masters RoleFunction";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            Utility.ServiceCall("POST", 'MasterService.svc/SaveRoleInformation', JSON.stringify({ Roledetail: RoleData, RoleData: Roledetail }), "json", false, false, function (result) {
                if (RoleData.RoleSeqNo == 0)
                    Utility.writeNotification("success", "Role Inserted Successfully", "", false);
                else
                    Utility.writeNotification("success", "Role Updated Successfully", "", false);
                $('#mdl_Edit_Role').modal('hide');

                Utility.ServiceCall("POST", 'MasterService.svc/GenerateAuditMaster', JSON.stringify({ InputData: ChangedValues }), "json", false, false, function (result) {
                });

                RoleMaster.LoadRoles();
            });
            //Utility.ServiceCall("POST", 'MasterService.svc/Insert_Update_Role', JSON.stringify({ InputData: Role }), "json", false, false, function (result) {
            //    if (Role.RoleSeqNo == 0)
            //        Utility.writeNotification("success", "Role Inserted Successfully", "", false);
            //    else
            //        Utility.writeNotification("success", "Role Updated Successfully", "", false);

            //    $('#mdl_Edit_Role').modal('hide');

            //    RoleMaster.LoadRoles();
            //});

        }
    },

    RoleValid: function () {
        var error = "";
        if ($('#txt_role_name').val() == "")
            error += "Role Name Required. <br/>"

        if ($('#txt_description').val() == "")
            error += "Description Required. <br/>"

        if ($("#dt_effective").val() == "")
            error += "Effective Date Required. <br/>"

        //if ($("#dd_parentrole").val() == "")
        //    error += "Dependent Role Required. <br/>"

        if (error == "")
            return true;
        else {
            Utility.writeNotification("warning", error, "", true);
            return false;
        }
    },

    Cancel: function () {
        RoleMaster.ClearEditScreen();
        $('#mdl_Edit_Role').modal('hide');
    },

}



$(function () {
    $("#grid_role").jqGrid({
        height: 400,
        datatype: "local",
        width: null,
        shrinkToFit: false,
        sortable: false,
        rowNum: -1,
        colNames: ['Action', 'Reference ID', 'RoleId', 'BRRId', 'TieupId', 'AdhocId', 'SipId', 'OverviewId', 'ReportsId', 'MastersId', 'RoleStatus', 'BRRAccess', 'TieupAccess', 'AdhocAccess', 'SipAccess', 'OverviewAccess', 'ReportsAccess', 'MastersAccess', 'Role Name', 'Description', 'Effective Date', 'BRR', 'TIEUP', 'ADHOC', 'SIP', 'OVERVIEW', 'REPORTS', 'MASTERS'],
        colModel: [
                    { name: 'act', index: 'act', align: 'center', sortable: false },
                    { name: 'RoleSeqNo', index: 'RoleSeqNo', align: 'center', sortable: false },
                    { name: 'RoleId', index: 'RoleId', hidden: true, sortable: false },
                    { name: 'BRRId', index: 'BRRId', hidden: true, sortable: false },
                    { name: 'TieupId', index: 'TieupId', hidden: true, sortable: false },
                    { name: 'AdhocId', index: 'AdhocId', hidden: true, sortable: false },
                    { name: 'SipId', index: 'SipId', hidden: true, sortable: false },
                    { name: 'OverviewId', index: 'OverviewId', hidden: true, sortable: false },
                    { name: 'ReportsId', index: 'ReportsId', hidden: true, sortable: false },
                    { name: 'MastersId', index: 'MastersId', hidden: true, sortable: false },
                    { name: 'RoleStatus', index: 'RoleStatus', sortable: false },
                    { name: 'BRRAccess', index: 'BRRAccess', hidden: true, sortable: false },
                    { name: 'TieupAccess', index: 'TieupAccess', hidden: true, sortable: false },
                    { name: 'AdhocAccess', index: 'AdhocAccess', hidden: true, sortable: false },
                    { name: 'SipAccess', index: 'SipAccess', hidden: true, sortable: false },
                    { name: 'OverviewAccess', index: 'OverviewAccess', hidden: true, sortable: false },
                    { name: 'ReportsAccess', index: 'ReportsAccess', hidden: true, sortable: false },
                    { name: 'MastersAccess', index: 'MastersAccess', hidden: true, sortable: false },
                    { name: 'RoleName', index: 'RoleName', sortable: false },
                    { name: 'Description', index: 'Description', sortable: false },
                    { name: 'EffectiveDate', index: 'EffectiveDate', sortable: false },
                    { name: 'BRR', index: 'BRR', sortable: false },
                    { name: 'Tieup', index: 'Tieup', sortable: false },
                    { name: 'Adhoc', index: 'Adhoc', sortable: false },
                    { name: 'Sip', index: 'Sip', sortable: false },
                    { name: 'Overview', index: 'Overview', sortable: false },
                    { name: 'Reports', index: 'Reports', sortable: false },
                    { name: 'Masters', index: 'Masters', sortable: false },
        ],
        gridComplete: function () {
            var ids = jQuery("#grid_role").jqGrid('getDataIDs');
            if (ids.length > 0) {
                var i = ids.length - 1;
                var cl = ids[i];
                be = "<a  href='#' onclick=\"RoleMaster.EditRole('" + cl + "');\" ><i class='fa fa-pencil blue'></i> </a>&nbsp;&nbsp;";
                //de = "<a  href='#' onclick=\"RoleMaster.DeleteRole('" + cl + "');\"><i class='fa  fa-trash-o red '></i> </a>";
                jQuery("#grid_role").jqGrid('setRowData', ids[i], { act: be });
                $("#" + $('#grid_role').jqGrid('getGridParam', 'selrow')).focus();
            }
            //for (var i = 0; i < ids.length; i++) {
            //    var cl = ids[i];
            //    be = "<a  href='#' onclick=\"RoleMaster.EditRole('" + cl + "');\" ><i class='fa fa-pencil blue'></i> </a>";
            //    de = "<a  href='#' onclick=\"RoleMaster.DeleteRole('" + cl + "');\"><i class='fa  fa-trash-o red '></i> </a>";
            //    jQuery("#grid_role").jqGrid('setRowData', ids[i], { act: be + de });
            //    $("#" + $('#grid_role').jqGrid('getGridParam', 'selrow')).focus();
            //}
        }, cmTemplate: { title: false },
    });
    $("#dt_effective").datepicker({
        dateFormat: 'dd/mm/y',
        changeMonth: true,
        changeYear: true,
    });

    RoleMaster.LoadRoles();
});