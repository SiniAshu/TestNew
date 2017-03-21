var Unlockusers = {
    beforeLocked : [],
    beforeunlocked : [],

    LoadUsers: function () {
        var username = $('#txt_username').val();
        var Disabled = 0;
        $('#txt_lock').html("Lock")
        if ($('#chkDisabled').is(":checked")) {
            Disabled = 1;
            $('#txt_lock').html("UnLock")
        }
        Utility.ServiceCall("POST", 'MasterService.svc/GetUnlockUsers', JSON.stringify({ UserName: username, IsDisabled: Disabled }), "json", false, false, function (result) {
            var data = result.GetUnlockUsersResult;
            $('#grid_audit').jqGrid('clearGridData');
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++)
                {
                    if (data[i].LoginDisabled == 1) {
                        Unlockusers.beforeLocked.push(data[i].UserId);
                    }
                    else {
                        Unlockusers.beforeunlocked.push(data[i].UserId);
                    }

                    if (data[i].LoginDisabled == 1)
                        data[i].LoginDisabled = 0;
                    jQuery("#grid_audit").jqGrid('addRowData', data[i].id, data[i]);

                }
            }
        });
    },

    ReturnCheckBox: function (cellValue, options, rowdata, action) {
        return "<input type='checkbox' value='1' style='display: block;margin-left: auto;margin-right: auto;' />";
    },

    Lock: function () {
        var gridData = jQuery("#grid_audit").jqGrid('getRowData');
        var data = [];
        var locked = [];
        var unlocked = [];
        var reset = [];
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                var rowData = {};
                //rowData.RoleSeqNo = gridData[i].RoleSeqNo;
                //rowData.IsLocked = gridData[i].IsLocked;
                //data.push(rowData);

                if ($('#chkDisabled').is(":checked")) {
                    if (gridData[i].LoginDisabled == 1) {
                        unlocked.push(gridData[i].UserId);
                    }
                }
                else{ 
                    if(gridData[i].LoginDisabled == 1)  
                        locked.push(gridData[i].UserId);
                }
                //else {
                //    unlocked.push(gridData[i].UserId);
                //}
            }
        }
        if (Unlockusers.beforeLocked.length != locked.length || Unlockusers.beforeunlocked.length != unlocked.length) {
            Utility.ServiceCall("POST", 'MasterService.svc/UpdateUnLockUsers', JSON.stringify({ Lock: locked.toString(), unlock: unlocked.toString(), reset: reset.toString() }), "json", false, false, function (result) {
                Utility.writeNotification("success", "Application has been Locked/Unlocked for selected Users", "", true);
                Unlockusers.LoadUsers();
            });
        }
        else {
            Utility.writeNotification("warning", "No changes were done", "", true);
        }
    },
}


$(function () {

    $("#chkDisabled").attr("checked", "checked");

    $("#grid_audit").jqGrid({
        height: 400,
        datatype: "local",
        width: null,
        shrinkToFit: false,
        //sortable: true,
        rowNum: -1,
        colNames: ['UserId', 'LoginId', 'Full Name', '<span id="txt_lock" >Select</span>', 'Reset'],
        colModel: [
                    { name: 'UserId', index: 'RoleSeqNo', hidden: true, sortable: false },
                    { name: 'LoginId', index: 'LoginId', sortable: false },
                    { name: 'EmployeeName', index: 'EmployeeName', sortable: false },
                    {
                        name: 'LoginDisabled', index: 'LoginDisabled', editable: true, sortable: false, edittype: 'checkbox', editoptions: { value: "1:0" },
                        formatter: "checkbox", formatoptions: { disabled: false }, align: 'center'
                    },
                     {
                         name: 'Reset', index: 'Reset', editable: true, edittype: 'checkbox', sortable: false, editoptions: { value: "1:0" },
                         formatter: "checkbox", formatoptions: { disabled: false }, align: 'center'
                     },
        ], cmTemplate: { title: false },
    });
    Unlockusers.LoadUsers();
});