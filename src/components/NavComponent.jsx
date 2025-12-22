import React from 'react'
import "./NavComponent.css"
const NavComponent = (props) => {
  return (
      <nav className='nav-component'>
          <h2>MY TODOAPP</h2>


          <div className='button-flex'>
              <button onClick={props.propsResetFunction}>Reset</button>
          </div>
    </nav>
  )
}

export default NavComponent