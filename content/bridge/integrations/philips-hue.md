# Philips Hue

The Philips Hue integration connects compatible Hue lights, groups, scenes, and button devices through a local Hue bridge connection.

## What You'll Need

- A Philips Hue Bridge or compatible local Hue API bridge.
- Local network access from Bridge to the Hue bridge.
- Physical access to the Hue bridge link button during setup, unless you already have a Hue username or app key.

## Setup

1. Open the Bridge admin UI.
2. Select **Add Device**.
3. Choose **Hue**.
4. Select a discovered bridge or enter the bridge address manually.
5. Physically press the round link button on the top of the Hue Bridge when prompted.
6. Choose which Hue resources should be selected for SharpTools Cloud Sync.

## Resources and Capabilities

Bridge can discover these Hue resources:

- **Lights**: selectable device resources with switch, level, light, color, color temperature, and color mode capabilities when supported by the light.
- **Grouped lights, rooms, and zones**: selectable group resources with light-style controls when supported by the Hue bridge.
- **Scenes**: local scene resources with an activate command.
- **Buttons**: local event-source resources that track button events.

Lights are selected for cloud sync by default. Grouped lights can be selected for cloud sync. Scenes and buttons are currently tracked locally and are not cloud-selectable.

## Notes and Limitations

Bridge prefers Hue v2 resources when available and falls back to v1 light resources when needed. Hue v2 event streaming is used for light, group, and button updates when the bridge supports it.

Scenes and button events are available locally in Bridge, but cloud-facing event behavior is still being finalized.

## Troubleshooting

If discovery does not find the bridge, use manual entry with the bridge's local IP address. If registration fails, press the physical link button again and retry before the link-button window expires.
