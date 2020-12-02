FROM node:alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY ./server /app/server
COPY ./out/buildServer /app/out/buildServer

RUN npm install

EXPOSE 3000

CMD ["node", "./server"]

HEALTHCHECK --interval=5s --timeout=3s --start-period=1s CMD curl --fail http://127.0.0.1:3000/health || exit 1