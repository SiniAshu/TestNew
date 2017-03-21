var CreateRackRate = {
    arns: [],

    arnName: [],

    TieupCount: [],
    
    clearFields: function () {
        sessionStorage.removeItem("DistributorCategory");
        sessionStorage.removeItem("Channel");
        sessionStorage.removeItem("ARN");
        sessionStorage.removeItem('SchemeSelected');
        sessionStorage.removeItem('SchemeCategoryselected');
        sessionStorage.removeItem("CopyMemoNo");
        $('#btn_modify').prop('disabled', true);
        $('#btn_copy').prop('disabled', true);
        $('#hid_paymentMemoId').val("");
        $('#txt_arn').tokenInput('clear');
        $('#dd_dist_category').multiselect('clearSelection');
        $('#dd_channel').multiselect('clearSelection');
        $('#dd_Scheme_category').multiselect('clearSelection');
        $('#dd_Scheme').multiselect('clearSelection');

        $('#grid_search_result').jqGrid('clearGridData');

        Utility.ListSearchText = '';
        CreateRackRate.GetCreateBaseRackRate();
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

        if (Channelselected.length > 2) {
            error += "Maximum 2 channels are allowed to create a memo. <br/>";
        }
        else {

        }
        var Channelcategorydata = Categoryselected;
        var ChannelCategoryDataAll = Categoryselected;
        var channelddCategory = [];
        if (Categoryselected.length == 0) {
            if (sessionStorage.getItem('Channel') != null) {
                var channeldd = [];
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChannelDistributorCategory', JSON.stringify({ Channel: Channelselected.toString() }), "json", false, false, function (result) {
                    channeldd = result.GetChannelDistributorCategoryResult;

                });

                if (channeldd.length > 0) {
                    var catdata = [];
                    for (var cnt = 0; cnt < channeldd.length; cnt++) {
                        catdata[cnt] = channeldd[cnt].DistributorCategoryId;
                    }
                    Channelcategorydata = catdata;
                }
            }

            if (Channelselected.toString() != "") {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChannelCategory', JSON.stringify({ Channel: Channelselected.toString(), category: "" }), "json", false, false, function (result) {
                    channelddCategory = result.GetChannelCategoryResult;
                    if (channelddCategory.length > 0) {
                        var catdata = [];
                        for (var cnt = 0; cnt < channelddCategory.length; cnt++) {
                            catdata[cnt] = channelddCategory[cnt].DistributorCategoryId;
                        }
                        ChannelCategoryDataAll = catdata;
                    }
                });
            }
        }
        else {
            if (Channelselected.length > 0) {
                //$.ajax({
                //    type: "POST",
                //    contentType: "application/json; charset=utf-8",
                //    url: 'http://localhost:50262/BaseRackRateService.svc/GetChannelCategory',
                //    data: JSON.stringify({ Channel: Channelselected.toString(), category: Categoryselected.toString() }),
                //    dataType: "json",
                //    processData: true,
                //    //async: false,
                //    //success: callback,
                //    error: function (xhr, status, error) {
                //        Utility.ServiceFailed(xhr, status, error);
                //    },
                //    beforeSend: function (xhr) {
                //        xhr.setRequestHeader('SessionID', sessionStorage.sessionId);
                //    }
                //});
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChannelCategory', JSON.stringify({Channel:Channelselected.toString(),category:Categoryselected.toString()}), "json", false, false, function (result) {
                    channelddCategory = result.GetChannelCategoryResult;
                    if (channelddCategory.length > 0) {
                        var catdata = [];
                        for (var cnt = 0; cnt < channelddCategory.length; cnt++) {
                            catdata[cnt] = channelddCategory[cnt].DistributorCategoryId;
                        }
                        ChannelCategoryDataAll = catdata;
                    }
                });
            }
        }
        if (RoleID == "1" || RoleID == "2" || RoleID == "4" || RoleID == "5") {
            if (Channelcategorydata.length > 0 || ARNSelected != "") {
                if (error == "") {
                    Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSlabAvailability', JSON.stringify({ DistributorCategoryID: Channelcategorydata.toString(), Arnno: ARNSelected }), "json", false, false, function (result) {
                        //slabamount = result.GetSlabResult;
                    });
                }
            }
        }
        if (error == "") {
            if (Channelcategorydata.length > 0 || ARNSelected != "") {
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChannelForARNAndDistributorCategory', JSON.stringify({ ARN: ARNSelected, DistributorCategory: Channelcategorydata.toString() }), "json", false, false, function (result) {
                    var data = result.GetChannelForARNAndDistributorCategoryResult;
                    if (data.length > 2) {
                        error += "ARN/Distributor Category Belong to more than 2 Channel. <br/>";
                    }
                });
            }
        }
        if (error == "") {
            if (RoleID == "1" || RoleID == "2" || RoleID == "4" || RoleID == "5") {
                if (Channelselected.length > 0) {
                    error += "User Not allowed to create channel based Memo. <br/>";
                }
            }
        }
        if (error == "") {
            if (!(ARNSelected == "" && Channelselected.toString() == "" && Channelcategorydata.toString() == "")) {


                var RoleID = sessionStorage.getItem("RoleID");



                sessionStorage.setItem('Channel', Channelselected.toString())
                sessionStorage.setItem('DistributorCategory', ChannelCategoryDataAll.toString())
                sessionStorage.setItem('ARN', ARNSelected)
                sessionStorage.setItem('SchemeSelected', localSchemeselected.toString())
                sessionStorage.setItem('SchemeCategoryselected', SchemeCategorySelected.toString())
                sessionStorage.setItem('IsCloseEnded', $('#chk_is_close_ended').is(":checked"));

                sessionStorage.removeItem("DistributorCategoryCreate");
                sessionStorage.removeItem("ChannelCreate");
                sessionStorage.removeItem("ARNCreate");
                sessionStorage.removeItem('SchemeSelectedCreate')
                sessionStorage.removeItem('SchemeCategoryselectedCreate')

                sessionStorage.CurrentMenuselected = "nav_information";
                window.location.href = "RackRateInitiate.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
            }
            else {
                Utility.writeNotification("error", "Please do a selection ", "", true);
            }
        }
        else {
            Utility.writeNotification("error", error, "", true);
        }
        return false;
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
        if (memono == null || memono == "") {
            Utility.writeNotification("warning", "Select a Memo to ModifyValidity", "", true);
            //alert("Select a Memo to Copy");
        }
        else {
            if (sessionStorage.CopyMemoStatus == "Active") {
                if (sessionStorage.MemoLevel == "F") {
                    $("#mdl_view_Modify_validity").modal('show')
                    CreateRackRate.LoadModifyValidity(memono);
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
        input = $('<button class="btn btn-primary mr-right-01" id="btn_search" onclick=\"CreateRackRate.GetCreateBaseRackRate();\">Search</button>' +
                '<button class="btn btn-primary mr-right-01" onclick="CreateRackRate.clearFields(); ">Reset</button>');
        //'<button class="btn btn-primary mr-right-01" id="btn_create_new" onclick=\"CreateRackRate.CreateNewRackRate();\">Create New</button>');
        $("#div_btn").append(input);

        $("#div_create_rack_rate").show();

        $('#btn_modify').prop('disabled', true);
        $("#hdr_name").text("Create Rack Rate");
        $("#div_scheme").attr('hidden', 'hidden');


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
        sessionStorage.setItem("CopyMemoNo", "");
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

                    CreateRackRate.GetDistributorCategory(selected.valueOf());
                    //CreateRackRate.GetARNForChannelAndDistributorCategory();
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
            CreateRackRate.arns = [];
            CreateRackRate.arns = JSON.parse(result.GetARNForChannelAndDistributorCategoryResult);
            $(".token-input-list-facebook").remove();

            $("#txt_arn").empty();
            $("#txt_arn").tokenInput(
            CreateRackRate.arns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    //CreateRackRate.GetDistributor(item.name, 'add', item.id);
                    CreateRackRate.GetDistributor(item.id, 'add', item.id);

                },
                onDelete: function (item) {
                    //CreateRackRate.GetDistributor(item.name, 'remove', item.id);
                    CreateRackRate.GetDistributor(item.id, 'remove', item.id);
                }
            });


            $("#txt_arn_name").tokenInput(
           CreateRackRate.arnName,
           {
               theme: "facebook", preventDuplicates: true, resultsLimit: 10,
               onAdd: function (item) {
                   //CreateRackRate.LoadARNToken(item.name, 'add',item.id);
                   CreateRackRate.LoadARNToken(item.id, 'add', item.id);
               },

               onDelete: function (item) {
                   //CreateRackRate.LoadARNToken(item.name, 'remove',item.id);
                   CreateRackRate.LoadARNToken(item.id, 'remove', item.id);
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
                enableCaseInsensitiveFiltering: true,
                //onChange: function (element, checked) {
                //    var brands = $('#dd_dist_category option:selected');
                //    var selected = [];
                //    $(brands).each(function (index, brand) {
                //        selected.push([$(this).val()]);
                //    });

                //    //CreateRackRate.GetDistributorCategory(selected.valueOf());
                //    CreateRackRate.GetARNForChannelAndDistributorCategory();
                //}
            });

        });
    },

    GetSchemeCategory: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSchemeCategory', JSON.stringify({ SearchText: "", MemoTypeId: "0", IsCloseEnded: "2" }), "json", false, false, function (result) {
            var arrItems = result.GetSchemeCategoryResult;

            for (var i = 0; i < arrItems.length; i++) {
                $("<option />").text(arrItems[i].SchemeCategoryName).val(arrItems[i].SchemeCategoryId).appendTo("#dd_Scheme_category");
            }
            $('#dd_Scheme_category').attr("multiple", "multiple");

            $('#dd_Scheme_category').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                //nonSelectedText: "Select Scheme Category",
                //onChange: function (element, checked) {
                //    var brands = $('#dd_Scheme_category option:selected');
                //    var selected = [];
                //    $(brands).each(function (index, brand) {
                //        selected.push([$(this).val()]);
                //    });

                //    CreateRackRate.GetScheme(selected.toString());
                //}
            });
            $('#dd_Scheme_category').multiselect('clearSelection');
        });
    },

    SchemeCategoryChange: function () {
        CreateRackRate.GetScheme($('#dd_Scheme_category option:selected').val());
    },

    GetScheme: function (SearchText) {
        var arr = SearchText == "" ? "" : SearchText.toString();
        arr = JSON.stringify(arr)
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetScheme', '{"SearchText": ' + arr + ', "MemoTypeId": "0" , "IsCloseEnded": "2"}', "json", false, false, function (result) {
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
            CreateRackRate.arns = JSON.parse(result.GetARNResult);
            $("#txt_arn").tokenInput(
            CreateRackRate.arns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    //CreateRackRate.GetDistributor(item.name, 'add', item.id);
                    CreateRackRate.GetDistributor(item.id, 'add', item.id);
                    //$('.token-input-selected-token-facebook').remove();
                },
                onDelete: function (item) {
                    //CreateRackRate.GetDistributor(item.name, 'remove', item.id);
                    CreateRackRate.GetDistributor(item.id, 'remove', item.id);
                }
            });
        });

    },

    GetARNName: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARNName', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn_name").empty();
            CreateRackRate.arnName = JSON.parse(result.GetARNNameResult);
            $("#txt_arn_name").tokenInput(
            CreateRackRate.arnName,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    //CreateRackRate.LoadARNToken(item.name, 'add',item.id);
                    CreateRackRate.LoadARNToken(item.id, 'add', item.id);
                },

                onDelete: function (item) {
                    //CreateRackRate.LoadARNToken(item.name, 'remove',item.id);
                    CreateRackRate.LoadARNToken(item.id, 'remove', item.id);
                }
            });
        });
    },

    LoadARNToken: function (SearchText, mode, id) {
       // alert('coming');
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
        var arrayARNName = new Array();
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
                            var DataDist = result.GetDistributorBasedOnIDResult;                        
                            $.each($("#txt_arn_name").tokenInput("get"), function (i, obj) {
                                                          
                                if (obj.id == DataDist[0].DistributorId) {
                                    
                                    return;
                                }
                            });
                            $("#txt_arn_name").tokenInput("add", { id: DataDist[0].DistributorId, name: DataDist[0].DistributorName });
                         
                        });
                    });
                }
                else if (Data.length == 1) {
                    //alert(JSON.stringify(Data[0].Distributorid));
                    $("#txt_arn_name").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });
                    //Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                    //    var Data = result.GetDistributorBasedOnIDResult;
                    //    $.each($("#txt_arn_name").tokenInput("get"), function (i, obj) {

                    //        if (obj.id == DataDist[0].DistributorId) {

                    //            return;
                    //        }
                    //    });
                    //    $("#txt_arn_name").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });

                    //});
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
    },

    GetCreateBaseRackRate: function () {
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

            var Service = 'BaseRackRateService.svc/GetCreateBaseRackRate';
            var InputData = JSON.stringify({ ArnNo: ARNNo, Channel: Channel, DistributorCategory: DistributorCategory, Status: MemoStatus, MasterQueueStatus: MasterQueueStatus, ARNName: ARNName, SearchFilter: Utility.ListSearchText });

            Utility.ServiceCall("POST", Service, InputData, "json", false, false, function (result) {
                SearchGridResult = result.GetCreateBaseRackRateResult;

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
                                               '<input type="text" id="dt_from_' + Count + '" class="input-text-date-bx-style" onkeyup=\"CreateRackRate.RemoveToDatePicker(' + Count + ');\"/>' +
                                           '</div>' +
                                        '</div>' +
                                   '</div>' +
                                '</div>' +
                               '<div class="col-md-2 col-sm-2  pd-right-00">' +
                                   '<div class="row">' +
                                       '<div class="col-md-7 col-sm-7">' +
                                            '<div class="date-outer-div">' +
                                               '<input type="text" id="dt_to_' + Count + '" class="input-text-date-bx-style" />' +

                                           '</div>' +
                                       '</div>' +
                                   '</div>' +
                               '</div>' +
                           '</div>'

    },

    RemoveToDatePicker: function (cnt) {
        $("#dt_to_" + cnt).datepicker("destroy");
        $("#dt_to_" + cnt).val("");
    },

    RemoveModifyDatePicker: function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 9) {
            $("#dt_to").datepicker("destroy");
            $("#dt_to").val("");
        }
    },

    ModifyRowCount: 0,

    LoadModifyValidity: function (MemoNo) {
        if (MemoNo != "") {
            $('#modalModifyValiditysplit').modal('show');
            $('#hid_paymentMemoId').val(MemoNo);
            $('#div_tie_up_Controls').empty();
            CreateRackRate.ModifyRowCount = 0;
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentMemo', '{"PaymentMemoID": ' + MemoNo + '}', "json", false, false, function (result) {
                var PaymentMemo = result.GetPaymentMemoResult[0];
                //$("#dt_from").val(PaymentMemo.DateFrom);
                //$("#dt_to").val(PaymentMemo.DateTo);
                Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetPaymentListForModifyValidity', '{"PaymentMemoID": ' + MemoNo + '}', "json", false, false, function (result) {
                    var PaymentList = result.GetPaymentListForModifyValidityResult;
                    //var ARNNoArr = PaymentList[0].ARNNO.split(",");
                    //var ARNNameArr = PaymentList[0].ARNName.split(",");
                    //var categoryId = PaymentList[0].DistributorCategoryId.split(",");
                    //var categoryName = PaymentList[0].DistributorCategoryName.split(",");

                    $.each(PaymentList, function (i, obj) {
                        if (obj.ARNNO == "") {
                            $('#div_tie_up_Controls').append(CreateRackRate.LoadTieUpControls(CreateRackRate.ModifyRowCount, 'none', 'block'));

                            $('#txt_id_' + CreateRackRate.ModifyRowCount).val(obj.DistributorCategoryId);
                            $('#lbl_dist_arn_' + CreateRackRate.ModifyRowCount).text(obj.DistributorCategoryName);
                            $('#lbl_arn_name_' + CreateRackRate.ModifyRowCount).text("");
                            $('#dt_from_' + CreateRackRate.ModifyRowCount).val(obj.DateFrom);
                            $('#dt_to_' + CreateRackRate.ModifyRowCount).val(obj.DateTo);

                            $('#dt_to_' + CreateRackRate.ModifyRowCount).datepicker({
                                dateFormat: 'dd/mm/y',
                                changeMonth: true,
                                changeYear: true,
                                maxDate: obj.DateTo
                            });

                            $('#dt_to_' + CreateRackRate.ModifyRowCount).datepicker("option", "minDate", obj.DateFrom);
                            CreateRackRate.ModifyRowCount++;
                        } else {
                            $('#div_tie_up_Controls').append(CreateRackRate.LoadTieUpControls(CreateRackRate.ModifyRowCount, 'block', 'none'));

                            $('#txt_id_' + CreateRackRate.ModifyRowCount).val("");

                            $('#lbl_dist_arn_' + CreateRackRate.ModifyRowCount).text(obj.ARNNO);
                            $('#lbl_arn_name_' + CreateRackRate.ModifyRowCount).text(obj.ARNName);
                            $('#dt_from_' + CreateRackRate.ModifyRowCount).val(obj.DateFrom);
                            $('#dt_to_' + CreateRackRate.ModifyRowCount).val(obj.DateTo);

                            $('#dt_to_' + CreateRackRate.ModifyRowCount).datepicker({
                                dateFormat: 'dd/mm/y',
                                changeMonth: true,
                                changeYear: true,
                                maxDate: obj.DateTo
                            });
                            $('#dt_to_' + CreateRackRate.ModifyRowCount).datepicker("option", "minDate", obj.DateFrom);
                            CreateRackRate.ModifyRowCount++;
                        }

                    });



                });

            });


        }
    },

    SaveModifyValidity: function () {
        if (CreateRackRate.ValidateModifyValidity()) {
            var modifydetail = [];
            for (var cnt = 0; cnt < CreateRackRate.ModifyRowCount; cnt++) {
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

            CreateRackRate.GetCreateBaseRackRate();
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
                for (var cnt = 0; cnt < CreateRackRate.ModifyRowCount; cnt++) {
                    if ($('#lbl_arn_name_' + cnt).text() == "") {
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

    ReturnSearchHyperLink: function (cellValue, options, rowdata, action) {
        switch (rowdata.MemoTypeID) {
            case 1: if (rowdata.MemoStatus == "Saved") {
                sessionStorage.CurrentMenuselected = "nav_initiate";
                return "<a style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'  href='./RackRateInitiate.html?memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=cr' >" + rowdata.MemoNumber + "</a>";
            }
            else if (rowdata.MemoStatus == "Initiated") {
                sessionStorage.CurrentMenuselected = "nav_review";
                return "<a style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'  href='./RackRateReview.html?memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=cr' >" + rowdata.MemoNumber + "</a>";
            }
            else if (rowdata.MemoStatus == "Reviewed") {
                sessionStorage.CurrentMenuselected = "nav_approve";
                return "<a style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'  href='./RackRateReview.html?memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=cr' >" + rowdata.MemoNumber + "</a>";
            }
            else if (rowdata.MemoStatus == "BH Approved") {
                sessionStorage.CurrentMenuselected = "nav_review";
                return "<a style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'  href='./RackRateReview.html?memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=cr' >" + rowdata.MemoNumber + "</a>";
            }
            else if (rowdata.MemoStatus == "Approved") {
                sessionStorage.CurrentMenuselected = "nav_freeze";
                return "<a style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'  href='./RackRateReview.html?memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=cr' >" + rowdata.MemoNumber + "</a>";
            }
            else if (rowdata.MemoStatus == "Active" && rowdata.MemoLevel == 'A') {
                sessionStorage.CurrentMenuselected = "nav_freeze";
                return "<a style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'  href='./RackRateReview.html?memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=cr' >" + rowdata.MemoNumber + "</a>";
            }
            else if (rowdata.MemoStatus == "Active" && rowdata.MemoLevel == 'F') {
                return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"CreateRackRate.Viewreport(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
            }
            else if (rowdata.MemoStatus == "InActive") {
                return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"CreateRackRate.Viewreport(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
            }
            else if (rowdata.MemoStatus == "Rejected") {
                sessionStorage.CurrentMenuselected = "nav_manage";
                return "<a style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'  href='./RackRateReview.html?memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=cr' >" + rowdata.MemoNumber + "</a>";
            }
                break;
            case 2:
                if (rowdata.MemoStatus == "Active" && rowdata.MemoLevel == 'A') {
                    return "<a href='./TieUpInformation.html?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=crr' style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'>" + rowdata.MemoNumber + "</a>";
                }
                else if (rowdata.MemoStatus == "Active" && rowdata.MemoLevel == 'F') {
                    return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"CreateRackRate.ViewCAMSreport(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
                }
                else if (rowdata.MemoStatus == "InActive") {
                    return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"CreateRackRate.ViewCAMSreport(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
                } else {
                    return "<a href='./TieUpInformation.html?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=crr' style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'>" + rowdata.PaymentMemoId + "</a>";
                }
                break;
        }
    },

    Viewreport: function (paymentmemoid) {
        var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].PaymentMemoId == paymentmemoid) {
                    var fileurl = Utility.DistributorReportUrl.replace("###MemoNumber###", CreateRackRate.remove_tags(gridData[i].MemoNumber));
                    fileurl = fileurl.replace("###Distributorid###", gridData[i].ARNNo);
                    CreateRackRate.openWin(fileurl);
                }
            }
        }
    },

    ViewCAMSreport: function (paymentmemoid) {
        var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].PaymentMemoId == paymentmemoid) {
                    var fileurl = Utility.TieUpCamsReportUrl.replace("###MemoNumber###", CreateRackRate.remove_tags(gridData[i].MemoNumber));
                    //fileurl = fileurl.replace("###Distributorid###", gridData[i].ARNNo);
                    CreateRackRate.openWin(fileurl);
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

    //*************************************************************For Advance Search ********************************************************

    RefreshGridDetails: function () {
        Utility.ListSearchText = '';
        CreateRackRate.GetCreateBaseRackRate();
    },

    //*************************************************************For Advance Search ends here ********************************************************

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
                                               '<input type="text" id="dt_from_' + Count + '" class="input-text-date-bx-style" disabled/>' +
                                           '</div>' +
                                        '</div>' +
                                   '</div>' +
                                '</div>' +
                               '<div class="col-md-2 col-sm-2  pd-right-00">' +
                                   '<div class="row">' +
                                       '<div class="col-md-7 col-sm-7">' +
                                            '<div class="date-outer-div">' +
                                               '<input type="text" id="dt_to_' + Count + '" class="input-text-date-bx-style" />' +
                                           '</div>' +
                                       '</div>' +
                                   '</div>' +
                               '</div>' +
                           '</div>'

    },
}

$(function () {
    CreateRackRate.ViewCreateRackRate();
    CreateRackRate.GetChannel("");

    $("#txt_arn").siblings("ul").remove();
    $("#txt_arn_name").siblings("ul").remove();

    CreateRackRate.GetDistributorCategory("");
    CreateRackRate.GetSchemeCategory("");
    CreateRackRate.GetScheme("");

    CreateRackRate.GetARN("");
    CreateRackRate.GetARNName("");
    sessionStorage.MemoStatus = "";
    sessionStorage.MemoFrom = "";

    $grid = $("#grid_search_result");

    var lastsel3;
    jQuery("#grid_search_result").jqGrid({
        datatype: "local",
        height: 250,
        width: null,
        shrinkToFit: false,
        sortable: true,
        ignoreCase: true,
        rowNum: 100,
        colNames: ['Select', 'Memo Number', 'MemoId', 'Memo Type', 'Memo Type ID', 'Category', 'ARN No', 'ARN Name', 'From Date', 'To Date', 'Status', 'Raised By', 'Raised On', 'Time', 'Ageing', 'Last Action By', 'Pending With', 'MemoLevel'],
        colModel: [
                { name: 'select', formatter: CreateRackRate.ReturnRadioBox, width: 50, search: false },
                  { name: 'MemoNumber', index: 'MemoNumber', align: 'right', formatter: CreateRackRate.ReturnSearchHyperLink, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'PaymentMemoId', index: 'PaymentMemoId', align: 'right', hidden: true },
                { name: 'MemoTypeName', index: 'MemoTypeName', width: 120, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'MemoTypeID', index: 'MemoTypeID', hidden: true },
                { name: 'DistributorCategoryName', width: 200, index: 'DistributorCategoryName', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'ARNNo', width: 100, index: 'ARNNo', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'ARNName', width: 240, index: 'ARNName', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'DateFrom', width: 100, index: 'DateFrom', align: 'center', sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
                { name: 'DateTo', width: 100, index: 'DateTo', align: 'center', sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
                { name: 'MemoStatus', index: 'MemoStatus', width: 100, sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'CreatedByName', index: 'CreatedByName', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                { name: 'RaisedOnDate', index: 'RaisedOnDate', width: 100, align: 'center', sorttype: 'date', datefmt: 'd/m/Y', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, searchoptions: { sopt: ['cn', 'eq', 'ne', 'lt', 'gt'] } },
                { name: 'RaisedOnTime', index: 'RaisedOnTime', width: 60, align: 'center', search: false },
                { name: 'Ageing', index: 'Ageing', width: 100, align: 'right', sorttype: 'integer', searchoptions: { sopt: ['cn', 'eq', 'ne', 'le', 'lt', 'gt', 'ge'] } },
                 { name: 'ModifiedByName', index: 'ModifiedByName', align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                  { name: 'PendingWith', index: 'PendingWith', align: 'left', sorttype: 'string', searchoptions: { sopt: ['cn', 'nc', 'eq', 'bw', 'ew', 'bn', 'en'] } },
                    { name: 'MemoLevel', index: 'MemoLevel', align: 'left', hidden: true },
        ],

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
    //        $.each(CreateRackRate.arns, function (key, value) {
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

    //CreateRackRate.GetCreateBaseRackRate();

});