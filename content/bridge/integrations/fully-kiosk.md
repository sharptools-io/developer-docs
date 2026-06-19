# Fully Kiosk Browser

The Fully Kiosk Browser integration connects to Android tablets running Fully Kiosk Browser on your local network.

## What You'll Need

- Fully Kiosk Browser installed on the tablet.
- Remote Admin enabled in Fully Kiosk Browser settings.
- The Remote Admin password.
- Local network access from Bridge to the tablet.

::: tip Enable Fully Kiosk Remote Admin
On the tablet running Fully Kiosk Browser, open the left navigation panel, go to **Settings**, and make sure Remote Admin is enabled.
:::

## Setup

1. Open the Bridge admin UI.
2. Select **Add Device**.
3. Choose **Fully Kiosk Browser**.
4. Select a discovered Remote Admin endpoint or enter the tablet address manually.
5. Enter the Remote Admin password.
6. Review the device name if Fully reports a more specific name.
7. Choose which Fully Kiosk resources should sync to SharpTools.

## Resources and Capabilities

Bridge creates one kiosk device resource per Fully Kiosk Browser tablet.

Supported capabilities include:

- **Switch** for screen on/off.
- **Battery** when battery level is reported.
- **Fully Kiosk** for kiosk commands and current URL status.

Supported commands include:

- Reload or load the start URL.
- Load a specific URL.
- Start or stop the screensaver.
- Trigger Fully motion.
- Bring Fully to the foreground or send it to the background.
- Start an Android application by package ID.
- Speak a phrase through text-to-speech.
- Execute an advanced command from the Fully Kiosk REST API.

## Advanced REST Commands

The `execute()` command can send advanced commands from the [Fully Kiosk REST API](https://www.fully-kiosk.com/en/#rest). Fully's REST documentation shows these as URLs with a `cmd=` value. Use that `cmd` value as the `command`, then put any other query parameters in `parameters`.

Bridge stores and sends the configured Fully Kiosk password automatically. Do not include `cmd`, `password`, or `type` in `parameters`.

```js
// Show a temporary overlay message
execute({
  command: 'setOverlayMessage',
  parameters: {
    text: 'Doorbell rang'
  }
})
```

```js
// Keep the tablet screen awake
execute({
  command: 'setBooleanSetting',
  parameters: {
    key: 'keepScreenOn',
    value: true
  }
})
```

```js
// Set media volume to 70%
execute({
  command: 'setAudioVolume',
  parameters: {
    level: 70,
    stream: 3
  }
})
```

```js
// Clear the Fully web cache
execute({
  command: 'clearCache'
})
```

## Notes and Limitations

Bridge currently polls Fully Kiosk status about every 30 seconds from the tablet's local connection. Discovery uses mDNS when available and bounded local subnet probing as a fallback.

## Troubleshooting

If discovery does not find the tablet, enter the Remote Admin URL manually. The default Fully Remote Admin port is usually `2323`. Docker port-mapped networking, VLANs, guest Wi-Fi isolation, or blocked local traffic can prevent discovery or Remote Admin access.
