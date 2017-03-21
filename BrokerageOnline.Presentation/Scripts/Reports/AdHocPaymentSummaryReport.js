var AdHocPaymentReport = {
    GetDistributorCategory: function (SearchText) {
        var arr = SearchText == "" ? "" : SearchText.toString();

        arr = JSON.stringify(arr)

        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorCategory', '{"SearchText": ' + arr + '}', "json", false, false, function (result) {
            var arrItems = result.GetDistributorCategoryResult;
            $("#dd_distcategory").multiselect('destroy');
            $("#dd_distcategory").empty();
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].DistributorCategoryName).val(arrItems[i].DistributorCategoryId).appendTo('#dd_distcategory');
            }

            $('#dd_distcategory').attr("multiple", "multiple");
            $('#dd_distcategory').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true, 
            });
            $('#dd_distcategory').multiselect('clearSelection');
        });
    },
    GetMemoTypes: function (MemoParentID) {
        Utility.ServiceCall("POST", 'AdHocService.svc/GetMemoTypes', JSON.stringify({ MemoParentID: parseInt(MemoParentID) }), "json", false, false, function (result) {
            var arrItems = result.GetMemoTypesResult;

            $("#dd_memotype").multiselect('destroy');
            $("#dd_memotype").empty();
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].MemoTypeName).val(arrItems[i].MemoTypeId).appendTo('#dd_memotype');
            }

            $('#dd_memotype').attr("multiple", "multiple");
            $('#dd_memotype').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true
            });
            $('#dd_memotype').multiselect('clearSelection');

        });
    },

    GetARN: function () {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARN', JSON.stringify({ SearchText: "", SubregionID: 0 }), "json", false, false, function (result) {
             
            $("#txt_arn_info").empty();
            $(".token-input-list-facebook").remove();
            $("#txt_arn_info").tokenInput(
            JSON.parse(result.GetARNResult),
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
            });

            $('#dd_arn').multiselect('clearSelection');
        });
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

            });
            $('#dd_channel').multiselect('clearSelection');
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
                enableCaseInsensitiveFiltering: true,

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

    GetMemoStatus: function () {
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


    PrintDetails: function () {
        if ($('#dt_from').val() != "" && $('#dt_to').val() != "") {
            var param = "";
            var FileURL = Utility.AdhocSummaryReport;
            var Channel, DistributorCategory, ARN, SchemeCategory, Scheme, Zone, Branch, MemoType, MemoStatus, PeriodFrom, PeriodTo, CreatedBy;

            Channel = Utility.ReturnSelectedValue('dd_channel');
            DistributorCategory = Utility.ReturnSelectedValue('dd_distcategory');
            SchemeCategory = Utility.ReturnSelectedValue('dd_Scheme_category');
            Scheme = Utility.ReturnSelectedValue('dd_Scheme');
            MemoType = Utility.ReturnSelectedValue('dd_memo_type');
            MemoStatus = Utility.ReturnSelectedValue('dd_Memo_status');
            Zone = Utility.ReturnSelectedValue('dd_zone');
            Branch = Utility.ReturnSelectedValue('dd_branch');


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
            param += 'DateFrom_P=' + from + '&DateTo_P=' + to;

            if (Channel != "" && Channel != undefined)
                param += '&' + Utility.GetReportQuery('Channel_P', Channel);
            if (DistributorCategory != "" && DistributorCategory != undefined)
                param += '&' + Utility.GetReportQuery('Dist_P', DistributorCategory);
            if (ARN != "" && ARN != undefined)
                param += '&' + Utility.GetReportQuery('Arn_P', ARN);
            if (SchemeCategory != "" && SchemeCategory != undefined)
                param += '&' + Utility.GetReportQuery('SchemeCat_P', SchemeCategory);
            if (Scheme != "" && Scheme != undefined)
                param += '&' + Utility.GetReportQuery('Scheme_P', Scheme);
            if (MemoType != "" && MemoType != undefined)
                param += '&' + Utility.GetReportQuery('MemoType_P', MemoType);
            if (MemoStatus != "" && MemoStatus != undefined)
                param += '&' + Utility.GetReportQuery('MemoStatus_P', MemoStatus);
            if (Zone != "" && Zone != undefined)
                param += '&' + Utility.GetReportQuery('Zone_P', Zone);
            if (Branch != "" && Branch != undefined)
                param += '&' + Utility.GetReportQuery('Branch_P', Branch);

            FileURL = FileURL.replace("###INPUT###", param);


            Utility.openWin(FileURL);
        }
        else {
            Utility.writeNotification("warning", "Enter Date From and Date To", "", true);
        }
    },

};

$(function () {
    AdHocPaymentReport.GetDistributorCategory('');
    AdHocPaymentReport.GetMemoTypes(0);
    AdHocPaymentReport.GetARN();
    AdHocPaymentReport.GetChannel('');
    AdHocPaymentReport.LoadZone();
    AdHocPaymentReport.GetScheme('');
    AdHocPaymentReport.GetSchemeCategory('');
    AdHocPaymentReport.GetMemoStatus();


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
            $("#dt_to").datepicker("option", "maxDate", '+0m +0w');
            $("#dt_to").datepicker("option", "minDate", selectedDate);
        }
    });

    $("#dt_from").datepicker("option", "maxDate", '+0m +0w');

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