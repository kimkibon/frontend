import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SelectOneFile from '../../commons/Files/SelectOneFile';
import List from '../boardList/boardListComponemt/List';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';


const BoardList = () => {
  const location = useLocation().state;
  const [board, setBoard] = useState([]); //변수 초기화
  const [startDate, setStartDate] = useState(location.START_DATE);
  const [endDate, setEndDate] = useState(location.END_DATE); // 날짜 정보 초기화

  const [state, setState] = useState({
    'START_DATE': location.START_DATE,
    'END_DATE': location.END_DATE,
    'CARE_NO': location.CARE_NO,
    'BOARD_ADDR1': location.BOARD_ADDR1
  });

  const setCare = (e) => {
    const careNo = e.target.value
    setState({
      ...state,
      'CARE_NO': careNo
    });
  }

  const setADDR = (e) => {
    const ADDR = e.target.value
    setState({
      ...state,
      'BOARD_ADDR1': ADDR
    })
  }

  const onChange = (dates) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
    if (start !== null && end !== null)
      setState({
        'START_DATE': dates[0].getTime(),
        'END_DATE': dates[1].getTime()
      })
  };

  const Search = () => {
    axios({
      method: 'get',
      url: '/GareBnB/board/boardList.do',
      params: {
        'BOARD_CARE_NO': state.CARE_NO,
        'BOARD_ADDR1': state.BOARD_ADDR1,
        'START_DATE': state.START_DATE,
        'END_DATE': state.END_DATE
      }
      //서버에서 리스트 요청
    }).then(Response => {

      const url = Response.data.map(async list => {

        await SelectOneFile('0', list.BOARD_NO, list.BOARD_MODIFY_NO).then(Res => {
          //요청된 리스트의 게시글 넘버로 메인 이미지 요청

          list['URL'] = "data:image/;base64," + Res.URL
        })
        //변수에 URL 요소를 추가하고 서버로부터 리턴 받은 이미지를 문자화해서 저장
        return list
      })

      Promise.all(url).then((data) => { setBoard(data) });
      //async - await 로 받아온 객체는 promise 객체이므로 이를 변환해서 저장 
    })

  }

  useEffect(() => {
    Search();
  }, [])



  return (
    <Container>
      <div className='container'>
        <div className='row m-2 p-2'>
          <div className='d-flex justify-content-end float-end row'>
            <div className='col offset-md-6 col-mb-3 input-group mb-3'>
              <span
                class="input-group-text"
                id="basic-addon1"
              >
                케어링
              </span>
              <input
                className='form-control'
                type='number'
                min='1'
                value={state.CARE_NO}
                onChange={(e) => setCare(e)}
              />
              <span
                className="input-group-text"
                id="basic-addon1"
              >
                마리 이상
              </span>
            </div>
            <div className='col col-mb-3 input-group mb-3'>
              <span
                className='input-group-text'
              >
                지역
              </span>
              <input className='form-control' type='text' value={state.BOARD_ADDR1} onChange={(e) => setADDR(e)} />
            </div>
          </div>
          <div className='float-end row'>
            <div className='col offset-md-6 input-group mb-3'>
              <span className='form-control'>
                {<DatePicker
                  className='col-sm-12'
                  minDate={new Date()}
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  dateFormat={'yyyy년 MM월 dd일'}
                />}
              </span>
              <Button className='btn' onClick={() => Search()}>검색</Button>
            </div>
          </div>
        </div>
      </div>
      {List(board)}
    </Container>
  )
}

export default BoardList