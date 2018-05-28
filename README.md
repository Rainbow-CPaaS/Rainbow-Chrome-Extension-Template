# ALE Rainbow Chrome Extension template

![alt text](./rainbow_128.png)

Welcome to the Alcatel-Lucent Enterprise **Rainbow Chrome Extension Template**!

The Alcatel-Lucent Enterprise (ALE) Rainbow Chrome Extension Template will help you to integrate sharing into your Rainbow Web SDK integration.

See our [Rainbow SDK for Web](https://hub.openrainbow.com/#/web) for details.

## Get started

Our template use the specification of the [Chrome desktopCapture API](https://developer.chrome.com/extensions/desktopCapture) in order the offer the feature.

### How to modify?

In order to use this template you need to customize the [***manifest.json.sample***](./manifest.json.sample) and rename it into ***manifest.json***

```
{
...
    "permissions": [
        "desktopCapture", "<add here all your domains from where the Rainbow SDK for web library is used>"
    ],
    "externally_connectable": {
        "matches": ["<add here all your domains from where the Rainbow SDK for web library is used>"]
    },
...
}
```

### How to publish?

Learn more about how to publish a chrome extension in Google App Store:

* https://developer.chrome.com/webstore/publish

### How to use?

Once you publish, you have to use the associated [AppId](https://developer.chrome.com/webstore/publish#get-the-app-id) into the Rainbow SDK [setChromeExtensionIdForSharing](https://hub.openrainbow.com/#/documentation/doc/sdk/web/api/webRTC#module_WebRTC.setChromeExtensionIdForSharing) 

