const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors')

//Routers
const routerList = require('./router')


const app = express();
const PORT = config.get('serverPort') || 5030

app.use(express.json())
app.use(cors())
app.use(routerList)









const start = async ()=> {
    try {
        await mongoose.connect(config.get("MONGODB_URI"))

        app.listen(PORT, () => {
            console.log(`Server ${PORT}  portda ishga tushdi`);
        })
    } catch(e) {
        console.log(e)
    }
}

start()


// mongodb+srv://darxon:123@cluster0.z0fgypv.mongodb.net/?retryWrites=true&w=majority