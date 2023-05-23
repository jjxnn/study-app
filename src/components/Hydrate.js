import React, { useState, useEffect } from 'react'
import Display from './Pomodoro.js'
import { motion } from 'framer-motion'

// 
const Tracker = ({unit, open, intake, goal}) => {         
    return(
        <div className='tracker-container'>
            <div className="progress-bar">{intake} / {goal} {unit}</div>
            <button className="add-btn" onClick={open}><span>+</span></button>
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
const Settings = ({clicked, unitSelect, unit, setTime}) => {
    if(clicked === true) {
        return(
        <form className="user-other-settings">

            <label>Water Unit</label><select onChange={unitSelect} defaultValue={unit[0]}>
                {unit.map((units, index) => <option key={index} className="selection">{units}</option>)}
            </select>

            <label>Set Time</label><input type="number" placeholder="60" onChange={setTime}/>
            <label>Sound Volume</label><input type="range" min="1" max="100"/>
            <button className='apply-btn'>Apply</button>
        </form>  
    )
    }
}

// 
const WaterSettings = ({open, userInput, setWater}) => {
    if(open === true ) {
       return(
        <form className="user-water-settings"> 
            <label>Set Water Goal</label>
            <input name="goal" type="number" onChange={userInput}/>

            <div>
                <label>Set Intake</label>
                <input name="intake" type="number" onChange={userInput}/>  
            </div>

            <button onClick={setWater} className="apply-btn">Apply</button>
        </form>
    ) 
    }
}

// 
const Hydrate = ({container}) => {
    const [clicked, setClicked] = useState(false)
    const [clicksetting, setClicksetting] = useState(false)
    const [waterUnit, setWaterUnit] = useState('fl. oz') 
    const [open, setOpen] = useState(false)
    const [timer, setTimer] = useState(3600)
    const [input, setInput] = useState({goal: 0, intake: 0})
    const [goal, setGoal] = useState(0)
    const [intake, setIntake] = useState(0)
    const unit = ['fl. oz', 'mL'] 


    useEffect(() => {
        if(clicked === true && timer > 0) {
           const interval = setInterval(() => {
            setTimer((seconds) => seconds - 1) 
        }, 1000)
        return () => clearInterval(interval)
        }
        
      }, [clicked, timer])


    
    //   Need to click up these events into one 
    const clickStart = () => {
        setClicked(!clicked)
    }

    const clickSettings = () => {
        setClicksetting(!clicksetting)
    }
    const waterSetting = () => {
        setOpen(!open)
    } 


    // A bit cleaning up
    const setTime = (e) => {
        setTimer(e.target.value * 60)
    }
    const unitSelect = (e) => {
        setWaterUnit(e.target.value)
    }

    
    
    const handleInputChange = (e) => {
        setInput({
          ...input, [e.target.name] : e.target.value, 
        })
    }
    const setWater = (e) => {
        e.preventDefault()
        if(goal === 0 || input.intake < 0) {
            console.log('Please set goal first.')
        } else {
            setIntake(input.intake)
        }
        
        setGoal(input.goal)
    }

    if(container === true) {
        return(
        <motion.div className="water-cont" drag>
            <div className="water-main-cont">
                <div className="main-display">
                    <small> &#x1F4A7; Stay Hydrated </small>
                    <Tracker unit={waterUnit} open={waterSetting} intake={intake} goal={goal}/>
                    <Timer timer={timer}/>
                    <div className="btn-container">
                        <button onClick={clickStart} className="start-btn">Start</button>
                        <button onClick={clickSettings} className="setting-btn"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="white" d="M18.5 4a1.5 1.5 0 0 0-3 0v.5H4a1.5 1.5 0 1 0 0 3h11.5V8a1.5 1.5 0 0 0 3 0v-.5H20a1.5 1.5 0 0 0 0-3h-1.5V4ZM4 10.5a1.5 1.5 0 0 0 0 3h1.5v.5a1.5 1.5 0 0 0 3 0v-.5H20a1.5 1.5 0 0 0 0-3H8.5V10a1.5 1.5 0 1 0-3 0v.5H4ZM2.5 18A1.5 1.5 0 0 1 4 16.5h11.5V16a1.5 1.5 0 0 1 3 0v.5H20a1.5 1.5 0 0 1 0 3h-1.5v.5a1.5 1.5 0 0 1-3 0v-.5H4A1.5 1.5 0 0 1 2.5 18Z"/></g></svg></button>
                     </div> 
                </div>
                <WaterSettings open={open} userInput={handleInputChange} setWater={setWater}/>
            </div>
            <Settings clicked={clicksetting} unitSelect={unitSelect} unit={unit} setTime={setTime}/> 
        </motion.div>
    )
    }
}


export default Hydrate 