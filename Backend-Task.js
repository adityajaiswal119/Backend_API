const express = require("express");
const app = express();
app.use(express.json());
app.post('/signup',(req,res)=>{
    const {name,email} = req.body;
    users.push(name);
    user.push(email);
    res.json();
});

app.post('/login',(req,res)=>{
    const attempt = 0;
    const attempts = ()=>{
        if(user.req != user.res){
            attempt++;
            setTimeout(100000);
        }
    }
    if(attempt >4){
        res.json(429);
    };
    if(req.user == response.user){
        app.send('/home');
    }

});
