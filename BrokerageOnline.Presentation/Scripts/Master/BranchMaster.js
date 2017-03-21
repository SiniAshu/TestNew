var BranchMaster = {
    AddNewBranch: function () {
        BranchMaster.ClearEditScreen();
        BranchMaster.LoadZone();
        BranchMaster.LoadRegion();
        $('#mdl_Edit_Role').modal('show');
    },

    ClearEditScreen: function () {
        $('#hidden_category_id').val("");
        $('#txt_category_name').val("");
        $('#txt_category_code').val("");
        $('#txt_slab').val("");
        $("#dt_effective").val("");
        $("#txt_branch").val("");
    },

    LoadZone: function () {
        var search = 'zone';
        Utility.ServiceCall("POST", 'MasterService.svc/Getzoneandregion', JSON.stringify({ SearchText: 'zone' }), "json", false, false, function (result) {
            var data = result.GetzoneandregionResult;
            $("#dd_zone").empty();
            $("#dd_zone").append("<option  value='' selected>Select Zone</option>");
            for (var i = 0; i < data.length; i++) {
                $("<option />").text(data[i].ZoneName).val(data[i].ZoneId).appendTo("#dd_zone");
            }
        });
    },

    LoadRegion: function () {
        var search = $('#dd_zone option:selected').val();
        Utility.ServiceCall("POST", 'MasterService.svc/Getzoneandregion', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetzoneandregionResult;
            $("#dd_region").empty();
            $("#dd_region").append("<option  value='' selected>Select Region</option>");
            for (var i = 0; i < data.length; i++) {
                $("<option />").text(data[i].ZoneName).val(data[i].ZoneId).appendTo("#dd_region");
            }
            $("#dd_area").empty();
            $("#dd_area").append("<option  value='' selected>Select Area</option>");
            for (var i = 0; i < data.length; i++) {
                $("<option />").text(data[i].ZoneName).val(data[i].ZoneId).appendTo("#dd_area");
            }

        });
    },

    LoadBranch: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetBranchMaster', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetBranchMasterResult;

            $('#grid_role').jqGrid('clearGridData');
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++)
                    jQuery("#grid_role").jqGrid('addRowData', data[i].id, data[i]);
            }
            else {
                Utility.writeNotification("error", "No Records Found", "", true);
            }
        });
    },

    EditBranch: function (RowId) {
        var Branch = $("#grid_role").getRowData(RowId);
        $('#hidden_rowid').val(RowId);
        $('#hidden_branch_id').val(Branch.BranchId);
        $('#txt_branch').val(Branch.BranchName);
        BranchMaster.LoadZone();
        $('#dd_zone').val(Branch.ZoneId);
        if ($('#dd_zone option:selected').val() != "") {
            BranchMaster.LoadRegion();
        }
        //$('#dd_zone').val(Branch.Area);
        $('#dd_region').val(Branch.RegionID);
        $('#dd_region').val(Branch.RegionID);
        if (Branch.IsActive == 'true') {
            $('#dd_status').val("1");
        }
        else {
            $('#dd_status').val("0");
        }
        $("#dt_effective").val(Branch.EffectiveDate);
        $('#mdl_Edit_Role').modal('show');
    },

    DeleteBranch: function (RowId) {
        if (confirm("Are you sure you want to delete!")) {
            var ret = $("#grid_role").getRowData(RowId);
            var BranchId = ret.BranchId;
            Utility.ServiceCall("POST", 'MasterService.svc/DeleteBranch', JSON.stringify({ BranchID: BranchId }), "json", false, false, function (result) {
                var result_d = result.DeleteBranchResult;
                if (result_d) {
                    Utility.writeNotification("success", "Branch Deleted Successfully", "", true);
                    //Utility.writeNotification("sucesss", "Branch Deleted Successfully", "", false);
                    BranchMaster.LoadBranch();
                }
            });
        }
    },
  


    SaveBranch: function () {
        if (BranchMaster.BranchValid()) {
            var Branch = {};
            Branch.BranchId = $('#hidden_branch_id').val() == "" ? 0 : $('#hidden_branch_id').val();
            Branch.BranchName = $('#txt_branch').val();
            Branch.ZoneId = $('#dd_zone :selected').val();
            Branch.RegionID = $('#dd_region :selected').val();
            Branch.IsActive = $('#dd_status :selected').val();
            Branch.EffectiveDate = $('#dt_effective').val();
            var RowId = $('#hidden_rowid').val();
            var OldDetails = $("#grid_role").getRowData(RowId);
            var ChangedValues = [];
            var actiontype = "Insert";
            if (Branch.BranchId == 0) {
                actiontype = "Insert";
            } else {
                actiontype = "Modified";
            }

            if (OldDetails.BranchName != $('#txt_branch').val()) {
                listitem = {};
                listitem["ScreenName"] = "Branch";
                listitem["OldValue"] = OldDetails.BranchName;
                listitem["NewValue"] = $('#txt_branch').val();
                listitem["FieldName"] = "Branch Name";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.ZoneName != $('#dd_zone :selected').text()) {
                listitem = {};
                listitem["ScreenName"] = "Branch";
                listitem["OldValue"] = OldDetails.ZoneName;
                listitem["NewValue"] = $('#dd_zone :selected').text();
                listitem["FieldName"] = "Zone Name";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.RegionName != $('#dd_region :selected').text()) {
                listitem = {};
                listitem["ScreenName"] = "Branch";
                listitem["OldValue"] = OldDetails.RegionName;
                listitem["NewValue"] = $('#dd_region :selected').text();
                listitem["FieldName"] = "Region Name";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.BranchStatus != $('#dd_status :selected').text()) {
                listitem = {};
                listitem["ScreenName"] = "Branch";
                listitem["OldValue"] = OldDetails.BranchStatus;
                listitem["NewValue"] = $('#dd_status :selected').text();
                listitem["FieldName"] = "Status";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }

            if (OldDetails.EffectiveDate != $('#dt_effective').val()) {
                listitem = {};
                listitem["ScreenName"] = "Branch";
                listitem["OldValue"] = OldDetails.EffectiveDate;
                listitem["NewValue"] = $('#dt_effective').val();
                listitem["FieldName"] = "EffectiveDate";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }

            Utility.ServiceCall("POST", 'MasterService.svc/Insert_Update_BranchMaster', JSON.stringify({ InputData: Branch }), "json", false, false, function (result) {
                if (Branch.BranchId == 0)
                    Utility.writeNotification("success", "Branch Inserted Successfully", "", false);
                else
                    Utility.writeNotification("success", "Branch Updated Successfully", "", false);

                Utility.ServiceCall("POST", 'MasterService.svc/GenerateAuditMaster', JSON.stringify({ InputData: ChangedValues }), "json", false, false, function (result) {
                });

                $('#mdl_Edit_Role').modal('hide');

                BranchMaster.LoadBranch();
            });

        }
    },

    BranchValid: function () {
        var error = "";
        if ($('#dd_zone').val() == "")
            error += "Zone Required. <br/>"

        if ($('#dd_region').val() == "")
            error += "Region Required. <br/>"

        if ($('#txt_branch').val() == "")
            error += "Branch Name Required. <br/>"

        if ($('#dd_status').val() == "")
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
        $('#mdl_Edit_Role').modal('hide');
    },

}

$('#btn_save').click(function () {

    BranchMaster.SaveBranch();

});

$(function () {
    $("#grid_role").jqGrid({
        height: 400,
        datatype: "local",
        width: null,
        shrinkToFit: false,
        sortable: true,
        rowNum: -1,
        colNames: ['Action', 'Reference ID', 'RegionID', 'ZoneId', 'Zone Name', 'Region Name', 'Branch Name', 'Branch Status', 'Effective Date', 'IsActive'],
        colModel: [
                    { name: 'act', index: 'act', width: 80, align: 'center', sortable: false },
                    { name: 'BranchId', index: 'BranchId', align: 'center', sortable: false },
                    { name: 'RegionID', index: 'RegionID', hidden: true, sortable: false },
                    { name: 'ZoneId', index: 'ZoneId', hidden: true, sortable: false },
                    { name: 'ZoneName', index: 'ZoneName', sortable: false , sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'RegionName', index: 'RegionName', sortable: false , sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'BranchName', index: 'BranchName', sortable: false ,sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'BranchStatus', index: 'BranchStatus', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'EffectiveDate', index: 'EffectiveDate', sortable: false, sorttype: 'date', datefmt: 'd/m/Y', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
                    { name: 'IsActive', index: 'IsActive', hidden: true, sortable: false }
        ],
        ignoreCase: true,
        viewrecords: true,
        rowNum: 20,
        rowList: [10, 20, 50, 100],
        rownumbers: true,
        rownumWidth: 42,
        gridComplete: function () {
            var ids = jQuery("#grid_role").jqGrid('getDataIDs');
            if (ids.length > 0) {
                var i = ids.length - 1;
                var cl = ids[i];
                be = "<a  href='#' onclick=\"BranchMaster.EditBranch('" + cl + "');\" ><i class='fa fa-pencil blue'></i> </a>&nbsp;&nbsp;";
                de = "<a  href='#' onclick=\"BranchMaster.DeleteBranch('" + cl + "');\"><i class='fa  fa-trash-o red '></i> </a>";
                jQuery("#grid_role").jqGrid('setRowData', ids[i], { act: be + de });
                $("#" + $('#grid_role').jqGrid('getGridParam', 'selrow')).focus();
            }
        }, cmTemplate: { title: false },
    }).jqGrid('filterToolbar', { searchOperators: true, stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
   
    $("#dt_effective").datepicker({
        dateFormat: 'dd/mm/y',
        changeMonth: true,
        changeYear: true,
    });
    BranchMaster.LoadBranch();
});