import express from "express";
import * as RoutesController from "../controllers/notes";


const router = express.Router();

router.get("/", RoutesController.getNotes);

router.get("/:noteId", RoutesController.getNote);

router.post("/", RoutesController.createNote)

router.patch("/:noteId", RoutesController.updateNote);

router.delete("/:noteId", RoutesController.deleteNote);
export default router;


