FROM node:alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY ./ /app
RUN mkdir -p dist

COPY ./buildClient/stats.json /app/dist/stats.json
COPY ./buildServer/serverRender.js /app/dist/serverRender.js

RUN npm install

EXPOSE 3000

CMD ["node", "./buildServer"]

HEALTHCHECK --interval=5s --timeout=3s --start-period=1s CMD curl --fail http://127.0.0.1:3000/health || exit 1