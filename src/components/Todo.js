import React, {useState} from 'react'
import trashbin from '../img/trashbin.svg'
import { motion } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid';

  const Note = ({input, handleInputChange, addNote}) => {
    return (
      <div className="test">
        <div><input placeholder="Enter a task" value={input} type="text" onChange={handleInputChange} className="input-box"/></div> 
        <div><button onClick={addNote} type="submit" className="add-btn"><span>+</span></button></div>
      </div>
      
    )
  }

  const List = ({input, deleteNote, crossNote}) => {
    return (
      <>
      {input.map((note => <div key={note.id} className="note-box">
        <input type="checkbox" className="check-box" onClick={() => crossNote(note)}/>
        <span contentEditable="true" suppressContentEditableWarning={true} className={note.checked === true ? "todo-text-crossed" : "todo-text"} spellCheck="false"> {note.value}</span>
        <button onClick={() => deleteNote(note)} className="del-btn"><img src={trashbin}/></button>
        </div>))}
      </>
      
    )
  }
  
  const Count = ({noteCount, completeNote}) => {
    return (
      <>
        <small className="note-tracker"> {completeNote} out of {noteCount} task completed</small>    
      </>
    )
  }

const Todo = ({container}) => {
  const [input, setInput] = useState('')
  const [countNote, setcountNote] = useState(0)
  const [completeNote, setcompleteNote] = useState(0)
  const [notes, setNotes] = useState([])
  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const addNote = (e) => {
    e.preventDefault()
      const noteObject = {
        value: input, 
        id: uuidv4(),
        checked: false
      }
      setNotes([...notes, noteObject])
      setcountNote(countNote + 1)
    setInput('')
  }


  const delNote = (note) => {
      const currentnote = note;
      // Return a new array that doesn't have the current note. 
      setNotes(notes.filter(note => note !== currentnote))
      setcountNote(countNote - 1)
      if(completeNote >= 1) {
        setcompleteNote(completeNote - 1)
      }
  }

 const crossNote = (currNote) => {
  let array = notes.map(crossNote => {
    if(crossNote.id === currNote.id) {
      return {...crossNote, checked: !crossNote.checked}
    }
    return crossNote
  })
  setNotes(array)
  if(currNote.checked === false) {
    setcompleteNote(completeNote + 1)
  } else {setcompleteNote(completeNote - 1)}
 }

  if(container === true) {
    return(
      <motion.div className="todo-container" drag dragConstraints={{ left: 0, top: 0, right: (window.innerWidth * 80) / 100, bottom: (window.innerHeight * 80) / 100}}>
        <div >
          <small className="mini-title">&#x270D; To-do List</small>
        <Note input={input} handleInputChange={handleInputChange} addNote={addNote}/>
        <List input={notes} deleteNote={delNote} crossNote={crossNote}/>
        <Count noteCount={countNote} completeNote={completeNote}/>
      </div>
      </motion.div>
        
    )
  }
    
}

export default Todo