var dashboard = {
    LoadData: function () {
        var arr = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetDashboardOverview', JSON.stringify({ SearchText: arr }), "json", false, false, function (result) {
            var data = result.GetDashboardOverviewResult;
            $('#tbl_overview').empty();
            var dataRow = '<tr class="db-hdr-rw">'+
                        '<td class="dbt-bg-01 db-bdr-rgt db-bdr-btm" width="15%">Type Of Structure</td>'+
                       ' <td class="dbt-bg-02 db-bdr-rgt db-bdr-btm" width="30%" colspan="3">Current Quarter</td>'+
                        '<td class="dbt-bg-03 db-bdr-rgt db-bdr-btm" width="25%" colspan="2">Undefined Structure</td>'+
                        '<td class="dbt-bg-04 db-bdr-btm" width="30%" colspan="3">Previous Quarter</td>'+
                    '</tr>"'+
                     '<tr class="db-bdy-rw">'+
                      '  <td class="dbt-bg-05 db-bdr-rgt db-bdr-btm">&nbsp;</td>'+
                      '  <td class="dbt-bg-06 db-bdr-rgt db-bdr-btm">Category Wise</td>'+
                      '  <td class="dbt-bg-06 db-bdr-rgt db-bdr-btm">ARN Specific</td>'+
                      '  <td class="dbt-bg-06 db-bdr-rgt db-bdr-btm">Total</td>'+
                      '  <td class="dbt-bg-07 db-bdr-rgt db-bdr-btm">Category Wise</td>'+
                      '  <td class="dbt-bg-07 db-bdr-rgt db-bdr-btm">ARN Specific</td>'+
                      '  <td class="dbt-bg-08 db-bdr-rgt db-bdr-btm">Category Wise</td>'+
                      '  <td class="dbt-bg-08 db-bdr-rgt db-bdr-btm">ARN Specific</td>'+
                      '  <td class="dbt-bg-08  db-bdr-btm">Total</td>'+
                    '</tr>';

            $.each(data, function (key, value) {
                dataRow += '<tr class="db-bdy-rw">' +
                       '<td class="dbt-bg-05 db-bdr-rgt db-bdr-btm">' + value.MemoTypeName + '</td>' +
                       '<td class="dbt-bg-06 db-bdr-rgt db-bdr-btm db-bdy-alignr">' + value.CurrentCategoryWiseCount + '</td>' +
                       '<td class="dbt-bg-06 db-bdr-rgt db-bdr-btm db-bdy-alignr">' + value.CurrentARNSpecificCount + '</td>' +
                       '<td class="dbt-bg-06 db-bdr-rgt db-bdr-btm db-bdy-alignr">' + value.CurrentTotal + '</td>';
                if (value.UndefinedCategoryWiseCount == 0) {
                    dataRow += '<td class="dbt-bg-07 db-bdr-rgt db-bdr-btm db-bdy-alignr">0</td>';
                }
                else {
                    dataRow += '<td class="dbt-bg-07 db-bdr-rgt db-bdr-btm db-bdy-alignr"><a href="javascript:void(0)" onclick=\"dashboard.ViewUndefinedStructure(' + value.MemoTypeId + ',2);\">' + value.UndefinedCategoryWiseCount + '</a></td>';
                }
                if (value.UndefinedARNSpecific == 0) {
                    dataRow += '<td class="dbt-bg-07 db-bdr-rgt db-bdr-btm db-bdy-alignr">0</td>';
                }
                else {
                    dataRow += '<td class="dbt-bg-07 db-bdr-rgt db-bdr-btm db-bdy-alignr"><a href="javascript:void(0)" onclick=\"dashboard.ViewUndefinedStructure(' + value.MemoTypeId + ',1);\">' + value.UndefinedARNSpecific + '</a></td>';
                }
               
                dataRow += '<td class="dbt-bg-08 db-bdr-rgt db-bdr-btm db-bdy-alignr">' + value.PreviousCategoryWiseCount + '</td>' +
                       '<td class="dbt-bg-08 db-bdr-rgt db-bdr-btm db-bdy-alignr">' + value.PreviousARNSpecificCount + '</td>' +
                       '<td class="dbt-bg-08  db-bdr-btm db-bdy-alignr">' + value.PreviousTotal + '</td>' +
                   '</tr>';
            });

            $('#tbl_overview').append(dataRow);

        });


        Utility.ServiceCall("POST", 'MasterService.svc/GetSelfInitiatedMemo', JSON.stringify({ SearchText: arr, self: 1 }), "json", false, false, function (result) {
            var data = result.GetSelfInitiatedMemoResult;
            $('#tbl_self_initiated').empty();
            var dataRow = ' <tr class="db-hdr-b-rw">'+
                        '<td class="dbt-bg-b-01 db-bdr-b-rgt db-bdr-b-btm" width="24%">Memo Type</td>'+
                        '<td class="dbt-bg-b-01 db-bdr-b-btm" colspan="4">Stages</td>' +
                    '</tr>' +
                    ' <tr class="db-hdr-b-rw">' +
                     '   <td class="dbt-bg-b-02 hdr-clr-blk db-bdr-b-rgt db-bdr-b-btm">&nbsp;</td>' +
                      '  <td class="dbt-bg-b-07 db-bdr-b-rgt db-bdr-b-btm" width="19%">Initiated</td>' +
                      '  <td class="dbt-bg-b-08 db-bdr-b-rgt db-bdr-b-btm" width="19%">Reviewed</td>' +
                      '  <td class="dbt-bg-b-11 db-bdr-b-rgt db-bdr-b-btm" width="19%">Final Approval</td>' +
                      '  <td class="dbt-bg-b-14" width="19%">Discarded</td>' +
                    '</tr>';


            $.each(data, function (key, value) {
                dataRow += ' <tr class="db-bdy-b-rw">' +
                        '<td class="dbt-bg-b-02 hdr-clr-blk db-bdr-b-rgt db-bdr-b-btm hdr-clr-t-cent">' + value.MemoTypeName + '</td>' +
                        '<td class="dbt-bg-b-05 db-bdr-b-rgt db-bdr-b-btm db-bdy-alignr">' + value.Initiated + '</td>' +
                        '<td class="dbt-bg-b-09 db-bdr-b-rgt db-bdr-b-btm db-bdy-alignr">' + value.Reviewed + '</td>' +
                        '<td class="dbt-bg-b-12 db-bdr-b-rgt db-bdr-b-btm db-bdy-alignr">' + value.Approved + '</td>' +
                        '<td class="dbt-bg-b-15 db-bdr-b-btm db-bdy-alignr">' + value.Discarded + '</td>' +
                    '</tr>';
            });
            $('#tbl_self_initiated').append(dataRow);
        });


        Utility.ServiceCall("POST", 'MasterService.svc/GetSelfInitiatedMemo', JSON.stringify({ SearchText: arr, self: 0 }), "json", false, false, function (result) {
            var data = result.GetSelfInitiatedMemoResult;
            $('#tbl_team_initiated').empty();
            var dataRow = ' <tr class="db-hdr-b-rw">' +
                        '<td class="dbt-bg-b-01 db-bdr-b-rgt db-bdr-b-btm" width="24%">Memo Type</td>' +
                        '<td class="dbt-bg-b-01 db-bdr-b-btm" colspan="4">Stages</td>' +
                    '</tr>' +
                    ' <tr class="db-hdr-b-rw">' +
                     '   <td class="dbt-bg-b-02 hdr-clr-blk db-bdr-b-rgt db-bdr-b-btm">&nbsp;</td>' +
                      '  <td class="dbt-bg-b-07 db-bdr-b-rgt db-bdr-b-btm" width="19%">Initiated</td>' +
                      '  <td class="dbt-bg-b-08 db-bdr-b-rgt db-bdr-b-btm" width="19%">Reviewed</td>' +
                      '  <td class="dbt-bg-b-11 db-bdr-b-rgt db-bdr-b-btm" width="19%">Final Approval</td>' +
                      '  <td class="dbt-bg-b-14" width="19%">Discarded</td>' +
                    '</tr>';


            $.each(data, function (key, value) {
                dataRow += ' <tr class="db-bdy-b-rw">' +
                        '<td class="dbt-bg-b-02 hdr-clr-blk db-bdr-b-rgt db-bdr-b-btm hdr-clr-t-cent">' + value.MemoTypeName + '</td>' +
                        '<td class="dbt-bg-b-05 db-bdr-b-rgt db-bdr-b-btm db-bdy-alignr">' + value.Initiated + '</td>' +
                        '<td class="dbt-bg-b-09 db-bdr-b-rgt db-bdr-b-btm db-bdy-alignr">' + value.Reviewed + '</td>' +
                        '<td class="dbt-bg-b-12 db-bdr-b-rgt db-bdr-b-btm db-bdy-alignr">' + value.Approved + '</td>' +
                        '<td class="dbt-bg-b-15 db-bdr-b-btm db-bdy-alignr">' + value.Discarded + '</td>' +
                    '</tr>';
            });
            $('#tbl_team_initiated').append(dataRow);
        });
    },

    ViewUndefinedStructure: function (MemoTypeId, StructureType) {
        var structure = "";
        if (StructureType == 1)
            structure = "ARN";
        else
            structure = "CATEGORY"
        Utility.ServiceCall("POST", 'MasterService.svc/GetUndefinedStructure', JSON.stringify({ MemoTypeId: MemoTypeId, StructureType: structure }), "json", false, false, function (result) {
            var data = result.GetUndefinedStructureResult;
            $('#tbl_undefined_structure').empty();
            var dataRow = '<tr class="db-hdr-rw">' +
                '<td class="dbt-bg-03 db-bdr-rgt db-bdr-btm" width="25%" colspan="2">UNDEFINED ' + structure + '</td></tr>';
            $.each(data, function (key, value) {
                dataRow += '<tr class="db-bdy-rw">'+
                    '<td class="dbt-bg-07 db-bdr-rgt db-bdr-btm">' + value.Value + '</td></tr>';
            });
            $('#tbl_undefined_structure').append(dataRow);
            $('#mdl_View_Structure').modal('show');
        });
    }
}

$(function () {
    dashboard.LoadData();
    var RoleID = sessionStorage.getItem("RoleID");
    if (RoleID == "1") {
        $('#div_memo_statistics').hide();
    } else {
        $('#div_memo_statistics').show();
    }
});