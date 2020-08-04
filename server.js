'use strict';

//Set up Express Server
const express = require('express');
const app = express();
const user = {username: 'My Lord'};

//Environmental Variables
const PORT = process.env.PORT || 3000;
//Middle Wear
//Wire up Static files from the public folder
app.use(express.static('./public'));




//Page Routes
app.set('view engine', 'ejs');

app.get('/index', (request, response) => {
  let viewModel = {
    user,
  }
  response.render('index', viewModel);
});


//Add route for Task List Page
app.get('/taskList', (request, response) => {
  let viewModel = {
    user,
  }
  response.render('taskList', viewModel);
});












app.get( '*', (request, response) => response.status(404).send('This request route does not exsist. Bye for now.'));
















app.listen(PORT, () => console.log(`Server.js is Listening on PORT ${PORT}`));
