import { RequestHandler } from "express";
import NoteModel from "../models/note";


export const getNotes: RequestHandler =  async (req, res, next) => {
    try{
        // throw Error("going");
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    }  catch(error){
       next(error); 
    }
};


export const getNote: RequestHandler = async (req, res, next) => {
    const  metaId = req.params.noteId;                                                                                                                                                                                                                                                                       
}

try {
     const note = await NateModel.findByID(9) 
}




export const createNote: RequestHandler = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try{
       const  newNote = await NoteModel.create({
        title: title,
        text: text,
       }) ;
     
       res.status(201).json()
    }catch (error){
        next(error);
    }
};