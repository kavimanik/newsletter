const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const app = express();
const https = require("https");
require('dotenv').config()

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req, res){
  const firstName = req.body.top;
  const lastName = req.body.middle;
  const email = req.body.bottom;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);

  const url = 'https://us17.api.mailchimp.com/3.0/lists/4747a767a5';

  const options = {
    method: "POST",
    auth: 'kavi1:28be9ffc6283eef82974c1c5ecbb5911-us17'

  }

  const request = https.request(url, options, function(response){

      if (response.statusCode === 200){
          res.sendFile(__dirname + "/success.html");
      } else{
          res.sendFile(__dirname + "/failure.html");
      }

      response.on("data",function(data){
        console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
});



//list id
//4747a767a5
