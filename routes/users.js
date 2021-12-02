const express = require('express');
const passport = require('passport');
const model = require('../models')

const router = express.Router();

const check = async (username, password) => {
    return model.list('User').then(users => {
        for (let i = 0; i < users.results.length; i++) {
            if (users.results[i].username == username) {
                if (checkPass(users.results[i], password)) {
                    return users.results[i].id;
                }
            }
        }
        return false;
    })
}

const checkPass = (user, password) => {
    if (user.password == password) {
        return true;
    }
    return false;
}

router.post('/', (req, res) => {

    req.body.comments = [];
    req.body.disliked = {};
    req.body.liked = {};
    req.body.posts = [];
    model.create('User', req.body).then(key => {
        const id = parseInt(key.id);
        res.status(201).send({"id": id});
    })

});

router.post('/login', (req, res) => {
    check(req.body.username, req.body.password).then(auth => {
        if (auth) {
            res.status(200).send({"auth": true, "id": auth});
        } else {
            res.status(200).send({"auth": false, "id": null});
        }
    })
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    model.update('User', id, req.body).then(user => {
        res.status(201).json(user);
    })
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    model.read('User', id).then(user => {
        res.status(201).json(user);
    })
});

module.exports = router;