const express = require('express');
const app = express();
app.use(express.json());

let students = [];
let courses = [];
let enrollments = [];
let courseCapacity = {}; 
let enrolledCount = {}; 

app.post('/students', (req, res) => {
    const { name, id } = req.body;
    if (!name || !id) {
        return res.status(400).json({ error: "Student name and id are required." });
    }
    students.push({ id, name });
    res.json({ message: "Student created", student: { id, name } });
});

app.post('/courses', (req, res) => {
    const { name, id, capacity } = req.body;
    if (!name || !id || typeof capacity !== 'number') {
        return res.status(400).json({ error: "Course name, id, and capacity are required." });
    }
    courses.push({ id, name });
    courseCapacity[id] = capacity;
    enrolledCount[id] = 0;
    res.json({ message: "Course created", course: { id, name, capacity } });
});

app.post('/enroll', (req, res) => {
    const { studentId, courseId } = req.body;
    if (!studentId || !courseId) {
        return res.status(400).json({ error: "Student ID and Course ID are required." });
    }
    if (enrolledCount[courseId] >= courseCapacity[courseId]) {
        return res.json({ message: "Rejected - Course capacity full." });
    }
    // Check if already enrolled
    if (enrollments.some(e => e.studentId === studentId && e.courseId === courseId)) {
        return res.json({ message: "Student already enrolled in this course." });
    }
    enrollments.push({ studentId, courseId });
    enrolledCount[courseId]++;
    res.json({ message: "Enrolled successfully." });
});

app.get('/student/:id', (req, res) => {
    const { id } = req.params;
    const student = students.find(s => s.id === id);
    if (!student) {
        return res.status(404).json({ error: "Student not found." });
    }
    res.json(student);
});

app.get('/courses/:id/students', (req, res) => {
    const { id } = req.params;
    const enrolledStudents = enrollments
        .filter(e => e.courseId === id)
        .map(e => students.find(s => s.id === e.studentId));
    res.json(enrolledStudents);
});

app.delete('/unenroll', (req, res) => {
    const { studentId, courseId } = req.body;
    const index = enrollments.findIndex(e => e.studentId === studentId && e.courseId === courseId);
    if (index === -1) {
        return res.status(404).json({ error: "Enrollment not found." });
    }
    enrollments.splice(index, 1);
    enrolledCount[courseId]--;
    res.json({ message: "Unenrolled successfully." });
});

module.exports = app;
