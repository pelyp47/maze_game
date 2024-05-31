@echo off

rem Check if the PostgreSQL image exists locally
docker images -q postgres:alpine > NUL 2>&1
if errorlevel 1 (
    rem If the image doesn't exist, pull it from Docker Hub
    docker pull postgres:alpine
)

rem Check if the container with the given name already exists


for /f "tokens=* USEBACKQ" %%F IN (`docker ps -aq -f "name=postgres-container"`) do set containerExists=%%F
if "%containerExists%" == "" (
    rem If the container doesn't exist, create and run it
    docker run --name postgres-container -e POSTGRES_PASSWORD=lab -e POSTGRES_DB=test_game -e POSTGRES_USER=halo -p 5432:5432 -d postgres:alpine

    :waitloop
    timeout /t 20 > NUL
    for /f "tokens=* USEBACKQ" %%F IN (`docker inspect --format="{{.State.Running}}" postgres-container`) do set readyCheck=%%F
    echo "%readyCheck%"
    if "%readyCheck%" == "true" (
        goto exitwaitloop
    )
    goto waitloop
    :exitwaitloop
    rem Change directory to server folder
    cd .\server
    :retry_migration
    rem Migrate the database
    npx prisma migrate dev --name init
    if errorlevel 1 (
        timeout /t 1 > NUL
        goto retry_migration
    )
) else (
    rem If the container exists, just start it
    docker start postgres-container
)