import express from 'express'
import { protectRoute } from '../middleware/auth_middleware.js';
import { getContactedUs,postContactedUs,updateContactedUsStatus } from '../controllers/contact_controllers.js';


const router=express.Router();

router.get('/getcontact',protectRoute,getContactedUs);
router.post('/postcontact',postContactedUs);
router.patch('/updatecontact/:id/status',protectRoute,updateContactedUsStatus);

export default router;