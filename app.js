const client = require("@mailchimp/mailchimp_marketing");
client.setConfig({
  apiKey: "c8f2cc56c1b66cf549f6aa8eef765db6-us8",
  server: "us8",
});
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});
// app.post('/', function(req, res){
//     const firstName=req.body.fname;
//     const lastName=req.body.lname;
//     const email=req.body.email;
//     console.log(firstName,lastName,email);
//     // const subscribingUser = {firstName: firstName, lastName: lastName, email: email}
// })
app.post('/', function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  console.log(firstName, lastName, email);

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };
  const run = async () => {
    const response = await client.lists.addListMember("b069657672", {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });
    console.log(response.status);
    // if (response.status === "subscribed") {
    //   res.send("Succesfully subscribing to our Newsletters");
    // } else {
    //   res.send("Subcribing failed, please try again");
    // }
    // console.log(response);
    res.sendFile(__dirname + "/success.html")
 console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
  }
  run().catch(e => res.sendFile(__dirname + "/failure.html"));
});
app.post("/failure", (req, res) => {
    res.redirect("/");
});
app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port 3000")
});
// API key = c8f2cc56c1b66cf549f6aa8eef765db6-us8
// List ID = b069657672
