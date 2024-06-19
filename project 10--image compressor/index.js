// const express = require('express')
// const bodyParser = require('body-parser')
// const multer = require('multer')
// const sharp = require('sharp')
// const fs = require('fs')
// // const { dirname } = require('path')
// const app = express()

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//         const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, uniquePrefix + '-' + file.originalname)
//     }
// });

// app.use('/uploads', express.static('uploads'));

// app.use('/compress', express.static(__dirname + '/compress'))

// const upload = multer({ storage: storage });

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/templates/index.html');
// })
// app.post('/send', upload.single('uploaded_file'), function (req, res) {
//     // console.log(path)
//     const inputpath = req.file.path
//     const outpath = './compress/' + req.file.filename;
//     sharp(inputpath)
//         .resize(800)
//         .toFormat('jpeg', { quality: 80 })
//         .toFile(outpath, (err, info) => {
//             if (err) {
//                 console.error("Cannot compress file")
//                 return res.status(500).send("error compressing file")
//             }
//             fs.unlink(inputpath, (err) => {
//                 if (err) {
//                     console.error("error deleting original file")
//                 }
//             })
//             res.download(__dirname + '/' + outpath);
//         })
// })

// app.listen(3000)
const express=require('express')
const bodyparser=require('body-parser')
const multer=require('multer')
const fs=require('fs')
const sharp=require('sharp')
const { dirname } = require('path')
const app=express()

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use('/uploads',express.static('uploads'))
app.use('/compress',express.static(__dirname+'/compress'))

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        const uniquePrefix=Date.now()+'-'+Math.round(Math.random()*1E9);
        cb(null,uniquePrefix+file.originalname);
    }
});

const upload=multer({storage:storage});

app.get('/',function (req,res){
    res.sendFile(__dirname+"/templates/index.html")
})

app.post('/send',upload.single('uploaded_file'),function(req,res){
    const input_path=req.file.path;
    const output_path='./compress/'+req.file.filename;
    sharp(input_path)
    .resize(800)
    .toFormat('jpeg',{quality:80})
    .toFile(output_path,(err,info)=>{
        if(err){
            console.log("Error compressing file");
            return
        }
        res.download(output_path)
    })
})
app.listen(3000)
