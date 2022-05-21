import React from "react"
import { nanoid } from "nanoid"
import Die from "./Die"
import Confetti from 'react-confetti'

function App() {

  // Holding the dices in this state
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  
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
    />
  })

  // whenever there is a change in the dice we will check if all elements are held and got same value.
  React.useEffect(() => {
    const condition = dice.every(element => element.isHeld === true && element.value === dice[0].value)
    condition ? setTenzies(true) : setTenzies(false)
  }, [dice])

  // When we click on the roll button it will check restarting all, or just change the not held dices
  function roll() {
    if (tenzies === true) {
      setDice(allNewDice())
    } else {
      setDice(prevValue => {
        return prevValue.map(item => !item.isHeld ? randomDice() : item)
      })
    }
  }

  // when we click on the of of the dices we will flip the background to held or no.
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
        {...die, isHeld: !die.isHeld} :
        die
    }))
  }

  return (
    <main className="app">
    {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p className="content">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className="die">
        {diceElements}
      </div>
      <button 
        className="sbmt-btn"
        onClick={roll}
      >
        {!tenzies ? "Roll" : "New Game"}
      </button>
    </main>
  )
}

export default App


