FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
COPY public /app/public
RUN npm install
RUN npm install -g nodemon

EXPOSE 3000

CMD [ "npm", "start" ]
