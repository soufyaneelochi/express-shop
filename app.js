const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

//routes
app.get('/', (req, res) => {
    res.send('Hello, World !');
});

app.get('/articles', async (req, res) => {
    try {
        const articles = await Article.find();
        res.render('articles', { articles });
    } catch (err) {
        console.log(err);
        res.send('Error retrieving articles');
    }
});

app.get('/articles/add', (req, res) => {
    res.render('add-article');
});

app.post('/article', async (req, res) => {
    try {
    const { designation, stock, prix } = req.body;
    const article = new Article({ designation, stock, prix });
        await article.save();
        res.redirect('/articles');
    } catch (err) {
        console.log(err);
        res.send('Error adding article');
    }
});

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

// Create a schema for the article collection
const articleSchema = new mongoose.Schema({
    designation: String,
    stock: Number,
    prix: Number
});

const Article = mongoose.model('Article', articleSchema);

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.listen(3000, () => console.log('Server started on port 3000'));