var schemewisesummary = {
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
            $("<option />").text("Select Channel").val("0").appendTo("#dd_channel");
            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].ChannelName).val(arrItems[i].ChannelId).appendTo("#dd_channel");
            }
        });
    },


    LoadUsers: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetUserView', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var arrItems = result.GetUserViewResult;
            $("<option />").text("Select Raised By").val("0").appendTo("#dd_Created_By");

            for (var i = 0; i < arrItems.length; i++) {
                if (arrItems[i].FullName != '')
                    $("<option />").text(arrItems[i].FullName).val(arrItems[i].UserId).appendTo('#dd_Created_By');
            }

        });
    },

    GetMemoStatus: function () {
        var arrItems = ['Saved', 'Initiated', 'Reviewed', 'Approved', 'Discarded', 'Active', 'InActive'];
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
        if ($('#dt_periodfrom').val() != "" && $('#dt_periodto').val() != "") {
            var param = "";
            var FileURL = Utility.SchemeCatWiseReportURL;
            var Channel, DistributorCategory, ARN, SchemeCategory, Scheme, Zone, Branch, MemoType, MemoStatus, PeriodFrom, PeriodTo, CreatedBy;

            DistributorCategory = Utility.ReturnSelectedValue('dd_dist_category');
            MemoType = Utility.ReturnSelectedValue('dd_memo_type');
            CreatedBy = $('#dd_Created_By option:selected').val();
            Channel = $('#dd_channel option:selected').val();
            MemoStatus = Utility.ReturnSelectedValue('dd_Memo_status');
            //CreatedBy = Utility.ReturnSelectedValue('dd_Created_By');
            //Channel = Utility.ReturnSelectedValue('dd_channel');

            /////Get selected ARN/////////
            var token = $("#txt_arn_info").tokenInput("get");
            var names = [];
            $.each(token, function (i, obj) {
                names.push(obj.name);//build an array of just the names
            });
            ARN = names.toString();
            var from = "";
            var to = "";

            var datefrom = $('#dt_periodfrom').val().split('/');
            var dateto = $('#dt_periodto').val().split('/');
            if (datefrom.length > 1)
                from = '20' + datefrom[2] + '-' + datefrom[1] + '-' + datefrom[0];
            if (dateto.length > 1)
                to = '20' + dateto[2] + '-' + dateto[1] + '-' + dateto[0];
            param += 'From_P=' + from + '&To_P=' + to;

            if (DistributorCategory != "" && DistributorCategory != undefined)
                param += '&' + Utility.GetReportQuery('Dist_P', DistributorCategory);
            if (parseInt(Channel) > 0)
                param += '&' + Utility.GetReportQuery('Chnl_P', Channel);
            if (ARN != "" && ARN != undefined)
                param += '&' + Utility.GetReportQuery('Arn_P', ARN);
            if (parseInt(CreatedBy) > 0)
                param += '&' + Utility.GetReportQuery('Rais_P', CreatedBy);
            if (MemoType != "" && MemoType != undefined)
                param += '&' + Utility.GetReportQuery('Memo_P', MemoType);
            if (MemoStatus != "" && MemoStatus != undefined)
                param += '&' + Utility.GetReportQuery('MemoStatus_P', MemoStatus);

            FileURL = FileURL.replace("###INPUT###", param);

            Utility.openWin(FileURL);
        }
        else {
            Utility.writeNotification("warning", "Enter Date From and Date To", "", true);
        }
    },

};

$(function () {
    schemewisesummary.GetDistributorCategory('');
    schemewisesummary.GetMemoTypes(0);
    schemewisesummary.GetARN();
    schemewisesummary.GetChannel('');
    schemewisesummary.LoadUsers();
    schemewisesummary.GetMemoStatus();


    $("#dt_periodfrom").datepicker({
        dateFormat: 'dd/mm/y',
        changeMonth: true,
        changeYear: true,
        onSelect: function (selectedDate) {
            $("#dt_periodto").datepicker({
                dateFormat: 'dd/mm/y',
                changeMonth: true,
                changeYear: true
            });
            $("#dt_periodto").attr('paabled', false);
            $("#dt_periodto").datepicker("option", "maxDate", '+0m +0w');
            $("#dt_periodto").datepicker("option", "minDate", selectedDate);
        }
    });

    $("#dt_periodfrom").datepicker("option", "maxDate", '+0m +0w');

    $('#dt_periodfrom').keydown(function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 9) {
            return false;
        }
    });

    $('#dt_periodto').keydown(function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 9) {
            return false;
        }
    });

});