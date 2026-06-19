# Matter

The Matter integration adds devices that are already reachable on your local network through Matter multi-admin setup.

Bridge's Matter support is implemented with [matter.js](https://github.com/project-chip/matter.js), an open-source TypeScript and JavaScript implementation of the Matter protocol.

::: warning Matter Certification
SharpTools Bridge is not Matter certified and does not use the Matter logo or Matter certification marks. References to Matter in these docs describe protocol-level interoperability testing, not product certification by the Connectivity Standards Alliance.
:::

## What You'll Need

- A Matter-compatible device already added to another controller, such as Apple Home, Google Home, SmartThings, Amazon Alexa, Home Assistant, or the device manufacturer's app.
- A multi-admin QR code or setup code from that existing controller.
- A Bridge installation that can reach the device on the local network.

## Setup

1. Open the Bridge admin UI.
2. Select **Add Device**.
3. Choose **Matter**.
4. Put the device into multi-admin pairing mode from its existing controller.
5. Scan the QR code or enter the setup code.
6. After the device is added, use **Devices** > **Cloud Sync** to choose which Bridge devices should sync to SharpTools.

## Multi-Admin Pairing

To add a Matter device that is already set up elsewhere, generate a new multi-admin pairing code or QR code from the app that currently controls the device. Do not rely on the original setup code from the box unless that controller explicitly tells you to use it for secondary pairing.

::: tip Start Bridge First
Open **Add Device** > **Matter** in Bridge before generating the code. Many pairing codes expire after a few minutes, so it helps to have Bridge ready before switching to the other app.
:::

::: code-group

<div class="vp-block" data-title="Apple Home">

<ol>
  <li>Open the Apple Home app.</li>
  <li>Select the Matter accessory you want to add to Bridge.</li>
  <li>Open the accessory settings.</li>
  <li>Select <strong>Turn On Pairing Mode</strong>.</li>
  <li>Select <strong>Copy Code</strong>, then enter that code in Bridge.</li>
</ol>

<p>If the code expires or is dismissed, generate a fresh code from Apple Home and try again.</p>

<p>References: <a href="https://support.apple.com/en-us/102135" target="_blank" rel="noreferrer">Apple Matter accessories</a>, <a href="https://www.tp-link.com/us/support/faq/3573/" target="_blank" rel="noreferrer">TP-Link multi-admin guide</a></p>

</div>

<div class="vp-block" data-title="Google Home">

<ol>
  <li>Open the Google Home app.</li>
  <li>Touch and hold the Matter device tile.</li>
  <li>Open <strong>Settings</strong> or the <strong>More</strong> menu.</li>
  <li>Select <strong>Linked Matter apps &amp; services</strong>.</li>
  <li>Select <strong>Link apps &amp; services</strong>.</li>
  <li>Choose <strong>Use pairing code</strong> or <strong>Share with QR code</strong>.</li>
  <li>Keep the code or QR screen open while adding the device in Bridge.</li>
</ol>

<p>Reference: <a href="https://support.google.com/googlenest/answer/13127223?hl=en" target="_blank" rel="noreferrer">Google Home Matter devices</a></p>

</div>

<div class="vp-block" data-title="SmartThings">

<ol>
  <li>Open the SmartThings app.</li>
  <li>Select the Matter device you want to add to Bridge.</li>
  <li>Open the <strong>More</strong> menu or device settings.</li>
  <li>Select <strong>Share with other services</strong>.</li>
  <li>Select <strong>Share device</strong>.</li>
  <li>Use the generated QR code or setup code in Bridge.</li>
</ol>

<p>The generated sharing code is different from the QR code printed on the device.</p>

<p>Reference: <a href="https://support.smartthings.com/hc/en-us/articles/11219700390804-SmartThings-x-Matter-Integration" target="_blank" rel="noreferrer">SmartThings Matter integration</a></p>

</div>

<div class="vp-block" data-title="Amazon Alexa">

<ol>
  <li>Open the Alexa app.</li>
  <li>Open <strong>Devices</strong> and select the Matter device you want to add to Bridge.</li>
  <li>Open the device settings.</li>
  <li>Select <strong>Other Assistants and Apps</strong>.</li>
  <li>Select <strong>Add Another</strong> to generate a setup code.</li>
  <li>Copy the code and enter it in Bridge.</li>
</ol>

<p>If the code expires, return to the Alexa app and generate a fresh one.</p>

<p>References: <a href="https://developer.amazon.com/en-US/docs/alexa/smarthome/best-practices-commission-matter.html" target="_blank" rel="noreferrer">Amazon Alexa Matter commissioning</a>, <a href="https://www.tp-link.com/us/support/faq/3573/" target="_blank" rel="noreferrer">TP-Link multi-admin guide</a></p>

</div>

<div class="vp-block" data-title="Home Assistant">

<ol>
  <li>Open Home Assistant.</li>
  <li>Go to <strong>Settings</strong> &gt; <strong>Matter</strong>.</li>
  <li>Select <strong>Devices</strong>.</li>
  <li>Select the Matter device you want to add to Bridge.</li>
  <li>Select <strong>Share device</strong>, then confirm <strong>Share device</strong> again.</li>
  <li>Scan the generated QR code or enter the sharing code in Bridge.</li>
</ol>

<p>Home Assistant notes that sharing from Home Assistant does not require pressing a hardware button on the device.</p>

<p>Reference: <a href="https://www.home-assistant.io/integrations/matter/" target="_blank" rel="noreferrer">Home Assistant Matter integration</a></p>

</div>

<div class="vp-block" data-title="Manufacturer App">

<ol>
  <li>Open the manufacturer's app for the device or hub.</li>
  <li>Open the device settings or the app's Matter settings.</li>
  <li>Look for an option like <strong>Bind to Matter</strong>, <strong>Matter pairing</strong>, <strong>Share device</strong>, or <strong>Share with other services</strong>.</li>
  <li>Generate a new Matter setup code or QR code.</li>
  <li>Keep the code visible while adding the device in Bridge.</li>
</ol>

<p>For Matter bridges and hubs, only the device types exposed by that bridge are available through Matter. Some child devices or advanced features may remain available only through the manufacturer's native integration.</p>

<p>References: <a href="https://www.tp-link.com/us/support/faq/3573/" target="_blank" rel="noreferrer">TP-Link multi-admin guide</a>, <a href="https://www.home-assistant.io/integrations/matter/" target="_blank" rel="noreferrer">Home Assistant Matter bridge notes</a></p>

</div>

:::

## Resources and Capabilities

Bridge creates one device resource for each supported Matter device or endpoint.

Supported resource types include:

- On/off, dimmable, color temperature, and color lights.
- Contact, motion/occupancy, water leak, and water freeze sensors.
- Thermostats with supported mode, setpoint, operating state, and temperature attributes.

Capabilities are detected from the Matter device type and clusters exposed by the device. Common capabilities include **Switch**, **Switch Level**, **Light**, **Color Control**, **Color Temperature**, **Contact Sensor**, **Motion Sensor**, **Water Sensor**, **Thermostat Mode**, **Thermostat Heating Setpoint**, **Thermostat Cooling Setpoint**, **Thermostat Operating State**, and **Temperature Measurement**.

## Notes and Limitations

::: warning Current Scope
Bridge does not perform first-time Wi-Fi, Thread, or BLE commissioning for brand-new devices. Add the device to another controller first, then use multi-admin setup to share it with Bridge.
:::

Bridge maintains its own local Matter fabric and stores the local Matter controller data in Bridge storage. Removing a Matter device normally attempts to decommission it from the SharpTools fabric. A force-remove option is available when a device is no longer reachable and only the local Bridge record should be removed.

## Troubleshooting

If pairing fails, generate a fresh multi-admin code and make sure the Bridge host can reach the device on the same local network. Multi-admin codes are temporary, and some controllers stop advertising the setup code after a short period.

Matter devices can also have a limit on the number of connected services. If a device has already been shared with several apps, remove an unused service from the app that currently controls the device, then try pairing with Bridge again.
