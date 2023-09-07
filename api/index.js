const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const connectDB = require('./database/conn');
const jwt = require('jsonwebtoken');
const app = express();
const port = 8080;
const cors = require('cors');

connectDB()

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.listen(port, '192.168.29.108', () => {
    console.log('Server Listening on 8080');
});


const User = require('./models/user');
const Order = require('./models/order');

//function to send verification Email to the User
const sendVerificationEmail = async (email, verificationToken) => {
    //create a nodemoller transporter
    const transporter = nodemailer.createTransport({
        //configure the email service or SMTP details here
        service: "gmail",
        auth: {
            user: "shubham.pixelvalues@gmail.com",
            pass: "ShubhamK@1234"
        },
    });
    //compose the email message
    const mailOptions = {
        from: "amazon.com",
        to: email,
        subject: "Email Veryfication",
        text: `Please click the following link to veryfy your email :http://localhost:8080/verify/${verificationToken}`,
    };
    //send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully");
    } catch (error) {
        console.log("Error sending verification email", error);
    }
}
//Register a new user
//endpoint to register in the app
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" })
        }
        //create a new User
        const newUser = new User({ name, email, password });
        //generate tooken
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");
        //save user Database
        await newUser.save();
        console.log("New Registration successfully", newUser);
        //send verification email to the user
        sendVerificationEmail(newUser.email, newUser.verificationToken)

        res.status(201).json({
            message: "Registration successful. Please your email for verification.",
        });
    } catch (error) {
        console.log("error registering user", error);
        res.status(500).json({ message: "Registration Failled" })
    }
})

//ending to verify the email
app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;
        //find the user with the verification token
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "Invalid verification token" })
        }
        //Mark the user as verified
        user.verified = true
        user.verificationToken = undefined
        await user.save();
        res.status(200).json({ message: "Email verified Successfully" })
    } catch (error) {
        res.status(500).json({ message: "Email Verification Failled" })
    }
})

const generateSecreteKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
}
const secretKey = generateSecreteKey();

//endpoint to login user!
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        //check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        //check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        //generate a token 
        const token = jwt.sign({ userId: user._id }, secretKey)
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({ error: "Login Failled" })
    }
})