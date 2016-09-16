var isBig = false;

chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([{
            // That fires when a page's URL contains a 'g' ...
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        urlMatches: 'youtube\.com\/(watch)'
                    },
                })
            ],
            // And shows the extension's page action.
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello")
            sendResponse({
                farewell: "goodbye"
            });
    });

chrome.pageAction.onClicked.addListener(
    function(tab) {
        chrome.tabs.sendMessage(tab.id, {
            text: 'setSize'
        });
    });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log(changeInfo);

    if (typeof changeInfo.title !== "undefined" && changeInfo.title != "Youtube") {
        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        }, function(activeTab) {
            if (activeTab[0].id == tab.id) {
                chrome.tabs.sendMessage(tab.id, {
                    text: 'setSize'
                });
            }
        });
    }
});
