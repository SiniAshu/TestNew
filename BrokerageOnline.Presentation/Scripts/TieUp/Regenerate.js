var Regenerate = {
    arnName: [],
    TableCount: 0,
    DetailCount: 0,
    arns: [],
    TempmonthList: [],
    TempPaymentDetails: [],
    TempPaymentList: [],
    TempyearList: [],
    IsCloseEnded: 0,

    ViewRegenerate: function () {
        var selectedmemos = "";
        if ($("#div_landing_grid").is(":visible")) {
            var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
           
            if (gridData.length > 0) {
                for (var i = 0; i < gridData.length; i++) {
                    if (gridData[i].selectcheck == 'True') {
                        if (gridData[i].MemoStatusDisplay == "Active") {
                            if (selectedmemos != "")
                                selectedmemos = selectedmemos + ',';
                            selectedmemos = selectedmemos + gridData[i].PaymentMemoId;
                        }
                    }
                }
               

            }
        }
        else {
            selectedmemos = $("#hidden_payment_memo_id").val();
        }

        if (selectedmemos != "") {
            $("#hidden_payment_memo_id").val(selectedmemos.split(',')[0]);
            //$("#txt_arn").siblings("ul").remove();
            //$("#txt_arn_name").siblings("ul").remove();

            $("#txt_arn_process").siblings("ul").remove();
            $("#txt_arn_name_process").siblings("ul").remove();

            $("#div_btn").empty();
            $("#hdr_name").text("Regenerate");
            $("#div_content").hide();
            $("#div_add_tie_up").hide();
            $("#div_landing_grid").hide();
            $("#div_freeze").hide();
            $("#div_manage").hide();
            $("#div_regenerate").show();
            Regenerate.GetDistributorCategory_process("");
            Regenerate.GetARNNameProcess("");
            Regenerate.GetARN_process("");
            Regenerate.BindDetails($("#hidden_payment_memo_id").val());

            $('#txt_arn_process').tokenInput('toggleDisabled', true);
            $('#txt_arn_name_process').tokenInput('toggleDisabled', true);
            $('#dt_from_process').attr('disabled', 'disabled');
            $('#dt_to_process').attr('disabled', 'disabled');
            $('#dd_dist_category_process').multiselect('disable');
        }
        else {
            Utility.writeNotification("warning", "Select atleast one Active memo to Regenerate", "", true);
        }



    },

    BindDetails: function (PaymemtMemoID) {
        if (PaymemtMemoID != "") {
            // $('#btn_save_info').attr('disabled', 'disabled')

            $('#div_regenerate_rack_rate_detail').empty();
            Regenerate.TempmonthList = [];
            Regenerate.TempyearList = [];
            Regenerate.TempPaymentList = [];
            Regenerate.TempPaymentDetails = [];
            var ARNNoArr = [];
            var DistributorCategoryArr = [];
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentMemo', '{"PaymentMemoID": ' + PaymemtMemoID + '}', "json", false, false, function (result) {
                var PaymentMemo = result.GetPaymentMemoResult[0];

                $("#hidden_payment_memo_id").val(PaymentMemo.PaymentMemoId);
                TransactionType = PaymentMemo.TransactionType.split(",");
                $('.myCheckbox').attr('checked', 'checked');
                $('#chk_purchase').removeAttr('checked');
                $('#chk_switch_ins').removeAttr('checked');
                $('#chk_sip').removeAttr('checked');
                $('#chk_others').removeAttr('checked');

                $("#dt_from_process").val(PaymentMemo.DateFrom);
                $("#dt_to_process").val(PaymentMemo.DateTo);

                //$("#dt_to").datepicker("option", "minDate", PaymentMemo.DateFrom);
                //$("#dt_from").datepicker("option", "maxDate", PaymentMemo.DateTo);

                if (PaymentMemo.MemoStatus == "Saved") {
                    $("#txt_remarks").val(PaymentMemo.Remarks)
                } else {
                    $("#txt_remarks").val("");
                }
                $("#txt_additional_notes").text(PaymentMemo.Comments);
                $("#txt_others").val(PaymentMemo.TransactionTypeOthers);
             
                sessionStorage.setItem("MemoStatus", PaymentMemo.MemoStatus);
                sessionStorage.setItem("LoginUserId", PaymentMemo.LoginId);
                //if(PaymentMemo.MemoStatus == "Active")
                //    $('#btn_save_info').attr('disabled', 'disabled')

            });

            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentListWithInactive', '{"PaymentMemoID": ' + $("#hidden_payment_memo_id").val() + '}', "json", false, false, function (result) {
                var PaymentList = result.GetPaymentListWithInactiveResult;
                var paymentDetail;
                Regenerate.DetailCount = PaymentList.length;

                var objList = [];
                var monthdata = [];
                var yeardata = [];

                if (Regenerate.DetailCount > 0) {
                    $("#txt_arn_process").tokenInput('clear');
                    ARNNoArr = PaymentList[0].ARNNO.split(",");
                    $.each(Regenerate.arns, function (key, value) {
                        for (i = 0; i < ARNNoArr.length; i++) {
                            if (value.name == ARNNoArr[i]) {
                                $("#txt_arn_process").tokenInput("add", { id: value.id, name: value.name });
                            }
                        }
                    });

                    $('#dd_dist_category_process').multiselect('clearSelection');
                    DistributorCategoryArr = PaymentList[0].DistributorCategoryId.split(",");
                    for (i = 0; i < DistributorCategoryArr.length; i++) {
                        $('#dd_dist_category_process').multiselect('select', DistributorCategoryArr[i]);
                    }

                }

                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentDetails', '{"PaymentMemoID": ' + $("#hidden_payment_memo_id").val() + '}', "json", false, false, function (result) {

                    paymentDetail = result.GetPaymentDetailsResult;
                    Regenerate.TempLoadedPaymentDetails = paymentDetail;
                    for (var cnt = 0; cnt < Regenerate.DetailCount; cnt++) {
                        objList = [];
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
                            SIPSlab: PaymentList[cnt].SIPSlab,
                            IsUpdated: PaymentList[cnt].IsUpdated
                        };
                        monthdata = [];
                        yeardata = [];
                        $('#txt_sip_slab').val(PaymentList[cnt].SIPSlab);
                        $('#spn_sip_slab_less').html(PaymentList[cnt].SIPSlab);
                        $('#spn_sip_slab_greater').html(PaymentList[cnt].SIPSlab);
                        $('#spn_trail_sip_slab_less').html(PaymentList[cnt].SIPSlab);
                        $('#spn_trail_sip_slab_greater').html(PaymentList[cnt].SIPSlab);
                        var monthperiods = ""; var yearperiods = "";
                        var yearcount = 0;
                        for (detcount = 0; detcount < paymentDetail.length; detcount++) {
                            if (PaymentList[cnt].PaymentMemoId == paymentDetail[detcount].PaymentMemoId && PaymentList[cnt].SchemeId == paymentDetail[detcount].SchemeId) {
                                if (paymentDetail[detcount].BrokerageTypeId == 1) {
                                    objList.UpfrontDetailId = paymentDetail[detcount].PaymentDetailsId;
                                    objList.aadl_incentive_type = 0;
                                    objList.Base = paymentDetail[detcount].BaseUpfront;
                                    objList.Additional = paymentDetail[detcount].AdditionalIncentives;
                                    objList.Total = paymentDetail[detcount].Total;
                                    objList.LumpSumGreater = paymentDetail[detcount].LumpSumGreater;
                                    objList.SIPSlabLess = paymentDetail[detcount].SIPSlabLess;
                                    objList.SIPSlabGreater = paymentDetail[detcount].SIPSlabGreater;

                                    detailitem = {}
                                    detailitem["schemeid"] = PaymentList[cnt].SchemeId;
                                    detailitem["schemecategoryid"] = PaymentList[cnt].SchemeCategoryId;
                                    detailitem["scheme_category"] = PaymentList[cnt].SchemeCategoryName;
                                    detailitem["scheme"] = PaymentList[cnt].SchemeName;
                                    detailitem["BrokerageTypeId"] = 1;
                                    detailitem["Base"] = parseInt(paymentDetail[detcount].BaseUpfront) + parseInt(paymentDetail[detcount].LumpSumLessTieup);
                                    detailitem["Additional"] = paymentDetail[detcount].AdditionalIncentives;
                                    detailitem["Total"] = paymentDetail[detcount].Total;
                                    detailitem["LumpSumGreater"] = parseInt(paymentDetail[detcount].LumpSumGreater) + parseInt(paymentDetail[detcount].LumpSumGreaterTieup);
                                    detailitem["SIPSlabLess"] = paymentDetail[detcount].SIPSlabLess;
                                    detailitem["SIPSlabGreater"] = paymentDetail[detcount].SIPSlabGreater;
                                    detailitem["PeriodStart"] = 0;
                                    detailitem["PeriodEnd"] = 0;
                                    detailitem["PeriodType"] = 0;
                                    Regenerate.TempPaymentDetails.push(detailitem);
                                }

                                if (paymentDetail[detcount].BrokerageTypeId == 2) {
                                    objList.addl_upfront_B15_id = paymentDetail[detcount].PaymentDetailsId;
                                    objList.addl_upfront_B15 = paymentDetail[detcount].BaseUpfront;

                                    detailitem = {}
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
                                    Regenerate.TempPaymentDetails.push(detailitem);
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

                                        detailitem = {}
                                        detailitem["schemeid"] = PaymentList[cnt].SchemeId;
                                        detailitem["schemecategoryid"] = PaymentList[cnt].SchemeCategoryId;
                                        detailitem["scheme_category"] = PaymentList[cnt].SchemeCategoryName;
                                        detailitem["scheme"] = PaymentList[cnt].SchemeName;
                                        detailitem["BrokerageTypeId"] = 3;
                                        detailitem["Base"] = parseInt(paymentDetail[detcount].BaseUpfront) + parseInt(paymentDetail[detcount].LumpSumLessTieup);
                                        detailitem["Additional"] = paymentDetail[detcount].AdditionalIncentives;
                                        detailitem["Total"] = paymentDetail[detcount].Total;
                                        detailitem["LumpSumGreater"] = parseInt(paymentDetail[detcount].LumpSumGreater) + parseInt(paymentDetail[detcount].LumpSumGreaterTieup);
                                        detailitem["SIPSlabLess"] = paymentDetail[detcount].SIPSlabLess;
                                        detailitem["SIPSlabGreater"] = paymentDetail[detcount].SIPSlabGreater;
                                        detailitem["monthperiods"] = period;
                                        detailitem["PeriodStart"] = paymentDetail[detcount].PeriodStart;
                                        detailitem["PeriodEnd"] = paymentDetail[detcount].PeriodEnd;
                                        detailitem["PeriodType"] = 1;
                                        Regenerate.TempmonthList.push(detailitem);
                                        Regenerate.TempPaymentDetails.push(detailitem);
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
                                        detailitem = {}
                                        detailitem["schemeid"] = PaymentList[cnt].SchemeId;
                                        detailitem["schemecategoryid"] = PaymentList[cnt].SchemeCategoryId;
                                        detailitem["scheme_category"] = PaymentList[cnt].SchemeCategoryName;
                                        detailitem["scheme"] = PaymentList[cnt].SchemeName;
                                        detailitem["BrokerageTypeId"] = 3;
                                        detailitem["Base"] = parseInt(paymentDetail[detcount].BaseUpfront) + parseInt(paymentDetail[detcount].LumpSumLessTieup);
                                        detailitem["Additional"] = paymentDetail[detcount].AdditionalIncentives;
                                        detailitem["Total"] = paymentDetail[detcount].Total;
                                        detailitem["LumpSumGreater"] = parseInt(paymentDetail[detcount].LumpSumGreater) + parseInt(paymentDetail[detcount].LumpSumGreaterTieup);
                                        detailitem["SIPSlabLess"] = paymentDetail[detcount].SIPSlabLess;
                                        detailitem["SIPSlabGreater"] = paymentDetail[detcount].SIPSlabGreater;
                                        detailitem["monthperiods"] = period;
                                        detailitem["PeriodStart"] = paymentDetail[detcount].PeriodStart;
                                        detailitem["PeriodEnd"] = paymentDetail[detcount].PeriodEnd;
                                        detailitem["PeriodType"] = 2;
                                        Regenerate.TempyearList.push(detailitem);
                                        Regenerate.TempPaymentDetails.push(detailitem);
                                    }

                                }
                            }
                        }
                        objList.monthperiods = monthperiods;
                        objList.yearcount = yearcount;
                        objList.mothyearvalue = monthperiods + "~" + yearcount;
                        Regenerate.TempPaymentList.push(objList);

                    }
                });


            });

            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentListByARN', JSON.stringify({ ARN: ARNNoArr.toString(), DistributorCategory: DistributorCategoryArr.toString(), DateFrom: $("#dt_from_process").val(), DateTo: $("#dt_to_process").val() }), "json", false, false, function (result) {
                var PaymentList = result.GetPaymentListByARNResult;


                $(PaymentList).each(function (list, listval) {
                    $(Regenerate.TempPaymentList).each(function (listobj, listvalue) {
                        if (listval.SchemeId == listvalue.schemeid) {
                            PaymentList = jQuery.grep(PaymentList, function (n, i) {
                                return (n.SchemeId !== listvalue.schemeid);
                            });
                        }

                    });
                });

                var paymentDetail;


                Regenerate.DetailCount = parseInt(Regenerate.DetailCount) + parseInt(PaymentList.length);

                var objList = [];
                var monthdata = [];
                var yeardata = [];

                if (PaymentList.length > 0) {
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentDetails', '{"PaymentMemoID": ' + PaymentList[0].PaymentMemoId + '}', "json", false, false, function (result) {

                        paymentDetail = result.GetPaymentDetailsResult;
                        Regenerate.TempLoadedPaymentDetails = paymentDetail;
                        for (var cnt = 0; cnt < PaymentList.length; cnt++) {
                            objList = {
                                PaymentListId: 0,
                                scheme_category: PaymentList[cnt].SchemeCategoryName,
                                schemecategoryid: PaymentList[cnt].SchemeCategoryId,
                                scheme: PaymentList[cnt].SchemeName,
                                schemeid: PaymentList[cnt].SchemeId,
                                claw_back: PaymentList[cnt].Clawback,
                                slab_amount: PaymentList[cnt].SlabAmount,
                                PaymentType: PaymentList[cnt].PaymentType,
                                SlabType: PaymentList[cnt].SlabType,
                                Onwards: PaymentList[cnt].Onwards,
                                SIPSlab: PaymentList[cnt].SIPSlab,
                                IsUpdated: PaymentList[cnt].IsUpdated
                            };
                            monthdata = [];
                            yeardata = [];
                            $('#txt_sip_slab').val(PaymentList[cnt].SIPSlab);
                            $('#spn_sip_slab_less').html(PaymentList[cnt].SIPSlab);
                            $('#spn_sip_slab_greater').html(PaymentList[cnt].SIPSlab);
                            $('#spn_trail_sip_slab_less').html(PaymentList[cnt].SIPSlab);
                            $('#spn_trail_sip_slab_greater').html(PaymentList[cnt].SIPSlab);
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

                                        detailitem = {}
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
                                        Regenerate.TempPaymentDetails.push(detailitem);
                                    }

                                    if (paymentDetail[detcount].BrokerageTypeId == 2) {
                                        objList.addl_upfront_B15_id = paymentDetail[detcount].PaymentDetailsId;
                                        objList.addl_upfront_B15 = paymentDetail[detcount].BaseUpfront;

                                        detailitem = {}
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
                                        Regenerate.TempPaymentDetails.push(detailitem);
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

                                            detailitem = {}
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
                                            Regenerate.TempmonthList.push(detailitem);
                                            Regenerate.TempPaymentDetails.push(detailitem);
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
                                            detailitem = {}
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
                                            Regenerate.TempyearList.push(detailitem);
                                            Regenerate.TempPaymentDetails.push(detailitem);
                                        }

                                    }
                                }
                            }
                            objList.monthperiods = monthperiods;
                            objList.yearcount = yearcount;
                            objList.mothyearvalue = monthperiods + "~" + yearcount;
                            Regenerate.TempPaymentList.push(objList);

                        }
                    });
                }

            });

            Utility.ServiceCall("POST", 'MasterService.svc/GetAdditionalNotes', JSON.stringify({ MemoTypeID: 1, Channel: "", DistributorCategory: DistributorCategoryArr.toString(), ARNNO: ARNNoArr.toString() }), "json", false, false, function (result) {
                $('#txt_additional_notes').text(result.GetAdditionalNotesResult);
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

            $("#dt_from_process").datepicker({
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

            $("#dt_to_process").datepicker({
                dateFormat: 'dd/mm/y',
                changeMonth: true,
                changeYear: true,
                maxDate: maxdate,
            });

            $("#dt_to_process").datepicker("option", "minDate", $("#dt_from").val());

            if (sessionStorage.MemoStatus == "Active" || sessionStorage.MemoStatus == "InActive") {
                $("#lnk_view_remarks").remove();
                $("#lnk_view_rate_trail").remove();
            }
            Regenerate.SortPaymentListOnAdd();
            Regenerate.Showschemedetails();
            //RackRate.ViewRemarks();
        }
        else {
            Utility.writeNotification("warning", "Invalid Payment Memo ID", "", true);
            //alert("Invalid Payment Memo ID");
        }

    },

    SortPaymentListOnAdd: function () {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetScheme', JSON.stringify({ SearchText: "", MemoTypeId: "1", IsCloseEnded: "2" }), "json", false, false, function (result) {
            var arrItems = result.GetSchemeResult;
            var ResultPaymentList = [];

            $.each(arrItems, function (i, obj) {
                $.each(Regenerate.TempPaymentList, function (li, liobj) {
                    if (obj.SchemeId.toString() == liobj.schemeid.toString()) {
                        ResultPaymentList.push(liobj);
                        return false;
                    }
                });

            });
            Regenerate.TempPaymentList = [];
            Regenerate.TempPaymentList = ResultPaymentList;

        });
    },

    Showschemedetails: function () {
        Regenerate.TableCount = 0;

        if (Regenerate.TempPaymentList.length > 0) {

            var distinctmonth = [];
            var currentmonths = [];
            $.each(Regenerate.TempPaymentList, function (index, value) {
                if ($.inArray(value.mothyearvalue, distinctmonth) === -1) {
                    distinctmonth.push(value.mothyearvalue);
                }
            });
            $('#div_regenerate_rack_rate_detail').empty();

            Regenerate.TableCount = distinctmonth.length;
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
                                headersubcol3 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Base </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Total </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'>  </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> &le; " + Regenerate.TempPaymentList[0].SIPSlab + " </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> > " + Regenerate.TempPaymentList[0].SIPSlab + " </th>";
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
                            for (var onw = 0; onw < Regenerate.TempPaymentList.length; onw++) {
                                if (distinctmonth[k] == Regenerate.TempPaymentList[onw]["mothyearvalue"] && Regenerate.TempPaymentList[onw]["Onwards"].toLowerCase() == "true") {
                                    onwardstext = " & Onwards";
                                }
                            }
                        }
                        headercol += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='" + colspan + "'> Year 1 " + onwardstext + "</th>";
                    }
                }
                if (yearcount > 0) {
                    if (Regenerate.TempyearList.length > 0 && z > 0) {
                        colspan = colspan + yearcount;
                        for (var i = 0; i < yearcount ; i++) {
                            if (i == (yearcount - 1)) {
                                for (var onw = 0; onw < Regenerate.TempPaymentList.length; onw++) {
                                    if (distinctmonth[k] == Regenerate.TempPaymentList[onw]["mothyearvalue"] && Regenerate.TempPaymentList[onw]["Onwards"].toLowerCase() == "true") {
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
                    else if (Regenerate.TempyearList.length > 0 && z == 0) {
                        colspan = yearcount + 5;
                        for (var i = 0; i < yearcount ; i++) {
                            if (i == (yearcount - 1)) {
                                for (var onw = 0; onw < Regenerate.TempPaymentList.length; onw++) {
                                    if (distinctmonth[k] == Regenerate.TempPaymentList[onw]["mothyearvalue"] && Regenerate.TempPaymentList[onw]["Onwards"].toLowerCase() == "true") {
                                        onwardstext = " & Onwards";
                                    }
                                }
                            }
                            if (i == 0) {
                                if (Utility.enableSIP == true) {
                                    headercol += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'   colspan='5'> Year 1 " + onwardstext + "</th>";
                                    headersubcol1 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='3'> Lump Sum </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' rowspan='2' colspan='2'> SIP/STP </th>";
                                    headersubcol2 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='2'> ≤ Slab </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> > Slab </th>";
                                    headersubcol3 += "<th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Base </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Total </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' >  </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> &le; " + Regenerate.TempPaymentList[0].SIPSlab + " </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> > " + Regenerate.TempPaymentList[0].SIPSlab + " </th>";
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

                tbldata += "<tr  style='text-align: center; color: rgb(255, 255, 255); background-color: rgb(0, 101, 161);''><th style='text-align: center;color: rgb(255, 255, 255); padding-top: 100px;' rowspan='6'>Scheme </th><th style='text-align: center;color: rgb(255, 255, 255); padding-top: 100px;' rowspan='6'>Clawback</th><th style='text-align: center;color: rgb(255, 255, 255); padding-top: 100px;' rowspan='6'>Slab</th>";
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
                    tbldata += "<tr   class='rrd-tbl-hdr'><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Base </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Total </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'>  </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> &le; " + Regenerate.TempPaymentList[0].SIPSlab + " </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> > " + Regenerate.TempPaymentList[0].SIPSlab + " </th>" + headersubcol3 + "</tr></thead><tbody>";
                }
                else {
                    tbldata += "<tr   class='rrd-tbl-hdr'><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='3'> Lump Sum </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' rowspan='3'> B15 All </th>" + headersubcol1 + "</tr>";
                    tbldata += "<tr   class='rrd-tbl-hdr'><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);' colspan='2'> ≤ Slab </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> > Slab </th>" + headersubcol2 + "</tr>";
                    tbldata += "<tr   class='rrd-tbl-hdr'><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Base </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'> Total </th><th style='text-align: center; color: rgb(0, 0, 0); background-color: rgb(235, 244, 252);'>  </th>" + headersubcol3 + "</tr></thead><tbody>";
                }

                for (var i = 0; i < Regenerate.TempPaymentList.length; i++) {
                    tbldata += '<tr class="detail_row">';
                    if (distinctmonth[k] == Regenerate.TempPaymentList[i]["mothyearvalue"]) {

                        tbldata += "<td style='text-align: left; '><span class='rrd-tbl-label-bld' style='font-size:14px;'>" + Regenerate.TempPaymentList[i]["scheme"].replace("DSP BlackRock", "") + "</span>";

                        tbldata += "<input type='hidden' name='hid_payment_list_id'  value='" + Regenerate.TempPaymentList[i]["PaymentListId"] + "' />";
                        tbldata += "<input type='hidden' name='hid_scheme_id'  value='" + Regenerate.TempPaymentList[i]["schemeid"] + "' />";
                        tbldata += "<input type='hidden' name='hid_scheme_category_id'  value='" + Regenerate.TempPaymentList[i]["schemecategoryid"] + "' />";
                        tbldata += "<input type='hidden' name='hid_scheme'  value='" + Regenerate.TempPaymentList[i]["scheme"] + "' />";
                        tbldata += "<input type='hidden' name='hid_scheme_category'  value='" + Regenerate.TempPaymentList[i]["scheme_category"] + "' />";
                        tbldata += "<input type='hidden' name='hid_onwards'  value='" + Regenerate.TempPaymentList[i]["Onwards"] + "' />";
                        tbldata += "<input type='hidden' name='hid_claw_back'  value='" + Regenerate.TempPaymentList[i]["claw_back"] + "' />";
                        tbldata += "<input type='hidden' name='hid_slab_amount'  value='" + Regenerate.TempPaymentList[i]["slab_amount"] + "' />";
                        tbldata += "<input type='hidden' name='hid_slab_type'  value='" + Regenerate.TempPaymentList[i]["SlabType"] + "' />";
                        tbldata += "<input type='hidden' name='hid_sip'  value='" + Regenerate.TempPaymentList[i]["SIPSlab"] + "' />";
                        tbldata += "<input type='hidden' name='hid_mothyearvalue'  value='" + Regenerate.TempPaymentList[i]["mothyearvalue"] + "' />";
                        tbldata += "<input type='hidden' name='hid_payment_Type'  value='" + Regenerate.TempPaymentList[i]["PaymentType"] + "' /> </td>";

                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld' style='font-size:14px;'>" + Regenerate.TempPaymentList[i]["claw_back"] + "</span> </td>";
                        if (Regenerate.TempPaymentList[i]["SlabType"] == "Slab Amount") {
                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld ' style='font-size:14px;'>" + Regenerate.TempPaymentList[i]["slab_amount"] + "</span> </td>";
                        }
                        else {
                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld ' style='font-size:14px;'> All Amt</span> </td>";
                        }
                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'> " + Regenerate.TempPaymentList[i]["Base"] + "</span> </td>";
                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld total' style='font-size:14px;'  name='total'>" + Regenerate.TempPaymentList[i]["Total"] + "</span><input type='hidden' name='hid_lumpsum_additional'  value='" + Regenerate.TempPaymentList[i]["Additional"] + "' /> </td>";

                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + Regenerate.TempPaymentList[i]["LumpSumGreater"] + "</span> </td>";
                        if (Utility.enableSIP == true) {
                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + Regenerate.TempPaymentList[i]["SIPSlabLess"] + "</span> </td>";
                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + Regenerate.TempPaymentList[i]["SIPSlabGreater"] + "</span> </td>";
                        }
                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + Regenerate.TempPaymentList[i]["addl_upfront_B15"] + "</span> </td>";
                        if (Regenerate.TempmonthList.length > 0) {
                            var monthcnt = 0;
                            for (var g = 0; g < currentmonths.split(',').length; g++) {
                                for (var h = 0; h < Regenerate.TempmonthList.length; h++) {
                                    if (currentmonths.split(',')[g] == Regenerate.TempmonthList[h]["monthperiods"] && Regenerate.TempPaymentList[i]["schemeid"] == Regenerate.TempmonthList[h]["schemeid"]) {
                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + Regenerate.TempmonthList[h]["Base"] + " </span></td>";

                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld total' style='font-size:14px;'  name='total'>" + Regenerate.TempmonthList[h]["Total"] + " </span>";
                                        tbldata += "<input type='hidden' name='hid_lumpsum_additional'  value='" + Regenerate.TempmonthList[h]["Additional"] + "' />";
                                        tbldata += "<input type='hidden' name='hid_is_month'  value='1' />";
                                        tbldata += "<input type='hidden' name='hid_monthperiods'  value='" + Regenerate.TempmonthList[h]["monthperiods"] + "' />";
                                        tbldata += "</td>";

                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + Regenerate.TempmonthList[h]["LumpSumGreater"] + " </span></td>";
                                        if (Utility.enableSIP == true) {
                                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + Regenerate.TempmonthList[h]["SIPSlabLess"] + " </span></td>";
                                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + Regenerate.TempmonthList[h]["SIPSlabGreater"] + " </span></td>";
                                        }
                                        monthcnt += 1;
                                    }
                                }
                            }
                            tbldata += "<input type='hidden' id='hidden_month_det_" + i + "'  value='" + monthcnt + "' />";
                        }
                        var r = 0;
                        if (yearcount > 0) {
                            if (Regenerate.TempyearList.length > 0) {
                                var yearcnt = 0;
                                for (var j = 0; j < (Regenerate.TempyearList.length) ; j++) {
                                    if (Regenerate.TempPaymentList[i]["schemeid"] == Regenerate.TempyearList[j]["schemeid"] && Regenerate.TempyearList[j]["PeriodStart"] == "1") {
                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + Regenerate.TempyearList[j]["Base"] + " </span>";
                                        tbldata += "<input type='hidden' name='hid_lumpsum_additional'  value='" + Regenerate.TempyearList[j]["Additional"] + "' />";
                                        tbldata += "<input type='hidden' name='hid_is_month'  value='0' />";
                                        tbldata += "<input type='hidden' name='hid_year'  value='" + Regenerate.TempyearList[j]["PeriodStart"] + "' /> </td>";
                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld total' style='font-size:14px;'  name='total'>" + Regenerate.TempyearList[j]["Total"] + " </span></td>";
                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + Regenerate.TempyearList[j]["LumpSumGreater"] + " </span></td>";
                                        if (Utility.enableSIP == true) {
                                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + Regenerate.TempyearList[j]["SIPSlabLess"] + " </span></td>";
                                            tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + Regenerate.TempyearList[j]["SIPSlabGreater"] + " </span></td>";
                                        }
                                        r = 1;
                                    }
                                    else if (Regenerate.TempPaymentList[i]["schemeid"] == Regenerate.TempyearList[j]["schemeid"]) {
                                        tbldata += "<td class='pd-cmn-side-5 pad-top-b pad-btm-b bt bl'><span class='rrd-tbl-label-bld editInPlace'>" + Regenerate.TempyearList[j]["Base"] + "</span> ";
                                        tbldata += "<input type='hidden' class='hid_is_month'  value='0' />";
                                        tbldata += "<input type='hidden' class='hid_year'  value='" + Regenerate.TempyearList[j]["PeriodStart"] + "' /> </td>";
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
                        //if (Regenerate.TempPaymentList[i]["IsUpdated"] == true) {
                        //    tbldata += '<td style="text-align:center; border-color:transparent;"><a class="v-modal-2" data-toggle="modal" data-target="#modal2" style="float:right" href="javascript:void(0)" onclick="Regenerate.ViewModifiedRateHistory(' + Regenerate.TempPaymentList[i]["schemeid"] + ');"><h4>MRH</h4></a></td>';
                        //}
                        tbldata += ' </tr>';
                    }
                }
                tbldata += "</tbody></table></div>";
                $('#div_regenerate_rack_rate_detail').append(tbldata);
            }
        }
        else {
            $('#div_regenerate_rack_rate_detail').empty();
        }


    },

    RemoveToDatePicker: function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 9) {
            $("#dt_to").datepicker("destroy");
            $("#dt_to").val("");
        }
    },

    EditSchemeDetail: function () {
        Regenerate.SaveAllreview_schemeRows();
        Regenerate.IsEditing = 1;
        if (Regenerate.TableCount > 0) {
            for (var cnt = 0; cnt < Regenerate.TableCount; cnt++) {
                var row = $("#tbl_review_scheme" + cnt + " tr.detail_row");

                for (var rowIndex = 0; rowIndex < row.length; rowIndex++) {
                    var rowData = $($("#tbl_review_scheme" + cnt + " tr.detail_row")[rowIndex]);
                    var column = $(rowData).find('td');

                    var radiobtn = column[0];
                    var Radiochecked = $(radiobtn).find("input[name$='equity']").is(":checked");
                    if (Radiochecked == true) {
                        var list = {};
                        var clm = column[0];
                        var SchemeId = $(clm).find("input[name='hid_scheme_id']").val();
                        var ScehemCategoryId = $(clm).find("input[name='hid_scheme_category_id']").val();
                        Regenerate.GetSchemeCategory("");
                        $('#dd_scheme_category').multiselect('select', $(clm).find("input[name='hid_scheme_category_id']").val());

                        Regenerate.GetScheme($(clm).find("input[name='hid_scheme_category_id']").val());
                        $('#dd_scheme').multiselect('select', $(clm).find("input[name='hid_scheme_id']").val());
                        var clawback = $(clm).find("input[name$='hid_claw_back']").val().split(' ');
                        $('#txt_clawback').val(clawback[0]);
                        $('#dd_claw_type').val(clawback[1]);
                        var slab = $(clm).find("input[name='hid_slab_type']").val();
                        $('#dd_slab_type').val($(clm).find("input[name='hid_slab_type']").val());
                        if ($(clm).find("input[name$='hid_slab_type']").val() == "Slab Amount") {
                            var slab = $(clm).find("input[name$='hid_slab_amount']").val().split(' ');
                            $('#txt_slab_amount').val(slab[0]);
                            $('#dd_slab_amount_type').val(slab[1]);
                            $('#dd_slab_type').val("Slab Amount");
                            $('#dd_slab_type').removeAttr("disabled");
                            $('#txt_slab_amount').removeAttr("disabled");
                            $('#dd_slab_amount_type').removeAttr("disabled");
                        } else {
                            $('#txt_slab_amount').val("");
                            $('#dd_slab_amount_type').val("");
                            $('#dd_slab_type').val("All Amounts");
                            $('#txt_slab_amount').attr("disabled", "disabled");
                            $('#dd_slab_amount_type').attr("disabled", "disabled");
                        }
                        $('#txt_lumpsum_less_base').val($(column[3]).find(".editInPlace").text());
                        $('#txt_lumpsum_less_additional').val($(column[4]).find("input[name$='hid_lumpsum_additional']").val());
                        $('#txt_lumpsum_less_total').val($(column[4]).find(".total").text());
                        $('#txt_lumpsum_greater').val($(column[5]).find(".editInPlace").text());
                        $('#txt_sip_less').val($(column[6]).find(".editInPlace").text());
                        $('#txt_sip_greater').val($(column[7]).find(".editInPlace").text());
                        $('#txt_additional_upfront').val($(column[8]).find(".editInPlace").text());


                        $("#trailTable tr.trail_row").remove();

                        $(Regenerate.TempmonthList).each(function (obj, value) {
                            if (value.schemeid == SchemeId && value.BrokerageTypeId == 3 && value.PeriodType == 1) {
                                Regenerate.addRow(0);
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

                        $(Regenerate.TempyearList).each(function (obj, value) {
                            if (value.schemeid == SchemeId && value.BrokerageTypeId == 3 && value.PeriodType == 2) {
                                Regenerate.addRow(0);
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
                            }
                        });


                    }
                }

                $('#modal111').modal('show');
            }

        }

    },

    SaveSchemeClick: function () {
        Regenerate.SaveAllreview_schemeRows();
        Regenerate.TempmonthList = [];
        Regenerate.TempPaymentDetails = [];
        Regenerate.TempPaymentList = [];
        Regenerate.TempyearList = [];
        if (Regenerate.TableCount > 0) {
            for (var cnt = 0; cnt < Regenerate.TableCount; cnt++) {
                var row = $("#tbl_review_scheme" + cnt + " tr.detail_row");

                for (var rowIndex = 0; rowIndex < row.length; rowIndex++) {
                    var rowData = $($("#tbl_review_scheme" + cnt + " tr.detail_row")[rowIndex]);
                    var column = $(rowData).find('td');
                    if (column.length > 0) {
                        var clm = column[0];
                        var SchemeId = $(clm).find("input[name='hid_scheme_id']").val();
                        var ScehemCategoryId = $(clm).find("input[name='hid_scheme_category_id']").val();


                        listitem = {};

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
                        var sd = $(clm).find("input[name='hid_mothyearvalue']").val();

                        listitem["monthperiods"] = $(clm).find("input[name='hid_mothyearvalue']").val().split('~')[0];//monthperiods;
                        listitem["yearcount"] = $(clm).find("input[name='hid_mothyearvalue']").val().split('~')[1];//yearcount;
                        listitem["mothyearvalue"] = $(clm).find("input[name='hid_mothyearvalue']").val();


                        detailitem = {}
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
                        detailitem["SIPSlab"] = $(column[8]).find(".editInPlace").text();
                        detailitem["PeriodStart"] = 0;
                        detailitem["PeriodEnd"] = 0;
                        detailitem["PeriodType"] = 0;
                        Regenerate.TempPaymentDetails.push(detailitem);


                        detailitem = {}
                        detailitem["schemeid"] = SchemeId;
                        detailitem["schemecategoryid"] = ScehemCategoryId;
                        detailitem["scheme_category"] = $(clm).find("input[name='hid_scheme_category']").val();
                        detailitem["scheme"] = $(clm).find("input[name='hid_scheme']").val();
                        detailitem["BrokerageTypeId"] = 2;
                        detailitem["Base"] = $(column[9]).find(".editInPlace").text();
                        detailitem["Additional"] = 0;
                        detailitem["Total"] = 0;
                        detailitem["LumpSumGreater"] = 0;
                        detailitem["SIPSlabLess"] = 0;
                        detailitem["SIPSlabGreater"] = 0;
                        detailitem["PeriodStart"] = 0;
                        detailitem["PeriodEnd"] = 0;
                        detailitem["PeriodType"] = 0;
                        Regenerate.TempPaymentDetails.push(detailitem);

                        var monthperiods = ""; var yearperiods = "";
                        var yearcount = 0;
                        var endcnt = 14;
                        var startcnt = 9;
                        var currentcnt = 9;
                        var monthsavailable = $(clm).find("input[name='hid_mothyearvalue']").val().split('~')[0];
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

                                    if (mcnt == currentcnt + 3) {
                                        detailitem["SIPSlabLess"] = $(column[mcnt]).find(".editInPlace").text();
                                    }

                                    if (mcnt == currentcnt + 4) {
                                        detailitem["SIPSlabGreater"] = $(column[mcnt]).find(".editInPlace").text();
                                    }

                                    detailitem["PeriodType"] = 1;

                                }
                                Regenerate.TempPaymentDetails.push(detailitem);
                                Regenerate.TempmonthList.push(detailitem);
                                endcnt = endcnt + 5;
                                currentcnt = currentcnt + 5;
                            }
                        }
                        var yearcnt = $(clm).find("input[name='hid_mothyearvalue']").val().split('~')[1];

                        for (var g = 0; g < yearcnt; g++) {
                            if (monthsavailable == "") {
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

                                        if (mcnt == currentcnt + 3) {
                                            detailitem["SIPSlabLess"] = $(column[mcnt]).find(".editInPlace").text();
                                        }

                                        if (mcnt == currentcnt + 4) {
                                            detailitem["SIPSlabGreater"] = $(column[mcnt]).find(".editInPlace").text();
                                        }
                                    }
                                    else {
                                        detailitem["Total"] = 0;
                                        detailitem["monthperiods"] = g;
                                        detailitem["Additional"] = 0;
                                        detailitem["PeriodStart"] = g;
                                        detailitem["PeriodEnd"] = 0;
                                        detailitem["LumpSumGreater"] = 0;
                                        detailitem["SIPSlabLess"] = 0;
                                        detailitem["SIPSlabGreater"] = 0;
                                    }
                                    detailitem["PeriodType"] = 1;

                                }
                                Regenerate.TempPaymentDetails.push(detailitem);
                                Regenerate.TempyearList.push(detailitem);

                                endcnt = endcnt + 1;
                                currentcnt = currentcnt + 1;
                            }
                        }

                        Regenerate.TempPaymentList.push(listitem);
                    }
                }
            }
        }

        $.each(Regenerate.TempPaymentDetails, function (index, value) {
            var error = "";
            if (value.Base == "0" || value.Base.trim() == '') {

                if (value.BrokerageTypeId == "1") {
                    if (error.indexOf("Enter Valid Upfront Base") > -1) {
                    }
                    else {
                        error += "Enter Valid Upfront Base. <br/>";
                    }
                } else if (value.BrokerageTypeId == "3") {
                    if (error.indexOf("Enter Valid Trail Base") > -1) {
                    }
                    else {
                        error += "Enter Valid Trail Base. <br/>";
                    }
                }
            }

            if (error == "") {
                return true;
            }
            else {
                Utility.writeNotification("warning", error, "", true);
                return false
            }
        });
    },

    SaveRackRateInfo: function (updateStatus, message) {
        //if (RackRate.RackRateInfoValid(updateStatus)) {
        ////Get Selected Category////////
        var Category = $('#dd_dist_category_process option:selected');

        var Categoryselected = [];
        var CategoryNameselected = [];
        $(Category).each(function () {
            Categoryselected.push([$(this).val()]);
            CategoryNameselected.push([$(this).text()]);
        });

        /////Get selected ARN/////////
        var token = $("#txt_arn_process").tokenInput("get");
        var names = [];
        $.each(token, function (i, obj) {
            names.push(obj.name);//build an array of just the names
        });
        var ARNSelected = names.toString();

        /////Get selected ARN Name/////////
        var Nametoken = $("#txt_arn_name_process").tokenInput("get");
        var Arnnames = [];
        $.each(Nametoken, function (i, obj) {
            Arnnames.push(obj.name);//build an array of just the names
        });
        var ARNNameSelected = Arnnames.toString();

        //////Get Selected Transaction type/////
        var transactiontype = "";

        var additionalNotes = "";

        //var channelselected = $('#dd_channel option:selected');
        //var channelarray = [];
        //$(channelselected).each(function (index, channelsel) {
        //    channelarray.push([$(this).val()]);
        //});
        //var Channel = channelarray.toString();

        var token = $("#txt_arn_process").tokenInput("get");
        var names = [];
        $.each(token, function (i, obj) {
            names.push(obj.name);//build an array of just the names
        });
        var ARNSelected = names.toString();

        Utility.ServiceCall("POST", 'MasterService.svc/GetAdditionalNotes', JSON.stringify({ MemoTypeID: 1, Channel: '', DistributorCategory: Categoryselected.toString(), ARNNO: ARNSelected }), "json", false, false, function (result) {
            additionalNotes = result.GetAdditionalNotesResult;
        });

        var PaymentMemo = [{
            PaymentMemoId: 0,
            BranchId: 0,
            ZoneId: 0,
            MemoTypeId: 1,
            PaymentAmount: 0,
            DateFrom: $("#dt_from_process").val(),
            DateTo: $("#dt_to_process").val(),
            ApplicableTo: "",
            TransactionType: transactiontype,
            SlabType: 0,
            SlabAmount: 0,
            SlabCondition: 0,
            Remarks: "",//$("#txt_remarks").val(),
            Comments: additionalNotes,//$("#txt_additional_notes").val(),
            MemoStatus: "Regenerate",
            TransactionTypeOthers: "",
            CopiedMemoID: 0,
            SIPNotes: "",
            IsCloseEnded: Regenerate.IsCloseEnded,
        }];

        var PaymentLi = [];
        var PaymentDetail = [];

        $(Regenerate.TempPaymentList).each(function (listobj, listvalue) {
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
        $(Regenerate.TempPaymentDetails).each(function (detobj, detvalue) {
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


        $(window).scrollTop(0);

        var data = { memo: JSON.stringify(PaymentMemo), list: JSON.stringify(PaymentLi), details: JSON.stringify(PaymentDetail) }
        var Memo = { Payment: PaymentMemo };

        Utility.ServiceCall("POST", 'BaseRackRateService.svc/SaveRegenerateBaseRackRateInformation', JSON.stringify({ Memo: PaymentMemo, list: PaymentLi, details: PaymentDetail }), "json", false, false, function (result) {
            // Utility.writeNotification("success", message, "", true);
            var paymentMemoId = result.SaveRegenerateBaseRackRateInformationResult;


            var fileurl = Utility.RegenerateReportUrl.replace("###MemoNumber###", paymentMemoId);
            Regenerate.openWin(fileurl);

        });

        //}

    },

    remove_tags: function (html) {
        return jQuery(html).text();
    },

    openWin: function (url) {
        //var myWindow = window.open(url, '_blank');
        sessionStorage.reportURL = url;
        var myWindow = window.open("ReportViewer.html", '_blank');
    },

    Process: function () {
        Regenerate.SaveRackRateInfo();
        //var updateStatus = "Active";
        //var Category = $('#dd_dist_category_process option:selected');
        //var Categoryselected = [];
        //var CategoryNameselected = [];
        //$(Category).each(function () {
        //    Categoryselected.push([$(this).val()]);
        //    CategoryNameselected.push([$(this).text()]);
        //});

        ///////Get selected ARN/////////
        //var token = $("#txt_arn_process").tokenInput("get");
        //var names = [];
        //$.each(token, function (i, obj) {
        //    names.push(obj.name);//build an array of just the names
        //});
        //var ARNSelected = names.toString();

        ///////Get selected ARN Name/////////
        //var Nametoken = $("#txt_arn_name_process").tokenInput("get");
        //var Arnnames = [];
        //$.each(Nametoken, function (i, obj) {
        //    Arnnames.push(obj.name);//build an array of just the names
        //});
        //var ARNNameSelected = Arnnames.toString();

        //var mywindow = window.open('/Print.html', 'Print', 'height=400,width=600');
        //mywindow.document.write('<html><head><title></title>');
        //mywindow.document.write(' <link rel="stylesheet" href="../css/bootstrap.css">');
        //mywindow.document.write('</head><body >');
        //mywindow.document.write('<div>Distributor Category: ' + CategoryNameselected.toString() + '</div>');
        //mywindow.document.write('<div>ARN No: ' + ARNSelected + '</div>');
        //mywindow.document.write('<div>ARN Name: ' + ARNNameSelected + '</div>');
        //mywindow.document.write('<div>Date From: ' + $('#dt_from_process').val() + '</div>');
        //mywindow.document.write('<div>Date To: ' + $('#dt_to_process').val() + '</div>');
        //mywindow.document.write($('#div_regenerate_rack_rate_detail').html());
        //mywindow.document.write('</body></html>');

        //mywindow.document.close(); // necessary for IE >= 10
        //mywindow.focus(); // necessary for IE >= 10

        //mywindow.print();
        //mywindow.close();

        //RackRateDetail.SaveRackRateInfo(updateStatus, 'Memo Processed successfully');
    },

    Process_Save: function () {

    },

    Delete_process: function () {

    },

    Cancel_process: function () {
        $("#hdr_name").text("Manage Tie-Up");
        $("#div_content").hide();

        $("#div_btn").empty();

        input = $('<button class="btn btn-warning sq-btn mr-right-01" onclick="TieUp.clearFields(); "><img src="../img/repeat-btn.png"></button>' +
            '<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"TieUp.SearchTieUp();\">Search</button> ' +
            '<button class="btn btn-warning sq-btn mr-right-01" onclick=\"TieUp.Viewtoccusers();\" target="_blank">Email</button><button class="btn btn-success sq-btn mr-right-01" onclick=\"TieUp.PrintRackRate();\">Print</button>' +
            '<button class="btn btn-danger sq-btn mr-right-01" id="btn_freeze_regenerate" onclick=\"Regenerate.ViewRegenerate();\">Regenerate</button>');

        $("#div_btn").append(input);

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
    },

    GetARN_process: function (SearchText) {

        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARN', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn_process").empty();
            Regenerate.arns = [];
            Regenerate.arns = JSON.parse(result.GetARNResult);
            $("#txt_arn_process").tokenInput(
            Regenerate.arns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    Regenerate.GetDistributorInfoARN(item.id, 'add', item.id);
                },
                onDelete: function (item) {
                    Regenerate.GetDistributorInfoARN(item.id, 'remove', item.id);
                }
            });
        });
    },

    GetDistributorInfoARN: function (SearchText, mode, id) {
        if (mode == 'add') {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChildArn', JSON.stringify({ ArnNo: SearchText }), "json", false, false, function (result) {
                var Data = result.GetChildArnResult;
                if (Data.length > 1) {
                    $.each(Data, function (i, obj) {

                        $.each($("#txt_arn_process").tokenInput("get"), function (i, obj) {
                            if (obj.id == obj.DistributorId) {
                                return;
                            }
                        });

                        $("#txt_arn_process").tokenInput("add", { id: obj.DistributorId, name: obj.ARN });

                        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                            var Data = result.GetDistributorBasedOnIDResult;

                            $.each($("#txt_arn_name_process").tokenInput("get"), function (i, obj) {
                                if (obj.id == Data[0].DistributorId) {
                                    return;
                                }
                            });
                            $("#txt_arn_name_process").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });

                        });
                    });
                }
                else if (Data.length == 1) {

                    $("#txt_arn_name_process").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });
                }
                else {
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                        var Data = result.GetDistributorBasedOnIDResult;
                        $.each($("#txt_arn_name_process").tokenInput("get"), function (i, obj) {
                            if (obj.id == Data[0].DistributorId) {
                                return;
                            }
                        });

                        $("#txt_arn_name_process").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });
                    });
                }
            });

        }
        else {
            $("#txt_arn_name_process").tokenInput("remove", { id: id });
        }
    },

    LoadprocessARNToken: function (SearchText, mode, id) {
        if (mode == 'add') {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                var Data = result.GetDistributorBasedOnIDResult;
                $.each($("#txt_arn_process").tokenInput("get"), function (i, obj) {
                    if (obj.id == SearchText) {
                        return;
                    }
                });

                $.each(Data, function (i, obj) {
                    if (obj.DistributorId == SearchText) {
                        $("#txt_arn_process").tokenInput("add", { id: obj.DistributorId, name: obj.ARN });
                    }
                });
            });
        }
        else {
            $("#txt_arn_process").tokenInput("remove", { id: id });
        }
    },

    GetARNNameProcess: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARNName', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn_name_process").empty();
            Regenerate.arnName = JSON.parse(result.GetARNNameResult);
            $("#txt_arn_name_process").tokenInput(
            Regenerate.arnName,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    Regenerate.LoadprocessARNToken(item.id, 'add', item.id);
                },

                onDelete: function (item) {
                    Regenerate.LoadprocessARNToken(item.id, 'remove', item.id);
                }
            });
        });
    },

    GetDistributorCategory_process: function (SearchText) {
        var arr = SearchText == "" ? "" : SearchText.toString();
        arr = JSON.stringify(arr)

        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorCategory', '{"SearchText": ' + arr + '}', "json", false, false, function (result) {
            var arrItems = result.GetDistributorCategoryResult;
            $("#dd_dist_category_process").empty()
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].DistributorCategoryName).val(arrItems[i].DistributorCategoryId).appendTo('#dd_dist_category_process');
            }
            $('#dd_dist_category_process').attr("multiple", "multiple");
            $('#dd_dist_category_process').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
            });
            $('#dd_dist_category_process').multiselect('clearSelection');
        });
    },

    GetSchemeCategory: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeCategory', JSON.stringify({ SearchText: "", MemoTypeId: "1", IsCloseEnded: "2" }), "json", false, false, function (result) {
            var arrItems = result.GetSchemeCategoryResult;
            //$("<option />").text("Select Scheme Category").val("0").appendTo("#dd_scheme_category");
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
                        Regenerate.GetScheme(selected.valueOf());
                    }
                    else {
                        $("#dd_scheme").multiselect('destroy');
                        $("#dd_scheme").empty();
                        $('#dd_scheme').multiselect('rebuildscheme');
                    }
                }
            });
            $('#dd_scheme_category').multiselect('clearSelection');
        });
    },

    GetScheme: function (SearchText) {
        var arr = SearchText == "" ? "" : SearchText.toString();
        arr = JSON.stringify(arr)

        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetScheme', '{"SearchText": ' + arr + ', "MemoTypeId": "1", "IsCloseEnded": "2"}', "json", false, false, function (result) {
            var arrItems = result.GetSchemeResult;
            $("#dd_scheme").multiselect('destroy');
            $("#dd_scheme").empty();
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeName).val(arrItems[i].SchemeId).appendTo('#dd_scheme');
            }
            $('#dd_scheme').multiselect('rebuildscheme');
        });
    },

    addRow: function (focus) {
        var tableRow = '<tr class="trail_row">' +
                                               '<td width="12%">' +
                                                   '<div class="styled-select">' +
                                                       '<select class="select-bx-style c-round" name="trail_period_type" style="font-size:14px;"  onChange="Regenerate.PeriodTypeChange(this)">' +
                                                           '<option value="Months">Months</option>' +
                                                           '<option value="Year">Year</option>' +
                                                       '</select>' +
                                                   '</div>' +
                                               '</td>' +
                                               '<td><input type="text" class="input-text-bx-style c-round number" style="margin-right:4px;" maxlength="2" name="trail_period_from" /></td>' +
                                               '<td><input type="text" class="input-text-bx-style c-round number" style="margin-right:4px;" maxlength="2" name="trail_period_to" /></td>' +
                                               '<td><input type="text" class="input-text-bx-style c-round number" style="margin-right:4px;" maxlength="3" name="trail_lumpsum_base" onkeyup="Regenerate.Calculatetrail(this);"/></td>' +
                                               '<td><input type="text" class="input-text-bx-style c-round number" style="margin-right:4px;" maxlength="3" name="trail_lumpsum_additional" onkeyup="Regenerate.Calculatetrail(this);"/></td>' +
                                               '<td><input type="text" class="input-text-bx-style c-round number" disabled style="margin-right:4px;" maxlength="3" name="trail_lumpsum_total" /></td>' +
                                               '<td><input type="text" class="input-text-bx-style c-round number" style="margin-right:4px;" maxlength="3" name="trail_lumpsum_greater" /></td>' +
                                               '<td><input type="text" class="input-text-bx-style c-round number" style="margin-right:4px;" maxlength="3" name="trail_sip_less" /></td>' +
                                               '<td><input type="text" class="input-text-bx-style c-round number" style="margin-right:4px;" maxlength="3" name="trail_sip_greater" /></td>' +
                                               ' <td align="center" style="border-color:transparent;"><a href="javascript:void(0)" onclick="Regenerate.ResetRow(this)"> <img src="../img/repeat-btn1.png" style="float:right;"></a></td>' +
                                               '<td align="center" style="border-color:transparent;"><a href="javascript:void(0)" onclick="Regenerate.DeleteRow(this)"> <img src="../img/trash-btn.png" style="float:left;"></a></td>' +
                                           '</tr>';

        $('#trailTable > tbody:last').append
        (tableRow);
        Utility.AllowDecimal();
        if (focus == 1) {
            var row = $("#trailTable tr:last");
            var column = $(row).find('td');
            var trail_period_type = column[0];
            $(trail_period_type).find("select[name$='trail_period_type']").focus();
        }
    },

    PeriodTypeChange: function (elem) {
        var inpText = $(elem).val();

        var parentRow = $(elem).closest('.trail_row');
        if (inpText == "Months") {
            $(parentRow).find("input[name$='trail_period_to']").show();
        } else {
            $(parentRow).find("input[name$='trail_period_to']").hide();
        }

    },

    DeleteRow: function (elem) {
        $(elem).parent().parent().remove();
        $('#btn_add_new_rack').focus();
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
        Regenerate.addRow(0);

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
    },

    CalculateLumpsum: function (elem) {
        $('#txt_lumpsum_less_total').val(parseInt($('#txt_lumpsum_less_base').val() == "" ? 0 : $('#txt_lumpsum_less_base').val()) + parseInt($('#txt_lumpsum_less_additional').val() == "" ? 0 : $('#txt_lumpsum_less_additional').val()));

        if (elem.id == "txt_lumpsum_less_base")
            $('#txt_sip_less').val($('#txt_lumpsum_less_base').val());
        $('#txt_sip_greater').val($('#txt_lumpsum_less_total').val());
    },

    Calculatetrail: function (elem) {
        var parentRow = $(elem).closest('.trail_row');
        var column = $(parentRow).find('td');
        $(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val()
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
        if (elem.name == "trail_lumpsum_base") {
            $(trail_sip_less).find("input[name$='trail_sip_less']").val($(trail_lumpsum_base).find("input[name$='trail_lumpsum_base']").val());
        }
        $(trail_sip_greater).find("input[name$='trail_sip_greater']").val($(trail_lumpsum_total).find("input[name$='trail_lumpsum_total']").val());
    },

    RowDoubleClick: function (row) {
        Regenerate.SaveAllreview_schemeRows();
        $('td', row).each(function () {
            if ($(this).find('.editInPlace').length > 0) {
                $(this).html('<input class="input-text-bx-style number c-round" type="text" onkeyup="Regenerate.CalculateInlineLumpsum(this);" value="' + $(this).text().trim() + '" />');
            }
        });
    },

    CalculateInlineLumpsum: function (elem) {
        var row = $(elem).parent().parent();
        var column = $(row).find('td');

        var columindex = $(elem).closest("td").index();
        var NextColumn = column[columindex + 1];
        var SlabLessColumn = column[columindex + 3];
        var SlabGreaterColumn = column[columindex + 4];
        var Currentvalue = $(elem).val() == "" ? 0 : $(elem).val();
        if ($(NextColumn).find("span[name$='total']").length > 0) {
            var additional = $(NextColumn).find("input[name$='hid_lumpsum_additional']").val();

            $(NextColumn).find("span[name$='total']").text(parseInt($(NextColumn).find("input[name$='hid_lumpsum_additional']").val() == "" ? 0 : $(NextColumn).find("input[name$='hid_lumpsum_additional']").val()) + parseInt(Currentvalue));
            $(SlabLessColumn).find("input[type=text]").val(Currentvalue);
            $(SlabGreaterColumn).find("input[type=text]").val($(NextColumn).find("span[name$='total']").text());
        }


    },

    SaveAllreview_schemeRows: function () {
        for (var cnt = 0; cnt < Regenerate.TableCount; cnt++) {
            var allrow = $("#tbl_review_scheme" + cnt + " tr.detail_row");
            $('td', allrow).each(function () {
                if ($(this).find('input[type=text]').length > 0) {
                    var val = $(this).find('input[type=text]').val();
                    $(this).html("<span class='rrd-tbl-label-bld editInPlace'>" + val + " </span>");
                }
            });
        }
    },

}

$(function () {

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
            mindate = "01/01/" + dateToday.getFullYear();
            maxdate = "03/31/" + dateToday.getFullYear();
        }
        else if (currmonth == 4 || currmonth == 5 || currmonth == 6) {
            mindate = "04/01/" + dateToday.getFullYear();
            maxdate = "06/30/" + dateToday.getFullYear();
        }
        else if (currmonth == 7 || currmonth == 8 || currmonth == 9) {
            mindate = "07/01/" + dateToday.getFullYear();
            maxdate = "09/30/" + dateToday.getFullYear();
        }
        else if (currmonth == 10 || currmonth == 11 || currmonth == 12) {
            mindate = "10/01/" + dateToday.getFullYear();
            maxdate = "12/31/" + dateToday.getFullYear();
        }
        mindate = new Date(mindate);
        maxdate = new Date(maxdate);
    }

    $("#dt_from_process").datepicker({
        dateFormat: 'dd/mm/y',
        changeMonth: true,
        changeYear: true,
        minDate: mindate,
        maxDate: maxdate,
        onSelect: function (selectedDate) {
            $("#dt_to_process").datepicker({
                dateFormat: 'dd/mm/y',
                changeMonth: true,
                changeYear: true,
                maxDate: maxdate,
            });
            $("#dt_to_process").datepicker("option", "minDate", selectedDate);
        }
    });
});