# MediKeeper Sample App

> Simple app to simulate a basic inventory of items.

> <a href="https://medikeeper-app.herokuapp.com/">Main Site</a>

> <a href="https://medikeeper-app.herokuapp.com/apitest">API Test</a>

[![Heroku](https://heroku-badges.herokuapp.com/?app=medikeeper-app)]()

[![Home page](https://i.imgur.com/mx3ucWf.png)]()

- Image of the home page


## Installation

### Clone

- Clone this repo to your local machine using `https://github.com/zeepk/medikeeper-app`

### Setup

> install all required packages for server and client

```shell
$ npm install
$ cd client && npm install
```

> run the server

```shell
$ npm run dev
```

> run the client

```shell
$ cd client
$ bower install
```

---
## Front End
- React used for easy interface updating and management
- PrimeReact used for nice looking UI elements
- Jest used to run unit tests
## Back End
- Node used to run server and contain routes
- Routes include API endpoints
    - GET `/api/items` returns all records for all items
    - GET `/api/items/maxprices` returns the max prices for each item grouped by name
    - GET `/api/items/maxitemprice/:name` returns the max price for all items of the provided name
    - POST `/api/items` creates an item with values specified in the request body
    - PUT `/api/items/:id` updates the item which corresponds to the provided ID using values specified in the request body
    - DELETE `/api/items/:id` deletes the item which corresponds to the provided ID

## Tests

- Run React JEST tests using `npm test` in the root directory
- Most recent test reports can be found on the API Tests page
- The app will not deploy if any tests produce a failed result

---

### Thanks for checking it out! 
