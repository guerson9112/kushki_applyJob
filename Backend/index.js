const express = require('express');
require('dotenv').config(); 
const cors = require( 'cors' );

const app = express();

//CORS
app.use( cors() );

//Public directory
app.use( express.static('public') );

//Body read
app.use( express.json() );

//Routes
app.use('/api/token', require('./routes/token'));

app.listen( process.env.PORT, () => {
    console.log( `Server running port${ process.env.PORT }` )
} );