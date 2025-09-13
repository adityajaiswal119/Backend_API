const express = require('express');
const app = express();
const comment = [];
app.post('/posts',(req,res)=>{
     res.json("Create a new blog post");
});

app.get('/posts',(req,res)=>{
      const po = req.body.posts;
      res.json(po);
});


app.put('/posts/:id',(req,res)=>{
    const {id} = req.params;
     posts.id.content.push("Hey this is new Data");
    res.json("data has been send");
});

app.delete('/posts/:id',(req,res)=>{
     const {id} = req.params;
     posts.id.splice(post,n);
     posts.id.splice(comment,n);
});


app.post('/posts/:id/comments',(req,res)=>{
     comment.push("Hey this commment");
     res.json("comment send successfully");
});


app.get('/posts/:id/comments',(req,res)=>{
     const {id} = req.params;
     const list = req.body.id.comment;
     res.json(list);
});


app.delete('/posts/:id',(req,res)=>{
    const {id} = req.params;
    req.body.id.splice(comment,4);
});

