FROM node:4.2.6

ENV NODE_ENV=production
ENV npm_config_loglevel=warn
ENV NODE_PATH=/usr/src

# Create app directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY ./.env /usr/src/
COPY package.json /usr/src/

RUN npm install
RUN npm cache clean

EXPOSE 3001

CMD [ "npm", "start" ]
