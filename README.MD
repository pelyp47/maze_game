./server/.env
```PORT = 3000
DOMAIN = "localhost"
DATABASE_URL="postgresql://bober:bebra228@host.docker.internal:5432/test_game?schema=public"
```
./client/.env.deveopment
```
VITE_DOMAIN = "http://localhost:3000"
VITE_WS_DOMAIN = "ws://localhost:3000"
```
\
**windows**\
you can use
```
npm run start-windows
```
in powershell terminal in VSCode\
or
```
npm run start
```
in bash(gitbash) terminal in VSCode\
\
**MacOs or Linux**
```
npm run start
```
in bash(gitbash) terminal in VSCode\
\
*all "start" scripts should be executed after downloading packages in client and server folders, and added .env files*\
*you should execute "start" scripts after opening and signing in your docker application*\
*all "start" scripts should be executed from root directory*\
*in case of an error initialazing project in either system with "start" script, please delete created container in docker (not image) and try again.*\
\
\
**additional info for PGAdmin connection:**\
*Host name/address: `host.docker.internal`*\
*Port: `5432`*\
*Maintenance database: `test_game`*\
*Username: `bober`*\
*Password: `bebra228`*

<!-- 
**migration**
``
**seed**
`` -->
<!-- **docker config:**
```
chmod +x ./docker-start.sh
cacls ./docker-start.sh /g everyone:f
docker pull postgres
docker run --name postgres-container -e POSTGRES_PASSWORD=bebra228 -e POSTGRES_DB=test_game -e POSTGRES_USER=bober -p 5432:5432 -d postgres
``` -->