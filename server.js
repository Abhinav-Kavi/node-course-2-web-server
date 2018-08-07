const express = require("express");
const fs = require("fs");
const hbs = require("hbs"); //Templates -- See Doc_help.txt
const port = process.env.PORT || 3000; //Configuaration for heroku

var app = express();

hbs.registerPartials(__dirname+'/views/partials'); //registering partial templates
app.set('view engine','hbs');  // set view engine

//registering a helper functions
hbs.registerHelper('getCurrentYear',()=>new Date().getFullYear()); 
hbs.registerHelper('screamIt',text=> text.toUpperCase());



//Middleware -- See Doc_help.txt
app.use((req,res,next)=>{
  var log = new Date().toString() + ` : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("serverLogs",log + '\n',err => {
    if(err)
     console.log(err);
  });
  next();
});

//Maintenance middleware
/*
app.use((req,res,next)=>{
  res.render("maintenance.hbs",{
    pageTitle : "We will be back"
  })
});
*/

//Serving directories -- See Doc_help.txt
app.use(express.static(__dirname+ '/public'));


//We are setting basic routes for get requests here and defining respective handler which will decide what will happen once the particular route is hit
app.get("/", (req, res)=>{
 // res.send(`<h1>Hello Express</h1>`);

 res.render('home.hbs',{
   pageTitle: "Home Page",
   welcomeMessage: "Welcome to our site. We are so glad to see you here!"
 })
});

app.get('/about', (req, res)=>{
  //res.send("About Page");

  res.render('about.hbs',{
    pageTitle : "About Us"
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: "Error occured while processing request"
  });
});




//This will listen for any incoming requests on the specified port
app.listen(port,() => console.log(`Listening on port ${port}....`));