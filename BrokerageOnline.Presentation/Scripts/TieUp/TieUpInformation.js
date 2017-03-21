var TieUp = {
    DetailCount: 0,
    ltcount: 0,
    gtcount: 0,
    arns: [],
    arnName: [],
    DistributorCategory: [],
    TieupCount: 0,
    ARNCount: 0,
    DistributorCategoryCount: 0,
    TempPaymentDetails: [],
    TempPaymentList: [],
    TempMonthList: [],
    TempYearList: [],
    TempTrail: [],
    TempLoadedPaymentDetails: [],
    TempRackRateStatus: "",
    TempAdditionalNotes: "",
    TempMemoNumber: '',

    clearFields: function () {
        TieUp.ClearSearchFilter();
        TieUp.SearchTieUp();
    },

    ClearSearchFilter: function () {
        sessionStorage.setItem("DistributorCategory", "");
        sessionStorage.setItem("Channel", "");
        sessionStorage.setItem("ARN", "");
        sessionStorage.setItem('SchemeSelected', "")
        sessionStorage.setItem('SchemeCategoryselected', "")

        $('#txt_arn').tokenInput('clear');
        $('#dd_dist_category').multiselect('clearSelection');
        $('#dd_channel').multiselect('clearSelection');
        $('#dd_Scheme_category_search').multiselect('clearSelection');
        $('#dd_Scheme_search').multiselect('clearSelection');

    },

    OpenRemarks: function (isremark) {
        if (isremark == 1) {
            TieUp.TempRackRateStatus = "";
            $('#btn_mdl6_remarks').text('Ok');
        }
        else {
            if (TieUp.TempRackRateStatus == "Discarded")
                $('#btn_mdl6_remarks').text('Discard');
            else if (TieUp.TempRackRateStatus == "Rejected")
                $('#btn_mdl6_remarks').text('Reject');
            else
                $('#btn_mdl6_remarks').text('Ok');
        }
        $('#myModal123').modal('show');
    },

    ViewTieUpInformation: function () {
        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_information").addClass("active");

        $("#div_btn").empty();
        input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner">0</span></span></button>' +
            '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal"  title="Additional Notes"><img src="../img/file-btn.png"></button>' +
            '<button class="btn mr-right-01 btn-warning sq-btn" onclick=\"TieUp.InitiateSubmit();\">Submit</button>' +
                            ' <button class="btn mr-right-01 btn-success sq-btn" id="btn_save_info" onclick=\"TieUp.SaveTieUp();\">Save</button>' +
            '<button class="btn btn-danger mr-right-01 sq-btn" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');
        $("#div_btn").append(input);

        //sessionStorage.ismasterqueue == "true" ? $('#btn_save_info').prop('disabled', true) : $('#btn_save_info').prop('disabled', false);
        sessionStorage.ismasterqueue = "";

        TieUp.ToggleBaseContols(true);
        $("#lnk_view_remarks").remove();
        $("#lnk_view_rate_trail").remove();
        $("#hdr_name").text("Tie-Up Information");
        $("#div_content").show();
        // $('#div_content').find('input, textarea, button, select').removeAttr("disabled");
        $("#div_add_tie_up").show();
        $("#div_landing_grid").hide();
        $("#div_freeze").hide();
        $("#div_manage").hide();
        $("#div_regenerate").hide();
        $('#div_modified_rate_history').show();
        $('#txt_lumpsum_less_total').attr("disabled", "disabled");
        $('#txt_lumpsum_greater_total').attr("disabled", "disabled");
        $('#dt_from').attr("disabled", "disabled");
        $('#dt_to').attr("disabled", "disabled");
        $('#dd_scheme_category').attr("disabled", "disabled");
        $('#dd_scheme').attr("disabled", "disabled");
        TieUp.RemoveSIP();
    },

    ViewInitiateTieUp: function () {
        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_initiate").addClass("active");

        $("#div_btn").empty();
        input = $('<button class="btn btn-warning sq-btn mr-right-01" onclick="TieUp.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
            '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"TieUp.SearchTieUp();\">Search</button> <button class="btn mr-right-01 btn-warning sq-btn" onclick=\"TieUp.InitiateSubmit();\">Submit</button>');
        $("#div_btn").append(input);

        //if (sessionStorage.RoleID == 5 || sessionStorage.RoleID == 8 || sessionStorage.RoleID == 9)
        //    $("#btn_save_success").disabled = "disabled";

        $("#hdr_name").text("Intitiate Tie-Up");

        $('#grid_search_result').hideCol('selectradio');
        $('#grid_search_result').showCol('selectcheck');
        TieUp.ToggleBaseContols(true);
        $('#grid_search_result').hideCol('MemoNumber');
        $('#grid_search_result').showCol('MemoId');
        $('#grid_search_result').showCol('PendingWith');
        //$('#div_content').find('input, textarea, button, select').removeAttr("disabled");
        $('#dt_from').attr("disabled", "disabled");
        $('#dt_to').attr("disabled", "disabled");
        //$('#dd_scheme_category').attr("disabled", "disabled");
        //$('#dd_scheme').attr("disabled", "disabled");
        $('#txt_lumpsum_less_base').attr("disabled", "disabled")
        $('#txt_lumpsum_less_additional').attr("disabled", "disabled")
        $('#dd_LumpsumSIPType').attr("disabled", "disabled")
        $("#div_content").hide();
        $("#div_add_tie_up").show();
        $("#div_landing_grid").show();
        $("#div_freeze").hide();
        $("#div_manage").hide();
        $("#div_regenerate").hide();
        sessionStorage.CurrentMenuselected = "nav_initiate";
        $('#div_modified_rate_history').show();
        TieUp.AutoSearch();
        TieUp.RemoveSIP();
    },

    ViewTieUpReview: function () {
        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_review").addClass("active");

        $("#div_btn").empty();
        var RoleID = sessionStorage.getItem("RoleID");
        var input = "";
        $('#grid_search_result').hideCol('selectradio');
        $('#grid_search_result').showCol('selectcheck');

        $('#grid_search_result').hideCol('MemoNumber');
        $('#grid_search_result').showCol('MemoId');
        $('#grid_search_result').showCol('PendingWith');
        if (RoleID == "10") {
            input = $('<button class="btn btn-warning sq-btn mr-right-01" onclick="TieUp.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
                '<button class="btn btn-primary sq-btn m`r-right-01" id="btn_search" onclick=\"TieUp.SearchTieUp();\">Search</button>');
            $('#grid_search_result').hideCol('selectcheck');
        }
        else {
            input = $('<button class="btn btn-warning sq-btn mr-right-01" onclick="TieUp.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
              '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"TieUp.SearchTieUp();\">Search</button>' +
                      '<button class="btn btn-warning sq-btn mr-right-01" id="btn_review_Discard" onclick=\"TieUp.review_Discard();\">Discard</button>' +
                      '<button class="btn btn-danger sq-btn mr-right-01" id="btn_review_reject" onclick=\"TieUp.review_Reject();\">Reject</button>' +
                      '<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"TieUp.ReviewForward();\">Forward</button>');
            $('#grid_search_result').showCol('selectcheck');
        }
        $("#div_btn").append(input);

        TieUp.ToggleBaseContols(true);


        // $('#div_content').find('input, textarea, button, select').removeAttr("disabled");
        $('#txt_lumpsum_less_total').attr("disabled", "disabled")
        $('#txt_lumpsum_greater_total').attr("disabled", "disabled")
        $('#txt_lumpsum_less_base').attr("disabled", "disabled")
        $('#txt_lumpsum_less_additional').attr("disabled", "disabled");
        $('#dd_LumpsumSIPType').attr("disabled", "disabled");
        $("#hdr_name").text("Tie-Up Review");

        $("#div_content").hide();
        $("#div_add_tie_up").hide();
        $("#div_landing_grid").show();
        $("#div_freeze").hide();
        $("#div_regenerate").hide();
        $("#div_manage").hide();
        $('#div_modified_rate_history').show();
        sessionStorage.CurrentMenuselected = "nav_review";
        TieUp.AutoSearch();
        TieUp.RemoveSIP();
    },

    ViewTieUpApproval: function () {
        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_approval").addClass("active");

        $("#div_btn").empty();
        //input = $(' <button class="btn btn-warning mr-right-01">Discard</button><button class="btn btn-danger mr-right-01">Reject</button><button class="btn btn-success mr-right-01"  onclick=\"TieUp.TieUpApproval();\">Approve</button><button class="btn btn-success  mr-right-01">Save</button><button class="btn btn-danger mr-right-01" onclick=\"TieUp.CancelTieUp();\">Cancel</button>');
        input = $('<button class="btn btn-warning sq-btn mr-right-01" onclick="TieUp.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
            '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"TieUp.SearchTieUp();\">Search</button> ' +
            '<button class="btn btn-warning sq-btn mr-right-01" id ="btn_approval_Discard" onclick=\"TieUp.ApprovalDiscard();\">Discard</button>' +
            '<button class="btn btn-danger sq-btn mr-right-01" id ="btn_approval_reject" onclick=\"TieUp.ApprovalReject();\">Reject</button>' +
            '<button class="btn btn-success sq-btn mr-right-01" id ="btn_approval_approve" onclick=\"TieUp.TieUpApproval();\">Approve</button>');
        $("#div_btn").append(input);
        TieUp.ToggleBaseContols(true);
        $('#grid_search_result').hideCol('selectradio');
        $('#grid_search_result').showCol('selectcheck');

        $('#grid_search_result').hideCol('MemoNumber');
        $('#grid_search_result').showCol('MemoId');
        $('#grid_search_result').showCol('PendingWith');
        //$('#div_content').find('input, textarea, button, select').removeAttr("disabled");
        $('#txt_lumpsum_less_total').attr("disabled", "disabled")
        $('#txt_lumpsum_greater_total').attr("disabled", "disabled")
        $('#txt_lumpsum_less_base').attr("disabled", "disabled")
        $('#txt_lumpsum_less_additional').attr("disabled", "disabled");
        $('#dd_LumpsumSIPType').attr("disabled", "disabled");
        $("#hdr_name").text("Tie-Up Approval");
        //$("#div_content").show();
        $("#div_content").hide();
        $("#div_add_tie_up").hide();
        $("#div_landing_grid").show();
        $("#div_freeze").hide();
        $("#div_manage").hide();
        $("#div_regenerate").hide();
        sessionStorage.CurrentMenuselected = "nav_approval";
        $('#div_modified_rate_history').show();
        TieUp.AutoSearch();
        TieUp.RemoveSIP();
    },

    ViewFreezeTieUp: function () {

        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_freeze").addClass("active");

        $("#div_btn").empty();
        input = $('<button class="btn btn-warning sq-btn mr-right-01" onclick="TieUp.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
            '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"TieUp.SearchTieUp();\">Search</button> ' +
            '<button class="btn btn-success sq-btn mr-right-01" id="btn_freeze_freeze" onclick=\"TieUp.TieUpFreeze();\">Freeze</button>' +
            '<button id="btn_freeze_Discard" class="btn btn-warning sq-btn mr-right-01"  onclick=\"TieUp.FreezeDiscard();\">Discard</button>');
        $("#div_btn").append(input);
        TieUp.ToggleBaseContols(true);
        $("#hdr_name").text("Freeze Tie-Up");
        $("#div_content").hide();
        //$('#div_content').find('input, textarea, button, select').attr('disabled', 'disabled');
        $('#txt_lumpsum_less_total').attr("disabled", "disabled")
        $('#txt_lumpsum_greater_total').attr("disabled", "disabled")
        $("#div_add_tie_up").hide();
        $("#div_landing_grid").show();
        $("#div_freeze").hide();
        $("#div_manage").hide();
        $("#div_regenerate").hide();

        $('#grid_search_result').hideCol('selectradio');
        $('#grid_search_result').showCol('selectcheck');

        $('#grid_search_result').showCol('MemoNumber');
        $('#grid_search_result').hideCol('MemoId');
        $('#grid_search_result').showCol('PendingWith');
        $('#div_modified_rate_history').show();
        sessionStorage.CurrentMenuselected = "nav_freeze";
        TieUp.AutoSearch();
        TieUp.RemoveSIP();
    },

    ViewManageTieUp: function () {

        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_manage").addClass("active");

        $("#div_btn").empty();
        input = $('<button class="btn btn-warning sq-btn mr-right-01" onclick="TieUp.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
            '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"TieUp.SearchTieUp();\">Search</button> ' +
            '<button class="btn btn-warning sq-btn mr-right-01" onclick=\"TieUp.Viewtoccusers();\" target="_blank">Email</button><button class="btn btn-success sq-btn mr-right-01" onclick=\"TieUp.PrintRackRate();\">Print</button>' +
             '<button class="btn btn-danger sq-btn mr-right-01" id="btn_freeze_regenerate" onclick=\"Regenerate.ViewRegenerate();\">Regenerate</button>');
        $("#div_btn").append(input);
        TieUp.ToggleBaseContols(true);
        $("#hdr_name").text("Manage Tie-Up");
        $("#div_content").hide();
        // $('#div_content').find('input, textarea, button, select').attr('disabled', 'disabled');
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
        TieUp.AutoSearch();
        TieUp.RemoveSIP();
    },

    LoadDropDowns: function () {
        $("#txt_arn").siblings("ul").remove();
        $("#txt_arn_name").siblings("ul").remove();

        $("#txt_arn_process").siblings("ul").remove();
        $("#txt_arn_name_process").siblings("ul").remove();

        TieUp.GetChannel("");

        TieUp.GetDistributorCategory("");
        TieUp.GetSchemeCategorySearch("");
        TieUp.GetSchemeSearch("");

        TieUp.GetARN("");
        TieUp.GetARNName("");

        TieUp.GetDistributorCategory_info("");
        TieUp.GetARN_info("");
        TieUp.GetARNNameInfo("");
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
            TieUp.arns = [];
            TieUp.arns = JSON.parse(result.GetARNResult);
            $("#txt_arn_info").tokenInput(
            TieUp.arns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    //RackRate.GetDistributorInfoARN(item.name, 'add', item.id);
                    TieUp.GetDistributorInfoARN(item.id, 'add', item.id);
                },
                onDelete: function (item) {
                    TieUp.GetDistributorInfoARN(item.id, 'remove', item.id);
                    //RackRate.GetDistributorInfoARN(item.name, 'remove', item.id);
                }
            });
        });
    },

    GetDistributorInfoARN: function (SearchText, mode, id) {
        if (mode == 'add') {
            var memoval = $('#hidden_payment_memo_id').val() == "" ? 0 : $('#hidden_payment_memo_id').val();
            if (memoval == "0") {
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

    GetARNNameInfo: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARNName', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn_name_info").empty();
            TieUp.arnName = JSON.parse(result.GetARNNameResult);
            $("#txt_arn_name_info").tokenInput(
            TieUp.arnName,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    //RackRate.LoadinfoARNToken(item.name, 'add', item.id);
                    TieUp.LoadinfoARNToken(item.id, 'add', item.id);
                },

                onDelete: function (item) {
                    //RackRate.LoadinfoARNToken(item.name, 'remove', item.id);
                    TieUp.LoadinfoARNToken(item.id, 'remove', item.id);
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

                    TieUp.GetDistributorCategory(selected.valueOf());
                    TieUp.GetARNForChannelAndDistributorCategory();
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
            TieUp.arns = [];
            TieUp.arns = JSON.parse(result.GetARNForChannelAndDistributorCategoryResult);
            $(".token-input-list-facebook").remove();

            $("#txt_arn").empty();
            $("#txt_arn").tokenInput(
            TieUp.arns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    TieUp.GetDistributor(item.id, 'add', item.id);
                },
                onDelete: function (item) {
                    TieUp.GetDistributor(item.id, 'remove', item.id);
                }
            });


            $("#txt_arn_name").tokenInput(
           TieUp.arnName,
           {
               theme: "facebook", preventDuplicates: true, resultsLimit: 10,
               onAdd: function (item) {
                   TieUp.LoadARNToken(item.id, 'add', item.id);
               },

               onDelete: function (item) {
                   TieUp.LoadARNToken(item.id, 'remove', item.id);
               }
           });

        });

    },

    GetDistributorCategory: function (SearchText) {
        var arr = SearchText == "" ? "" : SearchText.toString();

        arr = JSON.stringify(arr)

        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorCategory', '{"SearchText": ' + arr + '}', "json", false, false, function (result) {
            var arrItems = result.GetDistributorCategoryResult;
            TieUp.DistributorCategory = arrItems;
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

                //    TieUp.GetARNForChannelAndDistributorCategory();
                //}
            });

        });
    },

    GetSchemeCategorySearch: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeCategory', JSON.stringify({ SearchText: "", MemoTypeId: "2", IsCloseEnded: "2" }), "json", false, false, function (result) {
            var arrItems = result.GetSchemeCategoryResult;

            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeCategoryName).val(arrItems[i].SchemeCategoryId).appendTo("#dd_Scheme_category_search");
            }
            $('#dd_Scheme_category_search').attr("multiple", "multiple");

            $('#dd_Scheme_category_search').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                onChange: function (element, checked) {
                    var brands = $('#dd_scheme_category option:selected');
                    var selected = [];
                    $(brands).each(function (index, brand) {
                        selected.push([$(this).val()]);
                    });
                    if (selected.valueOf() != "") {
                        TieUp.GetScheme(selected.valueOf());
                    }
                    else {
                        $("#dd_scheme").multiselect('destroy');
                        $("#dd_scheme").empty();
                        $('#dd_scheme').multiselect('rebuildscheme');
                    }
                }
            });

            $('#dd_Scheme_category_search').multiselect('clearSelection');
        });
    },

    GetSchemeSearch: function (SearchText) {
        var arr = SearchText == "" ? "" : SearchText.toString();
        arr = JSON.stringify(arr)
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetScheme', '{"SearchText": ' + arr + ', "MemoTypeId": "2", "IsCloseEnded": "2"}', "json", false, false, function (result) {
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

    GetSchemeCategory: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeCategory', JSON.stringify({ SearchText: "", MemoTypeId: "2", IsCloseEnded: "2" }), "json", false, false, function (result) {
            var arrItems = result.GetSchemeCategoryResult;

            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeCategoryName).val(arrItems[i].SchemeCategoryId).appendTo("#dd_scheme_category");
            }
            $('#dd_scheme_category').attr("multiple", "multiple");

            $('#dd_scheme_category').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                //nonSelectedText: "Select Scheme Category",
                onChange: function (element, checked) {
                    var brands = $('#dd_scheme_category option:selected');
                    var selected = [];
                    $(brands).each(function (index, brand) {
                        selected.push([$(this).val()]);
                    });
                    if (selected.valueOf() != "") {
                        TieUp.GetScheme(selected.valueOf());
                    }
                    else {
                        $("#dd_scheme").multiselect('destroy');
                        $("#dd_scheme").empty();
                        $('#dd_scheme').multiselect('rebuildscheme');
                    }
                }
            });
            $('#dd_scheme_category').multiselect('disable');
            $('#dd_scheme_category').multiselect('clearSelection');
        });
    },

    GetScheme: function (SearchText) {
        var arr = SearchText == "" ? "" : SearchText.toString();
        arr = JSON.stringify(arr)
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetScheme', '{"SearchText": ' + arr + ', "MemoTypeId": "2", "IsCloseEnded": "2"}', "json", false, false, function (result) {
            var arrItems = result.GetSchemeResult;
            $("#dd_scheme").multiselect('destroy');
            $("#dd_scheme").empty();
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeName).val(arrItems[i].SchemeId).appendTo('#dd_scheme');
            }
            $('#dd_scheme').attr("multiple", "multiple");

            $('#dd_scheme').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                //nonSelectedText: "Select Scheme",

            });
            $('#dd_scheme').multiselect('clearSelection');
            $('#dd_scheme').multiselect('disable');
        });
    },

    GetARN: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARN', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn").empty();
            TieUp.arns = JSON.parse(result.GetARNResult);
            $("#txt_arn").tokenInput(
            TieUp.arns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    TieUp.GetDistributor(item.id, 'add', item.id);
                },
                onDelete: function (item) {
                    TieUp.GetDistributor(item.id, 'remove', item.id);
                }
            });
        });
    },

    GetARNName: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARNName', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn_name").empty();
            TieUp.arnName = JSON.parse(result.GetARNNameResult);
            $("#txt_arn_name").tokenInput(
            TieUp.arnName,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    TieUp.LoadARNToken(item.id, 'add', item.id);
                },

                onDelete: function (item) {
                    TieUp.LoadARNToken(item.id, 'remove', item.id);
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
    },

    GetDistributor: function (SearchText, mode, id) {
        if (mode == 'add') {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                var Data = result.GetDistributorBasedOnIDResult;

                $("#txt_arn_name").tokenInput("remove", { id: id });
            });

        }
        else {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                var Data = result.GetDistributorBasedOnIDResult;

                $("#txt_arn_name").tokenInput("remove", { id: id });
            });
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

    RefreshSearchGrid: function () {
        $('#grid_search_result').trigger("reloadGrid");
    },

    RefreshGridDetails: function () {
        Utility.ListSearchText = '';
        TieUp.SearchTieUp();
    },

    SearchTieUp: function () {
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


        var localSchemeCategory = $('#dd_Scheme_category_search option:selected');
        var localSchemeCategoryselected = [];
        $(localSchemeCategory).each(function () {
            localSchemeCategoryselected.push([$(this).val()]);
        });

        var localScheme = $('#dd_Scheme_search option:selected');
        var localSchemeselected = [];
        $(localScheme).each(function () {
            localSchemeselected.push([$(this).val()]);
        });


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
        sessionStorage.setItem('SchemeSelected', localSchemeselected.toString())
        sessionStorage.setItem('SchemeCategoryselected', localSchemeCategoryselected.toString())

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

        var MasterQueueStatus = "";
        Utility.ServiceCall("POST", 'TieUpService.svc/SearchTieUp', JSON.stringify({ ARNNo: ARNNo, Channel: Channel, DistributorCategory: DistributorCategory, Status: SearchStatus, ARNName: ARNName, MasterQueueStatus: MasterQueueStatus, SchemeCategory: localSchemeCategoryselected.toString(), scheme: localSchemeselected.toString(), SearchFilter: Utility.ListSearchText, DateFrom: "", DateTo: "", MemoLevel: MemoLevel }), "json", false, false, function (result) {
            SearchGridResult = result.SearchTieUpResult;
            $('#grid_search_result').jqGrid('clearGridData');
            if (SearchGridResult.length > 0) {
                for (var i = 0; i < SearchGridResult.length; i++)
                    jQuery("#grid_search_result").jqGrid('addRowData', SearchGridResult[i].id, SearchGridResult[i]);
            }
            else {
                Utility.writeNotification("error", "No Records Found", "", true);
            }

        });
    },

    BindDetails: function (PaymemtMemoID) {
        if (PaymemtMemoID != "") {
            var PaymentList = [];
            var tempPaymentList = [];
            TieUp.TempMonthList = [];
            TieUp.TempYearList = [];
            TieUp.TempPaymentList = [];
            TieUp.TempLoadedPaymentDetails = [];
            TieUp.TempPaymentDetails = [];
            TieUp.TempMemoNumber = '';
            TieUp.copyRowNumber = 0;
            //  $('#btn_save_info').attr('disabled', 'disabled')

            $('#div_tie_up_detail').empty();
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentMemo', '{"PaymentMemoID": ' + PaymemtMemoID + '}', "json", false, false, function (result) {
                var PaymentMemo = result.GetPaymentMemoResult[0];
                TieUp.TempMemoNumber = PaymentMemo.MemoNumber;
                $("#hidden_payment_memo_id").val(PaymentMemo.PaymentMemoId);

                var ApplicableTo = PaymentMemo.ApplicableTo.split(",");
                $('#chk_t15').removeAttr('checked');
                $('#chk_b15').removeAttr('checked');
                $('#chk_bothTandB').removeAttr('checked');

                $.each(ApplicableTo, function (key, value) {
                    switch (value) {
                        case "1":
                            $('#chk_t15').prop('checked', true);
                            break;
                        case "2":
                            $('#chk_b15').prop('checked', true);
                            break;
                        case "3":
                            $('#chk_bothTandB').prop('checked', true);
                            break;
                    }
                });
                //if (PaymentMemo.MemoStatus == "Saved") {
                //    $("#txt_remarks").val(PaymentMemo.Remarks)
                //} else {
                $("#txt_remarks").val("");
                //}
                //$("#txt_remarks").text(PaymentMemo.Remarks);
                $("#txt_additional_notes").text(PaymentMemo.Comments);
                $("#txt_others").val(PaymentMemo.TransactionTypeOthers);

                $("#dt_from").val(PaymentMemo.DateFrom);
                $("#dt_to").val(PaymentMemo.DateTo);
                if (PaymentMemo.MemoNumber == "")
                {
                    $('#btnInfoMemoNumber').html("Memo No:" + PaymentMemo.PaymentMemoId);
                }
                else
                {
                    $('#btnInfoMemoNumber').html("Memo No:" + PaymentMemo.MemoNumber);
                }
                $('#dd_LumpsumSIPType').val(PaymentMemo.LumpsumSIPTypeId); //sini
                $('#btnInfoMemoNumber').show();
                sessionStorage.setItem("MemoStatus", PaymentMemo.MemoStatus);
                sessionStorage.setItem("LoginUserId", PaymentMemo.LoginId);
                //sessionStorage.setItem("CreatedByEmail", PaymentMemo.CreatedByEmail);

            });

            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentList', '{"PaymentMemoID": ' + $("#hidden_payment_memo_id").val() + '}', "json", false, false, function (result) {
                var PaymentList = result.GetPaymentListResult;
                var paymentDetail;
                TieUp.DetailCount = PaymentList.length;

                var objList = [];
                var monthdata = [];
                var yeardata = [];
                if (TieUp.DetailCount > 0) {

                    $("#txt_arn_info").tokenInput('clear');
                    var ARNNoArr = PaymentList[0].ARNNO.split(",");
                    $.each(TieUp.arns, function (key, value) {
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
                    $('#chk_Gross_Mobilization').removeAttr('checked');
                    $('#chk_Nett_Mobilization').removeAttr('checked');
                    $('#chk_Folio').removeAttr('checked');
                    var PaymentBasis = PaymentList[0].PaymentBasis.split(",");

                    $.each(PaymentBasis, function (key, value) {
                        switch (value) {
                            case "1":
                                $('#chk_Gross_Mobilization').prop('checked', true);
                                break;
                            case "2":
                                $('#chk_Nett_Mobilization').prop('checked', true);
                                break;
                            case "3":
                                $('#chk_Folio').prop('checked', true);
                                break;
                        }
                    });


                    $("#txt_Folio").val(PaymentList[0].Folio);
                }

                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentDetails', '{"PaymentMemoID": ' + $("#hidden_payment_memo_id").val() + '}', "json", false, false, function (result) {

                    paymentDetail = result.GetPaymentDetailsResult;
                    TieUp.TempLoadedPaymentDetails = paymentDetail;
                    for (var cnt = 0; cnt < TieUp.DetailCount; cnt++) {
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
                        if (PaymentList[cnt].Onwards == "1") {
                            $('#chk_onwards').prop('checked', true);
                        }
                        else {
                            $('#chk_onwards').prop('checked', false);
                        }
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
                                    objList.LumpSumLessTieup = paymentDetail[detcount].LumpSumLessTieup;
                                    objList.Total = paymentDetail[detcount].Total;
                                    objList.LumpSumGreaterTieup = paymentDetail[detcount].LumpSumGreaterTieup;
                                    objList.LumpSumGreater = paymentDetail[detcount].LumpSumGreater;
                                    objList.LumpSumGreaterTotal = paymentDetail[detcount].LumpSumGreaterTotal;
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
                                    detailitem["LumpSumLessTieup"] = paymentDetail[detcount].LumpSumLessTieup;
                                    detailitem["Total"] = paymentDetail[detcount].Total;
                                    detailitem["LumpSumGreaterTieup"] = paymentDetail[detcount].LumpSumGreaterTieup;
                                    detailitem["LumpSumGreater"] = paymentDetail[detcount].LumpSumGreater;
                                    detailitem["LumpSumGreaterTotal"] = paymentDetail[detcount].LumpSumGreaterTotal;
                                    detailitem["SIPSlabLess"] = paymentDetail[detcount].SIPSlabLess;
                                    detailitem["SIPSlabGreater"] = paymentDetail[detcount].SIPSlabGreater;
                                    detailitem["PeriodStart"] = 0;
                                    detailitem["PeriodEnd"] = 0;
                                    detailitem["PeriodType"] = 0;
                                    detailitem["IsCopied"] = 0;
                                    TieUp.TempPaymentDetails.push(detailitem);
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
                                    detailitem["LumpSumLessTieup"] = 0;
                                    detailitem["Total"] = 0;
                                    detailitem["LumpSumGreaterTieup"] = 0;
                                    detailitem["LumpSumGreater"] = 0;
                                    detailitem["LumpSumGreaterTotal"] = 0;
                                    detailitem["SIPSlabLess"] = 0;
                                    detailitem["SIPSlabGreater"] = 0;
                                    detailitem["PeriodStart"] = 0;
                                    detailitem["PeriodEnd"] = 0;
                                    detailitem["PeriodType"] = 0;
                                    detailitem["IsCopied"] = 0;
                                    TieUp.TempPaymentDetails.push(detailitem);
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
                                            LumpSumGreaterTotal: paymentDetail[detcount].LumpSumGreaterTotal,
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
                                        detailitem["LumpSumLessTieup"] = paymentDetail[detcount].LumpSumLessTieup;
                                        detailitem["Total"] = paymentDetail[detcount].Total;
                                        detailitem["LumpSumGreaterTieup"] = paymentDetail[detcount].LumpSumGreaterTieup;
                                        detailitem["LumpSumGreater"] = paymentDetail[detcount].LumpSumGreater;
                                        detailitem["LumpSumGreaterTotal"] = paymentDetail[detcount].LumpSumGreaterTotal;
                                        detailitem["SIPSlabLess"] = paymentDetail[detcount].SIPSlabLess;
                                        detailitem["SIPSlabGreater"] = paymentDetail[detcount].SIPSlabGreater;
                                        detailitem["monthperiods"] = period;
                                        detailitem["PeriodStart"] = paymentDetail[detcount].PeriodStart;
                                        detailitem["PeriodEnd"] = paymentDetail[detcount].PeriodEnd;
                                        detailitem["PeriodType"] = 1;
                                        detailitem["IsCopied"] = 0;
                                        TieUp.TempMonthList.push(detailitem);
                                        TieUp.TempPaymentDetails.push(detailitem);
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
                                            LumpSumGreaterTotal: paymentDetail[detcount].LumpSumGreaterTotal,
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
                                        detailitem["LumpSumLessTieup"] = paymentDetail[detcount].LumpSumLessTieup;
                                        detailitem["Total"] = paymentDetail[detcount].Total;
                                        detailitem["LumpSumGreaterTieup"] = paymentDetail[detcount].LumpSumGreaterTieup;
                                        detailitem["LumpSumGreater"] = paymentDetail[detcount].LumpSumGreater;
                                        detailitem["LumpSumGreaterTotal"] = paymentDetail[detcount].LumpSumGreaterTotal;
                                        detailitem["SIPSlabLess"] = paymentDetail[detcount].SIPSlabLess;
                                        detailitem["SIPSlabGreater"] = paymentDetail[detcount].SIPSlabGreater;
                                        detailitem["monthperiods"] = period;
                                        detailitem["PeriodStart"] = paymentDetail[detcount].PeriodStart;
                                        detailitem["PeriodEnd"] = paymentDetail[detcount].PeriodEnd;
                                        detailitem["PeriodType"] = 2;
                                        detailitem["IsCopied"] = paymentDetail[detcount].IsCopied;
                                        TieUp.TempYearList.push(detailitem);
                                        TieUp.TempPaymentDetails.push(detailitem);
                                    }

                                }
                            }
                        }
                        objList.monthperiods = monthperiods;
                        objList.yearcount = yearcount;
                        objList.mothyearvalue = monthperiods + "~" + yearcount;
                        TieUp.TempPaymentList.push(objList);

                    }
                });
                Utility.AllowDecimal();
                Utility.AllowAlphaNumeric();

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
                            // maxDate: maxdate,
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

                // $("#dt_to").datepicker("option", "minDate", $("#dt_from").val());

                if (sessionStorage.MemoStatus == "Active" || sessionStorage.MemoStatus == "InActive") {
                    $("#lnk_view_remarks").remove();
                    $("#lnk_view_rate_trail").remove();
                    $('#div_content').find('input, textarea, button, select').removeAttr("disabled");
                }

                var mode = Utility.GetParameterValues('mode');
                if (mode != null) {
                    $("#hidden_copied_payment_memo_id").val($("#hidden_payment_memo_id").val());
                    $("#hidden_payment_memo_id").val(0);
                    $('#btn_save_info').prop('disabled', false);
                }
            });
            TieUp.ViewRemarks();
            TieUp.GetScheme("1,2,3,4,5,6,7,8,9");
            TieUp.BindEditSchemeDetail(1);
            //TieUp.ViewModifiedRateHistory();
            var mode = Utility.GetParameterValues('mode');
            if (mode != null) {
                $("#hidden_payment_memo_id").val(0);
            }
            if (sessionStorage.MemoStatus == "Active" || sessionStorage.MemoStatus == "InActive") {
                $('#div_content').find('input, textarea, select').attr("disabled", "disabled");
                $('#a_copy').hide();
                $('#a_delete').hide();
            }
        }
        else {
            Utility.writeNotification("warning", "Invalid Payment Memo ID", "", true);
            //alert("Invalid Payment Memo ID");
        }

    },

    CreateControlsUpdate: function (tempPaymentList, monthlist, yearlist) {
        var ltMonthData = [];
        var gtMonthData = [];
        var ltYearData = [];
        var gtYearData = [];

        for (var i = 0; i < monthlist.length; i++) {
            if (monthlist[i].IsSlabLess == "1") {
                ltMonthData.push(monthlist[i]);
            }
            else {
                gtMonthData.push(monthlist[i]);
            }
        }

        for (var i = 0; i < yearlist.length; i++) {
            if (yearlist[i].IsSlabLess == "1") {
                ltYearData.push(yearlist[i]);
            }
            else {
                gtYearData.push(yearlist[i]);
            }
        }

        $('#div_tie_up_detail_less_than_section').empty()
        $('#div_tie_up_detail_greater_than_section').empty()

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

    BindSchemeDetails: function (SchemeID, Arn, DistributorID) {
        if (SchemeID != "") {

            var tempPaymentList = [];
            var monthdata = [];
            var yeardata = [];

            TieUp.TempPaymentList = [];
            TieUp.TempPaymentDetails = [];
            TieUp.TempMonthList = [];
            TieUp.TempYearList = [];

            $(SchemeID).each(function (obj, scheme) {
                //Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentListByScheme', JSON.stringify({ SchemeID: scheme, ARN: names.toString(), DistributorCategory: Categoryselected.toString() }), "json", false, false, function (result) {
                //Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentListByScheme',  JSON.stringify({ SchemeID: scheme, ARN: Arn, DistributorCategoryId: })'{"": ' + scheme + '}', "json", false, false, function (result) {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentListForTieupOnCreate', JSON.stringify({ SchemeID: scheme, ARN: Arn, DistributorCategory: DistributorID, DateFrom: $('#dt_from').val(), DateTo: $('#dt_to').val() }), "json", false, false, function (result) {
                    var PaymentList = result.GetPaymentListForTieupOnCreateResult;
                    var monthperiods = ""; var yearperiods = "";
                    if (PaymentList != null) {
                        var paymentDetail;
                        var objList = [];
                        objList = {
                            PaymentListId: TieUp.DetailCount,
                            scheme_category: PaymentList.SchemeCategoryName,
                            schemecategoryid: PaymentList.SchemeCategoryId,
                            scheme: PaymentList.SchemeName,
                            schemeid: PaymentList.SchemeId,
                            claw_back: PaymentList.Clawback,
                            slab_amount: PaymentList.SlabAmount,
                            PaymentType: PaymentList.PaymentType,
                            SlabType: PaymentList.SlabType,
                            Onwards: PaymentList.Onwards,
                            SIPSlab: PaymentList.SIPSlab
                        };
                        if (PaymentList.Onwards == "1") {
                            $('#chk_onwards').prop('checked', true);
                        }
                        else {
                            $('#chk_onwards').prop('checked', false);
                        }
                        $('#hidden_payment_memo_link_id').val(PaymentList.PaymentMemoId);
                        //$('#txt_sip_slab').val(PaymentList.SIPSlab);
                        //$('#spn_sip_slab_less').html(PaymentList.SIPSlab);
                        //$('#spn_sip_slab_greater').html(PaymentList.SIPSlab);
                        //$('#spn_trail_sip_slab_less').html(PaymentList.SIPSlab);
                        //$('#spn_trail_sip_slab_greater').html(PaymentList.SIPSlab);

                        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentDetailsByScheme', '{"SchemeID": ' + scheme + ',"PaymentMemoID": ' + PaymentList.PaymentMemoId + '}', "json", false, false, function (result) {

                            paymentDetail = result.GetPaymentDetailsBySchemeResult;
                            var yearcount = 0;
                            for (detcount = 0; detcount < paymentDetail.length; detcount++) {
                                if (PaymentList.SchemeId == paymentDetail[detcount].SchemeId) {
                                    if (paymentDetail[detcount].BrokerageTypeId == 1) {
                                        objList.UpfrontDetailId = paymentDetail[detcount].PaymentDetailsId;
                                        objList.aadl_incentive_type = 0;
                                        objList.Base = paymentDetail[detcount].BaseUpfront;
                                        objList.Additional = paymentDetail[detcount].AdditionalIncentives;
                                        objList.LumpSumLessTieup = paymentDetail[detcount].LumpSumLessTieup;
                                        objList.Total = paymentDetail[detcount].Total;
                                        objList.LumpSumGreaterTieup = paymentDetail[detcount].LumpSumGreaterTieup;
                                        objList.LumpSumGreater = paymentDetail[detcount].LumpSumGreater;
                                        objList.LumpSumGreaterTotal = paymentDetail[detcount].LumpSumGreaterTotal;
                                        objList.SIPSlabLess = paymentDetail[detcount].SIPSlabLess;
                                        objList.SIPSlabGreater = paymentDetail[detcount].SIPSlabGreater;

                                        var detailitem = {}
                                        detailitem["schemeid"] = PaymentList.SchemeId;
                                        detailitem["schemecategoryid"] = PaymentList.SchemeCategoryId;
                                        detailitem["scheme_category"] = PaymentList.SchemeCategoryName;
                                        detailitem["scheme"] = PaymentList.SchemeName;
                                        detailitem["BrokerageTypeId"] = 1;
                                        detailitem["Base"] = paymentDetail[detcount].BaseUpfront;
                                        detailitem["Additional"] = paymentDetail[detcount].AdditionalIncentives;
                                        detailitem["LumpSumLessTieup"] = paymentDetail[detcount].LumpSumLessTieup;
                                        detailitem["Total"] = paymentDetail[detcount].Total;
                                        detailitem["LumpSumGreaterTieup"] = paymentDetail[detcount].LumpSumGreaterTieup;
                                        detailitem["LumpSumGreater"] = paymentDetail[detcount].LumpSumGreater;
                                        detailitem["LumpSumGreaterTotal"] = paymentDetail[detcount].LumpSumGreaterTotal;
                                        detailitem["SIPSlabLess"] = paymentDetail[detcount].SIPSlabLess;
                                        detailitem["SIPSlabGreater"] = paymentDetail[detcount].SIPSlabGreater;
                                        detailitem["PeriodStart"] = 0;
                                        detailitem["PeriodEnd"] = 0;
                                        detailitem["PeriodType"] = 0;
                                        detailitem["IsCopied"] = 0;
                                        TieUp.TempPaymentDetails.push(detailitem);
                                    }

                                    if (paymentDetail[detcount].BrokerageTypeId == 2) {
                                        objList.addl_upfront_B15_id = paymentDetail[detcount].PaymentDetailsId;
                                        objList.addl_upfront_B15 = paymentDetail[detcount].BaseUpfront;

                                        var detailitem = {}
                                        detailitem["schemeid"] = PaymentList.SchemeId;
                                        detailitem["schemecategoryid"] = PaymentList.SchemeCategoryId;
                                        detailitem["scheme_category"] = PaymentList.SchemeCategoryName;
                                        detailitem["scheme"] = PaymentList.SchemeName;
                                        detailitem["BrokerageTypeId"] = 2;
                                        detailitem["Base"] = paymentDetail[detcount].BaseUpfront;
                                        detailitem["LumpSumLessTieup"] = 0;
                                        detailitem["Additional"] = 0;
                                        detailitem["Total"] = 0;
                                        detailitem["LumpSumGreaterTieup"] = 0;
                                        detailitem["LumpSumGreater"] = 0;
                                        detailitem["LumpSumGreaterTotal"] = 0;
                                        detailitem["SIPSlabLess"] = 0;
                                        detailitem["SIPSlabGreater"] = 0;
                                        detailitem["PeriodStart"] = 0;
                                        detailitem["PeriodEnd"] = 0;
                                        detailitem["PeriodType"] = 0;
                                        detailitem["IsCopied"] = 0;
                                        TieUp.TempPaymentDetails.push(detailitem);
                                    }

                                    if (paymentDetail[detcount].BrokerageTypeId == 3) {
                                        if (paymentDetail[detcount].PeriodType == '1') {
                                            month = {
                                                schemeid: PaymentList.SchemeId,
                                                schemecategoryid: PaymentList.SchemeCategoryId,
                                                scheme: PaymentList.SchemeName,
                                                PaymentDetailsId: paymentDetail[detcount].PaymentDetailsId,
                                                Period: "Months",
                                                Duration: paymentDetail[detcount].PeriodStart + ' - ' + paymentDetail[detcount].PeriodEnd,
                                                Base: paymentDetail[detcount].BaseUpfront,
                                                Additional: paymentDetail[detcount].AdditionalIncentives,
                                                LumpSumLessTieup: paymentDetail[detcount].LumpSumLessTieup,
                                                Total: paymentDetail[detcount].Total,
                                                LumpSumGreaterTieup: paymentDetail[detcount].LumpSumGreaterTieup,
                                                LumpSumGreater: paymentDetail[detcount].LumpSumGreater,
                                                LumpSumGreaterTotal: paymentDetail[detcount].LumpSumGreaterTotal,
                                                SIPSlabLess: paymentDetail[detcount].SIPSlabLess,
                                                SIPSlabGreater: paymentDetail[detcount].SIPSlabGreater,


                                            };
                                            monthperiods = monthperiods == "" ? paymentDetail[detcount].PeriodStart + ' - ' + paymentDetail[detcount].PeriodEnd : monthperiods + "," + paymentDetail[detcount].PeriodStart + ' - ' + paymentDetail[detcount].PeriodEnd;
                                            monthdata.push(month);

                                            var detailitem = {}
                                            detailitem["schemeid"] = PaymentList.SchemeId;
                                            detailitem["schemecategoryid"] = PaymentList.SchemeCategoryId;
                                            detailitem["scheme_category"] = PaymentList.SchemeCategoryName;
                                            detailitem["scheme"] = PaymentList.SchemeName;
                                            detailitem["BrokerageTypeId"] = 3;
                                            detailitem["Base"] = paymentDetail[detcount].BaseUpfront;
                                            detailitem["Additional"] = paymentDetail[detcount].AdditionalIncentives;
                                            detailitem["LumpSumLessTieup"] = paymentDetail[detcount].LumpSumLessTieup;
                                            detailitem["Total"] = paymentDetail[detcount].Total;
                                            detailitem["LumpSumGreaterTieup"] = paymentDetail[detcount].LumpSumGreaterTieup;
                                            detailitem["LumpSumGreater"] = paymentDetail[detcount].LumpSumGreater;
                                            detailitem["LumpSumGreaterTotal"] = paymentDetail[detcount].LumpSumGreaterTotal;
                                            detailitem["SIPSlabLess"] = paymentDetail[detcount].SIPSlabLess;
                                            detailitem["SIPSlabGreater"] = paymentDetail[detcount].SIPSlabGreater;
                                            detailitem["monthperiods"] = paymentDetail[detcount].PeriodStart + ' - ' + paymentDetail[detcount].PeriodEnd;
                                            detailitem["PeriodStart"] = paymentDetail[detcount].PeriodStart;
                                            detailitem["PeriodEnd"] = paymentDetail[detcount].PeriodEnd;
                                            detailitem["PeriodType"] = 1;
                                            detailitem["IsCopied"] = 0;
                                            TieUp.TempMonthList.push(detailitem);
                                            TieUp.TempPaymentDetails.push(detailitem);


                                        }
                                        else if (paymentDetail[detcount].PeriodType == '2') {
                                            year = {
                                                schemeid: PaymentList.SchemeId,
                                                schemecategoryid: PaymentList.SchemeCategoryId,
                                                scheme: PaymentList.SchemeName,
                                                PaymentDetailsId: paymentDetail[detcount].PaymentDetailsId,
                                                Period: "Year",
                                                Duration: paymentDetail[detcount].PeriodStart,
                                                Base: paymentDetail[detcount].BaseUpfront,
                                                Additional: paymentDetail[detcount].AdditionalIncentives,
                                                LumpSumLessTieup: paymentDetail[detcount].LumpSumLessTieup,
                                                Total: paymentDetail[detcount].Total,
                                                LumpSumGreaterTieup: paymentDetail[detcount].LumpSumGreaterTieup,
                                                LumpSumGreater: paymentDetail[detcount].BaseUpfront,
                                                LumpSumGreaterTotal: paymentDetail[detcount].BaseUpfront,
                                                SIPSlabLess: paymentDetail[detcount].SIPSlabLess,
                                                SIPSlabGreater: paymentDetail[detcount].SIPSlabGreater,
                                            };
                                            yearcount += 1;
                                            yeardata.push(year)

                                            var detailitem = {}
                                            detailitem["schemeid"] = PaymentList.SchemeId;
                                            detailitem["schemecategoryid"] = PaymentList.SchemeCategoryId;
                                            detailitem["scheme_category"] = PaymentList.SchemeCategoryName;
                                            detailitem["scheme"] = PaymentList.SchemeName;
                                            detailitem["BrokerageTypeId"] = 3;
                                            detailitem["LumpSumLessTieup"] = paymentDetail[detcount].LumpSumLessTieup;
                                            detailitem["Base"] = paymentDetail[detcount].BaseUpfront;
                                            detailitem["Additional"] = paymentDetail[detcount].AdditionalIncentives;
                                            detailitem["Total"] = paymentDetail[detcount].Total;
                                            detailitem["LumpSumGreaterTieup"] = paymentDetail[detcount].LumpSumGreaterTieup;
                                            detailitem["LumpSumGreater"] = paymentDetail[detcount].BaseUpfront;
                                            detailitem["LumpSumGreaterTotal"] = paymentDetail[detcount].BaseUpfront;
                                            detailitem["SIPSlabLess"] = paymentDetail[detcount].SIPSlabLess;
                                            detailitem["SIPSlabGreater"] = paymentDetail[detcount].SIPSlabGreater;
                                            detailitem["monthperiods"] = paymentDetail[detcount].PeriodStart;
                                            detailitem["PeriodStart"] = paymentDetail[detcount].PeriodStart;
                                            detailitem["PeriodEnd"] = paymentDetail[detcount].PeriodEnd;
                                            detailitem["PeriodType"] = 2;
                                            detailitem["IsCopied"] = paymentDetail[detcount].IsCopied;
                                            TieUp.TempYearList.push(detailitem);
                                            TieUp.TempPaymentDetails.push(detailitem);
                                        }

                                    }
                                }
                            }

                            objList.monthperiods = monthperiods;
                            objList.yearcount = yearcount;
                            objList.mothyearvalue = monthperiods + "~" + yearcount;

                            tempPaymentList.push(objList);
                            TieUp.TempPaymentList.push(objList);

                        });
                        Utility.AllowDecimal();

                        TieUp.DetailCount += 1;

                        TieUp.BindEditSchemeDetail(0);
                    }
                });
            });


        }
        //else {
        //    Utility.writeNotification("warning", "Invalid Payment Memo ID", "", true);
        //    //alert("Invalid Payment Memo ID");
        //}

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

    ViewScreen: function (PaymentMemoId) {
        var buttonvalue = "";
        $("#div_btn").empty();
        if (sessionStorage.CurrentMenuselected == "nav_information") {
            buttonvalue = '<button class="btn btn-default mr-right-01" data-toggle="modal"  onclick=\"TieUp.OpenRemarks(1);\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
            '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal"  title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                            ' <button class="btn mr-right-01 btn-success sq-btn" id="btn_save_info" onclick=\"TieUp.SaveTieUp();\">Save</button>' +
            '<button class="btn btn-danger mr-right-01 sq-btn" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>';
            $('#div_modified_rate_history').show();
        }
        else if (sessionStorage.CurrentMenuselected == "nav_initiate") {
            buttonvalue = '<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                 '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal"  title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                '<button class="btn mr-right-01 btn-warning sq-btn" onclick=\"TieUp.InitiateSubmit();\">Submit</button>' +
                '<button class="btn sq-btn mr-right-01 btn-success" id="btn_save_initiate" onclick=\"TieUp.SaveInitiate();\">Save</button><button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>';
               $('#div_modified_rate_history').show();
             
        }
        else if (sessionStorage.CurrentMenuselected == "nav_review") {
            buttonvalue = '<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                 '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal"  title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                    '<button class="btn btn-warning sq-btn mr-right-01" id="btn_review_Discard" onclick=\"TieUp.review_Discard();\">Discard</button>' +
                      '<button class="btn btn-danger sq-btn mr-right-01" id="btn_review_reject" onclick=\"TieUp.review_Reject();\">Reject</button>' +
                      '<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"TieUp.ReviewForward();\">Forward</button>' +
                '<button class="btn sq-btn mr-right-01 btn-success" id="btn_save_review" onclick=\"TieUp.SaveReview();\">Save</button><button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>';
            $('#div_modified_rate_history').show();
        }
        else if (sessionStorage.CurrentMenuselected == "nav_approval") {
            buttonvalue = '<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                 '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal"  title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                  '<button class="btn btn-warning sq-btn mr-right-01" id ="btn_approval_Discard" onclick=\"TieUp.ApprovalDiscard();\">Discard</button>' +
            '<button class="btn btn-danger sq-btn mr-right-01" id ="btn_approval_reject" onclick=\"TieUp.ApprovalReject();\">Reject</button>' +
            '<button class="btn btn-success sq-btn mr-right-01" id ="btn_approval_approve" onclick=\"TieUp.TieUpApproval();\">Approve</button>' +
                '<button class="btn sq-btn mr-right-01 btn-success" id="btn_save_review" onclick=\"TieUp.SaveReview();\">Save</button><button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>';
            $('#div_modified_rate_history').show();
        }
        else if (sessionStorage.CurrentMenuselected == "nav_freeze") {
            buttonvalue = '<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                 '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal"  title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                      '<button class="btn btn-success sq-btn mr-right-01" id="btn_freeze_freeze" onclick=\"TieUp.TieUpFreeze();\">Freeze</button>' +
            '<button id="btn_freeze_Discard" class="btn btn-warning sq-btn mr-right-01"  onclick=\"TieUp.FreezeDiscard();\">Discard</button>' +

                 '<button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>';
        }
        else if (sessionStorage.CurrentMenuselected == "nav_manage") {
            buttonvalue = '<button class="btn btn-warning sq-btn mr-right-01" onclick=\"TieUp.Viewtoccusers();\" target="_blank">Email</button><button class="btn btn-success sq-btn mr-right-01" onclick=\"TieUp.PrintRackRate();\">Print</button>' +
                '<button class="btn btn-danger sq-btn mr-right-01" id="btn_freeze_regenerate" onclick=\"Regenerate.ViewRegenerate();\">Regenerate</button>' +
                '<button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>';
        }

        $("#div_btn").append(buttonvalue);

        $("#lnk_view_remarks").remove();
        input = $('  <a href="#" id="lnk_view_remarks"  data-toggle="modal" data-target="#mdl_view_remark_review" onclick=\"TieUp.ViewRemarks();\" class="tt-chk-bx-label flt-right-a mr-right-01" >Remarks History</a>');
        $("#div_remarks").append(input);

        $("#lnk_view_rate_trail").remove();
        input = $('<a href="#" id="lnk_view_rate_trail" data-toggle="modal" data-target="#mdl_view_trail_review" onclick=\"TieUp.ViewModifiedRateHistory();\" class="tt-chk-bx-label flt-right-a mr-right-01" >Modified Rate History</a>');
        $("#div_view_rate_trail").append(input);

        $("#div_content").show();
        $('#txt_lumpsum_less_total').attr("disabled", "disabled")
        $('#txt_lumpsum_greater_total').attr("disabled", "disabled")
        $("#div_landing_grid").hide();

    
        TieUp.BindDetails(PaymentMemoId);
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
            window.location.href = "CreateTieUp.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
        }
        else if (pagename == "crr") {
            window.location.href = "CreateRackRate.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
        }
        else {
            var buttonvalue = '';
            $("#div_btn").empty();
            if (sessionStorage.CurrentMenuselected == "nav_information") {
                buttonvalue = '<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal"  title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                ' <button class="btn mr-right-01 btn-success sq-btn" id="btn_save_info" onclick=\"TieUp.SaveTieUp();\">Save</button>' +
                '<button class="btn btn-danger mr-right-01 sq-btn" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>';
            }
            else if (sessionStorage.CurrentMenuselected == "nav_initiate") {
                buttonvalue = '<button class="btn btn-warning sq-btn mr-right-01" onclick="TieUp.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
                '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"TieUp.SearchTieUp();\">Search</button> <button class="btn mr-right-01 btn-warning sq-btn" onclick=\"TieUp.InitiateSubmit();\">Submit</button>';
            }
            else if (sessionStorage.CurrentMenuselected == "nav_review") {
                var RoleID = sessionStorage.getItem("RoleID");
                if (RoleID == "10") {
                    buttonvalue = '<button class="btn btn-warning sq-btn mr-right-01" onclick="TieUp.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
                        '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"TieUp.SearchTieUp();\">Search</button>';
                    $('#grid_search_result').hideCol('selectcheck');
                }
                else {
                    buttonvalue = '<button class="btn btn-warning sq-btn mr-right-01" onclick="TieUp.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
                      '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"TieUp.SearchTieUp();\">Search</button>' +
                              '<button class="btn btn-warning sq-btn mr-right-01" id="btn_review_Discard" onclick=\"TieUp.review_Discard();\">Discard</button>' +
                              '<button class="btn btn-danger sq-btn mr-right-01" id="btn_review_reject" onclick=\"TieUp.review_Reject();\">Reject</button>' +
                              '<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"TieUp.ReviewForward();\">Forward</button>';
                    $('#grid_search_result').showCol('selectcheck');
                }
            }
            else if (sessionStorage.CurrentMenuselected == "nav_approval") {
                buttonvalue = '<button class="btn btn-warning sq-btn mr-right-01" onclick="TieUp.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
                '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"TieUp.SearchTieUp();\">Search</button> ' +
                '<button class="btn btn-warning sq-btn mr-right-01" id ="btn_approval_Discard" onclick=\"TieUp.ApprovalDiscard();\">Discard</button>' +
                '<button class="btn btn-danger sq-btn mr-right-01" id ="btn_approval_reject" onclick=\"TieUp.ApprovalReject();\">Reject</button>' +
                '<button class="btn btn-success sq-btn mr-right-01" id ="btn_approval_approve" onclick=\"TieUp.TieUpApproval();\">Approve</button>';
            }
            else if (sessionStorage.CurrentMenuselected == "nav_freeze") {
                buttonvalue = '<button class="btn btn-warning sq-btn mr-right-01" onclick="TieUp.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
                '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"TieUp.SearchTieUp();\">Search</button> ' +
                '<button class="btn btn-success sq-btn mr-right-01" id="btn_freeze_freeze" onclick=\"TieUp.TieUpFreeze();\">Freeze</button>' +
                '<button id="btn_freeze_Discard" class="btn btn-warning sq-btn mr-right-01"  onclick=\"TieUp.FreezeDiscard();\">Discard</button>';
            }
            else if (sessionStorage.CurrentMenuselected == "nav_manage") {
                buttonvalue = '<button class="btn btn-warning sq-btn mr-right-01" onclick="TieUp.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
                '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"TieUp.SearchTieUp();\">Search</button> ' +
                '<button class="btn btn-warning sq-btn mr-right-01" onclick=\"TieUp.Viewtoccusers();\" target="_blank">Email</button><button class="btn btn-success sq-btn mr-right-01" onclick=\"TieUp.PrintRackRate();\">Print</button>' +
                    '<button class="btn btn-danger sq-btn mr-right-01" id="btn_freeze_regenerate" onclick=\"Regenerate.ViewRegenerate();\">Regenerate</button>';
            }
            $("#div_btn").append(buttonvalue);
            $("#div_landing_grid").show();
            $("#div_content").hide();
            $('#div_modified_rate_history').show();
            $('#dd_slab_type').val("Slab Amount");
            $('#btnInfoMemoNumber').hide();
            $('#btnInfoLumpSumSIPType').hide();
            TieUp.SearchTieUp();
        }
    },

    ViewModifiedRateHistory: function () {
        var AuditPaymentList = [];
        var AuditPaymentDetails = [];
        var AuditYearList = [];
        var AuditMonthList = [];
        var RackRateDetailCount = 0;

        var Category = $('#dd_dist_category_info option:selected');
        var Categoryselected = [];
        $(Category).each(function () {
            Categoryselected.push([$(this).val()]);
        });

        /////Get selected ARN/////////
        var token = $("#txt_arn_info").tokenInput("get");
        var ARNSelected = [];
        $.each(token, function (i, obj) {
            ARNSelected.push(obj.name);//build an array of just the names
        });

        var selectedscheme = $('#dd_scheme option:selected');

        var selectedschemeID = [];
        $(selectedscheme).each(function () {
            selectedschemeID.push([$(this).val()]);
        });

        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetTieUpAuditPaymentList', JSON.stringify({ PaymentMemoID: $("#hidden_payment_memo_id").val(), Scheme: selectedschemeID[0].toString(), Category: Categoryselected.toString(), ARN: ARNSelected.toString(), DateFrom: $("#dt_from").val(), DateTo: $("#dt_to").val() }), "json", false, false, function (result) {
            var PaymentList = result.GetTieUpAuditPaymentListResult;
            //if (PaymentList.length == 1 || PaymentList.length == 0) {
            //    $('#div_modified_rate_history').show();
            //}
            //else {
            $('#div_modified_rate_history').show();
            var paymentDetail;
            RackRateDetailCount = PaymentList.length;

            var objList = [];
            var monthdata = [];
            var yeardata = [];

            var selectedscheme = $('#dd_scheme option:selected');
            var selectedschemeCategory = $('#dd_scheme_category option:selected');

            var selectedschemes = [];
            $(selectedscheme).each(function () {
                selectedschemes.push([$(this).text()]);
            });

            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetTieUpAuditPaymentDetails', JSON.stringify({ PaymentMemoID: $("#hidden_payment_memo_id").val(), Scheme: selectedschemeID[0].toString(), Category: Categoryselected.toString(), ARN: ARNSelected.toString(), DateFrom: $("#dt_from").val(), DateTo: $("#dt_to").val() }), "json", false, false, function (result) {

                paymentDetail = result.GetTieUpAuditPaymentDetailsResult;
                for (var cnt = 0; cnt < RackRateDetailCount; cnt++) {
                    objList = {
                        PaymentListId: PaymentList[cnt].PaymentListId,
                        scheme_category: PaymentList[cnt].SchemeCategoryName,
                        schemecategoryid: PaymentList[cnt].SchemeCategoryId,
                        scheme: selectedschemes.toString(),
                        schemeid: PaymentList[cnt].SchemeId,
                        claw_back: PaymentList[cnt].Clawback,
                        slab_amount: PaymentList[cnt].SlabAmount,
                        PaymentType: PaymentList[cnt].PaymentType,
                        SlabType: PaymentList[cnt].SlabType,
                        Onwards: PaymentList[cnt].Onwards,
                        SIPSlab: PaymentList[cnt].SIPSlab,
                        IsUpdated: PaymentList[cnt].IsUpdated,
                        AuditMemoId: PaymentList[cnt].AuditMemoId,
                        RaisedBy: PaymentList[cnt].RaisedBy,
                        MemoNumber: PaymentList[cnt].MemoNumber,
                        RoleSeqNo: PaymentList[cnt].RoleSeqNo,
                        ModifiedDateAndTime: PaymentList[cnt].ModifiedDateAndTime
                    };

                    var monthperiods = ""; var yearperiods = "";
                    var yearcount = 0;
                    for (detcount = 0; detcount < paymentDetail.length; detcount++) {
                        if (PaymentList[cnt].AuditMemoId == paymentDetail[detcount].AuditMemoId) {
                            if (paymentDetail[detcount].BrokerageTypeId == 1) {
                                objList.UpfrontDetailId = paymentDetail[detcount].PaymentDetailsId;
                                objList.aadl_incentive_type = 0;
                                objList.Base = paymentDetail[detcount].BaseUpfront;
                                objList.Additional = paymentDetail[detcount].AdditionalIncentives;
                                objList.LumpSumLessTieup = paymentDetail[detcount].LumpSumLessTieup;
                                objList.Total = paymentDetail[detcount].Total;
                                objList.LumpSumGreaterTieup = paymentDetail[detcount].LumpSumGreaterTieup;
                                objList.LumpSumGreater = paymentDetail[detcount].LumpSumGreater;
                                objList.LumpSumGreaterTotal = paymentDetail[detcount].LumpSumGreaterTotal == "0" ? paymentDetail[detcount].LumpSumGreater : paymentDetail[detcount].LumpSumGreaterTotal;
                                objList.SIPSlabLess = paymentDetail[detcount].SIPSlabLess;
                                objList.SIPSlabGreater = paymentDetail[detcount].SIPSlabGreater;

                                detailitem = {}
                                detailitem["schemeid"] = PaymentList[cnt].SchemeId;
                                detailitem["schemecategoryid"] = PaymentList[cnt].SchemeCategoryId;
                                detailitem["scheme_category"] = PaymentList[cnt].SchemeCategoryName;
                                detailitem["scheme"] = selectedschemes.toString();
                                detailitem["BrokerageTypeId"] = 1;
                                detailitem["Base"] = paymentDetail[detcount].BaseUpfront;
                                detailitem["Additional"] = paymentDetail[detcount].AdditionalIncentives;
                                detailitem["LumpSumLessTieup"] = paymentDetail[detcount].LumpSumLessTieup;
                                detailitem["Total"] = paymentDetail[detcount].Total;
                                detailitem["LumpSumGreaterTieup"] = paymentDetail[detcount].LumpSumGreaterTieup;
                                detailitem["LumpSumGreater"] = paymentDetail[detcount].LumpSumGreater;
                                detailitem["LumpSumGreaterTotal"] = paymentDetail[detcount].LumpSumGreaterTotal == "0" ? paymentDetail[detcount].LumpSumGreater : paymentDetail[detcount].LumpSumGreaterTotal;
                                detailitem["SIPSlabLess"] = paymentDetail[detcount].SIPSlabLess;
                                detailitem["SIPSlabGreater"] = paymentDetail[detcount].SIPSlabGreater;
                                detailitem["PeriodStart"] = 0;
                                detailitem["PeriodEnd"] = 0;
                                detailitem["PeriodType"] = 0;
                                detailitem["AuditMemoId"] = paymentDetail[detcount].AuditMemoId;
                                detailitem["IsCopied"] = 0;
                                AuditPaymentDetails.push(detailitem);
                            }

                            if (paymentDetail[detcount].BrokerageTypeId == 2) {
                                objList.addl_upfront_B15_id = paymentDetail[detcount].PaymentDetailsId;
                                objList.addl_upfront_B15 = paymentDetail[detcount].BaseUpfront;

                                detailitem = {}
                                detailitem["schemeid"] = PaymentList[cnt].SchemeId;
                                detailitem["schemecategoryid"] = PaymentList[cnt].SchemeCategoryId;
                                detailitem["scheme_category"] = PaymentList[cnt].SchemeCategoryName;
                                detailitem["scheme"] = selectedschemes.toString();
                                detailitem["BrokerageTypeId"] = 2;
                                detailitem["Base"] = paymentDetail[detcount].BaseUpfront;
                                detailitem["Additional"] = 0;
                                detailitem["LumpSumLessTieup"] = 0;
                                detailitem["Total"] = 0;
                                detailitem["LumpSumGreaterTieup"] = 0;
                                detailitem["LumpSumGreater"] = 0;
                                detailitem["LumpSumGreaterTotal"] = 0;
                                detailitem["SIPSlabLess"] = 0;
                                detailitem["SIPSlabGreater"] = 0;
                                detailitem["PeriodStart"] = 0;
                                detailitem["PeriodEnd"] = 0;
                                detailitem["PeriodType"] = 0;
                                detailitem["AuditMemoId"] = paymentDetail[detcount].AuditMemoId;
                                detailitem["IsCopied"] = 0;
                                AuditPaymentDetails.push(detailitem);
                            }

                            if (paymentDetail[detcount].BrokerageTypeId == 3) {
                                if (paymentDetail[detcount].PeriodType == '1') {
                                    var period = paymentDetail[detcount].PeriodStart + ' - ' + paymentDetail[detcount].PeriodEnd;
                                    monthperiods = monthperiods == "" ? period : monthperiods + "," + period;

                                    detailitem = {}
                                    detailitem["schemeid"] = PaymentList[cnt].SchemeId;
                                    detailitem["schemecategoryid"] = PaymentList[cnt].SchemeCategoryId;
                                    detailitem["scheme_category"] = PaymentList[cnt].SchemeCategoryName;
                                    detailitem["scheme"] = selectedschemes.toString();
                                    detailitem["BrokerageTypeId"] = 3;
                                    detailitem["Base"] = paymentDetail[detcount].BaseUpfront;
                                    detailitem["Additional"] = paymentDetail[detcount].AdditionalIncentives;
                                    detailitem["LumpSumLessTieup"] = paymentDetail[detcount].LumpSumLessTieup;
                                    detailitem["Total"] = paymentDetail[detcount].Total;
                                    detailitem["LumpSumGreaterTieup"] = paymentDetail[detcount].LumpSumGreaterTieup;
                                    detailitem["LumpSumGreater"] = paymentDetail[detcount].LumpSumGreater;
                                    detailitem["LumpSumGreaterTotal"] = paymentDetail[detcount].LumpSumGreaterTotal == "0" ? paymentDetail[detcount].LumpSumGreater : paymentDetail[detcount].LumpSumGreaterTotal;
                                    detailitem["SIPSlabLess"] = paymentDetail[detcount].SIPSlabLess;
                                    detailitem["SIPSlabGreater"] = paymentDetail[detcount].SIPSlabGreater;
                                    detailitem["monthperiods"] = period;
                                    detailitem["PeriodStart"] = paymentDetail[detcount].PeriodStart;
                                    detailitem["PeriodEnd"] = paymentDetail[detcount].PeriodEnd;
                                    detailitem["PeriodType"] = 1;
                                    detailitem["AuditMemoId"] = paymentDetail[detcount].AuditMemoId;
                                    detailitem["IsCopied"] = 0;
                                    AuditMonthList.push(detailitem);
                                    AuditPaymentDetails.push(detailitem);
                                }
                                else if (paymentDetail[detcount].PeriodType == '2') {
                                    yearcount += 1;
                                    detailitem = {}
                                    detailitem["schemeid"] = PaymentList[cnt].SchemeId;
                                    detailitem["schemecategoryid"] = PaymentList[cnt].SchemeCategoryId;
                                    detailitem["scheme_category"] = PaymentList[cnt].SchemeCategoryName;
                                    detailitem["scheme"] = selectedschemes.toString();
                                    detailitem["BrokerageTypeId"] = 3;
                                    detailitem["Base"] = paymentDetail[detcount].BaseUpfront;
                                    detailitem["Additional"] = paymentDetail[detcount].AdditionalIncentives;
                                    detailitem["LumpSumLessTieup"] = paymentDetail[detcount].LumpSumLessTieup;
                                    detailitem["Total"] = paymentDetail[detcount].Total;
                                    detailitem["LumpSumGreaterTieup"] = paymentDetail[detcount].LumpSumGreaterTieup;
                                    detailitem["LumpSumGreater"] = paymentDetail[detcount].LumpSumGreater;
                                    detailitem["LumpSumGreaterTotal"] = paymentDetail[detcount].LumpSumGreaterTotal == "0" ? paymentDetail[detcount].LumpSumGreater : paymentDetail[detcount].LumpSumGreaterTotal;
                                    detailitem["SIPSlabLess"] = paymentDetail[detcount].SIPSlabLess;
                                    detailitem["SIPSlabGreater"] = paymentDetail[detcount].SIPSlabGreater;
                                    detailitem["monthperiods"] = period;
                                    detailitem["PeriodStart"] = paymentDetail[detcount].PeriodStart;
                                    detailitem["PeriodEnd"] = paymentDetail[detcount].PeriodEnd;
                                    detailitem["PeriodType"] = 2;
                                    detailitem["AuditMemoId"] = paymentDetail[detcount].AuditMemoId;
                                    detailitem["IsCopied"] = paymentDetail[detcount].IsCopied;
                                    AuditYearList.push(detailitem);
                                    AuditPaymentDetails.push(detailitem);
                                }

                            }
                        }
                    }
                    objList.monthperiods = monthperiods;
                    objList.yearcount = yearcount;
                    objList.mothyearvalue = monthperiods + "~" + yearcount;
                    AuditPaymentList.push(objList);

                }
            });
            //}
        });


        if (AuditPaymentList.length > 0) {

            var distinctmonth = [];
            var currentmonths = [];
            var bgColor = ["", "orange", "lightblue", "lightblue", "orange", "tan", "grey", "lightgrey", "darkgrey", "lightblue", "tan", "lightgrey", "lightblue", "darkgrey", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
            $.each(AuditPaymentList, function (index, value) {
                if ($.inArray(value.mothyearvalue, distinctmonth) === -1) {
                    distinctmonth.push(value.mothyearvalue);
                }
            });
            $('#div_detail').empty();

            for (var k = 0; k < distinctmonth.length; k++) {
                var yearcount = ""; var monthperyear = "";

                if (distinctmonth[k].split('~').length >= 1) {
                    yearcount = distinctmonth[k].split('~')[1];
                    currentmonths = distinctmonth[k].split('~')[0];
                }

                var onwardstext = "";
                var headercol = ""; var headersubcol1 = ""; var headersubcol2 = ""; var headersubcol3 = ""; var colspan = "0"; var z = 0;
                if (currentmonths.length > 0) {
                    if (Utility.enableSIP == true) {
                        colspan = currentmonths.split(',').length * 5;
                    }
                    else {
                        colspan = currentmonths.split(',').length * 3;
                    }
                    for (var g = 0; g < currentmonths.split(',').length; g++) {
                        if (currentmonths.split(',')[g] != "") {
                            z = 1;
                            if (Utility.enableSIP == true) {
                                headersubcol1 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='3'> Lump Sum </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' rowspan='2' colspan='2'> SIP/STP </th>";
                                headersubcol2 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='2'> ≤ Slab </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' > > Slab </th>";
                                headersubcol3 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Base </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Total </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'>  </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> &le; " + AuditPaymentList[0].SIPSlab + " </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> > " + AuditPaymentList[0].SIPSlab + " </th>";
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
                            for (var onw = 0; onw < AuditPaymentList.length; onw++) {
                                if (distinctmonth[k] == AuditPaymentList[onw]["mothyearvalue"] && AuditPaymentList[onw]["Onwards"].toLowerCase() == "true") {
                                    onwardstext = " & Onwards";
                                }
                            }
                        }
                        headercol += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='" + colspan + "'> Year 1 " + onwardstext + "</th>";
                    }
                }
                if (yearcount > 0) {
                    if (AuditYearList.length > 0 && z > 0) {
                        colspan = colspan + yearcount;
                        for (var i = 0; i < yearcount ; i++) {
                            if (i == (yearcount - 1)) {
                                for (var onw = 0; onw < AuditPaymentList.length; onw++) {
                                    if (distinctmonth[k] == AuditPaymentList[onw]["mothyearvalue"] && AuditPaymentList[onw]["Onwards"].toLowerCase() == "true") {
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
                    else if (AuditYearList.length > 0 && z == 0) {
                        colspan = yearcount + 5;
                        for (var i = 0; i < yearcount ; i++) {
                            if (i == (yearcount - 1)) {
                                for (var onw = 0; onw < AuditPaymentList.length; onw++) {
                                    if (distinctmonth[k] == AuditPaymentList[onw]["mothyearvalue"] && AuditPaymentList[onw]["Onwards"].toLowerCase() == "true") {
                                        onwardstext = " & Onwards";
                                    }
                                }
                            }
                            if (i == 0) {
                                if (Utility.enableSIP == true) {
                                    headercol += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'   colspan='5'> Year 1 " + onwardstext + "</th>";
                                    headersubcol1 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='3'> Lump Sum </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' rowspan='2' colspan='2'> SIP/STP </th>";
                                    headersubcol2 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='2'> ≤ Slab </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> > Slab </th>";
                                    headersubcol3 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Base </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Total </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' >  </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> &le; " + AuditPaymentList[0].SIPSlab + " </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> > " + AuditPaymentList[0].SIPSlab + " </th>";
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

                tbldata += "<tr  style='text-align: center; color: rgb(255, 255, 255); background-color: rgb(0, 101, 161);''><th style='text-align: center;color: rgb(255, 255, 255); padding-top: 100px;' rowspan='6'>Raised By </th><th style='text-align: center;color: rgb(255, 255, 255); padding-top: 100px;' rowspan='6'>Memo Number </th><th style='text-align: center;color: rgb(255, 255, 255); padding-top: 100px;' rowspan='6'>Modified Date </th><th style='text-align: center;color: rgb(255, 255, 255); padding-top: 100px;' rowspan='6'>Scheme </th><th style='text-align: center;color: rgb(255, 255, 255); padding-top: 100px;' rowspan='6'>Clawback</th><th style='text-align: center;color: rgb(255, 255, 255); padding-top: 100px;' rowspan='6'>Slab</th>";
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
                    tbldata += "<tr   class='rrd-tbl-hdr'><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='3'> Lump Sum </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' rowspan='2' colspan='2'> SIP/STP </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' rowspan='3'> B15 all </th>" + headersubcol1 + "</tr>";
                    tbldata += "<tr   class='rrd-tbl-hdr'><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='2'> ≤ Slab </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> > Slab </th>" + headersubcol2 + "</tr>";
                    tbldata += "<tr   class='rrd-tbl-hdr'><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Base </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Total </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'>  </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> &le; " + AuditPaymentList[0].SIPSlab + " </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> > " + AuditPaymentList[0].SIPSlab + " </th>" + headersubcol3 + "</tr></thead><tbody>";
                }
                else {
                    tbldata += "<tr   class='rrd-tbl-hdr'><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='3'> Lump Sum </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' rowspan='3'> B15 all </th>" + headersubcol1 + "</tr>";
                    tbldata += "<tr   class='rrd-tbl-hdr'><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='2'> ≤ Slab </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> > Slab </th>" + headersubcol2 + "</tr>";
                    tbldata += "<tr   class='rrd-tbl-hdr'><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Base </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Total </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'>  </th>" + headersubcol3 + "</tr></thead><tbody>";
                }
                for (var i = 0; i < AuditPaymentList.length; i++) {
                    tbldata += '<tr style="background:' + bgColor[AuditPaymentList[i]["RoleSeqNo"]] + ';" class="audit_detail_row">';
                    if (distinctmonth[k] == AuditPaymentList[i]["mothyearvalue"]) {
                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld' style='font-size:14px;'>" + AuditPaymentList[i]["RaisedBy"] + "</span> </td>";
                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld' style='font-size:14px;'>" + AuditPaymentList[i]["MemoNumber"] + "</span> </td>";
                        tbldata += "<td ><span class='rrd-tbl-label-bld' style='font-size:14px;'>" + AuditPaymentList[i]["ModifiedDateAndTime"] + "</span>";
                        tbldata += "<td ><span class='rrd-tbl-label-bld' style='font-size:14px;'>" + AuditPaymentList[i]["scheme"].replace("DSP BlackRock", "") + "</span>";
                        tbldata += "<input type='hidden' name='hid_payment_list_id'  value='" + AuditPaymentList[i]["PaymentListId"] + "' />";
                        tbldata += "<input type='hidden' name='hid_scheme_id'  value='" + AuditPaymentList[i]["schemeid"] + "' />";
                        tbldata += "<input type='hidden' name='hid_scheme_category_id'  value='" + AuditPaymentList[i]["schemecategoryid"] + "' />";
                        tbldata += "<input type='hidden' name='hid_scheme'  value='" + AuditPaymentList[i]["scheme"] + "' />";
                        tbldata += "<input type='hidden' name='hid_scheme_category'  value='" + AuditPaymentList[i]["scheme_category"] + "' />";
                        tbldata += "<input type='hidden' name='hid_onwards'  value='" + AuditPaymentList[i]["Onwards"] + "' />";
                        tbldata += "<input type='hidden' name='hid_claw_back'  value='" + AuditPaymentList[i]["claw_back"] + "' />";
                        tbldata += "<input type='hidden' name='hid_slab_amount'  value='" + AuditPaymentList[i]["slab_amount"] + "' />";
                        tbldata += "<input type='hidden' name='hid_slab_type'  value='" + AuditPaymentList[i]["SlabType"] + "' />";
                        tbldata += "<input type='hidden' name='hid_sip'  value='" + AuditPaymentList[i]["SIPSlab"] + "' />";
                        tbldata += "<input type='hidden' name='hid_mothyearvalue'  value='" + AuditPaymentList[i]["mothyearvalue"] + "' />";
                        tbldata += "<input type='hidden' name='hid_payment_Type'  value='" + AuditPaymentList[i]["PaymentType"] + "' /> </td>";

                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld' style='font-size:14px;'>" + AuditPaymentList[i]["claw_back"] + "</span> </td>";
                        if (AuditPaymentList[i]["SlabType"] == "Slab Amount") {
                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld ' style='font-size:14px;'>" + AuditPaymentList[i]["slab_amount"] + "</span> </td>";
                        }
                        else {
                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld ' style='font-size:14px;'>All Amt</span> </td>";
                        }
                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'> " + AuditPaymentList[i]["Base"] + "</span> </td>";
                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld total' style='font-size:14px;'>" + AuditPaymentList[i]["Total"] + "</span><input type='hidden' name='hid_lumpsum_additional'  value='" + AuditPaymentList[i]["Additional"] + "' /> </td>";

                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + AuditPaymentList[i]["LumpSumGreaterTotal"] + "</span> </td>";
                        if (Utility.enableSIP == true) {
                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + AuditPaymentList[i]["SIPSlabLess"] + "</span> </td>";
                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + AuditPaymentList[i]["SIPSlabGreater"] + "</span> </td>";
                        }
                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + AuditPaymentList[i]["addl_upfront_B15"] + "</span> </td>";
                        if (AuditMonthList.length > 0) {
                            var monthcnt = 0;
                            for (var g = 0; g < currentmonths.split(',').length; g++) {
                                for (var h = 0; h < AuditMonthList.length; h++) {
                                    if (currentmonths.split(',')[g] == AuditMonthList[h]["monthperiods"] && AuditPaymentList[i]["AuditMemoId"] == AuditMonthList[h]["AuditMemoId"]) {
                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + AuditMonthList[h]["Base"] + " </span></td>";

                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld total' style='font-size:14px;'>" + AuditMonthList[h]["Total"] + " </span>";
                                        tbldata += "<input type='hidden' name='hid_lumpsum_additional'  value='" + AuditMonthList[h]["Additional"] + "' />";
                                        tbldata += "<input type='hidden' name='hid_is_month'  value='1' />";
                                        tbldata += "<input type='hidden' name='hid_monthperiods'  value='" + AuditPaymentList[i]["monthperiods"] + "' />";
                                        tbldata += "</td>";

                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + AuditMonthList[h]["LumpSumGreaterTotal"] + " </span></td>";
                                        if (Utility.enableSIP == true) {
                                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + AuditMonthList[h]["SIPSlabLess"] + " </span></td>";
                                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + AuditMonthList[h]["SIPSlabGreater"] + " </span></td>";
                                        }
                                        monthcnt += 1;
                                    }
                                }
                            }
                            tbldata += "<input type='hidden' id='hidden_month_det_" + i + "'  value='" + monthcnt + "' />";
                        }
                        var r = 0;
                        if (yearcount > 0) {
                            if (AuditYearList.length > 0) {
                                var yearcnt = 0;
                                for (var j = 0; j < (AuditYearList.length) ; j++) {
                                    if (AuditPaymentList[i]["AuditMemoId"] == AuditYearList[j]["AuditMemoId"] && AuditYearList[j]["PeriodStart"] == "1") {
                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + AuditYearList[j]["Base"] + " </span>";
                                        tbldata += "<input type='hidden' name='hid_lumpsum_additional'  value='" + AuditYearList[j]["Additional"] + "' />";
                                        tbldata += "<input type='hidden' name='hid_is_month'  value='0' />";
                                        tbldata += "<input type='hidden' name='hid_year'  value='" + AuditYearList[j]["PeriodStart"] + "' /> </td>";
                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld total' style='font-size:14px;'>" + AuditYearList[j]["Total"] + " </span></td>";
                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + AuditYearList[j]["LumpSumGreaterTotal"] + " </span></td>";
                                        if (Utility.enableSIP == true) {
                                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + AuditYearList[j]["SIPSlabLess"] + " </span></td>";
                                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + AuditYearList[j]["SIPSlabGreater"] + " </span></td>";
                                        }
                                        r = 1;
                                    }
                                    else if (AuditPaymentList[i]["AuditMemoId"] == AuditYearList[j]["AuditMemoId"]) {
                                        if (AuditYearList[j]["Total"].trim() == "0") {
                                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + AuditYearList[j]["Base"] + "</span> ";
                                        } else {
                                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + AuditYearList[j]["Total"] + "</span> ";
                                        }
                                        tbldata += "<input type='hidden' class='hid_is_month'  value='0' />";
                                        tbldata += "<input type='hidden' class='hid_year'  value='" + AuditYearList[j]["PeriodStart"] + "' /> </td>";
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


                    }
                    tbldata += ' </tr>';
                }
                tbldata += "</tbody></table></div>";
                $('#div_detail').append(tbldata);
            }
        }
        else {
            $('#div_detail').empty();
        }
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
                // Utility.writeNotification("error", "No Records Found", "", true);
            }
        });
    },

    SaveReview: function () {
        var updateStatus = "";
        if (sessionStorage.CurrentMenuselected == "nav_review")
            updateStatus = "Initiated";
        else if (sessionStorage.CurrentMenuselected == "nav_approval")
            updateStatus = "Reviewed";
        TieUp.SaveTieUpInfo(updateStatus, "Memo Saved Successfully", 1);
    },

    SaveTieUp: function () {
        var updateStatus = "Saved";
        TieUp.SaveTieUpInfo(updateStatus, "Memo Saved Successfully", 1);
    },

    SaveInitiate: function () {
        var updateStatus = "Saved";
        TieUp.SaveTieUpInfo(updateStatus, "Memo Saved Successfully", 1);
    },

    InitiateSubmit: function () {
        var updateStatus = "Initiated";

        if ($("#div_landing_grid").is(":visible")) {
            var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
            var selectedmemos = "";
            if (gridData.length > 0) {
                var Remarks = "";

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
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus, Remarks: Remarks, MemoTypeId: 2 }), "json", false, false, function (result) {
                        Utility.writeNotification("success", "Memo " + updateStatus + " Successfully", "", true);
                        TieUp.AutoSearch();
                    });
                }
                else {
                    Utility.writeNotification("warning", "Select atleast one Saved Memo to Submit", "", true);
                }
            }
        }
        else {
            TieUp.SaveTieUpInfo(updateStatus, "Memo Submitted Successfully", 0);
        }

    },

    ApprovalDiscard: function (Memonumber) {
        var updateStatus = "Discarded";
        var Remarks = "";
        TieUp.TempRackRateStatus = "Discarded";
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

            //Remarks = $("#txt_remarks").val();
            //if (Remarks != "") {
            //    TieUp.SaveTieUpInfo(updateStatus, 'Memo Discarded Successfully');
            //}
            //else {
            //    Utility.writeNotification("warning", "Please enter remarks to Discard the Memo", "", true);
            //}
        }
    },

    rejectdiscard: function () {
        if ($("#txt_remarks_entry").val() != "") {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: $('#txt_selected_memos').val(), Status: $('#txt_updated_status').val(), Remarks: $("#txt_remarks_entry").val(), MemoTypeId: 2 }), "json", false, false, function (result) {
                Utility.writeNotification("warning", "Memo " + $('#txt_updated_status').val() + " Successfully", "", true);
                TieUp.AutoSearch();
            });
            $('#mdl_remarks_entry').modal('hide');
        }
        else {
            Utility.writeNotification("warning", "Please enter remarks to " + $('#btn_remarks').text() + " the Memo", "", true);
        }
    },

    ApprovalReject: function (Memonumber) {
        var updateStatus = "Rejected";
        TieUp.TempRackRateStatus = "Rejected";
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
        TieUp.TempRackRateStatus = "Discarded";
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
        TieUp.TempRackRateStatus = "Rejected";
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
                    TieUp.LoadBH(Arnselected, DistCategorySelected, MemoCount.length);
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

            TieUp.LoadBH(ARNSelected, DistCategorySelected, MemoCount);
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

    ReviewForward: function () {
        var updateStatus = "Reviewed";
        var RoleID = sessionStorage.getItem("RoleID");
        if (RoleID == "10") {
            //if (TieUp.isSchemesectionvalid()) {
            TieUp.SalesAdminApprovalRole();
            //}
        }
        else {
            TieUp.ReviewForwardServiceCall(updateStatus, "");
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
                TieUp.ReviewForwardServiceCall(updateStatus, " to " + assigntoText);

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
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus, Remarks: Remarks, MemoTypeId: 2 }), "json", false, false, function (result) {
                        Utility.writeNotification("success", "Memo Forwarded Successfully" + assigntoText, "", true);
                        TieUp.AutoSearch();
                    });
                }
                else {
                    Utility.writeNotification("warning", "Select atleast one Memo to Forward", "", true);
                }
            }
        }
        else {
            TieUp.SaveTieUpInfo(updateStatus, "Memo Forwarded Successfully" + assigntoText, 0);
        }
    },

    TieUpApproval: function () {
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
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus, Remarks: Remarks, MemoTypeId: 2 }), "json", false, false, function (result) {
                        Utility.writeNotification("success", "Memo " + updateStatus + " Successfully", "", true);
                        TieUp.AutoSearch();
                    });
                }
                else {
                    Utility.writeNotification("warning", "Select atleast one Memo to Approve", "", true);
                }
            }
        }
        else {
            TieUp.SaveTieUpInfo(updateStatus, 'Memo Approved Successfully', 0);
        }

    },

    TieUpFreeze: function () {
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
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: selectedmemos, Status: updateStatus, Remarks: Remarks, MemoTypeId: 2 }), "json", false, false, function (result) {
                        Utility.writeNotification("success", "Memo has been Freezed", "", true);
                        TieUp.AutoSearch();
                    });
                }
                else {
                    Utility.writeNotification("warning", "Select atleast one Active Memo to Freeze", "", true);
                }
            }
        }
        else {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/UpdateBatchStatus', JSON.stringify({ MemoNumber: $('#hidden_payment_memo_id').val(), Status: updateStatus, Remarks: Remarks, MemoTypeId: 2 }), "json", false, false, function (result) {
                Utility.writeNotification("success", "Memo has been Freezed", "", true);
                TieUp.CloseScreen();
            });
        }

    },

    FreezeDiscard: function () {
        var updateStatus = "Discarded";
        var Remarks = "";
        TieUp.TempRackRateStatus = "Discarded";
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
                    $('#txt_remarks_entry').val("");
                    $('#txt_selected_memos').val(selectedmemos);
                    $('#txt_updated_status').val(updateStatus);
                    $('#txt_click_from').val("FreezeDiscard");
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

    CreateTieUp: function () {
        //var token = $("#txt_arn").tokenInput("get");
        var token = "";
        if (token.length > 0) {
            TieUp.ViewTieUpInformation();
            $('#div_tie_up_detail').empty()
            $("#div_tie_up_detail_hdr").hide();
        }
        else {
            Utility.writeNotification("error", "", "Please select ARN No. for creating a memo.", true);
            return false;
        }
    },

    RefreshSearchGrid: function () {
        $('#grid_search_result').trigger("reloadGrid");
    },

    LoadTieUpControls: function (Count, showdistributor, showARN) {
        return '<div class="col-md-12 col-sm-12 pd-bottom-02">' +
                               '<div class="col-md-4 col-sm-4 pd-left-00">' +
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
                                               '<input type="text" id="dt_from_' + Count + '" class="input-text-date-bx-style" />' +
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

    Createdetailvalid: function () {

        if (errorMessage == "") {
            return true;
        }
        else {
            Utility.writeNotification("warning", errorMessage, "", true);
            //alert(errorMessage);
            return false;
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
        //        $.each(TieUp.arns, function (key, value) {
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
        TieUp.SearchTieUp();
    },

    BrokerageDetail: function (PaymentListId) {
        Utility.writeNotification("warning", "In Progress", "", true);
        //alert("In Progress");
    },

    CancelTieUp: function () {
        var pagename = Utility.GetParameterValues('ptype');
        if (pagename == "mq") {
            window.location.href = "MasterQueue.html";
        }
        else if (pagename == "ss") {
            sessionStorage.setItem("SmartSearchScreen", "ss");
            window.location.href = "SmartSearchScreen.html";
        }
        else if (pagename == "crr") {
            window.location.href = "CreateRackRate.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
        }
        else if (pagename == "cr") {
            window.location.href = "CreateTieUp.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
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
                window.location.href = "CreateTieUp.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
            }
        }
        return false;
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
                TieUp.ViewScreen(memono);
                TieUp.generatebutton(status, memono)
            }
            else {
                TieUp.BindDetails(memono);
            }

            if (pagename != undefined && pagename == "ss") {
                var value = $(' <button class="btn btn-danger sq-btn fr" id=btn_save_cancel onclick="TieUp.CloseScreen();">Cancel</button>');
                $("#div_btn").empty();
                $("#div_btn").append(value);
            }
        }
    },

    Calculateonkeyup: function (cnt, ctrl) {
        var a = 6;
    },

    SlabTypeChanged: function () {
        if ($('#dd_slab_type').val() == "Slab Amount") {


            //$('#txt_slab_amount').removeAttr("disabled");
            //$('#dd_slab_amount_type').removeAttr("disabled");

            $('#txt_lumpsum_greater_tieup').removeAttr("disabled");
            $('#txt_lumpsum_greater').attr("disabled", "disabled");
            $('#txt_lumpsum_greater_total').attr("disabled", "disabled");

            $('#spn_upfront_less_slab').text("≤ Slab");
            $('#spn_upfront_greater_slab').text("> Slab");
            $('#spn_trail_less_slab').text("≤ Slab");
            $('#spn_trail_greater_slab').text("> Slab");

            var row = $("#trailTable tr.trail_row");

            for (var rowIndex = 0; rowIndex < row.length; rowIndex++) {
                var rowData = $($("#trailTable tr.trail_row")[rowIndex]);
                var column = $(rowData).find('td');

                var trail_period_type = column[0];
                var trail_period_from = column[1];
                var trail_period_to = column[2];
                var trail_lumpsum_base = column[3];
                var trail_lumpsum_additional = column[4];
                var trail_lumpsum_less_tieup = column[5];
                var trail_lumpsum_total = column[6];

                var trail_lumpsum_greater = column[7];
                var trail_lumpsum_greater_tieup = column[8];
                var trail_lumpsum_greater_total = column[9];
                var trail_sip_less = column[10];
                var trail_sip_greater = column[11];

                $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").attr("disabled", "disabled");
                $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").removeAttr("disabled");
                $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").attr("disabled", "disabled");

            }

        } else {
            $('#hidden_Slab_Amount').val($('#txt_slab_amount').val())
            $('#hidden_Slab_Amount_Type').val($('#dd_slab_amount_type').val())
            $('#txt_slab_amount').val("");
            $('#dd_slab_amount_type').val("");
            $('#txt_slab_amount').attr("disabled", "disabled");
            $('#dd_slab_amount_type').attr("disabled", "disabled");

            $('#txt_lumpsum_greater_tieup').attr("disabled", "disabled");
            $('#txt_lumpsum_greater').attr("disabled", "disabled");
            $('#txt_lumpsum_greater_tieup').val("0");
            $('#txt_lumpsum_greater').val("0");

            $('#spn_upfront_less_slab').text("All Amounts");
            $('#spn_upfront_greater_slab').text("");
            $('#spn_trail_less_slab').text("All Amounts");
            $('#spn_trail_greater_slab').text("");

            var row = $("#trailTable tr.trail_row");

            for (var rowIndex = 0; rowIndex < row.length; rowIndex++) {
                var rowData = $($("#trailTable tr.trail_row")[rowIndex]);
                var column = $(rowData).find('td');

                var trail_period_type = column[0];
                var trail_period_from = column[1];
                var trail_period_to = column[2];
                var trail_lumpsum_base = column[3];
                var trail_lumpsum_additional = column[4];
                var trail_lumpsum_less_tieup = column[5];
                var trail_lumpsum_total = column[6];

                var trail_lumpsum_greater = column[7];
                var trail_lumpsum_greater_tieup = column[8];
                var trail_lumpsum_greater_total = column[9];
                var trail_sip_less = column[10];
                var trail_sip_greater = column[11];

                $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val("0");
                $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val("0");
                $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val("0");


                $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").attr("disabled", "disabled");
                $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").attr("disabled", "disabled");
                $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").attr("disabled", "disabled");

            }

        }
    },

    SlabTypeOnchange: function (elem) {
        if ($('#dd_slab_type').val() == "Slab Amount") {
            $('#txt_slab_amount').val($('#hidden_Slab_Amount').val());
            $('#dd_slab_amount_type').val($('#hidden_Slab_Amount_Type').val());
            $('#txt_slab_amount').removeAttr("disabled");
            $('#dd_slab_amount_type').removeAttr("disabled");
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
            $('#txt_lumpsum_greater_tieup').removeAttr("disabled");
            $('#txt_lumpsum_greater').attr("disabled", "disabled");
            $('#txt_lumpsum_greater_total').attr("disabled", "disabled");

            $('#txt_lumpsum_greater_tieup').val("0");
            $('#txt_lumpsum_greater').val("0");
            $('#txt_lumpsum_greater_total').val("0");

            $('#spn_upfront_less_slab').text("≤ Slab");
            $('#spn_upfront_greater_slab').text("> Slab");
            $('#spn_trail_less_slab').text("≤ Slab");
            $('#spn_trail_greater_slab').text("> Slab");

            var row = $("#trailTable tr.trail_row");
            var base_additional = parseInt($('#txt_lumpsum_less_base').val() == "" ? 0 : $('#txt_lumpsum_less_base').val()) + parseInt($('#txt_lumpsum_less_additional').val() == "" ? 0 : $('#txt_lumpsum_less_additional').val());
            for (var rowIndex = 0; rowIndex < row.length; rowIndex++) {
                var rowData = $($("#trailTable tr.trail_row")[rowIndex]);
                var column = $(rowData).find('td');

                var trail_period_type = column[0];
                var trail_period_from = column[1];
                var trail_period_to = column[2];
                var trail_lumpsum_base = column[3];
                var trail_lumpsum_additional = column[4];
                var trail_lumpsum_less_tieup = column[5];
                var trail_lumpsum_total = column[6];

                var trail_lumpsum_greater = column[7];
                var trail_lumpsum_greater_tieup = column[8];
                var trail_lumpsum_greater_total = column[9];
                var trail_sip_less = column[10];
                var trail_sip_greater = column[11];

                var trail_Base_additional = parseInt($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val())
                 + parseInt($(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val());



                if ($(trail_period_type).find("select[name$='trail_period_type']").val() == "Months") {
                    if ($('#dd_slab_type').val() == "Slab Amount") {
                        //$(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(parseInt($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val()) + parseInt($(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val()) + parseInt($('#txt_lumpsum_less_base').val() == "" ? 0 : $('#txt_lumpsum_less_base').val()) + parseInt($('#txt_lumpsum_less_additional').val() == "" ? 0 : $('#txt_lumpsum_less_additional').val()));
                        $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(parseInt(base_additional) + parseInt(trail_Base_additional));
                        if ($(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() != '-') {
                            $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val(parseInt($('#txt_lumpsum_less_tieup').val() == "" ? 0 : $('#txt_lumpsum_less_tieup').val()) + parseInt($(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() == "" ? 0 : $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val()));
                            $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val(parseInt($(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val() == "" ? 0 : $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val()) + parseInt($(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val() == "" ? 0 : $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val()));
                        }



                        $(trail_sip_less).find("input[name$='trail_sip_less']").val($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val());
                        $(trail_sip_greater).find("input[name$='trail_sip_greater']").val($(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val());
                        $(trail_sip_less).find("input[name$='trail_sip_less']").removeAttr("disabled");
                        $(trail_sip_greater).find("input[name$='trail_sip_greater']").removeAttr("disabled");

                    }
                }
                else {
                    if ($(trail_period_from).find("input[name$='trail_period_from']").val() == "1") {
                        if ($('#dd_slab_type').val() == "Slab Amount") {
                            //$(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(parseInt($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val()) + parseInt($(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val()) + parseInt($('#txt_lumpsum_less_base').val() == "" ? 0 : $('#txt_lumpsum_less_base').val()) + parseInt($('#txt_lumpsum_less_additional').val() == "" ? 0 : $('#txt_lumpsum_less_additional').val()));
                            $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(parseInt(base_additional) + parseInt(trail_Base_additional));
                            if ($(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() != '-') {
                                $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val(parseInt($('#txt_lumpsum_less_tieup').val() == "" ? 0 : $('#txt_lumpsum_less_tieup').val()) + parseInt($(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() == "" ? 0 : $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val()));
                                $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val(parseInt($(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val() == "" ? 0 : $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val()) + parseInt($(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val() == "" ? 0 : $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val()));
                            }



                            $(trail_sip_less).find("input[name$='trail_sip_less']").val(parseInt($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val()) + parseInt($(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() == "" ? 0 : $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val()));
                            $(trail_sip_greater).find("input[name$='trail_sip_greater']").val($(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val());
                            $(trail_sip_less).find("input[name$='trail_sip_less']").removeAttr("disabled");
                            $(trail_sip_greater).find("input[name$='trail_sip_greater']").removeAttr("disabled");
                        }
                    }
                    else {
                        $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(parseInt($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val()) + parseInt($(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val()));
                        $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val($(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val());
                        $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val(parseInt($(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val()) + parseInt($(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val()));
                        $(trail_sip_less).find("input[name$='trail_sip_less']").val("0");
                        $(trail_sip_less).find("input[name$='trail_sip_less']").attr("disabled", "disabled");
                        $(trail_sip_greater).find("input[name$='trail_sip_greater']").val("0");
                        $(trail_sip_greater).find("input[name$='trail_sip_greater']").attr("disabled", "disabled");
                    }
                }


                $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").attr("disabled", "disabled");
                $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").removeAttr("disabled");
                $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").attr("disabled", "disabled");

                if (Utility.enableSIP == false) {
                    $(trail_sip_less).find("input[name$='trail_sip_less']").val("0");
                    $(trail_sip_less).find("input[name$='trail_sip_less']").attr("disabled", "disabled");
                    $(trail_sip_greater).find("input[name$='trail_sip_greater']").val("0");
                    $(trail_sip_greater).find("input[name$='trail_sip_greater']").attr("disabled", "disabled");
                }

            }

        } else {
            $('#hidden_Slab_Amount').val($('#txt_slab_amount').val())
            $('#hidden_Slab_Amount_Type').val($('#dd_slab_amount_type').val())
            $('#txt_slab_amount').val("");
            $('#dd_slab_amount_type').val("");
            $('#txt_slab_amount').attr("disabled", "disabled");
            $('#dd_slab_amount_type').attr("disabled", "disabled");

            $('#txt_lumpsum_greater_tieup').attr("disabled", "disabled");
            $('#txt_lumpsum_greater').attr("disabled", "disabled");
            $('#txt_lumpsum_greater_tieup').val("0");
            $('#txt_lumpsum_greater').val("0");

            $('#spn_upfront_less_slab').text("All Amounts");
            $('#spn_upfront_greater_slab').text("");
            $('#spn_trail_less_slab').text("All Amounts");
            $('#spn_trail_greater_slab').text("");

            var row = $("#trailTable tr.trail_row");
            var base_additional = parseInt($('#txt_lumpsum_less_base').val() == "" ? 0 : $('#txt_lumpsum_less_base').val()) + parseInt($('#txt_lumpsum_less_additional').val() == "" ? 0 : $('#txt_lumpsum_less_additional').val());

            for (var rowIndex = 0; rowIndex < row.length; rowIndex++) {
                var rowData = $($("#trailTable tr.trail_row")[rowIndex]);
                var column = $(rowData).find('td');

                var trail_period_type = column[0];
                var trail_period_from = column[1];
                var trail_period_to = column[2];
                var trail_lumpsum_base = column[3];
                var trail_lumpsum_additional = column[4];
                var trail_lumpsum_less_tieup = column[5];
                var trail_lumpsum_total = column[6];

                var trail_lumpsum_greater = column[7];
                var trail_lumpsum_greater_tieup = column[8];
                var trail_lumpsum_greater_total = column[9];
                var trail_sip_less = column[10];
                var trail_sip_greater = column[11];

                $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val("0");
                $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val("0");
                $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val("0");

                $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").attr("disabled", "disabled");
                $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").attr("disabled", "disabled");
                $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").attr("disabled", "disabled");


                $(trail_sip_less).find("input[name$='trail_sip_less']").val(parseInt($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val()) + parseInt($(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() == "" ? 0 : $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val()));
                $(trail_sip_greater).find("input[name$='trail_sip_greater']").val($(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val());
                $(trail_sip_less).find("input[name$='trail_sip_less']").removeAttr("disabled");
                $(trail_sip_greater).find("input[name$='trail_sip_greater']").removeAttr("disabled");
                if ($(trail_period_type).find("select[name$='trail_period_type']").val() == "Year") {
                    if ($(trail_period_from).find("input[name$='trail_period_from']").val() > "1") {
                        $(trail_sip_less).find("input[name$='trail_sip_less']").val("0");
                        $(trail_sip_less).find("input[name$='trail_sip_less']").attr("disabled", "disabled");
                        $(trail_sip_greater).find("input[name$='trail_sip_greater']").val("0");
                        $(trail_sip_greater).find("input[name$='trail_sip_greater']").attr("disabled", "disabled");
                    }
                }

                if (Utility.enableSIP == false) {
                    $(trail_sip_less).find("input[name$='trail_sip_less']").val("0");
                    $(trail_sip_less).find("input[name$='trail_sip_less']").attr("disabled", "disabled");
                    $(trail_sip_greater).find("input[name$='trail_sip_greater']").val("0");
                    $(trail_sip_greater).find("input[name$='trail_sip_greater']").attr("disabled", "disabled");
                }

            }

        }
    },

    generatebutton: function (status, memoid) {
        var user = sessionStorage.LoginId;
        var RoleID = sessionStorage.getItem("RoleID");
        var UserID = sessionStorage.getItem("UserID");
        var ModifiedbyRole;
        var ApprovalRoleID = 0;
        var MemoIsApproved = '';
        var IsSaved = false;
        var ModifiedBy = 0;
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetViewAction', JSON.stringify({ PaymentMemoID: memoid, MemoTypeID: 1 }), "json", false, false, function (result) {
            var arrItems = result.GetViewActionResult;
            ModifiedbyRole = arrItems.ModifiedByRole;
            ApprovalRoleID = arrItems.ApprovalRoleID;
            MemoIsApproved = arrItems.MemoLevel;
            IsSaved = arrItems.IsSaved;
            ModifiedBy = arrItems.ModifiedBy;
        });

        Utility.ServiceCall("POST", 'AuthorizationService.svc/GetUserModuleMenu', JSON.stringify({ UserID: sessionStorage.LoginId, MainMenuID: 1, _commandText: "GET_USER_MENU_RIGHTS" }), "json", false, false, function (result) {
            var rightItems = result.GetUserModuleMenuResult;
            var menuarr = [];
            $.each(rightItems, function (key, value) {
                menuarr.push(value.NavigateMenu);
            });
            switch (status) {
                case "Saved":
                    {
                        if (ModifiedbyRole <= RoleID) {
                            if (ModifiedbyRole == "3" && RoleID == 4) {
                                sessionStorage.CurrentMenuselected = "nav_information";
                                $("#btn_reorder").hide();
                                $("#div_btn").empty();
                                $('#btn_save_review').attr('disabled', 'disabled');
                                // $('#btn_save_info').attr('disabled', 'disabled');

                                var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                     '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                                $("#div_btn").append(input);
                                TieUp.ToggleBaseContols(true);
                            }
                            else {
                                if (jQuery.inArray('nav_initiate', menuarr) > -1) {
                                    sessionStorage.CurrentMenuselected = "nav_initiate";
                                    $("#div_btn").empty();
                                    var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\"  title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal"  title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                    '<button class="btn mr-right-01 btn-warning sq-btn" onclick=\"TieUp.InitiateSubmit();\">Submit</button>' +
                    '<button class="btn sq-btn mr-right-01 btn-success" id="btn_save_initiate" onclick=\"TieUp.SaveInitiate();\">Save</button><button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>');
                                    $("#div_btn").append(input);
                                    TieUp.ToggleBaseContols(false);
                                }
                                else {
                                    sessionStorage.CurrentMenuselected = "nav_information";
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();
                                    $('#btn_save_review').attr('disabled', 'disabled');
                                    // $('#btn_save_info').attr('disabled', 'disabled');

                                    var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                     '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                                    $("#div_btn").append(input);
                                    TieUp.ToggleBaseContols(true);
                                }
                            }

                        }
                        else {
                            sessionStorage.CurrentMenuselected = "nav_information";
                            $("#btn_reorder").hide();
                            $("#div_btn").empty();
                            $('#btn_save_review').attr('disabled', 'disabled');
                            // $('#btn_save_info').attr('disabled', 'disabled');

                            var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                     '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                            $("#div_btn").append(input);
                            TieUp.ToggleBaseContols(true);
                        }
                        break;
                    }
                case "Initiated":
                    {
                        if (ModifiedbyRole < RoleID) {
                            if (jQuery.inArray('nav_review', menuarr) > -1) {
                                if (RoleID >= 2) {
                                    sessionStorage.CurrentMenuselected = "nav_review";
                                    $("#div_btn").empty();

                                    input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                         '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                            '<button class="btn btn-warning sq-btn mr-right-01" id="btn_review_Discard" onclick=\"TieUp.review_Discard();\">Discard</button>' +
                              '<button class="btn btn-danger sq-btn mr-right-01" id="btn_review_reject" onclick=\"TieUp.review_Reject();\">Reject</button>' +
                              '<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"TieUp.ReviewForward();\">Forward</button>' +
                        '<button class="btn sq-btn mr-right-01 btn-success" id="btn_save_review" onclick=\"TieUp.SaveReview();\">Save</button><button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>');
                                    $("#div_btn").append(input);
                                    TieUp.ToggleBaseContols(true);
                                }
                                else {
                                    sessionStorage.CurrentMenuselected = "nav_information";
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();
                                    $('#btn_save_review').attr('disabled', 'disabled');
                                    // $('#btn_save_info').attr('disabled', 'disabled');

                                    var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                         '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                         '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                                    $("#div_btn").append(input);
                                }
                            }
                            else {
                                sessionStorage.CurrentMenuselected = "nav_information";
                                $("#btn_reorder").hide();
                                $("#div_btn").empty();
                                $('#btn_save_review').attr('disabled', 'disabled');
                                // $('#btn_save_info').attr('disabled', 'disabled');

                                var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                     '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                                $("#div_btn").append(input);
                            }
                        }
                        else if (ModifiedbyRole == RoleID) {
                            if (jQuery.inArray('nav_review', menuarr) > -1) {
                                if (IsSaved == true) {
                                    if (ModifiedBy == UserID) {
                                        sessionStorage.CurrentMenuselected = "nav_review";
                                        $("#div_btn").empty();

                                        input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                             '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                '<button class="btn btn-warning sq-btn mr-right-01" id="btn_review_Discard" onclick=\"TieUp.review_Discard();\">Discard</button>' +
                                  '<button class="btn btn-danger sq-btn mr-right-01" id="btn_review_reject" onclick=\"TieUp.review_Reject();\">Reject</button>' +
                                  '<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"TieUp.ReviewForward();\">Forward</button>' +
                            '<button class="btn sq-btn mr-right-01 btn-success" id="btn_save_review" onclick=\"TieUp.SaveReview();\">Save</button><button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>');
                                        $("#div_btn").append(input);
                                        TieUp.ToggleBaseContols(true);
                                    }
                                    else {
                                        sessionStorage.CurrentMenuselected = "nav_information";
                                        $("#btn_reorder").hide();
                                        $("#div_btn").empty();
                                        $('#btn_save_review').attr('disabled', 'disabled');
                                        //$('#btn_save_info').attr('disabled', 'disabled');

                                        var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                                 '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                 '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                                        $("#div_btn").append(input);
                                        TieUp.ToggleBaseContols(true);
                                    }
                                }
                                else {
                                    if (RoleID == "10") {
                                        sessionStorage.CurrentMenuselected = "nav_review";
                                        $("#div_btn").empty();

                                        input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                             '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                '<button class="btn btn-warning sq-btn mr-right-01" id="btn_review_Discard" onclick=\"TieUp.review_Discard();\">Discard</button>' +
                                  '<button class="btn btn-danger sq-btn mr-right-01" id="btn_review_reject" onclick=\"TieUp.review_Reject();\">Reject</button>' +
                                  '<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"TieUp.ReviewForward();\">Forward</button>' +
                            '<button class="btn sq-btn mr-right-01 btn-success" id="btn_save_review" onclick=\"TieUp.SaveReview();\">Save</button><button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>');
                                        $("#div_btn").append(input);
                                        TieUp.ToggleBaseContols(true);
                                    } else {
                                        sessionStorage.CurrentMenuselected = "nav_information";
                                        $("#btn_reorder").hide();
                                        $("#div_btn").empty();
                                        $('#btn_save_review').attr('disabled', 'disabled');
                                        //$('#btn_save_info').attr('disabled', 'disabled');

                                        var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                                 '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                 '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                                        $("#div_btn").append(input);
                                        TieUp.ToggleBaseContols(true);
                                    }
                                }
                            }
                            else {
                                sessionStorage.CurrentMenuselected = "nav_information";
                                $("#btn_reorder").hide();
                                $("#div_btn").empty();
                                $('#btn_save_review').attr('disabled', 'disabled');
                                // $('#btn_save_info').attr('disabled', 'disabled');

                                var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                     '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                                $("#div_btn").append(input);
                            }
                        }
                        else {
                            sessionStorage.CurrentMenuselected = "nav_information";
                            $("#btn_reorder").hide();
                            $("#div_btn").empty();
                            $('#btn_save_review').attr('disabled', 'disabled');
                            //$('#btn_save_info').attr('disabled', 'disabled');

                            var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                     '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                            $("#div_btn").append(input);
                            TieUp.ToggleBaseContols(true);
                        }
                        break;
                    }
                case "Reviewed":
                    {
                        if (ModifiedbyRole < RoleID) {
                            if (jQuery.inArray('nav_review', menuarr) > -1) {
                                sessionStorage.CurrentMenuselected = "nav_review";
                                $("#div_btn").empty();
                                input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                        '<button class="btn btn-warning sq-btn mr-right-01" id="btn_review_Discard" onclick=\"TieUp.review_Discard();\">Discard</button>' +
                          '<button class="btn btn-danger sq-btn mr-right-01" id="btn_review_reject" onclick=\"TieUp.review_Reject();\">Reject</button>' +
                          '<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"TieUp.ReviewForward();\">Forward</button>' +
                    '<button class="btn sq-btn mr-right-01 btn-success" id="btn_save_review" onclick=\"TieUp.SaveReview();\">Save</button><button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>');
                                $("#div_btn").append(input);
                                TieUp.ToggleBaseContols(true);

                            }
                            else if (jQuery.inArray('nav_approval', menuarr) > -1) {
                                sessionStorage.CurrentMenuselected = "nav_approval";
                                $("#btn_reorder").hide();
                                $("#div_btn").empty();

                                input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                      '<button class="btn btn-warning sq-btn mr-right-01" id ="btn_approval_Discard" onclick=\"TieUp.ApprovalDiscard();\">Discard</button>' +
                '<button class="btn btn-danger sq-btn mr-right-01" id ="btn_approval_reject" onclick=\"TieUp.ApprovalReject();\">Reject</button>' +
                '<button class="btn btn-success sq-btn mr-right-01" id ="btn_approval_approve" onclick=\"TieUp.TieUpApproval();\">Approve</button>' +
                    '<button class="btn sq-btn mr-right-01 btn-success" id="btn_save_review" onclick=\"TieUp.SaveReview();\">Save</button><button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>');
                                $("#div_btn").append(input);
                                TieUp.ToggleBaseContols(true);
                            }
                            else {
                                sessionStorage.CurrentMenuselected = "nav_information";
                                $("#btn_reorder").hide();
                                $("#div_btn").empty();
                                $('#btn_save_review').attr('disabled', 'disabled');
                                //$('#btn_save_info').attr('disabled', 'disabled');

                                var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                     '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                                $("#div_btn").append(input);
                                TieUp.ToggleBaseContols(true);
                            }
                        }
                        else if (ModifiedbyRole == RoleID || RoleID >= 6) {

                            if (jQuery.inArray('nav_approval', menuarr) > -1) {
                                if (RoleID > 6 || (ModifiedbyRole == 10 && ApprovalRoleID == 6)) {
                                    sessionStorage.CurrentMenuselected = "nav_approval";
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();

                                    input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                         '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                          '<button class="btn btn-warning sq-btn mr-right-01" id ="btn_approval_Discard" onclick=\"TieUp.ApprovalDiscard();\">Discard</button>' +
                    '<button class="btn btn-danger sq-btn mr-right-01" id ="btn_approval_reject" onclick=\"TieUp.ApprovalReject();\">Reject</button>' +
                    '<button class="btn btn-success sq-btn mr-right-01" id ="btn_approval_approve" onclick=\"TieUp.TieUpApproval();\">Approve</button>' +
                        '<button class="btn sq-btn mr-right-01 btn-success" id="btn_save_review" onclick=\"TieUp.SaveReview();\">Save</button><button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>');
                                    $("#div_btn").append(input);
                                    TieUp.ToggleBaseContols(true);
                                }
                                else {
                                    if (ModifiedbyRole == RoleID && IsSaved == true) {
                                        sessionStorage.CurrentMenuselected = "nav_approval";
                                        $("#btn_reorder").hide();
                                        $("#div_btn").empty();

                                        input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                             '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                              '<button class="btn btn-warning sq-btn mr-right-01" id ="btn_approval_Discard" onclick=\"TieUp.ApprovalDiscard();\">Discard</button>' +
                        '<button class="btn btn-danger sq-btn mr-right-01" id ="btn_approval_reject" onclick=\"TieUp.ApprovalReject();\">Reject</button>' +
                        '<button class="btn btn-success sq-btn mr-right-01" id ="btn_approval_approve" onclick=\"TieUp.TieUpApproval();\">Approve</button>' +
                            '<button class="btn sq-btn mr-right-01 btn-success" id="btn_save_review" onclick=\"TieUp.SaveReview();\">Save</button><button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>');
                                        $("#div_btn").append(input);
                                        TieUp.ToggleBaseContols(true);
                                    }
                                    else {
                                        sessionStorage.CurrentMenuselected = "nav_information";
                                        $("#btn_reorder").hide();
                                        $("#div_btn").empty();
                                        $('#btn_save_review').attr('disabled', 'disabled');
                                        //$('#btn_save_info').attr('disabled', 'disabled');

                                        var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                         '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                         '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                                        $("#div_btn").append(input);
                                        TieUp.ToggleBaseContols(true);
                                    }
                                }
                            }
                            else {
                                if (RoleID == "10" && ApprovalRoleID >= "6") {
                                    sessionStorage.CurrentMenuselected = "nav_information";
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();
                                    $('#btn_save_review').attr('disabled', 'disabled');
                                    //$('#btn_save_info').attr('disabled', 'disabled');

                                    var input = $('<button class="btn btn-success mr-right-01" id="btn_review_forward" onclick=\"TieUp.ReviewForward();\">Re-allocate</button> <button class="btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                                    $("#div_btn").append(input);
                                    TieUp.ToggleBaseContols(true);
                                }
                                else if (RoleID == "10" && ApprovalRoleID == "0") {
                                    if (jQuery.inArray('nav_review', menuarr) > -1) {
                                        sessionStorage.CurrentMenuselected = "nav_review";
                                        $("#div_btn").empty();
                                        input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                             '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                '<button class="btn btn-warning sq-btn mr-right-01" id="btn_review_Discard" onclick=\"TieUp.review_Discard();\">Discard</button>' +
                                  '<button class="btn btn-danger sq-btn mr-right-01" id="btn_review_reject" onclick=\"TieUp.review_Reject();\">Reject</button>' +
                                  '<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"TieUp.ReviewForward();\">Forward</button>' +
                            '<button class="btn sq-btn mr-right-01 btn-success" id="btn_save_review" onclick=\"TieUp.SaveReview();\">Save</button><button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>');
                                        $("#div_btn").append(input);
                                        TieUp.ToggleBaseContols(true);

                                    }
                                    else {
                                        sessionStorage.CurrentMenuselected = "nav_information";
                                        $("#btn_reorder").hide();
                                        $("#div_btn").empty();
                                        $('#btn_save_review').attr('disabled', 'disabled');
                                        //$('#btn_save_info').attr('disabled', 'disabled');

                                        var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                         '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                         '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                                        $("#div_btn").append(input);
                                        TieUp.ToggleBaseContols(true);
                                    }
                                }
                                else {
                                    sessionStorage.CurrentMenuselected = "nav_information";
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();
                                    $('#btn_save_review').attr('disabled', 'disabled');
                                    //$('#btn_save_info').attr('disabled', 'disabled');

                                    var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                     '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                                    $("#div_btn").append(input);
                                    TieUp.ToggleBaseContols(true);
                                }
                            }
                        }
                        else if (ModifiedbyRole <= 4 && (RoleID == "3" || RoleID == "10")) {
                            if (jQuery.inArray('nav_review', menuarr) > -1) {
                                sessionStorage.CurrentMenuselected = "nav_review";
                                $("#div_btn").empty();
                                input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal"  title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                        '<button class="btn btn-warning sq-btn mr-right-01" id="btn_review_Discard" onclick=\"TieUp.review_Discard();\">Discard</button>' +
                          '<button class="btn btn-danger sq-btn mr-right-01" id="btn_review_reject" onclick=\"TieUp.review_Reject();\">Reject</button>' +
                          '<button class="btn btn-success sq-btn mr-right-01" id="btn_review_forward" onclick=\"TieUp.ReviewForward();\">Forward</button>' +
                    '<button class="btn sq-btn mr-right-01 btn-success" id="btn_save_review" onclick=\"TieUp.SaveReview();\">Save</button><button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>');
                                $("#div_btn").append(input);
                                TieUp.ToggleBaseContols(true);

                            }
                        }
                        else if (ModifiedbyRole > 5 && (RoleID == "3" || RoleID == "10")) {
                            if (jQuery.inArray('nav_approval', menuarr) > -1) {
                                sessionStorage.CurrentMenuselected = "nav_approval";
                                $("#btn_reorder").hide();
                                $("#div_btn").empty();

                                input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal"  title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                      '<button class="btn btn-warning sq-btn mr-right-01" id ="btn_approval_Discard" onclick=\"TieUp.ApprovalDiscard();\">Discard</button>' +
                '<button class="btn btn-danger sq-btn mr-right-01" id ="btn_approval_reject" onclick=\"TieUp.ApprovalReject();\">Reject</button>' +
                '<button class="btn btn-success sq-btn mr-right-01" id ="btn_approval_approve" onclick=\"TieUp.TieUpApproval();\">Approve</button>' +
                    '<button class="btn sq-btn mr-right-01 btn-success" id="btn_save_review" onclick=\"TieUp.SaveReview();\">Save</button><button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>');
                                $("#div_btn").append(input);
                                TieUp.ToggleBaseContols(true);
                            }
                        }
                        else {
                            sessionStorage.CurrentMenuselected = "nav_information";
                            $("#btn_reorder").hide();
                            $("#div_btn").empty();

                            $('#btn_save_review').attr('disabled', 'disabled');
                            //$('#btn_save_info').attr('disabled', 'disabled');

                            var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                     '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                            $("#div_btn").append(input);
                            TieUp.ToggleBaseContols(true);
                        }
                        break;
                    }
                case "Approved":
                    {
                        if (ModifiedbyRole < RoleID) {
                            if (jQuery.inArray('nav_approval', menuarr) > -1) {
                                if (ModifiedbyRole <= "6") {
                                    sessionStorage.CurrentMenuselected = "nav_approval";
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();

                                    input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                         '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                          '<button class="btn btn-warning sq-btn mr-right-01" id ="btn_approval_Discard" onclick=\"TieUp.ApprovalDiscard();\">Discard</button>' +
                    '<button class="btn btn-danger sq-btn mr-right-01" id ="btn_approval_reject" onclick=\"TieUp.ApprovalReject();\">Reject</button>' +
                    '<button class="btn btn-success sq-btn mr-right-01" id ="btn_approval_approve" onclick=\"TieUp.TieUpApproval();\">Approve</button>' +
                        '<button class="btn sq-btn mr-right-01 btn-success" id="btn_save_review" onclick=\"TieUp.SaveReview();\">Save</button><button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CloseScreen();\">Cancel</button>');
                                    $("#div_btn").append(input);
                                    TieUp.ToggleBaseContols(true);
                                }
                                else {
                                    sessionStorage.CurrentMenuselected = "nav_information";
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();
                                    $('#btn_save_review').attr('disabled', 'disabled');
                                    //$('#btn_save_info').attr('disabled', 'disabled');

                                    var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                     '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                                    $("#div_btn").append(input);
                                    TieUp.ToggleBaseContols(true);
                                }
                            }
                            else {
                                if (RoleID == "10" && ModifiedbyRole != "6") {
                                    if (jQuery.inArray('nav_freeze', menuarr) > -1) {
                                        sessionStorage.CurrentMenuselected = "nav_freeze";
                                        $("#btn_reorder").hide();
                                        $("#div_btn").empty();
                                        input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                          '<button class="btn btn-success sq-btn mr-right-01" id="btn_freeze_freeze" onclick=\"TieUp.TieUpFreeze();\">Freeze</button>' +
                '<button id="btn_freeze_Discard" class="btn btn-warning sq-btn mr-right-01"  onclick=\"TieUp.FreezeDiscard();\">Discard</button>' +

                     '<button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CancelTieUp();\">Cancel</button>');
                                        $("#div_btn").append(input);
                                        TieUp.ToggleBaseContols(true);
                                    }
                                }
                                else {
                                    sessionStorage.CurrentMenuselected = "nav_information";
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();
                                    $('#btn_save_review').attr('disabled', 'disabled');
                                    //$('#btn_save_info').attr('disabled', 'disabled');

                                    var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                     '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                                    $("#div_btn").append(input);
                                    TieUp.ToggleBaseContols(true);
                                }
                            }
                        }
                        else {
                            if (RoleID == "10") {
                                if (jQuery.inArray('nav_freeze', menuarr) > -1) {
                                    sessionStorage.CurrentMenuselected = "nav_freeze";
                                    $("#btn_reorder").hide();
                                    $("#div_btn").empty();
                                    input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                          '<button class="btn btn-success sq-btn mr-right-01" id="btn_freeze_freeze" onclick=\"TieUp.TieUpFreeze();\">Freeze</button>' +
                '<button id="btn_freeze_Discard" class="btn btn-warning sq-btn mr-right-01"  onclick=\"TieUp.FreezeDiscard();\">Discard</button>' +

                     '<button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CancelTieUp();\">Cancel</button>');
                                    $("#div_btn").append(input);
                                    TieUp.ToggleBaseContols(true);
                                }
                            }
                            else {
                                sessionStorage.CurrentMenuselected = "nav_information";
                                $("#btn_reorder").hide();
                                $("#div_btn").empty();
                                $('#btn_save_review').attr('disabled', 'disabled');
                                //$('#btn_save_info').attr('disabled', 'disabled');

                                var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                     '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                                $("#div_btn").append(input);
                                TieUp.ToggleBaseContols(true);
                            }
                        }
                        break;
                    }
                case "Active":
                    {
                        if (MemoIsApproved == 'A') {
                            if (jQuery.inArray('nav_freeze', menuarr) > -1) {
                                sessionStorage.CurrentMenuselected = "nav_freeze";
                                $("#btn_reorder").hide();
                                $("#div_btn").empty();
                                input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                 '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                      '<button class="btn btn-success sq-btn mr-right-01" id="btn_freeze_freeze" onclick=\"TieUp.TieUpFreeze();\">Freeze</button>' +
            '<button id="btn_freeze_Discard" class="btn btn-warning sq-btn mr-right-01"  onclick=\"TieUp.FreezeDiscard();\">Discard</button>' +

                 '<button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CancelTieUp();\">Cancel</button>');
                                $("#div_btn").append(input);
                                TieUp.ToggleBaseContols(true);

                            }
                            else {
                                sessionStorage.CurrentMenuselected = "nav_information";
                                $("#btn_reorder").hide();
                                $("#div_btn").empty();
                                $('#btn_save_review').attr('disabled', 'disabled');
                                //$('#btn_save_info').attr('disabled', 'disabled');

                                var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                     '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                                $("#div_btn").append(input);
                                TieUp.ToggleBaseContols(true);
                            }
                        }
                        else if (MemoIsApproved == 'F') {
                            if (jQuery.inArray('nav_manage', menuarr) > -1) {
                                sessionStorage.CurrentMenuselected = "nav_manage";
                                $("#btn_reorder").hide();
                                $("#div_btn").empty();
                                var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                         '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                         '<button class="btn btn-warning sq-btn mr-right-01" onclick=\"TieUp.Viewtoccusers();\" target="_blank">Email</button><button class="btn btn-success sq-btn mr-right-01" onclick=\"TieUp.PrintRackRate();\">Print</button>' +
                                     '<button class="btn btn-danger sq-btn mr-right-01" id="btn_freeze_regenerate" onclick=\"Regenerate.ViewRegenerate();\">Regenerate</button>' +
                         '<button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CancelTieUp();\">Cancel</button>');
                                $("#div_btn").append(input);
                                $('#btn_save_review').attr('disabled', 'disabled');
                                // $('#btn_save_info').attr('disabled', 'disabled');
                                TieUp.ToggleBaseContols(true);
                            }
                            else {
                                sessionStorage.CurrentMenuselected = "nav_information";
                                $("#btn_reorder").hide();
                                $("#div_btn").empty();
                                $('#btn_save_review').attr('disabled', 'disabled');
                                //$('#btn_save_info').attr('disabled', 'disabled');

                                var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                         '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                         '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                                $("#div_btn").append(input);
                                TieUp.ToggleBaseContols(true);
                            }
                        }
                        else {
                            sessionStorage.CurrentMenuselected = "nav_information";
                            $("#btn_reorder").hide();
                            $("#div_btn").empty();
                            $('#btn_save_review').attr('disabled', 'disabled');
                            //$('#btn_save_info').attr('disabled', 'disabled');

                            var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                     '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');


                            $("#div_btn").append(input);
                            TieUp.ToggleBaseContols(true);
                        }
                        break;
                    }

                case "Discarded":
                    {
                        $("#btn_reorder").hide();
                        $("#div_btn").empty();

                        var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                     '<button class="btn btn-danger sq-btn mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');

                        $("#div_btn").append(input);

                        $('#btn_save_initiate').attr('disabled', 'disabled');
                        //$('#btn_save_info').attr('disabled', 'disabled');
                        TieUp.ToggleBaseContols(true);

                        break;
                    }
                case "Rejected":
                    {
                        if (jQuery.inArray('nav_initiate', menuarr) > -1) {
                            $("#div_btn").empty();
                            //        input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"></button>' +
                            // '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                            //'<button class="btn mr-right-01 btn-success sq-btn" onclick=\"TieUp.InitiateSubmit();\">Submit</button>' +
                            //'<button class="btn sq-btn mr-right-01 btn-success" id="btn_save_initiate" onclick=\"TieUp.SaveInitiate();\">Save</button><button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CancelTieUp();\">Cancel</button>');
                            //        $("#div_btn").append(input);

                            if (sessionStorage.MemoStatus == "Rejected") {
                                if (sessionStorage.LoginUserId.toLowerCase() != sessionStorage.LoginId.toLowerCase()) {
                                    if (RoleID == "3" || RoleID == "10") {
                                        input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                                             '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                            '<button class="btn mr-right-01 btn-warning sq-btn" onclick=\"TieUp.InitiateSubmit();\">Submit</button>' +
                                            '<button class="btn sq-btn mr-right-01 btn-success" id="btn_save_initiate" onclick=\"TieUp.SaveInitiate();\">Save</button><button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CancelTieUp();\">Cancel</button>');
                                        $("#div_btn").append(input);

                                    } else {
                                        var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                    '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                    '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');

                                        $("#div_btn").append(input);
                                    }
                                }
                                else {
                                    input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                                              '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                                             '<button class="btn mr-right-01 btn-warning sq-btn" onclick=\"TieUp.InitiateSubmit();\">Submit</button>' +
                                             '<button class="btn sq-btn mr-right-01 btn-success" id="btn_save_initiate" onclick=\"TieUp.SaveInitiate();\">Save</button><button class="btn sq-btn mr-right-01 btn-danger" onclick=\"TieUp.CancelTieUp();\">Cancel</button>');
                                    $("#div_btn").append(input);
                                }
                            }
                        }
                        else {

                        }
                        break;
                    }
                case "InActive": {
                    $("#btn_reorder").hide();
                    $("#div_btn").empty();

                    var input = $('<button class="btn btn-default mr-right-01" data-toggle="modal" onclick=\"TieUp.OpenRemarks(1);\" title="Remarks"><img src="../img/comment-btn.png"><span class="remark-count"><span class="remark-count-inner"></span></span></button>' +
                     '<button class="btn btn-default mr-right-01" data-toggle="modal" data-target="#myModal" title="Additional Notes"><img src="../img/file-btn.png"></button>' +
                     '<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');

                    $("#div_btn").append(input);

                    $('#btn_save_initiate').attr('disabled', 'disabled');
                    TieUp.ToggleBaseContols(true);
                    //$('#btn_save_info').attr('disabled', 'disabled');
                }
            }
        });
        // TieUp.ViewAction($('#hidden_payment_memo_id').val());
        if (status != "Active" && status != "InActive" && status != "Discarded" && status != "Rejected" && status != "Approved") {
            TieUp.CheckBranchAndRemoveControls();
        }

        TieUp.ViewRemarks();
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
            $("#div_btn").empty();
            $("#hdr_name").text("View Tie Up");
            var input = $('<button class="btn sq-btn btn-danger mr-right-01" id=btn_save_cancel onclick=\"TieUp.CancelTieUp();\">Cancel</button>');
            $("#div_btn").append(input);
            TieUp.ToggleBaseContols(true);
        }
    },

    DisableRackRate: function () {
        $('#div_content').find('input, textarea, button, select').removeAttr("disabled");
        // $('#btn_save_info').prop('disabled', true);
        $('#btn_add_rack_rate_detail').prop('disabled', true);
        $('#txt_remarks').prop('disabled', true);
        $('#txt_additional_notes').prop('disabled', true);
        //$('#div_rack_rate_detail').find('input, textarea, button, select').removeAttr("disabled");
        TieUp.ToggleBaseContols(true);
    },

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

    RemoveToDatePicker: function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 9) {
            $("#dt_to").datepicker("destroy");
            $("#dt_to").val("");
        }
    },

    SelectB15: function () {
        if ($('#chk_b15').is(':checked') || $('#chk_bothTandB').is(':checked')) {
            for (var schemeCount = 0; schemeCount < TieUp.DetailCount; schemeCount++) {
                $('#txt_additional_upfront' + schemeCount).removeAttr('disabled');
            }
        } else {
            for (var schemeCount = 0; schemeCount < TieUp.DetailCount; schemeCount++) {
                $('#txt_additional_upfront' + schemeCount).attr('disabled', 'disabled');

            }
        }
    },

    SelectSIP: function () {
        if ($('#chk_sip').is(':checked')) {
            Utility.writeNotification("success", "Existing SIP will get populated", "", true);
        }
    },

    Viewtoccusers: function () {
        var pagename = Utility.GetParameterValues('ptype');
        if (TieUp.TempMemoNumber != '' && (pagename == "mq" || pagename == "ss")) {
            $('#div_mailing_list').show();
            $('#modal_select_to_cc').modal('show');
            TieUp.GetTOCCusers(TieUp.TempMemoNumber);
        }
        else {
            if ($("#div_landing_grid").is(":visible")) {
                var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
                var selectedmemos = "";
                if (gridData.length > 0) {
                    for (var i = 0; i < gridData.length; i++) {
                        if (gridData[i].selectcheck == 'True') {
                            selectedmemos = TieUp.remove_tags(gridData[i].MemoNumber);
                        }
                    }
                    if (selectedmemos == "") {
                        Utility.writeNotification("error", "Select Memo to Send Email", "", true);
                    }
                    else {
                        $('#modal_select_to_cc').modal('show');
                        TieUp.GetTOCCusers(selectedmemos);
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
                        var fileurl = Utility.CamsReportUrl.replace("###MemoNumber###", TieUp.remove_tags(gridData[i].MemoNumber));
                        var filename = TieUp.remove_tags(gridData[i].MemoNumber);
                        var sendto = "";
                        Utility.ServiceCall("POST", 'BaseRackRateService.svc/SendEmailMemo', JSON.stringify({ fileurl: fileurl, filename: filename, sendto: sendto, typeval: 1, MailStatus: "Distributor Mail BRR", sendbcc: BCCusers }), "json", false, false, function (result) {
                            Utility.writeNotification("success", "Memo Emailed Successfully", "", true);
                        });
                        selectedmemos = gridData[i].MemoNumber
                    }
                }
            }
            else {
                Utility.writeNotification("error", "Select Memo to  Send Email", "", true);
            }
        }
        else {
        }
    },

    PrintRackRate: function () {
        var pagename = Utility.GetParameterValues('ptype');
        if (TieUp.TempMemoNumber != '' && (pagename == "mq" || pagename == "ss")) {
            var fileurl = Utility.TieUpCamsReportUrl.replace("###MemoNumber###", TieUp.TempMemoNumber);
            TieUp.openWin(fileurl);
        }
        else {
            if ($("#div_landing_grid").is(":visible")) {
                var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
                var selectedmemos = "";
                if (gridData.length > 0) {
                    for (var i = 0; i < gridData.length; i++) {
                        if (gridData[i].selectcheck == 'True') {
                            selectedmemos = gridData[i].MemoNumber;
                            var fileurl = Utility.TieUpCamsReportUrl.replace("###MemoNumber###", TieUp.remove_tags(gridData[i].MemoNumber));
                            fileurl = fileurl.replace("###Distributorid###", gridData[i].ARNNo);
                            TieUp.openWin(fileurl);
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

    remove_tags: function (html) {
        return jQuery(html).text();
    },

    openWin: function (url) {
        //var myWindow = window.open(url, '_blank');
        sessionStorage.reportURL = url;
        var myWindow = window.open("ReportViewer.html", '_blank');
    },

    Viewreport: function (paymentmemoid) {
        var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].PaymentMemoId == paymentmemoid) {
                    var fileurl = Utility.TieUpCamsReportUrl.replace("###MemoNumber###", TieUp.remove_tags(gridData[i].MemoNumber));
                    //fileurl = fileurl.replace("###Distributorid###", gridData[i].ARNNo);
                    TieUp.openWin(fileurl);
                }
            }
        }
    },

    ReturnSearchHyperLink: function (cellValue, options, rowdata, action) {
        if (rowdata.MemoStatus == "Active" && rowdata.MemoLevel == "A") {
            return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"TieUp.ViewScreen(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
        }
        else if (rowdata.MemoStatus == "Active" && rowdata.MemoLevel == "F") {
            return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"TieUp.Viewreport(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
        }
        else {
            return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"TieUp.ViewScreen(' + rowdata.PaymentMemoId + ');\">' + rowdata.PaymentMemoId + '</a>';
        }
    },

    ReturnMemonumberSearchHyperLink: function (cellValue, options, rowdata, action) {
        
        //if (rowdata.MemoStatus == "Active" && rowdata.MemoLevel == "A") {
        //    return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"TieUp.ViewScreen(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
        //}
        //else if (rowdata.MemoStatus == "Active" && rowdata.MemoLevel == "F") {
        //    return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"TieUp.Viewreport(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
        //}
        //As memolevel column not in gridview, commented the above two conditions ans added one below one condition  because its always showing memoid instead of emonumber in gridview hyperlink.
        if (rowdata.MemoStatus == "Active") {
            return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"TieUp.ViewScreen(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
        }
        else {
            return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"TieUp.ViewScreen(' + rowdata.PaymentMemoId + ');\">' + rowdata.PaymentMemoId + '</a>';
        }
    },

    ReturnCheckBox: function (cellValue, options, rowdata, action) {
        return "<input type='checkbox' style='display: block;margin-left: auto;margin-right: auto;' />";
    },

    ReturnRadioBox: function (cellValue, option) {
        return '<input type="radio" style="display: block;margin-left: auto;margin-right: auto;" name="radio_' + option.gid + '"  />';
    },

    ReturnBrokerageDetailHyperLink: function (cellValue, options, rowdata, action) {
        return "<a style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;' href='#'  onclick=\"TieUp.BrokerageDetail(" + rowdata.PaymentMemoId + "," + rowdata.SchemeId + ");\">Click Here</a>";

    },

    PeriodTypeChange: function (elem) {
        var inpText = $(elem).val();

        var parentRow = $(elem).closest('.trail_row');
        if ($('#dd_slab_type').val() == "Slab Amount") {
            $(parentRow).find("input[name$='trail_lumpsum_greater_tieup']").removeAttr("disabled");
        }
        if (inpText == "Months") {
            $(parentRow).find("input[name$='trail_period_to']").show();

            $(parentRow).find("input[name$='trail_sip_less']").val($(parentRow).find("input[name$='trail_lumpsum_base']").val());
            $(parentRow).find("input[name$='trail_sip_greater']").val($(parentRow).find("input[name$='trail_lumpsum_total']").val());
            $(parentRow).find("input[name$='trail_sip_less']").removeAttr("disabled");
            $(parentRow).find("input[name$='trail_sip_greater']").removeAttr("disabled");

        } else {
            $(parentRow).find("input[name$='trail_period_to']").hide();

            if ($(parentRow).find("select[name$='trail_period_type']").val() == "Year" && $(parentRow).find("input[name$='trail_period_from']").val() != "1") {
                $(parentRow).find("input[name$='trail_sip_less']").val("0");
                $(parentRow).find("input[name$='trail_sip_less']").attr("disabled", "disabled");

                $(parentRow).find("input[name$='trail_sip_greater']").val("0");
                $(parentRow).find("input[name$='trail_sip_greater']").attr("disabled", "disabled");
            }
            else {
                $(parentRow).find("input[name$='trail_sip_less']").val($(parentRow).find("input[name$='trail_lumpsum_base']").val());
                $(parentRow).find("input[name$='trail_sip_greater']").val($(parentRow).find("input[name$='trail_lumpsum_total']").val());
                $(parentRow).find("input[name$='trail_sip_less']").removeAttr("disabled");
                $(parentRow).find("input[name$='trail_sip_greater']").removeAttr("disabled");
            }
        }

    },

    addRow: function () {
        var tableRow = '<tr class="trail_row">' +
                                        '<td width="12%">' +
                                            '<div class="styled-select">' +
                                                '<select class="select-bx-style c-round" name="trail_period_type" disabled onchange="TieUp.PeriodTypeChange(this)" style="font-size:14px;">' +
                                                   ' <option value="Months">Months</option>' +
                                                    '<option value="Year">Year</option>' +
                                                '</select>' +
                                            '</div>' +
                                            '<input type="hidden" name="trail_is_copied" />' +
                                        '</td>' +
                                        '<td><input type="text" class="input-text-bx-style c-round numberonly" style="margin-right:4px;" maxlength="2" name="trail_period_from" disabled /></td>' +
                                       ' <td><input type="text" class="input-text-bx-style c-round numberonly" style="margin-right:4px;" maxlength="2" name="trail_period_to" disabled /></td>' +
                                        '<td><input type="text" class="input-text-bx-style c-round numberonly converttoint" style="margin-right:4px;" maxlength="3" name="trail_lumpsum_base" disabled onkeyup="TieUp.Calculatetrail(this);"/></td>' +
                                        '<td><input type="text" class="input-text-bx-style c-round numberonly converttoint" style="margin-right:4px;" maxlength="3" name="trail_lumpsum_additional" disabled onkeyup="TieUp.Calculatetrail(this);"/></td>' +
                                        '<td><input type="text" class="input-text-bx-style c-round negativenumber" style="margin-right:4px;" maxlength="3" name="trail_lumpsum_less_tieup" onkeyup="TieUp.Calculatetrail(this);"/></td>' +
                                        '<td><input type="text" class="input-text-bx-style c-round numberonly converttoint" style="margin-right:4px;" maxlength="3" name="trail_lumpsum_total" disabled/></td>' +
                                        '<td><input type="text" class="input-text-bx-style c-round numberonly converttoint" style="margin-right:4px;" maxlength="3" name="trail_lumpsum_greater" disabled/><input type="hidden" name="trail_lumpsum_greater_hidden" /></td>' +
                                         '<td><input type="text" class="input-text-bx-style c-round negativenumber" style="margin-right:4px;" maxlength="3" name="trail_lumpsum_greater_tieup" onkeyup="TieUp.Calculatetrail(this);"/></td>' +
                                          '<td><input type="text" class="input-text-bx-style c-round numberonly converttoint" style="margin-right:4px;" maxlength="3" name="trail_lumpsum_greater_total" /></td>' +
                                        '<td><input type="text" class="input-text-bx-style c-round numberonly converttoint" style="margin-right:4px;" maxlength="3" name="trail_sip_less" /></td>' +
                                        '<td><input type="text" class="input-text-bx-style c-round numberonly converttoint" style="margin-right:4px;" maxlength="3" name="trail_sip_greater" /></td>' +
                                       //' <td align="center" style="border-color:transparent;"><a href="javascript:void(0)" onclick="TieUp.ResetRow(this)"> <img src="../img/repeat-btn1.png" style="float:right;"></a></td>' +
                                       // '<td align="center" style="border-color:transparent;"><a href="javascript:void(0)" onclick="TieUp.DeleteRow(this)"> <img src="../img/trash-btn.png" style="float:left;"></a></td>' +
                                    '</tr>';

        $('#trailTable > tbody:last').append
        (tableRow);
        Utility.AllowDecimal();

        TieUp.SlabTypeChanged();
    },

    DeleteRow: function () {
        var tblrow = $("#trailTable tr.trail_row");
        var rowData = $($("#trailTable tr.trail_row")[tblrow.length - 1]);
        var column = $(rowData).find('td');

        var trail_period_type = column[0];
        var trail_period_from = column[1];
        var Period = $(trail_period_type).find("select[name$='trail_period_type']").val();
        var IsCopied = $(trail_period_type).find("input[name$='trail_is_copied']").val();

        var PeriodStart = $(trail_period_from).find("input[name$='trail_period_from']").val();
        if (Period == "Year") {
            if (PeriodStart == "1") {
                Utility.writeNotification("warning", "Delete Rates is not allowed for Year 1", "", true);
            }
            else {

                if (IsCopied.toLowerCase() == "true") {
                    $($("#trailTable tr.trail_row")[tblrow.length - 1]).remove();
                } else {
                    Utility.writeNotification("warning", "Copied Rates can only be deleted", "", true);
                }
            }
        } else {
            Utility.writeNotification("warning", "Delete Rates is not allowed for months", "", true);
        }
        //$(elem).parent().parent().remove();
    },

    ResetRow: function (elem) {
        var row = $(elem).parent().parent();
        var column = $(row).find('td');

        var trail_period_type = column[0];
        var trail_period_from = column[1];
        var trail_period_to = column[2];
        var trail_lumpsum_base = column[3];
        var trail_lumpsum_additional = column[4];
        var trail_lumpsum_less_tieup = column[5];
        var trail_lumpsum_total = column[6];
        var trail_lumpsum_greater_tieup = column[7];
        var trail_lumpsum_greater_total = column[7];
        var trail_lumpsum_greater = column[9];
        var trail_sip_less = column[10];
        var trail_sip_greater = column[11];

        $(trail_period_type).find("select[name$='trail_period_type']").val("Months")
        $(trail_period_type).find("input[name$='trail_is_copied']").val("0");
        $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val("");
        $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val("");
        $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val("");
        $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val("");
        $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val("");
        $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val("");
        $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val("");
        $(trail_sip_less).find("input[name$='trail_sip_less']").val("");
        $(trail_sip_greater).find("input[name$='trail_sip_greater']").val("");
        $(trail_period_from).find("input[name$='trail_period_from']").val("");
        $(trail_period_to).find("input[name$='trail_period_to']").val("");
        $(trail_period_to).find("input[name$='trail_period_to']").show();
    },

    CopyRow: function () {
        var value = {};
        var tblrow = $("#trailTable tr.trail_row");
        var rowData = $($("#trailTable tr.trail_row")[tblrow.length - 1]);
        var column = $(rowData).find('td');

        var trail_period_type = column[0];
        var trail_period_from = column[1];
        var trail_period_to = column[2];
        var trail_lumpsum_base = column[3];
        var trail_lumpsum_additional = column[4];
        var trail_lumpsum_less_tieup = column[5];
        var trail_lumpsum_total = column[6];

        var trail_lumpsum_greater = column[7];
        var trail_lumpsum_greater_tieup = column[8];
        var trail_lumpsum_greater_total = column[9];
        var trail_sip_less = column[10];
        var trail_sip_greater = column[11];

        value.Period = $(trail_period_type).find("select[name$='trail_period_type']").val();
        value.Base = $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val();
        value.Additional = $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val();
        value.LumpSumLessTieup = $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val();
        value.Total = $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val();
        value.LumpSumGreaterTieup = $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val();
        value.LumpSumGreaterTotal = $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val();
        value.LumpSumGreater = $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val();
        value.SIPSlabLess = $(trail_sip_less).find("input[name$='trail_sip_less']").val();
        value.SIPSlabGreater = $(trail_sip_greater).find("input[name$='trail_sip_greater']").val();
        value.PeriodStart = $(trail_period_from).find("input[name$='trail_period_from']").val();
        value.PeriodEnd = $(trail_period_to).find("input[name$='trail_period_to']").val();
        if (value.Period == "Year") {
            TieUp.addRow();
            tblrow = $("#trailTable tr.trail_row");
            rowData = $($("#trailTable tr.trail_row")[tblrow.length - 1]);
            column = $(rowData).find('td');

            trail_period_type = column[0];
            trail_period_from = column[1];
            trail_period_to = column[2];
            trail_lumpsum_base = column[3];
            trail_lumpsum_additional = column[4];
            trail_lumpsum_less_tieup = column[5];
            trail_lumpsum_total = column[6];

            trail_lumpsum_greater = column[7];
            trail_lumpsum_greater_tieup = column[8];
            trail_lumpsum_greater_total = column[9];
            trail_sip_less = column[10];
            trail_sip_greater = column[11];

            $(trail_period_type).find("select[name$='trail_period_type']").val("Year")
            $(trail_period_type).find("input[name$='trail_is_copied']").val("true")
            $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val(value.Base);
            $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val(value.Additional);
            $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val(value.LumpSumLessTieup);
            $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val(value.Total);
            $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val(value.LumpSumGreaterTieup);
            $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val(value.LumpSumGreaterTotal);
            $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(value.LumpSumGreater);
            $(trail_sip_less).find("input[name$='trail_sip_less']").val(value.SIPSlabLess);
            $(trail_sip_greater).find("input[name$='trail_sip_greater']").val(value.SIPSlabGreater);
            $(trail_period_from).find("input[name$='trail_period_from']").val(parseInt(value.PeriodStart) + 1);
            $(trail_period_to).find("input[name$='trail_period_to']").val(0);

            $(trail_period_to).find("input[name$='trail_period_to']").hide();
            $(trail_sip_less).find("input[name$='trail_sip_less']").attr("disabled", "disabled");
            $(trail_sip_greater).find("input[name$='trail_sip_greater']").attr("disabled", "disabled");

            if (Utility.enableSIP == false) {
                $(trail_sip_less).find("input[name$='trail_sip_less']").val("0");
                $(trail_sip_less).find("input[name$='trail_sip_less']").attr("disabled", "disabled");
                $(trail_sip_greater).find("input[name$='trail_sip_greater']").val("0");
                $(trail_sip_greater).find("input[name$='trail_sip_greater']").attr("disabled", "disabled");
            }
        }
        else {
            Utility.writeNotification("warning", "Copy Rates is not allowed for months", "", true);
        }

    },

    BindEditSchemeDetail: function (isupdate) {
        var SchemeId = 0;
        var ScehemCategoryId = 0;
        //TieUp.GetSchemeCategory("");

        $(TieUp.TempPaymentList).each(function (obj, value) {

            SchemeId = value.schemeid;
            ScehemCategoryId = value.schemecategoryid;
            if (isupdate == 1) {

                $('#dd_scheme_category').multiselect('select', ScehemCategoryId);
                $('#dd_scheme').multiselect('select', SchemeId);
            }
            var clawback = value.claw_back.split(' ');
            $('#txt_clawback').val(clawback[0]);
            $('#dd_claw_type').val(clawback[1]);

            $('#dd_slab_type').val(value.SlabType);

            if (value.SlabType == "Slab Amount") {
                var slab = value.slab_amount.split(' ');
                $('#txt_slab_amount').val(slab[0]);
                $('#dd_slab_amount_type').val(slab[1]);
                $('#hidden_Slab_Amount').val(slab[0]);
                $('#hidden_Slab_Amount_Type').val(slab[1]);
                $('#dd_slab_type').val("Slab Amount");
                $('#dd_slab_type').removeAttr("disabled");
                $('#txt_slab_amount').removeAttr("disabled");
                $('#dd_slab_amount_type').removeAttr("disabled");
            } else {
                $('#txt_slab_amount').val("");
                $('#dd_slab_amount_type').val("");
                $('#hidden_Slab_Amount').val("");
                $('#hidden_Slab_Amount_Type').val("");
                $('#dd_slab_type').val("All Amounts");
                $('#txt_slab_amount').attr("disabled", "disabled");
                $('#dd_slab_amount_type').attr("disabled", "disabled");
            }

            $('#txt_lumpsum_less_base').val(value.Base);
            $('#txt_lumpsum_less_additional').val(value.Additional);
            $('#txt_lumpsum_less_tieup').val(value.LumpSumLessTieup);
            $('#txt_lumpsum_less_total').val(value.Total);
            $('#txt_lumpsum_greater_tieup').val(value.LumpSumGreaterTieup);
            $('#txt_lumpsum_greater').val(value.LumpSumGreater);
            $('#txt_lumpsum_greater_total').val(value.LumpSumGreaterTotal);
            $('#txt_sip_less').val(value.SIPSlabLess);
            $('#txt_sip_greater').val(value.SIPSlabGreater);
            $('#txt_additional_upfront').val(value.addl_upfront_B15);
            $('#chk_onwards').prop('checked', value.Onwards);

            $("#trailTable tr.trail_row").remove();
        });
        $(TieUp.TempMonthList).each(function (obj, value) {
            if (value.schemeid == SchemeId && value.BrokerageTypeId == 3 && value.PeriodType == 1) {
                TieUp.addRow();
                var tblrow = $("#trailTable tr.trail_row");
                var rowData = $($("#trailTable tr.trail_row")[tblrow.length - 1]);
                var column = $(rowData).find('td');

                var trail_period_type = column[0];
                var trail_period_from = column[1];
                var trail_period_to = column[2];
                var trail_lumpsum_base = column[3];
                var trail_lumpsum_additional = column[4];
                var trail_lumpsum_less_tieup = column[5];
                var trail_lumpsum_total = column[6];

                var trail_lumpsum_greater = column[7];
                var trail_lumpsum_greater_tieup = column[8];
                var trail_lumpsum_greater_total = column[9];
                var trail_sip_less = column[10];
                var trail_sip_greater = column[11];

                $(trail_period_type).find("select[name$='trail_period_type']").val("Months")
                $(trail_period_type).find("input[name$='trail_is_copied']").val("false")
                $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val(value.Base);
                $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val(value.Additional);
                $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val(value.LumpSumLessTieup);
                $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val(value.Total);
                $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val(value.LumpSumGreaterTieup);
                $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val(value.LumpSumGreaterTotal);
                $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(value.LumpSumGreater);
                $(trail_sip_less).find("input[name$='trail_sip_less']").val(value.SIPSlabLess);
                $(trail_sip_greater).find("input[name$='trail_sip_greater']").val(value.SIPSlabGreater);
                $(trail_period_from).find("input[name$='trail_period_from']").val(value.PeriodStart);
                $(trail_period_to).find("input[name$='trail_period_to']").val(value.PeriodEnd);
                $(trail_period_to).find("input[name$='trail_period_to']").show();

                if (isupdate == 0) {
                    $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val(parseInt(value.LumpSumGreater) + parseInt(value.Additional) + parseInt(value.LumpSumLessTieup));
                    $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val(parseInt(value.Base) + parseInt(value.Additional) + parseInt(value.LumpSumLessTieup));
                    //$(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(parseInt(value.Base) + parseInt(value.Additional));
                    $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val(parseInt(value.LumpSumLessTieup));
                    //$(trail_sip_less).find("input[name$='trail_sip_less']").attr("disabled", "disabled");
                    //$(trail_sip_greater).find("input[name$='trail_sip_greater']").attr("disabled", "disabled");
                }

                if (Utility.enableSIP == false) {
                    $(trail_sip_less).find("input[name$='trail_sip_less']").val("0");
                    $(trail_sip_less).find("input[name$='trail_sip_less']").attr("disabled", "disabled");
                    $(trail_sip_greater).find("input[name$='trail_sip_greater']").val("0");
                    $(trail_sip_greater).find("input[name$='trail_sip_greater']").attr("disabled", "disabled");
                }
            }
        });

        $(TieUp.TempYearList).each(function (obj, value) {
            if (value.schemeid == SchemeId && value.BrokerageTypeId == 3 && value.PeriodType == 2) {
                TieUp.addRow();
                var tblrow = $("#trailTable tr.trail_row");
                var rowData = $($("#trailTable tr.trail_row")[tblrow.length - 1]);
                var column = $(rowData).find('td');

                var trail_period_type = column[0];
                var trail_period_from = column[1];
                var trail_period_to = column[2];
                var trail_lumpsum_base = column[3];
                var trail_lumpsum_additional = column[4];
                var trail_lumpsum_less_tieup = column[5];
                var trail_lumpsum_total = column[6];

                var trail_lumpsum_greater = column[7];
                var trail_lumpsum_greater_tieup = column[8];
                var trail_lumpsum_greater_total = column[9];
                var trail_sip_less = column[10];
                var trail_sip_greater = column[11];

                $(trail_period_type).find("select[name$='trail_period_type']").val("Year");
                $(trail_period_type).find("input[name$='trail_is_copied']").val(value.IsCopied);
                $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val(value.Base);
                $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val(value.Additional);
                $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val(value.LumpSumLessTieup);
                $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val(value.Total);
                $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val(value.LumpSumGreaterTieup);
                $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val(value.LumpSumGreaterTotal);
                $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(value.LumpSumGreater);
                $(trail_sip_less).find("input[name$='trail_sip_less']").val(value.SIPSlabLess);
                $(trail_sip_greater).find("input[name$='trail_sip_greater']").val(value.SIPSlabGreater);
                $(trail_period_from).find("input[name$='trail_period_from']").val(value.PeriodStart);
                $(trail_period_to).find("input[name$='trail_period_to']").val(value.PeriodEnd);

                $(trail_period_to).find("input[name$='trail_period_to']").hide();
                if (isupdate == 0) {
                    if (value.PeriodStart == 1) {
                        $(trail_sip_less).find("input[name$='trail_sip_less']").val(parseInt(value.Base) + parseInt(value.LumpSumLessTieup));
                        $(trail_sip_greater).find("input[name$='trail_sip_greater']").val(parseInt(value.Base) + parseInt(value.Additional) + parseInt(value.LumpSumLessTieup))
                        $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val(parseInt(value.LumpSumGreater) + parseInt(value.LumpSumGreaterTieup));
                    } else {
                        $(trail_sip_less).find("input[name$='trail_sip_less']").val("0");
                        $(trail_sip_greater).find("input[name$='trail_sip_greater']").val("0")
                        $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val(parseInt(value.LumpSumGreater) + parseInt(value.LumpSumGreaterTieup));
                        $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val(parseInt(value.Base) + parseInt(value.Additional) + parseInt(value.LumpSumLessTieup));
                        //$(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(parseInt(value.Base) + parseInt(value.Additional));
                        //$(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val(parseInt(value.LumpSumLessTieup));
                        $(trail_sip_less).find("input[name$='trail_sip_less']").attr("disabled", "disabled");
                        $(trail_sip_greater).find("input[name$='trail_sip_greater']").attr("disabled", "disabled");
                    }
                }
                else {
                    if (value.PeriodStart == 1) {
                        $(trail_sip_less).find("input[name$='trail_sip_less']").removeAttr("disabled");
                        $(trail_sip_greater).find("input[name$='trail_sip_greater']").removeAttr("disabled");
                    }
                    else {
                        $(trail_sip_less).find("input[name$='trail_sip_less']").attr("disabled", "disabled");
                        $(trail_sip_greater).find("input[name$='trail_sip_greater']").attr("disabled", "disabled");
                    }
                }

                if (Utility.enableSIP == false) {
                    $(trail_sip_less).find("input[name$='trail_sip_less']").val("0");
                    $(trail_sip_less).find("input[name$='trail_sip_less']").attr("disabled", "disabled");
                    $(trail_sip_greater).find("input[name$='trail_sip_greater']").val("0");
                    $(trail_sip_greater).find("input[name$='trail_sip_greater']").attr("disabled", "disabled");
                }
            }
        });

        TieUp.SlabTypeChanged();

        $('#txt_lumpsum_less_total').attr("disabled", "disabled");
        $('#txt_lumpsum_greater_total').attr("disabled", "disabled");
    },

    isSchemesectionvalid: function () {
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
                error += "ARN/Distributor Category Belong to more than 2 Channel <br/>";
            }
        });


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
        if ($("#dd_LumpsumSIPType option:selected").val() <= 0) {
            if (error.indexOf("LumpsumSIPType is Required") > -1) {
            }
            else {
                error += "LumpsumSIPType is Required. <br/>";
            }
        }
        //Benhan : Removing this as per reqirement on 1/7/2016
        //if ($("#dt_from").val() != "" && $("#dt_to").val() != "") {
        //    if ($("#dt_from").val() == $("#dt_to").val()) {
        //        if (error.indexOf("From Date and To date Cannot be same") > -1) {
        //        }
        //        else {
        //            error += "From Date and To date Cannot be same. <br/>";
        //        }
        //    }
        //}
        var ApplicableTo = "";
        if ($('#chk_t15').is(":checked")) {
            ApplicableTo = "1";
        }
        if ($('#chk_b15').is(":checked")) {
            if (ApplicableTo != "")
                ApplicableTo = ApplicableTo + ",";
            ApplicableTo = ApplicableTo + "2";
        }
        if ($('#chk_bothTandB').is(":checked")) {
            if (ApplicableTo != "")
                ApplicableTo = ApplicableTo + ",";
            ApplicableTo = ApplicableTo + "3";
        }

        if (ApplicableTo == "") {
            error += "Select Applicable Cities. <br/>";
        }

        var PaymentBasis = "";
        if ($('#chk_Gross_Mobilization').is(":checked")) {
            PaymentBasis = "1";
        }
        if ($('#chk_Nett_Mobilization').is(":checked")) {
            if (PaymentBasis != "")
                PaymentBasis = PaymentBasis + ",";
            PaymentBasis = PaymentBasis + "2";
        }
        if ($('#chk_Folio').is(":checked")) {
            if (PaymentBasis != "")
                PaymentBasis = PaymentBasis + ",";
            PaymentBasis = PaymentBasis + "3";
        }

        if (PaymentBasis == "") {
            error += "Basis of Payment is Required. <br/>";
        }
        else if (PaymentBasis == "3") {
            if ($('#txt_Folio').val() == "") {
                error += "Enter Folio. <br/>";
            }
        }


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

        if (scheme == "") {
            if (error.indexOf("Select Scheme") > -1) {
            }
            else {
                error += "Select Scheme. <br/>";
            }
        }
        else {
            if (TieUp.IsEditing == 0) {
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


                $(TieUp.TempPaymentList).each(function (listobj, listvalue) {
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
                            if (error.indexOf("Scheme already added") > -1) {
                                return false;
                            }
                            else {
                                error += "Scheme already added. <br/>";
                                return false;
                            }
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

        if ($('#dd_slab_type').val() == "Slab Amount") {
            if (parseInt($('#txt_slab_amount').val()) == "0") {
                error = error + "Slab Amount Cannot be 0";
            }
            if ($('#txt_slab_amount').val() == "") {
                error = error + "Slab Amount Cannot be empty";
            }
        }
        TieUp.GetTrailData();

        if (TieUp.TempTrail.length > 0) {
            var gridData = TieUp.TempTrail;
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
                                    if (error.indexOf("Duration must be greater than last month's Duration") > -1) {
                                    }
                                    else {
                                        error = error + "Duration must be greater than last month's Duration. <br/>"
                                    }
                                }
                                else if (parseInt(currentduration) + 1 != parseInt(gridData[i].PeriodStart)) {
                                    if (error.indexOf("Enter Concurrent Months") > -1) {
                                    }
                                    else {
                                        error = error + "Enter Concurrent Months. <br/>"
                                    }
                                }
                                if (gridData[i - 1].Period == "Year") {
                                    if (error.indexOf("Months Cannot be added after Year") > -1) {
                                    }
                                    else {
                                        error = error + "Months Cannot be added after Year. <br/>"
                                    }
                                }
                            }

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
                        else {
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
                            if (gridData[i].PeriodStart.length > 1 || gridData[i].PeriodStart.length == 0) {
                                if (error.indexOf("Enter Valid Year") > -1) {
                                }
                                else {
                                    error = error + "Enter Valid Year. <br/>"
                                }
                            }
                            else {
                                var yeardata = [];
                                var gridRackData = TieUp.TempTrail;
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
                                        if (gridData[cnt].PeriodStart == "0") {
                                            if (error.indexOf("Enter Year > 1") > -1) {
                                            }
                                            else {
                                                error = error + "Enter Year > 1. <br/>"
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
                                            if (error.indexOf("Period Should be in Sequence") > -1) {
                                            }
                                            else {
                                                error = error + "Period Should be in Sequence. <br/>"
                                            }
                                            yeari = yeardata.length;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //if (gridData[i].Base == "" || gridData[i].Base == "0") {
                    //    if (error.indexOf("Enter Valid Base") > -1) {
                    //    }
                    //    else {
                    //        error = error + "Enter Valid Base <br/>"
                    //    }
                    //    i = gridData.length;
                    //}
                }
            }
        }
        if (sessionStorage.CurrentMenuselected == "nav_information") {
            var selectedscheme = $('#dd_scheme option:selected');

            var selectedschemeID = [];
            $(selectedscheme).each(function () {
                selectedschemeID.push([$(this).val()]);
            });
            var memoval = $('#hidden_payment_memo_id').val() == "" ? 0 : $('#hidden_payment_memo_id').val();
            if (error == "") {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/MemoExists', JSON.stringify({ ArnNo: ARNSelected, Channel: "", DistributorCategory: Categoryselected.toString(), schemeid: selectedschemeID.toString(), DateFrom: $('#dt_from').val(), DateTo: $('#dt_to').val(), MemoId: memoval, TransactionType: "", MemoType: "2" }), "json", false, false, function (result) {
                    if (result.MemoExistsResult != "")
                        error = result.MemoExistsResult;
                });
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

    GetTrailData: function () {
        TieUp.TempTrail = [];
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
            var trail_lumpsum_less_tieup = column[5];
            var trail_lumpsum_total = column[6];

            var trail_lumpsum_greater = column[7];
            var trail_lumpsum_greater_tieup = column[8];
            var trail_lumpsum_greater_total = column[9];
            var trail_sip_less = column[10];
            var trail_sip_greater = column[11];

            var period_type = $(trail_period_type).find("select[name$='trail_period_type']").val()
            if (period_type == "Months") {
                var period = $(trail_period_from).find("input[name$='trail_period_from']").val() + "-" + $(trail_period_to).find("input[name$='trail_period_to']").val();
                monthperiods = monthperiods == "" ? period : monthperiods + "," + period;

                detailitem = {}
                detailitem["BrokerageTypeId"] = 3;
                detailitem["Base"] = $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val();
                detailitem["Additional"] = $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val();
                detailitem["LumpSumLessTieup"] = $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() == "" ? 0 : $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val();
                detailitem["Total"] = $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val() == "" ? 0 : $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val();
                detailitem["LumpSumGreaterTieup"] = $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val() == "" ? 0 : $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val();
                detailitem["LumpSumGreater"] = $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val() == "" ? 0 : $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val();
                detailitem["LumpSumGreaterTotal"] = $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val() == "" ? 0 : $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val();
                detailitem["SIPSlabLess"] = $(trail_sip_less).find("input[name$='trail_sip_less']").val() == "" ? 0 : $(trail_sip_less).find("input[name$='trail_sip_less']").val();
                detailitem["SIPSlabGreater"] = $(trail_sip_greater).find("input[name$='trail_sip_greater']").val() == "" ? 0 : $(trail_sip_greater).find("input[name$='trail_sip_greater']").val();
                detailitem["monthperiods"] = period;
                detailitem["PeriodStart"] = $(trail_period_from).find("input[name$='trail_period_from']").val();
                detailitem["PeriodEnd"] = $(trail_period_to).find("input[name$='trail_period_to']").val();
                detailitem["PeriodType"] = 1;
                detailitem["Period"] = "Months";
                TieUp.TempTrail.push(detailitem);
            }
            else {
                var period = $(trail_period_from).find("input[name$='trail_period_from']").val();
                if (period == "1") {
                    yearcount += 1;
                    detailitem = {}
                    detailitem["BrokerageTypeId"] = 3;
                    detailitem["Base"] = $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val();
                    detailitem["Additional"] = $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val();
                    detailitem["LumpSumLessTieup"] = $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() == "" ? 0 : $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val();
                    detailitem["Total"] = $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val() == "" ? 0 : $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val();
                    detailitem["LumpSumGreaterTieup"] = $(trail_lumpsum_total).find("input[name$='trail_lumpsum_greater_tieup']").val() == "" ? 0 : $(trail_lumpsum_total).find("input[name$='trail_lumpsum_greater_tieup']").val();
                    detailitem["LumpSumGreater"] = $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val() == "" ? 0 : $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val();
                    detailitem["LumpSumGreaterTotal"] = $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val() == "" ? 0 : $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val();
                    detailitem["SIPSlabLess"] = $(trail_sip_less).find("input[name$='trail_sip_less']").val() == "" ? 0 : $(trail_sip_less).find("input[name$='trail_sip_less']").val();
                    detailitem["SIPSlabGreater"] = $(trail_sip_greater).find("input[name$='trail_sip_greater']").val() == "" ? 0 : $(trail_sip_greater).find("input[name$='trail_sip_greater']").val();
                    detailitem["monthperiods"] = period;
                    detailitem["PeriodStart"] = $(trail_period_from).find("input[name$='trail_period_from']").val();
                    detailitem["PeriodEnd"] = 0;
                    detailitem["PeriodType"] = 2;
                    detailitem["Period"] = "Year";
                    TieUp.TempTrail.push(detailitem);
                } else {
                    yearcount += 1;
                    detailitem = {}
                    detailitem["BrokerageTypeId"] = 3;
                    detailitem["Base"] = $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val();
                    detailitem["Additional"] = $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val();
                    detailitem["LumpSumLessTieup"] = $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() == "" ? 0 : $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val();
                    detailitem["Total"] = $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val() == "" ? 0 : $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val();
                    detailitem["LumpSumGreaterTieup"] = $(trail_lumpsum_total).find("input[name$='trail_lumpsum_greater_tieup']").val() == "" ? 0 : $(trail_lumpsum_total).find("input[name$='trail_lumpsum_greater_tieup']").val();
                    detailitem["LumpSumGreater"] = $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val() == "" ? 0 : $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val();
                    detailitem["LumpSumGreaterTotal"] = $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val() == "" ? 0 : $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val();
                    detailitem["SIPSlabLess"] = $(trail_sip_less).find("input[name$='trail_sip_less']").val() == "" ? 0 : $(trail_sip_less).find("input[name$='trail_sip_less']").val();
                    detailitem["SIPSlabGreater"] = $(trail_sip_greater).find("input[name$='trail_sip_greater']").val() == "" ? 0 : $(trail_sip_greater).find("input[name$='trail_sip_greater']").val();
                    detailitem["monthperiods"] = period;
                    detailitem["PeriodStart"] = $(trail_period_from).find("input[name$='trail_period_from']").val();
                    detailitem["PeriodEnd"] = 0;
                    detailitem["PeriodType"] = 2;
                    detailitem["Period"] = "Year";
                    TieUp.TempTrail.push(detailitem);
                }
            }
        }
    },

    ClearSection: function () {

        $('#txt_clawback').val("");
        $('#dd_claw_type').val("Months");
        $('#dd_slab_type').val("Slab Amount");
        $('#txt_slab_amount').val("");
        $('#txt_slab_amount').removeAttr("disabled");
        $('#dd_slab_amount_type').removeAttr("disabled");
        $('#dd_slab_amount_type').val("Lakhs");
        $("#trailTable tr.trail_row").remove();
        TieUp.addRow();

        $('#txt_lumpsum_less_base').val("");
        $('#txt_lumpsum_less_additional').val("");
        $('#txt_lumpsum_less_tieup').val("");
        $('#txt_lumpsum_less_total').val("");
        $('#txt_lumpsum_greater_tieup').val("");
        $('#txt_lumpsum_greater').val("");
        $('#txt_lumpsum_greater_total').val("");
        $('#txt_sip_less').val("");
        $('#txt_sip_greater').val("");
        $('#txt_additional_upfront').val("");
        $('#dd_scheme_category').multiselect('clearSelection');
        $("#dd_scheme").multiselect('destroy');
        $("#dd_scheme").empty();
        $('#dd_scheme').multiselect('rebuildscheme');

        TieUp.SlabTypeOnchange(0);
        IsEditing = 0;
    },

    SaveTieUpInfo: function (updateStatus, message, IsSaved) {
        if (TieUp.isSchemesectionvalid()) {

            var Category = $('#dd_dist_category_info option:selected');
            var lumpsumSIPType = $('#dd_LumpsumSIPType option:selected').val();
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

            var transactiontype = "";

            var ApplicableTo = "";
            if ($('#chk_t15').is(":checked")) {
                ApplicableTo = "1";
            }
            if ($('#chk_b15').is(":checked")) {
                if (ApplicableTo != "")
                    ApplicableTo = ApplicableTo + ",";
                ApplicableTo = ApplicableTo + "2";
            }
            if ($('#chk_bothTandB').is(":checked")) {
                if (ApplicableTo != "")
                    ApplicableTo = ApplicableTo + ",";
                ApplicableTo = ApplicableTo + "3";
            }

            var PaymentBasis = "";
            if ($('#chk_Gross_Mobilization').is(":checked")) {
                PaymentBasis = "1";
            }
            if ($('#chk_Nett_Mobilization').is(":checked")) {
                if (PaymentBasis != "")
                    PaymentBasis = PaymentBasis + ",";
                PaymentBasis = PaymentBasis + "2";
            }
            if ($('#chk_Folio').is(":checked")) {
                if (PaymentBasis != "")
                    PaymentBasis = PaymentBasis + ",";
                PaymentBasis = PaymentBasis + "3";
            }

            var PaymentMemo = [{
                PaymentMemoId: $("#hidden_payment_memo_id").val(),
                BranchId: 0,
                ZoneId: 0,
                MemoTypeId: 2,
                PaymentAmount: 0,
                DateFrom: $("#dt_from").val(),
                DateTo: $("#dt_to").val(),
                ApplicableTo: ApplicableTo,
                TransactionType: transactiontype,
                SlabType: 0,
                SlabAmount: 0,
                SlabCondition: 0,
                Remarks: $("#txt_remarks").val(),
                Comments: $("#txt_additional_notes").val(),
                MemoStatus: updateStatus,
                TransactionTypeOthers: "",
                CopiedMemoID: "0",
                SIPNotes: "",
                IsCloseEnded: 0,
                PaymentMemoLinkId: $('#hidden_payment_memo_link_id').val() == "" ? 0 : $('#hidden_payment_memo_link_id').val(),
                LumpsumSIPTypeId: lumpsumSIPType,
                IsSaved: IsSaved,
            }];

            var PaymentLi = [];
            var PaymentDetail = [];

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
                TieUp.TempPaymentList = [];
                TieUp.TempPaymentDetails = [];
                TieUp.TempMonthList = [];
                TieUp.TempYearList = [];
                var SchemeId = 0;
                $(data).each(function (obj, value) {
                    SchemeId = value.SchemeId;
                    listitem = {};
                    listitem["PaymentListId"] = "";
                    listitem["SchemeId"] = value.SchemeId;
                    listitem["SchemeCategoryId"] = value.SchemeCategoryId;
                    listitem["PaymentMemoId"] = 0;
                    listitem["PaymentType"] = "";

                    listitem["DistributorCategoryId"] = Categoryselected.toString();
                    listitem["DistributorCategoryName"] = CategoryNameselected.toString();
                    listitem["ARNNO"] = ARNSelected;
                    listitem["ARNName"] = ARNNameSelected;
                    listitem["DateFrom"] = $("#dt_from").val();
                    listitem["DateTo"] = $("#dt_to").val();
                    listitem["SlabType"] = $('#dd_slab_type :selected').val();
                    listitem["SlabAmount"] = ($('#txt_slab_amount').val() + " ") + ($('#dd_slab_amount_type').val() == null ? "" : $('#dd_slab_amount_type').val());
                    listitem["PaymentBasis"] = PaymentBasis;
                    listitem["Target"] = 0;
                    listitem["TargetPeriod"] = "";
                    listitem["InterestRate"] = "";
                    listitem["InstallmentCondition"] = "";
                    listitem["InstallmentRangeFrom"] = 0;
                    listitem["InstallmentRangeTo"] = 0;
                    listitem["TenureCondition"] = "";
                    listitem["TenureMonths"] = 0;
                    listitem["UpfrontPaymentType"] = "";
                    listitem["UpfrontValue"] = 0;//$('#txt_additional_upfront' + cnt + '').val();
                    listitem["Calculation"] = 0;
                    listitem["Clawback"] = ($('#txt_clawback').val() == "" ? "0" : $('#txt_clawback').val()) + " " + $('#dd_claw_type :selected').text();
                    listitem["SIPIncentiveRemarks"] = "";
                    listitem["FreeTextField1"] = "";
                    listitem["FreeTextField2"] = "";
                    listitem["Onwards"] = $('#chk_onwards').is(":checked");
                    listitem["IsUpdated"] = 0;
                    listitem["SIPSlab"] = $("#txt_sip_slab").val();
                    listitem["Folio"] = $("#txt_Folio").val();

                    PaymentLi.push(listitem);

                    ////Add Upfront Brokerage in T15 &B15 to PaymentDetail////////

                    detailitem = {}
                    detailitem["PaymentDetailsId"] = "0";
                    detailitem["BrokerageTypeId"] = 1;
                    detailitem["SchemeId"] = SchemeId;
                    detailitem["PaymentListId"] = "0";
                    detailitem["BaseUpfront"] = $('#txt_lumpsum_less_base').val() == "" ? 0 : $('#txt_lumpsum_less_base').val();
                    detailitem["AdditionalIncentives"] = $('#txt_lumpsum_less_additional').val() == "" ? 0 : $('#txt_lumpsum_less_additional').val();
                    detailitem["LumpSumLessTieup"] = $('#txt_lumpsum_less_tieup').val() == "" ? 0 : $('#txt_lumpsum_less_tieup').val();
                    detailitem["Total"] = $('#txt_lumpsum_less_total').val() == "" ? 0 : $('#txt_lumpsum_less_total').val();
                    detailitem["LumpSumGreaterTieup"] = $('#txt_lumpsum_greater_tieup').val() == "" ? 0 : $('#txt_lumpsum_greater_tieup').val();
                    detailitem["LumpSumGreater"] = $('#txt_lumpsum_greater').val() == "" ? 0 : $('#txt_lumpsum_greater').val();
                    detailitem["LumpSumGreaterTotal"] = $('#txt_lumpsum_greater_total').val() == "" ? 0 : $('#txt_lumpsum_greater_total').val();
                    detailitem["SIPSlabLess"] = $('#txt_sip_less').val() == "" ? 0 : $('#txt_sip_less').val();
                    detailitem["SIPSlabGreater"] = $('#txt_sip_greater').val() == "" ? 0 : $('#txt_sip_greater').val();
                    detailitem["PeriodType"] = 0;
                    detailitem["PeriodStart"] = 0;
                    detailitem["PeriodEnd"] = 0;
                    detailitem["SlabTotal"] = 0;
                    detailitem["IsSlabLess"] = 0;
                    detailitem["IsCopied"] = 0;

                    PaymentDetail.push(detailitem);


                    ////Add Additional Upfront in B15
                    detailitem = {}
                    detailitem["PaymentDetailsId"] = "0"; //  $('#hidden_additional_upfront_id_' + cnt + '').val();
                    detailitem["PaymentMemoId"] = 0;
                    detailitem["BrokerageTypeId"] = 2;
                    detailitem["SchemeId"] = SchemeId;
                    detailitem["PaymentListId"] = "0"; // $('#hidden_payment_list_id_' + cnt + '').val() == 0 ? cnt : $('#hidden_payment_list_id_' + cnt + '').val();
                    detailitem["LumpSumLessTieup"] = 0;
                    detailitem["LumpSumGreaterTieup"] = 0;
                    detailitem["AdditionalIncentives"] = "0";
                    detailitem["BaseUpfront"] = $('#txt_additional_upfront').val() == "" ? 0 : $('#txt_additional_upfront').val();
                    detailitem["Total"] = 0;
                    detailitem["LumpSumGreater"] = 0;
                    detailitem["LumpSumGreaterTotal"] = 0;
                    detailitem["SIPSlabLess"] = 0;
                    detailitem["SIPSlabGreater"] = 0;
                    detailitem["PeriodType"] = 0;
                    detailitem["PeriodStart"] = 0;
                    detailitem["PeriodEnd"] = 0;
                    detailitem["SlabTotal"] = 0;
                    detailitem["IsSlabLess"] = 0;
                    detailitem["IsCopied"] = 0;

                    PaymentDetail.push(detailitem);

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
                        var trail_lumpsum_less_tieup = column[5];
                        var trail_lumpsum_total = column[6];
                        var trail_lumpsum_greater = column[7];
                        var trail_lumpsum_greater_tieup = column[8];
                        var trail_lumpsum_greater_total = column[9];
                        var trail_sip_less = column[10];
                        var trail_sip_greater = column[11];

                        var period_type = $(trail_period_type).find("select[name$='trail_period_type']").val()
                        if (period_type == "Months") {
                            var period = $(trail_period_from).find("input[name$='trail_period_from']").val() + "-" + $(trail_period_to).find("input[name$='trail_period_to']").val();
                            monthperiods = monthperiods == "" ? period : monthperiods + "," + period;

                            detailitem = {}
                            detailitem["PaymentDetailsId"] = 1;
                            detailitem["PaymentMemoId"] = 0;
                            detailitem["BrokerageTypeId"] = 3;
                            detailitem["SchemeId"] = SchemeId;
                            detailitem["PaymentListId"] = 0;
                            detailitem["BaseUpfront"] = $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val();
                            detailitem["AdditionalIncentives"] = $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val();
                            detailitem["LumpSumLessTieup"] = $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() == "" ? 0 : $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val();
                            detailitem["Total"] = $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val() == "" ? 0 : $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val();
                            detailitem["LumpSumGreaterTieup"] = $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val() == "" ? 0 : $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val();
                            detailitem["LumpSumGreater"] = $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val() == "" ? 0 : $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val();
                            detailitem["LumpSumGreaterTotal"] = $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val() == "" ? 0 : $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val();
                            detailitem["SIPSlabLess"] = $(trail_sip_less).find("input[name$='trail_sip_less']").val() == "" ? 0 : $(trail_sip_less).find("input[name$='trail_sip_less']").val();
                            detailitem["SIPSlabGreater"] = $(trail_sip_greater).find("input[name$='trail_sip_greater']").val() == "" ? 0 : $(trail_sip_greater).find("input[name$='trail_sip_greater']").val();
                            detailitem["PeriodType"] = 1;
                            detailitem["PeriodStart"] = $(trail_period_from).find("input[name$='trail_period_from']").val();
                            detailitem["PeriodEnd"] = $(trail_period_to).find("input[name$='trail_period_to']").val();
                            detailitem["SlabTotal"] = 0;
                            detailitem["IsSlabLess"] = 0;
                            detailitem["IsCopied"] = 0;
                            PaymentDetail.push(detailitem);
                        }
                        else {
                            var period = $(trail_period_from).find("input[name$='trail_period_from']").val();
                            if (period == "1") {
                                yearcount += 1;
                                detailitem = {}
                                detailitem["PaymentDetailsId"] = 1;
                                detailitem["PaymentMemoId"] = 0;
                                detailitem["BrokerageTypeId"] = 3;
                                detailitem["SchemeId"] = SchemeId;
                                detailitem["PaymentListId"] = 0;
                                detailitem["BaseUpfront"] = $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val();
                                detailitem["AdditionalIncentives"] = $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val();
                                detailitem["LumpSumLessTieup"] = $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() == "" ? 0 : $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val();
                                detailitem["Total"] = $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val() == "" ? 0 : $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val();
                                detailitem["LumpSumGreaterTieup"] = $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val() == "" ? 0 : $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val();
                                detailitem["LumpSumGreater"] = $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val() == "" ? 0 : $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val();
                                detailitem["LumpSumGreaterTotal"] = $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val() == "" ? 0 : $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val();
                                detailitem["SIPSlabLess"] = $(trail_sip_less).find("input[name$='trail_sip_less']").val() == "" ? 0 : $(trail_sip_less).find("input[name$='trail_sip_less']").val();
                                detailitem["SIPSlabGreater"] = $(trail_sip_greater).find("input[name$='trail_sip_greater']").val() == "" ? 0 : $(trail_sip_greater).find("input[name$='trail_sip_greater']").val();
                                detailitem["PeriodType"] = 2;
                                detailitem["PeriodStart"] = $(trail_period_from).find("input[name$='trail_period_from']").val();
                                detailitem["PeriodEnd"] = 0;
                                detailitem["SlabTotal"] = 0;
                                detailitem["IsSlabLess"] = 0;
                                detailitem["IsCopied"] = 0;
                                PaymentDetail.push(detailitem);

                            } else {
                                yearcount += 1;

                                detailitem = {}
                                detailitem["PaymentDetailsId"] = 1;
                                detailitem["PaymentMemoId"] = 0;
                                detailitem["BrokerageTypeId"] = 3;
                                detailitem["SchemeId"] = SchemeId;
                                detailitem["PaymentListId"] = 0;
                                detailitem["BaseUpfront"] = $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val();
                                detailitem["AdditionalIncentives"] = $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val();
                                detailitem["LumpSumLessTieup"] = $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() == "" ? 0 : $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val();
                                detailitem["Total"] = $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val() == "" ? 0 : $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val();
                                detailitem["LumpSumGreaterTieup"] = $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val() == "" ? 0 : $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val();
                                detailitem["LumpSumGreater"] = $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val() == "" ? 0 : $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val();
                                detailitem["LumpSumGreaterTotal"] = $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val() == "" ? 0 : $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val();
                                detailitem["SIPSlabLess"] = $(trail_sip_less).find("input[name$='trail_sip_less']").val() == "" ? 0 : $(trail_sip_less).find("input[name$='trail_sip_less']").val();
                                detailitem["SIPSlabGreater"] = $(trail_sip_greater).find("input[name$='trail_sip_greater']").val() == "" ? 0 : $(trail_sip_greater).find("input[name$='trail_sip_greater']").val();
                                detailitem["PeriodType"] = 2;
                                detailitem["PeriodStart"] = $(trail_period_from).find("input[name$='trail_period_from']").val();
                                detailitem["PeriodEnd"] = 0;
                                detailitem["SlabTotal"] = 0;
                                detailitem["IsSlabLess"] = 0;
                                detailitem["IsCopied"] = $(trail_period_type).find("input[name$='trail_is_copied']").val();
                                PaymentDetail.push(detailitem);
                            }
                        }
                    }
                });
            });



            if (TieUp.TempLoadedPaymentDetails.length > 0) {
                var IsUpdated = 0;
                var schemeID = 0;
                $.each(TieUp.TempLoadedPaymentDetails, function (tmpcnt, tmpdata) {

                    $.each(PaymentDetail, function (cnt, data) {
                        if (data.BrokerageTypeId == tmpdata.BrokerageTypeId && tmpdata.PeriodType.toString().trim() == data.PeriodType.toString().trim() && tmpdata.PeriodStart.toString().trim() == data.PeriodStart.toString().trim() && tmpdata.PeriodEnd.toString().trim() == data.PeriodEnd.toString().trim()) {
                            if (Utility.enableSIP == true) {
                                if (tmpdata.BaseUpfront.toString().trim() == data.BaseUpfront.toString().trim() && tmpdata.AdditionalIncentives.toString().trim() == data.AdditionalIncentives.toString().trim() &&
                                    tmpdata.LumpSumLessTieup.toString().trim() == data.LumpSumLessTieup.toString().trim() && tmpdata.Total.toString().trim() == data.Total.toString().trim() &&
                                    tmpdata.LumpSumGreaterTieup.toString().trim() == data.LumpSumGreaterTieup.toString().trim() && tmpdata.LumpSumGreater.toString().trim() == data.LumpSumGreater.toString().trim() && tmpdata.LumpSumGreaterTotal.toString().trim() == data.LumpSumGreaterTotal.toString().trim() &&
                                    tmpdata.SIPSlabLess.toString().trim() == data.SIPSlabLess.toString().trim() && tmpdata.SIPSlabGreater.toString().trim() == data.SIPSlabGreater.toString().trim() && tmpdata.PeriodType.toString().trim() == data.PeriodType.toString().trim()) {

                                }
                                else {
                                    IsUpdated = 1;
                                    schemeID = data.SchemeId;
                                    return false;
                                }
                            }
                            else {
                                if (tmpdata.BaseUpfront.toString().trim() == data.BaseUpfront.toString().trim() && tmpdata.AdditionalIncentives.toString().trim() == data.AdditionalIncentives.toString().trim() &&
                                   tmpdata.LumpSumLessTieup.toString().trim() == data.LumpSumLessTieup.toString().trim() && tmpdata.Total.toString().trim() == data.Total.toString().trim() &&
                                   tmpdata.LumpSumGreaterTieup.toString().trim() == data.LumpSumGreaterTieup.toString().trim() && tmpdata.LumpSumGreater.toString().trim() == data.LumpSumGreater.toString().trim() && tmpdata.LumpSumGreaterTotal.toString().trim() == data.LumpSumGreaterTotal.toString().trim() &&
                                   tmpdata.PeriodType.toString().trim() == data.PeriodType.toString().trim()) {

                                }
                                else {
                                    IsUpdated = 1;
                                    schemeID = data.SchemeId;
                                    return false;
                                }
                            }
                        }

                    });


                });
                if (IsUpdated == 0) {
                    var tmploadedschemelist = 0;
                    var tmpcurrentschemelist = 0;
                    tmploadedschemelist = TieUp.TempLoadedPaymentDetails.length;
                    tmpcurrentschemelist = PaymentDetail.length;
                    //$.each(TieUp.TempLoadedPaymentDetails, function (tmpcnt, tmpdata) {
                    //    if (listvalue.schemeid == tmpdata.SchemeId) {
                    //        ++tmploadedschemelist;
                    //    }
                    //});
                    //$.each(PaymentDetail, function (cnt, data) {
                    //    if (data.SchemeId == listvalue.schemeid) {
                    //        ++tmpcurrentschemelist;
                    //    }
                    //});
                    if (tmploadedschemelist != tmpcurrentschemelist) {
                        IsUpdated = 1;
                        //schemeID = listvalue.schemeid;
                    }
                }
                $.each(PaymentLi, function (cnt, data) {
                    PaymentLi[cnt].IsUpdated = IsUpdated;
                });
            }

            $(window).scrollTop(0);
            if (sessionStorage.MemoStatus == "Rejected") {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/SaveRejectedMemo', JSON.stringify({ Memo: PaymentMemo, list: PaymentLi, details: PaymentDetail, updateStatus: updateStatus }), "json", false, false, function (result) {
                    Utility.writeNotification("success", message, "", true);
                    if (sessionStorage.CurrentMenuselected == "nav_information") {
                        window.location.href = "CreateTieUp.html";
                    }
                    else {
                        TieUp.CloseScreen();
                    }
                });
            }
            else if (sessionStorage.MemoStatus == "Reviewed" && sessionStorage.CurrentMenuselected == "nav_information") {
                window.location.href = "MasterQueue.html";
            }
            else {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/SaveBaseRackRateInformation', JSON.stringify({ Memo: PaymentMemo, list: PaymentLi, details: PaymentDetail }), "json", false, false, function (result) {
                    Utility.writeNotification("success", message, "", true);
                    if (message != "Memo Saved Successfully") {
                        if (sessionStorage.CurrentMenuselected == "nav_information") {
                            window.location.href = "CreateTieUp.html";
                        }
                        else {
                            TieUp.CloseScreen();
                        }
                    }
                    else {
                        if (sessionStorage.CurrentMenuselected == "nav_information") {
                            window.location.href = "CreateTieUp.html";
                        }
                        else {
                            TieUp.BindDetails($("#hidden_payment_memo_id").val());
                        }
                    }
                });
            }
        }

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
        }
        if (error == "") {
            if ($('#txt_lumpsum_less_tieup').val() != '-') {
                $('#txt_lumpsum_less_total').val(parseInt($('#txt_lumpsum_less_base').val() == "" ? 0 : $('#txt_lumpsum_less_base').val()) + parseInt($('#txt_lumpsum_less_additional').val() == "" ? 0 : $('#txt_lumpsum_less_additional').val()) + parseInt($('#txt_lumpsum_less_tieup').val() == "" ? 0 : $('#txt_lumpsum_less_tieup').val()));

                //if (elem.id == "txt_lumpsum_less_base") {
                if (Utility.enableSIP == true) {
                    $('#txt_sip_less').val(parseInt($('#txt_lumpsum_less_base').val() == "" ? 0 : $('#txt_lumpsum_less_base').val()) + parseInt($('#txt_lumpsum_less_tieup').val() == "" ? 0 : $('#txt_lumpsum_less_tieup').val()));

                    //}
                    $('#txt_sip_greater').val($('#txt_lumpsum_less_total').val());
                }
            }

            if (elem.id == "txt_lumpsum_greater_tieup") {
                if ($('#txt_lumpsum_greater_tieup').val() != '-') {
                    $('#txt_lumpsum_greater_total').val(parseInt($('#txt_lumpsum_greater').val() == "" ? 0 : $('#txt_lumpsum_greater').val()) + parseInt($('#txt_lumpsum_greater_tieup').val() == "" ? 0 : $('#txt_lumpsum_greater_tieup').val()));
                }
            }

            if ($('#dd_slab_type').val() == "Slab Amount") {
                if (elem.id == "txt_lumpsum_less_base" || elem.id == "txt_lumpsum_less_additional" || elem.id == "txt_lumpsum_less_tieup") {

                    var base_additional = parseInt($('#txt_lumpsum_less_base').val() == "" ? 0 : $('#txt_lumpsum_less_base').val()) + parseInt($('#txt_lumpsum_less_additional').val() == "" ? 0 : $('#txt_lumpsum_less_additional').val());
                    var row = $("#trailTable tr.trail_row");

                    for (var rowIndex = 0; rowIndex < row.length; rowIndex++) {
                        var rowData = $($("#trailTable tr.trail_row")[rowIndex]);
                        var column = $(rowData).find('td');

                        var trail_period_type = column[0];
                        var trail_period_from = column[1];
                        var trail_period_to = column[2];
                        var trail_lumpsum_base = column[3];
                        var trail_lumpsum_additional = column[4];
                        var trail_lumpsum_less_tieup = column[5];
                        var trail_lumpsum_total = column[6];

                        var trail_lumpsum_greater = column[7];
                        var trail_lumpsum_greater_tieup = column[8];
                        var trail_lumpsum_greater_total = column[9];
                        var trail_sip_less = column[10];
                        var trail_sip_greater = column[11];

                        var trail_Base_additional = parseInt($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val())
                + parseInt($(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val());



                        if ($(trail_period_type).find("select[name$='trail_period_type']").val() == "Months") {
                            $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(parseInt(base_additional) + parseInt(trail_Base_additional));

                            $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val(parseInt($('#txt_lumpsum_less_tieup').val() == "" ? 0 : $('#txt_lumpsum_less_tieup').val())
                              + parseInt($(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() == "" ? 0 : $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val()));
                        }
                        else {
                            if ($(trail_period_from).find("input[name$='trail_period_from']").val() == "1") {
                                $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(parseInt(base_additional) + parseInt(trail_Base_additional));

                                $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val(parseInt($('#txt_lumpsum_less_tieup').val() == "" ? 0 : $('#txt_lumpsum_less_tieup').val())
                             + parseInt($(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() == "" ? 0 : $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val()));
                            }
                        }

                        $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val(parseInt($(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val() == "" ? 0 : $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val())
                            + parseInt($(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val() == "" ? 0 : $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val()));

                    }
                }
            }
            return true;
        }
        else {
            alert(error);
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
        }
        if (error == "") {
            var parentRow = $(elem).closest('.trail_row');
            var column = $(parentRow).find('td');
            $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val()
            var trail_period_type = column[0];
            var trail_period_from = column[1];
            var trail_period_to = column[2];
            var trail_lumpsum_base = column[3];
            var trail_lumpsum_additional = column[4];
            var trail_lumpsum_less_tieup = column[5];
            var trail_lumpsum_total = column[6];

            var trail_lumpsum_greater = column[7];
            var trail_lumpsum_greater_tieup = column[8];
            var trail_lumpsum_greater_total = column[9];
            var trail_sip_less = column[10];
            var trail_sip_greater = column[11];
            if ($(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() != "-" && $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val() != '-') {
                var base_additional = parseInt($('#txt_lumpsum_less_base').val() == "" ? 0 : $('#txt_lumpsum_less_base').val()) + parseInt($('#txt_lumpsum_less_additional').val() == "" ? 0 : $('#txt_lumpsum_less_additional').val());

                var LumpsumTieUpLess = parseInt($(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() == "" ? 0 : $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val());

                var trail_Base_additional = parseInt($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val())
                 + parseInt($(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val());

                $(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val(parseInt($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val())
                    + parseInt($(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val())
                     + parseInt($(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() == "" ? 0 : $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val()));

                //if (elem.name == "trail_lumpsum_base") {

                //}



                if (elem.name == "trail_lumpsum_greater_tieup") {

                    if ($(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val() != '-')
                        $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val(parseInt($(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val() == "" ? 0 : parseInt($(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val())) + parseInt($(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val() == "" ? 0 : $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val()));
                }

                //if (elem.name == "trail_lumpsum_less_tieup") {
                if ($(trail_period_type).find("select[name$='trail_period_type']").val() == "Months") {
                    if ($('#dd_slab_type').val() == "Slab Amount") {
                        $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(parseInt($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val()) + parseInt($(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val()) + parseInt($('#txt_lumpsum_less_base').val() == "" ? 0 : $('#txt_lumpsum_less_base').val()) + parseInt($('#txt_lumpsum_less_additional').val() == "" ? 0 : $('#txt_lumpsum_less_additional').val()));

                        if ($(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() != '-') {
                            if (elem.name == "trail_lumpsum_less_tieup") {
                                $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val(parseInt($('#txt_lumpsum_less_tieup').val() == "" ? 0 : $('#txt_lumpsum_less_tieup').val()) + parseInt($(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() == "" ? 0 : $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val()));
                            }
                            $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val(parseInt($(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val() == "" ? 0 : $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val()) + parseInt($(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val() == "" ? 0 : $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val()));
                        }

                        $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(parseInt(base_additional) + parseInt(trail_Base_additional));

                    }
                    if (Utility.enableSIP == true) {
                        if ($(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() != "-") {
                            $(trail_sip_greater).find("input[name$='trail_sip_greater']").val($(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val());
                        }
                        $(trail_sip_less).find("input[name$='trail_sip_less']").val($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : parseInt($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val()) + LumpsumTieUpLess);
                    }
                }
                else {
                    if ($(trail_period_from).find("input[name$='trail_period_from']").val() == "1") {
                        if ($('#dd_slab_type').val() == "Slab Amount") {
                            $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(parseInt($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val()) + parseInt($(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val()) + parseInt($('#txt_lumpsum_less_base').val() == "" ? 0 : $('#txt_lumpsum_less_base').val()) + parseInt($('#txt_lumpsum_less_additional').val() == "" ? 0 : $('#txt_lumpsum_less_additional').val()));

                            if ($(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() != '-') {
                                if (elem.name == "trail_lumpsum_less_tieup") {
                                    $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val(parseInt($('#txt_lumpsum_less_tieup').val() == "" ? 0 : $('#txt_lumpsum_less_tieup').val()) + parseInt($(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() == "" ? 0 : $(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val()));
                                }
                                $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val(parseInt($(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val() == "" ? 0 : $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val()) + parseInt($(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val() == "" ? 0 : $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val()));
                            }

                            $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(parseInt(base_additional) + parseInt(trail_Base_additional));

                        }
                        if (Utility.enableSIP == true) {
                            if ($(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() != "-") {
                                $(trail_sip_greater).find("input[name$='trail_sip_greater']").val($(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val());
                            }
                            $(trail_sip_less).find("input[name$='trail_sip_less']").val($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : parseInt($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val()) + LumpsumTieUpLess);
                        }
                    }
                    else {
                        if ($('#dd_slab_type').val() == "Slab Amount") {
                            $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val(parseInt($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val() == "" ? 0 : $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val()) + parseInt($(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val() == "" ? 0 : $(trail_lumpsum_additional).find("input[name$='trail_lumpsum_additional']").val()));

                            if ($(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val() != '-') {
                                if (elem.name == "trail_lumpsum_less_tieup") {
                                    $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val($(trail_lumpsum_less_tieup).find("input[name$='trail_lumpsum_less_tieup']").val())
                                }
                                $(trail_lumpsum_greater_total).find("input[name$='trail_lumpsum_greater_total']").val(parseInt($(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val() == "" ? 0 : $(trail_lumpsum_greater_tieup).find("input[name$='trail_lumpsum_greater_tieup']").val()) + parseInt($(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val() == "" ? 0 : $(trail_lumpsum_greater).find("input[name$='trail_lumpsum_greater']").val()));
                            }


                        }
                    }
                }
                //}
            } return true;
        }
        else {
            alert(error);
            $(elem).val("");
            return false;
        }
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
            TieUp.TempAdditionalNotes = result.GetAdditionalNotesResult;
            $('#txt_additional_notes').text(TieUp.TempAdditionalNotes);
        });
    },

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

    $('#dd_Scheme_search').multiselect('clearSelection');
    var SchemeSelected = sessionStorage.getItem('SchemeSelected') != null ? sessionStorage.getItem('SchemeSelected').split(",") : '';
    var SchemecategorySelected = sessionStorage.getItem('SchemeCategoryselected') != null ? sessionStorage.getItem('SchemeCategoryselected').split(",") : '';
    TieUp.LoadMailingList();

    if (SchemeSelected != null) {
        for (i = 0; i < SchemeSelected.length; i++) {
            $('#dd_Scheme_search').multiselect('select', SchemeSelected[i]);
        }
    }
    TieUp.LoadDropDowns();
    TieUp.GetLumpsumSIPType();
    TieUp.additionalNotes(2);
    if (sessionStorage.CurrentMenuselected == "nav_information") {
        $("#dd_LumpsumSIPType").val("3");
    }
    $("#hidden_payment_memo_id").val("0");
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
        colNames: ['Select', '<input type="checkbox" id="checkAll" >Select</input>', 'Memo Number', 'Memo Number', 'PaymentMemoId', 'Memo Type', 'Memo Type ID', 'Transaction Type ', 'Category', 'ARN No', 'ARN Name', 'Scheme', 'SchemeCategory', 'From Date', 'To Date', 'Status', 'Status', 'Raised By', 'Raised On', 'Time', 'Ageing', 'Last Action By', 'Pending With', 'isParentId'],
        //colNames: ['Select', '<input type="checkbox" id="checkAll" >Select</input>', 'Memo Number', 'Memo Number', 'PaymentMemoId', 'Memo Type', 'Memo Type ID', 'Category', 'ARN No', 'ARN Name', 'From Date', 'To Date', 'Status', 'Status', 'Raised By', 'Raised On', 'Time', 'Ageing', 'Last Action By', 'Pending With'],
        colModel: [
                { name: 'selectradio', formatter: TieUp.ReturnRadioBox, width: '60px;',search: false },
                {
                    name: 'selectcheck', width: '80px;', align: 'center', editable: true, sortable: false, search: false, hidden: true, formatter: 'checkbox', editoptions: { value: "True:False" }, edittype: "checkbox", formatoptions: { disabled: false },
                    cellattr: function (rowId, val, rawObject) {
                        return " class='cbEmpActive'";
                    }
                },
                //{ name: 'selectcheck', width: '60px;', align: 'center', hidden: true, formatter: 'checkbox', editoptions: { value: "True:False" }, edittype: "checkbox", formatoptions: { disabled: false } },
                { name: 'MemoId', index: 'MemoId', align: 'right', hidden: true, formatter: TieUp.ReturnSearchHyperLink, sorttype: 'integer', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
                { name: 'MemoNumber', index: 'MemoNumber', align: 'left', formatter: TieUp.ReturnMemonumberSearchHyperLink, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'PaymentMemoId', index: 'PaymentMemoId', align: 'right', hidden: true },
                { name: 'MemoTypeName', index: 'MemoTypeName', width: 120, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'MemoTypeID', index: 'MemoTypeID', hidden: true },
                { name: 'LumpsumSIPType', width: 240, index: 'LumpsumSIPType', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'DistributorCategoryName', width: 200, index: 'DistributorCategoryName', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'ARNNo', width: 90, index: 'ARNNo', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'ARNName', width: 260, index: 'ARNName', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'Scheme', width: 160, index: 'Scheme', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'SchemeCategory', width: 170, index: 'SchemeCategory', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
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
                    { name: 'isParentId', index: 'isParentId', align: 'left', sortable: false, hidden: true, sorttype: 'integer', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },

        ],
        gridview: true,
        rowattr: function (rd) {
            if (rd.isParentId == 1 && $.inArray(rd.MemoStatusDisplay, StatusCheck) > -1)
                return { "class": "isParentId" };
            else if (rd.isParentId == 1 && sessionStorage.RoleID == 10 && $.inArray(rd.MemoStatusDisplay, StatusCheck) > -1)
                return { "class": "isParentId" };
            else if (rd.isParentId == 1 && sessionStorage.RoleID == 7 && $.inArray(rd.MemoStatusDisplay, StatusCheck) > -1)
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
                        if ($tr.find('td:eq(3)').text() == "1") {
                            sessionStorage.CopyMemoNumber = $tr.find('td:eq(1)').text();
                            btn_copy.attr('disabled', false);
                            btn_modify.attr('disabled', true);
                        }
                        if ($tr.find('td:eq(3)').text() == "2") {
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
            Utility.CustomFilter($('#grid_search_result'), 'MemoId', ["MemoId", "MemoNumber"], TieUp.SearchTieUp);
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

    var memono = Utility.GetParameterValues('memono');
    var fromAlert = Utility.GetParameterValues('ptype');
    if (memono != "" && memono != undefined) {
        if (fromAlert != "" && fromAlert != undefined) {
            if (fromAlert == 'alert') {
                TieUp.ViewTieUpInformation();
                TieUp.masterqueueedit();
            }
        }
        //TieUp.GetSchemeCategory("");
        //TieUp.BindDetails(memono);
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
                $.each(TieUp.arns, function (key, value) {
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

        var schemeSelected = sessionStorage.getItem('SchemeSelected') != null || "" ? sessionStorage.getItem('SchemeSelected') : '';
        var DateFrom = sessionStorage.getItem('DateFrom');
        var Dateto = sessionStorage.getItem('DateTo');
        if (sessionStorage.CurrentMenuselected == "nav_information") {
            if (sessionStorage.getItem('ARN') != "" || sessionStorage.getItem('DistributorCategory') != "") {
                var memoval = $('#hidden_payment_memo_id').val() == "" ? 0 : $('#hidden_payment_memo_id').val();
                var transactiontype = "";
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/MemoExists', JSON.stringify({ ArnNo: sessionStorage.getItem('ARN'), Channel: "", DistributorCategory: sessionStorage.getItem('DistributorCategory'), schemeid: schemeSelected, DateFrom: DateFrom, DateTo: Dateto, MemoId: memoval, TransactionType: transactiontype, MemoType: "2" }), "json", false, false, function (result) {
                    if (result.MemoExistsResult != "")
                        Utility.writeNotification("warning", result.MemoExistsResult, "", true);
                });

                Utility.ServiceCall("POST", 'BaseRackRateService.svc/MemoExists', JSON.stringify({ ArnNo: sessionStorage.getItem('ARN'), Channel: "", DistributorCategory: sessionStorage.getItem('DistributorCategory'), schemeid: schemeSelected, DateFrom: DateFrom, DateTo: Dateto, MemoId: memoval, TransactionType: transactiontype, MemoType: "2,5" }), "json", false, false, function (result) {
                    if (result.MemoExistsResult != "")
                        Utility.writeNotification("warning", result.MemoExistsResult, "", true);
                });


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

            if (categorySelected.length > 0 || ARNNo != "") {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSlab', JSON.stringify({ DistributorCategoryID: categorySelected.toString(), Arnno: ARNNo }), "json", false, false, function (result) {
                    var slabamount = result.GetSlabResult;

                    if (slabamount == "No Slab" || slabamount == "") {
                        $('#dd_slab_type').val("All Amounts");
                        $('#txt_slab_amount').val("");
                        $('#dd_slab_amount_type').val("");
                        $('#txt_slab_amount').attr("disabled", "disabled");
                        $('#dd_slab_amount_type').attr("disabled", "disabled");
                    }
                    else if (slabamount.split(' ').length > 1) {
                        $('#dd_slab_amount_type').val(slabamount.split(' ')[1]);
                        $('#txt_slab_amount').val(slabamount.split(' ')[0]);
                    }
                    TieUp.SlabTypeOnchange(0);
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
            $('#txt_additional_notes').text(TieUp.additionalNotes);
            //});
        }

        TieUp.GetSchemeCategory("");

        var SchemeCategory = sessionStorage.getItem('SchemeCategoryselected') != null || "" ? sessionStorage.getItem('SchemeCategoryselected').split(",") : '';

        for (i = 0; i < SchemeCategory.length; i++) {
            $('#dd_scheme_category').multiselect('select', SchemeCategory[i]);
        }

        var scheme = sessionStorage.getItem('SchemeSelected') != null || "" ? sessionStorage.getItem('SchemeSelected').split(",") : '';
        $('#dt_from').val(sessionStorage.getItem('DateFrom'));
        $('#dt_to').val(sessionStorage.getItem('DateTo'))
        //$('#dd_scheme_category').val(SchemeCategory);
        TieUp.GetScheme("1,2,3,4,5,6,7,8,9,10");

        $('#dd_scheme').multiselect('clearSelection');

        for (i = 0; i < scheme.length; i++) {
            $('#dd_scheme').multiselect('select', scheme[i]);
        }

        //if (scheme.toString() != "" || SchemeCategory.toString() != "") {
        //    Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeWithSchemeCategory', JSON.stringify({ Scheme: scheme.toString(), SchemeCategory: SchemeCategory.toString() }), "json", false, false, function (result) {
        //        var data = result.GetSchemeWithSchemeCategoryResult;
        //        var schemes = [];
        var schemes = [];
        //for (i = 0; i < scheme.length; i++) {
        schemes.push(scheme[0]);
        //}
        TieUp.BindSchemeDetails(schemes, ARNNo, categorySelected.toString());
        //    });
        //}
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
            //$("#dt_to").datepicker("option", "minDate", tomindate);
            //$("#dt_to").focus();
        }
    });
    $("#dt_to").datepicker({
        dateFormat: 'dd/mm/y',
        changeMonth: true,
        changeYear: true,
        maxDate: maxdate,
    });

    $("#dt_to").datepicker("option", "minDate", $("#dt_to").val());

    ///////Add Rack Rate Editable Grid ////////////////

    $("#grid_add_rack_rate").jqGrid({
        //data: mydata,
        height: 120,
        width: null,
        shrinkToFit: false,
        datatype: "local",
        scrollrows: true,
        colNames: ['Period', 'From', 'To', 'Base', 'Additional', 'Total', ' ', '≤ <span style="color:white; height:20px; font-size:1em; width:75px; font-weight:normal;font-family: Arial;" id="txt_trail_sip_less" >5000</span>', '> <span style="color:white; height:20px; font-size:1em;  width:75px; font-weight:normal;font-family: Arial;" type="text" id="txt_trail_sip_greater" >5000</span>', 'Actions', 'PaymentDetailsId', 'Total', 'SlabLess', 'SlabGreater'],
        colModel: [
                    {
                        name: 'Period', index: 'Period', width: 100, stype: 'text', sortable: true, editable: true, edittype: "select", formatter: 'select', editoptions: {
                            value: "Months:Months;Year:Year", dataEvents: [{
                                type: 'change', fn: function (e) {

                                    var row = $(e.target).closest('tr.jqgrow');
                                    var rowId = row.attr('id');
                                    if ($(e.target).val() == 'Year') {
                                        $("#grid_add_rack_rate").jqGrid('saveRow', rowId);

                                        $('#grid_add_rack_rate').editRow(rowId, true, function () {
                                            var input = $('#' + rowId + '_PeriodEnd');
                                            input.val(null);

                                            input = $('#' + rowId + '_Additional');
                                            input.val(null);
                                        });
                                        $("#grid_add_rack_rate").jqGrid('saveRow', rowId);
                                        //$("#grid_add_rack_rate").trigger("reloadGrid");
                                        var IncentiveType = $('#dd_addl_incentive_type option:selected').val();
                                        if (IncentiveType == "2")
                                            $("#grid_add_rack_rate").jqGrid("setColProp", "Additional", { editable: true });
                                        else
                                            $("#grid_add_rack_rate").jqGrid("setColProp", "Additional", { editable: false });
                                        $("#grid_add_rack_rate").jqGrid("setColProp", "PeriodEnd", { editable: false });
                                        //isNonEditable = true;
                                        //$("#grid_add_rack_rate").jqGrid('saveRow', rowId);
                                        $("#grid_add_rack_rate").trigger("reloadGrid");
                                        $("#grid_add_rack_rate").jqGrid('editRow', rowId, true);



                                        $("#grid_add_rack_rate").jqGrid('setSelection', rowId);
                                        //$("#grid_add_rack_rate").jqGrid('restoreCell', rowId, 3, true);
                                        $("#" + rowId + "_PeriodStart").focus();
                                    }
                                    else {
                                        $("#grid_add_rack_rate").jqGrid("setColProp", "Additional", { editable: true });
                                        $("#grid_add_rack_rate").jqGrid("setColProp", "PeriodEnd", { editable: true });
                                        isNonEditable = false;
                                        $("#grid_add_rack_rate").jqGrid('saveRow', rowId);
                                        $("#grid_add_rack_rate").trigger("reloadGrid");
                                        $("#grid_add_rack_rate").jqGrid('editRow', rowId, true);
                                        $("#grid_add_rack_rate").jqGrid('setSelection', rowId);
                                        //$("#grid_add_rack_rate").jqGrid('editCell', rowId, 3, true);
                                        $("#" + rowId + "_PeriodStart").focus();
                                    }
                                }
                            }]
                        }
                    },
                    {
                        name: 'PeriodStart', index: 'PeriodStart', width: 70, editable: true, editoptions: {
                            maxlength: 2,
                            dataEvents: [
                                {
                                    type: 'keyup',
                                    fn: function (e) {
                                        var row = $(e.target).closest('tr.jqgrow');
                                        if (row[0].cells[0].title == "Year") {
                                            if (e.keyCode == 49 || e.keyCode == 97) {
                                                var rowId = row.attr('id');
                                                $("#grid_add_rack_rate").jqGrid("setColProp", "Additional", { editable: true });
                                                $("#grid_add_rack_rate").jqGrid("setColProp", "PeriodEnd", { editable: false });
                                                $("#grid_add_rack_rate").jqGrid('saveRow', rowId);
                                                $("#grid_add_rack_rate").trigger("reloadGrid");
                                                $("#grid_add_rack_rate").jqGrid('editRow', rowId, true);
                                                $("#grid_add_rack_rate").jqGrid('setSelection', rowId);
                                                $("#" + rowId + "_PeriodStart").focus();
                                            }
                                            else {

                                            }
                                        }
                                    }
                                }
                            ], dataInit: function (element) { Utility.GridAllowNumber(element); }
                        }
                    },
                    { name: 'PeriodEnd', index: 'PeriodEnd', width: 70, editable: true, editoptions: { maxlength: 2, dataInit: function (element) { Utility.GridAllowNumber(element); } } },
                    { name: 'Base', index: 'Base', width: 100, editable: true, editoptions: { maxlength: 3, dataInit: function (element) { Utility.GridAllowNumber(element); } } },
                    { name: 'Additional', index: 'Additional', width: 100, editable: true, editoptions: { maxlength: 3, dataInit: function (element) { Utility.GridAllowNumber(element); } } },
                     { name: 'Total', index: 'Total', width: 100, editable: true, editoptions: { maxlength: 3, dataInit: function (element) { Utility.GridAllowNumber(element); } } },
                      { name: 'GreaterSlab', index: 'GreaterSlab', width: 100, editable: true, editoptions: { maxlength: 3, dataInit: function (element) { Utility.GridAllowNumber(element); } } },
                       { name: 'SipLessSlab', index: 'SipLessSlab', width: 120, editable: true, editoptions: { maxlength: 3, dataInit: function (element) { Utility.GridAllowNumber(element); } } },
                        { name: 'SipGreaterSlab', index: 'SipGreaterSlab', width: 120, editable: true, editoptions: { maxlength: 3, dataInit: function (element) { Utility.GridAllowNumber(element); } } },
                    { name: 'act', index: 'act', width: 60, sortable: false },
                    { name: 'PaymentDetailsId', index: 'PaymentDetailsId', hidden: true, Value: 0 },
                    { name: 'Total', index: 'Total', hidden: true, Value: 0 },
                    { name: 'SlabLess', index: 'SlabLess', hidden: true, Value: 0 },
                    { name: 'SlabGreater', index: 'SlabGreater', hidden: true, Value: 0 },
        ],
        gridComplete: function () {
            var ids = jQuery("#grid_add_rack_rate").jqGrid('getDataIDs');
            if (ids.length > 0) {
                var i = ids.length - 1;
                var cl = ids[i];
                //be = "<a  href='javascript:void(0)' onclick=\"RackRate.EditAddRackRateGrid('" + cl + "');\" ><i class='fa fa-pencil blue '></i> </a>";
                //se = "<a  href='javascript:void(0)' onclick=\"RackRate.SaveAddRackRateGrid('" + cl + "');\"><i class='fa fa-save green '></i> </a>";
                ce = "<a  href='javascript:void(0)' onclick=\"TieUp.RestoreAddRackRateGrid('" + cl + "');\"><i class='fa fa-refresh blue'></i> </a>";
                de = "<a  href='javascript:void(0)' onclick=\"jQuery('#grid_add_rack_rate').delRowData('" + cl + "');\"><i class='fa fa-times red'></i> </a>";
                jQuery("#grid_add_rack_rate").jqGrid('setRowData', ids[i], { act: ce + de });
                $("#" + $('#grid_add_rack_rate').jqGrid('getGridParam', 'selrow')).focus();
            }
        },
        'cellsubmit': 'clientArray',
        cmTemplate: { title: false },
        editurl: 'clientArray'
    });

    jQuery("#grid_add_rack_rate").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
            { startColumnName: 'Period', numberOfColumns: 1 },
          { startColumnName: 'PeriodStart', numberOfColumns: 2, titleText: 'Duration' },
           { startColumnName: 'Base', numberOfColumns: 4, titleText: 'Lump Sum' },
            { startColumnName: 'SipLessSlab', numberOfColumns: 2, titleText: 'SIP/STP' },
               { startColumnName: 'act', numberOfColumns: 1 },
        ]
    });

    jQuery("#grid_add_rack_rate").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        useRowSpanStyle: false,
        groupHeaders: [
           { startColumnName: 'Base', numberOfColumns: 3, titleText: '≤ Slab' },
           { startColumnName: 'GreaterSlab', numberOfColumns: 1, titleText: '> Slab' },
            //{ startColumnName: 'SipLessSlab', numberOfColumns: 1, titleText: '> Slab' },
            // { startColumnName: 'SipGreaterSlab', numberOfColumns: 1, titleText: '> Slab' },
        ]
    });

    /////Click to add new rack rate detail//////
    $("#btn_add_new_rack").click(function () {
        var ids = jQuery("#grid_add_rack_rate").jqGrid('getDataIDs');
        for (var i = 0; i < ids.length; i++) {
            var cl = ids[i];
            jQuery('#grid_add_rack_rate').saveRow(cl);
        }
        //$("#grid_add_rack_rate").jqGrid("setColProp", "Additional", { editable: true });
        $("#grid_add_rack_rate").jqGrid("setColProp", "PeriodEnd", { editable: true });

        var cnt = Math.max.apply(Math, ids) + 1;
        var parameters =
                {
                    rowID: cnt,
                    PaymentDetailsId: 0,
                    position: "last",
                    useDefValues: false,
                    useFormatter: false,
                    addRowParams: { extraparam: {} }
                };
        $("#grid_add_rack_rate").jqGrid('addRow', parameters);
        $("#" + cnt + "_Period").focus();

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
        colNames: ['AuditId', 'Payment List ID', 'Payment Memo Id', 'Action', 'Action Taken By', 'Date', 'Time', 'Scheme', 'Role', 'Brokerage detail'],
        colModel: [
                    { name: 'AuditId', index: 'AuditId', width: 800, hidden: true },
                    { name: 'PaymentListId', index: 'PaymentListId', width: 150, hidden: true },
                    { name: 'PaymentMemoId', index: 'PaymentMemoId', width: 150, hidden: true },
                    { name: 'Action', index: 'Action', width: 150, sortable: true, },
                    { name: 'ActionTakenBy', index: 'ActionTakenBy', width: 150 },
                    { name: 'Date', index: 'Date', align: 'center', width: 80 },
                    { name: 'Time', index: 'Time', align: 'center', width: 80 },
                    { name: 'Scheme', index: 'Scheme', width: 170 },
                    { name: 'Role', index: 'Role', width: 80, hidden: true },
                    { name: 'PaymentListId', index: 'PaymentListId', align: 'left', formatter: TieUp.ReturnBrokerageDetailHyperLink },
        ],
    });

    $("#btn_mdl6_remarks").click(function () {
        var ErrorMsg = '';

        if (TieUp.TempRackRateStatus == "Discarded")
            ErrorMsg = 'Discard';
        else if (TieUp.TempRackRateStatus == "Rejected")
            ErrorMsg = 'Reject';

        var Remarks = $("#txt_remarks").val();
        if (ErrorMsg != "") {
            if (Remarks != "" && TieUp.TempRackRateStatus != "" && TieUp.TempRackRateStatus != undefined) {
                TieUp.SaveTieUpInfo(TieUp.TempRackRateStatus, "Memo " + TieUp.TempRackRateStatus + " Successfully", 0);
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


    $("#btn_send_email").click(function () {
        if (TieUp.EmailValid()) {
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
                CCnames.push(obj.name);//build an array of just the names
            });
            CCusers = CCnames.toString();

            var pagename = Utility.GetParameterValues('ptype');
            if (TieUp.TempMemoNumber != '' && (pagename == "mq" || pagename == "ss")) {
                var fileurl = Utility.TieUpCamsReportUrl.replace("###MemoNumber###", TieUp.TempMemoNumber);
                var filename = TieUp.TempMemoNumber;
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/SendEmailMemo', JSON.stringify({ fileurl: fileurl, filename: filename, sendto: Tousers, sendcc: CCusers, typeval: 1, ModuleID: 2, MailStatus: "Distributor Mail BRR", sendbcc: BCCusers }), "json", false, false, function (result) {
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
                                    var fileurl = Utility.TieUpCamsReportUrl.replace("###MemoNumber###", TieUp.remove_tags(gridData[i].MemoNumber));
                                    fileurl = fileurl.replace("###Distributorid###", gridData[i].ARNNo);

                                    var filename = TieUp.remove_tags(gridData[i].MemoNumber);
                                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/SendEmailMemo', JSON.stringify({ fileurl: fileurl, filename: filename, sendto: Tousers, sendcc: CCusers, typeval: 1, ModuleID: 2, MailStatus: "Distributor Mail BRR", sendbcc: BCCusers }), "json", false, false, function (result) {
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
                }
            }
        }
    });
});

