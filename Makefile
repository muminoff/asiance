PP  := pipenv
PPR := pipenv run
DJR := $(PPR) python manage.py

all: install

install:
	$(PP) install

db:
	psql -c "DROP DATABASE IF EXISTS asiance"
	psql -c "DROP ROLE IF EXISTS asiance"
	psql -c "CREATE USER asiance"
	psql -c "CREATE DATABASE asiance OWNER asiance"
