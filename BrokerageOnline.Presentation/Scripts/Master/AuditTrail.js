var AuditTrail = {

    LoadAudit: function () {
        Utility.ServiceCall("POST", 'MasterService.svc/GetAuditMaster', JSON.stringify({ SearchText: Utility.ListSearchText }), "json", false, false, function (result) {
            var data = result.GetAuditMasterResult;

            $('#grid_audit').jqGrid('clearGridData');
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++)
                    jQuery("#grid_audit").jqGrid('addRowData', data[i].id, data[i]);
            }
            else {
                Utility.writeNotification("error", "No Records Found", "", true);
            }
        });
    },



    RefreshLoadAudit: function () {
        Utility.ListSearchText = '';
        AuditTrail.LoadAudit();
    },

    GetExcel: function () {
        ExportToExcel.ExportJQGridDataToExcel("#grid_audit", "AuditTrail.xls");
    },
    GetPDF: function () {
        ExportToExcel.ExportJQGridDataToExcel("#grid_audit", "AuditTrail.pdf");
    },
 
}

$(function () {
    $("#grid_audit").jqGrid({
        height: 400,
        datatype: "local",
        width: null,
        shrinkToFit: false,
        //sortable: true,
        rowNum: 100,
        ignoreCase: true,
        colNames: ['EmpID', 'UserName', 'EmployeeName', 'Branch', 'IPAddress', 'Date_Time', 'Action', 'Masters', 'ReferenceID', 'FieldName', 'PreviousValue', 'NewValue'],
        colModel: [
                    { name: 'UserId', index: 'UserId', width: 100, align: 'center', sortable: false, sorttype: 'integer', searchoptions: { sopt: ['eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
                    { name: 'LoginId', index: 'LoginId', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'EmployeeName', index: 'EmployeeName', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'Branch', index: 'Branch', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'IpAddress', index: 'IpAddress', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'ModifiedDate', index: 'ModifiedDate', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'ActionType', index: 'ActionType', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'ScreenName', index: 'ScreenName', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'ReferenceId', index: 'ReferenceId', sortable: false, sorttype: 'integer', searchoptions: { sopt: ['eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
                    { name: 'FieldName', index: 'FieldName', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'OldValue', index: 'OldValue', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'NewValue', index: 'NewValue', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } }
        ], cmTemplate: { title: false },
    });
    jQuery("#grid_audit").jqGrid('filterToolbar', { searchOperators: true, stringResult: true, searchOnEnter: false, defaultSearch: "cn", multipleSearch: true });
    AuditTrail.LoadAudit();
});