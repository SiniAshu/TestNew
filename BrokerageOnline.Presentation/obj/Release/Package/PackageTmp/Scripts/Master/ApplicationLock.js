var ApplicationLock = {
    beforeLocked: [],
    beforeunlocked: [],

    LoadRole: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetApplicationLock', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetApplicationLockResult;
            $('#grid_audit').jqGrid('clearGridData');
            if (data.length > 0) {
                var LockNotes = data[0].LockNotes;
                $('#txt_locknotes').val(LockNotes);
                for (var i = 0; i < data.length; i++) {
                    jQuery("#grid_audit").jqGrid('addRowData', data[i].id, data[i]);
                    if (data[i].LoginDisabled == 1) {
                        ApplicationLock.beforeLocked.push(data[i].UserId);
                    }
                    else {
                        ApplicationLock.beforeunlocked.push(data[i].UserId);
                    }
                }
            }
        });
    },

    ReturnCheckBox: function (cellValue, options, rowdata, action) {
        if (rowdata.Description.toLowerCase() == "sales admin checker" || rowdata.Description.toLowerCase() == "technology admin") {
            return "<input type='checkbox' Disabled style='display: block; border:1px solid red !important; margin-left: auto;margin-right: auto;' />";
        }
        else {
            if (rowdata.isLocked == "True")
                return "<input type='checkbox' Checked  style='display: block;margin-left: auto;margin-right: auto;' />";
            else
                return "<input type='checkbox' style='display: block;margin-left: auto;margin-right: auto;' />";
        }
    },

    Lock: function () {
        $('#modal_confirmation').modal('show');
    },

    Lockyes: function () {
        var gridData = jQuery("#grid_audit").jqGrid('getRowData');

        var button_Lock = $('#btn_lock_application').text();
        //if (button_Lock == "Lock") {

        var data = [];
        var locked = [];
        var unlocked = [];
        var ViewRoles = [];
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                //var rowData = {};
                //rowData.RoleSeqNo = gridData[i].RoleSeqNo;
                //rowData.IsLocked = gridData[i].IsLocked;
                //data.push(rowData);
                if (gridData[i].isLocked == "True" && button_Lock == "Lock") {
                    locked.push(gridData[i].RoleSeqNo);
                }
                else {
                    unlocked.push(gridData[i].RoleSeqNo);
                }

                if (gridData[i].IsView == "True") {
                    ViewRoles.push(gridData[i].RoleSeqNo);
                }
            }
        }

        var LockNotes = '';
        LockNotes = $('#txt_locknotes').val();

        if (ApplicationLock.beforeLocked.length != locked.length || ApplicationLock.beforeunlocked.length != unlocked.length || button_Lock != "Lock" || ViewRoles.length > 0) {
            Utility.ServiceCall("POST", 'MasterService.svc/UpdateApplicationLock', JSON.stringify({ Lock: locked.toString(), unlock: unlocked.toString(), ViewRoles: ViewRoles.toString(), LockNotes: LockNotes }), "json", false, false, function (result) {
                Utility.writeNotification("success", "Application has been Locked/Unlocked for selected Roles", "", true);
                ApplicationLock.LoadRole();
                ApplicationLock.LockUnlockButton();
            });
        }
        else {
            Utility.writeNotification("warning", "No changes were done", "", true);
        }
        $('#modal_confirmation').modal('hide');
    },

    ConfirmCancel: function () {
        $('#modal_confirmation').modal('hide');
    },


    ReturnUnCheckedUsers: function () {
        var gridData = jQuery("#grid_audit").jqGrid('getRowData');
        var unlockedusers = [];
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                var rowData = {};
                if (gridData[i].isLocked == "False") {
                    unlockedusers.push(gridData[i].Description);
                }
            }
        }
        if (unlockedusers.length > 0) {
            $('#unlocked_users').html(' ');
            $('#unlocked_users').html(unlockedusers.toString());
        }
        else
            $('#unlocked_users').html(' ');
    },

    onSelectRow: function (id) {
        var ret = jQuery("#grid_audit").jqGrid('getRowData', id);

        if (ret.Description.toLowerCase() == "sales admin checker" || ret.Description.toLowerCase() == "information technology") {
            jQuery("#grid_audit").setColProp('isLocked', { editable: false });
        }
        else
            jQuery("#grid_audit").setColProp('isLocked', { editable: true });
    },

    LockUnlockButton: function () {

        var gridData = jQuery("#grid_audit").jqGrid('getRowData');
        var unlockedusers = 0;
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].isLocked == "True") {
                    unlockedusers = 1;
                    break;
                }
            }
        }
        if (unlockedusers == 1) {
            $('.chk_processing').attr('disabled', true);
            $('#btn_lock_application').text('UnLock');
        }
        else
            $('#btn_lock_application').text('Lock');
    },


    ReturnCheckBox_mod: function (cellValue, options, rowdata, action) {
        if (rowdata.Description.toLowerCase() == "sales admin checker" || rowdata.Description.toLowerCase() == "technology admin") {
            return "<input type='checkbox' Disabled style='display: block; border:1px solid red !important; margin-left: auto;margin-right: auto;' />";
        }
        else {
            return '<input type="checkbox" value="' + cellValue + '" style="display: block;margin-left: auto;margin-right: auto;" />';
        }
    },

};





$(function () {
    $("#grid_audit").jqGrid({
        height: 400,
        datatype: "local",
        width: null,
        shrinkToFit: false,
        //sortable: true,
        rowNum: -1,
        colNames: ['Reference ID', 'RoleId', 'RoleName', 'Description', '<input type="checkbox" id="Lock_checkAll" >Select</input>', 'View'],
        colModel: [
                    { name: 'RoleSeqNo', index: 'RoleSeqNo', align: 'center', sortable: false },
                    { name: 'RoleId', index: 'RoleId', hidden: true, sortable: false },
                    { name: 'RoleName', index: 'RoleName', sortable: false },
                    { name: 'Description', index: 'Description', sortable: false },
                     {
                         name: 'isLocked', index: 'isLocked', width: '80px;', align: 'center', sortable: false, hidden: false,
                         formatter: 'checkbox', editable: false, cellEdit: false, editoptions: { value: "True:False" }, edittype: "checkbox",
                         formatoptions: { disabled: false },// formatter: ApplicationLock.ReturnCheckBox_mod,
                         cellattr: function (rowId, val, rawObject) {
                             return " class='chk_processing' ";
                         }
                     },
                { name: 'IsView', width: '60px;', align: 'center', formatter: 'checkbox', hidden: false, edittype: "checkbox", formatoptions: { disabled: false }, editoptions: { value: "True:False" }, sortable: false },
                    //{ name: 'IsView', index: 'IsView', editable: true, width: 80, hidden: false, edittype: 'checkbox', editoptions: { value: "True:False" }, align: 'center' }
        ], cmTemplate: { title: false },

        afterInsertRow: function (rowid, e, rowdata, cellname) {
            var RoleID = sessionStorage.getItem("RoleID");
            if (parseInt(RoleID) == rowdata.RoleSeqNo) {
                $("#grid_audit  tr[id='" + rowid + "'] > td:eq(4) > input").attr("disabled", true);
            }
            else
                jQuery('#grid_audit').jqGrid('editRow', rowid, true);
        },
        beforeSelectRow: function (rowid, e) {
            var $target = $(e.target), $td = $target.closest("td"),
                iCol = $.jgrid.getCellIndex($td[0]),
                colModel = $(this).jqGrid("getGridParam", "colModel");
            if (iCol >= 0) {
                ApplicationLock.ReturnUnCheckedUsers();
            }
            return true;
        },

        //loadComplete: function (rowid, e) {
        //    jQuery("#grid_audit").jqGrid('setCell', rowid, 'isLocked', '','not-editable-cell');}

    });

    $("#Lock_checkAll").click(function (e) {
        var button_Lock = $('#btn_lock_application').text();
        if (button_Lock == "Lock") {
            var isSelectAllTrue = $('#Lock_checkAll').is(":checked");
            e = e || event;/* get IE event ( not passed ) */
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;

            var td = $('.chk_processing');
            for (var i = 0; i < td.length; i++) {
                var checkbox = $('input[type="checkbox"]', $(td[i]).closest('td')).get(0);
                var checked = checkbox.checked;
                if (checkbox.disabled)
                    checkbox.checked = false;
                else
                    checkbox.checked = isSelectAllTrue;
            }
            ApplicationLock.ReturnUnCheckedUsers();
        }
    });

    ApplicationLock.LoadRole();
    ApplicationLock.ReturnUnCheckedUsers();
    ApplicationLock.LockUnlockButton();
});