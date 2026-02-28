FROM node:20

WORKDIR /usr/src/app

COPY backend/package*.json ./

RUN npm install

COPY backend/ .

RUN npm run build

RUN ls -la dist/

EXPOSE 5000

CMD [ "node", "dist/index.js" ]
