import axios from "axios";
import React, { useEffect } from "react"

const Auth = (props) => {
    useEffect(() => {
        console.log(props.LEVEL);
        // 페이지레벨이 멤버레벨보다 낮으면 빠꾸 높거나 같으면 통과
        const id = localStorage.getItem("MEM_ID");
        axios({
            method : 'post',
            url : "/GareBnB/Auth.do",
            params : {'MEM_ID' : id}
        }).then(Response => {
        console.log(Response.data);
       if(Response.data.MEM_LEVEL > props.LEVEL ){
        console.log(localStorage.getItem("MEM_LEVEL"));
        alert("권한이 없습니다");
        window.history.back();
       } 
    })
        
       
    },[])
    
  }

  export default Auth;