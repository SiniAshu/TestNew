var CreateSIP = {
    arns: [],

    arnName: [],

    SIPCount: [],

    SearchClick: false,

    ViewCreateSIP: function () {
        $("ul.btm-nav-ul li").removeClass("active");
        $(".btm-nav-ul-li-nav_create").addClass("active");
        $("#div_btn").empty();
        input = $('<button class="btn btn-primary sq-btn mr-right-01" id="btn_search" onclick=\"CreateSIP.SearchButtonClick();\">Search</button> <button class="btn btn-warning sq-btn fr" onclick="CreateSIP.clearFields(); "><img src="../img/repeat-btn.png"></button>');
        //' <button class="btn btn-primary mr-right-01" onclick="CreateSIP.clearFields(); ">Reset</button>');
        //'<button class="btn btn-primary mr-right-01" id="btn_create_new" onclick=\"CreateSIP.CreateNewSIP();\">Create New</button>');
        $("#div_btn").append(input);

        
        $("#div_create_sip").show();

        //$("#div_content").hide();
        //$("#div_add_rack_rate").hide();
        //$("#div_landing_grid").hide();
        //$("#div_freeze").hide();
        //$("#div_manage").hide();
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

                    CreateSIP.GetDistributorCategory(selected.valueOf());
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
                //onChange: function (element, checked) {
                //    var brands = $('#dd_dist_category option:selected');
                //    var selected = [];
                //    $(brands).each(function (index, brand) {
                //        selected.push([$(this).val()]);
                //    });

                //    //CreateSIP.GetDistributorCategory(selected.valueOf());
                //    CreateSIP.GetARNForChannelAndDistributorCategory();
                //}
            });

        });
    },

    GetARN: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARN', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn").empty();
            CreateSIP.arns = JSON.parse(result.GetARNResult);
            $("#txt_arn").tokenInput(
            CreateSIP.arns,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    CreateSIP.GetDistributor(item.id, 'add', item.id);
                    //$('.token-input-selected-token-facebook').remove();
                },
                onDelete: function (item) {
                    CreateSIP.GetDistributor(item.id, 'remove', item.id);
                }
            });
        });

    },

    GetARNName: function (SearchText) {
        Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetARNName', JSON.stringify({ SearchText: "" }), "json", false, false, function (result) {
            $("#txt_arn_name").empty();
            CreateSIP.arnName = JSON.parse(result.GetARNNameResult);
            $("#txt_arn_name").tokenInput(
            CreateSIP.arnName,
            {
                theme: "facebook", preventDuplicates: true, resultsLimit: 10,
                onAdd: function (item) {
                    CreateSIP.LoadARNToken(item.id, 'add', item.id);
                },

                onDelete: function (item) {
                    CreateSIP.LoadARNToken(item.id, 'remove', item.id);
                }
            });
        });
    },

    GetDistributor: function (SearchText, mode, id) {
        if (mode == 'add') {
            //Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChildArn', JSON.stringify({ ArnNo: SearchText }), "json", false, false, function (result) {
            //    var Data = result.GetChildArnResult;
            //    if (Data.length > 1) {
            //        $.each(Data, function (i, obj) {

            //            $.each($("#txt_arn").tokenInput("get"), function (i, obj) {
            //                if (obj.id == obj.DistributorId) {
            //                    return;
            //                }
            //            });

            //            $("#txt_arn").tokenInput("add", { id: obj.DistributorId, name: obj.ARN });

            //            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributor', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
            //                var Data = result.GetDistributorResult;

            //                $.each($("#txt_arn_name").tokenInput("get"), function (i, obj) {
            //                    if (obj.id == Data[0].DistributorId) {
            //                        return;
            //                    }
            //                });
            //                $("#txt_arn_name").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });

            //            });
            //        });
            //    }
            //    else if (Data.length == 1) {

            //        $("#txt_arn_name").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });
            //    }
            //    else {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                var Data = result.GetDistributorBasedOnIDResult;
                $.each($("#txt_arn_name").tokenInput("get"), function (i, obj) {
                    if (obj.id == Data[0].DistributorId) {
                        return;
                    }
                });

                $("#txt_arn_name").tokenInput("add", { id: Data[0].DistributorId, name: Data[0].DistributorName });
            });
            //    }
            //});

        }
        else {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetDistributorBasedOnID', JSON.stringify({ SearchText: SearchText }), "json", false, false, function (result) {
                var Data = result.GetDistributorBasedOnIDResult;

                $("#txt_arn_name").tokenInput("remove", { id: id });
            });
        }
        //$("#txt_arn").removeClass('.token-input-selected-token-facebook');
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

    ReturnSearchHyperLink: function (cellValue, options, rowdata, action) {
        sessionStorage.CurrentMenuselected = "nav_information";
        if (rowdata.MemoStatus == "Active" || rowdata.MemoStatus == "InActive") {
            return '<a href="#" style="text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;"  onclick=\"CreateSIP.Viewreport(' + rowdata.PaymentMemoId + ');\">' + rowdata.MemoNumber + '</a>';
        }
        else {
            return "<a style='text-decoration:none; color:#006bb4;border-bottom:1px solid #006bb4;'  href='SIPInformation.html?memono=" + rowdata.PaymentMemoId + "&status=" + rowdata.MemoStatus + "&ptype=cr' >" + rowdata.MemoNumber + "</a>";
        }
    },

    Viewreport: function (paymentmemoid) {
        var gridData = jQuery("#grid_search_result").jqGrid('getRowData');
        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i].PaymentMemoId == paymentmemoid) {
                    var fileurl = Utility.SIPReportUrl.replace("###MemoNumber###", CreateSIP.remove_tags(gridData[i].MemoNumber));
                    fileurl = fileurl.replace("###Distributorid###", gridData[i].ARNNo);
                    CreateSIP.openWin(fileurl);
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


    //ReturnCheckBox: function (cellValue, options, rowdata, action) {
    //    return "<input type='checkbox' />";
    //},

    ReturnRadioBox: function (cellValue, option) {
        return '<input type="radio" style="display: block;margin-left: auto;margin-right: auto;" name="radio_' + option.gid + '"  />';
    },

    SearchButtonClick: function () {
        CreateSIP.SearchClick = true;
        CreateSIP.GetCreateSIP();
    },

    GetCreateSIP: function () {
        sessionStorage.removeItem("CopyMemoNo");
        sessionStorage.removeItem("ARNNo");
        sessionStorage.removeItem("DistributorCategoryName");
        sessionStorage.removeItem("CopyMemoStatus");
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

        sessionStorage.setItem("DistributorCategoryCreate", DistributorCategory);
        sessionStorage.setItem("ChannelCreate", Channel);
        sessionStorage.setItem("ARNCreate", ARNNo);

        var SearchGridResult;
        var MemoStatus = "All";
        var MasterQueueStatus = "";

        if (DistributorCategory == "" && Channel == "" && ARNNo == "" && ARNName == "") {
            if (CreateSIP.SearchClick == true) {
                Utility.writeNotification("error", "Please do a Selection.", "", false);
                CreateSIP.SearchClick = false;
            }
            $('#grid_search_result').jqGrid('clearGridData');
        }
        else {
            var Service = 'BaseRackRateService.svc/GetCreateSIP';
            var InputData = JSON.stringify({ ArnNo: ARNNo, Channel: Channel, DistributorCategory: DistributorCategory, Status: MemoStatus, MasterQueueStatus: MasterQueueStatus, ARNName: ARNName, SearchFilter: Utility.ListSearchText });


            Utility.ServiceCall("POST", Service, InputData, "json", false, false, function (result) {
                //console.log(result);
                SearchGridResult = result.GetCreateSIPResult;

                $('#grid_search_result').jqGrid('clearGridData');
                if (SearchGridResult != undefined && SearchGridResult.length > 0) {
                    for (var i = 0; i < SearchGridResult.length; i++) {
                        SearchGridResult[i].MemoTypeName = "SIP";
                        jQuery("#grid_search_result").jqGrid('addRowData', SearchGridResult[i].PaymentMemoId, SearchGridResult[i]);
                    }
                }
                else {
                    if (CreateSIP.SearchClick == true) {
                        Utility.writeNotification("norecords", "No Records Found", "", false);
                        CreateSIP.SearchClick = false;
                    }
                }
            });
        }
    },

    CreateNewSIP: function () {
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
        }

        if (Channelcategorydata.length > 0 || ARNSelected != "") {
            Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetChannelForARNAndDistributorCategory', JSON.stringify({ ARN: ARNSelected, DistributorCategory: Channelcategorydata.toString() }), "json", false, false, function (result) {
                var data = result.GetChannelForARNAndDistributorCategoryResult;
                if (data.length > 2) {
                    error += "ARN/Distributor Category Belong to more than 2 Channel. <br/>";
                }
            });
        }

        if (error == "") {
            if (!(ARNSelected == "" && Channelselected.toString() == "" && Categoryselected.toString() == ""))

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
                        //if (Categoryselected.toString() == "") {
                        //    Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSlabAvailability', JSON.stringify({ DistributorCategoryID: catdata.toString(), Arnno: ARNSelected }), "json", false, false, function (result) {
                        //        //slabamount = result.GetSlabResult;
                        //    });
                        //}
                        //else {
                        //    Utility.ServiceCall("POST", 'BaseRackRateService.svc/GetSlabAvailability', JSON.stringify({ DistributorCategoryID: Categoryselected.toString(), Arnno: ARNSelected }), "json", false, false, function (result) {
                        //        //slabamount = result.GetSlabResult;
                        //    });

                        //}
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

            if (Categoryselected.toString() == "" && Channelselected.toString() == "" && ARNSelected == "") {
                Utility.writeNotification("error", "Please do a Selection.", "", false);
            }
            else {
                sessionStorage.setItem('Channel', Channelselected.toString())
                sessionStorage.setItem('DistributorCategory', Categoryselected.toString())
                sessionStorage.setItem('ARN', ARNSelected)

                sessionStorage.CurrentMenuselected = "nav_information";

                window.location.href = "SIPInformation.html"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId;
            }


        }
        else { Utility.writeNotification("error", error, "", true); }
        return false;
    },

    clearFields: function () {
        sessionStorage.removeItem("DistributorCategory");
        sessionStorage.removeItem("Channel");
        sessionStorage.removeItem("ARN");

        $('#txt_arn').tokenInput('clear');
        $('#dd_dist_category').multiselect('clearSelection');
        $('#dd_channel').multiselect('clearSelection');

        Utility.ListSearchText = '';
        CreateSIP.SearchClick = true;
        CreateSIP.GetCreateSIP();
    },

    RefreshSearchGrid: function () {
        $('#grid_search_result').trigger("reloadGrid");
    },

    CopySIP: function () {
        var RoleID = sessionStorage.getItem("RoleID");
        sessionStorage.CurrentMenuselected = "nav_information";
        var memono = sessionStorage.getItem("CopyMemoNo");
        if (sessionStorage.CopyMemoStatus == "Active" || sessionStorage.CopyMemoStatus == "InActive") {
            if (memono == null || memono == "") {
                Utility.writeNotification("warning", "Select a Memo to Copy", "", true);
                //alert("Select a Memo to Copy");
            }
            else {
                if (sessionStorage.CopyMemoStatus == "Active" || sessionStorage.CopyMemoStatus == "InActive") {
                    if (RoleID == "1" || RoleID == "2" || RoleID == "4" || RoleID == "5") {
                        if (sessionStorage.getItem("ARNNo") == "")
                            Utility.writeNotification("error", "You are not authorized to copy of a distributor category memo", "", true);
                        else if (sessionStorage.getItem("DistributorCategoryName").toString().trim() != "")
                            Utility.writeNotification("error", "You are not authorized to copy of a distributor category memo", "", true);
                        else {
                            window.location.href = "SIPInformation.html?memono=" + memono + "&mode=copy";  //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + memono + "&mode=copy
                            return false;
                        }
                    }
                    else {
                        window.location.href = "SIPInformation.html?memono=" + memono + "&mode=copy"; //?tokenkey=" + sessionStorage.sessionId + "&user=" + sessionStorage.userId + "&memono=" + memono + "&mode=copy
                        return false;
                    }
                }
                else {
                    Utility.writeNotification("warning", "Select Active/Inactive Memo to Copy", "", true);
                }
            }
        } else {
            Utility.writeNotification("warning", "Select Active/Inactive SIP Memo to Copy", "", true);
        }

    },


    //*******************************************************Modify Validity********************************************************************************************

    ModifyValidity: function () {
        //sessionStorage.CurrentMenuselected = "nav_information";
        var memono = sessionStorage.getItem("CopyMemoNo");
        if (sessionStorage.CopyMemoStatus == "Active") {
            $('#div_tie_up_Controls').empty();

            if (memono == null || memono == "") {
                Utility.writeNotification("warning", "Select a Memo to Copy", "", true);
                //alert("Select a Memo to Copy");
            }
            else {
                if (sessionStorage.CopyMemoStatus == "Active") {
                    if (sessionStorage.MemoLevel == "F") {
                        $("#modalModifyValiditysplit").modal('show')
                        CreateSIP.LoadModifyValidity(memono);
                    }
                    else
                    {
                        Utility.writeNotification("warning", "User cannot modify validity of the selected memo as the memo is not yet frozen", "", true);
                    }
                } else {
                    Utility.writeNotification("warning", "Select Active Memo to Modify Validity", "", true);
                }
            }
        }
        else {
            Utility.writeNotification("warning", "Select Active SIP Memo to Modify Validity", "", true);
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
            $('#div_tie_up_Controls').empty();
            CreateSIP.ModifyRowCount = 0;
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
                            $('#div_tie_up_Controls').append(CreateSIP.LoadTieUpControls(CreateSIP.ModifyRowCount, 'none', 'block'));

                            $('#txt_id_' + CreateSIP.ModifyRowCount).val(obj.DistributorCategoryId);
                            $('#lbl_dist_arn_' + CreateSIP.ModifyRowCount).text(obj.DistributorCategoryName);
                            $('#lbl_arn_name_' + CreateSIP.ModifyRowCount).text("");
                            $('#dt_from_' + CreateSIP.ModifyRowCount).val(obj.DateFrom);
                            $('#dt_to_' + CreateSIP.ModifyRowCount).val(obj.DateTo);

                            $('#dt_to_' + CreateSIP.ModifyRowCount).datepicker({
                                dateFormat: 'dd/mm/y',
                                changeMonth: true,
                                changeYear: true,
                                maxDate: obj.DateTo
                            });

                            $('#dt_to_' + CreateSIP.ModifyRowCount).datepicker("option", "minDate", obj.DateFrom);
                            CreateSIP.ModifyRowCount++;
                        } else {
                            $('#div_tie_up_Controls').append(CreateSIP.LoadTieUpControls(CreateSIP.ModifyRowCount, 'block', 'none'));

                            $('#txt_id_' + CreateSIP.ModifyRowCount).val("");

                            $('#lbl_dist_arn_' + CreateSIP.ModifyRowCount).text(obj.ARNNO);
                            $('#lbl_arn_name_' + CreateSIP.ModifyRowCount).text(obj.ARNName);
                            $('#dt_from_' + CreateSIP.ModifyRowCount).val(obj.DateFrom);
                            $('#dt_to_' + CreateSIP.ModifyRowCount).val(obj.DateTo);

                            $('#dt_to_' + CreateSIP.ModifyRowCount).datepicker({
                                dateFormat: 'dd/mm/y',
                                changeMonth: true,
                                changeYear: true,
                                maxDate: obj.DateTo
                            });
                            $('#dt_to_' + CreateSIP.ModifyRowCount).datepicker("option", "minDate", obj.DateFrom);
                            CreateSIP.ModifyRowCount++;
                        }

                    });
                });

            });

        }
    },


    SaveModifyValidity: function () {
        if (CreateSIP.ValidateModifyValidity()) {
            var modifydetail = [];
            for (var cnt = 0; cnt < CreateSIP.ModifyRowCount; cnt++) {
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

            CreateSIP.GetCreateSIP();
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
                for (var cnt = 0; cnt < CreateSIP.ModifyRowCount; cnt++) {
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

    //*************************************************************For Advance Search ********************************************************

    Search_AdvanceSearchClick: function () {
        CreateSIP.SearchClick = true;
        CreateSIP.GetCreateSIP();
    },

    RefreshSIPGrid: function () {
        Utility.ListSearchText = '';
        CreateSIP.SearchClick = true;
        CreateSIP.GetCreateSIP();
    },

    //*************************************************************For Advance Search ends here ********************************************************

}

$(function () {
    var RoleID = sessionStorage.getItem("RoleID");
    if (RoleID == 1 || RoleID == 2 || RoleID == 4) {
        $('#div_create_sip').hide();

        $('#hdr_name').html("No Access");
        return false;
    }
    CreateSIP.ViewCreateSIP();
    CreateSIP.GetChannel("");

    $("#txt_arn").siblings("ul").remove();
    $("#txt_arn_name").siblings("ul").remove();

    CreateSIP.GetDistributorCategory("");

    CreateSIP.GetARN("");
    CreateSIP.GetARNName("");
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
        rowNum: -1,
        colNames: ['Select', 'Memo Number', 'MemoId', 'Memo Type', 'Memo Type ID', 'Category', 'ARN No', 'ARN Name', 'From Date', 'To Date', 'Status', 'Raised By', 'Raised On', 'Time', 'Ageing', 'Last Action By', 'Pending With', 'Memo','MemoLevel'],
        colModel: [
                { name: 'select', formatter: CreateSIP.ReturnRadioBox, width: '60px;' },
                { name: 'MemoNumber', index: 'MemoNumber', align: 'right', formatter: CreateSIP.ReturnSearchHyperLink },
                { name: 'PaymentMemoId', index: 'PaymentMemoId', align: 'right', hidden: true },
                { name: 'MemoTypeName', index: 'MemoTypeName', width: 120 },
                { name: 'MemoTypeID', index: 'MemoTypeID', hidden: true },
                { name: 'DistributorCategoryName', width: 200, index: 'DistributorCategoryName' },
                { name: 'ARNNo', width: 90, index: 'ARNNo' },
                { name: 'ARNName', width: 260, index: 'ARNName' },
                { name: 'DateFrom', width: 90, index: 'DateFrom', align: 'center' },
                { name: 'DateTo', width: 90, index: 'DateTo', align: 'center' },
                { name: 'MemoStatus', index: 'MemoStatus', width: 90 },
                { name: 'CreatedByName', index: 'CreatedByName' },
                { name: 'RaisedOnDate', index: 'RaisedOnDate', width: 90, align: 'center' },
                { name: 'RaisedOnTime', index: 'RaisedOnTime', width: 50, align: 'center' },
                { name: 'Ageing', index: 'Ageing', width: 70, align: 'right' },
                { name: 'ModifiedByName', index: 'ModifiedByName', align: 'left' },
                { name: 'PendingWith', index: 'PendingWith', align: 'left' },
                { name: 'PaymentMemoId', index: 'PaymentMemoId', align: 'right', hidden: true },
                { name: 'MemoLevel', index: 'MemoLevel', align: 'left', hidden: true },
        ],

        gridComplete: function () {
            $("td[aria-describedby=grid_search_result_select] input[type='radio']").click(function () {
                var $selRadio = $('input[name=radio_' + $grid[0].id + ']:radio:checked'), $tr;
                if ($selRadio.length > 0) {
                    $tr = $selRadio.closest('tr');
                    if ($tr.length > 0) {
                        if ($tr.find('td:eq(4)').text() == "1") {
                            sessionStorage.setItem("CopyMemoNo", $tr.find('td:eq(2)').text())
                            sessionStorage.setItem("ARNNo", $tr.find('td:eq(6)').text())
                            sessionStorage.setItem("DistributorCategoryName", $tr.find('td:eq(5)').text())
                            sessionStorage.setItem("CopyMemoStatus", $tr.find('td:eq(10)').text())
                            sessionStorage.setItem("MemoLevel", $tr.find('td:eq(18)').text())
                        }
                        if ($tr.find('td:eq(4)').text() == "2" || $tr.find('td:eq(4)').text() == "5") {
                            sessionStorage.setItem("CopyMemoNo", $tr.find('td:eq(2)').text())
                            sessionStorage.setItem("ARNNo", $tr.find('td:eq(6)').text())
                            sessionStorage.setItem("DistributorCategoryName", $tr.find('td:eq(5)').text())
                            sessionStorage.setItem("CopyMemoStatus", $tr.find('td:eq(10)').text())
                            sessionStorage.setItem("MemoLevel", $tr.find('td:eq(18)').text())
                        }
                        
                    }
                } else {
                    Utility.writeNotification("warning", "Select a Memo", "", true);
                }
            });
        }
    });

    //var DistributorCategoryCreate = sessionStorage.getItem("DistributorCategoryCreate") == null ? "" : sessionStorage.getItem("DistributorCategoryCreate").split(",");
    //var ChannelCreate = sessionStorage.getItem("ChannelCreate") == null ? "" : sessionStorage.getItem("ChannelCreate").split(",");
    //var ARNCreate = sessionStorage.getItem("ARNCreate") == null ? "" : sessionStorage.getItem("ARNCreate").split(",");

    //$('#txt_arn').tokenInput('clear');
    //$('#dd_dist_category').multiselect('clearSelection'); 
    //$('#dd_channel').multiselect('clearSelection');

    //if (ARNCreate != null) {
    //    for (var i = 0; i < ARNCreate.length ; i++) {
    //        $.each(CreateSIP.arns, function (key, value) {
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

    CreateSIP.GetCreateSIP();
});