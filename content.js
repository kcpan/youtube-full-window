var width;
var offset;
var height;

chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);

  width = $(body).innerWidth();
  offset = $("#masthead-positioner").height();
  height = $(window).height()-offset;


  if ($(".ytp-size-button").attr("title")=="Default view") {
      $("#player-api").css({left: 0});
      $("#player-api").css({marginLeft: 0});
      $("#player-api").height(height);
      $("#player-api").width(width);
      $("#placeholder-player").height(height);
      $("video").height(height);
      $("video").width(width);
      $(".ytp-chrome-bottom").width(width-24);
   }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.text == "setSize")
      {
        if ($(".ytp-size-button").attr("title")=="Default view") {
            width = $(body).innerWidth();
            offset = 50;
            height = $(window).height()-offset;

            $("#player-api").css({left: 0});
            $("#player-api").css({marginLeft: 0});
            $("#player-api").height(height);
            $("#player-api").width(width);
            $("video").height(height);
            $("video").width(width);
            $("video").css({top:0});
            $(".ytp-chrome-bottom").width(width-24);
            $("#placeholder-player").height(height);
         }
      }
  });
