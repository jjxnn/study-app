import './App.scss';
import { useState } from 'react'
import Pomodoro from './components/Pomodoro.js'
import Quote from './components/Quote.js'
import Todo from './components/Todo.js'

const Test = ({name, clickEvent}) => {
  return (
    <><li onClick={clickEvent}>{name}</li></>
  )
}

const Hello = ({container}) => {
  if(container === true) {
    return <h1>Hello!</h1>
  }
}

const Test2 = ({container}) => {
  if(container === true) {
    return <h1>Hello 2  !</h1>
  }
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
      name: 'Todo', 
      id: 2, 
    }, 
    {
      name: 'Quote',
      id: 3
    }
  ]
  const handleContainer = (curr_container) => {
    switch(curr_container) {
      case 1: 
      setPomodoro_cont(!pomodoro_cont)
      break;

      case 2: 
      setQuote_cont(!quote_cont)
      break;

      case 3: 
      setTodo_cont(!todo_cont)
      break; 

      default: 
        alert('Invalid!')
    }

  }

  return (
    <>
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
    <Hello container={pomodoro_cont}/>
    <Test2 container={quote_cont}/>
    </>
    

  )
}


export default App