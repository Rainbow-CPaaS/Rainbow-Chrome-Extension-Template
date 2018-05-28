var pending_request_id = null;
console.log("[Rainbow Sharing] :: Rainbow Rainbow Sharing background script started!");

if (chrome && chrome.runtime && chrome.runtime.onConnectExternal) {
    console.log("[Rainbow Sharing] :: waiting for a connection from Rainbow...");

    chrome.runtime.onMessageExternal.addListener(
      function(request, sender, sendResponse) {
        "use strict";
        if (request && request.type === "ping") {
            console.log("[Rainbow Sharing] :: --> 'ping'");
            console.log("[Rainbow Sharing] :: <-- 'pong'");
            sendResponse({type:"pong", code: 0});
        }
        else {
            console.log("[Rainbow Sharing] :: --> 'request unknown'");
            sendResponse({type:"forbidden", code: 0});
        }
      }
    );

    chrome.runtime.onConnectExternal.addListener(function(port) {
        "use strict";
        console.log("[Rainbow Sharing] :: connected");
        console.log("[Rainbow Sharing] :: waiting for a message from Rainbow...");

        port.onMessage.addListener(function(msg) {
            console.log("[Rainbow Sharing] :: message", msg);
            port.postMessage(msg);

            switch (msg.type) {
                case "login":
                    console.log("[Rainbow Sharing] :: --> 'login'");
                    console.log("[Rainbow Sharing] :: <-- 'loginResponse'");
                    port.postMessage({type:"loginResponse", code: 0});
                    break;
                case "getVersion":
                    console.log("[Rainbow Sharing] :: --> 'getVersion'");
                    console.log("[Rainbow Sharing] :: <-- 'getVersionResponse'");
                    var currentVersion = chrome.runtime.getManifest().version;
                    port.postMessage({type:"getVersionResponse", code: 0, version: currentVersion});
                    break;
                case "startsharing":
                    console.log("[Rainbow Sharing] :: --> 'startsharing'");
                    pending_request_id = chrome.desktopCapture.chooseDesktopMedia(["screen", "window"], port.sender.tab, function(id) {
                      if (!id) {
                          console.log("[Rainbow Sharing] :: <-- 'startsharingResponse'", null);
                          port.postMessage({type: "startsharingResponse", code: -1, streamID: null});
                          return;
                      }
                      console.log("[Rainbow Sharing] :: <-- 'startsharingResponse'", id);
                      port.postMessage({type: "startsharingResponse", code: 0, streamID: id});
                    });
                    break;
                case "endsharing":
                    console.log("[Rainbow Sharing] :: --> 'endsharing'");
                    console.log("[Rainbow Sharing] :: <-- 'endsharingResponse'");
                    chrome.desktopCapture.cancelChooseDesktopMedia(pending_request_id);
                    pending_request_id = null;
                    port.postMessage({type: "endsharingResponse", code: 0});
                    break;
                default:
                    console.log("[Rainbow Sharing] :: Message not managed", msg.type);
                    break;
            }
        });
    });
}
