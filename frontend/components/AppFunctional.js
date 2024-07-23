import React, { useState } from 'react'
import axios from 'axios';


// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage)
  const [email, setEmail] = useState(initialEmail)
  const [steps, setSteps] = useState(initialSteps)
  const [index, setIndex] = useState(initialIndex)


  function getXY(index) {
    const x = index % 3 + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y }
  }
 
  function getXYMessage() {
    const { x, y } = getXY(index)
    return `Coordinates (${x}, ${y})`
  }

  function reset() {
    setEmail(initialEmail)
    setIndex(initialIndex)
    setMessage(initialMessage)
    setSteps(initialSteps)
  }

  function getNextIndex(direction) {
    let newIndex;
    switch (direction) {
      case 'left':
        newIndex = index - 1;
        if (index % 3 === 0) return index 
        break;
      case 'right':
        newIndex = index + 1;
        if (index % 3 === 2) return index
        break;
      case 'up':
        newIndex = index - 3;
        if (index < 3) return index
        break;
      case 'down':
        newIndex = index + 3;
        if (index > 5) return index
        break;
      default:
        newIndex = index
    }
    return newIndex
  }
 
    // COORDINATES
  // (1, 1)=0 (2, 1)=1 (3, 1)=2
  // (1, 2)=3 (2, 2)=4 (3, 2)=5
  // (1, 3)=6 (2, 3)=7 (3, 3)=8
  //  GRID 
  // (0) (1) (2)
  // (3) (4) (5)
  // (6) (7) (8)

  function move(evt) {
    const direction = evt.target.id
    if (direction === 'reset') {
      reset();
    } else {
      const newIndex = getNextIndex(direction)  
      if (newIndex !== index) {
        setIndex(newIndex)
        setSteps(steps + 1)
      }
    }
  }

  function onChange(evt) {
    const { value } = evt.target
    setEmail(value)
  }

  function onSubmit(evt) {
    evt.preventDefault()
    const submissionData = {
      steps: steps,
      y: getXY(index).y,
      x: getXY(index).x,
      email: email
    };
    axios.post('http://localhost:9000/api/result', submissionData)
    .then(response => {
      let res = response.data.message
      let newMessage = res.split(".").join('')
      setMessage(newMessage)
    })
    .catch(error => {
      console.error("Error Fetching Data", error)
    });   
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{ message }</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={move}>reset</button>
       
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={email} id="email" name="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit" ></input>
      </form >
    </div>
  )
}
