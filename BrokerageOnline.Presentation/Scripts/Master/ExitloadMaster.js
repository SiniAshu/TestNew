var ExitLoadMaster = {
    AddNewExitLoad: function () {
        //$("#grid_add_exit_load").val("").empty();
        $('#dt_effective').val("");
        $('#hidden_exitload_id').val("");
        ExitLoadMaster.GetSchemeCategory();
        $("#dd_scheme").multiselect('destroy');
        $("#dd_scheme").empty();
        $('#dd_scheme').multiselect('rebuildscheme');
        $('#mdl_Edit_Role').modal('show');


        $('#grid_add_exit_load').jqGrid('clearGridData');

        //var ids = jQuery("#grid_add_exit_load").jqGrid('getDataIDs');
        //if (ids.length == 0) {
        ExitLoadMaster.Add_Grid_Row();
        //}
    },

    Cancel: function () {
        ExitLoadMaster.ClearEditScreen();
        $('#mdl_Edit_Role').modal('hide');
    },

    GetSchemeCategory: function (SearchText) {
        $("#dd_schemecategory").multiselect('destroy');
        $("#dd_schemecategory").empty();
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeCategory', JSON.stringify({ SearchText: "", MemoTypeId: "0", IsCloseEnded: "0" }), "json", false, false, function (result) {
            var arrItems = result.GetSchemeCategoryResult;
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeCategoryName).val(arrItems[i].SchemeCategoryId).appendTo("#dd_schemecategory");
            }
            $('#dd_schemecategory').attr("multiple", "multiple");
            $('#dd_schemecategory').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                onChange: function (element, checked) {
                    var brands = $('#dd_schemecategory option:selected');
                    var selected = [];
                    $(brands).each(function (index, brand) {
                        selected.push([$(this).val()]);
                    });
                    if (selected.valueOf() != "") {
                        ExitLoadMaster.GetScheme(selected.valueOf());
                    }
                    else {
                        $("#dd_scheme").multiselect('destroy');
                        $("#dd_scheme").empty();
                        $('#dd_scheme').multiselect('rebuildscheme');
                    }
                }
            });
            $('#dd_schemecategory').multiselect('clearSelection');
        });
    },

    GetScheme: function (SearchText) {
        var arr = SearchText == "" ? "" : SearchText.toString();
        arr = JSON.stringify(arr)

        //passing -1 as the module id to avoid major changes and to change only procedure for getting the open ended funds only.
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetScheme', '{"SearchText": ' + arr + ', "MemoTypeId": "-1", "IsCloseEnded":"2"}', "json", false, false, function (result) {
            var arrItems = result.GetSchemeResult;
            var Scheme = $('#dd_scheme option:selected');
            var SchemeId = [];
            $(Scheme).each(function () {
                SchemeId.push([$(this).val()]);
            });

            $("#dd_scheme").multiselect('destroy');
            $("#dd_scheme").attr("multiple", "multiple");
            $("#dd_scheme").empty();
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeName).val(arrItems[i].SchemeId).appendTo('#dd_scheme');
            }
           
            $('#dd_scheme').multiselect('rebuildscheme');
            for (var i = 0; i < SchemeId.length; i++) {
                $('#dd_scheme').multiselect('select', SchemeId[i]);
            }
           
            //for (var i = 0; i < arrItems.length; i++) {
            //    $("<option />").text(arrItems[i].SchemeName).val(arrItems[i].SchemeId).appendTo('#dd_scheme');
            //}
           
        });
    },

    ClearEditScreen: function () {
        $('#hidden_exitload_id').val("");
        $('#dd_schemecategory').val("");
        $('#dd_scheme').val("");
        $('#dd_holdingperiod').val("");
        $('#dd_periodslab').val("");
        $('#txt_periodslab').val("");
        $('#txt_exitload').val("");
        $('#dt_effective').val("");
        $('#dd_schemecategory').multiselect('clearSelection');
        $("#dd_scheme").multiselect('destroy');
        $("#dd_scheme").empty();
        $('#dd_scheme').multiselect('rebuildscheme');

    },

    LoadExitLoad: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetMasterExitLoad', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetMasterExitLoadResult;

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

    EditExitLoad: function (RowId) {
        var ExitLoaddatavalue = $("#grid_role").getRowData(RowId);
        ExitLoadMaster.GetSchemeCategory();
        $('#dt_effective').val(ExitLoaddatavalue.EffectiveDate);
        $("#dd_scheme").multiselect('destroy');
        $("#dd_scheme").empty();
        $('#dd_scheme').multiselect('rebuildscheme');
        ExitLoadMaster.GetScheme(ExitLoaddatavalue.SchemeCategoryId);
        $('#hidden_exitload_id').val(ExitLoaddatavalue.ExitLoadId);

        var SchemeCategoryId = ExitLoaddatavalue.SchemeCategoryId.split(',');
        for (var i = 0; i < SchemeCategoryId.length; i++) {
            if (SchemeCategoryId[i] != "") {
                $('#dd_schemecategory').multiselect('select', SchemeCategoryId[i]);
            }
        }

        $('#dd_holding').val(ExitLoaddatavalue.HoldingPeriod);

        var SchemeId = ExitLoaddatavalue.SchemeId.split(',');
        for (var i = 0; i < SchemeId.length; i++) {
            if (SchemeId[i] != "") {
                $('#dd_scheme').multiselect('select', SchemeId[i]);
            }
        }

        var data = [];
        var exitloadvalue = ExitLoaddatavalue.ExitLoadValue.split('~');
        for (var i = 0; i < exitloadvalue.length; i++) {
            var exval = exitloadvalue[i].split('/');
            detailitem = {}
            if (exval[0] == "Others") {
                detailitem["PeriodSlab"] = exval[0];
                detailitem["ExitLoad"] = "";
                detailitem["HoldingPeriod"] = "";
                detailitem["Others"] = exval[1];
            }
            else {
                detailitem["PeriodSlab"] = exval[0];
                detailitem["HoldingPeriod"] = exval[1];
                detailitem["ExitLoad"] = exval[2];
                detailitem["Others"] = "";
            }
            data.push(detailitem);
        }

        $('#grid_add_exit_load').jqGrid('clearGridData');
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++)
                jQuery("#grid_add_exit_load").jqGrid('addRowData', data[i].id, data[i]);
        }
        $('#mdl_Edit_Role').modal('show');
    },

    DeleteExitLoad: function (RowId) {
        if (confirm("Are you sure you want to delete!")) {
            var ret = $("#grid_role").getRowData(RowId);
            var ExitLoadId = ret.ExitLoadId;
            Utility.ServiceCall("POST", 'MasterService.svc/DeleteExitLoad', JSON.stringify({ ExitLoadID: ExitLoadId }), "json", false, false, function (result) {
                var result_d = result.DeleteExitLoadResult;
                if (result_d) {
                    Utility.writeNotification("success", "Exit Load Deleted Successfully", "", true);
                    ExitLoadMaster.LoadExitLoad();
                }
            });
        }
    },

    SaveExitLoad: function () {

        var Category = $('#dd_schemecategory option:selected');
        var Categoryselected = [];
        $(Category).each(function () {
            Categoryselected.push([$(this).val()]);
        });

        var Scheme = $('#dd_scheme option:selected');
        var Schemeselected = [];
        $(Scheme).each(function () {
            Schemeselected.push([$(this).val()]);
        });



        var ExitLoadId = $('#hidden_exitload_id').val() == "" ? 0 : $('#hidden_exitload_id').val()

        var EffectiveDate = $('#dt_effective').val();
        var ExitHoldingPeriod = $('#dd_holding').val();

        var ids = jQuery("#grid_add_exit_load").jqGrid('getDataIDs');
        for (var i = 0; i < ids.length; i++) {
            var cl = ids[i];
            jQuery('#grid_add_exit_load').saveRow(cl);
        }
        var gridData = jQuery("#grid_add_exit_load").jqGrid('getRowData');
        var ExitLoadDetails = [];
        var totalcount = gridData.length;
        if (gridData.length > 0) {
            for (var i = 0; i < totalcount; i++) {
                gridData[i].ExitLoad = gridData[i].ExitLoad;
                gridData[i].PeriodSlab = gridData[i].PeriodSlab;
                gridData[i].Others = gridData[i].Others;
                gridData[i].HoldingPeriod = gridData[i].HoldingPeriod;
                ExitLoadDetails.push(gridData[i]);
            }
        }


        if (ExitLoadMaster.ExitLoadValid()) {

            Utility.ServiceCall("POST", 'MasterService.svc/SaveExitLoad', JSON.stringify({ SchemeCategory: Categoryselected.toString(), Scheme: Schemeselected.toString(), ExitLoadId: ExitLoadId, EffectiveDate: EffectiveDate, ExitLoadDetails: ExitLoadDetails, ExitHoldingPeriod: ExitHoldingPeriod }), "json", false, false, function (result) {
                var SavedResult = result.SaveExitLoadResult;

                if (SavedResult.toString() == "Insert Successfully" || SavedResult.toString() == "Update Successfully") {
                    Utility.writeNotification("success", "ExitLoad " + SavedResult.toString(), "", false);
                    $('#mdl_Edit_Role').modal('hide');
                    ExitLoadMaster.LoadExitLoad();
                }
                else if (SavedResult.toString() != '')
                    Utility.writeNotification("warning", "Duplicate Exists For the Schemes : " + SavedResult.toString(), "", false);
                //if (ExitLoadId == 0)
                //    Utility.writeNotification("success", "ExitLoad Inserted Successfully", "", false);
                //else
                //    Utility.writeNotification("success", "ExitLoad Updated Successfully", "", false);
            });

        }
    },

    ExitLoadValid: function () {
        var errorMessage = "";
        var selectedSchemeCategory = $('#dd_schemecategory option:selected');
        if (selectedSchemeCategory.length == 0) {
            errorMessage = errorMessage + "Select Scheme Category. <br/>";
        }

        var selectedScheme = $('#dd_scheme option:selected');
        if (selectedScheme.length == 0) {
            errorMessage = errorMessage + "Select Scheme. <br/>";
        }
        if ($('#dt_effective').val() == "")
            errorMessage += "Effective Required. <br/>"

        var gridData = jQuery("#grid_add_exit_load").jqGrid('getRowData')
        if (gridData.length == 0) {
            errorMessage = errorMessage + "Exit Load Details Required. <br/>";
        }
        //else if (gridData.length > 2) {
        //    errorMessage = errorMessage + "Create Only 2 Rows applicable. <br/>";
        //}
        //else {
        //    for (i = 0; i < gridData.length; i++) {
        //        if (i == 0) {
        //            if (gridData[0].PeriodSlab == "") {
        //                errorMessage = errorMessage + "Range is Required. <br/>"
        //            }
        //            if (gridData[0].PeriodSlab == "Others" && gridData[0].Others == "") {
        //                errorMessage = errorMessage + "Other Value is Required. <br/>"
        //            }
        //            else if (gridData[0].PeriodSlab == "Others" && gridData[0].Others != "") {
        //                if (gridData.length > 1) {
        //                    errorMessage = errorMessage + "Remove the Second Row. <br/>"
        //                }
        //            }
        //            else if (gridData[0].PeriodSlab != "Others") {
        //                if (gridData[0].HoldingPeriod == "") {
        //                    errorMessage = errorMessage + "Holding Period is Required. <br/>"
        //                }
        //                if (gridData[0].ExitLoad == "") {
        //                    errorMessage = errorMessage + "ExitLoad is Required. <br/>"
        //                }
        //                if (gridData.length == 1) {
        //                    errorMessage = errorMessage + "Must select 2 Rows. <br/>"
        //                }
        //            }
        //        }
        //        if (i == 1) {
        //            if (gridData[0].PeriodSlab == "≤" && !(gridData[1].PeriodSlab == ">" || gridData[1].PeriodSlab == "Others")) {
        //                errorMessage = errorMessage + "Range Value must be > Or 'Others'. <br/>"
        //            }
        //            else if (gridData[0].PeriodSlab == "≥" && !(gridData[1].PeriodSlab == "<" || gridData[1].PeriodSlab == "Others")) {
        //                errorMessage = errorMessage + "Range Value must be < Or 'Others'. <br/>"
        //            }
        //            else if (gridData[0].PeriodSlab == ">" && !(gridData[1].PeriodSlab == "<" || gridData[1].PeriodSlab == "≤" || gridData[1].PeriodSlab == "=")) {
        //                errorMessage = errorMessage + "Range Value must be '<' Or '≤' Or '=' . <br/>"
        //            }
        //            else if (gridData[0].PeriodSlab == "<" && !(gridData[1].PeriodSlab == ">" || gridData[1].PeriodSlab == "≥" || gridData[1].PeriodSlab == "=")) {
        //                errorMessage = errorMessage + "Range Value must be '>' Or '≥' Or '=' . <br/>"
        //            }
        //            else if (gridData[0].PeriodSlab == "=" && !(gridData[1].PeriodSlab == ">" || gridData[1].PeriodSlab == "<" || gridData[1].PeriodSlab == "Others")) {
        //                errorMessage = errorMessage + "Range Value must be '>' Or '<' Or 'Others' . <br/>"
        //            }
        //            if (gridData[1].PeriodSlab == "Others" && gridData[1].Others == "") {
        //                errorMessage = errorMessage + "Other Value is Required. <br/>"
        //            }
        //            else if (gridData[1].PeriodSlab != "Others" && gridData[0].PeriodSlab != "Others") {
        //                if (gridData[0].PeriodSlab == "") {
        //                    errorMessage = errorMessage + "Range is Required. <br/>"
        //                }
        //                if (gridData[1].HoldingPeriod == "") {
        //                    errorMessage = errorMessage + "Holding Period is Required. <br/>"
        //                }
        //                if (gridData[1].ExitLoad == "") {
        //                    errorMessage = errorMessage + "ExitLoad is Required. <br/>"
        //                }
        //            }
        //        }
        //    }
        //}
        if (errorMessage == "")
            return true;
        else {
            Utility.writeNotification("warning", errorMessage, "", true);
            return false;
        }
    },

    editclick: 0,

    EditAddExitLoadGrid: function (rowId) {
        var ret = $("#grid_add_exit_load").getRowData(rowId);
        var ids = jQuery("#grid_add_exit_load").jqGrid('getDataIDs');
        for (var i = 0; i < ids.length; i++) {
            var cl = ids[i];
            jQuery('#grid_add_exit_load').saveRow(cl);
        }
        //$("#grid_add_rack_rate").jqGrid('saveRow', rowid);
        $("#grid_add_exit_load").trigger("reloadGrid");
        $("#grid_add_exit_load").jqGrid('editRow', rowId, true);
        if (ret.PeriodSlab == "Others") {
            $("#grid_add_exit_load").jqGrid("setColProp", "HoldingPeriod", { editable: false });
            $("#grid_add_exit_load").jqGrid("setColProp", "ExitLoad", { editable: false });
            $("#grid_add_exit_load").jqGrid("setColProp", "Others", { editable: true });

            //var input = $('#' + rowId + '_Others');
            //input.prop('disabled', false)

            //input = $('#' + rowId + '_HoldingPeriod');
            //input.val(null);
            //input.prop('disabled', true)

            //input = $('#' + rowId + '_ExitLoad');
            //input.val(null);
            //input.prop('disabled', true)
            //$("#" + rowId + "_Others").focus();
        }
        else if (ret.PeriodSlab == "<" || ret.PeriodSlab == ">" || ret.PeriodSlab == "≤" || ret.PeriodSlab == "≥" || ret.PeriodSlab == "=") {
            //var input = $('#' + rowId + '_HoldingPeriod');
            //input.prop('disabled', false)

            //input = $('#' + rowId + '_ExitLoad');
            //input.prop('disabled', false)

            //input = $('#' + rowId + '_Others');
            //input.val(null);
            //input.prop('disabled', true)
            //$("#" + rowId + "_HoldingPeriod").focus();

            $("#grid_add_exit_load").jqGrid("setColProp", "HoldingPeriod", { editable: true });
            $("#grid_add_exit_load").jqGrid("setColProp", "ExitLoad", { editable: true });
            $("#grid_add_exit_load").jqGrid("setColProp", "Others", { editable: false });

        }

        jQuery("#grid_add_exit_load").jqGrid('setSelection', rowId);
        if (ExitLoadMaster.editclick == 0) {
            ExitLoadMaster.editclick += 1;
            ExitLoadMaster.EditAddExitLoadGrid(rowId);

        }
        else
            ExitLoadMaster.editclick = 0;

        // $("#" + rowId + "_Period").focus();
        return false;
    },


    Add_Grid_Row: function () {
        var ids = jQuery("#grid_add_exit_load").jqGrid('getDataIDs');
        for (var i = 0; i < ids.length; i++) {
            var cl = ids[i];
            jQuery('#grid_add_exit_load').saveRow(cl);
        }
        var cnt = Math.max.apply(Math, ids) + 1;
        if (cnt == "-Infinity")
            cnt = 1;

        var parameters =
                {
                    rowID: cnt,
                    PaymentDetailsId: 0,
                    position: "last",
                    useDefValues: false,
                    useFormatter: false,
                    addRowParams: { extraparam: {} }
                };

        $("#grid_add_exit_load").jqGrid("setColProp", "HoldingPeriod", { editable: true });
        $("#grid_add_exit_load").jqGrid("setColProp", "ExitLoad", { editable: true });
        $("#grid_add_exit_load").jqGrid("setColProp", "Others", { editable: false });
        $("#grid_add_exit_load").jqGrid('addRow', parameters);
        $("#" + cnt + "_PeriodSlab").focus();
    },


    //Restore_Grid_Row: function (rowId) {
    //    var parameters =
    //            {
    //                PaymentDetailsId: 0,
    //                position: "last",
    //                useDefValues: false,
    //                useFormatter: false,
    //                editRowParams: { extraparam: {} }
    //            };

    //    $("#grid_add_exit_load").jqGrid("setColProp", "HoldingPeriod", { editable: true });
    //    $("#grid_add_exit_load").jqGrid("setColProp", "ExitLoad", { editable: true });
    //    $("#grid_add_exit_load").jqGrid("setColProp", "Others", { editable: false });
    //    jQuery("#grid_add_exit_load").jqGrid('editRow', rowId, parameters);
    //},


    Restore_Grid_Row: function (rowid) {
        var ids = jQuery("#grid_add_exit_load").jqGrid('getDataIDs');
        for (var i = 0; i < ids.length; i++) {
            var cl = ids[i];
            jQuery('#grid_add_exit_load').saveRow(cl);
        }

        $('#grid_add_exit_load').editRow(rowid, true, function () {
            var input = $('#' + rowid + '_HoldingPeriod');
            input.val('');

            input = $('#' + rowid + '_ExitLoad');
            input.val('');

            input = $('#' + rowid + '_Others');
            input.val('');
             
            input = $('#' + rowid + '_PeriodSlab');
            input.val("Select");
        });
    },



    BeforeExitLoadMaster: function () {
        $('#save_Edit_Role').modal('show');
    },

    ValidateScheme: function () {
        var missingSchemes = '';
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetMissingSchemeInExitLoadScheme', '', "json", false, false, function (result) {
            //console.log(result.GetMissingSchemeInExitLoadSchemeResult);
            //console.log(result.GetMissingSchemeInExitLoadSchemeResult.length);
            for (var x = 0; x < result.GetMissingSchemeInExitLoadSchemeResult.length; x++) {
                missingSchemes = missingSchemes + (x + 1) + ") " + result.GetMissingSchemeInExitLoadSchemeResult[x].SchemeName + ' '//'<br/>';
            }
            //Utility.writeNotification("warning", "Enter Exit load for scheme name: ", missingSchemes, false);
            if (result.GetMissingSchemeInExitLoadSchemeResult.length > 0) {
                $('#missingSchemes')[0].innerHTML = "Please click NO to define exit load for following schemes, otherwise you won't be able to save the changes. Do you wish to continue? <br/>" + missingSchemes + " ";
                $('#modal_save_exitload_changes').modal('show');
            }
            else {
                Utility.writeNotification("success", "Exit Load Saved Successfully!", "", true);
            }
        });
    },

    SaveChanges: function () {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/SaveExitLoadChanges', '', "json", false, false, function (result) {
            if (result.SaveExitLoadChangesResult == 'Changes saved sucessfully') {
                ExitLoadMaster.LoadExitLoad();
                $('#modal_save_exitload_changes').modal('hide');
            };
        });
    }
}

$(function () {
    $("#grid_role").jqGrid({
        height: 400,
        datatype: "local",
        width: null,
        shrinkToFit: false,
        sortable: true,
        ignoreCase: true,
        rowNum: 100,
        colNames: ['Action', 'Reference ID', 'SchemeCategoryId', 'SchemeId', 'Scheme Category', 'Scheme', 'ExitLoad', 'Effective Date', 'ExitLoadValue', 'ExitHoldingPeriod'],
        colModel: [
                    { name: 'act', index: 'act', width: 80, align: 'center', sortable: false, search: false },
                    { name: 'ExitLoadId', index: 'ExitLoadId', width: 100, align: 'center', sortable: false, sorttype: 'integer', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
                    { name: 'SchemeCategoryId', index: 'SchemeCategoryId', hidden: true, sortable: false },
                    { name: 'SchemeId', index: 'SchemeId', hidden: true, sortable: false },
                    { name: 'SchemeCategory', index: 'SchemeCategory', width: 150, sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'Scheme', index: 'Scheme', width: 300, sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'ExitLoad', index: 'ExitLoad', width: 470, sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'EffectiveDate', index: 'EffectiveDate', width: 130, sortable: false, sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
                    { name: 'ExitLoadValue', index: 'ExitLoadValue', hidden: true, sortable: false },
                    { name: 'HoldingPeriod', index: 'HoldingPeriod', hidden: true, sortable: false },
        ],
        gridComplete: function () {
            var ids = jQuery("#grid_role").jqGrid('getDataIDs');
            if (ids.length > 0) {
                var i = ids.length - 1;
                var cl = ids[i];
                be = "<a  href='#' onclick=\"ExitLoadMaster.EditExitLoad('" + cl + "');\" ><i class='fa fa-pencil blue'></i> </a>&nbsp;&nbsp;";
                de = "<a  href='#' onclick=\"ExitLoadMaster.DeleteExitLoad('" + cl + "');\"><i class='fa  fa-trash-o red '></i> </a>";
                jQuery("#grid_role").jqGrid('setRowData', ids[i], { act: be + de });
                $("#" + $('#grid_role').jqGrid('getGridParam', 'selrow')).focus();
            }
        }, cmTemplate: { title: false },
    });
    jQuery("#grid_role").jqGrid('filterToolbar', { searchOperators: true, stringResult: true, searchOnEnter: false, defaultSearch: "cn", multipleSearch: true });

    $("#dt_effective").datepicker({
        dateFormat: 'dd/mm/y',
        changeMonth: true,
        changeYear: true,
    });
    ExitLoadMaster.LoadExitLoad();



    $("#grid_add_exit_load").jqGrid({
        //data: mydata,
        datatype: "local",
        scrollrows: true,
        colNames: ['Range', '<span> Holding Period </span> <select id="dd_holding" ></select>', 'Exit Load (%)', 'Others', 'Actions'],
        colModel: [
                    {
                        name: 'PeriodSlab', index: 'PeriodSlab', width: 150, stype: 'text', sortable: false, editable: true, edittype: "select", formatter: 'select', editoptions: {
                            value: "Select:Select;≤:≤;≥:≥;<:<;>:>;=:=;Others:Others", width: 150,
                            dataEvents: [{
                                type: 'change', fn: function (e) {

                                    var row = $(e.target).closest('tr.jqgrow');
                                    var rowId = row.attr('id');

                                    var ids = jQuery("#grid_add_exit_load").jqGrid('getDataIDs');
                                    //if (ids.length == 1) {
                                    //    if ($(e.target).val() != 'Others' && $(e.target).val() != 'Select')
                                    //        ExitLoadMaster.Add_Grid_Row();
                                    //}


                                    if ($(e.target).val() == 'Others') {
                                        $("#grid_add_exit_load").jqGrid('saveRow', rowId);
                                        $('#grid_add_exit_load').editRow(rowId, true, function () {
                                            var input = $('#' + rowId + '_HoldingPeriod');
                                            input.val(null);

                                            input = $('#' + rowId + '_ExitLoad');
                                            input.val(null);
                                        });
                                        $("#grid_add_exit_load").jqGrid('saveRow', rowId);

                                        $("#grid_add_exit_load").jqGrid("setColProp", "HoldingPeriod", { editable: false });
                                        $("#grid_add_exit_load").jqGrid("setColProp", "ExitLoad", { editable: false });
                                        $("#grid_add_exit_load").jqGrid("setColProp", "Others", { editable: true });

                                        $("#" + rowId + "_Others").focus();
                                    }
                                    else // if ($(e.target).val() == "<" || $(e.target).val() == ">" || $(e.target).val() == "≤" || $(e.target).val() == "≥" || $(e.target).val() == "=")
                                    {
                                        $("#grid_add_exit_load").jqGrid('saveRow', rowId);
                                        $('#grid_add_exit_load').editRow(rowId, true, function () {

                                            input = $('#' + rowId + '_Others');
                                            input.val(null);
                                        });
                                        $("#grid_add_exit_load").jqGrid('saveRow', rowId);
                                        $("#grid_add_exit_load").jqGrid("setColProp", "HoldingPeriod", { editable: true });
                                        $("#grid_add_exit_load").jqGrid("setColProp", "ExitLoad", { editable: true });
                                        $("#grid_add_exit_load").jqGrid("setColProp", "Others", { editable: false });
                                        $("#" + rowId + "_HoldingPeriod").focus();
                                    }

                                    $("#grid_add_exit_load").jqGrid('editRow', rowId, true);
                                    $("#grid_add_exit_load").jqGrid('setSelection', rowId);
                                }
                            }]
                        }
                    },
                    //{ name: 'HoldingPeriod', index: 'HoldingPeriod', sortable: false, editable: true },
                    { name: 'HoldingPeriod', index: 'HoldingPeriod', sortable: false, editable: true, editoptions: { maxlength: 4, dataInit: function (element) { Utility.GridAllowNumber(element); } } },
                    { name: 'ExitLoad', index: 'ExitLoad', sortable: false, editable: true, editoptions: { dataInit: function (element) { Utility.GridOnlyDecimal2of2(element); } } },
                    { name: 'Others', index: 'Others', sortable: false, editable: true, editoptions: {} },
                    { name: 'act', index: 'act' },
        ],
        gridComplete: function () {
            var ids = jQuery("#grid_add_exit_load").jqGrid('getDataIDs');
            for (var i = 0; i < ids.length; i++) {
                var cl = ids[i];
                be = "<a  href='#' onclick=\"ExitLoadMaster.EditAddExitLoadGrid('" + cl + "');\" ><i class='fa fa-pencil blue'></i> </a>";
                se = "<a  href='#' onclick=\"jQuery('#grid_add_exit_load').saveRow('" + cl + "');\"><i class='fa fa-save green'></i> </a>";
                ce = "<a  href='#' onclick=\"ExitLoadMaster.Restore_Grid_Row('" + cl + "');\"><i class='fa fa-refresh blue'></i> </a>";
                //ce = "<a  href='#' onclick=\"jQuery('#grid_add_exit_load').restoreRow('" + cl + "');\"><i class='fa fa-refresh blue'></i> </a>";
                de = "<a  href='#' onclick=\"jQuery('#grid_add_exit_load').delRowData('" + cl + "');\"><i class='fa fa-times red'></i> </a>";
                jQuery("#grid_add_exit_load").jqGrid('setRowData', ids[i], { act: be + se + ce + de });
                $("#" + $('#grid_add_exit_load').jqGrid('getGridParam', 'selrow')).focus();
            }
        },
        'cellsubmit': 'clientArray',
        cmTemplate: { title: false },
        editurl: 'clientArray'
    });
    
    $('#grid_add_exit_load').jqGrid('clearGridData');
    $("<option />").text('Months').val('Months').appendTo('#dd_holding');
    $("<option />").text('Days').val('Days').appendTo('#dd_holding');
    //var parameters =
    //       {
    //           rowID: 1,
    //           position: "first",
    //           useDefValues: false,
    //           useFormatter: false,
    //           addRowParams: { extraparam: {} }
    //       };

    //$("#grid_add_exit_load").jqGrid("setColProp", "HoldingPeriod", { editable: true });
    //$("#grid_add_exit_load").jqGrid("setColProp", "ExitLoad", { editable: true });
    //$("#grid_add_exit_load").jqGrid("setColProp", "Others", { editable: false });
    //$("#grid_add_exit_load").jqGrid('addRow', parameters);
    //$("#" + 1 + "_PeriodSlab").focus();

    //$("#btn_add_new_rack").click(function () {
    //    var ids = jQuery("#grid_add_exit_load").jqGrid('getDataIDs');
    //    for (var i = 0; i < ids.length; i++) {
    //        var cl = ids[i];
    //        jQuery('#grid_add_exit_load').saveRow(cl);
    //    }

    //    var cnt = Math.max.apply(Math, ids) + 1;
    //    var parameters =
    //            {
    //                rowID: cnt,
    //                PaymentDetailsId: 0,
    //                position: "last",
    //                useDefValues: false,
    //                useFormatter: false,
    //                addRowParams: { extraparam: {} }
    //            };



    //    $("#grid_add_exit_load").jqGrid("setColProp", "HoldingPeriod", { editable: true });
    //    $("#grid_add_exit_load").jqGrid("setColProp", "ExitLoad", { editable: true });
    //    $("#grid_add_exit_load").jqGrid("setColProp", "Others", { editable: false });
    //    $("#grid_add_exit_load").jqGrid('addRow', parameters);
    //    $("#" + cnt + "_PeriodSlab").focus();

    //});

});