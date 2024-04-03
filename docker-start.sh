#!/bin/bash
echo "hello world"
# Check if the PostgreSQL image exists locally
if docker images -q postgres:alpine > /dev/null 2>&1; then
    echo "PostgreSQL image found locally."
else
    echo "PostgreSQL image not found locally. Pulling from Docker Hub..."
    docker pull postgres:alpine
fi

# Check if the container with the given name already exists
containerExists=$(docker ps -aq -f "name=postgres-container")
if [ -z "$containerExists" ]; then
    # If the container doesn't exist, create and run it
    echo "PostgreSQL container not found. Creating and running..."
    docker run --name postgres-container -e POSTGRES_PASSWORD=bebra228 -e POSTGRES_DB=test_game -e POSTGRES_USER=bober -p 5432:5432 -d postgres:alpine

    # Wait for the container to start
    echo "Waiting for PostgreSQL container to start..."
    sleep 20
    readyCheck=$(docker inspect --format="{{.State.Running}}" postgres-container)
    echo "Container status: $readyCheck"
    if [ "$readyCheck" == "true" ]; then
        echo "PostgreSQL container is running."
    else
        echo "PostgreSQL container failed to start."
        exit 1
    fi

    # Change directory to server folder
    cd ./server || exit 1

    # Migrate the database
    echo "Running Prisma migration..."
    npx prisma migrate dev --name init
    if [ $? -ne 0 ]; then
        echo "Prisma migration failed. Retrying..."
        sleep 1
        exec "$0"
    fi
else
    # If the container exists, just start it
    echo "PostgreSQL container exists. Starting..."
    docker start postgres-container
fi
