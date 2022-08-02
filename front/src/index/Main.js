import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import homeImage from '../commons/images/homeImage.png';
import '../commons/style.css'

const Main = () => {
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

    setState({
      'START_DATE' : start,
      'END_DATE' : end
    })

  };
  return (
    <div>
      {/* <!--Banner Area Start --> */}
      <section className="banner-area">
        <div className="banner-area__img">
          <img src={homeImage} alt="banner-img" class="img-fluid" />
          <div className="banner-area__content">
            <div className='context'>
              <h2 className='context'>Premium care for premium people.</h2>
            </div>
            <div className='number'>
              <input type='number' name='CARE_NO' value={state.CARE_NO} onChange={(e) => setItem(e)} />
            </div>
            <div className='add'>
              <input type='text' name='BOARD_ADDR1' value={state.BOARD_ADDR1} onChange={(e) => setItem(e)}/>
            </div>
            <div className='date'>
              <ReactDatePicker
                minDate={new Date()}
                selected={state.START_DATE}
                onChange={onChange}
                startDate={state.START_DATE}
                endDate={state.END_DATE}
                selectsRange
                dateFormat={'yyyy년 MM월 dd일'}
              />
            </div>
            <Link to='/board' state={state}>
              <button type="button" class="btn2 btn-outline-warning">Search</button>
            </Link>
          </div>
        </div>
      </section>
    </div>

  )
}

export default Main