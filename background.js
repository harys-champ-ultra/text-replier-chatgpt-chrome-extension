chrome.contextMenus.create({
    id: "my-custom-menu-" + new Date().getTime(),
    title: "Text Replier ChatGPT Chrome Extension",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    chrome.windows.create({
        url: "popup.html?selectedText=" + encodeURIComponent(info.selectionText),
        type: "popup",
        width: 640,
        height: 480
    });
});
