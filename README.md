## play_play

[![Build Status](https://travis-ci.org/mgoodhart5/play_play.svg?branch=master)](https://travis-ci.org/mgoodhart5/play_play)

A Turing School pair project.

[PlayPlay](https://protected-fortress-76604.herokuapp.com)

Contributors:
* Leah K Miller: https://github.com/le3ah
* Mary Goodhart: https://github.com/mgoodhart5


# About Play Play

This is our first pair project in our last module at the Turing School of Software & Design.  We were tasked with developing a full-stack application in a language new to us (read: not Ruby on Rails).  For the backend, we used the Express library and interacted with our database through Knex.  You can visit our frontend deployed site on https://le3ah.github.io/play_play_fe/.

We started with some basic search functionality from the MusixMatch API and built out from there.

![homepage](/.readme/early.png)

## Favicon
We're pretty excited to incorporate some feel-good tunes into this project, starting with our favicon and filepath name, whose inspiration we drew from Busta Rhymes.

![favicon](/.readme/favicon.png)

## Current Known Issues

You may notice our Travis CI badge still says it's failing.  Even when all of our tests passed and testing locally and in production worked, Travis was still giving us issues.  Because of this, we needed to manually deploy to Heroku, which, while terrifying, actually turned out okay.


## Database

![schema](/.readme/schema.png)

We're no stranger to joins tables, but trying to display joins tables within Express is a horse of a different color.  We were able to make it work though and feel excited about matching up to our original wireframes.

![wireframe](/.readme/wireframe.png)

Our code isn't halfbad either!
```
const all = () => database('playlists')
  .join('playlists_favorites', {'playlists.id': 'playlists_favorites.playlist_id'})
  .join('favorites', { 'favorites.id': 'playlists_favorites.favorite_id' })
  .groupBy('playlists.id')
  .select(['playlists.id as id', 'playlists.name as playlist_name',
    database.raw('json_agg(favorites) as favorite')
    ])
    ```

## Getting Started && Prerequisites

* To run our code, we installed Postgres and created our database within psql
* First though, you should clone our code:
```
git clone <https://github.com/mgoodhart5/play_play >
```

### Installing

From your terminal, navigate into the Play_Play FE directory:

```
cd play_play_fe
```

* We had to run several commands for full functionality, which include the following:
  ```
  npm init --yes
  npm install knex -g
  npm install knex --save
  npm install express -g
  npm install express --save
  npm install pg --save
  npm install body-parser --save
  ```
* We initialized our database using `knex init`

* In order to migrate our seed data, we ran the following:
```
knex migrate:latest
knex seed:run
```

###### Tests
For testing, we needed to install mocha to run the tests and chai to give us the ability to make assertions.  `chai-http` lets us make requests to our own server to check what the endpoints return

* Run `npm install -D mocha chai chai-http`

When you're actually running a test, simply run `mocha --exit`, and you should be all set.


Start your server:

```
npm start
```

Open your browser (best functionality in Chrome).

`localhost:3000`

## Running the Server Locally

To see your code in action locally, you need to fire up a development server. Use the command:

```
npm start
```

Once the server is running, visit in your browser:

* `http://localhost:3000/` to run your application.


## Built With

* [JavaScript](https://www.javascript.com/)
* [jQuery](https://jquery.com/)
* [Express](https://expressjs.com/)
