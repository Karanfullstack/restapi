const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/restapi',).then(()=>{
    console.log("Data base is connected");
}).catch((err)=>{
    console.log(err);
});

// Schema for product -- @Start Point

const productSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number
});

const Product = new mongoose.model("Product", productSchema);

// ------- Schema has been Created -- @EndPoint...

// @CreatePoduct
app.post('/api/v1/product/new', async (req, res)=>{
    const product = await Product.create(req.body)

    res.status(201).json({
        sucess:true,
    });
});
  

// @readProducts

app.get('/api/v1/product',async (req, res)=>{
    const products = await Product.find();

    res.status(200).json({
        sucess:true,
        products,
    })
});


// @productUpdate 

app.put("/api/v1/product/:id", async (req, res)=>{
    let product = await Product.findById(req.params.id);

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true, useFindAndModify:false,runValidators:true,

    })
    res.status(200).json({
        success:true,
        product,
    });
})

// @productDelete

app.delete('/api/v1/product/:id', async (req, res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);

        if(!product)
        req.json(404)
        
        res.json({
            sucess:true,
            message:"product is deleted sucessfully",
        });

    } catch(err){
        res.json({sucess:false, message:"Page not found"});
    }
}) 

app.listen(4000,()=> console.log('Server is working'))


// crud..