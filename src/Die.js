import React from "react"

export default function Die(props) {

  const stylee = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }

  return (
    <div 
      style={stylee}
      className={`dice value${props.value}`}
      onClick={() => {props.handleClick(props.id); props.startTimer()}}
    >
      <div className="dote"></div>
      <div className="dote"></div>
      <div className="dote"></div>
      <div className="dote"></div>
      <div className="dote"></div>
      <div className="dote"></div>
      <div className="dote"></div>
      <div className="dote"></div>
      <div className="dote"></div>
    </div>
  )
}