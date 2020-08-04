'use strict';

//Set up Express Server
const express = require('express');
const app = express();


//Environmental Variables
const PORT = process.env.PORT || 3000;








app.get( '*', (request, response) => response.status(404).send('This request route does not exsist. Bye for now.'));
















app.listen(PORT, () => console.log(`Server.js is Listening on PORT ${PORT}`));
