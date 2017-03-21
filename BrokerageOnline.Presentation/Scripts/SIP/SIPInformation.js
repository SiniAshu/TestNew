var SIP = {
    DetailCount: 0,
    arns: [],
    arnName: [],
    DistributorCategory: [],
    DistributorCategoryCount: 0,
    ShowInformation: false,
    SearchClick: false,
    NextSIPRowId: 0,
    TempPaymentList: [],
    TempRackRateStatus: "",
    TempAdditionalNotes: "",
    TempMemoNumber: '',

    ToggleBaseContols: function (val) {
        if (val == true) {
            $('#dd_dist_category_info').multiselect('disable');
            $('#txt_arn_name_info').attr('disabled', 'disabled');
            $('#dt_from').attr('disabled', 'disabled');
            $('#dt_to').attr('disabled', 'disabled');
            $('#txt_arn_info').tokenInput('toggleDisabled', true);
            $('#txt_arn_name_info').tokenInput('toggleDisabled', true);
        }
        else {
            $('#dd_dist_category_info').multiselect('enable');
            $('#dd_dist_category_info').removeAttr('disabled');
            $('#txt_arn_name_info').removeAttr('disabled');
            $('#dt_from').removeAttr('disabled');
            $('#dt_to').removeAttr('disabled');
            $('#txt_arn_info').tokenInput('toggleDisabled', false);
            $('#txt_arn_name_info').tokenInput('toggleDisabled', false);
        }
    },

    OpenRemarks: function () {
        //if (SIP.TempRackRateStatus == "Discarded")
        //    $('#btn_mdl6_remarks').text('Discard');
        //else if (SIP.TempRackRateStatus == "Rejected")
        //    $('#btn_mdl6_remarks').text('Reject');
        //else
        $('#btn_mdl6_remarks').text('Ok');

        $('#myModal123').modal('show');
    },

    ViewSIPInformation: function () {
        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_information").addClass("active");

        $("#div_btn").empty();
        input = $(' <button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button><button class="btn mr-right-01 btn-warning sq-btn" onclick=\"SIP.InitiateSubmit();\">Submit</button><button class="btn mr-right-01 sq-btn btn-success" id="btn_save_info" onclick=\"SIP.SaveSIP();\">Save</button><button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');
        $("#div_btn").append(input);

        //sessionStorage.ismasterqueue == "true" ? $('#btn_save_info').prop('disabled', true) : $('#btn_save_info').prop('disabled', false);
        sessionStorage.ismasterqueue = "";

        //$("#lnk_view_remarks").remove();
        //$("#lnk_view_rate_trail").remove();

        if (SIP.ShowInformation) {
            $("#hdr_name").text("SIP Information");
            $("#div_sip_information").show();
            $('#div_sip_information').find('input, textarea, button, select').removeAttr("disabled");
            $("#div_landing_grid").hide();
        }
        else {
            $("#hdr_name").text("SIP Information");
            $("#div_sip_information").hide();
            $('#div_sip_information').find('input, textarea, button, select').removeAttr("disabled");
            $("#div_landing_grid").show();
            SIP.SearchSIP();
        }
        SIP.ToggleBaseContols(false);
        $("#div_freeze").hide();
        $("#div_manage").hide();
        $("#div_regenerate").hide();

    },

    ViewInitiateSIP: function () {
        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_initiate").addClass("active");

        $("#div_btn").empty();
        input = $('<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"SIP.SearchButtonClick();\">Search</button> <button class="btn mr-right-01 btn-warning sq-btn" onclick=\"SIP.InitiateSubmit();\">Submit</button>');
        $("#div_btn").append(input);

        //if (sessionStorage.RoleID == 5 || sessionStorage.RoleID == 8 || sessionStorage.RoleID == 9)
        //    $("#btn_save_success").disabled = "disabled";

        $("#hdr_name").text("Initiate SIP");
        SIP.ToggleBaseContols(false);
        $('#grid_search_result').hideCol('selectradio');
        $('#grid_search_result').showCol('selectcheck');
        $('#grid_search_result').hideCol('MemoNumber');
        $('#grid_search_result').showCol('MemoId');
        $('#grid_search_result').showCol('PendingWith');
        $('#div_sip_information').find('input, textarea, button, select').removeAttr("disabled");
        $("#div_sip_information").hide();
        $("#div_add_tie_up").show();
        $("#div_landing_grid").show();
        $("#div_freeze").hide();
        $("#div_manage").hide();
        $("#div_regenerate").hide();
        sessionStorage.CurrentMenuselected = "nav_initiate";
        SIP.AutoSearch();
    },

    ViewSIPReview: function () {
        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_review").addClass("active");

        $("#div_btn").empty();
        var RoleID = sessionStorage.getItem("RoleID");
        if (RoleID == "10") {
            input = $('<button class="btn btn-warning sq-btn mr-right-01" onclick="SIP.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
                '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"SIP.SearchButtonClick();\">Search</button>'
            //'<button class="btn btn-warning sq-btn mr-right-01" id="btn_review_Discard" onclick=\"SIP.review_Discard();\">Discard</button>' +
                        //'<button class="btn btn-danger sq-btn mr-right-01" id="btn_review_reject" onclick=\"SIP.review_Reject();\">Reject</button>' +
                        //'<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"SIP.ReviewForward();\">Forward</button>'
                        );
        }
        else {
            input = $('<button class="btn btn-warning sq-btn mr-right-01" onclick="SIP.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
                '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"SIP.SearchButtonClick();\">Search</button>' +
                      '<button class="btn btn-warning sq-btn mr-right-01" id="btn_review_Discard" onclick=\"SIP.review_Discard();\">Discard</button>' +
                                  '<button class="btn btn-danger sq-btn mr-right-01" id="btn_review_reject" onclick=\"SIP.review_Reject();\">Reject</button>' +
                                  '<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"SIP.ReviewForward();\">Forward</button>'
                                  );
        }
        $("#div_btn").append(input);

        $('#grid_search_result').hideCol('selectradio');
        $('#grid_search_result').hideCol('selectcheck');
        //$('#grid_search_result').showCol('selectcheck');

        $('#grid_search_result').hideCol('MemoNumber');
        $('#grid_search_result').showCol('MemoId');
        $('#grid_search_result').showCol('PendingWith');
        $("#hdr_name").text("SIP Review");
        SIP.ToggleBaseContols(true);
        $("#div_sip_information").hide();
        $("#div_add_tie_up").hide();
        $("#div_landing_grid").show();
        $("#div_freeze").hide();
        $("#div_regenerate").hide();
        $("#div_manage").hide();

        sessionStorage.CurrentMenuselected = "nav_review";
        SIP.AutoSearch();
    },

    ViewSIPApproval: function () {
        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_approval").addClass("active");

        $("#div_btn").empty();

        input = $('<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"SIP.SearchButtonClick();\">Search</button> ' +
            '<button class="btn btn-warning sq-btn mr-right-01" id ="btn_approval_Discard" onclick=\"SIP.ApprovalDiscard();\">Discard</button>' +
            '<button class="btn btn-danger sq-btn mr-right-01" id ="btn_approval_reject" onclick=\"SIP.ApprovalReject();\">Reject</button>' +
            '<button class="btn btn-success sq-btn mr-right-01" id ="btn_approval_approve" onclick=\"SIP.SIPApproval();\">Approve</button>');
        $("#div_btn").append(input);

        $('#grid_search_result').hideCol('selectradio');
        $('#grid_search_result').showCol('selectcheck');
        SIP.ToggleBaseContols(true);
        $('#grid_search_result').hideCol('MemoNumber');
        $('#grid_search_result').showCol('MemoId');
        $('#grid_search_result').showCol('PendingWith');
        $("#hdr_name").text("SIP Approval");
        //$("#div_sip_information").show();
        $("#div_sip_information").hide();
        $("#div_add_tie_up").hide();
        $("#div_landing_grid").show();
        $("#div_freeze").hide();
        $("#div_manage").hide();
        $("#div_regenerate").hide();
        sessionStorage.CurrentMenuselected = "nav_approval";
        SIP.AutoSearch();
    },

    ViewFreezeSIP: function () {
        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_freeze").addClass("active");
        SIP.ToggleBaseContols(true);
        $("#div_btn").empty();
        input = $('<button class="btn btn-warning sq-btn mr-right-01" onclick="SIP.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
            '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"SIP.SearchButtonClick();\">Search</button> ' +
            '<button class="btn btn-primary sq-btn mr-right-01" id="btn_freeze_freeze" onclick=\"SIP.SIPFreeze();\">Freeze</button>' +
            '<button id="btn_freeze_Discard" class="btn btn-primary sq-btn mr-right-01"  onclick=\"SIP.FreezeDiscard();\">Discard</button>');
        //'<button class="btn btn-primary mr-right-01" id="btn_freeze_regenerate" onclick=\"Regenerate.ViewRegenerate();\">Regenerate</button>');
        $("#div_btn").append(input);

        $("#hdr_name").text("Freeze SIP");
        $("#div_sip_information").hide();
        $("#div_add_tie_up").hide();
        $("#div_landing_grid").show();
        $("#div_freeze").hide();
        $("#div_manage").hide();
        $("#div_regenerate").hide();

        $('#grid_search_result').hideCol('selectradio');
        $('#grid_search_result').showCol('selectcheck');

        $('#grid_search_result').hideCol('MemoNumber');
        $('#grid_search_result').showCol('MemoId');
        $('#grid_search_result').showCol('PendingWith');

        sessionStorage.CurrentMenuselected = "nav_freeze";
        SIP.AutoSearch();
    },

    ViewManageSIP: function () {
        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_manage").addClass("active");
        SIP.ToggleBaseContols(true);
        $("#div_btn").empty();
        input = $('<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"SIP.SearchButtonClick();\">Search</button> ' +
            '<button class="btn btn-primary sq-btn mr-right-01" onclick=\"SIP.Viewtoccusers();\" target="_blank">Email</button><button class="btn btn-primary sq-btn mr-right-01" onclick=\"SIP.PrintRackRate();\">Print</button>');
        $("#div_btn").append(input);

        $("#hdr_name").text("Manage SIP");
        $("#div_sip_information").hide();
        $("#div_add_tie_up").hide();
        $("#div_landing_grid").show();
        $("#div_freeze").hide();
        $("#div_manage").hide();
        $("#div_regenerate").hide();

        $('#grid_search_result').hideCol('selectradio');
        $('#grid_search_result').showCol('selectcheck');
        $('#grid_search_result').showCol('MemoNumber');
        $('#grid_search_result').hideCol('MemoId');
        $('#grid_search_result').hideCol('PendingWith');
        sessionStorage.CurrentMenuselected = "nav_manage";
        SIP.AutoSearch();
    },

    masterqueueedit: function () {
        var memono = Utility.GetParameterValues('memono');
        var ptype = Utility.GetParameterValues('ptype');
        var status = Utility.GetParameterValues('status');
        var pagename = Utility.GetParameterValues('ptype');
        if (memono != "" && memono != undefined) {
            if (status != "" && status != undefined) {
                if (ptype != "" && ptype != undefined) {
                    if (ptype == "alert") {
                        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentMemo', '{"PaymentMemoID": ' + memono + '}', "json", false, false, function (result) {
                            var PaymentMemo = result.GetPaymentMemoResult[0];
                            status = PaymentMemo.MemoStatus;
                        });
                    }
                }
                SIP.ViewScreen(memono);
                SIP.generatebutton(status, memono)
            }
            else {
                SIP.BindDetails(memono);
            }

            if (pagename != undefined && pagename == "ss") {
                var value = $(' <button class="btn btn-danger sq-btn fr" id=btn_save_cancel onclick="SIP.CloseScreen();">Cancel</button>');
                $("#div_btn").empty();
                $("#div_btn").append(value);
                $("#div_edit_controls").hide();
            }
        }
    },

    AutoSearch: function () {
        //$('#dd_dist_category').multiselect('clearSelection');
        //var categorySelected = sessionStorage.getItem('DistributorCategory') != null ? sessionStorage.getItem('DistributorCategory').split(",") : '';
        //var channelSelected = sessionStorage.getItem('Channel') != null ? sessionStorage.getItem('Channel').split(",") : '';
        //var Arnselected = sessionStorage.getItem('ARN') != null ? sessionStorage.getItem('ARN').split(",") : '';

        //$('#txt_arn').tokenInput('clear');
        //if (Arnselected != null) {
        //    for (i = 0; i < Arnselected.length ; i++) {
        //        $.each(SIP.arns, function (key, value) {
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
        SIP.SearchSIP();
    },

    ViewScreen: function (PaymentMemoId) {
        var Searchbutton = '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"SIP.SearchButtonClick();\">Search</button>';

        ///For IE 9
        if ($.browser != undefined) {
            if ($.browser.msie && $.browser.version == 9) {
                Searchbutton = "<button id=\"btn_search\" class=\"btn btn-primary sq-btn mr-right-01\" onclick=\"SIP.SearchButtonClick();\">Search</button>";
            }
        }

        var value = $("#div_btn").html().replace(Searchbutton, '<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal"  title="Additional Notes"><img src="../img/file-btn.png"></button>');

        $("#div_btn").empty();
        $("#div_btn").append(value);
        var input = "";
        if (sessionStorage.CurrentMenuselected == "nav_freeze" || sessionStorage.CurrentMenuselected == "nav_manage") {
            input = $('<button class="btn mr-right-01 btn-danger sq-btn" onclick=\"SIP.CloseScreen();\">Cancel</button>');
        }
        else {
            if ($.browser != undefined) {
                if ($.browser.msie && $.browser.version == 9) {
                    if ($("#div_btn").html().search("Submit") > 0) {

                        $('#grid_add_rack_rate').jqGrid('clearGridData');
                        var parameters =
                               {
                                   rowID: 1,
                                   position: "first",
                                   useDefValues: false,
                                   useFormatter: false,
                                   addRowParams: { extraparam: {} }
                               };

                        $("#grid_add_rack_rate").jqGrid('addRow', parameters);
                        $('#grid_add_rack_rate').hideCol('Additional');

                        input = $('<button class=\"btn mr-right-01 btn-success sq-btn\" id=\"btn_save_initiate\" onclick=\"SIP.SaveInitiate();\">Save</button><button class=\"btn mr-right-01 btn-danger sq-btn\" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                    } else {
                        input = $('<button class=\"btn mr-right-01 btn-success sq-btn\" id=\"btn_save_review\" onclick=\"SIP.SaveReview();\">Save</button><button class=\"btn mr-right-01 btn-danger sq-btn\" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                    }
                }
                else {
                    $('#grid_add_rack_rate').jqGrid('clearGridData');
                    var parameters =
                           {
                               rowID: 1,
                               position: "first",
                               useDefValues: false,
                               useFormatter: false,
                               addRowParams: { extraparam: {} }
                           };

                    $("#grid_add_rack_rate").jqGrid('addRow', parameters);
                    $('#grid_add_rack_rate').hideCol('Additional');
                    if ($("#div_btn").html().search("Submit") > 0) {

                        input = $('<button class="btn mr-right-01 btn-success sq-btn" id="btn_save_initiate" onclick=\"SIP.SaveInitiate();\">Save</button><button class="btn mr-right-01 btn-danger sq-btn" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                    } else {
                        input = $('<button class="btn mr-right-01 btn-success sq-btn" id="btn_save_review" onclick=\"SIP.SaveReview();\">Save</button><button class="btn mr-right-01 btn-danger sq-btn" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                    }
                }
            }
            else {
                $('#grid_add_rack_rate').jqGrid('clearGridData');
                var parameters =
                       {
                           rowID: 1,
                           position: "first",
                           useDefValues: false,
                           useFormatter: false,
                           addRowParams: { extraparam: {} }
                       };

                $("#grid_add_rack_rate").jqGrid('addRow', parameters);
                $('#grid_add_rack_rate').hideCol('Additional');
                if ($("#div_btn").html().search("Submit") > 0) {

                    input = $('<button class="btn mr-right-01 btn-success sq-btn" id="btn_save_initiate" onclick=\"SIP.SaveInitiate();\">Save</button><button class="btn mr-right-01 btn-danger sq-btn" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                } else {
                    input = $('<button class="btn mr-right-01 btn-success sq-btn" id="btn_save_review" onclick=\"SIP.SaveReview();\">Save</button><button class="btn mr-right-01 btn-danger sq-btn" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                }
            }
            //if ($("#div_btn").html().search("Submit") > 0) {

            //    input = $('<button class="btn mr-right-01 btn-success" onclick=\"TieUp.SaveInitiate();\">Save</button><button class="btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>');
            //} else {
            //    input = $('<button class="btn mr-right-01 btn-success" onclick=\"TieUp.SaveReview();\">Save</button><button class="btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>');
            //}
        }
        $("#div_btn").append(input);

        $("#lnk_view_remarks").remove();
        input = $('  <a href="#" id="lnk_view_remarks"  data-toggle="modal" data-target="#mdl_view_remark_review" onclick=\"SIP.ViewRemarks();\" class="tt-chk-bx-label flt-right-a mr-right-01" >Remarks History</a>');
        $("#div_remarks").append(input);

        $("#lnk_view_rate_trail").remove();
        input = $('<a href="#" id="lnk_view_rate_trail" data-toggle="modal" data-target="#mdl_view_trail_review" onclick=\"SIP.ViewModifiedRateHistory();\" class="tt-chk-bx-label flt-right-a mr-right-01" >Modified Rate History</a>');
        $("#div_view_rate_trail").append(input);

        $("#div_sip_information").show();

        $("#div_landing_grid").hide();

        //SIP.BindDetails(PaymentMemoId);

        //*************************************************************************************************************************

        var value = "";
        if (sessionStorage.CurrentMenuselected == "nav_review") {
            value = ' <button class="btn btn-danger sq-btn fr" id=btn_save_cancel onclick="SIP.CloseScreen();">Cancel</button>' +
                                '<button class="btn btn-success sq-btn fr" id="btn_save_info" onclick="SIP.SaveReview();">Save</button>' +
                                '<button class="btn btn-success sq-btn fr" id="btn_review_forward" onclick=\"SIP.ReviewForward();\">Forward</button>' +
                '<button class="btn btn-danger sq-btn fr" id="btn_review_reject" onclick=\"SIP.review_Reject();\">Reject</button>' +
                '<button class="btn btn-warning sq-btn fr" id="btn_review_Discard" onclick=\"SIP.review_Discard();\">Discard</button>' +
                '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal" title="Additional Note"><img src="../img/file-btn.png" ></button>' +
                '<button class="btn btn-default fr" data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png" ><span class="remark-count"><span class="remark-count-inner"></span></span></button>';
        }
        else if (sessionStorage.CurrentMenuselected == "nav_approval") {
            value = $(' <button class="btn btn-danger sq-btn fr" id=btn_save_cancel onclick="SIP.CloseScreen();">Cancel</button>' +
                                '<button class="btn btn-success sq-btn fr" id="btn_save_info" onclick="SIP.SaveReview();">Save</button>' +
                                '<button class="btn btn-success sq-btn fr" id="btn_review_forward" onclick=\"SIP.SIPApproval();\">Approve</button>' +
                  '<button class="btn btn-danger sq-btn fr" id="btn_review_reject" onclick=\"SIP.ApprovalReject();\">Reject</button>' +
                  '<button class="btn btn-warning sq-btn fr" id="btn_review_Discard" onclick=\"SIP.ApprovalDiscard();\">Discard</button>' +
                  '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal" title="Additional Note"><img src="../img/file-btn.png" ></button>' +
                '<button class="btn btn-default fr" data-toggle="modal" onclick=\"SIP.OpenRemarks();\" title="Remarks"><img src="../img/comment-btn.png" ><span class="remark-count"><span class="remark-count-inner"></span></span></button>');
        }
        else if (sessionStorage.CurrentMenuselected == "nav_freeze") {
            value = $(' <button class="btn btn-danger sq-btn fr" id=btn_save_cancel onclick="SIP.CloseScreen();">Cancel</button>' +
                            '<button id="btn_freeze_Discard" href="#div_remarks" class="btn btn-warning  sq-btn fr"  onclick=\"SIP.FreezeDiscard();\">Discard</button>' +
             '<button class="btn btn-success  sq-btn fr" id="btn_freeze_freeze" onclick=\"SIP.SIPFreeze();\">Freeze</button>' +
                              '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal" title="Additional Note"><img src="../img/file-btn.png" ></button>' +
                            '<button class="btn btn-default fr" data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png" ><span class="remark-count"><span class="remark-count-inner"></span></span></button>');
        }
        else if (sessionStorage.CurrentMenuselected == "nav_initiate") {
            value = $(' <button class="btn btn-danger sq-btn fr" id=btn_save_cancel onclick="SIP.CloseScreen();">Cancel</button>' +
                               '<button class="btn btn-success sq-btn fr" id="btn_save_info" onclick="SIP.SaveInitiate();">Save</button>' +
                               '<button class="btn btn-warning sq-btn fr" onclick="SIP.InitiateSubmit();">Submit</button>' +
                               '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                               '<button class="btn btn-default fr" data-toggle="modal" data-target="#myModal123" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>');

        }
        $("#div_btn").empty();
        $("#div_btn").append(value);

        $("#div_content").show();

        $("#div_landing_grid").hide();


        SIP.BindDetails(PaymentMemoId);

        if (sessionStorage.MemoStatus == "Initiated") {
            var ModifiedbyRole;
            var createdbyRole;
            var RoleID = sessionStorage.getItem("RoleID");
            if (RoleID == "2" || RoleID == "4" || RoleID == "3") {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetViewAction', JSON.stringify({ PaymentMemoID: $('#hidden_payment_memo_id').val(), MemoTypeID: 5 }), "json", false, false, function (result) {
                    var arrItems = result.GetViewActionResult;
                    ModifiedbyRole = arrItems.ModifiedByRole;
                    createdbyRole = arrItems.CreatedByRole;
                });

                if (ModifiedbyRole == RoleID && createdbyRole == RoleID) {
                    $("#div_btn").empty();

                    var input = $('<button class="btn mr-right-01 btn-danger" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                    $("#div_btn").append(input);
                }
            }
        }



    },

    BindDetails: function (paymemtMemoId) {
        SIP.ShowInformation = true; //temp assignment
        // $('#div_landing_grid').show();

        if (paymemtMemoId != "") {
            var PaymentList = [];
            //$('#btn_save_info').attr('disabled', 'disabled')
            $("#hidden_payment_memo_id").val(paymemtMemoId);
            $("#hidden_copied_payment_memo_id").val("0");
            var objList = [];
            $('#div_sip_Controls').empty();

            $("#txt_arn_info").tokenInput('clear');
            $('#dd_dist_category_info').multiselect('clearSelection');

            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetTieUpARNCategory', '{"PaymentMemoID": ' + $("#hidden_payment_memo_id").val() + '}', "json", false, false, function (result) {
                var resultdata = result.GetTieUpARNCategoryResult;
                $.each(resultdata, function (cnt, data) {
                    if (data.ARNNO == "") {
                        $('#dd_dist_category_info').multiselect('select', data.DistributorCategoryId);
                    }
                    else {

                        $.each(SIP.arns, function (key, value) {
                            if (value.name == data.ARNNO) {
                                $("#txt_arn_info").tokenInput("add", { id: value.id, name: value.name });
                            }
                        });
                    }
                });
            });
            SIP.TempMemoNumber = '';
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentMemo', '{"PaymentMemoID": ' + paymemtMemoId + '}', "json", false, false, function (result) {
                if (result.GetPaymentMemoResult.length > 0) {
                    var PaymentMemo = result.GetPaymentMemoResult[0];
                    SIP.TempMemoNumber = PaymentMemo.MemoNumber;

                    if (PaymentMemo.MemoStatus == "Saved") {
                        $("#txt_remarks").val("");
                    } else {
                        $("#txt_remarks").val("");
                    }
                    $('#chk_sip').prop('checked', false);
                    $('#chk_stp').prop('checked', false);
                    TransactionType = PaymentMemo.TransactionType.split(",");
                    $.each(TransactionType, function (key, value) {
                        switch (value) {
                            case "5":
                                $('#chk_sip').prop('checked', true);
                                break;
                            case "6":
                                $('#chk_stp').prop('checked', true);
                                break;
                        }
                    });
                    $("#txt_additional_notes").text(PaymentMemo.Comments);
                    $("#txt_sip_notes").val(PaymentMemo.SIPNotes);
                    $("#dt_from").val(PaymentMemo.DateFrom);
                    $("#dt_to").val(PaymentMemo.DateTo);
                    sessionStorage.setItem("MemoStatus", PaymentMemo.MemoStatus);
                    sessionStorage.setItem("LoginUserId", PaymentMemo.LoginId);
                }
            });

            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentListAll', '{"PaymentMemoID": ' + paymemtMemoId + '}', "json", false, false, function (result) {
                var paymentList = result.GetPaymentListAllResult;
                SIP.TempPaymentList = [];
                SIP.TempPaymentList = paymentList;
            });

            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentListSIP', '{"PaymentMemoID": ' + paymemtMemoId + '}', "json", false, false, function (result) {
                var paymentList = result.GetPaymentListSIPResult;
                SIP.DetailCount = paymentList.length;
                if (paymentList.length > 0) {
                    SIP.NextSIPRowId = paymentList[paymentList.length - 1].SIPRowId;

                    //load payment list grid
                    SIP.ClearhtmlSIPControls();
                    for (resultIndex = 0; resultIndex < paymentList.length; resultIndex++) {
                        var rowCount = $("#tblSIPData tr.sip-row").length;
                        if (resultIndex > 0) {
                            var row = {};
                            row[resultIndex] = SIP.htmlSIPControls(paymentList[resultIndex].SIPRowId);
                            $('#tblSIPData tr:last').after(row[resultIndex]);


                        }
                        SIP.loadSchemeCategory('#dd_scheme_category_' + paymentList[resultIndex].SIPRowId + '', "");
                        SIP.loadScheme('#dd_scheme_' + paymentList[resultIndex].SIPRowId + '', paymentList[resultIndex].SchemeCategoryId);
                        rowCurrent = $($("#tblSIPData tr.sip-row")[resultIndex]);
                        var column = $(rowCurrent).find('td');

                        var schemeCategory = column[0];
                        var RowId = column[0];
                        var scheme = column[1];
                        var installment = column[2];
                        var tenure = column[3];
                        var upfront = column[4];
                        var upfrontvalue = column[5];
                        var calculation = column[6];
                        var paymentType = column[7];
                        var clawback = column[8];
                        var sipIncentiveRemarks = column[9];

                        element = {};
                        element["SIPRowId"] = paymentList[resultIndex].SIPRowId;
                        element["PaymentListId"] = paymentList[resultIndex].PaymentListId; //$('#hidden_payment_list_id_' + cnt + '').val();
                        element["SchemeName"] = paymentList[resultIndex].SchemeName;
                        element["SchemeId"] = paymentList[resultIndex].SchemeId;
                        element["SchemeCategoryName"] = paymentList[resultIndex].SchemeCategoryName,
                        element["SchemeCategoryId"] = paymentList[resultIndex].SchemeCategoryId;
                        element["DistributorCategoryId"] = paymentList[resultIndex].DistributorCategoryId;
                        element["PaymentMemoId"] = paymentList[resultIndex].PaymentMemoId;
                        element["PaymentType"] = paymentList[resultIndex].PaymentType;
                        element["ARNNO"] = paymentList[resultIndex].ARNNO;
                        element["ARNName"] = paymentList[resultIndex].ARNName;
                        element["DateFrom"] = paymentList[resultIndex].DateFrom;
                        element["DateTo"] = paymentList[resultIndex].DateTo;
                        element["SlabType"] = paymentList[resultIndex].SlabType;
                        element["SlabAmount"] = paymentList[resultIndex].SlabAmount;
                        element["PaymentBasis"] = paymentList[resultIndex].PaymentBasis;
                        element["Target"] = paymentList[resultIndex].Target;
                        element["TargetPeriod"] = paymentList[resultIndex].TargetPeriod;
                        element["InstallmentCondition"] = paymentList[resultIndex].InstallmentCondition; //.replace("<span class=\"caret\"></span>", "");
                        element["InstallmentRangeFrom"] = paymentList[resultIndex].InstallmentRangeFrom;
                        element["InstallmentRangeTo"] = paymentList[resultIndex].InstallmentRangeTo;
                        element["TenureCondition"] = paymentList[resultIndex].TenureCondition; //.replace("<span class=\"caret\"></span>", "");
                        element["TenureMonths"] = paymentList[resultIndex].TenureMonths;
                        element["UpfrontPaymentType"] = paymentList[resultIndex].UpfrontPaymentType; //.replace("<span class=\"caret\"></span>", "");
                        element["UpfrontValue"] = paymentList[resultIndex].UpfrontValue;
                        element["Calculation"] = paymentList[resultIndex].Calculation;
                        element["Clawback"] = paymentList[resultIndex].Clawback;
                        element["SIPIncentiveRemarks"] = paymentList[resultIndex].SIPIncentiveRemarks;

                        if (resultIndex == 0) {
                            //$("#dd_sip_target option:selected").val();
                            $('#txt_sip').val(element["Target"]);
                            $('#txt_sip_month').val(element["TargetPeriod"]);
                            if (element["Target"] != "0") {
                                $('#dd_sip_target').val(0);
                                $('#txt_sip').removeAttr('disabled')
                                $('#txt_sip_month').removeAttr('disabled')
                            }
                            else {
                                $('#dd_sip_target').val(1);
                                $('#txt_sip').attr('disabled', 'disabled')
                                $('#txt_sip_month').attr('disabled', 'disabled')
                            }
                        }

                        $(RowId).find("input[name$='SIPRowId']").val(element["SIPRowId"]);
                        $(schemeCategory).find('.btn-group button').attr('title', element["SchemeCategoryName"]);
                        $(scheme).find('.btn-group button').attr('title', element["SchemeName"]);
                        $(installment).find("select[name$='installment-expression']").val(element["InstallmentCondition"]);
                        $(installment).find("input[name$='installment-amount-from']").val(element["InstallmentRangeFrom"]);
                        $(installment).find("input[name$='installment-amount-to']").val(element["InstallmentRangeTo"]);
                        $(tenure).find("select[name$='tenure-expression']").val(element["TenureCondition"]);
                        $(tenure).find("input[name$='tenure-month']").val(element["TenureMonths"]);
                        $(upfront).find("select[name$='upfront-expression']").val(element["UpfrontPaymentType"]);
                        $(upfrontvalue).find("input[name$='upfront-value']").val(element["UpfrontValue"]);
                        $(calculation).find("input[name$='calculated-value']").val(element["Calculation"]);
                        $(paymentType).find("input").val(element["PaymentType"]);
                        $(clawback).find("input[name$='clawback-value']").val(element["Clawback"]);
                        $(sipIncentiveRemarks).find("input[name$='sipincentiveremarks-value']").val(element["SIPIncentiveRemarks"]);
                        if (element["TenureCondition"] == "Any") {
                            $(tenure).find("input[name$='tenure-month']").val(0);
                            $(tenure).find("input[name$='tenure-month']").attr('disabled', 'disabled');
                        }

                        // automatic scheme category & scheme selection
                        var schemeCategoryOpts = $(schemeCategory).find('select')[0].options;
                        var schemeOpts = $(scheme).find('select')[0].options;

                        var schemecatarr = element["SchemeCategoryId"].split(',');
                        var schemearr = element["SchemeId"].split(',');


                        for (var sc = 0; sc < schemecatarr.length; sc++) {
                            if (schemecatarr[sc] != "")
                                $('#dd_scheme_category_' + paymentList[resultIndex].SIPRowId).multiselect('select', schemecatarr[sc]);
                        }
                        for (var sc = 0; sc < schemearr.length; sc++) {
                            if (schemearr[sc] != "")
                                $('#dd_scheme_' + paymentList[resultIndex].SIPRowId).multiselect('select', schemearr[sc]);
                        }

                        var UpfrontValue = paymentList[resultIndex].UpfrontPaymentType;


                        var tbl_sip_rowid = parseInt(paymentList[resultIndex].SIPRowId);

                        if (UpfrontValue == "Application based") {
                            $('#txt_upfront_value_' + tbl_sip_rowid).unbind('keypress');
                            $('#txt_upfront_value_' + tbl_sip_rowid).removeClass("numberonly");
                            $('#txt_upfront_value_' + tbl_sip_rowid).removeClass("number2-02");
                            $('#txt_upfront_value_' + tbl_sip_rowid).addClass("numberonly");
                            $('#txt_upfront_value_' + tbl_sip_rowid).attr('maxLength', 6);
                        }
                        if (UpfrontValue == "Tenure based" || UpfrontValue == "Installment based") {
                            $('#txt_upfront_value_' + tbl_sip_rowid).unbind('keypress');
                            $('#txt_upfront_value_' + tbl_sip_rowid).removeClass("number2-02");
                            $('#txt_upfront_value_' + tbl_sip_rowid).removeClass("numberonly");
                            $('#txt_upfront_value_' + tbl_sip_rowid).addClass("number2-02");
                            $('#txt_upfront_value_' + tbl_sip_rowid).removeAttr('maxLength');
                        }

                        Utility.AllowDecimal();
                        SIP.TenureDropdownOnChange(tbl_sip_rowid);

                    }
                }
            });
            Utility.AllowDecimal();
            var mode = Utility.GetParameterValues('mode');
            if (mode != null) {
                if (mode == "copy") {
                    $("#hidden_copied_payment_memo_id").val($("#hidden_payment_memo_id").val());
                    $("#hidden_payment_memo_id").val(0);
                    $('#btn_save_info').prop('disabled', false);
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
                    // $("#dt_to").datepicker("option", "minDate", tomindate);
                    //$("#dt_to").focus();
                }
            });

            $("#dt_to").datepicker({
                dateFormat: 'dd/mm/y',
                changeMonth: true,
                changeYear: true,
                //maxDate: maxdate,
            });

            //$("#dt_to").datepicker("option", "minDate", $("#dt_from").val());

            SIP.ViewRemarks();
        }
        else {
            Utility.writeNotification("warning", "Invalid Payment Memo ID", "", true);
        }
        if (sessionStorage.CurrentMenuselected == "nav_freeze") {
            SIP.DisableControlsOnView(true);
        }
    },

    DisableControlsOnView: function (val) {
        $('#txt_remarks').prop('disabled', val);
        $('#txt_additional_notes').prop('disabled', val);
        $('#txt_sip_notes').prop('disabled', val);


        if (val == true) {

            $('#btn_add_new_rack').hide();
            $('#div_sip_information').find('input, textarea, button, select').attr("disabled", "disabled");
            $('#tblSIPData').find('input, textarea, button, select').attr("disabled", "disabled");
        }
        else {
            $('#btn_add_new_rack').show();
            $('#div_sip_information').find('input, textarea, button, select').removeAttr("disabled");
            $('#tblSIPData').find('input, textarea, button, select').removeAttr("disabled");
        }


        SIP.ToggleBaseContols(val);
    },

    generatebutton: function (status, memoid) {
        var navmenu = $('.btm-nav-ul').html();
        var user = sessionStorage.LoginId;
        var RoleID = sessionStorage.getItem("RoleID");
        var ModifiedbyRole;
        var ApprovalRoleID = 0;
        var MemoIsApproved = '';
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetViewAction', JSON.stringify({ PaymentMemoID: memoid, MemoTypeID: 5 }), "json", false, false, function (result) {
            var arrItems = result.GetViewActionResult;
            ModifiedbyRole = arrItems.ModifiedByRole;
            ApprovalRoleID = arrItems.ApprovalRoleID;
            MemoIsApproved = arrItems.MemoLevel;
        });
        var pagename = Utility.GetParameterValues('ptype');
        //Based On issue #10
        if (pagename == 'cr') {
            sessionStorage.CurrentMenuselected = "nav_information";
            $("ul.btm-nav-ul li").removeClass("active");
            $(".btm-nav-ul-li-nav_information").addClass("active");
            $("#btn_reorder").hide();
            $("#div_btn").empty();
            $('#btn_save_review').attr('disabled', 'disabled');
            //$('#btn_save_info').attr('disabled', 'disabled');

            var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');

            $("#div_btn").append(input);
            return false;
        }

        //Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetViewAction', JSON.stringify({ PaymentMemoID: memoid, MemoTypeID: 5 }), "json", false, false, function (result) {
        //    var arrItems = result.GetViewActionResult;
        //    ModifiedbyRole = arrItems.ModifiedByRole;
        //});
        Utility.ServiceCall("POST", 'AuthorizationService.svc/GetUserModuleMenu', JSON.stringify({ UserID: sessionStorage.LoginId, MainMenuID: 5, _commandText: "GET_USER_MENU_RIGHTS" }), "json", false, false, function (result) {
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
                                    $("ul.btm-nav-ul li").removeClass("active");
                                    $(".btm-nav-ul-li-nav_information").addClass("active");
                                    $("#btn_reorder").hide();
                                    $("#btn_delete").hide();
                                    //SIP.hidecheckbox();
                                    $("#div_btn").empty();
                                    //$('#btn_save_review').attr('disabled', 'disabled');
                                    //$('#btn_save_info').attr('disabled', 'disabled');

                                    var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                        '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');
                                    $("#div_btn").append(input);
                                    $("#div_edit_controls").hide();
                                    SIP.DisableControlsOnView(true);
                                }
                                else {
                                    sessionStorage.CurrentMenuselected = "nav_initiate";
                                    $("ul.btm-nav-ul li").removeClass("active");
                                    $(".btm-nav-ul-li-nav_initiate").addClass("active");
                                    $("#div_btn").empty();
                                    var input = $('<button class="btn mr-right-01 btn-warning sq-btn" onclick=\"SIP.InitiateSubmit();\">Submit</button>');
                                    $("#div_btn").append(input);
                                    if ($.browser.msie && $.browser.version == 9) {
                                        input = $('<button class=\"btn mr-right-01 btn-success sq-btn\" id=\"btn_save_initiate\" onclick=\"SIP.SaveInitiate();\">Save</button><button class=\"btn mr-right-01 btn-danger sq-btn\" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                    } else {
                                        input = $('<button class="btn mr-right-01 btn-success sq-btn" id="btn_save_initiate" onclick=\"SIP.SaveInitiate();\">Save</button><button class="btn mr-right-01 btn-danger sq-btn" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                    }
                                    SIP.ToggleBaseContols(false);
                                    $("#div_btn").append(input);
                                }
                            }
                            else {
                                sessionStorage.CurrentMenuselected = "nav_information";
                                $("ul.btm-nav-ul li").removeClass("active");
                                $(".btm-nav-ul-li-nav_information").addClass("active");
                                $("#btn_reorder").hide();
                                $("#btn_delete").hide();
                                //SIP.hidecheckbox();
                                $("#div_btn").empty();


                                var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                    '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');
                                $("#div_btn").append(input);
                                $("#div_edit_controls").hide();
                                SIP.DisableControlsOnView(true);
                            }
                            break;
                        }
                    case "Initiated":
                        {
                            if (ModifiedbyRole <= RoleID) {
                                if (jQuery.inArray('nav_review', menuarr) > -1) {
                                    sessionStorage.CurrentMenuselected = "nav_review";
                                    $("ul.btm-nav-ul li").removeClass("active");
                                    $(".btm-nav-ul-li-nav_review").addClass("active");
                                    $("#div_btn").empty();

                                    input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                        '<button class="btn btn-warning sq-btn mr-right-01" id="btn_review_Discard" onclick=\"SIP.review_Discard();\">Discard</button>' +
                                                '<button class="btn btn-danger sq-btn mr-right-01" id="btn_review_reject" onclick=\"SIP.review_Reject();\">Reject</button>' +
                                                '<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"SIP.ReviewForward();\">Forward</button>');
                                    $("#div_btn").append(input);

                                    if ($.browser.msie && $.browser.version == 9) {
                                        input = $('<button class=\"btn mr-right-01 btn-success sq-btn\" id=\"btn_save_review\" onclick=\"SIP.SaveReview();\">Save</button><button class=\"btn mr-right-01 btn-danger sq-btn\" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                    } else {
                                        input = $('<button class="btn mr-right-01 btn-success sq-btn" id="btn_save_review" onclick=\"SIP.SaveReview();\">Save</button><button class="btn mr-right-01 btn-danger sq-btn" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                    }
                                    SIP.ToggleBaseContols(true);
                                    $("#div_btn").append(input);
                                }
                                else {
                                    sessionStorage.CurrentMenuselected = "nav_information";
                                    $("ul.btm-nav-ul li").removeClass("active");
                                    $(".btm-nav-ul-li-nav_information").addClass("active");
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();

                                    var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                        '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');

                                    SIP.DisableControlsOnView(true);
                                    $("#div_btn").append(input);
                                }
                            }
                            else {
                                if (RoleID == "10") {
                                    if (jQuery.inArray('nav_review', menuarr) > -1) {
                                        sessionStorage.CurrentMenuselected = "nav_review";
                                        $("ul.btm-nav-ul li").removeClass("active");
                                        $(".btm-nav-ul-li-nav_review").addClass("active");
                                        $("#div_btn").empty();

                                        input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                            '<button class="btn btn-warning sq-btn mr-right-01" id="btn_review_Discard" onclick=\"SIP.review_Discard();\">Discard</button>' +
                                                    '<button class="btn btn-danger sq-btn mr-right-01" id="btn_review_reject" onclick=\"SIP.review_Reject();\">Reject</button>' +
                                                    '<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"SIP.ReviewForward();\">Forward</button>');
                                        $("#div_btn").append(input);

                                        if ($.browser.msie && $.browser.version == 9) {
                                            input = $('<button class=\"btn mr-right-01 btn-success sq-btn\" id=\"btn_save_review\" onclick=\"SIP.SaveReview();\">Save</button><button class=\"btn mr-right-01 btn-danger sq-btn\" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                        } else {
                                            input = $('<button class="btn mr-right-01 btn-success sq-btn" id="btn_save_review" onclick=\"SIP.SaveReview();\">Save</button><button class="btn mr-right-01 btn-danger sq-btn" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                        }
                                        SIP.ToggleBaseContols(true);
                                        $("#div_btn").append(input);
                                    }
                                    else {
                                        sessionStorage.CurrentMenuselected = "nav_information";
                                        $("ul.btm-nav-ul li").removeClass("active");
                                        $(".btm-nav-ul-li-nav_information").addClass("active");
                                        $("#btn_reorder").hide();
                                        $("#div_btn").empty();


                                        var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                            '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');

                                        SIP.DisableControlsOnView(true);
                                        $("#div_btn").append(input);
                                    }
                                }
                                else {
                                    sessionStorage.CurrentMenuselected = "nav_information";
                                    $("ul.btm-nav-ul li").removeClass("active");
                                    $(".btm-nav-ul-li-nav_information").addClass("active");
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();

                                    var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                        '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');

                                    SIP.DisableControlsOnView(true);
                                    $("#div_btn").append(input);
                                }
                            }
                            break;
                        }
                    case "Reviewed":
                        {
                            if (ModifiedbyRole < RoleID) {
                                if (jQuery.inArray('nav_review', menuarr) > -1) {
                                    sessionStorage.CurrentMenuselected = "nav_review";
                                    $("ul.btm-nav-ul li").removeClass("active");
                                    $(".btm-nav-ul-li-nav_review").addClass("active");
                                    $("#div_btn").empty();
                                    input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                        '<button class="btn btn-warning sq-btn mr-right-01" id="btn_review_Discard" onclick=\"SIP.review_Discard();\">Discard</button>' +
                                            '<button class="btn btn-danger sq-btn mr-right-01" id="btn_review_reject" onclick=\"SIP.review_Reject();\">Reject</button>' +
                                            '<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"SIP.ReviewForward();\">Forward</button>');
                                    $("#div_btn").append(input);

                                    if ($.browser.msie && $.browser.version == 9) {
                                        input = $('<button class=\"btn mr-right-01 btn-success sq-btn\" id=\"btn_save_review\" onclick=\"SIP.SaveReview();\">Save</button><button class=\"btn mr-right-01 btn-danger sq-btn\" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                    } else {
                                        input = $('<button class="btn mr-right-01 btn-success sq-btn" id="btn_save_review" onclick=\"SIP.SaveReview();\">Save</button><button class="btn mr-right-01 btn-danger sq-btn" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                    }
                                    SIP.ToggleBaseContols(true);
                                    $("#div_btn").append(input);
                                }
                                else if (jQuery.inArray('nav_approval', menuarr) > -1) {
                                    sessionStorage.CurrentMenuselected = "nav_approval";
                                    $("ul.btm-nav-ul li").removeClass("active");
                                    $(".btm-nav-ul-li-nav_approval").addClass("active");
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();

                                    input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                        '<button class="btn btn-warning sq-btn mr-right-01" id ="btn_approval_Discard" onclick=\"SIP.ApprovalDiscard();\">Discard</button>' +
                                                 '<button class="btn btn-danger sq-btn mr-right-01" id ="btn_approval_reject" onclick=\"SIP.ApprovalReject();\">Reject</button>' +
                                                 '<button class="btn btn-success sq-btn mr-right-01" id ="btn_approval_approve" onclick=\"SIP.SIPApproval();\">Approve</button>');
                                    $("#div_btn").append(input);

                                    if ($.browser.msie && $.browser.version == 9) {
                                        input = $('<button class=\"btn mr-right-01 btn-success sq-btn\" id=\"btn_save_review\" onclick=\"SIP.SaveReview();\">Save</button><button class=\"btn mr-right-01 btn-danger sq-btn\" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                    } else {
                                        input = $('<button class="btn mr-right-01 btn-success sq-btn" id="btn_save_review" onclick=\"SIP.SaveReview();\">Save</button><button class="btn mr-right-01 btn-danger sq-btn" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                    }
                                    SIP.ToggleBaseContols(true);
                                    $("#div_btn").append(input);
                                }
                                else {
                                    sessionStorage.CurrentMenuselected = "nav_information";
                                    $("ul.btm-nav-ul li").removeClass("active");
                                    $(".btm-nav-ul-li-nav_information").addClass("active");
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();

                                    var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                        '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');

                                    SIP.DisableControlsOnView(true);
                                    $("#div_btn").append(input);
                                }
                            }
                            else if (ModifiedbyRole == RoleID || RoleID >= 6) {

                                if (jQuery.inArray('nav_approval', menuarr) > -1) {
                                    sessionStorage.CurrentMenuselected = "nav_approval";
                                    $("ul.btm-nav-ul li").removeClass("active");
                                    $(".btm-nav-ul-li-nav_approval").addClass("active");
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();

                                    input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                        '<button class="btn btn-warning sq-btn mr-right-01" id ="btn_approval_Discard" onclick=\"SIP.ApprovalDiscard();\">Discard</button>' +
                                                 '<button class="btn btn-danger sq-btn mr-right-01" id ="btn_approval_reject" onclick=\"SIP.ApprovalReject();\">Reject</button>' +
                                                 '<button class="btn btn-success sq-btn mr-right-01" id ="btn_approval_approve" onclick=\"SIP.SIPApproval();\">Approve</button>');
                                    $("#div_btn").append(input);

                                    if ($.browser.msie && $.browser.version == 9) {
                                        input = $('<button class=\"btn mr-right-01 btn-success sq-btn\" id=\"btn_save_review\" onclick=\"SIP.SaveReview();\">Save</button><button class=\"btn mr-right-01 btn-danger sq-btn\" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                    } else {
                                        input = $('<button class="btn mr-right-01 btn-success sq-btn" id="btn_save_review" onclick=\"SIP.SaveReview();\">Save</button><button class="btn mr-right-01 btn-danger sq-btn" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                    }
                                    SIP.ToggleBaseContols(true);
                                    $("#div_btn").append(input);
                                }
                                else {
                                    if (RoleID == "10" && ApprovalRoleID >= "6") {
                                        sessionStorage.CurrentMenuselected = "nav_information";
                                        $("ul.btm-nav-ul li").removeClass("active");
                                        $(".btm-nav-ul-li-nav_information").addClass("active");
                                        $("#btn_reorder").hide();
                                        //RackRate.hidecheckbox();
                                        $("#div_btn").empty();

                                        var input = $('<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"SIP.ReviewForward();\">Re-allocate</button> <button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');
                                        $("#div_btn").append(input);
                                        SIP.ToggleBaseContols(true);
                                        //RackRate.DisableControlsOnView(true);
                                    }
                                    else if (RoleID == "10" && ApprovalRoleID == "0") {
                                        if (jQuery.inArray('nav_review', menuarr) > -1) {
                                            sessionStorage.CurrentMenuselected = "nav_review";
                                            $("ul.btm-nav-ul li").removeClass("active");
                                            $(".btm-nav-ul-li-nav_review").addClass("active");
                                            $("#div_btn").empty();
                                            input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                                '<button class="btn btn-warning sq-btn mr-right-01" id="btn_review_Discard" onclick=\"SIP.review_Discard();\">Discard</button>' +
                                                    '<button class="btn btn-danger sq-btn mr-right-01" id="btn_review_reject" onclick=\"SIP.review_Reject();\">Reject</button>' +
                                                    '<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"SIP.ReviewForward();\">Forward</button>');
                                            $("#div_btn").append(input);

                                            if ($.browser.msie && $.browser.version == 9) {
                                                input = $('<button class=\"btn mr-right-01 btn-success sq-btn\" id=\"btn_save_review\" onclick=\"SIP.SaveReview();\">Save</button><button class=\"btn mr-right-01 btn-danger sq-btn\" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                            } else {
                                                input = $('<button class="btn mr-right-01 btn-success sq-btn" id="btn_save_review" onclick=\"SIP.SaveReview();\">Save</button><button class="btn mr-right-01 btn-danger sq-btn" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                            }
                                            SIP.ToggleBaseContols(true);
                                            $("#div_btn").append(input);
                                        }
                                        else {
                                            sessionStorage.CurrentMenuselected = "nav_information";
                                            $("ul.btm-nav-ul li").removeClass("active");
                                            $(".btm-nav-ul-li-nav_information").addClass("active");
                                            $("#btn_reorder").hide();
                                            $("#div_btn").empty();

                                            var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                                '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');
                                            SIP.DisableControlsOnView(true);

                                            $("#div_btn").append(input);
                                        }
                                    }
                                    else {
                                        sessionStorage.CurrentMenuselected = "nav_information";
                                        $("ul.btm-nav-ul li").removeClass("active");
                                        $(".btm-nav-ul-li-nav_information").addClass("active");
                                        $("#btn_reorder").hide();
                                        $("#div_btn").empty();

                                        var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                            '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');
                                        SIP.DisableControlsOnView(true);

                                        $("#div_btn").append(input);
                                    }

                                }
                            }
                            else if (ModifiedbyRole <= 4 && (RoleID == "3" || RoleID == "10")) {
                                if (jQuery.inArray('nav_review', menuarr) > -1) {
                                    sessionStorage.CurrentMenuselected = "nav_review";
                                    $("ul.btm-nav-ul li").removeClass("active");
                                    $(".btm-nav-ul-li-nav_review").addClass("active");
                                    $("#div_btn").empty();
                                    input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                        '<button class="btn btn-warning sq-btn mr-right-01" id="btn_review_Discard" onclick=\"SIP.review_Discard();\">Discard</button>' +
                                      '<button class="btn btn-danger sq-btn mr-right-01" id="btn_review_reject" onclick=\"SIP.review_Reject();\">Reject</button>' +
                                      '<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"SIP.ReviewForward();\">Forward</button>');
                                    $("#div_btn").append(input);

                                    if ($.browser.msie && $.browser.version == 9) {
                                        input = $('<button class=\"btn mr-right-01 btn-success sq-btn\" id=\"btn_save_review\" onclick=\"SIP.SaveReview();\">Save</button><button class=\"btn mr-right-01 btn-danger sq-btn\" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                    } else {
                                        input = $('<button class="btn mr-right-01 btn-success sq-btn" id="btn_save_review" onclick=\"SIP.SaveReview();\">Save</button><button class="btn mr-right-01 btn-danger sq-btn" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                    }
                                    SIP.ToggleBaseContols(true);
                                    $("#div_btn").append(input);
                                }
                                //else {
                                //    sessionStorage.CurrentMenuselected = "nav_information";
                                //    $("ul.btm-nav-ul li").removeClass("active");
                                //    $(".btm-nav-ul-li-nav_information").addClass("active");
                                //    $("#btn_reorder").hide();
                                //    $("#div_btn").empty();


                                //    var input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');
                                //    SIP.DisableControlsOnView(true);
                                //    $("#div_btn").append(input);
                                //}
                            }
                            else if (ModifiedbyRole > 5 && (RoleID == "3" || RoleID == "10")) {
                                if (jQuery.inArray('nav_approval', menuarr) > -1) {
                                    sessionStorage.CurrentMenuselected = "nav_approval";
                                    $("ul.btm-nav-ul li").removeClass("active");
                                    $(".btm-nav-ul-li-nav_approval").addClass("active");
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();

                                    input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                        '<button class="btn btn-warning sq-btn mr-right-01" id ="btn_approval_Discard" onclick=\"SIP.ApprovalDiscard();\">Discard</button>' +
                                                   '<button class="btn btn-danger sq-btn mr-right-01" id ="btn_approval_reject" onclick=\"SIP.ApprovalReject();\">Reject</button>' +
                                                   '<button class="btn btn-success sq-btn mr-right-01" id ="btn_approval_approve" onclick=\"SIP.SIPApproval();\">Approve</button>');
                                    $("#div_btn").append(input);

                                    if ($.browser.msie && $.browser.version == 9) {
                                        input = $('<button class=\"btn mr-right-01 btn-success sq-btn\" id=\"btn_save_review\" onclick=\"SIP.SaveReview();\">Save</button><button class=\"btn mr-right-01 btn-danger sq-btn\" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                    } else {
                                        input = $('<button class="btn mr-right-01 btn-success sq-btn" id="btn_save_review" onclick=\"SIP.SaveReview();\">Save</button><button class="btn mr-right-01 btn-danger sq-btn" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                    }
                                    SIP.ToggleBaseContols(true);
                                    $("#div_btn").append(input);
                                }
                            }
                            else {
                                sessionStorage.CurrentMenuselected = "nav_information";
                                $("ul.btm-nav-ul li").removeClass("active");
                                $(".btm-nav-ul-li-nav_information").addClass("active");
                                $("#btn_reorder").hide();
                                $("#div_btn").empty();


                                var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                    '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');
                                SIP.DisableControlsOnView(true);
                                $("#div_btn").append(input);
                            }
                            //}
                            //else {
                            //    sessionStorage.CurrentMenuselected = "nav_information";
                            //    $("ul.btm-nav-ul li").removeClass("active");
                            //    $(".btm-nav-ul-li-nav_information").addClass("active");
                            //    $("#btn_reorder").hide();
                            //    $("#div_btn").empty();

                            //    $('#btn_save_review').attr('disabled', 'disabled');
                            //    //$('#btn_save_info').attr('disabled', 'disabled');

                            //    var input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');
                            //    SIP.DisableControlsOnView(true);
                            //    $("#div_btn").append(input);
                            //}
                            break;
                        }
                    case "Approved":
                        {
                            if (ModifiedbyRole < RoleID) {
                                if (jQuery.inArray('nav_approval', menuarr) > -1) {
                                    if (ModifiedbyRole <= "6") {
                                        sessionStorage.CurrentMenuselected = "nav_approval";
                                        $("ul.btm-nav-ul li").removeClass("active");
                                        $(".btm-nav-ul-li-nav_approval").addClass("active");
                                        $("#btn_reorder").hide();
                                        $("#div_btn").empty();

                                        input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                            '<button class="btn btn-warning sq-btn mr-right-01" id ="btn_approval_Discard" onclick=\"SIP.ApprovalDiscard();\">Discard</button>' +
                                                      '<button class="btn btn-danger sq-btn mr-right-01" id ="btn_approval_reject" onclick=\"SIP.ApprovalReject();\">Reject</button>' +
                                                      '<button class="btn btn-success sq-btn mr-right-01" id ="btn_approval_approve" onclick=\"SIP.SIPApproval();\">Approve</button>');
                                        $("#div_btn").append(input);

                                        if ($.browser.msie && $.browser.version == 9) {
                                            input = $('<button class=\"btn mr-right-01 btn-success sq-btn\" id=\"btn_save_review\" onclick=\"SIP.SaveReview();\">Save</button><button class=\"btn mr-right-01 btn-danger sq-btn\" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                        } else {
                                            input = $('<button class="btn mr-right-01 btn-success sq-btn" id="btn_save_review" onclick=\"SIP.SaveReview();\">Save</button><button class="btn mr-right-01 btn-danger sq-btn" onclick=\"SIP.CloseScreen();\">Cancel</button>');
                                        }
                                        SIP.ToggleBaseContols(true);
                                        $("#div_btn").append(input);
                                    }
                                    else {
                                        sessionStorage.CurrentMenuselected = "nav_information";
                                        $("ul.btm-nav-ul li").removeClass("active");
                                        $(".btm-nav-ul-li-nav_information").addClass("active");
                                        $("#btn_reorder").hide();
                                        $("#div_btn").empty();

                                        var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                            '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');
                                        SIP.DisableControlsOnView(true);
                                        $("#div_btn").append(input);
                                    }
                                }
                                else {
                                    if (RoleID == "10" && ModifiedbyRole == "6") {
                                        sessionStorage.CurrentMenuselected = "nav_information";
                                        $("ul.btm-nav-ul li").removeClass("active");
                                        $(".btm-nav-ul-li-nav_information").addClass("active");
                                        $("#btn_reorder").hide();
                                        //RackRate.hidecheckbox();
                                        $("#div_btn").empty();

                                        var input = $('<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"SIP.ReviewForward();\">Re-allocate</button> <button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');
                                        $("#div_btn").append(input);
                                        SIP.ToggleBaseContols(true);
                                    }
                                    else if (RoleID == "10" && ModifiedbyRole > "6") {
                                        if (jQuery.inArray('nav_freeze', menuarr) > -1) {
                                            sessionStorage.CurrentMenuselected = "nav_freeze";
                                            $("ul.btm-nav-ul li").removeClass("active");
                                            $(".btm-nav-ul-li-nav_freeze").addClass("active");
                                            $("#btn_reorder").hide();
                                            $("#div_btn").empty();
                                            input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                                '<button class="btn btn-primary sq-btn mr-right-01" id="btn_freeze_freeze" onclick=\"SIP.SIPFreeze();\">Freeze</button>' +
                                                   '<button id="btn_freeze_Discard" class="btn btn-primary sq-btn mr-right-01"  onclick=\"SIP.FreezeDiscard();\">Discard</button>');
                                            $("#div_btn").append(input);
                                            SIP.DisableControlsOnView(true);
                                            input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');
                                            $("#div_btn").append(input);
                                        }
                                    }
                                    else {
                                        sessionStorage.CurrentMenuselected = "nav_information";
                                        $("ul.btm-nav-ul li").removeClass("active");
                                        $(".btm-nav-ul-li-nav_information").addClass("active");
                                        $("#btn_reorder").hide();
                                        $("#div_btn").empty();

                                        var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                            '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');
                                        SIP.DisableControlsOnView(true);
                                        $("#div_btn").append(input);
                                    }
                                }
                            }
                            else {
                                if (RoleID == "10") {
                                    if (jQuery.inArray('nav_freeze', menuarr) > -1) {
                                        sessionStorage.CurrentMenuselected = "nav_freeze";
                                        $("ul.btm-nav-ul li").removeClass("active");
                                        $(".btm-nav-ul-li-nav_freeze").addClass("active");
                                        $("#btn_reorder").hide();
                                        $("#div_btn").empty();
                                        input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                            '<button class="btn btn-primary sq-btn mr-right-01" id="btn_freeze_freeze" onclick=\"SIP.SIPFreeze();\">Freeze</button>' +
                                               '<button id="btn_freeze_Discard" class="btn btn-primary sq-btn mr-right-01"  onclick=\"SIP.FreezeDiscard();\">Discard</button>');
                                        $("#div_btn").append(input);
                                        SIP.DisableControlsOnView(true);
                                        input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');
                                        $("#div_btn").append(input);
                                    }
                                }
                                else {
                                    sessionStorage.CurrentMenuselected = "nav_information";
                                    $("ul.btm-nav-ul li").removeClass("active");
                                    $(".btm-nav-ul-li-nav_information").addClass("active");
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();

                                    var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                        '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');

                                    SIP.DisableControlsOnView(true);
                                    $("#div_btn").append(input);
                                }
                            }
                            break;
                        }
                    case "Active":
                        {
                            if (MemoIsApproved == 'A') {
                                if (jQuery.inArray('nav_freeze', menuarr) > -1) {
                                    sessionStorage.CurrentMenuselected = "nav_freeze";
                                    $("ul.btm-nav-ul li").removeClass("active");
                                    $(".btm-nav-ul-li-nav_freeze").addClass("active");
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();
                                    input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                        '<button class="btn btn-primary sq-btn mr-right-01" id="btn_freeze_freeze" onclick=\"SIP.SIPFreeze();\">Freeze</button>' +
                                           '<button id="btn_freeze_Discard" class="btn btn-primary sq-btn mr-right-01"  onclick=\"SIP.FreezeDiscard();\">Discard</button>');
                                    $("#div_btn").append(input);
                                    SIP.DisableControlsOnView(true);
                                    input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');
                                    $("#div_btn").append(input);
                                }
                                else {
                                    sessionStorage.CurrentMenuselected = "nav_information";
                                    $("ul.btm-nav-ul li").removeClass("active");
                                    $(".btm-nav-ul-li-nav_information").addClass("active");
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();

                                    var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                        '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');

                                    SIP.DisableControlsOnView(true);
                                    $("#div_btn").append(input);
                                }
                            }
                            else if (MemoIsApproved == 'F') {
                                if (jQuery.inArray('nav_freeze', menuarr) > -1) {
                                    sessionStorage.CurrentMenuselected = "nav_manage";
                                    $("ul.btm-nav-ul li").removeClass("active");
                                    $(".btm-nav-ul-li-nav_manage").addClass("active");
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();
                                    var input = $('<button class="btn btn-primary sq-btn mr-right-01" onclick=\"SIP.Viewtoccusers();\" target="_blank">Email</button><button class="btn btn-primary sq-btn mr-right-01" onclick=\"SIP.PrintRackRate();\">Print</button>');
                                    $("#div_btn").append(input);

                                    input = $('<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');
                                    SIP.DisableControlsOnView(true);
                                    $("#div_btn").append(input);
                                }
                                else {
                                    sessionStorage.CurrentMenuselected = "nav_information";
                                    $("ul.btm-nav-ul li").removeClass("active");
                                    $(".btm-nav-ul-li-nav_information").addClass("active");
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();

                                    var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                        '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');

                                    SIP.DisableControlsOnView(true);
                                    $("#div_btn").append(input);
                                }
                            }
                            else {
                                sessionStorage.CurrentMenuselected = "nav_information";
                                $("ul.btm-nav-ul li").removeClass("active");
                                $(".btm-nav-ul-li-nav_information").addClass("active");
                                $("#btn_reorder").hide();
                                $("#div_btn").empty();

                                var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                    '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');

                                SIP.DisableControlsOnView(true);
                                $("#div_btn").append(input);
                            }
                            break;
                        }

                    case "Discarded":
                        {
                            $("ul.btm-nav-ul li").removeClass("active");
                            $(".btm-nav-ul-li-nav_information").addClass("active");
                            $("#btn_reorder").hide();
                            $("#div_btn").empty();

                            var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');

                            $("#div_btn").append(input);
                            SIP.DisableControlsOnView(true);

                            break;
                        }
                    case "Rejected":
                        {
                            if (jQuery.inArray('nav_information', menuarr) > -1) {
                                $("ul.btm-nav-ul li").removeClass("active");
                                $(".btm-nav-ul-li-nav_information").addClass("active");
                                $("#div_btn").empty();
                                input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                    ' <button class="btn mr-right-01 btn-success sq-btn" id="btn_save_info" onclick=\"SIP.SaveSIP();\">Save</button><button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');
                                $("#div_btn").append(input);

                                if (sessionStorage.MemoStatus == "Rejected") {
                                    if (sessionStorage.LoginUserId.toLowerCase() != sessionStorage.LoginId.toLowerCase()) {
                                        if (RoleID == "3" || RoleID == "10") {
                                        } else {
                                            SIP.DisableRackRate();
                                        }
                                    }
                                }
                            }
                            else {
                                sessionStorage.CurrentMenuselected = "nav_information";
                                $("ul.btm-nav-ul li").removeClass("active");
                                $(".btm-nav-ul-li-nav_information").addClass("active");
                                $("#btn_reorder").hide();
                                $("#div_btn").empty();

                                var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                    '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');

                                SIP.DisableControlsOnView(true);
                                $("#div_btn").append(input);
                                break;
                            }
                            break;
                        }
                    case "InActive":
                        {
                            sessionStorage.CurrentMenuselected = "nav_information";
                            $("ul.btm-nav-ul li").removeClass("active");
                            $(".btm-nav-ul-li-nav_information").addClass("active");
                            $("#btn_reorder").hide();
                            $("#div_btn").empty();

                            var input = $('<button class="btn btn-default mr-right-01 " data-toggle="modal" onclick=\"SIP.OpenRemarks();\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button><button class="btn btn-default mr-right-01 " data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"SIP.CancelSIP();\">Cancel</button>');

                            SIP.DisableControlsOnView(true);
                            $("#div_btn").append(input);
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
        //SIP.ViewAction($('#hidden_payment_memo_id').val());

        SIP.ViewRemarks();
    },

    DisableRackRate: function () {
        $('#div_sip_information').find('input, textarea, button, select').removeAttr("disabled");

        $('#btn_add_rack_rate_detail').prop('disabled', true);
        $('#txt_remarks').prop('disabled', true);
        $('#txt_additional_notes').prop('disabled', true);
        $('#txt_sip_notes').prop('disabled', true);
        //$('#div_rack_rate_detail').find('input, textarea, button, select').removeAttr("disabled");

    },

    SearchButtonClick: function () {
        SIP.SearchClick = true;
        SIP.SearchSIP();
    },

    SearchSIP: function () {
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


        //var localSchemeCategory = $('#dd_Scheme_category_search option:selected');
        //var localSchemeCategoryselected = [];
        //$(localSchemeCategory).each(function () {
        //    localSchemeCategoryselected.push([$(this).val()]);
        //});

        //var localScheme = $('#dd_Scheme_search option:selected');
        //var localSchemeselected = [];
        //$(localScheme).each(function () {
        //    localSchemeselected.push([$(this).val()]);
        //});


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

        sessionStorage.setItem("DistributorCategorySIP", DistributorCategory);
        sessionStorage.setItem("ChannelSIP", Channel);
        sessionStorage.setItem("ARNSIP", ARNNo);
        //sessionStorage.setItem('SchemeSelected', localSchemeselected.toString())
        //sessionStorage.setItem('SchemeCategoryselected', localSchemeCategoryselected.toString())

        var SearchStatus = "";
        var MemoLevel = "";
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
        else if (sessionStorage.CurrentMenuselected == "nav_freeze") {
            SearchStatus = "Active";
            MemoLevel = "A";
        }
        else if (sessionStorage.CurrentMenuselected == "nav_manage") {
            SearchStatus = "Active";
            MemoLevel = "F";
        }
        //else if (sessionStorage.CurrentMenuselected == "nav_information")
        //    SearchStatus = "All";

        var MasterQueueStatus = "";
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetCreateSIP', JSON.stringify({ ArnNo: ARNNo, Channel: Channel, DistributorCategory: DistributorCategory, Status: SearchStatus, ARNName: ARNName, SearchFilter: Utility.ListSearchText, MasterQueueStatus: MasterQueueStatus, MemoLevel: MemoLevel }), "json", false, false, function (result) {
            SearchGridResult = result.GetCreateSIPResult;
            $('#grid_search_result').jqGrid('clearGridData');
            if (SearchGridResult.length > 0) {
                for (var i = 0; i < SearchGridResult.length; i++)
                    jQuery("#grid_search_result").jqGrid('addRowData', SearchGridResult[i].id, SearchGridResult[i]);
            }
            else {
                if (SIP.SearchClick == true) {
                    Utility.writeNotification("norecords", "No Records Found", "", false);
                    SIP.SearchClick = false;
                }
            }

        });
    },

    LoadDropDowns: function () {
        $("#txt_arn_info").siblings("ul").remove();
        $("#txt_arn_name_info").siblings("ul").remove();

        $("#txt_arn").siblings("ul").remove();
        $("#txt_arn_name").siblings("ul").remove();
        SIP.GetDistributorCategory_info("");
        SIP.GetARN_info("");
        SIP.GetARNNameInfo("");
        SIP.GetChannel("");

        SIP.GetDistributorCategory("");
        SIP.GetARN("");
        SIP.GetARNName("");
        SIP.LoadMailingList();
    },

    GetARNNameInfo: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARNName', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn_name_info").empty();
            SIP.arnName = JSON.parse(result.GetARNNameResult);
            $("#txt_arn_name_info").tokenInput(
            SIP.arnName,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    //RackRate.LoadinfoARNToken(item.name, 'add', item.id);
                    SIP.LoadinfoARNToken(item.id, 'add', item.id);
                },

                onDelete: function (item) {
                    //RackRate.LoadinfoARNToken(item.name, 'remove', item.id);
                    SIP.LoadinfoARNToken(item.id, 'remove', item.id);
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
            SIP.arns = [];
            SIP.arns = JSON.parse(result.GetARNResult);
            $("#txt_arn_info").tokenInput(
            SIP.arns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    //RackRate.GetDistributorInfoARN(item.name, 'add', item.id);
                    SIP.GetDistributorInfoARN(item.id, 'add', item.id);
                },
                onDelete: function (item) {
                    SIP.GetDistributorInfoARN(item.id, 'remove', item.id);
                    //RackRate.GetDistributorInfoARN(item.name, 'remove', item.id);
                }
            });
        });
    },

    GetDistributorInfoARN: function (SearchText, mode, id) {
        if (mode == 'add') {
            var memoval = $('#hidden_payment_memo_id').val() == "" ? 0 : $('#hidden_payment_memo_id').val();
            if (memoval == "0") {
                //Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChildArn', JSON.stringify({ ArnNo: SearchText }), "json", false, false, function (result) {
                //    var Data = result.GetChildArnResult;
                //    if (Data.length > 1) {
                //        $.each(Data, function (i, obj) {

                //            $.each($("#txt_arn_info").tokenInput("get"), function (i, obj) {
                //                if (obj.id == obj.DistributorId) {
                //                    return;
                //                }
                //            });

                //            $("#txt_arn_info").tokenInput("add", { id: obj.DistributorId, name: obj.ARN });

                //            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributor', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                //                var Data = result.GetDistributorResult;

                //                $.each($("#txt_arn_name_info").tokenInput("get"), function (i, obj) {
                //                    if (obj.id == Data[0].DistributorId) {
                //                        return;
                //                    }
                //                });
                //                $("#txt_arn_name_info").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });

                //            });
                //        });
                //    }
                //    else if (Data.length == 1) {

                //        $("#txt_arn_name_info").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });
                //    }
                //    else {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                    var Data = result.GetDistributorBasedOnIDResult;
                    $.each($("#txt_arn_name_info").tokenInput("get"), function (i, obj) {
                        if (obj.id == Data[0].DistributorId) {
                            return;
                        }
                    });

                    $("#txt_arn_name_info").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });
                });
                //    }
                //});
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
            $("#txt_arn_name_info").tokenInput("remove", { id: id });
        }
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

                    SIP.GetDistributorCategory(selected.valueOf());
                    SIP.GetARNForChannelAndDistributorCategory();
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
            SIP.DistributorCategory = arrItems;
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
                onChange: function (element, checked) {
                    var brands = $('#dd_dist_category option:selected');
                    var selected = [];
                    $(brands).each(function (index, brand) {
                        selected.push([$(this).val()]);
                    });

                    SIP.GetARNForChannelAndDistributorCategory();
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
            SIP.arns = [];
            SIP.arns = JSON.parse(result.GetARNForChannelAndDistributorCategoryResult);
            $(".token-input-list-facebook").remove();

            $("#txt_arn").empty();
            $("#txt_arn").tokenInput(
            SIP.arns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    SIP.GetDistributor(item.id, 'add', item.id);
                },
                onDelete: function (item) {
                    SIP.GetDistributor(item.id, 'remove', item.id);
                }
            });


            $("#txt_arn_name").tokenInput(
            SIP.arnName,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    SIP.LoadARNToken(item.id, 'add', item.id);
                },

                onDelete: function (item) {
                    SIP.LoadARNToken(item.id, 'remove', item.id);
                }
            });
        });
    },

    GetDistributor: function (SearchText, mode, id) {
        if (mode == 'add') {
            //Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChildArn', JSON.stringify({ ArnNo: SearchText }), "json", false, false, function (result) {
            //    var Data = result.GetChildArnResult;
            //    if (Data.length > 1) {
            //        $.each(Data, function (i, obj) {

            //            $.each($("#txt_arn").tokenInput("get"), function (i, obj) {
            //                if (obj.id == obj.DistributorId) {
            //                    return;
            //                }
            //            });

            //            $("#txt_arn").tokenInput("add", { id: obj.DistributorId, name: obj.ARN });

            //            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributor', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
            //                var Data = result.GetDistributorResult;

            //                $.each($("#txt_arn_name").tokenInput("get"), function (i, obj) {
            //                    if (obj.id == Data[0].DistributorId) {
            //                        return;
            //                    }
            //                });
            //                $("#txt_arn_name").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });

            //            });
            //        });
            //    }
            //    else if (Data.length == 1) {

            //        $("#txt_arn_name").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });
            //    }
            //    else {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                var Data = result.GetDistributorBasedOnIDResult;
                $.each($("#txt_arn_name").tokenInput("get"), function (i, obj) {
                    if (obj.id == Data[0].DistributorId) {
                        return;
                    }
                });

                $("#txt_arn_name").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });
            });
            //    }
            //});
        }
        else {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                var Data = result.GetDistributorBasedOnIDResult;

                $("#txt_arn_name").tokenInput("remove", { id: id });
            });
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

    GetSchemeCategorySearch: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeCategory', JSON.stringify({ SearchText: "", MemoTypeId: "4", IsCloseEnded: "2" }), "json", false, false, function (result) {
            var arrItems = result.GetSchemeCategoryResult;

            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeCategoryName).val(arrItems[i].SchemeCategoryId).appendTo("#dd_Scheme_category_search");
            }
            $('#dd_Scheme_category_search').attr("multiple", "multiple");

            $('#dd_Scheme_category_search').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                //nonSelectedText: "Select Scheme Category",
                //onChange: function (element, checked) {
                //    var brands = $('#dd_Scheme_category_search option:selected');
                //    var selected = [];
                //    $(brands).each(function (index, brand) {
                //        selected.push([$(this).val()]);
                //    });

                //    SIP.GetSchemeSearch(selected.toString());
                //}
            });
            $('#dd_Scheme_category_search').multiselect('clearSelection');
        });
    },

    GetSchemeSearch: function (SearchText) {
        var arr = SearchText == "" ? "" : SearchText.toString();
        arr = JSON.stringify(arr)
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetScheme', '{"SearchText": ' + arr + ',"MemoTypeId": "4", "IsCloseEnded": "2"}', "json", false, false, function (result) {
            var arrItems = result.GetSchemeResult;
            $("#dd_Scheme_search").multiselect('destroy');
            $("#dd_Scheme_search").empty();
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeName).val(arrItems[i].SchemeId).appendTo('#dd_Scheme_search');
            }
            $('#dd_Scheme_search').attr("multiple", "multiple");

            $('#dd_Scheme_search').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                //nonSelectedText: "Select Scheme",

            });
            $('#dd_Scheme_search').multiselect('clearSelection');
        });
    },

    GetSchemeCategory: function (SearchText, ControlId) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeCategory', JSON.stringify({ SearchText: SearchText, MemoTypeId: "4" }), "json", false, false, function (result) {
            var arrItems = result.GetSchemeCategoryResult;

            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeCategoryName).val(arrItems[i].SchemeCategoryId).appendTo(ControlId);
            }

            if (ControlId == undefined) {
                ControlId = "#dd_scheme_category";
            }
            $(ControlId).attr("multiple", "multiple");

            $(ControlId).multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                buttonWidth: 100,
                //nonSelectedText: "Select Scheme Category",
                onChange: function (element, checked) {
                    var brands = $(ControlId + ' option:selected');
                    var selected = [];
                    $(brands).each(function (index, brand) {
                        selected.push([$(this).val()]);
                    });

                    SIP.GetScheme(selected, ControlId.replace("_category", ""));
                }
            });
            $(ControlId).multiselect('clearSelection');
        });
    },

    GetScheme: function (SearchText, ControlId) {
        var arr = SearchText == "" ? "" : SearchText.toString();
        //var arr = SearchText == "0" ? "" : "1,2,3,4,5,6,7,8,9";
        if (ControlId == undefined) {
            ControlId = "#dd_scheme";
        }
        arr = JSON.stringify(arr)

        if (SearchText.toString() == "") {
            $(ControlId).multiselect('destroy');
            $(ControlId).empty();
        }
        else {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetScheme', '{"SearchText": ' + arr + ', "MemoTypeId": "4", "IsCloseEnded": "2"}', "json", false, false, function (result) {
                var arrItems = result.GetSchemeResult;
                $(ControlId).multiselect('destroy');
                $(ControlId).empty();
                for (var i = 0; i < arrItems.length; i++) {
                    $("<option />").text(arrItems[i].SchemeName).val(arrItems[i].SchemeId).appendTo(ControlId);
                }
                //$(ControlId).attr("multiple", "multiple");

                //$(ControlId).multiselect({
                //    includeSelectAllOption: true,
                //    enableFiltering: true,
                //    enableCaseInsensitiveFiltering: true,
                //    buttonWidth: 150,
                //    //nonSelectedText: "Select Scheme",

                //});
                //$(ControlId).multiselect('clearSelection');
            });
        }

        $(ControlId).attr("multiple", "multiple");

        $(ControlId).multiselect({
            includeSelectAllOption: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            buttonWidth: 150,
            //nonSelectedText: "Select Scheme",

        });
        $(ControlId).multiselect('clearSelection');
    },

    GetARN: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARN', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn").empty();
            SIP.arns = JSON.parse(result.GetARNResult);
            $("#txt_arn").tokenInput(
            SIP.arns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    SIP.GetDistributor(item.id, 'add', item.id);
                },
                onDelete: function (item) {
                    SIP.GetDistributor(item.id, 'remove', item.id);
                }
            });
        });
    },

    GetARNName: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARNName', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn_name").empty();
            SIP.arnName = JSON.parse(result.GetARNNameResult);
            $("#txt_arn_name").tokenInput(
            SIP.arnName,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    SIP.LoadARNToken(item.id, 'add', item.id);
                },

                onDelete: function (item) {
                    SIP.LoadARNToken(item.id, 'remove', item.id);
                }
            });
        });
    },

    LoadSIPControls: function (Count, showdistributor, showARN) {
        return '<div class="col-md-12 col-sm-12 bg-cl-a pd-bottom-02">' +
                               '<div class="col-md-4 col-sm-4 pd-left-04">' +
                                   '<div class="row">' +
                                       '<div class="col-md-7 col-sm-7 pd-left-00">' +
                                        '<label class="tt-chk-bx-label mr-top-desk-title-02" id="lbl_dist_arn_' + Count + '"></label>' +
                                        '<input type="hidden" id="txt_id_' + Count + '"/>' +
                                             //'<div class="styled-select"  style="Display:' + showdistributor + '">' +
                                            //'<select class="select-bx-style" id="dd_dist_category_' + Count + '" style="Display:' + showdistributor + '"></select>' +
                                            //    '  </div>'+
                                            //'<input type="text" id="txt_arn_' + Count + '" class="input-text-bx-style" style="Display:' + showARN + '"/>' +
                                       '</div>' +
                                   '</div>' +
                                '</div>' +

                               '<div class="col-md-4 col-sm-4 pd-left-00">' +
                                   '<div class="row">' +
                                       '<div class="col-md-7 col-sm-7 pd-left-00">' +
                                        '<label class="tt-chk-bx-label mr-top-desk-title-02" id="lbl_arn_name_' + Count + '"></label>' +
                                           //'<input type="text" id="txt_arn_name_' + Count + '" class="input-text-bx-style" />' +
                                    '</div>' +
                                   '</div>' +
                               '</div>' +
                                 '<div class="col-md-2 col-sm-2 pd-right-00">' +
                                   '<div class="row">' +
                                        '<div class="col-md-7 col-sm-7">' +
                                           '<div class="date-outer-div">' +
                                               '<input type="text" id="dt_from_' + Count + '" class="input-text-date-bx-style" onkeyup=\"SIP.RemoveToDatePicker(' + Count + ');\"/>' +
                                               '<a class="pos-date-tr" href="#"><img class="pos-date-tr-img" src="../img/date_tr_icon.png" /></a>' +
                                           '</div>' +
                                        '</div>' +
                                   '</div>' +
                                '</div>' +
                               '<div class="col-md-2 col-sm-2  pd-right-00">' +
                                   '<div class="row">' +
                                       '<div class="col-md-7 col-sm-7">' +
                                            '<div class="date-outer-div">' +
                                               '<input type="text" id="dt_to_' + Count + '" class="input-text-date-bx-style" />' +
                                               '<a class="pos-date-tr" href="#"><img class="pos-date-tr-img" src="../img/date_tr_icon.png" /></a>' +
                                           '</div>' +
                                       '</div>' +
                                   '</div>' +
                               '</div>' +
                           '</div>'

    },

    CreateSIPDetail: function (count, data, totalcolumn, monthdata, yeardata) {
        $("#div_sip_detail_hdr").show();
        var monthonwards = "";
        if (yeardata.length == 0)
            monthonwards = data.Onwards;
        var Tag = SIP.AppendMonth(count, totalcolumn, monthdata, monthonwards) + SIP.AppendYear(count, yeardata, data.Onwards);

        var returncontrol = '<div class="row mr-top-01" id="div_detail_' + count + '">' +
            '<input type="hidden" id="hidden_payment_list_id_' + count + '"  value="' + data.PaymentListId + '" />' +
            '<input type="hidden" id="hidden_category_id_' + count + '" value="' + data.schemecategoryid + '" />' +
            '<input type="hidden" id="hidden_scheme_id_' + count + '"  value="' + data.schemeid + '" />' +
            '<input type="hidden" id="hidden_payment_Type_' + count + '"  value="' + data.PaymentType + '" />' +
            '<input type="hidden" id="hidden_month_' + count + '" value="' + monthdata.length + '" />' +
            '<input type="hidden" id="hidden_year_' + count + '"  value="' + yeardata.length + '" />' +
            '<input type="hidden" id="hidden_onwards_' + count + '"  value="' + data.Onwards + '" />' +
                   '<div class="col-md-12 col-sm-12 ">' +
                       '<table class="rrd-table" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">' +

                           '<tr class="rrd-tbl-hdr">' +
                               '<th width="10%" colspan="2" class="pd-cmn-side-5 bt bl">SCHEME</th>' +
                               //'<th width="10%" class="pd-cmn-side-5  bt bl">SCHEME</th>' +
                               '<th width="12%" class="pd-cmn-side-5  bt bl">CLAWBACK</th>' +
                               '<th width="60%" class="pd-cmn-side-5  bt bl">SLAB</th>' +
                           '</tr>' +

                           '<tr>' +
                               '<td colspan="2" class="pd-cmn-side-5 pad-top-b pad-btm-b bt bl"><span class="rrd-tbl-label-bld" id="txt_scheme' + count + '">' + data.scheme + '</span></td>' +
                               //'<td class="pd-cmn-side-5 pad-top-b pad-btm-b bt bl"><span class="rrd-tbl-label-bld" id="txt_scheme' + count + '">' + data.scheme + '</span></td>' +
                               '<td class="pd-cmn-side-5 pad-top-b pad-btm-b bt bl"><input type="text" id="txt_claw_back' + count + '" class="input-text-bx-style alphanumeric  c-round" value="' + data.claw_back + '" /></td>' +
                               '<td class="pad-top-b pad-btm-b bt bl">' +
                                   '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
                                       '<tr>' +
                                           '<td width="20%" class="pd-cmn-side-5 bdr-clsp">' +
                                               '<div class="styled-select">' +
                                                   '<select class="select-bx-style" onchange="SIP.SlabTypeChanged(' + count + ');" id="dd_slab_type' + count + '">' +
                                                       '<option>Slab Amount</option>' +
                                                       '<option>All Amounts</option>' +
                                                   '</select>' +
                                               '</div>' +
                                           '</td>' +
                                           '<td width="10%"><input type="text" class="input-text-bx-style  c-round alphanumeric" id="txt_slab_amount' + count + '" value="' + data.slab_amount + '" /></td>' +
                                           '<td width="70%">&nbsp;</td>' +
                                       '</tr>' +
                                   '</table>' +
                               '</td>' +
                           '</tr>' +
                           '<tr>' +
                               '<td colspan="2" class="pd-cmn-side-5 pad-top-a pad-btm-a td-txt-algn-cent bt bl"><span class="rrd-tbl-label-bld">UPFRONT BROKERAGE</span></td>' +
                               '<td class="pd-cmn-side-5 pad-top-a pad-btm-a bt bl"><span class="rrd-tbl-label-bld">SPECIAL INCENTIVE IN B15</span></td>' +
                               '<td class="pd-cmn-side-5 pad-top-a pad-btm-a td-txt-algn-cent bt bl"><span class="rrd-tbl-label-bld">TRAIL BROKERAGE  FOR T15 & B15</span></td>' +
                           '</tr>' +
                           '<tr>' +
                               '<td width="10%" class="bt bl">' +
                                   '<table class="min-ht-200" width="100%" border="0" cellspacing="0" cellpadding="0">' +
                                       '<tr>' +
                                           '<td class="pd-cmn-side-5 pad-btm-b v-algn-btm">' +
                                               '<div class="cmn-otr-td">' +
                                                   '<span class="rrd-tbl-label">' +
                                                       'Rack ' +
                                                     'Rate' +
                                                 '</span>' +
                                                 '<div class="clear"></div>' +
                                                '<input type="hidden" id="hidden_upfront_Brokerage_id_' + count + '"  value="' + data.UpfrontDetailId + '" />' +
                                        '<span class="rrd-tbl-label">' + data.base_upfront +
                                                 '</span>' +
                                                 '<input type="hidden" class="input-text-bx-style  c-round number" id="txt_up_br_base_upfront' + count + '" value="' + data.base_upfront + '" onkeyup="SIP.Calculateonkeyup(' + count + ',txt_up_br_base_upfront' + count + ');"/>' +
                                             '</div>' +
                                             '</td>' +
                                             '<td class="pd-cmn-side-5  pad-btm-b v-algn-btm  bl">' +
                                                 '<div class="cmn-otr-td">' +
                                                     '<span class="rrd-tbl-label">' +
                                                         'Live Tie Up' +
                                                 '</span>' +
                                                 '<div class="clear"></div>';
        if (parseInt(data.LumpSumLessTieup) != 0)
            returncontrol += '<a style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4; font-size:14px"  href="#" >' + data.LumpSumLessTieup + '</a>';
        else
            returncontrol += '<span class="rrd-tbl-label">' + data.LumpSumLessTieup;

        returncontrol += '<input type="hidden" class="input-text-bx-style  c-round number" id="txt_up_br_live_tieup' + count + '" value="' + data.LumpSumLessTieup + '" onkeyup="SIP.Calculateonkeyup(' + count + ',txt_up_br_live_tieup' + count + ');" />' +
                         '</div>' +
                         '</td>' +
                         '<td  class="pd-cmn-side-5  pad-btm-b v-algn-btm bl">' +
                             '<div class="cmn-otr-td">' +
                                 '<span class="rrd-tbl-label">Additional</span>' +

                                 '<div class="clear"></div>' +
                                '<span class="rrd-tbl-label">' + data.LumpSumGreaterTieup +
                             '</span>' +
                                 '<input type="hidden" class="input-text-bx-style  c-round number" id="txt_up_br_additional_tieup' + count + '" value="' + data.LumpSumGreaterTieup + '" onkeyup="SIP.Calculateonkeyup(' + count + ',txt_up_br_total' + count + ');" />' +
                             '</div>' +
                         '</td>' +
                         '</tr>' +
                         '</table>' +
                         '</td>' +
                         '<td width="6%" class="bt bl">' +
                             '<table class="min-ht-200" width="100%" border="0" cellspacing="0" cellpadding="0">' +
                                 '<tr ></tr>' +
                                 '<tr>' +
                                    '<td  class="pd-cmn-side-5  pad-btm-b v-algn-btm">' +
                             '<div class="cmn-otr-td">' +
                                 '<span class="rrd-tbl-label">Total</span>' +

                                 '<div class="clear"></div>' +
                                 '<input type="text" class="input-text-bx-style  c-round number" id="txt_up_br_total' + count + '" value="' + data.upfront_total + '" onkeyup="SIP.Calculateonkeyup(' + count + ',txt_up_br_total' + count + ');" />' +
                             '</div>' +
                         '</td>' +
                                 '</tr>' +
                             '</table>' +
                         '</td>' +
                        '<input type="hidden" id="hidden_additional_upfront_id_' + count + '"  value="' + data.addl_upfront_B15_id + '" />' +
                         '<td class="pd-cmn-side-5 v-algn-btm  pad-btm-b bt bl">' +

                        '<input  class="input-text-bx-style  c-round number" id="txt_additional_upfront' + count + '" value="' + data.addl_upfront_B15 + '" /></td>' +
                         '<td class="bt bl">' +
                        '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
                              '<tr id="tr_trail' + count + '" >' +

                               Tag +

                              '</tr>' +
                          '</table>' +
                         '</td>' +
                         '</tr>' +
                         '</table>' +
                         '</div>' +
                         '</div>'

        return returncontrol;
    },

    AppendYearRow: function (count, totalcolumn) {
        return '<td class="bl">' +
                      '<table id="tbl_year' + count + '" class="min-ht-200" width="100%" border="0" cellspacing="0" cellpadding="0">' +

                          '<tr>' +
                              '<td colspan="' + totalcolumn + '" class="pd-cmn-side-5  pad-top-b  pad-btm-b td-txt-algn-cent bb"><span class="rrd-tbl-label-bld">Year ' + count + '</span></td>' +
                          '</tr>' +

                            '<tr id="tr_month_header' + count + '">' +

                            '</tr>' +

                             '<tr id="tr_month_detail' + count + '">' +

                            '</tr>' +

                        '</table>' +
                  '</td>'
    },

    AppendMonthHeader: function (month) {
        return '<td class="pd-cmn-side-5 td-txt-algn-cent  pad-top-b  pad-btm-b bb "><span class="rrd-tbl-label-bld">' + month + ' Months </span></td>';
    },

    AppendMonthDetail: function (count, tr_month_detail_id, data) {
        tr_month_detail_id_append = count + '_' + tr_month_detail_id;
        var returncontrol = '<td class="bl">' +
              '<input type="hidden" id="hidden_month_detail_id_' + tr_month_detail_id_append + '"  value="' + data.PaymentDetailsId + '" />' +
             '<input type="hidden" id="hidden_month_' + tr_month_detail_id_append + '" runat="server" value="' + data.Duration + '" />' +
                                  '<table  width="100%" border="0" cellspacing="0" cellpadding="0">' +
                                      '<tr>' +
                                          '<td width="15%" class="pd-cmn-side-5  pad-top-b  pad-btm-b v-algn-btm br">' +
                                              '<span class="rrd-tbl-label">' +
                                                  'Rack ' +
                                                    'Rate' +
                                                '</span>' +
                                    '<div class="clear"></div>' +
                            '<span class="rrd-tbl-label">' + data.Trail.toString() + '</span>' +
                                    '<input type="hidden" class="input-text-bx-style  c-round number" id="txt_tr_br_base_trail' + tr_month_detail_id_append + '" value="' + data.Trail.toString() + '"  onkeyup="SIP.Calculateonkeyup(' + count + ',txt_tr_br_base_trail' + tr_month_detail_id_append + ');" />' +
                                '</td>' +
                                '<td width="15%" class="pd-cmn-side-5  pad-top-b  pad-btm-b v-algn-btm br">' +
                                    '<span class="rrd-tbl-label">' +
                                        'Live Tie Up ' +
                                    '</span>' +
                                    '<div class="clear"></div>';
        if (parseInt(data.LumpSumLessTieup) != 0)
            returncontrol += '<a style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4; font-size:14px"  href="#" >' + data.LumpSumLessTieup + '</a>';
        else
            returncontrol += '<span class="rrd-tbl-label">' + data.LumpSumLessTieup;

        returncontrol += '<input type="hidden" class="input-text-bx-style  c-round number" id="txt_tr_br_tieup' + tr_month_detail_id_append + '" value="' + data.LumpSumLessTieup.toString() + '"  onkeyup="SIP.Calculateonkeyup(' + count + ',txt_tr_br_addl_incentive' + tr_month_detail_id_append + ');"/>' +
                                '</td>' +
                                '<td width="15%" class="pd-cmn-side-5  pad-top-b  pad-btm-b v-algn-btm br">' +
                                    '<span class="rrd-tbl-label">Additional</span>' +
                                    '<div class="clear"></div>' +
                                    '<input type="text" class="input-text-bx-style  c-round number" id="txt_tr_br_additional_tieup' + tr_month_detail_id_append + '" value="' + data.LumpSumGreaterTieup.toString() + '"  onkeyup="SIP.Calculateonkeyup(' + count + ',txt_tr_br_total' + tr_month_detail_id_append + ');"/>' +
                                '</td>' +
                                '<td  >' +
                                    '<table class="min-ht-130" width="100%" border="0" cellspacing="0" cellpadding="0">' +
                                        '<tr>' +
                                             '<td class="pd-cmn-side-5  pad-top-b  pad-btm-b v-algn-btm ">' +
                                    '<span class="rrd-tbl-label">Total</span>' +
                                    '<div class="clear"></div>' +
                                    '<input type="text" class="input-text-bx-style  c-round number" id="txt_tr_br_total' + tr_month_detail_id_append + '" value="' + data.Total.toString() + '"  onkeyup="SIP.Calculateonkeyup(' + count + ',txt_tr_br_total' + tr_month_detail_id_append + ');"/>' +
                                '</td>' +
                                        '</tr>' +
                                    '</table>' +
                                '</td>' +
                                '</tr>' +
                                '</table>' +
                                '</td>'
        return returncontrol;
    },

    AppendMonth: function (count, totalcolumn, data, onwards) {
        var monthheader = "";
        var monthdetail = "";
        var onwardstext = "";
        if (onwards.toString().toLowerCase() == "true")
            onwardstext = " & Onwards"
        for (i = 0; i < data.length; i++) {
            monthheader += SIP.AppendMonthHeader(data[i].Duration);
        }

        for (i = 0; i < data.length; i++) {
            monthdetail += SIP.AppendMonthDetail(count, i, data[i]);
        }
        var val = "";

        if (data.length != 0) {
            val = '<td >' +

                         '<table id="tbl_year' + count + '" class="min-ht-200" width="100%" border="0" cellspacing="0" cellpadding="0">' +

                             '<tr>' +
                                 '<td colspan="' + totalcolumn + '" class="pd-cmn-side-5  pad-top-b  pad-btm-b td-txt-algn-cent bb"><span class="rrd-tbl-label-bld">Year 1 ' + onwardstext + '</span></td>' +
                             '</tr>' +

                               '<tr id="tr_month_header' + count + '">' +
                               monthheader +
                               '</tr>' +

                                '<tr id="tr_month_detail' + count + '">' +
                                monthdetail +
                               '</tr>' +

                           '</table>' +
                     '</td>'
        }
        return val;

    },

    AppendYear: function (count, data, onwards) {
        var year = "";
        var onwardstext = "";

        for (i = 0; i < data.length; i++) {
            if (onwards.toString().toLowerCase() == "true" && i == data.length - 1)
                onwardstext = " & Onwards"
            //switch (data[i].Duration.toString()) {
            //    case "1":
            year += ' <td  class="bl">' +
                         '<input type="hidden" id="hidden_year_detail_id_' + count + '_' + i + '"  value="' + data[i].PaymentDetailsId + '" />' +
                      '<table class="min-ht-200" width="100%" border="0" cellspacing="0" cellpadding="0">' +
                        '<tr>' +
                          '<td colspan="2" class="pd-cmn-side-5  pad-top-b  pad-btm-b td-txt-algn-cent bb"><span class="rrd-tbl-label-bld">Year ' + data[i].Duration.toString() + onwardstext + '</span></td>' +
                           '<input type="hidden" id="hidden_year_' + count + '_' + i + '" runat="server" value="' + data[i].Duration.toString() + '" />' +

                        '</tr>' +
                        '<tr>' +
                          '<td >' +

                          '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
                              '<tr>' +
                               ' <td width="15%" class="pd-cmn-side-5 pad-top-b  pad-btm-b v-algn-btm br"><span class="rrd-tbl-label">Rack' +
                   ' Rate</span>' +
                    '<div class="clear"></div>' +
                    '<span class="rrd-tbl-label">' + data[i].Trail.toString() + '</span>' +
                      '<input type="hidden" class="input-text-bx-style  c-round number" id="txt_year_trail' + count + '_' + i + '" value="' + data[i].Trail.toString() + '" onkeyup="TieUp.Calculateonkeyup(' + count + ',txt_year_trail' + count + '_' + i + ');"/>' +
                      ' <td width="15%" class="pd-cmn-side-5 pad-top-b  pad-btm-b v-algn-btm br"><span class="rrd-tbl-label">Live' +
                   ' Tieup</span>' +
                    '<div class="clear"></div>' +
                     '<span class="rrd-tbl-label">' + data[i].LumpSumLessTieup.toString() + '</span>' +
                      '<input type="hidden" class="input-text-bx-style  c-round number" id="txt_year_live_tieup' + count + '_' + i + '" value="' + data[i].LumpSumLessTieup.toString() + '" onkeyup="TieUp.Calculateonkeyup(' + count + ',txt_year_addl_incentive' + count + '_' + i + ');"/>' +

                      ' <td width="15%" class="pd-cmn-side-5 pad-top-b  pad-btm-b v-algn-btm br"><span class="rrd-tbl-label">Additional</span>' +
                    '<div class="clear"></div>' +
                      '<input type="text" class="input-text-bx-style  c-round number" id="txt_year_additional' + count + '_' + i + '" value="' + data[i].LumpSumGreaterTieup.toString() + '" onkeyup="TieUp.Calculateonkeyup(' + count + ',txt_year_addl_incentive' + count + '_' + i + ');"/>' +

                     ' <td width="15%" class="pd-cmn-side-5 pad-top-b  pad-btm-b v-algn-btm"><span class="rrd-tbl-label">Total' +
                   '</span>' +
                    '<div class="clear"></div>' +
                      '<input type="text" class="input-text-bx-style  c-round number" id="txt_year_total' + count + '_' + i + '" value="' + data[i].Total.toString() + '" onkeyup="TieUp.Calculateonkeyup(' + count + ',txt_year_total' + count + '_' + i + ');"/>' +

                '</tr>' +
             ' </table>' +
            '</td>' +
          '</tr>' +
        '</table></td>'
            //        break;
            //    default:
            //        year += '<td  class="bl">' +
            //                  '<table class="min-ht-200" width="100%" border="0" cellspacing="0" cellpadding="0">' +
            //                    '<tr>' +
            //                     '<input type="hidden" id="hidden_year_detail_id_' + count + '_' + i + '"  value="' + data[i].PaymentDetailsId + '" />' +
            //                      '<td class="pd-cmn-side-5  pad-top-b  pad-btm-b td-txt-algn-cent "><span class="rrd-tbl-label-bld">Year ' + data[i].Duration.toString() + onwardstext + ' </span></td>' +
            //                      '<input type="hidden" id="hidden_year_' + count + '_' + i + '" runat="server" value="' + data[i].Duration.toString() + '" />' +
            //                    '</tr>' +
            //                    '<tr>' +
            //                      '<td class="pd-cmn-side-5 td-txt-algn-cent v-algn-btm pad-btm-b bt td-hgt-a"><input type="text" class="input-text-bx-style number" id="txt_year' + count + '_' + i + '"  value="' + data[i].Trail.toString() + '" /></td>' +
            //                    '</tr>' +
            //                  '</table>' +
            //                '</td>';
            //        break
            //}
        }
        return year;
    },

    remove_tags: function (html) {
        return jQuery(html).text();
    },

    LoadSIPDetails: function () {
        //var dataSIP = [
        //{ Id: "1", SchemeCategory: "All Equity Scheme", Scheme: 'Top 100', InstlAmountFrom: "2000", InstlAmountTo: "2000", Tenure: "60", UpfrontType: 'Tenure-based', UpfrontValue: "200.00", Calculation: "Installment Amount X SIP Tenure X", PaymentType: "SIP Advance", Clawback: 'On ceasure of SIP, Proportionate Clawback', IncentiveRemarks: 'Number of SIP / SIP months registered' },
        //{ Id: "2", SchemeCategory: "All Equity Scheme", Scheme: 'Top 90', InstlAmountFrom: "1600", InstlAmountTo: "1600", Tenure: "50", UpfrontType: 'Tenure-based', UpfrontValue: "150.00", Calculation: "Installment Amount X SIP Tenure X", PaymentType: "SIP Advance", Clawback: 'On ceasure of SIP, Proportionate Clawback 2', IncentiveRemarks: 'Number of SIP / SIP months registered' },
        //{ Id: "3", SchemeCategory: "All Equity Scheme", Scheme: 'Top 80', InstlAmountFrom: "1500", InstlAmountTo: "1500", Tenure: "40", UpfrontType: 'Tenure-based', UpfrontValue: "90.00", Calculation: "Installment Amount X SIP Tenure X", PaymentType: "SIP Advance", Clawback: 'On ceasure of SIP, Proportionate Clawback 3', IncentiveRemarks: 'Number of SIP / SIP months registered' },
        //{ Id: "4", SchemeCategory: "All Equity Scheme", Scheme: 'Top 70', InstlAmountFrom: "1000", InstlAmountTo: "1000", Tenure: "40", UpfrontType: 'Tenure-based', UpfrontValue: "120.00", Calculation: "Installment Amount X SIP Tenure X", PaymentType: "SIP Advance", Clawback: 'On ceasure of SIP, Proportionate Clawback 4', IncentiveRemarks: 'Number of SIP / SIP months registered' }
        //];

        //jQuery("#div_sip_detail").jqGrid({
        //    datatype: "local",
        //    colNames: ['Id', 'Scheme Category', 'Scheme', 'Installment Amount From', 'Installment Amount To', 'Tenure (in months)', 'Upfront Type', 'Upfront Value', 'Calculation', 'Payment Type', 'Clawback', 'Incentive Remarks'],
        //    colModel: [
        //        { name: 'Id', index: 'Id', width: 55, hidden: true },
        //        { name: 'SchemeCategory', index: 'SchemeCategory', width: 150, editable: true, edittype: "select", editrules: { required: true }, editoptions: { size: 71 } },
        //        { name: 'Scheme', index: 'Scheme', width: 100, editable: true },
        //        { name: 'InstlAmountFrom', index: 'InstlAmountFrom', width: 80, align: "right", editable: true },
        //        { name: 'InstlAmountTo', index: 'InstlAmountTo', width: 80, align: "right", editable: true },
        //        { name: 'Tenure', index: 'Tenure', width: 80, align: "right", editable: true },
        //        { name: 'UpfrontType', index: 'UpfrontType', width: 120, sortable: false, editable: true },
        //        { name: 'UpfrontValue', index: 'UpfrontValue', width: 120, sortable: false, editable: true },
        //        { name: 'Calculation', index: 'Calculation', width: 190, sortable: false, editable: true },
        //        { name: 'PaymentType', index: 'PaymentType', width: 150, sortable: false, editable: true },
        //        { name: 'Clawback', index: 'Clawback', width: 230, sortable: false, editable: true },
        //        { name: 'IncentiveRemarks', index: 'IncentiveRemarks', width: 230, sortable: false, editable: true },
        //    ],
        //    rowNum: 10,
        //    rowList: [10, 20, 30],
        //    sortname: 'Id',
        //    shrinkToFit: true,
        //    viewrecords: true,
        //    sortorder: "desc",
        //    multiselect: true
        //});

        //for (var i = 0; i <= dataSIP.length; i++)
        //    jQuery("#div_sip_detail").jqGrid('addRowData', i + 1, dataSIP[i]);
    },

    loadSIPListControls: function () {
        var previousRow = $('#tblSIPData tr:last').html();
        //$('#tblSIPData').append("<tr class=\"sip-row\">" + previousRow + "</tr");
        SIP.NextSIPRowId = parseInt(SIP.NextSIPRowId) + 1;
        var rowCount = $("#tblSIPData tr.sip-row").length;
        //$('#tblSIPData tr:last').after(SIP.htmlSIPControls(rowCount));
        $('#tblSIPData tr:last').after(SIP.htmlSIPControls(SIP.NextSIPRowId));

        //SIP.loadSchemeCategory('#dd_scheme_category_' + rowCount + '');
        //SIP.loadScheme('#dd_scheme_' + rowCount + '');
        SIP.loadSchemeCategory('#dd_scheme_category_' + SIP.NextSIPRowId + '');
        SIP.loadScheme('#dd_scheme_' + SIP.NextSIPRowId + '');

        $('#txt_sip_row_' + SIP.NextSIPRowId).val(SIP.NextSIPRowId);
        //$('#tblSIPData').append("<script>SIP.loadSchemeCategory('#dd_scheme_category_" + rowCount + "');SIP.loadScheme('#dd_scheme_" + rowCount + "');");

        SIP.UpfrontDropdownOnChange(SIP.NextSIPRowId);
    },

    ClearhtmlSIPControls: function () {
        var rowCount = $("#tblSIPData tr.sip-row").length;
        for (var cnt = rowCount; cnt > 1; cnt--) {
            $('#tblSIPData tr:last').remove();
        }
        //if (rowCount > 1) {
        //    $(this).closest('tr').remove();
        //}
    },

    htmlSIPControls: function (idcount) {
        return "<tr class=\"sip-row\" id=\"tr_sip_row_" + idcount + "\">"
                            + "<td class=\"pad-top-b pad-btm-b bt bl\"><select class=\"select-bx-style\" id=\"dd_scheme_category_" + idcount + "\"></select>  <input type=\"hidden\" name=\"SIPRowId\" id=\"txt_sip_row_" + idcount + "\" /> </td>"
                            + "<td class=\"pad-top-b pad-btm-b bt bl\"><select class=\"select-bx-style\" id=\"dd_scheme_" + idcount + "\"></select></td>"
                            + "<td class=\"pad-top-b pad-btm-b bt bl\">"
                                + "<div style=\"width:100%\">"
                                        + " <input type=\"text\" class=\"input-text-bx-style  c-round\" name=\"installment-amount-from\" id=\"txt_installment_amount_from_" + idcount + "\" onkeyup=\"SIP.SIPCalculationByRowID(" + idcount + ")\" maxlength=\"10\" style=\"float:left;width:35%;font-size:14px\">"
                                         + "<div class=\"styled-select\" style=\"float:left;width:30%\">"
                                            + " <select class=\"select-bx-style\" name=\"installment-expression\" id=\"dd_installment_expression_" + idcount + "\" >"
                                               + "  <option value=\"<\"><</option>"
                                               + "  <option value=\"≤\">≤</option>"
                                               + "  <option value=\">\">></option>"
                                                + " <option value=\"≥\">≥</option>"
                                                + " <option value=\"=\">=</option>"
                                            + " </select>"
                                         + "</div>"
                                        + " <input type=\"text\" class=\"input-text-bx-style  c-round\" name=\"installment-amount-to\" id=\"txt_installment_amount_to_" + idcount + "\" onkeyup=\"SIP.SIPCalculationByRowID(" + idcount + ")\" maxlength=\"10\" style=\"float:left;width:35%;font-size:14px\">"
                                     + "</div>"
                            + "</td>"
                            + "<td class=\"pad-top-b pad-btm-b bt bl\">"
                                + "<div style=\"width:100%\">"
                                         + "<div class=\"styled-select\" style=\"float:left;width:50%\">"
                                             + "<select class=\"select-bx-style\" name=\"tenure-expression\" id=\"dd_tenure_expression_" + idcount + "\"  onchange=\"SIP.TenureDropdownOnChange(" + idcount + ")\">"
                                                 + "<option value=\"Select\">Select</option>"
                                                 + "<option value=\"Any\">Any</option>"
                                                 + "<option value=\"<\"><</option>"
                                                 + "<option value=\"≤\">≤</option>"
                                                 + "<option value=\">\">></option>"
                                                 + "<option value=\"≥\">≥</option>"
                                                 + "<option value=\"=\">=</option>"
                                             + "</select>"
                                         + "</div>"
                                     + "</div>"
                                     + "<div >"
                                         + "<input type=\"text\" class=\"input-text-bx-style   c-round\" id=\"txt_tenure_month_" + idcount + "\" onkeyup=\"SIP.SIPCalculationByRowID(" + idcount + ")\" name=\"tenure-month\" maxlength=\"3\" style=\"float: left; width: 50%;font-size:14px\">"
                                     + "</div>"
                            + "</td>"
                            + "<td class=\"pad-top-b pad-btm-b bt bl\">"
                                 + "<div class=\"styled-select\">"
                                            + "<select class=\"select-bx-style\" name=\"upfront-expression\" style=\"font-size:14px\" id=\"dd_upfront_expression_" + idcount + "\"  onchange=\"SIP.UpfrontDropdownOnChange(" + idcount + ")\">"
                                                + "<option value=\"Application based\">Application based</option>"
                                                + "<option value=\"Installment based\">Installment based</option>"
                                                + "<option value=\"Tenure based\">Tenure based</option>"
                                            + "</select>"
                                        + "</div>"
                            + "</td>"
                            + "<td class=\"pad-top-b pad-btm-b bt bl\">"
                                + "<input type=\"text\" class=\"input-text-bx-style  c-round \" id=\"txt_upfront_value_" + idcount + "\" onkeyup=\"SIP.SIPCalculationByRowID(" + idcount + ")\" maxlength=\"5\" name=\"upfront-value\" style=\"min-width:50px;font-size:14px\">"
                            + "</td>"
                            + "<td class=\"pad-top-b pad-btm-b bt bl\">"
                                + "<input type=\"text\" class=\"input-text-bx-style  c-round\" id=\"txt_calculated_value_" + idcount + "\"  name=\"calculated-value\" value=\"\" style=\"width:100%;font-size:14px\" readonly>"
                            + "</td>"
                            + "<td class=\"pad-top-b pad-btm-b bt bl\">"
                                + "<input type=\"text\" class=\"input-text-bx-style  c-round\" id=\"txt_payment_type_" + idcount + "\" name=\"payment-value\" style=\"min-width:50px;font-size:14px\">"
                            + "</td>"
                            + "<td class=\"pad-top-b pad-btm-b bt bl\">"
                                //+ "<textarea class=\"input-text-bx-style  c-round input-large\" id=\"txt_clawback_" + idcount + "\" rows=\"3\" cols=\"30\"></textarea>"
                            + "<input type=\"text\" class=\"input-text-bx-style  c-round\" id=\"txt_clawback_" + idcount + "\" name=\"clawback-value\" style=\"min-width:50px;font-size:14px\">"
                            + "</td>"
                            + "<td class=\"pad-top-b pad-btm-b bt bl\">"
                            + "<input type=\"text\" class=\"input-text-bx-style  c-round\" id=\"txt_sip_incentive_remarks_" + idcount + "\" name=\"sipincentiveremarks-value\" style=\"min-width:50px;font-size:14px\">"
                                //+ "<textarea class=\"input-text-bx-style  c-round input-large\" id=\"txt_sip_incentive_remarks_" + idcount + "\"  rows=\"3\" cols=\"30\"></textarea>"
                            + "</td>"
                            + "<td class=\"pad-top-b pad-btm-b bt bl \" style='min-width:90px'><div>"
                            + '<a  href=\"javascript:void(0)\" onclick=\"SIP.CopyRow(' + idcount + ');\" title="Copy"><img src="../img/copy-btn.png"> </a>'
                            + '<a  href=\"javascript:void(0)\" onclick=\"SIP.ResetRow(' + idcount + ');\" title = "Reset"><img src="../img/repeat-btn1.png" > </a>'
                            + '<a  href=\"javascript:void(0)\" onclick=\"SIP.DeleteRow(' + idcount + ');\" title ="Delete"><img src="../img/trash-btn.png"> </a>'
                            + "</div></td>"

                            //+ '<td align="center" style="border-color:transparent;"><a href="javascript:void(0)" onclick="SIP.ResetRow(this)"> <img src="../img/copy-btn.png" style="float:right;"></a></td>'
                            //+ '<td align="center" style="border-color:transparent;"><a href="javascript:void(0)" onclick="SIP.ResetRow(this)"> <img src="../img/repeat-btn1.png" style="float:right;"></a></td>'
                            //+'<td align="center" style="border-color:transparent;"><a href="javascript:void(0)" onclick="SIP.DeleteRow(this)"> <img src="../img/trash-btn.png" style="float:left;"></a></td>' 
                        + "</tr><script></script>"
    },

    CopyRow: function (Rowid) {
        var str = $('#tr_sip_row_' + Rowid).prev().attr('id');
        var idname = 'tr_sip_row_';
        var Previous_Rowid = '';
        if (str != undefined)
            Previous_Rowid = str.substr(idname.length)

        //var Previous_Rowid = (Rowid > 0 ? Rowid - 1 : 0);

        var txt_installment_amount_from_ = $('#txt_installment_amount_from_' + Previous_Rowid).val();
        var txt_installment_amount_to_ = $('#txt_installment_amount_to_' + Previous_Rowid).val();
        var txt_tenure_month_ = $('#txt_tenure_month_' + Previous_Rowid).val();
        var txt_upfront_value_ = $('#txt_upfront_value_' + Previous_Rowid).val();
        var txt_calculated_value_ = $('#txt_calculated_value_' + Previous_Rowid).val();
        var txt_payment_type_ = $('#txt_payment_type_' + Previous_Rowid).val();
        var txt_clawback_ = $('#txt_clawback_' + Previous_Rowid).val();
        var txt_sip_incentive_remarks_ = $('#txt_sip_incentive_remarks_' + Previous_Rowid).val();
        var dd_installment_expression_ = $('#dd_installment_expression_' + Previous_Rowid).val();
        var dd_tenure_expression_ = $('#dd_tenure_expression_' + Previous_Rowid).val();
        var dd_upfront_expression_ = $('#dd_upfront_expression_' + Previous_Rowid).val();
        var dd_scheme_category_ = Utility.ReturnSelectedValue('dd_scheme_category_' + Previous_Rowid);
        var dd_scheme_ = Utility.ReturnSelectedValue('dd_scheme_' + Previous_Rowid);

        $('#txt_installment_amount_from_' + Rowid).val(txt_installment_amount_from_);
        $('#txt_installment_amount_to_' + Rowid).val(txt_installment_amount_to_);
        $('#txt_tenure_month_' + Rowid).val(txt_tenure_month_);
        $('#txt_upfront_value_' + Rowid).val(txt_upfront_value_);
        $('#txt_calculated_value_' + Rowid).val(txt_calculated_value_);
        $('#txt_payment_type_' + Rowid).val(txt_payment_type_);
        $('#txt_clawback_' + Rowid).val(txt_clawback_);
        $('#txt_sip_incentive_remarks_' + Rowid).val(txt_sip_incentive_remarks_);

        $('#dd_installment_expression_' + Rowid).val(dd_installment_expression_);
        $('#dd_tenure_expression_' + Rowid).val(dd_tenure_expression_);
        $('#dd_upfront_expression_' + Rowid).val(dd_upfront_expression_);

        $('#dd_scheme_category_' + Rowid).multiselect('clearSelection');
        $('#dd_scheme_' + Rowid).multiselect('clearSelection');

        SIP.loadScheme('#dd_scheme_' + Rowid + '', dd_scheme_category_);

        if (dd_tenure_expression_ == "Any") {
            $('#txt_tenure_month_' + Rowid).attr('disabled', 'disabled');
        }
        else {
            $('#txt_tenure_month_' + Rowid).attr('disabled', false);
        }
        if (dd_upfront_expression_ == "Application based") {
            $('#txt_upfront_value_' + Rowid).unbind('keypress');
            $('#txt_upfront_value_' + Rowid).removeClass("numberonly");
            $('#txt_upfront_value_' + Rowid).removeClass("number2-02");
            $('#txt_upfront_value_' + Rowid).addClass("numberonly");
            $('#txt_upfront_value_' + Rowid).attr('maxLength', 6);
        }
        if (dd_upfront_expression_ == "Tenure based" || dd_upfront_expression_ == "Installment based") {
            $('#txt_upfront_value_' + Rowid).unbind('keypress');
            $('#txt_upfront_value_' + Rowid).removeClass("number2-02");
            $('#txt_upfront_value_' + Rowid).removeClass("numberonly");
            $('#txt_upfront_value_' + Rowid).addClass("number2-02");
            $('#txt_upfront_value_' + Rowid).removeAttr('maxLength');
        }

        Utility.AllowDecimal();
        SIP.TenureDropdownOnChange(Rowid);

        var dd_scheme_category_id = dd_scheme_category_.split(',');
        for (var i = 0; i < dd_scheme_category_id.length; i++) {
            if (dd_scheme_category_id[i] != "") {
                $('#dd_scheme_category_' + Rowid).multiselect('select', dd_scheme_category_id[i]);
            }
        }

        var dd_scheme_id = dd_scheme_.split(',');
        for (var i = 0; i < dd_scheme_id.length; i++) {
            if (dd_scheme_id[i] != "") {
                $('#dd_scheme_' + Rowid).multiselect('select', dd_scheme_id[i]);
            }
        }
    },

    DeleteRow: function (Rowid) {

        $('#tr_sip_row_' + Rowid).remove();
        //$(elem).parent().parent().remove();
        $('#btn_add_new_rack').focus();
    },



    ResetRow: function (Rowid) {
        $('#txt_installment_amount_from_' + Rowid).val('');
        $('#txt_installment_amount_to_' + Rowid).val('');
        $('#txt_tenure_month_' + Rowid).val('');
        $('#txt_upfront_value_' + Rowid).val('');
        $('#txt_calculated_value_' + Rowid).val('');
        $('#txt_payment_type_' + Rowid).val('');
        $('#txt_clawback_' + Rowid).val('');
        $('#txt_sip_incentive_remarks_' + Rowid).val('');

        $('#dd_installment_expression_' + Rowid + ' option:first').attr('selected', 'selected');
        $('#dd_tenure_expression_' + Rowid + ' option:first').attr('selected', 'selected');
        $('#dd_upfront_expression_' + Rowid + ' option:first').attr('selected', 'selected');

        $('#dd_scheme_category_' + Rowid).multiselect('clearSelection');
        $('#dd_scheme_' + Rowid).multiselect('clearSelection');
        $('#btn_add_new_rack').focus();
    },

    //RefreshRow: function (Rowid) {
    //    var rowCount = $("#tblSIPData tr.sip-row").length;
    //    $(this).closest('tr').remove();
    //    //var par = $(this).parent().parent(); //tr
    //    //par.remove();
    //    //return false;
    //},






    loadSchemeCategory: function (controlId, SearchText) {
        if (controlId == undefined) {
            controlId = "#dd_scheme_category_0";
        }
        if (SearchText == undefined) {
            SearchText = "";
        }
        SIP.GetSchemeCategory(SearchText, controlId);

        var SchemeCategory = sessionStorage.getItem('SchemeCategoryselected') != null ? sessionStorage.getItem('SchemeCategoryselected') : '';
        for (i = 0; i < SchemeCategory.length; i++) {
            $(controlId).multiselect('select', SchemeCategory[i]);
        }

        $(controlId).val(SchemeCategory);
    },

    loadScheme: function (controlId, SearchText) {
        var scheme = sessionStorage.getItem('SchemeSelected') != null ? sessionStorage.getItem('SchemeSelected').split(",") : '';
        if (controlId == undefined) {
            controlId = "#dd_scheme_0";
        }
        if (SearchText == undefined) {
            SearchText = "";
        }
        SIP.GetScheme(SearchText, controlId);
        $(controlId).multiselect('clearSelection');

        for (i = 0; i < scheme.length; i++) {
            $(controlId).multiselect('select', scheme[i]);
        }
    },

    SaveReview: function () {
        var updateStatus = "";
        //updateStatus = sessionStorage.MemoStaus;
        if (sessionStorage.CurrentMenuselected == "nav_review")
            updateStatus = "Initiated";
        else if (sessionStorage.CurrentMenuselected == "nav_approval")
            updateStatus = "Reviewed";
        SIP.SaveSIPInfo(updateStatus, 'Saved Successfully',1);
    },

    SaveRackRate: function () {
        var updateStatus = "Saved";
        SIP.SaveSIPInfo(updateStatus, 'Saved Successfully',1);
    },

    SaveInitiate: function () {
        var updateStatus = "Saved";
        SIP.SaveSIPInfo(updateStatus, 'Saved Successfully',1);
    },

    InitiateSubmit: function () {
        var updateStatus = "Initiated";

        if ($("#div_landing_grid").is(":visible")) {
            var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
            var selectedmemos = "";
            if (gridData.length > 0) {
                var Remarks = "";//$("#txt_remarks").html();

                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].selectcheck == 'True') {
                        if (gridData[i].MemoStatus != 'Rejected') {
                            if (selectedmemos != "")
                                selectedmemos = selectedmemos + ',';
                            selectedmemos = selectedmemos + gridData[i].PaymentMemoId;
                        }
                    }
                }
                if (selectedmemos != "") {
                    //Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus }), "json", false, false, function (result) {
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus, Remarks: Remarks, MemoTypeId: 5 }), "json", false, false, function (result) {
                        Utility.writeNotification("success", "Memo " + updateStatus + " Successfully", "", true);
                        SIP.AutoSearch();
                    });
                }
                else {
                    Utility.writeNotification("warning", "Select atleast one Saved Memo to Submit", "", true);
                    //alert("Select Memo to Submit");
                }
            }
        }
        else {
            SIP.SaveSIPInfo(updateStatus, 'Memo Submitted Successfully', 0);
        }

    },

    ApprovalDiscard: function (Memonumber) {
        var updateStatus = "Discarded";
        SIP.TempRackRateStatus = "Discarded";
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

                }
                else {
                    Utility.writeNotification("warning", "Select a Memo to Discarded", "", true);

                }
            }
        }
        else {
            $('#btn_mdl6_remarks').text('Discard');
            $('#myModal123').modal('show');
        }
    },

    rejectdiscard: function () {
        if ($("#txt_remarks_entry").val() != "") {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: $('#txt_selected_memos').val(), Status: $('#txt_updated_status').val(), Remarks: $("#txt_remarks_entry").val(), MemoTypeId: 5 }), "json", false, false, function (result) {
                Utility.writeNotification("warning", "Memo " + $('#txt_updated_status').val() + " Successfully", "", true);
                SIP.AutoSearch();
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
        SIP.TempRackRateStatus = "Rejected";
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
            $('#btn_mdl6_remarks').text('Reject');
            $('#myModal123').modal('show');
        }
    },

    review_Discard: function (Memonumber) {
        var updateStatus = "Discarded";
        SIP.TempRackRateStatus = "Discarded";
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
            $('#btn_mdl6_remarks').text('Discard');
            $('#myModal123').modal('show');
        }
    },

    review_Reject: function (Memonumber) {

        var updateStatus = "Rejected";
        SIP.TempRackRateStatus = "Rejected";
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
            $('#btn_mdl6_remarks').text('Reject');
            $('#myModal123').modal('show');
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

                    SIP.LoadBH(Arnselected, DistCategorySelected, MemoCount.length);
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
            SIP.LoadBH(ARNSelected, DistCategorySelected, MemoCount);
            $('#div_bh').show();
        }
    },

    ReviewForward: function () {
        var updateStatus = "Reviewed";
        var RoleID = sessionStorage.getItem("RoleID");
        if (RoleID == "10") {
            SIP.SalesAdminApprovalRole();
        }
        else {
            SIP.ReviewForwardServiceCall(updateStatus, "");
        }
    },

    AssignToChange: function (value) {
        if (value.value == "6") {
            $('#div_bh').show();
            //SIP.LoadBH();
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
            var BHId = [];
            $("#dd_business_head").multiselect('destroy');
            $("#dd_business_head").empty();
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].UserName).val(arrItems[i].UserID).appendTo('#dd_business_head');
                BHId.push(arrItems[i].UserID);
            }
            $('#dd_business_head').attr("multiple", "multiple");

            $('#dd_business_head').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                //nonSelectedText: "Select Scheme",

            });
            for (i = 0; i < BHId.length; i++) {
                if (BHId[i] != "") {
                    $('#dd_business_head').multiselect('select', BHId[i]);
                }
            }
        });
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
                SIP.ReviewForwardServiceCall(updateStatus, " to " + assigntoText);

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
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus, Remarks: Remarks, MemoTypeId: 5 }), "json", false, false, function (result) {
                        Utility.writeNotification("success", "Memo Forwarded Successfully" + assigntoText, "", true);
                        SIP.AutoSearch();
                    });
                }
                else {
                    Utility.writeNotification("warning", "Select atleast one Memo to Forward", "", true);
                    //alert("Select Memo to Forward");
                }
            }
        }
        else {
            SIP.SaveSIPInfo(updateStatus, "Memo Forwarded Successfully" + assigntoText, 0);
        }
    },

    SIPApproval: function () {
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
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus, Remarks: Remarks, MemoTypeId: 5 }), "json", false, false, function (result) {
                        Utility.writeNotification("success", "Memo " + updateStatus + " Successfully", "", true);
                        SIP.AutoSearch();
                    });
                }
                else {
                    Utility.writeNotification("warning", "Select atleast one Memo to Approve", "", true);
                    //alert("Select Memo to Approve");
                }
            }
        }
        else {
            SIP.SaveSIPInfo(updateStatus, 'Memo Approved Successfully', 0);
        }

    },

    SIPFreeze: function () {
        var updateStatus = "Active";
        var Remarks = "";
        if ($("#div_landing_grid").is(":visible")) {
            var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
            var selectedmemos = "";
            if (gridData.length > 0) {
                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].selectcheck == 'True') {
                        if (gridData[i].MemoStatus == "Active") {
                            if (selectedmemos != "")
                                selectedmemos = selectedmemos + ',';
                            selectedmemos = selectedmemos + gridData[i].PaymentMemoId;
                        }
                    }
                }
                if (selectedmemos != "") {
                    //Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus }), "json", false, false, function (result) {
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus, Remarks: Remarks, MemoTypeId: 5 }), "json", false, false, function (result) {
                        Utility.writeNotification("success", "Memo has been Freezed", "", true);
                        SIP.AutoSearch();
                    });
                }
                else {
                    Utility.writeNotification("warning", "Select atleast one Active Memo to Freeze", "", true);
                    // alert("Select Memo to Approve");
                }
            }
        }
        else {
            //Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: $('#hidden_payment_memo_id').val(), Status: updateStatus }), "json", false, false, function (result) {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: $('#hidden_payment_memo_id').val(), Status: updateStatus, Remarks: Remarks, MemoTypeId: 5 }), "json", false, false, function (result) {
                Utility.writeNotification("success", "Memo has been Freezed", "", true);
                SIP.CloseScreen();
            });
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
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: $("#hidden_payment_memo_id").val(), Status: updateStatus, Remarks: Remarks, MemoTypeId: 5 }), "json", false, false, function (result) {
                    Utility.writeNotification("success", "Memo has been Discarded", "", true);
                    SIP.CloseScreen();
                });
            }
            else {
                $("#txt_remarks").focus();
                Utility.writeNotification("warning", "Please enter remarks to Discard the Memo", "", true);
            }
        }

    },

    SaveSIP: function () {
        var updateStatus = "Saved";
        SIP.SaveSIPInfo(updateStatus, "Memo Saved Successfully", 1);
    },

    SaveSIPInfo: function (updateStatus, message,IsSaved) {
        if (SIP.SIPInfoValid()) {
            var userData = [];

            //format payment memo object
            var transactiontype = "";
            if ($('#chk_sip').is(":checked")) {
                transactiontype = "5";
            }
            if ($('#chk_stp').is(":checked")) {
                if (transactiontype != "")
                    transactiontype = transactiontype + ",";
                transactiontype = transactiontype + "6";
            }

            var paymentMemo = [{
                PaymentMemoId: $("#hidden_payment_memo_id").val() == "" ? 0 : $("#hidden_payment_memo_id").val(),
                BranchId: 0,
                ZoneId: 0,
                MemoTypeId: 5,
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
                SIPNotes: $("#txt_sip_notes").val(),
                CopiedMemoID: $("#hidden_copied_payment_memo_id").val() == "" ? 0 : $("#hidden_copied_payment_memo_id").val(),
                IsCloseEnded: 0,
                IsSaved:IsSaved
            }];
            var paymentList = [];
            var paymentDetail = [];
            var record = [];
            ////Get Selected Category////////
            var Category = $('#dd_dist_category_info option:selected');

            //var Categoryselected = [];
            $(Category).each(function () {
                var cat = {};
                cat.DistributorCategoryId = $(this).val();
                cat.DistributorCategoryName = $(this).text()
                cat.ArnNo = "";
                cat.ArnName = "";
                //Categoryselected.push([$(this).val()]);
                record.push(cat);
            });

            /////Get selected ARN/////////
            var token = $("#txt_arn_info").tokenInput("get");
            var names = [];
            $.each(token, function (i, obj) {
                names.push(obj.name);
            });
            var ARNSelected = names.toString();

            /////Get selected ARN Name/////////
            var Nametoken = $("#txt_arn_name_info").tokenInput("get");
            var Arnnames = [];
            $.each(Nametoken, function (i, obj) {
                Arnnames.push(obj.name);//build an array of just the names
            });
            var ARNNameSelected = Arnnames.toString();

            $.each(names, function (i, obj) {
                var cat = {};
                cat.DistributorCategoryId = "";
                cat.DistributorCategoryName = "";
                cat.ArnNo = obj;
                cat.ArnName = Arnnames[i];
                record.push(cat);
            });

            for (var rowNumber = 0; rowNumber < record.length; rowNumber++) {

                var account = {};
                if (record[rowNumber].ArnNo != "") {
                    account.disCategory = ""
                    account.disCategoryName = "";
                    account.arnNumber = record[rowNumber].ArnNo;
                    account.arnName = record[rowNumber].ArnName;

                } else {
                    account.disCategory = record[rowNumber].DistributorCategoryId;
                    account.disCategoryName = record[rowNumber].DistributorCategoryName;
                    account.arnNumber = "";
                    account.arnName = "";
                }


                account.dataFrom = $("#dt_from").val();
                account.dataTo = $("#dt_to").val();

                userData.push(account);

                var row = $("#tblSIPData tr.sip-row");

                for (var rowIndex = 0; rowIndex < row.length; rowIndex++) {
                    //var rowData = row[rowIndex];
                    var rowData = $($("#tblSIPData tr.sip-row")[rowIndex]);
                    var column = $(rowData).find('td');

                    var schemeCategory = column[0];
                    var RowId = column[0];
                    var scheme = column[1];
                    var installment = column[2];
                    var tenure = column[3];
                    var upfront = column[4];
                    var upfrontvalue = column[5];
                    var calculation = column[6];
                    var paymentType = column[7];
                    var clawback = column[8];
                    var sipIncentiveRemarks = column[9];

                    //var scheme = $(scheme).find('.btn-group button').attr('title');
                    //var schemecategory = $(schemeCategory).find('.btn-group button').attr('title');

                    //var schemeCategoryArray = [];
                    //if (schemeCategory.indexOf(',') >= 0) {
                    //    schemeCategoryArray = schemeCategory.split(',');
                    //}
                    //else {
                    //    schemeCategoryArray[0] = schemeCategory;
                    //}

                    //var schemeArray = [];
                    //if (scheme.indexOf(',') >= 0) {
                    //    schemeArray = scheme.split(',');
                    //}
                    //else {
                    //    schemeArray[0] = scheme;
                    //}

                    var rowid = $(RowId).find("input[name$='SIPRowId']").val();

                    var selectedscheme = $('#dd_scheme_' + rowid + ' option:selected');
                    var selectedschemeCategory = $('#dd_scheme_category_' + rowid + ' option:selected');

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

                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeAndCategory', JSON.stringify({ SearchText: scheme, MemoTypeId: "0" }), "json", false, false, function (result) {
                        var data = result.GetSchemeAndCategoryResult;

                        $(data).each(function (obj, value) {
                            var element = {};
                            element["PaymentListId"] = "0"; //$('#hidden_payment_list_id_' + cnt + '').val();
                            element["SchemeId"] = value.SchemeId;
                            element["SchemeCategoryId"] = value.SchemeCategoryId;
                            element["DistributorCategoryId"] = account.disCategory;
                            element["DistributorCategoryName"] = account.disCategoryName;
                            element["PaymentMemoId"] = $("#hidden_payment_memo_id").val() == "" ? 0 : $("#hidden_payment_memo_id").val();
                            element["PaymentType"] = $(paymentType).find("input").val();
                            element["ARNNO"] = account.arnNumber;
                            element["ARNName"] = account.arnName;
                            element["DateFrom"] = account.dataFrom;
                            element["DateTo"] = account.dataTo;
                            element["SlabType"] = "";
                            element["SlabAmount"] = "";
                            element["PaymentBasis"] = "";
                            if ($("#dd_sip_target option:selected").val() == "0") {
                                element["Target"] = $('#txt_sip').val();
                            }
                            else {
                                element["Target"] = "0";
                            }
                            element["TargetPeriod"] = $('#txt_sip_month').val();
                            element["InterestRate"] = "";//$('#txt_sip').val();
                            element["InstallmentCondition"] = $(installment).find("select[name$='installment-expression']").val();//.replace("<span class=\"caret\"></span>", "");
                            element["InstallmentRangeFrom"] = $(installment).find("input[name$='installment-amount-from']").val();
                            element["InstallmentRangeTo"] = $(installment).find("input[name$='installment-amount-to']").val();
                            element["TenureCondition"] = $(tenure).find("select[name$='tenure-expression']").val();//.replace("<span class=\"caret\"></span>", "");
                            element["TenureMonths"] = $(tenure).find("input[name$='tenure-month']").val();
                            element["UpfrontPaymentType"] = $(upfront).find("select[name$='upfront-expression']").val();//.replace("<span class=\"caret\"></span>", "");
                            element["UpfrontValue"] = $(upfrontvalue).find("input[name$='upfront-value']").val();
                            element["Calculation"] = $(calculation).find("input[name$='calculated-value']").val();
                            element["Clawback"] = $(clawback).find("input[name$='clawback-value']").val();
                            element["SIPIncentiveRemarks"] = $(sipIncentiveRemarks).find("input[name$='sipincentiveremarks-value']").val();
                            element["SIPRowId"] = $(RowId).find("input[name$='SIPRowId']").val();//rowIndex;
                            element["FreeTextField1"] = "";
                            element["FreeTextField2"] = "";
                            element["Onwards"] = "";
                            element["IsUpdated"] = 0;

                            paymentList.push(element);
                        });
                    });

                }
            }

            if (SIP.TempPaymentList.length > 0) {
                $.each(SIP.TempPaymentList, function (tmpcnt, tmpdata) {
                    var schemeCategoryarr = tmpdata.SchemeCategoryId.split(',')
                    var schemearr = tmpdata.SchemeId.split(',')
                    var IsUpdated = 0;
                    var updateRowid = "";
                    $.each(paymentList, function (cnt, data) {
                        if (data.SIPRowId == tmpdata.SIPRowId && data.SchemeCategoryId == tmpdata.SchemeCategoryId && data.SchemeId == tmpdata.SchemeId) {
                            //if (jQuery.inArray(data.SchemeCategoryId, schemeCategoryarr) != -1) {
                            //    IsUpdated = 1;
                            //    return false;
                            //}
                            //if (jQuery.inArray(data.SchemeId, schemearr) != -1) {
                            //    IsUpdated = 1;
                            //    return false;
                            //}
                            if (tmpdata.Target != data.Target || tmpdata.TargetPeriod != data.TargetPeriod || tmpdata.PaymentType != data.PaymentType ||
                                tmpdata.InstallmentCondition != data.InstallmentCondition ||
                                tmpdata.InstallmentRangeFrom != data.InstallmentRangeFrom || tmpdata.InstallmentRangeTo != data.InstallmentRangeTo ||
                                tmpdata.TenureCondition != data.TenureCondition || tmpdata.TenureMonths != data.TenureMonths ||
                                tmpdata.UpfrontPaymentType != data.UpfrontPaymentType || tmpdata.UpfrontValue != data.UpfrontValue ||
                                tmpdata.Calculation != data.Calculation || tmpdata.Clawback != data.Clawback || tmpdata.SIPIncentiveRemarks.trim() != data.SIPIncentiveRemarks.trim()) {
                                IsUpdated = 1;
                                updateRowid = data.SIPRowId;
                                return false;
                            }
                        }

                    });
                    if (IsUpdated == 0) {
                        var existingschemeNo = 0;
                        var currentschemeNo = 0;

                        $.each(paymentList, function (cnt, data) {
                            if (data.SIPRowId == tmpdata.SIPRowId) {
                                currentschemeNo++;
                            }
                        });
                        $.each(SIP.TempPaymentList, function (cnt, data) {
                            if (data.SIPRowId == tmpdata.SIPRowId) {

                                existingschemeNo++;
                            }

                        });
                        if (existingschemeNo != currentschemeNo) {
                            IsUpdated = 1;
                            updateRowid = tmpdata.SIPRowId;
                        }
                    }
                    if (updateRowid != "") {
                        $.each(paymentList, function (cnt, data) {
                            if (data.SIPRowId == updateRowid) {
                                paymentList[cnt].IsUpdated = IsUpdated;
                            }
                        });
                    }
                });
            }
            else {
                //$.each(paymentList, function (cnt, data) {
                //    paymentList[cnt].IsUpdated = 1;
                //});
            }

            Utility.ServiceCall("POST", 'BaseRackRateService.svc/SaveBaseRackRateInformation', JSON.stringify({ Memo: paymentMemo, list: paymentList, details: paymentDetail }), "json", false, false, function (result) {
                Utility.writeNotification("success", message, "", true);
                if (sessionStorage.CurrentMenuselected == "nav_information") {
                    sessionStorage.removeItem("DistributorCategory");
                    sessionStorage.removeItem("Channel");
                    sessionStorage.removeItem("ARN");
                    if (sessionStorage.MemoStatus == "Reviewed" && sessionStorage.CurrentMenuselected == "nav_information") {
                        window.location.href = "MasterQueue.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
                    }
                    else {
                        window.location.href = "CreateSIP.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
                    }
                }
                else {
                    SIP.CloseScreen();
                }
            });

        }
    },

    SIPInfoValid: function () {
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
        if (names.length == 0 && Categoryselected.length == 0) {
            if (error.indexOf("Please select ARN No./Distributor Category that is a mandatory field") > -1) {
            }
            else {
                error += "Please select ARN No./Distributor Category that is a mandatory field. <br/>";
            }
        }


        var inpTargetValue = $('#dd_sip_target').val();
        var inpTarget = $('#dd_sip_target').text();
        var inpSIP = $('#txt_sip').val();
        var inpMonth = $('#txt_sip_month').val();

        if ($("#dd_sip_target option:selected").val() == "0") {
            if (inpMonth == "0" || inpMonth == "") {
                error += "Enter SIP's Month. <br/>"
            }
            if (inpSIP == "0" || inpSIP == "") {
                error += "Enter SIP's value. <br/>"
            }
        }
        //if (SIP.DetailCount == 0) {
        //    error += "SIP Detail Required  <br/>";
        //}
        var transactiontype = "";
        if ($('#chk_sip').is(":checked")) {
            transactiontype = "6";
        }
        if ($('#chk_stp').is(":checked")) {
            if (transactiontype != "")
                transactiontype = transactiontype + ",";
            transactiontype = transactiontype + "6";
        }
        if (transactiontype == "") {
            error += "Select Transaction Type. <br/>"
        }
        var record = $('#div_sip_Controls > div');

        //for (var rowNumber = 0; rowNumber < record.length; rowNumber++) {

        //    var dataFrom = $(record[rowNumber]).find("input[id^='dt_from_']");
        //    if (dataFrom.length > 0) {
        if ($('#dt_from').val() == "") {
            if (error.indexOf("Date from is required") > -1) {
            }
            else {
                error += "Date from is required. <br/>"
            }
        }
        //}

        //var dataTo = $(record[rowNumber]).find("input[id^='dt_to_']");
        //if (dataTo.length > 0) {
        if ($('#dt_to').val() == "") {
            if (error.indexOf("Date to is required") > -1) {
            }
            else {
                error += "Date to is required. <br/>"
            }
        }

        //if ($('#txt_sip_notes').val() == "") {
        //    if (error.indexOf("SIP Notes is required") > -1) {
        //    }
        //    else {
        //        error += "SIP Notes is required <br/>"
        //    }
        //}
        //}
        //}

        if ($("#dt_from").val() != "" && $("#dt_to").val() != "") {
            if ($("#dt_from").val() == $("#dt_to").val()) {
                if (error.indexOf("From Date and To date Cannot be same") > -1) {
                }
                else {
                    error += "From Date and To date Cannot be same. <br/>";
                }
            }

            if ($("#dd_sip_target option:selected").val() == "0") {
                var fDate = $("#dt_from").val().split('/')[1] + "/" + $("#dt_from").val().split('/')[0] + "/20" + $("#dt_from").val().split('/')[2];
                var tDate = $("#dt_to").val().split('/')[1] + "/" + $("#dt_to").val().split('/')[0] + "/20" + $("#dt_to").val().split('/')[2];
                //var monthdiff = parseInt(SIP.monthDiff(new Date(fDate), new Date(tDate))) + 1;
                var monthdiff = SIP.monthDiff(new Date(fDate), new Date(tDate));
                monthdiff = monthdiff + 1;
                if (inpMonth > monthdiff) {
                    error += "Target Months Cannot be greater than " + monthdiff + ". <br/>"
                }
            }
        }
        var row = $("#tblSIPData tr.sip-row");
        var schemecategoryfullList = [];
        var schemelist = [];
        var schemecategorylist = [];
        for (var rowIndex = 0; rowIndex < row.length; rowIndex++) {
            //var rowData = row[rowIndex];
            var rowData = $($("#tblSIPData tr.sip-row")[rowIndex]);
            var column = $(rowData).find('td');

            var schemeCategory = column[0];
            var RowId = column[0];
            var scheme = column[1];
            var installment = column[2];
            var tenure = column[3];
            var upfront = column[4];
            var upfrontvalue = column[5];
            var calculation = column[6];
            var paymentType = column[7];
            var clawback = column[8];
            var sipIncentiveRemarks = column[9];

            var rowid = $(RowId).find("input[name$='SIPRowId']").val();

            var selectedscheme = $('#dd_scheme_' + rowid + ' option:selected');
            var selectedschemeCategory = $('#dd_scheme_category_' + rowid + ' option:selected');

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

            if (scheme == "") {
                if (error.indexOf("Select Scheme") > -1) {
                }
                else {
                    error += "Select Scheme. <br/>"
                }
            }
            else {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeAndCategory', JSON.stringify({ SearchText: scheme, MemoTypeId: "0" }), "json", false, false, function (result) {
                    var data = result.GetSchemeAndCategoryResult;
                    schemecategoryfullList.push(data);
                });

            }

            var InstallmentCondition = $(installment).find("select[name$='installment-expression']").val();//.replace("<span class=\"caret\"></span>", "");
            var InstallmentRangeFrom = $(installment).find("input[name$='installment-amount-from']").val();
            var InstallmentRangeTo = $(installment).find("input[name$='installment-amount-to']").val();

            if (InstallmentRangeFrom == "") {
                if (error.indexOf("Installment From is required") > -1) {
                }
                else {
                    error += "Installment From is required. <br/>"
                }
            }
            if (InstallmentRangeTo == "") {
                if (error.indexOf("Installment To is required") > -1) {
                }
                else {
                    error += "Installment To is required. <br/>"
                }
            }

            if ($(tenure).find("select[name$='tenure-expression']").val() == "Select") {
                if (error.indexOf("Select Tenure") > -1) {
                }
                else {
                    error += "Select Tenure. <br/>"
                }
            }

            if ($(tenure).find("input[name$='tenure-month']").val() == "") {
                if (error.indexOf("Tenure is required") > -1) {
                }
                else {
                    error += "Tenure is required. <br/>"
                }
            }

            if ($(upfrontvalue).find("input[name$='upfront-value']").val() == "") {
                if (error.indexOf("Amount/Rate is required") > -1) {
                }
                else {
                    error += "Amount/Rate is required. <br/>"
                }
            }
            if (InstallmentCondition == '<') {
                if (parseInt(InstallmentRangeTo) <= parseInt(InstallmentRangeFrom))
                    if (error.indexOf("Installment To must be greater than Installment From") > -1) {
                    }
                    else {
                        error += "Installment To must be greater than Installment From. <br/>"
                    }
            }

            if (InstallmentCondition == '>') {
                if (parseInt(InstallmentRangeFrom) <= parseInt(InstallmentRangeTo))
                    if (error.indexOf("Installment From must be greater than Installment To") > -1) {
                    }
                    else {
                        error += "Installment From must be greater than Installment To. <br/>"
                    }
            }

            if (InstallmentCondition == '=') {
                if (parseInt(InstallmentRangeTo) != parseInt(InstallmentRangeFrom))
                    if (error.indexOf("Installment From and Installment To must be equal") > -1) {
                    }
                    else {
                        error += "Installment From and Installment To must be equal. <br/>"
                    }
            }
            if (InstallmentCondition == '≤') {
                if (parseInt(InstallmentRangeFrom) > parseInt(InstallmentRangeTo))
                    if (error.indexOf("Installment From must be less than or equals to Installment To") > -1) {
                    }
                    else {
                        error += "Installment From must be less than or equals to Installment To. <br/>"
                    }
            }
            if (InstallmentCondition == '≥') {
                if (parseInt(InstallmentRangeFrom) < parseInt(InstallmentRangeTo))
                    if (error.indexOf("Installment From must be greater than or equals to Installment To") > -1) {
                    }
                    else {
                        error += "Installment From must be greater than or equals to Installment To. <br/>"
                    }
            }

            //if ($(sipIncentiveRemarks).find("textarea").val() == '') {
            //        if (error.indexOf("SIP Incentive Remarks Required") > -1) {
            //        }
            //        else {
            //            error += "SIP Incentive Remarks Required <br/>"
            //        }
            //}


        }

        //$.each(schemecategoryfullList, function (cnt, data) {
        //    $.each(schemecategoryfullList, function (innercnt, innerdata) {
        //        if (cnt != innercnt) {
        //            $.each(innerdata, function (innercnti, inner) {
        //                $.each(data, function (cnti, indata) {
        //                    if (inner.SchemeId == indata.SchemeId) {
        //                        if (error.indexOf("Scheme already added") > -1) {
        //                            return false;
        //                        }
        //                        else {
        //                            error += "Scheme already added <br/>";
        //                            return false;
        //                        }
        //                    }
        //                    else if (indata.SchemeName == 'All Schemes') {
        //                        if (inner.SchemeCategoryId == indata.SchemeCategoryId) {
        //                            if (error.indexOf("Scheme already added") > -1) {
        //                                return false;
        //                            }
        //                            else {
        //                                error += "Scheme already added <br/>";
        //                                return false;
        //                            }
        //                        }
        //                    }
        //                    else {
        //                        if (inner.SchemeName == "All Schemes") {
        //                            $(data).each(function (obj, availscheme) {
        //                                if (inner.SchemeCategoryId == availscheme.SchemeCategoryId) {
        //                                    if (error.indexOf("Scheme already added") > -1) {
        //                                        return false;
        //                                    }
        //                                    else {
        //                                        error += "Scheme already added <br/>";
        //                                        return false;
        //                                    }
        //                                }
        //                            });
        //                        }
        //                        else {
        //                            $(data).each(function (obj, availscheme) {
        //                                if (inner.SchemeCategoryId == availscheme.SchemeCategoryId && availscheme.SchemeName == "All Schemes") {
        //                                    if (error.indexOf("Scheme already added") > -1) {
        //                                        return false;
        //                                    }
        //                                    else {
        //                                        error += "Scheme already added <br/>";
        //                                        return false;
        //                                    }
        //                                }
        //                            });
        //                        }
        //                    }

        //                });

        //            });
        //        }
        //    });
        //});

        var SchemeAdded = "";
        var SchemeCategoryAdded = "";
        //$.each(schemelist, function (cnt, data) {
        //    var scheme = data.split(',');
        //    $.each(schemelist, function (innercnt, innerdata) {
        //        if (cnt != innercnt) {
        //            var InnerScheme = innerdata.split(',');
        //            $.each(InnerScheme, function (ii, inner) {
        //                if (jQuery.inArray(inner, scheme) != -1) {
        //                    if (error.indexOf("Scheme Already Added") > -1) {
        //                    }
        //                    else {
        //                        error += "Scheme Already Added <br/>"
        //                    }
        //                    return false
        //                }
        //            });
        //        }
        //    });

        //});

        //Check the memo existance
        var DateFrom = $('#dt_from').val();
        var Dateto = $('#dt_to').val();
        //if (record.length > 0) {
        //    DateFrom = $(record[0]).find("input[id^='dt_from_']");
        //    Dateto = $(record[0]).find("input[id^='dt_to_']");
        //}

        if (error == "") {
            //if (sessionStorage.CurrentMenuselected == "nav_information" && sessionStorage.MemoStatus != "Reviewed") {

            if ((sessionStorage.CurrentMenuselected == "nav_information" || sessionStorage.CurrentMenuselected == "nav_initiate") && (sessionStorage.MemoStatus != "Reviewed" && sessionStorage.MemoStatus != "Rejected")) {
                var schemeSelected = [];
                var schemeCategorySelected = [];
                var transactionType = "";
                var row = $("#tblSIPData tr.sip-row");

                var memoval = $('#hidden_payment_memo_id').val() == "" ? 0 : $('#hidden_payment_memo_id').val();
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/SIPMemoExists', JSON.stringify({ ArnNo: ARNSelected, DistributorCategory: Categoryselected.toString(), schemeid: scheme.toString(), schemeCategoryid: schemecategory.toString(), DateFrom: DateFrom, DateTo: Dateto, MemoId: memoval, TransactionType: transactionType }), "json", false, false, function (result) {
                    if (result.SIPMemoExistsResult != "")
                        error += result.SIPMemoExistsResult;
                });
            }

        }

        if (error == "")
            return true;
        else {
            Utility.writeNotification("warning", error, "", true);
            return false;
        }


    },

    CloseScreen: function () {
        var pagename = Utility.GetParameterValues('ptype');
        if (pagename == "mq") {
            window.location.href = "MasterQueue.html";
        }
        else if (pagename == "ss") {
            sessionStorage.setItem("SmartSearchScreen", "ss");
            window.location.href = "SmartSearchScreen.html";
        }
        else if (pagename == "cr") {
            window.location.href = "CreateSIP.html";  //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
        }
        else {
            $("#div_btn").empty();

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
                    $('#grid_search_result').hideCol('MemoNumber');
                    $('#grid_search_result').showCol('MemoId');
            }
            $("#btn_freeze_freeze").removeAttr('disabled');
            $("#btn_freeze_Discard").removeAttr('disabled');
            var value = "";

            if (sessionStorage.CurrentMenuselected == "nav_initiate") {
                value = $('<button class="btn btn-warning sq-btn mr-right-01" onclick="SIP.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
                    '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"SIP.SearchButtonClick();\">Search</button> <button class="btn mr-right-01 btn-warning sq-btn" onclick=\"SIP.InitiateSubmit();\">Submit</button>');
            }
            else if (sessionStorage.CurrentMenuselected == "nav_review") {
                var RoleID = sessionStorage.getItem("RoleID");
                if (RoleID == "10") {
                    value = $('<button class="btn btn-warning sq-btn mr-right-01" onclick="SIP.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
                        '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"SIP.SearchButtonClick();\">Search</button>'

                                );
                }
                else {
                    value = $('<button class="btn btn-warning sq-btn mr-right-01" onclick="SIP.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
                        '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"SIP.SearchButtonClick();\">Search</button>' +
                              '<button class="btn btn-warning sq-btn mr-right-01" id="btn_review_Discard" onclick=\"SIP.review_Discard();\">Discard</button>' +
                                          '<button class="btn btn-danger sq-btn mr-right-01" id="btn_review_reject" onclick=\"SIP.review_Reject();\">Reject</button>' +
                                          '<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"SIP.ReviewForward();\">Forward</button>'
                                          );
                }


            }
            else if (sessionStorage.CurrentMenuselected == "nav_approval") {
                value = $('<button class="btn btn-warning sq-btn mr-right-01" onclick="SIP.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
                    '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"SIP.SearchButtonClick();\">Search</button> ' +
           '<button class="btn btn-warning sq-btn mr-right-01" id ="btn_approval_Discard" onclick=\"SIP.ApprovalDiscard();\">Discard</button>' +
           '<button class="btn btn-danger sq-btn mr-right-01" id ="btn_approval_reject" onclick=\"SIP.ApprovalReject();\">Reject</button>' +
           '<button class="btn btn-success sq-btn mr-right-01" id ="btn_approval_approve" onclick=\"SIP.SIPApproval();\">Approve</button>');

            }
            else if (sessionStorage.CurrentMenuselected == "nav_freeze") {
                value = $('<button class="btn btn-warning sq-btn mr-right-01" onclick="SIP.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
                    '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"SIP.SearchButtonClick();\">Search</button> ' +
           '<button class="btn btn-primary sq-btn mr-right-01" id="btn_freeze_freeze" onclick=\"SIP.SIPFreeze();\">Freeze</button>' +
           '<button id="btn_freeze_Discard" class="btn btn-primary sq-btn mr-right-01"  onclick=\"SIP.FreezeDiscard();\">Discard</button>');

            }


            $("#div_btn").empty();

            $("#div_btn").append(value);
            $("#div_landing_grid").show();
            $("#div_sip_information").hide();
            SIP.SearchSIP();
        }
    },

    CancelSIP: function () {
        var pagename = Utility.GetParameterValues('ptype');
        if (pagename == "mq") {
            window.location.href = "MasterQueue.html";
        }
        else if (pagename == "ss") {
            sessionStorage.setItem("SmartSearchScreen", "ss");
            window.location.href = "SmartSearchScreen.html";
        }
        else if (pagename == "cr") {
            window.location.href = "CreateSIP.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
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
                window.location.href = "CreateSIP.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
            }
        }
        return false;
    },

    TenureDropdownOnChange: function (Rowid) {
        var dd_tenure_expression = $('#dd_tenure_expression_' + Rowid).val();

        if (dd_tenure_expression == "Any") {
            $('#txt_tenure_month_' + Rowid).val(0);
            $('#txt_tenure_month_' + Rowid).attr('disabled', 'disabled');
        }
        else
            $('#txt_tenure_month_' + Rowid).attr('disabled', false);

        SIP.SIPCalculationByRowID(Rowid);
    },


    UpfrontDropdownOnChange: function (Rowid) {

        var UpfrontValue = $('#dd_upfront_expression_' + Rowid).val();

        if (UpfrontValue == "Application based") {
            $('#txt_upfront_value_' + Rowid).unbind('keypress');
            $('#txt_upfront_value_' + Rowid).removeClass("numberonly");
            $('#txt_upfront_value_' + Rowid).removeClass("number2-02");
            $('#txt_upfront_value_' + Rowid).addClass("numberonly");
            $('#txt_upfront_value_' + Rowid).attr('maxLength', 6);
            $('#txt_upfront_value_' + Rowid).val("");
        }
        if (UpfrontValue == "Tenure based" || UpfrontValue == "Installment based") {
            $('#txt_upfront_value_' + Rowid).unbind('keypress');
            $('#txt_upfront_value_' + Rowid).removeClass("number2-02");
            $('#txt_upfront_value_' + Rowid).removeClass("numberonly");
            $('#txt_upfront_value_' + Rowid).addClass("number2-02");
            $('#txt_upfront_value_' + Rowid).removeAttr('maxLength');
            $('#txt_upfront_value_' + Rowid).val("");
        }
        if (UpfrontValue != undefined)
            SIP.SIPCalculationByRowID(Rowid);

        Utility.AllowDecimal();
    },


    SIPCalculationByRowID: function (Rowid) {

        var tenure = $('#txt_sip_month').val();
        var inpInstAmtFrom = $('#txt_installment_amount_from_' + Rowid).val();
        var inpInstAmtTo = $('#txt_installment_amount_to_' + Rowid).val();
        var inpTenureMonth = $('#txt_tenure_month_' + Rowid).val();
        var inpUpfrontText = $('#dd_upfront_expression_' + Rowid).val();
        var inpTenuretext = $('#dd_tenure_expression_' + Rowid).val();
        var inpUpfrontValue = $('#txt_upfront_value_' + Rowid).val();

        var calculatedValue = 0.00;

        if (isNaN(inpInstAmtFrom) || inpInstAmtFrom.trim() == "") inpInstAmtFrom = 0;
        if (isNaN(inpInstAmtTo) || inpInstAmtTo.trim() == "") inpInstAmtTo = 0;
        if (isNaN(inpTenureMonth) || inpTenureMonth.trim() == "") inpTenureMonth = 0;
        if (isNaN(inpUpfrontValue) || inpUpfrontValue.trim() == "") inpUpfrontValue = 0;

        inpInstAmtFrom = parseInt(inpInstAmtFrom);
        inpInstAmtTo = parseInt(inpInstAmtTo);
        inpTenureMonth = parseInt(inpTenureMonth);
        inpUpfrontValue = inpUpfrontValue;

        if (inpUpfrontText == "Application based") {
            calculatedValue = "No of SIP Application X " + inpUpfrontValue;//inpInstAmtFrom * inpUpfrontValue;
        }
        else if (inpUpfrontText == "Tenure based") {
            if (inpTenuretext == '<' || inpTenuretext == '≤' || inpTenuretext == 'Any') {
                calculatedValue = "Installment Amt X SIP Tenure X " + inpUpfrontValue + "%";
            }
            else {
                calculatedValue = "Installment Amt X " + inpTenureMonth + " X " + inpUpfrontValue + "%";
            }
        }
        else if (inpUpfrontText == "Installment based") {
            calculatedValue = "Installment Amount X " + inpUpfrontValue + "%";//inpInstAmtFrom * inpUpfrontValue;
        }

        //set the calculated value
        $('#txt_calculated_value_' + Rowid).val(calculatedValue);
    },




    //SetValueOnDropdown: function (elem) {
    //    //var inpUpfrontText = $(elem).html();
    //    var inpUpfrontText = $(elem).val();

    //    var parentColumn = $(elem).closest('.styled-select');
    //    ////set selected item for display
    //    //$(parentColumn).find('button').html(inpUpfrontText + '<span class="caret"></span>');

    //    if ($(parentColumn).find("select[name$='tenure-expression']").length > 0) {
    //        if (inpUpfrontText == "Any") {
    //            var parentRow = $(elem).closest('.sip-row');
    //            $(parentRow).find("input[name$='tenure-month']").val(0);
    //            $(parentRow).find("input[name$='tenure-month']").attr('disabled', 'disabled');
    //        }
    //        else {
    //            var parentRow = $(elem).closest('.sip-row');
    //            //$(parentRow).find("input[name$='tenure-month']").val(0);
    //            $(parentRow).find("input[name$='tenure-month']").attr('disabled', false);
    //        }
    //    }
    //    if (inpUpfrontText == "Application based" || inpUpfrontText == "Tenure based"
    //        || inpUpfrontText == "Installment based") {
    //        SIP.SIPCalculation(elem);
    //    }
    //    else if ($(parentColumn).find("select[name$='tenure-expression']").length > 0) {
    //        SIP.SIPCalculation(elem);
    //    }

    //    var parentRow = $(elem).closest('.sip-row');
    //    //if (inpUpfrontText == "Application based") {
    //    //    var upfront = $(parentRow).find("input[name$='upfront-value']")//.removeClass("number-02");
    //    //    $(upfront).unbind('keypress');
    //    //    $(upfront).removeClass("numberonly");
    //    //    $(upfront).removeClass("number2-02");
    //    //    $(upfront).addClass("numberonly");
    //    //    $(upfront).attr('maxLength', 5);
    //    //    $(upfront).val("");
    //    //}
    //    //if (inpUpfrontText == "Tenure based" || inpUpfrontText == "Installment based") {
    //    //    var upfront = $(parentRow).find("input[name$='upfront-value']")//.removeClass("number-02");
    //    //    $(upfront).unbind('keypress');
    //    //    $(upfront).removeClass("number2-02");
    //    //    $(upfront).removeClass("numberonly");
    //    //    $(upfront).addClass("number2-02");
    //    //    $(upfront).removeAttr('maxLength');
    //    //    $(upfront).val("");
    //    //}

    //    //if (inpUpfrontText == "Application based") {
    //    //    var upfront = $(parentRow).find("input[name$='upfront-value']")//.removeClass("number-02");
    //    //    $(upfront).unbind('keypress');
    //    //    $(upfront).removeClass("numberonly");
    //    //    $(upfront).removeClass("number2-02");
    //    //    $(upfront).addClass("numberonly");
    //    //    $(upfront).attr('maxLength', 6);
    //    //    $(upfront).val("");
    //    //}
    //    //if (inpUpfrontText == "Tenure based" || inpUpfrontText == "Installment based") {
    //    //    var upfront = $(parentRow).find("input[name$='upfront-value']")//.removeClass("number-02");
    //    //    $(upfront).unbind('keypress');
    //    //    $(upfront).removeClass("number2-02");
    //    //    $(upfront).removeClass("numberonly");
    //    //    $(upfront).addClass("number2-02");
    //    //    $(upfront).removeAttr('maxLength');
    //    //    $(upfront).val("");
    //    //}

    //    Utility.AllowDecimal();
    //},

    SetUpfrontClass: function (elem) {
        var inpUpfrontText = $(elem).html();
    },

    //SIPCalculation: function (elem) {
    //    var parentRow = $(elem).closest('.sip-row');
    //    var tenure = $('#txt_sip_month').val();
    //    var inpInstAmtFrom = $(parentRow).find("input[name$='installment-amount-from']").val();
    //    var inpInstAmtTo = $(parentRow).find("input[name$='installment-amount-to']").val();
    //    var inpTenureMonth = $(parentRow).find("input[name$='tenure-month']").val();
    //    var inpTenuretext = $(parentRow).find("select[name$='tenure-expression']").val();//.replace('<span class="caret"></span>', '');
    //    var inpUpfrontValue = $(parentRow).find("input[name$='upfront-value']").val();
    //    var inpUpfrontText = $(parentRow).find("select[name$='upfront-expression']").val();//.replace('<span class="caret"></span>', '');
    //    var calculatedValue = 0.00;

    //    if (isNaN(inpInstAmtFrom) || inpInstAmtFrom.trim() == "") inpInstAmtFrom = 0;
    //    if (isNaN(inpInstAmtTo) || inpInstAmtTo.trim() == "") inpInstAmtTo = 0;
    //    if (isNaN(inpTenureMonth) || inpTenureMonth.trim() == "") inpTenureMonth = 0;
    //    if (isNaN(inpUpfrontValue) || inpUpfrontValue.trim() == "") inpUpfrontValue = 0;

    //    inpInstAmtFrom = parseInt(inpInstAmtFrom);
    //    inpInstAmtTo = parseInt(inpInstAmtTo);
    //    inpTenureMonth = parseInt(inpTenureMonth);
    //    inpUpfrontValue = inpUpfrontValue;

    //    if (inpUpfrontText == "Application based") {
    //        calculatedValue = "No of SIP Application X " + inpUpfrontValue;//inpInstAmtFrom * inpUpfrontValue;
    //    }
    //    else if (inpUpfrontText == "Tenure based") {
    //        if (inpTenuretext == '<' || inpTenuretext == '≤') {
    //            calculatedValue = "Installment Amt X SIP Tenure X " + inpUpfrontValue + "%";
    //        }
    //        else {
    //            calculatedValue = "Installment Amt X " + inpTenureMonth + " X " + inpUpfrontValue + "%";
    //        }
    //        //if (parseInt(inpTenureMonth) < parseInt(tenure)) {
    //        //    calculatedValue = "Installment Amt X " + inpTenureMonth + " X " + inpUpfrontValue;//'Upfront Rate',";
    //        //} else {
    //        //    calculatedValue = "Installment Amt X " + tenure + " X " + inpUpfrontValue;
    //        //}
    //        //if (parseInt(inpTenureMonth) > 120) {
    //        //    calculatedValue = inpInstAmtFrom * 120 * inpUpfrontValue;
    //        //}
    //        //else {
    //        //    calculatedValue = inpInstAmtFrom * inpTenureMonth * inpUpfrontValue;
    //        //}
    //    }
    //    else if (inpUpfrontText == "Installment based") {
    //        calculatedValue = "Installment Amount X " + inpUpfrontValue + "%";//inpInstAmtFrom * inpUpfrontValue;
    //    }

    //    //if (isNaN(calculatedValue)) calculatedValue = 0;

    //    //set the calculated value
    //    $(parentRow).find("input[name$='calculated-value']").val(calculatedValue)
    //},




    AllowNumberOnly: function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            e.preventDefault();
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
        var pagename = Utility.GetParameterValues('ptype');
        if (SIP.TempMemoNumber != '' && (pagename == "mq" || pagename == "ss")) {
            $('#div_mailing_list').show();
            $('#modal_select_to_cc').modal('show');
            SIP.GetTOCCusers(SIP.TempMemoNumber);
        }
        else {
            if ($("#div_landing_grid").is(":visible")) {
                var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
                var selectedmemos = [];
                if (gridData.length > 0) {
                    for (var i = 0; i < gridData.length; i++) {
                        if (gridData[i].selectcheck == 'True') {
                            selectedmemos.push(SIP.remove_tags(gridData[i].MemoNumber));
                        }
                    }
                    if (selectedmemos.toString() == "") {
                        Utility.writeNotification("error", "Select Memo to Send Email", "", true);
                    }
                    else {
                        var memocntsplit = selectedmemos.toString().split(',');
                        //if (memocntsplit.length > 1) {
                        //    $('#div_mailing_list').show();
                        //} else {
                        //    $('#div_mailing_list').hide();
                        //}
                        $('#modal_select_to_cc').modal('show');
                        SIP.GetTOCCusers(selectedmemos.toString());
                    }
                }
                else {
                    Utility.writeNotification("error", "Select Memo to  Send Email", "", true);
                }
            }
            else {

            }
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
                        var fileurl = Utility.SIPReportUrl.replace("###MemoNumber###", SIP.remove_tags(gridData[i].MemoNumber));

                        var filename = SIP.remove_tags(gridData[i].MemoNumber);
                        var sendto = "";
                        Utility.ServiceCall("POST", 'BaseRackRateService.svc/SendEmailMemo', JSON.stringify({ fileurl: fileurl, filename: filename, sendto: sendto, typeval: 1, ModuleID: 4, MailStatus: "Distributor Mail BRR", sendbcc: BCCusers }), "json", false, false, function (result) {
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
        var pagename = Utility.GetParameterValues('ptype');
        if (SIP.TempMemoNumber != '' && (pagename == "mq" || pagename == "ss")) {
            var fileurl = Utility.SIPReportUrl.replace("###MemoNumber###", SIP.TempMemoNumber);
            SIP.openWin(fileurl);
        }
        else {
            if ($("#div_landing_grid").is(":visible")) {
                var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
                var selectedmemos = "";
                if (gridData.length > 0) {
                    for (var i = 0; i < gridData.length; i++) {
                        if (gridData[i].selectcheck == 'True') {
                            selectedmemos = gridData[i].MemoNumber;
                            var fileurl = Utility.SIPReportUrl.replace("###MemoNumber###", SIP.remove_tags(gridData[i].MemoNumber));
                            fileurl = fileurl.replace("###Distributorid###", gridData[i].ARNNo);
                            SIP.openWin(fileurl);
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
        }
    },

    Viewreport: function (paymentmemoid) {
        var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].PaymentMemoId == paymentmemoid) {
                    var fileurl = Utility.SIPReportUrl.replace("###MemoNumber###", SIP.remove_tags(gridData[i].MemoNumber));
                    fileurl = fileurl.replace("###Distributorid###", gridData[i].ARNNo);
                    SIP.openWin(fileurl);
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

        Utility.ServiceCall("POST", 'MasterService.svc/GetAdditionalNotes', JSON.stringify({ MemoTypeID: MemoTypeID, Channel: Channel, DistributorCategory: DistributorCategory, ARNNO: ARNSelected}), "json", false, false, function (result) {
            SIP.TempAdditionalNotes = result.GetAdditionalNotesResult;
            $('#txt_additional_notes').text(SIP.TempAdditionalNotes);
        });
    },

    additionalNotes_old: function () {
        return 'Notes for T 15 cities \n' +
'******************************************************************************** \n ' +
'1) Brokerage rates mentioned above are applicable for all the purchases made from 1st April 2014 to  \n ' +
'30th June 2014  \n ' +
'a) Upfront brokerage: The upfront brokerage payments are computed on the investment value and \n  ' +
'are paid in arrears at the end of each month(unless specified otherwise). \n  ' +
'b) Trail brokerage: The trail amount is calculated on the basis of ' + 'Daily Average Assets' + ' on the  \n ' +
'NAV. This is paid in arrears at the end of each month (unless specified otherwise).  \n ' +
'c) Upfront brokerage is payable on each investment transaction up to Rs.50 Lakh, in the respective  \n ' +
'/ applicable scheme. For each investment transaction with value above Rs.50 Lakh, the  \n ' +
 '   brokerage rate under “Upfront" will be paid out as trail.  \n ' +
  '      2) Recovery of Upfront brokerage paid:  \n ' +
   '         In light of the changes in the Regulations w.e.f. October 1, 2012, a new clause regarding recovery of  \n ' +
    '    upfront brokerage paid to the Distributor, is being introduced in the following manner:  \n ' +
        '       Upfront Brokerage \n ' +
      '  a. The Upfront brokerage paid to a Distributor will be recovered from the Distributor, if the  \n ' +
       ' investment (for which such upfront brokerage was paid) is redeemed before the completion of  \n ' +
        'the Exit Load period/defined holding period for the concerned scheme. For Schemes with  \n ' +
        'defined holding period (as different from exit load period), please see refer no. 4 below  \n ' +
        'b. The recovery would be made on a pro-rata basis i.e. depending upon the number of days for  \n ' +
        'which the investment continued in the concerned scheme before being redeemed, before the  \n ' +
        'completion of the Exit Load period / defined holding period of the concerned scheme.  \n ' +
         '   i. For redemption before the Exit Load period, the recovery of the brokerage will be \n ' +
        'equal to: Upfront Brokerage Paid * (Exit load period in days or defined holding period –  \n ' +
        'Number of days investment stayed) / Exit load periodOR defined holding period in days.  \n ' +
        'For example:  \n ' +
         '   Applicable Upfront Brokerage: 0.40%. Investment Value: Rs. 100,000. Exit load: 1%. Exit load  \n ' +
        'period or defined holding period: 1 year. Redemption by the investor: At the end of 180 days.  \n ' +
        'Brokerage claw back calculations will be as follows:  \n ' +
' Upfront brokerage paid: Rs. 400 (100,000*0.40%)  \n ' +
' Brokerage claw back amount: Rs. 202.74 (400*((365-180)/365))  \n ' +
 '       3) Defined holding period for the following schemes will be as under  \n ' +
  '      Name of the Scheme Period  \n ' +
   '     DSP BlackRock Strategic Bond Fund 182 days  \n ' +
    '    DSP BlackRock Government Securities Fund 182 days  \n ' +
     '   4) Switches: Inter scheme switches will be treated as a normal purchase. Upfront brokerage will be  \n ' +
      '  paid on switches made between schemes (and not plans)which will be treated like a normal  \n ' +
       ' purchase as mentioned above.  \n ' +
       ' 5) The brokerage structure communicated by DSP BlackRock Investment Managers Pvt. Ltd (DSPBRIM)  \n ' +
        'from time-to-time is all inclusive on cost basis to it, i.e. inclusive of any cess, charges, taxes etc  \n ' +
        'that may be incurred by DSPBRIM and is eligible for all the statutory deductions, including income  \n ' +
        'tax, etc. 6) Systematic Investment Plan (SIP)/ Systematic Transfer Plan (STP): [applicable for new SIP/STP  \n ' +
        'registrations]: Any additional brokerage/incentives/paid over & above the attached brokerage  \n ' +
        'structure will not be applicable for SIP/STP’s done during the defined period, unless otherwise  \n ' +
        'specified.  \n ' +
        '7) The rules and regulations of SEBI/AMFI pertaining to brokerage payment to distributors will also be  \n ' +
        'applicable for payment of the above mentioned brokerage structure.  \n ' +
        '8) The above brokerage structure is based on the present total expense ratio permitted by the  \n ' +
        'Regulations. Any downward revision in the limits of total expense ratio, by the Regulations or due  \n ' +
        'to significant increase in AUM of respective funds,will entail a downward change in all forms of  \n ' +
        'applicable brokerage for existing assets and business mobilized during this period.  \n ' +
        '9) DSP BlackRock Investment Managers Pvt. Ltd. (DSPBRIM) reserves the right to change,  \n ' +
        'withdraw, and / or amend the above mentioned terms and conditions, without any prior  \n ' +
        'notice. \n ' +
        '10) DSPBRIM reserves the right to withhold / not pay upfront brokerage /trail brokerage or  \n ' +
        'whatsoever brokerage on any transaction / application, at its sole discretion. \n ' +
        '11) Brokerage payment (including trail brokerage) will be made by the respective schemes of DSP  \n ' +
        'BlackRock Mutual Fund and/or DSP BlackRock Investment Managers Pvt. Ltd.  \n ' +
        '12) The brokerage /Incentive structure mentioned hereinabove is solely payable to AMFI/NISM certified  \n ' +
        'distributors of DSP BlackRock Investment Managers Pvt. Ltd (DSRBRIM). DSPBRIM shall not be  \n ' +
        'responsible for any losses incurred by anyone due to change in the brokerage structure. All  \n ' +
        'distributors shall abide by the code of conduct and rules/regulations laid down by SEBI and AMFI.  \n ' +
        'Also, it is specifically mentioned that the distributor will neither pass on or rebate brokerage  \n ' +
        '/incentive back to investors nor tempt them with gifts /rebate. DSPBRIM will take disciplinary  \n ' +
        'action against any distributor who is found violating the rules, regulations and code of conduct.  \n ' +
        'The distributor shall disclose all commissions (upfront, trail or any other mode) payable to them for  \n ' +
        'the different competing schemes of various Mutual Funds from amongst which the scheme is being  \n ' +
        'recommended to the investor.  \n ' +
        'Notes for B 15 cities – Special Incentive (As per SEBI circular & related guidelines from AMFI)  \n ' +
        '********************************************************************************  \n ' +
        '1) Brokerage rates mentioned above are applicable for all the purchases made from 1st April 2014 to  \n ' +
        '30th June 2014  \n ' +
        'a) Upfront brokerage: The upfront brokerage payments are computed on the investment value  \n ' +
        'and are paid in arrears at the end of each month(unless specified otherwise).Upfront brokerage  \n ' +
        'is payable on each investment transaction up to Rs.50 Lakh, in the respective / applicable  \n ' +
        '    scheme. For each investment transaction with value above Rs.50 Lakh, the brokerage rate  \n ' +
        'under "Upfront" will be paid out as trail.  \n ' +
        'b) Special Upfront Incentive:Special Upfront incentiveis payable on each investment transaction  \n ' +
        'up to Rs.50 Lakh shall be paid at the end of the calendar quarter for which this brokerage  \n ' +
        'structure is applicable. Special Upfront Incentive on each investment transaction will be paid in  \n ' +
        '4 equal installments (quarterly) in case investment amount is above Rs.50 Lakh unless otherwise  \n ' +
        'specified.  \n ' +
        'c) Trail brokerage: The trail amount is calculated on the basis of  ' + 'Daily Average Assets' + ' on the  \n ' +
        'NAV. This is paid in arrears at the end of each month (unless specified otherwise). 2) Recovery of Upfront brokerage and Special Incentive paid: \n ' +
        'In light of the changes in the Regulations w.e.f. October 1, 2012, a new clause regarding recovery of  \n ' +
        'Upfront brokerage paid to the Distributor, is being introduced in the following manner:  \n ' +
        '    Upfront Brokerage \n ' +
        'a. The Upfront brokerage paid to a Distributor will be recovered from the Distributor, if the  \n ' +
        'investment (for which such upfront brokerage was paid) is redeemed before the completion of  \n ' +
        'the Exit Load period/defined holding period for the concerned scheme. For Schemes with  \n ' +
        'defined holding period (as different from exit load period), please see refer no. 3 below  \n ' +
        'b. The recovery would be made on a pro-rata basis i.e. depending upon the number of days for  \n ' +
        'which the investment continued in the concerned scheme before being redeemed, before the  \n ' +
        'completion of the Exit Load period / defined holding period of the concerned scheme.  \n ' +
        '    i. For redemption before the Exit Load period, the recovery of the brokerage will be  \n ' +
        'equal to : Upfront Brokerage Paid * (Exit load period in days or defined holding period  \n ' +
        '– Number of days investment stayed) / Exit load periodOR defined holding period in  \n ' +
        'days.  \n ' +
        'For example:  \n ' +
        '    Applicable Upfront Brokerage: 0.40%. Investment Value: Rs. 100,000. Exit load: 1%. Exit load  \n ' +
        'period or defined holding period: 1 year. Redemption by the investor: At the end of 180 days.  \n ' +
        'Brokerage claw back calculations will be as follows:  \n ' +
' Upfront brokerage paid: Rs. 400 (100,000*0.40%)  \n ' +
' Brokerage claw back amount: Rs. 202.74 (400*((365-180)/365))  \n ' +
 '       3) Defined holding period for the following schemes will be as under  \n ' +
  '      Name of the Scheme Period  \n ' +
        '     DSP BlackRock Strategic Bond Fund 182 days  \n ' +
    '    DSP BlackRock Government Securities Fund 182 days  \n ' +
     '   Special Incentive \n ' +
      '  a. If the investment is redeemed within 1 year from the date of subscription to the concerned  \n ' +
       ' scheme, DSP BlackRock Investment Managers Pvt. Ltd (DSPBRIM) will claw back the entire  \n ' +
        'special incentive paid on that subscription.  \n ' +

        '4) Switches: Inter scheme switches will be treated as a normal purchase. Upfront brokerage will be  \n ' +
        'paid on switches made between schemes (and not plans) which will be treated like a normal  \n ' +
        'purchase as mentioned above.  \n ' +
        '5) The brokerage structure communicated by DSP BlackRock Investment Managers Pvt. Ltd (DSPBRIM)  \n ' +
        'from time-to-time is all inclusiveon cost basis to it, i.e. inclusive of any cess, charges, taxes etc  \n ' +
        'that may be incurred by DSPBRIM and is eligible for all the statutory deductions, including income  \n ' +
        'tax, etc.  \n ' +
        '    6) Systematic Investment Plan (SIP)/ Systematic Transfer Plan (STP): [applicable for new SIP/STP  \n ' +
        'registrations]: Any additional brokerage/incentives/paid over & above the attached brokerage  \n ' +
        'structure will not be applicable for SIP/STP’s done during the defined period, unless otherwise  \n ' +
        'specified. 7) The rules and regulations of SEBI/AMFI pertaining to brokerage payment to distributors will also be  \n ' +
        'applicable for payment of the above mentioned brokerage structure.  \n ' +
        '8) The above brokerage structure is based on the present total expense ratio permitted by the  \n ' +
        'Regulations. Any downward revision in the limits of total expense ratio, by the Regulations or due  \n ' +
        'to significant increase in AUM of respective funds, will entail a downward change in all forms of  \n ' +
        'applicable brokerage for existing assets and business mobilized during this period.  \n ' +
        '9) DSP BlackRock Investment Managers Pvt. Ltd. (DSPBRIM) reserves the right to change, \n ' +
        'withdraw, and / or amend the above mentioned terms and conditions, without any prior  \n ' +
        'notice. \n ' +
        '10) DSPBRIM reserves the right to withhold / not pay upfront brokerage /trail brokerage or  \n ' +
        'whatsoever brokerage on any transaction / application, at its sole discretion. \n ' +
        '11) Brokerage payment (including trail brokerage) will be made by the respective schemes of DSP  \n ' +
        'BlackRock Mutual Fund and/or DSP BlackRock Investment Managers Pvt. Ltd.  \n ' +
        '12) The brokerage /Incentive structure mentioned hereinabove is solely payable to AMFI/NISM certified  \n ' +
        'distributors of DSP BlackRock Investment Managers Pvt. Ltd (DSRBRIM). DSPBRIM shall not be  \n ' +
        'responsible for any losses incurred by anyone due to change in the brokerage structure. All  \n ' +
        'distributors shall abide by the code of conduct and rules/regulations laid down by SEBI and AMFI.  \n ' +
        'Also, it is specifically mentioned that the distributor will neither pass on or rebate brokerage  \n ' +
        '/incentive back to investors nor tempt them with gifts /rebate. DSPBRIM will take disciplinary  \n ' +
        'action against any distributor who is found violating the rules, regulations and code of conduct.  \n ' +
        'The distributor shall disclose all commissions (upfront, trail or any other mode) payable to them for  \n ' +
'the different competing schemes of various Mutual Funds from amongst which the scheme is being  \n ' +
'recommended to the investor. ';

    },

    ViewRemarks: function () {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetRemarksHistory', JSON.stringify({ PaymentMemoId: $("#hidden_payment_memo_id").val() }), "json", false, false, function (result) {
            var remarksHistory = result.GetRemarksHistoryResult;
            $('#tbl_remarks').jqGrid('clearGridData');
            if (remarksHistory.length > 0) {
                $('.remark-count-inner').html(remarksHistory.length);
                for (var i = 0; i < remarksHistory.length; i++)
                    jQuery("#tbl_remarks").jqGrid('addRowData', parseInt(remarksHistory[i].AuditId), remarksHistory[i]);
            }
            else {
                $('.remark-count-inner').html("0");
                // Utility.writeNotification("norecords", "No Records Found", "", false);
            }
        });
    },

    ReturnRadioBox: function (cellValue, option) {
        return '<input type="radio" style="display: block;margin-left: auto;margin-right: auto;" name="radio_' + option.gid + '"  />';
    },

    ReturnSearchHyperLink: function (cellValue, options, rowdata, action) {
        if (rowdata.MemoStatus == "Active" && rowdata.MemoLevel == "A") {
            return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"SIP.ViewScreen(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
        }
        else if (rowdata.MemoStatus == "Active" && rowdata.MemoLevel == "F") {
            return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"SIP.Viewreport(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
        }
        else {
            return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"SIP.ViewScreen(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
        }
    },

    ReturnMemonumberSearchHyperLink: function (cellValue, options, rowdata, action) {
        if (rowdata.MemoStatus == "Active" && rowdata.MemoLevel == "A") {
            return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"SIP.ViewScreen(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
        }
        else if (rowdata.MemoStatus == "Active" && rowdata.MemoLevel == "F") {
            return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"SIP.Viewreport(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
        }
        else {
            return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"SIP.ViewScreen(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
        }
    },

    ReturnBrokerageDetailHyperLink: function (cellValue, options, rowdata, action) {
        return "<a style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;' href='javascript:void(0)'  onclick=\"SIP.BrokerageDetail(" + rowdata.PaymentMemoId + "," + rowdata.SIPRowId + "," + rowdata.SchemeId + ");\">Click Here</a>";
    },

    BrokerageDetail: function (PaymentMemoId, SIPRowId, SchemeId) {
        $("#mdl_view_brokerage_detail").modal('show');
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSIPModifiedRateHistoryDetails', JSON.stringify({ PaymentMemoId: PaymentMemoId, SchemeID: SchemeId, SIPRowId: SIPRowId }), "json", false, false, function (result) {

            var History = result.GetSIPModifiedRateHistoryDetailsResult;

            $('#tbl_view_brokerage_history').jqGrid('clearGridData');
            if (History.length > 0) {
                for (var i = 0; i < History.length; i++)
                    jQuery("#tbl_view_brokerage_history").jqGrid('addRowData', History[i].id, History[i]);
            }
            else {
                Utility.writeNotification("norecords", "No Records Found", "", false);
            }
        });
        //Utility.writeNotification("warning", "In Progress", "", true);
    },

    ViewModifiedRateHistory: function () {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSIPModifiedRateHistory', JSON.stringify({ PaymentMemoId: $("#hidden_payment_memo_id").val(), SIPRowId: 0 }), "json", false, false, function (result) {
            var History = result.GetSIPModifiedRateHistoryResult;

            $('#tbl_modified_rate_history').jqGrid('clearGridData');
            if (History.length > 0) {
                for (var i = 0; i < History.length; i++)
                    jQuery("#tbl_modified_rate_history").jqGrid('addRowData', History[i].id, History[i]);
            }
            else {
                Utility.writeNotification("norecords", "No Records Found", "", false);
            }
        });
    },

    clearFields: function () {

        Utility.ListSearchText = '';
        SIP.SearchClick = true;

        sessionStorage.removeItem("DistributorCategorySIP");
        sessionStorage.removeItem("ChannelSIP");
        sessionStorage.removeItem("ARNSIP");

        $('#btn_modify').prop('disabled', true);
        $('#btn_copy').prop('disabled', true);

        $('#txt_arn').tokenInput('clear');
        $('#dd_dist_category').multiselect('clearSelection');
        $('#dd_channel').multiselect('clearSelection');

        $('#grid_search_result').jqGrid('clearGridData');

        SIP.SearchSIP();
    },

    RemoveToDatePicker: function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 9) {
            $("#dt_to").datepicker("destroy");
            $("#dt_to").val("");
        }
        else {
            return false;
        }
    },

    monthDiff: function (d1, d2) {
        var months;
        var months_dif;

        var toDate = d2;
        var fromDate = d1;

        var f_month, t_month;


        //months = (d2.getFullYear() - d1.getFullYear()) * 12;
        //months -= d1.getMonth() + 1;
        //months += d2.getMonth();
        //return months <= 0 ? 0 : months;


        months_dif = (toDate.getFullYear() * 12 + toDate.getMonth()) - (fromDate.getFullYear() * 12 + fromDate.getMonth());


        //f_month = d1.getMonth();
        //t_month = d2.getMonth();

        //months = parseInt(t_month) - parseInt(f_month) + 1
        return months_dif;
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

    RefreshSearchGrid: function () {
        $('#grid_search_result').trigger("reloadGrid");
    },

    //*************************************************************For Advance Search ********************************************************

    Search_AdvanceSearchClick: function () {
        CreateSIP.SearchClick = true;
        SIP.SearchSIP();
    },

    RefreshSIPGrid: function () {
        Utility.ListSearchText = '';
        CreateSIP.SearchClick = true;
        CreateSIP.GetCreateSIP();
    },

    //*************************************************************For Advance Search ends here ********************************************************

    EmailValid: function () {
        var error = "";
        var Tousers = "";
        var token = $("#txt_to").tokenInput("get");
        var Tonames = [];

        $.each(token, function (i, obj) {
            if (obj.name.indexOf('@') == -1 || obj.name.indexOf('.') == -1) {
                if (error.indexOf("Enter Valid Email") > -1) {
                }
                else {
                    error = "Enter Valid Email";
                }
            }
        });


        var CCusers = "";
        var tokenCC = $("#txt_cc").tokenInput("get");
        var CCnames = [];

        $.each(tokenCC, function (i, obj) {
            if (obj.name.indexOf('@') == -1 || obj.name.indexOf('.') == -1) {
                if (error.indexOf("Enter Valid Email") > -1) {
                }
                else {
                    error = "Enter Valid Email";
                }
            }
        });

        var BCCusers = "";
        var tokenBCC = $("#txt_bcc").tokenInput("get");
        var BCCnames = [];

        $.each(tokenBCC, function (i, obj) {
            if (obj.name.indexOf('@') == -1 || obj.name.indexOf('.') == -1) {
                if (error.indexOf("Enter Valid Email") > -1) {
                }
                else {
                    error = "Enter Valid Email";
                }
            }
        });


        if (error == "") {
            return true;
        }
        else {
            Utility.writeNotification("warning", error, "", true);
            return false;
        }
    },
};


$(function () {

    

    //$('.sip-row').click(function (e) {
    //    e.preventDefault();
    //    var x = $(this).prev().attr('id');
    //    alert(x);

    //});


    $('tr input[type=button]').click(function () {
        id = $(this).closest('tr').attr('id');
    });

    $("#hidden_payment_memo_id").val("0");
    $("#hidden_copied_payment_memo_id").val("0");
    SIP.LoadDropDowns();
   
    //SIP.LoadSIPDetails();

    $grid = $("#grid_search_result");
    var StatusCheck = ['Saved', 'Active', 'Approved', 'Reviewed', 'Initiated'];

    var lastsel3;
    jQuery("#grid_search_result").jqGrid({
        datatype: "local",
        height: 250,
        width: null,
        shrinkToFit: false,
        sortable: true,
        rowNum: 100,
        ignoreCase: true,
        //colNames: ['Select', '<input type="checkbox" id="checkAll" >Select</input>', 'Memo Number', 'Memo Number', 'PaymentMemoId', 'Memo Type', 'Memo Type ID', 'DistributorCategoryId', 'Category', 'ARN No', 'ARN Name', 'From Date', 'To Date', 'Status', 'Status', 'Raised By', 'Raised On', 'Time', 'Ageing', 'Last Action By', 'Pending With'],
        colNames: ['Select', '<input type="checkbox" id="checkAll" >Select</input>', 'Memo Number', 'Memo Number', 'PaymentMemoId', 'Memo Type', 'Memo Type ID', 'DistributorCategoryId', 'Category', 'ARN No', 'ARN Name', 'From Date', 'To Date', 'Status', 'Status', 'Raised By', 'Raised On', 'Time', 'Ageing', 'Last Action By', 'Pending With','isParentId'],
        colModel: [
                { name: 'selectradio', formatter: SIP.ReturnRadioBox, width: '60px;', search: false },
                {
                    name: 'selectcheck', width: '80px;', align: 'center', editable: true, sortable: false, hidden: true, search: false, formatter: 'checkbox', editoptions: { value: "True:False" }, edittype: "checkbox", formatoptions: { disabled: false },
                    cellattr: function (rowId, val, rawObject) {
                        return " class='cbEmpActive'";
                    }
                },
                //{ name: 'selectcheck', width: '60px;', align: 'center', hidden: true, formatter: 'checkbox', editoptions: { value: "True:False" }, edittype: "checkbox", formatoptions: { disabled: false } },
                { name: 'MemoId', index: 'MemoId', align: 'right', formatter: SIP.ReturnSearchHyperLink, sorttype: 'integer', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
                { name: 'MemoNumber', index: 'MemoNumber', align: 'left', hidden: true, formatter: SIP.ReturnMemonumberSearchHyperLink, sorttype: 'integer', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
                { name: 'PaymentMemoId', index: 'PaymentMemoId', align: 'right', hidden: true },
                { name: 'MemoTypeName', index: 'MemoTypeName', width: 120, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'MemoTypeID', index: 'MemoTypeID', hidden: true },
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
                   { name: 'isParentId', index: 'isParentId', align: 'left', sortable: false, sorttype: 'integer', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },

        ],
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
    jQuery("#grid_search_result").jqGrid('filterToolbar', {
        searchOperators: true, stringResult: true, searchOnEnter: false, defaultSearch: "cn", multipleSearch: true, beforeSearch: function () {
            Utility.CustomFilter($('#grid_search_result'), 'MemoId', ["MemoId", "MemoNumber"], SIP.SearchSIP);
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

    ///////Remarks History Table////////
    $("#tbl_remarks").jqGrid({
        //data: mydata,
        height: 400,
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
        height: 400,
        width: null,
        shrinkToFit: false,
        datatype: "local",
        sortable: true,
        rowNum: -1,
        colNames: ['Reference ID', 'AuditId', 'Payment List ID', 'Payment Memo Id', 'Action', 'Action Taken By', 'Date', 'Time', 'Scheme', 'Role', 'SIPRowID', 'SchemeId', 'Brokerage detail'],
        colModel: [
                    { name: 'SIPRowId', index: 'SIPRowId', hidden: true },
                    { name: 'AuditId', index: 'AuditId', width: 800, hidden: true },
                    { name: 'PaymentListId', index: 'PaymentListId', width: 150, hidden: true },
                    { name: 'PaymentMemoId', index: 'PaymentMemoId', width: 150, hidden: true },
                    { name: 'Action', index: 'Action', width: 150, hidden: true, },
                    { name: 'ActionTakenBy', index: 'ActionTakenBy', hidden: true, width: 150 },
                    { name: 'Date', index: 'Date', align: 'center', width: 80 },
                    { name: 'Time', index: 'Time', align: 'center', width: 80 },
                    { name: 'Scheme', index: 'Scheme', width: 200 },
                    { name: 'Role', index: 'Role', width: 80, hidden: true },
                    { name: 'SIPRowId', index: 'SIPRowId', width: 80, hidden: true },
                    { name: 'SchemeId', index: 'SchemeId', width: 80, hidden: true },
                    { name: 'PaymentListId', index: 'PaymentListId', align: 'left', formatter: SIP.ReturnBrokerageDetailHyperLink },
        ],
    });

    ///////Modified History Details Table////////
    $("#tbl_view_brokerage_history").jqGrid({
        height: 400,
        width: null,
        shrinkToFit: false,
        datatype: "local",
        sortable: true,
        rowNum: -1,
        colNames: ['Reference ID', 'Action By', 'Action', 'Scheme', 'Scheme Category', 'Target (SIP)', 'Target Period (In Months)', 'Installment Amount', 'Tenure (In Months)', 'Upfront', 'Amount/ Rate', 'Calculation', 'Payment Type', 'Clawback', 'Remarks', 'Action Date&Time', 'SIPRowID', 'RoleId'],
        colModel: [
                    { name: 'PaymentListId', index: 'PaymentListId', hidden: true },
                    { name: 'ActionBy', index: 'ActionBy' },
                    { name: 'Action', index: 'Action', hidden: true },
                    { name: 'Scheme', index: 'Scheme', width: 250 },
                    { name: 'SchemeCategory', index: 'SchemeCategory', width: 150, },
                    { name: 'Target', index: 'Target', },
                    { name: 'TargetPeriod', index: 'TargetPeriod', },
                    { name: 'InstallmentAmount', index: 'InstallmentAmount', width: 150, },
                    { name: 'Tenure', index: 'Tenure', width: 100, sortable: true, },
                    { name: 'UpfrontPaymentType', index: 'UpfrontPaymentType', width: 80 },
                    { name: 'UpfrontValue', index: 'UpfrontValue', width: 80 },
                    { name: 'Calculation', index: 'Calculation', },
                    { name: 'PaymentType', index: 'PaymentType', width: 80 },
                    { name: 'Clawback', index: 'Clawback', width: 90 },
                    { name: 'SIPIncentiveRemarks', index: 'SIPIncentiveRemarks', width: 80 },
                    { name: 'ActionDateTime', index: 'ActionDateTime' },
                    { name: 'SIPRowId', index: 'SIPRowId', width: 80, hidden: true },
                     { name: 'RoleId', index: 'RoleId', width: 80, hidden: true },
        ],
        afterInsertRow: function (rowid, rowdata) {
            //if (rowdata.RoleId == 1)
            //    $("#tbl_view_brokerage_history").jqGrid('setRowData', rowid, false, { background: '#e3e3e3' });
            //if (rowdata.RoleId == 2)
            //    $("#tbl_view_brokerage_history").jqGrid('setRowData', rowid, false, { background: '#d3e5f3' });
            if (rowdata.RoleId == 3)
                $("#tbl_view_brokerage_history").jqGrid('setRowData', rowid, false, { background: '#e6f3d3' });
            //if (rowdata.RoleId == 4)
            //    $("#tbl_view_brokerage_history").jqGrid('setRowData', rowid, false, { background: '#d7d3f3' });
            if (rowdata.RoleId == 5)
                $("#tbl_view_brokerage_history").jqGrid('setRowData', rowid, false, { background: '#f3e1d3' });
            if (rowdata.RoleId == 6)
                $("#tbl_view_brokerage_history").jqGrid('setRowData', rowid, false, { background: '#b6afe9' });
            if (rowdata.RoleId == 7)
                $("#tbl_view_brokerage_history").jqGrid('setRowData', rowid, false, { background: '#e3e3e3' });
            if (rowdata.RoleId == 8)
                $("#tbl_view_brokerage_history").jqGrid('setRowData', rowid, false, { background: '#d3e5f3' });
            if (rowdata.RoleId == 9)
                $("#tbl_view_brokerage_history").jqGrid('setRowData', rowid, false, { background: '#d7d3f3' });
            if (rowdata.RoleId == 10)
                $("#tbl_view_brokerage_history").jqGrid('setRowData', rowid, false, { background: '#afd0e9' });
            if (rowdata.RoleId == 11)
                $("#tbl_view_brokerage_history").jqGrid('setRowData', rowid, false, { background: '#d1e9af' });
            if (rowdata.RoleId == 12)
                $("#tbl_view_brokerage_history").jqGrid('setRowData', rowid, false, { background: '#b6afe9' });
        }
    });

    $('#dd_sip_target').change(function () {
        var targetValue = $(this).val();
        if (targetValue == 1) {
            $('#txt_sip').prop("disabled", true);
            $('#txt_sip').val("");
            $('#txt_sip_month').prop("disabled", true);
            $('#txt_sip_month').val("");
        }
        else {
            $('#txt_sip').prop("disabled", false);
            $('#txt_sip_month').prop("disabled", false);
        }
    });

    $(".addnewrow").on("click", function () {
        SIP.loadSIPListControls();
        Utility.AllowDecimal();
    });

    $("#div_sip_information").on("click", ".deleterow", function () {
        var $killrow = $(this).parent('tr');
        $killrow.addClass("danger");
        $killrow.fadeOut(2000, function () {
            $(this).remove();
        });
    });

    $("#txt_sip").keypress(function (e) {
        SIP.AllowNumberOnly(e);
    });

    $("#txt_sip_month").keypress(function (e) {
        SIP.AllowNumberOnly(e);
    });

    $("#tblSIPData").on("keypress", "input[name$='installment-amount-from']", function (e) {
        SIP.AllowNumberOnly(e);
    });

    $("#tblSIPData").on("keypress", "input[name$='installment-amount-to']", function (e) {
        SIP.AllowNumberOnly(e);
    });

    $("#tblSIPData").on("keypress", "input[name$='tenure-month']", function (e) {
        SIP.AllowNumberOnly(e);
    });

    //$("#tblSIPData").on("keydown", "input[name$='upfront-value']", function (e) {
    //    SIP.AllowNumberOnly(e);
    //});

    //$("#tblSIPData").on("keyup", "input[name$='installment-amount-from']", function (e) {
    //    if (isNaN($(this).val())) $(this).val("");

    //    SIP.SIPCalculation(this);
    //});

    //$("#tblSIPData").on("keyup", "input[name$='installment-amount-to']", function (e) {
    //    if (isNaN($(this).val())) $(this).val("");

    //    SIP.SIPCalculation(this);
    //});

    //$("#tblSIPData").on("keyup", "input[name$='tenure-month']", function (e) {
    //    if (isNaN($(this).val())) $(this).val("");

    //    SIP.SIPCalculation(this);
    //});

    //$("#tblSIPData").on("keyup", "input[name$='upfront-value']", function (e) {
    //    // if (isNaN($(this).val())) $(this).val("");

    //    SIP.SIPCalculation(this);
    //});

    $("#btn_send_email").click(function () {
        ////////Load Category, Scheme, Upfront Brokerage and Addtional Upfront/////////////
        if (SIP.EmailValid()) {
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

            var pagename = Utility.GetParameterValues('ptype');
            if (SIP.TempMemoNumber != '' && (pagename == "mq" || pagename == "ss")) {
                var fileurl = Utility.SIPReportUrl.replace("###MemoNumber###", SIP.TempMemoNumber);
                var filename = SIP.TempMemoNumber;
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/SendEmailMemo', JSON.stringify({ fileurl: fileurl, filename: filename, sendto: Tousers, sendcc: CCusers, typeval: 1, ModuleID: 4, MailStatus: "Distributor Mail BRR", sendbcc: BCCusers }), "json", false, false, function (result) {
                    Utility.writeNotification("success", "Memo Emailed Successfully", "", true);
                });
                $('#modal_select_to_cc').modal('hide');
            }
            else {
                //var ccusers = selectedcc.toString();
                if ($("#div_landing_grid").is(":visible")) {
                    var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
                    var selectedmemos = "";
                    if (gridData.length > 0) {
                        for (var i = 0; i < gridData.length; i++) {
                            if (gridData[i].selectcheck == 'True') {
                                if (Tousers != "") {
                                    selectedmemos = gridData[i].MemoNumber;
                                    var fileurl = Utility.SIPReportUrl.replace("###MemoNumber###", SIP.remove_tags(gridData[i].MemoNumber));
                                    fileurl = fileurl.replace("###Distributorid###", gridData[i].ARNNo);

                                    var filename = SIP.remove_tags(gridData[i].MemoNumber);
                                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/SendEmailMemo', JSON.stringify({ fileurl: fileurl, filename: filename, sendto: Tousers, sendcc: CCusers, typeval: 1, ModuleID: 4, MailStatus: "Distributor Mail BRR", sendbcc: BCCusers }), "json", false, false, function (result) {
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
                        Utility.writeNotification("error", "Select Memo to  Send Email", "", true);
                    }
                }
            }
        }
    });

    $(".RemoveToDate").on("keyup", function (e) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 9) {
            if (charCode == 8 || charCode == 46) {
                $("#dt_to").datepicker("destroy");
                $("#dt_to").val("");
                $("#dt_from").val("");
            }
        }
        else
            return false;
    });

    $('#dt_from').keydown(function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode == 9) {
            return true;
        }
        else
            return false;
    });

    $('#dt_to').keydown(function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode == 9) {
            return true;
        }
        else
            return false;
    });

    $("#btn_mdl6_remarks").click(function () {
        var ErrorMsg = '';

        if (SIP.TempRackRateStatus == "Discarded")
            ErrorMsg = 'Discard';
        else if (SIP.TempRackRateStatus == "Rejected")
            ErrorMsg = 'Reject';

        var Remarks = $("#txt_remarks").val();

        var Remarks_Button = '';
        Remarks_Button = $("#btn_mdl6_remarks").text();

        if (ErrorMsg != "") {
            if (Remarks != "" && SIP.TempRackRateStatus != "" && SIP.TempRackRateStatus != undefined) {
                SIP.SaveSIPInfo(SIP.TempRackRateStatus, "Memo " + SIP.TempRackRateStatus + " Successfully", 0);
                $('#myModal123').modal('hide');
            }
            else {
                $("#txt_remarks").focus();
                Utility.writeNotification("warning", "Please enter remarks to " + ErrorMsg + " the Memo", "", true);
            }
        }
        else
            $('#myModal123').modal('hide');
    });


    var memono = Utility.GetParameterValues('memono');
    var fromAlert = Utility.GetParameterValues('ptype');
    if (memono != "" && memono != undefined) {
        SIP.loadSchemeCategory();
        SIP.loadScheme();

        if (fromAlert != "" && fromAlert != undefined) {
            if (fromAlert == 'alert') {
                SIP.ViewSIPInformation();
                SIP.masterqueueedit();
            }
        }

        SIP.ShowInformation = true;
        $('#hidden_payment_memo_id').val(memono)
        SIP.BindDetails(memono);
    }
    else {
        SIP.loadSchemeCategory();
        SIP.loadScheme();
        $('#txt_sip_row_id').val(0)
        SIP.NextSIPRowId = 0;
        $('#txt_additional_notes').text(SIP.TempAdditionalNotes);
        SIP.ShowInformation = true;
        loadInputData();

        SIP.UpfrontDropdownOnChange(0);
        SIP.TenureDropdownOnChange(0);
    }

    function loadInputData() {

        var schemeSelected = '';
        var DateFrom = '';
        var Dateto = '';
        if (sessionStorage.CurrentMenuselected == "nav_information") {
            if (sessionStorage.getItem('ARN') != "" || sessionStorage.getItem('DistributorCategory') != "") {
                var memoval = $('#hidden_payment_memo_id').val() == "" ? 0 : $('#hidden_payment_memo_id').val();
                var transactiontype = "";
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/MemoExists', JSON.stringify({ ArnNo: sessionStorage.getItem('ARN'), Channel: "", DistributorCategory: sessionStorage.getItem('DistributorCategory'), schemeid: schemeSelected, DateFrom: DateFrom, DateTo: Dateto, MemoId: memoval, TransactionType: '', MemoType: "5" }), "json", false, false, function (result) {
                    if (result.MemoExistsResult != "")
                        Utility.writeNotification("warning", result.MemoExistsResult, "", true);
                });
            }
        }


        $('#dd_dist_category_info').multiselect('clearSelection');
        var categorySelected = sessionStorage.getItem('DistributorCategory') != null ? sessionStorage.getItem('DistributorCategory').split(",") : '';
        var Arnselected = sessionStorage.getItem('ARN') != null ? sessionStorage.getItem('ARN').split(",") : '';

        $('#txt_arn_info').tokenInput('clear');
        $('#txt_arn_name_info').tokenInput('clear');
        if (Arnselected != null) {
            for (var i = 0; i < Arnselected.length ; i++) {
                $.each(SIP.arns, function (key, value) {
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

                //if (Arnselected != null) {
                //    if (Arnselected.length == 1) {
                //        if (Arnselected[0] != "") {
                //            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChildArn', JSON.stringify({ ArnNo: sessionStorage.getItem('ARN') }), "json", false, false, function (result) {
                //                var Data = result.GetChildArnResult;
                //                if (Data.length < 1) {
                //                    $('#modal_confirmation').modal('show');
                //                }
                //            });
                //        }
                //    }
                //}
            }
            else {
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
            }
            //Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetExitLoad', JSON.stringify({ ID: 0 }), "json", false, false, function (result) {
            //    var data = result.GetExitLoadResult;
            //    var additionalNotes = "";
            //    $.each(data, function (key, value) {
            //        additionalNotes  += value.FundLevel + ' ' + value.ExitLoad + ' \n';
            //    });
            //});
        }
    }
    SIP.additionalNotes(5);
    var RoleID = sessionStorage.getItem("RoleID");
    if (RoleID == 1 || RoleID == 2 || RoleID == 4) {
        $('#div_main_content').hide();
        $('#hdr_no_access').html('No Access');
        return false;
    }

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