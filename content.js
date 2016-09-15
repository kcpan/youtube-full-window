var isBig = false;
var firstRun = true;
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

    var width = $(body).innerWidth();
    var offset = $("#masthead-positioner").height();
    var height = $(window).height()-offset;

    if(firstRun){
      var oWidth = $("#player-api").height();
      var oHeight = $("#player-api").height();
      var oLeft = $("#player-api").css('left');
      firstRun = false;
      console.log(oWidth + " " + oHeight);
    }

    if (msg.text === 'setSize' && $(".ytp-size-button").attr("title")=="Default view" && !isBig) {
        $("#player-api").css({left: 0});
        $("#player-api").css({marginLeft: 0});
        $("#player-api").height(height);
        $("#player-api").width(width);
        $("#placeholder-player").height(height);
        $("video").height(height);
        $("video").width(width);
        $(".ytp-chrome-bottom").width(width-24);
        isBig = true;
     } else if(isBig){
       $("#player-api").css("left", oLeft);
       $("#player-api").css("margin-left", "50%");
       $("#player-api").height(oHeight);
       $("#player-api").width(oLeft);
       $("#placeholder-player").height(oHeight);
       $("video").height(oHeight);
       $("video").width(oWidth);
       $(".ytp-chrome-bottom").width(oWidth-24);
       isBig = false;
     }
});
