import React, { useState} from 'react'
import ocean from '../audio/ocean.mp3'
import forest from '../audio/forest.mp3'
import cafe from '../audio/cafe.mp3'
import rain from '../audio/rain.mp3'
import keyboard from '../audio/keyboard.wav'
import { motion } from 'framer-motion'

const Display = ({sound, playAudio, adjustVolume}) => {
    return(
        <div className='sound'><li key={sound.id}>{sound.name}</li>
          <button onClick={(e) => {
            playAudio(e, sound)}
          }>Play</button>  <input type="range" onChange={(e) => adjustVolume(e, sound)}/>
        </div>
    )
}

const Sound = ({container}) => {
    const [soundBoard, setSoundBoard] = useState([
        {id: 1, name: 'Ocean', played: false},
        {id: 2, name: 'Cafe', played: false}, 
        {id: 3, name: 'Rain', played: false},
        {id: 4, name: 'Keyboard', played: false},
        {id: 5, name: 'Forest', played: false},])

    const audios = {
        'Ocean': new Audio(ocean), 
        'Forest': new Audio(forest),
        'Cafe': new Audio(cafe),
        'Rain': new Audio(rain),
        'Keyboard': new Audio(keyboard)
    }
        

    const playAudio = (e, sound) => {
        if(sound.played === false) {
            e.target.textContent = "Pause"
            audios[sound.name].loop = true; 
            audios[sound.name].play()
        }
    }

    const adjustVolume = (e, sound) => {
        audios[sound.name].volume = parseInt(e.target.value) / 100; 
    }

    if(container === true) {
        return(
        <motion.div drag >
        <section className='soundboard-cont'>
             <small> &#x1F50A; Soundboard</small>
            <ul>
                {soundBoard.map(sound => {
                    return(
                      <Display key={sound.id} playAudio={playAudio} sound={sound} adjustVolume={adjustVolume} />)})}
            </ul>
        </section>
       
        </motion.div>
    )
    }
    
}


export default Sound 