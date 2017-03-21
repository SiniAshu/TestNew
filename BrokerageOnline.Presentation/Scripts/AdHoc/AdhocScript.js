var AdHocScript = {
    PaymentListID: 0,
    TempArns: [],
    TempChildArns: [],
    TempArn_Names: [],
    TempSchemes: [],

    // Onchange Properties

    PaymentTypeOnChange: function () {
        //var input = "";
        var paymenttypevalue = $('#dd_payment_type option:selected').val();

        //4 => Future Business Payment
        AdHocScript.ChangesOnPaymentType(paymenttypevalue);
        AdHocScript.RefreshAdHocDetails();
    },


    CheckPaymentTypeExists: function () {
        var paymenttypevalue = $('#dd_payment_type option:selected').val();
        if (parseInt(paymenttypevalue) > 0)
            return true;
        else
            return false;
    },

    ChangesOnPaymentType: function (Value) {
        $('#checkAll').prop('checked', false);
        if (parseInt(Value) == 4) {
            $("#div_Payment_Details_Hidden1").attr('hidden', true);
            $("#div_Payment_Details_Hidden2").attr('hidden', true);
            $("#div_Payment_Details_Hidden3").attr('hidden', true);
            $("#div_payment_details_row_Mobile1").attr('hidden', true);
            $("#div_payment_details_row_Mobile2").attr('hidden', true);
            $("#div_payment_details_row_Future").attr('hidden', false);
            $("#div_free_text_box").attr('hidden', true);
        }
        else {
            $("#div_Payment_Details_Hidden1").attr('hidden', false);
            $("#div_Payment_Details_Hidden2").attr('hidden', false);
            $("#div_Payment_Details_Hidden3").attr('hidden', false);
            $("#div_payment_details_row_Mobile1").attr('hidden', false);
            $("#div_payment_details_row_Mobile2").attr('hidden', false);
            $("#div_payment_details_row_Future").attr('hidden', true);
            $("#div_free_text_box").attr('hidden', false);
        }
    },

    AmountBasisOnChange: function () {
        var AmountBasisvalue = $('#dd_Amount_Basis option:selected').val();
        var Temp_Date_To_Value = $("#dt_to").val();

        if (AmountBasisvalue == "AUM") {
            $("#dt_from").val('');
            $('#dt_from').attr('disabled', true);

            var d = new Date();
            var strDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + (d.getFullYear() - 2000);

            var date_to = $.datepicker.parseDate('dd/mm/y', $('#dt_to').val());
            var date_today = $.datepicker.parseDate('dd/mm/y', strDate);

            if (date_to == null || date_to > date_today) {

                $("#dt_to").datepicker("destroy");
                $("#dt_to").val("");

                $("#dt_to").datepicker({
                    dateFormat: 'dd/mm/y',
                    changeMonth: true,
                    changeYear: true,
                    onSelect: function (selectedDate) {
                        if ($("#dt_to").val() != undefined && $("#dt_to").val() != "")
                            AdHocScript.CheckDistributor_AUM_Gross_Sales();
                    }
                });

                $("#dt_to").attr('disabled', false);
                $("#dt_to").datepicker("option", "maxDate", '+0m +0w');
            }
            $("#dt_to").datepicker("option", "minDate", '01/01/14');

        }
        else {
            if ($("#dt_from").val() == "") {
                AdHocScript.RemoveToDatePicker();
                $("#dt_to").datepicker({
                    dateFormat: 'dd/mm/y',
                    changeMonth: true,
                    changeYear: true,
                    onSelect: function (selectedDate) {
                        if ($("#dt_to").val() != undefined && $("#dt_to").val() != "")
                            AdHocScript.CheckDistributor_AUM_Gross_Sales();
                    }
                });

                $("#dt_to").attr('disabled', false);
                $("#dt_to").datepicker("option", "minDate", '01/01/14');
                $("#dt_to").datepicker("option", "maxDate", '+0m +0w');

                $("#dt_to").val(Temp_Date_To_Value);
            }

            $('#dt_from').attr('disabled', false);
        }
        AdHocScript.CheckDistributor_AUM_Gross_Sales();
    },

    CheckDistributor_AUM_Gross_Sales: function () {
        if (AdHocScript.CheckPaymentTypeExists()) {
            var AmountBasisvalue = $('#dd_Amount_Basis option:selected').val();
            var SchemeId = parseInt($('#dd_scheme option:selected').val());
            var BranchId = parseInt($('#dd_branch option:selected').val());
            var MemoTypeID = $('#dd_payment_type option:selected').val();
            var ARNNo = "";
            var error = "";
            var date_to = $.datepicker.parseDate('dd/mm/y', $('#dt_to').val());

            if (date_to != null && date_to != undefined) {
                var y = date_to.getFullYear(), m = date_to.getMonth();
                var lastDay = new Date(y, m + 1, 0);

                var today = new Date();
                var lastMonth = '';
                var lastDate = '';
                var strDate = '';
                var currentmonth = 0
                if (lastDay.getMonth() == today.getMonth() && lastDay.getFullYear() == today.getFullYear()) {
                    lastDate = (parseInt(today.getDate()) > 9 ? (today.getDate()) : "0" + (today.getDate()))

                    currentmonth = today.getMonth() + 1;
                    lastMonth = (currentmonth > 9 ? currentmonth.toString() : "0" + currentmonth.toString())

                    //lastMonth = (parseInt(today.getMonth()) > 9 ? (today.getMonth()) : "0" + (today.getMonth()))
                    strDate = lastDate + "/" + lastMonth + "/" + (today.getFullYear() - 2000);
                }
                else {
                    lastDate = (parseInt(lastDay.getDate()) > 9 ? (lastDay.getDate()) : "0" + (lastDay.getDate()))

                    currentmonth = lastDay.getMonth() + 1;

                    lastMonth = (currentmonth > 9 ? currentmonth.toString() : "0" + currentmonth.toString())

                    var GetYear = "";
                    var GetYearInt = 0;
                    GetYearInt = (lastDay.getFullYear() - 2000);

                    if (GetYearInt < 10)
                        GetYear = "0" + GetYearInt.toString();
                    else
                        GetYear = GetYearInt.toString();
                    strDate = lastDate + "/" + lastMonth + "/" + GetYear;
                }

                $("#dt_to").val(strDate);
            }

            if ($("#txt_arn_info").val() == "" || ($("#txt_arn_info").val() != "" && $("#txt_arn_info").tokenInput("get").length == 0)) {
                error += "ARN No. is Required. <br/>";
            }

            if ($("#dd_scheme").val() == "0") {
                error += "Scheme is Required. <br/>";
            }

            if (AmountBasisvalue == "Gross Sales") {
                if ($("#dt_from").val() == "") {
                    error += "Date From is Required. <br/>";
                }
            }

            if (MemoTypeID == "4") {
                error += "Payment Type Should be Mobilization Based Payment. <br/>";
            }

            if ($("#dt_to").val() == "") {
                error += "Date To is Required. <br/>";
            }

            if (error == "") {
                if (AmountBasisvalue != 'Select Amount Basis') {
                    /////Get selected ARN/////////
                    var token = $("#txt_arn_info").tokenInput("get");
                    var names = [];
                    $.each(token, function (i, obj) {
                        names.push(obj.name);//build an array of just the names
                    });
                    ARNNo = names.toString();

                    var DateTo = $("#dt_to").val();
                    var DateFrom = $("#dt_from").val();

                    Utility.ServiceCall("POST", 'AdHocService.svc/GetDistributor_AUM_Gross', JSON.stringify({ ARNNumbers: ARNNo, SchemeID: SchemeId, SubRegionID: BranchId, PeriodFrom: DateFrom, PeriodTo: DateTo, AmountBasisType: AmountBasisvalue }), "json", false, false, function (result) {

                        var res = result.GetDistributor_AUM_GrossResult;

                        if (res != undefined && res != "") {
                            var TempResultArray = res.split(':');

                            if (TempResultArray[0] != '' && TempResultArray[0] != undefined) {
                                if (AmountBasisvalue == "AUM")
                                    $('#txt_Mobilization_Amount').val(TempResultArray[0]);
                                else
                                    $('#txt_Mobilization_Amount').val(parseFloat(TempResultArray[0]).toFixed(0).toString());

                                AdHocScript.CalculatePaymentAmount();
                            }
                            if (TempResultArray[1] != '' && TempResultArray[1] != undefined)
                                Utility.writeNotification("success", "AUM/Gross Sales available as of " + TempResultArray[1], "", true);

                            if (TempResultArray[2] != '' && TempResultArray[2] != undefined && AmountBasisvalue == "AUM") {
                                AdHocScript.SetLastdate(TempResultArray[2]);
                            }
                            //$('#date_to').val(TempResultArray[2]);
                        }
                        else {
                            $('#txt_Mobilization_Amount').val('');
                            $('#txt_Payment_Amount_Mobile').val('');
                            Utility.writeNotification("norecords", "Data Not Found", "", false);
                        }
                    });
                }
            }

            AdHocScript.DuplicateAdhocPaymentCheck();

            //else {
            //    //return false;
            //    Utility.writeNotification("warning", error, "", true);
            //}
        }
        else {
            //return false;
            alert("Please Select Payment Type");
            $('#dd_Amount_Basis').val("Select Amount Basis");
            $('#dt_from').val('');
            $('#dt_to').val('');
            return false;
        }
    },



    SetLastdate: function (Input1) {
        var Input = new Date(Input1);

        var date_to = Input;
        //var date_to = $.datepicker.parseDate('dd/mm/y', Input);

        if (date_to != null && date_to != undefined) {
            var y = date_to.getFullYear(), m = date_to.getMonth();
            var lastDay = new Date(y, m + 1, 0);

            var today = new Date();
            var lastMonth = '';
            var lastDate = '';
            var strDate = '';
            var currentmonth = 0
            if (lastDay.getMonth() == today.getMonth() && lastDay.getFullYear() == today.getFullYear()) {
                lastDate = (parseInt(today.getDate()) > 9 ? (today.getDate()) : "0" + (today.getDate()))

                currentmonth = today.getMonth() + 1;
                lastMonth = (currentmonth > 9 ? currentmonth.toString() : "0" + currentmonth.toString())

                //lastMonth = (parseInt(today.getMonth()) > 9 ? (today.getMonth()) : "0" + (today.getMonth()))
                strDate = lastDate + "/" + lastMonth + "/" + (today.getFullYear() - 2000);
            }
            else {
                lastDate = (parseInt(lastDay.getDate()) > 9 ? (lastDay.getDate()) : "0" + (lastDay.getDate()))

                currentmonth = lastDay.getMonth() + 1;

                lastMonth = (currentmonth > 9 ? currentmonth.toString() : "0" + currentmonth.toString())

                var GetYear = "";
                var GetYearInt = 0;
                GetYearInt = (lastDay.getFullYear() - 2000);

                if (GetYearInt < 10)
                    GetYear = "0" + GetYearInt.toString();
                else
                    GetYear = GetYearInt.toString();
                strDate = lastDate + "/" + lastMonth + "/" + GetYear;
            }

            $("#dt_to").val(strDate);
        }
    },


    SchemeCategoryOnChange: function () {
        if (AdHocScript.CheckPaymentTypeExists()) {
            var m_SchemeCategoryD = $('#dd_schemecategory option:selected').val();
            AdHocScript.GetScheme(m_SchemeCategoryD);
        } else {
            //return false;
            alert("Please Select Payment Type");
            $('#dd_schemecategory').val(0);
            return false;
        }
    },

    BranchOnChange: function () {
        if (!AdHocScript.CheckPaymentTypeExists()) {
            alert("Please Select Payment Type");
            $('#dd_branch').val(0);
            return false;
        }
    },


    //Decimal: function (inputValue) {
    //    var OutPutValue = inputValue;
    //    var arrInput = inputValue.split(".");
    //    if (inputValue.indexOf('.') != -1) {
    //        if (arrInput[1].length > 2) {
    //            if (isNaN(parseFloat(OutPutValue))) return;
    //            OutPutValue = arrInput[0] + "." + inputValue.split(".")[1].substring(0, 2);

    //            //OutPutValue = OutPutValue.substring(0, OutPutValue.length - 1).toString();
    //            //OutPutValue = parseFloat(OutPutValue).toFixed(3).toString();
    //        }
    //    }
    //    return OutPutValue;
    //},

    Decimal: function (inputValue) {
        var OutPutValue = inputValue;
        var arrInput = inputValue.split(".");
        if (inputValue.indexOf('.') != -1) {
            if (arrInput[1].length > 2) {
                if (isNaN(parseFloat(OutPutValue))) return;
                OutPutValue = AdHocScript.toFixed(parseFloat(OutPutValue), 2).toString();
                //OutPutValue = arrInput[0] + "." + inputValue.split(".")[1].substring(0, 2);

                //OutPutValue = OutPutValue.substring(0, OutPutValue.length - 1).toString();
                //OutPutValue = parseFloat(OutPutValue).toFixed(3).toString();
            }
        }
        return OutPutValue;
    },

    toFixed: function (number, precision) {
        var multiplier = Math.pow(10, precision);
        return Math.floor(number * multiplier) / multiplier;
    },

    CalculatePaymentAmount: function () {
        var TempMobAmount = $('#txt_Mobilization_Amount').val().split(',');
        var Rate = $("#txt_Rate").val();
        var AmountBasisvalue = $('#dd_Amount_Basis option:selected').val();

        //var roundvalue;
        //roundvalue = AdHocScript.Decimal(Rate);
        //$("#txt_Rate").val(roundvalue);


        var TempPaymentamount = '';
        if (Rate != undefined && Rate != "") {
            for (i = 0; i < TempMobAmount.length; i++) {
                if (TempMobAmount[i] != undefined && TempMobAmount[i] != "") {

                    var Float_Value = 0;
                    if (AmountBasisvalue == "AUM")
                        Float_Value = parseFloat(TempMobAmount[i]) * 100000;
                    else
                        Float_Value = parseFloat(TempMobAmount[i]);

                    if (TempPaymentamount != "") {
                        TempPaymentamount += ',' + parseFloat((parseFloat(Rate) * parseFloat(Float_Value) / 10000)).toFixed(0).toString();
                    }
                    else
                        TempPaymentamount = parseFloat((parseFloat(Rate) * parseFloat(Float_Value) / 10000)).toFixed(0).toString();
                }
            }
            //TempPaymentamount = parseFloat(TempPaymentamount * 100000).toFixed(2).toString();
            //TempPaymentamount = TempPaymentamount * 100000;
            $('#txt_Payment_Amount_Mobile').val(TempPaymentamount);
            $('#txt_Free_Text_Field_01').val(TempPaymentamount);
        }
        else {
            $('#txt_Free_Text_Field_01').val('');
            $('#txt_Payment_Amount_Mobile').val('');
        }
    },

    ConfirmARNOk: function () {
        $.each(AdHocScript.TempChildArns, function (i, obj) {

            // For Set PAN Number
            if (i == 0)
                AdHocScript.SetPanNumber(obj.PanNumber);

            //********************** 
            $("#txt_arn_info").tokenInput("add", { id: obj.DistributorId, name: obj.ARN });


            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: obj.ARN }), "json", false, false, function (result) {
                var Data = result.GetDistributorBasedOnIDResult;

                $.each($("#txt_arn_name_info").tokenInput("get"), function (i, obj) {
                    if (obj.id == Data[0].DistributorId) {
                        return;
                    }
                });
                $("#txt_arn_name_info").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });
            });
        });
        $('#modal_confirmation').modal('hide');
    },

    ConfirmARNCancel: function () {
        $.each(AdHocScript.TempChildArns, function (i, obj) {
            if (obj.DistributorParent == 1) {
                $("#txt_arn_name_info").tokenInput("add", { id: obj.DistributorId, name: obj.DistributorName });
                AdHocScript.SetPanNumber(obj.PanNumber);
            }
        });

        $('#modal_confirmation').modal('hide');
    },

    SetPanNumber: function (m_PanNumber) {
        var PanNumber = "";
        PanNumber = $('#txt_PAN_no').val();
        if (PanNumber != "") {
            PanNumber += ',' + m_PanNumber;
        }
        else
            PanNumber = m_PanNumber;
        $('#txt_PAN_no').val(PanNumber);
    },

    //****************************************************************************************************************************************************************

    // Save / Update / Delete Services

    SaveAdHocDetails: function () {
        var errorAvoidMsg = "";
        /////Get selected ARN/////////
        var Check_Avoid_ARN = $("#txt_arn_name_info").tokenInput("get");
        $.each(Check_Avoid_ARN, function (i, obj) {
            if (obj.name == "TO BE EMPANELLED") {
                errorAvoidMsg = "Please exclude 'TO BE EMPANELLED' ARN.";
            }
        });

        if (errorAvoidMsg == "") {
            var ErrorMessage = AdHocScript.ValidateMandatory();

            if (ErrorMessage == "") {
                //AdHocScript.CalculatePaymentAmount();

                Utility.ServiceCall("POST", 'AdHocService.svc/SaveAdHocDetails', JSON.stringify({ InputData: AdHocScript.LoadSaveParameters() }), "json", false, false, function (result) {
                    var res = result.SaveAdHocDetailsResult;

                    if (res != undefined) {
                        if (res == "Inserted Successfully" || res == "Update Successfully") {
                            Utility.writeNotification("success", "AdHoc Details Saved Successfully.", "", true);
                            if (res != "Update Successfully")
                                AdHocScript.CancelAdHocDetails();
                            AdHocScript.GetAdHocGridDetails(0, 0);
                        }
                        else if (res == "Inserted Failed" || res == "Update Failed") {
                            Utility.writeNotification("warning", "Save AdHoc Details Failed.", "", true);
                        }
                    }
                    else
                        Utility.writeNotification("warning", "Save AdHoc Details Failed.", "", true);
                });
            }
            else
                Utility.writeNotification("warning", ErrorMessage, "", true);
        }
        else
            Utility.writeNotification("warning", errorAvoidMsg, "", true);
    },


    DuplicateAdhocPaymentCheck: function () {
        var PaymentListID, ARNNO, SchemeID, PaymentMemoTypeID, AmountBasis, PeriodFrom, PeriodTo;

        if (AdHocScript.PaymentListID > 0)
            PaymentListID = AdHocScript.PaymentListID;
        else
            PaymentListID = 0;

        /////Get selected ARN/////////
        var token = $("#txt_arn_info").tokenInput("get");
        var names = [];
        $.each(token, function (i, obj) {
            names.push(obj.name);//build an array of just the names
        });
        ARNNO = names.toString();

        PaymentMemoTypeID = $('#dd_payment_type option:selected').val();
        SchemeID = parseInt($('#dd_scheme option:selected').val());
        AmountBasis = $('#dd_Amount_Basis option:selected').val();

        if (PaymentMemoTypeID == "4") // 4 => Future Business Payment
        {
            PeriodFrom = "";
            PeriodTo = "";
        }
        else {
            PeriodTo = $("#dt_to").val();
            PeriodFrom = $("#dt_from").val();
        }

        if (ARNNO != '' && PaymentMemoTypeID != '' && SchemeID > 0 && AmountBasis != 'Select Amount Basis' && PeriodTo != '') {
            Utility.ServiceCall("POST", 'AdHocService.svc/GetDuplicateAdHocDetails', JSON.stringify({ PaymentListID: PaymentListID, ARNNO: ARNNO, SchemeID: SchemeID, PaymentMemoTypeID: PaymentMemoTypeID, AmountBasis: AmountBasis, PeriodFrom: PeriodFrom, PeriodTo: PeriodTo }), "json", false, false, function (result) {
                var resultarr = result.GetDuplicateAdHocDetailsResult;
                $('#grid_sub_processing').jqGrid('clearGridData');
                if (resultarr != undefined && resultarr.length > 0) {
                    for (var i = 0; i < resultarr.length; i++)
                        jQuery("#grid_sub_processing").jqGrid('addRowData', parseInt(i + 1), resultarr[i]);

                    $('#modal_adhoc_payment_record').modal('show');
                }
            });
        }
    },

    ValidateMandatory: function () {
        var error = "";
        var ARN_Count = 0;
        var Mob_Count = 0;
        var Pay_Count = 0;

        //if ($("#txt_arn_info").val() == "" || ($("#txt_arn_info").val() != "" && $("#txt_arn_info").tokenInput("get").length == 0)) {

        if (AdHocScript.PaymentListID == undefined || AdHocScript.PaymentListID == 0) {
            if ($("#txt_arn_info").val() == "" || ($("#txt_arn_info").val() != "" && $("#txt_arn_info").tokenInput("get").length == 0)) {
                error += "ARN No. is Required. <br/>";
            }
            else {
                ARN_Count = $("#txt_arn_info").tokenInput("get").length;
            }
        }
        else
            ARN_Count = $('#txt_arn_info').val().split(',').length;


        if ($("#txt_arn_name_info").val() == "") {
            error += "ARN Name is Required. <br/>";
        }

        //if ($("#txt_Free_Text_Field_01").val() == "") {
        //    error += "Free Text Field 1 is Required. <br/>";
        //}

        //if ($("#txt_Free_Text_Field_02").val() == "") {
        //    error += "Free Text Field 2 is Required. <br/>";
        //}

        if ($("#dd_branch").val() == "0") {
            error += "Branch is Required. <br/>";
        }


        var payment_type = $("#dd_payment_type").val();
        if (parseInt(payment_type) > 0) {
            if (parseInt(payment_type) == 3) // 3 => Mobilization
            {
                if ($("#dt_to").val() == "") {
                    error += "Date To is Required. <br/>";
                }
                if ($("#dd_scheme").val() == "0") {
                    error += "Scheme is Required. <br/>";
                }

                if ($("#dd_schemecategory").val() == "0") {
                    error += "Scheme Category is Required. <br/>";
                }

                if ($("#txt_Mobilization_Amount").val() == "") {
                    error += "AUM / Gross Sales (Lakhs) is Required. <br/>";
                }
                else {
                    Mob_Count = $('#txt_Mobilization_Amount').val().split(',').length;
                    if (Mob_Count != ARN_Count)
                        error += "AUM / Gross Sales (Lakhs) is Required as per ARN No. Selected. <br/>";
                }

                if (($("#dd_Amount_Basis").val() == "" || $("#dd_Amount_Basis").val() == "Select Amount Basis")) {
                    error += "Amount Basis is Required. <br/>";
                }

                var AmountBasisvalue = $('#dd_Amount_Basis option:selected').val();

                if (AmountBasisvalue == "Gross Sales") {
                    if ($("#dt_from").val() == "") {
                        error += "Date From is Required. <br/>";
                    }
                }

                if ($("#txt_Rate").val() == "") {
                    error += "Rate is Required. <br/>";
                }

                if ($("#txt_Payment_Amount_Mobile").val() == "") {
                    error += "Payment Amount is Required. <br/>";
                }
                else {
                    Pay_Count = $('#txt_Payment_Amount_Mobile').val().split(',').length;
                    if (Pay_Count != ARN_Count)
                        error += "Payment Amount is Required as per ARN No. Selected. <br/>";
                }
            }
            else {
                if ($("#txt_PAN_no").val() == "") {
                    error += "PAN No. is Required. <br/>";
                }

                var TempPAN = $('#txt_PAN_no').val().split(',');

                for (i = 0; i < TempPAN.length; i++) {
                    var panerror = AdHocScript.ValidatePanNumber(TempPAN[i]);
                    if (panerror != undefined && panerror != '')
                        error += panerror + "<br/>";
                }

                if (TempPAN.length != ARN_Count)
                    error += "PAN No. is Required as per ARN No. Selected. <br/>";

                if ($("#txt_Payment_Amount_Future").val() == "") {
                    error += "Payment Amount is Required. <br/>";
                }
                else {
                    Pay_Count = $('#txt_Payment_Amount_Future').val().split(',').length;
                    if (Pay_Count != ARN_Count)
                        error += "Payment Amount is Required as per ARN No. Selected. <br/>";
                }

                if ($("#txt_remarks").val() == "") {
                    error += "Remarks is Required. <br/>";
                }
            }
        }
        else
            error += "Payment Type is Required. <br/>";

        return error;
    },

    ValidatePanNumber: function (ObjVal) {
        var panPat = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
        var code = /([C,P,H,F,A,T,B,L,J,G])/;
        var code_chk = ObjVal.substring(3, 4);
        if (ObjVal.search(panPat) == -1) {
            return "Invaild PAN Card No. : " + ObjVal;
        }
        else if (code.test(code_chk) == false) {
            return "Invaild PAN Card No. : " + ObjVal;
        }
        else return '';
    },

    LoadSaveParameters: function () {
        var PaymentMemoArr = [];
        var PaymentMemoparam = {};

        if (AdHocScript.PaymentListID > 0) {
            PaymentMemoparam["PaymentListId"] = AdHocScript.PaymentListID;
            PaymentMemoparam["ARNNo"] = "";
            PaymentMemoparam["ARNName"] = "";
        }
        else {
            PaymentMemoparam["PaymentListId"] = 0;
            /////Get selected ARN/////////
            var token = $("#txt_arn_info").tokenInput("get");
            var names = [];
            $.each(token, function (i, obj) {
                names.push(obj.name);//build an array of just the names
            });
            PaymentMemoparam["ARNNo"] = names.toString();
        }

        PaymentMemoparam["PaymentMemoId"] = 0;
        PaymentMemoparam["SerialNo"] = 0;
        PaymentMemoparam["SchemeName"] = "";
        PaymentMemoparam["BranchName"] = "";
        PaymentMemoparam["MemoNumber"] = "";
        PaymentMemoparam["MemoTypeName"] = "";
        PaymentMemoparam["DistributorCategoryName"] = "";
        PaymentMemoparam["CreatedByName"] = "";
        PaymentMemoparam["MemoStatus"] = "Saved";
        PaymentMemoparam["AmountBasisID"] = 0;
        PaymentMemoparam["MemoTypeID"] = $('#dd_payment_type option:selected').val();
        PaymentMemoparam["SchemeId"] = parseInt($('#dd_scheme option:selected').val());
        PaymentMemoparam["SchemeCategoryId"] = parseInt($('#dd_schemecategory option:selected').val());
        PaymentMemoparam["BranchId"] = $('#dd_branch option:selected').val();
        PaymentMemoparam["AmountBasisName"] = $('#dd_Amount_Basis option:selected').val();
        PaymentMemoparam["Rate"] = $("#txt_Rate").val();

        if (PaymentMemoparam["MemoTypeID"] == "4") // 4 => Future Business Payment
        {
            PaymentMemoparam["PanNumber"] = $("#txt_PAN_no").val();
            PaymentMemoparam["DateFrom"] = "";
            PaymentMemoparam["DateTo"] = "";
            PaymentMemoparam["MobilizationAmount"] = "";
            PaymentMemoparam["PaymentAmount"] = $("#txt_Payment_Amount_Future").val();
        }
        else {
            PaymentMemoparam["PanNumber"] = "";
            PaymentMemoparam["DateFrom"] = $("#dt_from").val();
            PaymentMemoparam["DateTo"] = $("#dt_to").val();
            PaymentMemoparam["MobilizationAmount"] = $("#txt_Mobilization_Amount").val();
            PaymentMemoparam["PaymentAmount"] = $("#txt_Payment_Amount_Mobile").val();
        }
        PaymentMemoparam["FreeTextField1"] = $("#txt_Free_Text_Field_01").val();
        PaymentMemoparam["FreeTextField2"] = $("#txt_Free_Text_Field_02").val();
        PaymentMemoparam["Remarks"] = $("#txt_remarks").val();
        PaymentMemoArr.push(PaymentMemoparam);

        return PaymentMemoArr;
    },

    CancelAdHocDetails: function () {
        AdHocScript.RefreshAdHocDetails();
        $('#dd_payment_type').val(0);
        $('#dd_payment_type').focus();
    },

    RefreshAdHocDetails: function () {
        $('#checkAll').prop('checked', false);
        AdHocScript.RemoveToDatePicker();
        $('#dd_payment_type').attr('disabled', false);
        $('#btn_save_adhoc').attr('disabled', false);
        $('#txt_arn_info').tokenInput('toggleDisabled', false);
        $('#txt_arn_name_info').tokenInput('toggleDisabled', false);
        $("#txt_arn_info").tokenInput('clear');
        $("#txt_arn_name_info").tokenInput('clear');

        AdHocScript.PaymentListID = 0;
        $("#txt_arn_info").val("");

        $("#txt_remarks").val('');
        $("#txt_PAN_no").val('');
        $("#txt_arn_name_info").val('');
        $('#dd_scheme').val(0);
        $('#dd_schemecategory').val(0);
        $("#dt_from").val('');
        $("#dt_to").val('');

        if ($("#dd_branch option").length == 1) {
            var firstvalue = $("#dd_branch option")[0].value;
            $('#dd_branch').val(parseInt(firstvalue));
        }
        else
            $('#dd_branch').val(0);

        $('#dd_Amount_Basis').val('Select Amount Basis');
        $("#txt_Mobilization_Amount").val('');
        $("#txt_Payment_Amount_Future").val('');
        $("#txt_Payment_Amount_Mobile").val('');
        $("#txt_Rate").val('');
        $("#txt_Free_Text_Field_01").val('');
        $("#txt_Free_Text_Field_02").val('');
    },

    DeleteAdHocPayment: function () {
        var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
        var selectedmemos = "";
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].select == 'True') {
                    if (selectedmemos != "")
                        selectedmemos = selectedmemos + ',';
                    selectedmemos = selectedmemos + gridData[i].PaymentListId;
                }
            }
            if (selectedmemos != "") {
                if (confirm("Are you sure you want to delete!")) {
                    Utility.ServiceCall("POST", 'AdHocService.svc/DeleteAdHocPayment', JSON.stringify({ PaymentListIDs: selectedmemos, AdhocStatus: "" }), "json", false, false, function (result) {
                        var res = result.DeleteAdHocPaymentResult;
                        $('#grid_search_result').jqGrid('clearGridData');
                        if (res != undefined && res == true) {
                            Utility.writeNotification("success", "Records Deleted Successfully.", "", true);
                            AdHocScript.GetAdHocGridDetails(0, 0);
                        }
                        else {
                            Utility.writeNotification("error", "Sorry, Records are Failed to Delete.", "", true);
                        }
                    });
                }
            }
        }
    },

    //****************************************************************************************************************************************************************

    // Load Datas to Controls

    GetARN: function (SearchText, m_SubregionID) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARN', JSON.stringify({ SearchText: "", SubregionID: m_SubregionID }), "json", false, false, function (result) {

            AdHocScript.TempArns = [];
            AdHocScript.TempArns = JSON.parse(result.GetARNResult);

            $("#txt_arn_info").empty();
            $(".token-input-list-facebook").remove();
            $("#txt_arn_info").tokenInput(
            JSON.parse(result.GetARNResult),
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {

                    var token = $("#txt_arn_info").tokenInput("get");
                    var names = [];
                    $.each(token, function (i, obj) {
                        names.push(obj.name);//build an array of just the names
                    });
                    if (names.length > 1)
                        $("#txt_arn_info").tokenInput("remove", { id: item.id });
                    else {
                        if (AdHocScript.CheckPaymentTypeExists()) {
                            AdHocScript.GetDistributor(item.id, 'add');
                        }
                        else {
                            $("#txt_arn_info").tokenInput('clear');
                            alert("Please Select Payment Type");
                            return false;
                        }
                    }

                },
                onDelete: function (item) {
                    AdHocScript.GetDistributor(item.id, 'remove');
                }
            });
        });

        //var testvar =  $("#div_arn_no").html();

    },

    GetARNName: function (SearchText, m_SubregionID) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARNName', JSON.stringify({ SearchText: "", SubregionID: m_SubregionID }), "json", false, false, function (result) {
            AdHocScript.TempArn_Names = [];
            AdHocScript.TempArn_Names = JSON.parse(result.GetARNNameResult);

            $("#txt_arn_name_info").empty();
            $("#txt_arn_name_info").tokenInput(
            AdHocScript.TempArn_Names,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    var token = $("#txt_arn_name_info").tokenInput("get");
                    var names = [];
                    $.each(token, function (i, obj) {
                        names.push(obj.name);//build an array of just the names
                    });
                    if (names.length > 1)
                        $("#txt_arn_name_info").tokenInput("remove", { id: item.id });
                    else {
                        if (AdHocScript.CheckPaymentTypeExists()) {
                            AdHocScript.LoadinfoARNToken(item.id, 'add', item.id);
                        }
                        else {
                            $("#txt_arn_name_info").tokenInput('clear');
                            alert("Please Select Payment Type");
                            return false;
                        }
                    }
                },

                onDelete: function (item) {
                    //RackRate.LoadARNToken(item.name, 'remove', item.id);
                    AdHocScript.LoadinfoARNToken(item.id, 'remove', item.id);
                }
            });
        });
    },

    LoadinfoARNToken: function (SearchText, mode, id) {
        if (mode == 'add') {
            if (AdHocScript.PaymentListID == undefined || AdHocScript.PaymentListID == 0) {

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

                            //AdHocScript.SetPanNumber(obj.PanNumber);
                        }
                    });
                });
            }
        }
        else {
            $("#txt_arn_info").tokenInput("remove", { id: id });
        }

    },

    GetDistributor: function (SearchText, mode) {
        //if (AdHocScript.CheckPaymentTypeExists()) {

        if (mode == 'add') {
            AdHocScript.TempChildArns = [];
            if (AdHocScript.PaymentListID == undefined || AdHocScript.PaymentListID == 0) {

                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChildArn', JSON.stringify({ ArnNo: SearchText }), "json", false, false, function (result) {
                    var Data = result.GetChildArnResult;

                    AdHocScript.TempChildArns = (result.GetChildArnResult);
                    //if (Data.length > 1) {
                    //    $('#modal_confirmation').modal('show');
                    //}
                    //else
                    if (Data.length == 1) {
                        $("#txt_arn_name_info").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });

                        AdHocScript.SetPanNumber(Data[0].PanNumber);
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

                            AdHocScript.SetPanNumber(Data[0].PanNumber);

                        });
                    }
                });
            }
        }
        else {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributor', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                var Data = result.GetDistributorResult;
                $("#txt_arn_name_info").tokenInput("remove", { id: Data[0].DistributorId });
                AdHocScript.RemovePanNumber(Data[0].PanNumber);
            });
        }

        AdHocScript.DuplicateAdhocPaymentCheck();
        //}
        //else {
        //    alert("Please Select Payment Type");
        //    $('#txt_arn_info').tokenInput('clear');
        //    return false;
        //}
    },

    RemovePanNumber: function (m_PanNumber) {
        var PanNumber = "";
        PanNumber = $('#txt_PAN_no').val();
        var panarr = PanNumber.split(',');
        for (var cnt = 0; cnt < panarr.length; cnt++) {
            if (panarr[cnt] == m_PanNumber) {
                panarr.splice(cnt, 1);
            }
        }
        $('#txt_PAN_no').val(panarr.toString());
    },

    GetSchemeCategory: function () {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeCategory', JSON.stringify({ SearchText: "", MemoTypeId: "0" }), "json", false, false, function (result) {
            var arrItems = result.GetSchemeCategoryResult;

            $("<option />").text("Select Scheme Category").val("0").appendTo("#dd_schemecategory");
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeCategoryName).val(arrItems[i].SchemeCategoryId).appendTo('#dd_schemecategory');
            }
        });
    },

    GetScheme: function (SearchText) {
        var arr = SearchText == "" ? "" : SearchText.toString();
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetScheme', JSON.stringify({ SearchText: arr, MemoTypeId: "0" }), "json", false, false, function (result) {
            var arrItems = result.GetSchemeResult;
            $("#dd_scheme").empty();
            AdHocScript.TempSchemes = [];
            AdHocScript.TempSchemes = arrItems;
            $("<option />").text("Select Scheme").val("0").appendTo("#dd_scheme");
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeName).val(arrItems[i].SchemeId).appendTo('#dd_scheme');
            }
        });
    },

    GetMemoTypes: function (MemoParentID) {
        Utility.ServiceCall("POST", 'AdHocService.svc/GetMemoTypes', JSON.stringify({ MemoParentID: parseInt(MemoParentID) }), "json", false, false, function (result) {
            var arrItems = result.GetMemoTypesResult;
            $("<option />").text("Select Payment Type").val("0").appendTo("#dd_payment_type");
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].MemoTypeName).val(arrItems[i].MemoTypeId).appendTo('#dd_payment_type');
            }
        });
    },

    GetSubRegion: function () {
        Utility.ServiceCall("POST", 'AdHocService.svc/GetSubRegion', '', "json", false, false, function (result) {
            var arrItems = result.GetSubRegionResult;
            if (arrItems != undefined) {
                if (arrItems.length != 1)
                    $("<option />").text("Select Branch").val("0").appendTo("#dd_branch");

                for (var i = 0; i < arrItems.length; i++) {
                    $("<option />").text(arrItems[i].SubRegionName).val(arrItems[i].SubRegionId).appendTo('#dd_branch');
                }

                if (arrItems.length == 1)
                    $('#dd_branch').val(arrItems[0].SubRegionId);
            }
        });
    },

    //****************************************************************************************************************************************************************


    // Service call to Load Grid Values

    GetAdHocGridDetails: function (PaymentType, CreatedBy) {
        Utility.ServiceCall("POST", 'AdHocService.svc/GetAdHocDetails', JSON.stringify({ PaymentTypeID: parseInt(PaymentType), AdhocStatus: "create", AdhocBatchID: 0, CreatedByID: CreatedBy, SearchFilter: Utility.ListSearchText }), "json", false, false, function (result) {
            var arrItems = result.GetAdHocDetailsResult;
            var totalAmount=0;
            $('#grid_search_result').jqGrid('clearGridData');
             $('#lblTotalCount').text(arrItems.length);
            if (arrItems != undefined && arrItems.length > 0) {
                for (var i = 0; i < arrItems.length; i++){
                    jQuery("#grid_search_result").jqGrid('addRowData', arrItems[i].id, arrItems[i]);
                     totalAmount += arrItems[i].FreeTextField1==""? 0 : parseFloat(arrItems[i].FreeTextField1);
                }
                ($.isNumeric(totalAmount)) ? $('#lblTotalAmount').text(totalAmount) : $('#lblTotalAmount').text("0");
                //$('#lblTotalAmount').text(totalAmount);
            }
        });
    },

    ReturnAdHocDetailHyperLink: function (cellValue, options, rowdata, action) {
        return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;" onclick=\"AdHocScript.AdHocPaymentDetail(' + rowdata.PaymentListId + ');\">' + rowdata.SerialNo + '</a>';
    },

    RemoveToDatePicker: function () {

        $("#dt_from").val('');
        $('#dt_from').attr('disabled', false);

        $("#dt_to").datepicker("destroy");
        $("#dt_to").val("");

        $("#dt_from").datepicker({
            dateFormat: 'dd/mm/y',
            changeMonth: true,
            changeYear: true,
            onSelect: function (selectedDate) {
                $("#dt_to").datepicker({
                    dateFormat: 'dd/mm/y',
                    changeMonth: true,
                    changeYear: true,
                    onSelect: function (selectedDate) {
                        if ($("#dt_to").val() != undefined && $("#dt_to").val() != "")
                            AdHocScript.CheckDistributor_AUM_Gross_Sales();
                    }
                });
                $("#dt_to").attr('disabled', false);
                $("#dt_to").datepicker("option", "maxDate", '+0m +0w');

                if ($("#dt_from").val() != undefined && $("#dt_from").val() != "")
                    AdHocScript.CheckDistributor_AUM_Gross_Sales();
                //$("#dt_to").datepicker("option", "minDate", selectedDate);
            }
        });
        $("#dt_from").datepicker("option", "minDate", '01/01/14');

    },

    AdHocPaymentDetail: function (PaymentListId) {
        AdHocScript.PaymentListID = parseInt(PaymentListId); // Setting Local Variable 
        Utility.ServiceCall("POST", 'AdHocService.svc/GetAdHocPaymentDetails', JSON.stringify({ PaymentListID: PaymentListId }), "json", false, false, function (result) {
            var arrItems = result.GetAdHocPaymentDetailsResult;

            if (arrItems != undefined) {
                $('#dd_payment_type').val(arrItems.MemoTypeID);
                $('#dd_payment_type').attr('disabled', true);
                //$('#dd_branch').attr('disabled', true);

                AdHocScript.ChangesOnPaymentType(arrItems.MemoTypeID);

                $("#txt_arn_name_info").val("");
                $("#txt_arn_name_info").val(arrItems.ARNName);

                $('#dd_branch').val(arrItems.BranchId);

                var Arnselected = arrItems.ARNNo != null ? arrItems.ARNNo.split(",") : '';
                var ARNNameSelected = arrItems.ARNName != null ? arrItems.ARNName.split(",") : '';

                $('#txt_arn_info').tokenInput('clear');
                $('#txt_arn_name_info').tokenInput('clear');
                if (Arnselected != null) {
                    for (var i = 0; i < Arnselected.length ; i++) {
                        $.each(AdHocScript.TempArns, function (key, value) {
                            if (value.name == Arnselected[i]) {
                                $("#txt_arn_info").tokenInput("add", { id: value.id, name: value.name });
                            }
                        });
                    }
                }

                if (ARNNameSelected != null) {
                    for (var i = 0; i < ARNNameSelected.length ; i++) {
                        $.each(AdHocScript.TempArn_Names, function (key, value) {
                            if (value.name == ARNNameSelected[i]) {
                                $("#txt_arn_name_info").tokenInput("add", { id: value.id, name: value.name });
                            }
                        });
                    }
                }

                $('#txt_arn_info').tokenInput('toggleDisabled', true);
                $('#txt_arn_name_info').tokenInput('toggleDisabled', true);

                var TempAmountBasisName = arrItems.AmountBasisName;

                if (TempAmountBasisName == "AUM") {
                    $("#dt_from").val('');
                    $("#dt_from").attr('disabled', true);

                    $("#dt_to").datepicker({
                        dateFormat: 'dd/mm/y',
                        changeMonth: true,
                        changeYear: true,
                        onSelect: function (selectedDate) {
                            if ($("#dt_to").val() != undefined && $("#dt_to").val() != "")
                                AdHocScript.CheckDistributor_AUM_Gross_Sales();
                        }
                    });

                    $("#dt_to").attr('disabled', false);
                    $("#dt_to").datepicker("option", "maxDate", '+0m +0w');

                    $("#dt_to").val(arrItems.DateTo);
                }
                else {

                    $("#dt_from").attr('disabled', false);
                    $("#dt_to").val(arrItems.DateTo);
                    $("#dt_from").val(arrItems.DateFrom);
                    $("#dt_to").datepicker("option", "minDate", arrItems.DateFrom);
                    $("#dt_from").datepicker("option", "maxDate", arrItems.DateTo);
                }

                $("#txt_PAN_no").val(arrItems.PanNumber);
                $('#dd_schemecategory').val(arrItems.SchemeCategoryId);

                AdHocScript.GetScheme(arrItems.SchemeCategoryId);

                AdHocScript.TempSchemes;
                var schemecount = 0;
                for (var i = 0; i < AdHocScript.TempSchemes.length; i++) {
                    if (AdHocScript.TempSchemes[i].SchemeId == arrItems.SchemeId) {
                        schemecount = schemecount + 1;
                        break;
                    }

                }

                if (schemecount == 0) {
                    var Schemeparam = {};

                    Schemeparam["SchemeCategoryId"] = arrItems.SchemeCategoryId;
                    Schemeparam["SchemeCode"] = "";
                    Schemeparam["SchemeId"] = arrItems.SchemeId;
                    Schemeparam["SchemeName"] = arrItems.SchemeName;
                    Schemeparam["SchemeTypeId"] = 0;
                    AdHocScript.TempSchemes.push(Schemeparam);

                    $("#dd_scheme").empty();
                    $("<option />").text("Select Scheme").val("0").appendTo("#dd_scheme");
                    for (var i = 0; i < AdHocScript.TempSchemes.length; i++) {
                        $("<option />").text(AdHocScript.TempSchemes[i].SchemeName).val(AdHocScript.TempSchemes[i].SchemeId).appendTo('#dd_scheme');
                    }
                }

                $("#txt_Mobilization_Amount").val(arrItems.MobilizationAmount);
                $('#dd_Amount_Basis').val(arrItems.AmountBasisName);
                if (arrItems.MemoTypeID == 4) {
                    $("#txt_Payment_Amount_Future").val(arrItems.PaymentAmount);
                    $("#txt_Payment_Amount_Mobile").val('');
                }
                else {
                    $("#txt_Payment_Amount_Future").val('');
                    $("#txt_Payment_Amount_Mobile").val(arrItems.PaymentAmount);
                }
                $("#txt_Rate").val(arrItems.Rate);
                $("#txt_Free_Text_Field_01").val(arrItems.FreeTextField1);
                $("#txt_Free_Text_Field_02").val(arrItems.FreeTextField2);
                $("#txt_remarks").text(arrItems.Remarks);
                $('#dd_scheme').val(arrItems.SchemeId);


                if (parseInt($('#dd_branch').val()) > 0) {
                    $('#btn_save_adhoc').attr('disabled', false);
                }
                else {
                    $('#btn_save_adhoc').attr('disabled', true);
                }

            }
        });

        $('#dd_branch').focus();
    },


    RefreshAdHocGridDetails: function () {
        Utility.ListSearchText = '';
        AdHocScript.GetAdHocGridDetails(0, 0);
    },

    isAlphabet: function (str) {
        return /^[a-zA-Z]+$/.test(str);
    },

};

$(function () {

    /// Default Load values to Controls
    AdHocScript.GetSchemeCategory();
    AdHocScript.GetSubRegion();
    AdHocScript.GetMemoTypes(3); // 3=> AdHoc in MemoType Table
    AdHocScript.ChangesOnPaymentType(3);
    AdHocScript.GetARN("", 0);
    AdHocScript.GetARNName("", 0);
    $("<option />").text("Select Scheme").val("0").appendTo("#dd_scheme");

    $("ul.btm-nav-ul li").removeClass("active");
    $(".btm-nav-ul-li-nav_create").addClass("active");
    $('#modal_adhoc_payment_record').modal('hide');


    $("#dt_from").datepicker({
        dateFormat: 'dd/mm/y',
        changeMonth: true,
        changeYear: true,
        onSelect: function (selectedDate) {
            $("#dt_to").datepicker({
                dateFormat: 'dd/mm/y',
                changeMonth: true,
                changeYear: true,
                onSelect: function (selectedDate) {
                    if ($("#dt_to").val() != undefined && $("#dt_to").val() != "")
                        AdHocScript.CheckDistributor_AUM_Gross_Sales();
                }
            });
            $("#dt_to").attr('disabled', false);
            $("#dt_to").datepicker("option", "maxDate", '+0m +0w');
            $("#dt_to").datepicker("option", "minDate", selectedDate);

            if ($("#dt_from").val() != undefined && $("#dt_from").val() != "")
                AdHocScript.CheckDistributor_AUM_Gross_Sales();
        }
    });

    $("#dt_from").datepicker("option", "minDate", '01/01/14');
    $("#dt_from").datepicker("option", "maxDate", '+0m +0w');

    $('.txt_Mobilization_Amount_keypress').keypress(function (event) {
        //var regEx = '/[^\d,.-]/g';
        //event.char.replace(/[^\d,.-]/g, '')
        var charCode = (event.which) ? event.which : event.keyCode
        var TempMobAmount = $('#txt_Mobilization_Amount').val().split(',');
        var TempMobilizationamount = '';


        if (charCode == 44 || charCode == 46) {
            var dotindex = $('#txt_Mobilization_Amount').val().lastIndexOf('.');
            var commaindex = $('#txt_Mobilization_Amount').val().lastIndexOf(',');
            if ($('#txt_Mobilization_Amount').val() != "") {
                if (charCode == 46 && (dotindex > commaindex)) {
                    return false;
                }


                if ($('#txt_Mobilization_Amount').val().substring(($('#txt_Mobilization_Amount').val().length - 1)) == "." || $('#txt_Mobilization_Amount').val().substring(($('#txt_Mobilization_Amount').val().length - 1)) == ",") {
                    return false;
                }
                else {
                    return true;
                }
            }
            else
                return false;
        }
        if (charCode == 46) {
            for (i = 0; i < TempMobAmount.length; i++) {
                if (TempMobAmount[i].split('.').length < 2) {
                    return true;
                }

            }
            return false;
        } // 37 to 40 is Key Values of Up , Down, Right and Left
        if (charCode != 44 && charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            if (charCode != 37 && charCode != 38 && charCode != 39 && charCode != 40) {
                var val = event.key;
                //if (val.replace(/[^\d,.-]/g, '') == '') {

                if (AdHocScript.isAlphabet(val)) {
                    //AdHocScript.CalculatePaymentAmount();
                    return false;
                }
                else {
                    if (event.key == "." || event.key == ",")
                        if ($('#txt_Mobilization_Amount').val().substring(($('#txt_Mobilization_Amount').val().length - 1)) == "." || $('#txt_Mobilization_Amount').val().substring(($('#txt_Mobilization_Amount').val().length - 1)) == ",") {
                            return false;
                        }
                        else {
                            return true;
                        }

                }
            }
            return false;
        }
        else if (charCode != 44 && charCode != 36 && charCode != 190 && charCode != 37 && charCode != 39 && charCode != 32 && charCode != 8 && charCode != 46) {
            for (i = 0; i < TempMobAmount.length; i++) {
                if (TempMobilizationamount != "")
                    TempMobilizationamount += ',' + (AdHocScript.Decimal(TempMobAmount[i])).toString();
                else
                    TempMobilizationamount = (AdHocScript.Decimal(TempMobAmount[i])).toString();
            }
            //$('#txt_Mobilization_Amount').val(TempMobilizationamount);
            AdHocScript.CalculatePaymentAmount();

            var $this = $(this);
            var pos = $this[0].selectionStart;
            var dotSplit = $('#txt_Mobilization_Amount').val().split(".")

            var arrInput = $('#txt_Mobilization_Amount').val().split(",");
            var seperateddot = [];
            if (arrInput.length > 0) {
                var dotarr = arrInput[arrInput.length - 1].split(".");
            }

            if (dotarr.length > 1) {
                for (var dot = 0; dot < dotarr.length; dot++) {
                    if (dotarr[dotarr.length - 1].length >= 2) {
                        return false;
                    }

                }

            }
        }
        else if (charCode == 8 || charCode == 46)
            AdHocScript.CalculatePaymentAmount();
        return true;
    });

    $('#txt_Mobilization_Amount').keyup(function (event) {
        AdHocScript.CalculatePaymentAmount();
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


    $('#txt_Payment_Amount_Future').keypress(function (event) {
        if (AdHocScript.CheckPaymentTypeExists()) {
            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }

            var text = $(this).val();

            if ((text.indexOf('.') != -1) && (text.substring(text.indexOf('.')).length > 2)
                ) {
                event.preventDefault();
            }
        } else {
            alert("Please Select Payment Type");
            $('#txt_Payment_Amount_Future').val('');
            return false;
        }
    });

    $('#txt_Free_Text_Field_01').keyup(function (event) {
        if (!AdHocScript.CheckPaymentTypeExists()) {
            $('#txt_Free_Text_Field_01').val('');
            alert("Please Select Payment Type");
            $('#txt_Free_Text_Field_01').attr("title", '');
            return false;
        }
    });

    $('#txt_Rate').keyup(function (event) {
        if (AdHocScript.CheckPaymentTypeExists()) {
            AdHocScript.CalculatePaymentAmount();
        } else {
            $('#txt_Rate').val('');
            alert("Please Select Payment Type");
            $(this).attr("title", '');
            return false;
        }
    });

    $('#txt_remarks').keydown(function (event) {
        if (!AdHocScript.CheckPaymentTypeExists()) {
            $('#txt_remarks').val('');
            alert("Please Select Payment Type");
            $('#txt_remarks').attr("title", '');
            return false;
        }
    });

    $('.txt_Rate_keypress').keypress(function (event) {
        var charCode = (event.which) ? event.which : event.keyCode
        var $this = $(this);
        var pos = $this[0].selectionStart;
        var inputValue = $(this).val()

        //if (charCode == 46) {
        //    if (inputValue.indexOf('.') < 1) {
        //        return true;
        //    }
        //    return false;
        //}
        //if (charCode == 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        //    return false;
        //}
        //else {
        //    if (inputValue.indexOf('.') != -1) {
        //        if (inputValue.split(".")[1].length <= 1) {
        //            if (isNaN(parseFloat(this.value))) return;
        //            return true;
        //        }
        //        else {
        //            if (pos < inputValue.indexOf('.')) {
        //                return true;
        //            }
        //            else
        //                return false;
        //        }

        //    }
        //}

        if (inputValue.length > 2)
            return false;

        return true;

    });


    $("#div_payment_details_row_Future").attr('hidden', true);

    AdHocScript.PaymentListID = 0;

    AdHocScript.CancelAdHocDetails();


    // Grid Controls

    $grid = $("#grid_sub_processing");
    jQuery("#grid_sub_processing").jqGrid({
        datatype: "local",
        height: 450,
        width: null,
        shrinkToFit: false,
        colNames: ['S.No.', 'ARN No.', 'ARN Name', 'Scheme', 'Channel', 'Branch', 'Period From', 'Period To', 'Amount Basis', 'Rate (Bps)', 'AUM (Lakhs) / Gross Sales (Actual)', 'Payment Amount', 'Actual Amount Payable (Round Off)', 'MemoNumber'],
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
                { name: 'MobilizationAmount', index: 'MobilizationAmount', width: 230, sortable: false },
                { name: 'PaymentAmount', index: 'PaymentAmount', width: 200, sortable: false },
                { name: 'FreeTextField1', index: 'FreeTextField1', width: 200, sortable: false },
                { name: 'MemoNumber', index: 'MemoNumber', width: 150, editable: false, sortable: false }
        ],
    });

    jQuery("#grid_search_result").jqGrid({
        datatype: "local",
        height: 150,
        width: null,
        shrinkToFit: false,
        colNames: ['<input type="checkbox" id="checkAll" >Select</input>', 'S.No.', 'ARN No.', 'ARN Name', 'Scheme', 'Channel', 'Period From', 'Period To', 'Amount Basis', 'Rate (Bps)', 'AUM (Lakhs) / Gross Sales (Actual)', 'Payment Amount', 'Actual Amount Payable (Round Off)', 'Payment Type', 'Branch', 'Raised By', 'MemoTypeID', 'PaymentMemoId', 'PaymentListId'],
        colModel: [
                {
                    name: 'select', width: '80px;', align: 'center', editable: true, sortable: false, hidden: false, formatter: 'checkbox', editoptions: { value: "True:False" }, edittype: "checkbox", formatoptions: { disabled: false },
                    cellattr: function (rowId, val, rawObject) {
                        return " class='cbEmpActive'";
                    }
                },
                { name: 'SerialNo', index: 'SerialNo', width: 70, align: 'center', formatter: AdHocScript.ReturnAdHocDetailHyperLink, sortable: false },
                { name: 'ARNNo', width: 90, index: 'ARNNo', sortable: false },
                { name: 'ARNName', width: 260, index: 'ARNName', sortable: false },
                { name: 'SchemeName', width: 300, index: 'SchemeName', sortable: false },
                { name: 'ChannelName', width: 100, index: 'ChannelName', sortable: false },
                { name: 'DateFrom', width: 120, index: 'DateFrom', align: 'center', sortable: false },
                { name: 'DateTo', width: 110, index: 'DateTo', align: 'center', sortable: false },
                { name: 'AmountBasisName', index: 'AmountBasisName', width: 130, sortable: false },
                { name: 'Rate', index: 'Rate', width: 90, sortable: false },
                { name: 'MobilizationAmount', index: 'MobilizationAmount', width: 250, sortable: false },
                { name: 'PaymentAmount', index: 'PaymentAmount', width: 220, searchtype: "number", sortable: false },
                { name: 'FreeTextField1', index: 'FreeTextField1', width: 250, sortable: false },
                { name: 'MemoTypeName', index: 'MemoTypeName', width: 210, sortable: false },
                { name: 'BranchName', index: 'BranchName', width: 100, sortable: false },
                { name: 'CreatedByName', index: 'CreatedByName', sortable: false },
                { name: 'MemoTypeID', index: 'MemoTypeID', hidden: true, sortable: false },
                { name: 'PaymentMemoId', index: 'PaymentMemoId', hidden: true, sortable: false },
                { name: 'PaymentListId', index: 'PaymentListId', hidden: true, sortable: false }

        ],

        ignoreCase: true,
        viewrecords: true,
        //rowList: [10, 20, 30],
        //pager: '#pgrid_search_result',
        jsonReader: {
            repeatitems: false
        },
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

    //jQuery("#grid_search_result").jqGrid('navGrid', '#pgrid_search_result', { add: false, edit: false, del: false });

    AdHocScript.GetAdHocGridDetails(0, 0);

    var memono = Utility.GetParameterValues('memono');
    if (memono != "" && memono != undefined) {
        AdHocScript.AdHocPaymentDetail(parseInt(memono));
    }

    $('#dd_payment_type').focus();

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