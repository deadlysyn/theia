FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
RUN npm install
RUN npm install -g nodemon

#ENV IP 0.0.0.0
#ENV DBURL mongodb://$MONGO_PORT_27017_TCP_ADDR:$MONGO_PORT_27017_TCP_PORT/theia
EXPOSE 3000

CMD [ "npm", "start" ]
