## Usage

  Install dependencies:

```bash
npm install
```

  Start the Node.js Express server and React client

```bash
npm start
```

## Challenge

This sample app is made up of:

1. A React client with Redux (using redux-toolkit- <https://redux-toolkit.js.org/>) `./client/`
2. An Express server with Typescript `./server/` using an SQLite database via `knex`https://knexjs.org/>.
   This is configured to emit dummy room states once per second

Please extend this app, using an NPM library of your choice to display the data made available in the Redux
slice `roomStates` and through the API endpoint `/api/v1/notification` as Toast Notifications that can be
dismissed permanently.

Rules

1. The data stored in Redux slice `roomStates` represents live `Room` data and does not need to be persisted.
2. The data stored in SQLite and made available through the API does need to be persisted.
3. Dismissed toast notifications using the API data source should not re-appear between page refreshes.

You are free to make any changes to meet the goals outlined above including but not limited to;  the database schema, API, Redux store etc
