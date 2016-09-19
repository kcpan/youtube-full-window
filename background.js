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


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log(changeInfo);
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

});
