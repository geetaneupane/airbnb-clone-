const express=require("express");
const cors=require("cors");
const app=express();
const cookieParser=require("cookie-parser");
const User=require('./models/User.js');
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs=require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Place=require('./models/Place.js');

const bcryptSalt=bcrypt.genSaltSync(10);    //By using Sync, we are denoting it as a asynchronous function.
const jwtSecret="kjlkjkh87jkkjh768jhkjh";     //We can use a random string here.

app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
//This line of code is for getting the photo in the backend.We are using express.static middleware for this purpose. 
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('Test Ok! I am getting the response again.');
  });

  app.post('/register', async (req, res) => {
    console.log('Received POST request to /register');
    console.log('Request body:', req.body);

    const { name, email, password } = req.body;
    try{
      const userDoc=await User.create({
      name,                                         
      email,
      password: bcrypt.hashSync(password, bcryptSalt),      //We are unable to create multiple account from single email. 
    })
  
    res.json({ userDoc });
  }
  catch(e){
    res.status(422).json(e);
  }
  })
app.post('/login', async(req,res)=>{
const {email,password } = req.body;
const userDoc=await User.findOne({email});
if (userDoc){
  const passOk=bcrypt.compareSync(password, userDoc.password)
  if(passOk){
    jwt.sign({email:userDoc.email, 
      id:userDoc.id,
      name:userDoc.name
    },
      jwtSecret,{}, (err, token)=>{
      if(err) throw err;
      res.cookie('token', token).json(userDoc);
      });
  }
  else{
    res.status(422).json("pass not Ok!");
  }
}
 
else{
  res.json("Not found!")
}
})

app.get('/profile', (req, res) => {
  const {token}=req.cookies;
  if(token){
   jwt.verify(token, jwtSecret,{},(err,  user)=>{
    if(err) throw err;
    res.json(user);
   })
  }
  else{
    res.json(null);
  }
  res.json({token});
});
app.post('/logout', (req,res)=>{
  res.cookie('token', '').json(true);
});
 
console.log({__dirname});
app.post('/upload-by-link', async(req,res)=>{
 const {Link}=req.body;
 const newName=  'photo'+ Date.now() + '.jpg';
 const fullPath = __dirname + '/uploads/' + newName;
  await imageDownloader.image({
  url:Link,
  dest:fullPath        //It is referring me to the uploads folder that I have created inside the api directory.  
 })                                          //We will see which directory we are referring in the terminal.
 res.json(newName);     //We are getting the newName of the image only not the one with the directory name also.
}); 
const photosMiddleware = multer({ dest: 'uploads' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i]; // <-- Use originalname instead of originalName
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath);
  }
  res.json(uploadedFiles);
});




app.post('/places', (req,res)=>{
    const {token}=req.cookies;
     const{title,address,addedPhotos,description, perks, extraInfo, 
    checkIn, checkOut, maxGuests}=req.body;
    jwt.verify(token, jwtSecret,{},(err,  user)=>{
     if(err) throw err;
      const placeDoc= Place.create({
      owner:user.id,
      title,address,addedPhotos,
      description, perks, extraInfo, 
       checkIn, checkOut, maxGuests
     });
     res.json(placeDoc);
    })
  
});
 
  
 //We'll see the path of the image in the network tab after we upload it into the UI before we actually see the image in the UI, we have to rename it.
 //For renaming our files, we need the library named as file system library and we will use the required statements for importing it into our code. 

//the above code, User is our model, whereas userDoc is the newly created user. 

/*
For password encryption, we are using bcrypt. It is the package which can be obtained by installing from node package manager.
--We have used another package named multer for implementing uploading purpose from our computer named as "multer"
*/


app.listen(4000);