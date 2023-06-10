import './styles/App.scss';
import variables from './styles/variables.scss'
import localForage from "localforage";
import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import tomato from './img/tomato.svg'
import water from './img/water-outline.svg'
import todo from './img/todo.svg'
import quote from './img/quote.svg'
import sound from './img/sound.svg'
import Pomodoro from './components/Pomodoro.js'
import onboarding from './img/onboarding1.svg'
import logo from './img/logo/logo_transparent.png'
import Quote from './components/Quote.js'
import Todo from './components/Todo.js'
import Hydrate from './components/Hydrate.js'
import Sound from './components/Sound.js'

const Nav = ({name, clickEvent, clicked, img}) => {
  return (
    <>
    
    <li className="nav-list" onClick={clickEvent}><div className={clicked ? 'clicked' : 'not-clicked'}><img className="nav-icon" src={img}/><span >{name}</span></div></li>
    </>
  )
  }

  const Onboarding = () => {

    const [onboard, setonBoard] = useState(false)
    const [slideshow, setSlideShow] = useState(0)
    const sum = useRef(0)
    const openSlide = (click) => {
      if(slideshow >= 0) {
        sum.current = slideshow + click;
        setSlideShow(sum.current)
      }
      localForage.setItem('key', 'value').then(function () {
        return localForage.getItem('key');
      }).then(function (value) {
        // we got our value
      }).catch(function (err) {
        // we got an error
      });
    }
    if(onboard === false ) {
      return (
      <section className='onboarding-overlay'>
        <button className='next-btn' onClick={() => openSlide(1)}>Next</button>
        <button className={`prev-btn ${slideshow !== 0 ? 'active' : 'not-active'}`} onClick={() => openSlide(-1)}>Previous</button>
          <section className={`onboarding-1 ${slideshow === 0 ? 'active' : 'not-active'}`}>
            <div className='ob-title'>Welcome to Pockeity!</div>
            <img src={onboarding}/>
            <section className='ob-desc'>Pockeity is a productivity app, inspired by LifeAt, 
            that focused on reducing your productivity application clutters by providing all-in-one solution.</section>
            </section>

        <section className={`onboarding-2 ${slideshow === 1 ? 'active' : 'not-active'}`}>
          <div className='ob-title'>Widget</div>
          <section className='ob-desc'>Pockeity includes many widget such as pomodoro, to-do, and ambience sounds so you don't have to open multiple application. 
          Check out the widget using the navigation bar</section>
        </section>

        <section className={`onboarding-2 ${slideshow === 2 ? 'active' : 'not-active'}`}>
          <div className='ob-title'>Customization</div>
          <section className='ob-desc'>The application also provides customization to fit your productivity preference such as timer settings and a selection of radient background.</section>
        </section>
    
        <button onClick={() => setonBoard(true)}>Close</button>
      </section>
    )
    }
    
  }


  const Logo = () => {
    return(
      <header className='header'>
        <img src={logo}/>
        </header>
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
  animation: ${gradient} 15s ease infinite;
  position: relative; 
  `;
const App = () => {

  const [navBar, setNavBar] = useState([
    {
      name: 'Pomodoro', 
      id: 1, 
      clicked: false,
      icon: tomato
    }, 
    {
      name: 'To-do', 
      id: 2, 
      clicked: false,
      icon: todo
    }, 
    {
      name: 'Quote',
      id: 3, 
      clicked: false,
      icon: quote
    }, 
    {
      name: 'Hydrate',
      id: 4,
      clicked: false, 
      icon: water
    }, 
    {
      name: 'Sound', 
      id: 5,
      clicked: false,
      icon: sound
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
    <Onboarding/>
    <StyledMain $inputColor={userBG}>
      <Logo/>
      <nav>
      <Background open={openBG} set={setUserBG}/>
        <ul className="nav-bar">
          {navBar.map((option) => {
            return(
              <Nav name={option.name}
                key={option.id}
                clicked={option.clicked}
                img={option.icon}
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