var LoginAdministration = {

    ReturnSelectedValue: function (Control) {
        var selected = [];
        var brands = '';
        var OutPut = '';

        brands = $('#' + Control + ' option:selected');
        $(brands).each(function (index, brand) {
            selected.push([$(this).val()]);
        });
        if (selected.valueOf().length > 0)
            OutPut = (selected.toString());
        else
            OutPut = '';

        return OutPut;
    },

    Logoutforce: function (EmployeeLogID) {
        Utility.ServiceCall("POST", 'AuthorizationService.svc/InsertUpdateEmployeeLogs', JSON.stringify({ LoginUserID: EmployeeLogID, EmployeeLogID: EmployeeLogID, StatusID: 1 }), "json", false, false, function (result) {
            var rightItems = result.InsertUpdateEmployeeLogsResult;
        });
        LoginAdministration.SearchUserLogs();
    },

    GetExcel: function () {
        ExportToExcel.ExportJQGridDataToExcel("#grid_search_result", "LoginAdministration.xls");
    },

    GetPDF: function () {
        ExportToExcel.ExportJQGridDataToExcel("#grid_search_result", "LoginAdministration.pdf");
    },

    SearchUserLogs: function () {
        var UserName = "";
        UserName = $("#txt_username").val();

        LoginAdministration.CommonSearchUserLogs(UserName);
    },

    RefreshUserLogs: function () {
        //$('#h3_headername').text('');
        //$('#h3_headername').append('Live Session [as on ' + Utility.SystemTime() + ']');
        $("#txt_username").val('');
        LoginAdministration.CommonSearchUserLogs('');
    },



    RefreshAdvanceSearch: function () {
        Utility.ListSearchText = '';
        LoginAdministration.RefreshUserLogs();
    },

    CommonSearchUserLogs: function (UserName) {
        Utility.ServiceCall("POST", 'MasterService.svc/LoginAdministration', JSON.stringify({ UserName: UserName, SearchFilter: Utility.ListSearchText }), "json", false, false, function (result) {
            var arrItems = result.LoginAdministrationResult;
            $('#grid_search_result').jqGrid('clearGridData');
            if (arrItems != undefined && arrItems.length > 0) {
                for (var i = 0; i < arrItems.length; i++)
                    jQuery("#grid_search_result").jqGrid('addRowData', arrItems[i].id, arrItems[i]);
            }
        });
    },


    ReturnLogOutHyperLink: function (cellValue, options, rowdata, action) {
        return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"LoginAdministration.Logoutforce(' + rowdata.EmployeeLogID + ');\">Logout Forcefully</a>';
    },



};

$(function () {

    //$('#h3_headername').append('Live Session [as on ' + Utility.SystemTime() + ']');

    jQuery("#grid_search_result").jqGrid({
        datatype: "local",
        height: 290,
        width: null,
        shrinkToFit: false,
        //sortable: true,
        rowNum: -1,
        colNames: ['User ID', 'ID', 'LoginID', 'UserName', 'LoginTime', 'LastAccessTime', 'IPAddress', ''],
        colModel: [
                { name: 'EmployeeID', index: 'EmployeeID', hidden: true, sortable: false },
                { name: 'EmployeeLogID', index: 'EmployeeLogID', hidden: true, sortable: false },

                { name: 'UserLogin', width: 130, index: 'UserLogin', sortable: false },
                { name: 'EmployeeName', width: 150, index: 'EmployeeName', sortable: false },
                { name: 'LoggedInTime_str', width: 210, index: 'LoggedInTime_str', align: 'center', sortable: false },
                { name: 'LastAccessedTime_str', width: 210, index: 'LastAccessedTime_str', align: 'center', sortable: false },
                { name: 'IPAddress', width: 100, index: 'IPAddress', sortable: false },

                { name: 'act', index: 'act', align: 'center', formatter: LoginAdministration.ReturnLogOutHyperLink, sortable: false },
        ], gridComplete: function () {
            var ids = jQuery("#grid_search_result").jqGrid('getDataIDs');
            if (ids.length > 0) {
                var i = ids.length - 1;
                var cl = ids[i];
                //be = "<a  href='#' onclick=\"LoginAdministration.Logoutforce('" + cl + "');\" > Logout Forcefully </a>";

                //be = '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"LoginAdministration.Logoutforce(' + cl + ');\">Logout Forcefully</a>';
                //jQuery("#grid_search_result").jqGrid('setRowData', ids[i], { act: be });
                $("#" + $('#grid_search_result').jqGrid('getGridParam', 'selrow')).focus();
            }
        },

        ignoreCase: true,
        viewrecords: true,
        rowList: [10, 20, 30],
        pager: '#pgrid_search_result',
        jsonReader: {
            repeatitems: false
        },
    });
    //jQuery("#grid_search_result").jqGrid('navGrid', '#pgrid_search_result', { add: false, edit: false, del: false });

    LoginAdministration.RefreshUserLogs();
});