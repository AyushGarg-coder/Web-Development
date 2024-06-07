const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', 'template');
let data_msg
const url = 'mongodb://localhost:27017/contact-db';

mongoose.connect(url)
  .then(() => {console.log('MongoDB connected')
    data_msg="MongoDB connected"
  })
  .catch(err => {console.error('Error connecting to MongoDB', err)
    data_msg=err
  });

const dataSchema = new mongoose.Schema({
  name:String,
  email: String,
  subject: String,
  message: String
});
//define a database model
const DataModel = mongoose.model('Data', dataSchema);

app.get('/', function (req, res) {
  res.render('index',{temp:null,cli:null});
});

app.post('/fetch_data', function (req, res) {
  const user_name=req.body.name;
  const msg = req.body.message;
  const sub = req.body.subject;
  const email = req.body.email;

  console.log("name ", user_name);
  console.log("email ", email);
  console.log("subject ", sub);
  console.log("message ", msg);

  // Create a new data object using the model
  const newData = new DataModel({
    name:user_name,
    email:email,
    subject: sub,
    message: msg
  });

  // Save the data to MongoDB
  newData.save()
    .then(() => {console.log('Data saved to MongoDB')
      data_msg='Data Saved to MongoDB';
    })
    .catch(err => {console.error('Error saving data to MongoDB', err)
      data_msg=err;
    });
    res.render('index',{temp:data_msg , cli:'class="alert alert-warning mt-4"'});

});
app.listen(3000);
