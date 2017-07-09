var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
let Post = require('../models/post')

router.get('/request', (req, res) => {
    Post.find({'status': ''}).sort('-date').exec(function (err, reqsContent){
        if(err){
            return console.log(err)
        }
    
            res.render('requests/reqs', { page_name: 'reqs',
                                          reqsContent: reqsContent  
                                 });
    });
})

module.exports = router;