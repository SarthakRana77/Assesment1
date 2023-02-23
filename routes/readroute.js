const express=require('express');
const router=express.Router();
const signupcontroller=require('../controller/readcontroller');
const sortcontroller=require('../controller/sortcontroller');
router.get('/',signupcontroller.getPage);

router.post('/display',signupcontroller.postBook);

router.post('/find',signupcontroller.postFind);

router.post('/sort',sortcontroller.sortPage);

router.post('/add',sortcontroller.addBM);

router.post('/thanks_success',sortcontroller.added);

module.exports=router;
