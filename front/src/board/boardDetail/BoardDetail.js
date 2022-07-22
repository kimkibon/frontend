import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import SelectFileList from '../../commons/Files/SelectFileList';
import BoardReview from './BoardReview';

const BoardDetail = () => {

    const [boardDetail , setBoardDetail] = useState([]);
    const [file , setFile] = useState([]);
    const [review , setReview] = useState([]);

    const location = useLocation();
    let param

    if(location.state === null){
      window.history.back();
    } else {
      param = location.state.BOARD_NO;
    }

    useEffect(() => {

      axios({
        method :'post',
        url : '/GareBnB/board/boardDetail.do',
        params : {'BOARD_NO' : param
      }
      }).then(Response =>{
        
        setBoardDetail(Response.data);
        return(Response.data);
      });
      
      BoardReview(param).then(Response =>{
        setReview(Response);
      });

      SelectFileList('0',param).then(Response =>{
        Response.map(base64 =>{
          base64.URL = "data:image/;base64,"+base64.URL
        })
        Response.sort(function(a,b){
          return a.FILE_LEVEL - b.FILE_LEVEL
        })
        setFile(Response);
      });

    },[])

  return (
    <div>
      {console.log(review)}
      <h1>{boardDetail.BOARD_CONTENT}</h1>
      { file.map(src =>{return(
        <p key={src.FILE_LEVEL}>
        <img  src={src.URL} width='100px' height='100px'/>
        </p>
      )})
      }
    </div>
  )
}

export default BoardDetail