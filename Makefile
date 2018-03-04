DOCKER=/usr/local/bin/docker
IMG=theia

build:
	$(DOCKER) build . -t $(IMG)

run:
	$(DOCKER) run --name $(IMG) --link mongod:mongo --rm -v $(PWD):/app -p 3000:3000 \
		-e IP='0.0.0.0' \
		-e DBURL='mongodb://\${MONGO_PORT_27017_TCP_ADDR}:\${MONGO_PORT_27017_TCP_PORT}/$(IMG)' $(IMG)
