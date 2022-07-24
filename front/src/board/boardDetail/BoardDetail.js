import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import SelectFileList from '../../commons/Files/SelectFileList';
import BoardReview from './BoardReview';
import DatePicker from '../../commons/datePicker/DatePicker';
import Review from './boardDetailComponent/Review';

const BoardDetail = () => {

    const [boardDetail , setBoardDetail] = useState([]);
    const [file , setFile] = useState([]);
    const [review , setReview] = useState([]);
    const [resDate, setResDate] = useState([]);

    const location = useLocation();
    let param

    if(location.state === null){
      // window.history.back();
    } else {
      param = location.state.BOARD_NO;
    }

    const highFunction = (text) => {
      console.log(text);
      setResDate(text);
    }

    useEffect(() => {
      axios({
        method :'post',
        url : '/GareBnB/board/boardDetail.do',
        params : {'BOARD_NO' : param
      }
      }).then(Response =>{
        console.log(Response.data)
        setBoardDetail(Response.data);
      });

      BoardReview(param).then(Response =>{
        setReview(Response);
        console.log(Response);
      });

      SelectFileList('0',param).then(Response =>{
        Response.map(base64 =>{
          base64.URL = "data:image/;base64,"+base64.URL
        })
        Response.sort(function(a,b){
          return a.FILE_LEVEL - b.FILE_LEVEL
        })
        setFile(Response);
        console.log(Response);
      });
    },[param])

  return (
  <>

    <div className="detailCard">
      <DatePicker  propFunction={highFunction}/>
    </div>
    <div className="detailCard">
      <Review props = {review}/>
    </div>

  </>
  )
}

export default BoardDetail