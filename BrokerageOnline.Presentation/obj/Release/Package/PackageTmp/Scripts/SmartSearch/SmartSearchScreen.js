var SmartScreenSearch = {
    TempArns: [],

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
                enableCaseInsensitiveFiltering: true
            });
            $('#dd_channel').multiselect('clearSelection');
        });
    },

    GetARN: function () {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARN', JSON.stringify({ SearchText: "", SubregionID: 0 }), "json", false, false, function (result) {

            SmartScreenSearch.TempArns = [];
            SmartScreenSearch.TempArns = JSON.parse(result.GetARNResult);

            $("#txt_arn_info").empty();
            $(".token-input-list-facebook").remove();
            $("#txt_arn_info").tokenInput(
            SmartScreenSearch.TempArns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {

                    var token = $("#txt_arn_info").tokenInput("get");
                    var names = [];
                    $.each(token, function (i, obj) {
                        names.push(obj.name);//build an array of just the names
                    });
                    SmartScreenSearch.GetDistributor(item.id, 'add');
                },
                onDelete: function (item) {
                    SmartScreenSearch.GetDistributor(item.id, 'remove');
                }
            });

            $('#dd_arn').multiselect('clearSelection');
        });
    },

    GetARNName: function () {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARNName', JSON.stringify({ SearchText: "", SubregionID: 0 }), "json", false, false, function (result) {
            var TempArn_Names = [];
            TempArn_Names = JSON.parse(result.GetARNNameResult);

            $("#txt_arn_name_info").empty();
            $("#txt_arn_name_info").tokenInput(
            TempArn_Names,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    var token = $("#txt_arn_name_info").tokenInput("get");
                    var names = [];
                    $.each(token, function (i, obj) {
                        names.push(obj.name);//build an array of just the names
                    });
                    SmartScreenSearch.LoadinfoARNToken(item.id, 'add', item.id);
                },

                onDelete: function (item) {
                    SmartScreenSearch.LoadinfoARNToken(item.id, 'remove', item.id);
                }
            });
        });
    },

    LoadinfoARNToken: function (SearchText, mode, id) {
        if (mode == 'add') {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributor', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                var Data = result.GetDistributorResult;
                $.each($("#txt_arn_info").tokenInput("get"), function (i, obj) {
                    if (obj.id == SearchText) {
                        return;
                    }
                });

                $.each(Data, function (i, obj) {
                    if (obj.DistributorId == SearchText) {
                        $("#txt_arn_info").tokenInput("add", { id: obj.DistributorId, name: obj.ARN });
                    }
                });
            });
        }
        else {
            $("#txt_arn_info").tokenInput("remove", { id: id });
        }

    },

    GetDistributor: function (SearchText, mode) {
        if (mode == 'add') {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChildArn', JSON.stringify({ ArnNo: SearchText }), "json", false, false, function (result) {
                var Data = result.GetChildArnResult;
                if (Data.length == 1) {
                    $("#txt_arn_name_info").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });
                }
                else {
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributor', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                        var Data = result.GetDistributorResult;
                        // For Set ARN Name
                        $.each($("#txt_arn_name_info").tokenInput("get"), function (i, obj) {
                            if (obj.id == Data[0].DistributorId) {
                                return;
                            }
                        });

                        $("#txt_arn_name_info").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });
                    });
                }
            });
        }
        else {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributor', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                var Data = result.GetDistributorResult;
                $("#txt_arn_name_info").tokenInput("remove", { id: Data[0].DistributorId });
            });
        }
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
                enableCaseInsensitiveFiltering: true
            });
            $('#dd_dist_category').multiselect('clearSelection');
        });
    },

    LoadZone: function () {
        Utility.ServiceCall("POST", 'MasterService.svc/Getzoneandregion', JSON.stringify({ SearchText: 'zone' }), "json", false, false, function (result) {
            var data = result.GetzoneandregionResult;
            $("#dd_zone").multiselect('destroy');
            $("#dd_zone").empty();
            for (var i = 0; i < data.length; i++) {
                $("<option />").text(data[i].ZoneName).val(data[i].ZoneId).appendTo("#dd_zone");
            }

            $('#dd_zone').attr("multiple", "multiple");
            $('#dd_zone').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true
            });

            $('#dd_zone').multiselect('clearSelection');
        });
    },

    GetSubRegion: function () {
        Utility.ServiceCall("POST", 'MasterService.svc/GetBranchMaster', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            var arrItems = result.GetBranchMasterResult;
            $("#dd_branch").multiselect('destroy');
            $("#dd_branch").empty();
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].BranchName).val(arrItems[i].BranchId).appendTo('#dd_branch');
            }

            $('#dd_branch').attr("multiple", "multiple");
            $('#dd_branch').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true
            });
            $('#dd_branch').multiselect('clearSelection');
        });
    },

    GetMemoTypes: function (MemoParentID) {
        Utility.ServiceCall("POST", 'AdHocService.svc/GetMemoTypes', JSON.stringify({ MemoParentID: parseInt(MemoParentID) }), "json", false, false, function (result) {
            var arrItems = result.GetMemoTypesResult;

            $("#dd_memo_type").multiselect('destroy');
            $("#dd_memo_type").empty();
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].MemoTypeName).val(arrItems[i].MemoTypeId).appendTo('#dd_memo_type');
            }

            $('#dd_memo_type').attr("multiple", "multiple");
            $('#dd_memo_type').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true
            });
            $('#dd_memo_type').multiselect('clearSelection');

        });
    },

    GetSchemeCategory: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeCategory', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            var arrItems = result.GetSchemeCategoryResult;
            $("#dd_Scheme_category").multiselect('destroy');
            $("#dd_Scheme_category").empty();
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeCategoryName).val(arrItems[i].SchemeCategoryId).appendTo("#dd_Scheme_category");
            }
            $('#dd_Scheme_category').attr("multiple", "multiple");

            $('#dd_Scheme_category').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true
            });
            $('#dd_Scheme_category').multiselect('clearSelection');
        });
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
            });
            $('#dd_Scheme').multiselect('clearSelection');
        });
    },

    LoadUsers: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetUserView', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var arrItems = result.GetUserViewResult;

            $("#dd_Created_By").multiselect('destroy');
            $("#dd_Created_By").empty();
            for (var i = 0; i < arrItems.length; i++) {
                if (arrItems[i].FullName != '')
                    $("<option />").text(arrItems[i].FullName).val(arrItems[i].UserId).appendTo('#dd_Created_By');
            }
            $('#dd_Created_By').attr("multiple", "multiple");

            $('#dd_Created_By').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
            });
            $('#dd_Created_By').multiselect('clearSelection');
        });
    },

    RefreshControls: function () {
        $("#dt_from").val('');
        $("#dt_to").val('');
        $("#txt_arn_info").tokenInput('clear');
        $('#dd_channel').multiselect('clearSelection');
        $('#dd_dist_category').multiselect('clearSelection');
        $('#dd_Scheme_category').multiselect('clearSelection');
        $('#dd_Scheme').multiselect('clearSelection');
        $('#dd_zone').multiselect('clearSelection');
        $('#dd_branch').multiselect('clearSelection');
        $('#dd_memo_type').multiselect('clearSelection');
        $('#dd_Memo_status').multiselect('clearSelection');
        $('#dd_Created_By').multiselect('clearSelection');
        $('#grid_search_result').jqGrid('clearGridData');
    },

    DefaultControlSelect: function () {

        $("#dt_from").val('');
        $("#dt_to").val('');

        $('#dd_dist_category').multiselect({
            includeSelectAllOption: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true
        });

        $('#dd_Scheme').multiselect({
            includeSelectAllOption: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true
        });

        $('#dd_branch').multiselect({
            includeSelectAllOption: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true
        });

        var arrItems = ['Saved', 'Initiated', 'Reviewed', 'Approved', 'Discarded', 'Active', 'In-Active', 'Deleted'];
        $("#dd_Memo_status").multiselect('destroy');
        $("#dd_Memo_status").empty();
        for (var i = 0; i < arrItems.length; i++) {
            if (arrItems[i].FullName != '')
                $("<option />").text(arrItems[i]).val(arrItems[i]).appendTo('#dd_Memo_status');
        }
        $('#dd_Memo_status').attr("multiple", "multiple");

        $('#dd_Memo_status').multiselect({
            includeSelectAllOption: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true
        });
        $('#dd_Memo_status').multiselect('clearSelection');
    },

    SearchSmartScreenDetails: function () {
        var Channel, DistributorCategory, ARN, SchemeCategory, Scheme, Zone, Branch, MemoType, MemoStatus, PeriodFrom, PeriodTo, CreatedBy;



        //sessionStorage.setItem("IsmainmenuClicked", false);


        Channel = Utility.ReturnSelectedValue('dd_channel');
        DistributorCategory = Utility.ReturnSelectedValue('dd_dist_category');
        SchemeCategory = Utility.ReturnSelectedValue('dd_Scheme_category');
        Scheme = Utility.ReturnSelectedValue('dd_Scheme');
        Zone = Utility.ReturnSelectedValue('dd_zone');
        Branch = Utility.ReturnSelectedValue('dd_branch');
        MemoType = Utility.ReturnSelectedValue('dd_memo_type');
        MemoStatus = Utility.ReturnSelectedValue('dd_Memo_status');
        CreatedBy = Utility.ReturnSelectedValue('dd_Created_By');

        /////Get selected ARN/////////
        var token = $("#txt_arn_info").tokenInput("get");
        var names = [];
        $.each(token, function (i, obj) {
            names.push(obj.name);//build an array of just the names
        });
        ARN = names.toString();


        PeriodFrom = $("#dt_from").val();
        PeriodTo = $("#dt_to").val();


        sessionStorage.setItem("SS_Channel", Channel);
        sessionStorage.setItem("SS_DistributorCategory", DistributorCategory);
        sessionStorage.setItem("SS_SchemeCategory", SchemeCategory);
        sessionStorage.setItem("SS_Scheme", Scheme);
        sessionStorage.setItem("SS_Zone", Zone);
        sessionStorage.setItem("SS_Branch", Branch);
        sessionStorage.setItem("SS_MemoType", MemoType);
        sessionStorage.setItem("SS_MemoStatus", MemoStatus);
        sessionStorage.setItem("SS_CreatedBy", CreatedBy);
        sessionStorage.setItem("SS_ARN", ARN);
        sessionStorage.setItem("SS_PeriodFrom", PeriodFrom);
        sessionStorage.setItem("SS_PeriodTo", PeriodTo);


        SmartScreenSearch.GetSmartSearchDetails(Channel, DistributorCategory, ARN, SchemeCategory, Scheme, Zone, Branch, MemoType, MemoStatus, PeriodFrom, PeriodTo, CreatedBy);
        //$('#grid_search_result').trigger("reloadGrid");
    },

    // Service call to Load Grid Values

    GetSmartSearchDetails: function (Channel, DistributorCategory, ARN, SchemeCategory, Scheme, Zone, Branch, MemoType, MemoStatus, PeriodFrom, PeriodTo, CreatedBy) {
        Utility.ServiceCall("POST", 'MasterService.svc/GetSmartSearchScreen', JSON.stringify({ Channel: Channel, DistributorCategory: DistributorCategory, ARN: ARN, SchemeCategory: SchemeCategory, Scheme: Scheme, Zone: Zone, Branch: Branch, MemoType: MemoType, MemoStatus: MemoStatus, PeriodFrom: PeriodFrom, PeriodTo: PeriodTo, CreatedBy: CreatedBy, SearchFilter: Utility.ListSearchText }), "json", false, false, function (result) {
            var arrItems = result.GetSmartSearchScreenResult;
            $('#grid_search_result').jqGrid('clearGridData');
            if (arrItems != undefined && arrItems.length > 0) {
                for (var i = 0; i < arrItems.length; i++)
                    jQuery("#grid_search_result").jqGrid('addRowData', arrItems[i].id, arrItems[i]);

                jQuery("#grid_search_result").closest(".ui-jqgrid-bdiv").scrollTop(0);
            }
            else
                Utility.writeNotification("error", "Sorry, No Records Found.", "", true);
        });
    },


    ExportToExcel: function () {
        ExportToExcel.ExportJQGridDataToExcel("#grid_search_result", "SmartSearchRecords.xls");
    },

    ReturnSSDetailHyperLink: function (cellValue, options, rowdata, action) {
        sessionStorage.CurrentMenuselected = "nav_information";
        switch (rowdata.MemoTypeId) {
            case 1:
                if (rowdata.MemoStatusName == "Saved") {
                    sessionStorage.CurrentMenuselected = "nav_initiate";
                    return "<a href='./RackRateInitiate.html?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatusName + "&ptype=ss' style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'>" + rowdata.MemoNumber + "</a>";
                }
                else {
                    sessionStorage.CurrentMenuselected = "nav_information";
                    return "<a href='./RackRateReview.html?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatusName + "&ptype=ss' style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'>" + rowdata.MemoNumber + "</a>";
                }
                break;
            case 2:
                return "<a href='./TieUpInformation.html?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatusName + "&ptype=ss' style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'>" + rowdata.MemoNumber + "</a>";
                break;
            case 5:
                return "<a href='./SIPInformation.html?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatusName + "&ptype=ss' style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'>" + rowdata.MemoNumber + "</a>";
                break;
            default:
                if (rowdata.MemoTypeId == 3 || rowdata.MemoTypeId == 4)
                    return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"SmartScreenSearch.PaymentDetail(' + rowdata.PaymentListId + ',' + rowdata.AdhocBatchID + ',' + rowdata.MemoTypeId + ');\">' + rowdata.MemoNumber + '</a>';
                else
                    return rowdata.MemoNumber;
                break;
        }
    },

    PaymentDetail: function (PaymentListId, AdhocBatchID, MemoTypeId) {
        var AdhocStatus = '';

        if (AdhocBatchID == 0)
            AdhocStatus = 'SmartSearch';

        Utility.ServiceCall("POST", 'AdHocService.svc/GetAdHocDetails', JSON.stringify({ PaymentTypeID: PaymentListId, AdhocStatus: AdhocStatus, AdhocBatchID: AdhocBatchID, CreatedByID: 0 }), "json", false, false, function (result) {
            var arrItems = result.GetAdHocDetailsResult;
            $('#grid_sub_processing').jqGrid('clearGridData');
            if (arrItems != undefined && arrItems.length > 0) {
                for (var i = 0; i < arrItems.length; i++)
                    jQuery("#grid_sub_processing").jqGrid('addRowData', parseInt(i + 1), arrItems[i]);

                $('#modal_adhoc_payment_record').modal('show');
            }
        });
    },

    SetControlValues: function (Channel, DistributorCategory, ARN, SchemeCategory, Scheme, Zone, Branch, MemoType, MemoStatus, PeriodFrom, PeriodTo, CreatedBy) {

        var Arnselected = ARN != null ? ARN.split(",") : '';
        var ChannelSelected = Channel != null ? Channel.split(",") : '';
        var DistributorCategorySelected = DistributorCategory != null ? DistributorCategory.split(",") : '';
        var SchemeCategorySelected = SchemeCategory != null ? SchemeCategory.split(",") : '';
        var SchemeSelected = Scheme != null ? Scheme.split(",") : '';
        var ZoneSelected = Zone != null ? Zone.split(",") : '';
        var BranchSelected = Branch != null ? Branch.split(",") : '';
        var MemoTypeSelected = MemoType != null ? MemoType.split(",") : '';
        var MemoStatusSelected = MemoStatus != null ? MemoStatus.split(",") : '';
        var CreatedBySelected = CreatedBy != null ? CreatedBy.split(",") : '';

        $("#dt_from").val(PeriodFrom);
        $("#dt_to").val(PeriodTo);

        $('#txt_arn_info').tokenInput('clear');
        $('#dd_channel').multiselect('clearSelection');
        $('#dd_dist_category').multiselect('clearSelection');
        $('#dd_Scheme_category').multiselect('clearSelection');
        $('#dd_Scheme').multiselect('clearSelection');
        $('#dd_zone').multiselect('clearSelection');
        $('#dd_branch').multiselect('clearSelection');
        $('#dd_memo_type').multiselect('clearSelection');
        $('#dd_Memo_status').multiselect('clearSelection');
        $('#dd_Created_By').multiselect('clearSelection');

        if (Arnselected != null) {
            for (var i = 0; i < Arnselected.length ; i++) {
                $.each(SmartScreenSearch.TempArns, function (key, value) {
                    if (value.name == Arnselected[i]) {
                        $("#txt_arn_info").tokenInput("add", { id: value.id, name: value.name });
                    }
                });
            }
        }

        if (ChannelSelected != null) {
            for (var i = 0; i < ChannelSelected.length; i++) {
                if (ChannelSelected[i] != "") {
                    $('#dd_channel').multiselect('select', ChannelSelected[i]);
                }
            }
        }
        if (DistributorCategorySelected != null) {
            for (var i = 0; i < DistributorCategorySelected.length; i++) {
                if (DistributorCategorySelected[i] != "") {
                    $('#dd_dist_category').multiselect('select', DistributorCategorySelected[i]);
                }
            }
        }
        if (SchemeCategorySelected != null) {
            for (var i = 0; i < SchemeCategorySelected.length; i++) {
                if (SchemeCategorySelected[i] != "") {
                    $('#dd_Scheme_category').multiselect('select', SchemeCategorySelected[i]);
                }
            }
        }
        if (SchemeSelected != null) {
            for (var i = 0; i < SchemeSelected.length; i++) {
                if (SchemeSelected[i] != "") {
                    $('#dd_Scheme').multiselect('select', SchemeSelected[i]);
                }
            }
        }
        if (ZoneSelected != null) {
            for (var i = 0; i < ZoneSelected.length; i++) {
                if (ZoneSelected[i] != "") {
                    $('#dd_zone').multiselect('select', ZoneSelected[i]);
                }
            }
        }

        if (BranchSelected != null) {
            for (var i = 0; i < BranchSelected.length; i++) {
                if (BranchSelected[i] != "") {
                    $('#dd_branch').multiselect('select', BranchSelected[i]);
                }
            }
        }

        if (MemoTypeSelected != null) {
            for (var i = 0; i < MemoTypeSelected.length; i++) {
                if (MemoTypeSelected[i] != "") {
                    $('#dd_memo_type').multiselect('select', MemoTypeSelected[i]);
                }
            }
        }

        if (MemoStatusSelected != null) {
            for (var i = 0; i < MemoStatusSelected.length; i++) {
                if (MemoStatusSelected[i] != "") {
                    $('#dd_Memo_status').multiselect('select', MemoStatusSelected[i]);
                }
            }
        }
        if (CreatedBySelected != null) {
            for (var i = 0; i < CreatedBySelected.length; i++) {
                if (CreatedBySelected[i] != "") {
                    $('#dd_Created_By').multiselect('select', CreatedBySelected[i]);
                }
            }
        }

    },

    ReturnViewRemarksHyperLink: function (cellValue, options, rowdata, action) {
        return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"SmartScreenSearch.AdHocPaymentDetail(' + rowdata.PaymentListId + ');\">View Remarks</a>';
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

    //*************************************************************Mail and Print ********************************************************

    LoadMailingList: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetMailingListMaster', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetMailingListMasterResult;
            for (var i = 0; i < data.length; i++) {
                $("<option />").text(data[i].ListName).val(data[i].MailingListId).appendTo("#dd_mailing_list");
            }
        });
    },

    mailingListOnchange: function (e) {
        var val = $(e).val();
        $('#txt_cc').tokenInput('clear');
        $('#txt_bcc').tokenInput('clear');
        $('#txt_to').tokenInput('clear');
        Utility.ServiceCall("POST", 'MasterService.svc/GetMailingListMaster', JSON.stringify({ SearchText: val }), "json", false, false, function (result) {
            var data = result.GetMailingListMasterResult;

            var toemail = data[0].EmailTo.split(',');
            $.each(toemail, function (key, value) {
                if (value != "") {
                    $("#txt_to").tokenInput("add", { id: value, name: value });
                }
            });

            var ccemail = data[0].EmailCC.split(',');
            $.each(ccemail, function (key, value) {
                if (value != "") {
                    $("#txt_cc").tokenInput("add", { id: value, name: value });
                }
            });

            var ccemail = data[0].EmailBCC.split(',');
            $.each(ccemail, function (key, value) {
                if (value != "") {
                    $("#txt_bcc").tokenInput("add", { id: value, name: value });
                }
            });
        });
    },

    Viewtoccusers: function () {
        var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
        var selectedmemos = [];
        if (gridData.length > 0) {

            $('#modal_select_to_cc').modal('show');
            SmartScreenSearch.GetTOCCusers('');
        }
        else {
            Utility.writeNotification("error", "Select Memo to  Send Email", "", true);
        }
    },

    GetTOCCusers: function (SearchText) {

        $("#txt_to").siblings("ul").remove();//.removeClass("token-input-list-facebook")
        $("#txt_cc").siblings("ul").remove();
        $("#txt_bcc").siblings("ul").remove();
        var memocntsplit = SearchText.split(',');
        SearchText = memocntsplit[0];
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/getmailinglistobject', JSON.stringify({ SearchText: SearchText, Module: "adhoc" }), "json", false, false, function (result) {
            var arrItems = [];
            $("#txt_to").empty();
            arrItems = JSON.parse(result.getmailinglistobjectResult);
            $("#txt_to").tokenInput(
            arrItems,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10, allowFreeTagging: true
            });
        });
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/getmailinglistobject', JSON.stringify({ SearchText: "", Module: "adhoc" }), "json", false, false, function (result) {
            var arrItemsCC = [];
            $("#txt_cc").empty();
            $("#txt_bcc").empty();
            arrItemsCC = JSON.parse(result.getmailinglistobjectResult);
            $("#txt_cc").tokenInput(
            arrItemsCC,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10, allowFreeTagging: true
            });

            $("#txt_bcc").tokenInput(
           arrItemsCC,
           {
               theme: "facebook", preventDuplicates: true, resultsLimit: 10, allowFreeTagging: true
           });
        });

        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorEmail', JSON.stringify({ SearchText: SearchText, Module: "adhoc" }), "json", false, false, function (result) {
            var arrItems = [];
            arrItems = JSON.parse(result.GetDistributorEmailResult);
            $.each(arrItems, function (key, value) {
                $("#txt_to").tokenInput("add", { id: value.id, name: value.name });
            });
        });

    },

    PrintDetails: function () {
        //if ($('#dt_from').val() != "" && $('#dt_to').val() != "") {

        var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
        if (gridData.length > 0) {
            var param = SmartScreenSearch.GetSmartSheetURL();
            Utility.openWin(param);
        }
        else {
            Utility.writeNotification("error", "Select Memo to Print", "", true);
        }
        //}
        //else {
        //    Utility.writeNotification("warning", "Enter Date From and Date To", "", true);
        //}
    },


    GetSmartSheetURL: function () {
        var param = "";
        param = Utility.SmartSheetReportURL;
        var Channel, DistributorCategory, ARN, SchemeCategory, Scheme, Zone, Branch, MemoType, MemoStatus, PeriodFrom, PeriodTo, CreatedBy;

        Channel = Utility.ReturnSelectedValue('dd_channel');
        DistributorCategory = Utility.ReturnSelectedValue('dd_dist_category');
        SchemeCategory = Utility.ReturnSelectedValue('dd_Scheme_category');
        Scheme = Utility.ReturnSelectedValue('dd_Scheme');
        Zone = Utility.ReturnSelectedValue('dd_zone');
        Branch = Utility.ReturnSelectedValue('dd_branch');
        MemoType = Utility.ReturnSelectedValue('dd_memo_type');
        MemoStatus = Utility.ReturnSelectedValue('dd_Memo_status');
        CreatedBy = Utility.ReturnSelectedValue('dd_Created_By');

        /////Get selected ARN/////////
        var token = $("#txt_arn_info").tokenInput("get");
        var names = [];
        $.each(token, function (i, obj) {
            names.push(obj.name);//build an array of just the names
        });
        ARN = names.toString();
        var from = "";
        var to = "";

        var datefrom = $('#dt_from').val().split('/');
        var dateto = $('#dt_to').val().split('/');
        if (datefrom.length > 1)
            from = '20' + datefrom[2] + '-' + datefrom[1] + '-' + datefrom[0];
        if (dateto.length > 1)
            to = '20' + dateto[2] + '-' + dateto[1] + '-' + dateto[0];
        param += '&From_P=' + from + '&To_P=' + to;

        param += '&' + Utility.GetReportQuery('Distcat_P', DistributorCategory);
        param += '&' + Utility.GetReportQuery('Chnl_P', Channel);
        param += '&' + Utility.GetReportQuery('Arn_P', ARN);
        param += '&' + Utility.GetReportQuery('Schemecat_P', SchemeCategory);
        param += '&' + Utility.GetReportQuery('Scheme_P', Scheme);
        param += '&' + Utility.GetReportQuery('Zone_P', Zone);
        param += '&' + Utility.GetReportQuery('Branch_P', Branch);
        param += '&' + Utility.GetReportQuery('Memotype_P', MemoType);
        param += '&' + Utility.GetReportQuery('Memostatus_P', MemoStatus);
        param += '&' + Utility.GetReportQuery('Createdby_P', CreatedBy);

        param += '&output-target=pageable%2Fpdf&userid=joe&password=password';

        return param;
    },

    remove_tags: function (html) {
        return jQuery(html).text();
    },

    openWin: function (url) {
        //var myWindow = window.open(url, '_blank');
        sessionStorage.reportURL = url;
        var myWindow = window.open("ReportViewer.html", '_blank');
    },

    //************************************************************************************************************************************

    //********************************************************************************** Advance Search  **********************************************************************************

    AdvanceSearchClick: function () {
        var pSearch = {
            multipleSearch: true,
            multipleGroup: true,
            showQuery: true,
            recreateFilter: true
        };
        jQuery("#grid_search_result").jqGrid('searchGrid', pSearch);
    },

    RefreshAdvanceSearchDetails: function () {
        Utility.ListSearchText = '';
        SmartScreenSearch.SearchSmartScreenDetails();
    },
};


$(function () {

    SmartScreenSearch.GetChannel('');
    SmartScreenSearch.GetDistributorCategory('');
    SmartScreenSearch.LoadZone();
    SmartScreenSearch.GetARN();
    SmartScreenSearch.GetSubRegion();
    SmartScreenSearch.LoadUsers();
    SmartScreenSearch.GetMemoTypes(0);
    SmartScreenSearch.GetSchemeCategory('');
    SmartScreenSearch.GetScheme('');
    SmartScreenSearch.DefaultControlSelect();
    SmartScreenSearch.GetARNName();

    //sessionStorage.setItem("IsmainmenuClicked", false);


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
            $("#dt_to").datepicker("option", "minDate", selectedDate);
        }
    });

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
        height: 300,
        width: null,
        shrinkToFit: false,
        //colNames: ['S.No.', 'Memo Number', 'ARN No.', 'ARN Name', 'Distributor Category', 'Scheme Category', 'Scheme', 'Channel', 'Date From', 'Date To', 'Zone', 'Branch', 'Memo Type', 'Memo Status', 'Created By', 'PaymentListId', 'AdhocBatchID', 'MemoTypeId'],
        colNames: ['MemoNumber', 'ARNNo.', 'ARNName', 'DistributorCategory', 'SchemeCategory', 'Scheme', 'Channel', 'DateFrom', 'DateTo', 'Zone', 'Branch', 'MemoType', 'MemoStatus', 'CreatedBy', 'PaymentMemoId', 'PaymentListId', 'AdhocBatchID', 'MemoTypeId'],
        colModel: [
                //{ name: 'SerialNo', index: 'SerialNo', width: 70, align: 'center' },
                { name: 'MemoNumber', width: 150, index: 'MemoNumber', align: 'center', formatter: SmartScreenSearch.ReturnSSDetailHyperLink, sortable: false },
                { name: 'ARNNo', width: 90, index: 'ARNNo', sortable: false },
                { name: 'ARNName', width: 250, index: 'ARNName', sortable: false },
                { name: 'DistributorCategoryName', width: 190, index: 'DistributorCategoryName', sortable: false },
                { name: 'SchemeCategoryName', width: 150, index: 'SchemeCategoryName', sortable: false },
                { name: 'SchemeName', width: 250, index: 'SchemeName', sortable: false },
                { name: 'ChannelName', width: 100, index: 'ChannelName', sortable: false },
                { name: 'DateFrom', width: 120, index: 'DateFrom', align: 'center', sortable: false },
                { name: 'DateTo', width: 110, index: 'DateTo', align: 'center', sortable: false },
                { name: 'ZoneName', index: 'ZoneName', width: 100, sortable: false },
                { name: 'SubRegionName', index: 'SubRegionName', width: 100, sortable: false },
                { name: 'MemoTypeName', index: 'MemoTypeName', width: 210, sortable: false },
                { name: 'MemoStatusName', index: 'MemoStatusName', width: 100, sortable: false },
                { name: 'RaisedByName', index: 'RaisedByName', sortable: false },
                { name: 'PaymentMemoId', index: 'PaymentMemoId', hidden: true, sortable: false },
                { name: 'PaymentListId', index: 'PaymentListId', hidden: true, sortable: false },
                { name: 'AdhocBatchID', index: 'AdhocBatchID', hidden: true, sortable: false },
                { name: 'MemoTypeId', index: 'MemoTypeId', hidden: true, sortable: false }

        ],
    });
    //SmartScreenSearch.GetSmartSearchDetails('','','','','','','','','','','','');


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
                { name: '', index: '', align: 'center', formatter: SmartScreenSearch.ReturnViewRemarksHyperLink, sortable: false },
                { name: 'IsRequired', index: 'IsRequired', hidden: true, sortable: false },
                 { name: 'PaymentMemoId', index: 'PaymentMemoId', hidden: true, sortable: false },
                { name: 'PaymentListId', index: 'PaymentListId', hidden: true, sortable: false },
                //{ name: 'Remarks', index: 'Remarks', width: 150, editable: false, colSpan: 2, sortable: false }
        ],
        afterInsertRow: function (rowid, rowdata) {
            if (rowdata.IsRequired == false)
                $("#grid_sub_processing").jqGrid('setRowData', rowid, false, { background: '#FF5050' });


            /////Get selected ARN/////////
            var token = $("#txt_arn_info").tokenInput("get");
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

    $("#btn_send_email").click(function () {
        ////////Load Category, Scheme, Upfront Brokerage and Addtional Upfront/////////////
        var Tousers = "";
        var token = $("#txt_to").tokenInput("get");
        var Tonames = [];

        $.each(token, function (i, obj) {
            Tonames.push(obj.name);//build an array of just the names
        });
        Tousers = Tonames.toString();


        var CCusers = "";
        var tokenCC = $("#txt_cc").tokenInput("get");
        var CCnames = [];

        $.each(tokenCC, function (i, obj) {
            CCnames.push(obj.name);
        });
        CCusers = CCnames.toString();

        var BCCusers = "";
        var tokenBCC = $("#txt_bcc").tokenInput("get");
        var BCCnames = [];

        $.each(tokenBCC, function (i, obj) {
            BCCnames.push(obj.name);
        });
        BCCusers = BCCnames.toString();

        var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (Tousers != "") {
                    var fileurl = SmartScreenSearch.GetSmartSheetURL();
                    var filename = "Smart_Search_Sheet_Details";

                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/SendEmailMemo', JSON.stringify({ fileurl: fileurl, filename: filename, sendto: Tousers, sendcc: CCusers, typeval: 1, ModuleID: 1, MailStatus: "", sendbcc: BCCusers }), "json", false, false, function (result) {
                        Utility.writeNotification("success", "Memo Emailed Successfully", "", true);
                    });
                    $('#modal_select_to_cc').modal('hide');
                }
                else {
                    Utility.writeNotification("error", "Please select atlease one TO User", "", true);
                }
            }
        }
        else {
            Utility.writeNotification("error", "Select Memo to  Send Email", "", true);
        }

    });

    if (sessionStorage.SmartSearchScreen != undefined && sessionStorage.SmartSearchScreen == "ss") {

        var Channel, DistributorCategory, ARN, SchemeCategory, Scheme, Zone, Branch, MemoType, MemoStatus, PeriodFrom, PeriodTo, CreatedBy;

        Channel = sessionStorage.SS_Channel;
        DistributorCategory = sessionStorage.SS_DistributorCategory;
        SchemeCategory = sessionStorage.SS_SchemeCategory;
        Scheme = sessionStorage.SS_Scheme;
        Zone = sessionStorage.SS_Zone;
        Branch = sessionStorage.SS_Branch;
        MemoType = sessionStorage.SS_MemoType;
        MemoStatus = sessionStorage.SS_MemoStatus;
        CreatedBy = sessionStorage.SS_CreatedBy;
        ARN = sessionStorage.SS_ARN;
        PeriodFrom = sessionStorage.SS_PeriodFrom;
        PeriodTo = sessionStorage.SS_PeriodTo;

        SmartScreenSearch.SetControlValues(Channel, DistributorCategory, ARN, SchemeCategory, Scheme, Zone, Branch, MemoType, MemoStatus, PeriodFrom, PeriodTo, CreatedBy);
        SmartScreenSearch.GetSmartSearchDetails(Channel, DistributorCategory, ARN, SchemeCategory, Scheme, Zone, Branch, MemoType, MemoStatus, PeriodFrom, PeriodTo, CreatedBy);

        sessionStorage.SmartSearchScreen = "";
    }


});