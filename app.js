const express=require("express");

const app=express();
const body=require("body-parser");
const https=require("https");
app.use(express.static("public"))
app.use(body.urlencoded({extended: true}));
app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
  var firstName=req.body.first;
  var lastName=req.body.last;
  var email=req.body.email;
  var data_sub={
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
  const jsonData = JSON.stringify(data_sub);
  const url="https://us10.api.mailchimp.com/3.0/lists/43197f752b";
  // 43197f752b
  const options={
    method: "POST",
    auth: "riyanshi:815d6f3461f05e89539f94ecf573ab35-us10"
};
  const request1 = https.request(url, options, function(response){
    if  (response.statusCode===200){
      res.sendFile(__dirname + "/success.html");
    }
    else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
  request1.write(jsonData);
  request1.end();
});

app.post("/failure", function(req,res){
  res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
  console.log("Server on");
});
