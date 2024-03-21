**docker config:**
```
docker pull postgres
docker run --name postgres-container -e POSTGRES_PASSWORD=bebra228 -e POSTGRES_DB=test_game -e POSTGRES_USER=bober -p 5432:5432 -d postgres
```

**additional info for PGAdmin:**
*Host name/address: `host.docker.internal`*
*Port: `5432`*
*Maintenance database: `test_game`*
*Username: `bober`*
*Password: `bebra228`*


**migration**
`npx prisma migrate dev --name init`
**seed**
`npx prisma db seed`
