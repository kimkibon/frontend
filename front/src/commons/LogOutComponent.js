import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LogOutComponent = () => {
    const navigate = useNavigate()
    useEffect(()=>{
    navigate('/');
},[])
  return (
    <div></div>
  )
}

export default LogOutComponent