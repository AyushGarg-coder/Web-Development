import express from 'express'
import bodyparser from 'body-parser'
import jwt from 'jsonwebtoken'
import cookieparser from 'cookie-parser'
import cors from 'cors'
import { Db, MongoClient, ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'

const app = express()
const saltRounds = 10;
app.use(bodyparser.urlencoded({ extended: false, limit: '10mb' }))
app.use(bodyparser.json({ limit: '10mb' }))

const corsOptions = {
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
    // Credential:true,
};

app.use(cors(corsOptions))

const dbName = 'blog-website'

const url = "mongodb://127.0.0.1:27017/"
const client = new MongoClient(url)

app.post('/signup', async function (req, res) {
    try {
        let { name, username, password } = req.body
        if (name != "" && username != "" && password != "") {
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                if (err) {
                    res.status(404).send('Internal Server error')
                }
                else {
                    await client.connect();
                    const db = client.db(dbName)
                    const collection = db.collection('user-data')
                    // console.log('database connected successfully')
                    let result = await collection.findOne({ username: username })
                    if (!result) {
                        await collection.insertOne({ name: name, username: username, password: hash })
                        // console.log('data saved successfully')
                        await client.close()
                        return res.status(200).send('signup successfull')
                    }
                    else {
                        console.log("User already Exist")
                        return res.status(400).json({ message: "User already exist" })
                    }
                }
            })
        }
        else {
            return res.status(400).send('Fields Cannot be empty')
        }
    }
    catch (e) {
        res.status(404).send('error connecting to database')
    }
    finally {
    }
})
// app.post('/login', async function (req, res) {
//     try {
//         let { username1, password1 } = req.body
//         console.log(username1)
//         console.log(password1)
//         if (username1 != "" && password1 != "") {
//             await client.connect()
//             const db = client.db(dbName)
//             const collection = db.collection('user-data')
//             let result = await collection.findOne({ username: username1 })
//             console.log(result)
//             let hash = result['password']
//             console.log(hash)
//             bcrypt.compare(password1, hash, function (err, result) {
//                 if (err) {
//                     console.error(err)
//                 }
//                 else if (result === true) {
//                     let token = jwt.sign({ username: username1 }, 'cat')
//                     console.log(token)
//                     res.cookie('auth_token', token, { httpOnly: true}, {sameSite: 'strict'}, {maxAge: 3600000 });
//                     console.log('Login Successful')
//                     res.redirect('http://localhost:3000')
//                 }

//             })
//         }
//     }
//     catch (err) {
//         console.error(err)
//     }
//     finally {
//         await client.close()
//         // res.redirect('http://localhost:3000/')
//     }
// })
app.post('/login', async (req, res) => {
    try {
        let { username1, password1 } = req.body;
        // console.log(username1, password1)
        if (username1 && password1) {
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection('user-data');
            let result = await collection.findOne({ username: username1 });
            if (result) {
                let hash = result.password;
                bcrypt.compare(password1, hash, (err, match) => {
                    if (err) {
                        res.status(500).send('Error comparing passwords');
                        return;
                    }
                    if (match) {
                        let token = jwt.sign({ username: username1 }, 'cat');
                        // res.cookie('auth_token', token, { httpOnly: true, sameSite: 'strict', maxAge: 3600000 });
                        res.status(200).json({ access_token: token, username: result.username, password: result.password, name: result.name });
                    } else {
                        res.status(401).json({ message: "Invalid username or password" });
                    }
                });
            } else {
                res.status(401).json({ message: "User not found" });
            }
        } else {
            res.status(400).send('Username and password are required');
        }
    } catch (e) {
        res.status(500).send('Database error' + e.me);
    } finally {
        await client.close();
    }
});
/////
app.post('/createpost', async function (req, res) {
    try {
        const { title, description, picture, username, categories } = req.body
        const createddate = new Date().toISOString()
        if (!title || !description || !picture || !username || !categories || !createddate) {
            return res.status(400).send('All fields are required');
        }
        else {
            await client.connect()
            const db = client.db(dbName)
            const collection = db.collection('post')
            await collection.insertOne({ title: title, description: description, picture: picture, categories: categories, createddate: createddate, username: username })
            res.status(200).send("Post Published Successfully")
        }
    }
    catch (err) {
        res.status(400).send("Cannot save post" + err.message)
    }
    finally {
        await client.close()
    }
})

app.get('/posts', async function (req, res) {
    try {
        let data
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('post');
        if (req.query.category && req.query.category != 'all') {
            const category = req.query.category
            data = await collection.find({ categories: category }).toArray();
        }
        else {
            data = await collection.find().toArray();
        }
        res.status(200).send(data)
    }
    catch (err) {
        res.status(500).json({ msg: err.message })
    }
    finally {
        await client.close()
    }
})

app.get('/getpost', async function (req, res) {
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('post');
        // console.log(req.query.id)
        let postid = req.query.id;
        let postidobj = ObjectId.createFromHexString(postid);
        let data = await collection.findOne({ _id: postidobj });
        // console.log(data)
        res.status(200).send(data)
    }
    catch (err) {
        res.status(500).json({ msg: err.message })
    }
    finally {
        await client.close()
    }
})

app.post('/updatepost', async function (req, res) {
    try {
        const { picture, title, categories, description } = req.body
        const updateddate = new Date().toISOString()
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('post');
        let id = req.query.id
        const filter = { _id: ObjectId.createFromHexString(id) };
        const updateDocument = {
            $set: {
                title: title,
                description: description,
                picture: picture,
                categories: categories,
                updateddate: updateddate
            },
        };
        await collection.updateOne(filter, updateDocument)
        res.status(200).send('Record Updated sucessfully')
    }
    catch (err) {
        res.status(500).json({ msg: err.message })
    }
    finally {
        await client.close()
    }
})

app.post('/deletepost', async function (req, res) {
    try {
        let id = req.query.id
        let idobj = ObjectId.createFromHexString(id)
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('post')
        await collection.deleteOne({ _id: idobj });
        res.status(200).send('Deletion Successfull');
    }
    catch (err) {
        res.status(400).send('Cannot Delete Data due to Server error')
    }
    finally {
        await client.close()
    }
})



app.post('/contact', async function (req, res) {
    try {
        let { name, email, message } = req.body
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('complain-data')
        await collection.insertOne({name:name,email:email,message:message})
        res.status(200).send('Complaint Registered Successfully')

    }
    catch (err) {
        return res.status(400).send('Data is Invalid')
    }
    finally{
        await client.close();
    }
})


app.get('/searchdata',async function(req,res){
    try{
        if(req.query.search && req.query.search !=""){
        let title=req.query.search
        await client.connect()
        const db=client.db(dbName)
        const collection=db.collection('post')
        let data=await collection.find({title:title}).toArray();
        res.status(200).send(data)
        }
        else{
            res.status(400).send('Invalid Data');
        }
    }
    catch(err){
        return res.status(404).send('No data found')
    }
    finally{
        await client.close()
    }
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Connected successfully to server')
})
