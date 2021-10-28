const express = require('express');
const model = require('../models')

const router = express.Router();

const POST = 'post';

const createSelf = (req, id) => {
    return req.protocol + "://" + req.hostname + "/posts/" + id.toString();
};

router.post('/', (req, res) => {
    const body = req.body;
    body.created = new Date();
    body.likes = 0;
    body.dislikes = 0;
    body.comments = [];
    model.create(POST, req.body).then(key => {
        const id = parseInt(key.id);
        const data = {
            "id": id, 
            "title": body.title,
            "user": body.user,
            "category": body.category,
            "created": body.created,
            "tags": body.tags,
            "likes": body.likes,
            "dislikes": body.dislikes,
            "content": body.content,
            "comments": body.comments,
            "self": createSelf(req, id)
        };

        model.read('category', body.category).then(entity => {
            entity.posts.push({"id": id});
            model.update('category', body.category, entity).then(() => {
                res.status(201).json(data);
            })
        });
        
    });

});

router.get('/:post_id', (req, res) => {
    
    const id = parseInt(req.params.post_id, 10);
 
    model.read(POST, id).then((obj) => {
        if (obj == null) {
            res.status(404).send({"Error": "No post with this post_id exists"});
        } else {
            const data = {
                "id": id, 
                "title": obj.title,
                "user": obj.user,
                "category": obj.category,
                "created": obj.created,
                "tags": obj.tags,
                "likes": obj.likes,
                "dislikes": obj.dislikes,
                "content": obj.content,
                "self": createSelf(req, id)
            };

            res.status(200).json(data);
        }
    });
});

router.delete('/:post_id', (req, res) => {
    
    const id = parseInt(req.params.post_id, 10);

    model.read(POST, id).then(post => {

        if (post == null) {
            res.status(404).send({"Error": "No post with this post_id exists"});
        } else{
                   
            model.read('category', post.category).then(category => {
                for (var i = category.posts.length - 1; i >= 0; i -= 1) {
                    if (category.posts[i].id == id) {
                        category.posts.splice(i, 1);
                        break;
                    }
                }
                model.update('category', post.category, category);
            });

            model.delete(POST, id).then(() => {
                res.status(204).send();
            });
        }
    });
});

module.exports = router;