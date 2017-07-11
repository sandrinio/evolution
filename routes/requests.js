var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
let Post = require('../models/post')

router.get('/request', (req, res) => {
    Post.find({'status': '' || 'Unsolved' || 'undefined'}).sort('-date').exec(function (err, reqsContent){
        if(err){
            return console.log(err)
        }
    
            res.render('requests/reqs', {
                                          page_name: 'reqs',
                                          reqsContent: reqsContent  
                                        });
    });
})

router.get('/request/:id/edit', function (req, res) {
   Post.findById(req.params.id, function (err, result) {
      if(err){
         req.flash('Error', err)
         console.log(err)
      }else{
         res.render('requests/edit', {
            result: result,
            page_name: 'reqs'
         })
      }
   })

});

router.put('/request/:id/edit', function (req, res) {
   Post.findByIdAndChange(req.params.id, req.body.nPost, function (err, result) {

   })
});

module.exports = router;