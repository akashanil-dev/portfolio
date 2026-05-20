---
title: "Building a Docker Homelab: From Zero to Self-Hosted"
description: "Setting up a personal homelab using Docker and Docker Compose — running services like Portainer, Nginx Proxy Manager, and Uptime Kuma on a single machine."
publishDate: 2025-04-22
tags: ["docker", "homelab", "self-hosted", "linux", "containers"]
readingTime: "14 min read"
featured: true
draft: false
---

## Why a Homelab?

Running services locally teaches you what managed cloud platforms abstract away — networking, storage, process supervision, health checks, and restarts. A homelab is the cheapest way to develop strong infrastructure intuition.

## Hardware

For this lab, I used an old laptop running Ubuntu Server 22.04. Any x86 machine with 4GB+ RAM works.

## Core Stack

| Service | Purpose |
|---|---|
| Portainer | Docker GUI |
| Nginx Proxy Manager | Reverse proxy + TLS |
| Uptime Kuma | Service monitoring |
| Vaultwarden | Self-hosted Bitwarden |

## Step 1: Install Docker

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

## Step 2: Compose File Structure

Organize each service into its own directory under a shared `~/homelab/` root.

```
~/homelab/
├── docker-compose.yml
├── portainer/
├── nginx-proxy-manager/
│   └── data/
└── uptime-kuma/
    └── data/
```

## Step 3: Docker Compose

```yaml
version: "3.8"
services:
  portainer:
    image: portainer/portainer-ce:latest
    restart: unless-stopped
    ports:
      - "9443:9443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./portainer:/data

  nginx-proxy-manager:
    image: jc21/nginx-proxy-manager:latest
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "81:81"
    volumes:
      - ./nginx-proxy-manager/data:/data

  uptime-kuma:
    image: louislam/uptime-kuma:1
    restart: unless-stopped
    ports:
      - "3001:3001"
    volumes:
      - ./uptime-kuma/data:/app/data
```

## What I Learned

Running this stack highlighted how much work a managed platform does: automatic TLS renewal, health-based routing, persistent storage management, and zero-downtime restarts. Each of these is a real operational concern at scale.
