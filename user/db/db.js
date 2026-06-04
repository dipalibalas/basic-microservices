const mongoose = require('mongoose');

function connect (){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("User Database connected...")
    }).catch((err)=>{
        console.log("Error ", err)
    })
}

module.exports = connect;