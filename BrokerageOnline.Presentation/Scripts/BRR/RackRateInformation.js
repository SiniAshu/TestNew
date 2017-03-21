var RackRate = {
    DetailCount: 0,
    arns: [],
    arnName: [],
    TempPaymentList: [],
    TempmonthList: [],
    TempyearList: [],
    TempPaymentDetails: [],
    TempLoadedPaymentList: [],
    TempLoadedPaymentDetails: [],
    TempTrail: [],
    TableCount: 0,
    IsEditing: 0,
    IsCloseEnded: 0,

    DisableRackRate: function () {
        $('#div_content').find('input, textarea, button, select').removeAttr("disabled");
        $('#btn_save_info').prop('disabled', true);
        $('#btn_add_rack_rate_detail').prop('disabled', true);
        $('#txt_remarks').prop('disabled', true);
        $('#txt_additional_notes').prop('disabled', true);

        RackRate.ToggleBaseContols(true);
    },

    DisableRackRateDetails: function (val) {
        $('#txt_others').prop('disabled', val);

        if (val == true) {
            $("#div_content input:checkbox").attr("disabled", "disabled");

            $('#div_rack_rate_detail').find('input, textarea, button, select').attr("disabled", "disabled");
        }
        else {
            $("#div_content input:checkbox").removeAttr("disabled");
            $('#div_rack_rate_detail').find('input, textarea, button, select').removeAttr("disabled");
        }
    },

    ClearSearchFilter: function () {
        sessionStorage.setItem("DistributorCategorySearch", "");
        sessionStorage.setItem("ChannelCreateSearch", "");
        sessionStorage.setItem("ARNCreateSearch", "");

        $('#txt_arn').tokenInput('clear');
        $('#dd_dist_category').multiselect('clearSelection');
        $('#dd_channel').multiselect('clearSelection');


    },

    clearFields: function () {
        RackRate.ClearSearchFilter();
        RackRate.GetCreateBaseRackRate();
    },

    RefreshGridDetails: function () {
        Utility.ListSearchText = '';
        RackRate.GetCreateBaseRackRate();
    },

    ViewCreateRackRate: function () {
        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_create").addClass("active");
        $("#div_btn").empty();
        var input = $('<button class="btn btn-primary mr-right-01" id="btn_search" onclick=\"RackRate.GetCreateBaseRackRate(\"Saved\");\">Search</button>' +
               '<button class="btn btn-primary mr-right-01" id="btn_create_new" onclick=\"RackRate.CreateRackRate();\">Create New</button>');
        $("#div_btn").append(input);

        //if (sessionStorage.RoleID == 5 || sessionStorage.RoleID == 8 || sessionStorage.RoleID == 9)
        //    $('#btn_create_new').prop('disabled', true);
        //else
        //    $('#btn_create_new').prop('disabled', false);

        $('#grid_search_result').hideCol('selectcheck');
        $('#grid_search_result').showCol('selectradio');

        $('#grid_search_result').hideCol('MemoNumber');
        $('#grid_search_result').showCol('MemoId');

        $("#hdr_name").text("Create Rack Rate");
        $("#div_content").hide();
        $('#div_content').find('input, textarea, button, select').removeAttr("disabled");
        $('#txt_lumpsum_less_total').attr("disabled", "disabled");
        $("#div_add_rack_rate").hide();
        $("#div_landing_grid").hide();
        $("#div_freeze").hide();
        $("#div_manage").hide();
        $("#div_masterqueue").hide();
        RackRate.RemoveSIP();
      

    },

    ViewRackRateInformation: function () {
        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_information").addClass("active");
        $('#txt_addl_incentive').removeAttr('disabled');
        $('#dd_addl_incentive_type').val("1");

        $("#div_btn").empty();
        var input = $(' <button class="btn btn-danger sq-btn fr" id=btn_save_cancel onclick="RackRate.CancelRackRate();">Cancel</button>' +
                            '<button class="btn btn-success sq-btn fr" id="btn_save_info" onclick="RackRate.SaveRackRate();">Save</button>' +
                            '<button class="btn btn-warning sq-btn fr" onclick="RackRate.InitiateSubmit();">Submit</button>' +
                            '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                            '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal123" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>');
        $("#div_btn").append(input);

        //sessionStorage.ismasterqueue == "true" ? $('#btn_save_info').prop('disabled', true) : $('#btn_save_info').prop('disabled', false);
        sessionStorage.ismasterqueue = "";

        if (sessionStorage.MemoStatus == "Active")
            $('#btn_save_info').prop('disabled', true);

        $('#div_content').find('input, textarea, button, select').removeAttr("disabled");
        RackRate.ToggleBaseContols(false);
        $('#txt_lumpsum_less_total').attr("disabled", "disabled");
        if (sessionStorage.MemoFrom == "Discarded")
            $('#btn_save_info').prop('disabled', true);

        $("#lnk_view_remarks").remove();
        $("#lnk_view_rate_trail").remove();
        $("#hdr_name").text("Rack Rate Information");
        $("#div_content").show();

        $("#div_add_rack_rate").show();
        $("#div_masterqueue").hide();
        $("#div_landing_grid").hide();
        $("#div_freeze").hide();
        $("#div_manage").hide();
        $("#btn_reorder").hide();
        $("#btn_delete").show();

        RackRate.addRow(0);
        $('#txt_lumpsum_less_total').attr('disabled', 'disabled')

        if (sessionStorage.MemoStatus == "Rejected") {
            if (sessionStorage.LoginUserId.toLowerCase() != sessionStorage.LoginId.toLowerCase()) {
                RackRate.DisableControlsOnView(true);
            }
        }
        RackRate.SlabTypeOnchange(0)
        if ($('#dd_slab_type').val() == "Slab Amount") {
            //$('#txt_slab_amount').val("");
            //$('#dd_slab_amount_type').val("Lakhs");
            //$('#txt_slab_amount').removeAttr("disabled");
            //$('#dd_slab_amount_type').removeAttr("disabled");
        } else {
            $('#txt_slab_amount').val("");
            $('#dd_slab_amount_type').val("");
            $('#txt_slab_amount').attr("disabled", "disabled");
            $('#dd_slab_amount_type').attr("disabled", "disabled");
        }
        $('.remark-count-inner').html("0");
        RackRate.RemoveSIP();

    },

    ViewInitiateRackRate: function () {


        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_initiate").addClass("active");

        $("#div_btn").empty();
        var input = $('<button class="btn btn-success sq-btn fr" id="btn_initiate_submit" onclick=\"RackRate.InitiateSubmit();\">Submit</button><button class="btn btn-primary sq-btn fr" id="btn_search" onclick=\"RackRate.GetCreateBaseRackRate();\">Search</button> <button class="btn btn-warning sq-btn fr" onclick="RackRate.clearFields(); "><img src="../img/repeat-btn.png"></button>');
        $("#div_btn").append(input);

        //if (sessionStorage.RoleID == 5 || sessionStorage.RoleID == 8 || sessionStorage.RoleID == 9)
        //    $("#btn_save_success").disabled = "disabled";

        $("#hdr_name").text("Initiate Rack Rate");
        $('#div_content').find('input, textarea, button, select').removeAttr("disabled");
        RackRate.ToggleBaseContols(false);
        $('#txt_lumpsum_less_total').attr("disabled", "disabled");
        $('#grid_search_result').hideCol('selectradio');
        $('#grid_search_result').showCol('selectcheck');
        $("#btn_reorder").show();
        $("#btn_delete").show();
        $('#grid_search_result').hideCol('MemoNumber');
        $('#grid_search_result').showCol('MemoId');

        $("#div_content").hide();
        $("#div_add_rack_rate").show();
        $("#div_landing_grid").show();
        $("#div_freeze").hide();
        $("#div_manage").hide();
        $("#div_masterqueue").hide();
        sessionStorage.CurrentMenuselected = "nav_initiate";
        RackRate.ClearSearchFilter();
        RackRate.AutoSearch();
        RackRate.RemoveSIP();

    },

    ViewRackRateReview: function () {
        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_review").addClass("active");

        $("#div_btn").empty();

        var input = $('<button class="btn btn-primary mr-right-01" id="btn_search" onclick=\"RackRate.GetCreateBaseRackRate();\">Search</button>' +
                    '<button href="#div_remarks" class="btn btn-warning mr-right-01" id="btn_review_Discard" onclick=\"RackRate.review_Discard();\">Discard</button>' +
                    '<button href="#div_remarks" class="btn btn-danger mr-right-01" id="btn_review_reject" onclick=\"RackRate.review_Reject();\">Reject</button>' +
                    '<button class="btn btn-success mr-right-01" id="btn_review_forward" onclick=\"RackRate.ReviewForward();\">Forward</button>');
        $("#div_btn").append(input);
        $('#div_content').find('input, textarea, button, select').removeAttr("disabled");
        RackRate.ToggleBaseContols(true);
        $('#txt_lumpsum_less_total').attr("disabled", "disabled");
        $('#grid_search_result').hideCol('selectradio');
        $('#grid_search_result').showCol('selectcheck');
        $("#btn_reorder").hide();
        $("#btn_delete").hide();
        RackRate.hidecheckbox();
        $('#grid_search_result').hideCol('MemoNumber');
        $('#grid_search_result').showCol('MemoId');

        $("#hdr_name").text("Rack Rate Review");

        $("#div_content").hide();
        $("#div_add_rack_rate").hide();
        $("#div_landing_grid").show();
        $("#div_freeze").hide();
        $("#div_manage").hide();
        $("#div_masterqueue").hide();

        sessionStorage.CurrentMenuselected = "nav_review";
        RackRate.ClearSearchFilter();
        RackRate.AutoSearch();
        RackRate.RemoveSIP();

    },

    ViewRackRateApproval: function () {
        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_approval").addClass("active");
        $("#btn_reorder").hide();
        $("#btn_delete").hide();
        RackRate.hidecheckbox();
        $("#div_btn").empty();
        //input = $(' <button class="btn btn-warning mr-right-01">Discard</button><button class="btn btn-danger mr-right-01">Reject</button><button class="btn btn-success mr-right-01"  onclick=\"RackRate.RackRateApproval();\">Approve</button><button class="btn btn-success  mr-right-01">Save</button><button class="btn btn-danger mr-right-01" onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
        var input = $('<button class="btn btn-primary mr-right-01" id="btn_search" onclick=\"RackRate.GetCreateBaseRackRate();\">Search</button> ' +
            '<button  href="#div_remarks" class="btn btn-warning mr-right-01" id ="btn_approval_Discard" onclick=\"RackRate.ApprovalDiscard();\">Discard</button>' +
            '<button  href="#div_remarks" class="btn btn-danger mr-right-01" id ="btn_approval_reject" onclick=\"RackRate.ApprovalReject();\">Reject</button>' +
            '<button class="btn btn-success mr-right-01" id ="btn_approval_approve" onclick=\"RackRate.RackRateApproval();\">Approve</button>');
        $("#div_btn").append(input);
        $('#div_content').find('input, textarea, button, select').removeAttr("disabled");
        RackRate.ToggleBaseContols(true);
        $('#txt_lumpsum_less_total').attr("disabled", "disabled");
        $('#grid_search_result').hideCol('selectradio');
        $('#grid_search_result').showCol('selectcheck');

        $('#grid_search_result').hideCol('MemoNumber');
        $('#grid_search_result').showCol('MemoId');

        $("#hdr_name").text("Rack Rate Approval");
        //$("#div_content").show();
        $("#div_content").hide();
        $("#div_add_rack_rate").hide();
        $("#div_landing_grid").show();
        $("#div_freeze").hide();
        $("#div_manage").hide();
        $("#div_masterqueue").hide();
        sessionStorage.CurrentMenuselected = "nav_approval";
        RackRate.ClearSearchFilter();
        RackRate.AutoSearch();
    },

    ViewFreezeRackRate: function () {
        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_freeze").addClass("active");
        $("#btn_reorder").hide();
        $("#btn_delete").hide();
        RackRate.hidecheckbox();
        $("#div_btn").empty();
        var input = $('<button class="btn btn-primary mr-right-01" id="btn_search" onclick=\"RackRate.GetCreateBaseRackRate();\">Search</button> ' +
            '<button class="btn btn-primary mr-right-01" id="btn_freeze_freeze" onclick=\"RackRate.RackRateFreeze();\">Freeze</button>' +
            '<button id="btn_freeze_Discard" href="#div_remarks" class="btn btn-primary mr-right-01"  onclick=\"RackRate.FreezeDiscard();\">Discard</button>');
        $("#div_btn").append(input);
        $('#div_content').find('input, textarea, button, select').attr('disabled', 'disabled');
        RackRate.ToggleBaseContols(true);
        $("#hdr_name").text("Freeze Rack Rate");
        $("#div_content").hide();

        $('#txt_arn_info').tokenInput('toggleDisabled', true);
        $('#txt_arn_name_info').tokenInput('toggleDisabled', true);

        $("#div_add_rack_rate").hide();
        $("#div_landing_grid").show();
        $("#div_freeze").hide();
        $("#div_manage").hide();
        $("#div_masterqueue").hide();

        $('#grid_search_result').hideCol('selectradio');
        $('#grid_search_result').showCol('selectcheck');

        $('#grid_search_result').showCol('MemoNumber');
        $('#grid_search_result').hideCol('MemoId');
        $('#txt_remarks').removeAttr('disabled');
        sessionStorage.CurrentMenuselected = "nav_freeze";
        RackRate.ClearSearchFilter();
        RackRate.AutoSearch();
    },

    ViewManageRackRate: function () {


        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_manage").addClass("active");
        $("#btn_reorder").hide();
        $("#btn_delete").hide();
        RackRate.hidecheckbox();
        $("#div_btn").empty();
        var input = $('<button class="btn btn-primary mr-right-01" id="btn_search" onclick=\"RackRate.GetCreateBaseRackRate();\">Search</button> ' +
              '<button class="btn btn-primary mr-right-01" id="btn_email" onclick=\"RackRate.Viewtoccusers();\" target="_blank">Email</button>' +
           '<button class="btn btn-primary mr-right-01" id="btn_print" onclick=\"RackRate.PrintRackRate();\">Print</button>');
        $("#div_btn").append(input);

        $("#hdr_name").text("Manage Rack Rate");
        $("#div_content").hide();
        $('#div_content').find('input, textarea, button, select').attr('disabled', 'disabled');
        RackRate.ToggleBaseContols(true);
        $("#div_add_rack_rate").hide();
        $("#div_landing_grid").show();
        $("#div_freeze").hide();
        $("#div_manage").hide();
        $("#div_masterqueue").hide();
        $('#grid_search_result').hideCol('selectradio');
        $('#grid_search_result').showCol('selectcheck');

        $('#grid_search_result').hideCol('MemoId');
        $('#grid_search_result').showCol('MemoNumber');
        sessionStorage.CurrentMenuselected = "nav_manage";
        RackRate.ClearSearchFilter();
        RackRate.AutoSearch();
    },

    ToggleBaseContols: function (val) {
        if (val == true) {
            $('#dd_dist_category_info').multiselect('disable');
            $('#txt_arn_name_info').attr('disabled', 'disabled');
            $('#dt_from').attr('disabled', 'disabled');
            $('#dt_to').attr('disabled', 'disabled');
            $('#imgdt_from').attr('disabled', 'disabled');
            $('#imgdt_to').attr('disabled', 'disabled');
            $('#txt_arn_info').tokenInput('toggleDisabled', true);
            $('#txt_arn_name_info').tokenInput('toggleDisabled', true);
        }
        else {
            $('#dd_dist_category_info').multiselect('enable');
            $('#dd_dist_category_info').removeAttr('disabled');
            $('#txt_arn_name_info').removeAttr('disabled');
            $('#dt_from').removeAttr('disabled');
            $('#dt_to').removeAttr('disabled');
            $('#imgdt_from').removeAttr('disabled');
            $('#imgdt_to').removeAttr('disabled');
            $('#txt_arn_info').tokenInput('toggleDisabled', false);
            $('#txt_arn_name_info').tokenInput('toggleDisabled', false);
        }
    },

    LoadDropDowns: function () {
        $("#txt_arn_info").siblings("ul").remove();
        $("#txt_arn_name_info").siblings("ul").remove();
        $("#txt_arn").siblings("ul").remove();
        $("#txt_arn_name").siblings("ul").remove();
        RackRate.GetDistributorCategory_info("");
        RackRate.GetARN_info("");
        RackRate.GetARNName("");
        RackRate.GetSchemeCategory("");
        //RackRate.GetScheme("");
        $('#dd_scheme').multiselect('rebuildscheme');
        RackRate.GetChannel("");

        RackRate.GetDistributorCategory("");

        RackRate.GetARN("");
        RackRate.GetARNNameInfo("");

        RackRate.LoadMailingList();
    },

    RefreshSearchGrid: function () {
        $('#grid_search_result').trigger("reloadGrid");
    },

    GetCreateBaseRackRate: function () {
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

        var ARNName = "";
        var ARNtokenName = $("#txt_arn_name").tokenInput("get");
        var ARNnames = [];

        $.each(ARNtokenName, function (i, obj) {
            ARNnames.push(obj.name);//build an array of just the names
        });
        ARNName = ARNnames.toString();

        var SearchGridResult;

        sessionStorage.setItem("DistributorCategory", DistributorCategory);
        sessionStorage.setItem("Channel", Channel);
        sessionStorage.setItem("ARN", ARNNo);

        sessionStorage.setItem("DistributorCategorySearch", DistributorCategory);
        sessionStorage.setItem("ChannelCreateSearch", Channel);
        sessionStorage.setItem("ARNCreateSearch", ARNNo);

        var SearchStatus = "";
        var RoleID = sessionStorage.getItem("RoleID");
        if (sessionStorage.CurrentMenuselected == "nav_initiate")
            SearchStatus = "Saved,Rejected";
        else if (sessionStorage.CurrentMenuselected == "nav_review") {
            if (RoleID == "10")
                SearchStatus = "Initiated,Reviewed,Rejected";
            else
                SearchStatus = "Initiated,Reviewed";
        }

        else if (sessionStorage.CurrentMenuselected == "nav_approval")
            SearchStatus = "Reviewed,Approved";
        else if (sessionStorage.CurrentMenuselected == "nav_freeze")
            SearchStatus = "Approved";
        else if (sessionStorage.CurrentMenuselected == "nav_manage")
            SearchStatus = "Active";

        var MasterQueueStatus = "";
        //if (DistributorCategory != "" || Channel != "" || ARNNo != "") {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetCreateBaseRackRate', JSON.stringify({ ArnNo: ARNNo, Channel: Channel, DistributorCategory: DistributorCategory, Status: SearchStatus, MasterQueueStatus: MasterQueueStatus, ARNName: ARNName, SearchFilter: Utility.ListSearchText }), "json", false, false, function (result) {
            SearchGridResult = result.GetCreateBaseRackRateResult;
            $('#grid_search_result').jqGrid('clearGridData');
            if (SearchGridResult.length > 0) {
                for (var i = 0; i < SearchGridResult.length; i++)
                    jQuery("#grid_search_result").jqGrid('addRowData', SearchGridResult[i].id, SearchGridResult[i]);
            }
            else {
                Utility.writeNotification("norecords", "No Records Found", "", false);
            }

        });
        //}
        //else {
        //    $('#grid_search_result').jqGrid('clearGridData');
        //}
    },

    BindDetails: function (PaymemtMemoID) {
        if (PaymemtMemoID != "") {
            // $('#btn_save_info').attr('disabled', 'disabled')

            $('#div_rack_rate_detail').empty();
            RackRate.TempmonthList = [];
            RackRate.TempyearList = [];
            RackRate.TempPaymentList = [];
            RackRate.TempPaymentDetails = [];
            RackRate.TempLoadedPaymentList = [];
            RackRate.TempLoadedPaymentDetails = [];
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentMemo', '{"PaymentMemoID": ' + PaymemtMemoID + '}', "json", false, false, function (result) {
                var PaymentMemo = result.GetPaymentMemoResult[0];

                $("#hidden_payment_memo_id").val(PaymentMemo.PaymentMemoId);
                $("#hidden_copied_payment_memo_id").val("0");
                TransactionType = PaymentMemo.TransactionType.split(",");
                $('.myCheckbox').attr('checked', 'checked');
                $('#chk_purchase').removeAttr('checked');
                $('#chk_switch_ins').removeAttr('checked');
                $('#chk_sip').removeAttr('checked');
                $('#chk_others').removeAttr('checked');
                $('#dd_LumpsumSIPType').val(PaymentMemo.LumpsumSIPTypeId); //sini
                $.each(TransactionType, function (key, value) {
                    switch (value) {
                        case "1":
                            $('#chk_purchase').prop('checked', true);
                            break;
                        case "2":
                            $('#chk_switch_ins').prop('checked', true);
                            break;
                        case "3":
                            $('#chk_sip').prop('checked', true);
                            break;
                        case "4":
                            $('#chk_others').prop('checked', true);
                            break;
                    }
                });
                $("#dt_from").val(PaymentMemo.DateFrom);
                $("#dt_to").val(PaymentMemo.DateTo);

                //$("#dt_to").datepicker("option", "minDate", PaymentMemo.DateFrom);
                //$("#dt_from").datepicker("option", "maxDate", PaymentMemo.DateTo);

                //if (PaymentMemo.MemoStatus == "Saved") {
                //    $("#txt_remarks").val(PaymentMemo.Remarks)
                //} else {
                $("#txt_remarks").val("");
                //}
                $("#txt_additional_notes").text(PaymentMemo.Comments);
                $("#txt_others").val(PaymentMemo.TransactionTypeOthers);
                RackRate.IsCloseEnded = PaymentMemo.IsCloseEnded.toLowerCase() == "true" ? 1 : 0;
                RackRate.ShowMemoType();
                RackRate.GetSchemeCategory("");
                sessionStorage.setItem("MemoStatus", PaymentMemo.MemoStatus);
                sessionStorage.setItem("LoginUserId", PaymentMemo.LoginId);
                //if(PaymentMemo.MemoStatus == "Active")
                //    $('#btn_save_info').attr('disabled', 'disabled')

            });

            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentListWithInactive', '{"PaymentMemoID": ' + $("#hidden_payment_memo_id").val() + '}', "json", false, false, function (result) {
                var PaymentList = result.GetPaymentListWithInactiveResult;
                var paymentDetail;
                RackRate.DetailCount = PaymentList.length;

                var objList = [];
                var monthdata = [];
                var yeardata = [];
                //for (cnt = 0; cnt < RackRate.DetailCount; cnt++)    
                //{
                if (RackRate.DetailCount > 0) {
                    //$("#txt_arn_name_info").val(PaymentList[0].ARNName);
                    //$("#txt_arn_name_info").val("");

                    $("#txt_arn_info").tokenInput('clear');
                    var ARNNoArr = PaymentList[0].ARNNO.split(",");
                    $.each(RackRate.arns, function (key, value) {
                        for (i = 0; i < ARNNoArr.length; i++) {
                            if (value.name == ARNNoArr[i]) {
                                $("#txt_arn_info").tokenInput("add", { id: value.id, name: value.name });
                            }
                        }
                    });

                    $('#dd_dist_category_info').multiselect('clearSelection');
                    var DistributorCategoryArr = PaymentList[0].DistributorCategoryId.split(",");
                    for (i = 0; i < DistributorCategoryArr.length; i++) {
                        $('#dd_dist_category_info').multiselect('select', DistributorCategoryArr[i]);
                    }

                    if (DistributorCategoryArr.length > 0 || ARNNoArr.length > 0) {
                        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSlab', JSON.stringify({ DistributorCategoryID: DistributorCategoryArr.toString(), Arnno: ARNNoArr.toString() }), "json", false, false, function (result) {
                            var slabamount = result.GetSlabResult;

                            if (slabamount == "No Slab" || slabamount == "") {
                                $('#dd_slab_type').val("All Amounts");
                                $('#txt_slab_amount').val("");
                                $('#dd_slab_amount_type').val("");
                                $('#txt_slab_amount').attr("disabled", "disabled");
                                $('#dd_slab_amount_type').attr("disabled", "disabled");
                                $('#hidden_Slab_Amount').val("")
                                $('#hidden_Slab_Amount_Type').val("")
                            }
                            else if (slabamount.split(' ').length > 1) {
                                $('#dd_slab_amount_type').val(slabamount.split(' ')[1]);

                                $('#txt_slab_amount').val(slabamount.split(' ')[0]);

                                $('#hidden_Slab_Amount').val(slabamount.split(' ')[0])
                                $('#hidden_Slab_Amount_Type').val(slabamount.split(' ')[1])
                            }

                            RackRate.SlabTypeOnchange(0);
                        });

                        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSIPSlab', JSON.stringify({ DistributorCategoryID: DistributorCategoryArr.toString(), Arnno: ARNNoArr.toString() }), "json", false, false, function (result) {
                            var SIPslabamount = result.GetSIPSlabResult;
                            if (Utility.enableSIP == true) {
                                $('#spn_sip_slab_less').html(SIPslabamount);
                                $('#spn_sip_slab_greater').html(SIPslabamount);
                                $('#spn_trail_sip_slab_less').html(SIPslabamount);
                                $('#spn_trail_sip_slab_greater').html(SIPslabamount);
                                $('#txt_sip_slab').val(SIPslabamount);
                            }
                        });
                    }
                    //$("#txt_arn_name_info").val("");
                    //$("#txt_arn_name_info").val(PaymentList[0].ARNName);
                }
                //}

                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentDetails', '{"PaymentMemoID": ' + $("#hidden_payment_memo_id").val() + '}', "json", false, false, function (result) {

                    paymentDetail = result.GetPaymentDetailsResult;
                    RackRate.TempLoadedPaymentDetails = paymentDetail;
                    for (var cnt = 0; cnt < RackRate.DetailCount; cnt++) {
                        objList = {
                            PaymentListId: PaymentList[cnt].PaymentListId,
                            scheme_category: PaymentList[cnt].SchemeCategoryName,
                            schemecategoryid: PaymentList[cnt].SchemeCategoryId,
                            scheme: PaymentList[cnt].SchemeName,
                            schemeid: PaymentList[cnt].SchemeId,
                            claw_back: PaymentList[cnt].Clawback,
                            slab_amount: PaymentList[cnt].SlabAmount,
                            PaymentType: PaymentList[cnt].PaymentType,
                            SlabType: PaymentList[cnt].SlabType,
                            Onwards: PaymentList[cnt].Onwards,
                            SIPSlab: PaymentList[cnt].SIPSlab
                        };
                        monthdata = [];
                        yeardata = [];
                        if (Utility.enableSIP == true) {
                            $('#txt_sip_slab').val(PaymentList[cnt].SIPSlab);
                            $('#spn_sip_slab_less').html(PaymentList[cnt].SIPSlab);
                            $('#spn_sip_slab_greater').html(PaymentList[cnt].SIPSlab);
                            $('#spn_trail_sip_slab_less').html(PaymentList[cnt].SIPSlab);
                            $('#spn_trail_sip_slab_greater').html(PaymentList[cnt].SIPSlab);
                        }
                        var monthperiods = ""; var yearperiods = "";
                        var yearcount = 0;
                        for (detcount = 0; detcount < paymentDetail.length; detcount++) {
                            if (PaymentList[cnt].SchemeId == paymentDetail[detcount].SchemeId) {
                                if (paymentDetail[detcount].BrokerageTypeId == 1) {
                                    objList.UpfrontDetailId = paymentDetail[detcount].PaymentDetailsId;
                                    objList.aadl_incentive_type = 0;
                                    objList.Base = paymentDetail[detcount].BaseUpfront;
                                    objList.Additional = paymentDetail[detcount].AdditionalIncentives;
                                    objList.Total = paymentDetail[detcount].Total;
                                    objList.LumpSumGreater = paymentDetail[detcount].LumpSumGreater;
                                    objList.SIPSlabLess = paymentDetail[detcount].SIPSlabLess;
                                    objList.SIPSlabGreater = paymentDetail[detcount].SIPSlabGreater;

                                    var detailitem = {}
                                    detailitem["schemeid"] = PaymentList[cnt].SchemeId;
                                    detailitem["schemecategoryid"] = PaymentList[cnt].SchemeCategoryId;
                                    detailitem["scheme_category"] = PaymentList[cnt].SchemeCategoryName;
                                    detailitem["scheme"] = PaymentList[cnt].SchemeName;
                                    detailitem["BrokerageTypeId"] = 1;
                                    detailitem["Base"] = paymentDetail[detcount].BaseUpfront;
                                    detailitem["Additional"] = paymentDetail[detcount].AdditionalIncentives;
                                    detailitem["Total"] = paymentDetail[detcount].Total;
                                    detailitem["LumpSumGreater"] = paymentDetail[detcount].LumpSumGreater;
                                    detailitem["SIPSlabLess"] = paymentDetail[detcount].SIPSlabLess;
                                    detailitem["SIPSlabGreater"] = paymentDetail[detcount].SIPSlabGreater;
                                    detailitem["PeriodStart"] = 0;
                                    detailitem["PeriodEnd"] = 0;
                                    detailitem["PeriodType"] = 0;
                                    RackRate.TempPaymentDetails.push(detailitem);
                                }

                                if (paymentDetail[detcount].BrokerageTypeId == 2) {
                                    objList.addl_upfront_B15_id = paymentDetail[detcount].PaymentDetailsId;
                                    objList.addl_upfront_B15 = paymentDetail[detcount].BaseUpfront;

                                    var detailitem = {}
                                    detailitem["schemeid"] = PaymentList[cnt].SchemeId;
                                    detailitem["schemecategoryid"] = PaymentList[cnt].SchemeCategoryId;
                                    detailitem["scheme_category"] = PaymentList[cnt].SchemeCategoryName;
                                    detailitem["scheme"] = PaymentList[cnt].SchemeName;
                                    detailitem["BrokerageTypeId"] = 2;
                                    detailitem["Base"] = paymentDetail[detcount].BaseUpfront;
                                    detailitem["Additional"] = 0;
                                    detailitem["Total"] = 0;
                                    detailitem["LumpSumGreater"] = 0;
                                    detailitem["SIPSlabLess"] = 0;
                                    detailitem["SIPSlabGreater"] = 0;
                                    detailitem["PeriodStart"] = 0;
                                    detailitem["PeriodEnd"] = 0;
                                    detailitem["PeriodType"] = 0;
                                    RackRate.TempPaymentDetails.push(detailitem);
                                }

                                if (paymentDetail[detcount].BrokerageTypeId == 3) {
                                    if (paymentDetail[detcount].PeriodType == '1') {
                                        month = {
                                            PaymentDetailsId: paymentDetail[detcount].PaymentDetailsId,
                                            Period: "Months",
                                            //Duration: paymentDetail[detcount].PeriodStart + ' - ' + paymentDetail[detcount].PeriodEnd,
                                            PeriodStart: paymentDetail[detcount].PeriodStart,
                                            PeriodEnd: paymentDetail[detcount].PeriodEnd,
                                            Base: paymentDetail[detcount].BaseUpfront,
                                            Additional: paymentDetail[detcount].AdditionalIncentives,
                                            Total: paymentDetail[detcount].Total,
                                            LumpSumGreater: paymentDetail[detcount].LumpSumGreater,
                                            SIPSlabLess: paymentDetail[detcount].SIPSlabLess,
                                            SIPSlabGreater: paymentDetail[detcount].SIPSlabGreater
                                        };
                                        monthdata.push(month)

                                        var period = paymentDetail[detcount].PeriodStart + ' - ' + paymentDetail[detcount].PeriodEnd;
                                        monthperiods = monthperiods == "" ? period : monthperiods + "," + period;

                                        var detailitem = {}
                                        detailitem["schemeid"] = PaymentList[cnt].SchemeId;
                                        detailitem["schemecategoryid"] = PaymentList[cnt].SchemeCategoryId;
                                        detailitem["scheme_category"] = PaymentList[cnt].SchemeCategoryName;
                                        detailitem["scheme"] = PaymentList[cnt].SchemeName;
                                        detailitem["BrokerageTypeId"] = 3;
                                        detailitem["Base"] = paymentDetail[detcount].BaseUpfront;
                                        detailitem["Additional"] = paymentDetail[detcount].AdditionalIncentives;
                                        detailitem["Total"] = paymentDetail[detcount].Total;
                                        detailitem["LumpSumGreater"] = paymentDetail[detcount].LumpSumGreater;
                                        detailitem["SIPSlabLess"] = paymentDetail[detcount].SIPSlabLess;
                                        detailitem["SIPSlabGreater"] = paymentDetail[detcount].SIPSlabGreater;
                                        detailitem["monthperiods"] = period;
                                        detailitem["PeriodStart"] = paymentDetail[detcount].PeriodStart;
                                        detailitem["PeriodEnd"] = paymentDetail[detcount].PeriodEnd;
                                        detailitem["PeriodType"] = 1;
                                        RackRate.TempmonthList.push(detailitem);
                                        RackRate.TempPaymentDetails.push(detailitem);
                                    }
                                    else if (paymentDetail[detcount].PeriodType == '2') {
                                        year = {
                                            PaymentDetailsId: paymentDetail[detcount].PaymentDetailsId,
                                            Period: "Year",
                                            //Duration: paymentDetail[detcount].PeriodStart,
                                            PeriodStart: paymentDetail[detcount].PeriodStart,
                                            PeriodEnd: paymentDetail[detcount].PeriodEnd,
                                            Base: paymentDetail[detcount].BaseUpfront,
                                            Additional: paymentDetail[detcount].AdditionalIncentives,
                                            Total: paymentDetail[detcount].Total,
                                            LumpSumGreater: paymentDetail[detcount].LumpSumGreater,
                                            SIPSlabLess: paymentDetail[detcount].SIPSlabLess,
                                            SIPSlabGreater: paymentDetail[detcount].SIPSlabGreater
                                        };
                                        yeardata.push(year)

                                        yearcount += 1;
                                        var detailitem = {}
                                        detailitem["schemeid"] = PaymentList[cnt].SchemeId;
                                        detailitem["schemecategoryid"] = PaymentList[cnt].SchemeCategoryId;
                                        detailitem["scheme_category"] = PaymentList[cnt].SchemeCategoryName;
                                        detailitem["scheme"] = PaymentList[cnt].SchemeName;
                                        detailitem["BrokerageTypeId"] = 3;
                                        detailitem["Base"] = paymentDetail[detcount].BaseUpfront;
                                        detailitem["Additional"] = paymentDetail[detcount].AdditionalIncentives;
                                        detailitem["Total"] = paymentDetail[detcount].Total;
                                        detailitem["LumpSumGreater"] = paymentDetail[detcount].LumpSumGreater;
                                        detailitem["SIPSlabLess"] = paymentDetail[detcount].SIPSlabLess;
                                        detailitem["SIPSlabGreater"] = paymentDetail[detcount].SIPSlabGreater;
                                        detailitem["monthperiods"] = period;
                                        detailitem["PeriodStart"] = paymentDetail[detcount].PeriodStart;
                                        detailitem["PeriodEnd"] = paymentDetail[detcount].PeriodEnd;
                                        detailitem["PeriodType"] = 2;
                                        RackRate.TempyearList.push(detailitem);
                                        RackRate.TempPaymentDetails.push(detailitem);
                                    }

                                }
                            }
                        }
                        objList.monthperiods = monthperiods;
                        objList.yearcount = yearcount;
                        objList.mothyearvalue = PaymentList[cnt].SchemeCategoryId + '/' + PaymentList[cnt].SchemeCategoryName + '/' + monthperiods + "~" + yearcount;
                        RackRate.TempPaymentList.push(objList);
                        RackRate.TempLoadedPaymentList.push(objList);

                    }
                });
                Utility.AllowDecimal();
                Utility.AllowAlphaNumeric();

                //RackRate.ViewAction(PaymemtMemoID);
                var mode = Utility.GetParameterValues('mode');
                if (mode != null) {
                    if (mode == "copy") {
                        $("#hidden_copied_payment_memo_id").val($("#hidden_payment_memo_id").val());
                        $("#hidden_payment_memo_id").val(0);
                        $('#btn_save_info').prop('disabled', false);
                        $("#txt_additional_notes").text("");
                        $('#txt_additional_notes').text(RackRate.additionalNotes(1));
                    }
                }
            });
            var mindate = "";
            var maxdate = "";
            var dateToday = new Date();
            var seldate = dateToday.getMonth() + 1 + "/01/" + dateToday.getFullYear();
            var currmonth = dateToday.getMonth() + 1;
            var RoleID = sessionStorage.getItem("RoleID");
            if (RoleID == "3" || RoleID == "10") {
            }
            else {
                if (currmonth == 1 || currmonth == 2 || currmonth == 3) {
                    mindate = currmonth + "/01/" + dateToday.getFullYear();
                    maxdate = "03/31/" + dateToday.getFullYear();
                }
                else if (currmonth == 4 || currmonth == 5 || currmonth == 6) {
                    mindate = currmonth + "/01/" + dateToday.getFullYear();
                    maxdate = "06/30/" + dateToday.getFullYear();
                }
                else if (currmonth == 7 || currmonth == 8 || currmonth == 9) {
                    mindate = currmonth + "/01/" + dateToday.getFullYear();
                    maxdate = "09/30/" + dateToday.getFullYear();
                }
                else if (currmonth == 10 || currmonth == 11 || currmonth == 12) {
                    mindate = currmonth + "/01/" + dateToday.getFullYear();
                    maxdate = "12/31/" + dateToday.getFullYear();
                }
                mindate = new Date(mindate);
                maxdate = new Date(maxdate);
            }

            $("#dt_from").datepicker({
                dateFormat: 'dd/mm/y',
                changeMonth: true,
                changeYear: true,
                minDate: mindate,
                maxDate: maxdate,
                onSelect: function (selectedDate) {
                    $("#dt_to").datepicker({
                        dateFormat: 'dd/mm/y',
                        changeMonth: true,
                        changeYear: true,
                        //maxDate: maxdate,
                    });
                    var tomindate = selectedDate.split('/')[1] + "/" + selectedDate.split('/')[0] + "/20" + selectedDate.split('/')[2];
                    tomindate = new Date(tomindate);
                    if (tomindate < new Date(dateToday)) {
                        if ((RoleID == "3" || RoleID == "10") && Utility.enableBackDate == false) {
                            tomindate = selectedDate;
                        } else {
                            tomindate = new Date(dateToday);
                        }
                    }
                    else {
                        tomindate = selectedDate; // selectedDate.split('/')[1] + "/" + selectedDate.split('/')[0] + selectedDate.split('/')[2];
                        //tomindate = new Date(selectedDate);
                    }
                    if (RoleID == "3" || RoleID == "10") {

                        $("#dt_to").datepicker("option", "minDate", tomindate);
                    }
                    //$("#dt_to").focus();
                }
            });

            $("#dt_to").datepicker({
                dateFormat: 'dd/mm/y',
                changeMonth: true,
                changeYear: true,
                maxDate: maxdate,
            });

            $("#dt_to").datepicker("option", "minDate", $("#dt_from").val());

            if (sessionStorage.MemoStatus == "Active" || sessionStorage.MemoStatus == "InActive") {
                $("#lnk_view_remarks").remove();
                $("#lnk_view_rate_trail").remove();
            }
            RackRate.ViewRemarks();
        }
        else {
            Utility.writeNotification("warning", "Invalid Payment Memo ID", "", true);
            //alert("Invalid Payment Memo ID");
        }

    },

    ViewScreen: function (PaymentMemoId) {
        //var Searchbutton = '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"RackRate.GetCreateBaseRackRate();\">Search</button>';

        /////For IE 9
        //if ($.browser.msie && $.browser.version == 9) {
        //    Searchbutton = "<button id=\"btn_search\" class=\"btn btn-primary sq-btn\" onclick=\"RackRate.GetCreateBaseRackRate();\">Search</button>";
        //}

        var value = ' <button class="btn btn-danger sq-btn fr" id=btn_save_cancel onclick="RackRate.CloseScreen();">Cancel</button>' +
                            '<button class="btn btn-success sq-btn fr" id="btn_save_info" onclick="RackRate.SaveInitiate();">Save</button>' +
                            '<button class="btn btn-warning sq-btn fr" onclick="RackRate.InitiateSubmit();">Submit</button>' +
                            '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                            '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal123" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>';


        //value = value.replace(Searchbutton, '');

        $("#div_btn").empty();
        $("#div_btn").append(value);
        var input = "";
        if (sessionStorage.CurrentMenuselected == "nav_freeze" || sessionStorage.CurrentMenuselected == "nav_manage") {
            input = $('<br/><br/><button class="btn mr-right-01 btn-danger sq-btn" onclick=\"RackRate.CloseScreen();\">Cancel</button>');
        }
        else {
            if ($.browser.msie && $.browser.version == 9) {
                if ($("#div_btn").html().search("Submit") > 0) {

                    RackRate.ClearSection();
                    input = $('<br/><br/><button class=\"btn mr-right-01 btn-success sq-btn\" id=\"btn_save_initiate\" onclick=\"RackRate.SaveInitiate();\">Save</button><button class=\"btn mr-right-01 btn-danger sq-btn\" onclick=\"RackRate.CloseScreen();\">Cancel</button>');
                } else {
                    input = $('<br/><br/><button class=\"btn mr-right-01 btn-success sq-btn\" id=\"btn_save_review\" onclick=\"RackRate.SaveReview();\">Save</button><button class=\"btn mr-right-01 btn-danger sq-btn\" onclick=\"RackRate.CloseScreen();\">Cancel</button>');
                }
            }
            else {
                RackRate.ClearSection();
                if ($("#div_btn").html().search("Submit") > 0) {

                    input = $('<br/><br/><button class="btn mr-right-01 btn-success sq-btn" id="btn_save_initiate" onclick=\"RackRate.SaveInitiate();\">Save</button><button class="btn mr-right-01 btn-danger sq-btn" onclick=\"RackRate.CloseScreen();\">Cancel</button>');
                } else {
                    input = $('<br/><br/><button class="btn mr-right-01 btn-success sq-btn" id="btn_save_review" onclick=\"RackRate.SaveReview();\">Save</button><button class="btn mr-right-01 btn-danger sq-btn" onclick=\"RackRate.CloseScreen();\">Cancel</button>');
                }
            }
        }
        //$("#div_btn").append(input);

        $("#lnk_view_remarks").remove();
        input = $('  <button style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" href="#" id="lnk_view_remarks"  data-toggle="modal" data-target="#mdl_view_remark_review" onclick=\"RackRate.ViewRemarks();\" class="tt-chk-bx-label flt-right-a mr-right-01" >Remarks History</button>');
        $("#div_remarks").append(input);

        $("#lnk_view_rate_trail").remove();
        input = $('<button style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" href="#" id="lnk_view_rate_trail" data-toggle="modal" data-target="#mdl_view_trail_review" onclick=\"RackRate.ViewModifiedRateHistory();\" class="tt-chk-bx-label flt-right-a mr-right-01" >Modified Rate History</button>');
        $("#div_view_rate_trail").append(input);

        $("#div_content").show();

        $("#div_landing_grid").hide();

        //RackRate.ViewAction(PaymentMemoId);

        RackRate.BindDetails(PaymentMemoId);

        if (sessionStorage.MemoStatus == "Initiated") {
            var ModifiedbyRole;
            var createdbyRole;
            var RoleID = sessionStorage.getItem("RoleID");
            if (RoleID == "2" || RoleID == "4" || RoleID == "3") {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetViewAction', JSON.stringify({ PaymentMemoID: $('#hidden_payment_memo_id').val(), MemoTypeID: 1 }), "json", false, false, function (result) {
                    var arrItems = result.GetViewActionResult;
                    ModifiedbyRole = arrItems.ModifiedByRole;
                    createdbyRole = arrItems.CreatedByRole;
                });

                if (ModifiedbyRole == RoleID && createdbyRole == RoleID) {
                    $("#div_btn").empty();

                    var input = $('<button class="btn mr-right-01 btn-danger" onclick=\"RackRate.CloseScreen(1);\">Cancel</button>');
                    $("#div_btn").append(input);
                }
            }
        }
    },

    CloseScreen: function (addForward) {
        var pagename = Utility.GetParameterValues('ptype');
        if (pagename == "mq") {
            window.location.href = "MasterQueue.html";
        }
        else if (pagename == "ss") {
            sessionStorage.setItem("SmartSearchScreen", "ss");
            window.location.href = "SmartSearchScreen.html";
        }
        else if (pagename == "cr") {
            window.location.href = "CreateRackRate.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
        }
        else if (pagename == "tr") {
            window.location.href = "CreateTieUp.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
        }
            //else if (pagename == "tie") {
            //    window.location.href = ".html?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
            //}
        else {
            var searchbutton = '<button class="btn btn-primary mr-right-01" id="btn_search" onclick=\"RackRate.GetCreateBaseRackRate();\">Search</button>';
            if ($.browser.msie && $.browser.version == 9) {
                Searchbutton = '<button class=\"btn btn-primary mr-right-01\" id=\"btn_search\" onclick=\"RackRate.GetCreateBaseRackRate();\">Search</button>';
            }
            var input = "";
            $('#grid_search_result').hideCol('selectradio');
            $('#grid_search_result').showCol('selectcheck');

            $('#grid_search_result').hideCol('MemoNumber');
            $('#grid_search_result').showCol('MemoId');

            switch (sessionStorage.CurrentMenuselected) {
                //case "":
                //    $('#btn_save_info').removeAttr('disabled');
                //    break;
                case "nav_initiate":
                    $('#btn_initiate_submit').removeAttr('disabled');
                    break;
                case "nav_review":
                    $('#btn_review_Discard').removeAttr('disabled');
                    $('#btn_review_reject').removeAttr('disabled');
                    $('#btn_review_forward').removeAttr('disabled');
                    break;
                case "nav_approval":
                    $('#btn_approval_Discard').removeAttr('disabled');
                    $('#btn_approval_reject').removeAttr('disabled');
                    $('#btn_approval_approve').removeAttr('disabled');
                    break;
                case "nav_freeze":
                    $('#grid_search_result').showCol('MemoNumber');
                    $('#grid_search_result').hideCol('MemoId');
            }
            $("#btn_freeze_freeze").removeAttr('disabled');
            $("#btn_freeze_Discard").removeAttr('disabled');
            if (sessionStorage.CurrentMenuselected == "nav_freeze" || sessionStorage.CurrentMenuselected == "nav_manage") {
                input = '<br><br><button class="btn mr-right-01 btn-danger" onclick=\"RackRate.CloseScreen();\">Cancel</button>';
            }
            else {
                if ($.browser.msie && $.browser.version == 9) {
                    if ($("#div_btn").html().search("Submit") > 0) {
                        $('#btn_save_initiate').removeAttr('disabled')
                        input = '<br><br><button id=\"btn_save_initiate\" class=\"btn mr-right-01 btn-success\" onclick=\"RackRate.SaveInitiate();\">Save</button><button class=\"btn mr-right-01 btn-danger\" onclick=\"RackRate.CloseScreen();\">Cancel</button>';
                    } else {
                        $('#btn_save_review').removeAttr('disabled')
                        input = '<br><br><button id=\"btn_save_review\" class=\"btn mr-right-01 btn-success\" onclick=\"RackRate.SaveReview();\">Save</button><button class=\"btn mr-right-01 btn-danger\" onclick=\"RackRate.CloseScreen();\">Cancel</button>';
                    }
                }
                else {
                    if ($("#div_btn").html().search("Submit") > 0) {
                        $('#btn_save_initiate').removeAttr('disabled')
                        input = '<br><br><button class="btn mr-right-01 btn-success" id="btn_save_initiate" onclick=\"RackRate.SaveInitiate();\">Save</button><button class="btn mr-right-01 btn-danger" onclick=\"RackRate.CloseScreen();\">Cancel</button>';
                    } else {
                        $('#btn_save_review').removeAttr('disabled')
                        input = '<br><br><button class="btn mr-right-01 btn-success" id="btn_save_review" onclick=\"RackRate.SaveReview();\">Save</button><button class="btn mr-right-01 btn-danger" onclick=\"RackRate.CloseScreen();\">Cancel</button>';
                    }
                }
            }
            var value = '<button class="btn btn-success sq-btn fr" id="btn_initiate_submit" onclick=\"RackRate.InitiateSubmit();\">Submit</button><button class="btn btn-primary sq-btn fr" id="btn_search" onclick=\"RackRate.GetCreateBaseRackRate();\">Search</button> <button class="btn btn-warning sq-btn fr" onclick="RackRate.clearFields(); "><img src="../img/repeat-btn.png"></button>';//$("#div_btn").html().replace(input, '');
            $("#div_btn").empty();
            //$("#div_btn").append(searchbutton);
            $("#div_btn").append(value);
            if (addForward == "1") {
                $("#div_btn").empty();
                var btnValue = '<button class="btn btn-primary mr-right-01" id="btn_search" onclick=\"RackRate.GetCreateBaseRackRate();\">Search</button>' +
                    '<button href="#div_remarks" class="btn btn-warning mr-right-01" id="btn_review_Discard" onclick=\"RackRate.review_Discard();\">Discard</button>' +
                    '<button href="#div_remarks" class="btn btn-danger mr-right-01" id="btn_review_reject" onclick=\"RackRate.review_Reject();\">Reject</button>' +
                    '<button class="btn btn-success mr-right-01" id="btn_review_forward" onclick=\"RackRate.ReviewForward();\">Forward</button>';
                $("#div_btn").append(btnValue);
            }

            $("#div_landing_grid").show();
            $("#div_content").hide();

            $('#hidden_payment_memo_id').val("0")
            $('#dd_slab_type').val("Slab Amount");
            $('#div_hdr').empty();
            RackRate.AutoSearch();
        }
    },

    ViewModifiedRateHistory: function () {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetModifiedRateHistory', JSON.stringify({ PaymentMemoId: $("#hidden_payment_memo_id").val() }), "json", false, false, function (result) {
            var History = result.GetModifiedRateHistoryResult;
            var viewHistory = [];
            $.each(History, function (i, obj) {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/getrackrateinfo', JSON.stringify({ Paymentmemoid: obj.PaymentMemoId, Schemeid: obj.SchemeId }), "json", false, false, function (result) {

                    var arrItems = result.getrackrateinfoResult;

                    $('#tbl_view_brokerage_history').empty();
                    $('#tbl_view_brokerage_history').append(arrItems);
                    var currentRowHTML = "";
                    $('#tbl_rate_history tr').not('thead tr').each(function () {
                        var firstrow = $(this).find("td:first");
                        var ptr = $(this).html().replace(firstrow[0].outerHTML, '');
                        var firstsecondrow = $(this).find("td:nth-child(2)");
                        var ptrsts = ptr.replace(firstsecondrow[0].outerHTML, '');
                        if (ptrsts === currentRowHTML) {
                            currentRowHTML = ptrsts;
                            $(this).remove();
                        }
                        else {
                            currentRowHTML = ptrsts;
                        }
                    });

                    var histhtml = $('#tbl_view_brokerage_history').html().split('<tr style=');

                    if (histhtml.length > 1) {
                        var userhtml = histhtml[histhtml.length - 1].split('<span class="rrd-tbl-label-bld">');
                        var user = userhtml[1].split('</span>');
                        var status = userhtml[2].split('</span>');
                        History[i].ActionTakenBy = user[0];
                        History[i].Action = status[0];
                        viewHistory.push(History[i]);
                    }
                });

            });

            $('#tbl_modified_rate_history').jqGrid('clearGridData');
            if (viewHistory.length > 0) {
                for (var i = 0; i < viewHistory.length; i++)
                    jQuery("#tbl_modified_rate_history").jqGrid('addRowData', viewHistory[i].id, viewHistory[i]);
            }
            else {
                Utility.writeNotification("norecords", "No Records Found", "", false);
            }
        });
    },

    ViewRemarks: function () {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetRemarksHistory', JSON.stringify({ PaymentMemoId: $("#hidden_payment_memo_id").val() }), "json", false, false, function (result) {
            remarksHistory = result.GetRemarksHistoryResult;
            $('#tbl_remarks').jqGrid('clearGridData');
            if (remarksHistory.length > 0) {
                $('.remark-count-inner').html(remarksHistory.length);
                for (var i = 0; i < remarksHistory.length; i++)
                    jQuery("#tbl_remarks").jqGrid('addRowData', remarksHistory[i].id, remarksHistory[i]);
            }
            else {
                $('.remark-count-inner').html("0");
                //Utility.writeNotification("norecords", "No Records Found", "", false);
            }
        });
    },

    SaveReview: function () {
        var updateStatus = "";
        //updateStatus = sessionStorage.MemoStaus;
        if (sessionStorage.CurrentMenuselected == "nav_review")
            updateStatus = "Initiated";
        else if (sessionStorage.CurrentMenuselected == "nav_approval")
            updateStatus = "Reviewed";
        RackRate.SaveRackRateInfo(updateStatus, 'Saved Successfully', 1);
    },

    SaveRackRate: function () {
        var updateStatus = "Saved";
        RackRate.SaveRackRateInfo(updateStatus, 'Saved Successfully', 1);
    },

    SaveInitiate: function () {
        var updateStatus = "Saved";
        RackRate.SaveRackRateInfo(updateStatus, 'Saved Successfully', 1);
    },

    InitiateSubmit: function () {
        var updateStatus = "Initiated";

        if ($("#div_landing_grid").is(":visible")) {
            var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
            var selectedmemos = "";
            var memocloseended = [];
            if (gridData.length > 0) {
                var Remarks = "";//$("#txt_remarks").html();

                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].selectcheck == 'True') {
                        if (gridData[i].MemoStatus != 'Rejected') {
                            if (selectedmemos != "")
                                selectedmemos = selectedmemos + ',';
                            selectedmemos = selectedmemos + gridData[i].PaymentMemoId;
                            memocloseended.push(gridData[i].IsCloseEnded.toLowerCase() == "true" ? 1 : 0);
                        }
                    }
                }
                if (selectedmemos != "") {
                    var error = "";
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetScheme', JSON.stringify({ SearchText: "", MemoTypeId: "1", IsCloseEnded: RackRate.IsCloseEnded }), "json", false, false, function (result) {
                        var arrItems = result.GetSchemeResult;
                        var Availableschemes = [];
                        var difference = [];

                        $.each(arrItems, function (i, obj) {
                            Availableschemes.push(obj.SchemeId.toString())
                        });
                        var memoids = selectedmemos.split(',');
                        $.each(memoids, function (mid, mobj) {
                            if (memocloseended[mid] == 0) {
                                var schemeSelected = [];
                                difference = [];
                                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentListWithInactive', '{"PaymentMemoID": ' + mobj + '}', "json", false, false, function (result) {
                                    var PaymentList = result.GetPaymentListWithInactiveResult;
                                    $.each(PaymentList, function (i, pscheme) {
                                        schemeSelected.push(pscheme.SchemeId.toString())
                                    });
                                });

                                if (arrItems.length > schemeSelected.length) {


                                    jQuery.grep(Availableschemes, function (el) {
                                        if (jQuery.inArray(el, schemeSelected) == -1) difference.push(el);
                                    });

                                    if (difference.length > 0) {
                                        $.each(difference, function (i, schID) {
                                            $.each(arrItems, function (i, obj) {
                                                if (obj.SchemeId == schID) {
                                                    error += "Enter Rack Rate for " + obj.SchemeName.replace("DSP BlackRock", "") + " <br/>";
                                                    return;
                                                }
                                            });
                                        });
                                    }
                                }
                            }
                        });

                    });
                    if (error == "") {
                        //Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus }), "json", false, false, function (result) {
                        Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus, Remarks: Remarks, MemoTypeId: 1 }), "json", false, false, function (result) {
                            Utility.writeNotification("success", "Memo " + updateStatus + " Successfully", "", true);
                            RackRate.AutoSearch();
                            //RackRate.ViewRackRateReview();
                        });
                    }
                    else {
                        Utility.writeNotification("warning", "Rates for scheme/s are missing for selected memo/s", "", true);
                    }
                }
                else {
                    Utility.writeNotification("warning", "Select atleast one Saved Memo to Submit", "", true);
                    //alert("Select Memo to Submit");
                }
            }
        }
        else {
            RackRate.SaveRackRateInfo(updateStatus, 'Memo Submitted Successfully', 0);
        }

    },

    ApprovalDiscard: function (Memonumber) {
        var updateStatus = "Discarded";
        var Remarks = "";
        if ($("#div_landing_grid").is(":visible")) {
            var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
            var selectedmemos = "";
            if (gridData.length > 0) {
                var Remarks = "";// $("#txt_remarks").html();
                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].selectcheck == 'True') {
                        if (selectedmemos != "")
                            selectedmemos = selectedmemos + ',';
                        selectedmemos = selectedmemos + gridData[i].PaymentMemoId;
                    }
                }

                if (selectedmemos != "") {
                    $('#txt_remarks_entry').val("");
                    $('#txt_selected_memos').val(selectedmemos);
                    $('#txt_updated_status').val(updateStatus);
                    $('#txt_click_from').val("ApprovalDiscard");
                    $('#btn_remarks').text("Discard");


                    $('#mdl_remarks_entry').modal('show');

                    //Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus, Remarks: Remarks }), "json", false, false, function (result) {
                    //    Utility.writeNotification("warning", "Memo " + updateStatus + " Successfully", "", true);
                    //    RackRate.AutoSearch();
                    //});
                }
                else {
                    Utility.writeNotification("warning", "Select a Memo to Discarded", "", true);
                    //alert("Select Memo to Discarded");
                }
            }
        }
        else {
            Remarks = $("#txt_remarks").val();
            if (Remarks != "") {
                RackRate.SaveRackRateInfo(updateStatus, 'Memo Discarded Successfully', 0);
            }
            else {
                $("#txt_remarks").focus();
                Utility.writeNotification("warning", "Please enter remarks to Discard the Memo", "", true);

            }
        }
    },

    rejectdiscard: function () {
        if ($("#txt_remarks_entry").val() != "") {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: $('#txt_selected_memos').val(), Status: $('#txt_updated_status').val(), Remarks: $("#txt_remarks_entry").val(), MemoTypeId: 1 }), "json", false, false, function (result) {
                Utility.writeNotification("warning", "Memo " + $('#txt_updated_status').val() + " Successfully", "", true);
                RackRate.AutoSearch();
            });
            $('#mdl_remarks_entry').modal('hide');
        }
        else {
            $("#txt_remarks").focus();
            Utility.writeNotification("warning", "Please enter remarks to " + $('#btn_remarks').text() + " the Memo", "", true);
            //$("#txt_remarks").focus();
        }
    },

    ApprovalReject: function (Memonumber) {
        var updateStatus = "Rejected";
        var Remarks = "";
        if ($("#div_landing_grid").is(":visible")) {
            var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
            var selectedmemos = "";
            if (gridData.length > 0) {

                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].selectcheck == 'True') {
                        if (selectedmemos != "")
                            selectedmemos = selectedmemos + ',';
                        selectedmemos = selectedmemos + gridData[i].PaymentMemoId;
                    }
                }
                if (selectedmemos != "") {
                    $('#txt_remarks_entry').val("");
                    $('#txt_selected_memos').val(selectedmemos);
                    $('#txt_updated_status').val(updateStatus);
                    $('#txt_click_from').val("ApprovalReject");
                    $('#btn_remarks').text("Reject");


                    $('#mdl_remarks_entry').modal('show');
                }
                else {
                    Utility.writeNotification("warning", "Select a Memo to Reject", "", true);
                    // alert("Select Memo to Reject");
                }
            }
        }
        else {
            Remarks = $("#txt_remarks").val();
            if (Remarks != "") {
                RackRate.SaveRackRateInfo(updateStatus, 'Memo Rejected Successfully', 0);
            }
            else {
                $("#txt_remarks").focus();
                Utility.writeNotification("warning", "Please enter remarks to Reject the Memo", "", true);
                // $("#txt_remarks").focus();
            }
        }
    },

    review_Discard: function (Memonumber) {
        var updateStatus = "Discarded";
        var Remarks = "";
        if ($("#div_landing_grid").is(":visible")) {
            var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
            var selectedmemos = "";
            if (gridData.length > 0) {
                var Remarks = "";// $("#txt_remarks").html();
                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].selectcheck == 'True') {
                        if (selectedmemos != "")
                            selectedmemos = selectedmemos + ',';
                        selectedmemos = selectedmemos + gridData[i].PaymentMemoId;
                    }
                }
                if (selectedmemos != "") {
                    $('#txt_remarks_entry').val("");
                    $('#txt_selected_memos').val(selectedmemos);
                    $('#txt_updated_status').val(updateStatus);
                    $('#txt_click_from').val("ApprovalReject");
                    $('#btn_remarks').text("Discard");


                    $('#mdl_remarks_entry').modal('show');
                }
                else {
                    Utility.writeNotification("warning", "Select a Memo to Discard", "", true);
                    //alert("Select Memo to Discarded");
                }
            }
        }
        else {
            Remarks = $("#txt_remarks").val();
            if (Remarks != "") {
                RackRate.SaveRackRateInfo(updateStatus, 'Memo Discarded Successfully', 0);
            }
            else {
                $("#txt_remarks").focus();
                Utility.writeNotification("warning", "Please enter remarks to Discard the Memo", "", true);
                //$("#txt_remarks").focus();
            }
        }
    },

    review_Reject: function (Memonumber) {

        var updateStatus = "Rejected";
        var Remarks = "";
        if ($("#div_landing_grid").is(":visible")) {
            var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
            var selectedmemos = "";
            if (gridData.length > 0) {

                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].selectcheck == 'True') {
                        if (selectedmemos != "")
                            selectedmemos = selectedmemos + ',';
                        selectedmemos = selectedmemos + gridData[i].PaymentMemoId;
                    }
                }
                if (selectedmemos != "") {
                    $('#txt_remarks_entry').val("");
                    $('#txt_selected_memos').val(selectedmemos);
                    $('#txt_updated_status').val(updateStatus);
                    $('#txt_click_from').val("ApprovalReject");
                    $('#btn_remarks').text("Reject");


                    $('#mdl_remarks_entry').modal('show');
                }
                else {
                    Utility.writeNotification("warning", "Select atleast one Memo to Reject", "", true);
                    //alert("Select Memo to Reject");
                }
            }
        }
        else {
            Remarks = $("#txt_remarks").val();
            if (Remarks != "") {
                RackRate.SaveRackRateInfo(updateStatus, 'Memo Rejected Successfully', 0);
            }
            else {
                $("#txt_remarks").focus();
                Utility.writeNotification("warning", "Please enter remarks to Reject the Memo", "", true);

            }
        }
    },

    SalesAdminApprovalRole: function () {
        if ($("#div_landing_grid").is(":visible")) {
            var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
            var selectedmemos = "";
            var Arnselected = "";
            var DistCategorySelected = "";

            if (gridData.length > 0) {
                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].selectcheck == 'True') {
                        if (selectedmemos != "")
                            selectedmemos = selectedmemos + ',';
                        selectedmemos = selectedmemos + gridData[i].PaymentMemoId;

                        if (Arnselected != "")
                            Arnselected = Arnselected + ',';
                        Arnselected = Arnselected + gridData[i].ARNNo;

                        if (DistCategorySelected != "")
                            DistCategorySelected = DistCategorySelected + ',';
                        DistCategorySelected = DistCategorySelected + gridData[i].DistributorCategoryId;
                    }
                }
                if (selectedmemos != "") {
                    $('#hidden_payment_memo_id').val(selectedmemos);
                    $('#mdl_view_forward_to').modal('show');
                    $('#dd_assign_to').val("6");
                    var MemoCount = selectedmemos.split(',');
                    RackRate.LoadBH(Arnselected, DistCategorySelected, MemoCount.length);
                    $('#div_bh').show();
                }
                else {
                    Utility.writeNotification("warning", "Select atleast one Memo to Forward", "", true);
                    //alert("Select Memo to Forward");
                }
            }
        }
        else {
            $('#mdl_view_forward_to').modal('show');
            $('#dd_assign_to').val("6");

            var token = $("#txt_arn_info").tokenInput("get");
            var names = [];
            $.each(token, function (i, obj) {
                names.push(obj.name);//build an array of just the names
            });
            var ARNSelected = names.toString();
            var MemoCount = 1;
            var Categoryselected = [];
            var Category = $('#dd_dist_category_info option:selected');
            $(Category).each(function () {
                Categoryselected.push([$(this).val()]);
            });
            var DistCategorySelected = Categoryselected.toString();

            RackRate.LoadBH(ARNSelected, DistCategorySelected, MemoCount);
            $('#div_bh').show();
        }
    },

    AssignToChange: function (value) {
        if (value.value == "6") {
            $('#div_bh').show();
        }
        else {
            $('#dd_business_head').multiselect('clearSelection');
            $('#div_bh').hide();
        }
    },

    LoadBH: function (Arnselected, DistCategorySelected, MemoCount) {
        var Role = "6";
        var ChannelID = "";
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChannelForARNAndDistributorCategory', JSON.stringify({ ARN: Arnselected, DistributorCategory: DistCategorySelected }), "json", false, false, function (result) {
            var data = result.GetChannelForARNAndDistributorCategoryResult;
            ChannelID = data.toString();
        });

        var channelcnt = ChannelID.split(',');
        if (MemoCount > 1 && channelcnt.length > 1) {
            Utility.writeNotification("warning", "Selected memos belongs to different channels", "", true);
        }
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetUserBasedOnRole', JSON.stringify({ RoleID: Role, ChannelId: ChannelID }), "json", false, false, function (result) {
            var arrItems = result.GetUserBasedOnRoleResult;

            $("#dd_business_head").multiselect('destroy');
            $("#dd_business_head").empty();
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].UserName).val(arrItems[i].UserID).appendTo('#dd_business_head');
            }
            $('#dd_business_head').attr("multiple", "multiple");

            $('#dd_business_head').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                //nonSelectedText: "Select Scheme",

            });
            $('#dd_business_head').multiselect('clearSelection');
        });
    },

    ReviewForward: function () {
        var updateStatus = "Reviewed";
        var RoleID = sessionStorage.getItem("RoleID");
        if (RoleID == "10") {
            RackRate.SalesAdminApprovalRole();
        }
        else {
            RackRate.ReviewForwardServiceCall(updateStatus, "");
        }
    },

    AssignAndForward: function () {
        var updateStatus = "Reviewed";
        var assignto = $("#dd_assign_to option:selected").val();
        var assigntoText = $("#dd_assign_to option:selected").text();
        var memoId = $('#hidden_payment_memo_id').val();
        var AssignToBH = "";

        if (assignto == "6") {
            var assignselected = $('#dd_business_head option:selected');
            var assignarray = [];
            $(assignselected).each(function (index, channelsel) {
                assignarray.push([$(this).val()]);
            });
            AssignToBH = assignarray.toString();
        }
        if (assignto == "6" && AssignToBH == "") {
            Utility.writeNotification("warning", "Select Business Head", "", true);
        }
        else {
            $('#mdl_view_forward_to').modal('hide');
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateAssignToRole', JSON.stringify({ MemoNumber: memoId, AssignTo: assignto, AssignToBH: AssignToBH }), "json", false, false, function (result) {
                RackRate.ReviewForwardServiceCall(updateStatus, " to " + assigntoText);

            });
        }


    },

    ReviewForwardServiceCall: function (updateStatus, assigntoText) {
        if ($("#div_landing_grid").is(":visible")) {
            var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
            var selectedmemos = "";
            if (gridData.length > 0) {
                var Remarks = "";// $("#txt_remarks").html();
                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].selectcheck == 'True') {
                        if (selectedmemos != "")
                            selectedmemos = selectedmemos + ',';
                        selectedmemos = selectedmemos + gridData[i].PaymentMemoId;
                    }
                }
                if (selectedmemos != "") {
                    // Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus }), "json", false, false, function (result) {
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus, Remarks: Remarks, MemoTypeId: 1 }), "json", false, false, function (result) {
                        Utility.writeNotification("success", "Memo Forwarded Successfully" + assigntoText, "", true);
                        RackRate.AutoSearch();//RackRate.ViewRackRateApproval();
                    });
                }
                else {
                    Utility.writeNotification("warning", "Select atleast one Memo to Forward", "", true);
                    //alert("Select Memo to Forward");
                }
            }
        }
        else {
            RackRate.SaveRackRateInfo(updateStatus, "Memo Forwarded Successfully" + assigntoText, 0);
        }
    },

    RackRateApproval: function () {
        var updateStatus = "Approved";

        if ($("#div_landing_grid").is(":visible")) {
            var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
            var selectedmemos = "";
            if (gridData.length > 0) {
                var Remarks = "";
                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].selectcheck == 'True') {
                        if (selectedmemos != "")
                            selectedmemos = selectedmemos + ',';
                        selectedmemos = selectedmemos + gridData[i].PaymentMemoId;
                    }
                }
                if (selectedmemos != "") {
                    //Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus }), "json", false, false, function (result) {
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus, Remarks: Remarks, MemoTypeId: 1 }), "json", false, false, function (result) {
                        Utility.writeNotification("success", "Memo " + updateStatus + " Successfully", "", true);
                        RackRate.AutoSearch();//RackRate.ViewFreezeRackRate();
                    });
                }
                else {
                    Utility.writeNotification("warning", "Select atleast one Memo to Approve", "", true);
                    //alert("Select Memo to Approve");
                }
            }
        }
        else {
            RackRate.SaveRackRateInfo(updateStatus, 'Memo Approved Successfully', 0);
        }

    },

    RackRateFreeze: function () {
        var updateStatus = "Active";
        var Remarks = "";
        if ($("#div_landing_grid").is(":visible")) {
            var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
            var selectedmemos = "";
            if (gridData.length > 0) {
                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].selectcheck == 'True') {
                        if (gridData[i].MemoStatus != "Active") {
                            if (selectedmemos != "")
                                selectedmemos = selectedmemos + ',';
                            selectedmemos = selectedmemos + gridData[i].PaymentMemoId;
                        }
                    }
                }
                if (selectedmemos != "") {
                    //Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus }), "json", false, false, function (result) {
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus, Remarks: Remarks, MemoTypeId: 1 }), "json", false, false, function (result) {
                        Utility.writeNotification("success", "Memo has been Freezed", "", true);
                        RackRate.AutoSearch();//RackRate.ViewManageRackRate();
                    });
                }
                else {
                    Utility.writeNotification("warning", "Select atleast one Approved Memo to Freeze", "", true);
                    // alert("Select Memo to Approve");
                }
            }
        }
        else {
            //Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: $('#hidden_payment_memo_id').val(), Status: updateStatus }), "json", false, false, function (result) {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: $('#hidden_payment_memo_id').val(), Status: updateStatus, Remarks: Remarks, MemoTypeId: 1 }), "json", false, false, function (result) {
                Utility.writeNotification("success", "Memo has been Freezed", "", true);
                RackRate.CloseScreen();
                //RackRate.AutoSearch();//RackRate.ViewManageRackRate();
            });
            //RackRate.SaveRackRateInfo(updateStatus);
        }

    },

    FreezeDiscard: function () {
        var updateStatus = "Discarded";
        var Remarks = $("#txt_remarks").val();
        if ($("#div_landing_grid").is(":visible")) {
            var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
            var selectedmemos = "";
            if (gridData.length > 0) {
                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].selectcheck == 'True') {
                        if (gridData[i].MemoStatus != "Active") {
                            if (selectedmemos != "")
                                selectedmemos = selectedmemos + ',';
                            selectedmemos = selectedmemos + gridData[i].PaymentMemoId;
                        }
                    }
                }
                if (selectedmemos != "") {
                    $('#txt_remarks_entry').val("");
                    $('#txt_selected_memos').val(selectedmemos);
                    $('#txt_updated_status').val(updateStatus);
                    $('#txt_click_from').val("FreezeDiscard");
                    $('#btn_remarks').text("Discard");


                    $('#mdl_remarks_entry').modal('show');
                }
                else {
                    Utility.writeNotification("warning", "Select atleast one Memo to Discard", "", true);
                }
            }
        }
        else {
            // Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: hidden_payment_memo_id.val(), Status: updateStatus }), "json", false, false, function (result) {
            if (Remarks != "") {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: $("#hidden_payment_memo_id").val(), Status: updateStatus, Remarks: Remarks, MemoTypeId: 1 }), "json", false, false, function (result) {
                    Utility.writeNotification("success", "Memo has been Discarded", "", true);
                    RackRate.CloseScreen();
                    //RackRate.AutoSearch();//RackRate.ViewManageRackRate();
                });
                //RackRate.SaveRackRateInfo(updateStatus);
            }
            else {
                $("#txt_remarks").focus();
                Utility.writeNotification("warning", "Please enter remarks to Discard the Memo", "", true);
            }
        }

    },

    SaveRackRateInfo: function (updateStatus, message, IsSaved) {
        if (RackRate.RackRateInfoValid(updateStatus)) {
            ////Get Selected Category////////
            var Category = $('#dd_dist_category_info option:selected');
            var lumpsumSIPType = $('#dd_LumpsumSIPType option:selected').val();
            //sessionStorage.setItem('LumpsumSIPType', $('#dd_LumpsumSIPType option:selected').text());
            var Categoryselected = [];
            var CategoryNameselected = [];
            $(Category).each(function () {
                Categoryselected.push([$(this).val()]);
                CategoryNameselected.push([$(this).text()]);
            });

            /////Get selected ARN/////////
            var token = $("#txt_arn_info").tokenInput("get");
            var names = [];
            $.each(token, function (i, obj) {
                names.push(obj.name);//build an array of just the names
            });
            var ARNSelected = names.toString();

            /////Get selected ARN Name/////////
            var Nametoken = $("#txt_arn_name_info").tokenInput("get");
            var Arnnames = [];
            $.each(Nametoken, function (i, obj) {
                Arnnames.push(obj.name);//build an array of just the names
            });
            var ARNNameSelected = Arnnames.toString();

            //////Get Selected Transaction type/////
            var transactiontype = "";


            var PaymentMemo = [{
                PaymentMemoId: $("#hidden_payment_memo_id").val(),
                BranchId: 0,
                ZoneId: 0,
                MemoTypeId: 1,
                PaymentAmount: 0,
                DateFrom: $("#dt_from").val(),
                DateTo: $("#dt_to").val(),
                ApplicableTo: "",
                TransactionType: transactiontype,
                SlabType: 0,
                SlabAmount: 0,
                SlabCondition: 0,
                Remarks: $("#txt_remarks").val(),
                Comments: $("#txt_additional_notes").val(),
                MemoStatus: updateStatus,
                TransactionTypeOthers: "",
                CopiedMemoID: $("#hidden_copied_payment_memo_id").val(),
                SIPNotes: "",
                IsCloseEnded: RackRate.IsCloseEnded,
                LumpsumSIPTypeId: lumpsumSIPType,
                IsSaved: IsSaved
            }];

            var PaymentLi = [];
            var PaymentDetail = [];

            $(RackRate.TempPaymentList).each(function (listobj, listvalue) {
                listitem = {};
                listitem["PaymentListId"] = $('#hidden_payment_list_id').val();
                listitem["SchemeId"] = listvalue.schemeid;
                listitem["SchemeCategoryId"] = listvalue.schemecategoryid;
                listitem["DistributorCategoryId"] = Categoryselected.toString();
                listitem["DistributorCategoryName"] = CategoryNameselected.toString();
                listitem["PaymentMemoId"] = 0;
                listitem["PaymentType"] = 0;
                listitem["ARNNO"] = ARNSelected;
                listitem["ARNName"] = ARNNameSelected;
                listitem["DateFrom"] = $("#dt_from").val();
                listitem["DateTo"] = $("#dt_to").val();
                listitem["SlabType"] = listvalue.SlabType;
                listitem["SlabAmount"] = listvalue.slab_amount;
                listitem["PaymentBasis"] = "";
                listitem["Target"] = 0;
                listitem["TargetPeriod"] = "";
                listitem["InterestRate"] = "";
                listitem["InstallmentCondition"] = "";
                listitem["InstallmentRangeFrom"] = 0;
                listitem["InstallmentRangeTo"] = 0;
                listitem["TenureCondition"] = "";
                listitem["TenureMonths"] = 0;
                listitem["UpfrontPaymentType"] = "";
                listitem["UpfrontValue"] = 0;
                listitem["Calculation"] = 0;
                listitem["Clawback"] = listvalue.claw_back;
                listitem["SIPIncentiveRemarks"] = "";
                listitem["FreeTextField1"] = "";
                listitem["FreeTextField2"] = "";
                listitem["Onwards"] = listvalue.Onwards;
                listitem["IsUpdated"] = 0;
                listitem["SIPSlab"] = listvalue.SIPSlab;
                PaymentLi.push(listitem);
            });
            $(RackRate.TempPaymentDetails).each(function (detobj, detvalue) {
                detailitem = {}
                detailitem["PaymentDetailsId"] = 1;
                detailitem["PaymentMemoId"] = 0;
                detailitem["BrokerageTypeId"] = detvalue.BrokerageTypeId;
                detailitem["SchemeId"] = detvalue.schemeid;
                detailitem["PaymentListId"] = detvalue.schemecategoryid;
                detailitem["LumpSumLessTieup"] = 0;
                detailitem["LumpSumGreaterTieup"] = 0;
                detailitem["BaseUpfront"] = detvalue.Base;
                detailitem["AdditionalIncentives"] = detvalue.Additional;
                detailitem["Total"] = detvalue.Total;
                detailitem["LumpSumGreater"] = detvalue.LumpSumGreater
                detailitem["SIPSlabLess"] = detvalue.SIPSlabLess;
                detailitem["SIPSlabGreater"] = detvalue.SIPSlabGreater;
                detailitem["PeriodType"] = detvalue.PeriodType;
                detailitem["PeriodStart"] = detvalue.PeriodStart;
                detailitem["PeriodEnd"] = detvalue.PeriodEnd;
                detailitem["SlabTotal"] = 0;
                detailitem["IsSlabLess"] = 0;
                PaymentDetail.push(detailitem);
            });

            if ($("#hidden_copied_payment_memo_id").val() == 0) {
                $(RackRate.TempPaymentList).each(function (listobj, listvalue) {
                    if (RackRate.TempLoadedPaymentDetails.length > 0) {
                        var IsUpdated = 0;
                        var schemeID = 0;
                        $.each(RackRate.TempLoadedPaymentDetails, function (tmpcnt, tmpdata) {
                            if (listvalue.schemeid == tmpdata.SchemeId) {
                                $.each(PaymentDetail, function (cnt, data) {
                                    if (data.BrokerageTypeId == tmpdata.BrokerageTypeId && data.SchemeId == tmpdata.SchemeId && data.SchemeId == listvalue.schemeid && tmpdata.PeriodType == data.PeriodType && tmpdata.PeriodStart == data.PeriodStart && tmpdata.PeriodEnd == data.PeriodEnd) {

                                        if (data.BrokerageTypeId == 3 && data.PeriodType == 2 && data.PeriodStart > 1) {
                                            if (tmpdata.BaseUpfront == data.BaseUpfront.trim()) {

                                            }
                                            else {
                                                IsUpdated = 1;
                                                schemeID = data.SchemeId;
                                                return false;
                                            }
                                        }
                                        else {
                                            if (Utility.enableSIP == true) {
                                                if (tmpdata.BaseUpfront == data.BaseUpfront.trim() && tmpdata.AdditionalIncentives == data.AdditionalIncentives.toString().trim() && tmpdata.Total == data.Total.toString().trim() && tmpdata.SIPSlabLess == data.SIPSlabLess.toString().trim() &&
                                                    tmpdata.SIPSlabGreater == data.SIPSlabGreater.toString().trim() && tmpdata.PeriodType == data.PeriodType) {

                                                }
                                                else {
                                                    IsUpdated = 1;
                                                    schemeID = data.SchemeId;
                                                    return false;
                                                }
                                            } else {
                                                if (tmpdata.BaseUpfront == data.BaseUpfront.trim() && tmpdata.AdditionalIncentives == data.AdditionalIncentives.toString().trim() && tmpdata.Total == data.Total.toString().trim() && tmpdata.PeriodType == data.PeriodType) {

                                                }
                                                else {
                                                    IsUpdated = 1;
                                                    schemeID = data.SchemeId;
                                                    return false;
                                                }
                                            }
                                        }
                                    }

                                });
                            }

                        });
                        if (IsUpdated == 0) {
                            $.each(RackRate.TempLoadedPaymentList, function (tmpcnt, tmpdata) {
                                if (tmpdata.schemeid == listvalue.schemeid) {
                                    if (tmpdata.SlabType != listvalue.SlabType || tmpdata.slab_amount != listvalue.slab_amount || tmpdata.claw_back != listvalue.claw_back) {
                                        IsUpdated = 1;
                                        schemeID = tmpdata.SchemeId;
                                        return false;
                                    }
                                }
                            });
                        }
                        if (IsUpdated == 0) {
                            var tmploadedschemelist = 0;
                            var tmpcurrentschemelist = 0;
                            $.each(RackRate.TempLoadedPaymentDetails, function (tmpcnt, tmpdata) {
                                if (listvalue.schemeid == tmpdata.SchemeId) {
                                    ++tmploadedschemelist;
                                }
                            });
                            $.each(PaymentDetail, function (cnt, data) {
                                if (data.SchemeId == listvalue.schemeid) {
                                    ++tmpcurrentschemelist;
                                }
                            });
                            if (tmploadedschemelist != tmpcurrentschemelist && tmploadedschemelist != 0) {
                                IsUpdated = 1;
                                schemeID = listvalue.schemeid;
                            }
                        }
                        $.each(PaymentLi, function (cnt, data) {
                            if (data.SchemeId == schemeID) {
                                PaymentLi[cnt].IsUpdated = IsUpdated;
                            }
                        });
                    }
                });
            }
            $(window).scrollTop(0);

            var data = { memo: JSON.stringify(PaymentMemo), list: JSON.stringify(PaymentLi), details: JSON.stringify(PaymentDetail) }
            var Memo = { Payment: PaymentMemo };
            if (sessionStorage.MemoStatus == "Rejected") {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/SaveRejectedMemo', JSON.stringify({ Memo: PaymentMemo, list: PaymentLi, details: PaymentDetail, updateStatus: updateStatus }), "json", false, false, function (result) {
                    Utility.writeNotification("success", message, "", true);
                    //alert("Saved Successfully");
                    if (sessionStorage.CurrentMenuselected == "nav_information") {
                        window.location.href = "CreateRackRate.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
                    }
                    else {
                        RackRate.CloseScreen();
                    }
                });
            }
            else if (sessionStorage.MemoStatus == "Reviewed" && sessionStorage.CurrentMenuselected == "nav_information") {
                window.location.href = "MasterQueue.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
            }
            else {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/SaveBaseRackRateInformation', JSON.stringify({ Memo: PaymentMemo, list: PaymentLi, details: PaymentDetail }), "json", false, false, function (result) {
                    Utility.writeNotification("success", message, "", true);
                    //alert("Saved Successfully");
                    //if (message != "Saved Successfully") {
                    if (sessionStorage.CurrentMenuselected == "nav_information") {
                        window.location.href = "CreateRackRate.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
                    }
                    else {
                        RackRate.CloseScreen();
                    }
                    //}
                    //else {
                    //    RackRate.BindDetails($("#hidden_payment_memo_id").val());
                    //}
                });
            }
        }

    },

    RackRateInfoValid: function (updateStatus) {
        var error = "";

        var names = [];
        var token = $("#txt_arn_info").tokenInput("get");
        $.each(token, function (i, obj) {
            names.push(obj.name);//build an array of just the names
        });
        var ARNSelected = names.toString();


        var Categoryselected = [];
        var Category = $('#dd_dist_category_info option:selected');
        $(Category).each(function () {
            Categoryselected.push([$(this).val()]);
        });

        var RoleID = sessionStorage.getItem("RoleID");
        if (RoleID == "1" || RoleID == "2" || RoleID == "4" || RoleID == "5") {

            if (names.length == 0 && Categoryselected.length == 0) {
                if (error.indexOf("Please select ARN No., that is a mandatory field") > -1) {
                }
                else {
                    error += "Please select ARN No., that is a mandatory field. <br/>";
                }
            }
            else if (names.length == 0 && Categoryselected.length > 0) {
                if (error.indexOf("Please select ARN No., as user is not allowed for category specific memo creation") > -1) {
                }
                else {
                    error += "Please select ARN No., as user is not allowed for category specific memo creation. <br/>";
                }
            }
            else if (names.length > 0 && Categoryselected.length > 0) {
                if (error.indexOf("User is not allowed to Create Distributor category and ARN Specific memo. <br/>") > -1) {
                }
                else {
                    error += "User is not allowed to Create Distributor category and ARN Specific memo. <br/>";
                }
            }
            else if (names.length == 0) {
                if (error.indexOf("Please select ARN No. for creating a memo") > -1) {
                }
                else {
                    error += "Please select ARN No. for creating a memo. <br/>";
                }
            }
        }

        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChannelForARNAndDistributorCategory', JSON.stringify({ ARN: ARNSelected, DistributorCategory: Categoryselected.toString() }), "json", false, false, function (result) {
            var data = result.GetChannelForARNAndDistributorCategoryResult;
            if (data.length > 2) {
                error += "ARN/Distributor Category Belong to more than 2 Channel. <br/>";
            }
        });



        //if (RoleID == "1" || RoleID == "2" || RoleID == "4") {

        //    if (names.length == 0 && Categoryselected.length == 0 && Channelselected.length > 0)
        //        error += "Please select ARN No., that is a mandatory field <br/>";
        //    else if (names.length == 0 && Categoryselected.length > 0)
        //        error += "Please select ARN No., as user is not allowed for category specific memo creation <br/>";
        //    else if (names.length > 0 && Categoryselected.length > 0)
        //        error += "User is not allowed to Create Distributor category and ARN Specific memo <br/>";
        //    else if (names.length == 0) {
        //        error += "Please select ARN No. for creating a memo <br/>";
        //    }
        //}
        if ($("#dt_from").val() == "") {
            if (error.indexOf("Date From is Required") > -1) {
            }
            else {
                error += "Date From is Required. <br/>";
            }
        }
        if ($("#dt_to").val() == "") {
            if (error.indexOf("Date To is required") > -1) {
            }
            else {
                error += "Date To is required. <br/>";
            }
        }
        if ($("#dt_from").val() != "" && $("#dt_to").val() != "") {
            if ($("#dt_from").val() == $("#dt_to").val()) {
                if (error.indexOf("From Date and To date Cannot be same") > -1) {
                }
                else {
                    error += "From Date and To date Cannot be same. <br/>";
                }
            }
        }
        if ($("#dd_LumpsumSIPType option:selected").val() <= 0) {
            if (error.indexOf("LumpsumSIPType is Required") > -1) {
            }
            else {
                error += "LumpsumSIPType is Required. <br/>";
            }
        }


        if (RackRate.TempPaymentList.length == 0) {
            if (error.indexOf("Rack Rate Detail is Required") > -1) {
            }
            else {
                error += "Rack Rate Detail is Required. <br/>";
            }
        }
        else {
            var schemeSelected = [];
            var schemeCategorySelected = [];
            for (var cnt = 0; cnt < RackRate.TempPaymentList.length; cnt++) {
                schemeSelected.push(RackRate.TempPaymentList[cnt].schemeid.toString());
            }
            for (var cnt = 0; cnt < RackRate.TempPaymentList.length; cnt++) {
                schemeCategorySelected.push(RackRate.TempPaymentList[cnt].schemecategoryid.toString());
            }

            //Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeCategory', JSON.stringify({ SearchText: "", MemoTypeId: "1" }), "json", false, false, function (result) {
            //    var arrItems = result.GetSchemeCategoryResult;
            //    if (arrItems.length > schemeCategorySelected.length) {
            //        if (error.indexOf("Select All Scheme Category and Schemes") > -1) {
            //        }
            //        else {
            //            error += "Select All Scheme Category and Schemes <br/>";
            //        }
            //    }
            //});
            if (updateStatus == "Initiated" && RackRate.IsCloseEnded == 0) {

                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetScheme', JSON.stringify({ SearchText: "", MemoTypeId: "1", IsCloseEnded: RackRate.IsCloseEnded }), "json", false, false, function (result) {
                    var arrItems = result.GetSchemeResult;
                    var Availableschemes = [];
                    var difference = [];
                    if (arrItems.length > schemeSelected.length) {
                        $.each(arrItems, function (i, obj) {
                            Availableschemes.push(obj.SchemeId.toString())
                        });
                        //$.each(Availableschemes, function (i, obj) {
                        //    $.each(schemeSelected, function (sc, schID) {
                        //        if (obj == schID) {
                        //            schemeSelected.splice(sc, 1);
                        //        }
                        //    });
                        //});

                        jQuery.grep(Availableschemes, function (el) {
                            if (jQuery.inArray(el, schemeSelected) == -1) difference.push(el);
                        });
                        //var diff = $(Availableschemes).not(schemeSelected).get();
                        //jQuery.grep(Availableschemes, function (el) {
                        //    if (jQuery.inArray(el, schemeSelected) != -1)
                        //        difference.push(el);
                        //});
                        if (difference.length > 0) {
                            $.each(difference, function (i, schID) {
                                $.each(arrItems, function (i, obj) {
                                    if (obj.SchemeId == schID) {
                                        error += "Enter Rack Rate for " + obj.SchemeName.replace("DSP BlackRock", "") + ". <br/>";
                                        return;
                                    }
                                });
                            });
                        }
                    }
                });
            }

            if (RackRate.IsCloseEnded == 1) {
                if (schemeSelected.length > 1) {
                    error += "For Close Ended Scheme Rates can be defined only for one scheme at a time. <br/>";
                }
            }
            var transactiontype = "";
            var DateFrom = $("#dt_from").val();
            var Dateto = $("#dt_to").val();
            if (sessionStorage.CurrentMenuselected == "nav_information" && sessionStorage.MemoStatus != "Reviewed") {
                var memoval = $('#hidden_payment_memo_id').val() == "" ? 0 : $('#hidden_payment_memo_id').val();
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/MemoExists', JSON.stringify({ ArnNo: ARNSelected, Channel: "", DistributorCategory: Categoryselected.toString(), schemeid: schemeSelected.toString(), DateFrom: DateFrom, DateTo: Dateto, MemoId: memoval, TransactionType: transactiontype, MemoType: "1" }), "json", false, false, function (result) {
                    if (result.MemoExistsResult != "")
                        error += result.MemoExistsResult;
                });
            }
        }


        if (error == "")
            return true;
        else {
            //if (error == "Rack Rate Detail is Required <br/>") {
            //    if ($('#txt_lumpsum_less_base').val() == '' || $('#txt_lumpsum_less_base').val() == '0') {
            //        Utility.writeNotification("warning", "Enter Valid Upfront Base ", "", true);
            //        $('#txt_lumpsum_less_base').focus();
            //    }
            //    else {
            //        Utility.writeNotification("warning", "Enter Rack Rate Detail ", "", true);
            //    }
            //} else {
            Utility.writeNotification("warning", error, "", true);
            //}
            return false;
        }
    },

    parseDate: function (str) {
        var mdy = str.split('/')
        return new Date(mdy[2], mdy[0] - 1, mdy[1]);
    },

    daydiff: function (first, second) {
        return (second - first) / (1000 * 60 * 60 * 24);
    },

    //kathirvel changes starts- for memo creation validation for more than one quater
    monthDiff: function (d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    },
    //kathirvel changes ends- for memo creation validation for more than one quater

    CreateRackRate: function () {
        var token = $("#txt_arn").tokenInput("get");
        if (token.length > 0) {
            RackRate.ViewRackRateInformation();
            $('#div_rack_rate_detail').empty()
            $("#div_rack_rate_detail_hdr").hide();
        }
        else {
            Utility.writeNotification("error", "", "Please select ARN No. for creating a memo.", true);
            return false;
        }
    },

    CancelRackRate: function () {
        var pagename = Utility.GetParameterValues('ptype');
        if (pagename == "mq") {
            window.location.href = "MasterQueue.html";
        }
        else if (pagename == "ss") {
            sessionStorage.setItem("SmartSearchScreen", "ss");
            window.location.href = "SmartSearchScreen.html";
        }
        else if (pagename == "cr") {
            window.location.href = "CreateRackRate.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
        }
        else if (pagename == "tr") {
            window.location.href = "CreateTieUp.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
        }
        else {
            if (sessionStorage.ismasterqueue == "true") {
                sessionStorage.ismasterqueue = "";
                window.location.href = "MasterQueue.html";
            }
            else if (sessionStorage.MemoFrom == "Discarded") {
                window.location.href = "Overview.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
            }
            else {
                sessionStorage.ismasterqueue = "";
                window.location.href = "CreateRackRate.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
            }
        }
        return false;
    },

    RefreshSearchGrid: function () {
        $('#grid_search_result').trigger("reloadGrid");
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

                    RackRate.GetDistributorCategory(selected.valueOf());
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
                //    RackRate.GetARNForChannelAndDistributorCategory();
                //}
            });
            $('#dd_dist_category').multiselect('clearSelection');
        });
    },

    GetARN: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARN', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn").empty();
            RackRate.arns = [];
            RackRate.arns = JSON.parse(result.GetARNResult);
            $("#txt_arn").tokenInput(
            RackRate.arns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    //RackRate.GetDistributorARN(item.name, 'add', item.id);
                    RackRate.GetDistributorARN(item.id, 'add', item.id);
                },
                onDelete: function (item) {
                    //RackRate.GetDistributorARN(item.name, 'remove', item.id);
                    RackRate.GetDistributorARN(item.id, 'remove', item.id);
                }
            });
        });
    },

    LoadinfoARNToken: function (SearchText, mode, id) {
        if (mode == 'add') {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                var Data = result.GetDistributorBasedOnIDResult;
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
    },

    GetDistributorARN: function (SearchText, mode, id) {
        if (mode == 'add') {
            var memoval = $('#hidden_payment_memo_id').val() == "" ? 0 : $('#hidden_payment_memo_id').val();
            if (memoval == "0") {
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
            } else {
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
        }
        else {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                var Data = result.GetDistributorBasedOnIDResult;

                $("#txt_arn_name").tokenInput("remove", { id: id });
            });
        }
    },

    GetDistributorInfoARN: function (SearchText, mode, id) {
        if (mode == 'add') {
            var memoval = $('#hidden_payment_memo_id').val() == "" ? 0 : $('#hidden_payment_memo_id').val();
            if (memoval == "0") {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChildArn', JSON.stringify({ ArnNo: SearchText }), "json", false, false, function (result) {
                    var Data = result.GetChildArnResult;
                    if (Data.length > 1) {
                        $.each(Data, function (i, obj) {

                            $.each($("#txt_arn_info").tokenInput("get"), function (i, obj) {
                                if (obj.id == obj.DistributorId) {
                                    return;
                                }
                            });

                            $("#txt_arn_info").tokenInput("add", { id: obj.DistributorId, name: obj.ARN });
                            //$("#txt_arn_name_info").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });//dobut - this line needed...?

                            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                                var Data = result.GetDistributorBasedOnIDResult;

                                $.each($("#txt_arn_name_info").tokenInput("get"), function (i, obj) {
                                    if (obj.id == Data[0].DistributorId) {
                                        return;
                                    }
                                });
                                $("#txt_arn_name_info").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });

                            });
                        });
                    }
                    else if (Data.length == 1) {

                        $("#txt_arn_name_info").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });
                    }
                    else {
                        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                            var Data = result.GetDistributorBasedOnIDResult;
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
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                    var Data = result.GetDistributorBasedOnIDResult;
                    $.each($("#txt_arn_name_info").tokenInput("get"), function (i, obj) {
                        if (obj.id == Data[0].DistributorId) {
                            return;
                        }
                    });

                    $("#txt_arn_name_info").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });
                });
            }
        }
        else {
            //Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributor', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
            //    var Data = result.GetDistributorResult; 
            $("#txt_arn_name_info").tokenInput("remove", { id: id });
            //});
        }
    },

    GetARNName: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARNName', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn_name").empty();
            RackRate.arnName = JSON.parse(result.GetARNNameResult);
            $("#txt_arn_name").tokenInput(
            RackRate.arnName,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    //RackRate.LoadARNToken(item.name, 'add', item.id);
                    RackRate.LoadARNToken(item.id, 'add', item.id);
                },

                onDelete: function (item) {
                    //RackRate.LoadARNToken(item.name, 'remove', item.id);
                    RackRate.LoadARNToken(item.id, 'remove', item.id);
                }
            });
        });
    },

    GetARNNameInfo: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARNName', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn_name_info").empty();
            RackRate.arnName = JSON.parse(result.GetARNNameResult);
            $("#txt_arn_name_info").tokenInput(
            RackRate.arnName,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    //RackRate.LoadinfoARNToken(item.name, 'add', item.id);
                    RackRate.LoadinfoARNToken(item.id, 'add', item.id);
                },

                onDelete: function (item) {
                    //RackRate.LoadinfoARNToken(item.name, 'remove', item.id);
                    RackRate.LoadinfoARNToken(item.id, 'remove', item.id);
                }
            });
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
            RackRate.arns = [];
            RackRate.arns = JSON.parse(result.GetARNForChannelAndDistributorCategoryResult);
            $("#txt_arn").siblings("ul").remove();
            $("#txt_arn_name").siblings("ul").remove();

            $("#txt_arn").empty();
            $("#txt_arn").tokenInput(
            RackRate.arns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    //RackRate.GetDistributorARN(item.name, 'add', item.id);
                    RackRate.GetDistributorARN(item.id, 'add', item.id);
                },
                onDelete: function (item) {
                    //RackRate.GetDistributorARN(item.name, 'remove', item.id);
                    RackRate.GetDistributorARN(item.id, 'remove', item.id);
                }
            });


            $("#txt_arn_name").tokenInput(
           RackRate.arnName,
           {
               theme: "facebook", preventDuplicates: true, resultsLimit: 10,
               onAdd: function (item) {
                   //RackRate.LoadinfoARNToken(item.name, 'add', item.id);
                   RackRate.LoadinfoARNToken(item.id, 'add', item.id);
               },

               onDelete: function (item) {
                   //RackRate.LoadinfoARNToken(item.name, 'remove', item.id);
                   RackRate.LoadinfoARNToken(item.id, 'remove', item.id);
               }
           });

        });

    },

    GetDistributor: function (SearchText, mode) {
        if (mode == 'add') {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChildArn', JSON.stringify({ ArnNo: SearchText }), "json", false, false, function (result) {
                var Data = result.GetChildArnResult;
                if (Data.length > 1) {
                    $.each(Data, function (i, obj) {
                        var ARNName = "";
                        ARNName = $('#txt_arn_name_info').val();
                        if (ARNName != "") {
                            ARNName += ',' + Data[0].DistributorName;
                        }
                        else
                            ARNName = obj.DistributorName;
                        $('#txt_arn_name_info').val(ARNName);

                        $("#txt_arn_info").tokenInput("add", { id: obj.DistributorId, name: obj.ARN });

                    });
                }
                else if (Data.length == 1) {

                    $("#txt_arn_name_info").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });
                }
                else {
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                        var Data = result.GetDistributorBasedOnIDResult;
                        var ARNName = "";
                        ARNName = $('#txt_arn_name_info').val();
                        if (ARNName != "") {
                            var ArnNameAdded = ARNName = $('#txt_arn_name_info').val().split(',');
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
                        $('#txt_arn_name_info').val(ARNName);
                    });
                }
            });

        }
        else {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                var Data = result.GetDistributorBasedOnIDResult;
                var ARNName = "";
                ARNName = $('#txt_arn_name_info').val().split(',');
                for (i = 0; i < ARNName.length; i++) {
                    if (ARNName[i] == Data[0].DistributorName) {
                        ARNName.splice(i, 1);
                    }
                }
                $('#txt_arn_name_info').val(ARNName);
            });
        }



    },

    GetDistributorCategory_info: function (SearchText) {
        var arr = SearchText == "" ? "" : SearchText.toString();
        arr = JSON.stringify(arr)

        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorCategory', '{"SearchText": ' + arr + '}', "json", false, false, function (result) {
            var arrItems = result.GetDistributorCategoryResult;
            $("#dd_dist_category_info").empty()
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].DistributorCategoryName).val(arrItems[i].DistributorCategoryId).appendTo('#dd_dist_category_info');
            }
            $('#dd_dist_category_info').attr("multiple", "multiple");
            $('#dd_dist_category_info').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
            });
            $('#dd_dist_category_info').multiselect('clearSelection');
        });
    },

    GetARN_info: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARN', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn_info").empty();
            RackRate.arns = [];
            RackRate.arns = JSON.parse(result.GetARNResult);
            $("#txt_arn_info").tokenInput(
            RackRate.arns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    //RackRate.GetDistributorInfoARN(item.name, 'add', item.id);
                    RackRate.GetDistributorInfoARN(item.id, 'add', item.id);
                },
                onDelete: function (item) {
                    RackRate.GetDistributorInfoARN(item.id, 'remove', item.id);
                    //RackRate.GetDistributorInfoARN(item.name, 'remove', item.id);
                }
            });
        });
    },

    GetSchemeCategory: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeCategory', JSON.stringify({ SearchText: "", MemoTypeId: "1", IsCloseEnded: RackRate.IsCloseEnded }), "json", false, false, function (result) {
            var arrItems = result.GetSchemeCategoryResult;
            //$("<option />").text("Select Scheme Category").val("0").appendTo("#dd_scheme_category");
            $("#dd_scheme_category").multiselect('destroy');
            $("#dd_scheme_category").empty();
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeCategoryName).val(arrItems[i].SchemeCategoryId).appendTo("#dd_scheme_category");
            }

            $('#dd_scheme_category').attr("multiple", "multiple");
            $('#dd_scheme_category').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                nonSelectedText: "Select Scheme Category",
                onChange: function (element, checked) {
                    var brands = $('#dd_scheme_category option:selected');
                    var selected = [];
                    $(brands).each(function (index, brand) {
                        selected.push([$(this).val()]);
                    });
                    if (selected.valueOf() != "") {
                        RackRate.GetScheme(selected.valueOf());
                    }
                    else {
                        $("#dd_scheme").multiselect('destroy');
                        $("#dd_scheme").empty();
                        $('#dd_scheme').multiselect('rebuildscheme');
                    }
                }
            });
            $('#dd_scheme_category').multiselect('rebuild');
            $('#dd_scheme_category').multiselect('clearSelection');
        });
    },

    SchemeCategoryChange: function () {
        RackRate.GetScheme($('#dd_scheme_category option:selected').val());
    },

    GetScheme: function (SearchText) {
        var arr = SearchText == "" ? "" : SearchText.toString();
        arr = JSON.stringify(arr)

        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetScheme', '{"SearchText": ' + arr + ', "MemoTypeId": "1", "IsCloseEnded": "' + RackRate.IsCloseEnded + '"}', "json", false, false, function (result) {
            var arrItems = result.GetSchemeResult;
            $("#dd_scheme").multiselect('destroy');
            $("#dd_scheme").empty();
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeName).val(arrItems[i].SchemeId).appendTo('#dd_scheme');
            }
            $('#dd_scheme').multiselect('rebuildscheme');
        });
    },

    ViewAction: function (PaymentMemoID) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/ViewAction', '{"MemoId": ' + PaymentMemoID + ', "currentScreen": "' + sessionStorage.CurrentMenuselected + '"}', "json", false, false, function (result) {
            if (!result.ViewActionResult) {
                switch (sessionStorage.CurrentMenuselected) {
                    case "nav_review":
                        $('#btn_save_review').attr('disabled', 'disabled')
                        $('#btn_review_Discard').attr('disabled', 'disabled');
                        $('#btn_review_reject').attr('disabled', 'disabled');
                        $('#btn_review_forward').attr('disabled', 'disabled');
                        break;
                    case "nav_approval":
                        $('#btn_save_review').attr('disabled', 'disabled')
                        $('#btn_approval_Discard').attr('disabled', 'disabled');
                        $('#btn_approval_reject').attr('disabled', 'disabled');
                        $('#btn_approval_approve').attr('disabled', 'disabled');
                        break;
                }
            }
        });
    },

    AutoSearch: function () {
        var DistributorCategorySearch = sessionStorage.getItem("DistributorCategorySearch") == null ? "" : sessionStorage.getItem("DistributorCategorySearch").split(",");
        var ChannelCreateSearch = sessionStorage.getItem("ChannelCreateSearch") == null ? "" : sessionStorage.getItem("ChannelCreateSearch").split(",");
        var ARNCreateSearch = sessionStorage.getItem("ARNCreateSearch") == null ? "" : sessionStorage.getItem("ARNCreateSearch").split(",");

        $('#txt_arn').tokenInput('clear');
        $('#dd_dist_category').multiselect('clearSelection');
        $('#dd_channel').multiselect('clearSelection');
        if (ARNCreateSearch != null) {
            for (var i = 0; i < ARNCreateSearch.length ; i++) {
                $.each(RackRate.arns, function (key, value) {
                    if (value.name == ARNCreateSearch[i]) {
                        $("#txt_arn").tokenInput("add", { id: value.id, name: value.name });
                    }
                });
            }
        }

        if (DistributorCategorySearch != null) {
            for (var i = 0; i < DistributorCategorySearch.length; i++) {
                if (DistributorCategorySearch[i] != "") {
                    $('#dd_dist_category').multiselect('select', DistributorCategorySearch[i]);
                }
            }
        }


        if (ChannelCreateSearch != null) {
            for (var i = 0; i < ChannelCreateSearch.length; i++) {
                if (ChannelCreateSearch[i] != "") {
                    $('#dd_channel').multiselect('select', ChannelCreateSearch[i]);
                }
            }
        }
        RackRate.GetCreateBaseRackRate();
    },

    BrokerageDetail: function (PaymentListId, Schemeid) {
        $("#mdl_view_brokerage_detail").modal('show');
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/getrackrateinfo', JSON.stringify({ Paymentmemoid: PaymentListId, Schemeid: Schemeid }), "json", false, false, function (result) {

            var arrItems = result.getrackrateinfoResult;

            $('#tbl_view_brokerage_history').empty();
            $('#tbl_view_brokerage_history').append(arrItems);
            var currentRowHTML = "";
            $('#tbl_rate_history tr').not('thead tr').each(function () {
                var firstrow = $(this).find("td:first");
                var ptr = $(this).html().replace(firstrow[0].outerHTML, '');
                var firstsecondrow = $(this).find("td:nth-child(2)");
                var ptrsts = ptr.replace(firstsecondrow[0].outerHTML, '');
                if (ptrsts === currentRowHTML) {
                    currentRowHTML = ptrsts;
                    $(this).remove();
                }
                else {
                    currentRowHTML = ptrsts;
                }
            });
        });
        //Utility.writeNotification("warning", "In Progress", "", true);
    },

    ReturnSearchHyperLink: function (cellValue, options, rowdata, action) {
        return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"RackRate.ViewScreen(' + rowdata.PaymentMemoId + ');\">' + rowdata.PaymentMemoId + '</a>';
    },

    ReturnMemonumberSearchHyperLink: function (cellValue, options, rowdata, action) {
        if (rowdata.MemoStatus == "Active") {
            return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"RackRate.Viewreport(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
        }
        else {
            return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"RackRate.ViewScreen(' + rowdata.PaymentMemoId + ');\">' + rowdata.PaymentMemoId + '</a>';
        }
        //return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" >' + rowdata.MemoNumber + '</a>';
    },

    ReturnCheckBox: function (cellValue, options, rowdata, action) {
        return "<input type='checkbox' style='display: block;margin-left: auto;margin-right: auto;' />";
    },

    ReturnRadioBox: function (cellValue, option) {
        return '<input type="radio" style="display: block;margin-left: auto;margin-right: auto;" name="radio_' + option.gid + '"  />';
    },

    ReturnBrokerageDetailHyperLink: function (cellValue, options, rowdata, action) {
        return "<a style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;' href='javascript:void(0)'  onclick=\"RackRate.BrokerageDetail(" + rowdata.PaymentMemoId + "," + rowdata.SchemeId + ");\">Click Here</a>";
    },

    RemoveToDatePicker: function (event) {
        var charCode = ($(event).which) ? event.which : $(event).keyCode;
        if (charCode != 9) {
            $("#dt_to").datepicker("destroy");
            $("#dt_to").val("");
        }
    },

    Reorder: function () {
        if (RackRate.DetailCount > 0) {
            RackRate.DeleteScheme(2, 1);
            //var divs = [];
            //var schemeids = [];
            //var orderedids = [];

            //for (cnt = 0; cnt < RackRate.DetailCount; cnt++) {
            //    divs[cnt] = '<div class="row mr-top-01" id="div_detail_' + cnt + '">' + $('#div_detail_' + cnt).html() + '</div>';
            //    schemeids[cnt] = parseInt($('#hidden_scheme_id_' + cnt).val());
            //}

            //schemeids.sort(function (a, b) { return a - b });

            //for (schcnt = 0; schcnt < schemeids.length; schcnt++) {
            //    for (cnt = 0; cnt < RackRate.DetailCount; cnt++) {
            //        if ($('#hidden_scheme_id_' + cnt).val() == schemeids[schcnt])
            //            orderedids[schcnt] = cnt;
            //    }
            //}

            //$('#div_rack_rate_detail').empty();
            //for (cnt = 0; cnt < orderedids.length; cnt++) {
            //   //RackRate.RegenerateControls(cnt, orderedids[cnt]);
            //    $('#div_rack_rate_detail').append(divs[orderedids[cnt]]);
            //}
        }
    },

    DeleteSchemeClick: function () {

        if (RackRate.TableCount > 0) {
            for (var cnt = 0; cnt < RackRate.TableCount; cnt++) {
                var row = $("#tbl_review_scheme" + cnt + " tr.detail_row");

                for (var rowIndex = 0; rowIndex < row.length; rowIndex++) {
                    var rowData = $($("#tbl_review_scheme" + cnt + " tr.detail_row")[rowIndex]);
                    var column = $(rowData).find('td');

                    var radiobtn = column[0];
                    var Radiochecked = $(radiobtn).find("input[name$='equity']").is(":checked");
                    if (Radiochecked == true) {
                        if (confirm("Are you sure you want to delete!")) {
                            var list = {};
                            var clm = column[0];
                            var SchemeId = $(clm).find("input[name='hid_scheme_id']").val();
                            var ScehemCategoryId = $(clm).find("input[name='hid_scheme_category_id']").val();

                            $(RackRate.TempPaymentList).each(function (listobj, listvalue) {
                                if (listvalue.schemeid == SchemeId && listvalue.schemecategoryid == ScehemCategoryId) {
                                    RackRate.TempPaymentList = jQuery.grep(RackRate.TempPaymentList, function (n, i) {
                                        return (n !== listvalue);
                                    });
                                }
                            });

                            $(RackRate.TempPaymentDetails).each(function (listobj, listvalue) {
                                if (listvalue.schemeid == SchemeId) {
                                    RackRate.TempPaymentDetails = jQuery.grep(RackRate.TempPaymentDetails, function (n, i) {
                                        return (n !== listvalue);
                                    });
                                }
                            });

                            $(RackRate.TempmonthList).each(function (listobj, listvalue) {
                                if (listvalue.schemeid == SchemeId) {
                                    RackRate.TempmonthList = jQuery.grep(RackRate.TempmonthList, function (n, i) {
                                        return (n !== listvalue);
                                    });
                                }

                            });

                            $(RackRate.TempyearList).each(function (listobj, listvalue) {
                                if (listvalue.schemeid == SchemeId) {
                                    RackRate.TempyearList = jQuery.grep(RackRate.TempyearList, function (n, i) {
                                        return (n !== listvalue);
                                    });
                                }
                            });

                            RackRate.Showschemedetails();
                            if (RackRate.TempPaymentList.length == 0) {
                                RackRate.TempPaymentDetails = [];
                                RackRate.TempmonthList = [];
                                RackRate.TempyearList = [];
                                $('.bs-example-modal-lg').modal('hide')
                            }
                        }

                    }


                }
            }
        }
    },

    DisableControlsOnView: function (val) {
        RackRate.DisableRackRate();
        RackRate.DisableRackRateDetails(val);
    },

    generatebutton: function (status, memoid) {
        var user = sessionStorage.LoginId;
        var RoleID = sessionStorage.getItem("RoleID");
        var ModifiedbyRole;
        var ApprovalRoleID = 0;
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetViewAction', JSON.stringify({ PaymentMemoID: memoid, MemoTypeID: 1 }), "json", false, false, function (result) {
            var arrItems = result.GetViewActionResult;
            ModifiedbyRole = arrItems.ModifiedByRole;
            ApprovalRoleID = arrItems.ApprovalRoleID;
        });

        Utility.ServiceCall("POST", 'AuthorizationService.svc/GetUserModuleMenu', JSON.stringify({ UserID: sessionStorage.LoginId, MainMenuID: 1, _commandText: "GET_USER_MENU_RIGHTS" }), "json", false, false, function (result) {
            var rightItems = result.GetUserModuleMenuResult;
            var menuarr = [];
            $.each(rightItems, function (key, value) {
                menuarr.push(value.NavigateMenu);
            });
            if (rightItems.length > 0) {
                switch (status) {
                    case "Saved":
                        {
                            if (ModifiedbyRole <= RoleID) {
                                if (ModifiedbyRole == "3" && RoleID == 4) {
                                    sessionStorage.CurrentMenuselected = "nav_information";
                                    $("#btn_reorder").hide();
                                    $("#btn_delete").hide();
                                    RackRate.hidecheckbox();
                                    $("#div_btn").empty();
                                    $('#btn_save_review').attr('disabled', 'disabled');
                                    $('#btn_save_info').attr('disabled', 'disabled');
                                    $("#hdr_name").text("View Rack Rate");
                                    var input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                    $("#div_edit_controls").hide();
                                    $("#div_btn").append(input);
                                    RackRate.DisableControlsOnView(true);
                                }
                                else {
                                    if (jQuery.inArray('nav_initiate', menuarr) > -1) {
                                        sessionStorage.CurrentMenuselected = "nav_initiate";
                                        $("#div_btn").empty();
                                        $("#btn_reorder").show();
                                        $("#btn_delete").show();
                                        $("#hdr_name").text("Initiate Rack Rate");
                                        var input = $('<button class="btn btn-default" data-toggle="modal" data-toggle="modal" data-target="#myModal123"  title="Remarks"><img src="../img/comment-btn.png" ><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                                            '  <button class="btn btn-default" data-toggle="modal" data-toggle="modal" data-target="#myModal" title="Additional Note"><img src="../img/file-btn.png" ></button>' +

                           '<button class="btn mr-right-01 btn-success sq-btn" id="btn_initiate_submit" onclick=\"RackRate.InitiateSubmit();\">Submit</button><button class="btn mr-right-01 sq-btn btn-success" id="btn_save_info" onclick=\"RackRate.SaveRackRate();\">Save</button><button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                        $("#div_btn").append(input);

                                        RackRate.BindDetails($('#hidden_payment_memo_id').val());
                                        $("#div_edit_controls").show();
                                        RackRate.ToggleBaseContols(false);
                                    }
                                    else {
                                        sessionStorage.CurrentMenuselected = "nav_information";
                                        $("#btn_reorder").hide();
                                        $("#btn_delete").hide();
                                        $("#div_btn").empty();
                                        $('#btn_save_review').attr('disabled', 'disabled');
                                        $('#btn_save_info').attr('disabled', 'disabled');
                                        $("#hdr_name").text("View Rack Rate");
                                        var input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                        RackRate.hidecheckbox();
                                        $("#div_btn").append(input);
                                        $("#div_edit_controls").hide();
                                        RackRate.DisableControlsOnView(true);
                                    }
                                }
                            }
                            else {
                                sessionStorage.CurrentMenuselected = "nav_information";
                                $("ul.btm-nav-ul li").removeClass("active");
                                $(".btm-nav-ul-li-nav_information").addClass("active");
                                $("#btn_reorder").hide();
                                $("#btn_delete").hide();
                                RackRate.hidecheckbox();
                                $("#div_btn").empty();
                                $('#btn_save_review').attr('disabled', 'disabled');
                                $('#btn_save_info').attr('disabled', 'disabled');
                                $("#hdr_name").text("View Rack Rate");
                                var input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                $("#div_btn").append(input);
                                $("#div_edit_controls").hide();
                                RackRate.DisableControlsOnView(true);
                            }
                            break;
                        }
                    case "Initiated":
                        {
                            if (ModifiedbyRole <= RoleID) {
                                if (jQuery.inArray('nav_review', menuarr) > -1) {
                                    if (RoleID > 2) {
                                        sessionStorage.CurrentMenuselected = "nav_review";
                                        $("#hdr_name").text("Review Rack Rate");
                                        $("#div_btn").empty();
                                        var input = $(' <button class="btn btn-danger sq-btn fr" id=btn_save_cancel onclick="RackRate.CloseScreen();">Cancel</button>' +
                                            '<button class="btn btn-success sq-btn fr" id="btn_save_info" onclick="RackRate.SaveReview();">Save</button>' +
                                            '<button class="btn btn-success sq-btn fr" id="btn_review_forward" onclick=\"RackRate.ReviewForward();\">Forward</button>' +
                                            '<button class="btn btn-danger sq-btn fr" id="btn_review_reject" onclick=\"RackRate.review_Reject();\">Reject</button>' +
                                            '<button class="btn btn-warning sq-btn fr" id="btn_review_Discard" onclick=\"RackRate.review_Discard();\">Discard</button>' +
                                            '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal" title="Additional Note"><img src="../img/file-btn.png" ></button>' +
                                            '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal123"  title="Remarks"><img src="../img/comment-btn.png" ><span class="remark-count"><span class="remark-count-inner"></span></span></button>');
                                        $("#div_btn").append(input);
                                        $("#div_edit_controls").show();
                                        RackRate.ToggleBaseContols(true);
                                    }
                                    else {
                                        sessionStorage.CurrentMenuselected = "nav_information";
                                        $("#btn_reorder").hide();
                                        $("#btn_delete").hide();
                                        RackRate.hidecheckbox();
                                        $("#div_btn").empty();
                                        $('#btn_save_review').attr('disabled', 'disabled');
                                        $('#btn_save_info').attr('disabled', 'disabled');
                                        $("#hdr_name").text("View Rack Rate");
                                        var input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                        $("#div_btn").append(input);
                                        $("#div_edit_controls").hide();
                                        RackRate.DisableControlsOnView(true);
                                        RackRate.ToggleBaseContols(true);
                                    }
                                }
                                else {
                                    sessionStorage.CurrentMenuselected = "nav_information";
                                    $("#btn_reorder").hide();
                                    $("#btn_delete").hide();
                                    RackRate.hidecheckbox();
                                    $("#div_btn").empty();
                                    $('#btn_save_review').attr('disabled', 'disabled');
                                    $('#btn_save_info').attr('disabled', 'disabled');
                                    $("#hdr_name").text("View Rack Rate");
                                    var input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                    $("#div_btn").append(input);
                                    $("#div_edit_controls").hide();
                                    RackRate.DisableControlsOnView(true);
                                    RackRate.ToggleBaseContols(true);
                                }
                            }
                            else {
                                sessionStorage.CurrentMenuselected = "nav_information";
                                $("#btn_reorder").hide();
                                $("#btn_delete").hide();
                                RackRate.hidecheckbox();
                                $("#div_btn").empty();
                                $('#btn_save_review').attr('disabled', 'disabled');
                                $('#btn_save_info').attr('disabled', 'disabled');
                                $("#hdr_name").text("View Rack Rate");
                                var input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                $("#div_btn").append(input);
                                $("#div_edit_controls").hide();
                                RackRate.DisableControlsOnView(true);
                            }
                            break;
                        }
                    case "Reviewed":
                        {
                            if (ModifiedbyRole.toString() < RoleID) {
                                if (jQuery.inArray('nav_review', menuarr) > -1) {
                                    sessionStorage.CurrentMenuselected = "nav_review";
                                    $("#hdr_name").text("Review Rack Rate");
                                    $("#div_btn").empty();
                                    var input = $(' <button class="btn btn-danger sq-btn fr" id=btn_save_cancel onclick="RackRate.CloseScreen();">Cancel</button>' +
                                        '<button class="btn btn-success sq-btn fr" id="btn_save_info" onclick="RackRate.SaveReview();">Save</button>' +
                                        '<button class="btn btn-success sq-btn fr" id="btn_review_forward" onclick=\"RackRate.ReviewForward();\">Forward</button>' +
                                        '<button class="btn btn-danger sq-btn fr" id="btn_review_reject" onclick=\"RackRate.review_Reject();\">Reject</button>' +
                                        '<button class="btn btn-warning sq-btn fr" id="btn_review_Discard" onclick=\"RackRate.review_Discard();\">Discard</button>' +
                                        '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal5" title="Additional Note"><img src="../img/file-btn.png" ></button>' +
                                        '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal123"  title="Remarks"><img src="../img/comment-btn.png" ><span class="remark-count"><span class="remark-count-inner"></span></span></button>');
                                    $("#div_btn").append(input);
                                    $("#div_edit_controls").show();
                                    RackRate.ToggleBaseContols(true);

                                }
                                else if (jQuery.inArray('nav_approval', menuarr) > -1) {
                                    sessionStorage.CurrentMenuselected = "nav_approval";
                                    $("#btn_reorder").hide();
                                    $("#btn_delete").hide();
                                    RackRate.hidecheckbox();
                                    $("#div_btn").empty();
                                    $("#hdr_name").text("Approve Rack Rate");
                                    //input = $(' <button class="btn btn-warning mr-right-01">Discard</button><button class="btn btn-danger mr-right-01">Reject</button><button class="btn btn-success mr-right-01"  onclick=\"RackRate.RackRateApproval();\">Approve</button><button class="btn btn-success  mr-right-01">Save</button><button class="btn btn-danger mr-right-01" onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                    input = $('<button class="btn btn-danger sq-btn fr" id=btn_save_cancel onclick="RackRate.CloseScreen();">Cancel</button>' +
                                        '<button class="btn btn-success sq-btn fr" id="btn_save_info" onclick="RackRate.SaveReview();">Save</button>' +
                                        '<button class="btn btn-success sq-btn fr" id="btn_review_forward" onclick=\"RackRate.RackRateApproval();\">Approve</button>' +
                          '<button class="btn btn-danger sq-btn fr" id="btn_review_reject" onclick=\"RackRate.ApprovalReject();\">Reject</button>' +
                          '<button class="btn btn-warning sq-btn fr" id="btn_review_Discard" onclick=\"RackRate.ApprovalDiscard();\">Discard</button>' +
                          '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal5" title="Additional Note"><img src="../img/file-btn.png" ></button>' +
                        '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal123"   title="Remarks"><img src="../img/comment-btn.png" ><span class="remark-count"><span class="remark-count-inner"></span></span></button>');
                                    $("#div_btn").append(input);
                                    $("#div_edit_controls").show();
                                    RackRate.ToggleBaseContols(true);
                                }
                                else {
                                    sessionStorage.CurrentMenuselected = "nav_information";
                                    $("#btn_reorder").hide();
                                    $("#btn_delete").hide();
                                    RackRate.hidecheckbox();
                                    $("#div_btn").empty();
                                    $('#btn_save_review').attr('disabled', 'disabled');
                                    $('#btn_save_info').attr('disabled', 'disabled');
                                    $("#hdr_name").text("View Rack Rate");
                                    var input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                    $("#div_btn").append(input);
                                    $("#div_edit_controls").hide();
                                    RackRate.DisableControlsOnView(true);

                                }
                            }
                            else if (ModifiedbyRole == RoleID || RoleID >= 6) {

                                if (jQuery.inArray('nav_approval', menuarr) > -1) {
                                    sessionStorage.CurrentMenuselected = "nav_approval";
                                    $("#btn_reorder").hide();
                                    $("#btn_delete").hide();
                                    RackRate.hidecheckbox();
                                    $("#div_btn").empty();
                                    $("#hdr_name").text("Approve Rack Rate");
                                    //input = $(' <button class="btn btn-warning mr-right-01">Discard</button><button class="btn btn-danger mr-right-01">Reject</button><button class="btn btn-success mr-right-01"  onclick=\"RackRate.RackRateApproval();\">Approve</button><button class="btn btn-success  mr-right-01">Save</button><button class="btn btn-danger mr-right-01" onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                    input = $('<button class="btn btn-danger sq-btn fr" id=btn_save_cancel onclick="RackRate.CloseScreen();">Cancel</button>' +
                                        '<button class="btn btn-success sq-btn fr" id="btn_save_info" onclick="RackRate.SaveReview();">Save</button>' +
                                        '<button class="btn btn-success sq-btn fr" id="btn_review_forward" onclick=\"RackRate.RackRateApproval();\">Approve</button>' +
                          '<button class="btn btn-danger sq-btn fr" id="btn_review_reject" onclick=\"RackRate.ApprovalReject();\">Reject</button>' +
                          '<button class="btn btn-warning sq-btn fr" id="btn_review_Discard" onclick=\"RackRate.ApprovalDiscard();\">Discard</button>' +
                          '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal5" title="Additional Note"><img src="../img/file-btn.png" ></button>' +
                        '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal123"   title="Remarks"><img src="../img/comment-btn.png" ><span class="remark-count"><span class="remark-count-inner"></span></span></button>');
                                    $("#div_btn").append(input);
                                    $("#div_edit_controls").show();
                                    RackRate.ToggleBaseContols(true);
                                }
                                else {
                                    if (RoleID == "10" && ApprovalRoleID >= "6") {
                                        sessionStorage.CurrentMenuselected = "nav_information";
                                        $("#btn_reorder").hide();
                                        $("#btn_delete").hide();
                                        RackRate.hidecheckbox();
                                        $("#div_btn").empty();
                                        $("#hdr_name").text("View Rack Rate");
                                        var input = $('<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"RackRate.ReviewForward();\">Re-allocate</button> <button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                        $("#div_btn").append(input);
                                        $("#div_edit_controls").hide();
                                        RackRate.DisableControlsOnView(true);
                                        RackRate.ToggleBaseContols(true);
                                    }
                                    else {
                                        sessionStorage.CurrentMenuselected = "nav_information";
                                        $("#btn_reorder").hide();
                                        $("#btn_delete").hide();
                                        RackRate.hidecheckbox();
                                        $("#div_btn").empty();
                                        $('#btn_save_review').attr('disabled', 'disabled');
                                        $('#btn_save_info').attr('disabled', 'disabled');
                                        $("#hdr_name").text("View Rack Rate");
                                        var input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                        $("#div_btn").append(input);
                                        $("#div_edit_controls").hide();
                                        RackRate.DisableControlsOnView(true);
                                        RackRate.ToggleBaseContols(true);
                                    }
                                }
                            }
                            else if (ModifiedbyRole <= 4 && (RoleID == "3" || RoleID == "10")) {
                                if (jQuery.inArray('nav_review', menuarr) > -1) {
                                    sessionStorage.CurrentMenuselected = "nav_review";
                                    $("#hdr_name").text("Review Rack Rate");
                                    $("#div_btn").empty();
                                    var input = $(' <button class="btn btn-danger sq-btn fr" id=btn_save_cancel onclick="RackRate.CloseScreen();">Cancel</button>' +
                                        '<button class="btn btn-success sq-btn fr" id="btn_save_info" onclick="RackRate.SaveReview();">Save</button>' +
                                        '<button class="btn btn-success sq-btn fr" id="btn_review_forward" onclick=\"RackRate.ReviewForward();\">Forward</button>' +
                                        '<button class="btn btn-danger sq-btn fr" id="btn_review_reject" onclick=\"RackRate.review_Reject();\">Reject</button>' +
                                        '<button class="btn btn-warning sq-btn fr" id="btn_review_Discard" onclick=\"RackRate.review_Discard();\">Discard</button>' +
                                        '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal5" title="Additional Note"><img src="../img/file-btn.png" ></button>' +
                                        '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal123"  title="Remarks"><img src="../img/comment-btn.png" ><span class="remark-count"><span class="remark-count-inner"></span></span></button>');
                                    $("#div_btn").append(input);
                                    $("#div_edit_controls").show();
                                    RackRate.ToggleBaseContols(true);
                                }
                            }
                            else if (ModifiedbyRole > 5 && (RoleID == "3" || RoleID == "10")) {
                                if (jQuery.inArray('nav_approval', menuarr) > -1) {
                                    sessionStorage.CurrentMenuselected = "nav_approval";
                                    $("#hdr_name").text("Approve Rack Rate");
                                    $("#btn_reorder").hide();
                                    $("#btn_delete").hide();
                                    RackRate.hidecheckbox();
                                    $("#div_btn").empty();
                                    //input = $(' <button class="btn btn-warning mr-right-01">Discard</button><button class="btn btn-danger mr-right-01">Reject</button><button class="btn btn-success mr-right-01"  onclick=\"RackRate.RackRateApproval();\">Approve</button><button class="btn btn-success  mr-right-01">Save</button><button class="btn btn-danger mr-right-01" onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                    input = $('<button class="btn btn-danger sq-btn fr" id=btn_save_cancel onclick="RackRate.CloseScreen();">Cancel</button>' +
                                        '<button class="btn btn-success sq-btn fr" id="btn_save_info" onclick="RackRate.SaveReview();">Save</button>' +
                                        '<button class="btn btn-success sq-btn fr" id="btn_review_forward" onclick=\"RackRate.RackRateApproval();\">Approve</button>' +
                          '<button class="btn btn-danger sq-btn fr" id="btn_review_reject" onclick=\"RackRate.ApprovalReject();\">Reject</button>' +
                          '<button class="btn btn-warning sq-btn fr" id="btn_review_Discard" onclick=\"RackRate.ApprovalDiscard();\">Discard</button>' +
                          '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal5" title="Additional Note"><img src="../img/file-btn.png" ></button>' +
                        '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal123"   title="Remarks"><img src="../img/comment-btn.png" ><span class="remark-count"><span class="remark-count-inner"></span></span></button>');
                                    $("#div_btn").append(input);
                                    $("#div_edit_controls").show();
                                    RackRate.ToggleBaseContols(true);
                                }
                            }
                            else {
                                sessionStorage.CurrentMenuselected = "nav_information";
                                $("#btn_reorder").hide();
                                $("#btn_delete").hide();
                                RackRate.hidecheckbox();
                                $("#div_btn").empty();
                                $('#btn_save_review').attr('disabled', 'disabled');
                                $('#btn_save_info').attr('disabled', 'disabled');
                                $("#hdr_name").text("View Rack Rate");
                                var input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                $("#div_btn").append(input);
                                $("#div_edit_controls").hide();
                                RackRate.DisableControlsOnView(true);
                                RackRate.ToggleBaseContols(true);
                            }
                            break;
                        }
                    case "Approved":
                        {
                            if (ModifiedbyRole < RoleID) {
                                if (jQuery.inArray('nav_approval', menuarr) > -1) {
                                    sessionStorage.CurrentMenuselected = "nav_approval";
                                    $("#hdr_name").text("Approve Rack Rate");
                                    $("ul.btm-nav-ul li").removeClass("active");
                                    $(".btm-nav-ul-li-nav_approval").addClass("active");
                                    $("#btn_reorder").hide();
                                    $("#btn_delete").hide();
                                    RackRate.hidecheckbox();
                                    $("#div_btn").empty();
                                    //input = $(' <button class="btn btn-warning mr-right-01">Discard</button><button class="btn btn-danger mr-right-01">Reject</button><button class="btn btn-success mr-right-01"  onclick=\"RackRate.RackRateApproval();\">Approve</button><button class="btn btn-success  mr-right-01">Save</button><button class="btn btn-danger mr-right-01" onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                    input = $('<button class="btn btn-danger sq-btn fr" id=btn_save_cancel onclick="RackRate.CloseScreen();">Cancel</button>' +
                                        '<button class="btn btn-success sq-btn fr" id="btn_save_info" onclick="RackRate.SaveReview();">Save</button>' +
                                        '<button class="btn btn-success sq-btn fr" id="btn_review_forward" onclick=\"RackRate.RackRateApproval();\">Approve</button>' +
                                          '<button class="btn btn-danger sq-btn fr" id="btn_review_reject" onclick=\"RackRate.ApprovalReject();\">Reject</button>' +
                                          '<button class="btn btn-warning sq-btn fr" id="btn_review_Discard" onclick=\"RackRate.ApprovalDiscard();\">Discard</button>' +
                                          '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal5" title="Additional Note"><img src="../img/file-btn.png" ></button>' +
                                        '<button class="btn btn-default fr" data-toggle="modal" onclick=\"RackRate.OpenRemarks(1);\"  title="Remarks"><img src="../img/comment-btn.png" ><span class="remark-count"><span class="remark-count-inner"></span></span></button>');
                                    $("#div_btn").append(input);
                                    $("#div_edit_controls").show();
                                    RackRate.ToggleBaseContols(true);
                                }
                                else {
                                    if (RoleID == "10" && ModifiedbyRole != "6") {
                                        if (jQuery.inArray('nav_freeze', menuarr) > -1) {
                                            sessionStorage.CurrentMenuselected = "nav_freeze";
                                            $("#hdr_name").text("Freeze Rack Rate");
                                            $("#btn_reorder").hide();
                                            $("#btn_delete").hide();
                                            RackRate.hidecheckbox();
                                            $("#div_btn").empty();
                                            var input = $('<button class="btn btn-success sq-btn mr-right-01" id="btn_freeze_freeze" onclick=\"RackRate.RackRateFreeze();\">Freeze</button>' +
                                                '<button id="btn_freeze_Discard" href="#div_remarks" class="btn btn-warning sq-btn mr-right-01"  onclick=\"RackRate.FreezeDiscard();\">Discard</button>');
                                            $("#div_btn").append(input);

                                            input = $('<button class="btn mr-right-01 sq-btn btn-danger" onclick=\"RackRate.CloseScreen();\">Cancel</button>');
                                            $("#div_btn").append(input);
                                            $("#div_edit_controls").hide();
                                            RackRate.ToggleBaseContols(true);

                                        }
                                    }
                                    else {
                                        sessionStorage.CurrentMenuselected = "nav_information";
                                        $("ul.btm-nav-ul li").removeClass("active");
                                        $(".btm-nav-ul-li-nav_information").addClass("active");
                                        $("#btn_reorder").hide();
                                        $("#btn_delete").hide();
                                        RackRate.hidecheckbox();
                                        $("#div_btn").empty();
                                        $('#btn_save_review').attr('disabled', 'disabled');
                                        $('#btn_save_info').attr('disabled', 'disabled');
                                        $("#hdr_name").text("View Rack Rate");
                                        var input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                        $("#div_btn").append(input);
                                        $("#div_edit_controls").hide();
                                        RackRate.DisableControlsOnView(true);
                                        RackRate.ToggleBaseContols(true);
                                    }
                                }
                            }
                            else {
                                if (RoleID == "10") {
                                    if (jQuery.inArray('nav_freeze', menuarr) > -1) {
                                        sessionStorage.CurrentMenuselected = "nav_freeze";
                                        $("#hdr_name").text("Freeze Rack Rate");
                                        $("ul.btm-nav-ul li").removeClass("active");
                                        $(".btm-nav-ul-li-nav_freeze").addClass("active");
                                        $("#btn_reorder").hide();
                                        $("#btn_delete").hide();
                                        RackRate.hidecheckbox();
                                        $("#div_btn").empty();
                                        var input = $('<button class="btn btn-primary sq-btn mr-right-01" id="btn_freeze_freeze" onclick=\"RackRate.RackRateFreeze();\">Freeze</button>' +
                                            '<button id="btn_freeze_Discard" href="#div_remarks" class="btn btn-primary sq-btn mr-right-01"  onclick=\"RackRate.FreezeDiscard();\">Discard</button>');
                                        $("#div_btn").append(input);

                                        input = $('<button class="btn mr-right-01 sq-btn btn-danger" onclick=\"RackRate.CloseScreen();\">Cancel</button>');
                                        $("#div_btn").append(input);
                                        $("#div_edit_controls").hide();
                                        RackRate.ToggleBaseContols(true);
                                    }
                                }
                                else {
                                    sessionStorage.CurrentMenuselected = "nav_information";
                                    $("ul.btm-nav-ul li").removeClass("active");
                                    $(".btm-nav-ul-li-nav_information").addClass("active");
                                    $("#btn_reorder").hide();
                                    $("#btn_delete").hide();
                                    RackRate.hidecheckbox();
                                    $("#div_btn").empty();
                                    $('#btn_save_review').attr('disabled', 'disabled');
                                    $('#btn_save_info').attr('disabled', 'disabled');
                                    $("#hdr_name").text("View Rack Rate");
                                    var input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                    $("#div_btn").append(input);
                                    $("#div_edit_controls").hide();
                                    RackRate.DisableControlsOnView(true);
                                    RackRate.ToggleBaseContols(true);
                                }
                            }
                            break;
                        }
                    case "Active":
                        {
                            if (jQuery.inArray('nav_freeze', menuarr) > -1) {
                                sessionStorage.CurrentMenuselected = "nav_manage";
                                $("#hdr_name").text("Manage Rack Rate");
                                $("ul.btm-nav-ul li").removeClass("active");
                                $(".btm-nav-ul-li-nav_manage").addClass("active");
                                $("#btn_reorder").hide();
                                $("#btn_delete").hide();
                                RackRate.hidecheckbox();
                                $("#div_btn").empty();
                                var input = $('<button class="btn btn-primary sq-btn mr-right-01" onclick=\"RackRate.Viewtoccusers();\" target="_blank">Email</button><button class="btn btn-primary sq-btn mr-right-01"  onclick=\"RackRate.PrintRackRate();\">Print</button>');
                                $("#div_btn").append(input);
                                $('#btn_save_review').attr('disabled', 'disabled');
                                $('#btn_save_info').attr('disabled', 'disabled');

                                input = $('<button class="btn sq-btn mr-right-01 btn-danger" onclick=\"RackRate.CloseScreen();\">Cancel</button>');

                                $("#div_btn").append(input);
                                $("#div_edit_controls").hide();
                                RackRate.ToggleBaseContols(true);
                            }
                            else {
                                sessionStorage.CurrentMenuselected = "nav_information";
                                $("ul.btm-nav-ul li").removeClass("active");
                                $(".btm-nav-ul-li-nav_information").addClass("active");
                                $("#btn_reorder").hide();
                                $("#btn_delete").hide();
                                RackRate.hidecheckbox();
                                $("#div_btn").empty();
                                $('#btn_save_review').attr('disabled', 'disabled');
                                $('#btn_save_info').attr('disabled', 'disabled');
                                $("#hdr_name").text("View Rack Rate");
                                var input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                $("#div_btn").append(input);
                                $("#div_edit_controls").hide();
                                RackRate.DisableControlsOnView(true);
                                RackRate.ToggleBaseContols(true);
                            }
                            break;
                        }


                    case "Discarded":
                        {
                            $("#btn_reorder").hide();
                            $("#btn_delete").hide();
                            RackRate.hidecheckbox();
                            $("#div_btn").empty();
                            $("#hdr_name").text("View Rack Rate");
                            var input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                            $("#div_btn").append(input);

                            $('#btn_save_initiate').attr('disabled', 'disabled');
                            $('#btn_save_info').attr('disabled', 'disabled');
                            $("#div_edit_controls").hide();
                            RackRate.DisableControlsOnView(true);
                            RackRate.ToggleBaseContols(true);
                            break;
                        }
                    case "Rejected":
                        {
                            sessionStorage.CurrentMenuselected = "nav_information";
                            $("#btn_reorder").hide();
                            $("#btn_delete").hide();
                            RackRate.hidecheckbox();
                            $("#div_btn").empty();


                            if (sessionStorage.MemoStatus == "Rejected") {
                                if (sessionStorage.LoginUserId.toLowerCase() != sessionStorage.LoginId.toLowerCase()) {
                                    if (RoleID == "3" || RoleID == "10") {
                                        $("#hdr_name").text("Initiate Rack Rate");
                                        var input = $('<button class="btn btn-default" data-toggle="modal" onclick=\"RackRate.OpenRemarks(1);\"  title="Remarks"><img src="../img/comment-btn.png" ><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                                       '  <button class="btn btn-default" data-toggle="modal" data-target="#myModal5" title="Additional Note"><img src="../img/file-btn.png" ></button>' +

                       '<button class="btn mr-right-01 btn-success sq-btn" id="btn_initiate_submit" onclick=\"RackRate.InitiateSubmit();\">Submit</button><button class="btn mr-right-01 sq-btn btn-success" id="btn_save_info" onclick=\"RackRate.SaveRackRate();\">Save</button><button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                        $("#div_btn").append(input);
                                        $("#div_edit_controls").show();
                                    } else {
                                        $("#hdr_name").text("View Rack Rate");
                                        var input = $('<button class="btn btn-default" data-toggle="modal" onclick=\"RackRate.OpenRemarks(1);\"  title="Remarks"><img src="../img/comment-btn.png" ><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                                       '  <button class="btn btn-default" data-toggle="modal" data-target="#myModal5" title="Additional Note"><img src="../img/file-btn.png" ></button>' +
                       '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                        $("#div_btn").append(input);
                                        $("#div_edit_controls").hide();
                                        RackRate.DisableControlsOnView(true);
                                    }
                                } else {
                                    $("#hdr_name").text("View Rack Rate");
                                    var input = $('<button class="btn btn-default" data-toggle="modal" onclick=\"RackRate.OpenRemarks(1);\"  title="Remarks"><img src="../img/comment-btn.png" ><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                                      '  <button class="btn btn-default" data-toggle="modal" data-target="#myModal5" title="Additional Note"><img src="../img/file-btn.png" ></button>' +

                      '<button class="btn mr-right-01 btn-success sq-btn" id="btn_initiate_submit" onclick=\"RackRate.InitiateSubmit();\">Submit</button><button class="btn mr-right-01 sq-btn btn-success" id="btn_save_info" onclick=\"RackRate.SaveRackRate();\">Save</button><button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                                    $("#div_btn").append(input);
                                }
                            }
                            break;
                        }
                    case "InActive": {
                        sessionStorage.CurrentMenuselected = "nav_information";
                        $("#btn_reorder").hide();
                        $("#btn_delete").hide();
                        RackRate.hidecheckbox();
                        $("#div_btn").empty();
                        $('#btn_save_review').attr('disabled', 'disabled');
                        $('#btn_save_info').attr('disabled', 'disabled');
                        $("#hdr_name").text("View Rack Rate");
                        var input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
                        $("#div_btn").append(input);
                        RackRate.DisableControlsOnView(true);
                        $("#div_edit_controls").hide();
                        RackRate.ToggleBaseContols(true);
                        break;
                    }
                }
            }
            else {
                var pagename = Utility.GetParameterValues('ptype');
                if (pagename == "mq") {
                    window.location.href = "MasterQueue.html";
                }
                else if (pagename == "ss") {
                    sessionStorage.setItem("SmartSearchScreen", "ss");
                    window.location.href = "SmartSearchScreen.html";
                }
                else if (pagename == "cr") {
                    window.location.href = "CreateRackRate.html";
                }
            }
        });

        //RackRate.ViewAction($('#hidden_payment_memo_id').val());
        if (status != "Active" && status != "InActive" && status != "Discarded" && status != "Rejected" && status != "Approved") {
            RackRate.CheckBranchAndRemoveControls();
        }
        RackRate.ViewRemarks();
        RackRate.ShowMemoType();
    },

    ShowMemoType: function () {
        if (RackRate.IsCloseEnded == 1) {
            $('#div_hdr').empty();
            $('#div_hdr').append('<label class="lbl btn-info toggle-on" >Closed Ended</label>');
        }
        else {
            $('#div_hdr').empty();
            $('#div_hdr').append('<label class="lbl btn-warning active toggle-off" style="line-height: 21px;">Open Ended</labe');
        }
    },

    CheckBranchAndRemoveControls: function () {
        var invalid = 1;
        var RoleID = sessionStorage.getItem("RoleID");
        if (RoleID == "1" || RoleID == "2" || RoleID == "4" || RoleID == "5") {

            var memoval = $('#hidden_payment_memo_id').val() == "" ? 0 : $('#hidden_payment_memo_id').val();
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/ValidateBranchPaymentMemo', JSON.stringify({ PaymentMemoID: memoval }), "json", false, false, function (result) {
                invalid = result.ValidateBranchPaymentMemoResult;

            });


        }
        else if (RoleID == "6" && sessionStorage.MemoStatus != "Saved") {
            var ChannelID = "";
            var token = $("#txt_arn_info").tokenInput("get");
            var names = [];
            $.each(token, function (i, obj) {
                names.push(obj.name);//build an array of just the names
            });
            var ARNSelected = names.toString();
            var MemoCount = 1;
            var Categoryselected = [];
            var Category = $('#dd_dist_category_info option:selected');
            $(Category).each(function () {
                Categoryselected.push([$(this).val()]);
            });
            var DistCategorySelected = Categoryselected.toString();

            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChannelForARNAndDistributorCategory', JSON.stringify({ ARN: ARNSelected, DistributorCategory: DistCategorySelected }), "json", false, false, function (result) {
                var data = result.GetChannelForARNAndDistributorCategoryResult;
                ChannelID = data.toString();
            });


            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetUserBasedOnRole', JSON.stringify({ RoleID: "6", ChannelId: ChannelID }), "json", false, false, function (result) {
                var arrItems = result.GetUserBasedOnRoleResult;
                var UserId = sessionStorage.UserID;
                var UserIds = [];
                for (var i = 0; i < arrItems.length; i++) {
                    UserIds.push(arrItems[i].UserID.toString());
                }
                if ($.inArray(UserId, UserIds) === -1) {
                    invalid = 0;
                }


            });
        }

        if (invalid == 0) {
            sessionStorage.CurrentMenuselected = "nav_information";
            RackRate.hidecheckbox();
            $("#div_btn").empty();
            $("#hdr_name").text("View Rack Rate");
            var input = $('<button class="btn btn-default" data-toggle="modal" data-toggle="modal" data-target="#myModal123"  title="Remarks"><img src="../img/comment-btn.png" ><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                                            '  <button class="btn btn-default" data-toggle="modal" data-toggle="modal" data-target="#myModal" title="Additional Note"><img src="../img/file-btn.png" ></button>' +
                                            '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"RackRate.CancelRackRate();\">Cancel</button>');
            $("#div_edit_controls").hide();
            $("#div_btn").append(input);
            RackRate.DisableControlsOnView(true);
            RackRate.ToggleBaseContols(true);
        }
    },

    hidecheckbox: function () {
        $("#div_rack_rate_detail input:checkbox").hide();
    },

    masterqueueedit: function () {
        var memono = Utility.GetParameterValues('memono');
        var status = Utility.GetParameterValues('status');
        var pagename = Utility.GetParameterValues('ptype');
        if (memono != "" && memono != undefined) {
            //RackRate.BindDetails(memono);
            if (status != "" && status != undefined) {
                RackRate.ViewScreen(memono);
                RackRate.generatebutton(status, memono)
            }
            else {
                RackRate.BindDetails(memono);
            }

            if (pagename != undefined && pagename == "ss") {
                var value = $(' <button class="btn btn-danger sq-btn fr" id=btn_save_cancel onclick="RackRate.CloseScreen();">Cancel</button>');
                $("#div_btn").empty();
                $("#div_btn").append(value);
                $("#div_edit_controls").hide();
            }

        }
        else {

            var categorySelected = sessionStorage.getItem('DistributorCategory') != null ? sessionStorage.getItem('DistributorCategory').split(",") : '';
            var Arnselected = sessionStorage.getItem('ARN') != null ? sessionStorage.getItem('ARN').split(",") : '';

            $('#txt_arn_info').tokenInput('clear');
            $('#txt_arn_name_info').tokenInput('clear');
            if (Arnselected != null) {
                for (i = 0; i < Arnselected.length ; i++) {
                    $.each(RackRate.arns, function (key, value) {
                        if (value.name == Arnselected[i]) {
                            $("#txt_arn_info").tokenInput("add", { id: value.id, name: value.name });
                        }
                    });
                }
            }
            if (categorySelected != null) {
                if (categorySelected.length == 1) {
                    if (categorySelected[0] != "") {
                        $('#dd_dist_category_info').multiselect('clearSelection');
                    }
                }
                for (i = 0; i < categorySelected.length; i++) {
                    if (categorySelected[i] != "") {
                        $('#dd_dist_category_info').multiselect('select', categorySelected[i]);
                    }
                }
            }
        }
    },

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
        if ($("#div_landing_grid").is(":visible")) {
            var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
            var selectedmemos = [];
            if (gridData.length > 0) {
                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].selectcheck == 'True') {
                        selectedmemos.push(RackRate.remove_tags(gridData[i].MemoNumber));
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
                    RackRate.GetTOCCusers(selectedmemos.toString());
                }
            }
            else {
                Utility.writeNotification("error", "Select Memo to  Send Email", "", true);
            }
        }
        else {
            //RackRate.SaveRackRateInfo(updateStatus, 'Memo Submitted Successfully');
        }

    },

    GetTOCCusers: function (SearchText) {


        $("#txt_to").siblings("ul").remove();//.removeClass("token-input-list-facebook")
        $("#txt_cc").siblings("ul").remove();
        $("#txt_bcc").siblings("ul").remove();
        var memocntsplit = SearchText.split(',');
        SearchText = memocntsplit[0];
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/getmailinglistobject', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
            var arrItems = [];
            $("#txt_to").empty();
            arrItems = JSON.parse(result.getmailinglistobjectResult);
            $("#txt_to").tokenInput(
            arrItems,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10, allowFreeTagging: true
            });
        });
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/getmailinglistobject', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
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

        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorEmail', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
            var arrItems = [];
            arrItems = JSON.parse(result.GetDistributorEmailResult);
            $.each(arrItems, function (key, value) {
                $("#txt_to").tokenInput("add", { id: value.id, name: value.name });
            });
        });

    },

    EmailRackRate: function () {
        if ($("#div_landing_grid").is(":visible")) {
            var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
            var selectedmemos = "";
            if (gridData.length > 0) {
                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].selectcheck == 'True') {
                        var fileurl = Utility.CamsReportUrl.replace("###MemoNumber###", RackRate.remove_tags(gridData[i].MemoNumber));
                        //var fileurl = 'http://192.168.1.127:9080/pentaho/content/reporting/execute/Pentaho%20Training/CAMS_Report_1null?Memonumber_P=' + RackRate.remove_tags(gridData[i].MemoNumber) + '&output-target=pageable%2Fpdf&solution=Pentaho%20Training&path=&name=CAMS_Report_1.prpt&userid=joe&password=password';
                        var filename = RackRate.remove_tags(gridData[i].MemoNumber);
                        var sendto = "";
                        Utility.ServiceCall("POST", 'BaseRackRateService.svc/SendEmailMemo', JSON.stringify({ fileurl: fileurl, filename: filename, sendto: sendto, typeval: 1, ModuleID: 1, MailStatus: "Distributor Mail BRR", sendbcc: "" }), "json", false, false, function (result) {
                            Utility.writeNotification("success", "Memo Emailed Successfully", "", true);
                        });
                        selectedmemos = gridData[i].MemoNumber
                    }
                }
            }
            else {
                //Utility.writeNotification("warning", "Select a Memo to Submit", "", true);
                Utility.writeNotification("error", "Select Memo to  Send Email", "", true);
            }
        }
        else {
            //RackRate.SaveRackRateInfo(updateStatus, 'Memo Submitted Successfully');
        }
    },

    PrintRackRate: function () {
        if ($("#div_landing_grid").is(":visible")) {
            var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
            var selectedmemos = "";
            if (gridData.length > 0) {
                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].selectcheck == 'True') {
                        selectedmemos = gridData[i].MemoNumber;
                        var fileurl = Utility.DistributorReportUrl.replace("###MemoNumber###", RackRate.remove_tags(gridData[i].MemoNumber));
                        fileurl = fileurl.replace("###Distributorid###", gridData[i].ARNNo);
                        RackRate.openWin(fileurl);
                    }
                }
                if (selectedmemos == "") {
                    Utility.writeNotification("error", "Select Memo to Print", "", true);
                }
            }
            else {
                Utility.writeNotification("error", "Select Memo to Print", "", true);
            }
        }
        else {
            Utility.writeNotification("error", "Select Memo to Print", "", true);
        }
    },

    Viewreport: function (paymentmemoid) {
        var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].PaymentMemoId == paymentmemoid) {
                    var fileurl = Utility.DistributorReportUrl.replace("###MemoNumber###", RackRate.remove_tags(gridData[i].MemoNumber));
                    fileurl = fileurl.replace("###Distributorid###", gridData[i].ARNNo);
                    RackRate.openWin(fileurl);
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

    ConfirmARNOk: function () {

        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetParentARN', JSON.stringify({ ARN: sessionStorage.getItem('ARN') }), "json", false, false, function (result) {
            var data = JSON.parse(result.GetParentARNResult);
            $('#txt_arn_info').tokenInput('clear');
            $('#txt_arn_name_info').tokenInput('clear');

            $.each(data, function (key, value) {
                $("#txt_arn_info").tokenInput("add", { id: value.id, name: value.name });
            });
            $('#modal_confirmation').modal('hide');
        });
    },

    ConfirmARNCancel: function () {
        $('#modal_confirmation').modal('hide');
    },

    additionalNotes: function (MemoTypeID) {

        var channelselected = $('#dd_channel option:selected');
        var channelarray = [];
        $(channelselected).each(function (index, channelsel) {
            channelarray.push([$(this).val()]);
        });
        var Channel = channelarray.toString();

        var Distselected = $('#dd_dist_category_info option:selected');
        var Distarray = [];
        $(Distselected).each(function (index, channelsel) {
            Distarray.push([$(this).val()]);
        });
        var DistributorCategory = Distarray.toString();

        var token = $("#txt_arn_info").tokenInput("get");
        var names = [];
        $.each(token, function (i, obj) {
            names.push(obj.name);//build an array of just the names
        });
        var ARNSelected = names.toString();

        Utility.ServiceCall("POST", 'MasterService.svc/GetAdditionalNotes', JSON.stringify({ MemoTypeID: MemoTypeID, Channel: Channel, DistributorCategory: DistributorCategory, ARNNO: ARNSelected }), "json", false, false, function (result) {
            $('#txt_additional_notes').text(result.GetAdditionalNotesResult);
        });
    },

    SaveSchemeClick: function () {
        RackRate.SaveAllreview_schemeRows();
        RackRate.TempmonthList = [];
        RackRate.TempPaymentDetails = [];
        RackRate.TempPaymentList = [];
        RackRate.TempyearList = [];
        if (RackRate.TableCount > 0) {
            for (var cnt = 0; cnt < RackRate.TableCount; cnt++) {
                var row = $("#tbl_review_scheme" + cnt + " tr.detail_row");

                for (var rowIndex = 0; rowIndex < row.length; rowIndex++) {
                    var rowData = $($("#tbl_review_scheme" + cnt + " tr.detail_row")[rowIndex]);
                    var column = $(rowData).find('td');
                    if (column.length > 0) {
                        var clm = column[0];
                        var SchemeId = $(clm).find("input[name='hid_scheme_id']").val();
                        var ScehemCategoryId = $(clm).find("input[name='hid_scheme_category_id']").val();


                        var listitem = {};

                        listitem["schemeid"] = SchemeId;
                        listitem["schemecategoryid"] = ScehemCategoryId;

                        listitem["scheme_category"] = $(clm).find("input[name='hid_scheme_category']").val();
                        listitem["scheme"] = $(clm).find("input[name='hid_scheme']").val();
                        listitem["PaymentType"] = 1;
                        listitem["SlabType"] = $(clm).find("input[name='hid_slab_type']").val();
                        listitem["slab_amount"] = $(clm).find("input[name='hid_slab_amount']").val();
                        listitem["claw_back"] = $(clm).find("input[name='hid_claw_back']").val();
                        listitem["Onwards"] = $(clm).find("input[name='hid_onwards']").val();
                        listitem["PaymentType"] = $(clm).find("input[name='hid_payment_Type']").val();

                        listitem["Base"] = $(column[3]).find(".editInPlace").text();
                        listitem["Additional"] = $(column[4]).find("input[name$='hid_lumpsum_additional']").val();
                        listitem["Total"] = $(column[4]).find(".total").text();
                        listitem["LumpSumGreater"] = $(column[5]).find(".editInPlace").text();
                        listitem["SIPSlabLess"] = $(column[6]).find(".editInPlace").text();
                        listitem["SIPSlabGreater"] = $(column[7]).find(".editInPlace").text();
                        listitem["SIPSlab"] = $(clm).find("input[name='hid_sip']").val();

                        listitem["addl_upfront_B15"] = $(column[9]).find(".editInPlace").text();
                        var sd = $(clm).find("input[name='hid_mothyearvalue']").val().split('/')[2];

                        listitem["monthperiods"] = sd.split('~')[0];//monthperiods;
                        listitem["yearcount"] = sd.split('~')[1];//yearcount;
                        listitem["mothyearvalue"] = $(clm).find("input[name='hid_mothyearvalue']").val();


                        var detailitem = {}
                        detailitem["schemeid"] = SchemeId;
                        detailitem["schemecategoryid"] = ScehemCategoryId;
                        detailitem["scheme_category"] = $(clm).find("input[name='hid_scheme_category']").val();
                        detailitem["scheme"] = $(clm).find("input[name='hid_scheme']").val();
                        detailitem["BrokerageTypeId"] = 1;
                        detailitem["Base"] = $(column[3]).find(".editInPlace").text();
                        detailitem["Additional"] = $(column[4]).find("input[name$='hid_lumpsum_additional']").val();
                        detailitem["Total"] = $(column[4]).find(".total").text();
                        detailitem["LumpSumGreater"] = $(column[5]).find(".editInPlace").text();
                        detailitem["SIPSlabLess"] = $(column[6]).find(".editInPlace").text();
                        detailitem["SIPSlabGreater"] = $(column[7]).find(".editInPlace").text();
                        detailitem["SIPSlab"] = $(clm).find("input[name='hid_sip']").val();
                        detailitem["PeriodStart"] = 0;
                        detailitem["PeriodEnd"] = 0;
                        detailitem["PeriodType"] = 0;
                        RackRate.TempPaymentDetails.push(detailitem);


                        detailitem = {}
                        detailitem["schemeid"] = SchemeId;
                        detailitem["schemecategoryid"] = ScehemCategoryId;
                        detailitem["scheme_category"] = $(clm).find("input[name='hid_scheme_category']").val();
                        detailitem["scheme"] = $(clm).find("input[name='hid_scheme']").val();
                        detailitem["BrokerageTypeId"] = 2;
                        if (Utility.enableSIP == true) {
                            detailitem["Base"] = $(column[8]).find(".editInPlace").text();
                        }
                        else {
                            detailitem["Base"] = $(column[6]).find(".editInPlace").text();
                        }
                        detailitem["Additional"] = 0;
                        detailitem["Total"] = 0;
                        detailitem["LumpSumGreater"] = 0;
                        detailitem["SIPSlabLess"] = 0;
                        detailitem["SIPSlabGreater"] = 0;
                        detailitem["PeriodStart"] = 0;
                        detailitem["PeriodEnd"] = 0;
                        detailitem["PeriodType"] = 0;
                        RackRate.TempPaymentDetails.push(detailitem);

                        var monthperiods = ""; var yearperiods = "";
                        var yearcount = 0;
                        var endcnt = 14;
                        var startcnt = 9;
                        var currentcnt = 9;
                        if (Utility.enableSIP == false) {
                            var endcnt = 10;
                            var startcnt = 7;
                            var currentcnt = 7;
                        }
                        var splitscheme = $(clm).find("input[name='hid_mothyearvalue']").val().split('/')[2];
                        var monthsavailable = splitscheme.split('~')[0];
                        if (monthsavailable != "") {
                            for (var g = 0; g < $(clm).find("input[name='hid_mothyearvalue']").val().split('~')[0].split(',').length; g++) {

                                detailitem = {}
                                detailitem["schemeid"] = SchemeId;
                                detailitem["schemecategoryid"] = ScehemCategoryId;
                                detailitem["scheme_category"] = $(clm).find("input[name='hid_scheme_category']").val();
                                detailitem["scheme"] = $(clm).find("input[name='hid_scheme']").val();
                                detailitem["BrokerageTypeId"] = 3;

                                for (var mcnt = currentcnt ; mcnt < (endcnt) ; mcnt++) {
                                    if (mcnt == currentcnt) {
                                        detailitem["Base"] = $(column[mcnt]).find(".editInPlace").text();
                                    }
                                    if (mcnt == currentcnt + 1) {
                                        detailitem["Total"] = $(column[mcnt]).find(".total").text();

                                        detailitem["monthperiods"] = $(column[mcnt]).find("input[name$='hid_monthperiods']").val();
                                        detailitem["Additional"] = $(column[mcnt]).find("input[name$='hid_lumpsum_additional']").val();
                                        detailitem["PeriodStart"] = $(column[mcnt]).find("input[name$='hid_monthperiods']").val().split('-')[0];
                                        detailitem["PeriodEnd"] = $(column[mcnt]).find("input[name$='hid_monthperiods']").val().split('-')[1];
                                    }
                                    if (mcnt == currentcnt + 2) {
                                        detailitem["LumpSumGreater"] = $(column[mcnt]).find(".editInPlace").text();
                                    }
                                    if (Utility.enableSIP == true) {
                                        if (mcnt == currentcnt + 3) {
                                            detailitem["SIPSlabLess"] = $(column[mcnt]).find(".editInPlace").text();
                                        }

                                        if (mcnt == currentcnt + 4) {
                                            detailitem["SIPSlabGreater"] = $(column[mcnt]).find(".editInPlace").text();
                                        }
                                    }
                                    else {
                                        detailitem["SIPSlabLess"] = "0";
                                        detailitem["SIPSlabGreater"] = "0";
                                    }

                                    detailitem["PeriodType"] = 1;

                                }
                                RackRate.TempPaymentDetails.push(detailitem);
                                RackRate.TempmonthList.push(detailitem);
                                if (Utility.enableSIP == true) {
                                    endcnt = endcnt + 5;
                                    currentcnt = currentcnt + 5;
                                }
                                else {
                                    endcnt = endcnt + 3;
                                    currentcnt = currentcnt + 3;
                                }
                            }
                        }
                        var yearcnt = $(clm).find("input[name='hid_mothyearvalue']").val().split('~')[1];

                        for (var g = 0; g < yearcnt; g++) {
                            //if (monthsavailable == "") {
                            var year = 0;
                            detailitem = {}
                            detailitem["schemeid"] = SchemeId;
                            detailitem["schemecategoryid"] = ScehemCategoryId;
                            detailitem["scheme_category"] = $(clm).find("input[name='hid_scheme_category']").val();
                            detailitem["scheme"] = $(clm).find("input[name='hid_scheme']").val();
                            detailitem["BrokerageTypeId"] = 3;

                            for (var mcnt = currentcnt ; mcnt < (endcnt) ; mcnt++) {
                                if (mcnt == currentcnt) {
                                    detailitem["Base"] = $(column[mcnt]).find(".editInPlace").text();
                                }
                                if (mcnt == currentcnt + 1) {
                                    detailitem["Total"] = $(column[mcnt]).find(".total").text();
                                    year = $(column[mcnt]).find("input[name$='hid_year']").val();
                                    detailitem["monthperiods"] = $(column[mcnt]).find("input[name$='hid_year']").val();
                                    detailitem["Additional"] = $(column[mcnt]).find("input[name$='hid_lumpsum_additional']").val();
                                    detailitem["PeriodStart"] = 1;
                                    detailitem["PeriodEnd"] = 0;
                                }
                                if (year == 1) {
                                    if (mcnt == currentcnt + 2) {
                                        detailitem["LumpSumGreater"] = $(column[mcnt]).find(".editInPlace").text();
                                    }
                                    if (Utility.enableSIP == true) {
                                        if (mcnt == currentcnt + 3) {
                                            detailitem["SIPSlabLess"] = $(column[mcnt]).find(".editInPlace").text();
                                        }

                                        else if (mcnt == currentcnt + 4) {
                                            detailitem["SIPSlabGreater"] = $(column[mcnt]).find(".editInPlace").text();
                                            currentcnt = currentcnt + 4;
                                        }
                                    }
                                    else {
                                        detailitem["SIPSlabLess"] = "0";
                                        detailitem["SIPSlabGreater"] = "0";
                                    }

                                }
                                else {
                                    detailitem["Total"] = 0;
                                    if (monthsavailable == "") {
                                        detailitem["monthperiods"] = g + 1;
                                        detailitem["PeriodStart"] = g + 1;
                                    }
                                    else {
                                        detailitem["monthperiods"] = g + 2;
                                        detailitem["PeriodStart"] = g + 2;
                                    }

                                    detailitem["Additional"] = 0;

                                    detailitem["PeriodEnd"] = 0;
                                    detailitem["LumpSumGreater"] = 0;
                                    detailitem["SIPSlabLess"] = 0;
                                    detailitem["SIPSlabGreater"] = 0;
                                }
                                detailitem["PeriodType"] = 2;

                            }
                            RackRate.TempPaymentDetails.push(detailitem);
                            RackRate.TempyearList.push(detailitem);

                            endcnt = endcnt + 1;
                            if (year == 1) {
                                currentcnt = currentcnt + 3;
                            } else {
                                currentcnt = currentcnt + 1;
                            }
                        }
                        //}

                        RackRate.TempPaymentList.push(listitem);
                    }
                }
            }
        }
        var IsSchemeDetailUpdated = true;
        $.each(RackRate.TempPaymentDetails, function (index, value) {
            var error = "";
            //if (value.Base.trim() == "0" || value.Base.trim() == '') {

            //    if (value.BrokerageTypeId == "1") {
            //        if (error.indexOf("Enter Valid Upfront Base") > -1) {
            //        }
            //        else {
            //            error += "Enter Valid Upfront Base <br/>";
            //        }
            //    } else if (value.BrokerageTypeId == "3") {
            //        if (error.indexOf("Enter Valid Trail Base") > -1) {
            //        }
            //        else {
            //            error += "Enter Valid Trail Base <br/>";
            //        }
            //    }
            //}
            if (error == "") {
                return true;
            }
            else {
                IsSchemeDetailUpdated = false;
                Utility.writeNotification("warning", error, "", true);
                return false
            }
        });
        if (IsSchemeDetailUpdated == true)
            Utility.writeNotification("success", "Scheme/s Details Updated Successfully.", "", true);

    },

    Showschemedetails: function () {
        RackRate.TableCount = 0;

        if (RackRate.TempPaymentList.length > 0) {

            var distinctmonth = [];
            var currentmonths = [];
            $.each(RackRate.TempPaymentList, function (index, value) {
                if ($.inArray(value.mothyearvalue, distinctmonth) === -1) {
                    distinctmonth.push(value.mothyearvalue);
                }
            });
            $('#div_rack_rate_detail').empty();

            RackRate.TableCount = distinctmonth.length;
            for (var k = 0; k < distinctmonth.length; k++) {
                var yearcount = ""; var monthperyear = ""; var SchemeCategory = "";

                if (distinctmonth[k].split('~').length >= 1) {
                    var monthsplit = distinctmonth[k].split('/')[2];
                    SchemeCategory = distinctmonth[k].split('/')[1];
                    yearcount = monthsplit.split('~')[1];
                    currentmonths = monthsplit.split('~')[0];
                }

                var onwardstext = "";
                var headercol = ""; var headersubcol1 = ""; var headersubcol2 = ""; var headersubcol3 = ""; var colspan = "0"; var z = 0;
                if (currentmonths.length > 0) {
                    if (Utility.enableSIP == true) {
                        colspan = currentmonths.split(',').length * 5;
                    } else {
                        colspan = currentmonths.split(',').length * 3;
                    }
                    for (var g = 0; g < currentmonths.split(',').length; g++) {
                        if (currentmonths.split(',')[g] != "") {
                            z = 1;
                            if (Utility.enableSIP == true) {
                                headersubcol1 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='3'> Lump Sum </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' rowspan='2' colspan='2'> SIP/STP </th>";
                                headersubcol2 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='2'> ≤ Slab </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' > > Slab </th>";
                                headersubcol3 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Base </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Total </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'>  </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> &le; " + RackRate.TempPaymentList[0].SIPSlab + " </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> > " + RackRate.TempPaymentList[0].SIPSlab + " </th>";
                            }
                            else {
                                headersubcol1 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='3'> Lump Sum </th>";
                                headersubcol2 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='2'> ≤ Slab </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' > > Slab </th>";
                                headersubcol3 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Base </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Total </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'>  </th>";
                            }
                        }
                    }
                    if (z == 1) {
                        if (yearcount == 0) {
                            for (var onw = 0; onw < RackRate.TempPaymentList.length; onw++) {
                                if (distinctmonth[k] == RackRate.TempPaymentList[onw]["mothyearvalue"] && RackRate.TempPaymentList[onw]["Onwards"].toLowerCase() == "true") {
                                    onwardstext = " & Onwards";
                                }
                            }
                        }
                        headercol += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='" + colspan + "'> Year 1 " + onwardstext + "</th>";
                    }
                }
                if (yearcount > 0) {
                    if (RackRate.TempyearList.length > 0 && z > 0) {
                        colspan = colspan + yearcount;
                        for (var i = 0; i < yearcount ; i++) {
                            if (i == (yearcount - 1)) {
                                for (var onw = 0; onw < RackRate.TempPaymentList.length; onw++) {
                                    if (distinctmonth[k] == RackRate.TempPaymentList[onw]["mothyearvalue"] && RackRate.TempPaymentList[onw]["Onwards"].toLowerCase() == "true") {
                                        onwardstext = " & Onwards";
                                    }
                                }
                            }
                            var j = i + 2;
                            headercol += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'   rowspan='5'> Year " + j + " " + onwardstext + "</th>";
                            headersubcol1 += "";
                            headersubcol2 += "";
                            headersubcol3 += "";
                        }
                    }
                    else if (RackRate.TempyearList.length > 0 && z == 0) {
                        colspan = yearcount + 5;
                        for (var i = 0; i < yearcount ; i++) {
                            if (i == (yearcount - 1)) {
                                for (var onw = 0; onw < RackRate.TempPaymentList.length; onw++) {
                                    if (distinctmonth[k] == RackRate.TempPaymentList[onw]["mothyearvalue"] && RackRate.TempPaymentList[onw]["Onwards"].toLowerCase() == "true") {
                                        onwardstext = " & Onwards";
                                    }
                                }
                            }
                            if (i == 0) {
                                if (Utility.enableSIP == true) {
                                    headercol += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'   colspan='5'> Year 1 " + onwardstext + "</th>";
                                    headersubcol1 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='3'> Lump Sum </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' rowspan='2' colspan='2'> SIP/STP </th>";
                                    headersubcol2 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='2'> ≤ Slab </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> > Slab </th>";
                                    headersubcol3 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Base </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Total </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' >  </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> &le; " + RackRate.TempPaymentList[0].SIPSlab + " </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> > " + RackRate.TempPaymentList[0].SIPSlab + " </th>";
                                }
                                else {
                                    headercol += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'   colspan='3'> Year 1 " + onwardstext + "</th>";
                                    headersubcol1 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='3'> Lump Sum </th>";
                                    headersubcol2 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='2'> ≤ Slab </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> > Slab </th>";
                                    headersubcol3 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Base </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Total </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' >  </th>";
                                }
                            }
                            else {
                                var j = i + 1;
                                headercol += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'  rowspan='5'> Year " + j + " " + onwardstext + "</th>";
                                headersubcol1 += "";
                                headersubcol2 += "";
                                headersubcol3 += "";
                            }
                        }
                    }
                }
                monthperyear += "<tr class='rrd-tbl-hdr'>";
                for (var g = 0; g < currentmonths.split(',').length; g++) {
                    if (z > 0) {
                        if (Utility.enableSIP == true) {
                            monthperyear += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'  colspan='5'> " + currentmonths.split(',')[g] + " Months </th>";
                        }
                        else {
                            monthperyear += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'  colspan='3'> " + currentmonths.split(',')[g] + " Months </th>";
                        }
                    }
                    else {
                        monthperyear += "";
                    }
                }
                monthperyear += "</tr>";
                var tbldata = " <div style='overflow: auto; margin-bottom: 50px;'><table class='table table-bordered table-bordered1 edit-table' role='grid' width='100%' border='0' align='center' cellpadding='0' cellspacing='0' id='tbl_review_scheme" + k + "'><thead>";

                tbldata += "<tr  style='text-align: center; color: rgb(255, 255, 255); background-color: rgb(0, 101, 161);''><th style='text-align: center;color: rgb(255, 255, 255); padding-top: 100px;' rowspan='6'>" + SchemeCategory + " Scheme</th><th style='text-align: center;color: rgb(255, 255, 255); padding-top: 100px;' rowspan='6'>Clawback</th><th style='text-align: center;color: rgb(255, 255, 255); padding-top: 100px;' rowspan='6'>Slab</th>";
                if (Utility.enableSIP == true) {
                    tbldata += "<th style='text-align: center; color: rgb(255, 255, 255); background-color: rgb(49, 130, 169);' colspan='6'>UpFront </th> <th style='text-align: center; color: rgb(255, 255, 255); background-color: rgb(0, 143, 207);' colspan='" + colspan + "'>Trail</th></tr>";

                    tbldata += "<tr   class='rrd-tbl-hdr'><th  style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='6'  rowspan='2'> </th>" + headercol + " </tr>";
                }
                else {
                    tbldata += "<th style='text-align: center; color: rgb(255, 255, 255); background-color: rgb(49, 130, 169);' colspan='4'>UpFront </th> <th style='text-align: center; color: rgb(255, 255, 255); background-color: rgb(0, 143, 207);' colspan='" + colspan + "'>Trail</th></tr>";

                    tbldata += "<tr   class='rrd-tbl-hdr'><th  style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='4'  rowspan='2'> </th>" + headercol + " </tr>";
                }


                tbldata += monthperyear;
                if (Utility.enableSIP == true) {
                    tbldata += "<tr   class='rrd-tbl-hdr'><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='3'> Lump Sum </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' rowspan='2' colspan='2'> SIP/STP </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' rowspan='3'> B15 All </th>" + headersubcol1 + "</tr>";
                    tbldata += "<tr   class='rrd-tbl-hdr'><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='2'> ≤ Slab </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> > Slab </th>" + headersubcol2 + "</tr>";
                    tbldata += "<tr   class='rrd-tbl-hdr'><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Base </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Total </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'>  </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> &le; " + RackRate.TempPaymentList[0].SIPSlab + " </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> > " + RackRate.TempPaymentList[0].SIPSlab + " </th>" + headersubcol3 + "</tr></thead><tbody>";
                }
                else {
                    tbldata += "<tr   class='rrd-tbl-hdr'><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='3'> Lump Sum </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' rowspan='3'> B15 All </th>" + headersubcol1 + "</tr>";
                    tbldata += "<tr   class='rrd-tbl-hdr'><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='2'> ≤ Slab </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> > Slab </th>" + headersubcol2 + "</tr>";
                    tbldata += "<tr   class='rrd-tbl-hdr'><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Base </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Total </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'>  </th>" + headersubcol3 + "</tr></thead><tbody>";
                }

                for (var i = 0; i < RackRate.TempPaymentList.length; i++) {
                    tbldata += '<tr class="detail_row"  ondblclick="RackRate.RowDoubleClick(this);">';
                    if (distinctmonth[k] == RackRate.TempPaymentList[i]["mothyearvalue"]) {
                        tbldata += "<td style='text-align: left; ' title='Please Select the Scheme and click on Edit'><input type='radio' name='equity' /><span class='rrd-tbl-label-bld' style='font-size:14px;text-align:  left'>" + RackRate.TempPaymentList[i]["scheme"].replace("DSP BlackRock", "").replace("Fund", "") + "</span>";

                        tbldata += "<input type='hidden' name='hid_payment_list_id'  value='" + RackRate.TempPaymentList[i]["PaymentListId"] + "' />";
                        tbldata += "<input type='hidden' name='hid_scheme_id'  value='" + RackRate.TempPaymentList[i]["schemeid"] + "' />";
                        tbldata += "<input type='hidden' name='hid_scheme_category_id'  value='" + RackRate.TempPaymentList[i]["schemecategoryid"] + "' />";
                        tbldata += "<input type='hidden' name='hid_scheme'  value='" + RackRate.TempPaymentList[i]["scheme"] + "' />";
                        tbldata += "<input type='hidden' name='hid_scheme_category'  value='" + RackRate.TempPaymentList[i]["scheme_category"] + "' />";
                        tbldata += "<input type='hidden' name='hid_onwards'  value='" + RackRate.TempPaymentList[i]["Onwards"] + "' />";
                        tbldata += "<input type='hidden' name='hid_claw_back'  value='" + RackRate.TempPaymentList[i]["claw_back"] + "' />";
                        tbldata += "<input type='hidden' name='hid_slab_amount'  value='" + RackRate.TempPaymentList[i]["slab_amount"] + "' />";
                        tbldata += "<input type='hidden' name='hid_slab_type'  value='" + RackRate.TempPaymentList[i]["SlabType"] + "' />";
                        tbldata += "<input type='hidden' name='hid_sip'  value='" + RackRate.TempPaymentList[i]["SIPSlab"] + "' />";
                        tbldata += "<input type='hidden' name='hid_mothyearvalue'  value='" + RackRate.TempPaymentList[i]["mothyearvalue"] + "' />";
                        tbldata += "<input type='hidden' name='hid_payment_Type'  value='" + RackRate.TempPaymentList[i]["PaymentType"] + "' /> </td>";

                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl' title='Please Select the Scheme and click on Edit'><span class='rrd-tbl-label-bld' style='font-size:14px;'>" + RackRate.TempPaymentList[i]["claw_back"] + "</span> </td>";
                        if (RackRate.TempPaymentList[i]["SlabType"] == "Slab Amount")
                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl' title='Please Select the Scheme and click on Edit'><span class='rrd-tbl-label-bld ' style='font-size:14px;'>" + RackRate.TempPaymentList[i]["slab_amount"] + "</span> </td>";
                        else
                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl' title='Please Select the Scheme and click on Edit'><span class='rrd-tbl-label-bld ' style='font-size:14px;'>All Amt</span> </td>";

                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'> " + RackRate.TempPaymentList[i]["Base"] + "</span> </td>";
                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld total' style='font-size:14px;'  name='total'>" + RackRate.TempPaymentList[i]["Total"] +
                            "</span><input type='hidden' name='hid_lumpsum_additional'  value='" + RackRate.TempPaymentList[i]["Additional"] + "' /> </td>";

                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + RackRate.TempPaymentList[i]["LumpSumGreater"] + "</span> </td>";
                        if (Utility.enableSIP == true) {
                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + RackRate.TempPaymentList[i]["SIPSlabLess"] + "</span> </td>";
                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + RackRate.TempPaymentList[i]["SIPSlabGreater"] + "</span> </td>";
                        }

                        for (var b15 = 0 ; b15 < RackRate.TempPaymentDetails.length; b15++) {
                            if (RackRate.TempPaymentDetails[b15].BrokerageTypeId == 2 && RackRate.TempPaymentDetails[b15].schemeid == RackRate.TempPaymentList[i]["schemeid"])
                                tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + RackRate.TempPaymentDetails[b15]["Base"] + "</span> </td>";
                        }

                        if (RackRate.TempmonthList.length > 0) {
                            var monthcnt = 0;
                            for (var g = 0; g < currentmonths.split(',').length; g++) {
                                for (var h = 0; h < RackRate.TempmonthList.length; h++) {
                                    if (currentmonths.split(',')[g] == RackRate.TempmonthList[h]["monthperiods"] && RackRate.TempPaymentList[i]["schemeid"] == RackRate.TempmonthList[h]["schemeid"]) {
                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + RackRate.TempmonthList[h]["Base"] + " </span></td>";

                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld total' style='font-size:14px;'  name='total'>" + RackRate.TempmonthList[h]["Total"] + " </span>";
                                        tbldata += "<input type='hidden' name='hid_lumpsum_additional'  value='" + RackRate.TempmonthList[h]["Additional"] + "' />";
                                        tbldata += "<input type='hidden' name='hid_is_month'  value='1' />";
                                        tbldata += "<input type='hidden' name='hid_monthperiods'  value='" + RackRate.TempmonthList[h]["monthperiods"] + "' />";
                                        tbldata += "</td>";

                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + RackRate.TempmonthList[h]["LumpSumGreater"] + " </span></td>";
                                        if (Utility.enableSIP == true) {
                                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + RackRate.TempmonthList[h]["SIPSlabLess"] + " </span></td>";
                                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + RackRate.TempmonthList[h]["SIPSlabGreater"] + " </span></td>";
                                        }

                                        monthcnt += 1;
                                    }
                                }
                            }
                            tbldata += "<input type='hidden' id='hidden_month_det_" + i + "'  value='" + monthcnt + "' />";
                        }
                        var r = 0;
                        if (yearcount > 0) {
                            if (RackRate.TempyearList.length > 0) {
                                var yearcnt = 0;
                                for (var j = 0; j < (RackRate.TempyearList.length) ; j++) {
                                    if (RackRate.TempPaymentList[i]["schemeid"] == RackRate.TempyearList[j]["schemeid"] && RackRate.TempyearList[j]["PeriodStart"] == "1") {
                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + RackRate.TempyearList[j]["Base"] + " </span></td>";

                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld total' name='total' style='font-size:14px;'>" + RackRate.TempyearList[j]["Total"] + " </span>";
                                        tbldata += "<input type='hidden' name='hid_lumpsum_additional'  value='" + RackRate.TempyearList[j]["Additional"] + "' />";
                                        tbldata += "<input type='hidden' name='hid_is_month'  value='0' />";
                                        tbldata += "<input type='hidden' name='hid_year'  value='" + RackRate.TempyearList[j]["PeriodStart"] + "' /> </td>";
                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + RackRate.TempyearList[j]["LumpSumGreater"] + " </span></td>";
                                        if (Utility.enableSIP == true) {
                                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + RackRate.TempyearList[j]["SIPSlabLess"] + " </span></td>";
                                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + RackRate.TempyearList[j]["SIPSlabGreater"] + " </span></td>";
                                        }

                                        r = 1;
                                    }
                                    else if (RackRate.TempPaymentList[i]["schemeid"] == RackRate.TempyearList[j]["schemeid"]) {
                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + RackRate.TempyearList[j]["Base"] + "</span> ";
                                        tbldata += "<input type='hidden' class='hid_is_month'  value='0' />";
                                        tbldata += "<input type='hidden' class='hid_year'  value='" + RackRate.TempyearList[j]["PeriodStart"] + "' /> </td>";
                                        r = 1;
                                    }
                                    yearcnt += 1;
                                }
                                if (r == 0) {
                                    tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld'> - </span> </td>";
                                }
                                tbldata += "<input type='hidden' id='hidden_year_det_" + i + "'  value='" + yearcnt + "' />";
                            }
                        }
                        tbldata += ' </tr>';
                    }
                }
                tbldata += "</tbody></table></div>";
                $('#div_rack_rate_detail').append(tbldata);
            }
        }
        else {
            $('#div_rack_rate_detail').empty();
        }


    },

    PeriodTypeChange: function (elem) {
        var inpText = $(elem).val();

        var parentRow = $(elem).closest('.trail_row');
        if (inpText == "Months") {
            $(parentRow).find("input[name$='trail_period_to']").show();
            if (Utility.enableSIP == false) {
                $(parentRow).find("input[name$='trail_sip_less']").val("0");
                $(parentRow).find("input[name$='trail_sip_greater']").val("0");
                $(parentRow).find("input[name$='trail_sip_less']").attr("disabled", "disabled");
                $(parentRow).find("input[name$='trail_sip_greater']").attr("disabled", "disabled");
            } else {
                $(parentRow).find("input[name$='trail_sip_less']").removeAttr("disabled");
                $(parentRow).find("input[name$='trail_sip_greater']").removeAttr("disabled");
                $(parentRow).find("input[name$='trail_sip_less']").val($(parentRow).find("input[name$='trail_lumpsum_base']").val())
                $(parentRow).find("input[name$='trail_sip_greater']").val($(parentRow).find("input[name$='trail_lumpsum_total']").val())
            }

            if ($('#dd_slab_type').val() == "Slab Amount") {
                $(parentRow).find("input[name$='trail_lumpsum_greater']").removeAttr("disabled");
            }
        } else {
            $(parentRow).find("input[name$='trail_period_to']").hide();

            if ($(parentRow).find("input[name$='trail_period_from']").val() > 1) {
                $(parentRow).find("input[name$='trail_sip_less']").val("0");
                $(parentRow).find("input[name$='trail_sip_greater']").val("0");
                $(parentRow).find("input[name$='trail_sip_less']").attr("disabled", "disabled");
                $(parentRow).find("input[name$='trail_sip_greater']").attr("disabled", "disabled");
                $(parentRow).find("input[name$='trail_lumpsum_greater']").attr("disabled", "disabled");
                $(parentRow).find("input[name$='trail_lumpsum_greater']").val(0);
            }
        }

    },

    GetTrailData: function () {
        RackRate.TempTrail = [];
        var monthperiods = ""; var yearperiods = "";
        var yearcount = 0;

        var row = $("#trailTable tr.trail_row");

        for (var rowIndex = 0; rowIndex < row.length; rowIndex++) {
            var rowData = $($("#trailTable tr.trail_row")[rowIndex]);
            var column = $(rowData).find('td');

            var trail_period_type = column[0];
            var trail_period_from = column[1];
            var trail_period_to = column[2];
            var trail_lumpsum_base = column[3];
            var trail_lumpsum_additional = column[4];
            var trail_lumpsum_total = column[5];
            var trail_lumpsum_greater = column[6];
            var trail_sip_less = column[7];
            var trail_sip_greater = column[8];

            var period_type = $(trail_period_type).find("select[name$='trail_period_type']").val()
            if (period_type == "Months") {
                var period = $(trail_period_from).find("input[name$='trail_period_from']").val() + "-" + $(trail_period_to).find("input[name$='trail_period_to']").val();
                monthperiods = monthperiods == "" ? period : monthperiods + "," + period;

                detailitem = {}
                detailitem["BrokerageTypeId"] = 3;
                detailitem["Base"] = $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val();
                detailitem["Additional"] = $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val();
                detailitem["Total"] = $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val() == "" ? 0 : $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val();
                detailitem["LumpSumGreater"] = $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val() == "" ? 0 : $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val();
                detailitem["SIPSlabLess"] = $(trail_sip_less).find("input[name$='trail_sip_less']").val() == "" ? 0 : $(trail_sip_less).find("input[name$='trail_sip_less']").val();
                detailitem["SIPSlabGreater"] = $(trail_sip_greater).find("input[name$='trail_sip_greater']").val() == "" ? 0 : $(trail_sip_greater).find("input[name$='trail_sip_greater']").val();
                detailitem["monthperiods"] = period;
                detailitem["PeriodStart"] = $(trail_period_from).find("input[name$='trail_period_from']").val();
                detailitem["PeriodEnd"] = $(trail_period_to).find("input[name$='trail_period_to']").val();
                detailitem["PeriodType"] = 1;
                detailitem["Period"] = "Months";
                RackRate.TempTrail.push(detailitem);
            }
            else {
                var period = $(trail_period_from).find("input[name$='trail_period_from']").val();
                if (period == "1") {
                    yearcount += 1;
                    detailitem = {}
                    detailitem["BrokerageTypeId"] = 3;
                    detailitem["Base"] = $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val();
                    detailitem["Additional"] = $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val();
                    detailitem["Total"] = $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val() == "" ? 0 : $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val();
                    detailitem["LumpSumGreater"] = $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val() == "" ? 0 : $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val();
                    detailitem["SIPSlabLess"] = $(trail_sip_less).find("input[name$='trail_sip_less']").val() == "" ? 0 : $(trail_sip_less).find("input[name$='trail_sip_less']").val();
                    detailitem["SIPSlabGreater"] = $(trail_sip_greater).find("input[name$='trail_sip_greater']").val() == "" ? 0 : $(trail_sip_greater).find("input[name$='trail_sip_greater']").val();
                    detailitem["monthperiods"] = period;
                    detailitem["PeriodStart"] = $(trail_period_from).find("input[name$='trail_period_from']").val();
                    detailitem["PeriodEnd"] = 0;
                    detailitem["PeriodType"] = 2;
                    detailitem["Period"] = "Year";
                    RackRate.TempTrail.push(detailitem);
                } else {
                    yearcount += 1;
                    detailitem = {}
                    detailitem["BrokerageTypeId"] = 3;
                    detailitem["Base"] = $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val();
                    detailitem["Additional"] = 0;
                    detailitem["Total"] = 0;
                    detailitem["LumpSumGreater"] = 0;
                    detailitem["SIPSlabLess"] = 0;
                    detailitem["SIPSlabGreater"] = 0;
                    detailitem["monthperiods"] = period;
                    detailitem["PeriodStart"] = $(trail_period_from).find("input[name$='trail_period_from']").val();
                    detailitem["PeriodEnd"] = 0;
                    detailitem["PeriodType"] = 2;
                    detailitem["Period"] = "Year";
                    RackRate.TempTrail.push(detailitem);
                }
            }
        }
    },

    isSchemesectionvalid: function () {
        var error = "";
        var selectedscheme = $('#dd_scheme option:selected');
        var selectedschemeCategory = $('#dd_scheme_category option:selected');

        var selectedschemeID = [];
        $(selectedscheme).each(function () {
            selectedschemeID.push([$(this).val()]);
        });

        var selectedschemecategory = [];
        $(selectedschemeCategory).each(function () {
            selectedschemecategory.push([$(this).val()]);
        });

        var scheme = selectedschemeID.toString();
        var schemecategory = selectedschemecategory.toString();

        if (schemecategory == "") {
            if (error.indexOf("Select Scheme Category") > -1) {
            }
            else {
                error += "Select Scheme Category. <br/>";
            }
        }
        else {
            var schemeSelected = [];
            for (var cnt = 0; cnt < RackRate.TempPaymentList.length; cnt++) {
                schemeSelected.push(RackRate.TempPaymentList[cnt].schemeid.toString());
            }
            if (RackRate.IsCloseEnded == 1) {
                if (schemeSelected.length == 1 || selectedschemeID.length > 1) {
                    error += "For Close Ended Scheme Rates can be defined only for one scheme at a time. <br/>";
                }
            }
            if (RackRate.IsEditing == 0) {
                var Addedschemes = [];
                if (schemecategory != "") {
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeWithSchemeCategory', JSON.stringify({ Scheme: scheme, SchemeCategory: schemecategory }), "json", false, false, function (result) {
                        var data = result.GetSchemeWithSchemeCategoryResult;
                        Addedschemes = data;
                    });
                }
                else {
                    if (error.indexOf("Select Scheme Category") > -1) {
                    } else { error += "Select Scheme Category. <br/>"; }
                }
                var schemeID = [];

                var availableSchemes = [];


                $(RackRate.TempPaymentList).each(function (listobj, listvalue) {
                    var detail = {};
                    detail.SchemeId = listvalue.schemeid;
                    detail.SchemeName = listvalue.scheme;
                    detail.SchemeCategoryId = listvalue.schemecategoryid;
                    detail.SchemeCategoryName = listvalue.scheme_category;

                    availableSchemes.push(detail);
                });

                $(availableSchemes).each(function (obj, scheme) {
                    $(Addedschemes).each(function (obj, addedscheme) {
                        if (scheme.SchemeId == addedscheme.SchemeId) {
                            //if (error.indexOf("Scheme already added") > -1) {
                            //    return false;
                            //}
                            //else {
                            error += "Scheme " + scheme.SchemeName.replace("DSP BlackRock", "") + " already added. <br/>";
                            return false;
                            //}
                        }
                        else if (scheme.SchemeName == "All Schemes") {
                            $(Addedschemes).each(function (obj, newscheme) {
                                if (scheme.SchemeCategoryId == newscheme.SchemeCategoryId) {
                                    if (error.indexOf("Scheme already added") > -1) {
                                        return false;
                                    }
                                    else {
                                        error += "Scheme already added. <br/>";
                                        return false;
                                    }
                                }
                            });
                        }
                        else {

                            if (addedscheme.SchemeName == "All Schemes") {
                                $(availableSchemes).each(function (obj, availscheme) {
                                    if (addedscheme.SchemeCategoryId == availscheme.SchemeCategoryId) {
                                        if (error.indexOf("Scheme already added") > -1) {
                                            return false;
                                        }
                                        else {
                                            error += "Scheme already added. <br/>";
                                            return false;
                                        }
                                    }
                                });
                            }
                            else {
                                $(availableSchemes).each(function (obj, availscheme) {
                                    if (addedscheme.SchemeCategoryId == availscheme.SchemeCategoryId && availscheme.SchemeName == "All Schemes") {
                                        if (error.indexOf("Scheme already added") > -1) {
                                            return false;
                                        }
                                        else {
                                            error += "Scheme already added. <br/>";
                                            return false;
                                        }
                                    }
                                });
                            }
                        }

                    });
                });
            }
        }

        error = error + RackRate.ValidateMonths(1);
        if ($('#dd_slab_type').val() == "Slab Amount") {
            if (parseInt($('#txt_slab_amount').val()) == "0") {
                error = error + "Slab Amount Cannot be 0";
            }
            if ($('#txt_slab_amount').val() == "") {
                error = error + "Slab Amount Cannot be empty";
            }
        }

        if (error == "") {
            return true;
        }
        else {
            Utility.writeNotification("warning", error, "", true);
            return false
        }
    },

    ValidateMonths: function (OnSave) {
        var error = "";
        RackRate.GetTrailData();
        //if ($('#txt_lumpsum_less_base').val() == '' || $('#txt_lumpsum_less_base').val() == '0') {
        //    if (error.indexOf("Enter Valid Upfront Base") > -1) {
        //    }
        //    else {
        //        error += "Enter Valid Upfront Base <br/>";
        //    }
        //}
        if (RackRate.TempTrail.length > 0) {
            var gridData = RackRate.TempTrail;
            if (gridData.length == 0) {
                if (error.indexOf("Trail Brokerage is Required") > -1) {
                }
                else {
                    error = error + "Trail Brokerage is Required. <br/>";
                }
            }
            else {
                var monthavailable = "0";
                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].Period == "Months") {
                        var StartDatezeroadded = "";
                        for (var j = 0; j < gridData.length; j++) {

                            if (gridData[j].Period == "Months") {
                                if (gridData[j].PeriodStart.trim() == "0") {
                                    StartDatezeroadded = "1";
                                }
                            }
                        }
                        if (StartDatezeroadded == "") {
                            if (error.indexOf("Month needs to start from 0") > -1) {
                            }
                            else {
                                error = error + "Month needs to start from 0. <br/>";
                            }
                            i = gridData.length;
                        }
                    }
                }
                for (i = 0; i < gridData.length; i++) {
                    if (gridData[i].PeriodStart == "" && gridData[i].PeriodEnd == "") {
                        if (error.indexOf("Duration is Required") > -1) {
                        }
                        else {
                            error = error + "Duration is Required. <br/>"
                        }
                    }
                    else {

                        if (gridData[i].Period == "Months") {
                            monthavailable = "1";
                            if (parseInt(gridData[i].PeriodStart) > 12) {
                                if (error.indexOf("Start Month must be less than 12") > -1) {
                                }
                                else {
                                    error = error + "Start Month must be less than 12. <br/>"
                                }
                            }
                            if (parseInt(gridData[i].PeriodEnd) > 12) {
                                if (error.indexOf("End Month must be less than 12") > -1) {
                                }
                                else {
                                    error = error + "End Month must be less than 12. <br/>"
                                }
                            }
                            if (parseInt(gridData[i].PeriodStart) > parseInt(gridData[i].PeriodEnd)) {
                                if (error.indexOf("Start Month Must be less than End Month") > -1) {
                                }
                                else {
                                    error = error + "Start Month Must be less than End Month. <br/>"
                                }
                            }

                            if (i > 0) {
                                var currentduration = gridData[i - 1].PeriodEnd;

                                if (parseInt(currentduration) >= parseInt(gridData[i].PeriodStart)) {
                                    if (gridData[i - 1].Period == "Months") {
                                        if (error.indexOf("Period To is " + currentduration + ", So Period From can't Start with " + gridData[i].PeriodStart) > -1) {
                                        }
                                        else {
                                            error = error + "Period To is " + currentduration + ", So Period From can't Start with " + gridData[i].PeriodStart + ". <br/>"
                                        }
                                    }
                                }
                                else if (parseInt(currentduration) + 1 != parseInt(gridData[i].PeriodStart)) {
                                    if (parseInt(gridData[i].PeriodStart) > parseInt(currentduration) + 1) {
                                        if (parseInt(currentduration) + 1 == parseInt(gridData[i].PeriodStart - 1)) {
                                            if (error.indexOf("Rates for Month " + (parseInt(currentduration) + 1) + " Missing") > -1) {
                                            }
                                            else {
                                                error = error + "Rates for Month " + (parseInt(currentduration) + 1) + " Missing. <br/>"
                                            }
                                        }
                                        else {
                                            if (error.indexOf("Rates for Month " + (parseInt(currentduration) + 1) + " to " + parseInt(gridData[i].PeriodStart - 1) + " Missing") > -1) {
                                            }
                                            else {
                                                error = error + "Rates for Month " + (parseInt(currentduration) + 1) + " to " + parseInt(gridData[i].PeriodStart - 1) + " Missing. <br/>";
                                            }
                                        }
                                    }
                                    else {
                                        if (gridData[i - 1].Period == "Months") {
                                            if (error.indexOf("Period To is " + gridData[i].PeriodStart + ", So Period From can't Start with " + currentduration) > -1) {
                                            }
                                            else {
                                                error = error + "Period To is " + gridData[i].PeriodStart + ", So Period From can't Start with " + currentduration + ". <br/>"
                                            }
                                        }
                                    }
                                }

                                if (gridData[i - 1].Period == "Year") {
                                    if (error.indexOf("Months Cannot be added after Year") > -1) {
                                    }
                                    else {
                                        error = "Months Cannot be added after Year. <br/>"
                                    }
                                }
                            }
                            if (OnSave == 1) {
                                if (i == gridData.length - 1) {
                                    if (gridData[i].PeriodEnd < 12) {
                                        if (error.indexOf("End Month must be 12") > -1) {
                                        }
                                        else {
                                            error = error + "End Month must be 12. <br/>"
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            if (OnSave == 1) {
                                if (i > 0) {
                                    if (gridData[i - 1].Period == "Months") {
                                        if (gridData[i - 1].PeriodEnd < 12) {
                                            if (error.indexOf("End Month must be 12") > -1) {
                                            }
                                            else {
                                                error = error + "End Month must be 12. <br/>"
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (i > 0) {
                                    if (gridData[i - 1].Period == "Months") {
                                        if (gridData[i].Period == "Year") {
                                            if (gridData[i - 1].PeriodEnd < 12) {
                                                if (error.indexOf("End Month must be 12") > -1) {
                                                }
                                                else {
                                                    error = error + "End Month must be 12. <br/>"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (gridData[i].PeriodStart.length > 1 || gridData[i].PeriodStart.length == 0) {
                                if (i > 0) {
                                    if (gridData[i - 1].Period == "Months") {
                                        if (gridData[i - 1].PeriodEnd = 12) {
                                            if (error.indexOf("Year must start from 2") > -1) {
                                            }
                                            else {
                                                error = error + "Year must start from 2. <br/>"
                                            }
                                        } else {
                                            if (error.indexOf("End Month must be 12") > -1) {
                                            }
                                            else {
                                                error = error + "End Month must be 12. <br/>"
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (gridData[0].Period == "Year") {
                                        if (gridData[0].PeriodStart > 1) {
                                            if (error.indexOf("Year must starts with 1") > -1) {
                                            }
                                            else {
                                                error = error + "Year must starts with 1. <br/>"
                                            }
                                        }
                                    }
                                }

                            }
                            else {
                                var yeardata = [];
                                var gridRackData = RackRate.TempTrail;
                                for (var cnt = 0; cnt < gridRackData.length; cnt++) {
                                    if (gridData[cnt].Period == "Year") {
                                        yeardata.push(parseInt(gridData[cnt].PeriodStart));
                                        if (cnt != i) {
                                            if (gridData[cnt].PeriodStart == gridData[i].PeriodStart) {
                                                if (error.indexOf("Duplicate duration exists modify the duration") > -1) {
                                                }
                                                else {
                                                    error = error + "Duplicate duration exists modify the duration. <br/>"
                                                }
                                            }
                                        }
                                        if (monthavailable == "1" && gridData[cnt].PeriodStart == "0") {
                                            if (error.indexOf("Enter Year > 1") > -1) {
                                            }
                                            else {
                                                error = error + "Enter Year > 1. <br/>"
                                            }
                                        }
                                        else if (monthavailable == "0" && gridData[cnt].PeriodStart == "0") {
                                            if (error.indexOf("Enter Year > 0") > -1) {
                                            }
                                            else {
                                                error = error + "Enter Year > 0. <br/>"
                                            }
                                        }
                                        if (monthavailable == "1" && gridData[cnt].PeriodStart == "1") {
                                            if (error.indexOf("Enter Year > 1") > -1) {
                                            }
                                            else {
                                                error = error + "Enter Year > 1. <br/>"
                                            }
                                            cnt = gridRackData.length;
                                        }

                                    }
                                }
                                if (monthavailable == "1") {
                                    if (yeardata[0] > 2) {
                                        if (error.indexOf("Year must start from 2") > -1) {
                                        }
                                        else {
                                            error = error + "Year must start from 2. <br/>"
                                        }
                                    }
                                }
                                else {
                                    if (yeardata[0] > 1) {
                                        if (error.indexOf("Year must starts with 1") > -1) {
                                        }
                                        else {
                                            error = error + "Year must starts with 1. <br/>"
                                        }
                                    }
                                }
                                if (yeardata.length > 1) {
                                    for (var yeari = 1 ; yeari < yeardata.length; yeari++) {
                                        if (parseInt(yeardata[yeari]) - parseInt(yeardata[yeari - 1]) != 1) {

                                            if (parseInt(yeardata[yeari]) < parseInt(yeardata[yeari - 1])) {
                                                if (error.indexOf("Year must be greater than " + parseInt(yeardata[yeari - 1])) > -1) {
                                                }
                                                else {
                                                    error = error + "Year must be greater than " + parseInt(yeardata[yeari - 1]) + ". <br/>"
                                                }
                                            }
                                            else {
                                                if (parseInt(yeardata[yeari]) > parseInt(parseInt(yeardata[yeari - 1])) + 1) {
                                                    if (parseInt(parseInt(yeardata[yeari - 1])) + 1 == parseInt(parseInt(yeardata[yeari] - 1))) {
                                                        var connectionword = "";
                                                        switch (parseInt(yeardata[yeari - 1]) + 1) {
                                                            case 1:
                                                                connectionword = "st";
                                                                break;
                                                            case 2:
                                                                connectionword = "nd";
                                                                break;
                                                            case 3:
                                                                connectionword = "rd";
                                                                break;
                                                            default:
                                                                connectionword = "th";
                                                                break;

                                                        }
                                                        if (error.indexOf((parseInt(parseInt(yeardata[yeari - 1])) + 1) + connectionword + " year rate is missing") > -1) {
                                                        }
                                                        else {
                                                            error = error + (parseInt(parseInt(yeardata[yeari - 1])) + 1) + connectionword + " year rate is missing. <br/>"
                                                        }
                                                    }
                                                    else {
                                                        if (error.indexOf("Rates for Year " + (parseInt(parseInt(yeardata[yeari - 1])) + 1) + " to " + parseInt(yeardata[yeari] - 1) + " Missing") > -1) {
                                                        }
                                                        else {
                                                            error = error + "Rates for Year " + (parseInt(parseInt(yeardata[yeari - 1])) + 1) + " to " + parseInt(yeardata[yeari] - 1) + " Missing. <br/>";
                                                        }
                                                    }
                                                }
                                                //else {
                                                //    if (error.indexOf("Period To is " + parseInt(yeardata[yeari]) + ", So Period From can't Start with " + parseInt(yeardata[yeari - 1])) > -1) {
                                                //    }
                                                //    else {
                                                //        error = error + "Period To is " + parseInt(yeardata[yeari]) + ", So Period From can't Start with " + parseInt(yeardata[yeari - 1]) + "<br/>"
                                                //    }
                                                //}
                                            }

                                            yeari = yeardata.length;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //if (gridData[i].Base.toString().trim() == "" || gridData[i].Base.toString().trim() == "0") {
                    //    if (error.indexOf("Enter Valid Trail Base") > -1) {
                    //    }
                    //    else {
                    //        error = error + "Enter Valid Trail Base <br/>"
                    //    }
                    //    i = gridData.length;
                    //}
                }
            }
        }

        return error;
    },

    AddSchemeDetails: function () {
        if (RackRate.isSchemesectionvalid()) {
            var selectedscheme = $('#dd_scheme option:selected');
            var selectedschemeCategory = $('#dd_scheme_category option:selected');

            var selectedschemeID = [];
            $(selectedscheme).each(function () {
                selectedschemeID.push([$(this).val()]);
            });

            var selectedschemecategory = [];
            $(selectedschemeCategory).each(function () {
                selectedschemecategory.push([$(this).val()]);
            });

            var scheme = selectedschemeID.toString();
            var schemecategory = selectedschemecategory.toString();

            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeWithSchemeCategory', JSON.stringify({ Scheme: scheme, SchemeCategory: schemecategory }), "json", false, false, function (result) {
                var data = result.GetSchemeWithSchemeCategoryResult;

                //$(data).each(function (obj, value) {
                //    if (value.SchemeName == "All Schemes") {
                data = jQuery.grep(data, function (n, i) {
                    return (n.SchemeName !== "All Schemes");
                });
                //    }
                //});
                $(data).each(function (obj, value) {
                    $(RackRate.TempPaymentList).each(function (listobj, listvalue) {
                        if (value.SchemeId == listvalue.schemeid && value.SchemeCategoryId == listvalue.schemecategoryid) {
                            RackRate.TempPaymentList = jQuery.grep(RackRate.TempPaymentList, function (n, i) {
                                return (n !== listvalue);
                            });
                        }
                    });

                    $(RackRate.TempPaymentDetails).each(function (listobj, listvalue) {
                        if (value.SchemeId == listvalue.schemeid) {
                            RackRate.TempPaymentDetails = jQuery.grep(RackRate.TempPaymentDetails, function (n, i) {
                                return (n !== listvalue);
                            });
                        }
                    });

                    $(RackRate.TempmonthList).each(function (listobj, listvalue) {
                        if (value.SchemeId == listvalue.schemeid) {
                            RackRate.TempmonthList = jQuery.grep(RackRate.TempmonthList, function (n, i) {
                                return (n !== listvalue);
                            });
                            //RackRate.TempmonthList.splice(listobj, 1)
                        }
                    });

                    $(RackRate.TempyearList).each(function (listobj, listvalue) {
                        if (value.SchemeId == listvalue.schemeid) {
                            RackRate.TempyearList = jQuery.grep(RackRate.TempyearList, function (n, i) {
                                return (n !== listvalue);
                            });
                            //RackRate.TempyearList.splice(listobj, 1)
                        }
                    });
                });

                $(data).each(function (obj, value) {

                    listitem = {};

                    listitem["schemeid"] = value.SchemeId;
                    listitem["schemecategoryid"] = value.SchemeCategoryId;

                    listitem["scheme_category"] = value.SchemeCategoryName;
                    listitem["scheme"] = value.SchemeName;
                    listitem["PaymentType"] = 1;
                    listitem["SlabType"] = $('#dd_slab_type :selected').val();
                    listitem["slab_amount"] = $('#txt_slab_amount').val() == "" ? 0 : $('#txt_slab_amount').val() + " " + $('#dd_slab_amount_type :selected').text();
                    listitem["claw_back"] = ($('#txt_clawback').val() == "" ? "0" : $('#txt_clawback').val()) + " " + $('#dd_claw_type :selected').text();
                    listitem["Base"] = $('#txt_lumpsum_less_base').val() == "" ? 0 : $('#txt_lumpsum_less_base').val();
                    listitem["Additional"] = $('#txt_lumpsum_less_additional').val() == "" ? 0 : $('#txt_lumpsum_less_additional').val();
                    listitem["Total"] = $('#txt_lumpsum_less_total').val() == "" ? 0 : $('#txt_lumpsum_less_total').val();
                    listitem["LumpSumGreater"] = $('#txt_lumpsum_greater').val() == "" ? 0 : $('#txt_lumpsum_greater').val();
                    listitem["SIPSlabLess"] = $('#txt_sip_less').val() == "" ? 0 : $('#txt_sip_less').val();
                    listitem["SIPSlabGreater"] = $('#txt_sip_greater').val() == "" ? 0 : $('#txt_sip_greater').val();
                    listitem["SIPSlab"] = $('#txt_sip_slab').val() == "" ? 0 : $('#txt_sip_slab').val();

                    detailitem = {}
                    detailitem["schemeid"] = value.SchemeId;
                    detailitem["schemecategoryid"] = value.SchemeCategoryId;
                    detailitem["scheme_category"] = value.SchemeCategoryName;
                    detailitem["scheme"] = value.SchemeName;
                    detailitem["BrokerageTypeId"] = 1;
                    detailitem["Base"] = $('#txt_lumpsum_less_base').val() == "" ? 0 : $('#txt_lumpsum_less_base').val();
                    detailitem["Additional"] = $('#txt_lumpsum_less_additional').val() == "" ? 0 : $('#txt_lumpsum_less_additional').val();
                    detailitem["Total"] = $('#txt_lumpsum_less_total').val() == "" ? 0 : $('#txt_lumpsum_less_total').val();
                    detailitem["LumpSumGreater"] = $('#txt_lumpsum_greater').val() == "" ? 0 : $('#txt_lumpsum_greater').val();
                    detailitem["SIPSlabLess"] = $('#txt_sip_less').val() == "" ? 0 : $('#txt_sip_less').val();
                    detailitem["SIPSlabGreater"] = $('#txt_sip_greater').val() == "" ? 0 : $('#txt_sip_greater').val();
                    detailitem["PeriodStart"] = 0;
                    detailitem["PeriodEnd"] = 0;
                    detailitem["PeriodType"] = 0;
                    RackRate.TempPaymentDetails.push(detailitem);

                    detailitem = {}
                    detailitem["schemeid"] = value.SchemeId;
                    detailitem["schemecategoryid"] = value.SchemeCategoryId;
                    detailitem["scheme_category"] = value.SchemeCategoryName;
                    detailitem["scheme"] = value.SchemeName;
                    detailitem["BrokerageTypeId"] = 2;
                    detailitem["Base"] = $('#txt_additional_upfront').val() == "" ? 0 : $('#txt_additional_upfront').val();
                    detailitem["Additional"] = 0;
                    detailitem["Total"] = 0;
                    detailitem["LumpSumGreater"] = 0;
                    detailitem["SIPSlabLess"] = 0;
                    detailitem["SIPSlabGreater"] = 0;
                    detailitem["PeriodStart"] = 0;
                    detailitem["PeriodEnd"] = 0;
                    detailitem["PeriodType"] = 0;
                    RackRate.TempPaymentDetails.push(detailitem);

                    listitem["Onwards"] = $('#chk_onwards').is(":checked").toString();
                    listitem["addl_upfront_B15"] = $('#txt_additional_upfront').val() == "" ? 0 : $('#txt_additional_upfront').val();
                    var monthperiods = ""; var yearperiods = "";
                    var yearcount = 0;
                    var row = $("#trailTable tr.trail_row");

                    for (var rowIndex = 0; rowIndex < row.length; rowIndex++) {
                        var rowData = $($("#trailTable tr.trail_row")[rowIndex]);
                        var column = $(rowData).find('td');

                        var trail_period_type = column[0];
                        var trail_period_from = column[1];
                        var trail_period_to = column[2];
                        var trail_lumpsum_base = column[3];
                        var trail_lumpsum_additional = column[4];
                        var trail_lumpsum_total = column[5];
                        var trail_lumpsum_greater = column[6];
                        var trail_sip_less = column[7];
                        var trail_sip_greater = column[8];

                        var period_type = $(trail_period_type).find("select[name$='trail_period_type']").val()
                        if (period_type == "Months") {
                            var period = $(trail_period_from).find("input[name$='trail_period_from']").val() + " - " + $(trail_period_to).find("input[name$='trail_period_to']").val();
                            monthperiods = monthperiods == "" ? period : monthperiods + "," + period;

                            detailitem = {}
                            detailitem["schemeid"] = value.SchemeId;
                            detailitem["schemecategoryid"] = value.SchemeCategoryId;
                            detailitem["scheme_category"] = value.SchemeCategoryName;
                            detailitem["scheme"] = value.SchemeName;
                            detailitem["BrokerageTypeId"] = 3;
                            detailitem["Base"] = $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val();
                            detailitem["Additional"] = $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val();
                            detailitem["Total"] = $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val() == "" ? 0 : $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val();
                            detailitem["LumpSumGreater"] = $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val() == "" ? 0 : $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val();
                            detailitem["SIPSlabLess"] = $(trail_sip_less).find("input[name$='trail_sip_less']").val() == "" ? 0 : $(trail_sip_less).find("input[name$='trail_sip_less']").val();
                            detailitem["SIPSlabGreater"] = $(trail_sip_greater).find("input[name$='trail_sip_greater']").val() == "" ? 0 : $(trail_sip_greater).find("input[name$='trail_sip_greater']").val();
                            detailitem["monthperiods"] = period;
                            detailitem["PeriodStart"] = $(trail_period_from).find("input[name$='trail_period_from']").val();
                            detailitem["PeriodEnd"] = $(trail_period_to).find("input[name$='trail_period_to']").val();
                            detailitem["PeriodType"] = 1;
                            RackRate.TempmonthList.push(detailitem);
                            RackRate.TempPaymentDetails.push(detailitem);
                        }
                        else {
                            var period = $(trail_period_from).find("input[name$='trail_period_from']").val();
                            if (period == "1") {
                                yearcount += 1;
                                detailitem = {}
                                detailitem["schemeid"] = value.SchemeId;
                                detailitem["schemecategoryid"] = value.SchemeCategoryId;
                                detailitem["scheme_category"] = value.SchemeCategoryName;
                                detailitem["scheme"] = value.SchemeName;
                                detailitem["BrokerageTypeId"] = 3;
                                detailitem["Base"] = $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val();
                                detailitem["Additional"] = $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val();
                                detailitem["Total"] = $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val() == "" ? 0 : $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val();
                                detailitem["LumpSumGreater"] = $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val() == "" ? 0 : $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val();
                                detailitem["SIPSlabLess"] = $(trail_sip_less).find("input[name$='trail_sip_less']").val() == "" ? 0 : $(trail_sip_less).find("input[name$='trail_sip_less']").val();
                                detailitem["SIPSlabGreater"] = $(trail_sip_greater).find("input[name$='trail_sip_greater']").val() == "" ? 0 : $(trail_sip_greater).find("input[name$='trail_sip_greater']").val();
                                detailitem["monthperiods"] = period;
                                detailitem["PeriodStart"] = $(trail_period_from).find("input[name$='trail_period_from']").val();
                                detailitem["PeriodEnd"] = 0;
                                detailitem["PeriodType"] = 2;
                                RackRate.TempyearList.push(detailitem);
                                RackRate.TempPaymentDetails.push(detailitem);
                            } else {
                                yearcount += 1;
                                detailitem = {}
                                detailitem["schemeid"] = value.SchemeId;
                                detailitem["schemecategoryid"] = value.SchemeCategoryId;
                                detailitem["scheme_category"] = value.SchemeCategoryName;
                                detailitem["scheme"] = value.SchemeName;
                                detailitem["BrokerageTypeId"] = 3;
                                detailitem["Base"] = $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val();
                                detailitem["Additional"] = $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val();
                                detailitem["Total"] = $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val() == "" ? 0 : $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val();
                                detailitem["LumpSumGreater"] = $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val() == "" ? 0 : $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val();
                                detailitem["SIPSlabLess"] = $(trail_sip_less).find("input[name$='trail_sip_less']").val() == "" ? 0 : $(trail_sip_less).find("input[name$='trail_sip_less']").val();
                                detailitem["SIPSlabGreater"] = $(trail_sip_greater).find("input[name$='trail_sip_greater']").val() == "" ? 0 : $(trail_sip_greater).find("input[name$='trail_sip_greater']").val();
                                detailitem["monthperiods"] = period;
                                detailitem["PeriodStart"] = $(trail_period_from).find("input[name$='trail_period_from']").val();
                                detailitem["PeriodEnd"] = 0;
                                detailitem["PeriodType"] = 2;
                                RackRate.TempyearList.push(detailitem);
                                RackRate.TempPaymentDetails.push(detailitem);
                            }
                        }

                    }

                    listitem["monthperiods"] = monthperiods;
                    listitem["yearcount"] = yearcount;
                    listitem["mothyearvalue"] = value.SchemeCategoryId + '/' + value.SchemeCategoryName + '/' + monthperiods + "~" + yearcount;
                    RackRate.TempPaymentList.push(listitem);
                });
            });
            RackRate.SortPaymentListOnAdd();
            RackRate.ClearSection();
        }

    },

    SortPaymentListOnAdd: function () {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetScheme', JSON.stringify({ SearchText: "", MemoTypeId: "1", IsCloseEnded: RackRate.IsCloseEnded }), "json", false, false, function (result) {
            var arrItems = result.GetSchemeResult;
            var ResultPaymentList = [];

            $.each(arrItems, function (i, obj) {
                $.each(RackRate.TempPaymentList, function (li, liobj) {
                    if (obj.SchemeId.toString() == liobj.schemeid.toString()) {
                        ResultPaymentList.push(liobj);
                        return false;
                    }
                });

            });
            RackRate.TempPaymentList = [];
            RackRate.TempPaymentList = ResultPaymentList;

        });
    },

    ViewEditScheme: function () {
        if (RackRate.TempPaymentList.length > 0) {
            $('.bs-example-modal-lg').modal('show');
            RackRate.Showschemedetails();
        }
        else {
            Utility.writeNotification("norecords", "No Records found", "", false);
        }
    },

    EditSchemeDetail: function () {
        RackRate.SaveAllreview_schemeRows();
        RackRate.IsEditing = 1;
        if (RackRate.TableCount > 0) {
            for (var cnt = 0; cnt < RackRate.TableCount; cnt++) {
                var row = $("#tbl_review_scheme" + cnt + " tr.detail_row");

                for (var rowIndex = 0; rowIndex < row.length; rowIndex++) {
                    var rowData = $($("#tbl_review_scheme" + cnt + " tr.detail_row")[rowIndex]);
                    var column = $(rowData).find('td');

                    var radiobtn = column[0];
                    var Radiochecked = $(radiobtn).find("input[name$='equity']").is(":checked");
                    if (Radiochecked == true) {
                        $('.bs-example-modal-lg').modal('hide');
                        var list = {};
                        var clm = column[0];
                        var SchemeId = $(clm).find("input[name='hid_scheme_id']").val();
                        var ScehemCategoryId = $(clm).find("input[name='hid_scheme_category_id']").val();
                        //RackRate.GetSchemeCategory("");
                        $('#dd_scheme_category').multiselect('clearSelection');
                        $('#dd_scheme_category').multiselect('select', $(clm).find("input[name='hid_scheme_category_id']").val());

                        $('#chk_onwards').prop('checked', $(clm).find("input[name='hid_onwards']").val().toLowerCase() == "false" ? false : true);

                        RackRate.GetScheme($(clm).find("input[name='hid_scheme_category_id']").val());
                        $('#dd_scheme').multiselect('select', $(clm).find("input[name='hid_scheme_id']").val());
                        var clawback = $(clm).find("input[name$='hid_claw_back']").val().split(' ');
                        $('#txt_clawback').val(clawback[0]);
                        $('#dd_claw_type').val(clawback[1]);
                        var slab = $(clm).find("input[name='hid_slab_amount']").val().split(' ');
                        $('#txt_slab_amount').val(slab[0]);
                        $('#dd_slab_amount_type').val(slab[1]);
                        $('#hidden_Slab_Amount').val(slab[0]);
                        $('#hidden_Slab_Amount_Type').val(slab[1]);
                        $('#dd_slab_type').val($(clm).find("input[name='hid_slab_type']").val());

                        $('#txt_lumpsum_less_base').val($(column[3]).find(".editInPlace").text());
                        $('#txt_lumpsum_less_additional').val($(column[4]).find("input[name$='hid_lumpsum_additional']").val());
                        $('#txt_lumpsum_less_total').val($(column[4]).find(".total").text());
                        $('#txt_lumpsum_greater').val($(column[5]).find(".editInPlace").text());

                        if (Utility.enableSIP == true) {
                            $('#txt_sip_less').val($(column[6]).find(".editInPlace").text());
                            $('#txt_sip_greater').val($(column[7]).find(".editInPlace").text());
                            $('#txt_additional_upfront').val($(column[8]).find(".editInPlace").text());
                        } else {
                            $('#txt_sip_less').val("0");
                            $('#txt_sip_greater').val("0");
                            $('#txt_additional_upfront').val($(column[6]).find(".editInPlace").text());
                        }


                        $("#trailTable tr.trail_row").remove();

                        $(RackRate.TempmonthList).each(function (obj, value) {
                            if (value.schemeid == SchemeId && value.BrokerageTypeId == 3 && value.PeriodType == 1) {
                                RackRate.addRow(0);
                                var tblrow = $("#trailTable tr.trail_row");
                                var rowData = $($("#trailTable tr.trail_row")[tblrow.length - 1]);
                                var column = $(rowData).find('td');

                                var trail_period_type = column[0];
                                var trail_period_from = column[1];
                                var trail_period_to = column[2];
                                var trail_lumpsum_base = column[3];
                                var trail_lumpsum_additional = column[4];
                                var trail_lumpsum_total = column[5];
                                var trail_lumpsum_greater = column[6];
                                var trail_sip_less = column[7];
                                var trail_sip_greater = column[8];

                                $(trail_period_type).find("select[name$='trail_period_type']").val("Months")
                                $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val(value.Base);
                                $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val(value.Additional);
                                $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val(value.Total);
                                $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(value.LumpSumGreater);
                                $(trail_sip_less).find("input[name$='trail_sip_less']").val(value.SIPSlabLess);
                                $(trail_sip_greater).find("input[name$='trail_sip_greater']").val(value.SIPSlabGreater);
                                $(trail_period_from).find("input[name$='trail_period_from']").val(value.PeriodStart);
                                $(trail_period_to).find("input[name$='trail_period_to']").val(value.PeriodEnd);
                                $(trail_period_to).find("input[name$='trail_period_to']").show();


                            }
                        });

                        $(RackRate.TempyearList).each(function (obj, value) {
                            if (value.schemeid == SchemeId && value.BrokerageTypeId == 3 && value.PeriodType == 2) {
                                RackRate.addRow(0);
                                var tblrow = $("#trailTable tr.trail_row");
                                var rowData = $($("#trailTable tr.trail_row")[tblrow.length - 1]);
                                var column = $(rowData).find('td');

                                var trail_period_type = column[0];
                                var trail_period_from = column[1];
                                var trail_period_to = column[2];
                                var trail_lumpsum_base = column[3];
                                var trail_lumpsum_additional = column[4];
                                var trail_lumpsum_total = column[5];
                                var trail_lumpsum_greater = column[6];
                                var trail_sip_less = column[7];
                                var trail_sip_greater = column[8];

                                $(trail_period_type).find("select[name$='trail_period_type']").val("Year")
                                $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val(value.Base);
                                $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val(value.Additional);
                                $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val(value.Total);
                                $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(value.LumpSumGreater);
                                $(trail_sip_less).find("input[name$='trail_sip_less']").val(value.SIPSlabLess);
                                $(trail_sip_greater).find("input[name$='trail_sip_greater']").val(value.SIPSlabGreater);
                                $(trail_period_from).find("input[name$='trail_period_from']").val(value.PeriodStart);
                                $(trail_period_to).find("input[name$='trail_period_to']").val(value.PeriodEnd);
                                $(trail_period_to).find("input[name$='trail_period_to']").hide();
                                if ($(trail_period_from).find("input[name$='trail_period_from']").val() > 1) {
                                    $(trail_sip_less).find("input[name$='trail_sip_less']").attr("disabled", "disabled");
                                    $(trail_sip_greater).find("input[name$='trail_sip_greater']").attr("disabled", "disabled");
                                    $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").attr("disabled", "disabled");
                                }
                            }
                        });

                        RackRate.SlabTypeOnchange(0);
                    }
                }
            }

        }

    },

    SlabTypeOnchange: function (elem) {
        if ($('#dd_slab_type').val() == "Slab Amount") {
            //$('#txt_slab_amount').val($('#hidden_Slab_Amount').val());
            //$('#dd_slab_amount_type').val($('#hidden_Slab_Amount_Type').val());
            var Category = $('#dd_dist_category_info option:selected');
            var Categoryselected = [];
            $(Category).each(function () {
                Categoryselected.push([$(this).val()]);
            });
            var token = $("#txt_arn_info").tokenInput("get");
            var names = [];
            $.each(token, function (i, obj) {
                names.push(obj.name);//build an array of just the names
            });
            var ARNSelected = names.toString();
            if (elem == 1) {
                if (Categoryselected.length > 0 || ARNSelected != "") {
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSlab', JSON.stringify({ DistributorCategoryID: Categoryselected.toString(), Arnno: ARNSelected }), "json", false, false, function (result) {
                        var slabamount = result.GetSlabResult;

                        if (slabamount == "No Slab" || slabamount == "") {
                            //$('#dd_slab_type').val("All Amounts");
                            $('#txt_slab_amount').val("0");
                            $('#dd_slab_amount_type').val("Lakhs");
                            $('#txt_slab_amount').attr("disabled", "disabled");
                            $('#dd_slab_amount_type').attr("disabled", "disabled");
                            $('#hidden_Slab_Amount').val("0")
                            $('#hidden_Slab_Amount_Type').val("Lakhs")
                        }
                        else if (slabamount.split(' ').length > 1) {
                            $('#dd_slab_amount_type').val(slabamount.split(' ')[1]);

                            $('#txt_slab_amount').val(slabamount.split(' ')[0]);

                            $('#hidden_Slab_Amount').val(slabamount.split(' ')[0])
                            $('#hidden_Slab_Amount_Type').val(slabamount.split(' ')[1])
                        }

                    });

                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSIPSlab', JSON.stringify({ DistributorCategoryID: Categoryselected.toString(), Arnno: ARNSelected }), "json", false, false, function (result) {
                        var SIPslabamount = result.GetSIPSlabResult;
                        if (Utility.enableSIP == true) {
                            $('#spn_sip_slab_less').html(SIPslabamount);
                            $('#spn_sip_slab_greater').html(SIPslabamount);
                            $('#spn_trail_sip_slab_less').html(SIPslabamount);
                            $('#spn_trail_sip_slab_greater').html(SIPslabamount);
                            $('#txt_sip_slab').val(SIPslabamount);
                        }
                    });
                }
            }

            //$('#txt_slab_amount').val("");
            //$('#dd_slab_amount_type').val("Lakhs");
            $('#txt_slab_amount').removeAttr("disabled");
            $('#dd_slab_amount_type').removeAttr("disabled");

            $('#spn_upfront_less_slab').text("≤ Slab");
            $('#spn_upfront_greater_slab').text("> Slab");
            $('#spn_trail_less_slab').text("≤ Slab");
            $('#spn_trail_greater_slab').text("> Slab");

            $('#txt_lumpsum_greater').removeAttr("disabled");
            if (elem == 1) {
                $('#txt_lumpsum_greater').val("0");
            }
            var row = $("#trailTable tr.trail_row");
            var upfronttotal = $('#txt_lumpsum_less_total').val() == "" ? 0 : $('#txt_lumpsum_less_total').val();
            for (var rowIndex = 0; rowIndex < row.length; rowIndex++) {
                var rowData = $($("#trailTable tr.trail_row")[rowIndex]);
                var column = $(rowData).find('td');
                var trail_period_type = column[0];
                var trail_period_from = column[1];
                var trail_period_to = column[2];
                var trail_lumpsum_base = column[3];
                var trail_lumpsum_additional = column[4];
                var trail_lumpsum_total = column[5];
                var trail_lumpsum_greater = column[6];
                var trail_sip_less = column[7];
                var trail_sip_greater = column[8];
                $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").removeAttr("disabled");
                if ($(trail_period_type).find("select[name$='trail_period_type']").val() == "Year" && $(trail_period_from).find("input[name$='trail_period_from']").val() > 1) {
                    if (elem == 1) {
                        $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(0);
                    }
                    $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").attr("disabled", "disabled");
                }
                else {
                    if (elem == 1) {
                        $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(parseInt($(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val() == "" ? 0 : $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val()) + parseInt(upfronttotal));
                    }
                }
            }

        } else {
            $('#hidden_Slab_Amount').val($('#txt_slab_amount').val())
            $('#hidden_Slab_Amount_Type').val($('#dd_slab_amount_type').val())
            $('#txt_slab_amount').val("");
            $('#dd_slab_amount_type').val("");
            $('#txt_slab_amount').attr("disabled", "disabled");
            $('#dd_slab_amount_type').attr("disabled", "disabled");
            $('#txt_lumpsum_less_total').attr("disabled", "disabled");
            $('#txt_lumpsum_greater').attr("disabled", "disabled");
            $('#txt_lumpsum_greater').val("0");

            $('#spn_upfront_less_slab').text("All Amounts");
            $('#spn_upfront_greater_slab').text("");
            $('#spn_trail_less_slab').text("All Amounts");
            $('#spn_trail_greater_slab').text("");

            var row = $("#trailTable tr.trail_row");

            for (var rowIndex = 0; rowIndex < row.length; rowIndex++) {
                var rowData = $($("#trailTable tr.trail_row")[rowIndex]);
                var column = $(rowData).find('td');
                var trail_period_from = column[1];
                var trail_lumpsum_greater = column[6];
                var trail_sip_less = column[7];
                var trail_sip_greater = column[8];
                $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").attr("disabled", "disabled");
                $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val("0");


            }
        }
    },

    addRow: function (focus) {
        var error = "";
        error = error + RackRate.ValidateMonths(0);
        if (error == "") {
            var tableRow = '<tr class="trail_row">' +
                                                   '<td width="12%">' +
                                                       '<div class="styled-select">' +
                                                           '<select class="select-bx-style c-round" name="trail_period_type" style="font-size:14px;" onChange="RackRate.PeriodTypeChange(this)">' +
                                                               '<option value="Months">Months</option>' +
                                                               '<option value="Year">Year</option>' +
                                                           '</select>' +
                                                       '</div>' +
                                                   '</td>' +
                                                   '<td><input type="text" class="input-text-bx-style c-round numberonly" style="margin-right:4px;" maxlength="2" name="trail_period_from"  onkeyup="RackRate.PeriodFromChange(this);"/></td>' +
                                                   '<td><input type="text" class="input-text-bx-style c-round numberonly" style="margin-right:4px;" maxlength="2" name="trail_period_to" /></td>' +
                                                   '<td><input type="text" class="input-text-bx-style c-round numberonly converttoint" style="margin-right:4px;" maxlength="3" name="trail_lumpsum_base" onkeyup="RackRate.Calculatetrail(this);"/></td>' +
                                                   '<td><input type="text" class="input-text-bx-style c-round numberonly converttoint" style="margin-right:4px;" maxlength="3" name="trail_lumpsum_additional" onkeyup="RackRate.Calculatetrail(this);"/></td>' +
                                                   '<td><input type="text" class="input-text-bx-style c-round numberonly converttoint" disabled style="margin-right:4px;" maxlength="3" name="trail_lumpsum_total" /></td>' +
                                                   '<td><input type="text" class="input-text-bx-style c-round numberonly converttoint" style="margin-right:4px;" maxlength="3" name="trail_lumpsum_greater" value="0" /></td>' +
                                                   '<td><input type="text" class="input-text-bx-style c-round numberonly converttoint" style="margin-right:4px;" maxlength="3" name="trail_sip_less" /></td>' +
                                                   '<td><input type="text" class="input-text-bx-style c-round numberonly converttoint" style="margin-right:4px;" maxlength="3" name="trail_sip_greater" /></td>' +
                                                   ' <td align="center" style="border-color:transparent;"><a href="javascript:void(0)" onclick="RackRate.ResetRow(this)"> <img src="../img/repeat-btn1.png" ></a></td>' +
                                                   '<td align="center" style="border-color:transparent;"><a href="javascript:void(0)" onclick="RackRate.DeleteRow(this)"> <img src="../img/trash-btn.png" ></a></td>' +
                                               '</tr>';

            $('#trailTable > tbody:last').append
            (tableRow);
            Utility.AllowDecimal();
            if (focus == 1) {
                var row = $("#trailTable tr:last");
                var column = $(row).find('td');
                var trail_period_type = column[0];
                $(trail_period_type).find("select[name$='trail_period_type']").focus();

                RackRate.SlabTypeOnchange(0);
            }
            if (Utility.enableSIP == false) {
                var row = $("#trailTable tr:last");
                var column = $(row).find('td');

                //var trail_period_type = column[0];
                //$(trail_period_type).find("select[name$='trail_period_type']").attr("disabled", "disabled");
                //$(trail_period_type).find("select[name$='trail_period_type']").val("Year");

                //var trail_period_from = column[1];
                //$(trail_period_from).find("input[name$='trail_period_from']").focus();

                //var trail_period_to = column[2];
                //$(trail_period_to).find("input[name$='trail_period_to']").attr("disabled", "disabled");

                var trail_lumpsum_additional = column[4];
                var trail_sip_less = column[7];
                var trail_sip_greater = column[8];

                $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").attr("disabled", "disabled");
                $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val("0");

                $(trail_sip_less).find("input[name$='trail_sip_less']").attr("disabled", "disabled");
                $(trail_sip_less).find("input[name$='trail_sip_less']").val("0");

                $(trail_sip_greater).find("input[name$='trail_sip_greater']").attr("disabled", "disabled");
                $(trail_sip_greater).find("input[name$='trail_sip_greater']").val("0");

            }
            return true;
        }
        else {
            Utility.writeNotification("warning", error, "", true);
            return false
        }
    },

    DeleteRow: function (elem) {
        if (confirm("Are you sure you want to delete!")) {
            $(elem).parent().parent().remove();
            $('#btn_add_new_rack').focus();
        }
    },

    ResetRow: function (elem) {
        var row = $(elem).parent().parent();
        var column = $(row).find('td');

        var trail_period_type = column[0];
        var trail_period_from = column[1];
        var trail_period_to = column[2];
        var trail_lumpsum_base = column[3];
        var trail_lumpsum_additional = column[4];
        var trail_lumpsum_total = column[5];
        var trail_lumpsum_greater = column[6];
        var trail_sip_less = column[7];
        var trail_sip_greater = column[8];
        $(trail_period_type).find("select[name$='trail_period_type']").val("Months")
        $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val("");
        $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val("");
        $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val("");
        $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val("");
        $(trail_sip_less).find("input[name$='trail_sip_less']").val("");
        $(trail_sip_greater).find("input[name$='trail_sip_greater']").val("");
        $(trail_period_from).find("input[name$='trail_period_from']").val("");
        $(trail_period_to).find("input[name$='trail_period_to']").val("");
        $(trail_period_to).find("input[name$='trail_period_to']").show();
        $(trail_period_type).find("select[name$='trail_period_type']").focus();

    },

    ClearSection: function () {

        $('#txt_clawback').val("");
        $('#dd_claw_type').val("Months");
        //$('#dd_slab_type').val("All Amounts");
        //$('#txt_slab_amount').val("");
        //$('#txt_slab_amount').attr("disabled","disabled");
        //$('#dd_slab_amount_type').attr("disabled","disabled");
        //$('#dd_slab_amount_type').val("`");
        $("#trailTable tr.trail_row").remove();
        RackRate.addRow(0);

        $('#txt_lumpsum_less_base').val("");
        $('#txt_lumpsum_less_additional').val("");
        $('#txt_lumpsum_less_total').val("");
        $('#txt_lumpsum_greater').val("");
        $('#txt_sip_less').val("");
        $('#txt_sip_greater').val("");
        $('#txt_additional_upfront').val("");
        $('#dd_scheme_category').multiselect('clearSelection');
        $("#dd_scheme").multiselect('destroy');
        $("#dd_scheme").empty();
        $('#dd_scheme').multiselect('rebuildscheme');
        $('#chk_onwards').attr('checked', false);

        var Category = $('#dd_dist_category_info option:selected');
        var Categoryselected = [];
        $(Category).each(function () {
            Categoryselected.push([$(this).val()]);
        });
        var token = $("#txt_arn_info").tokenInput("get");
        var names = [];
        $.each(token, function (i, obj) {
            names.push(obj.name);//build an array of just the names
        });
        var ARNSelected = names.toString();
        if (Categoryselected.length > 0 || ARNSelected != "") {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSlab', JSON.stringify({ DistributorCategoryID: Categoryselected.toString(), Arnno: ARNSelected }), "json", false, false, function (result) {
                var slabamount = result.GetSlabResult;

                if (slabamount == "No Slab" || slabamount == "") {
                    $('#dd_slab_type').val("All Amounts");
                    $('#txt_slab_amount').val("");
                    $('#dd_slab_amount_type').val("");
                    $('#txt_slab_amount').attr("disabled", "disabled");
                    $('#dd_slab_amount_type').attr("disabled", "disabled");
                    $('#hidden_Slab_Amount').val("")
                    $('#hidden_Slab_Amount_Type').val("")
                }
                else if (slabamount.split(' ').length > 1) {
                    $('#dd_slab_type').val("Slab Amount");
                    $('#dd_slab_amount_type').val(slabamount.split(' ')[1]);

                    $('#txt_slab_amount').val(slabamount.split(' ')[0]);

                    $('#hidden_Slab_Amount').val(slabamount.split(' ')[0]);
                    $('#hidden_Slab_Amount_Type').val(slabamount.split(' ')[1]);
                    $('#txt_slab_amount').removeAttr("disabled");
                    $('#dd_slab_amount_type').removeAttr("disabled");
                }

            });

            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSIPSlab', JSON.stringify({ DistributorCategoryID: Categoryselected.toString(), Arnno: ARNSelected }), "json", false, false, function (result) {
                var SIPslabamount = result.GetSIPSlabResult;
                if (Utility.enableSIP == true) {
                    $('#spn_sip_slab_less').html(SIPslabamount);
                    $('#spn_sip_slab_greater').html(SIPslabamount);
                    $('#spn_trail_sip_slab_less').html(SIPslabamount);
                    $('#spn_trail_sip_slab_greater').html(SIPslabamount);
                    $('#txt_sip_slab').val(SIPslabamount);
                }
            });
        }
        RackRate.SlabTypeOnchange(0);
        RackRate.IsEditing = 0;
    },

    CalculateLumpsum: function (elem) {
        var error = "";
        if ($('#dd_slab_type').val() == "Slab Amount") {
            if (parseInt($('#txt_slab_amount').val()) == "0") {
                error = error + "Slab Amount Cannot be 0";
            }
            if ($('#txt_slab_amount').val() == "") {
                error = error + "Slab Amount Cannot be empty";
            }

            if ($('#dd_slab_amount_type').val() == "") {
                error = error + "Slab Type Cannot be empty";
            }
        }
        if (error == "") {
            $('#txt_lumpsum_less_total').val(parseInt($('#txt_lumpsum_less_base').val() == "" ? 0 : $('#txt_lumpsum_less_base').val()) + parseInt($('#txt_lumpsum_less_additional').val() == "" ? 0 : $('#txt_lumpsum_less_additional').val()));

            if (Utility.enableSIP == true) {
                if (elem.id == "txt_lumpsum_less_base")
                    $('#txt_sip_less').val($('#txt_lumpsum_less_base').val() == "" ? 0 : parseInt($('#txt_lumpsum_less_base').val().trim()));
                $('#txt_sip_greater').val($('#txt_lumpsum_less_total').val());

            }
            if ($('#dd_slab_type').val() == "Slab Amount") {
                var row = $("#trailTable tr.trail_row");
                var upfronttotal = $('#txt_lumpsum_less_total').val() == "" ? 0 : $('#txt_lumpsum_less_total').val();
                var lumpsumgreater = $('#txt_lumpsum_greater').val() == "" ? 0 : $('#txt_lumpsum_greater').val();
                for (var rowIndex = 0; rowIndex < row.length; rowIndex++) {
                    var rowData = $($("#trailTable tr.trail_row")[rowIndex]);
                    var column = $(rowData).find('td');
                    var trail_period_type = column[0];
                    var trail_period_from = column[1];
                    var trail_period_to = column[2];
                    var trail_lumpsum_base = column[3];
                    var trail_lumpsum_additional = column[4];
                    var trail_lumpsum_total = column[5];
                    var trail_lumpsum_greater = column[6];
                    var trail_sip_less = column[7];
                    var trail_sip_greater = column[8];

                    if ($(trail_period_type).find("select[name$='trail_period_type']").val() == "Year" && $(trail_period_from).find("input[name$='trail_period_from']").val() > 1) {
                        //$(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val($(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val());
                        $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(0);
                    }
                    else {
                        $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(parseInt($(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val() == "" ? 0 : $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val()) + parseInt(upfronttotal) - parseInt(lumpsumgreater));
                    }
                }
            } return true;
        }
        else {
            //Utility.writeNotification("warning", error, "", true);
            //alert(error);
            $(elem).val("");
            return false;
        }
    },

    Calculatetrail: function (elem) {
        var error = "";
        if ($('#dd_slab_type').val() == "Slab Amount") {
            if (parseInt($('#txt_slab_amount').val()) == "0") {
                error = error + "Slab Amount Cannot be 0";
            }
            if ($('#txt_slab_amount').val() == "") {
                error = error + "Slab Amount Cannot be empty";
            }
            if ($('#dd_slab_amount_type').val() == "") {
                error = error + "Slab Type Cannot be empty";
            }
        }
        if (error == "") {
            var parentRow = $(elem).closest('.trail_row');
            var column = $(parentRow).find('td');
            var lumpsumgreater = $('#txt_lumpsum_greater').val() == "" ? 0 : $('#txt_lumpsum_greater').val();
            var trail_period_type = column[0];
            var trail_period_from = column[1];
            var trail_period_to = column[2];
            var trail_lumpsum_base = column[3];
            var trail_lumpsum_additional = column[4];
            var trail_lumpsum_total = column[5];
            var trail_lumpsum_greater = column[6];
            var trail_sip_less = column[7];
            var trail_sip_greater = column[8];

            $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val(parseInt($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val()) + parseInt($(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val()));
            //if (elem.name == "trail_lumpsum_base") {
            // if ($('#dd_slab_type').val() == "Slab Amount") {
            if (Utility.enableSIP == true) {
                if ($(trail_period_type).find("select[name$='trail_period_type']").val() == "Year") {
                    if ($(trail_period_from).find("input[name$='trail_period_from']").val() == 1) {
                        $(trail_sip_less).find("input[name$='trail_sip_less']").val($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val());
                    }
                }
                else {
                    $(trail_sip_less).find("input[name$='trail_sip_less']").val($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val());
                }

                if ($(trail_period_type).find("select[name$='trail_period_type']").val() == "Year") {
                    if ($(trail_period_from).find("input[name$='trail_period_from']").val() == 1) {
                        $(trail_sip_greater).find("input[name$='trail_sip_greater']").val($(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val());
                    }
                }
                else {
                    $(trail_sip_greater).find("input[name$='trail_sip_greater']").val($(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val());
                }
            }
            // }
            //}

            if ($('#dd_slab_type').val() == "Slab Amount") {
                var lumpsumGreater = (parseInt($('#txt_lumpsum_less_total').val() == "" ? 0 : $('#txt_lumpsum_less_total').val()) + parseInt($(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val())) - parseInt($('#txt_lumpsum_greater').val() == "" ? 0 : $('#txt_lumpsum_greater').val());
                if ($(trail_period_type).find("select[name$='trail_period_type']").val() == "Year" && $(trail_period_from).find("input[name$='trail_period_from']").val() > 1) {
                    //$(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val($(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val());
                    $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(0);
                }
                else {
                    $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(lumpsumGreater);
                }

            }
            return true;
        }
        else {
            //Utility.writeNotification("warning", error, "", true);
            //return false
            //alert(error);
            $(elem).val("");
            return false;
        }
    },

    PeriodFromChange: function (elem) {
        var parentRow = $(elem).closest('.trail_row');
        var column = $(parentRow).find('td');
        var trail_period_type = column[0];
        var trail_period_from = column[1];
        var trail_period_to = column[2];
        var trail_lumpsum_base = column[3];
        var trail_lumpsum_additional = column[4];
        var trail_lumpsum_total = column[5];
        var trail_lumpsum_greater = column[6];
        var trail_sip_less = column[7];
        var trail_sip_greater = column[8];
        var period_type = $(trail_period_type).find("select[name$='trail_period_type']").val()
        if (period_type == "Year") {
            if ($(trail_period_from).find("input[name$='trail_period_from']").val() > 1) {
                $(trail_sip_greater).find("input[name$='trail_sip_greater']").attr("disabled", "disabled");
                $(trail_sip_less).find("input[name$='trail_sip_less']").attr("disabled", "disabled");
                $(trail_sip_greater).find("input[name$='trail_sip_greater']").val(0);
                $(trail_sip_less).find("input[name$='trail_sip_less']").val(0);
                $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").attr("disabled", "disabled");
                $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(0);
            } else {
                if (Utility.enableSIP == true) {
                    $(trail_sip_greater).find("input[name$='trail_sip_greater']").removeAttr("disabled");
                    $(trail_sip_less).find("input[name$='trail_sip_less']").removeAttr("disabled");
                }
                if ($('#dd_slab_type').val() == "Slab Amount") {
                    if ($(trail_period_from).find("input[name$='trail_period_from']").val() == 1) {
                        if (Utility.enableSIP == true) {
                            $(trail_sip_less).find("input[name$='trail_sip_less']").val($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val());
                            $(trail_sip_greater).find("input[name$='trail_sip_greater']").val($(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val());
                        }
                        $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").removeAttr("disabled");
                        $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val($(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val());
                    }
                }
                //else {
                //    if ($(trail_period_from).find("input[name$='trail_period_from']").val() == 1) {
                //        $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").removeAttr("disabled");
                //        $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val($(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val());
                //    }
                //}

            }
        }

    },

    RowDoubleClick: function (row) {
        if ($('#div_edit_controls').is(':visible')) {
            RackRate.SaveAllreview_schemeRows();
            $('td', row).each(function () {


                if ($(this).find('.editInPlace').length > 0) {
                    $(this).html('<input class="input-text-bx-style number c-round" type="text" maxlength="3" onkeyup="RackRate.CalculateInlineLumpsum(this);" value="' + $(this).text().trim() + '" />');
                }

            });
            var column = $(row).find('td');
            var clm = column[0];
            var fdf = $(clm).find("input[name='hid_slab_type']").val();
            $('#dd_slab_type').val($(clm).find("input[name='hid_slab_type']").val());
            if ($(clm).find("input[name$='hid_slab_type']").val() == "All Amounts") {
                $(column[5]).html("<span class='rrd-tbl-label-bld editInPlace'>0</span>");

                var columlength = column.length;
                for (var cnt = 11; cnt < columlength;) {
                    var val = $(column[cnt - 1]).find("span[name='total']").val();
                    if ($(column[cnt - 1]).find("span[name='total']").length > 0) {
                        $(column[cnt]).html("<span class='rrd-tbl-label-bld editInPlace'>0</span>");
                    }
                    cnt = cnt + 5;
                }

            }
            Utility.AllowDecimal();
        }
    },

    SingleClick: function () {
        RackRate.SaveAllreview_schemeRows();
    },

    CalculateInlineLumpsum: function (elem) {
        var row = $(elem).parent().parent();
        var column = $(row).find('td');
        var columindex = $(elem).closest("td").index();
        var clm = column[0];

        var Base = $(column[3]).find("input[type=text]").val() == "" ? 0 : $(column[3]).find("input[type=text]").val();
        var Additional = $(column[4]).find("input[name$='hid_lumpsum_additional']").val() == "" ? 0 : $(column[4]).find("input[name$='hid_lumpsum_additional']").val();
        var LumpSumTotal = parseInt(Base == "" ? 0 : Base) + parseInt(Additional == "" ? 0 : Additional);
        $(column[4]).find(".total").text(LumpSumTotal);
        var LumpSumGreater;
        if ($(clm).find("input[name$='hid_slab_type']").val() == "All Amounts") {
            LumpSumGreater = $(column[5]).find(".editInPlace").text() == "" ? 0 : $(column[5]).find(".editInPlace").text();
        } else {
            LumpSumGreater = $(column[5]).find("input[type=text]").val() == "" ? 0 : $(column[5]).find("input[type=text]").val();
        }
        if (Utility.enableSIP == true) {
            if ((columindex) == 3) {
                $(column[6]).find("input[type=text]").val(Base);
            }
            if ((columindex) == 3) {
                $(column[7]).find("input[type=text]").val(LumpSumTotal);
            }
        }

        var monthperiods = ""; var yearperiods = "";
        var yearcount = 0;
        var endcnt = 14;
        var startcnt = 9;
        var currentcnt = 9;
        if (Utility.enableSIP == false) {
            var endcnt = 10;
            var startcnt = 7;
            var currentcnt = 7;
        }
        var splitscheme = $(clm).find("input[name='hid_mothyearvalue']").val().split('/')[2];
        var monthsavailable = splitscheme.split('~')[0];
        if (monthsavailable != "") {
            for (var g = 0; g < $(clm).find("input[name='hid_mothyearvalue']").val().split('~')[0].split(',').length; g++) {


                for (var mcnt = currentcnt ; mcnt < (endcnt) ; mcnt++) {
                    var trailbase = "";
                    var trailadditional = "";
                    var trailtotal = "";
                    var traillumpsumgreater = "";
                    mcnt = currentcnt;
                    trailbase = $(column[currentcnt]).find("input[type=text]").val() == "" ? 0 : $(column[currentcnt]).find("input[type=text]").val();
                    mcnt = currentcnt + 1;


                    trailadditional = $(column[currentcnt + 1]).find("input[name$='hid_lumpsum_additional']").val() == "" ? 0 : $(column[currentcnt + 1]).find("input[name$='hid_lumpsum_additional']").val();
                    $(column[currentcnt + 1]).find(".total").text(parseInt(trailbase == '' ? 0 : trailbase) + parseInt(trailadditional == '' ? 0 : trailadditional));
                    trailtotal = $(column[currentcnt + 1]).find(".total").text();

                    mcnt = currentcnt + 2;
                    if ($(clm).find("input[name$='hid_slab_type']").val() == "All Amounts") {
                        $(column[currentcnt + 2]).find(".editInPlace").text(0);//LumpSumGreater                        
                    }
                    else {
                        if ((columindex) != mcnt) {
                            traillumpsumgreater = parseInt(trailtotal) + parseInt(LumpSumTotal) - parseInt(LumpSumGreater);
                            $(column[currentcnt + 2]).find("input[type=text]").val(traillumpsumgreater);//LumpSumGreater
                        }
                    }
                    if (Utility.enableSIP == true) {
                        mcnt = currentcnt + 3;
                        if ((columindex) == currentcnt) {
                            $(column[currentcnt + 3]).find("input[type=text]").val(trailbase);
                        }//SIP LESS
                        mcnt = currentcnt + 4;
                        if ((columindex) == currentcnt) {
                            $(column[currentcnt + 4]).find("input[type=text]").val(trailtotal);//SIP GREATER
                        }
                    }
                }
                if (Utility.enableSIP == true) {
                    endcnt = endcnt + 5;
                    currentcnt = currentcnt + 5;
                }
                else {
                    endcnt = endcnt + 3;
                    currentcnt = currentcnt + 3;
                }
            }
        }
        var yearcnt = $(clm).find("input[name='hid_mothyearvalue']").val().split('~')[1];

        for (var g = 0; g < yearcnt; g++) {
            //if (monthsavailable == "") {
            var year = 0;

            for (var mcnt = currentcnt ; mcnt < (endcnt) ; mcnt++) {
                var trailbase = "";
                var trailadditional = "";
                var trailtotal = "";
                var traillumpsumgreater = "";
                mcnt = currentcnt;
                trailbase = $(column[currentcnt]).find("input[type=text]").val() == "" ? 0 : $(column[currentcnt]).find("input[type=text]").val();
                mcnt = currentcnt + 1;

                trailadditional = $(column[currentcnt + 1]).find("input[name$='hid_lumpsum_additional']").val() == "" ? 0 : $(column[currentcnt + 1]).find("input[name$='hid_lumpsum_additional']").val();
                $(column[currentcnt + 1]).find(".total").text(parseInt(trailbase == '' ? 0 : trailbase) + parseInt(trailadditional == '' ? 0 : trailadditional));
                trailtotal = $(column[currentcnt + 1]).find(".total").text();
                year = $(column[currentcnt + 1]).find("input[name$='hid_year']").val();
                if (year == 1) {
                    mcnt = currentcnt + 2;
                    if ($(clm).find("input[name$='hid_slab_type']").val() == "All Amounts") {
                        $(column[currentcnt + 2]).find(".editInPlace").text(0);//LumpSumGreater                        
                    }
                    else {
                        if ((columindex) != mcnt) {
                            traillumpsumgreater = parseInt(trailtotal) + parseInt(LumpSumTotal) - parseInt(LumpSumGreater);
                            $(column[currentcnt + 2]).find("input[type=text]").val(traillumpsumgreater);//LumpSumGreater
                        }
                    }
                    if (Utility.enableSIP == true) {
                        mcnt = currentcnt + 3;
                        if ((columindex) == currentcnt || (columindex - 1) == currentcnt) {
                            $(column[currentcnt + 3]).find("input[type=text]").val(trailbase);//SIP LESS
                        }
                        mcnt = currentcnt + 4;
                        if ((columindex) == currentcnt || (columindex - 1) == currentcnt) {
                            $(column[currentcnt + 4]).find("input[type=text]").val(trailtotal);//SIP GREATER
                        }
                    }
                }
                else {
                    mcnt = endcnt;
                }
            }

            endcnt = endcnt + 1;
            currentcnt = currentcnt + 1;
        }


    },

    GetLumpsumSIPType: function () {
        var search = "";
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetLumpsumSIPType', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetLumpsumSIPTypeResult;
            $("#dd_LumpsumSIPType").empty();
            //$("<option value='0' selected>Select</option>").appendTo("#dd_LumpsumSIPType");
            for (var i = 0; i < data.length; i++) {
                $("<option />").text(data[i].LumpsumSIPName).val(data[i].LumpsumSIPId).appendTo("#dd_LumpsumSIPType");
            }
        });
       

    },
    SaveAllreview_schemeRows: function () {
        for (var cnt = 0; cnt < RackRate.TableCount; cnt++) {
            var allrow = $("#tbl_review_scheme" + cnt + " tr.detail_row");
            $('td', allrow).each(function () {
                if ($(this).find('input[type=text]').length > 0) {
                    var val = $(this).find('input[type=text]').val().trim() == "" ? 0 : $(this).find('input[type=text]').val();
                    $(this).html("<span class='rrd-tbl-label-bld editInPlace'>" + val + " </span>");
                }
            });
        }
    },

    RemoveSIP: function () {
        if (Utility.enableSIP == false) {
            $('#txt_lumpsum_less_additional').prop("disabled", true);
            $('#txt_lumpsum_less_additional').val("0");

            $('#txt_sip_less').attr("disabled", "disabled");
            $('#txt_sip_less').val("0");

            $('#txt_sip_greater').attr("disabled", "disabled");
            $('#txt_sip_greater').val("0");
        }
    },

}


$(function () {
    /////Default Load////
    
    var memono = Utility.GetParameterValues('memono');
    if (memono != "" && memono != undefined) {
        $('#btnInfoMemoNumber').html("Memo No:" + memono);
        $('#btnInfoMemoNumber').show();
    }
    else {
        RackRate.IsCloseEnded = sessionStorage.IsCloseEnded == "true" ? 1 : 0;

    }
    $("#hidden_payment_memo_id").val("0");
    RackRate.LoadDropDowns();
    RackRate.GetLumpsumSIPType();
    if ($("#hidden_payment_memo_id").val() == "0")
    {
        $("#dd_LumpsumSIPType").val("3");
    }
    $grid = $("#grid_search_result");
    var StatusCheck = ['Saved', 'Active', 'Approved', 'Reviewed', 'Initiated'];
    var lastsel3;
    jQuery("#grid_search_result").jqGrid({
        datatype: "local",
        height: 250,
        width: null,
        shrinkToFit: false,
        sortable: true,
        ignoreCase: true,
        rowNum: 100,
        colNames: ['Select', '<input type="checkbox" id="checkAll" >Select</input>', 'Memo Number', 'Memo Number', 'PaymentMemoId', 'Memo Type', 'Memo Type ID', 'Transaction Type ', 'DistributorCategoryId', 'Category', 'ARN No', 'ARN Name', 'From Date', 'To Date', 'Status', 'Status', 'Raised By', 'Raised On', 'Time', 'Ageing', 'Last Action By', 'Pending With', 'IsCloseEnded', 'isParentId'],
        colModel: [
                    { name: 'selectradio', formatter: RackRate.ReturnRadioBox, width: '60px;' },
                    {
                    name: 'selectcheck', width: '80px;', align: 'center', editable: true, sortable: false, hidden: true, formatter: 'checkbox', search: false, editoptions: { value: "True:False" }, edittype: "checkbox", formatoptions: { disabled: false },
                    cellattr: function (rowId, val, rawObject) {
                    return " class='cbEmpActive'";
                    }
                    },
                    //{ name: 'selectcheck', width: '60px;', align: 'center', hidden: true, formatter: 'checkbox', editoptions: { value: "True:False" }, edittype: "checkbox", formatoptions: { disabled: false } },
                    { name: 'MemoId', index: 'MemoId', align: 'right', formatter: RackRate.ReturnSearchHyperLink, sorttype: 'integer', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
                    { name: 'MemoNumber', index: 'MemoNumber', align: 'left', hidden: true, formatter: RackRate.ReturnMemonumberSearchHyperLink, },
                    { name: 'PaymentMemoId', index: 'PaymentMemoId', align: 'right', hidden: true },
                    { name: 'MemoTypeName', index: 'MemoTypeName', width: 120, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'MemoTypeID', index: 'MemoTypeID', hidden: true },
                    { name: 'LumpsumSIPType', width: 240, index: 'LumpsumSIPType', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'DistributorCategoryId', width: 200, index: 'DistributorCategoryId', hidden: true },
                    { name: 'DistributorCategoryName', width: 200, index: 'DistributorCategoryName', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'ARNNo', width: 90, index: 'ARNNo', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'ARNName', width: 260, index: 'ARNName', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'DateFrom', width: 90, index: 'DateFrom', align: 'center', sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
                    { name: 'DateTo', width: 90, index: 'DateTo', align: 'center', sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
                    { name: 'MemoStatus', index: 'MemoStatus', align: 'center', width: 90, hidden: true },
                    { name: 'MemoStatusDisplay', index: 'MemoStatusDisplay', align: 'center', width: 98, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'CreatedByName', index: 'CreatedByName', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'RaisedOnDate', index: 'RaisedOnDate', width: 90, align: 'center', sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
                    { name: 'RaisedOnTime', index: 'RaisedOnTime', width: 50, align: 'center', search: false },
                    { name: 'Ageing', index: 'Ageing', width: 100, align: 'right', sorttype: 'integer', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
                    { name: 'ModifiedByName', index: 'ModifiedByName', align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'PendingWith', index: 'PendingWith', align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'IsCloseEnded', index: 'IsCloseEnded', align: 'left', hidden: true },
                    { name: 'isParentId', index: 'isParentId', align: 'left', sortable: false, hidden: true, sorttype: 'integer', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },

        ],
        gridview: true,
        rowattr: function (rd) {
            if (rd.isParentId == 1 && $.inArray(rd.MemoStatus, StatusCheck) > -1)
                return { "class": "isParentId" };
            else if (rd.isParentId == 1 && sessionStorage.RoleID == 10 && $.inArray(rd.MemoStatus, StatusCheck) > -1)
                return { "class": "isParentId" };
            else if (rd.isParentId == 1 && sessionStorage.RoleID == 7 && $.inArray(rd.MemoStatus, StatusCheck) > -1)
                return { "class": "isParentId" };
        },
        gridComplete: function () {
            $("td[aria-describedby=grid_search_result_select] input[type='radio']").click(function () {
                var $selRadio = $('input[name=radio_' + $grid[0].id + ']:radio:checked'), $tr;
                if ($selRadio.length > 0) {
                    $tr = $selRadio.closest('tr');
                    if ($tr.length > 0) {
                        var btn_copy = $('#btn_copy');
                        var btn_modify = $('#btn_modify');
                        if ($tr.find('td:eq(4)').text() == "1") {
                            sessionStorage.CopyMemoNumber = $tr.find('td:eq(1)').text();
                            btn_copy.attr('disabled', false);
                            btn_modify.attr('disabled', true);
                        }
                        if ($tr.find('td:eq(4)').text() == "2") {
                            sessionStorage.CopyMemoNumber = $tr.find('td:eq(1)').text();
                            btn_copy.attr('disabled', true);
                            btn_modify.attr('disabled', false);
                        }
                    }
                } else {
                    Utility.writeNotification("warning", "Select a memo", "", true);
                    //alert("The radio button is not selected");
                }
            });
        }
    });
    jQuery("#grid_search_result").jqGrid('filterToolbar', { searchOperators: true, stringResult: true, searchOnEnter: false, defaultSearch: "cn", multipleSearch: true });
    $("#checkAll").click(function (e) {
        var isSelectAllTrue = $('#checkAll').is(":checked");
        e = e || event;/* get IE event ( not passed ) */
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;

        var td = $('.cbEmpActive');
        for (var i = 0; i < td.length; i++) {
            var checkbox = $('input[type="checkbox"]', $(td[i]).closest('td')).get(0);

            var checked = checkbox.checked;
            checkbox.checked = isSelectAllTrue;

        }

    });


    if (memono != "" && memono != undefined) {
        var mode = Utility.GetParameterValues('mode');
        if (mode != null) {
            RackRate.BindDetails(memono);
        }
        //RackRate.ViewAction(memono);
        //RackRate.BindDetails(memono);
    }
    else {
        $('#dd_dist_category_info').multiselect('clearSelection');
        var categorySelected = sessionStorage.getItem('DistributorCategory') != null ? sessionStorage.getItem('DistributorCategory').split(",") : '';
        var Arnselected = sessionStorage.getItem('ARN') != null ? sessionStorage.getItem('ARN').split(",") : '';
        var ARNNo = Arnselected.toString();
        //var selectedLumpsumType = sessionStorage.getItem('LumpsumSIPType');
        //$("#dd_LumpsumSIPType").val(selectedLumpsumType);

        $('#txt_arn_info').tokenInput('clear');
        $('#txt_arn_name_info').tokenInput('clear');
        if (Arnselected != null) {
            for (var i = 0; i < Arnselected.length ; i++) {
                $.each(RackRate.arns, function (key, value) {
                    if (value.name == Arnselected[i]) {
                        $("#txt_arn_info").tokenInput("add", { id: value.id, name: value.name });
                    }
                });
            }
        }
        if (categorySelected != null) {
            for (var i = 0; i < categorySelected.length; i++) {
                if (categorySelected[i] != "") {
                    $('#dd_dist_category_info').multiselect('select', categorySelected[i]);
                }
            }
        }

        var schemeSelected = '';
        var DateFrom = '';
        var Dateto = '';

        if (sessionStorage.CurrentMenuselected == "nav_information") {
            if (sessionStorage.getItem('ARN') != "" || sessionStorage.getItem('DistributorCategory') != "") {
                var memoval = $('#hidden_payment_memo_id').val() == "" ? 0 : $('#hidden_payment_memo_id').val();
                var transactiontype = "";
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/MemoExists', JSON.stringify({ ArnNo: sessionStorage.getItem('ARN'), Channel: "", DistributorCategory: sessionStorage.getItem('DistributorCategory'), schemeid: schemeSelected, DateFrom: DateFrom, DateTo: Dateto, MemoId: memoval, TransactionType: transactiontype, MemoType: "1" }), "json", false, false, function (result) {
                    if (result.MemoExistsResult != "")
                        Utility.writeNotification("warning", result.MemoExistsResult, "", true);
                });
                if (Arnselected != null) {
                    if (Arnselected.length == 1) {
                        if (Arnselected[0] != "") {
                            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChildArn', JSON.stringify({ ArnNo: sessionStorage.getItem('ARN') }), "json", false, false, function (result) {
                                var Data = result.GetChildArnResult;
                                if (Data.length < 1) {
                                    //Utility.writeNotification("warning", "Would you like to proceed for sub ARN only or would like to include primary ARN?", "", true);
                                    $('#modal_confirmation').modal('show');
                                }
                            });
                        }
                    }
                }
            }
            //else {
            var Channelcategorydata;
            var RoleID = sessionStorage.getItem("RoleID");
            if (RoleID == "3" || RoleID == "6" || RoleID == "7" || RoleID == "10") {
                if (sessionStorage.getItem('Channel') != null) {
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChannelDistributorCategory', JSON.stringify({ Channel: sessionStorage.getItem('Channel') }), "json", false, false, function (result) {
                        Channelcategorydata = result.GetChannelDistributorCategoryResult;

                    });

                    if (Channelcategorydata.length > 0) {
                        for (var cnt = 0; cnt < Channelcategorydata.length; cnt++) {
                            $('#dd_dist_category_info').multiselect('select', Channelcategorydata[cnt].DistributorCategoryId);
                        }
                    }
                }
            }
            //}

            if (categorySelected.length > 0 || ARNNo != "") {
                RackRate.ShowMemoType();
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSlab', JSON.stringify({ DistributorCategoryID: categorySelected.toString(), Arnno: ARNNo }), "json", false, false, function (result) {
                    var slabamount = result.GetSlabResult;

                    if (slabamount == "No Slab" || slabamount == "") {
                        $('#dd_slab_type').val("All Amounts");
                        $('#txt_slab_amount').val("");
                        $('#dd_slab_amount_type').val("");
                        $('#txt_slab_amount').attr("disabled", "disabled");
                        $('#dd_slab_amount_type').attr("disabled", "disabled");
                        $('#hidden_Slab_Amount').val("")
                        $('#hidden_Slab_Amount_Type').val("")
                    }
                    else if (slabamount.split(' ').length > 1) {
                        $('#dd_slab_amount_type').val(slabamount.split(' ')[1]);

                        $('#txt_slab_amount').val(slabamount.split(' ')[0]);

                        $('#hidden_Slab_Amount').val(slabamount.split(' ')[0])
                        $('#hidden_Slab_Amount_Type').val(slabamount.split(' ')[1])
                    }

                    RackRate.SlabTypeOnchange(0);
                });

                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSIPSlab', JSON.stringify({ DistributorCategoryID: categorySelected.toString(), Arnno: ARNNo }), "json", false, false, function (result) {
                    var SIPslabamount = result.GetSIPSlabResult;
                    if (Utility.enableSIP == true) {
                        $('#spn_sip_slab_less').html(SIPslabamount);
                        $('#spn_sip_slab_greater').html(SIPslabamount);
                        $('#spn_trail_sip_slab_less').html(SIPslabamount);
                        $('#spn_trail_sip_slab_greater').html(SIPslabamount);
                        $('#txt_sip_slab').val(SIPslabamount);
                    }
                });
            }

            //Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetExitLoad', JSON.stringify({ ID: 0 }), "json", false, false, function (result) {
            //    var data = result.GetExitLoadResult;
            //    var additionalNotes = "";
            //    $.each(data, function (key, value) {
            //        additionalNotes  += value.FundLevel + ' ' + value.ExitLoad + ' \n';
            //    });
            $('#txt_additional_notes').text(RackRate.additionalNotes(1));
            //});
        }

    }
    var mindate = "";
    var maxdate = "";
    var dateToday = new Date();
    var seldate = dateToday.getMonth() + 1 + "/01/" + dateToday.getFullYear();
    var currmonth = dateToday.getMonth() + 1;
    var RoleID = sessionStorage.getItem("RoleID");
    if (RoleID == "3" || RoleID == "10") {
    }
    else {
        if (currmonth == 1 || currmonth == 2 || currmonth == 3) {
            mindate = currmonth + "/01/" + dateToday.getFullYear();
            maxdate = "03/31/" + dateToday.getFullYear();
        }
        else if (currmonth == 4 || currmonth == 5 || currmonth == 6) {
            mindate = currmonth + "/01/" + dateToday.getFullYear();
            maxdate = "06/30/" + dateToday.getFullYear();
        }
        else if (currmonth == 7 || currmonth == 8 || currmonth == 9) {
            mindate = currmonth + "/01/" + dateToday.getFullYear();
            maxdate = "09/30/" + dateToday.getFullYear();
        }
        else if (currmonth == 10 || currmonth == 11 || currmonth == 12) {
            mindate = currmonth + "/01/" + dateToday.getFullYear();
            maxdate = "12/31/" + dateToday.getFullYear();
        }
        mindate = new Date(mindate);
        maxdate = new Date(maxdate);
    }

    $("#dt_from").datepicker({
        dateFormat: 'dd/mm/y',
        changeMonth: true,
        changeYear: true,
        minDate: mindate,
        maxDate: maxdate,
        onSelect: function (selectedDate) {
            $("#dt_to").datepicker({
                dateFormat: 'dd/mm/y',
                changeMonth: true,
                changeYear: true,
                maxDate: maxdate,
            });
            var tomindate = selectedDate.split('/')[1] + "/" + selectedDate.split('/')[0] + "/20" + selectedDate.split('/')[2];
            tomindate = new Date(tomindate);
            if (tomindate < new Date(dateToday)) {
                if ((RoleID == "3" || RoleID == "10") && Utility.enableBackDate == false) {
                    tomindate = selectedDate;
                } else {
                    tomindate = new Date(dateToday);
                }
            }
            else {
                tomindate = selectedDate; // selectedDate.split('/')[1] + "/" + selectedDate.split('/')[0] + selectedDate.split('/')[2];
                //tomindate = new Date(selectedDate);
            }
            $("#dt_to").datepicker("option", "minDate", tomindate);
            //$("#dt_to").focus();
        }
    });

    ///////Remarks History Table////////

    $("#tbl_remarks").jqGrid({
        //data: mydata,
        height: 200,
        width: null,
        shrinkToFit: false,
        datatype: "local",
        colNames: ['AuditId', 'PaymentMemoId', 'Remarks By', 'Date', 'Time', 'Remarks', 'Action'],
        colModel: [
                    { name: 'AuditId', index: 'AuditId', width: 150, hidden: true },
                    { name: 'PaymentMemoId', index: 'PaymentMemoId', width: 150, hidden: true },
                    { name: 'RemarksBy', index: 'RemarksBy', width: 150, sortable: true, },
                    { name: 'Date', index: 'Date', align: 'center', width: 80 },
                    { name: 'Time', index: 'Time', align: 'center', width: 80 },
                    { name: 'Remarks', index: 'Remarks', width: 460 },
                    { name: 'Action', index: 'Action', width: 100 },
        ],
    });

    ///////Modified History History Table////////

    $("#tbl_modified_rate_history").jqGrid({
        datatype: "local",
        width: null,
        shrinkToFit: false,
        colNames: ['AuditId', 'Payment List ID', 'Payment Memo Id', 'Action', 'Action Taken By', 'Date', 'Time', 'Scheme Category', 'Scheme', 'Role', 'Brokerage detail'],
        colModel: [
                    { name: 'AuditId', index: 'AuditId', width: 800, hidden: true },
                    { name: 'PaymentListId', index: 'PaymentListId', width: 150, hidden: true },
                    { name: 'PaymentMemoId', index: 'PaymentMemoId', width: 150, hidden: true },
                    { name: 'Action', index: 'Action', width: 90, sortable: true, },
                    { name: 'ActionTakenBy', index: 'ActionTakenBy', width: 150 },
                    { name: 'Date', index: 'Date', align: 'center', width: 80 },
                    { name: 'Time', index: 'Time', align: 'center', width: 80 },
                    { name: 'SchemeCategoryName', index: 'SchemeCategoryName', width: 160 },
                    { name: 'Scheme', index: 'Scheme', width: 170 },
                    { name: 'Role', index: 'Role', width: 80, hidden: true },
                    { name: 'PaymentListId', index: 'PaymentListId', align: 'left', formatter: RackRate.ReturnBrokerageDetailHyperLink },
        ],
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

        //var ccusers = selectedcc.toString();
        if ($("#div_landing_grid").is(":visible")) {
            var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
            var selectedmemos = "";
            if (gridData.length > 0) {
                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].selectcheck == 'True') {
                        if (Tousers != "") {
                            selectedmemos = gridData[i].MemoNumber;
                            var fileurl = Utility.DistributorReportUrl.replace("###MemoNumber###", RackRate.remove_tags(gridData[i].MemoNumber));
                            fileurl = fileurl.replace("###Distributorid###", gridData[i].ARNNo);
                            var filename = RackRate.remove_tags(gridData[i].MemoNumber);
                            Utility.ServiceCall("POST", 'BaseRackRateService.svc/SendEmailMemo', JSON.stringify({ fileurl: fileurl, filename: filename, sendto: Tousers, sendcc: CCusers, typeval: 1, ModuleID: 1, MailStatus: "Distributor Mail BRR", sendbcc: BCCusers }), "json", false, false, function (result) {
                                Utility.writeNotification("success", "Memo Emailed Successfully", "", true);
                            });
                            $('#modal_select_to_cc').modal('hide');
                        }
                        else {
                            Utility.writeNotification("error", "Please select atlease one To User", "", true);
                        }
                    }
                }
            }
            else {
                Utility.writeNotification("error", "Select Memo to  Send Email", "", true);
            }
        }
        else {
            //RackRate.SaveRackRateInfo(updateStatus, 'Memo Submitted Successfully');
        }
    });

    var currentZoom = 1.0;
    $('#btn_ZoomIn').click(
           function () {
               $('#div_rack_rate_detail').animate({ 'zoom': currentZoom += .1 }, 'slow');
           })
    $('#btn_ZoomOut').click(
        function () {
            $('#div_rack_rate_detail').animate({ 'zoom': currentZoom -= .1 }, 'slow');
        })
    $('#btn_ZoomReset').click(
        function () {
            currentZoom = 1.0
            $('#div_rack_rate_detail').animate({ 'zoom': 1 }, 'slow');
        })

    RackRate.RemoveSIP();

    $('#imgdt_to').click(function (e) {
        if ($('#dt_to').data('datepicker')) {
            $("#dt_to").datepicker("show");
        }
        else {
            return false;
        }
    });
    $('#imgdt_from').click(function (e) {
        $("#dt_from").datepicker("show");
    });

});

