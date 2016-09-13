chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([{
            // That fires when a page's URL contains a 'g' ...
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        urlMatches: 'youtube\.com\/(watch|v)'
                    },
                })
            ],
            // And shows the extension's page action.
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});


chrome.pageAction.onClicked.addListener(
    function(tab) {

        var regex = /^.*(youtu.be\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = tab.url.match(regex);


        if (match && match[2].length == 11) {
            var newUrl = 'https://youtube.com/v/' + match[2];
            chrome.tabs.update(tab.id, {
                url: newUrl
            });
        } else {

            var regex2 = /^.*(youtube\.com\/v\/)([^#\&\?]*).*/;
            var match2 = tab.url.match(regex2);
            if (match2 && match2[2].length == 11) {
                var newUrl = 'https://youtube.com/watch?v=' + match2[2];
                chrome.tabs.update(tab.id, {
                    url: newUrl
                });
            }
        }

    });
