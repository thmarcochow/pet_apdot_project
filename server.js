require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const Grid = require('gridfs-stream')

let gfs

const conn = mongoose.connection
conn.once("open", function(){
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection("photos")
})

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

//Router Settings
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use("/file", require('./routes/UploadRouter'))
app.use('/api', require('./routes/dogRouter'))

//Media routes
app.get('file/:filename', async (req, res) => {
    try{
        const file = await gfs.file.findOne({filename:req.params.filename});
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res)
    } catch(err) {
        res.send("not found");
    }
})

app.delete("/file/:filename", async (req, res) => {
    try{
        await gfs.files.deleteOne({filename: req.params.filename});
        res.send("Success")
    } catch(err) {
        console.log("An error occured.")
    }
})

// Connect to MongoDB
const URI = process.env.MONGO_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB already.')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
