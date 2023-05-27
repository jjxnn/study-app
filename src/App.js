import './App.scss';
import React, { useState } from 'react'
import Pomodoro from './components/Pomodoro.js'
import Quote from './components/Quote.js'
import Todo from './components/Todo.js'
import Hydrate from './components/Hydrate.js'
import Sound from './components/Sound.js'

const Nav = ({name, clickEvent}) => {
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

  const [navBar, setNavBar] = useState([
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
  ])


  // Will be cleaning this up later...
  const handleContainer = (curr_container) => {
    const newArray = navBar.map(nav => {
      if(nav.id === curr_container) {
        return {...nav, clicked: !nav.clicked}
      }
      return nav
    })
    setNavBar(newArray)
  }

  return (
    <>
    <main>
        <Logo/>
    <nav>
      <ul className="nav-bar">
        {navBar.map((option) => {
          return(
            <Nav name={option.name}
                  key={option.id}
                  clickEvent={() => handleContainer(option.id)}/>)})}
        <li className='nav-list'><button className='bg-button'></button></li>
      </ul>
    </nav>
    <Todo container={navBar[1].clicked}/>
    <Quote container={navBar[2].clicked}/>
    <Pomodoro container={navBar[0].clicked}/>
    <Hydrate container={navBar[3].clicked}/>
    <Sound container={navBar[4].clicked}/>
</main>
    </>
      
    

  )
}


export default App