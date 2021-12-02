const express = require('express');
const model = require('../models')

const router = express.Router();

const createSelf = (req, id) => {
    return req.protocol + "://" + req.hostname + "/comments/" + id.toString();
};

router.post('/', (req, res) => {
    const body = req.body;
    body.created = new Date();
    model.create('Comment', req.body).then(key => {
        const id = parseInt(key.id);
        const data = {
            "id": id,
            "user": body.user,
            "parent": body.parent,
            "created": body.created,
            "content": body.content,
            "self": createSelf(req, id)
        };

        model.read('post', body.parent).then(entity => {
            entity.comments.push({"id": id});
            model.update('post', body.parent, entity).then(() => {
                res.status(201).json(data);
            })
        });
        
    });

});

router.get('/:comment_id', (req, res) => {
    
    const id = parseInt(req.params.comment_id, 10);
 
    model.read('Comment', id).then((obj) => {
        if (obj == null) {
            res.status(404).send({"Error": "No comment with this comment_id exists"});
        } else {
            const data = {
                "id": id, 
                "user": obj.user,
                "parent": obj.parent,
                "created": obj.created,
                "content": obj.content,
                "self": createSelf(req, id)
            };

            res.status(200).json(data);
        }
    });
});

router.delete('/:comment_id', (req, res) => {
    
    const id = parseInt(req.params.comment_id, 10);

    model.read('Comment', id).then(comment => {

        if (comment == null) {
            res.status(404).send({"Error": "No comment with this comment_id exists"});
        } else{
                   
            model.read('post', comment.parent).then(parent => {
                for (var i = parent.comments.length - 1; i >= 0; i -= 1) {
                    if (parent.comments[i].id == id) {
                        parent.comments.splice(i, 1);
                        break;
                    }
                }
                model.update('post', comment.parent, parent);
            });

            model.delete('Comment', id).then(() => {
                res.status(204).send();
            });
        }
    });
});

module.exports = router;