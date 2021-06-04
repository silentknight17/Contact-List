const express=require('express');
const path=require('path');
const port=8000;


//Database

const db=require('./config/mongoose');
const Contact=require('./models/contact');



const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded()); 

//Accessing the static files
app.use(express.static('assets'));

/*Creating our own middleware1
app.use(function(req,res,next){
    console.log('Middleware 1 called');
    next();
})
*/
//Creating a Contact List
var contactList=[
    {
        name:"Sarvagya Prateek",
        phone:"85760702567"
    },
    {
      name:"Anita Jha",
      phone:"9415681779"
    }
]

app.get('/',function(req,res){
   /* console.log(__dirname);
    res.send('<h1>It is running! or is it?</h1>');*/
   // return res.render('home');

//Fetching data from the database
Contact.find({}, function(err,contacts){
if(err)
{
    console.log('Error in fetching contacts from database');
    return;
}
return res.render('home',{
    title:"Contacts List",
    contact_list:contacts
 });



});


  /* return res.render('home',{
       title:"Contacts List",
       contact_list:contactList

    });*/
});
app.get('/practice',function(req,res){
     return res.render('practice',{title:
    "Let us play!!"});
});

// Adding contact with the help of button and form.

app.post('/create-contact',function(req,res){
   //  return res.redirect('/practice');
   //Appending our new contact from the browser in the array
  /* contactList.push({
       name:req.body.name,
       phone:req.body.phone
   });*/
// We can also use contactList.push(req.body);
//Populating the database.

Contact.create({
    name: req.body.name,
    phone: req.body.phone
},function(err,newContact){
    if(err)
    {
        console.log('error in creating a contact');
        return;
    }
    console.log('******',newContact);
    return res.redirect('back');
});


   //return res.redirect('/');
});

//Deleting a record from the server

/*app.get('/delete-contact/:phone',function(req,res){
    console.log(req.params);
let phone=req.params.phone;
});*/

//Deleting a contact
app.get('/delete-contact/', function(req,res){
    //Get the query from the URL
   // let phone=req.query.phone;

   //Deleting from the database
   //Get the id from query in the ul
   let id= req.query.id;
    
//Find the contact in the database using id and delete
Contact.findByIdAndDelete(id,function(err){
    if(err)
    {
        console.log('error in deleting an object from database');
        return;
    }

});
return res.redirect('back');



    //Fetching the phone number index
  /*  let contactIndex=contactList.findIndex(contact=> contact.phone==phone)

    if(contactIndex!=-1){
        contactList.splice(contactIndex,1);
    }
*/
    //return res.redirect('back');
});


app.listen(port,function(err){
    if(err)
    {
        console.log('Error in running the server',err);

    }
    console.log('My server is running on the Port:' ,port);
});
