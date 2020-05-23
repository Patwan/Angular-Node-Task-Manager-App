# Installation

* Run **npm install** to install all depedencies in package.json <br/>
* Run **nodemon app.js** to spin dev server with hot reload.
* Configure your local database creds in **db/models/mongoose.js**
* All routes and controller logic are in **app.js**.
* In bigger projects, always separate your routes from the controller logic.
  This makes the app scalable , readable and maintainable. 