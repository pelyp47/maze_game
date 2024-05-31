# Technical solution notes

## Client

### Libraries used

- `@reduxjs/toolkit` - Redux addon, which helps to logically split store into slices, makes it more comfortable to work with async code in store context.
- `next` - adding SWR to App, LoginForm, Home components. Used app router in this app.
- `next-auth` - easy and automated authentication supporting various services; in this application we used Auth0.
- `next-intl` - bringing international translation functionality into this application. English and Ukrainian supported at the moment.
- `react` - JS library for building ui; basically the core library of the application.

### Workflow notes

Initial page (`App`), depending on whether you have signed in or not, will redirect you with Next.js router to `Home` or `LogIn` state.

Login will consider the following:
- had user already logged in at least once with Auth0?
- does the client has `id` & `name` in `localStorage`?

In `Home` the Redux Toolkit (RTK) store is initialized and WS connection opens. 

RTK store is managing the workflow in `Home`. 

All WebSocket actions are being sent to server; every client gets an update. Only those who need the UI change will re-render the state by initiating RTK `asyncThunk` fetches.

## Server

### Libraries used

- `cors` - express middleware, which solves Cross-Origin issues.
- `dotenv` - allows to use `.env` files with pre-defined environment variables.
- `express` - most well-known Node.js web application "framework"; basically the project's core.
- `ws` - WebSocket support for real-time communication between the client and the server.
- `zod` - object schema validation. It is used on every endpoint (as we get
potentially unsafe/untyped data with each request). Helps to check the data type against the schemas as TS can't throw errors during runtime.
- `prisma` - ORM library which is used to interact with PostgreSQL database.
- `typescript` - strict typing transpiled to JS

### Workflow notes

There are two main ways to interact with the server: WebSocket for the real-time communication and REST API for regular HTTP requests. WebSocket logic is contained within the main index file. At the start, client fetches its ID by giving the `name` to `GET /user?name=..` endpoint; this ID used in further calls. Game state is updated each time via `utils/mazeState`, while database stores only starting positions.

### OAS3

There is a yaml description of `GET /user, POST /user` routes in `server/src/openapi/swagger.yaml`. The generated with `https://editor.swagger.io/` client lib files are in `/api-client` root folder.