import './styles/App.scss';
import variables from './styles/variables.scss'
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
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

  const Background = ({open, set}) => {
    const [bg, setBg] = useState([
      {
        name: 'btn-1',
        id: 1,
        color: variables.bg_option1,
      },
      {
        name: 'btn-2',
        id: 2,
        color: variables.bg_option2,
      },
      {
        name: 'btn-3',
        id: 3,
        color: variables.bg_option3,
      },
      {
        name: 'btn-4',
        id: 4,
        color: variables.bg_option4,
      },
      {
        id: 5,
        color: variables.bg_option5,
      },
      {
        name: 'btn-6',
        id: 6,
        color: variables.bg_option6,
      },
    ])


    const pickColor = (color) => {
      set(color)
    }

    
    if(open === true) {
      return(
      <div className='btn-cont'>
     {bg.map((curr_bg => <button key={curr_bg.id} style={{background: curr_bg.color}} className='btn-option' onClick={() => pickColor(curr_bg.color)}></button>))}
      </div>
    )
    }
  }


const gradient = keyframes`
0% {
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}`;

const StyledMain = styled.main`
  background:${props => props.$inputColor};
  height: 100vh;
  background-size: 400% 400%;
  animation: ${gradient} 12s ease infinite;
  position: relative; `;
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

  const [openBG, setOpenBG] = useState(false)
  const [userBG, setUserBG] = useState(variables.bg_option1)

  const handleContainer = (curr_container) => {
    const newArray = navBar.map(nav => {
      if(nav.id === curr_container) {
        return {...nav, clicked: !nav.clicked}
      }
      return nav
    })
    setNavBar(newArray)
  }
  const openBackground = () => {setOpenBG(!openBG)}
 
  return (
    <>
    <StyledMain $inputColor={userBG}>
      <Logo/>
      <nav>
      <Background open={openBG} set={setUserBG}/>
        <ul className="nav-bar">
          {navBar.map((option) => {
            return(
              <Nav name={option.name}
                key={option.id}
                clickEvent={() => handleContainer(option.id)}/>)})}
          <li className='nav-list'><button className='bg-button' style={{background: userBG}} onClick={openBackground}></button></li>
          
        </ul>
        
      </nav>
    <Todo container={navBar[1].clicked}/>
    <Quote container={navBar[2].clicked}/>
    <Pomodoro container={navBar[0].clicked}/>
    <Hydrate container={navBar[3].clicked}/>
    <Sound container={navBar[4].clicked}/>
</StyledMain>
    </>
      
    

  )
}


export default App