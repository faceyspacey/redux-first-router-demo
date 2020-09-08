FROM nginx:1.17-alpine

RUN apk add --no-cache curl

COPY static/docker/common/nginx/snippets /etc/nginx/snippets
COPY static/docker/production/nginx/conf.d /etc/nginx/conf.d

WORKDIR /app

RUN mkdir -p dist

COPY ./buildClient /app/dist

HEALTHCHECK --interval=5s --timeout=3s --start-period=1s CMD curl --fail http://127.0.0.1/health || exit 1
