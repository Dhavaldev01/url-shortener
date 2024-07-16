const express = require('express')
const {connectToMongoDB} = require('./connect.js')

const urlRoute = require('./routes/url.js')
// var bodyParser = require('body-parser')
const app = express();
const PORT = 3001;

connectToMongoDB('mongodb://localhost:27017/short-url', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}
).then(()=>{
    console.log("Conncet To MongoDB");
})

app.use(express.json());
app.use("/url" , urlRoute);
// app.use(bodyParser.json());


app.listen(PORT,()=> console.log(`Server Started at PORT : ${PORT}`))
