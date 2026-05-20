---
title: "PromQL Cheat Sheet"
description: "Essential PromQL queries for monitoring Linux servers and containerized workloads. Covers CPU, memory, disk, network, and container-specific metrics."
publishDate: 2025-04-18
tags: ["prometheus", "observability", "monitoring", "promql"]
readingTime: "3 min read"
featured: true
draft: false
---

Quick reference for common PromQL queries. All examples assume `node_exporter` is running.

## CPU

```promql
# CPU usage % per core
100 - (avg by(cpu) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Overall CPU usage %
100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Load average (1m)
node_load1
```

## Memory

```promql
# Used memory %
(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100

# Memory used in GiB
(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / 1024^3
```

## Disk

```promql
# Disk usage % per mount
100 - ((node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"}) * 100)

# Disk I/O read rate (MB/s)
rate(node_disk_read_bytes_total[5m]) / 1024 / 1024
```

## Network

```promql
# Network receive rate (MB/s)
rate(node_network_receive_bytes_total{device!="lo"}[5m]) / 1024 / 1024

# Network transmit rate
rate(node_network_transmit_bytes_total{device!="lo"}[5m]) / 1024 / 1024
```

## Alerting Rule Example

```yaml
groups:
  - name: node_alerts
    rules:
      - alert: HighCPUUsage
        expr: 100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 90
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage on {{ $labels.instance }}"
```
