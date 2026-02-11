#!/bin/bash
echo "[+] Locking down network..."

# 1. Allow Loopback
iptables -A OUTPUT -o lo -j ACCEPT

# 2. Allow DNS (UDP port 53) - The only way out!
iptables -A OUTPUT -p udp --dport 53 -j ACCEPT

# 3. Allow established connections (so the web user gets a reply)
iptables -A OUTPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
# Allow connections to the Docker Host (Gateway)
iptables -A OUTPUT -d host.docker.internal -j ACCEPT

# 4. Drop all other outgoing traffic (Blocks Webhook.site/TCP)
iptables -A OUTPUT -j DROP

echo "[+] Firewall active. Starting app..."
exec python app.py