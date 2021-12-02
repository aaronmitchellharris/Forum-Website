const express = require('express');
const cors = require('cors');
const posts = require('./routes/posts');
const categories = require('./routes/categories');
const users = require('./routes/users');
const oauth = require('./routes/oauth');
const path = require('path');
const session = require('express-session');
const store = new session.MemoryStore();
const app = express();

app.use(session({
    secret: 'asdfjkl',
    saveUninitialized: false,
    store
}));
app.use(cors());
app.use(express.static('build'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('trust proxy', true);

app.use('/posts', posts);
app.use('/categories', categories);
app.use('/users', users);
app.use('/oauth', oauth);

app.all('*', (req, res) => {
    res.sendFile(path.resolve('build', 'index.html'));
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});