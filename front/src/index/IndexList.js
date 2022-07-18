import React from 'react'
import { Link } from 'react-router-dom'

const IndexList = () => {
  return (
    
    <div>
    <ul>
    <Link to='/'><li>main</li></Link>
    <Link to='/join'><li>join</li></Link>
    <Link to='/login'><li>login</li></Link>
    <Link to='/myPage'><li>myPage</li></Link>
    <Link to='/board'><li>board</li></Link>
    <Link to='/admin'><li>admin</li></Link>
    </ul>
    </div>
    
  )
}

export default IndexList