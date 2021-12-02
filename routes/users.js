const express = require('express');
const model = require('../models')
const verify = require('../verify');

const router = express.Router();

router.post('/', (req, res) => {

    let token_header = req.headers["authorization"];

    if (!token_header) {
        res.status(401).send()
    } else {
        let items = token_header.split(" ");
        let jwt = "";
        if (items.length == 2 & items[0] == "Bearer") {
            jwt = items[1];
        }
        if (jwt) {
            verify.verify(jwt).then(userid => {
                
                model.list('User').then(list => {
                    let found = false;
                    list.results.forEach(user => {
                        if (user.sub == userid) {
                            res.set('content-type', 'application/json')
                            req.session.authenticated = true;
                            req.session.user = user.sub;
                            res.status(201).json(req.session);
                            found = true;
                        }
                    })

                    if (!found) {
                        req.body.sub = userid;
                        req.body.posts = []
                        req.body.comments = []
                        req.body.liked = []
                        req.body.disliked = []
                        model.create('User', req.body).then(key => {
                            res.set('content-type', 'application/json')
                            req.session.authenticated = true;
                            req.session.user = req.body.sub;
                            res.status(201).json(req.session);
                        });
                    }
                })
            }).catch(() => {
                res.status(401).send();
            })
        }
    }
});

router.get('/', (req, res) => {
    model.userList('User').then(list => {
        let response = []

        list.results.forEach(item => {
            response.push({"id": item.sub})
        })
        res.status(200).json(response)
    })
    
})

module.exports = router;