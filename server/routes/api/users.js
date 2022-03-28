var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    console.log('router')
    res.send("패스포트 모듈 테스트");

});


module.exports = router;