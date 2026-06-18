# Security and Alpha Notes

Bridge Alpha is intended for controlled testing by users who are comfortable running local software on their own network.

## Trusted Local Network

The Bridge admin UI is intended for trusted local networks.

Do not expose Bridge directly to the internet.

By default, Bridge listens on:

```text
0.0.0.0:8787
```

This makes the Bridge UI available on the local network of the host running Bridge. If you need to restrict access further, bind Bridge to a specific interface or use network-level controls appropriate for your environment.

## Current Local Admin Protection

Bridge includes guardrails for common browser-based risks:

- Mutating admin API requests require an internal Bridge request header.
- Remote origin mutation requests are rejected.
- Secrets are stored separately and redacted from logs.
- Groovy source URL import blocks private and local redirect targets.

These guardrails do not make the Bridge UI safe to expose publicly.

## Known Alpha Security Limitations

The alpha intentionally keeps some security features out of the first testing slice.

Known limitations include:

- No required local admin login.
- No setup token requirement.
- No HTTPS local certificate flow.
- No full Host allowlist or DNS-rebinding protection.
- No public community-driver sandbox.
- Groovy Labs imported source runs as trusted local code.

## Groovy Labs Trust Boundary

Groovy Labs is experimental.

Imported Groovy apps and drivers should be treated like trusted local code running on the Bridge host.

The compatibility analyzer can help identify unsupported APIs and risky patterns, but it is not a security sandbox.

Only import Groovy source you trust and are willing to run on your local system.

## Local Webhooks

The HTTP Webhook Device driver can expose local webhook URLs from Bridge.

These URLs are intended for trusted local-network producers. Do not publish them publicly or expose Bridge directly to the internet.

## Alpha Expectations

During alpha, we are still validating:

- Install and update behavior.
- Docker networking behavior.
- Real-device compatibility.
- Cloud Sync lifecycle behavior.
- Local logging and support workflows.
- The right level of local admin protection before broader release.

Please share feedback when something is unclear, too technical, or unexpectedly difficult to recover from.
