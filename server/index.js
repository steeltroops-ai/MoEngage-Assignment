require("dotenv").config();

// console.log('Access Token Secret:', process.env.ACCESS_TOKEN_SECRET);

const config = require("./config.json");
const mongoose = require("mongoose");

//connect to database
mongoose.connect(config.connectionstring, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB...", err));

const User = require("./model/User.model");

const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities/utilities");

app.use(express.json());

app.use(cors({
    origin: "*",
}));

app.get("/", (req, res) => {
    res.json({ data: "Hello world" });
});

// Create Account
app.post("/create_account", async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname) {
        return res.status(400).json({ error: true, message: "Full Name is required" });
    }

    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ error: true, message: "Password is required" });
    }

    const isUser = await User.findOne({ email: email });

    if (isUser) {
        return res.json({
            error: true,
            message: "User already exists",
        });
    }

    const user = new User({
        fullname,
        email,
        password,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful",
    });
});

// login
app.post("/login", async(req,res) => {
    const {email , password} = req.body;

    if(!email){
        return res.status(400).json({message : "email is required"});
    }
    if(!password){
        return res.status(400).json({message: "password is required"});
    }

    const userInfo = await User.findOne({email: email});

    if(!userInfo){
        return res.status(400).json({message: "user not found"});
    }

    if(userInfo.email == email && userInfo.password == password){
        const user = {user : userInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });

        return res.json({
            error: false,
            message: "Login Successfully",
            email,
            accessToken,
        });
    }else{
        return res.status(400).json({
            error: true,
            message: "Invalid Credentails",
        })
    }
})

//Get User
app.get("/get-user", authenticateToken, async (req, res) => {

    const { user } = req.user;

    const isUser = await User.findOne({_id: user._id});

    if(!isUser){
        return res.sendStatus(401);
    }
    return res.json({
        user: isUser,
        message: "",
    });
    
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

module.exports = app;
