$(document).ready(function () {
    var distributorProp = {};

    Utility.ServiceCall("POST", 'MasterService.svc/GetAllDistributorCategories', "", "json", false, false, function (result) {
        distributorProp["distributorCategory"] = result.GetAllDistributorCategoriesResult;
    });

    Utility.ServiceCall("POST", 'MasterService.svc/GetAllSubRegions', "", "json", false, false, function (result) {
        distributorProp["subRegion"] = result.GetAllSubRegionsResult;
    });

    Utility.ServiceCall("POST", 'MasterService.svc/GetAllDistributors', "", "json", false, false, function (result) {
        distributorProp["distributors"] = result.GetAllDistributorsResult;
    });

    DistributorMaster.prototype = distributorProp;
    newDistributor = new DistributorMaster();
    newDistributor.bindAllDistributor(jQuery("#tbl_distributor_master"));
    newDistributor.bindAllSubRegions($('#sel_sub_Region'));
    newDistributor.bindAllDistributorCategory($('#sel_distributor_category'))

    $('#btn_save').click(function () {
        var value = newDistributor.getDistributorFormValues("distributorForm")
        if ($('#btn_save').html() == 'Save') 
            value.DistributorId = "0";

        newDistributor.validateDistributorForm(value) ?
        post(value) :
        Utility.writeNotification("warning", "Please enter the required fields to save or edit", "", true);
       
        //function validateDuplicate(value) {
        //    var jqgriddata = $("#tbl_distributor_master").jqGrid("getGridParam", "data");
        //    var lastrowno = jQuery("#tbl_distributor_master").jqGrid('getGridParam', 'records');
        //    groupARNs = $.map(jqgriddata, function (item) { return item.ARN; });
        //    groupARNs = $.grep(groupARNs, function (v, k) {
        //        return $.inArray(v, groupARNs) === k;
        //    });

        //    var olddistributor = $("#tbl_distributor_master").getRowData($('#hidden_rowid').val());
        //    if (value.DistributorId != 0) {
        //        groupARNs.remove(olddistributor.ARN);
        //    }
        //    for (var i = 0; i < groupARNs.length  ; i++) {
        //        if (value.ARN == groupARNs[i]) {
        //            Utility.writeNotification("warning", "Please enter the new ARN No", "", true);
        //            return false;
        //        }
        //    }
        //    post(value);
        //}
       
        function post(value) {
            Utility.ServiceCall("POST", 'MasterService.svc/InsertUpdateDistributor', JSON.stringify({ distributor: value }), "json", false, false, function (result) {
                if (result.InsertUpdateDistributorResult == 'INSERTED SUCCESSFULLY' || result.InsertUpdateDistributorResult == 'UPDATED SUCCESSFULLY') {
                    Utility.writeNotification("success", result.InsertUpdateDistributorResult, "", true);
                    newDistributor.reloadGrid();
                }
                else {
                    Utility.writeNotification("error", "ARN No already exists,Please enter the New ARN No.", "", true);
                }
            });
            $('#distributor_add_edit_modal').modal('hide');
            $('#btn_save').html('Save');
            $('form[name=distributorForm]')[0].reset();
        }
    });

    $('#btn_clear').click(function () {
        $('#btn_save').html('Save');
        $('#distributor_add_edit_modal').modal('hide');
    });

    $('#btn_add').click(function () {
        $('form[name=distributorForm]')[0].reset();
        $('#distributor_add_edit_modal').modal('show');
        $('#btn_save').html('Save');
    });


    //$pager = $('#pager_distributor_master');

    //var icon = $pager.find(".ui-pg-button>span.ui-icon-seek-first");
    //icon.removeClass("ui-icon ui-icon-seek-first");
    //icon.addClass("ui-icon ui-icon-arrowthickstop-1-w");

    //$pager.find(".ui-pg-button>span.ui-icon-seek-prev")
    //    .removeClass("ui-icon ui-icon-seek-prev")
    //    //.addClass("ui-icon ui-icon-arrowthick-1-w")
    //    .addClass("ui-icon ui-icon-triangle-1-w");

    //$pager.find(".ui-pg-button>span.ui-icon-seek-next")
    //    .removeClass("ui-icon ui-icon-seek-next")
    //    //.addClass("ui-icon ui-icon-arrowthick-1-e")
    //      .addClass("ui-icon  ui-icon-triangle-1-e");

    //$pager.find(".ui-pg-button>span.ui-icon-seek-end")
    //    .removeClass("ui-icon ui-icon-seek-end")
    //    .addClass("ui-icon ui-icon-arrowthickstop-1-e");
});

function DistributorMaster() {

    this.values = {};

    this.bindAllSubRegions = function (selector) {
        selector.append("<option  value='' selected>Select Branch</option>");
        for (var i = 0; i < this.subRegion.length; i++)
            selector.append("<option  value=" + this.subRegion[i].SubRegionId + ">" + this.subRegion[i].SubRegionName + "</option>");
    }

    this.bindAllDistributorCategory = function (selector) {
        selector.append("<option  value='' selected>Select Distributor Category</option>");
        for (var i = 0; i < this.distributorCategory.length; i++)
            selector.append("<option  value=" + this.distributorCategory[i].DistributorCategoryId + ">" + this.distributorCategory[i].DistributorCategoryName + "</option>");
    }

    this.bindAllDistributor = function (selector) {
        selector.jqGrid({
            datatype: "local",
            data: this.distributors,
            height: 300,
            shrinkToFit: false,
            width: null,
            colNames: ['Edit', 'ARN', 'DistributorId', 'Distributor Name', 'DistributorCategoryId', 'Distributor Category Name', 'Merg Code', 'SubRegionId', 'Branch', 'Status', 'TaxNo', 'Distributor Parent', 'Created On', 'Delete'],
            colModel: [
                    { name: 'Edit', formatter: function (cellvalue, options, rowObject) { return "<i class='fa fa-pencil blue' onclick='newDistributor.editDistributor(" + rowObject.DistributorId + ")'></i>" }, align: 'center', width: 80, search: false },
                    { name: 'ARN', width: 100, index: 'ARN', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'DistributorId', index: 'DistributorId', hidden: true },
                    { name: 'DistributorName', width: 300, index: 'DistributorName', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'DistributorCategoryId', index: 'DistributorCategoryId', hidden: true },
                    { name: 'DistributorCategoryName', width: 200, index: 'DistributorCategoryName', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                     { name: 'MergCode', width: 200, index: 'MergCode', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'SubRegionId', index: 'SubRegionId', hidden: true },
                    { name: 'SubRegion', width: 200, index: 'SubRegion', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'DistributorStatus', index: 'DistributorStatus', width: 100, align: 'center', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'TaxNo', width: 100, index: 'TaxNo', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'DistributorParentId', width: 200, index: 'DistributorParentId', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'CreatedOn', width: 200, index: 'CreatedOn', align: 'center', sortable: false, sorttype: 'date', datefmt: 'dd/mm/yyyy', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
                    { name: 'Delete', formatter: function (cellvalue, options, rowObject) { return "<i class='fa fa-trash-o red' id=del_dist_'" + rowObject.DistributorId + "' onclick='newDistributor.deleteDistributor(" + rowObject.DistributorId + ")'></i>" }, align: 'center', width: 80, search: false },
            ],
           
            ignoreCase: true,
            viewrecords: true,
            pager: "#pager_distributor_master",
            rowNum: 20,
            rowList: [10, 20, 50, 100],
            rownumbers: true,
            rownumWidth: 42,
            jsonReader: {
                repeatitems: false
            },
        }).jqGrid('filterToolbar', { searchOperators: true, stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
        selector.trigger('reloadGrid');
    }

    this.reloadGrid = function () {
        Utility.ServiceCall("POST", 'MasterService.svc/GetAllDistributors', "", "json", false, false, function (result) {
            $("#tbl_distributor_master").clearGridData(true).jqGrid('setGridParam',
                    {
                        datatype: 'local',
                        data: result.GetAllDistributorsResult
                    }).trigger("reloadGrid");
        });
    }

    editDistributor = function (editRow, form) {
        $('form input, form select').each(
        function (index, field) {
            var selector = $(this);
            switch (field.name) {
                case "ARN":
                    bindValues(selector, editRow["ARN"]);
                    break;
                case "DistributorCategoryId":
                    bindValues(selector, editRow["DistributorCategoryId"]);
                    break;
                case "SubRegionId":
                    bindValues(selector, editRow["SubRegionId"]);
                    break;
                case "DistributorStatus":
                    bindValues(selector, editRow["DistributorStatus"] == 'Active' ? 1 : 0);
                    break;
                case "DistributorName":
                    bindValues(selector, editRow["DistributorName"]);
                    break;
                case "TaxNo":
                    bindValues(selector, editRow["TaxNo"]);
                    break;
                //case "DistributorParentId":
                //    bindValues(selector, editRow["DistributorParentId"]);
                //    break;
                case "MergCode":
                    bindValues(selector, editRow["MergCode"]);
                    break;
                case "DistributorId":
                    bindValues(selector, editRow["DistributorId"]);
                    break;
            }
        });
        function bindValues(selector, value) {
            switch (selector.prop("tagName")) {
                case "INPUT":
                    selector.val(value);
                    break;
                case "SELECT":
                    selector.find("option[value=" + value + "]").attr("selected", true);
                    break;
            }
        }
    }

    this.getDistributorFormValues = function (form) {
        var values = {};
        $.each($("form[name=" + form + "]").serializeArray(), function (i, field) {
            values[field.name] = field.value;
        });
        return values;
    }

    this.validateDistributorForm = function (formValues) {
        return ((formValues.DistributorCategoryId != undefined && formValues.DistributorCategoryId != null && formValues.DistributorCategoryId != "")
            && (formValues.DistributorId != undefined && formValues.DistributorId != null && formValues.DistributorId != "")
            && (formValues.DistributorName != undefined && formValues.DistributorName != null && formValues.DistributorName != "")
            //&& (formValues.DistributorParentId != undefined && formValues.DistributorParentId != null && formValues.DistributorParentId != "")
            && (formValues.ARN != undefined && formValues.ARN != null && formValues.ARN != "")
            && (formValues.DistributorStatus != undefined && formValues.DistributorStatus != null && formValues.DistributorStatus != "")
            //&& (formValues.TaxNo != undefined && formValues.TaxNo != null && formValues.TaxNo != "")
            && (formValues.SubRegionId != undefined && formValues.SubRegionId != null && formValues.SubRegionId != "")
            && (formValues.MergCode != undefined && formValues.MergCode != null && formValues.MergCode != ""))
    }

    this.editDistributor = function (id) {
        $('#hidden_rowid').val(id);
        var rowdata;
        var datafromgrid = $('#tbl_distributor_master').jqGrid('getRowData');
        for (var i = 0; i < datafromgrid.length; i++) {
            if (datafromgrid[i].DistributorId == id)
                rowdata = datafromgrid[i];
        }
        $('#distributor_add_edit_modal').modal('show');
        editDistributor(rowdata, "distributorForm");
        $('#btn_save').html('Update');
    }

    this.deleteDistributor = function (id) {
        $('#conf_del_modal').modal('show');
        var confBtn = $('#confirmBtn');
        confBtn.empty();
        confBtn.append("<button class='btn mr-right-01 btn-success' onclick='newDistributor.confirmDelete(" + id + ")' type='button'>Yes</button>")
        confBtn.append("<button class='btn mr-right-01 btn-danger' onclick='newDistributor.closeConfirm()' type='button'>No</button>")
    }

    this.confirmDelete = function (id) {
        var thisObj = this;
        Utility.ServiceCall("GET", 'MasterService.svc/DeleteDistributorById/' + id, "", "json", false, false, function (result) {
            Utility.writeNotification("success", result.DeleteDistributorByIdResult, "", true);
            thisObj.reloadGrid();
        });
        $('#conf_del_modal').modal('hide');
    }

    this.closeConfirm = function () {
        $('#conf_del_modal').modal('hide');
    }
}

Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};