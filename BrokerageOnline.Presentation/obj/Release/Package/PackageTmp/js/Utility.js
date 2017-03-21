var pleaseWaitDiv = $('<div class="modal fade" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div class="modal-dialog modal-sm"><div class="modal-header"><h1>Processing...</h1></div><div class="modal-body"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div></div></div>');
var Utility = {
    //ServiceUrl: "http://localhost:50262/",

    //ServiceUrl: "http://" + window.location.host + "/BrokerageOnlineService/",
    ServiceUrl: "http://" + window.location.host + "/BOV6Service/",

    enableSIP: false,

    enableBackDate: false,

    ReportHostAndPort: "219.97.200.91:9080",

    openPentaho: "",

    CamsReportUrl: "",
    DistributorReportUrl: "",
    RegenerateReportUrl: "",
    AdHocReportUrl: "",
    SIPReportUrl: "",
    TieUpCamsReportUrl: "",
    SIPCamsReportUrl: "",

    AdHocCAMS_FB: "",
    AdHocCAMS_MB: "",

    SmartSheetReportURL: "",
    AdhocSummaryReport: "",
    SchemeCatWiseReportURL: "",
    ChannelWiseReportURL: "",
    DistributorWiseReportURL: "",
    ZoneSummaryReport: "",
    ARNWiseReport: "",

    ListSearchText: '',
    writeNotification: function (MessageType, HeaderMessageToDisplay, SubjectMessageToDisplay, RequireClose) {


        //default for success messages
        var Timeout = "2000";
        var ExtendedTimeout = "0";

        //if error, extend a bit.
        if (MessageType == "error") {
            Timeout = "4000";
            ExtendedTimeout = "4000";
        }

        if (MessageType == "norecords") {
            Timeout = "1000";
            ExtendedTimeout = "0";
        }

        //if require close, then extend timout allot and add close button
        if (RequireClose) {
            RequireClose = true;
            Timeout = "16000";
            ExtendedTimeout = "2000";
        }
        else {
            RequireClose = false;
        };


        toastr.options = {
            "closeButton": RequireClose,
            "debug": false,
            "positionClass": "toast-top-mid",
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": Timeout,
            "extendedTimeOut": ExtendedTimeout,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"

        };
        toastr.clear();

        Command: toastr[MessageType](SubjectMessageToDisplay, HeaderMessageToDisplay);

    },

    clearNotifications: function () {
        toastr.clear();
    },

    showPleaseWait: function () {
        pleaseWaitDiv.modal();
    },

    hidePleaseWait: function () {
        pleaseWaitDiv.modal('hide');
    },

    removeDuplicates: function (inputArray) {
        var i;
        var len = inputArray.length;
        var outputArray = [];
        var temp = {};

        for (i = 0; i < len; i++) {
            temp[inputArray[i]] = 0;
        }
        for (i in temp) {
            outputArray.push(i);
        }
        return outputArray;
    },

    GetParameterValues: function (param) {
        var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < url.length; i++) {
            var urlparam = url[i].split('=');
            if (urlparam[0] == param) {
                return urlparam[1];
            }
        }
    },

    GetHostURL: function () {
        var path = [];
        var sitename = "";
        var testurl = window.location.href;
        var file = testurl.split('?')[0];
        var pathanddomain = file.split('/');
        path = pathanddomain.splice(1, pathanddomain.length - 1);

        //if (path[0] == "" && path[1].match(/local/g).length > 0)
        if (path[0] == "" && path[1].indexOf('local') != -1)
            sitename = "http://" + path[1];
        else if (path[0] == "")
            sitename = "http://" + path[1] + "/" + path[2];
        else
            sitename = "http://" + path[0] + "/" + path[1];

        return sitename;
    },

    ServiceCall: function (Type, Url, Jsondata, Datatype, Processdata, async, callback) {
        jQuery.support.cors = true;
        $.ajax({
            type: Type,
            contentType: "application/json; charset=utf-8",
            url: Utility.ServiceUrl + Url,
            data: Jsondata,
            dataType: Datatype,
            processData: true,
            async: async,
            success: callback,
            error: function (xhr, status, error) {
                Utility.ServiceFailed(xhr, status, error);
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('SessionID', sessionStorage.sessionId);
            }
        });
    },

    ServiceFailed: function (xhr, status, error) {
        //$('#pleaseWaitDialog').modal('hide');
        var errormsg = xhr.responseText.split("'");
        Utility.writeNotification("error", errormsg[1], "", true);
        //alert(xhr.responseText);
        if (xhr.responseText) {
            var err = xhr.responseText;
            if (err)
                error(err);
            else
                error({ Message: "Unknown server error." })
        }
        return;
    },

    GridAllowNumber: function (element) {
        $(element).keypress(function (event) {
            if (event.which != 8 && event.which != 0 && (event.which < 48 || event.which > 57)) {
                return false;
            }
        })
    },

    GridAllowNumberto3: function (element) {
        $(element).keypress(function (event) {
            if (event.which != 8 && event.which != 0 && (event.which < 48 || event.which > 57)) {
                return false;
            }
            var charCode = (event.which) ? event.which : event.keyCode
            var inputValue = $(this).val()

            if (inputValue.length > 2)
                return false;
        })
    },

    GridAllowDecimal: function (element) {
        $(element).keypress(function (event) {
            var charCode = (event.which) ? event.which : event.keyCode

            var inputValue = $(this).val()
            if (charCode == 46) {
                if (inputValue.indexOf('.') < 1) {
                    return true;
                }
                return false;
            }
            if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            else {
                if (inputValue.indexOf('.') != -1) {
                    if (inputValue.split(".")[1].length > 1) {
                        if (isNaN(parseFloat(this.value))) return;
                        this.value = parseFloat(this.value).toFixed(1);
                    }
                }
            }
            return true;
        })
    },

    GridOnlyDecimal: function (element) {
        $(element).keypress(function (event) {
            var charCode = (event.which) ? event.which : event.keyCode;

            var $this = $(this);
            var pos = $this[0].selectionStart;

            var inputValue = $(this).val()
            if (charCode == 46) {
                if (inputValue.indexOf('.') < 1) {
                    return true;
                }
                return false;
            }
            if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            else {
                if (inputValue.indexOf('.') != -1) {
                    if (inputValue.split(".")[1].length <= 1) {
                        if (isNaN(parseFloat(this.value))) return;
                        return true;
                    }
                    else {
                        if (pos < inputValue.indexOf('.')) {
                            return true;
                        }
                        else
                            return false;
                    }

                }
            }
            return true;
        })
    },


    GridOnlyDecimal2of2: function (element) {
        $(element).keypress(function (event) {

            var charCode = (event.which) ? event.which : event.keyCode

            var inputValue = $(this).val()
            if (charCode == 46) {
                if (inputValue.indexOf('.') < 1) {
                    return true;
                }
                return false;
            }
            if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            else {
                if (inputValue.indexOf('.') != -1) {
                    if (inputValue.split(".")[1].length > 1) {
                        var $this = $(this);
                        var pos = $this[0].selectionStart;
                        var dotSplit = inputValue.indexOf('.');
                        if (pos > dotSplit) {
                            return false;
                        }
                        else if (inputValue.split('.')[0].length > 1) {
                            var $this = $(this);
                            if ($this[0].selectionStart != $this[0].selectionEnd)
                                return true;
                            else
                                return false;
                        }
                    }
                }
                else {
                    if (inputValue.split('.')[0].length > 1) {
                        var $this = $(this);
                        if ($this[0].selectionStart != $this[0].selectionEnd)
                            return true;
                        else
                            return false;
                    }
                }
            }
            return true;
        })
    },

    isAlphabet: function (str) {
        return /^[a-zA-Z]+$/.test(str);
    },

    AllowDecimal: function () {

        $(".numberonly").keypress(function (e) {
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                return false;
            }
        });

        $('.number').keypress(function (event) {

            var charCode = (event.which) ? event.which : event.keyCode

            var inputValue = $(this).val()
            if (charCode == 46) {
                if (inputValue.indexOf('.') < 1) {
                    return true;
                }
                return false;
            }
            if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            else {
                if (inputValue.indexOf('.') != -1) {
                    if (inputValue.split(".")[1].length > 1) {
                        if (isNaN(parseFloat(this.value))) return;
                        this.value = parseFloat(this.value).toFixed(1);
                    }
                }
            }
            return true;
        });

        $('.negativenumber').keypress(function (event) {

            var charCode = (event.which) ? event.which : event.keyCode

            var inputValue = $(this).val()

            if (charCode != 45 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            else {
                if (charCode == 45) {
                    if (inputValue.indexOf("-") != -1) {
                        return false;
                    }
                }
            }
            return true;
        });

        $('.number-02').keypress(function (event) {

            var charCode = (event.which) ? event.which : event.keyCode

            var inputValue = $(this).val()
            if (charCode == 46) {
                if (inputValue.indexOf('.') < 1) {
                    return true;
                }
                return false;
            }
            if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            else {
                if (inputValue.indexOf('.') != -1) {
                    if (inputValue.split(".")[1].length > 1) {
                        var $this = $(this);
                        var pos = $this[0].selectionStart;
                        var dotSplit = inputValue.indexOf('.');
                        if (pos > dotSplit) {
                            return false;
                        }
                    }
                }
            }
            return true;
        });

        $('.number2-02').keypress(function (event) {

            var charCode = (event.which) ? event.which : event.keyCode

            var inputValue = $(this).val()
            if (charCode == 46) {
                if (inputValue.indexOf('.') < 1) {
                    return true;
                }
                return false;
            }
            if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            else {
                if (inputValue.indexOf('.') != -1) {
                    if (inputValue.split(".")[1].length > 1) {
                        var $this = $(this);
                        var pos = $this[0].selectionStart;
                        var dotSplit = inputValue.indexOf('.');
                        if (pos > dotSplit) {
                            return false;
                        }
                        else if (inputValue.split('.')[0].length > 1) {
                            var $this = $(this);
                            if ($this[0].selectionStart != $this[0].selectionEnd)
                                return true;
                            else
                                return false;
                        }
                    }
                }
                else {
                    if (inputValue.split('.')[0].length > 1) {
                        var $this = $(this);
                        if ($this[0].selectionStart != $this[0].selectionEnd)
                            return true;
                        else
                            return false;
                    }
                }
            }
            return true;
        });

        $('.converttoint').blur(function () {
            $(this).val($(this).val().trim() == "" ? 0 : parseInt($(this).val().trim()));
        });
    },

    toFixed: function (number, precision) {
        var multiplier = Math.pow(10, precision);
        return Math.floor(number * multiplier) / multiplier;
    },

    AllowAlphaNumeric: function () {
        $('.alphanumeric').keypress(function (event) {

            var regex = new RegExp("^[ a-zA-Z0-9]+$");
            var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
            if (!regex.test(key)) {
                event.preventDefault();
                return false;
            }

        });
    },

    UpdateNotificationStatus: function (notificationId) {
        var Notification = {};
        Notification["NotificationId"] = notificationId;
        Notification["IsActive"] = 0;

        Utility.ServiceCall("POST", 'OverviewService.svc/UpdateNotificationStatus', JSON.stringify({ InputData: Notification }), "json", false, false, function (result) {
            console.log(result);
        });
    },

    GetReportQuery: function (param, querystring) {
        var returnparam = "";
        if (param != "") {
            if (querystring == "") {
                return param + "= ";
            } else {
                var query = querystring.split(',');
                $.each(query, function (i, obj) {
                    if (returnparam == "") {
                        returnparam += param + "=" + obj;
                    }
                    else {
                        returnparam += "&" + param + "=" + obj;
                    }
                });
                return returnparam;
            }
        }
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

    remove_tags: function (html) {
        return jQuery(html).text();
    },

    openWin: function (url) {
        //var myWindow = window.open(url, '_blank');
        sessionStorage.reportURL = url;
        var myWindow = window.open("ReportViewer.html", '_blank');
    },

    //*****************************************************Advance Search Options***********************************************************************************************************

    AdvanceSearch_Close: function () {
        Utility.ListSearchText = '';
    },

    AdvanceSearchClick: function (ModuleID, StoreProcedure) {
        //var ModuleID = 3, StoreProcedure = 'VIEW_ADHOC_PAYMENT_BY_MEMOID';
        Utility.ListSearchText = '';
        Utility.ServiceCall("POST", 'MasterService.svc/GetListSearchColumns', JSON.stringify({ ModuleID: ModuleID, StoreProcedure: StoreProcedure }), "json", false, false, function (result) {
            var arrItems = result.GetListSearchColumnsResult;

            $("#dd_column_names").empty();
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].ColumnNames).val(arrItems[i].ColumnType).appendTo('#dd_column_names');
            }
        });

        Utility.AdvanceSearch_ColumnChange();
        Utility.ClearAdvanceSearchClick();
        $('#modal_Advance_Search').modal('show');
    },

    DeleteAll: function () {
        Utility.ServiceCall("POST", 'MasterService.svc/DeleteAllNotifications', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {

        });
    },

    Add_AdvanceSearch: function () {
        var ColumnName = $('#dd_column_names option:selected')[0].text;
        var Operation = $('#dd_operations option:selected').val();
        var Input = $('#txt_Adv_input').val();

        var Operator_Input = '';

        var Final = '';
        Final = $('#txt_Query_Text').val();
        var ColumnType = $('#dd_column_names option:selected').val();

        if (Input != '' && Input != undefined) {
            if (Operation == "IN")
                Input = '(' + Input + ')';

            switch (Operation) {
                case 'Equals':
                    if (ColumnType == 'number')
                        Operator_Input = "= " + Input;
                    else
                        Operator_Input = "= '" + Input + "'";
                    break;
                case 'BeginsWith':
                    Operator_Input = "Like '" + Input + "%'";
                    break;
                case 'Contains':
                    Operator_Input = "Like '%" + Input + "%'";
                    break;
                case 'EndsWith':
                    Operator_Input = "Like '%" + Input + "'";
                    break;
                case 'IN':
                    Operator_Input = 'IN ' + '(' + Input + ')';
                    break;
                case '=':
                    Operator_Input = "= " + Input;
                    break;
                case '>=':
                    Operator_Input = ">= " + Input;
                    break;
                case '<=':
                    Operator_Input = "<= " + Input;
                    break;
                case '>':
                    Operator_Input = "> " + Input;
                    break;
                case '<':
                    Operator_Input = "< " + Input;
                    break;
            }

            if (Final != "") {
                Final += ' AND ' + ColumnName + ' ' + Operator_Input;
            }
            else
                Final = ColumnName + ' ' + Operator_Input;

            Utility.ListSearchText = Final;
            $('#txt_Query_Text').val(Final);
            $('#txt_Adv_input').val("");
            $('#dd_operations').val($('#dd_operations  option:first-child').val());
            $('#dd_column_names').val($('#dd_column_names  option:first-child').val());
        }
    },

    AdvanceSearch_ColumnChange: function () {
        // Need To Implement once the property datatype are get rightly configured
        //var ColumnType = $('#dd_column_names option:selected').val();
        //var LoadStringOperators = ['Equals', 'BeginsWith', 'Contains', 'EndsWith'];
        //var LoadNumericOperators = ['=', '>=', '<=', '>', '<'];
        //var Operations = [];

        //if (ColumnType == 'number')
        //    Operations = LoadNumericOperators;
        //else
        //    Operations = LoadStringOperators;
        //$("#dd_operations").empty();

        //for (var i = 0; i < Operations.length; i++) {
        //    $("<option />").text(Operations[i]).val(Operations[i]).appendTo('#dd_operations');
        //}
        //**************************************************************************************************************************

        var Operations = ['Equals', 'BeginsWith', 'Contains', 'EndsWith'];
        $("#dd_operations").empty();
        for (var i = 0; i < Operations.length; i++) {
            $("<option />").text(Operations[i]).val(Operations[i]).appendTo('#dd_operations');
        }
    },


    ClearAdvanceSearchClick: function () {
        $('#txt_Adv_input').val('');
        $('#txt_Query_Text').val('');
        $("#dd_column_names option:first").attr('selected', 'selected');
        $("#dd_operations option:first").attr('selected', 'selected');

    },

    //***************************************************** Advance Search Options Ends Here ***********************************************************************************************************
    currentcnt: 0,
    LoadAlerts: function () {
        //var scrolpos = $("#alertsection").scrollTop();

        Utility.ServiceCall("POST", 'MasterService.svc/GetNotification', '', "json", false, true, function (result) {
            var data = result.GetNotificationResult;
            if (Utility.currentcnt != data.length || data.length == 0) {

                var section = "<div class=\"alert-cnt-otr\">";
                section += "<button class='btn mr-right-01 btn-danger flt-right-a sq-btn' id='btn_delete_all' onclick='Utility.DeleteAll();'>Delete All</button>";
                section += "<ul class=\"alert-cnt-otr-ul\">";
                $.each(data, function (index, notification) {
                    //var notificationMemoPage = "RackRateInformation.html";
                    section += "<li class=\"mr-bottom-01\">";
                    section += "<div class=\"alert-bx-otr pos-rel-common\">";

                    var article = "<div class=\"clear\"><input type=\"hidden\" value=" + notification.NotificationId + "></div>"
                                + notification.NotificationMessage
                                + "<div class=\"clear\"></div>"
                                + notification.NotificationContent
                                + "<div class=\"clear\"></div>"
                                + "<span class=\"alert-bd-time\">" + notification.CreatedTime + "</span><span class=\"alert-bd-date-time-div\"> | </span><span class=\"alert-bd-date\">" + notification.CreatedDate + "</span>"
                                + "<div class=\"clear\"></div>"

                                + "<a class=\"cls-ico-otr\" href=\"#\">"
                                    + "<img class=\"cls-ico\" src=\"../img/cls-icon.png\">"
                                + "</a>";

                    section += article;
                    section += "</div>";
                    section += "</li>";
                });
                if (data.length == 0) {
                    section += "<li class=\"mr-bottom-01\">";
                    section += "<div class=\"alert-bx-otr pos-rel-common\">";
                    section += "<span class=\"alert-title\">No new notifications found</span>";
                    section += "<div class=\"clear\"></div>";
                    section += "</div>";
                    section += "</li>";
                }
                section += "</ul>";
                section += "</div>";

                $("#alertsection .alert-head .notif-count-inner").html(data.length);
                $('#alertsection .alert-cnt-otr').remove();
                $('#alertsection').append(section);
                if (data.length == 0) {
                    $('#btn_delete_all').hide();
                }

                Utility.currentcnt = data.length;
            }
        });
        //$("#alertsection").scrollTop(scrolpos);
    },

}

$(function () {
    Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetReportURLHostAndPort', '', "json", false, true, function (result) {
        Utility.ReportHostAndPort = result.GetReportURLHostAndPortResult;
        Utility.openPentaho = "http://" + Utility.ReportHostAndPort + "/pentaho?userid=joe&password=password";

        Utility.CamsReportUrl = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/CAMS_BRRnull?solution=DSP_BlackRock&path=&name=CAMS_BRR.prpt&Memonumber_P=###MemoNumber###&output-target=pageable%2Fpdf&userid=joe&password=password";
        Utility.DistributorReportUrl = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/Dist_BRRnull?solution=DSP_BlackRock&path=&name=Dist_BRR.prpt&Memonumber_P=###MemoNumber###&output-target=pageable%2Fpdf&userid=joe&password=password";
        Utility.RegenerateReportUrl = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/Regeneratenull?solution=DSP_BlackRock&path=&name=Regenerate.prpt&MemoId_P=###MemoNumber###&output-target=pageable%2Fpdf&userid=joe&password=password";
        Utility.AdHocReportUrl = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/CAMS_AdHocnull?MemoNumber_P=###MemoNumber###&Channel_P=###Channel###&output-target=pageable%2Fpdf&solution=DSP_BlackRock&path=&name=CAMS_AdHoc.prpt&userid=joe&password=password";
        Utility.SIPReportUrl = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/Dist_SIPnull?Memo_P=###MemoNumber###&output-target=pageable%2Fpdf&solution=DSP_BlackRock&path=&name=Dist_SIP.prpt&userid=joe&password=password";
        Utility.TieUpCamsReportUrl = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/CAMS_TieUpnull?solution=DSP_BlackRock&path=&name=CAMS_TieUp.prpt&Memonumber_P=###MemoNumber###&output-target=pageable%2Fpdf&userid=joe&password=password";
        Utility.SIPCamsReportUrl = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/CAMS_SIPnull?solution=DSP_BlackRock&path=&name=CAMS_SIP.prpt&MemoNumber_P=###MemoNumber###&output-target=pageable%2Fpdf&userid=joe&password=password";

        Utility.AdHocCAMS_FB = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/CAMS_AdHoc_FBnull?MemoNumber_P=###MemoNumber###&Channel_P=###Channel###&output-target=pageable%2Fpdf&solution=DSP_BlackRock&path=&name=CAMS_AdHoc_FB.prpt&userid=joe&password=password";
        Utility.AdHocCAMS_MB = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/CAMS_AdHoc_MBnull?MemoNumber_P=###MemoNumber###&Channel_P=###Channel###&output-target=pageable%2Fpdf&solution=DSP_BlackRock&path=&name=CAMS_AdHoc_MB.prpt&userid=joe&password=password";

        Utility.SmartSheetReportURL = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/Smart_Searchnull?solution=DSP_BlackRock&path=&name=Smart_Search.prpt";
        Utility.AdhocSummaryReport = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/AdHoc_Payment_Summary_Reportnull?###INPUT###&output-target=pageable%2Fpdf&solution=DSP_BlackRock&path=&name=AdHoc_Payment_Summary_Report.prpt&userid=joe&password=password";
        Utility.SchemeCatWiseReportURL = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/Scheme_Cat_Wise_Summary_Reportnull?###INPUT###&output-target=pageable%2Fpdf&solution=DSP_BlackRock&path=&name=Scheme_Cat_Wise_Summary_Report.prpt&userid=joe&password=password";
        Utility.ChannelWiseReportURL = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/Channel_Wise_Summary_Reportnull?solution=DSP_BlackRock&path=&name=Channel_Wise_Summary_Report.prpt&###INPUT###&output-target=pageable%2Fpdf&userid=joe&password=password";
        Utility.DistributorWiseReportURL = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/Distributor_Wise_Summary_Reportnull?solution=DSP_BlackRock&path=&name=Distributor_Wise_Summary_Report.prpt&###INPUT###&output-target=pageable%2Fpdf&userid=joe&password=password";
        Utility.ZoneSummaryReport = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/Zone_Branch_Reportnull?solution=DSP_BlackRock&path=&name=Zone_Branch_Report.prpt&###INPUT###&output-target=pageable%2Fpdf&userid=joe&password=password";
        Utility.ARNWiseReport = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/ARN_Specific_Reportnull?solution=DSP_BlackRock&path=&name=ARN_Specific_Report.prpt&###INPUT###&output-target=pageable%2Fpdf&userid=joe&password=password";

    });

    Utility.AllowDecimal();

    /////////////////////////

    var tooltips = [];
    $(".token-input-highlighted-token-facebook").each(function () {
        tooltips.push($(this).attr("title"));
    });

    $(".select-bx-style").on("change", function () {
        var s = this;
        for (i = 0; i < s.length; i++)
            s.options[i].title = s.options[i].text;

        if (s.selectedIndex > -1)
            s.onmousemove = function () { s.title = s.options[s.selectedIndex].text; };
    });

    ///tool tip for textbox
    $(".txt-area-style").keyup(function () {
        var s = this;
        s.title = $(this).val()
    });

    $(".input-text-bx-style").keyup(function () {
        var s = this;
        s.title = $(this).val()
    });

    //working multiselect
    $(".form-control multiselect-search").each(function () {
        var s = this;
        for (i = 0; i < s.length; i++)
            s.options[i].title = s.options[i].text;
        if (s.selectedIndex > -1)
            s.onmousemove = function () { s.title = s.options[s.selectedIndex].text; };
    });

    /////////////////////////

    $(document).on("keydown", function (e) {
        if (e.which === 8 && !$(e.target).is("input[type='text']:not([readonly]),input[type='password'], textarea")) {
            e.preventDefault();
        }
    });

    function GetClock() {
        var d = new Date();
        var nday = d.getDay(), nmonth = d.getMonth() + 1, ndate = d.getDate(), nyear = d.getYear(), nhour = d.getHours(), nmin = d.getMinutes(), nsec = d.getSeconds(), ap;

        if (nhour == 0) { ap = " AM"; nhour = 12; }
        else if (nhour < 12) { ap = " AM"; }
        else if (nhour == 12) { ap = " PM"; }
        else if (nhour > 12) { ap = " PM"; nhour -= 12; }

        if (nyear < 1000) nyear += 1900;
        if (nmin <= 9) nmin = "0" + nmin;
        if (nsec <= 9) nsec = "0" + nsec;

        $('#spn_date').html("" + ndate + "/" + nmonth + "/" + nyear + " " + nhour + ":" + nmin + ":" + nsec + ap + "");
    }

    window.onload = function () {
        GetClock();
        setInterval(GetClock, 1000);
    }

    $(document.body).click(function () {
        var $target = $(event.target); // click target
        if (!$target.is('.cls-ico, #btn_delete_all')) {
            if ($('#alertsection').css('right') == '0px') {
                site.i = 0;
                $(".alert-sect-outer").animate({
                    right: "-450px"
                }, 600);
            }
        }
    });

    function disableBack() {
        window.history.forward()
    }

    window.onload = disableBack();
    window.onpageshow = function (evt) {
        if (evt.persisted) disableBack()
    }


    // $('#spn_date').html(Utility.SystemDate());
});



//$(function () {
//    var count = 0;
//    var timer = $.timer(function () {
//        ++count;
//        if (count / 5 == 1) {
//            Utility.LoadAlerts();
//            count = 0;
//        }
//    });
//    timer.set({ time: 1000, autostart: true });

//    $("#alertsection").on("click", ".cls-ico", function () {
//        var $killrow = $(this).parents('div.alert-bx-otr');
//        var id = $($killrow).find('input[type=hidden]').attr('value');
//        Utility.UpdateNotificationStatus(id);

//        $killrow.addClass("danger");
//        $killrow.fadeOut(1000, function () {
//            $(this).remove();
//        });
//        count = 4;
//        Utility.LoadAlerts();
//    });
//});

