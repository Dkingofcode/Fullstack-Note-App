import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Note as NoteModel } from "./models/note";
import Note from "./components/Notes";
import styleUtils from "./styles/utils.module.css";
import styles from "./styles/NotesPage.module.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from './components/AddNoteDialog';
import { FaPlus } from "react-icons/fa";
import { Spinner } from "bootstrap";

function App() {
   const [notes, setNotes] = useState<NoteModel[]>([]);
   const [notesLoading, setNotesLoading] = useState(true);
   const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

   const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
   const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

   useEffect(() => {
    async function loadNotes(){
    try{
       setShowNotesLoadingError(false);
       setNotesLoading(true);
       const notes = await NotesApi.fetchNotes();
      setNotes(notes);
    } catch(error){
      console.error(error);
      //alert(error);
      setShowNotesLoadingError(true);
    } finally{
      setNotesLoading(false);
    }
  }
  loadNotes();
 }, []);

   async function deleteNote(note: NoteModel) {
    try{
       await NotesApi.deleteNote(note._id);
       setNotes(notes.filter(existingNote => existingNote._id !== note._id));
    }  catch (error) {
      console.error(error);
      alert(error);
    }
   }

   const NoteGrid =  
    <Row xs={1} md={2} xl={3} className={`g-4` ${styles.}}>
    {notes.map(note => (
      <Col key={note._id}>
      <Note note={note} className={styles.note} onDeleteNoteClicked={deleteNote} onNoteClicked={setNoteToEdit} />
      </Col>
      ))}
      </Row>
   

  return (
    <Container>
      <Button onClick={() => setShowAddNoteDialog(true)}>
        Add new note
      </Button>
       {notesLoading && <Spinner animation="border" variant="primary" />}
        {showNotesLoadingError && <p>Something went wrong. Please refresh the page.</p>}
        {!notesLoading && !showNotesLoadingError && 
        <>
        { 
          notes.length > 0 ? NoteGrid : <p>You don't have any notes yet</p>
        }
        </> 
        } 
        {showAddNoteDialog && 
          <AddNoteDialog onDismiss={() => setShowAddNoteDialog(false)} 
            onNoteSaved={(newNote) => {
              setNotes([...notes, newNote]);
              setShowAddNoteDialog(false);
            }} />
        }
        {noteToEdit && 
        <AddNoteDialog
         noteToEdit={noteToEdit}
         onDismiss={() => setNoteToEdit(null)}
         onNoteSaved={(updateNote) => {
           setNotes(notes.map(existingNote => existingNote._id === updateNote._id ? updateNote : existingNote));   
          setNoteToEdit(null);
          }}
         /> 
      }
    </Container>
  );
}

export default App;
