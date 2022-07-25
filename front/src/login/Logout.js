import React from "react"

const Logout = () => {
    function onClick(){
        
    localStorage.removeItem("MEM_ID")
    localStorage.removeItem("MEM_LEVEL")
    window.history.go('/')
    }
    if(localStorage.getItem("MEM_ID") !== null){
        console.log(localStorage.getItem("MEM_ID"))
    return(
        
        <button onClick={()=>onClick()}>로그아웃</button>
    )
    }
    else {
        return(<div></div>)
    }
  }

  export default Logout;