var AdHocProcess = {
    TempAdhocBatchID: 0,
    TempAdhocRemarks: '',
    TempAdhocStatus: '',
    TempMark: '',

    ViewAdHocInitiate: function () {
        AdHocProcess.CommonFunction("nav_initiate");

        $('#hdr_name').text('Initiate Ad Hoc Payment');
        input = $('<button class="btn btn-danger sq-btn fr" id="btn_initiate_Delete" onclick=\"AdHocProcess.DeleteAdHocInitatePayment();\">Delete</button>' +
                    '<button class="btn btn-success sq-btn fr" id="btn_initiate_create_batch" onclick=\"AdHocProcess.CreateInitiateAdHocBatch();\">Create Batch</button>');
        $("#div_btn").append(input);

        AdHocProcess.CommonButtonFunction("nav_initiate");
    },

    CommonFunction: function (NavigateKey) {
        $("ul.btm-nav-ul li").removeClass("active");
        $('.btm-nav-ul-li-' + NavigateKey + '').addClass("active");
        $("#div_btn").empty();
        sessionStorage.CurrentMenuselected = NavigateKey;

        if (NavigateKey == "nav_initiate") {
            $("#div_processing").hide();
            $("#div_initate").show();
        }
        else {
            $("#div_processing").show();
            $("#div_initate").hide();
        }
    },

    CommonButtonFunction: function (NavigateKey) {
        Utility.ServiceCall("POST", 'AdHocService.svc/ViewAdhocAction', JSON.stringify({ RoleID: parseInt(sessionStorage.RoleID), NavigateKey: NavigateKey }), "json", false, false, function (result) {
            var btnstatus = result.ViewAdhocActionResult;

            switch (NavigateKey) {
                //case "nav_initiate":
                //        $('#btn_initiate_Delete').attr('disabled', btnstatus);
                //        $('#btn_initiate_create_batch').attr('disabled', btnstatus);
                //    break;
                case "nav_review":
                    $('#btn_Reject_batch').attr('disabled', btnstatus);
                    break;
            }
            if (NavigateKey != 'nav_initiate') {
                $('#btn_Processing_batch').attr('disabled', btnstatus);
                $('#btn_Sub_Save').attr('disabled', btnstatus);
                $('#btn_Sub_Cancel').attr('disabled', btnstatus);
                $('#btn_Sub_Delete').attr('disabled', btnstatus);
            }
        });
    },

    ViewAdHocZonalProcessing: function () {
        $('#hdr_name').text('Zonal Processing');
        $('#hdr_Sub_dock').text('Memo Items List');
        AdHocProcess.CommonFunction("nav_zonalProcessing");

        $("#div_btn").empty();
        input1 = $('<button class="btn btn-success sq-btn fr" id="btn_Processing_batch" onclick=\"AdHocProcess.CreateAdHocBatchDetails();\">Create Batch</button>');
        $("#div_btn").append(input1);

        AdHocProcess.CommonButtonFunction("nav_zonalProcessing");
    },

    ViewAdHocStateProcessing: function () {
        $('#hdr_name').text('State Processing');
        $('#hdr_Sub_dock').text('Memo Items List');
        AdHocProcess.CommonFunction("nav_stateProcessing");

        $("#div_btn").empty();
        input1 = $('<button class="btn btn-success sq-btn fr" id="btn_Processing_batch" onclick=\"AdHocProcess.CreateAdHocBatchDetails();\">Create Batch</button>');
        $("#div_btn").append(input1);

        AdHocProcess.CommonButtonFunction("nav_stateProcessing");
    },

    ViewAdHocSalesProcessing: function () {
        sessionStorage.current
        AdHocProcess.CommonFunction("nav_salesprocessing");
        $('#hdr_name').text('Sales Processing');
        $('#hdr_Sub_dock').text('Memo Items List');
        $("#div_btn").empty();
        input1 = $('<button class="btn btn-success sq-btn fr" id="btn_Processing_batch" onclick=\"AdHocProcess.CreateAdHocBatchDetails();\">Create Batch</button>');
        $("#div_btn").append(input1);

        AdHocProcess.CommonButtonFunction("nav_salesprocessing");
    },

    ViewAdHocReview: function () {
        AdHocProcess.CommonFunction("nav_review");
        $('#hdr_name').text('Review Ad Hoc Payment');
        $('#hdr_Sub_dock').text('Memo Items List');
        $("#div_btn").empty();
        input1 = $(
            //'<a href="#div_remarks" class="btn btn-info sq-btn fr" id="btn_review_remarks" onclick=\"AdHocProcess.ReviewRemarks();\">Remarks</a>' +
            '<a href="#div_remarks" class="btn btn-warning sq-btn fr" id="btn_review_Discard" onclick=\"AdHocProcess.DiscardAdHocBatchDetails();\">Discard</a>' +
            '<button class="btn btn-success sq-btn fr" id="btn_Processing_batch" onclick=\"AdHocProcess.CreateAdHocBatchDetails();\">Submit</button>' +
             //'<a  title="Remarks" href="#div_remarks" class="btn btn-default fr" id="btn_review_remarks" onclick=\"AdHocProcess.ReviewRemarks();\"><img src="../img/comment-btn.png"></a>');
        '<button class="btn btn-default fr"  id="btn_review_remarks" onclick=\"AdHocProcess.ReviewRemarks();\" title="Remarks"><img src="../img/comment-btn.png"></button>');

        $("#div_btn").append(input1);

        AdHocProcess.CommonButtonFunction("nav_review");
    },

    ViewAdHocApproval: function () {
        AdHocProcess.CommonFunction("nav_approve");
        $('#hdr_name').text('Approve Ad Hoc Payment');
        $('#hdr_Sub_dock').text('Memo Items List');
        $("#div_btn").empty();
        input1 = $(
            '<a href="#div_remarks" class="btn btn-warning sq-btn fr" id="btn_approve_Discard" onclick=\"AdHocProcess.DiscardAdHocBatchDetails();\">Discard</a>' +
            '<button class="btn btn-success sq-btn fr" id="btn_approve_Processing_batch" onclick=\"AdHocProcess.CreateAdHocBatchDetails();\">Approve</button>' +
            '<button class="btn btn-danger sq-btn fr" id="btn_Reject_batch" onclick="AdHocProcess.RejectAdHocBatchDetails();">Reject</button>' +
        '<button class="btn btn-default fr"  id="btn_review_remarks" onclick=\"AdHocProcess.ReviewRemarks();\" title="Remarks"><img src="../img/comment-btn.png"></button>');

        $("#div_btn").append(input1);
        AdHocProcess.CommonButtonFunction("nav_approve");

        $('#btn_approve_Discard').attr('disabled', true);
        $('#btn_approve_Processing_batch').attr('disabled', true);
        $('#btn_Reject_batch').attr('disabled', true);
    },

    ViewAdHocFreeze: function () {
        AdHocProcess.CommonFunction("nav_freeze");
        $('#hdr_name').text('Freeze Ad Hoc Payment');
        $('#hdr_Sub_dock').text('Memo Items List');
        $("#div_btn").empty();
        //input1 = $('<button class="btn btn-success sq-btn fr" id="btn_Processing_batch" onclick=\"AdHocProcess.CreateAdHocBatchDetails();\">Freeze</button>' );

        //input1 = $('<button class="btn btn-success sq-btn fr" id="btn_Processing_batch" onclick=\"AdHocProcess.CreateAdHocBatchDetails();\">Freeze</button>' +
        //           '<button class="btn btn-primary sq-btn fr" id="btn_email" onclick=\"AdHocProcess.Viewtoccusers();\" target="_blank">Email</button>' +
        //           '<button class="btn btn-primary sq-btn fr" id="btn_print" onclick=\"AdHocProcess.PrintRackRate();\">Print</button>');


        input1 = $('<button class="btn btn-primary sq-btn fr" id="btn_email" onclick=\"AdHocProcess.Viewtoccusers();\" target="_blank">Email</button>' +
                 '<button class="btn btn-primary sq-btn fr" id="btn_print" onclick=\"AdHocProcess.PrintRackRate();\">Print</button>');


        $("#div_btn").append(input1);
        //$("#hdr_Sub_dock").hide();
        $("#div_Btn_Sub_Grid").hide();
        //$("#div_grid_sub_processing").hide();
        AdHocProcess.CommonButtonFunction("nav_freeze");
    },

    ReviewRemarks: function () {
        $('#txt_reject_remarks').val(AdHocProcess.TempAdhocRemarks);
        $('#mdl_reject_remarks').modal('show');
        $("#div_Reject_to").attr('hidden', 'hidden');
    },

    GetMemoTypes: function (MemoParentID) {
        var arr = MemoParentID == "" ? "" : MemoParentID.toString();
        arr = JSON.stringify(arr)

        Utility.ServiceCall("POST", 'AdHocService.svc/GetMemoTypes', '{"MemoParentID": ' + arr + '}', "json", false, false, function (result) {
            var arrItems = result.GetMemoTypesResult;
            $("<option />").text("Select Payment Type").val("0").appendTo("#dd_payment_type");
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].MemoTypeName).val(arrItems[i].MemoTypeId).appendTo('#dd_payment_type');
            }
        });
    },

    PaymentTypeOnChange: function () {
        $('#hdr_Sub_dock').text('Memo Items List');
        $('#main_checkAll').prop('checked', false);
        $('#initiate_checkAll').prop('checked', false);
        $('#sub_checkAll').prop('checked', false);
        //$('#lblTotalCount').text('');
        //$('#lblTotalAmount').text('');
        $('#lblTotalCount2').text('');
        $('#lblTotalAmount2').text('');
        var paymenttypevalue = $('#dd_payment_type option:selected').val();
        console.log(paymenttypevalue);
        if (parseInt(paymenttypevalue) > 0) {
            if (sessionStorage.CurrentMenuselected == "nav_initiate")
                AdHocProcess.GetAdHocGridDetails(parseInt(paymenttypevalue), 'initiate', 0, 0);
            else {
                var AdhocStatus = "";
                switch (sessionStorage.CurrentMenuselected) {
                    case "nav_zonalProcessing":
                        AdhocStatus = "initiate";
                        break;
                    case "nav_stateProcessing":
                        AdhocStatus = "initiate";
                        break;
                    case "nav_salesprocessing":
                        AdhocStatus = "zonal";
                        break;
                    case "nav_review":
                        AdhocStatus = "sales";
                        break;
                    case "nav_approve":
                        AdhocStatus = "review";
                        break;
                    case "nav_freeze":
                        AdhocStatus = "approve";
                        break;
                }
                AdHocProcess.GetAdHocBatchProcessDetails(AdhocStatus, parseInt(paymenttypevalue), 0);

                if (paymenttypevalue == "3") {
                    $("#grid_sub_processing").jqGrid("setColProp", "PaymentAmount", { editable: false });
                    $("#grid_sub_processing").jqGrid("setColProp", "FreeTextField1", { editable: true });
                    $("#grid_sub_processing").jqGrid("setColProp", "Rate", { editable: true });
                    //$("#grid_sub_processing").jqGrid("setColProp", "AmountBasisName", { editable: true });
                }
                else {
                    $("#grid_sub_processing").jqGrid("setColProp", "PaymentAmount", { editable: true });
                    $("#grid_sub_processing").jqGrid("setColProp", "FreeTextField1", { editable: false });
                    $("#grid_sub_processing").jqGrid("setColProp", "Rate", { editable: false });
                    //$("#grid_sub_processing").jqGrid("setColProp", "AmountBasisName", { editable: false });
                }
            }
        }
        else {
            if (sessionStorage.CurrentMenuselected == "nav_initiate")
                $('#grid_search_result').jqGrid('clearGridData');
            else {
                $('#grid_sub_processing').jqGrid('clearGridData');
                $('#grid_main_processing').jqGrid('clearGridData');
            }
        }
    },

    // Service call to Load Grid Values

    GetAdHocBatchProcessDetails: function (AdhocStatus, MemoTypeID, RaisedOn) {
        Utility.ServiceCall("POST", 'AdHocService.svc/GetAdHocBatchDetails', JSON.stringify({ AdhocStatus: AdhocStatus, MemoTypeID: parseInt(MemoTypeID), RaisedByID: RaisedOn, SearchFilter: Utility.ListSearchText }), "json", false, false, function (result) {
            var arrItems = result.GetAdHocBatchDetailsResult;
            var totalAmount = 0;
            //$('#grid_sub_processing').jqGrid('clearGridData');
            $('#grid_main_processing').jqGrid('clearGridData');
            //$('#lblTotalCount').text('');
            if (arrItems != undefined && arrItems.length > 0) {

                for (var i = 0; i < arrItems.length; i++) {
                    jQuery("#grid_main_processing").jqGrid('addRowData', arrItems[i].id, arrItems[i]);
                    console.log(arrItems[i].PaymentAmount);
                    totalAmount += parseFloat(arrItems[i].PaymentAmount);
                }
                //$('#lblTotalAmount').text('');
            }
            else {
                //$('#lblTotalAmount').text(totalAmount);
                Utility.writeNotification("norecords", "No Records Found", "", false);
            }
        });
    },

    GetAdHocGridDetails: function (PaymentType, AdhocStatus, AdhocBatchID, CreatedBy) {
        if (AdhocStatus == "")
            AdhocStatus = AdHocProcess.ReturnCurrentStatus();

        Utility.ServiceCall("POST", 'AdHocService.svc/GetAdHocDetails', JSON.stringify({ PaymentTypeID: PaymentType, AdhocStatus: AdhocStatus, AdhocBatchID: AdhocBatchID, CreatedByID: CreatedBy, SearchFilter: Utility.ListSearchText }), "json", false, false, function (result) {
            var arrItems = result.GetAdHocDetailsResult;
            if (sessionStorage.CurrentMenuselected == "nav_initiate") {
                $('#grid_search_result').jqGrid('clearGridData');
                totalAmount = 0;
                if (arrItems != undefined && arrItems.length > 0) {

                    //AdHocProcess.TempAdhocRemarks = arrItems[0].MemoStatusDisplay;
                    for (var i = 0; i < arrItems.length; i++) {
                        jQuery("#grid_search_result").jqGrid('addRowData', parseInt(i + 1), arrItems[i]);
                        totalAmount = parseFloat(totalAmount) + (arrItems[i].FreeTextField1 == "" ? 0 : parseFloat(arrItems[i].FreeTextField1));
                        //$('#lblTotalAmount2').text(totalAmount);
                        $('#lblTotalCount2').text(arrItems.length);
                    }
                    ($.isNumeric(totalAmount)) ? $('#lblTotalAmount2').text(totalAmount) : $('#lblTotalAmount2').text("0");
                }
                
                else {
                    Utility.writeNotification("norecords", "No Records Found", "", false);
                }
                
            }
            else {
                $('#grid_sub_processing').jqGrid('clearGridData');
                var totalAmount = 0;
                if (arrItems != undefined && arrItems.length > 0) {
                    for (var i = 0; i < arrItems.length; i++) {
                        jQuery("#grid_sub_processing").jqGrid('addRowData', parseInt(i + 1), arrItems[i]);
                        totalAmount = parseFloat(totalAmount) + (arrItems[i].FreeTextField1 == "" ? 0 : parseFloat(arrItems[i].FreeTextField1));
                        //$('#lblTotalAmount').text(totalAmount);
                    }
                    ($.isNumeric(totalAmount)) ? $('#lblTotalAmount').text(totalAmount) : $('#lblTotalAmount').text("0");
                }
                $('#lblTotalCount').text(arrItems.length);
            }
        });
    },

    RejectAdHocBatchDetails: function () {
        AdHocProcess.TempAdhocStatus = "reject";
        $('#btn_Reject_Discard_to').text('Reject');
        AdHocProcess.RejectORDiscardAdHocBatchDetails();
    },

    DiscardAdHocBatchDetails: function () {
        $('#btn_Reject_Discard_to').text('Discard');
        AdHocProcess.TempAdhocStatus = "discard";
        AdHocProcess.RejectORDiscardAdHocBatchDetails();
    },

    RejectORDiscardAdHocBatchDetails: function () {
        $('#div_Remarks').attr('hidden', 'hidden');
        $('#txt_reject_remarks').val('');
        var SelectedListIDs = '';
        SelectedListIDs = AdHocProcess.GetSelectedRecords();

        //if (SelectedListIDs != "") {
        if (AdHocProcess.TempAdhocBatchID > 0 || SelectedListIDs != "") {
            $('#mdl_reject_remarks').modal('show');
        }
        else {
            Utility.writeNotification("warning", "Please Select the record from the Memo List to reject.", "", true);
        }
    },

    GetSelectedRecords: function () {
        var gridData = jQuery("#grid_main_processing").jqGrid('getRowData');
        var SelectedListIDs = "";
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].select == 'True') {
                    if (SelectedListIDs != "")
                        SelectedListIDs = SelectedListIDs + ',';
                    SelectedListIDs = SelectedListIDs + gridData[i].AdhocBatchID;
                }
            }
        }

        return SelectedListIDs;
    },


    //******************************** Button Click Event ****************************************************

    RejectOrDiscardAdHocList: function () {
        var RejectRemarks = $('#txt_reject_remarks').val();
        if (RejectRemarks != undefined && RejectRemarks != "") {

            var SelectedListIDs = '';
            SelectedListIDs = AdHocProcess.GetSelectedRecords();

            if (SelectedListIDs.split(',').length > 1)
                SelectedListIDs = '';

            var FinalAhocID;
            FinalAhocID = parseInt(AdHocProcess.TempAdhocBatchID) > 0 ? AdHocProcess.TempAdhocBatchID : parseInt(SelectedListIDs);

            if (parseInt(FinalAhocID) > 0) {
                AdHocProcess.CommonSaveAdHocBatchDetails(parseInt(FinalAhocID), AdHocProcess.TempAdhocStatus, RejectRemarks, 0);
                $('#mdl_reject_remarks').modal('hide');
            }
            else
                Utility.writeNotification("warning", "Please Select the record from the Memo List to reject/discard.", "", true);
        }
        else
            Utility.writeNotification("warning", "Please Enter Remarks.", "", true);
    },


    //****************************************************************************************************************


    CreateInitiateAdHocBatch: function () {
        var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
        var AdhocStatus = "initiate";
        var SelectedBranches = [];
        var SelectedChannels = [];

        var SelectedPayListIDs = "";
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].select == 'True') {

                    SelectedBranches.push(gridData[i].BranchName);
                    //SelectedChannels.push(gridData[i].ChannelName);

                    if (SelectedPayListIDs != "")
                        SelectedPayListIDs = SelectedPayListIDs + ',';
                    SelectedPayListIDs = SelectedPayListIDs + gridData[i].PaymentListId;
                }
            }

            if (SelectedPayListIDs != "" && AdhocStatus != "") {

                var outputBranchArray = Utility.removeDuplicates(SelectedBranches);
                //var outputChannelArray = Utility.removeDuplicates(SelectedChannels);

                if (outputBranchArray != undefined && outputBranchArray.length != 1)
                    Utility.writeNotification("warning", "Sorry, Please select same Branch Records.", "", true);
                    //else if (outputChannelArray != undefined && outputChannelArray.length != 1)
                    //    Utility.writeNotification("warning", "Sorry, Please select same Channel Records.", "", true);
                else
                    AdHocProcess.CommonSaveAdHocBatchDetails(SelectedPayListIDs, AdhocStatus, "", 0);
            }
            else {
                Utility.writeNotification("warning", "Please Select the record to initiate.", "", true);
            }
        }
    },

    ReturnCurrentStatus: function () {
        switch (sessionStorage.CurrentMenuselected) {
            case "nav_zonalProcessing":
                return "zonal";
                break;
            case "nav_stateProcessing":
                return "state";
                break;
            case "nav_salesprocessing":
                return "sales";
                break;
            case "nav_review":
                return "review";
                break;
            case "nav_approve":
                return "approve";
                break;
            case "nav_freeze":
                return "freeze";
                break;
        }
    },

    CreateAdHocBatchDetails: function () {
        var gridData = jQuery("#grid_main_processing").jqGrid('getRowData');
        var AdhocStatus = AdHocProcess.ReturnCurrentStatus();

        var SelectedListIDs = "";
        var SelectedSubRegion = [];
        var SelectedZone = [];
        var SelectedChannel = [];

        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].select == 'True') {
                    SelectedSubRegion.push(gridData[i].SubRegionName);
                    SelectedZone.push(gridData[i].ZoneName);
                    //SelectedChannel.push(gridData[i].ChannelName);

                    if (SelectedListIDs != "")
                        SelectedListIDs = SelectedListIDs + ',';
                    SelectedListIDs = SelectedListIDs + gridData[i].AdhocBatchID;
                }
            }
            if (SelectedListIDs != "" && AdhocStatus != "") {

                //var outputChannel = Utility.removeDuplicates(SelectedChannel);

                var outputArray;
                if (AdhocStatus == "zonal" || AdhocStatus == "state")
                    outputArray = Utility.removeDuplicates(SelectedSubRegion);
                else if (AdhocStatus == "sales")
                    outputArray = Utility.removeDuplicates(SelectedZone);
                //if (outputArray != undefined  && outputArray.length == 1)

                if (AdhocStatus == "review")
                    $('#mdl_view_forward_to').modal('show');
                    //else if (AdhocStatus == "zonal" || AdhocStatus == "state") {

                    //    if (outputArray != undefined && outputArray.length == 1) {
                    //        //if (outputChannel != undefined && outputChannel.length != 1)
                    //        //    Utility.writeNotification("warning", "Sorry, Please select same Channel Records.", "", true);
                    //        //else
                    //        AdHocProcess.CommonSaveAdHocBatchDetails(SelectedListIDs, AdhocStatus, "", 0);
                    //    }
                    //    else
                    //        Utility.writeNotification("warning", "Sorry, Please select same Branch Records.", "", true);
                    //}
                    //else if (AdhocStatus == "sales") {
                    //    //if (outputChannel != undefined && outputChannel.length != 1)
                    //    //    Utility.writeNotification("warning", "Sorry, Please select same Channel Records.", "", true);
                    //    //else
                    //    AdHocProcess.CommonSaveAdHocBatchDetails(SelectedListIDs, AdhocStatus, "", 0);
                    //}
                else
                    AdHocProcess.CommonSaveAdHocBatchDetails(SelectedListIDs, AdhocStatus, "", 0);
            }
            else
                Utility.writeNotification("warning", "Please Select the record for Batch Process.", "", true);
        }
    },

    //removeDuplicates: function (inputArray) {
    //    var i;
    //    var len = inputArray.length;
    //    var outputArray = [];
    //    var temp = {};

    //    for (i = 0; i < len; i++) {
    //        temp[inputArray[i]] = 0;
    //    }
    //    for (i in temp) {
    //        outputArray.push(i);
    //    }
    //    return outputArray;
    //},

    RemarksClicked: function () {
        AdHocProcess.TempAdhocRemarks = $('#txt_reject_remarks').val();
        if (AdHocProcess.TempAdhocRemarks != undefined && AdHocProcess.TempAdhocRemarks != '') {
            Utility.ServiceCall("POST", 'AdHocService.svc/UpdateAdhocRemarks', JSON.stringify({ AdhocID: AdHocProcess.TempAdhocBatchID, Remarks: AdHocProcess.TempAdhocRemarks }), "json", false, false, function (result) {
                var res = result.UpdateAdhocRemarksResult;
            });
        }
        $('#mdl_reject_remarks').modal('hide');
    },

    AssignAndForward: function () {
        var gridData = jQuery("#grid_main_processing").jqGrid('getRowData');
        var assignto = $("#dd_assign_to option:selected").val();
        var SelectedListIDs = "";
        var AdhocRemarks = "";
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].select == 'True') {
                    if (SelectedListIDs != "")
                        SelectedListIDs = SelectedListIDs + ',';
                    SelectedListIDs = SelectedListIDs + gridData[i].AdhocBatchID;
                }
            }

            //for (var i = 0; i < gridData.length; i++) {
            //    if (gridData[i].AdhocBatchID == AdHocProcess.TempAdhocBatchID) {
            //        AdhocRemarks = gridData[i].Remarks;
            //    }
            //}

            // *********************** NEED TO UN COMMENT OF THE BELOW CODE WHEN GIVING TO LIVE .. *********************** 

            if (parseInt(assignto) == 7 || parseInt(assignto) == 8 || parseInt(assignto) == 9) {
                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].select == 'True') {
                        AdHocProcess.SendEmailtoBH(gridData[i].AdhocBatchID);
                    }
                }
            }

            // *********************** NEED TO UN COMMENT OF THE ABOVE CODE WHEN GIVING TO LIVE .. *********************** 

            if (SelectedListIDs != "") {
                AdHocProcess.CommonSaveAdHocBatchDetails(SelectedListIDs, "review", AdhocRemarks, assignto);
            }
        }
    },


    SendEmailtoBH: function (AdhocBatchID) {
        if (AdhocBatchID != "") {
            Utility.ServiceCall("POST", 'AdHocService.svc/GetAdHocApproverMail', JSON.stringify({ AdhocBatchIDs: AdhocBatchID }), "json", false, false, function (result) {
                var arrItems = result.GetAdHocApproverMailResult;

                if (arrItems != undefined && arrItems.length > 0) {
                    for (var i = 0; i < arrItems.length; i++) {

                        if (arrItems[i].Email != "") {

                            var fileurl = '';

                            var paymenttypevalue = $('#dd_payment_type option:selected').val();
                            if (parseInt(paymenttypevalue) == 3)
                                fileurl = Utility.AdHocCAMS_MB.replace("###MemoNumber###", arrItems[i].MemoNumber);
                            else
                                fileurl = Utility.AdHocCAMS_FB.replace("###MemoNumber###", arrItems[i].MemoNumber);

                            fileurl = fileurl.replace("###Channel###", arrItems[i].ChannelName);
                            //var filename = arrItems[i].MemoNumber + '_' + arrItems[i].Remarks; // Channel Name
                            var filename = arrItems[i].MemoNumber; // Channel Name
                            Utility.ServiceCall("POST", 'BaseRackRateService.svc/SendEmailMemo', JSON.stringify({ fileurl: fileurl, filename: filename, sendto: arrItems[i].Email, sendcc: arrItems[i].SecondaryEmail, typeval: 1, ModuleID: 3, MailStatus: "AdHoc Approval", sendbcc: "" }), "json", false, false, function (result) {
                                Utility.writeNotification("success", "Memo Emailed Successfully", "", true);
                            });
                            $('#modal_select_to_cc').modal('hide');
                        }
                    }
                }
            });
        }
    },

    CommonSaveAdHocBatchDetails: function (SelectedListIDs, AdhocStatus, RejectRemarks, ApprovalRoleID) {
        var paymenttypevalue;

        $('#mdl_view_forward_to').modal('hide');
        if (SelectedListIDs != "") {

            Utility.ServiceCall("POST", 'AdHocService.svc/CreateAdhocBatchProcess', JSON.stringify({ AdhocListIDs: SelectedListIDs, AdhocStatus: AdhocStatus, Remarks: RejectRemarks, ApprovalRoleID: parseInt(ApprovalRoleID) }), "json", false, false, function (result) {
                var res = result.CreateAdhocBatchProcessResult;

                paymenttypevalue = parseInt($('#dd_payment_type option:selected').val());

                if (res != undefined && res == '') {
                    if (AdhocStatus == "reject")
                        Utility.writeNotification("success", "Payment Record rejected Successfully.", "", true);
                    else if (AdhocStatus == "discard")
                        Utility.writeNotification("success", "Payment Record discarded Successfully.", "", true);
                    else
                        Utility.writeNotification("success", "Payment Record Created Successfully.", "", true);
                    AdHocProcess.RefreshAdhocMainGrid(paymenttypevalue);
                }
                else if (res != undefined && res == 'failed') {
                    if (AdhocStatus == "reject")
                        Utility.writeNotification("error", "Sorry, Payment Record are Failed to reject.", "", true);
                    else if (AdhocStatus == "discard")
                        Utility.writeNotification("error", "Sorry, Payment Record are Failed to discard.", "", true);
                    else
                        Utility.writeNotification("error", "Sorry, Payment Record are Failed to Create Batch.", "", true);
                }
                else if (res != undefined && res != '') {
                    if (AdhocStatus == "reject")
                        Utility.writeNotification("error", "Please enter remarks for payment records individually : " + res.toString(), "", true);
                }
            });
        }
    },

    CancelAdhocPaymentList: function () {
        var paymenttypevalue;
        paymenttypevalue = parseInt($('#dd_payment_type option:selected').val());
        AdHocProcess.RefreshAdhocMainGrid(paymenttypevalue);
    },

    RefreshAdhocMainGrid: function (paymenttypevalue) {
        switch (sessionStorage.CurrentMenuselected) {
            case "nav_initiate":
                $('#grid_search_result').jqGrid('clearGridData');
                AdHocProcess.PaymentTypeOnChange();
                break;
            case "nav_zonalProcessing":
                AdHocProcess.GetAdHocBatchProcessDetails("initiate", paymenttypevalue, 0);
                break;
            case "nav_stateProcessing":
                var AdhocStatus = "initiate";
                AdHocProcess.GetAdHocBatchProcessDetails("initiate", paymenttypevalue, 0);
                break;
            case "nav_salesprocessing":
                var AdhocStatus = "sales";
                AdHocProcess.GetAdHocBatchProcessDetails("zonal", paymenttypevalue, 0);
                break;
            case "nav_review":
                var AdhocStatus = "review";
                AdHocProcess.GetAdHocBatchProcessDetails("sales", paymenttypevalue, 0);
                break;
            case "nav_approve":
                var AdhocStatus = "approve";
                AdHocProcess.GetAdHocBatchProcessDetails("review", paymenttypevalue, 0);
                break;
            case "nav_freeze":
                var AdhocStatus = "freeze";
                AdHocProcess.GetAdHocBatchProcessDetails("approve", paymenttypevalue, 0);
                break;
        }
    },


    UpdateAdhocPaymentList: function () {
        var gridData1 = jQuery("#grid_sub_processing").jqGrid('getRowData');

        for (var i = 0; i < gridData1.length; i++) {
            $("#grid_sub_processing").jqGrid('saveRow', parseInt(i + 1));
        }

        var gridData = jQuery("#grid_sub_processing").jqGrid('getRowData');
        var AdhocPaymentList = [];

        for (var i = 0; i < gridData.length; i++) {
            PaymentMemoparam = {};
            if (gridData[i].IsRequired == "true") {
                PaymentMemoparam["PaymentListId"] = gridData[i].PaymentListId;
                PaymentMemoparam["PaymentMemoId"] = gridData[i].PaymentMemoId;
                PaymentMemoparam["SerialNo"] = gridData[i].SerialNo;
                PaymentMemoparam["SchemeName"] = gridData[i].SchemeName;
                PaymentMemoparam["BranchName"] = gridData[i].BranchName;
                PaymentMemoparam["MemoNumber"] = "";
                PaymentMemoparam["MemoTypeName"] = "";
                PaymentMemoparam["DistributorCategoryName"] = "";
                PaymentMemoparam["CreatedByName"] = "";
                PaymentMemoparam["MemoStatus"] = "Saved";
                PaymentMemoparam["AmountBasisID"] = 0;
                PaymentMemoparam["MemoTypeID"] = 0;
                PaymentMemoparam["ARNNo"] = gridData[i].ARNNo;
                PaymentMemoparam["SchemeId"] = 0;
                PaymentMemoparam["BranchId"] = gridData[i].BranchId;
                PaymentMemoparam["AmountBasisName"] = gridData[i].AmountBasisName;
                PaymentMemoparam["Rate"] = gridData[i].Rate;
                PaymentMemoparam["PanNumber"] = "";
                PaymentMemoparam["DateFrom"] = gridData[i].DateFrom;
                PaymentMemoparam["DateTo"] = gridData[i].DateTo;
                PaymentMemoparam["MobilizationAmount"] = gridData[i].MobilizationAmount;
                PaymentMemoparam["PaymentAmount"] = gridData[i].PaymentAmount;
                PaymentMemoparam["FreeTextField1"] = gridData[i].FreeTextField1;
                PaymentMemoparam["FreeTextField2"] = gridData[i].FreeTextField2;
                PaymentMemoparam["Remarks"] = gridData[i].Remarks;
                AdhocPaymentList.push(PaymentMemoparam);
            }
        }

        if (AdhocPaymentList.length > 0) {
            Utility.ServiceCall("POST", 'AdHocService.svc/SaveAdHocPaymentList', JSON.stringify({ InputData: AdhocPaymentList }), "json", false, false, function (result) {
                var res = result.SaveAdHocPaymentListResult
            });
        }
    },


    DeleteAdHocInitatePayment: function () {
        var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
        var SelectedListIDs = "";
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].select == 'True') {
                    if (SelectedListIDs != "")
                        SelectedListIDs = SelectedListIDs + ',';
                    SelectedListIDs = SelectedListIDs + gridData[i].PaymentListId;
                }
            }
            AdHocProcess.DeleteServiceCall(SelectedListIDs, 'initiate', 'grid_search_result');
        }
    },



    DeleteAdhocPaymentList: function () {
        var gridData = jQuery("#grid_sub_processing").jqGrid('getRowData');
        var SelectedListIDs = "";
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].select == 'True') {
                    if (SelectedListIDs != "")
                        SelectedListIDs = SelectedListIDs + ',';
                    SelectedListIDs = SelectedListIDs + gridData[i].PaymentListId;
                }
            }
            AdHocProcess.DeleteServiceCall(SelectedListIDs, '', 'grid_sub_processing');
        }
    },

    DeleteServiceCall: function (PaymentListIDs, AdhocStatus, Grid_Name) {
        if (PaymentListIDs != "") {
            if (confirm("Are you sure you want to delete!")) {
                Utility.ServiceCall("POST", 'AdHocService.svc/DeleteAdHocPayment', JSON.stringify({ PaymentListIDs: PaymentListIDs, AdhocStatus: AdhocStatus }), "json", false, false, function (result) {
                    var res = result.DeleteAdHocPaymentResult;
                    if (res != undefined && res == true) {
                        Utility.writeNotification("success", "Records Deleted Successfully.", "", true);
                        AdHocProcess.DeleteMailSend(Grid_Name);
                        $('#grid_search_result').jqGrid('clearGridData');
                        if (AdhocStatus == '')
                            AdHocProcess.GetAdHocGridDetails(0, '', AdHocProcess.TempAdhocBatchID, 0);
                    }
                    else {
                        Utility.writeNotification("error", "Sorry, Records are Failed to Delete.", "", true);
                        return false;
                    }
                });
            }
        }
    },

    DeleteMailSend: function (Grid_Name) {
        var gridData = jQuery("#" + Grid_Name).jqGrid('getRowData');
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].select == 'True') {

                    var DeleteStatus = 'Record Deleted'

                    Utility.ServiceCall("POST", 'AdHocService.svc/SendDeletePaymentMail', JSON.stringify({ PaymentNo: gridData[i].PaymentListId, Distributor: gridData[i].ARNNo, UserName: sessionStorage.UserName, ToUser: gridData[i].RaisedByEmail, Status: DeleteStatus }), "json", false, false, function (result) {
                        var res = result.SendDeletePaymentMailResult;
                    });
                }
            }
        }       
    },

    ReturnViewRemarksHyperLink: function (cellValue, options, rowdata, action) {
        return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"AdHocProcess.AdHocPaymentDetail(' + rowdata.PaymentListId + ');\">View Remarks History</a>';
    },



    ReturnAdHocDetailHyperLink: function (cellValue, options, rowdata, action) {
        var Temp = "'" + rowdata.MemoNumber + "'";
        var TempRemarks = "'" + rowdata.Remarks + "'";
        if (rowdata.MemoNumber != "") {
            $('#btn_approve_Discard').attr('disabled', false);
            $('#btn_approve_Processing_batch').attr('disabled', false);
            $('#btn_Reject_batch').attr('disabled', false);
        }
        return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"AdHocProcess.HyperLinkAction(' + Temp + ',' + rowdata.AdhocBatchID + ',' + TempRemarks + ');\">' + rowdata.MemoNumber + '</a>';
        //return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"AdHocProcess.GetAdHocGridDetails(0 ,' + rowdata.AdhocBatchID + ',0);\">' + rowdata.MemoNumber + '</a>';
    },

    HyperLinkAction: function (MemoNumber, AdhocBatchID, Remarks) {
        AdHocProcess.TempAdhocBatchID = AdhocBatchID;
        AdHocProcess.TempAdhocRemarks = Remarks;
        $('#hdr_Sub_dock').text('' + MemoNumber + '');
        AdHocProcess.GetAdHocGridDetails(0, '', AdhocBatchID, 0);


        if (sessionStorage.CurrentMenuselected == "nav_freeze") {

            var fileurl = '';
            var paymenttypevalue = $('#dd_payment_type option:selected').val();
            if (parseInt(paymenttypevalue) == 3)
                fileurl = Utility.AdHocCAMS_MB.replace("###MemoNumber###", MemoNumber);
            else
                fileurl = Utility.AdHocCAMS_FB.replace("###MemoNumber###", MemoNumber);

            fileurl = fileurl.replace("###Channel###", " ");
            //fileurl = fileurl.replace("###Distributorid###", "");
            AdHocProcess.openWin(fileurl);
        }

    },

    ReturnAdHocInitiateHyperLink: function (cellValue, options, rowdata, action) {
        return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"AdHocProcess.NavigateAdhocURL(' + rowdata.PaymentListId + ');\">' + rowdata.SerialNo + '</a>';
    },

    NavigateAdhocURL: function (PaymentListId) {
        sessionStorage.CurrentMenuselected = "nav_create";
        sessionStorage.setItem("ActiveMainMenu", 3);
        window.location.href = "CreateAdHoc.html?memono=" + PaymentListId;  //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + PaymentListId
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

        //$("#div_modal_view_remarks").attr('hidden', false);
    },

    ColumnHide: function (Type) {
        switch (sessionStorage.CurrentMenuselected) {
            case "nav_zonalProcessing":
                if (Type == "Zonal")
                    return false;
                else
                    return true;
                break;
            case "nav_stateProcessing":
                if (Type == "Zonal")
                    return false;
                else
                    return true;
                break;
            case "nav_salesprocessing":
                if (Type == "Sales")
                    return false;
                else
                    return true;
                break;

            default:
                return true;
                break;

        }
    },

    ColumnEditable: function (PaymentID) {
        var paymenttypevalue = parseInt($('#dd_payment_type option:selected').val());
        return (paymenttypevalue == PaymentID);
    },


    //GridPaymentCellIsEditable: function (RowID) {
    //    var ret = $("#grid_sub_processing").getRowData(RowID);
    //    if (ret.MemoTypeID == "4")
    //        return false;
    //    else
    //        return true;
    //},


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
        var gridData = jQuery("#grid_main_processing").jqGrid('getRowData');
        var selectedmemos = [];
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].select == 'True') {
                    selectedmemos.push(AdHocProcess.remove_tags(gridData[i].MemoNumber));
                }
            }
            if (selectedmemos.toString() == "") {
                Utility.writeNotification("error", "Select Memo to Send Email", "", true);
            }
            else {
                var memocntsplit = selectedmemos.toString().split(',');
                if (memocntsplit.length > 1) {
                    $('#div_mailing_list').show();
                } else {
                    $('#div_mailing_list').hide();
                }
                $('#modal_select_to_cc').modal('show');
                AdHocProcess.GetTOCCusers(selectedmemos.toString());
            }
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

    PrintRackRate: function () {
        var gridData = jQuery("#grid_main_processing").jqGrid('getRowData');
        var selectedmemos = "";
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].select == 'True') {
                    selectedmemos = gridData[i].MemoNumber;


                    var fileurl = '';
                    var paymenttypevalue = $('#dd_payment_type option:selected').val();
                    if (parseInt(paymenttypevalue) == 3)
                        fileurl = Utility.AdHocCAMS_MB.replace("###MemoNumber###", AdHocProcess.remove_tags(gridData[i].MemoNumber));
                    else
                        fileurl = Utility.AdHocCAMS_FB.replace("###MemoNumber###", AdHocProcess.remove_tags(gridData[i].MemoNumber));


                    fileurl = fileurl.replace("###Channel###", " ");
                    //fileurl = fileurl.replace("###Distributorid###", gridData[i].ARNNo);
                    AdHocProcess.openWin(fileurl);
                }
            }
            if (selectedmemos == "") {
                Utility.writeNotification("error", "Select Memo to Print", "", true);
            }
        }
        else {
            Utility.writeNotification("error", "Select Memo to Print", "", true);
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

    //************************************************************************************************************************************

    //*************************************************************For Advance Search ********************************************************

    //AdvanceSearchClick: function () {
    //    switch (sessionStorage.CurrentMenuselected) {
    //        case "nav_zonalProcessing":
    //            Utility.AdvanceSearchClick(3, 'VIEW_ADHOC_BATCH_PROCESS_ZONAL');
    //            AdHocProcess.TempMark = 'VIEW_ADHOC_BATCH_PROCESS_ZONAL';
    //            break;
    //        case "nav_stateProcessing":
    //            Utility.AdvanceSearchClick(3, 'VIEW_ADHOC_BATCH_PROCESS_ZONAL');
    //            AdHocProcess.TempMark = 'VIEW_ADHOC_BATCH_PROCESS_ZONAL';
    //            break;
    //        case "nav_salesprocessing":
    //            Utility.AdvanceSearchClick(3, 'VIEW_ADHOC_BATCH_PROCESS_SALES');
    //            AdHocProcess.TempMark = 'VIEW_ADHOC_BATCH_PROCESS_SALES';
    //            break;
    //        case "nav_review":
    //            Utility.AdvanceSearchClick(3, 'VIEW_ADHOC_BATCH_PROCESS_RAF');
    //            AdHocProcess.TempMark = 'VIEW_ADHOC_BATCH_PROCESS_RAF';
    //            break;
    //        case "nav_approve":
    //            Utility.AdvanceSearchClick(3, 'VIEW_ADHOC_BATCH_PROCESS_RAF');
    //            AdHocProcess.TempMark = 'VIEW_ADHOC_BATCH_PROCESS_RAF';
    //            break;
    //        case "nav_freeze":
    //            Utility.AdvanceSearchClick(3, 'VIEW_ADHOC_BATCH_PROCESS_RAF');
    //            AdHocProcess.TempMark = 'VIEW_ADHOC_BATCH_PROCESS_RAF';
    //            break;
    //    }
    //},

    //Search_AdvanceSearchClick: function () {
    //    if (sessionStorage.CurrentMenuselected == "nav_initiate") {
    //        AdHocProcess.PaymentTypeOnChange();
    //    }
    //    else {
    //        switch (AdHocProcess.TempMark) {
    //            case "VIEW_ADHOC_BATCH_PROCESS_ZONAL":
    //                AdHocProcess.PaymentTypeOnChange();
    //                break;
    //            case "VIEW_ADHOC_BATCH_PROCESS_SALES":
    //                AdHocProcess.PaymentTypeOnChange();
    //                break;
    //            case "VIEW_ADHOC_BATCH_PROCESS_RAF":
    //                AdHocProcess.PaymentTypeOnChange();
    //                break;
    //            case "VIEW_ADHOC_PAYMENT_BY_MEMOID":
    //                AdHocProcess.GetAdHocGridDetails(0, '', AdHocProcess.TempAdhocBatchID, 0);
    //                break;
    //        }
    //    }
    //},


    //Sub_AdvanceSearchClick: function () {
    //    AdHocProcess.TempMark = 'VIEW_ADHOC_PAYMENT_BY_MEMOID';
    //    Utility.AdvanceSearchClick(3, 'VIEW_ADHOC_PAYMENT_BY_MEMOID');
    //},

    RefreshAdHocInitiateGrid: function () {
        Utility.ListSearchText = '';
        AdHocProcess.PaymentTypeOnChange();
    },

    RefreshAdHocMainGrid: function () {
        Utility.ListSearchText = '';
        AdHocProcess.PaymentTypeOnChange();
    },

    RefreshAdHocSubGrid: function () {
        Utility.ListSearchText = '';
        AdHocProcess.GetAdHocGridDetails(0, '', AdHocProcess.TempAdhocBatchID, 0);
    },

    //*************************************************************For Advance Search ends here ********************************************************

};


$(function () {
    AdHocProcess.LoadMailingList();
    AdHocProcess.GetMemoTypes("3"); // 3=> AdHoc in MemoType Table
    //$("#div_modal_view_remarks").attr('hidden', true);
    $('#div_modal_view_remarks').modal('hide');
    $('#mdl_view_forward_to').modal('hide');
    //$('#mdl_reject_remarks').modal('hide');

    // Grid Controls

    // For Initiate
    jQuery("#grid_search_result").jqGrid({
        datatype: "json",
        height: 350,
        width: null,
        shrinkToFit: false,
        colNames: ['Select', '<input type="checkbox" id="initiate_checkAll" >Select</input>', 'S.No.', 'ARN No.', 'ARN Name', 'Scheme', 'Channel', 'Period From', 'Period To', 'Amount Basis', 'Rate (Bps)', 'AUM (Lakhs) / Gross Sales (Actual)', 'Payment Amount', 'Actual Amount Payable (Round Off)', 'Payment Type', 'Branch', 'Raised By', 'MemoTypeID', 'PaymentMemoID', 'PaymentListID', 'RaisedByEmail'],
        colModel: [
                { name: 'select', width: '60px;', align: 'center', formatter: 'checkbox', editoptions: { value: "True:False" }, hidden: true, edittype: "checkbox", formatoptions: { disabled: false }, sortable: false },

                 {
                     name: 'select', width: '80px;', align: 'center', editable: true, sortable: false, hidden: false, formatter: 'checkbox', editoptions: { value: "True:False" }, edittype: "checkbox", formatoptions: { disabled: false },
                     cellattr: function (rowId, val, rawObject) {
                         return " class='chkinitiate_processing'";
                     }
                 },
                { name: 'SerialNo', index: 'SerialNo', width: 70, align: 'center', formatter: AdHocProcess.ReturnAdHocInitiateHyperLink, sortable: false },
                { name: 'ARNNo', width: 90, index: 'ARNNo', sortable: false },
                { name: 'ARNName', width: 260, index: 'ARNName', sortable: false },
                { name: 'SchemeName', width: 250, index: 'SchemeName', sortable: false },
                { name: 'ChannelName', width: 100, index: 'ChannelName', sortable: false },
                { name: 'DateFrom', width: 120, index: 'DateFrom', align: 'center', sortable: false },
                { name: 'DateTo', width: 110, index: 'DateTo', align: 'center', sortable: false },
                { name: 'AmountBasisName', width: 130, index: 'AmountBasisName', sortable: false },
                { name: 'Rate', index: 'Rate', width: 90, sortable: false },
                { name: 'MobilizationAmount', index: 'MobilizationAmount', width: 250, sortable: false },
                { name: 'PaymentAmount', index: 'PaymentAmount', width: 200, sortable: false },
                { name: 'FreeTextField1', index: 'FreeTextField1', width: 250, sortable: false },
                { name: 'MemoTypeName', index: 'MemoTypeName', width: 210, sortable: false },
                { name: 'BranchName', index: 'BranchName', width: 90, sortable: false },
                { name: 'CreatedByName', index: 'CreatedByName', sortable: false },
                { name: 'MemoTypeID', index: 'MemoTypeID', hidden: true, sortable: false },
                { name: 'PaymentMemoId', index: 'PaymentMemoId', hidden: true, sortable: false },
                { name: 'PaymentListId', index: 'PaymentListId', hidden: true, sortable: false },
                { name: 'RaisedByEmail', index: 'RaisedByEmail', hidden: true, sortable: false }

        ],
    });


    $("#initiate_checkAll").click(function (e) {
        var isSelectAllTrue = $('#initiate_checkAll').is(":checked");
        e = e || event;/* get IE event ( not passed ) */
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;

        var td = $('.chkinitiate_processing');
        for (var i = 0; i < td.length; i++) {
            var checkbox = $('input[type="checkbox"]', $(td[i]).closest('td')).get(0);

            var checked = checkbox.checked;
            checkbox.checked = isSelectAllTrue;
        }
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

    // Main Processing Grid
    var SelectedMemos = [];

    jQuery("#grid_main_processing").jqGrid({
        datatype: "json",
        height: 200,
        width: null,
        shrinkToFit: false,
        colNames: ['Select', '<input type="checkbox" id="main_checkAll" >Select</input>', 'Memo Number', 'Memo Type', 'Raised On', 'Branch', 'Location', 'AdhocBatchID', 'MemoTypeID', 'IsRejected', 'Email', 'SecondaryEmail', 'Remarks'],
        colModel: [
                { name: 'select', width: '60px;', align: 'center', formatter: 'checkbox', hidden: true, editoptions: { value: "True:False" }, edittype: "checkbox", formatoptions: { disabled: false }, sortable: false },
                 {
                     name: 'select', width: '80px;', align: 'center', editable: true, sortable: false, hidden: false, editoptions: { value: "True:False" }, edittype: "checkbox", formatoptions: { disabled: false }, formatter: 'checkbox',
                     cellattr: function (rowId, val, rawObject) {
                         return " class='chkmain_processing' ";
                     }
                 },
                { name: 'MemoNumber', width: 250, index: 'MemoNumber', align: 'center', formatter: AdHocProcess.ReturnAdHocDetailHyperLink, sortable: false },
                { name: 'MemoTypeName', width: 300, index: 'MemoTypeName', sortable: false },
                //{ name: 'ChannelName', index: 'ChannelName' },
                { name: 'RaisedOn', width: 150, index: 'RaisedOn', align: 'center', sortable: false },
                { name: 'SubRegionName', index: 'SubRegionName', width: 200, hidden: AdHocProcess.ColumnHide("Zonal"), sortable: false },
                { name: 'ZoneName', index: 'ZoneName', width: 200, hidden: AdHocProcess.ColumnHide("Sales"), sortable: false },
                { name: 'AdhocBatchID', index: 'AdhocBatchID', hidden: true, sortable: false },
                { name: 'MemoTypeID', index: 'MemoTypeID', hidden: true, sortable: false },
                { name: 'IsRejected', index: 'IsRejected', hidden: true, sortable: false },
                { name: 'Email', index: 'Email', hidden: true, sortable: false },
                { name: 'SecondaryEmail', index: 'SecondaryEmail', hidden: true, sortable: false },
                { name: 'Remarks', index: 'Remarks', hidden: true, sortable: false }

        ],
        afterInsertRow: function (rowid, rowdata) {
            if (rowdata.IsRejected == true)
                $("#grid_main_processing").jqGrid('setRowData', rowid, false, { background: '#FF5050' });
        },
        beforeSelectRow: function (rowid, e) {
            var $target = $(e.target), $td = $target.closest("td"),
                           iCol = $.jgrid.getCellIndex($td[0]),
                           colModel = $(this).jqGrid("getGridParam", "colModel");

            //if (iCol >= 0 && $target.is(":checkbox")) {
            //    alert("checkbox is " +
            //          ($target.is(":checked") ? "checked" : "unchecked") +
            //          " in the column \"" + colModel[iCol].name +
            //          "\" in the row with rowid=\"" + rowid + "\"");
            //}

            if (iCol >= 0 && $target.is(":checkbox")) {
                if (($target.is(":checked")))
                    SelectedMemos.push(rowid);
                else
                    SelectedMemos.splice($.inArray(rowid, SelectedMemos), 1);
            }


            if (sessionStorage.CurrentMenuselected == "nav_review") {
                if (SelectedMemos.length > 2) {
                    $('#btn_review_remarks').attr('disabled', true);
                    $('#btn_review_Discard').attr('disabled', true);
                }
                else {
                    $('#btn_review_remarks').attr('disabled', false);
                    $('#btn_review_Discard').attr('disabled', false);
                }
            }
            else if (sessionStorage.CurrentMenuselected == "nav_approve") {
                if (SelectedMemos.length > 2) {
                    $('#btn_approve_Discard').attr('disabled', true);
                    $('#btn_Reject_batch').attr('disabled', true);
                }
                else {
                    $('#btn_approve_Discard').attr('disabled', false);
                    $('#btn_Reject_batch').attr('disabled', false);
                }
            }

            return true;
        }

    });



    $("#main_checkAll").click(function (e) {
        var isSelectAllTrue = $('#main_checkAll').is(":checked");
        e = e || event;/* get IE event ( not passed ) */
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;

        var td = $('.chkmain_processing');
        for (var i = 0; i < td.length; i++) {
            var checkbox = $('input[type="checkbox"]', $(td[i]).closest('td')).get(0);

            var checked = checkbox.checked;
            checkbox.checked = isSelectAllTrue;
        }
    });



    //18th column is ==> IsRequired

    // Sub Editable Processing Grid

    var lastsel2

    $grid = $("#grid_sub_processing");
    jQuery("#grid_sub_processing").jqGrid({
        datatype: "local",
        height: 200,
        width: null,
        shrinkToFit: false,
        colNames: ['<input type="checkbox" id="sub_checkAll" >Select</input>', 'S.No.', 'ARN No.', 'ARN Name', 'Scheme', 'Channel', 'Branch', 'Period From', 'Period To', 'Amount Basis', 'Rate (bps)', 'AUM (Lakhs) / Gross Sales (Actual)', 'Payment Amount', 'Actual Amount Payable (Round Off)', 'Remarks', 'Remarks History', 'MemoTypeID', 'PaymentMemoID', 'PaymentListID', 'IsRequired', 'RaisedByEmail'],
        colModel: [
                //{ name: 'select', width: '60px;', align: 'center', formatter: 'checkbox', hidden: true, edittype: "checkbox", formatoptions: { disabled: false }, editoptions: { value: "True:False" } },
                {
                    name: 'select', width: '80px;', align: 'center', editable: true, sortable: false, hidden: (sessionStorage.CurrentMenuselected == "nav_freeze"), formatter: 'checkbox', editoptions: { value: "True:False" }, edittype: "checkbox", formatoptions: { disabled: false },
                    cellattr: function (rowId, val, rawObject) {
                        return " class='chksub_processing'";
                    }
                },
                { name: 'SerialNo', index: 'SerialNo', width: 60, align: 'center', sortable: false },
                { name: 'ARNNo', width: 90, index: 'ARNNo', sortable: false },
                { name: 'ARNName', width: 260, index: 'ARNName', sortable: false },
                { name: 'SchemeName', width: 250, index: 'SchemeName', sortable: false },
                { name: 'ChannelName', width: 90, index: 'ChannelName', sortable: false },
                { name: 'BranchName', index: 'BranchName', width: 105, sortable: false },
                { name: 'DateFrom', width: 120, index: 'DateFrom', align: 'center', sortable: false },
                { name: 'DateTo', width: 110, index: 'DateTo', align: 'center', sortable: false },
                { name: 'AmountBasisName', width: 130, index: 'AmountBasisName', sortable: false },
                {
                    name: 'Rate', index: 'Rate', width: 90, sortable: false, editoptions: {
                        dataEvents: [
                            {
                                type: 'keyup',
                                fn: function (e) {
                                    var row = $(e.target).closest('tr.jqgrow');
                                    var rowId = row.attr('id');
                                    $("#" + rowId).find('td').eq('19').html('true');

                                    var rateamt = parseFloat($("#" + rowId + "_" + 'Rate').val() == "" ? 0 : $("#" + rowId + "_" + 'Rate').val());
                                    var MobAmt = $("#" + rowId).find('td').eq('11').html();
                                    MobAmt = MobAmt.replace(',', '');
                                    MobAmt = parseFloat(MobAmt == "" ? 0 : MobAmt);

                                    //var AmountBasisvalue = $("#" + rowId + "_" + 'AmountBasisName').val()
                                    var AmountBasisvalue = $("#" + rowId).find('td').eq('9').html();
                                    if (AmountBasisvalue == "AUM")
                                        MobAmt = parseFloat(MobAmt) * 100000;

                                    var TempPaymentamount = parseFloat((rateamt * MobAmt) / 10000).toFixed(2).toString();
                                    var ActualPaymentamount = parseFloat((rateamt * MobAmt) / 10000).toFixed(0).toString();
                                    //$("#" + rowId + "_" + 'PaymentAmount').val(TempPaymentamount)
                                    $("#" + rowId + "_" + 'FreeTextField1').val(ActualPaymentamount)
                                    $("#" + rowId).find('td').eq('12').html(TempPaymentamount);
                                    //$("#" + rowId).find('td').eq('13').html(ActualPaymentamount);
                                }
                            }
                        ], dataInit: function (element) { Utility.GridAllowNumberto3(element); }
                    }
                },
                { name: 'MobilizationAmount', width: 250, sortable: false, formatter: 'number', index: 'MobilizationAmount' },
                { name: 'PaymentAmount', width: 200, sortable: false, index: 'PaymentAmount' },
                {
                    name: 'FreeTextField1', index: 'FreeTextField1', sortable: false, width: 250, editable: true, formatter: 'number', editoptions: {
                        maxlength: 10,
                        dataEvents: [
                            {
                                type: 'keyup',
                                fn: function (e) {
                                    var row = $(e.target).closest('tr.jqgrow');
                                    var rowId = row.attr('id');
                                    $("#" + rowId).find('td').eq('19').html('true');
                                }
                            }
                        ], dataInit: function (element) { Utility.GridAllowNumber(element); }
                    }
                },
                {
                    name: 'Remarks', index: 'Remarks', sortable: false, width: 150, editable: true, colSpan: 2, editoptions: {
                        dataEvents: [
                            {
                                type: 'keyup',
                                fn: function (e) {
                                    var row = $(e.target).closest('tr.jqgrow');
                                    var rowId = row.attr('id');
                                    $("#" + rowId).find('td').eq('19').html('true');
                                }
                            }
                        ]
                    }
                },
                { name: '', index: '', align: 'center', formatter: AdHocProcess.ReturnViewRemarksHyperLink, sortable: false },
                { name: 'MemoTypeID', index: 'MemoTypeID', hidden: true, sortable: false },
                { name: 'PaymentMemoId', index: 'PaymentMemoId', hidden: true, sortable: false },
                { name: 'PaymentListId', index: 'PaymentListId', hidden: true, sortable: false },
                { name: 'IsRequired', index: 'IsRequired', hidden: true, sortable: false },
                { name: 'RaisedByEmail', index: 'RaisedByEmail', hidden: true, sortable: false }
        ],

        onSelectRow: function (id) {
            if (sessionStorage.CurrentMenuselected != "nav_freeze") {
                if (id && id !== lastsel2) {
                    if (lastsel2 != undefined) {
                        $("#grid_sub_processing").jqGrid('saveRow', lastsel2);
                        $('#grid_sub_processing').jqGrid('editRow', lastsel2, false);
                        jQuery('#grid_sub_processing').jqGrid('restoreRow', lastsel2);
                    }
                    lastsel2 = id;
                }
                if (parseInt(id) > 0) {

                    jQuery('#grid_sub_processing').jqGrid('editRow', id, true);

                    //var PaymentType = $("#" + rowId).find('td').eq('14')[0].title;
                    //if(AdHocProcess.GridPaymentCellIsEditable(parseInt(id) == false)){
                    //    $("#grid_sub_processing").jqGrid("setCell",parseInt(id), "PaymentAmount", { editable: false });}
                }
            }
        },
        'cellsubmit': 'clientArray',
        editurl: 'clientArray'
    });


    $("#sub_checkAll").click(function (e) {
        var isSelectAllTrue = $('#sub_checkAll').is(":checked");
        e = e || event;/* get IE event ( not passed ) */
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;

        var td = $('.chksub_processing');
        for (var i = 0; i < td.length; i++) {
            var checkbox = $('input[type="checkbox"]', $(td[i]).closest('td')).get(0);

            var checked = checkbox.checked;
            checkbox.checked = isSelectAllTrue;
        }
    });

    if (sessionStorage.CurrentMenuselected == "nav_review" || sessionStorage.CurrentMenuselected == "nav_approve")
        $("#grid_sub_processing").jqGrid("setColProp", "Remarks", { editable: false });
    else
        $("#grid_sub_processing").jqGrid("setColProp", "Remarks", { editable: true });



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

        var gridData = jQuery("#grid_main_processing").jqGrid('getRowData');
        var selectedmemos = "";
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].select == 'True') {
                    if (Tousers != "") {
                        selectedmemos = gridData[i].MemoNumber;
                        //var fileurl = Utility.AdHocReportUrl.replace("###MemoNumber###", AdHocProcess.remove_tags(gridData[i].MemoNumber));

                        var fileurl = '';
                        var paymenttypevalue = $('#dd_payment_type option:selected').val();
                        if (parseInt(paymenttypevalue) == 3)
                            fileurl = Utility.AdHocCAMS_MB.replace("###MemoNumber###", AdHocProcess.remove_tags(gridData[i].MemoNumber));
                        else
                            fileurl = Utility.AdHocCAMS_FB.replace("###MemoNumber###", AdHocProcess.remove_tags(gridData[i].MemoNumber));


                        fileurl = fileurl.replace("###Channel###", " ");

                        var filename = AdHocProcess.remove_tags(gridData[i].MemoNumber);
                        Utility.ServiceCall("POST", 'BaseRackRateService.svc/SendEmailMemo', JSON.stringify({ fileurl: fileurl, filename: filename, sendto: Tousers, sendcc: CCusers, typeval: 1, ModuleID: 3, MailStatus: "AdHoc Payment Records", sendbcc: BCCusers }), "json", false, false, function (result) {
                            Utility.writeNotification("success", "Memo Emailed Successfully", "", true);
                        });
                        $('#modal_select_to_cc').modal('hide');
                    }
                    else {
                        Utility.writeNotification("error", "Please select atlease one TO User", "", true);
                    }
                }
            }
        }
        else {
            //Utility.writeNotification("warning", "Select a Memo to Submit", "", true);
            Utility.writeNotification("error", "Select Memo to  Send Email", "", true);
        }

    });

    AdHocProcess.RefreshAdHocSubGrid();

});
