import { Modal, Form, Button } from "react-bootstrap";

interface  AddNoteDialogProps {
  onDismiss: () => void,  
}



const AddNoteDialog = ({onDismiss}: AddNoteDialogProps) => {
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
           Add Note 
        </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title"  
            />  
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Text</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Text" />
            </Form.Group>

          </Form>    
        </Modal.Body>  

        <Modal.Footer>
            <Button type="submit" form="addNotForm">
                Save
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default AddNoteDialog;