var CreateTieUp = {
    arns: [],

    arnName: [],

    TieupCount: [],

    clearFields: function () {
        sessionStorage.removeItem("DistributorCategory");
        sessionStorage.removeItem("Channel");
        sessionStorage.removeItem("ARN");
        sessionStorage.removeItem('SchemeSelected');
        sessionStorage.removeItem('SchemeCategoryselected');

        $('#btn_modify').prop('disabled', true);
        $('#btn_copy').prop('disabled', true);

        $('#txt_arn').tokenInput('clear');
        $('#dd_dist_category').multiselect('clearSelection');
        $('#dd_channel').multiselect('clearSelection');
        $('#dd_Scheme_category').multiselect('clearSelection');
        $('#dd_Scheme').multiselect('clearSelection');
        $('#dt_from').val('');
        $('#dt_to').val('');

        $('#grid_search_result').jqGrid('clearGridData');
    },

    CreateNewRackRate: function () {
        var Channel = $('#dd_channel option:selected');
        var Channelselected = [];
        $(Channel).each(function () {
            Channelselected.push([$(this).val()]);
        });

        var Category = $('#dd_dist_category option:selected');
        var Categoryselected = [];
        $(Category).each(function () {
            Categoryselected.push([$(this).val()]);
        });

        var token = $("#txt_arn").tokenInput("get");
        var names = [];
        $.each(token, function (i, obj) {
            names.push(obj.name);//build an array of just the names
        });
        var ARNSelected = names.toString();
        

        var SchemeCategorySelected = [];// = $('#dd_Scheme_category option:selected').val();
        $($('#dd_Scheme_category option:selected')).each(function () {
            SchemeCategorySelected.push([$(this).val()]);
        });

        var localSchemeselected = [];
        $($('#dd_Scheme option:selected')).each(function () {
            localSchemeselected.push([$(this).val()]);
        });
        var error = "";
        if (Channelselected.length != 0)
            error += "Channel Level Memo is not allowed. <br/>";

        var RoleID = sessionStorage.getItem("RoleID");
        if (RoleID == "1" || RoleID == "2" || RoleID == "4" || RoleID == "5") {

            if (names.length == 0 && Categoryselected.length == 0 && Channelselected.length > 0)
                error += "Please select ARN No., that is a mandatory field. <br/>";
            else if (names.length == 0 && Categoryselected.length > 0)
                error += "Please select ARN No., as user is not allowed for category specific memo creation. <br/>";
            else if (names.length > 0 && Categoryselected.length > 0)
                error += "User is not allowed to Create Distributor category and ARN Specific memo. <br/>";
            else if (names.length == 0) {
                error += "Please select ARN No. for creating a memo. <br/>";
            }
        }
        else {
            if (names.length == 0 && Categoryselected.length == 0 && Channelselected.length == 0)
                error += "Please select ARN No/Distributor Category that is a mandatory field. <br/>";
        }
        if (localSchemeselected.toString() == "") {
            error += "Please select Scheme. <br/>";
        }
        else {
            if (localSchemeselected.toString() != "" || SchemeCategorySelected.toString() != "") {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeWithSchemeCategory', JSON.stringify({ Scheme: localSchemeselected.toString(), SchemeCategory: SchemeCategorySelected.toString() }), "json", false, false, function (result) {
                    var data = result.GetSchemeWithSchemeCategoryResult;
                    var schemes = [];
                    for (i = 0; i < data.length; i++) {
                        schemes.push(data[i].SchemeId);
                    }

                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/ValidateSchemeSlabAmount', JSON.stringify({ SchemeID: schemes.toString() }), "json", false, false, function (result) {

                    });
                });
            }

        }

        if (Channelselected.length > 2) {
            error += "Maximum 2 channels are allowed to create a memo. <br/>";
        }
        else {
            if (Categoryselected.length > 0 || ARNSelected != "") {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChannelForARNAndDistributorCategory', JSON.stringify({ ARN: ARNSelected, DistributorCategory: Categoryselected.toString() }), "json", false, false, function (result) {
                    var data = result.GetChannelForARNAndDistributorCategoryResult;
                    if (data.length > 2) {
                        error += "ARN/Distributor Category Belong to more than 2 Channel. <br/>";
                    }
                });
            }
        }
        if ($('#dt_from').val() == '' || $('#dt_to').val() == '') {
            error += "Date From and Date To Required";
        }
        if (error == "") {
            if (Categoryselected.length > 0 || ARNSelected != "") {
                var paymentList = [];
                var ArnNew = CreateTieUp.ARNBasedOnParentChildLogic(localSchemeselected, ARNSelected);
                error += CreateTieUp.ValidateSchemeRates(localSchemeselected, ARNSelected, Categoryselected);
            }
        }
        if (error == "") {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/MemoExists', JSON.stringify({ ArnNo: ARNSelected, Channel: "", DistributorCategory: Categoryselected.toString(), schemeid: localSchemeselected.toString(), DateFrom: $('#dt_from').val(), DateTo: $('#dt_to').val(), MemoId: "0", TransactionType: "", MemoType: "2" }), "json", false, false, function (result) {
                if (result.MemoExistsResult != "")
                    error += result.MemoExistsResult;
            });
        }

        if (error == "") {
            if (!(ARNSelected == "" && Channelselected.toString() == "" && Categoryselected.toString() == "" && (lumpsumSIPType == 0 || lumpsumSIPType == ""))) {
                var RoleID = sessionStorage.getItem("RoleID");
                var Channelcategorydata = Categoryselected;
                if (RoleID == "3" || RoleID == "6" || RoleID == "7" || RoleID == "10") {
                    if (sessionStorage.getItem('Channel') != null) {
                        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChannelDistributorCategory', JSON.stringify({ Channel: Channelselected.toString() }), "json", false, false, function (result) {
                            Channelcategorydata = result.GetChannelDistributorCategoryResult;

                        });

                        if (Channelcategorydata.length > 0) {
                            var catdata = [];
                            for (var cnt = 0; cnt < Channelcategorydata.length; cnt++) {
                                catdata[cnt] = Channelcategorydata[cnt].DistributorCategoryId;
                            }
                        }
                    }
                }
                else {
                    if (Channelcategorydata.length > 0 || ARNSelected != "") {
                        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSlabAvailability', JSON.stringify({ DistributorCategoryID: Channelcategorydata.toString(), Arnno: ARNSelected }), "json", false, false, function (result) {
                            //slabamount = result.GetSlabResult;
                        });
                    }
                }

                sessionStorage.setItem('Channel', Channelselected.toString())
                sessionStorage.setItem('DistributorCategory', Categoryselected.toString())
                sessionStorage.setItem('ARN', ARNSelected)
                sessionStorage.setItem('SchemeSelected', localSchemeselected.toString())
                sessionStorage.setItem('SchemeCategoryselected', SchemeCategorySelected.toString())
                sessionStorage.setItem('DateFrom', $('#dt_from').val())
                sessionStorage.setItem('DateTo', $('#dt_to').val())
                //sessionStorage.setItem('LumpsumSIPType', lumpsumSIPType);


                sessionStorage.removeItem("DistributorCategoryCreate");
                sessionStorage.removeItem("ChannelCreate");
                sessionStorage.removeItem("ARNCreate");
                sessionStorage.removeItem('SchemeSelectedCreate')
                sessionStorage.removeItem('SchemeCategoryselectedCreate')

                sessionStorage.CurrentMenuselected = "nav_information";
                window.location.href = "TieUpInformation.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
            }
            else {
                Utility.writeNotification("error", "Please do a selection ", "", true);
            }
        }
        else { Utility.writeNotification("error", error, "", true); }
        return false;
    },
    ARNBasedOnParentChildLogic: function (localSchemeselected, ARN) {
        var arnIn = ARN.split(',');
        var newArn = [];

        for (var cnt = 0; cnt < arnIn.length; cnt++) {
            if (arnIn[cnt].trim() != "") {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChildArn', JSON.stringify({ ArnNo: arnIn[cnt] }), "json", false, false, function (result) {
                    var Data = result.GetChildArnResult;
                    if (Data.length > 1) {
                        $.each(Data, function (i, obj) {
                            if (obj.DistributorParent == 1) {
                                if ($.inArray(obj.ARN, newArn) == -1) {
                                    newArn.push(obj.ARN)
                                }
                            }
                        });
                    }
                });
            }
        }
        if (newArn.length == 0) {
            return ARN;
        } else
            return newArn.toString();
    },
    GetLumpsumSIPType: function () {
        var search = "";
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetLumpsumSIPType', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetLumpsumSIPTypeResult;
            $("#dd_LumpsumSIPType").empty();
            $("<option />").text('Select').val('0').appendTo("#dd_LumpsumSIPType");
            for (var i = 0; i < data.length; i++) {
                $("<option />").text(data[i].LumpsumSIPName).val(data[i].LumpsumSIPId).appendTo("#dd_LumpsumSIPType");
            }
        });


    },
    CopyRackRate: function () {
        var RoleID = sessionStorage.getItem("RoleID");
        sessionStorage.CurrentMenuselected = "nav_information";
        var memono = sessionStorage.getItem("CopyMemoNo");
        if (sessionStorage.CopyMemoType == "1") {
            if (memono == null || memono == "") {
                Utility.writeNotification("warning", "Select a Memo to Copy", "", true);
                //alert("Select a Memo to Copy");
            }
            else {
                if (sessionStorage.CopyMemoStatus == "Active" || sessionStorage.CopyMemoStatus == "InActive") {
                    if (RoleID == "1" || RoleID == "2" || RoleID == "4" || RoleID == "5") {
                        if (sessionStorage.getItem("ARNNo") == "")
                            Utility.writeNotification("error", "You are not authorized to copy a distributor category memo", "", true);
                        else if (sessionStorage.getItem("DistributorCategoryName").toString().trim() != "")
                            Utility.writeNotification("error", "You are not authorized to copy a distributor category memo", "", true);
                        else {
                            window.location.href = "RackRateInitiate.html?memono=" + memono + "&mode=copy";    //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + memono + "&mode=copy
                            return false;
                        }
                    }
                    else {
                        window.location.href = "RackRateInitiate.html?memono=" + memono + "&mode=copy";   //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + memono + "&mode=copy
                        return false;
                    }
                }
                else {
                    Utility.writeNotification("warning", "Select Active/Inactive Memo to Copy", "", true);
                }
            }
        }
        else {
            Utility.writeNotification("warning", "Select Active/Inactive Rack Rate Memo to Copy", "", true);
        }

    },

    ModifyValidity: function () {
        //sessionStorage.CurrentMenuselected = "nav_information";
        var memono = sessionStorage.getItem("CopyMemoNo");
        $('#div_tie_up_Controls').empty();

        if (memono == null || memono == "") {
            Utility.writeNotification("warning", "Select a Memo to Copy", "", true);
            //alert("Select a Memo to Copy");
        }
        else {
            if (sessionStorage.CopyMemoStatus == "Active") {
                if (sessionStorage.MemoLevel == "F") {
                    $("#modalModifyValiditysplit").modal('show')
                    CreateTieUp.LoadModifyValidity(memono);
                }
                else {
                    Utility.writeNotification("warning", "User cannot modify validity of the selected memo as the memo is not yet frozen", "", true);
                }
            } else {
                Utility.writeNotification("warning", "Select Active Memo to Modify Validity", "", true);
            }
        }

    },

    ViewCreateRackRate: function () {
        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_create").addClass("active");
        $("#div_btn").empty();
        input = $('<button class="btn btn-primary mr-right-01" id="btn_search" onclick=\"CreateTieUp.GetCreateBaseRackRate();\">Search</button>' +
                '<button class="btn btn-primary mr-right-01" onclick="CreateTieUp.clearFields(); ">Reset</button>');
        //'<button class="btn btn-primary mr-right-01" id="btn_create_new" onclick=\"CreateTieUp.CreateNewRackRate();\">Create New</button>');
        $("#div_btn").append(input);

        $("#div_create_rack_rate").show();


        $('#btn_modify').prop('disabled', true);
        $('#btn_copy').prop('disabled', true);
        $("#hdr_name").text("Create Tie-Up");
        $("#div_scheme").prop('hidden', false);

        $("#div_content").hide();
        $("#div_add_rack_rate").hide();
        $("#div_landing_grid").hide();
        $("#div_freeze").hide();
        $("#div_manage").hide();
    },

    RefreshSearchGrid: function () {
        $('#grid_search_result').trigger("reloadGrid");
        $('#btn_copy').attr('disabled', true);
        $('#btn_modify').attr('disabled', true);
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

                    CreateTieUp.GetDistributorCategory(selected.valueOf());
                    //CreateTieUp.GetARNForChannelAndDistributorCategory();
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
            CreateTieUp.arns = [];
            CreateTieUp.arns = JSON.parse(result.GetARNForChannelAndDistributorCategoryResult);
            $(".token-input-list-facebook").remove();

            $("#txt_arn").empty();
            $("#txt_arn").tokenInput(
            CreateTieUp.arns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    //CreateTieUp.GetDistributor(item.name, 'add', item.id);
                    CreateTieUp.GetDistributor(item.id, 'add', item.id);

                },
                onDelete: function (item) {
                    //CreateTieUp.GetDistributor(item.name, 'remove', item.id);
                    CreateTieUp.GetDistributor(item.id, 'remove', item.id);
                }
            });


            $("#txt_arn_name").tokenInput(
           CreateTieUp.arnName,
           {
               theme: "facebook", preventDuplicates: true, resultsLimit: 10,
               onAdd: function (item) {
                   //CreateTieUp.LoadARNToken(item.name, 'add',item.id);
                   CreateTieUp.LoadARNToken(item.id, 'add', item.id);
               },

               onDelete: function (item) {
                   //CreateTieUp.LoadARNToken(item.name, 'remove',item.id);
                   CreateTieUp.LoadARNToken(item.id, 'remove', item.id);
               }
           });

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
                enableCaseInsensitiveFiltering: true
            });

        });
    },

    GetSchemeCategory: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeCategory', JSON.stringify({ SearchText: "", MemoTypeId: "2", IsCloseEnded: "2" }), "json", false, false, function (result) {
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
                nonSelectedText: "Select Scheme Category",
                onChange: function (element, checked) {
                    var brands = $('#dd_Scheme_category option:selected');
                    var selected = [];
                    $(brands).each(function (index, brand) {
                        selected.push([$(this).val()]);
                    });
                    if (selected.valueOf() != "") {
                        CreateTieUp.GetScheme(selected.valueOf());
                    }
                    else {
                        $("#dd_Scheme").multiselect('destroy');
                        $("#dd_Scheme").empty();
                        $('#dd_Scheme').multiselect('rebuildscheme');
                    }
                }
            });
            $('#dd_Scheme_category').multiselect('rebuild');
            $('#dd_Scheme_category').multiselect('clearSelection');

        });
    },


    SchemeCategoryChange: function () {
        CreateTieUp.GetScheme($('#dd_Scheme_category option:selected').val());

    },

    GetScheme: function (SearchText) {
        var arr = SearchText == "" ? "" : SearchText.toString();
        arr = JSON.stringify(arr)
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetScheme', '{"SearchText": ' + arr + ', "MemoTypeId": "2", "IsCloseEnded": "2" }', "json", false, false, function (result) {
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
                //nonSelectedText: "Select Scheme",

            });
            $('#dd_Scheme').multiselect('clearSelection');
        });
    },

    LoadARNS: function (type, Ids) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARNFor', JSON.stringify({ Type: "", SearchText: "" }), "json", false, false, function (result) {

        });
    },

    GetARN: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARN', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn").empty();
            CreateTieUp.arns = JSON.parse(result.GetARNResult);
            $("#txt_arn").tokenInput(
            CreateTieUp.arns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    //CreateTieUp.GetDistributor(item.name, 'add', item.id);
                    CreateTieUp.GetDistributor(item.id, 'add', item.id);
                    //$('.token-input-selected-token-facebook').remove();
                },
                onDelete: function (item) {
                    //CreateTieUp.GetDistributor(item.name, 'remove', item.id);
                    CreateTieUp.GetDistributor(item.id, 'remove', item.id);
                }
            });
        });

    },

    GetARNName: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARNName', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn_name").empty();
            CreateTieUp.arnName = JSON.parse(result.GetARNNameResult);
            $("#txt_arn_name").tokenInput(
            CreateTieUp.arnName,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    //CreateTieUp.LoadARNToken(item.name, 'add',item.id);
                    CreateTieUp.LoadARNToken(item.id, 'add', item.id);
                },

                onDelete: function (item) {
                    //CreateTieUp.LoadARNToken(item.name, 'remove',item.id);
                    CreateTieUp.LoadARNToken(item.id, 'remove', item.id);
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
        //$("li").removeClass('.token-input-selected-token-facebook');
    },

    GetDistributor: function (SearchText, mode, id) {
        if (mode == 'add') {
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

        }
        else {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                var Data = result.GetDistributorBasedOnIDResult;

                $("#txt_arn_name").tokenInput("remove", { id: id });
            });
        }
        //$("#txt_arn").removeClass('.token-input-selected-token-facebook');
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


        var localSchemeCategory = $('#dd_Scheme_category option:selected');
        var localSchemeCategoryselected = [];
        $(localSchemeCategory).each(function () {
            localSchemeCategoryselected.push([$(this).val()]);
        });

        var localScheme = $('#dd_Scheme option:selected');
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
        //var lumpsumSIPType = $('#dd_LumpsumSIPType option:selected').val();

        sessionStorage.setItem("DistributorCategory", DistributorCategory);
        sessionStorage.setItem("Channel", Channel);
        sessionStorage.setItem("ARN", ARNNo);
        sessionStorage.setItem('SchemeSelected', localSchemeselected.toString())
        sessionStorage.setItem('SchemeCategoryselected', localSchemeCategoryselected.toString())

        sessionStorage.setItem("DistributorCategoryCreate", DistributorCategory);
        sessionStorage.setItem("ChannelCreate", Channel);
        sessionStorage.setItem("ARNCreate", ARNNo);
        sessionStorage.setItem('SchemeSelectedCreate', localSchemeselected.toString())
        sessionStorage.setItem('SchemeCategoryselectedCreate', localSchemeCategoryselected.toString())

        var SearchGridResult;
        var MemoStatus = "All";
        var MasterQueueStatus = "";

        if (DistributorCategory != "" || Channel != "" || ARNNo != "" || ARNName != "") {

            var Service = 'TieUpService.svc/SearchTieUp';
            var InputData = JSON.stringify({ ARNNo: ARNNo, Channel: Channel, DistributorCategory: DistributorCategory, Status: MemoStatus, ARNName: ARNName, MasterQueueStatus: MasterQueueStatus, SchemeCategory: localSchemeCategoryselected.toString(), scheme: localSchemeselected.toString(), SearchFilter: Utility.ListSearchText, DateFrom: $('#dt_from').val(), DateTo: $('#dt_to').val() });

            Utility.ServiceCall("POST", Service, InputData, "json", false, false, function (result) {
                SearchGridResult = result.SearchTieUpResult;

                $('#grid_search_result').jqGrid('clearGridData');
                if (SearchGridResult != undefined && SearchGridResult.length > 0) {
                    for (var i = 0; i < SearchGridResult.length; i++)
                        jQuery("#grid_search_result").jqGrid('addRowData', SearchGridResult[i].PaymentMemoId, SearchGridResult[i]);
                }
                else {
                    Utility.writeNotification("norecords", "No Records Found", "", false);
                }

            });
        }
        else {
            Utility.writeNotification("error", "Please do a selection", "", true);
            $('#grid_search_result').jqGrid('clearGridData');
        }
    },

    RemoveToDatePicker: function (cnt) {
        $("#dt_to_" + cnt).datepicker("destroy");
        $("#dt_to_" + cnt).val("");
    },

    LoadTieUpControls: function (Count, showdistributor, showARN) {
        return '<div class="col-md-12 col-sm-12  bg-cl-a">' +
                               '<div class="col-md-4 col-sm-4 pd-left-00  pd-bottom-02">' +
                                   '<div class="row">' +
                                       '<div class="col-md-7 col-sm-7 pd-left-00">' +
                                        '<label class="tt-chk-bx-label mr-top-desk-title-02" id="lbl_dist_arn_' + Count + '"></label>' +
                                        '<input type="hidden" id="txt_id_' + Count + '"/>' +
                                    '<input type="hidden" id="txt_payment_list_id_' + Count + '"/>' +
                                       '</div>' +
                                   '</div>' +
                                '</div>' +

                               '<div class="col-md-4 col-sm-4 pd-left-00">' +
                                   '<div class="row">' +
                                       '<div class="col-md-7 col-sm-7 pd-left-00">' +
                                        '<label class="tt-chk-bx-label mr-top-desk-title-02" id="lbl_arn_name_' + Count + '"></label>' +
                                    '</div>' +
                                   '</div>' +
                               '</div>' +
                                 '<div class="col-md-2 col-sm-2 pd-right-00">' +
                                   '<div class="row">' +
                                        '<div class="col-md-7 col-sm-7">' +
                                           '<div class="date-outer-div">' +
                                               '<input type="text" id="dt_from_' + Count + '" class="input-text-date-bx-style" disabled onkeyup=\"CreateRackRate.RemoveToDatePicker(' + Count + ');\"/>' +

                                           '</div>' +
                                        '</div>' +
                                   '</div>' +
                                '</div>' +
                               '<div class="col-md-2 col-sm-2  pd-right-00">' +
                                   '<div class="row">' +
                                       '<div class="col-md-7 col-sm-7">' +
                                            '<div class="date-outer-div">' +
                                               '<input type="text" id="dt_to_' + Count + '" class="input-text-date-bx-style" />' +
                                               //'<a class="pos-date-tr" href="#"><img class="pos-date-tr-img" src="../img/date_tr_icon.png" /></a>' +
                                           '</div>' +
                                       '</div>' +
                                   '</div>' +
                               '</div>' +
                           '</div>'

    },

    ModifyRowCount: 0,

    LoadModifyValidity: function (MemoNo) {
        if (MemoNo != "") {
            $('#modalModifyValiditysplit').modal('show');
            $('#hid_paymentMemoId').val(MemoNo);
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentMemo', '{"PaymentMemoID": ' + MemoNo + '}', "json", false, false, function (result) {
                var PaymentMemo = result.GetPaymentMemoResult[0];
                //$("#dt_from_mod").val(PaymentMemo.DateFrom);
                //$("#dt_to_mod").val(PaymentMemo.DateTo);
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentListForModifyValidity', '{"PaymentMemoID": ' + MemoNo + '}', "json", false, false, function (result) {
                    var PaymentList = result.GetPaymentListForModifyValidityResult;
                    //var ARNNoArr = PaymentList[0].ARNNO.split(",");
                    //var ARNNameArr = PaymentList[0].ARNName.split(",");
                    //var categoryId = PaymentList[0].DistributorCategoryId.split(",");
                    //var categoryName = PaymentList[0].DistributorCategoryName.split(",");

                    $.each(PaymentList, function (i, obj) {
                        if (obj.ARNNO == "") {
                            $('#div_tie_up_Controls').append(CreateTieUp.LoadTieUpControls(CreateTieUp.ModifyRowCount, 'none', 'block'));

                            $('#txt_id_' + CreateTieUp.ModifyRowCount).val(obj.DistributorCategoryId);
                            $('#lbl_dist_arn_' + CreateTieUp.ModifyRowCount).text(obj.DistributorCategoryName);
                            $('#lbl_arn_name_' + CreateTieUp.ModifyRowCount).text("");
                            $('#dt_from_' + CreateTieUp.ModifyRowCount).val(obj.DateFrom);
                            $('#dt_to_' + CreateTieUp.ModifyRowCount).val(obj.DateTo);

                            $('#dt_to_' + CreateTieUp.ModifyRowCount).datepicker({
                                dateFormat: 'dd/mm/y',
                                changeMonth: true,
                                changeYear: true,
                                maxDate: obj.DateTo
                            });

                            $('#dt_to_' + CreateTieUp.ModifyRowCount).datepicker("option", "minDate", obj.DateFrom);
                            CreateTieUp.ModifyRowCount++;
                        } else {
                            $('#div_tie_up_Controls').append(CreateTieUp.LoadTieUpControls(CreateTieUp.ModifyRowCount, 'block', 'none'));

                            $('#txt_id_' + CreateTieUp.ModifyRowCount).val("");

                            $('#lbl_dist_arn_' + CreateTieUp.ModifyRowCount).text(obj.ARNNO);
                            $('#lbl_arn_name_' + CreateTieUp.ModifyRowCount).text(obj.ARNName);
                            $('#dt_from_' + CreateTieUp.ModifyRowCount).val(obj.DateFrom);
                            $('#dt_to_' + CreateTieUp.ModifyRowCount).val(obj.DateTo);

                            $('#dt_to_' + CreateTieUp.ModifyRowCount).datepicker({
                                dateFormat: 'dd/mm/y',
                                changeMonth: true,
                                changeYear: true,
                                maxDate: obj.DateTo
                            });
                            $('#dt_to_' + CreateTieUp.ModifyRowCount).datepicker("option", "minDate", obj.DateFrom);
                            CreateTieUp.ModifyRowCount++;
                        }

                    });
                });

            });

        }
    },

    SaveModifyValidity: function () {
        if (CreateTieUp.ValidateModifyValidity()) {
            var modifydetail = [];
            for (var cnt = 0; cnt < CreateTieUp.ModifyRowCount; cnt++) {
                listitem = {};
                listitem["PaymentMemoId"] = $("#hid_paymentMemoId").val();
                listitem["ARNNO"] = $('#lbl_dist_arn_' + cnt).text();
                listitem["DistributorCategoryId"] = $('#txt_id_' + cnt).val();
                listitem["DateFrom"] = $('#dt_from_' + cnt).val();
                listitem["DateTo"] = $('#dt_to_' + cnt).val();
                modifydetail.push(listitem);
            }
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/ModifyValidity', JSON.stringify({ list: modifydetail }), "json", false, false, function (result) {
                $("#modalModifyValiditysplit").modal('hide');
            });

            CreateTieUp.GetCreateBaseRackRate();
        }
    },

    ValidateModifyValidity: function () {
        var returnvalue = true;
        var error = "";
        if ($('#hid_paymentMemoId').val() == "") {
            error += "Invalid Memo. <br/>";
        }
        else {
            var RoleID = sessionStorage.getItem("RoleID");
            if (RoleID == "1" || RoleID == "2" || RoleID == "4" || RoleID == "5") {
                for (var cnt = 0; cnt < CreateTieUp.ModifyRowCount; cnt++) {
                    if ($('#lbl_arn_name_' + cnt).val() == "") {
                        if (error.indexOf("You are not authorized to modify validity of a distributor category memo") > -1) {
                        }
                        else {
                            error += "You are not authorized to modify validity of a distributor category memo. <br/>";
                        }
                    }
                }
            }
        }

        if (error != "") {
            returnvalue = false;
            Utility.writeNotification("warning", error, "", true);
        }
        return returnvalue;
    },

    RemoveModifyDatePicker: function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 9) {
            $("#dt_to").datepicker("destroy");
            $("#dt_to").val("");
        }
    },

    ReturnSearchHyperLink: function (cellValue, options, rowdata, action) {
        sessionStorage.CurrentMenuselected = "nav_information";
        switch (rowdata.MemoTypeID) {
            case 1:
                if (rowdata.MemoStatus == "Active" && rowdata.MemoLevel == 'A') {
                    sessionStorage.CurrentMenuselected = "nav_freeze";
                    return "<a style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'  href='./RackRateReview.html?memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=tr' >" + rowdata.MemoNumber + "</a>";
                }
                else if (rowdata.MemoStatus == "Active" && rowdata.MemoLevel == 'F') {
                    return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"CreateTieUp.Viewreport(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
                }
                else if (rowdata.MemoStatus == "InActive") {
                    return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"CreateTieUp.Viewreport(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
                }
                else {

                    if (rowdata.MemoStatus == "Saved") {
                        sessionStorage.CurrentMenuselected = "nav_initiate";
                        return "<a href='./RackRateInitiate.html?tokenkey=" + sessionStorage.sessionId + "&memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=tr' style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'>" + rowdata.MemoNumber + "</a>";

                    }
                    else {
                        sessionStorage.CurrentMenuselected = "nav_information";
                        return "<a href='./RackRateReview.html?tokenkey=" + sessionStorage.sessionId + "&memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=tr' style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'>" + rowdata.MemoNumber + "</a>";
                    }

                }
                break;
            case 2:
                if (rowdata.MemoStatus == "Active" && rowdata.MemoLevel == 'A') {
                    return "<a href='./TieUpInformation.html?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=cr' style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'>" + rowdata.MemoNumber + "</a>";
                }
                else if (rowdata.MemoStatus == "Active" && rowdata.MemoLevel == 'F') {
                    return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"CreateTieUp.ViewCAMSreport(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
                }
                else if (rowdata.MemoStatus == "InActive") {
                    return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"CreateTieUp.ViewCAMSreport(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
                } else {
                    return "<a href='./TieUpInformation.html?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=cr' style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'>" + rowdata.PaymentMemoId + "</a>";
                }
                break;
            default:
                return " ";
                break;
        }
    },

    ViewCAMSreport: function (paymentmemoid) {
        var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].PaymentMemoId == paymentmemoid) {
                    var fileurl = Utility.TieUpCamsReportUrl.replace("###MemoNumber###", CreateTieUp.remove_tags(gridData[i].MemoNumber));
                    //fileurl = fileurl.replace("###Distributorid###", gridData[i].ARNNo);
                    CreateTieUp.openWin(fileurl);
                }
            }
        }
    },

    Viewreport: function (paymentmemoid) {
        var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].PaymentMemoId == paymentmemoid) {
                    var fileurl = Utility.DistributorReportUrl.replace("###MemoNumber###", CreateTieUp.remove_tags(gridData[i].MemoNumber));
                    fileurl = fileurl.replace("###Distributorid###", gridData[i].ARNNo);
                    CreateTieUp.openWin(fileurl);
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

    ReturnCheckBox: function (cellValue, options, rowdata, action) {
        return "<input type='checkbox' />";
    },

    ReturnRadioBox: function (cellValue, option) {
        return '<input type="radio" style="display: block;margin-left: auto;margin-right: auto;" name="radio_' + option.gid + '"  />';
    },

    RefreshGridDetails: function () {
        Utility.ListSearchText = '';
        CreateTieUp.GetCreateBaseRackRate();
    },

    ValidateSchemeRates: function (Schemeselected, ARNSelected, Categoryselected) {
        var error = "";
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/ValidateAvailableSchemeTieup', JSON.stringify({ SchemeID: Schemeselected.toString(), ARN: ARNSelected, DistributorCategory: Categoryselected.toString(), DateFrom: $('#dt_from').val(), DateTo: $('#dt_to').val() }), "json", false, false, function (result) {
            error = result.ValidateAvailableSchemeTieupResult;

        });
        return error;
    },

}



$(function () {
    CreateTieUp.ViewCreateRackRate();
    CreateTieUp.GetChannel("");

    $("#txt_arn").siblings("ul").remove();
    $("#txt_arn_name").siblings("ul").remove();

    CreateTieUp.GetDistributorCategory("");
    CreateTieUp.GetSchemeCategory("");
    CreateTieUp.GetScheme("");
    CreateTieUp.GetLumpsumSIPType();

    CreateTieUp.GetARN("");
    CreateTieUp.GetARNName("");
    sessionStorage.MemoStatus = "";
    sessionStorage.MemoFrom = "";

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
        colNames: ['Select', 'Memo Number', 'MemoID', 'Memo Type', 'Memo Type ID', 'Transaction Type ', 'Category', 'ARN No', 'ARN Name', 'Scheme', 'SchemeCategory', 'From Date', 'To Date', 'Status', 'Raised By', 'Raised On', 'Time', 'Ageing', 'Last Action By', 'Pending With', 'MemoLevel', 'isParentId'],
        colModel: [
                { name: 'select', formatter: CreateTieUp.ReturnRadioBox, width: '60px;', search: false },
                   { name: 'MemoNumber', index: 'MemoNumber', align: 'right', formatter: CreateTieUp.ReturnSearchHyperLink, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'PaymentMemoId', index: 'PaymentMemoId', align: 'right', hidden: true },
                { name: 'MemoTypeName', index: 'MemoTypeName', width: 100, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'MemoTypeID', index: 'MemoTypeID', hidden: true },
                { name: 'LumpsumSIPType', width: 240, index: 'LumpsumSIPType', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'DistributorCategoryName', width: 150, index: 'DistributorCategoryName', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'ARNNo', width: 90, index: 'ARNNo', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'ARNName', width: 150, index: 'ARNName', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'Scheme', width: 160, index: 'Scheme', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'SchemeCategory', width: 170, index: 'SchemeCategory', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'DateFrom', width: 100, index: 'DateFrom', align: 'center', sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
                { name: 'DateTo', width: 100, index: 'DateTo', align: 'center', sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
                { name: 'MemoStatus', index: 'MemoStatus', width: 90, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'CreatedByName', index: 'CreatedByName', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'RaisedOnDate', index: 'RaisedOnDate', width: 100, align: 'center', sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
                { name: 'RaisedOnTime', index: 'RaisedOnTime', width: 50, align: 'center', search: false },
                { name: 'Ageing', index: 'Ageing', width: 100, align: 'right', sorttype: 'integer', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
                { name: 'ModifiedByName', index: 'ModifiedByName', align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'PendingWith', index: 'PendingWith', align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'MemoLevel', index: 'MemoLevel', align: 'left', hidden: true },
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
            //var ids = jQuery("#grid_add_rack_rate").jqGrid('getDataIDs');
            //if (ids.length > 0) {
            //    var i = ids.length - 1;
            $("td[aria-describedby=grid_search_result_select] input[type='radio']").click(function () {
                var $selRadio = $('input[name=radio_' + $grid[0].id + ']:radio:checked'), $tr;
                if ($selRadio.length > 0) {
                    $tr = $selRadio.closest('tr');
                    if ($tr.length > 0) {
                        var btn_copy = $('#btn_copy');
                        var btn_modify = $('#btn_modify');
                        if ($tr.find('td:eq(4)').text() == "1") {
                            btn_copy.attr('disabled', false);
                            btn_modify.attr('disabled', true);
                            sessionStorage.setItem("CopyMemoNo", $tr.find('td:eq(2)').text())
                            sessionStorage.setItem("CopyMemoType", $tr.find('td:eq(4)').text())
                            sessionStorage.setItem("ARNNo", $tr.find('td:eq(6)').text())
                            sessionStorage.setItem("DistributorCategoryName", $tr.find('td:eq(5)').text())
                            sessionStorage.setItem("CopyMemoStatus", $tr.find('td:eq(10)').text())
                            sessionStorage.setItem("MemoLevel", $tr.find('td:eq(17)').text())
                        }
                        if ($tr.find('td:eq(4)').text() == "2") {
                            btn_copy.attr('disabled', true);
                            btn_modify.attr('disabled', false);
                            sessionStorage.setItem("CopyMemoNo", $tr.find('td:eq(2)').text())
                            sessionStorage.setItem("CopyMemoType", $tr.find('td:eq(4)').text())
                            sessionStorage.setItem("ARNNo", $tr.find('td:eq(6)').text())
                            sessionStorage.setItem("DistributorCategoryName", $tr.find('td:eq(5)').text())
                            sessionStorage.setItem("CopyMemoStatus", $tr.find('td:eq(10)').text())
                            sessionStorage.setItem("MemoLevel", $tr.find('td:eq(17)').text())
                        }
                    }
                } else {
                    Utility.writeNotification("warning", "Select a Memo", "", true);
                    //alert("The radio button is not selected");
                }

            });
        }
        //}
    });
    jQuery("#grid_search_result").jqGrid('filterToolbar', { searchOperators: true, stringResult: true, searchOnEnter: false, defaultSearch: "cn", multipleSearch: true });
    var DistributorCategoryCreate = sessionStorage.getItem("DistributorCategoryCreate") == null ? "" : sessionStorage.getItem("DistributorCategoryCreate").split(",");
    var ChannelCreate = sessionStorage.getItem("ChannelCreate") == null ? "" : sessionStorage.getItem("ChannelCreate").split(",");
    var ARNCreate = sessionStorage.getItem("ARNCreate") == null ? "" : sessionStorage.getItem("ARNCreate").split(",");
    var SchemeSelectedCreate = sessionStorage.getItem('SchemeSelectedCreate') == null ? "" : sessionStorage.getItem('SchemeSelectedCreate').split(",");
    var SchemeCategoryselectedCreate = sessionStorage.getItem('SchemeCategoryselectedCreate') == null ? "" : sessionStorage.getItem('SchemeCategoryselectedCreate').split(",");

    $('#txt_arn').tokenInput('clear');
    $('#dd_dist_category').multiselect('clearSelection');
    $('#dd_channel').multiselect('clearSelection');
    $('#dd_Scheme_category').multiselect('clearSelection');
    $('#dd_Scheme').multiselect('clearSelection');
    //if (ARNCreate != null) {
    //    for (var i = 0; i < ARNCreate.length ; i++) {
    //        $.each(CreateTieUp.arns, function (key, value) {
    //            if (value.name == ARNCreate[i]) {
    //                $("#txt_arn").tokenInput("add", { id: value.id, name: value.name });
    //            }
    //        });
    //    }
    //}

    //if (DistributorCategoryCreate != null) {
    //    for (var i = 0; i < DistributorCategoryCreate.length; i++) {
    //        if (DistributorCategoryCreate[i] != "") {
    //            $('#dd_dist_category').multiselect('select', DistributorCategoryCreate[i]);
    //        }
    //    }
    //}


    //if (ChannelCreate != null) {
    //    for (var i = 0; i < ChannelCreate.length; i++) {
    //        if (ChannelCreate[i] != "") {
    //            $('#dd_channel').multiselect('select', ChannelCreate[i]);
    //        }
    //    }
    //}


    //if (SchemeCategoryselectedCreate != null) {
    //    for (var i = 0; i < SchemeCategoryselectedCreate.length; i++) {
    //        if (SchemeCategoryselectedCreate[i] != "") {
    //            $('#dd_Scheme_category').multiselect('select', SchemeCategoryselectedCreate[i]);
    //        }
    //    }
    //}


    //if (SchemeSelectedCreate != null) {
    //    for (var i = 0; i < SchemeSelectedCreate.length; i++) {
    //        if (SchemeSelectedCreate[i] != "") {
    //            $('#dd_Scheme').multiselect('select', SchemeSelectedCreate[i]);
    //        }
    //    }
    //}
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


    //CreateTieUp.GetCreateBaseRackRate();
    $('#imgdt_to_mod').click(function (e) {
        if ($('#dt_to_mod').data('datepicker')) {
            $("#dt_to_mod").datepicker("show");
        }
        else {
            return false;
        }
        
    });
    $('#imgdt_from_mod').click(function (e) {
        $("#dt_from_mod").datepicker("show");
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