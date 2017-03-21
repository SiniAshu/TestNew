var UserLogMaster = {

    LoadUsers: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetUserView', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var arrItems = result.GetUserViewResult;

            $("#dd_user_name").multiselect('destroy');
            $("#dd_user_name").empty();
            for (var i = 0; i < arrItems.length; i++) {
                if (arrItems[i].FullName != '')
                    $("<option />").text(arrItems[i].FullName).val(arrItems[i].UserId).appendTo('#dd_user_name');
            }
            $('#dd_user_name').attr("multiple", "multiple");

            $('#dd_user_name').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
            });
            $('#dd_user_name').multiselect('clearSelection');
        });
    },


    LoadStatus: function () {
        Utility.ServiceCall("POST", 'MasterService.svc/GetCodeMaster', JSON.stringify({ CodeType: "LogStatus" }), "json", false, false, function (result) {
            var arrItems = result.GetCodeMasterResult;

            $("<option />").text("Select Status").val("0").appendTo("#dd_status");
            for (var i = 0; i < arrItems.length; i++) {
                if (arrItems[i].CodeName != '')
                    $("<option />").text(arrItems[i].CodeName).val(arrItems[i].CodeID).appendTo('#dd_status');
            }

            //$("#dd_status").multiselect('destroy');
            //$("#dd_status").empty();
            //for (var i = 0; i < arrItems.length; i++) {
            //    if (arrItems[i].CodeName != '')
            //        $("<option />").text(arrItems[i].CodeName).val(arrItems[i].CodeID).appendTo('#dd_status');
            //}
            //$('#dd_status').attr("multiple", "multiple");

            //$('#dd_status').multiselect({
            //    includeSelectAllOption: true,
            //    enableFiltering: true,
            //    enableCaseInsensitiveFiltering: true,
            //});
            //$('#dd_status').multiselect('clearSelection');
        });
    },

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

    DefaultControlSelect: function () {

        $("#dt_from").val('');
        $("#dt_to").val('');
    },

    GetExcel: function () {
        ExportToExcel.ExportJQGridDataToExcel("#grid_search_result", "UserLogs.xls");
    },
    GetPDF: function () {
        ExportToExcel.ExportJQGridDataToExcel("#grid_search_result", "UserLogs.pdf");
    },

    //AdvanceSearchClick: function () { 
    //    var t = this;
    //    var pSearch = {
    //        multipleSearch: true,
    //        multipleGroup: true,
    //        showQuery: true,
    //        recreateFilter: true
    //    };
    //    jQuery("#grid_search_result").jqGrid('searchGrid', pSearch);
    //},

    RefreshUserLogs: function () {
        Utility.ListSearchText = '';
        UserLogMaster.SearchUserLogs();
    },

    SearchUserLogs: function () {
        var Status, UserIDs, FromDate, ToDate, IpAddress 

        Status = UserLogMaster.ReturnSelectedValue('dd_status');
        UserIDs = UserLogMaster.ReturnSelectedValue('dd_user_name');
        FromDate = $("#dt_from").val();
        ToDate = $("#dt_to").val();
        IpAddress = $("#txt_ipaddress").val();

        Utility.ServiceCall("POST", 'MasterService.svc/SearchUserLogs', JSON.stringify({ UserIDs: UserIDs, Status: Status, PeriodFrom: FromDate, PeriodTo: ToDate, IPAddress: IpAddress, SearchFilter: Utility.ListSearchText }), "json", false, false, function (result) {
            var arrItems = result.SearchUserLogsResult;
            $('#grid_search_result').jqGrid('clearGridData');
            if (arrItems != undefined && arrItems.length > 0) {
                for (var i = 0; i < arrItems.length; i++)
                    jQuery("#grid_search_result").jqGrid('addRowData', arrItems[i].id, arrItems[i]);
            }
        }); 
    },
};

$(function () {

    UserLogMaster.LoadUsers();
    UserLogMaster.LoadStatus();
    UserLogMaster.DefaultControlSelect();


        $("#dt_from").datepicker({
            dateFormat: 'dd/mm/y',
            changeMonth: true,
            changeYear: true,
            onSelect: function (selectedDate) {
                $("#dt_to").datepicker({
                    dateFormat: 'dd/mm/y',
                    changeMonth: true,
                    changeYear: true 
                });
                $("#dt_to").attr('paabled', false);
                $("#dt_to").datepicker("option", "maxDate", '+0m +0w');
                $("#dt_to").datepicker("option", "minDate", selectedDate); 
            }
        });
        $("#dt_from").datepicker("option", "maxDate", '+0m +0w');

        $('#dt_from').keydown(function (event) {
            var charCode = (event.which) ? event.which : event.keyCode;
            if (charCode != 9) {
                return false;
            }
        });

        $('#dt_to').keydown(function (event) {
            var charCode = (event.which) ? event.which : event.keyCode;
            if (charCode != 9) {
                return false;
            }
        });


    jQuery("#grid_search_result").jqGrid({
        datatype: "local",
        height: 290,
        width: null,
        shrinkToFit: false,
        //sortable: true,
        ignoreCase: true,
        rowNum: 100,
        colNames: ['EmpID.', 'UserName', 'EmployeeName', 'IPAddress', 'Branch', 'Login', 'LogOut', 'LastAccessed Date/Time', 'LoggedOutBy', 'Status'],
        colModel: [
                { name: 'EmployeeID', index: 'EmployeeID', width: 90, align: 'center', sortable: false , sorttype: 'integer', searchoptions: { sopt: ['eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
                { name: 'UserLogin', width: 130, index: 'UserLogin', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'EmployeeName', width: 150, index: 'EmployeeName', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'IPAddress', width: 100, index: 'IPAddress', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'SubRegionName', width: 120, index: 'SubRegionName', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'LoggedInTime_str', width: 210, index: 'LoggedInTime_str', align: 'center', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'LoggedOutTime_str', width: 210, index: 'LoggedOutTime_str', align: 'center', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'LastAccessedTime_str', width: 210, index: 'LastAccessedTime_str', align: 'center', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'LoggedOutUser', index: 'LoggedOutUser', width: 150, sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'StatusName', index: 'StatusName', width: 200, sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
        ],
        viewrecords: true,
        rowList: [10, 20, 30],
        pager: '#pgrid_search_result',
        jsonReader: {
            repeatitems: false
        },
    });
    jQuery("#grid_search_result").jqGrid('filterToolbar', { searchOperators: true, stringResult: true, searchOnEnter: false, defaultSearch: "cn", multipleSearch: true });
   // jQuery("#grid_search_result").jqGrid('navGrid', '#pgrid_search_result', { add: false, edit: false, del: false });

    jQuery("#grid_search_result").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
          //{ startColumnName: 'LoggedInTime_str', numberOfColumns: 2, titleText: '<em>Date / Time</em>' }
          { startColumnName: 'LoggedInTime_str', numberOfColumns: 2, titleText: 'Date / Time' }
        ]
    });

});