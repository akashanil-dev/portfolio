---
title: "Nginx as a Reverse Proxy: Configuration Deep Dive"
description: "Understanding how to configure Nginx as a reverse proxy — virtual hosts, upstream blocks, TLS termination, and header forwarding. Includes a real-world multi-service setup."
publishDate: 2025-03-14
tags: ["nginx", "networking", "linux", "tls", "proxy"]
readingTime: "12 min read"
featured: false
draft: false
---

## What a Reverse Proxy Does

A reverse proxy sits in front of your application servers. It receives client requests, forwards them to the appropriate backend, and returns the response. Benefits: TLS termination at one point, load balancing, caching, and request rewriting.

## Basic Virtual Host

```nginx
server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## TLS Termination with Certbot

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d app.example.com
```

Certbot modifies your Nginx config to add the `443` server block and redirect `80 → 443` automatically.

## Upstream Blocks for Load Balancing

```nginx
upstream api_servers {
    least_conn;
    server 10.0.0.1:8080;
    server 10.0.0.2:8080;
    server 10.0.0.3:8080;
}

server {
    listen 443 ssl;
    server_name api.example.com;

    location / {
        proxy_pass http://api_servers;
    }
}
```

## Key Headers to Forward

| Header | Purpose |
|---|---|
| `X-Real-IP` | Original client IP |
| `X-Forwarded-For` | Full proxy chain |
| `X-Forwarded-Proto` | Original scheme (http/https) |
| `Host` | Original host header |

## Testing Configuration

```bash
# Syntax check
sudo nginx -t

# Reload without downtime
sudo systemctl reload nginx

# Tail access logs
sudo tail -f /var/log/nginx/access.log
```
