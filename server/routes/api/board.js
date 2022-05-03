var express = require('express');
var router = express.Router();

const { Board } = require('../../models/Board');

router.post('/write', (req, res) => { 
    const post = new Board(req.body);

    post.save((err, doc) => { 
        if (err) return res.json({ success: false, error: err });
        return res.status(200).json({
            success: true,
            postData: doc
        })
    })
})

module.exports = router;