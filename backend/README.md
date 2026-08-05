# Design Notes
Last Updated: 2026-08-05  
Eric Jeffcoat

## Description
This system is designed as a bridge to provide a REST API web server in order to
receive and transmit data to/from an instance of a PostgreSQL database. It acts
as an interface endpoint for potentially many frontend services. Database schema
creation is handled via the management CLI tools offered by django. This backend
is entirely containerized using Docker and has a corresponding Dockerfile.

## Structure and Design Philosophy
The backend's main splits lie across the three django apps that are defined
within the backend root folder.

**leetledger**: Main backend app

**problems**: App that handles model/API shape related to programming
problems and patterns used to solve them.

**progress**: App that handles model/API shape related to attempts made to solve
problems.

*Why split problems and progress?*  
The idea is to have a loose coupling between problems and attempts made on them.

*Why use Django, and more specifically DRF?*  
The Django framework is mature and contains many ready-made solutions for
database ORM mappings, migrations, and a sophisticated admin panel that has
proved very helpful for exploring and debugging the API.

## Testing Philosophy
Backend tests aim to consist of mainly unit tests, with some integration tests
interspersed as it makes sense to do so. Tests are devised after a module is 
written and not before, as the main goal is to provide verification of working
systems and fast redesign capability.

### Useful Testing Commands
**Run test suite in docker container:**
`docker compose -f docker-compose.dev.yml exec backend uv run python manage.py test`

**Gather coverage data in docker container:**
`docker compose -f docker-compose.dev.yml exec backend uv run coverage run manage.py test`

**Display coverage statistics in docker container:**
`docker compose -f docker-compose.dev.yml exec backend uv run coverage report -m`

*Note that to get accurate coverage reports, you need to re-generate coverage
data before running the coverage report.*
*All testing cli tooling assumes running in a dockerized environment.*

## Auth
Currently this backend does not use authentication for multiple users. This is
planned in the future, but as of yet the API is open.

### Further Explanation for scripts
`docker_run_postgres_db.sh`  
Runs a Postgres database in a docker container that
can be reached by an instance of the leet-ledger backend that runs outside of a
docker compose file.  
*Note that the credentials for this script are hardcoded currently, and that the
contents of a database created in this manner may not match with one that
originated from the docker compose files offered.*

`entry_point.sh`  
This script is referenced by the docker compose file and does 3 things.
- install python dependencies in the uv lock
- apply database migrations
- start the dev server

## Notable frameworks and libraries used in leet-ledger application
- Django Web Framework
- Django Rest Framework
- psycopg2-binary
- others that can be found as a complete list in the uv.lock file

### Further Reading
- https://docs.djangoproject.com/en/6.0/
- https://www.django-rest-framework.org/