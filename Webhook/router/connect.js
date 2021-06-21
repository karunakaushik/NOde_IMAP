const express = require('express');
const router = express.Router();


router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'Handling GET Request of server2 '
    });
});

router.post('/', (req, res, next)=>{
    res.status(200).json({
        message: 'Handling POST Request of server2'
    });
});

module.exports = router;