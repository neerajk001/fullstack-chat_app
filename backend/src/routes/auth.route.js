import express  from 'express';

const router = express.Router();

 router.get('/signup',(req,res)=>{
    res.send("signup route")
 })

  router.get('/signin',(req,res)=>{
    res.send("signin route")
 })

  router.get('/logout',(req,res)=>{
    res.send("logout route")
 })

export default router;