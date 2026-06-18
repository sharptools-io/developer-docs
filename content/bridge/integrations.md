# Supported Integrations

Bridge Alpha includes a mix of baseline-supported integrations and early native driver slices that need broader real-world validation.

## Status Guide

- **Baseline tested** means the core path has been exercised with real devices or bridges.
- **Early native slice** means the implementation exists, but broader real-device testing and polish are still needed.
- **Experimental** means the feature is intended for controlled alpha testing only.

## Matter Protocol Support

**Status:** Baseline tested.

Communicate with devices that use the Matter protocol after those devices are already reachable on your local network through multi-admin setup.

Bridge's Matter support is implemented with [matter.js](https://github.com/project-chip/matter.js), an open-source TypeScript and JavaScript implementation of the Matter protocol.

::: warning Matter Certification
SharpTools Bridge is not Matter certified and does not use the Matter logo or Matter certification marks. References to Matter in these docs describe protocol-level interoperability testing, not product certification by the Connectivity Standards Alliance.
:::

Use a multi-admin QR code or setup code from an existing controller such as Apple Home, Google Home, Homey, or Home Assistant.

::: warning Current Scope
Bridge Alpha does not perform first-time Wi-Fi, Thread, or BLE commissioning for brand-new devices. Add the device to another controller first, then use multi-admin setup to share it with Bridge.
:::

## Philips Hue

**Status:** Baseline tested.

Communicates with Philips Hue local bridges/hubs through the Hue local API.

Supported local resources include lights, grouped lights, scenes, and buttons. Grouped lights can be selected for SharpTools Cloud Sync. Some event-style resources, such as buttons and scenes, may remain local until cloud-facing event contracts are finalized.

## Shelly

**Status:** Early native slice.

The Shelly driver focuses on Gen 2 and Gen 3-style local RPC devices.

Current support includes:

- mDNS discovery with manual host fallback.
- Local HTTP RPC snapshots.
- WebSocket status updates.
- Switch and light resources.
- Switch and level commands.
- Experimental electrical telemetry.

Real-device validation is still needed across more Shelly devices and network setups.

## Kasa/Tapo

**Status:** Early native slice.

The Kasa/Tapo driver supports legacy Kasa local devices.

Current support includes:

- UDP discovery with manual host fallback.
- Legacy TCP XOR transport.
- SMART/KLAP v1 and v2 authenticated local transport.
- Single plug/switch resources.
- Power strip child outlets.
- Dimmer level resources.
- Switch and level commands.
- Experimental electrical telemetry.

Real-device validation is still needed across legacy Kasa, newer Kasa, Tapo devices, power strips, dimmers, VLAN setups, and Docker installs.

::: tip
In the Kasa mobile app, select **Me** > **Settings** > **Third Party Compatibility** and ensure it is turned on.
:::

::: warning
While the bridge can discover and authenticate with newer Kasa / Tapo devices that use the KLAP protocol, interaction with these devices is not yet supported.
:::

## Lutron

**Status:** Early native slice.

The Lutron driver focuses on local LEAP bridges.

Current support includes:

- mDNS discovery with manual host fallback.
- Local TLS LEAP communication.
- Certificate-based local authentication.
- Switch and dimmer zone entities.
- Pico or remote button event-source entities.
- Zone commands and LEAP subscriptions.

Setup currently requires existing certificate material from a compatible LEAP pairing flow. A more user-friendly pairing flow is still future work.

## Fully Kiosk Browser

**Status:** Early native slice.

The Fully Kiosk Browser driver uses the local Remote Admin interface.

::: tip Enable Fully Kiosk Remote Admin
On your tablet running Fully Kiosk, slide open the left navigation panel to access the Settings and ensure Remote Admin is enabled.
:::

Current support includes:

- mDNS discovery where available.
- Fallback local network probing discovery.
- Manual host/password fallback.
- Screen on/off commands.
- Reload/start URL.
- Foreground command.
- Load URL command.
- Battery telemetry.
- Polling-based status updates.

Real-tablet validation is still needed across Fully versions, Docker/VLAN setups, Remote Admin settings, and richer tablet health signals.

## HTTP Webhook Device

**Status:** Early utility slice.

The HTTP Webhook Device driver lets you model simple local HTTP and webhook use cases as device-shaped resources.

Current profiles include:

- Switch.
- Temperature Measurement.
- Motion Sensor.
- Button.
- Momentary.

The first slice supports local webhook ingress and optional outbound HTTP request templates for command-capable resources.

::: warning Local Webhook Exposure
Webhook endpoints are intended for trusted local-network use. Do not expose Bridge directly to the internet.
:::

## iCal Calendar Events

**Status:** Early utility slice.

The iCal Calendar Events driver imports calendar feeds and creates local event-source resources based on upcoming or active matching events.

- **Calendar Feed**: iCal calendar source - shared with multiple child matchers
- **Calendar Matcher**: filter for specific event descriptions, titles, or keywords

#### Attributes:
- `calendarEventStatus`: `idle` | `upcoming` | `active`
- `nextEventStart`: start time of next event (ISO String)
- `nextEventEnd`: end time of next event (ISO String)
- `nextEventSummary`: title of the next matched event
- `motion`: `active` | `inactive`

## Groovy Labs

**Status:** Experimental.

Groovy Labs is an experimental compatibility layer for imported Hubitat/SmartThings-style community Groovy apps and drivers.

To enable the integration, open **System** > **Labs** where you can enable the Groovy Runtime as well as create and manage app/driver bundles. After creating an app/driver bundle, it will be displayed in the **Add Devices** flow alongside included system integrations.

::: warning Zigbee and Z-Wave Devices
Groovy does not add direct Zigbee or Z-Wave radio support to Bridge. It is not a replacement hub for paired Zigbee/Z-Wave devices. Use it for compatible Groovy apps and drivers that communicate over LAN, Wi-Fi, HTTP, or other network APIs.
:::

::: danger Trusted Local Code
Imported Groovy source should be treated like trusted local code. The compatibility analyzer is a helpful guardrail, not a security sandbox.
:::

Current real-package testing has included community Groovy integrations for Fully Kiosk and Kasa/TP-Link. Broader compatibility work is ongoing.
