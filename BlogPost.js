const express = require('express');
const app = express();
app.use(express.json());


let posts = []; 

app.post('/posts', (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: "Content required" });

    const newPost = {
        id: posts.length + 1,
        content,
        comments: []
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const post = posts.find(p => p.id == id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (!content) return res.status(400).json({ error: "Content required" });

    post.content = content;
    res.json(post);
});

// Delete a blog post
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    const index = posts.findIndex(p => p.id == id);
    if (index === -1) return res.status(404).json({ error: "Post not found" });

    posts.splice(index, 1);
    res.json({ message: "Post deleted" });
});
app.post('/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    const post = posts.find(p => p.id == id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (!comment) return res.status(400).json({ error: "Comment required" });

    post.comments.push(comment);
    res.status(201).json({ message: "Comment added", comments: post.comments });
});

app.get('/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id == id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    res.json(post.comments);
});

app.delete('/posts/:id/comments/:commentIndex', (req, res) => {
    const { id, commentIndex } = req.params;
    const post = posts.find(p => p.id == id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const idx = parseInt(commentIndex, 10);
    if (isNaN(idx) || idx < 0 || idx >= post.comments.length) {
        return res.status(400).json({ error: "Invalid comment index" });
    }

    post.comments.splice(idx, 1);
    res.json({ message: "Comment deleted", comments: post.comments });
});

// Start the server (for testing, remove if using as a module)
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
