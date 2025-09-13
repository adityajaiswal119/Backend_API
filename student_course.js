const express = require('express');
const app = express();
app.use(express.json());
const capacity = [];
const data = [];
app.post('/students',(req,res)=>{
     const {student} = req.body;
     res.json("Create a new student");
});

app.post('/courses',(req,res)=>{
      capacity.push("This is new Course");
});


app.post('/enroll',(req,res)=>{
     const {id} = req.params;
     if(enrolledcount >= capacity){
        res.json("Rejected");
     }
     if(res){
        enrolledcount++;
     }
});

app.get('/student/:id/students',(req,res)=>{
    const {id} = req.params;
     const data = req.body.Student.name;
     res.json(data);
});


app.get('/courses/:id/students',(req,res)=>{
     const {id} = req.params;
     const list = req.body.id.course;
     res.json(list);
});


app.delete('/unenroll',(req,res)=>{
    const {id} = req.params;
    req.body.id.splice(course,4,,()=>{
      enrolledcount--;
    });
});

