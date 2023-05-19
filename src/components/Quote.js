import quoteService from '../services/quote_serv'

import React, {useEffect, useState} from 'react'

const Generator = ({quote}) => {
    return (
          <div className="quote">"<i>{[quote[1]]}</i>" - {quote[2]}</div>
      )
}


const Quote = ({container}) => {
  const [quote, setQuote] = useState('')
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    quoteService.getQuote().then(initialQuote => {
      setQuote(initialQuote)
    })


  }, [clicked])

  if(container === true) {
    return(
    <blockquote className="quote-container">
    <small className="mini-title">&#10024; Motivational Quote </small>
    <Generator quote={quote}/>
    </blockquote>
    )
  }
    
}

export default Quote