# Lutron

The Lutron integration connects to compatible Lutron bridges over the local LEAP API.

## What You'll Need

- A compatible Lutron LEAP bridge, such as Caseta, RA2 Select, RadioRA 3, or HomeWorks QSX.
- Local network access from Bridge to the Lutron bridge.
- Physical access to the Lutron bridge button during setup.
- Lutron devices or remotes already added to the Lutron system.

## Setup

1. Open the Bridge admin UI.
2. Select **Add Device**.
3. Choose **Lutron**.
4. Select a discovered bridge or enter the bridge address manually.
5. Select **Start Pairing**, then press the physical button on the Lutron bridge within the pairing window.
6. After Bridge connects to the Lutron bridge, choose which Lutron resources should sync to SharpTools.

If the bridge was already paired with this Bridge installation, setup can reuse the existing connection and skip straight to resource selection.

## Resources and Capabilities

Bridge creates these Lutron resources:

- **Switch zones** with the **Switch** capability.
- **Dimmer zones** with **Switch**, **Switch Level**, and **Light** capabilities.
- **Button / remote resources** with the **Button** capability.

Zone resources and button / remote resources can be selected for SharpTools Cloud Sync.

Supported zone commands include on/off and set level.

Button / remote resources report standard Button values such as `pushed` and `held`. Multi-button remotes stay grouped as one device and include `buttonNumber` event data so rules can distinguish which physical button was used.

## Notes and Limitations

Normal setup uses the bridge-button pairing flow. Manual certificate entry may still be available for advanced troubleshooting, but it is not required for standard setup.

Bridge uses local TLS LEAP communication, reads zones and buttons from the bridge, and subscribes to LEAP status updates when available.

## Troubleshooting

If discovery does not find the bridge, enter the bridge IP address manually.

If pairing times out, select **Start Pairing** again and press the physical bridge button within the pairing window.

If no Lutron resources appear, verify the devices are already added and working in the Lutron app, then run setup again.
