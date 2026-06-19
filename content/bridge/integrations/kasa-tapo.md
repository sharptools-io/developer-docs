# Kasa / Tapo

The Kasa / Tapo integration connects to local TP-Link Kasa and Tapo devices using supported local protocols.

## What You'll Need

- A supported Kasa or Tapo device on the same local network as Bridge.
- **Third Party Compatibility** enabled in the Kasa mobile app when available.
- TP-Link account credentials only if Bridge prompts for them while adding a newer authenticated device.

::: tip Third Party Compatibility
In the Kasa mobile app, select **Me** > **Settings** > **Third Party Compatibility** and make sure it is turned on.
:::

::: warning Newer Authenticated Devices
Some newer Kasa / Tapo devices that use SMART/KLAP authentication may be discovered and added, but control and status updates are not fully supported yet. Legacy local Kasa devices are the best-supported path in this alpha.
:::

## Setup

1. Open the Bridge admin UI.
2. Select **Add Device**.
3. Choose **Kasa / Tapo**.
4. Select a discovered device or enter the device address manually.
5. Enter TP-Link credentials if Bridge prompts for them while adding the device.
6. Choose which Kasa / Tapo resources should sync to SharpTools.

## Resources and Capabilities

Bridge creates device resources for single Kasa/Tapo devices and child outlet resources for supported power strips.

Supported capabilities include:

- **Switch** for plugs, switches, outlets, and bulbs.
- **Switch Level** and **Light** for dimmers and dimmable bulbs.
- **Color Control**, **Color Temperature**, and **Color Mode** for supported bulbs.
- **Power Meter**, **Energy Meter**, **Voltage Measurement**, and **Current Measurement** when reported by the device.

Supported commands include on/off, level, color, and color temperature where the device and local protocol support them.

## Notes and Limitations

Bridge currently works best with legacy local Kasa discovery and control. Support for newer authenticated Kasa / Tapo devices is still early and should be validated across more firmware versions and models.

Kasa / Tapo devices do not provide real-time status updates to Bridge. Bridge currently polls device status about every 30 seconds, so changes made from the Kasa app, TP-Link cloud, a physical control, or another platform may not appear in SharpTools until the next successful polling cycle.

Child outlet switch control is supported where the device exposes child outlets. Child outlet dimming, color, and color temperature controls are not supported.

## Troubleshooting

Legacy discovery uses UDP broadcast and may not cross VLANs or Docker port-mapped networking. If discovery fails, use manual entry with the device IP address. For newer authenticated devices, verify that the TP-Link credentials are correct and that the device is reachable locally.
