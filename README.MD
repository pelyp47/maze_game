# The maze game: running locally

## Preparing the server

Run `npm install` in `./server` directory to install all the dependencies.

Create the `./server/.env` file with the following contents:

```
PORT = 3000
DOMAIN = "localhost"
DATABASE_URL="postgresql://halo:lab@localhost:5432/test_game?schema=public"
```

## Preparing the client

Run `npm install` in `./client` directory to install all the dependencies.

Create the `./client/.env` file with the following contents:
```
VITE_DOMAIN = "http://localhost:3000"
VITE_WS_DOMAIN = "ws://localhost:3000"

NEXT_PUBLIC_DOMAIN = "http://localhost:3000"
NEXT_PUBLIC_WS_DOMAIN = "ws://localhost:3000"
NEXT_PUBLIC_BASE_PATH = ""
NEXT_AUTH_SECRET = halloS

AUTH0_CLIENT_ID = MYFUZRzidFwbBuqtoNkWCMIisMVTxClc
AUTH0_CLIENT_SECRET = KH8VLU1SezLJ8NYvvC7JWV_cjrOpEpdkhyrVD-egKY4cA5N6Q5TzmBlOPeLcINGW
AUTH0_DOMAIN = dev-6gbzpnkkzc3ylxa4.us.auth0.com
AUTH0_ISSUER = https://dev-6gbzpnkkzc3ylxa4.us.auth0.com
NEXTAUTH_URL = http://localhost:5173
```

## Starting the server & client

Execute the following command from the root directory of the project in git-bash console (Docker should be up and running):
```
npm run start
```

*Note*: in case of an error initialazing project in either system with "start" script, please delete the created Docker container (and related volumes if this initial setup) and try again. You can use the following command from the project's root for that:
```
npm run remove-db
```


## Local database connection details (safe to put here)

- Host name/address: `host.docker.internal`
- Port: `5432`
- Maintenance database: `test_game`
- Username: `halo`
- Password: `lab`