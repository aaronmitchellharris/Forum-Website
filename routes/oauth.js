const express = require('express');
const model = require('../models');

const router = express.Router();

router.post('/', (req, res) => {
    model.create('State', req.body).then(key => {
        const data = {state: key.id};
        res.status(201).json(data);
    });

});

router.get('/:state', (req, res) => {

    const state = parseInt(req.params.state, 10);

    model.read('State', state).then(entity => {
        if (entity == null) {
            res.status(200).json({"exists": false});
        } else {
            res.status(200).json({"exists": true});
        };
    });
});

module.exports = router;