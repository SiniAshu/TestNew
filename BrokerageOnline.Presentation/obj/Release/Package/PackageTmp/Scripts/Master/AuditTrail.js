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
        rowNum: -1,
        colNames: ['EmpID', 'UserName', 'EmployeeName', 'Branch', 'IPAddress', 'Date_Time', 'Action', 'Masters', 'ReferenceID', 'FieldName', 'PreviousValue', 'NewValue'],
        colModel: [
                    { name: 'UserId', index: 'UserId', width: 70, align: 'center', sortable: false },
                    { name: 'LoginId', index: 'LoginId', sortable: false },
                    { name: 'EmployeeName', index: 'EmployeeName', sortable: false },
                    { name: 'Branch', index: 'Branch', sortable: false },
                    { name: 'IpAddress', index: 'IpAddress', sortable: false },
                    { name: 'ModifiedDate', index: 'ModifiedDate', sortable: false },
                    { name: 'ActionType', index: 'ActionType', sortable: false },
                    { name: 'ScreenName', index: 'ScreenName', sortable: false },
                    { name: 'ReferenceId', index: 'ReferenceId', sortable: false },
                    { name: 'FieldName', index: 'FieldName', sortable: false },
                    { name: 'OldValue', index: 'OldValue', sortable: false },
                    { name: 'NewValue', index: 'NewValue', sortable: false }
        ], cmTemplate: { title: false },
    });

    AuditTrail.LoadAudit();
});