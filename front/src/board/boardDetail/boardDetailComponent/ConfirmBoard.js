import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ConfirmBoard = () => {

    const navigate = useNavigate();

  return (
    axios({
        method : 'post',
        url : '/GareBnB/Admin/hostBoardConfirm.do',
        param : {
            'BOARD_NO' : props
        }
    }).then(()=> {
        // navigate('/');
    })
  )
}

export default ConfirmBoard