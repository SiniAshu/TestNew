var Mailing = {

    LoadMailingListMaster: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetMailingListMaster', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetMailingListMasterResult;

            $('#grid_mailing_list').jqGrid('clearGridData');
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++)
                    jQuery("#grid_mailing_list").jqGrid('addRowData', data[i].id, data[i]);
            }
            else {
                Utility.writeNotification("norecords", "No Records Found", "", false);
            }
        });
    },

    EditMailingList: function (RowId) {
        Mailing.ClearEditScreen();
        var mailli = $("#grid_mailing_list").getRowData(RowId);
        $('#hidden_mailing_list_id').val(mailli.MailingListId);
        $('#txt_list_name').val(mailli.ListName);
        $('#txt_description').val(mailli.Description);
        $('#dt_effective').val(mailli.EffectiveDate);

        var toemail = mailli.EmailTo.split(',');
        $.each(toemail, function (key, value) {
            if (value != "") {
                $("#txt_to").tokenInput("add", { id: value, name: value });
            }
        });

        var ccemail = mailli.EmailCC.split(',');
        $.each(ccemail, function (key, value) {
            if (value != "") {
                $("#txt_cc").tokenInput("add", { id: value, name: value });
            }
        });

        var ccemail = mailli.EmailBCC.split(',');
        $.each(ccemail, function (key, value) {
            if (value != "") {
                $("#txt_bcc").tokenInput("add", { id: value, name: value });
            }
        });

        $('#mdl_Edit').modal('show');
    },

    DeleteMailingList: function (RowId) {
        if (confirm("Are you sure you want to delete!")) {
            var ret = $("#grid_mailing_list").getRowData(RowId);
            var MailingListId = ret.MailingListId;
            Utility.ServiceCall("POST", 'MasterService.svc/DeleteMailingListMaster', JSON.stringify({ MailingListId: MailingListId }), "json", false, false, function (result) {
                Utility.writeNotification("error", "Role Deleted Successfully", "", false);
                Mailing.LoadMailingListMaster();
            });
        }
    },

    AddNewMailingList: function () {
        Mailing.ClearEditScreen();
        $('#mdl_Edit').modal('show');
    },

    ClearEditScreen: function () {
        $('#hidden_mailing_list_id').val("0");
        $('#txt_list_name').val("");
        $('#txt_description').val("");
        $('#txt_cc').tokenInput('clear');
        $('#txt_bcc').tokenInput('clear');
        $('#txt_to').tokenInput('clear');
        $('#dt_effective').val("");
    },

    Cancel: function () {
        Mailing.ClearEditScreen();
        $('#mdl_Edit').modal('hide');
    },

    SaveMailingList: function () {
        if(Mailing.isvalid()){
            var mailinglist = {};
            mailinglist.MailingListId = $('#hidden_mailing_list_id').val() == "" ? 0 : $('#hidden_mailing_list_id').val();
            mailinglist.ListName = $('#txt_list_name').val();
            mailinglist.Description = $('#txt_description').val();
            mailinglist.EffectiveDate = $('#dt_effective').val();

            var totoken = $("#txt_to").tokenInput("get");
            var Tonames = [];
            $.each(totoken, function (i, obj) {
                Tonames.push(obj.name);
            });

            mailinglist.EmailTo = Tonames.toString();

            var cctoken = $("#txt_cc").tokenInput("get");
            var ccnames = [];
            $.each(cctoken, function (i, obj) {
                ccnames.push(obj.name);
            });
            mailinglist.EmailCC = ccnames.toString();

            var bcctoken = $("#txt_bcc").tokenInput("get");
            var bccnames = [];
            $.each(bcctoken, function (i, obj) {
                bccnames.push(obj.name);
            });
            mailinglist.EmailBCC = bccnames.toString();
            mailinglist.IsActive = 1;
            Utility.ServiceCall("POST", 'MasterService.svc/Insert_Update_MailingList_Master', JSON.stringify({ InputData: mailinglist }), "json", false, false, function (result) {
                if (mailinglist.MailingListId == 0)
                    Utility.writeNotification("success", "Mailing List Inserted Successfully", "", false);
                else
                    Utility.writeNotification("success", "Mailing List Updated Successfully", "", false);

                $('#mdl_Edit').modal('hide');

                Mailing.LoadMailingListMaster();
            });
        }
    },

    isvalid:function(){
        var error = "";
        if($('#txt_list_name').val() == ""){
            error += "List Name is Required. <br/>"
        }

        var totoken = $("#txt_to").tokenInput("get");
        var Tonames = [];
        $.each(totoken, function (i, obj) {
            Tonames.push(obj.name);
        });

        var cctoken = $("#txt_cc").tokenInput("get");
        var ccnames = [];
        $.each(cctoken, function (i, obj) {
            ccnames.push(obj.name);
        });

        var bcctoken = $("#txt_bcc").tokenInput("get");
        var bccnames = [];
        $.each(bcctoken, function (i, obj) {
            bccnames.push(obj.name);
        });
        if (Tonames.toString() == "" && ccnames.toString() == "" && bccnames.toString() == "") {
            error += "To/CC/BCC is required. <br/>"
        }

        if ($('#dt_effective').val() == "") {
            error += "Effective Date is Required. <br/>"
        }


        if (error == "")
            return true;
        else {
            Utility.writeNotification("warning", error, "", true);
            return false;
        }
    },

    GetToMailId: function () {
        Utility.ServiceCall("POST", 'MasterService.svc/GetDistributorEmailTo', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            var arrItemsTo = [];
            $("#txt_to").empty();
            arrItemsTo = JSON.parse(result.GetDistributorEmailToResult);
            $("#txt_to").tokenInput(
            arrItemsTo,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10, allowFreeTagging: true
            });
        });
    },

    GetCCMailId: function () {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/getmailinglistobject', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            var arrItemsCC = [];
            $("#txt_cc").empty();
            arrItemsCC = JSON.parse(result.getmailinglistobjectResult);
            $("#txt_cc").tokenInput(
            arrItemsCC,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10, allowFreeTagging: true
            });
        });
    },

    GetBCCMailId: function () {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/getmailinglistobject', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            var arrItemsCC = [];
            $("#txt_bcc").empty();
            arrItemsCC = JSON.parse(result.getmailinglistobjectResult);
            $("#txt_bcc").tokenInput(
            arrItemsCC,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10, allowFreeTagging: true
            });
        });
    },

}

$(function () {
    $("#grid_mailing_list").jqGrid({
        height: 400,
        datatype: "local",
        width: null,
        shrinkToFit: false,
        //sortable: true,
        rowNum: -1,
        colNames: ['Action', 'Reference ID', 'List Name', 'Description', 'To', 'CC', 'BCC', 'Effective Date', 'Created By', 'Modified By'],
        colModel: [
                    { name: 'act', index: 'act', width: 80, align: 'center', sortable: false },
                    { name: 'MailingListId', index: 'MailingListId', align: 'center', sortable: false },
                    { name: 'ListName', index: 'ListName', sortable: false },
                    { name: 'Description', index: 'Description', sortable: false },
                    { name: 'EmailTo', index: 'EmailTo', sortable: false },
                    { name: 'EmailCC', index: 'EmailCC', sortable: false },
                    { name: 'EmailBCC', index: 'EmailBCC', sortable: false },
                    { name: 'EffectiveDate', index: 'EffectiveDate', sortable: false },
                    { name: 'CreatedByName', index: 'CreatedByName', sortable: false },
                    { name: 'ModifiedByName', index: 'ModifiedByName', sortable: false },
        ],
        gridComplete: function () {
            var ids = jQuery("#grid_mailing_list").jqGrid('getDataIDs');
            for (var i = 0; i < ids.length; i++) {
                var cl = ids[i];
                be = "<a  href='#' onclick=\"Mailing.EditMailingList('" + cl + "');\" ><i class='fa fa-pencil blue'></i> </a>&nbsp;&nbsp;";
                de = "<a  href='#' onclick=\"Mailing.DeleteMailingList('" + cl + "');\"><i class='fa  fa-trash-o red '></i> </a>";
                jQuery("#grid_mailing_list").jqGrid('setRowData', ids[i], { act: be + de });
                $("#" + $('#grid_mailing_list').jqGrid('getGridParam', 'selrow')).focus();
            }
        }, cmTemplate: { title: false },
    });

    $("#dt_effective").datepicker({
        dateFormat: 'dd/mm/y',
        changeMonth: true,
        changeYear: true,
    });
    Mailing.LoadMailingListMaster();
    Mailing.GetToMailId();
    Mailing.GetCCMailId();
    Mailing.GetBCCMailId();
});