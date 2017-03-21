var pleaseWaitDiv = $('<div class="modal fade" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div class="modal-dialog modal-sm"><div class="modal-header"><h1>Processing...</h1></div><div class="modal-body"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div></div></div>');
var Utility = {
    ServiceUrl: "http://localhost:50262/",

    //ServiceUrl: "http://" + window.location.host + "/BrokerageOnlineService/",

    AdhocRemarks: '',
    enableSIP: false,

    enableBackDate: false,

    //ReportHostAndPort: "219.97.200.91:9080",

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
    CAMSBrokerageFormatSummaryReport: "",
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
                                //+ "<a href='' >" + notification.NotificationMessage + "</a>"
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
    DeleteAll: function () {
        Utility.ServiceCall("POST", 'MasterService.svc/DeleteAllNotifications', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {

        });
    },

  /////////////////////////////Alert Hyperlink for Adhoc/////////////////////////////////

    PaymentDetail: function (PaymentMemoId, Memo_Number) {

        var divGridSubProcessing = '<div class="modal fade" id="modal_adhoc_payment_record" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="largeModal" aria-hidden="true">' +
               '<div class="modal-dialog modal-lrg">' +
                   '<div class="modal-content">' +
                       '<div class="modal-header">' +
                           '<div class="row mr-top-05">' +
                               '<div class="col-md-12 col-sm-12 ">' +
                                   '<div class="col-md-3 col-sm-3 ">' +
                                       '<button class="btn btn-default fr" id="btn_review_remarks" onclick="Utility.ReviewRemarks();" title="Remarks"><img src="../img/comment-btn.png"></button>' +
                                       '<h3 class="sub-title-btm-c">Payment Records</h3>' +
                                   '</div>' +
                                   '<div class="col-md-9 col-sm-9 ">' +
                                       '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                                   '</div></div></div></div>' +
                       '<div class="modal-body">' +
                           '<div class="row mr-top-01">' +
                               '<div class="col-md-12 col-sm-12 ">' +
                                   '<div class="rrd-outer">' +
                                       '<div class="row">' +
                                           '<div class="col-md-12 col-sm-12 " id="div_grid_sub_processing">' +
                                               '<table id="grid_sub_processing"></table>' +
                                           '</div></div></div></div></div></div></div></div></div>';

        var divGridViewRemarks = '<div class="modal fade" id="div_modal_view_remarks" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="largeModal" aria-hidden="true">' +
                '<div class="modal-dialog modal-lg">' +
                 '<div class="modal-content">' +
                  '<div class="modal-header">' +
                   '<div class="row mr-top-05">' +
                    '<div class="col-md-12 col-sm-12 ">' +
                     '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                      '<h3 class="sub-title-btm-c">View Payment Remarks</h3>' +
                       '</div></div></div>' +
                        '<div class="modal-body">' +
                            '<div class="row mr-top-01">' +
                                '<div class="col-md-12 col-sm-12 ">' +
                                    '<div class="rrd-outer">' +
                                        '<div class="row mr-top-05">' +
                                            '<div class="col-md-12 col-sm-4 pd-left-00">' +
                                                '<table id="grid_view_remarks"></table>' +
                                            '</div></div>' +
                                        '<div class="row mr-top-05 pos-rel-common">' +
                                        '</div></div></div></div></div></div></div></div>';

        var divGridRejectRemarks = '<div class="modal fade" id="mdl_reject_remarks" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static" aria-labelledby="lblmdl_reject_remarks" aria-hidden="true">' +
                '<div class="modal-dialog modal-lg">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                            '<h4 class="modal-title" id="myModalreject_remarks">Remarks</h4>' +
                        '</div>' +
                        '<div class="modal-body">' +
                            '<div class="row">' +
                                '<div class="col-md-12 col-sm-12 ">' +
                                    '<div class="row">' +
                                        '<div class="col-md-11 col-sm-11">' +
                                            '<textarea class="txt-area-style c-round" style="height:70px;" id="txt_reject_remarks" readonly="readonly"></textarea>' +
                                        '</div></div>' +
                                    '<div class="row txt-alg-rt mr-top-02 sq-btn fr" id="div_Remarks">' +
                                        '<button class="btn btn-success sq-btn fr" data-dismiss="modal" id="btn_Remarks_Ok">Ok</button>' +
                                    '</div></div></div></div></div></div></div>';

        $("#globalAdhocDiv").append(divGridSubProcessing);
        $("#modal_adhoc_payment_record").after(divGridViewRemarks);
        $("#div_modal_view_remarks").after(divGridRejectRemarks);

        $grid = $("#grid_sub_processing");
        jQuery("#grid_sub_processing").jqGrid({
            datatype: "local",
            height: 450,
            width: null,
            shrinkToFit: false,
            colNames: ['S.No.', 'ARN No.', 'ARN Name', 'Scheme', 'Channel', 'Branch', 'Period From', 'Period To', 'Amount Basis', 'Rate (Bps)', 'AUM (Lakhs) / Gross Sales (Actual)', 'Payment Amount', 'Actual Amount Payable (Round Off)', 'Remarks', 'IsRequired', 'PaymentMemoId', 'PaymentListId'],
            colModel: [
                    { name: 'SerialNo', index: 'SerialNo', width: 60, align: 'center', sortable: false },
                    { name: 'ARNNo', width: 90, index: 'ARNNo', sortable: false },
                    { name: 'ARNName', width: 260, index: 'ARNName', sortable: false },
                    { name: 'SchemeName', width: 250, index: 'SchemeName', sortable: false },
                    { name: 'ChannelName', width: 90, index: 'ChannelName', sortable: false },
                    { name: 'BranchName', index: 'BranchName', width: 105, sortable: false },
                    { name: 'DateFrom', width: 120, index: 'DateFrom', align: 'center', sortable: false },
                    { name: 'DateTo', width: 110, index: 'DateTo', align: 'center', sortable: false },
                    { name: 'AmountBasisName', index: 'AmountBasisName', width: 130, sortable: false },
                    { name: 'Rate', index: 'Rate', width: 90, sortable: false },
                    { name: 'MobilizationAmount', index: 'MobilizationAmount', width: 250, sortable: false },
                    { name: 'PaymentAmount', index: 'PaymentAmount', width: 200, sortable: false },
                    { name: 'FreeTextField1', index: 'FreeTextField1', width: 250, sortable: false },
                    { name: '', index: '', align: 'center', formatter: Utility.ReturnViewRemarksHyperLink, sortable: false },
                    { name: 'IsRequired', index: 'IsRequired', hidden: true, sortable: false },
                     { name: 'PaymentMemoId', index: 'PaymentMemoId', hidden: true, sortable: false },
                    { name: 'PaymentListId', index: 'PaymentListId', hidden: true, sortable: false },
                    //{ name: 'Remarks', index: 'Remarks', width: 150, editable: false, colSpan: 2, sortable: false }
            ],
            //afterInsertRow: function (rowid, rowdata) {
            //    /////Get selected ARN/////////
            //    var token = $("#txt_arn").tokenInput("get");
            //    var names = [];
            //    $.each(token, function (i, obj) {
            //        names.push(obj.name);//build an array of just the names
            //    });
            //    for (var i = 0; i < names.length; i++) {
            //        if (rowdata.ARNNo == names[i])
            //            $("#grid_sub_processing").jqGrid('setRowData', rowid, false, { background: '#01DF01' });
            //    }
            //},
        });
        
        // View Remarks Grid

        jQuery("#grid_view_remarks").jqGrid({
            datatype: "json",
            height: 200,
            width: 765,
            shrinkToFit: false,
            colNames: ['Remarks', 'Remarks By', 'Modified Date'],
            colModel: [
                    { name: 'Remarks', width: 545, index: 'Remarks', align: 'left', sortable: false },
                    { name: 'RemarksBy', width: 100, index: 'RemarksBy', sortable: false },
                    { name: 'Date', width: 120, index: 'Date', align: 'left', sortable: false },
            ],
        });

        var AdhocBatchID = 0;
        var PaymentTypeID = 0;

        if ($.isNumeric(Memo_Number)) {
            AdhocBatchID = 0;
            PaymentTypeID = PaymentMemoId;
        }
        else {
            AdhocBatchID = PaymentMemoId;
            PaymentTypeID = 0;
        }

        var AdhocStatus = '';

        if (AdhocBatchID == 0)
            AdhocStatus = 'SmartSearch';

        Utility.ServiceCall("POST", 'AdHocService.svc/GetAdHocDetails', JSON.stringify({ PaymentTypeID: PaymentTypeID, AdhocStatus: AdhocStatus, AdhocBatchID: AdhocBatchID, CreatedByID: 0 }), "json", false, false, function (result) {
            var arrItems = result.GetAdHocDetailsResult;
            $('#grid_sub_processing').jqGrid('clearGridData');
            if (arrItems != undefined && arrItems.length > 0) {

                Utility.AdhocRemarks = arrItems[0].MemoStatusDisplay;

                for (var i = 0; i < arrItems.length; i++)
                    jQuery("#grid_sub_processing").jqGrid('addRowData', parseInt(i + 1), arrItems[i]);

                $('#modal_adhoc_payment_record').modal('show');
            }
        });
    },

    ReturnViewRemarksHyperLink: function (cellValue, options, rowdata, action) {
        return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"Utility.AdHocPaymentDetail(' + rowdata.PaymentListId + ');\">View Remarks</a>';
    },

    ReviewRemarks: function () {
        $('#txt_reject_remarks').val(Utility.AdhocRemarks);
        $('#mdl_reject_remarks').modal('show');
    },

    AdHocPaymentDetail: function (PaymentListId) {
        Utility.ServiceCall("POST", 'AdHocService.svc/GetAuditPaymentDetails', JSON.stringify({ ID: parseInt(PaymentListId) }), "json", false, false, function (result) {
            var resItems = result.GetAuditPaymentDetailsResult;
            $('#grid_view_remarks').jqGrid('clearGridData');
            if (resItems != undefined && resItems.length > 0) {
                for (var i = 0; i < resItems.length; i++)
                    jQuery("#grid_view_remarks").jqGrid('addRowData', resItems[i].id, resItems[i]);
                $('#div_modal_view_remarks').modal('show');
            }
        });
    },
    /////////////////////////////Alert ends here/////////////////////////////////////////
    //******************************** Custom filter for jqGrid to a specific column which it has been formatted *****************************************************************************
    /*
        parmeters:
            Name                                             Description                                                            DataType
            ---------------------------------------------------------------------------------------------------------------------------------------------------------------
            grid                                 ------      jqGrid                                                 -------         DOM
            colName                              ------      To filter based on this column                         -------         String
                                                                because it has been formatted 
                                                                ,.eg (a tag, img tag, etc)       
            alterCol                             ------      To remove the html tag and paste actual                -------         Array of string
                                                                value from the grid data later it 
                                                                will be formatted  
            reInitiateGrid                       ------      Reinitiate grid with service call when needed          -------         Call back Function
    */

    CustomFilter: function (grid, colName, alterCol, reInitiateGrid) {

        var
            //Filter properties of the grid
            filters = JSON.parse(grid.getGridParam("postData").filters),

            //Grid Data's
            datafromgrid = "",

            filteredData = [],
            haveMatchCol = false;

        if (filters.rules.length > 0) {
            for (var i = 0; i < filters.rules.length; i++) {
                if (filters.rules[i].field == colName) {

                    /*
                        Reinitialize the grid before search
                        so that we can get all the row data from grid
                    */
                    reInitiateGrid();
                    datafromgrid = grid.jqGrid('getRowData');

                    //Matching col in the filter
                    haveMatchCol = true;
                }
            }
            if (haveMatchCol) {

                //To filter the data from the grid data
                filter();

                //Reload the grid with filtered Data
                grid.clearGridData(true).jqGrid('setGridParam', {
                    datatype: 'local',
                    data: filteredData
                }).trigger("reloadGrid");
            }
            else {

                //Reload the grid with service call
                reInitiateGrid();
            }

        } else {

            //Reload the grid with service call
            reInitiateGrid();
        }


        function filter() {
            for (var i = 0; i < filters.rules.length; i++) {
                if (filters.rules[i].field == colName) {
                    for (var j = 0; j < datafromgrid.length; j++) {

                        //Parsing the string in to DOM element
                        var node = $.parseHTML(datafromgrid[j][colName]), match = false;

                        //Filter by conditions eg( equal to, not equal to, contains)
                        switch (filters.rules[i].op) {
                            case "cn":
                                if (node[0].innerHTML.toLowerCase().indexOf(filters.rules[i].data.toLowerCase()) > -1) {
                                    match = true;
                                }
                                break;
                            case "eq":
                                if (node[0].innerHTML == filters.rules[i].data) {
                                    match = true;
                                }
                                break;
                            case "ne":
                                if (node[0].innerHTML != filters.rules[i].data) {
                                    match = true;
                                }
                                break;
                            case "gt":
                                if (parseInt(filters.rules[i].data) < parseInt(node[0].innerHTML)) {
                                    match = true;
                                }
                                break;
                            case "lt":
                                if (parseInt(filters.rules[i].data) > parseInt(node[0].innerHTML)) {
                                    match = true;
                                }
                                break;
                            case "le":
                                if (parseInt(filters.rules[i].data) >= parseInt(node[0].innerHTML)) {
                                    match = true;
                                }
                                break;
                            case "ge":
                                if (parseInt(filters.rules[i].data) <= parseInt(node[0].innerHTML)) {
                                    match = true;
                                }
                                break;
                        }
                        if (match) {
                            for (var k = 0; k < alterCol.length; k++) {


                                //Unformat the col in grid data
                                datafromgrid[j][alterCol[k]] = node[0].innerHTML;
                            }


                            //Filtered data form grid data
                            filteredData.push(datafromgrid[j]);
                        }
                    }
                }
            }
        }
    }    
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
        //Utility.CAMSBrokerageFormatSummaryReport = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/CAMS_BrokerageFormat_Summary_Reportnull?solution=DSP_BlackRock&path=&name=CAMS_BrokerageFormat_Summary_Report.prpt&###INPUT###&output-target=application%2Fvnd_openxmlformats-officedocument_spreadsheetml_sheet;page-mode=flow&userid=joe&password=password";
        Utility.CAMSBrokerageFormatSummaryReportPSI = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/CAMS_BrokerageFormat_Summary_Report_PSInull?solution=DSP_BlackRock&path=&name=CAMS_BrokerageFormat_Summary_Report_PSI.prpt&###INPUT###&output-target=table%2Fexcel;page-mode=flow&userid=joe&password=password";
        Utility.CAMSBrokerageFormatSummaryReportTrail = "http://" + Utility.ReportHostAndPort + "/pentaho/content/reporting/execute/DSP_BlackRock/CAMS_BrokerageFormat_Summary_Report_Trailnull?solution=DSP_BlackRock&path=&name=CAMS_BrokerageFormat_Summary_Report_Trail.prpt&###INPUT###&output-target=table%2Fcsv;page-mode=stream&userid=joe&password=password";


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

    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // $('#spn_date').html(Utility.SystemDate());
});




///////////////////*Following code is related to chat application*///////////////////
$(function () {
    /*
    declare gloabl box variable,
    so we can check if box is alreay open,
    when user click toggle button
*/

    var roleId = sessionStorage.RoleID;
    if (roleId == "10" || roleId == "3" || roleId == "6" || roleId == "7" || roleId == "5") {

        var divChatArea = '<div class="index_reload"><div id="chat_area"><div class="chat_box main_chat2 hide_wrap_box" id="chat_id">' +
                          '<div class="user_box"><div class="name open_chat2 left">Chat</div><i class="chaticon"></i>' +
                          '<div class="closed2 right" id="icon">^ &nbsp;</div>' +
                          '<div class="clear"></div>' +
                          '</div><div class="wrap_box2" style="display:none">' +
                          '<div class="message_content">' +
                          '<div id="divusers" class="users">' +
                          '</div></div></div></div></div></div>';

        $("#globalDiv").append(divChatArea);

        $('.main_chat2').toggle("bounce", { times: 3 }, "slow");

        //$('.user_box').click(function () {
        //    if ($('.wrap_box2').is(":visible")) {
        //        if ($("#divusers a").hasClass("blink")) {
        //            $(".chaticon").show();
        //            $('.open_chat2,.chaticon').addClass('blink');
        //            //$('.chaticon').addClass('blink_me');
        //        }
        //        $('.wrap_box2').hide();
        //        $('.main_chat2').addClass('hide_wrap_box');
        //        $('#icon').html('^');
        //    }
        //    else {
        //        //$(".chaticon").show();
        //        $('.open_chat2,.chaticon').removeClass('blink');

        //        $('.wrap_box2').show();
        //        $('.main_chat2').removeClass('hide_wrap_box');
        //        $('#icon').html('x');
        //    }
        //});

        $('.user_box').click(function () {
            if ($('.wrap_box2').is(":visible")) {
                $('.wrap_box2').hide();
                $('.main_chat2').addClass('hide_wrap_box');
                $('#icon').html('^');              
            }
            else {
                $('.main_chat2').removeClass('hide_wrap_box');
                $('#icon').html('x');                              
                $('.wrap_box2').show();

            }
        });



        // Declare a proxy to reference the hub.
        var chatHub = $.connection.notificationHub;

        registerClientMethods(chatHub);

        // Start Hub
        $.connection.hub.start().done(function () {

            registerEvents(chatHub)

        });



        function registerEvents(chatHub) {

            var name = sessionStorage.UserName;
            if (name.length > 0) {
                chatHub.server.connect(name, sessionStorage.UserID);
            }
        }

        function registerClientMethods(notificationHub) {

            // Calls when user successfully logged in
            notificationHub.client.onConnected = function (id, userName, allUsers, messages, offlineChats) {

                sessionStorage.setItem("connectionId", id);

                // Add All Users
                for (i = 0; i < allUsers.length; i++) {

                    AddUser(notificationHub, allUsers[i].ConnectionId, allUsers[i].UserName, allUsers[i].UserId, offlineChats);
                }

                // Add Existing Messages
                for (i = 0; i < messages.length; i++) {

                    AddMessage(messages[i].UserName, messages[i].Message);
                }
                SortChatUsersUnreadMessages();               
            }

            // On New User Connected
            notificationHub.client.onNewUserConnected = function (id, name, currentUserId, offlineChats) {
                //$('#divusers').children().each(function () {
                //    var nodeNameStr = this.nodeName.toLowerCase();
                //    var nodeText = $(this).text();
                //    x += "CreateNode(nodeNameStr).addText(nodeText)"
                //});

                $('#divusers a').each(function () {
                    if ($(this).text() == name)
                        $(this).remove();
                });
                AddUser(notificationHub, id, name, currentUserId, offlineChats);
                SortChatUsersUnreadMessages();
            }


            // On User Disconnected
            notificationHub.client.onUserDisconnected = function (id, userName, currentUserId) {

                $('#' + id).remove();

                var ctrId = 'private_' + id;
                $('#' + ctrId).remove();

                var disc = $('<div class="disconnect">"' + userName + '" logged off.</div>');

                $(disc).hide();
                $('#divusers').prepend(disc);
                $(disc).fadeIn(200).delay(2000).fadeOut(200);
                AddUser(notificationHub, null, userName, currentUserId, null);
            }

            notificationHub.client.messageReceived = function (userName, message) {

                AddMessage(userName, message);
            }


            notificationHub.client.sendPrivateMessage = function (windowId, fromUserName, message, oppUserId) {

                var ctrId = 'private_' + windowId;


                if ($('#' + ctrId).length == 0) {

                    createPrivateChatWindow(notificationHub, windowId, ctrId, fromUserName, oppUserId);

                }

                $('#' + ctrId).find('#divMessage').append('<div class="message"><span class="userName">' + fromUserName + '</span>: ' + message + '</div>');

                // set scrollbar
                var height = $('#' + ctrId).find('#divMessage')[0].scrollHeight;
                $('#' + ctrId).find('#divMessage').scrollTop(height);

            }

        }
        //var totUnreadMsgsCount = 0;
        function AddUser(chatHub, id, name, oppUserId, offlineChats) {
            var result = '', offlineUserMatch;
            var userId = sessionStorage.connectionId;
            var code = "";
            if (sessionStorage.UserID != oppUserId) {

                if (userId == id) {

                    //code = $('<div class="loginUser">' + name + "</div>");

                }
                else {

                    if (offlineChats != null) {
                        if (offlineChats.length > 0) {
                            var chatdata = [];
                            for (var cnt = 0; cnt < offlineChats.length; cnt++) {
                                if (oppUserId == offlineChats[cnt].SentFrom) {
                                    offlineUserMatch = offlineChats[cnt];
                                }
                            }
                            if (typeof offlineUserMatch != 'undefined') {
                                //totUnreadMsgsCount = totUnreadMsgsCount + offlineUserMatch.CountMsg;

                                if (id == null)
                                    code = $('<a id="' + id + '" class="chatRoom content users offlineuser" style="font-weight:bold;">' + name + ' (' + offlineUserMatch.CountMsg + ')</a><input type="hidden" id="hdnOppId" value="' + oppUserId + '"/>');
                                else
                                    code = $('<a id="' + id + '" class="chatRoom content users onlineuser" style="font-weight:bold;">' + name + ' (' + offlineUserMatch.CountMsg + ')</a><input type="hidden" id="hdnOppId" value="' + oppUserId + '"/>');
                            } else {
                                if (id == null)
                                    code = $('<a id="' + id + '" class="chatRoom content users offlineuser" >' + name + '</a><input type="hidden" id="hdnOppId" value="' + oppUserId + '"/>');
                                else
                                    code = $('<a id="' + id + '" class="chatRoom content users onlineuser" >' + name + '</a><input type="hidden" id="hdnOppId" value="' + oppUserId + '"/>');
                            }
                        }
                        else {
                            if (id == null)
                                code = $('<a id="' + id + '" class="chatRoom content users offlineuser" >' + name + '</a><input type="hidden" id="hdnOppId" value="' + oppUserId + '"/>');
                            else
                                code = $('<a id="' + id + '" class="chatRoom content users onlineuser" >' + name + '</a><input type="hidden" id="hdnOppId" value="' + oppUserId + '"/>');
                        }
                    }
                    else {
                        if (id == null)
                            code = $('<a id="' + id + '" class="chatRoom content users offlineuser" >' + name + '</a><input type="hidden" id="hdnOppId" value="' + oppUserId + '"/>');
                        else
                            code = $('<a id="' + id + '" class="chatRoom content users onlineuser" >' + name + '</a><input type="hidden" id="hdnOppId" value="' + oppUserId + '"/>');
                    }

                    $(code).dblclick(function () {
                        if ($(this).text().indexOf(' (') > -1) {
                            $(this).css("font-weight", "normal");
                            $(this).text($(this).text().substring(0, $(this).text().indexOf(' (')));
                        }
                        var id = $(this).attr('id');

                        if (userId != id)
                            OpenPrivateChatWindow(chatHub, id, name, oppUserId);

                    });
                }

                $("#divusers").append(code);
            }
        }
        
        function SortChatUsersUnreadMessages() {

            var unreadMsgDivs = $("#divusers a").filter(function (index) {
                if ($(this).html().indexOf('(') > -1)
                    return ($(this).removeClass('blink').addClass('blink'))
            });

            var UsersWithNoMsgs = $("#divusers a").sort(function (a, b) {
                if ($(a).html().indexOf('(') <= -1 && $(b).html().indexOf('(') <= -1)
                    return $(a).removeClass('blink').html() > $(b).removeClass('blink').html() ? 1 : -1;
            });
              
            $("#divusers").prepend(UsersWithNoMsgs);
            $("#divusers").prepend(unreadMsgDivs);

            if ($('#divusers a').hasClass('blink')){
                $('.open_chat2').addClass('blink');
                $('.chaticon').addClass('fa fa-comments blink');                
            }
            else {
                $('.open_chat2').removeClass('blink');
                $('.chaticon').removeClass('fa fa-comments blink');
            }
        }

        function OpenPrivateChatWindow(chatHub, id, userName, oppUserId) {

            var ctrId = 'private_' + id;

            if ($('#' + ctrId).length > 0) return;

            createPrivateChatWindow(chatHub, id, ctrId, userName, oppUserId);

        }

        function createPrivateChatWindow(chatHub, userId, ctrId, userName, oppUserId) {
            var div = '';
            if (ctrId == null || ctrId == "private_null") {
                div = '<div id="' + ctrId + '" class=".ui-widget-contentsall draggable" rel="0">' +
                          '<div class="header">' +
                             '<div style="float:right;">' +
                                 '<img id="imgDelete"  style="cursor:pointer;" src="../img/delete.png"/>' + '</div>' +
                              '<span class="selText" rel="0">' + userName + '<img src="../img/OfflineUser.gif" class="pull-right"></img></span>' + '</div>' +
                              '<div id="divHistory"><input id="btnViewHistory" class="submitButton button" type="button" value="View History" style="background-color:black;"/>' +
                              '<input type="hidden" id="hdnOppId" value="' + oppUserId + '"/>' + '</div>' +
                          '<div id="divHistoryMessage"></div>' +
                          '<div id="divMessage" class="messageArea">' +

                          '</div>' +
                          '<div class="buttonBar">' +
                             '<input id="txtPrivateMessage" class="msgText" type="text"   />' +
                             '<input id="btnSendMessage" class="submitButton button" type="button" value="Send"/>' +
                          '</div>' +
                       '</div>';
            }
            else {
                div = '<div id="' + ctrId + '" class=".ui-widget-contentsall draggable" rel="0">' +
                          '<div class="header">' +
                             '<div  style="float:right;">' +
                                 '<img id="imgDelete"  style="cursor:pointer;" src="../img/delete.png"/>' + '</div>' +
                              '<span class="selText" rel="0">' + userName + '<img src="../img/OnlineUser.gif" class="pull-right"></span>' + '</div>' +
                              '<div id="divHistory"><input id="btnViewHistory" class="submitButton button" type="button" value="View History" style="background-color:black;"/>' +
                              '<input type="hidden" id="hdnOppId" value="' + oppUserId + '"/>' + '</div>' +
                          '<div id="divHistoryMessage"></div>' +
                          '<div id="divMessage" class="messageArea">' +

                          '</div>' +
                          '<div class="buttonBar">' +
                             '<input id="txtPrivateMessage" class="msgText" type="text"   />' +
                             '<input id="btnSendMessage" class="submitButton button" type="button" value="Send"/>' +
                          '</div>' +
                       '</div>';
            }

            var $div = $(div);

            // DELETE BUTTON IMAGE
            $div.find('#imgDelete').click(function () {
                $('#' + ctrId).remove();
            });

            // Send Button event
            $div.find("#btnSendMessage").click(function () {

                $textBox = $div.find("#txtPrivateMessage");
                var msg = $textBox.val();
                if (msg.length > 0) {

                    chatHub.server.sendPrivateMessage(userId, msg, oppUserId);
                    $textBox.val('');
                }
            });

            //View History button Event
            $div.find("#btnViewHistory").click(function () {

                SortChatUsersUnreadMessages();

                if ($('#divHistoryMessage').hasClass('historyShow')) {
                    $('#divHistoryMessage').removeClass('historyShow');
                    $('#divHistoryMessage').empty();
                } else {
                    var chatHistoryMessages = [];
                    var chats = [];
                    $('#divHistoryMessage').addClass('historyShow');
                    Utility.ServiceCall("POST", 'MasterService.svc/GetChatHistory', JSON.stringify({ SentFrom: sessionStorage.UserID, SentTo: oppUserId }), "json", false, false, function (result) {
                        chats = result.GetChatHistoryResult;

                        if (chats.length > 0) {
                            var chatdata = [];
                            for (var cnt = 0; cnt < chats.length; cnt++) {
                                //var D = new Date(chats[cnt].ChatDate).getDay() + '-' + new Date(chats[cnt].ChatDate).getMonth() - 1 + '-' + new Date(chats[cnt].ChatDate).getFullYear() + ' ' + new Date(chats[cnt].ChatDate).toLocaleTimeString();
                                chatdata[cnt] = chats[cnt].ChatDate + "<br>" + chats[cnt].Message + "<br>";
                            }
                            chatHistoryMessages = chatdata;
                            $('#divHistoryMessage').html(chatHistoryMessages);
                        }
                    });
                }
            });

            // Text Box event
            $div.find("#txtPrivateMessage").keypress(function (e) {
                if (e.which == 13) {
                    $div.find("#btnSendMessage").click();
                }
            });

            AddDivToContainer($div);

        }

        function AddDivToContainer($div) {
            $('#chat_id').prepend($div);

            $div.draggable({

                handle: ".header",
                stop: function () {

                }
            });
            $("#txtPrivateMessage").focus();
        }
    }

    ////////////////*Chat Application code ends here */////////////////////

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


$(function () {
    var count = 0;
    var timer = $.timer(function () {
        ++count;
        if (count / 5 == 1) {
            Utility.LoadAlerts();
            count = 0;
        }
    });
    timer.set({ time: 1000, autostart: true });

    $("#alertsection").on("click", ".cls-ico", function () {
        var $killrow = $(this).parents('div.alert-bx-otr');
        var id = $($killrow).find('input[type=hidden]').attr('value');
        Utility.UpdateNotificationStatus(id);

        $killrow.addClass("danger");
        $killrow.fadeOut(1000, function () {
            $(this).remove();
        });
        count = 4;
        Utility.LoadAlerts();
    });
});

