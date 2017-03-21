var BrokerageNotes = {
    AddNewNotes: function () {
        BrokerageNotes.ClearEditScreen();
        $('#mdl_Edit_Role').modal('show');

    },

    ClearEditScreen: function () {
        $('#hidden_notes_id').val("");
        $('#dd_memotype').val("1");
        $('#dd_memoformattype').multiselect('clearSelection');
        $('#dd_channel').multiselect('clearSelection');
        $('#dd_dist_category').multiselect('clearSelection');
        $("#dt_effective").val("");
        $('#txt_notes').val("");
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

                    BrokerageNotes.GetDistributorCategory(selected.valueOf());
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

            });

        });
    },

    LoadNotes: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetBrokerageNotes', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetBrokerageNotesResult;

            $('#grid_role').jqGrid('clearGridData');
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++)
                    jQuery("#grid_role").jqGrid('addRowData', data[i].id, data[i]);
            }
            else {
                Utility.writeNotification("error", "No Records Found", "", true);
            }
        });
    },

    LoadMemoTypes: function () {
        var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetMemoTypes', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetMemoTypesResult;
            $("#dd_memotype").empty();
            for (var i = 0; i < data.length; i++) {
                $("<option />").text(data[i].MemoTypeName).val(data[i].MemoTypeId).appendTo("#dd_memotype");
            }
        });

        search = "format";
        Utility.ServiceCall("POST", 'MasterService.svc/GetMemoTypes', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {


            var arrItems = result.GetMemoTypesResult;
            $("#dd_memoformattype").multiselect('destroy');
            $("#dd_memoformattype").empty();

            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].MemoTypeName).val(arrItems[i].MemoTypeId).appendTo("#dd_memoformattype");
            }
            $('#dd_memoformattype').attr("multiple", "multiple");
            $('#dd_memoformattype').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
            });
            $('#dd_memoformattype').multiselect('clearSelection');

        });

    },

    EditNotes: function (RowId) {
        var ret = $("#grid_role").getRowData(RowId);

        $('#hidden_notes_id').val(ret.NotesId);
        $('#dd_memotype').val(ret.MemoTypeId);

        $('#dd_memoformattype').multiselect('clearSelection');
        $('#dd_channel').multiselect('clearSelection');
        $('#dd_dist_category').multiselect('clearSelection');


        //$('#dd_memoformattype').val(ret.MemoFormatId);
        var MemoFormatId = ret.MemoFormatId.split(',');
        for (var i = 0; i < MemoFormatId.length; i++) {
            if (MemoFormatId[i] != "") {
                $('#dd_memoformattype').multiselect('select', MemoFormatId[i]);
            }
        }

        var ChannelId = ret.ChannelId.split(',');
        for (var i = 0; i < ChannelId.length; i++) {
            if (ChannelId[i] != "") {
                $('#dd_channel').multiselect('select', ChannelId[i]);
            }
        }

        BrokerageNotes.GetDistributorCategory(ChannelId.toString());


        var DistCatID = ret.DistributorCategoryId.split(',');
        for (var i = 0; i < DistCatID.length; i++) {
            if (DistCatID[i] != "") {
                $('#dd_dist_category').multiselect('select', DistCatID[i]);
            }
        }
        $("#dt_effective").val(ret.EffectiveDate);
        $('#txt_notes').val(ret.BrkgNotes);
        $('#mdl_Edit_Role').modal('show');

    },

    DeleteNotes: function (RowId) {
        if (confirm("Are you sure you want to delete!")) {
            var ret = $("#grid_role").getRowData(RowId);
            var NotesId = ret.NotesId;
            Utility.ServiceCall("POST", 'MasterService.svc/DeleteBrokerageNotes', JSON.stringify({ NotesId: NotesId }), "json", false, false, function (result) {
                Utility.writeNotification("error", "Brokerage Notes Deleted Successfully", "", false);
                BrokerageNotes.LoadNotes();
            });
        }
    },

    SaveNotes: function () {
        if (BrokerageNotes.NotesValid()) {
            var Notes = {};
            Notes.NotesId = $('#hidden_notes_id').val() == "" ? 0 : $('#hidden_notes_id').val();
            Notes.MemoTypeId = $('#dd_memotype').val();

            var memoformattype = $('#dd_memoformattype option:selected');
            var memoformattypeselected = [];
            $(memoformattype).each(function () {
                memoformattypeselected.push([$(this).val()]);
            });

            Notes.MemoFormatId = memoformattypeselected.toString();//$('#dd_memoformattype').val();

            var Channel = $('#dd_channel option:selected');
            var Channelselected = [];
            $(Channel).each(function () {
                Channelselected.push([$(this).val()]);
            });

            Notes.ChannelId = Channelselected.toString();

            var Dist_cat = $('#dd_dist_category option:selected');
            var Dist_catselected = [];
            $(Dist_cat).each(function () {
                Dist_catselected.push([$(this).val()]);
            });

            Notes.DistributorCategoryId = Dist_catselected.toString();
            Notes.EffectiveDate = $('#dt_effective').val();
            Notes.BrkgNotes = $('#txt_notes').val();
            Utility.ServiceCall("POST", 'MasterService.svc/Insert_Update_BrokerageNotes', JSON.stringify({ InputData: Notes }), "json", false, false, function (result) {
                var SavedResult = result.Insert_Update_BrokerageNotesResult;

                if (SavedResult.toString() == "Insert Successfully" || SavedResult.toString() == "Update Successfully") {
                    Utility.writeNotification("success", "Notes " + SavedResult.toString(), "", true);
                    $('#mdl_Edit_Role').modal('hide');
                    BrokerageNotes.LoadNotes();
                }
                else if (SavedResult.toString() != '')
                    Utility.writeNotification("warning", SavedResult.toString(), "", true);
                //if (Notes.NotesId == 0)
                //    Utility.writeNotification("success", "Notes Inserted Successfully", "", false);
                //else
                //    Utility.writeNotification("success", "Notes Updated Successfully", "", false);
            });

        }
    },

    NotesValid: function () {
        var error = "";
        if ($('#dd_memotype').val().toString() == "")
            error += "Memo Type Required. <br/>"

        //if ($('#dd_memoformattype').val() == "")
        //    error += "Memo Format Required <br/>"

        var memoformattype = $('#dd_memoformattype option:selected');
        var memoformattypeselected = [];
        $(memoformattype).each(function () {
            memoformattypeselected.push([$(this).val()]);
        });

        var Channel = $('#dd_channel option:selected');
        var Channelselected = [];
        $(Channel).each(function () {
            Channelselected.push([$(this).val()]);
        });

        var Dist_cat = $('#dd_dist_category option:selected');
        var Dist_catselected = [];
        $(Dist_cat).each(function () {
            Dist_catselected.push([$(this).val()]);
        });

        if (memoformattypeselected.toString() == "")
            error += "Memo Format Required. <br/>"

        if (Channelselected.toString() == "")
            error += "Channel Required. <br/>"

        if (Dist_catselected.toString() == "")
            error += "Distributor Category Required. <br/>"

        if ($('#txt_notes').val() == "")
            error += "Description Required. <br/>"

        if ($("#dt_effective").val() == "")
            error += "Effective Date Required. <br/>"

        if (error == "")
            return true;
        else {
            Utility.writeNotification("warning", error, "", true);
            return false;
        }
    },

    Cancel: function () {
        BrokerageNotes.ClearEditScreen();
        $('#mdl_Edit_Role').modal('hide');
    },


}



$(function () {
    BrokerageNotes.LoadMemoTypes();
    BrokerageNotes.GetChannel("");
    BrokerageNotes.GetDistributorCategory("");
    $("#grid_role").jqGrid({
        height: 400,
        datatype: "local",
        width: null,
        shrinkToFit: false,
        //sortable: true,
        rowNum: -1,
        colNames: ['Action', 'Reference ID', 'MemoTypeId', 'MemoFormatId', 'Memo Type Name', 'Memo Format', 'ChannelID', 'Channel', 'DistCatid', 'Distributor Category', 'Brokerage Notes', 'Effective Date'],
        colModel: [
                    { name: 'act', index: 'act', align: 'center', sortable: false },
                    { name: 'NotesId', index: 'NotesId', align: 'center', sortable: false },
                    { name: 'MemoTypeId', index: 'MemoTypeId', hidden: true, sortable: false },
                    { name: 'MemoFormatId', index: 'MemoFormatId', hidden: true, sortable: false },
                    { name: 'MemoTypeName', index: 'MemoTypeName', sortable: false },
                    { name: 'Memoformat', index: 'Memoformat', sortable: false },
                    { name: 'ChannelId', index: 'ChannelId', hidden: true, sortable: false },
                    { name: 'ChannelName', index: 'ChannelName', sortable: false },
                    { name: 'DistributorCategoryId', index: 'DistributorCategoryId', hidden: true, sortable: false },
                    { name: 'DistributorCategoryName', index: 'DistributorCategoryName', sortable: false },
                    { name: 'BrkgNotes', index: 'BrkgNotes', sortable: false },
                     { name: 'EffectiveDate', index: 'EffectiveDate', sortable: false },
        ],
        gridComplete: function () {
            var ids = jQuery("#grid_role").jqGrid('getDataIDs');
            for (var i = 0; i < ids.length; i++) {
                var cl = ids[i];
                be = "<a  href='#' onclick=\"BrokerageNotes.EditNotes('" + cl + "');\" ><i class='fa fa-pencil blue'></i> </a>&nbsp;&nbsp;";
                de = "<a  href='#' onclick=\"BrokerageNotes.DeleteNotes('" + cl + "');\"><i class='fa  fa-trash-o red '></i> </a>";
                jQuery("#grid_role").jqGrid('setRowData', ids[i], { act: be + de });
                $("#" + $('#grid_role').jqGrid('getGridParam', 'selrow')).focus();
            }
        }, cmTemplate: { title: false },
    });

    $("#dt_effective").datepicker({
        dateFormat: 'dd/mm/y',
        changeMonth: true,
        changeYear: true,
    });

    BrokerageNotes.LoadNotes();
});