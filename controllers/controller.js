const models = require('../models/model');
const fs = require('fs');
const bcrypt = require('bcrypt');

const saltRounds = 10;





// controllers/controller.js
exports.getHomePage = async (req, res) => {

    if(req.cookies.userid){

      const uname =req.cookies.name;
      const umail = req.cookies.email;

      const user = await req.cookies.name ;

      console.log("user name : ",user);
      
      res.render('index',{user,
        name : uname,
        email : umail
      });
    }
    else{
      res.render('login');
    }


};

exports.getSignupPage = (req, res) => {


  res.render('signup');
};

exports.signup = async (req, res) => {
  console.log("signup page render");
  

  if (req.body.password === req.body.confpassword) {
    
    const hash = await bcrypt.hash(req.body.password,saltRounds);

    console.log("bcrypt",hash);

    try{
      const userInfo = {
        username : req.body.username,
        email : req.body.email,
        contact : req.body.contact,
        password : hash
      }
      const newUser = new models(userInfo);
      await newUser.save();
      console.log("New User",newUser);

      res.cookie('id',newUser._id);
      res.redirect('/login');
    }
    catch(err){
      res.send("This email is already registered.");
    }

    

  }else{
    console.log("Try Again, enter the password properly ");
    
  }

 
  // Perform signup logic...
};





exports.getLoginPage = (req, res) => {
  res.render('login');
};



exports.login = async (req, res) => {

  console.log("Rendering login page");
  
  const userLogin = await models.find({

    email : req.body.email
  })

  console.log("Fetch User Data : ",userLogin);

  if(userLogin){

    bcrypt.compare(req.body.password,userLogin[0].password, async (err,result)=>{
      if(!err){
        res.cookie("userid",userLogin[0]._id.toString());
        res.cookie("name",userLogin[0].username);
        res.cookie("email",userLogin[0].email);
        res.cookie("contact",userLogin[0].contact);
        res.cookie("password",userLogin[0].password);
        res.redirect('/');
      }
      else{
        res.render('/login');
        res.send("Enter the password properly");
      }
    })
  }
  else{
    res.redirect('/login');
    res.send("Enter the Email properly");
    }
  



};

exports.logout = (req, res) => {
  res.clearCookie("userid");
  res.clearCookie("name");
  res.clearCookie("email");
  res.clearCookie("contact");
  res.redirect('/');
};


exports.profile = async (req,res) =>{

    const name = req.cookies.name;
    const email = req.cookies.email;
    const contact = req.cookies.contact;

    res.render('profile',{
      name : name,
      email :email,
      contact : contact
    });
};