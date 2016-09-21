chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        }, function(activeTab) {
            if (activeTab[0].id == tab.id && changeInfo.status && changeInfo.status == "complete") {
                if(tab.url.indexOf("watch") > -1){
                  chrome.tabs.sendMessage(tab.id, {
                      text: 'setSize'
                  });
                }
            }
        });

});
