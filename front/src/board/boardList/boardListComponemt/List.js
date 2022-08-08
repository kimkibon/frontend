import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SelectOneFile from '../../../commons/Files/SelectOneFile';
const List = (props) => {
  //상위 컴포넌트에서 받아온 데이터를 표시 

  const list = props.list;

  const [url, setUrl] = useState();


  useEffect(() => {
    console.log('render')
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
        <h4 className="card-text">
          {list.BOARD_TITLE}
        </h4>
        <figure className="text-end">
          <p>
            {list.BOARD_PRICE}원/일
          </p>
          <p>
            {list.BOARD_ADDR1} {list.BOARD_ADDR2}
          </p>
          
        </figure>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
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