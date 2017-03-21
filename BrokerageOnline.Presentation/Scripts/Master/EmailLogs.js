var emailList, tableToExcel = (function () {
    // ReSharper disable UnusedLocals
    var uri = 'data:application/vnd.ms-excel;base64,',
// ReSharper restore UnusedLocals
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>{table}</body></html>',
        base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))); },
        format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }); };
    return function (table, name, filename) {
        var ctx = { worksheet: name || 'Worksheet', table: table };
        //  Important...
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        var urlvar = base64toBlob(base64(format(template, ctx)), ctx);
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            window.navigator.msSaveOrOpenBlob(urlvar, filename);
        }
        else {
            var link = document.createElement('A');
            link.href = window.URL.createObjectURL(urlvar);
            link.download = filename;
            link.click();
        }
    };
})();

$(document).ready(function () {
    loadEmailLogs();
    $("#btnExport").click(function (e) {
        var report = $('<div></div>').attr('id', 'ExportToExcel');
        report.appendTo('body');
        var table = returnasEmailLogTable(emailList);
        report.append(table);
        myDate = new Date();
        tableToExcel(report.html(), "Page1", "Brokerage Online Service Email_Logs (" +
            myDate.getDate() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getFullYear() +
            ").xls");
        report.remove();
    });
});

function loadEmailLogs() {
    Utility.ServiceCall("POST", 'MasterService.svc/GetEmailLog', "", "json", false, false, function (emailLogs) {
        emailList = "";
        emailList = emailLogs.GetEmailLogResult;
        jQuery("#tbl_email_logs").jqGrid({
            datatype: "local",
            data: emailList,
            height: 300,
            width: 1800,
            shrinkToFit: false,
            colNames: ['LogId', 'From', 'Email To', 'To', 'Email CC', 'CC', 'Email BCC', 'BCC', 'Subject', 'Action', 'Body', 'Content', 'Date', 'Time', 'FilePath', 'FileName', 'FileType', 'Status', 'Attachment'],
            colModel: [
                    { name: 'LogId', Index: 'LogId', hidden: true },
                    { name: 'Emailfrom', width: 200, index: 'Emailfrom', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'Emailto', width: 200, index: 'Emailto', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'To', width: 200, index: 'To', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'EmailCC', width: 200, index: 'EmailCC', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'CC', width: 200, index: 'CC', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'EmailBCC', width: 200, index: 'EmailBCC', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'BCC', width: 200, index: 'BCC', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'Subject', width: 200, index: 'Subject', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'Action', width: 200, index: 'Action', sortable: false, sorttype: 'string' },
                    { name: 'Body', index: 'Body', hidden: true },
                    { name: 'Content', width: 100, sortable: false, search: false, align: 'center', formatter: function (cellvalue, options, rowObject) { return "<i class='fa fa-file' style='font-size: 20px; color: orange' id=view_content_'" + rowObject.LogId + "' onclick='viewContent(" + rowObject.LogId + ")'></i>" } },
                    { name: 'SentDate', align: 'center', width: 100, index: 'SentDate', sortable: false, sorttype: 'date', datefmt: 'd/m/Y', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
                    { name: 'SentTime', align: 'center', width: 100, index: 'SentTime', sortable: false, sorttype: 'date', datefmt: 'd/m/Y', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
                    { name: 'FilePath', index: 'FilePath', hidden: true },
                    { name: 'FileName', index: 'FileName', hidden: true },
                    { name: 'FileType', index: 'FileType', hidden: true },
                    { name: 'Status', width: 200, index: 'Status', sortable: false, search: false },
                    {
                        name: 'Attachment', align: 'center', sortable: false, search: false, formatter: function (cellValue, options, rowdata) {
                            return rowdata.FilePath == "" ?
                                "<i class='fa fa-file text-success' style='font-size: 20px;' title='no attachment find'></i>" :
                            "<a href='ReportViewer.html' target='_blank'><i class='fa fa-file text-success' style='font-size: 20px;' title='click to view attatchment'></i></a>";
                        }
                    }
            ],
            onCellSelect: function (rowid, index) {
                //emailList[id - 1].FilePath;
                console.log(event);
                var cm = jQuery("#tbl_email_logs").jqGrid("getGridParam", "colModel");
                var data = jQuery("#tbl_email_logs").getRowData(rowid);
                if (cm[index].name == "attach") {
                    sessionStorage.reportURL = data.FilePath;
                }
            },
            ignoreCase: true,
            viewrecords: true,
            //rowList: [10, 20, 30],
            //pager: '#pgrid_search_result',
            jsonReader: {
                repeatitems: false
            },
        }).jqGrid('filterToolbar', { searchOperators: true, stringResult: true, searchOnEnter: false, defaultSearch: "cn" });

    });
}

function returnasEmailLogTable(emailList) {
    myDate = new Date();
    var pdfhtmlTable = "<html><body><table width=50% height=100%><caption><font size='4'><b>Email Logs (" +
        myDate.getDate() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getFullYear() +
        ")</b></font></caption> " +
    "<thead><tr>" +
    "<td align='center' style='background-color: #ccc; font-weight:bold'>Serial No</td>" +
    "<td align='center' style='background-color: #ccc; font-weight:bold'>From</td>" +
    "<td align='center' style='background-color: #ccc; font-weight:bold'>Email To</td>" +
    "<td align='center' style='background-color: #ccc; font-weight:bold'>To</td>" +
    "<td align='center' style='background-color: #ccc; font-weight:bold'>Email CC</td>" +
    "<td align='center' style='background-color: #ccc; font-weight:bold'>CC</td>" +
    "<td align='center' style='background-color: #ccc; font-weight:bold'>Email BCC</td>" +
    "<td align='center' style='background-color: #ccc; font-weight:bold'>BCC</td>" +
    "<td align='center' style='background-color: #ccc; font-weight:bold'>Subject</td>" +
    "<td align='center' style='background-color: #ccc; font-weight:bold'>Action</td>" +
    "<td align='center' style='background-color: #ccc; font-weight:bold'>Body</td>" +
    "<td align='center' style='background-color: #ccc; font-weight:bold'>Date</td>" +
    "<td align='center' style='background-color: #ccc; font-weight:bold'>Time</td>" +
    "<td align='center' style='background-color: #ccc; font-weight:bold'>Attachment</td>" +
    "</tr></thead><tbody>";
    for (var i = 0; i < emailList.length; i++) {
        pdfhtmlTable = pdfhtmlTable + "<tr class='warning'><td>" + (i + 1) +
            "</td><td>" + emailList[i].Emailfrom +
            "</td><td>" + emailList[i].Emailto +
            "</td><td>" + emailList[i].To +
            "</td><td>" + emailList[i].EmailCC +
            "</td><td>" + emailList[i].CC +
            "</td><td>" + emailList[i].EmailBCC +
            "</td><td>" + emailList[i].BCC +
            "</td><td>" + emailList[i].Subject +
            "</td><td>" + emailList[i].Action +
            "</td><td>" + emailList[i].Body +
            "</td><td>" + emailList[i].SentDate +
            "</td><td>" + emailList[i].SentTime +
            "</td><td>" + emailList[i].FilePath +
                "</td></tr>";
    }
    pdfhtmlTable = pdfhtmlTable + "</tbody></table></body></html>";
    return pdfhtmlTable;
}

function base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = window.atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new window.Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}

function viewContent(LogId) {
    var datafromgrid = $('#tbl_email_logs').jqGrid('getRowData');
    for (var i = 0; i < datafromgrid.length; i++) {
        if (datafromgrid[i].LogId == LogId)
            rowdata = datafromgrid[i];
    }
    $('#view_email_content').modal('show');
    $('#mail_content').empty().append(rowdata.Body);
    $('#hiddenEmaildetail').val("").val(JSON.stringify(rowdata));
    $('#resent').empty().append('<button class="btn btn-primary pull-right" type="button" onclick="resentEmail()">Resend</button>"');
}

function resentEmail() {
    Utility.ServiceCall("POST", 'MasterService.svc/ResentEmail', JSON.stringify({ emailDetail: JSON.parse($('#hiddenEmaildetail').val()) }), "json", false, false, function (result) {
        if ("Email sent successfully" == result.ResentEmailResult) {
            Utility.writeNotification('success', result.ResentEmailResult, "", true);
            Utility.ServiceCall("POST", 'MasterService.svc/GetEmailLog', "", "json", false, false, function (eLogs) {
                $("#tbl_email_logs").clearGridData(true).jqGrid('setGridParam',
                    {
                        datatype: 'local',
                        data: eLogs.GetEmailLogResult
                    }).trigger("reloadGrid");
            });
        }
        else
            Utility.writeNotification('error', result.ResentEmailResult, "", true);
        $('#view_email_content').modal('hide');
    });
}