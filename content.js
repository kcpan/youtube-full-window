var width;
var offset;
var height;

var isTheatre;
var resizeTimer;

$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        changeSize();
    }, 250);
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.text == "setSize") {

            if (document.getElementsByClassName("ytp-size-button")[0].title == "Default view") {
                isTheatre = true;
            } else {
                isTheatre = false;
            }

            changeSize();
            setPlayer();

            $(".ytp-size-button").click(function() {
                console.log("clicked");
                isTheatre = !isTheatre;
                changeSize();
            });
        }

    });



function changeSize() {
    if (!isTheatre) {
        defaultSize();
        setPlayer();
    } else {
        width = $("body").innerWidth();
        offset = 50;
        height = $(window).height() - offset;
        setPlayer();
    }
}

function setPlayer() {
    if (isTheatre) {
        $("#player-api").css({
            left: 0,
            marginLeft: 0
        });
    }
    $("#player-api").height(height);
    $("#player-api").width(width);
    $("video").height(height);
    $("video").width(width);
    $("video").css({
        top: 0
    });
    $(".ytp-chrome-bottom").width(width - 24);
    $("#placeholder-player").height(height);
};

function defaultSize() {
    wWidth = window.innerWidth;
    wHeight = window.innerHeight;
    if (wWidth < 657) {
        width = 426;
        height = 240;
    } else if (wWidth < 1293 || wHeight < 630) {
        width = 640;
        height = 360;
    } else if (wWidth < 1720 || wHeight < 980) {
        width = 854;
        height = 480;
    } else {
        width = 1280;
        height = 720;
    }
};
