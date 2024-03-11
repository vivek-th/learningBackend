const express = require("express");
const app = express();
const PORT = 8000;
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");
const { stringify } = require("querystring");

//decoding the json file
app.use(express.urlencoded({ extended: false }));

//connection with mongoose
mongoose
    .connect("mongodb://127.0.0.1:27017/myapp")
    .then(() => console.log("mongodb is connected successfully"))
    .catch((err) => console.log("MongoError", err));


//defining the schema
const userschema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
},
    { timestamps: true });

//now defining the model
const myuser = mongoose.model("user", userschema);


//now all in myuser using body

app.post("/api/users", async (req, res) => {
    const body = req.body;
    if (!body.email) return res.status(406).json({ msg: "Email is required" });

    try {
        const result = await myuser.create({
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
        });
        console.log("result", result);
        return res.status(201).json({ msg: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});





//send all the users in json format
// app.get("/api/users", (req, res) => {
//     res.setHeader("X-name", "vivuboy");
//     return res.json(users);
// });


//send via server side rendering
app.get("/users", async (req, res) => {

    //only this function is added in the case of mongo not json
    const dbUsers = await myuser.find({});

    const html = `
    <ul>
        ${dbUsers.map((dbUsers) => `<li>${dbUsers.firstname}-${dbUsers.email}</li>`).join("")}
    </ul>
    `;
    return res.send(html);
});

//send all users in json by reading from mongoDB
app.get("/api/users", async (req, res) => {
    const dbUsers = await myuser.find({});
    res.setHeader("X-name", "vivuboy");
    return res.json(dbUsers);
});


//send details of a particular user from json

// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// });

// .................................................................

//find details by id from mongo
app.get("/api/users/:id", async (req, res) => {
    // const id = Number(req.params.id);
    const user = await myuser.findById(req.params.id);
    // const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).json({ er: "user not found" });
        return res.json(user);
});

//sending the post request to add a user

// app.post("/api/users", (req, res) => {
//   const body = req.body;
//   if (!body.email) return res.status(406).json({ msg: "send email too" });
//   users.push({ ...body, id: users.length + 1 });
//   console.log("Body", body);
//   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, res) => {
//     return res.status(400);
//   });
// });

app.listen(PORT, console.log(`server is started at port ${PORT}`));
