const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
const url = 'mongodb://localhost:27017/';
const database = "ASHTRA";
const users = require("./routes/api/users");

mongoose.connect('mongodb://localhost:27017/',{
    dbName: 'ASHTRA',
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, err => err ? console.log(err) :
    console.log('Connected to Database '));

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        // value: null,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('customers',UserSchema);
User.createIndexes();

const express = require('express');
const app = express();
const cors = require("cors");
console.log("App Listen at port 5000 ");
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/",(req,resp) => {
    resp.send("App is Working");
});
app.post('/register', function (req,resp) {
    try {
        const user = new User(req.body);
        let result = user.save();

        if (result) {
        } else {
            return resp.send({ "error": "User already register."});
        }
    } catch (e) {
        console.log(e);
        return resp.send({ "error": "Something  Went Wrong."});
    }
});

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    price: {
        type: Number,
        required: true,
    },
    qty : {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Product  = mongoose.model('products',ProductSchema);
Product.createIndexes();

app.post('/add', function (req,resp) {
    try {
        const product = new Product(req.body);
        let result = product.save();

        if (result) {
            return resp.send({"result": "Product registered."});
        } else {
            return resp.send({ "error": "User already register."});
        }
    } catch (e) {
        console.log(e);
        return resp.send({ "error": "Something  Went Wrong."});
    }
});


const FAQSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});


const Faq  = mongoose.model('Faq',FAQSchema);
Faq.createIndexes();

app.post('/contact', function (req,resp) {
    try {
        //const faq = new Faq(req.body);
        const details = new Faq({
            name:req.body.name,
            email:req.body.email,
            message:req.body.message,
        });
        //console.log(details);
        let result = details.save();
        //console.log("g");
        if (result) {
            console.log("success");
            resp.send({"result": "Message Sent.."});
        } else {
             resp.send({ "error": "User already register."});
        }
    } catch (e) {
        console.log(e);
        return resp.send({ "error": "Something  Went Wrong."});
    }
});

const SalesSchema = new mongoose.Schema({
    date: {
        type: Date,
    },
    name: {
        type: String,
        // value: null,
        required: true,
    },
    sprice: {
        type: Number,
        required: true,
    },
});


const Sales  = mongoose.model('Sales',SalesSchema);
Sales.createIndexes();

app.post('/sales', function (req,resp) {
    try {
        //const faq = new Faq(req.body);
        const details = new Sales({
            date:req.body.date,
            name:req.body.name,
            sprice:req.body.sprice,
        });
        //console.log(details);
        let result = details.save();
        //console.log("g");
        if (result) {
            //console.log("success");
            resp.send({"result": "Message Sent.."});
        } else {
             resp.send({ "error": "User already register."});
        }
    } catch (e) {
        console.log(e);
        return resp.send({ "error": "Something  Went Wrong."});
    }
});



const AdminSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Admin  = mongoose.model('Admin',AdminSchema);
Admin.createIndexes();


const LoginSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
});

const Login = mongoose.model('Login',LoginSchema);
Login.createIndexes();

app.post('/logins', function (req,resp) {
    try {
        //const faq = new Faq(req.body);
        const details = new Login({
            email:req.body.email,
            password:req.body.password,
        });
        //console.log(details);
        let result = details.save();
        //console.log("g");
        if (result) {
            //console.log("success");
            resp.send({"result": "Loading"});
        } else {
             resp.send({ "error": "User already register."});
        }
    } catch (e) {
        console.log(e);
        return resp.send({ "error": "Something  Went Wrong."});
    } 
});



app.get('/product',(req,res) => {
    MongoClient.connect(url).then((client) => {
        const connect = client.db(database);
        const collection = connect.collection("products");
        collection.find({}).toArray().then((ans) => {
            res.send(ans);
            //console.log(ans);
        });
    }).catch((err) => {
        console.log(err.Message);
    });
})

app.get('/customer',(req,res) => {
    MongoClient.connect(url).then((client) => {
        const connect = client.db(database);
        const collection = connect.collection("customers");
        collection.find({}).toArray().then((ans) => {
            res.send(ans);
            //console.log(ans);
        });
    }).catch((err) => {
        console.log(err.Message);
    });
})

app.get('/faq',(req,res) => {
    MongoClient.connect(url).then((client) => {
        const connect = client.db(database);
        const collection = connect.collection("faqs");
        collection.find({}).toArray().then((ans) => {
            res.send(ans);
            //console.log(ans);
        });
    }).catch((err) => {
        console.log(err.Message);
    });
})


app.get('/view',(req,res) => {
    MongoClient.connect(url).then((client) => {
        const connect = client.db(database);
        const collection = connect.collection("sales");
        collection.find({}).toArray().then((ans) => {
            res.send(ans);
            //console.log(ans);
        });
    }).catch((err) => {
        console.log(err.Message);
    });
})

const jwt = require("jsonwebtoken");


const validateLoginInput = require("./validation/login");


app.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      if(password == user.password) {
        if (true) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
        // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      }
    });
});

app.listen(5000);