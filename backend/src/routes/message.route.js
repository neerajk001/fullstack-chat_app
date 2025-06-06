import express from 'express';
import { protectedRoutes } from '../middleware/ProtectedRoute.js';
import { validateObjectId } from '../middleware/validateObjectId.js';
import { getUserForSidebar } from '../controllers/message.controller.js';
import { getMessages } from '../controllers/message.controller.js';
import { sendMessages } from '../controllers/message.controller.js';
const router = express.Router();



router.get('/user', protectedRoutes, getUserForSidebar);
router.get('/:id', protectedRoutes, validateObjectId, getMessages); // Add middleware
router.post('/send/:id', protectedRoutes, validateObjectId, sendMessages); // Add middleware

export default router;