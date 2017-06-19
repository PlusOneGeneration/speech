help:
	@echo "Please use 'make <target>' where <target> is one of"
	@echo "  build                         build container"
	@echo "  app                           up app with docker-compose way"
	@echo "  app.console                   run app console"
	@echo "  mongo.console                 run mongo console"
	@echo "  stop                          stop all containers"

build:
	docker-compose build

app:
	docker-compose up app

stop:
	docker-compose stop

app.console:
	docker-compose run --rm app bash

mongo.console:
	docker-compose run --rm mongo.console
