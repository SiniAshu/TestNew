var scheme = {

    LoadSchemeMaster: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetSchemeModule', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetSchemeModuleResult;

            $('#grid_scheme').jqGrid('clearGridData');
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++)
                    jQuery("#grid_scheme").jqGrid('addRowData', data[i].id, data[i]);
            }
            else {
                Utility.writeNotification("error", "No Records Found", "", true);
            }
        });
    },

    GetSchemeCategory: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeCategory', JSON.stringify({ SearchText: "", MemoTypeId: "0" }), "json", false, false, function (result) {
            var arrItems = result.GetSchemeCategoryResult;
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeCategoryName).val(arrItems[i].SchemeCategoryId).appendTo("#dd_scheme_category");
            }

            $('#dd_scheme_category').attr("multiple", "multiple");
            $('#dd_scheme_category').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                nonSelectedText: "Select Scheme Category",
                onChange: function (element, checked) {
                    var brands = $('#dd_scheme_category option:selected');
                    var selected = [];
                    $(brands).each(function (index, brand) {
                        selected.push([$(this).val()]);
                    });
                    if (selected.valueOf() != "") {
                        scheme.GetScheme(selected.valueOf());
                    }
                    else {
                        $("#dd_scheme").multiselect('destroy');
                        $("#dd_scheme").empty();
                        $('#dd_scheme').multiselect('rebuildscheme');
                    }
                }
            });
            $('#dd_scheme_category').multiselect('clearSelection');
        });
    },

    GetScheme: function (SearchText) {
        var arr = SearchText == "" ? "" : SearchText.toString();
        arr = JSON.stringify(arr)

        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetScheme', '{"SearchText": ' + arr + ', "MemoTypeId": "0"}', "json", false, false, function (result) {
            var arrItems = result.GetSchemeResult;
            $("#dd_scheme").multiselect('destroy');
            $("#dd_scheme").empty();
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeName).val(arrItems[i].SchemeId).appendTo('#dd_scheme');
            }
            $('#dd_scheme').multiselect('rebuildscheme');
        });
    },

    LoadMemoTypes: function () {
        var search = "Master";
        Utility.ServiceCall("POST", 'MasterService.svc/GET_MemoParent', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GET_MemoParentResult;
            $("#dd_memotype").empty();
            for (var i = 0; i < data.length; i++) {
                $("<option />").text(data[i].MemoParentName).val(data[i].MemoParentId).appendTo("#dd_memotype");
            }
        });
    },

    AddNew: function () {
        scheme.ClearEditScreen();
        $('#hidden_sch_id').val('0');
        $('#mdl_Edit_Role').modal('show');
    },

    ClearEditScreen: function () {
      
        $("#dd_scheme_category").multiselect('clearSelection');
        $("#dt_effective").val("");
        $("#dd_scheme").multiselect('destroy');
        $("#dd_scheme").empty();
        $('#dd_scheme').multiselect('rebuildscheme');
    },

    Cancel: function () {
        scheme.ClearEditScreen();
        $('#mdl_Edit_Role').modal('hide');
    },

    Savescheme:function(){
        if (scheme.Isvalid()) {
            var values = {};

            var Scheme = $('#dd_scheme option:selected');
            var Schemeselected = [];
            $(Scheme).each(function () {
                Schemeselected.push([$(this).val()]);
            });

            var SchemeCategory = $('#dd_scheme_category option:selected');
            var SchemeCategoryselected = [];
            $(SchemeCategory).each(function () {
                SchemeCategoryselected.push([$(this).val()]);
            });
            values.EffectiveDate = $('#dt_effective').val();
            values.SchemeModuleId = $('#hidden_sch_id').val() == '' ? 0 : $('#hidden_sch_id').val();
            values.SchemeId = Schemeselected.toString();
            values.ModuleId = $('#dd_memotype').val();

            Utility.ServiceCall("POST", 'MasterService.svc/Insert_Update_Scheme_module', JSON.stringify({ InputData: values }), "json", false, false, function (result) {
                if (values.SchemeModuleId == 0)
                    Utility.writeNotification("success", "Scheme To Module Inserted Successfully", "", false);
                else
                    Utility.writeNotification("success", "Scheme To Module Updated Successfully", "", false);

                $('#mdl_Edit_Role').modal('hide');

                scheme.LoadSchemeMaster();
            });
        }
    },

    Isvalid:function(){
        var error = "";
        if ($('#dd_memotype').val() == "")
            error += "Module Required. <br/>"

        var Scheme = $('#dd_scheme option:selected');
        var Schemeselected = [];
        $(Scheme).each(function () {
            Schemeselected.push([$(this).val()]);
        });

        var SchemeCategory = $('#dd_scheme_category option:selected');
        var SchemeCategoryselected = [];
        $(SchemeCategory).each(function () {
            SchemeCategoryselected.push([$(this).val()]);
        });

        if ($("#dt_effective").val() == "")
            error += "Effective Date Required. <br/>"

        if (Schemeselected.toString() == "" && SchemeCategoryselected.toString() == "")
            error += "Scheme Category/Scheme Required. <br/>"

        if (error == "")
            return true;
        else {
            Utility.writeNotification("warning", error, "", true);
            return false;
        }
    },

    Editscheme: function (RowId) {
        var ret = $("#grid_scheme").getRowData(RowId);
        scheme.GetScheme(ret.SchemeCategoryId);
        $('#hidden_sch_id').val('1');
        $('#dd_memotype').val(ret.ModuleId);

        var SchemeCategoryId = ret.SchemeCategoryId.split(',');
        for (var i = 0; i < SchemeCategoryId.length; i++) {
            if (SchemeCategoryId[i] != "") {
                $('#dd_scheme_category').multiselect('select', SchemeCategoryId[i]);
            }
        }

        var SchemeId = ret.SchemeId.split(',');
        for (var i = 0; i < SchemeId.length; i++) {
            if (SchemeId[i] != "") {
                $('#dd_scheme').multiselect('select', SchemeId[i]);
            }
        }
        $("#dt_effective").val(ret.EffectiveDate);
        $('#mdl_Edit_Role').modal('show');
    },

    Deletescheme: function (RowId) {
        if (confirm("Are you sure you want to delete!")) {
            var ret = $("#grid_scheme").getRowData(RowId);
            var NotesId = ret.ModuleId;
            Utility.ServiceCall("POST", 'MasterService.svc/DeleteSchemeModule', JSON.stringify({ NotesId: NotesId }), "json", false, false, function (result) {
                Utility.writeNotification("error", "Deleted Successfully", "", false);
                scheme.LoadSchemeMaster();
            });
        }
    }
}

$(function () {
    $("#grid_scheme").jqGrid({
        height: 400,
        datatype: "local",
        width: null,
        shrinkToFit: false,
        //sortable: true,
        rowNum: -1,
        colNames: ['Action', 'Reference ID', 'SchemeModuleId', 'SchemeCategoryId', 'SchemeId', 'Module ID', 'Module', 'Scheme Category', 'Scheme', 'Effective Date'],
        colModel: [
                    { name: 'act', index: 'act', width: 80, align: 'center', sortable: false },
                    { name: 'ModuleId', index: 'ModuleId', align: 'center', sortable: false },
                    { name: 'SchemeModuleId', index: 'SchemeModuleId', hidden: true, sortable: false },
                    { name: 'SchemeCategoryId', index: 'SchemeCategoryId', hidden: true, sortable: false },
                    { name: 'SchemeId', index: 'SchemeId', hidden: true, sortable: false },
                    { name: 'ModuleId', index: 'ModuleId', hidden: true, sortable: false },
                    { name: 'ModuleName', index: 'ModuleName', sortable: false },
                    { name: 'SchemeCategoryName', index: 'SchemeCategoryName', sortable: false },
                    { name: 'SchemeName', index: 'SchemeName', width: 400, sortable: false },
                     { name: 'EffectiveDate', index: 'EffectiveDate', sortable: false },
        ],
        gridComplete: function () {
            var ids = jQuery("#grid_scheme").jqGrid('getDataIDs');
            for (var i = 0; i < ids.length; i++) {
                var cl = ids[i];
                be = "<a  href='#' onclick=\"scheme.Editscheme('" + cl + "');\" ><i class='fa fa-pencil blue'></i> </a>&nbsp;&nbsp;";
                de = "<a  href='#' onclick=\"scheme.Deletescheme('" + cl + "');\"><i class='fa  fa-trash-o red '></i> </a>";
                jQuery("#grid_scheme").jqGrid('setRowData', ids[i], { act: be + de });
                $("#" + $('#grid_scheme').jqGrid('getGridParam', 'selrow')).focus();
            }
        }, cmTemplate: { title: false },
    });
    scheme.LoadMemoTypes();
    scheme.GetSchemeCategory("");

    $("#dd_scheme").multiselect('destroy');
    $("#dd_scheme").empty();
    $('#dd_scheme').multiselect('rebuildscheme');
    $("#dt_effective").datepicker({
        dateFormat: 'dd/mm/y',
        changeMonth: true,
        changeYear: true,
    });

    scheme.LoadSchemeMaster();
});