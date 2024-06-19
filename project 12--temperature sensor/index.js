const express = require('express')
const { MongoClient } = require('mongodb')
const bodyparser = require('body-parser')
const app = express()
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.set('view engine', 'ejs')
app.set('views', 'templates')
const dbName = 'mriirs'

const url = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(url)

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/templates/index.html')
})
app.post('/', async function (req, res) {
    try {
        const temp = req.body.input_temp
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('temperature')
        await collection.insertMany([{date:Date.now(),temperature: temp }])
        res.send('data added succesfully')
    }
    catch {
        console.log("Catch run cannot insert data")
    }
    finally {      
        await client.close()
    }
})

app.get('/graph', async function (req, res) {
    // res.render('chart',{data:null})
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('temperature');
        const result = await collection.find().toArray();
        console.log(result)
        const date = result.map(data => data.date)
        const temperatures = result.map(entry => entry.temperature);
        const temperature = temperatures.map(Number)
        console.log(date)
        console.log(temperature)
        res.render('chart', { data1: date, data: temperature })
    } catch (error) {
        console.error("Error fetching temperature data:", error);
        // res.status(500).send("Internal Server Error");
    }
    finally {
        await client.close()
    }
});

app.listen(3000)