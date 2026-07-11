# Plex

The Plex integration connects SharpTools Bridge to Plex Media Servers and exposes supported Plex players as devices for dashboards and rules.

## What You'll Need

- A Plex Media Server reachable from Bridge on the local network.
- A Plex account with access to the server.
- Plex player apps already connected to that server.

## Setup

1. Open the Bridge admin UI.
2. Select **Add Device**.
3. Choose **Plex**.
4. Select **Sign In With Plex** and approve SharpTools Bridge access to your Plex account.
5. Choose a reachable Plex Media Server from your account.
6. Open or start playback on Plex clients that do not appear automatically, then select **Scan Again** if needed.
7. Choose which Plex players should sync to SharpTools.

Bridge remembers the Plex account authorization so another accessible server can be added later. Advanced setup also supports a local server URL and Plex token when account sign-in or automatic server discovery is not appropriate.

## Player Resources and Capabilities

Bridge creates one media player device for each discovered Plex client. Default names include the integration name, such as **Plex Apple TV**, so generic client names remain recognizable in the device list.

Every player reports **Media Playback** status. Additional capabilities are included only when the Plex client advertises or demonstrates support for them:

- **Media Track Control** for next and previous track.
- **Audio Volume** and **Audio Mute** when those controls are available.
- **Audio Track Data** for the current title, artist, album, series, position, duration, media type, and artwork when reported.
- **Audio Notification** for playing supported Plex library items.

Available commands can include play, pause, stop, seek, next or previous track, volume, mute, and play track. Some Plex clients report state but do not expose a controllable Plex Companion endpoint; those clients remain useful for status but may have fewer or no commands.

## Discovery and Refresh Behavior

Plex clients may be discovered from active sessions, Plex account resources, or Plex Companion endpoints. Some clients only appear while the app is open, awake, or actively playing media.

Bridge listens for Plex websocket notifications and also refreshes sessions periodically. Previously discovered players are remembered when they become idle so they do not disappear from dashboards. A remembered player is shown as stopped, and its previously confirmed command profile is retained.

## Managing Plex

From the Plex integration settings, you can:

- Refresh players and choose which ones sync to SharpTools.
- Scan again for controllable clients.
- Connect another Plex Media Server.
- Update server credentials.
- Remove a configured server.
- Restore players that were previously forgotten.

## Removing and Restoring Players

Removing a Plex player deletes its local Bridge device and adds the player to the server's ignored-player list. If Plex reports that player again, Bridge does not automatically recreate it. This keeps clients you intentionally removed from repeatedly returning to the device list.

To restore an ignored player:

1. Open **Integrations** and select **Plex**.
2. Open the **...** menu and choose **Manage Plex Servers**.
3. Select the server that reported the player.
4. Choose **Manage Ignored Players**.
5. Select the player and confirm **Allow Player**.

Allowing the player removes it from the ignore list. If it is currently active or appears again later, Bridge can recreate it and let you select it for Cloud Sync.

## Notes and Limitations

- Player capabilities vary by Plex app, device, and whether Plex Companion remote control is available.
- A player visible in Plex does not necessarily support remote commands.
- Clients on another network, sleeping clients, and clients that advertise only public addresses may not be directly controllable from Bridge.
- Manual token setup is intended mainly for advanced or recovery scenarios. Use Plex account sign-in when possible.

## Troubleshooting

If a player is missing, open the Plex app on that device, start playback if necessary, and run **Scan Again**. Confirm that Bridge can reach both the Plex Media Server and the player on the local network.

If status appears but commands do not, the Plex client may not expose a compatible Plex Companion control endpoint. Review the Plex integration logs for session and client discovery details.
