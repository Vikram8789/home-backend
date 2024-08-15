import express from "express";
const router=express.Router();
import {userDelete,userPut,userPost,userGet,userSingleGet,userLogin,userCurrent} from "../controllers/userController.js"
import { auth } from "../middleware/auth.js";

router.get("/",userGet);
router.post("/",userPost);
router.get("/:id",userSingleGet);
router.put("/:id",userPut);
router.delete("/:id",userDelete);
router.post("/login",userLogin);
router.post("/current",auth,userCurrent);




export default router;