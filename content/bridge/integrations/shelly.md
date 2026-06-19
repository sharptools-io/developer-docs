# Shelly

The Shelly integration connects to local Shelly Gen 2 and Gen 3-style RPC devices.

## What You'll Need

- A Shelly device that supports the local HTTP RPC API.
- Local network access from Bridge to the Shelly device.
- mDNS discovery support on the network, or the Shelly device IP address for manual setup.

## Setup

1. Open the Bridge admin UI.
2. Select **Add Device**.
3. Choose **Shelly**.
4. Select a discovered device or enter the device address manually.
5. Choose which Shelly resources should sync to SharpTools.

## Resources and Capabilities

Bridge creates resources for Shelly switch and light components.

Supported capabilities include:

- **Switch** for relay and switch components.
- **Switch Level** and **Light** for light components with brightness support.
- **Power Meter**, **Energy Meter**, **Voltage Measurement**, **Current Measurement**, and **Temperature Measurement** when reported by the Shelly device.

Supported commands include on/off for switches and lights, plus level control for light components.

## Notes and Limitations

The current implementation focuses on Gen 2 and Gen 3 local RPC devices. It uses local HTTP RPC snapshots and WebSocket status updates where available.

Real-device coverage is still early across the broader Shelly product line, so some models may need refinement.

## Troubleshooting

If discovery does not find a device, enter the Shelly device address manually. Docker port-mapped networking, VLANs, guest Wi-Fi isolation, or blocked mDNS traffic can limit discovery or local status updates.
