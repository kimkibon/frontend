import React, { useEffect, useState } from 'react'
import SelectOneFile from '../../commons/Files/SelectOneFile';
import { Link, } from "react-router-dom";


//하나의 이용내역 정보
const MemUseList = (props) => {
 
  const list = props.list;

  const [url,setUrl] = useState();


  useEffect(()=>{

    SelectOneFile('0',list.RES_BOARD_NO,list.RES_BOARD_MODIFY_NO).then(Res=>{
      setUrl("data:image/;base64,"+Res.URL);
      // setUrl(url);
    });

  },[])
 
  list['URL'] = url;
  return (
    <>
      <div className="col-md-3 mt-2 d-flex flex-column align-items-center align-content-center">
      <Link to='/board/detail' state={{ 'BOARD_NO': list.RES_BOARD_NO,'BOARD_MODIFY_NO':list.RES_BOARD_MODIFY_NO }}>
        <img className="img-fluid img-responsive rounded product-image" src={list.URL} width="200px" height="auto"/><p/>
      </Link>
      </div>
      <div className="col-md-7 mt-1 align-items-center align-content-center">
                  예약번호 {list.RES_IDX}<br/>
                  <h4>{list.BOARD_TITLE}</h4><br/>
                    <table>                  
                        <tr>
                          <td width={30+'%'}>주소</td>
                          <td>{list.BOARD_ADDR}</td>

                        </tr>
                        <tr>
                          <td>이용날짜</td>
                          <td>{list.RES_DATE_START} ~ {list.RES_DATE_END}</td>
                        </tr>
                        <tr>
                          <td>동물 수</td>
                          <td>{list.RES_CARE_NO}</td>
                        </tr>
                        <tr>
                          <td>결제금액</td>
                          <td>{list.PRICE} 원</td>
                        </tr>
                        <tr>
                          <td>요청사항</td>
                          <td>{list.REQ_DETAIL}</td>
                        </tr>
                      
                    </table>          
      </div>
    </>
  )
}

export default MemUseList