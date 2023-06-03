import React, { useState, useEffect} from 'react'
import click from '../audio/click.mp3'
import { motion } from 'framer-motion'
import '../styles/App.scss';
// 
const Tracker = ({unit, clicked, intake, goal}) => {         
    return(
        <div className='tracker-container'>
            <div className="progress-bar">{intake} / {goal} {unit}</div>
            <button className="add-btn" onClick={() => clicked(3)}><span>+</span></button>
        </div>
    )
}

// 
const Timer = ({timer}) => {
    let minute = Math.floor(timer / 60)
    let digit_second = timer % 60
    return(digit_second >= 10 ? <div className="clock-display">{minute}:{digit_second}</div> : <div className="clock-display">{minute}:0{digit_second}</div>)
}

// 
const Settings = ({clicked, unitSelect, unit, userInput, setSettings, timer}) => {
    if(clicked === true) {
        return(
        <form className="user-other-settings">
            <div>
              <label>Water Unit</label>
            <select onChange={unitSelect} className='input'>{unit.map((units, index) => <option key={index} className='input'>{units}</option>)}</select>   
            </div>
           
            <div>
             <label>Set Time (minutes)</label>
            <input type="number" name="time" value={timer} min="1" onChange={userInput} className='input'/>   
            </div>
            

            <div>
              <label>Sound Volume</label>
            <input type="range" min="1" max="100" onChange={userInput} className='slider'/>  
            </div>
            

            <button className='apply-btn' onClick={setSettings}>Apply</button>
        </form>  
    )
    }
}

// 
const WaterSettings = ({clicked, userInput, setWater, unit, goal}) => {
    if(clicked === true ) {
       return(
        <form className="user-water-settings"> 
            <label>Set Water Goal ({unit})</label>
            <input type="number" name="goal" min="1" placeholder={goal} onChange={userInput}/>

            <div className={goal <= 0 ? "not-active" : "active"}>
                <label>Set Intake ({unit})</label>
                <input type="number" name="intake" min="1" onChange={userInput}/>  
            </div>

            <button onClick={setWater} className="apply-btn">Apply</button>
        </form>
    ) 
    }
}
// 
const Hydrate = ({container}) => {
    //Timer and Volume settings 
    const [timer, setTimer] = useState(3600)

    //All the input rfom user 
    const [input, setInput] = useState({goal: 0, intake: 0, time: 60})

    //User Water Intake Settings 
    const [goal, setGoal] = useState(0)
    const [intake, setIntake] = useState(0)
    
    // User Unit Settings 
    const [userUnit, setUserUnit] = useState('fl. oz')
    const unit = ['fl. oz', 'mL'] 
    const [waterUnit, setWaterUnit] = useState(userUnit)

    //Button Management 
    const [buttons, setButtons] = useState([
    {id: 1, name: 'start_btn', open: false},
    {id: 2, name: 'setting-btn', open: false},
    {id: 3, name: 'tracker-btn', open: false},])
    
    // Handle buttons - Append the new map array into buttons useState based on the id passed by the onClick events.
    const clickAudio = new Audio(click) 
    function handleTab(id) {
        const newArray = buttons.map(btn => {
            if(btn.id === id) {
                return {...btn, open: !btn.open}
            }
            return btn
        })
        clickAudio.play()
        setButtons(newArray)
    }
    
    // Time Interval - Count down dependencies of open.start and timer value 
    useEffect(() => {
        if(buttons[0].open === true && timer > 0) {
           const interval = setInterval(() => {
            setTimer((seconds) => seconds - 1) 
        }, 1000)
        return () => clearInterval(interval)
        }
        
      }, [buttons[0].open, timer])


    const handleInputChange = (e) => {
        setInput({
          ...input, [e.target.name] : e.target.value,})
    }

    const setWater = (e) => {
        e.preventDefault()
        
         if(intake + parseInt(input.intake) <= goal) {
            setIntake(intake + parseInt(input.intake))
         }
        setGoal(input.goal)
    }

    const unitSelect = (e) => {
         setUserUnit(e.target.value)
    }

    const setSetting = (e) => {
        e.preventDefault()
        setTimer(input.time * 60)
        setWaterUnit(userUnit)
    }


    if(container === true) {
        return(<motion.div className="water-cont" drag>
            <div className="water-main-cont">
                <div className="main-display">
                    <small> &#x1F4A7; Water Reminder </small>
                    <Tracker unit={waterUnit} intake={intake} goal={goal} clicked={handleTab}/>
                    <Timer timer={timer}/>
                    <div className="btn-container">
                        <button onClick={() => handleTab(1)} className="start-btn">Start</button>
                        <button  onClick={() => handleTab(2)}className="setting-btn"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="white" d="M18.5 4a1.5 1.5 0 0 0-3 0v.5H4a1.5 1.5 0 1 0 0 3h11.5V8a1.5 1.5 0 0 0 3 0v-.5H20a1.5 1.5 0 0 0 0-3h-1.5V4ZM4 10.5a1.5 1.5 0 0 0 0 3h1.5v.5a1.5 1.5 0 0 0 3 0v-.5H20a1.5 1.5 0 0 0 0-3H8.5V10a1.5 1.5 0 1 0-3 0v.5H4ZM2.5 18A1.5 1.5 0 0 1 4 16.5h11.5V16a1.5 1.5 0 0 1 3 0v.5H20a1.5 1.5 0 0 1 0 3h-1.5v.5a1.5 1.5 0 0 1-3 0v-.5H4A1.5 1.5 0 0 1 2.5 18Z"/></g></svg></button>
                     </div> 
                </div>
                <WaterSettings  clicked={buttons[2].open} userInput={handleInputChange} setWater={setWater} unit={waterUnit} goal={goal}/>
            </div>
            <Settings clicked={buttons[1].open}  unitSelect={unitSelect} unit={unit} userInput={handleInputChange} setSettings={setSetting} timer={input.time}/> 
        </motion.div>
    )
    }
}


export default Hydrate 