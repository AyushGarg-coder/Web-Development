const express = require('express')
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var cookieParser = require('cookie-parser')
const saltRounds = 10;
const app = express()
app.set('view engine', 'ejs');
app.set('views', 'templates');
const { MongoClient } = require('mongodb');
const multer = require('multer')
// Connection URL
const url = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(url);
// Database Name
const dbName = 'mriirs';
let log = 0;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniquePrefix + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/uploads', express.static('uploads'));

app.get('/home', function (req, res) {
  if(log!=1){
    res.send('Please Login First')
  // res.render('home', { isAuthorized: false })
  }
  else
  {
    res.render('home',{isAuthorized:true})
  }
})

app.post('/home', upload.single('uploaded_file'), function (req, res) {
  async function main() {
    try {
      await client.connect();
      console.log('Connected successfully to server');
      const db = client.db(dbName);
      const collection = db.collection('complaints');
      // the following code examples can be pasted here...
      let result = await collection.insertOne({ email: a, name: b, location: c, message: d, img_path: e })
      return 'done.';
    } catch (e) {
      console.error(e);
    }
  }
  if (log === 1) {
    let a = req.body['user_email']
    let b = req.body['user_name']
    let c = req.body['user_location']
    let d = req.body['user_message']
    let e = req.file.path
    main()
      .then(console.log)
      .catch(console.error)
      .finally(() => client.close());
    res.render('home', { isAuthorized: true })
  }
  else {
    res.redirect('/login')
  }
})

//admin pannel
app.get('/admin', async (req, res) => {
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('complaints');
    const data = await collection.find().toArray();
    res.render(__dirname + '/templates/admin', { data: data });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

// signup page
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/templates/signup.html")
});

app.post('/', async function (req, res) {
  try {
    let email = req.body['user_email'].toLowerCase()
    let pass = req.body['user_pwd1']
    let confirm_pass = req.body['user_pwd2']
    if (pass != confirm_pass) {
      res.send('Password does not match')
      res.redirect('/')
      return;
    }
    await client.connect()
    let db = client.db(dbName)
    let collection = db.collection('user')
    let data = await collection.findOne({ email: email })
    if (data) {
      res.send("data exist already")
      // res.redirect("/login")
      client.close()
    }
    else {
      bcrypt.hash(pass, saltRounds, async function (err, hash) {
        await collection.insertOne({ email: email, password: hash })
        client.close()
      });
      res.redirect('/login')
    }
  }
  catch {
    res.send("Error fetching data")
  }
})

//login
app.get('/login', async function (req, res) {
  res.sendFile(__dirname + '/templates/login.html')
})
app.post('/login', async function (req, res) {
  let email = req.body['user_email'].toLowerCase()
  let pass = req.body['user_pwd']
  try {
    await client.connect()
    let db = client.db(dbName)
    let collection = db.collection('user')
    let result = await collection.findOne({ email: email })
    if (result) {
      bcrypt.compare(pass, result.password, function (err, result1) {
        var token = jwt.sign({ email: email }, 'cat');
        res.cookie("auth_token", token)
        if (result1) {
          console.log("Login Successful")
          res.render('home', { isAuthorized: true })
          log = 1
        }
        else {
          console.log('Password Does not match')
          res.redirect('/login')
        }
      })
    }
    else {
      console.log("user not found")
      res.redirect("/login")
    }
  }
  catch {
    console.log('unsuccessfull')
    res.redirect('/login')
  }
})
//logout
app.get('/logout', (req, res) => {
  log = 0;
  res.clearCookie('auth_token')
  res.redirect('/login')
})
// app.post('/validate',(req,res)=>{
  // res.session("OTP")
// })
app.listen(3000)
