import {Router} from'express';
const router=Router();
const signupcontroller=require('../controller/readcontroller');

router.get('/',signupcontroller.getPage);

router.post('/displaydata',signupcontroller.postBook);

export default router;
