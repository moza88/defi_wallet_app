# use node 10 image
FROM node:16.0 as base

# set our working directory
WORKDIR /app

FROM base as development

# copy over dependecy manifests to install
COPY package*.json ./

# install production dependencies and copy them to a temp folder, we will use this for the final build step
RUN npm install --production
RUN cp -R node_modules /tmp/node_modules

# Install all dependcies
RUN npm install

# Copy source code
COPY . ./

# lint, unit test, e2e test and build our app
FROM development as builder
#RUN npm run lint
#RUN npm run test:cov
#RUN npm run test:e2e
RUN npm run build

# release includes bare miniumum to run the app
FROM base as release
COPY --from=builder /tmp/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Run the web service on container boot
CMD ["npm", "run", "start:prod"]
