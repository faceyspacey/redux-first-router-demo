FROM nginx:1.17-alpine

COPY gateway/docker/common/nginx/snippets /etc/nginx/snippets
COPY gateway/docker/production/nginx/conf.d /etc/nginx/conf.d

WORKDIR /app