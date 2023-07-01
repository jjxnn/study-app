import React, {useEffect, useRef, useState} from 'react'
import trashbin from '../img/trashbin.svg'
import { motion, useReducedMotion } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid';
import '../styles/App.scss';
import localforage from 'localforage';


  const Note = ({input, handleInputChange, addNote}) => {
    return (
      < div className="tracker-container">
        <input placeholder="Enter a task" value={input} type="text" onChange={handleInputChange} className="input-box"/>
        <button onClick={addNote} type="submit" className="add-btn"><span>+</span></button>
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
  
  const Count = ({noteCount}) => {
    return (
      <>
        <div className="note-tracker"><span className='number'>{noteCount || 0}</span>  <span className='number-prog'>tasks left</span> </div>  
      </>
    )
  }

const Todo = ({container}) => {
  const [input, setInput] = useState('')
  const [count, setCount] = useState(0)
  const [notes, setNotes] = useState([])
  let tracker = count; 
  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  useEffect(() => {
    localforage.getItem('notes').then((value) => {
      if(value !== null) {
        setNotes(value)
      }
    })

    localforage.getItem('count').then((value) => {
      if(value !== null) {
        setCount(value)
      }
    })
  },[])
  const addNote = (e) => {
    e.preventDefault()
      const noteObject = {
        value: input, 
        id: uuidv4(),
        checked: false
      }
      tracker += 1; 
      setCount(tracker)
      setNotes([...notes, noteObject])
      localforage.setItem('notes', [...notes, noteObject])
      localforage.setItem('count', tracker)
    setInput('')
  }


  const delNote = (currNote) => {
      // Return a new array that doesn't have the current note. 
      let filterArr = notes.filter(note => note !== currNote)
      tracker -= 1; 
      setNotes(filterArr)
      setCount(tracker)
      localforage.setItem('notes', filterArr)
      localforage.setItem('count', tracker)
  }

 const crossNote = (currNote) => {
  let array = notes.map(crossNote => {
    if(crossNote.id === currNote.id) {
      return {...crossNote, checked: !crossNote.checked}
    }
    return crossNote
  })
  tracker -= 1; 
  localforage.setItem('notes', array)
  localforage.setItem('count', tracker)
  setCount(tracker)
  setNotes(array)

 }

  if(container === true) {
    return(
      <motion.div className="todo-container" drag dragConstraints={{ left: 0, top: 0, right: (window.innerWidth * 80) / 100, bottom: (window.innerHeight * 80) / 100}}>
        <div >
          <small className="mini-title">&#x270D; To-do List</small>
        <Note input={input} handleInputChange={handleInputChange} addNote={addNote}/>
        <List input={notes} deleteNote={delNote} crossNote={crossNote}/>
        <Count noteCount={count}/>
      </div>
      </motion.div>
        
    )
  }
    
}

export default Todo