import express from 'express'
import { protectRoute } from '../middleware/auth_middleware.js';
import { getBookDemoRequests,postBookDemoRequests,updateBookDemoStatus } from '../controllers/demo_controllers.js';

const router=express.Router();

router.get('/getdemo',protectRoute,getBookDemoRequests);
router.post('/postdemo',postBookDemoRequests);
router.patch('/updatedemo/:id/status',protectRoute,updateBookDemoStatus);

export default router;