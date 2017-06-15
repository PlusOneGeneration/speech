app:
	docker-compose up app

app.console:
	docker-compose run app bash

mongo.console:
	docker-compose run mongo.console
