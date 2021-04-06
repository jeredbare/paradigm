FROM node:alpine

RUN mkdir -p /usr/src/app
ENV PORT 3000

WORKDIR /usr/src/app

COPY ./paradigm-ui/package.json /usr/src/app
COPY ./paradigm-ui/yarn.lock /usr/src/app

# Production use node instead of root
# USER node

RUN yarn install

COPY ./paradigm-ui /usr/src/app

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]