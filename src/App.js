import React from "react"
import { nanoid } from "nanoid"
import Die from "./Die"
import Confetti from 'react-confetti'
import Timer from "./Timer"

function App() {

  // Holding the dices in this state
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(true)
  const [bestTime, setBestTime] = React.useState(() => JSON.parse(localStorage.getItem('bestTimeStorage')))
  const [isNewRecord, setIsNewRecord] = React.useState(false)

  // Returning 10 random dices
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(randomDice())
    }
    return newDice
  }

  // Returning the Object of the dice with random number
  function randomDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  // Looping on the dices and return them as Components
  const diceElements = dice.map(die => {
    return <Die
      key={die.id}
      id={die.id}
      isHeld={die.isHeld}
      value={die.value}
      handleClick={holdDice}
      startTimer={handleStart}
    />
  })

  // Whenever there is a change in the dice we will check if all elements are held and got same value.
  // Pause / Start The Stopwatch
  React.useEffect(() => {
    const condition = dice.every(element => element.isHeld === true && element.value === dice[0].value)
    condition ? (setTenzies(true), handlePauseResume()) : (setTenzies(false))
    // if all is held and got same value &&
    // and current time is smaller then the old best time or its first time playing
    // save the current time, save new record in local Storage.
    if (condition) {
      if (currentTime < bestTime || bestTime === null) {
        setBestTime(currentTime)
        setIsNewRecord(!isNewRecord)
        localStorage.removeItem('bestTimeStorage')
        localStorage.setItem('bestTimeStorage', JSON.stringify(currentTime))
      }
    }
  }, [dice])

  // When we click on the roll button it will check restarting all, or just change the not held dices
  // If win reset the StopWatch
  function roll() {
    if (tenzies === true) {
      handleReset()
      setDice(allNewDice())
      setIsNewRecord(false)
    } else {
      setDice(prevValue => {
        return prevValue.map(item => !item.isHeld ? randomDice() : item)
      })
    }
  }

  // When we click on the the dices we will flip the background to held or no.
  // not allow the user to select other dice values who are different than the first value selection
  function holdDice(id, value) {
    let currentDiceValue = dice.find(item => item.isHeld === true)
    currentDiceValue === undefined ? currentDiceValue = {value: value} : ''
    setDice(oldDice => oldDice.map(die => {
      // check if the Dice you did just select have same value
      // as the previews Dive value
      return die.id === id && die.value === currentDiceValue.value ?
        {...die, isHeld: !die.isHeld} :
        die
    }))
  }

  // StopWatch
  const [isActive, setIsActive] = React.useState(false)
  const [isPaused, setIsPaused] = React.useState(true)
  const [currentTime, setCurrentTime] = React.useState(0)

  React.useEffect(() => {
    let interval = null

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setCurrentTime((currentTime) => currentTime + 10)
      }, 10)
    } else {
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
    }
  }, [isActive, isPaused])

  function handleStart() {
    setIsActive(true)
    setIsPaused(false)
  }

  const handlePauseResume = () => {
    setIsPaused(!isPaused)
  }

  const handleReset = () => {
    setIsActive(false)
    setCurrentTime(0)
  }

  return (
    <main className="app">

    {tenzies && <Confetti />}

    <div className="stop-watch">
      {isNewRecord && <p className="record">New Record</p>}
      <Timer time={currentTime} />
    </div>

      <h1>Tenzies</h1>
      <p className="content">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className="die">
        {diceElements}
      </div>
      <button
        className="sbmt-btn"
        onClick={() => {roll(); handleStart()}}
      >
        {!tenzies ? "Roll" : "New Game / Rest"}
      </button>
    </main>
  )
}

export default App


