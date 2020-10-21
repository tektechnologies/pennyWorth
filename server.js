'use strict';

//Set up Express Server
const express = require('express');
const app = express();
const user = {username: 'My Lord', greeting: 'Good Day Sire'};
//Application Dependancies.
const pg = require('pg');


//Environmental Variables
require('dotenv').config();
const PORT = process.env.PORT || 3000;


//Middle Wear



//app.use(methodOverride('_method'));
// Utilize ExpressJS functionality to parse the body of the request
app.use(express.urlencoded({ extended: true }));
// Specify a directory for static resources Wire up Static files from the public
app.use(express.static('./public'));

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));





//Page Routes
//Set up View Engines so you can render your view files
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  let viewModel = {
    user,
  }
  response.render('', viewModel);
});




//Add route for Task List Page
// API Routes
app.get('/homePortal', getHomePortal);

app.get('/getTasksHomePage', getTasksHomePage);

app.get('/tasks/:task_id', getOneTask);

app.get('/addTask', showForm);

app.post('/addNewTask', addTask);

app.get( '*', (request, response) => response.status(404).send('This request route was not found, you have reached a 404. Bye for now.'));

console.log('Trying to connect to Postgres');

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  })
  .catch(err => { throw err; })

// HELPER FUNCTIONS

function getTasksHomePage(request, response) {
  const SQL = `
    SELECT *
    FROM tasks
  `;
  client.query(SQL)
    .then(results => {
      let viewModel = {
        user,
        tasks: results.rows,
      };
      response.render('pages/taskListHomePage', viewModel);
    })
}

function getOneTask(request, response) {
  const SQL = `
    SELECT *
    FROM tasks
    WHERE id = $1
  `;
  let values = [request.params.task_id];
  console.log('This is the values ', values);
  client.query(SQL, values)
    .then(result => {
      let viewModel = {
        user,
        task: result.rows[0],
      };
      response.render('pages/taskDetail', viewModel);
    })
    .catch(err => handleError(err, response));
}

function showForm(request, response) {
  let viewModel = {
    user
  };
  response.render('pages/addTask', viewModel);
}

function addTask(request, response) {
  console.log('request body for add task ', request.body);
  // Destructuring
  let { title, contact, status, category, description } = request.body;

  const SQL = `
    INSERT INTO tasks (title, contact, status, category, description)
    VALUES ($1,$2,$3,$4,$5)
  `;
  const values = [title, contact, status, category, description];

  client.query(SQL, values)
    .then(() => {
      // POST - Redirect - GET pattern
      response.redirect('/');
    })
    .catch(err => {
      handleError(err, response);
    });
}


















function getHomePortal(request, response) {
  const SQL = `
    SELECT *
    FROM portals
  `;
  client.query(SQL)
    .then(results => {
      let viewModel = {
        user,
        portals: results.rows,
      };
      console.log(results.rows);
      response.render('pages/homePortal', viewModel);
    })
}





function handleError(error, response) {
  let viewModel = {
    error: error.message
  };
  response.status(500).render('pages/error', viewModel);
}





































