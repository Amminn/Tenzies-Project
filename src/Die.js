import React from "react"

export default function Die(props) {

  const stylee = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }

  return (
    <div 
      style={stylee}
      className='items'
      onClick={() => {props.handleClick(props.id)}}
    >{props.value}</div>
  )
}