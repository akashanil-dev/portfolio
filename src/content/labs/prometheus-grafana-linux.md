---
title: "Deploying Prometheus + Grafana on a Linux Server"
description: "A hands-on walkthrough for setting up a complete observability stack from scratch — Prometheus for metrics scraping, Grafana for dashboards, and Alertmanager for notifications."
publishDate: 2025-05-10
tags: ["observability", "prometheus", "grafana", "linux", "monitoring"]
readingTime: "18 min read"
featured: true
draft: false
---

## Overview

This lab walks through deploying a production-grade observability stack on a bare Linux server using Prometheus and Grafana. No Docker, no Kubernetes — pure systemd services.

## What You'll Build

- Prometheus scraping system metrics via `node_exporter`
- Grafana connected to Prometheus as a datasource
- A dashboard tracking CPU, memory, disk, and network
- Alertmanager wired to send alerts to a webhook

## Prerequisites

- Ubuntu 22.04 LTS server
- `sudo` access
- Basic familiarity with systemd

## Step 1: Install Prometheus

Download the latest Prometheus binary and create a dedicated system user.

```bash
# Create user
sudo useradd --no-create-home --shell /bin/false prometheus

# Download
wget https://github.com/prometheus/prometheus/releases/download/v2.51.0/prometheus-2.51.0.linux-amd64.tar.gz
tar xvf prometheus-2.51.0.linux-amd64.tar.gz
```

## Step 2: Configure Prometheus

The core config lives in `/etc/prometheus/prometheus.yml`.

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "node"
    static_configs:
      - targets: ["localhost:9100"]
```

## Step 3: Install node_exporter

```bash
wget https://github.com/prometheus/node_exporter/releases/download/v1.7.0/node_exporter-1.7.0.linux-amd64.tar.gz
tar xvf node_exporter-1.7.0.linux-amd64.tar.gz
sudo cp node_exporter-1.7.0.linux-amd64/node_exporter /usr/local/bin/
```

## Step 4: Install Grafana

```bash
sudo apt-get install -y adduser libfontconfig1 musl
wget https://dl.grafana.com/oss/release/grafana_10.3.3_amd64.deb
sudo dpkg -i grafana_10.3.3_amd64.deb
sudo systemctl enable --now grafana-server
```

Access Grafana at `http://your-server:3000` with default credentials `admin / admin`.

## What's Next

- Configure Alertmanager rules
- Add custom application metrics with a Prometheus client library
- Explore PromQL for complex queries
