import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import homeImage from '../commons/images/homeImage.png';
import '../commons/style.css'

const Main = () => {
  const [startDate , setStartDate] = useState(new Date());
  const [endDate , setEndDate] = useState(new Date());
  const [state, setState] = useState({
    'START_DATE': '',
    'END_DATE': '',
    'CARE_NO': '0',
    'BOARD_ADDR1': ''
  });


  const setItem = (e) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value
    })
  }

  const onChange = (dates) => {
    const [start, end] = dates;

    if(end !== undefined){
    setStartDate(start);
    setEndDate(end);

    setState({
      'START_DATE': start,
      'END_DATE': end
    })
  }
  };
  return (
    <div>
      {/* <!--Banner Area Start --> */}
      <section className="row banner-area">
        <div className="banner-area__img">
          <img src={homeImage} alt="banner-img" class="img-fluid" />
          <div className="banner-area__content">
            <div className='context'>
              <h2 className='context'>Premium care for premium people.</h2>
            </div>
            <div className='number'>
              <div className='row'>
                <div className='col input-group mb-3'>
                  <span class="input-group-text" id="basic-addon1">케어링</span>
                  <input
                    className='form-control'
                    type='number'
                    name='CARE_NO'
                    value={state.CARE_NO}
                    min='0'
                    onChange={(e) => setItem(e)}
                  />
                  <span class="input-group-text" id="basic-addon1">마리 이상</span>
                </div>
                <div className='col input-group mb-3'>
                  <span className='input-group-text'>지역</span>
                  <input
                    className='form-control'
                    type='text'
                    name='BOARD_ADDR1'
                    value={state.BOARD_ADDR1}
                    onChange={(e) => setItem(e)}
                  />
                </div>
                </div>
              ‹<div className='input-group mb-3'>
                <span className='input-group-text'>예약 날짜</span>
                <span className='form-control'>
                  {<ReactDatePicker
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
                <Link to='/board' state={state} className='btn btn-danger'>
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  )
}

export default Main