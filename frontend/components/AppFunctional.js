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
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
      let newIndex;
      switch (direction) {
        case 'left':
          // Calculate new index for moving left
          newIndex = index - 1;
          break;
        case 'right':
          // Calculate new index for moving right
          newIndex = index + 1;
          break;
        case 'up':
          // Calculate new index for moving up
          newIndex = index - 3;
          break;
        case 'down':
          // Calculate new index for moving down
          newIndex = index + 3;
          break;
        default:
          // If no valid direction, return the current index
          newIndex = index;
      }
  }
  

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.

  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    const { value } = evt.target
    // console.log(value)
    setEmail(value)

  }


  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    // console.log('form submitted')
    const submissionData = {
      steps: steps,
      y: getXYMessage[index].y,
      x: getXYMessage[index].x,
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
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{ message }</h3>
      </div>
      <div id="keypad">
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={email} id="email" name="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit" ></input>
      </form >
    </div>
  )
}
