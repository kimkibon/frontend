import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LogOutComponent = () => {
    const navigate = useNavigate()
    useEffect(()=>{
    navigate('/');
},[])
  return (
    <div>LogOutComponent</div>
  )
}

export default LogOutComponent