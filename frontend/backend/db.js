let mongoose = require("mongoose");
function connectToMongo() {
    mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.3", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log("Connected to Mongo successfully"))
        .catch(err => console.log(err))
}
module.exports = connectToMongo