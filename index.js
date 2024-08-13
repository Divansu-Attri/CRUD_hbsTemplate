require("dotenv").config()

const express = require("express");
const app = express();
const hbs = require("hbs");
const ConnectDB = require("./DB");
const Employee = require("./Model/EmployeSchema")

app.set("view engine", "hbs");

app.use(express.static("./views/public"));
hbs.registerPartials("./views/partials");

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.get("/", async (req, res) => {
    try {
        const data = await Employee.find().sort({_id:-1})
        // console.log("Employee Data : ",data)
        res.render("index",{data:data});
    } catch (error) {
        console.log(error)
        res.render("index",{data:[]});
    }
});


app.get("/search", async (req, res) => {
    try {
        let search = req.query.search;
        const data = await Employee.find({
            $or:[
                {name:{$regex:`/*${search}/*`,$options:"i"}},
                {email:{$regex:`/*${search}/*`,$options:"i"}},
                {phone:{$regex:`/*${search}/*`,$options:"i"}},
                {designation:{$regex:`/*${search}/*`,$options:"i"}},
                {city:{$regex:`/*${search}/*`,$options:"i"}},
                {state:{$regex:`/*${search}/*`,$options:"i"}}
            ]
        }).sort({_id:-1})
        // console.log("Employee Data : ",data)
        res.render("index",{data:data});
    } catch (error) {
        console.log(error)
        console.log(error)
        res.render("index",{data:[]});
    }
});


app.get("/add", (req, res) => {
    res.render("add",{error:{},data:{}});
});

app.post("/add", async (req, res) => {
    try {
        var data = new Employee(req.body);
        await data.save()
        res.redirect("/");
    } catch (error) {
               // console.log(error)
               errorMessage = {}
               error.errors.name ? (errorMessage['name'] = error.errors.name.message) : ""
               error.errors.email ? (errorMessage['email'] = error.errors.email.message) : ""
               error.errors.phone ? (errorMessage['phone'] = error.errors.phone.message) : ""
               error.errors.designation ? (errorMessage['designation'] = error.errors.designation.message) : ""
               error.errors.salary ? (errorMessage['salary'] = error.errors.salary.message) : ""
               res.render("add", { errorMessage: errorMessage,data:data})
    }
});

app.get("/delete/:_id",async(req,res)=>{
    try {
        const data = await Employee.findOne({_id:req.params._id})
        await data.deleteOne()
        return res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})

app.get("/edit/:_id",async(req,res)=>{
    try {
        const data = await Employee.findOne({_id:req.params._id})
        // console.log(data)
        res.render("edit",{errorMessage:{},data:data})
    } catch (error) {
        console.log(error)
        alert(error)
    }
})

app.post("/edit/:_id",async(req,res)=>{
    try {
        var data = await Employee.findOne({ _id: req.params._id })
        data.name = req.body.name ?? data.name
        data.email = req.body.email ?? data.email
        data.phone = req.body.phone ?? data.phone
        data.designation = req.body.designation ?? data.designation
        data.salary = req.body.salary ?? data.salary
        data.city = req.body.city ?? data.city
        data.state = req.body.state ?? data.state
        await data.save()
        res.redirect("/")
    } catch (error) {
        console.log(error)
        errorMessage = {}
        error.errors.name ? (errorMessage['name'] = error.errors.name.message) : ""
        error.errors.email ? (errorMessage['email'] = error.errors.email.message) : ""
        error.errors.phone ? (errorMessage['phone'] = error.errors.phone.message) : ""
        error.errors.designation ? (errorMessage['designation'] = error.errors.designation.message) : ""
        error.errors.salary ? (errorMessage['salary'] = error.errors.salary.message) : ""
        res.render("edit", { errorMessage: errorMessage, data: data })
    }
})

ConnectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is Running at http://localhost:${PORT}`);
    });
});
