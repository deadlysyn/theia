DOCKER=/usr/local/bin/docker

build:
	$(DOCKER) build . -t theia

run:
	$(DOCKER) run --rm -v $(PWD):/app -p 3000:3000 theia
