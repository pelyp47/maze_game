**FE**\
@reduxjs/toolkit: "^2.2.1" - addon to redux, which helps to\
logically split store into slices, makes it more comfortable\
to work with async code in store context.\
\
next: "^14.2.3" - adding SWR to App, LoginForm, Home components.\
Used app router in this app.\
\
next-auth: "^4.24.7" - easy and automated auth to many services, in this\
app it is auth0.\
\
next-intl: "^3.14.1" - bringing international translation functionality\
in this app it is English and Ukrainian.\
\
react: "^18.2.0" - js library for building ui, all app functionality is\
based on it.\
\
**WORKFLOW**\
*initial page (App), judging if you have signed in or not, will redirect you with NEXT.js router to Home or logIn state*\
*login will consider if user has logged in once in auth0 and if client has id, name in localStorage*
*In Home the RTK store is initialized and WS connection opens*\
*RTK store will mange the workflow in Home entirely*\
*All WS actions are sent to server, every client gets update, only those who needs UI change rerender state via rtk asyncThunk fetches*\
**\
\
\
\
**BE**\
cors: "^2.8.5" - middlewares for express, solves Cross-Origin trouble\
\
dotenv: "^16.4.5" - allows to use .env files where different secret data\
is stored\
\
express: "^4.18.3" - allows to build apis in Node.js in effective way. It\
is used all across the app.\
\
ws: "^8.16.0" - is used for live actions where server should initialize the\
connection. All gameplay is built on it.\
\
zod: "^3.23.8" - object scheme validation. It is used on every endpoint (as we get\
unknown data each time). Helps to check type and schemas as TS can't throw errors\
during runtime.\
\
prisma: "^5.10.2" - orm to work with PostgreSQL\
\
typescript: "^5.3.3" - bringing strict type to JS\
\
\
**WORKFLOW**\
\
*two servers - WS and REST API*
*all WS logic in main index file*
*at the start, client fetches its id by giving name to GET /user?name=.. endpoint, than it is used in fuurther endpoints*
*game state counts each time via utils/mazeState, while in db only start position is stored*
