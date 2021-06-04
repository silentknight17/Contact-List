//Mongoose is creating the schema.

const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
     name:{
           type: String,
           required : true
     },
     phone:{
         type: String,
         required:true
     } 
});

//Contact is the name of the collection here.
const Contact=mongoose.model('Contact',contactSchema);

module.exports=Contact;
