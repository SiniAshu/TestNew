var DistributorCategoryMaster = {
    AddNewRole: function () {
        DistributorCategoryMaster.ClearEditScreen();
        $('#mdl_Edit_Role').modal('show');
    },

    ClearEditScreen: function () {
        $('#hidden_category_id').val("");
        $('#txt_category_name').val("");
        $('#txt_category_code').val("");
        $('#txt_slab').val("");
        $('#txt_sip_slab').val("");
        $("#dt_effective").val("");
    },

    LoadRoles: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetMasterDistributorCategory', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetMasterDistributorCategoryResult;

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

    EditRole: function (RowId) {
        var DistributorCategory = $("#grid_role").getRowData(RowId);
        $('#hidden_rowid').val(RowId);
        $('#hidden_category_id').val(DistributorCategory.DistributorCategoryId);
        $('#txt_category_name').val(DistributorCategory.DistributorCategoryName);
        $('#txt_category_code').val(DistributorCategory.DistributorCategoryCode);
        $('#txt_slab').val(DistributorCategory.Slab);
        $('#txt_sip_slab').val(DistributorCategory.SIPSlab);
        $('#dd_status').val(DistributorCategory.IsActive);
        $("#dt_effective").val(DistributorCategory.EffectiveDate);
        $('#mdl_Edit_Role').modal('show');
    },

    DeleteRole: function (RowId) {
        if (confirm("Are you sure you want to delete!")) {
            var ret = $("#grid_role").getRowData(RowId);
            var roleSeqNo = ret.DistributorCategoryId;
            Utility.ServiceCall("POST", 'MasterService.svc/DeleteDistributorCategory', JSON.stringify({ DistributorCategoryId: roleSeqNo }), "json", false, false, function (result) {
                Utility.writeNotification("error", "Distributor Category In-Activated Successfully", "", false);
                DistributorCategoryMaster.LoadRoles();
            });
        }
    },

    SaveRole: function () {
        if (DistributorCategoryMaster.RoleValid()) {
            var DistributorCategory = {};
            DistributorCategory.DistributorCategoryId = $('#hidden_category_id').val() == "" ? 0 : $('#hidden_category_id').val();
            DistributorCategory.DistributorCategoryName = $('#txt_category_name').val();
            DistributorCategory.DistributorCategoryCode = $('#txt_category_code').val();
            DistributorCategory.Slab = $('#txt_slab').val();
            DistributorCategory.SIPSlab = $('#txt_sip_slab').val();
            DistributorCategory.IsActive = $('#dd_status :selected').val();
            DistributorCategory.EffectiveDate = $("#dt_effective").val();

            var RowId = $('#hidden_rowid').val();
            var OldDetails = $("#grid_role").getRowData(RowId);
            var ChangedValues = [];
            var actiontype = "Insert";
            if (DistributorCategory.DistributorCategoryId == 0) {
                actiontype = "Insert";
            } else {
                actiontype = "Modified";
            }

            if (OldDetails.DistributorCategoryName != $('#txt_category_name').val()) {
                listitem = {};
                listitem["ScreenName"] = "Distributor Category";
                listitem["OldValue"] = OldDetails.DistributorCategoryName;
                listitem["NewValue"] = $('#txt_category_name').val();
                listitem["FieldName"] = "Category Name";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.DistributorCategoryCode != $('#txt_category_code').val()) {
                listitem = {};
                listitem["ScreenName"] = "Distributor Category";
                listitem["OldValue"] = OldDetails.DistributorCategoryCode;
                listitem["NewValue"] = $('#txt_category_code').val();
                listitem["FieldName"] = "Category Code";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.Slab != $('#txt_slab').val()) {
                listitem = {};
                listitem["ScreenName"] = "Distributor Category";
                listitem["OldValue"] = OldDetails.Slab;
                listitem["NewValue"] = $('#txt_slab').val();
                listitem["FieldName"] = "Slab Amount For Lumpsum";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.ActiveStatus != $('#dd_status :selected').text()) {
                listitem = {};
                listitem["ScreenName"] = "Distributor Category";
                listitem["OldValue"] = OldDetails.ActiveStatus;
                listitem["NewValue"] = $('#dd_status :selected').text();
                listitem["FieldName"] = "Status";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.SIPSlab != $('#txt_sip_slab').val()) {
                listitem = {};
                listitem["ScreenName"] = "Distributor Category";
                listitem["OldValue"] = OldDetails.SIPSlab;
                listitem["NewValue"] = $('#txt_sip_slab').val();
                listitem["FieldName"] = "Slab Amount For SIP/STP";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            if (OldDetails.EffectiveDate != $("#dt_effective").val()) {
                listitem = {};
                listitem["ScreenName"] = "Distributor Category";
                listitem["OldValue"] = OldDetails.EffectiveDate;
                listitem["NewValue"] = $("#dt_effective").val();
                listitem["FieldName"] = "Effective Date";
                listitem["ActionType"] = actiontype;
                ChangedValues.push(listitem);
            }
            Utility.ServiceCall("POST", 'MasterService.svc/Insert_Update_Distributorcategory', JSON.stringify({ InputData: DistributorCategory }), "json", false, false, function (result) {
                if (DistributorCategory.DistributorCategoryId == 0)
                    Utility.writeNotification("success", "Category Inserted Successfully", "", false);
                else
                    Utility.writeNotification("success", "Category Updated Successfully", "", false);

                Utility.ServiceCall("POST", 'MasterService.svc/GenerateAuditMaster', JSON.stringify({ InputData: ChangedValues }), "json", false, false, function (result) {
                });
                $('#mdl_Edit_Role').modal('hide');

                DistributorCategoryMaster.LoadRoles();
            });

        }
    },

    RoleValid: function () {
        var error = "";
        if ($('#txt_category_name').val() == "")
            error += "Role Name Required. <br/>"

        if ($('#txt_category_code').val() == "")
            error += "Code Required. <br/>"

        if ($('#txt_slab').val() == "") {
            error = error + "Enter Slab. <br/>";
        } else {
            var slab = $('#txt_slab').val().split(' ');
            if (slab.length == 2) {
                if ($('#txt_slab').val() != 'No Slab') {
                    if (slab[1] != 'Lakhs' && slab[1] != 'Crores') {
                        error += "Invalid Slab. <br/>"
                    }
                }
            } else {
                error += "Invalid Slab. <br/>"
            }
        }
        
        if ($('#dd_slab_amount_type').val() == "") {
            error = error + "Slab Type Cannot be empty. <br/>";
        }

        if ($("#dt_effective").val() == "")
            error += "Effective Date Required. <br/>";

        if ($('#hidden_category_id').val() != "") {
            var RowId = $('#hidden_rowid').val();
            var OldDetails = $("#grid_role").getRowData(RowId);
            if (OldDetails.DistributorCategoryName != $('#txt_category_name').val() || OldDetails.DistributorCategoryCode != $('#txt_category_code').val() ||
                OldDetails.Slab != $('#txt_slab').val() ||
                OldDetails.SIPSlab != $('#txt_sip_slab').val()
                ) {
                if (OldDetails.EffectiveDate == $("#dt_effective").val()) {
                    error += "Change Effective Date. <br/>";
                }
            }
        }

        if (error == "")
            return true;
        else {
            Utility.writeNotification("warning", error, "", true);
            return false;
        }
    },

    Cancel: function () {
        DistributorCategoryMaster.ClearEditScreen();
        $('#mdl_Edit_Role').modal('hide');
    },
}



$(function () {
    $("#grid_role").jqGrid({
        height: 400,
        datatype: "local",
        width: null,
        shrinkToFit: false,
        //sortable: true,
        rowNum: -1,
        colNames: ['Action', 'Reference ID', 'Category Name', 'Category Code', 'Slab Amount For LumpSum', 'Slab Amount For SIP/STP', 'Effective Date', 'Status', 'IsActive'],
        colModel: [
                    { name: 'act', index: 'act', width: 80, align: 'center', sortable: false },
                    { name: 'DistributorCategoryId', index: 'DistributorCategoryId', align: 'center', sortable: false },
                    { name: 'DistributorCategoryName', index: 'DistributorCategoryName', sortable: false },
                    { name: 'DistributorCategoryCode', index: 'DistributorCategoryCode', sortable: false },
                    { name: 'Slab', index: 'Slab', sortable: false },
                     { name: 'SIPSlab', index: 'SIPSlab', sortable: false },
                    { name: 'EffectiveDate', index: 'EffectiveDate', sortable: false },
                    { name: 'ActiveStatus', index: 'ActiveStatus', sortable: false },
                    { name: 'IsActive', index: 'IsActive', hidden: true, sortable: false }
        ],
        gridComplete: function () {
            var ids = jQuery("#grid_role").jqGrid('getDataIDs');
            if (ids.length > 0) {
                var i = ids.length - 1;
                var cl = ids[i];
                be = "<a  href='#' onclick=\"DistributorCategoryMaster.EditRole('" + cl + "');\" ><i class='fa fa-pencil blue'></i> </a>&nbsp;&nbsp;";
                de = "<a  href='#' onclick=\"DistributorCategoryMaster.DeleteRole('" + cl + "');\"><i class='fa  fa-trash-o red '></i> </a>";
                jQuery("#grid_role").jqGrid('setRowData', ids[i], { act: be + de });
                $("#" + $('#grid_role').jqGrid('getGridParam', 'selrow')).focus();
            }
        }, cmTemplate: { title: false },
    });

    $("#dt_effective").datepicker({
        dateFormat: 'dd/mm/y',
        changeMonth: true,
        changeYear: true,
    });

    DistributorCategoryMaster.LoadRoles();
    if (Utility.enableSIP == false) {
        $('#txt_sip_slab').attr("disabled", "disabled");
    }
});