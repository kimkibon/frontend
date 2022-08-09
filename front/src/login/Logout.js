import React from "react"
import { useNavigate } from "react-router-dom"

const Logout = (props) => {
    const navigate = useNavigate();
    function onClick() {

        localStorage.removeItem("MEM_ID");
        localStorage.removeItem("JWT");
        if (props.props.open === true) {
            props.props.openCollapse();
        }
        navigate('/LogOutComponent');

    }
    if (localStorage.getItem("MEM_ID") !== null) {

        return (

            <span href='#' onClick={() => onClick()}>로그아웃</span>
        )
    }
    else {
        return (<div></div>)
    }
}

export default Logout;