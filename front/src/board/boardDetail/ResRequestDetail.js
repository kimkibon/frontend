import axios from 'axios'
import React from 'react'

const ResRequestDetail = () => {

  axios({
    method: 'post',
      url: '/GareBnB/board/boardList.do',
      params : {
        'START_DATE' : 1659343560217,
        'END_DATE' : 1659343560217
      }

  }).then(Res =>{
   console.log( Res.data)
  })

  return (
    <div>ResRequestDetail</div>
  )
}

export default ResRequestDetail

