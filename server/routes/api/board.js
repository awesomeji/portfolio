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


router.get('/list', (req, res) => { 
    Board.find()
        .then(posts => { 
            return res.status(200).json({
                success: true,
                posts: posts
            })
        })
        .catch((err) => { 
            return res.status(404).json({
                success: false,
                error: err
            })
        });
})

module.exports = router;