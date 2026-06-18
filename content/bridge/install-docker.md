# Install Bridge with Docker

Docker is a flexible install path for the Bridge Alpha and works well for home servers, NAS devices, Linux hosts, and Docker Desktop environments.

Bridge stores runtime data, pairing information, integration configuration, secrets, device state, and logs in a persistent data directory. In Docker, that directory is `/data` inside the container.

## Docker Run

Run Bridge with a named Docker volume:

```bash
docker run -d \
  --name sharptools-bridge \
  --restart unless-stopped \
  --network host \
  -v sharptools-bridge-data:/data \
  ghcr.io/sharptools-io/bridge:alpha
```

Open the Bridge UI:

```text
http://<docker-host>:8787/
```

## Docker Compose

Create a `docker-compose.yml` file:

```yaml
services:
  bridge:
    image: ghcr.io/sharptools-io/bridge:alpha
    container_name: sharptools-bridge
    restart: unless-stopped
    network_mode: host
    volumes:
      - sharptools-bridge-data:/data

volumes:
  sharptools-bridge-data:
```

Start Bridge:

```bash
docker compose up -d
```

Open the Bridge UI:

```text
http://<docker-host>:8787/
```

## Docker Defaults

The Bridge Docker image sets these defaults:

| Environment Variable | Default | Purpose |
| --- | --- | --- |
| `SHARPTOOLS_BRIDGE_HOME` | `/data` | Persistent Bridge data, including pairing, integration settings, secrets, state, and logs. |
| `SHARPTOOLS_BRIDGE_PORT` | `8787` | Local Bridge admin UI port. |
| `SHARPTOOLS_BRIDGE_HOST` | `0.0.0.0` | Network interface Bridge listens on inside the container. |

You usually do not need to set environment variables unless you want to change those defaults. For example, to use a different admin UI port with host networking:

```bash
docker run -d \
  --name sharptools-bridge \
  --restart unless-stopped \
  --network host \
  -e SHARPTOOLS_BRIDGE_PORT=8788 \
  -v sharptools-bridge-data:/data \
  ghcr.io/sharptools-io/bridge:alpha
```

## Why Host Networking Is Recommended

Linux host networking is recommended for the alpha because many local integrations depend on LAN discovery or direct device communication.

Examples include:

- mDNS discovery.
- UDP discovery.
- Local HTTP or WebSocket device APIs.
- Devices using the Matter protocol and Hue local network behavior.

Host networking is the simplest way to let Bridge see the same local network as the host.

## Docker Desktop and Port Mapping

Docker Desktop environments may not support Linux-style host networking in the same way. If host networking is unavailable, remove `network_mode: host` and publish the admin port instead:

```yaml
services:
  bridge:
    image: ghcr.io/sharptools-io/bridge:alpha
    container_name: sharptools-bridge
    restart: unless-stopped
    ports:
      - "8787:8787"
    volumes:
      - sharptools-bridge-data:/data
```

::: warning Port-Mapped Networking Limitations
Port-mapped mode is fine for the Bridge UI and the outbound SharpTools Cloud connection, but it may limit discovery and local device communication. Some integrations may require manual host/IP entry or may not work as well as they do with Linux host networking.
:::

## Persistent Data

Bridge stores important data in `/data` including Integrations, Cloud Authorization, Logs, and more.

::: danger
Do not delete the data volume unless you intentionally want to reset Bridge.
:::

## Updates

Bridge does not update the Docker image from inside the container.

### Docker Compose

To update a Compose install:

```bash
docker compose pull
docker compose up -d
```

### Docker Run

To update a `docker run` install, pull the latest alpha image, recreate the container, and keep the same named data volume:

```bash
docker pull ghcr.io/sharptools-io/bridge:alpha
docker stop sharptools-bridge
docker rm sharptools-bridge
docker run -d \
  --name sharptools-bridge \
  --restart unless-stopped \
  --network host \
  -v sharptools-bridge-data:/data \
  ghcr.io/sharptools-io/bridge:alpha
```

The Bridge UI can check for available updates from **System > Updates** and show deployment-specific guidance.

## Reset

To fully reset a Docker install, stop the Bridge container and remove the data volume.

::: danger Reset Deletes Local Bridge Data
Resetting Bridge deletes pairing, integrations, runtime state, secrets, and local logs. Only do this if you are intentionally starting over.
:::
