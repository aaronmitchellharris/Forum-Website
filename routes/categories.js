const express = require('express');
const model = require('../models')

const router = express.Router();

const CATEGORY = 'category';

const createSelf = (req, kind, id) => {
    return req.protocol + "://" + req.hostname + "/" + kind + "/" + id;
};

router.get('/', (req, res) => {
    const cursor = Object.keys(req.query).includes("cursor") ? req.query.cursor : null;
 
    model.list(CATEGORY, cursor).then(list => {
        const results = {
            "count": list.results.length,
            "results": list.results
        }

        if (list.cursor) {
            results.next = createNext(req, list.cursor);
        }

        results.results.forEach(category => {
            category.self = createSelf(req, '', category.name);
        });

        res.status(200).json(results);
    });


});

router.get('/:category/posts', (req, res) => {
    
    const id = req.params.category;
 
    model.read(CATEGORY, id).then(category => {

        if (category == null) {
            res.status(404).send({"Error": "No category with this name exists"});
        } else {
            const posts = category.posts;

            posts.forEach(post => {
                post.self = createSelf(req, 'posts', post.id);
            });

            res.status(200).json(posts);
        }
    });
});

module.exports = router;