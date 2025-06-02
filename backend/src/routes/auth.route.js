import express  from 'express';
import { signin,logout,signup,updatProfile,checkAuth } from '../controllers/auth.controller.js';
import { protectedRoutes } from '../middleware/ProtectedRoute.js';

const router = express.Router();

 router.post('/signup',signup)

  router.post('/signin',signin)

  router.post('/logout',logout)

  router.put('/update-profile', protectedRoutes, updatProfile)
  
  router.get('/check', protectedRoutes, checkAuth)

export default router;