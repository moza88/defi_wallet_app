FROM node:erbium-alpine3.14

WORKDIR /src

COPY package.json .

RUN yarn

COPY . .

RUN yarn build

EXPOSE 9000
CMD [ "yarn", "start:dev" ]