FROM node:alpine

WORKDIR /app

COPY ./ /app
RUN mkdir -p dist

COPY ./buildClient/stats.json /app/dist/stats.json
COPY ./buildServer/serverRender.js /app/dist/serverRender.js

RUN npm install

EXPOSE 3000

CMD ["node", "./buildServer"]