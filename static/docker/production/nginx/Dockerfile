FROM nginx:1.17-alpine

COPY static/docker/production/nginx/conf.d /etc/nginx/conf.d
COPY ./buildClient /data/static

WORKDIR /app