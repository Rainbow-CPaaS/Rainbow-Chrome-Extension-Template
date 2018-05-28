window.browser = (function() {
    "use strict";
    return window.msBrowser ||
        window.browser ||
        window.chrome;
}());

console.log("Rainbow Sharing content script started!");
