import React, { useEffect, useState } from 'react'
import axios from 'axios'
import List from '../boardList/boardListComponemt/List';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from 'react-router-dom';
import { Button, Container, Dropdown, DropdownButton } from 'react-bootstrap';


const BoardList = () => {
  const location = useLocation().state;
  const [board, setBoard] = useState([]); //변수 초기화
  const [showBoard, setShowBoard] = useState([]);
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
        ...state,
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
      setBoard(Response.data);
      setShowBoard(Response.data);
    })

  }

  useEffect(() => {
    Search();
  }, [])

  const sort = (e) => {    
    // 0 = 높은 가격순
    // 1 = 낮은 가격순
    // 2 = 높은 별점순
    // 3 = 낮은 별점순
    // 4 = 높은 이용순
    // 5 = 낮은 이용순
    // 6 = 최근 등록순 ??
    // 7 = 오래된 등록순 ??
    const sortBoard = []
    if (e === '0') {
      showBoard.sort(function (a, b) { return b.BOARD_PRICE - a.BOARD_PRICE })
      showBoard.map(list => {
        sortBoard.push(list)
      })
    } else if (e === '1') {
      showBoard.sort(function (a, b) { return a.BOARD_PRICE - b.BOARD_PRICE })
      showBoard.map(list => {
        sortBoard.push(list)
      })
    } else if (e === '2') {
      showBoard.sort(function (a, b) { return b.AVG_SCORE - a.AVG_SCORE })
      showBoard.map(list => {
        sortBoard.push(list)
      })
    } else if (e === '3') {
      showBoard.sort(function (a, b) { return a.AVG_SCORE - b.AVG_SCORE })
      showBoard.map(list => {
        sortBoard.push(list)
      })
    } else if( e==='4') {
      showBoard.sort(function (a, b) { return b.RES_COUNT - a.RES_COUNT })
      showBoard.map(list => {
        sortBoard.push(list)
      })
    } else if (e==='5'){
      showBoard.sort(function (a, b) { return a.RES_COUNT - b.RES_COUNT })
      showBoard.map(list => {
        sortBoard.push(list)
      })
    }
    setShowBoard(sortBoard);
  }

  return (
    <Container>
      <div className='container'>
        <div className='row m-2 p-2'>
          <div className='d-flex justify-content-end float-end row mt-3'>
            <div className='col-md-3'></div>
            <div className='col input-group mb-3'>
              <span
                className="input-group-text"
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
            <div className='col input-group mb-3'>
              <span
                className='input-group-text'
              >
                지역
              </span>
              <input className='form-control' type='text' value={state.BOARD_ADDR1} onChange={(e) => setADDR(e)} />
            </div>
            <div className='col'></div>
          </div>
          <div className='float-end row'>
            <div className='col col-md-3'></div>
            <div className='col input-group mb-4'>
              <span className='input-group-text'>기간 선택</span>
              <span className='form-control'>
                {<DatePicker
                  className='form-control'
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
            <div className='col col-md-3'></div>
          </div>
        </div>
      </div>
      <div className='row mt-2 mb-4'>
        <div className='col offset-9'>
          <DropdownButton id="dropdown-basic-button" title="게시글 정렬">
            <Dropdown.Item id='0' onClick={(e) => {sort(e.currentTarget.id)}}>
               높은 가격순 
            </Dropdown.Item>
            <Dropdown.Item id='1' onClick={(e) => {sort(e.currentTarget.id)}}>
              낮은 가격순
            </Dropdown.Item>
            <Dropdown.Item id='2' onClick={(e) => {sort(e.currentTarget.id)}}>
              높은 별점순
            </Dropdown.Item>
            <Dropdown.Item id='3' onClick={(e) => {sort(e.currentTarget.id)}}>
              낮은 별점순
            </Dropdown.Item>
            <Dropdown.Item id='4' onClick={(e) => {sort(e.currentTarget.id)}}>
              높은 이용순
            </Dropdown.Item>
            <Dropdown.Item id='5' onClick={(e) => {sort(e.currentTarget.id)}}>
              낮은 이용순
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <div className="container">

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {showBoard.map((list) => {
            return (
              <div className='col' key={list.BOARD_NO}>
                <List list={list} />
              </div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}

export default BoardList