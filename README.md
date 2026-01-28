# Clean architecture + Testing discipline
This project was generated using NestJS CLI version 11.0.10

## Description
A NestJS application demonstrating clean architecture principles, with a clear separation of concerns between services and repositories, and a well-structured folder organization.
The application is backed by a PostgreSQL database running via Docker Compose and follows a strong testing discipline.

This project includes:

- Clean architecture with service / repository separation
- Task Manager REST API (CRUD operations)
- DTO-based input validation
- Exception handling
- Unit tests
- Basic end-to-end (E2E) tests for API endpoints
- PostgreSQL integration using TypeORM
- Environment-based configuration management
- Ready-to-run containerized development setup



### Development server
To start a local development server, run:
``` bash
$ npm install
$ npm run start:dev
```
API available at: http://localhost:3000

### Running unit tests
To execute unit tests with the Jest test runner, use the following command:
``` bash
$ npm run test

```

### Optional: Docker
This project includes two Docker Compose configurations:
- Development environment
- Production environment

1- Development (docker-compose.dev.yml)

```
# Used for local development with hot reload.
$ docker-compose -f docker-compose.dev.yml up -d

# Stop containers.
$ docker-compose -f docker-compose.dev.yml down

# Logs.
$ docker-compose -f docker-compose.dev.yml logs -f app
```


2- Production (docker-compose.prod.yml)

```
# Used for production-ready builds.
$ docker-compose -f docker-compose.prod.yml up -d --build

# Stop containers.
$ docker-compose -f docker-compose.prod.yml down

```



### Available endpoints
Task endpoints : 

```
# Add
POST /auth/add

# Body Example :
{
    "title": "Task_1" ,
    "description": "Task1",
    "isArchived": false;
}
```

```
# Display Tasks with pagination
Get /auth/pagination?page=2&limit=100


```


### Additional Resources
For more information on using the NestJs, including detailed command references, visit the https://docs.nestjs.com page.

The project can also be run using Docker, for more details, see the https://docs.docker.com page.
