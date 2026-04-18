# ============================================================
# TRoy Group™ — Render Web Service
# © TRoy Group™ | Darwin, NT, Australia
# ============================================================

FROM nginx:alpine

# Copy all site files into nginx web root
COPY . /usr/share/nginx/html

# Custom nginx config — reads $PORT env var set by Render
RUN printf 'server {\n\
    listen ${PORT};\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
    # Cache static assets\n\
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff2?)$ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
}\n' > /etc/nginx/templates/default.conf.template

# Render injects PORT — nginx-alpine with envsubst picks it up automatically
# Default fallback port if PORT not set
ENV PORT=10000

EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]
