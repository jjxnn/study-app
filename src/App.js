import './App.scss';
import React, { useState } from 'react'
import Pomodoro from './components/Pomodoro.js'
import Quote from './components/Quote.js'
import Todo from './components/Todo.js'
import { motion } from 'framer-motion'

const Test = ({name, clickEvent}) => {
  return (
    <>
    <li className="nav-list" onClick={clickEvent}>{name}</li>
    </>
  )
  }


const App = () => {
  const [pomodoro_cont, setPomodoro_cont] = useState(false)
  const [quote_cont, setQuote_cont] = useState(false)
  const [todo_cont, setTodo_cont] = useState(false)
  const navBar = [
    {
      name: 'Timer', 
      id: 1
    }, 
    {
      name: 'To-do', 
      id: 2, 
    }, 
    {
      name: 'Quote',
      id: 3
    }, 
    {
      name: 'Hydrate',
      id: 4
    }, 
    {
      name: 'Sound', 
      id: 5
    }
  ]
  const handleContainer = (curr_container) => {
    switch(curr_container) {
      case 1: 
      setPomodoro_cont(!pomodoro_cont)
      break;

      case 2: 
      setTodo_cont(!todo_cont)
      break;

      case 3: 
      setQuote_cont(!quote_cont)
      break; 

      default: 
        alert('Empty!')
    }

  }

  return (
    <motion.div dragConstraints={{
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}>
      <main>
    <nav>
      <ul className="nav-bar">
        {navBar.map((option) => {
          return(
            <Test name={option.name}
                  key={option.id}
                  clickEvent={() => handleContainer(option.id)}
            />
          )
        })}
      </ul>
    </nav>
    <Todo container={todo_cont}/>
    <Quote container={quote_cont}/>
    <Pomodoro container={pomodoro_cont}/>
</main>
    </motion.div>
    
    

  )
}


export default App