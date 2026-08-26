---
title: "Why Kubernetes Exists: The Problem It Actually Solves"
description: "Kubernetes isn't just 'Docker at scale.' It's an answer to a specific class of operational problems that emerge when you run containers across many machines. This essay traces those problems and why Kubernetes became the dominant solution."
publishDate: 2025-05-01
tags: ["kubernetes", "containers", "infrastructure", "systems-thinking"]
readingTime: "10 min read"
featured: true
draft: false
---

## The Problem Before Containers

Before containers, deploying software meant managing the gap between environments. The infamous "works on my machine" problem was a deployment problem: libraries, runtimes, and configurations diverged between development and production.

Containers solved *packaging* — bundling an application with its entire runtime environment into a portable artifact. Docker made this ergonomic. But packaging is only half the problem.

## What Happens When You Have Many Containers

Once you containerize your services, new questions emerge:

- Which machine should run this container?
- What happens when that machine fails?
- How do containers find and talk to each other?
- How do you roll out a new version without downtime?
- How do you scale a service up under load and back down?

These aren't Docker problems. These are **distributed systems operations** problems. And they compound quickly as you go from 5 containers to 500.

## The Pre-Kubernetes Approaches

Teams tried different things. Some wrote custom scripts. Some used AWS ECS or Mesos. Some built internal platforms. Each approach worked until it didn't — usually because it was tied to a specific cloud, or didn't compose well, or required significant operational expertise to maintain.

## What Kubernetes Actually Is

Kubernetes is a **control loop engine**. The fundamental pattern is:

1. You declare desired state (`I want 3 replicas of this service running`)
2. Kubernetes continuously observes actual state
3. When they diverge, Kubernetes reconciles

This declarative model separates *what you want* from *how to achieve it*. The scheduler decides placement. The kubelet ensures containers run. The controller manager handles replication, rollouts, and failures. You don't script these behaviors — you declare intent.

## The Cost

Kubernetes is a significant operational surface area. etcd, the API server, the scheduler, controller manager, kubelet, kube-proxy, CNI plugins, CSI drivers — each is a component you or your platform must manage. Managed Kubernetes (EKS, GKE, AKE) abstracts the control plane but not the rest.

The question is always: does the complexity of Kubernetes serve your scale and reliability requirements? For most teams at small scale, it doesn't. For teams running hundreds of services across many machines with strong availability requirements, the alternative is writing a worse Kubernetes yourself.

## The Insight

Kubernetes exists because the operational complexity of distributed containerized systems is real, irreducible, and roughly standardizable. It's an attempt to make that complexity explicit, composable, and shared — rather than hidden in bespoke scripts that only one person understands.

Understanding *why* it exists helps you understand when to use it, when not to, and how to operate it well when you must.

---

**Related reading**

- [The Cost of Abstraction](/essays/the-cost-of-abstraction) — Kubernetes is itself a large abstraction. This essay examines what you lose when you stop understanding the layers below.
- [Understanding Linux cgroups v2](/notes/linux-cgroups-v2) — the kernel primitive underneath every container. Understanding cgroups gives you a model for what Kubernetes is actually managing.
- [Building a Docker Homelab: From Zero to Self-Hosted](/labs/docker-homelab-setup) — start here if you want hands-on experience with containers before tackling orchestration.
