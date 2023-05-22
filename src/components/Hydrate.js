import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Tracker = () => {
    const water = 0;
    const goal = 0 
    const unit = [
        {
            unit: 'fl. oz'
        },
        {
            unit: 'ml'
        }
    ] 
    return(
        <>
            <div>{water} / {goal} fl. oz</div>
            <button>Add</button>
        </>
    )
}

const Timer = ({clicked}) => {
    const [timer, setTimer] = useState(3600)
    let minute = Math.floor(timer / 60)
    let digit_second = timer % 60

    useEffect(() => {
        if(clicked === true && timer > 0) {
           const interval = setInterval(() => {
            setTimer((seconds) => seconds - 1) 
        }, 1000)
        return () => clearInterval(interval)
        }
        
      }, [clicked, timer])
    return(digit_second >= 10 ? <div className="clock-display">{minute}:{digit_second}</div> : <div className="clock-display">{minute}:0{digit_second}</div>)
}

const Settings = ({clicked}) => {

    if(clicked === true) {
        return(
        <form>Settings Tab</form>
    )
    }
    
}

const Hydrate = ({container}) => {
    const [clicked, setClicked] = useState(false)
    const [clicksetting, setClicksetting] = useState(false)

    const clickStart = () => {
        setClicked(!clicked)
    }

    const clickSettings = () => {
        setClicksetting(!clicksetting)
    }

    if(container === true) {
        return(
        
        <motion.div className="water-cont" drag>
            <small> &#x1F4A7; Stay Hydrated </small>
            <Tracker/>
            <Timer clicked={clicked}/>
            <div className="btn-container">
                <button onClick={clickStart} className="start-btn">Start</button>
                <button onClick={clickSettings} className="setting-btn"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="white" d="M18.5 4a1.5 1.5 0 0 0-3 0v.5H4a1.5 1.5 0 1 0 0 3h11.5V8a1.5 1.5 0 0 0 3 0v-.5H20a1.5 1.5 0 0 0 0-3h-1.5V4ZM4 10.5a1.5 1.5 0 0 0 0 3h1.5v.5a1.5 1.5 0 0 0 3 0v-.5H20a1.5 1.5 0 0 0 0-3H8.5V10a1.5 1.5 0 1 0-3 0v.5H4ZM2.5 18A1.5 1.5 0 0 1 4 16.5h11.5V16a1.5 1.5 0 0 1 3 0v.5H20a1.5 1.5 0 0 1 0 3h-1.5v.5a1.5 1.5 0 0 1-3 0v-.5H4A1.5 1.5 0 0 1 2.5 18Z"/></g></svg></button>
            </div>
             <Settings clicked={clicksetting}/> 
        </motion.div>
    )
    }
    
}


export default Hydrate 