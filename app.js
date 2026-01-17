const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render(`index`);
});

app.post('/create', (req, res) => {
    let { username, email, password, age } = req.body;

    //CREATING SALT AND HASHING PASSWORD
    bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({
                username,
                email,
                password: hash,
                age
            });
            //SETTING JWT TOKEN
            //let token = jwt.sign({ email }, "secretkey");
            //SETTING COOKIE
            //res.cookie('token', token);

            res.send(createdUser);
        })
    })
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login', async function (req, res) {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send("Email or password is incorrect");
    }

    //CHECK FOR DEBUGGING console.log(user.password, req.body.password);

    //HERE WE COMPARE JWT TOKEN WITH USER ENTERED PASSWORD AND IF IT RETURNS TRUE WE MAKE LOGIN SUCCESSFULL
    //FOR EACH TIME HAVE AN EYE ON THE COOKIES, CAUSE FOR '/LOGOUT' IT SHOWS NO COOKIES BUT AFTER LOGIN WE CAN SEE THE COOKIES FOE EACH AND EVERY TIME AND ON ANY / ROUTE
    //WE CAN'T DIRECTLY RETURN NO EMAIL ID IS FOUND CAUSE ANYONE CAN DO ANY MALISIOUS ACTIVITY AFTER KNOWING THAT.
    //HENCE WE JUST SENDS AN ERROR MESSAGE INSTEAD OF SENDING THE ACTUAL ERROR


    bcrypt.compare(req.body.password, user.password, (err, result) => {
        console.log(result);
        if (result) {
            //SETTING JWT TOKEN
            let token = jwt.sign({email: user.email }, "secretkey");
            //SETTING COOKIE
            res.cookie('token', token);
            return res.send("Login successful");
        } else {
            return res.status(400).send("Email or password is incorrect");
        }
    })
});

app.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect('/');
});


app.listen(3000);