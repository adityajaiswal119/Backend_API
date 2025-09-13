const express = require('express');
const app = express();

app.get('/product',(req,res)=>{
    products.filter((kp)=> kp.category && kp.maxprice && kp.minRating && kp.inStock);
    products.map((kd)=> sort(kd.priceAsc))
});

app.post('/cart/add/:productId',(req,res)=>{

});

app.get('/cart',(req,res)=>{
    
});