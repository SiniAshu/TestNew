var Overview = {
    arns: [],

    GetChannel: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChannel', '{"SearchText": ""}', "json", false, false, function (result) {
            var arrItems = result.GetChannelResult;
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].ChannelName).val(arrItems[i].ChannelId).appendTo("#dd_channel");
            }
            $('#dd_channel').attr("multiple", "multiple");
            $('#dd_channel').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                onChange: function (element, checked) {
                    var brands = $('#dd_channel option:selected');
                    var selected = [];
                    $(brands).each(function (index, brand) {
                        selected.push([$(this).val()]);
                    });

                    Overview.GetDistributorCategory(selected.valueOf());
                }
            });
            $('#dd_channel').multiselect('clearSelection');
        });
    },

    GetDistributorCategory: function (SearchText) {
        var arr = SearchText == "" ? "" : SearchText.toString();

        arr = JSON.stringify(arr)

        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorCategory', '{"SearchText": ' + arr + '}', "json", false, false, function (result) {
            var arrItems = result.GetDistributorCategoryResult;
            $("#dd_dist_category").multiselect('destroy');
            $("#dd_dist_category").empty();
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].DistributorCategoryName).val(arrItems[i].DistributorCategoryId).appendTo('#dd_dist_category');
            }
            $('#dd_dist_category').multiselect('rebuild', {
                onChange: function (element, checked) {
                    var brands = $('#dd_channel option:selected');
                    var selected = [];
                    $(brands).each(function (index, brand) {
                        selected.push([$(this).val()]);
                    });

                    Overview.GetDistributorCategory(selected.valueOf());
                }
            });

        });
    },

    GetSchemeCategory: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeCategory', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            var arrItems = result.GetSchemeCategoryResult;
            $("<option />").text("Select Scheme Category").val("0").appendTo("#dd_Scheme_category");
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeCategoryName).val(arrItems[i].SchemeCategoryId).appendTo("#dd_Scheme_category");
            }
        });
    },

    SchemeCategoryChange: function () {
        Overview.GetScheme($('#dd_Scheme_category option:selected').val());
    },

    GetScheme: function (SearchText) {
        var arr = SearchText == "" ? "" : SearchText.toString();
        arr = JSON.stringify(arr)
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetScheme', '{"SearchText": ' + arr + '}', "json", false, false, function (result) {
            var arrItems = result.GetSchemeResult;
            $("#dd_Scheme").multiselect('destroy');
            $("#dd_Scheme").empty();
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeName).val(arrItems[i].SchemeId).appendTo('#dd_Scheme');
            }
            $('#dd_Scheme').multiselect('rebuild');
        });
    },

    LoadARNS: function (type, Ids) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARNFor', JSON.stringify({ Type: "", SearchText: "" }), "json", false, false, function (result) {

        });
    },

    GetARN: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARN', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn").empty();
            Overview.arns = JSON.parse(result.GetARNResult);
            $("#txt_arn").tokenInput(
            Overview.arns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    Overview.GetDistributor(item.name, 'add');
                },
                //onDelete: function (item) {
                //    CreateRackRate.GetDistributor(item.name, 'remove');
                //}
            });
        });
    },

    GetDistributor: function (SearchText, mode) {
        if (mode == 'add') {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChildArn', JSON.stringify({ ArnNo: SearchText }), "json", false, false, function (result) {
                var Data = result.GetChildArnResult;
                if (Data.length > 1) {
                    $.each(Data, function (i, obj) {
                        //var ARNName = "";
                        //ARNName = $('#txt_arn').val();
                        //if (ARNName != "") {
                        //    var ArnNameAdded = ARNName = $('#txt_arn').val().split(',');
                        //    var Exists = 0;
                        //    $.each(ArnNameAdded, function (i, obj) {
                        //        if (obj == Data[0].DistributorName) {
                        //            Exists = 1;
                        //        }
                        //    });
                        //    if (Exists == 0) {
                        //        ARNName += ',' + Data[0].DistributorName;
                        //    }
                        //}
                        //else
                        //    ARNName = obj.DistributorName;
                        //$('#txt_arn').val(ARNName);

                        $("#txt_arn").tokenInput("add", { id: obj.DistributorId, name: obj.ARN });
                    });
                }
                else {
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                        var Data = result.GetDistributorBasedOnIDResult;
                        var ARNName = "";
                        ARNName = $('#txt_arn').val();
                        if (ARNName != "") {
                            var ArnNameAdded = ARNName = $('#txt_arn').val().split(',');
                            var Exists = 0;
                            $.each(ArnNameAdded, function (i, obj) {
                                if (obj == Data[0].DistributorName) {
                                    Exists = 1;
                                }
                            });
                            if (Exists == 0) {
                                ARNName += ',' + Data[0].DistributorName;
                            }
                        }
                        else
                            ARNName = Data[0].DistributorName;
                        $('#txt_arn').val(ARNName);
                    });
                }
            });

        }
        else {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                var Data = result.GetDistributorBasedOnIDResult;
                var ARNName = "";
                ARNName = $('#txt_arn').val().split(',');
                for (i = 0; i < ARNName.length; i++) {
                    if (ARNName[i] == Data[0].DistributorName) {
                        ARNName.splice(i, 1);
                    }
                }
                $('#txt_arn').val(ARNName);
            });
        }
    },

    GetDiscardedRackRate: function () {
        var channelselected = $('#dd_channel option:selected');
        var channelarray = [];
        $(channelselected).each(function (index, channelsel) {
            channelarray.push([$(this).val()]);
        });
        var Channel = channelarray.toString();

        var Distselected = $('#dd_dist_category option:selected');
        var Distarray = [];
        $(Distselected).each(function (index, channelsel) {
            Distarray.push([$(this).val()]);
        });
        var DistributorCategory = Distarray.toString();

        var SchemeSelected = $('#dd_Scheme_category option:selected').val();

        var localSchemeCategory = $('#dd_Scheme option:selected');
        var localSchemeCategoryselected = [];
        $(localSchemeCategory).each(function () {
            localSchemeCategoryselected.push([$(this).val()]);
        });


        var ARNNo = "";
        //var token = $("#txt_arn").tokenInput("get");
        //var names = [];

        //$.each(token, function (i, obj) {
        //    names.push(obj.name);//build an array of just the names
        //});
        //ARNNo = names.toString();
        sessionStorage.setItem("DistributorCategory", DistributorCategory);
        sessionStorage.setItem("Channel", Channel);
        sessionStorage.setItem("ARN", ARNNo);
        sessionStorage.setItem('SchemeSelected', "")
        sessionStorage.setItem('SchemeCategoryselected', "")
        sessionStorage.setItem("MemoFrom", "Discarded");
        var SearchGridResult;
        var MemoStatus = "Discarded";
        var MasterQueueStatus = "";

        //if (DistributorCategory != "" || Channel != "" || ARNNo != "") {

        var Service = 'BaseRackRateService.svc/GetDiscardedQueue';
        var InputData = JSON.stringify({ Status: "" });

        Utility.ServiceCall("POST", Service, InputData, "json", false, false, function (result) {

            SearchGridResult = result.GetDiscardedQueueResult;

            $('#grid_search_result').jqGrid('clearGridData');
            if (SearchGridResult != undefined && SearchGridResult.length > 0) {
                for (var i = 0; i < SearchGridResult.length; i++)
                    jQuery("#grid_search_result").jqGrid('addRowData', SearchGridResult[i].PaymentMemoId, SearchGridResult[i]);
            }
            else {
                Utility.writeNotification("error", "No Records Found", "", true);
            }

        });
        //}
        //else
        //{
        //    $('#grid_search_result').jqGrid('clearGridData');
        //}
    },


    ReturnSearchHyperLink: function (cellValue, options, rowdata, action) {
        sessionStorage.CurrentMenuselected = "nav_information";
        if (rowdata.MemoTypeID == "1")
            return "<a style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'  href='./RackRateReview.html?memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "' >" + rowdata.MemoNumber + "</a>";   //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + rowdata.PaymentMemoId + "'
        else if (rowdata.MemoTypeID == "2")
            return "<a style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'  href='./TieUpInformation.html?memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "' >" + rowdata.MemoNumber + "</a>";   //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + rowdata.PaymentMemoId + "' 
        else if (rowdata.MemoTypeID == "5")
            return "<a style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'  href='./SIPInformation.html?memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "' >" + rowdata.MemoNumber + "</a>"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "'
        else
            return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"Overview.AdHocPaymentDetails(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
    },


    AdHocPaymentDetails: function (PaymentMemoId) {
        //modal_adhoc_payment_record
        $('#modal_adhoc_payment_record').modal('show');

        Utility.ServiceCall("POST", 'AdHocService.svc/GetAdHocDetails', JSON.stringify({ PaymentTypeID: 0, AdhocStatus: '', AdhocBatchID: PaymentMemoId, CreatedByID: 0 }), "json", false, false, function (result) {
            var arrItems = result.GetAdHocDetailsResult;
            $('#grid_sub_processing').jqGrid('clearGridData');
            if (arrItems != undefined && arrItems.length > 0) {
                for (var i = 0; i < arrItems.length; i++)
                    jQuery("#grid_sub_processing").jqGrid('addRowData', parseInt(i + 1), arrItems[i]);
            }
        });
    },

    ReturnCheckBox: function (cellValue, options, rowdata, action) {
        return "<input type='checkbox' />";
    },

    ReturnRadioBox: function (cellValue, option) {
        return '<input type="radio" style="display: block;margin-left: auto;margin-right: auto;" name="radio_' + option.gid + '"  />';
    },

    //SmartSearchScreen: function () { 
    //    window.location.href = "./SmartSearchScreen.html";
    //},
    LoadData: function () {
        Overview.GetChannel("");
        $('#modal_adhoc_payment_record').modal('hide');

        Overview.GetDistributorCategory("");
        Overview.GetSchemeCategory("");
        //Overview.GetScheme("");

        Overview.GetARN("");

        //$('#dd_dist_category').multiselect('clearSelection');
        //$('#dd_Scheme').multiselect('clearSelection');
        //var categorySelected = sessionStorage.getItem('DistributorCategory') != null ? sessionStorage.getItem('DistributorCategory').split(",") : '';
        //var channelSelected = sessionStorage.getItem('Channel') != null ? sessionStorage.getItem('Channel').split(",") : ''
        //var Arnselected = sessionStorage.getItem('ARN') != null ? sessionStorage.getItem('ARN').split(",") : '';
        //var SchemecategorySelected = sessionStorage.getItem('SchemeCategoryselected') != null ? sessionStorage.getItem('SchemeCategoryselected').split(",") : '';
        //var SchemeSelected = sessionStorage.getItem('SchemeSelected') != null ? sessionStorage.getItem('SchemeSelected').split(",") : '';

        //$('#txt_arn').tokenInput('clear');
        //if (Arnselected != null) {
        //    for (i = 0; i < Arnselected.length ; i++) {
        //        $.each(CreateRackRate.arns, function (key, value) {
        //            if (value.name == Arnselected[i]) {
        //                $("#txt_arn").tokenInput("add", { id: value.id, name: value.name });
        //            }
        //        });
        //    }
        //}
        //if (categorySelected != null) {
        //    for (i = 0; i < categorySelected.length; i++) {
        //        $('#dd_dist_category').multiselect('select', categorySelected[i]);
        //    }
        //}
        //if (channelSelected != null) {
        //    for (i = 0; i < channelSelected.length; i++) {
        //        $('#dd_channel').multiselect('select', channelSelected[i]);
        //    }
        //}

        //if (SchemecategorySelected != null) {
        //       for (i = 0; i < SchemecategorySelected.length; i++) {
        //           $('#dd_Scheme_category').multiselect('select', SchemecategorySelected[i]);
        //       }
        //  }

        //   if (SchemeSelected != null) {
        //       for (i = 0; i < SchemeSelected.length; i++) {
        //          $('#dd_Scheme').multiselect('select', SchemeSelected[i]);
        //       }
        //   }

        $("#dd_Scheme").multiselect('destroy');
        $("#dd_Scheme").empty();
        $('#dd_Scheme').multiselect('rebuild');

        $grid = $("#grid_search_result");

        var lastsel3;
        jQuery("#grid_search_result").jqGrid({
            datatype: "local",
            height: 250,
            width: null,
            shrinkToFit: false,
            sortable: true,
            rowNum: 100,
            ignoreCase: true,
            colNames: ['Select', 'MemoNumber', 'Memo Number', 'Memo Type', 'Memo Type ID', 'Category', 'ARN No', 'ARN Name', 'From Date', 'To Date', 'Status', 'Status', 'Raised By', 'Raised On', 'Time', 'Ageing', 'Action By'],
            colModel: [
                   { name: 'select', formatter: Overview.ReturnRadioBox, width: '60px;', hidden: true },
                   { name: 'MemoNumber', index: 'MemoNumber', hidden: true },
                   { name: 'PaymentMemoId', index: 'PaymentMemoId', align: 'right', formatter: Overview.ReturnSearchHyperLink, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                   { name: 'MemoTypeName', index: 'MemoTypeName', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                   { name: 'MemoTypeID', index: 'MemoTypeID', hidden: true },
                   { name: 'DistributorCategoryName', width: 200, index: 'DistributorCategoryName', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                   { name: 'ARNNo', width: 90, index: 'ARNNo', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                   { name: 'ARNName', width: 260, index: 'ARNName', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                   { name: 'DateFrom', width: 90, index: 'DateFrom', align: 'center', sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
                   { name: 'DateTo', width: 90, index: 'DateTo', align: 'center', sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
                      { name: 'MemoStatus', index: 'MemoStatus', align: 'center', width: 90, hidden: true },
                    { name: 'MemoStatusDisplay', index: 'MemoStatusDisplay', align: 'center', width: 90, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                   { name: 'CreatedByName', index: 'CreatedByName', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                     { name: 'RaisedOnDate', index: 'RaisedOnDate', width: 90, align: 'center', sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
                   { name: 'RaisedOnTime', index: 'RaisedOnTime', width: 100, align: 'center', search: false },
                   { name: 'Ageing', index: 'Ageing', width: 100, align: 'right', sorttype: 'integer', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
                    { name: 'ModifiedByName', index: 'ModifiedByName', align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
            ],

            gridComplete: function () {
                $("td[aria-describedby=grid_search_result_select] input[type='radio']").click(function () {
                    var $selRadio = $('input[name=radio_' + $grid[0].id + ']:radio:checked'), $tr;
                    if ($selRadio.length > 0) {
                        $tr = $selRadio.closest('tr');
                        if ($tr.length > 0) {
                            var btn_copy = $('#btn_copy');
                            var btn_modify = $('#btn_modify');
                            if ($tr.find('td:eq(3)').text() == "1") {
                                btn_copy.attr('disabled', false);
                                btn_modify.attr('disabled', true);
                                sessionStorage.setItem("CopyMemoNo", $tr.find('td:eq(1)').text())
                            }
                            if ($tr.find('td:eq(3)').text() == "2") {
                                btn_copy.attr('disabled', true);
                                btn_modify.attr('disabled', false);
                                sessionStorage.setItem("CopyMemoNo", $tr.find('td:eq(1)').text())
                            }
                        }
                    } else {
                        Utility.writeNotification("warning", "Select a Memo", "", true);
                        //alert("The radio button is not selected");
                    }
                });
            }
        });
        jQuery("#grid_search_result").jqGrid('filterToolbar', {
            searchOperators: true, stringResult: true, searchOnEnter: false, defaultSearch: "cn", multipleSearch: true, beforeSearch: function () {
                Utility.CustomFilter($('#grid_search_result'), 'MemoId', ["MemoId", "MemoNumber"], Overview.GetDiscardedRackRate);
            }
        });

        $grid = $("#grid_sub_processing");
        jQuery("#grid_sub_processing").jqGrid({
            datatype: "local",
            height: 450,
            width: null,
            shrinkToFit: false,
            colNames: ['S.No.', 'ARN No.', 'ARN Name', 'Scheme', 'Channel', 'Branch', 'Period From', 'Period To', 'Amount Basis', 'Rate (bps)', 'Mobilization Amount (Lakhs)', 'Payment Amount (Lakhs)', 'Remarks'],
            colModel: [
                    { name: 'SerialNo', index: 'SerialNo', width: 60, align: 'center' },
                    { name: 'ARNNo', width: 90, index: 'ARNNo' },
                    { name: 'ARNName', width: 260, index: 'ARNName' },
                    { name: 'SchemeName', width: 250, index: 'SchemeName' },
                    { name: 'ChannelName', width: 90, index: 'ChannelName' },
                    { name: 'BranchName', index: 'BranchName', width: 105, sortable: true },
                    { name: 'DateFrom', width: 120, index: 'DateFrom', align: 'center' },
                    { name: 'DateTo', width: 110, index: 'DateTo', align: 'center' },
                    { name: 'AmountBasisName', index: 'AmountBasisName', width: 130, sortable: true },
                    { name: 'Rate', index: 'Rate', width: 90 },
                    { name: 'MobilizationAmount', index: 'MobilizationAmount', width: 230 },
                    { name: 'PaymentAmount', index: 'PaymentAmount', width: 200 },
                    { name: 'Remarks', index: 'Remarks', width: 150, editable: false, colSpan: 2 }
            ],
        });

        Overview.GetDiscardedRackRate();
    },
}


$(function () {
    Overview.LoadData();
});