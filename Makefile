app:
	docker-compose up app

stop:
	docker-compose stop

app.console:
	docker-compose run app bash

mongo.console:
	docker-compose run mongo.console
