const express =require('express');
const router = express.Router();
const {Auth}=require('../controllers/isAuthenticated');
router.get('/',Auth,(req,res)=>{
    res.render('Dashboard')
})
module.exports = router;