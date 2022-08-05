import React from "react"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    const navigate = useNavigate();
    function onClick(){
        
    localStorage.removeItem("MEM_ID")
    localStorage.removeItem("JWT")
    
    navigate('/LogOutComponent');

    }
    if(localStorage.getItem("MEM_ID") !== null){
        console.log(localStorage.getItem("MEM_ID"))
        
    return(
        
        <span href='#' onClick={()=>onClick()}>로그아웃</span>
    )
    }
    else {
        return(<div></div>)
    }
  }

  export default Logout;