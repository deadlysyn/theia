build:
	docker build . -t theia

run:
	docker run --rm -v $PWD:/app -p 3000:3000 theia
