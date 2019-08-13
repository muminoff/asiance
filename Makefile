PP  := pipenv
PPR := $(PP) run
DJR := $(PPR) python manage.py
PROJECT_DIR = asiance

all: install

install:
	$(PP) install

db:
	psql -c "DROP DATABASE IF EXISTS asiance"
	psql -c "DROP ROLE IF EXISTS asiance"
	psql -c "CREATE USER asiance"
	psql -c "CREATE DATABASE asiance OWNER asiance"

migrate:
	cd $(PROJECT_DIR) && $(DJR) migrate

migrations:
	cd $(PROJECT_DIR) && $(DJR) makemigrations api
