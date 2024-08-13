const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Field is mendatory"]
    },
    email:{
        type:String,
        required:[true,"Email Field is mendatory"]
    },
    phone:{
        type:String,
        required:[true,"Phone Field is mendatory"]
    },
    designation:{
        type:String,
        required:[true,"Designation Field is mendatory"]
    },
    salary:{
        type:Number,
        required:[true,"Salary Field is mendatory"]
    },
    city:{
        type:String,
    },
    state:{
        type:String,
    }
})

const Employee = new mongoose.model("Employee",EmployeeSchema)

module.exports = Employee