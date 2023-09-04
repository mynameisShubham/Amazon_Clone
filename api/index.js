const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto')
const connectDB = require('./database/conn');
// const connectDB = require('./database/conn');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 8080;

connectDB()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.listen(port, () => {
    // console.log(`Server Listening on http://localhost:${port}`);
    console.log('Server Listening on 8080');
})


const User = require('./models/user');
const Order = require('./models/order');

//function to send verification Email to the User
const sendVerificationEmail = async (email, verificationToken) => {
    //create a nodemoller transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "shubham.pixelvalues@gmail.com",
            pass: ""
        }
    })
}
//compose email message

const mailOption = {
    from: "amazon.com",
    to: email,
    subject: "Email Veryfication",
    text: `Please click the following link to veryfy your email :http://localhost:8080/verify${verificationToken}`
}


//endpoint to register in the app


app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body
        const exitingUser = await User.findOne({ email });
        if (exitingUser) {
            return res.status(400).json({ message: "Email already registered" })
        }
        //create a new User
        const newUser = new User({ name, email, password });
        //generate tooken
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");
        //save user Database
        await newUser.save();
        //send verification email to the user
        sendVerificationEmail(newUser.email, newUser.verificationToken)
    } catch (error) {
        console.log("error registering user", error);
        res.status(500).json({ message: "Registration Failled" })
    }
})