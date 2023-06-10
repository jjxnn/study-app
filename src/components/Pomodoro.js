import React, {useEffect, useState, useRef, useCallback} from 'react'
import click from '../audio/click.mp3'
import { motion } from 'framer-motion'
import alarm from '../audio/alarms.mp3'

// Task: Optimize the code for Pomodoro.js 
const Display = ({minute, digit}) => {

  return (digit >= 10 ? <div className="clock-display">{minute}:{digit}</div> : <div className="clock-display">{minute}:0{digit}</div>)
}

const Timer = ({setTime, sbreak, lbreak, pomodoro, currTab}) => {

  return (
    <>
  <ul className="toggle-time">
    <li onClick={(e) => setTime(pomodoro, 1)} className={currTab === 1 ? "toggle" : "not-toggle"}>Pomodoro</li>
    <li onClick={(e) => setTime(sbreak, 2)} className={currTab === 2 ? "toggle" : "not-toggle"}>Short break</li>
    <li onClick={(e) => setTime(lbreak, 3)} className={currTab === 3 ? "toggle" : "not-toggle"}>Long break</li>
  </ul>
  </>
  )
}


  function Switchtab({currTab, minute, digit, seconds, sbreak, lbreak, pomodoro, setTime}) {
    let count = useRef(0);
    useEffect(() => {
      if (seconds === 0) {
        if(currTab === 1) {
          setTime(sbreak, 2)
          count.current = count.current + 1;
        } 
        if (currTab === 1 && count.current === 4) {setTime(lbreak, 3)}

        if (currTab === 2) {setTime(pomodoro, 1)} 
        
        if (currTab === 3) {
          count.current = 0;
          setTime(pomodoro, 1)
        }
      }
    }, [seconds === 0])
    
    return (<div className="clock-display"><Display minute={minute} digit={digit}/></div>)
  }

const Input = ({clicked, submit}) => {

  const [input, setInput] = useState({
    pomodoro: 1500,
    short_break: 300,
    long_break: 900
  })

  const handleInputChange = (e) => {
      setInput({
        ...input, [e.target.name] : e.target.value * 60, 
      })
  }

  if(clicked === true) {
    return (
    <>
    <form className="setting-form">
      <h2>Settings</h2>
      <h3>T I M E (minutes)</h3>
      <div>
        <label>Pomodoro</label>
        <input name="pomodoro" onChange={handleInputChange} type="number" placeholder="25" min="1" className='input'/></div>
      <div>
      <label>Short Break</label>
      <input name="short_break" onChange={handleInputChange} type="number" placeholder="5" min="1" className='input'/>
      </div>
      
      <div>
      <label>Long Break</label>
      <input name="long_break" onChange={handleInputChange} type="number" placeholder="15" min="1" className='input'/>
      </div>
      

      <button onClick={(e) => submit(e, input)} type="submit" className="apply-btn">Apply</button>
    </form>
    </>
    )
  }
}

const Pomodoro = ({container}) => {
  const [pomodoro, setPomodoro] = useState(1500)
  const [seconds, setSeconds] = useState(pomodoro)
  const [shortBreak, setshortBreak] = useState(300)
  const [longBreak, setlongBreak] = useState(900)
  const [clicked, setClicked] = useState(false) 
  const [clicked2, setClicked2] = useState(false)
  const [currTab, setcurrTab] = useState(1)

  //Set Time based on user input 
const clickAudio = new Audio(click)
const alarmAudio = new Audio(alarm)
const toggleTime = useCallback((time, tab) => {
    setSeconds(time)
    setcurrTab(tab)
    clickAudio.play()
  }, [])

  //Time Count down
  useEffect(() => {
    if(clicked === true && seconds > 0) {
       const interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1) 
    }, 1000)
    return () => clearInterval(interval)
    }
    if(seconds === 0 ) {
      alarmAudio.play()
  }
  }, [clicked, seconds])

  

  let minute = Math.floor(seconds / 60)
  let digit_second = seconds % 60



const clickStart = (e) => {
  if(!clicked) {
    e.target.textContent = "Pause"
  } else {e.target.textContent = "Start"}
  setClicked(!clicked)
  clickAudio.play()
}

const clickSettings = () => {
  clickAudio.play()
  setClicked2(!clicked2)
}

const submitValue = (e, input) => {
  e.preventDefault()
  // Fix this. 
  setPomodoro(input.pomodoro)
  setSeconds(input.pomodoro)
  setlongBreak(input.long_break)
  setshortBreak(input.short_break)
  setClicked2(!clicked2)
}
if(container === true) {
    return (
    <motion.div drag dragConstraints={{ left: 0, top: 0, right: (window.innerWidth * 80) / 100, bottom: (window.innerHeight * 40) / 100}} className="pom-motion">
    <div className="pomodoro-container">
      
       <div className="container">
    <Timer setTime={toggleTime} sbreak={shortBreak} lbreak={longBreak} pomodoro={pomodoro} currTab={currTab} />
    <Switchtab currTab={currTab} minute={minute} digit={digit_second} seconds={seconds} setTime={toggleTime} sbreak={shortBreak} lbreak={longBreak} pomodoro={pomodoro}/>
    </div>

    <div className="btn-container">
      <button onClick={clickStart} className="start-btn">Start</button>
    <button onClick={clickSettings} className="setting-btn"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="white" d="M18.5 4a1.5 1.5 0 0 0-3 0v.5H4a1.5 1.5 0 1 0 0 3h11.5V8a1.5 1.5 0 0 0 3 0v-.5H20a1.5 1.5 0 0 0 0-3h-1.5V4ZM4 10.5a1.5 1.5 0 0 0 0 3h1.5v.5a1.5 1.5 0 0 0 3 0v-.5H20a1.5 1.5 0 0 0 0-3H8.5V10a1.5 1.5 0 1 0-3 0v.5H4ZM2.5 18A1.5 1.5 0 0 1 4 16.5h11.5V16a1.5 1.5 0 0 1 3 0v.5H20a1.5 1.5 0 0 1 0 3h-1.5v.5a1.5 1.5 0 0 1-3 0v-.5H4A1.5 1.5 0 0 1 2.5 18Z"/></g></svg></button></div>
    </div>
    <Input clicked={clicked2} submit={submitValue}/>
    </motion.div>
    
   
  )
}
  
}

export default Pomodoro