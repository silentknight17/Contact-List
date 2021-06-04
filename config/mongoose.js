//Require the library.
const mongoose=require('mongoose');
//Take help from mongoose search on google.
//Connect to the database.
mongoose.connect('mongodb://localhost/contact_list_db');

//Acquire the connection (to check if it is successful)
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running then print the message.
db.once('open',function(){
    console.log('Successfully connected to the database.');
});
