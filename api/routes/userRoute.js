import express from "express";
const router = express.Router();
import { test } from "../controllers/userController.js";

router.get('/test',test)


export default router