$(function () {
    var input;
    var now = new Date();
    var dtString = parseInt(now.getDate()) + "/" + (parseInt(now.getMonth()) + 1) + "/" + now.getFullYear();
    $("#spn_date").text(dtString);

    //RackRate.startTime();

    $("#nav_create").click(function () {
        window.location.href = "CreateRackRate.html";
        return false;
    });

    $("#nav_information").click(function () {
        window.location.href = "RackRateInformation.html";
        return false;
    });

    $("#nav_initiate").click(function () {
        RackRate.ViewInitiateRackRate();
    });

    $("#nav_review").click(function () {
        RackRate.ViewRackRateReview();
    });

    $("#nav_approval").click(function () {
        RackRate.ViewRackRateApproval();
    });

    $("#nav_freeze").click(function () {
        RackRate.ViewFreezeRackRate();
    });

    $("#nav_manage").click(function () {
        RackRate.ViewManageRackRate();
    });
});