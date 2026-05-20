---
title: "Understanding Linux cgroups v2"
description: "cgroups (control groups) are the Linux kernel mechanism that makes containers possible. Here's a quick reference on cgroups v2 — what they control, how to inspect them, and how container runtimes use them."
publishDate: 2025-05-08
tags: ["linux", "containers", "kernel", "cgroups"]
readingTime: "4 min read"
featured: true
draft: false
---

cgroups v2 is the unified hierarchy interface for Linux resource control. It became the default in most modern distros (Ubuntu 22.04+, RHEL 9).

## Key Controllers

| Controller | Controls |
|---|---|
| `cpu` | CPU time allocation, weight |
| `memory` | Memory limits, swap |
| `io` | Block I/O throttling |
| `pids` | Max number of processes |
| `cpuset` | CPU and NUMA node pinning |

## Inspecting cgroups

```bash
# See the cgroup hierarchy
ls /sys/fs/cgroup/

# Find the cgroup for a running container
cat /proc/$(docker inspect --format '{{.State.Pid}}' mycontainer)/cgroup

# Check memory limit set by Docker
cat /sys/fs/cgroup/system.slice/docker-<id>.scope/memory.max
```

## How Docker Uses cgroups

When you run `docker run --memory=512m`, Docker:
1. Creates a new cgroup scope under `system.slice`
2. Sets `memory.max = 536870912` (512 * 1024 * 1024)
3. Puts the container's PID into that cgroup

The kernel then enforces the limit — if the process exceeds it, it receives an OOM kill.

## The Unified Hierarchy

In cgroups v1, each controller had its own hierarchy (`/sys/fs/cgroup/memory/`, `/sys/fs/cgroup/cpu/`, etc.). v2 unifies everything under a single tree. This enables atomic operations across controllers — useful for containers that need coordinated CPU + memory constraints.
