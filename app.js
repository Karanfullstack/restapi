const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


app.use(bodyParser.urlencoded({extended:false}));

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/newapi').then(()=>{
    console.log("Databse is connected");
}).catch((err)=>{
    console.log(err);
});

// @Schema

const studentSchema = new mongoose.Schema({
    name:String,
    lastname:String,
    rollNo: Number
});
 
//@model

const Student = new mongoose.model('Student', studentSchema);

//@product-creating-api

app.post('/api/v1/student/new', async (req, res)=>{
    const student =  await Student.create(req.body);
    res.status(201).json({
        sucess:true,
        message:'Student is added',
    });
});

app.get('/api/v1/student/get', async (req, res)=>{
    const student = await Student.find();

    res.status(200).json({
        sucess:true,
    });
});


app.put('/api/v1/student/update/:id', async (req, res)=>{
    let student = await Student.findById(req.params.id);

    student = await Student.findByIdAndUpdate(req.params.id,req.body,{

        new:true,
        useFindAndModify:false,
        runValidators:true,
    });

    res.status(200).json({
        sucess:true,
        student,
    })
});


app.delete('/api/v1/student/delete/:id',async (req, res)=>{
    try{
        let student = await Student.findByIdAndDelete(req.params.id);
        res.status(201).json({
            suceess:true,
            message:'Product has been deleted sucessfully',
        })
    }
    catch(err){
        res.status(404).json({
            sucess:false,
            message:"page not found error"
        })
    }
});

app.listen(4000, ()=> console.log('Server is running on localhost:4000'))

// crud...