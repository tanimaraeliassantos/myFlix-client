# myFlix React Client

myFlix React Client is the client-side of a movie database application built with React using an existing server-side and a MongoDB database.

This app provides users with access to information about different movies, directors and genres. Users are able to sign up, update personal information and create and edit a list with their favorite movies.

**See the hosted application [here](https://moviesmyflix.netlify.app/).**

View the website built with Angular [here](https://anthropovixen.github.io/Angular-Client-myFlix-App/welcome) and its repository [here](https://github.com/anthropovixen/Angular-Client-myFlix-App/tree/master).

View the back-end REST API database [here](https://github.com/anthropovixen/myFlix-Project).

![myFlix-React-Client](img/myflix-react-showcase.gif)

## Start the App

### Install dependencies

```bash
npm install
```

### Install parcel

```bash
npm install -g parcel-bundler
```

### Build for development

```bash
parcel src/index.html
```

### Run application in browser

Parcel will run the application on a local server on port:1234. To see it, go to:

```bash
http://localhost:1234/
```

### Further help

To get more help on installing Parcel go check out the [Parcel Documentation](https://parceljs.org/getting_started.html) page.

## Features

- Allows users to register an user account
- Allows users to sign into the application
- Allows users to see all movies in the database
- Allows users to see information about genre and direction of a movie of their choice
- Allows users to update or delete their account
- Allows users to add or remove movies from their list of favorite movies

## Technologies

- Express
- Mongoose
- Node
- React

### Author

[Tanimara Elias Santos](https://github.com/anthropovixen)

### Version

1.0.0
