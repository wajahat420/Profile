const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const Msg = require("./model")

app.use(express.static(__dirname + '/public'));

const url = "mongodb+srv://wajahat:node123@first.uba9r.mongodb.net/Profile?retryWrites=true&w=majority"
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
.then( () => {
    console.log('Connected to database ')
})
.catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/post",(req,res)=>{
    const msg = req.body.msg
    const name = req.body.name

    if(msg.length !== 0 && name.length !== 0){
        const data = new Msg({
            name: name,
            message : msg
        })
        console.log("if",name,msg)

        // console.log("req",msg)
        data.save()
          .then(user => console.log("successfully send",user))
          .catch(err => console.log("err", err))  
    }
    else{
        console.log("else",msg)
    }
})
const port = process.env.PORT || 5002
// form-control-submit-button
app.listen(port, () => console.log(`server running on port ${port}`))