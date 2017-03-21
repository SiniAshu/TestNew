var MasterQueue = {
    arns: [],
    arnName: [],
    AdhocRemarks: '',

    LogOut: function () {
        sessionStorage.clear();
        window.location.href = "../Login.aspx?mode=logout";
        return false;
    },

    
    RefreshGridDetails: function () {
        Utility.ListSearchText = '';
        MasterQueue.ViewMasterQueue();
    },

    ViewMasterQueue: function () {
        //$("#div_btn").empty();
        $('#modal_Advance_Search').modal('hide');
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

        var ARNNo = "";
        var token = $("#txt_arn").tokenInput("get");
        var names = [];

        $.each(token, function (i, obj) {
            names.push(obj.name);//build an array of just the names
        });
        ARNNo = names.toString();

        sessionStorage.setItem("DistributorCategoryMaster", DistributorCategory);
        sessionStorage.setItem("ChannelCreateMaster", Channel);
        sessionStorage.setItem("ARNCreateMaster", ARNNo);

        sessionStorage.setItem("ismasterqueue", true);

        $("#hdr_name").text("Master Q");

        $("#spn_user_name").text(sessionStorage.UserName);
        $("#spn_role_name").text(sessionStorage.RoleName);

        //$('#tbl_masterqueue').jqGrid('clearGridData');
        //Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetCreateBaseRackRate', JSON.stringify({ ArnNo: ARNNo, Channel: Channel, DistributorCategory: DistributorCategory, Status: 1, MasterQueueStatus: 2, SearchFilter: Utility.ListSearchText }), "json", false, false, function (result) {
        //    var data = result.GetCreateBaseRackRateResult;

        //    for (var i = 0; i < data.length; i++)
        //        jQuery("#tbl_masterqueue").jqGrid('addRowData', data[i].id, data[i]);
        //});
    },

    ViewRackRate: function () {
        sessionStorage.CurrentMenuselected = "nav_create"
        if (sessionStorage.CurrentMenuselected == "nav_create") {
            window.location.href = "CreateRackRate.html?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
        }
        else {
            window.location.href = "RackRateInformation.html?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
        }
        return false;
    },

    ViewTieUp: function () {
        sessionStorage.CurrentMenuselected = "nav_create"
        sessionStorage.setItem("IsmainmenuClicked", true);
        window.location.href = "CreateRackRate.html?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
        return false;
    },

    ViewOverview: function () {
        sessionStorage.CurrentMenuselected = ""
        sessionStorage.setItem("IsmainmenuClicked", true);
        window.location.href = "Overview.html?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
        return false;
    },
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

                    MasterQueue.GetDistributorCategory(selected.valueOf());
                    //CreateRackRate.GetARNForChannelAndDistributorCategory();
                }
            });
            $('#dd_channel').multiselect('clearSelection');
        });
    },

    GetARNForChannelAndDistributorCategory: function () {
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

        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARNForChannelAndDistributorCategory', JSON.stringify({ Channel: Channel, DistributorCategory: DistributorCategory }), "json", false, false, function (result) {
            MasterQueue.arns = [];
            MasterQueue.arns = JSON.parse(result.GetARNForChannelAndDistributorCategoryResult);
            $("#txt_arn").siblings("ul").remove();
            $("#txt_arn_name").siblings("ul").remove();

            $("#txt_arn").empty();
            $("#txt_arn").tokenInput(
            MasterQueue.arns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    //CreateRackRate.GetDistributor(item.name, 'add', item.id);
                    MasterQueue.GetDistributor(item.id, 'add', item.id);

                },
                onDelete: function (item) {
                    //CreateRackRate.GetDistributor(item.name, 'remove', item.id);
                    MasterQueue.GetDistributor(item.id, 'remove', item.id);
                }
            });


            $("#txt_arn_name").tokenInput(
           MasterQueue.arnName,
           {
               theme: "facebook", preventDuplicates: true, resultsLimit: 10,
               onAdd: function (item) {
                   //CreateRackRate.LoadARNToken(item.name, 'add',item.id);
                   MasterQueue.LoadARNToken(item.id, 'add', item.id);
               },

               onDelete: function (item) {
                   //CreateRackRate.LoadARNToken(item.name, 'remove',item.id);
                   MasterQueue.LoadARNToken(item.id, 'remove', item.id);
               }
           });

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

            $('#dd_dist_category').attr("multiple", "multiple");
            $('#dd_dist_category').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                //onChange: function (element, checked) {
                //    var brands = $('#dd_dist_category option:selected');
                //    var selected = [];
                //    $(brands).each(function (index, brand) {
                //        selected.push([$(this).val()]);
                //    });

                //    //CreateRackRate.GetDistributorCategory(selected.valueOf());
                //    CreateRackRate.GetARNForChannelAndDistributorCategory();
                //}
            });

        });
    },

    GetSchemeCategory: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeCategory', JSON.stringify({ SearchText: "", MemoTypeId: "0", IsCloseEnded: "2" }), "json", false, false, function (result) {
            var arrItems = result.GetSchemeCategoryResult;

            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeCategoryName).val(arrItems[i].SchemeCategoryId).appendTo("#dd_Scheme_category");
            }
            $('#dd_Scheme_category').attr("multiple", "multiple");

            $('#dd_Scheme_category').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                //nonSelectedText: "Select Scheme Category",
                //onChange: function (element, checked) {
                //    var brands = $('#dd_Scheme_category option:selected');
                //    var selected = [];
                //    $(brands).each(function (index, brand) {
                //        selected.push([$(this).val()]);
                //    });

                //    CreateRackRate.GetScheme(selected.toString());
                //}
            });
            $('#dd_Scheme_category').multiselect('clearSelection');
        });
    },

    SchemeCategoryChange: function () {
        MasterQueue.GetScheme($('#dd_Scheme_category option:selected').val());
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
            $('#dd_Scheme').attr("multiple", "multiple");

            $('#dd_Scheme').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                //nonSelectedText: "Select Scheme",

            });
            $('#dd_Scheme').multiselect('clearSelection');
        });
    },

    LoadARNS: function (type, Ids) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARNFor', JSON.stringify({ Type: "", SearchText: "" }), "json", false, false, function (result) {

        });
    },

    GetARN: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARN', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn").empty();
            MasterQueue.arns = JSON.parse(result.GetARNResult);
            $("#txt_arn").tokenInput(
            MasterQueue.arns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    //CreateRackRate.GetDistributor(item.name, 'add', item.id);
                    MasterQueue.GetDistributor(item.id, 'add', item.id);
                    //$('.token-input-selected-token-facebook').remove();
                },
                onDelete: function (item) {
                    //CreateRackRate.GetDistributor(item.name, 'remove', item.id);
                    MasterQueue.GetDistributor(item.id, 'remove', item.id);
                }
            });
        });

    },

    GetARNName: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARNName', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn_name").empty();
            MasterQueue.arnName = JSON.parse(result.GetARNNameResult);
            $("#txt_arn_name").tokenInput(
            MasterQueue.arnName,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    //CreateRackRate.LoadARNToken(item.name, 'add',item.id);
                    MasterQueue.LoadARNToken(item.id, 'add', item.id);
                },

                onDelete: function (item) {
                    //CreateRackRate.LoadARNToken(item.name, 'remove',item.id);
                    MasterQueue.LoadARNToken(item.id, 'remove', item.id);
                }
            });
        });
    },

    LoadARNToken: function (SearchText, mode, id) {
        if (mode == 'add') {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                var Data = result.GetDistributorBasedOnIDResult;
                $.each($("#txt_arn").tokenInput("get"), function (i, obj) {
                    if (obj.id == SearchText) {
                        return;
                    }
                });

                $.each(Data, function (i, obj) {
                    if (obj.DistributorId == SearchText) {
                        $("#txt_arn").tokenInput("add", { id: obj.DistributorId, name: obj.ARN });
                    }
                });
            });
        }
        else {
            $("#txt_arn").tokenInput("remove", { id: id });
        }
        //$("li").removeClass('.token-input-selected-token-facebook');
    },

    GetDistributor: function (SearchText, mode, id) {
        if (mode == 'add') {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChildArn', JSON.stringify({ ArnNo: SearchText }), "json", false, false, function (result) {
                var Data = result.GetChildArnResult;
                if (Data.length > 1) {
                    $.each(Data, function (i, obj) {

                        $.each($("#txt_arn").tokenInput("get"), function (i, obj) {
                            if (obj.id == obj.DistributorId) {
                                return;
                            }
                        });

                        $("#txt_arn").tokenInput("add", { id: obj.DistributorId, name: obj.ARN });

                        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                            var Data = result.GetDistributorBasedOnIDResult;

                            $.each($("#txt_arn_name").tokenInput("get"), function (i, obj) {
                                if (obj.id == Data[0].DistributorId) {
                                    return;
                                }
                            });
                            $("#txt_arn_name").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });

                        });
                    });
                }
                else if (Data.length == 1) {

                    $("#txt_arn_name").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });
                }
                else {
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                        var Data = result.GetDistributorBasedOnIDResult;
                        $.each($("#txt_arn_name").tokenInput("get"), function (i, obj) {
                            if (obj.id == Data[0].DistributorId) {
                                return;
                            }
                        });

                        $("#txt_arn_name").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });
                    });
                }
            });

        }
        else {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                var Data = result.GetDistributorBasedOnIDResult;

                $("#txt_arn_name").tokenInput("remove", { id: id });
            });
        }
        //$("#txt_arn").removeClass('.token-input-selected-token-facebook');
    },

    ReviewRemarks: function () {
        $('#txt_reject_remarks').val(MasterQueue.AdhocRemarks);
        $('#mdl_reject_remarks').modal('show');
    },

    ReturnRadioBox: function (cellValue, option) {
        return '<input type="radio" style="display: block;margin-left: auto;margin-right: auto;" name="radio_' + option.gid + '"  />';
    },

    //ReturnSearchHyperLink: function (cellValue, options, rowdata, action) {
    //    sessionStorage.CurrentMenuselected = "nav_information";

    //    switch (rowdata.MemoTypeID) {
    //        case 1:
    //            if (rowdata.MemoStatus == "Active") {
    //                return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"MasterQueue.Viewreport(' + rowdata.PaymentMemoId + ',' + rowdata.MemoTypeID + ');\">' + rowdata.MemoNumber + '</a>';
    //            }
    //            else {

    //                if (rowdata.MemoStatus == "Saved") {
    //                    sessionStorage.CurrentMenuselected = "nav_initiate";
    //                    return "<a href='./RackRateInitiate.html?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=mq' style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'>" + rowdata.MemoNumber + "</a>";

    //                }
    //                else {
    //                    sessionStorage.CurrentMenuselected = "nav_information";
    //                    return "<a href='./RackRateReview.html?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=mq' style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'>" + rowdata.MemoNumber + "</a>";
    //                }

    //            }
    //            break;
    //        case 2:
    //            if (rowdata.MemoStatus == "Active") {
    //                return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"MasterQueue.Viewreport(' + rowdata.PaymentMemoId + ',' + rowdata.MemoTypeID + ');\">' + rowdata.MemoNumber + '</a>';
    //            } else {
    //                return "<a href='./TieUpInformation.html?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=mq' style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'>" + rowdata.MemoNumber + "</a>";
    //            }
    //            break;
    //        case 5:
    //            if (rowdata.MemoStatus == "Active") {
    //                return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"MasterQueue.Viewreport(' + rowdata.PaymentMemoId + ',' + rowdata.MemoTypeID + ');\">' + rowdata.MemoNumber + '</a>';
    //            } else {
    //                return "<a href='./SIPInformation.html?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=mq' style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'>" + rowdata.MemoNumber + "</a>";
    //            }
    //            break;
    //        default:
    //            return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"MasterQueue.Viewreport(' + rowdata.PaymentMemoId + ',' + rowdata.MemoTypeID + ');\">' + rowdata.MemoNumber + '</a>';
    //            break;
    //    }
    //},


    ReturnSearchHyperLink: function (cellValue, options, rowdata, action) {
        sessionStorage.CurrentMenuselected = "nav_information";

        switch (rowdata.MemoTypeID) {
            case 1:
                if (rowdata.MemoStatus == "Saved") {
                    sessionStorage.CurrentMenuselected = "nav_information";
                    return "<a href='./RackRateInitiate.html?memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=mq' style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'>" + rowdata.MemoNumber + "</a>";
                }
                else {
                    sessionStorage.CurrentMenuselected = "nav_information";
                    return "<a href='./RackRateReview.html?memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=mq' style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'>" + rowdata.MemoNumber + "</a>";
                }
                break;
            case 2:
                return "<a href='./TieUpInformation.html?memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=mq' style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'>" + rowdata.MemoNumber + "</a>";
                break;
            case 5:
                return "<a href='./SIPInformation.html?memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=mq' style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'>" + rowdata.MemoNumber + "</a>";
                break;
            default:
                if (rowdata.MemoTypeID == 3 || rowdata.MemoTypeID == 4) {
                    var Temp = "'" + rowdata.MemoNumber + "'";
                    return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"MasterQueue.PaymentDetail(' + rowdata.PaymentMemoId + ',' + Temp + ');\">' + rowdata.MemoNumber + '</a>';
                    //return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" >' + rowdata.MemoNumber + '</a>';
                } else
                    return rowdata.MemoNumber;
                break;
        }
    },


    PaymentDetail: function (PaymentMemoId, Memo_Number) {
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

                MasterQueue.AdhocRemarks = arrItems[0].MemoStatusDisplay;

                for (var i = 0; i < arrItems.length; i++)
                    jQuery("#grid_sub_processing").jqGrid('addRowData', parseInt(i + 1), arrItems[i]);

                $('#modal_adhoc_payment_record').modal('show');
            }
        });
    },

    Viewreport: function (paymentmemoid, MemoTypeID) {
        var gridData = jQuery("#tbl_masterqueue").jqGrid('getRowData');
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].PaymentMemoId == paymentmemoid) {
                    var fileurl = '';
                    switch (MemoTypeID) {
                        case 1:
                            fileurl = Utility.DistributorReportUrl.replace("###MemoNumber###", MasterQueue.remove_tags(gridData[i].MemoNumber));
                            break;
                        case 2:
                            fileurl = Utility.TieUpCamsReportUrl.replace("###MemoNumber###", MasterQueue.remove_tags(gridData[i].MemoNumber));
                            break;
                        case 5:
                            fileurl = Utility.SIPReportUrl.replace("###MemoNumber###", MasterQueue.remove_tags(gridData[i].MemoNumber));
                            break;
                        default:
                            fileurl = '';
                            break;
                    }

                    //fileurl = fileurl.replace("###Distributorid###", gridData[i].ARNNo);
                    if (fileurl != '')
                        MasterQueue.openWin(fileurl);
                }
            }
        }
    },

    remove_tags: function (html) {
        return jQuery(html).text();
    },

    openWin: function (url) {
        //var myWindow = window.open(url, '_blank');
        sessionStorage.reportURL = url;
        var myWindow = window.open("ReportViewer.html", '_blank');
    },

    clearFields: function () {
        sessionStorage.removeItem("DistributorCategoryMaster");
        sessionStorage.removeItem("ChannelCreateMaster");
        sessionStorage.removeItem("ARNCreateMaster");

        $('#txt_arn').tokenInput('clear');
        $('#dd_dist_category').multiselect('clearSelection');
        $('#dd_channel').multiselect('clearSelection');
        MasterQueue.ViewMasterQueue();
    },


    ReturnViewRemarksHyperLink: function (cellValue, options, rowdata, action) {
        return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"MasterQueue.AdHocPaymentDetail(' + rowdata.PaymentListId + ');\">View Remarks</a>';
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

    Search: function Search() {
        //$('#modal_Advance_Search').modal('hide');
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

        var ARNNo = "";
        var token = $("#txt_arn").tokenInput("get");
        var names = [];

        $.each(token, function (i, obj) {
            names.push(obj.name);
        });
        ARNNo = names.toString();


        sessionStorage.setItem("DistributorCategoryMaster", DistributorCategory);
        sessionStorage.setItem("ChannelCreateMaster", Channel);
        sessionStorage.setItem("ARNCreateMaster", ARNNo);

        sessionStorage.setItem("ismasterqueue", true);

        $("#hdr_name").text("Master Q");

        $("#spn_user_name").text(sessionStorage.UserName);
        $("#spn_role_name").text(sessionStorage.RoleName);

        $("#tbl_masterqueue").jqGrid('setGridParam', {
            datatype: 'json',
            page: 1,
            postData: {
                ArnNo: ARNNo, Channel: Channel, ARNName: '', DistributorCategory: DistributorCategory, Status: '1', MasterQueueStatus: '2', SearchFilter: Utility.ListSearchText, MemoLevel: '', UserID: sessionStorage.UserID
            }
        }).trigger('reloadGrid');
    },
    BindGrid: function BindGrid(ArnNo1, Channel1, ARNName1, DistributorCategory1, Status1, MasterQueueStatus1, SearchFilter1, MemoLevel1, UserID1) {
        var StatusCheck = ['Saved','Active','Approved','Reviewed','Initiated'];
        $('#tbl_masterqueue').jqGrid('clearGridData');

        $("#tbl_masterqueue").jqGrid({
            url: "/Pages/MSQ.aspx/GetCreateBaseRackRate",
            //url: "http://" + window.location.host + "/BrokerageOnlineDevUAT/Pages/MSQ.aspx/GetCreateBaseRackRate", // Enable this line for publish
            mtype: 'POST',
            postData:
            {

                ArnNo: ArnNo1, Channel: Channel1, ARNName: ARNName1, DistributorCategory: DistributorCategory1, Status: Status1, MasterQueueStatus: MasterQueueStatus1, SearchFilter: SearchFilter1, MemoLevel: MemoLevel1, UserID: UserID1

            },
            datatype: "json",
            ajaxGridOptions: { contentType: 'application/json; charset=utf-8' },

            serializeGridData: function (postData) {
                return JSON.stringify(postData);
            },
            jsonReader: {
                repeatitems: false,
                root: function (obj) {
                    return obj.d;
                }

            },
            colNames: ['Select', 'Memoid', 'Memo Number', 'Memo Type', 'Memo Type ID', 'Category', 'ARN No', 'ARN Name', 'Date From', 'Date To', 'Status', 'Status', 'Raised By', 'Raised On', 'Time', 'Ageing', 'Last Action By', 'Pending With' , 'isParentId'],
            //colNames: ['Select', 'Memoid', 'Memo Number', 'Memo Type', 'Memo Type ID', 'Category', 'ARN No', 'ARN Name', 'Date From', 'Date To', 'Status', 'Status', 'Raised By', 'Raised On', 'Time', 'Ageing', 'Last Action By', 'Pending With'],
            colModel: [
                    { name: 'edi', index: 'edi', formatter: MasterQueue.ReturnRadioBox, width: '60px;', disabled: true, hidden: true, sortable: false },
                    { name: 'PaymentMemoId', index: 'PaymentMemoId', width: 120, hidden: true, sortable: false, sorttype: 'integer', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
                    { name: 'MemoNumber', index: 'MemoNumber', align: 'center', formatter: MasterQueue.ReturnSearchHyperLink, sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'MemoTypeName', index: 'MemoTypeName', width: 120, sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'MemoTypeID', index: 'MemoTypeID', hidden: true, sortable: false },
                    { name: 'DistributorCategoryName', index: 'DistributorCategoryName', width: 260, sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'ARNNo', index: 'ARNNo', width: 95, sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'ARNName', index: 'ARNName', width: 260, sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'DateFrom', index: 'DateFrom', align: 'center', width: 105, sortable: true, sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
                    { name: 'DateTo', index: 'DateTo', align: 'center', width: 105, sortable: true, sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
                    { name: 'MemoStatus', index: 'MemoStatus', align: 'center', width: 90, hidden: true, sortable: false },
                    { name: 'MemoStatusDisplay', index: 'MemoStatusDisplay', align: 'center', width: 90, sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'CreatedByName', index: 'CreatedByName', align: 'left', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'RaisedOnDate', index: 'RaisedOnDate', width: 105, align: 'center', sortable: true, sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
                    { name: 'RaisedOnTime', index: 'RaisedOnTime', width: 50, align: 'center', sortable: false, search: false },
                    { name: 'Ageing', index: 'Ageing', width: 100, align: 'right', sortable: false, sorttype: 'integer', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
                    { name: 'ModifiedByName', index: 'ModifiedByName', align: 'left', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'PendingWith', index: 'PendingWith', align: 'left', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'isParentId', index: 'isParentId', align: 'left', sortable: false, sorttype: 'integer',  searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
            ],
            rowNum: 100,
            rowList: [100, 200, 300, 400, 500],
            pager: '#pager',
            sortname: 'PaymentMemoId',
            viewrecords: true,
            sortorder: "desc",
            gridview: true,
            height: '510px',
            width: null,
            shrinkToFit: false,
            gridview: true,
            ignoreCase: true,
            loadonce: true,
            //afterInsertRow: function (rowid, rowdata) {
            //            if (rowdata.PendingWith.indexOf(sessionStorage.UserName) > -1 && $.inArray(rowdata.MemoStatus, StatusCheck) > -1)
            //                    $('#tbl_masterqueue').jqGrid('setRowData', rowIds[i], false, { background: '#BA8564' });
            //                    else if (rowdata.PendingWith == '(SAC)' && sessionStorage.RoleID == 10 && $.inArray(rowdata.MemoStatus, StatusCheck) > -1)
            //                        $('#tbl_masterqueue').jqGrid('setRowData', rowIds[i], false, { background: '#BA8564' });
            //                    else if (rowdata.PendingWith == '(HOS)' && sessionStorage.RoleID == 7 && $.inArray(rowdata.MemoStatus, StatusCheck) > -1)
            //                            $('#tbl_masterqueue').jqGrid('setRowData', rowIds[i], false, { background: '#BA8564' });

            //                        //if (rowdata.PendingWith.indexOf(sessionStorage.UserName) > -1)
            //                            //    $("#tbl_masterqueue").jqGrid('setRowData', rowid, false, { background: '#BA8564' });
            //            //else if (rowdata.PendingWith == '(SAC)' && sessionStorage.RoleID == 10) {
            ////    $("#tbl_masterqueue").jqGrid('setRowData', rowid, false, { background: '#BA8564' });
            ////}
            //    //else if (rowdata.PendingWith == '(HOS)' && sessionStorage.RoleID == 7) {
            //    //    $("#tbl_masterqueue").jqGrid('setRowData', rowid, false, { background: '#BA8564' });
            //    //}
            //},
            gridview: true,
            rowattr: function (rowdata) {                
                if (rowdata.PendingWith && rowdata.PendingWith.indexOf(sessionStorage.UserName) > -1 && $.inArray(rowdata.MemoStatusDisplay, StatusCheck) > -1 && rowdata.isParentId == 1)
                    return { "class": "isPendingWithParentId" };
                else if (rowdata.PendingWith == '(SAC)' && sessionStorage.RoleID == 10 && $.inArray(rowdata.MemoStatusDisplay, StatusCheck) > -1 && rowdata.isParentId == 1)
                    return { "class": "isPendingWithParentId" };
                else if (rowdata.PendingWith == '(HOS)' && sessionStorage.RoleID == 7 && $.inArray(rowdata.MemoStatusDisplay, StatusCheck) > -1 && rowdata.isParentId == 1)
                    return { "class": "isPendingWithParentId" };

                else if (rowdata.PendingWith && rowdata.PendingWith.indexOf(sessionStorage.UserName) > -1 && $.inArray(rowdata.MemoStatusDisplay, StatusCheck) > -1)
                    return { "class": "isPendingWith" };
                else if (rowdata.PendingWith == '(SAC)' && sessionStorage.RoleID == 10 && $.inArray(rowdata.MemoStatusDisplay, StatusCheck) > -1)
                    return { "class": "isPendingWith" };
                else if (rowdata.PendingWith == '(HOS)' && sessionStorage.RoleID == 7 && $.inArray(rowdata.MemoStatusDisplay, StatusCheck) > -1)
                    return { "class": "isPendingWith" };

                else if (rowdata.isParentId == 1 && $.inArray(rowdata.MemoStatusDisplay, StatusCheck) > -1)
                     return { "class": "isParentId" };
                else if (rowdata.isParentId == 1 && sessionStorage.RoleID == 10 && $.inArray(rowdata.MemoStatusDisplay, StatusCheck) > -1)
                    return { "class": "isParentId" };
                else if (rowdata.isParentId == 1 && sessionStorage.RoleID == 7 && $.inArray(rowdata.MemoStatusDisplay, StatusCheck) > -1)
                    return { "class": "isParentId" };

            },
            loadError: function (xhr, st, err) {
                console.log(+ " Response: " + xhr.status + " " + xhr.statusText);
               
            },
            //loadComplete: function () {
            //    var rowIds = $('#tbl_masterqueue').jqGrid('getDataIDs');
            //    for (i = 0; i < rowIds.length; i++) {
            //        rowdata = $('#tbl_masterqueue').jqGrid('getRowData', rowIds[i]);
                   
            //    }
            //}
        }).jqGrid('filterToolbar', { searchOperators: true, stringResult: true, searchOnEnter: false, defaultSearch: "cn", multipleSearch: true });
        jQuery("#tbl_masterqueue").jqGrid('navGrid', '#pager', { add: false, edit: false, del: false, search: true, refresh: true },
                   {}, {}, {}, { multipleSearch: true, multipleGroup: true, showQuery: true });
    },

    ResetGrid: function ResetGrid() {
        sessionStorage.removeItem("DistributorCategoryMaster");
        sessionStorage.removeItem("ChannelCreateMaster");
        sessionStorage.removeItem("ARNCreateMaster");
        $('#tbl_masterqueue').jqGrid('clearGridData');
        $('#txt_arn').tokenInput('clear');
        $('#dd_dist_category').multiselect('clearSelection');
        $('#dd_channel').multiselect('clearSelection');
        $("#tbl_masterqueue").jqGrid('setGridParam', {
            datatype: 'json',
            page: 1,
            postData: {
                ArnNo: '', Channel: '', ARNName: '', DistributorCategory: '', Status: '1', MasterQueueStatus: '2', SearchFilter: Utility.ListSearchText, MemoLevel: '', UserID: sessionStorage.UserID
            }
        }).trigger('reloadGrid');
    },
    RefreshGrid: function RefreshGrid() {
        Utility.ListSearchText = '';
        $("#tbl_masterqueue").jqGrid('setGridParam', {
            datatype: 'json',
            page: 1,
            postData: {
                ArnNo: '', Channel: '', ARNName: '', DistributorCategory: '', Status: '1', MasterQueueStatus: '2', SearchFilter: Utility.ListSearchText, MemoLevel: '', UserID: sessionStorage.UserID
            }
        }).trigger('reloadGrid');
    }
};


$(function () {
    MasterQueue.BindGrid('', '', '', '', '1', '2', '', '', sessionStorage.UserID);
    $("#pager_left").css("width", "");
    MasterQueue.GetChannel("");
    MasterQueue.GetDistributorCategory("");
    MasterQueue.GetARN("");
    MasterQueue.GetARNName("");
    /// Master Queue Grid 
    var lastsel3;
    //jQuery("#tbl_masterqueue").jqGrid({
    //    datatype: "local",
    //    width: null,
    //    shrinkToFit: false,
    //    height: '510px',
    //    ignoreCase: true,
    //    //sortable: true,
    //    rowNum: 100,
    //    colNames: ['Select', 'Memoid', 'Memo Number', 'Memo Type', 'Memo Type ID', 'Category', 'ARN No', 'ARN Name', 'Date From', 'Date To', 'Status', 'Status', 'Raised By', 'Raised On', 'Time', 'Ageing', 'Last Action By', 'Pending With'],
    //    colModel: [
    //            { name: 'edi', index: 'edi', formatter: MasterQueue.ReturnRadioBox, width: '60px;', disabled: true, hidden: true, sortable: false },
    //             { name: 'PaymentMemoId', index: 'PaymentMemoId', width: 120, hidden: true, sortable: false, sorttype: 'integer', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
    //            { name: 'MemoNumber', index: 'MemoNumber', align: 'center', formatter: MasterQueue.ReturnSearchHyperLink, sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
    //            { name: 'MemoTypeName', index: 'MemoTypeName', width: 120, sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
    //            { name: 'MemoTypeID', index: 'MemoTypeID', hidden: true, sortable: false },
    //           { name: 'DistributorCategoryName', index: 'DistributorCategoryName', width: 260, sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
    //            { name: 'ARNNo', index: 'ARNNo', width: 95, sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
    //            { name: 'ARNName', index: 'ARNName', width: 260, sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
    //            { name: 'DateFrom', index: 'DateFrom', align: 'center', width: 105, sortable: true, sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
    //            { name: 'DateTo', index: 'DateTo', align: 'center', width: 105, sortable: true, sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
    //            { name: 'MemoStatus', index: 'MemoStatus', align: 'center', width: 90, hidden: true, sortable: false },
    //             { name: 'MemoStatusDisplay', index: 'MemoStatusDisplay', align: 'center', width: 90, sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
    //            { name: 'CreatedByName', index: 'CreatedByName', align: 'left', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
    //            { name: 'RaisedOnDate', index: 'RaisedOnDate', width: 105, align: 'center', sortable: true, sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
    //            { name: 'RaisedOnTime', index: 'RaisedOnTime', width: 50, align: 'center', sortable: false, search: false },
    //            { name: 'Ageing', index: 'Ageing', width: 100, align: 'right', sortable: false, sorttype: 'integer', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
    //            { name: 'ModifiedByName', index: 'ModifiedByName', align: 'left', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
    //            { name: 'PendingWith', index: 'PendingWith', align: 'left', sortable: false, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
    //    ],
    //    sortorder: "desc",
    //    onSelectRow: function (id) {
    //        if (id && id !== lastsel3) {
    //            jQuery('#tbl_masterqueue').jqGrid('restoreRow', lastsel3);
    //            lastsel3 = id;
    //        }
    //    },
    //    afterInsertRow: function (rowid, rowdata) {
    //        if (rowdata.PendingWith.indexOf(sessionStorage.UserName) > -1 && $.inArray(rowdata.MemoStatus, StatusCheck) > -1)
    //            $('#tbl_masterqueue').jqGrid('setRowData', rowIds[i], false, { background: '#BA8564' });
    //        else if (rowdata.PendingWith == '(SAC)' && sessionStorage.RoleID == 10 && $.inArray(rowdata.MemoStatus, StatusCheck) > -1)
    //            $('#tbl_masterqueue').jqGrid('setRowData', rowIds[i], false, { background: '#BA8564' });
    //        else if (rowdata.PendingWith == '(HOS)' && sessionStorage.RoleID == 7 && $.inArray(rowdata.MemoStatus, StatusCheck) > -1)
    //            $('#tbl_masterqueue').jqGrid('setRowData', rowIds[i], false, { background: '#BA8564' });

    //        //if (rowdata.PendingWith.indexOf(sessionStorage.UserName) > -1)
    //        //    $("#tbl_masterqueue").jqGrid('setRowData', rowid, false, { background: '#BA8564' });
    //        //else if (rowdata.PendingWith == '(SAC)' && sessionStorage.RoleID == 10) {
    //        //    $("#tbl_masterqueue").jqGrid('setRowData', rowid, false, { background: '#BA8564' });
    //        //}
    //        //else if (rowdata.PendingWith == '(HOS)' && sessionStorage.RoleID == 7) {
    //        //    $("#tbl_masterqueue").jqGrid('setRowData', rowid, false, { background: '#BA8564' });
    //        //}
    //    },

    //}).jqGrid('filterToolbar', { searchOperators: true, stringResult: true, searchOnEnter: false, defaultSearch: "cn", multipleSearch: true });


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
                { name: '', index: '', align: 'center', formatter: MasterQueue.ReturnViewRemarksHyperLink, sortable: false },
                { name: 'IsRequired', index: 'IsRequired', hidden: true, sortable: false },
                 { name: 'PaymentMemoId', index: 'PaymentMemoId', hidden: true, sortable: false },
                { name: 'PaymentListId', index: 'PaymentListId', hidden: true, sortable: false },
                //{ name: 'Remarks', index: 'Remarks', width: 150, editable: false, colSpan: 2, sortable: false }
        ],
        afterInsertRow: function (rowid, rowdata) {
            /////Get selected ARN/////////
            var token = $("#txt_arn").tokenInput("get");
            var names = [];
            $.each(token, function (i, obj) {
                names.push(obj.name);//build an array of just the names
            });
            for (var i = 0; i < names.length; i++) {
                if (rowdata.ARNNo == names[i])
                    $("#grid_sub_processing").jqGrid('setRowData', rowid, false, { background: '#01DF01' });
            }
        },
       
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

    var DistributorCategoryMaster = sessionStorage.getItem("DistributorCategoryMaster") == null ? "" : sessionStorage.getItem("DistributorCategoryMaster").split(",");
    var ChannelCreateMaster = sessionStorage.getItem("ChannelCreateMaster") == null ? "" : sessionStorage.getItem("ChannelCreateMaster").split(",");
    var ARNCreateMaster = sessionStorage.getItem("ARNCreateMaster") == null ? "" : sessionStorage.getItem("ARNCreateMaster").split(",");

    $('#txt_arn').tokenInput('clear');
    $('#dd_dist_category').multiselect('clearSelection');
    $('#dd_channel').multiselect('clearSelection');
    if (ARNCreateMaster != null) {
        for (var i = 0; i < ARNCreateMaster.length ; i++) {
            $.each(MasterQueue.arns, function (key, value) {
                if (value.name == ARNCreateMaster[i]) {
                    $("#txt_arn").tokenInput("add", { id: value.id, name: value.name });
                }
            });
        }
    }

    if (DistributorCategoryMaster != null) {
        for (var i = 0; i < DistributorCategoryMaster.length; i++) {
            if (DistributorCategoryMaster[i] != "") {
                $('#dd_dist_category').multiselect('select', DistributorCategoryMaster[i]);
            }
        }
    }


    if (ChannelCreateMaster != null) {
        for (var i = 0; i < ChannelCreateMaster.length; i++) {
            if (ChannelCreateMaster[i] != "") {
                $('#dd_channel').multiselect('select', ChannelCreateMaster[i]);
            }
        }
    }

    MasterQueue.ViewMasterQueue();
});