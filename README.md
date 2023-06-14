This project has been created as the solution for a code challenge, in this file you will be able to find a general guidance on how the project should be executed and all the endpoints that are currently being exposed

# Docker and Docker Compose Installation Guide

## Installing Docker

To install Docker, follow these steps:

1. **Update system packages**: Before installing Docker, update your system's package manager to ensure you have the latest packages. Refer to your specific operating system's package manager documentation for instructions.

2. **Install Docker**: Visit the official Docker documentation for detailed installation instructions specific to your operating system:

   - Docker installation documentation: [https://docs.docker.com/install](https://docs.docker.com/install)

   The documentation provides step-by-step instructions for various operating systems including Linux, macOS, and Windows.

3. **Verify Docker installation**: After installing Docker, open a terminal or command prompt and run the following command to verify that Docker is installed correctly:

```bash
docker --version
```

## Installing Docker Compose

Docker Compose is a tool for defining and running multi-container Docker applications. It allows you to describe your application's services, networks, and volumes in a single YAML file and easily manage the lifecycle of your containers.

To install Docker Compose, follow these steps:

## Prerequisites

Before installing Docker Compose, make sure you have Docker installed on your system. Docker Compose is typically distributed alongside Docker and requires Docker to be already installed.

If you haven't installed Docker yet, refer to the official Docker installation documentation for instructions specific to your operating system: [https://docs.docker.com/install](https://docs.docker.com/install)

## Installation Steps

To install Docker Compose, perform the following steps:

1. **Download the Docker Compose binary**: Docker Compose is not bundled with Docker by default, so you need to download it separately. The recommended approach is to retrieve the binary from the official GitHub repository.

   - Visit the Docker Compose GitHub repository release page: [https://github.com/docker/compose/releases](https://github.com/docker/compose/releases)

   - Find the latest release of Docker Compose and locate the binary appropriate for your operating system. Typically, you will download a file named `docker-compose` or `docker-compose.exe`.

2. **Set executable permissions (Linux/macOS)**: If you're using Linux or macOS, make the downloaded binary executable. Open a terminal, navigate to the directory where the binary is located, and run the following command:

```bash
chmod +x docker-compose
```

# Running the app

```bash
$ docker-compose up
```

# Endpoints and general documentation

## Login

Example Request:

```
curl -X POST
-H "Content-Type: application/json"
-d '{"username": "Daniel", "password": "password"}' http://localhost:3000/auth/login
```

Response:

```
{
  "access_token": "Bearer token"
}
```

## Sign Up

Example Request:

```
curl -X POST
-H "Content-Type: application/json"
-d '{
  "username": "Daniel_",
  "firstName": "Daniel",
  "lastName": "Garrido",
  "address": "123 Main St",
  "password": "password123"
}' http://localhost:3000/auth/signup
```

Response:

```
{
  "username": "Daniel_",
  "firstName": "Daniel",
  "lastName": "Garrido",
  "address": "123 Main St",
  "password": "$2b$10$36j4M3tOsNozs2FOyYCKl.TF5kmRSUlfVoJJ5MpTCK6VFxbw00bhC",
  "_id": "64894f7a3d53fa8c72966ca0",
  "__v": 0
}
```

## Create User

Example Request:

```
curl -X POST
-H "Content-Type: application/json"
-H "Authorization: Bearer token"
-d '{
  "username": "jane_smith",
  "firstName": "Jane",
  "lastName": "Smith",
  "address": "456 Elm St",
  "password": "password456"
}' http://localhost:3000/users
```

Response:

```
{
  "username": "jane_smith",
  "firstName": "Jane",
  "lastName": "Smith",
  "address": "456 Elm St",
  "password": "password456",
  "_id": "648950343d53fa8c72966ca7",
  "__v": 0
}
```

## Get Users

Example Request:

```
curl -X GET
-H "Authorization: Bearer token"
http://localhost:3000/users
```

Response:

```
[
  {
    "_id": "64894f7a3d53fa8c72966ca0",
    "username": "Daniel_",
    "firstName": "Daniel",
    "lastName": "Garrido",
    "address": "123 Main St",
    "password": "$2b$10$36j4M3tOsNozs2FOyYCKl.TF5kmRSUlfVoJJ5MpTCK6VFxbw00bhC",
    "__v": 0
  },
  {
    "_id": "648950343d53fa8c72966ca7",
    "username": "jane_smith",
    "firstName": "Jane",
    "lastName": "Smith",
    "address": "456 Elm St",
    "password": "password456",
    "__v": 0
  }
]
```

## Update Users

Example Request:

```
curl -X PUT
-H "Content-Type: application/json"
-H "Authorization: Bearer token"
-d '{
  "username": "Daniel_",
  "firstName": "Testing",
  "lastName": "Testing More",
  "address": "456 Elm St"
}' http://localhost:3000/users/64894f7a3d53fa8c72966ca0
```

Response:

```
{
  "_id": "64894f7a3d53fa8c72966ca0",
  "username": "Daniel_",
  "firstName": "Testing",
  "lastName": "Testing More",
  "address": "456 Elm St",
  "password": "$2b$10$36j4M3tOsNozs2FOyYCKl.TF5kmRSUlfVoJJ5MpTCK6VFxbw00bhC",
  "__v": 0
}
```

## Delete Users

Note: This endpoint was created for testing purposes to clean the database

```
curl -X DELETE http://localhost:3000/users
```

The response of this endpoint is the number of records that were deleted from the user table.
