FROM node:alpine

WORKDIR /app

COPY ./ /app

RUN npm install && npm run build

EXPOSE 3000

CMD ["node", "./buildServer"]