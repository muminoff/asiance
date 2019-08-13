PP  := pipenv
PPR := $(PP) run
DJC := $(PPR) python manage.py check
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
	cd $(PROJECT_DIR) && $(DJC) && $(DJR) migrate

migrations:
	cd $(PROJECT_DIR) && $(DJC) && $(DJR) makemigrations api

data:
	cd $(PROJECT_DIR) && $(DJC) && $(DJR) generatedata

shell:
	cd $(PROJECT_DIR) && $(DJC) && $(DJR) shell

run:
	cd $(PROJECT_DIR) && $(DJC) && $(DJR) runserver 0.0.0.0:8080
