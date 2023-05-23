import './App.scss';
import React, { useState } from 'react'
import Pomodoro from './components/Pomodoro.js'
import Quote from './components/Quote.js'
import Todo from './components/Todo.js'
import Hydrate from './components/Hydrate.js'

const Test = ({name, clickEvent}) => {
  return (
    <>
    <li className="nav-list" onClick={clickEvent}>{name}</li>
    </>
  )
  }

  const Logo = () => {
    return(
      <header className='header'>Pockeity</header>
    )
  }

const App = () => {
  const [pomodoro_cont, setPomodoro_cont] = useState(false)
  const [quote_cont, setQuote_cont] = useState(false)
  const [todo_cont, setTodo_cont] = useState(false)
  const [water_cont, setWater_cont] = useState(false)
  const navBar = [
    {
      name: 'Pomodoro', 
      id: 1, 
      clicked: false,
    }, 
    {
      name: 'To-do', 
      id: 2, 
      clicked: false,
    }, 
    {
      name: 'Quote',
      id: 3, 
      clicked: false,
    }, 
    {
      name: 'Hydrate',
      id: 4,
      clicked: false, 
    }, 
    {
      name: 'Sound', 
      id: 5,
      clicked: false,
    }, 
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
      case 4:
      setWater_cont(!water_cont)
      break;
      default: 
        alert('In Construction!')
    }
  }

  return (
      <main>
        <Logo/>
    <nav>
      <ul className="nav-bar">
        {navBar.map((option) => {
          return(
            <Test name={option.name}
                  key={option.id}
                  clickEvent={() => handleContainer(option.id)}/>)
        })}
      </ul>
    </nav>
    <Todo container={todo_cont}/>
    <Quote container={quote_cont}/>
    <Pomodoro container={pomodoro_cont}/>
    <Hydrate container={water_cont}/>
</main>
    
    

  )
}


export default App