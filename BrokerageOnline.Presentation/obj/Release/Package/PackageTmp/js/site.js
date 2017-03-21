var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
var site = {
    i :0
}

$(document).ready(function () {
    $(function () {
        $(".alert-head").click(function () {
            if (site.i == 0) {
                $(".alert-sect-outer").animate({
                    right: "0px"
                }, 800);
                site.i = 1;


            } else {
                $(".alert-sect-outer").animate({
                    right: "-450px"
                }, 600);
                site.i = 0;

            }
        })
    });


});


