# ============================================================
# TRoy Group™ — Static Web Service
# nginx:alpine serving HTML/CSS/JS assets
# © TRoy Group™ | Darwin, NT, Australia
# ============================================================

FROM nginx:alpine

# Remove default nginx config
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy custom nginx config (uses __PORT__ placeholder)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy all static site files
COPY . /usr/share/nginx/html

# Render injects $PORT (default 10000)
ENV PORT=10000

EXPOSE 10000

# At startup: replace __PORT__ with actual $PORT value, then start nginx
CMD sh -c "sed -i 's/__PORT__/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'"
