# ============================================================
#  TRoyTel™ — Dockerfile
#  TRoy Group™ Signaling Server
# ============================================================

FROM node:18-alpine

LABEL maintainer="TRoy Group™ <groupoftroy@gmail.com>"
LABEL description="TRoyTel™ WebRTC Signaling Server"
LABEL version="1.0.0"

# Working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --only=production

# Copy application
COPY engine/ ./engine/
COPY client/ ./client/

# Non-root user for security
RUN addgroup -S troytel && adduser -S troytel -G troytel
USER troytel

# Expose port
EXPOSE 3500

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3500/health || exit 1

# Start
CMD ["node", "engine/server.js"]
