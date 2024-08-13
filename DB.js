const mongoose = require("mongoose")
const URI = "mongodb+srv://Attri:Divansu1234@clu-ster.cddjgd6.mongodb.net/crud_operation?retryWrites=true&w=majority&appName=clu-"
const ConnectDB = async() => {
    try {
        await mongoose.connect(URI)
        console.log("Connection Successfull to DB")
    } catch (error) {
        console.log(error)
        console.log("Database Connection Failed")
        process.exit(0)
    }
}

module.exports = ConnectDB