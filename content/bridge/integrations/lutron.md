# Lutron

The Lutron integration connects to compatible Lutron bridges over the local LEAP API.

## What You'll Need

- A compatible Lutron LEAP bridge, such as Caseta, RA2 Select, RadioRA 3, or HomeWorks QSX.
- Local network access from Bridge to the Lutron bridge.
- Existing LEAP certificate material: bridge CA certificate, client certificate, and client private key.

## Setup

1. Open the Bridge admin UI.
2. Select **Add Device**.
3. Choose **Lutron**.
4. Select a discovered bridge or enter the bridge address manually.
5. Enter the LEAP certificate material.
6. Choose which Lutron zones should sync to SharpTools.

## Resources and Capabilities

Bridge creates these Lutron resources:

- **Switch zones** with the **Switch** capability.
- **Dimmer zones** with **Switch**, **Switch Level**, and **Light** capabilities.
- **Button / remote resources** with the **Button** capability.

Zone resources can be selected for SharpTools Cloud Sync. Button and remote resources are currently tracked locally and are not cloud-selectable.

Supported zone commands include on/off and set level.

## Notes and Limitations

The current setup flow expects existing LEAP certificate material. It does not yet provide an end-to-end pairing flow for generating or retrieving that certificate material.

Bridge uses local TLS LEAP communication, reads zones and buttons from the bridge, and subscribes to LEAP status updates when available.

## Troubleshooting

If discovery does not find the bridge, enter the bridge IP address manually. If setup fails after entering certificate material, verify that the certificate, private key, and bridge CA certificate match the bridge you are adding.
