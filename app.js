const express= require("express");
const bodyParser = require;("body-parser");
const request=require("request");
const https=require("https");
const app= express();



app.use(express.static("public"))
app.use(express.urlencoded({extended:true}));
app.get("/" ,function(req,res){
  res.sendfile(__dirname + "/signup.html");
});
app.post("/",function(req,res){
 var firstName=req.body.fname;
 var lastName=req.body.lname;
 var email=req.body.email;
 var data = {
   members: [
     {
       email_address: email,
       status:"subscribed",
       merge_field: {
         FNAME: firstName,
         LNAME: lastName
       }
     }
   ]

 };
 var jasonData =JSON.stringify(data);
 const url="https://us20.api.mailchimp.com/3.0/lists/b67481a682";
 const options={
   method: "POST",
   auth: "chirag:69f43e091164599afb2553609ea4df9a-us20"
 }

const request=https.request(url, options, function(response){
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })

})
request.write(jasonData);
request.end();

});

app.listen(3000, function(){
  console.log("server........running")
});

//69f43e091164599afb2553609ea4df9a-us20
//b67481a682
