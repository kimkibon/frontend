import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SelectOneFile from '../../commons/Files/SelectOneFile';
import List from '../boardDetail/component/List';

const BoardList = () => {
  const [board,setBoard] = useState([]);

  useEffect(()=>{
    axios({
      method : 'get',
      url : '/GareBnB/board/boardList.do'
    }).then(Response => {
      
      const url = Response.data.map(async list =>{

        await SelectOneFile('0',list.BOARD_NO).then(Res=>{
        list['URL'] = "data:image/;base64,"+Res.URL
      })
        return list
      })
      
      Promise.all(url).then((data)=>{setBoard(data)});

    })

  },[])


  
  return (
   <div>
    {console.log(board)}
    {List(board)}
   </div>
  )
}

export default BoardList