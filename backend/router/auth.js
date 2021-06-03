const jwt = require("jsonwebtoken");
const express = require('express');
const bcrypt = require("bcryptjs");

const router = express.Router();
const authenticate = require("../middleware/authenticate");


require('../db/conn');
const User = require('../models/user');

var passwordValidator = require('password-validator');
 
// Create a schema
var schema = new passwordValidator();
 
// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

router.get('/', (req, res) => {
    res.send("Hello from the router side");
});

// Using Promises Way 

// router.post('/signup', (req, res) => {
//     // console.log(req.body);
//     const { name, email, password } = req.body;
//     if (!name || !password || !email) {
//         return res.json({error:"plz fill the fields"})
//     }


//     User.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({error: "Email already exist"});
//             }



//             const user = new User({ name, email, password });

//             user.save().then(() => {
//                 res.status(201).json({ message: "data saved" })
//             }).catch(err => {
//                 res.status(500).json({ error: "failed to saved the data" });
//             });
//         }).catch((err) => {
//             console.log(err);
//     })

// });


router.get("/secret", authenticate, (req, res) => {
    console.log("Hello from the secret page");
    res.send(req.rootUser);
});


// Using Async Await Way 

router.post("/register", async (req, res) => {

    try {

        // we will get the data from react form 
        const { username, name, email, phone, password, cpassword } = req.body;

        // we will do validation 
        if (!username || !name || !email || !phone || !password || !cpassword) {
            console.log(`eroro from the backend ${name}  ${password}  ${email}`);
            return res.json({ error: "Plzz fill the data properly" });
        }

        // we need to check weather the user already exists or not 
        const userEmail = await User.findOne({ email: email });

        if (userEmail) {
            console.log("email is already exists");
            return res.status(409).json({ error: "Email alredy exists" });
        } else if (password != cpassword) {
            console.log("password are not matching ");
            return res.status(422).json({ error: "passwords are not matching" });
        } else if (!schema.validate(password)){
            console.log("Invalid Password ");
            return res.status(401).json({ error: "Invalid Password" });
        }
        else {
            // creating a new documents to be stored 
            const user = new User({ username, name, email, phone, password, cpassword });

            // saving the data to the database 
            const userRegister = await user.save();
            console.log(`${user} user Registered successfully`);

            // return userRegister;
            // res.status(201).render('sigin');
            res.status(201).json({ message: "User Registered successfully" });
        }
    } catch (error) {
        console.log(error);
    }
})


// creating a signin route 
router.post("/login", async (req, res) => {
    try {
       
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "INvalid Login Details" });
        }

        const userLogin = await User.findOne({ email: email });

        console.log(userLogin);

        if (userLogin) {


            // the first password is the user who enter while login and the 2nd arg is the password stored in our DB 
            const isMatch = await bcrypt.compare(password, userLogin.password);
            // console.log(isMatch);

          

            if (isMatch) {
              let token = await userLogin.generateAuthToken();

            // token = jwt.sign({ _id: userLogin._id }, process.env.SECRET_KEY);z`
            // console.log(token);

            // let verified = jwt.verify(token, process.env.SECRET_KEY);
            // console.log(verified);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 2592000000),
                httpOnly: true
            });
                res.json({ message: "user signin successfully" });
            } else {
                res.status(422).json({ error: "Invalid Login Details" });
            }

        } else {
            return res.status(404).json({ error: "INvalid Login Details" });
        }
    } catch (error) {
        console.log("our error " + error);
    }
})


router.get('/getUserDetails', authenticate, async (req, res) => {
    console.log(`my detals: ${req.rootUser} `);
    // console.log(req.rootUser.name)
    res.send(req.rootUser);
})


router.get("/logout", (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });

    //* we need to send the res atleast else with will not work
    res.status(200).send("hidfdfsdfds");
});


module.exports = router;