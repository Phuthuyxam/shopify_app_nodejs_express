const express = require('express');
const router = express.Router();

/* setting gena */
router.get('/',function(req,res){
    res.render('index', { title: 'Express' });
});
module.exports = router;