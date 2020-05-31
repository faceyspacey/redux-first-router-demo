FROM nginx:1.17-alpine

COPY static/docker/production/nginx/conf.d /etc/nginx/conf.d

WORKDIR /app

RUN mkdir -p dist

COPY ./buildClient /app/dist
