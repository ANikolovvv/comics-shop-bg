const router=require('express').Router();
const homeController=require('../controllers/homeController');
const authController=require('../controllers/authController');
const dataController=require('../controllers/dataController');
const ownerController=require("../controllers/ownerDataController");
const adminController=require('../controllers/adminControler');


router.use('/api/',homeController);
router.use('/api/auth',authController);
router.use('/api/data',dataController);
router.use('/api/owner',ownerController);
router.use('/api/admin',adminController);


router.use('*',(req,res)=>{
    
})
module.exports=router