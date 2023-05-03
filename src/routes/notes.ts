import express from "express";
import * as RoutesController from "../controllers/notes";


const router = express.Router();

router.get("/", RoutesController.getNotes);

export default router;


