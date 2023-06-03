import quoteService from '../services/quote_serv'

import React, {useEffect, useState} from 'react'
import { motion } from 'framer-motion'

const Generator = ({quote}) => {
    return (
          <blockquote className="quote">"<i>{quote.content}</i>" - {quote.author}</blockquote>
      )
}


const Quote = ({container}) => {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    quoteService.getQuote().then(initialQuote => {
      setQuote(initialQuote)
    })
  }, [])
  if(container === true) {
    return(
      <>
      
    <motion.div className="quote-container" drag dragConstraints={{ left: 0, top: 0, right: (window.innerWidth * 80) / 100, bottom: (window.innerHeight * 80) / 100}}>
    <small className="mini-title">&#10024; Motivational Quote </small>
    <Generator quote={quote}/>
    </motion.div>
      </>
      
    )
  }
    
}

export default Quote