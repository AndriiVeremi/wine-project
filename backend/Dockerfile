FROM node:22.23.4-bookworm-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5000

CMD [ "node", "dist/index.js" ]
