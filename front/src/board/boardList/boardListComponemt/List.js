import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating';
import SelectOneFile from '../../../commons/Files/SelectOneFile';
const List = (props) => {
  //상위 컴포넌트에서 받아온 데이터를 표시 

  const list = props.list;

  const [url, setUrl] = useState();


  useEffect(() => {
    SelectOneFile('0', list.BOARD_NO, list.BOARD_MODIFY_NO).then(Res => {
      setUrl("data:image/;base64," + Res.URL);
      // setUrl(url);
    });

  }, [])

  list['URL'] = url;

  return (

    <div className="card h-100 shadow-sm">
      <Link to='/board/detail' state={list}>

        <img
          className="d-block rounded p-1"
          width='100%'
          height='270px'
          src={list.URL}
          alt=""
          style={{'objectFit' : 'cover'}}
        />
      </Link>
      <div className="card-body">
        <div className='row mb-3'>
          <div className='col col-sm-8'>
        <h4 className="card-text">
          {list.BOARD_TITLE}
        </h4>
        </div>
        <div className='col col-sm-4'>
        <Rating initialValue={(list.AVG_SCORE)} readonly  size='20px' className='mb-2'  />
        </div>
        </div>
        <figure className="text-end">
        <p>
            {list.BOARD_ADDR1} {list.BOARD_ADDR2}
          </p>
          <p>
            {list.BOARD_PRICE}원/일
          </p>
        </figure>
        <div className="d-flex justify-content-between align-items-center">
          <div className='col col-sm-10'>
            지금까지 {list.RES_COUNT}명이 이용했어요!
          </div>
          <div className="col col-sm-2 btn-group">
            <Link to='/board/detail' state={list}>
              <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
            </Link>
          </div>
          <small className="text-muted">{list.BOARD_SCORE}</small>
        </div>
      </div>
    </div>

  )
}

export default List