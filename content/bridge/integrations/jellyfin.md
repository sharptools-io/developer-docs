# Jellyfin

The Jellyfin integration connects SharpTools Bridge to a Jellyfin Server and exposes supported Jellyfin player sessions as devices for dashboards and rules.

## What You'll Need

- A Jellyfin Server reachable from Bridge on the local network.
- A Jellyfin username and password, or an API key from the Jellyfin dashboard.
- Jellyfin player apps connected to the server.

## Setup

1. Open the Bridge admin UI.
2. Select **Add Device**.
3. Choose **Jellyfin**.
4. Select a discovered Jellyfin Server or enter its local URL manually.
5. Choose **Sign In** and enter your Jellyfin username and password. API key setup is also available for advanced or recovery scenarios.
6. Open or start playback on Jellyfin clients that do not appear automatically, then refresh the player list.
7. Choose which Jellyfin players should sync to SharpTools.

When using **Sign In**, Bridge exchanges the password for an access token and does not store the password. Tokens and API keys are stored in Bridge's local secret storage.

## Player Resources and Capabilities

Bridge creates one media player device for each usable Jellyfin session or client. Default names include the integration name, such as **Jellyfin Chrome**, so generic client names remain recognizable in the device list.

Every player reports **Media Playback** status. Additional capabilities are included only when the current Jellyfin client reports support for them:

- **Media Track Control** for next and previous track.
- **Audio Volume** and **Audio Mute**.
- **Audio Track Data** for current media details and artwork.
- **Audio Notification** when the client supports launching media.

Available commands can include play, pause, stop, seek, next or previous track, volume, mute, and play track. The exact command list varies by client.

## Discovery and Refresh Behavior

Bridge uses local Jellyfin server discovery when available and supports manual server URLs when discovery cannot cross Docker, VLAN, or firewall boundaries.

Player resources come from sessions reported by the Jellyfin Server. Some clients only appear while awake, connected, or actively playing. Bridge listens for Jellyfin websocket updates and also refreshes sessions periodically. Previously discovered players are remembered as stopped when their active session disappears.

## Managing Jellyfin

From the Jellyfin integration settings, you can:

- Refresh players and update Cloud Sync selections.
- Connect another Jellyfin Server.
- Update sign-in or API key credentials.
- Remove a configured server.
- Restore players that were previously forgotten.

## Removing and Restoring Players

Removing a Jellyfin player deletes its local Bridge device and adds the player to the server's ignored-player list. If Jellyfin reports that player again, Bridge does not automatically recreate it. This keeps clients you intentionally removed from repeatedly returning to the device list.

To restore an ignored player:

1. Open **Integrations** and select **Jellyfin**.
2. Open the **...** menu and choose **Manage Jellyfin Servers**.
3. Select the server that reported the player.
4. Choose **Manage Ignored Players**.
5. Select the player and confirm **Allow Player**.

Allowing the player removes it from the ignore list. If it is currently active or appears again later, Bridge can recreate it and let you select it for Cloud Sync.

## Notes and Limitations

- Player capabilities depend on the commands reported by each Jellyfin client.
- Idle sessions with no media and no supported controls are not exposed as player devices.
- Some clients provide playback state but do not allow every remote-control command.
- API key setup is intended mainly for advanced or recovery scenarios. Use username and password sign-in when possible.

## Troubleshooting

If discovery does not find the server, enter the local Jellyfin Server URL manually and confirm Bridge can reach it.

If a player is missing, open the Jellyfin app or start playback, then refresh the player list. Review the Jellyfin integration logs for authentication, session, websocket, or command errors.
