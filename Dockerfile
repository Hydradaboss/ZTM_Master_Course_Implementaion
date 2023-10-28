FROM node:lts-alpine

WORKDIR /app/server

COPY package*.json ./

RUN npm install --omit=dev

COPY . . 

USER node

EXPOSE 3000
CMD [ "npm", "start"]