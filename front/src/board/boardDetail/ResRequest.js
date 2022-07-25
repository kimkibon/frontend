import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ResRequest = () => {
  const location = useLocation();

 useEffect(() => {
   
  console.log(location.state)


 }, [])
 
console.log()
  return (
    <div>ResRequest</div>
  )
}

export default ResRequest