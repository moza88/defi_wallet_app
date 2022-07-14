FROM node:16-alpine3.16 As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:16-alpine3.16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
