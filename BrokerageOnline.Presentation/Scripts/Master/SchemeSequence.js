var SchemeSequence = {
    TempOrderArray: [],
    TempOrderCatArray: [],
    TempSchemeCategory: [],
    TempMainArray: [],
    Temp_Scheme_Modify_Array: [],

    SaveScheme: function () {
        var OrderSchemeCat = '';
        var PaymentMemoparam = {};
        var SaveSchemeList = [];
        var SaveSchemeCategoryList = [];
        SchemeSequence.TempOrderArray = [];


        if (SchemeSequence.Temp_Scheme_Modify_Array.length > 0 && SchemeSequence.TempOrderCatArray.length == 0) {
            SchemeSequence.TempOrderCatArray = $('#SCHCAT_singleTrack').sortable('toArray');
        }


        for (var i = 0; i < SchemeSequence.TempOrderCatArray.length; i++) {
            var t_array = [];

            t_array = $('#' + SchemeSequence.TempOrderCatArray[i]).sortable('toArray');

            for (var j = 0; j < t_array.length; j++) {
                SchemeSequence.TempOrderArray.push(t_array[j]);
            }
        }


        var SaveSchemeList = [];
        for (var i = 0; i < SchemeSequence.TempOrderArray.length; i++) {
            PaymentMemoparam = {};
            PaymentMemoparam["SchemeId"] = SchemeSequence.TempOrderArray[i];
            PaymentMemoparam["SchemeSequence"] = parseInt([i]) + 1;
            SaveSchemeList.push(PaymentMemoparam);
        }



        var SaveSchemeCategoryList = [];
        for (var i = 0; i < SchemeSequence.TempOrderCatArray.length; i++) {
            for (var j = 0; j < SchemeSequence.TempSchemeCategory.length; j++) {
                if (SchemeSequence.TempOrderCatArray[i] == SchemeSequence.TempSchemeCategory[j].SchemeCategoryId) {
                    PaymentMemoparam = {};
                    PaymentMemoparam["SchemeCategoryId"] = SchemeSequence.TempSchemeCategory[j].SchemeCategoryId;
                    PaymentMemoparam["CategorySequence"] = parseInt([i]) + 1;
                    SaveSchemeCategoryList.push(PaymentMemoparam);
                    break;
                }
            }
        }


        if (SaveSchemeList.length > 0) {
            Utility.ServiceCall("POST", 'MasterService.svc/UpdateSchemeSequence', JSON.stringify({ SchemeList: SaveSchemeList, SchemeCategoryList: SaveSchemeCategoryList }), "json", false, false, function (result) {
                var res = result.UpdateSchemeSequenceResult;
                if (res == true)
                    Utility.writeNotification("success", "Scheme Sequence Updated Successfully.", "", true);
            });
        }
    },

    CancelScheme: function () {
        $('#SCHCAT_singleTrack').empty();
        loadSchemes();

    },

}
$(function () {
    loadSchemes();
   
});

function loadSchemes() {
    var SelectedSchemeCategory = [];
    Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetScheme', JSON.stringify({ SearchText: '', MemoTypeId: "0" }), "json", false, false, function (result) {
        var arrItems = result.GetSchemeResult;


        SchemeSequence.TempMainArray = arrItems;
        for (var i = 0; i < arrItems.length; i++) {
            SelectedSchemeCategory.push(arrItems[i].SchemeCategoryName);
        }

        SelectedSchemeCategory = Utility.removeDuplicates(SelectedSchemeCategory);

        for (var i = 0; i < SelectedSchemeCategory.length; i++) {

            for (var j = 0; j < arrItems.length; j++) {
                if (SelectedSchemeCategory[i] == arrItems[j].SchemeCategoryName) {
                    var PaymentMemoparam = {};
                    PaymentMemoparam["SchemeCategoryId"] = arrItems[j].SchemeCategoryId;
                    PaymentMemoparam["SchemeCategoryName"] = arrItems[j].SchemeCategoryName;
                    SchemeSequence.TempSchemeCategory.push(PaymentMemoparam);
                    break;
                }
            }

        }

    });

    for (var i = 0; i < SchemeSequence.TempSchemeCategory.length; i++) {
        var main_tagdiv = $('<div/>', {
            class: "row mr-top-02 input-text-bx-style content Schemecattrack c-round",
            html: SchemeSequence.TempSchemeCategory[i].SchemeCategoryName,
            id: SchemeSequence.TempSchemeCategory[i].SchemeCategoryId
        });


        for (var j = 0; j < SchemeSequence.TempMainArray.length; j++) {
            if (SchemeSequence.TempMainArray[j].SchemeCategoryId == SchemeSequence.TempSchemeCategory[i].SchemeCategoryId) {
                var tagdiv = $('<div/>', {
                    class: "input-text-bx-style rightcolumn Schemetrack c-round",
                    style: "font-size:14px; height:25px",
                    html: SchemeSequence.TempMainArray[j].SchemeName,
                    id: SchemeSequence.TempMainArray[j].SchemeId
                });
                main_tagdiv.append(tagdiv);
            }
        }

        $(".SchemeCategorySortable").append(main_tagdiv);
    }

    $(".Schemetrack").sortable();
    $(".Schemecattrack").sortable();
    //SchemeCategorySortable


    $('.Schemecattrack').sortable({
        update: function (event, ui) {
            SchemeSequence.Temp_Scheme_Modify_Array = $(this).sortable('toArray');
        }
    });

    $('#SCHCAT_singleTrack').sortable({
        update: function (event, ui) {
            SchemeSequence.TempOrderCatArray = $(this).sortable('toArray');
        }
    });
}