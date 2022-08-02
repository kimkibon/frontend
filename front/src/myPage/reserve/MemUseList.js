import React, { useEffect, useState } from 'react'
import SelectOneFile from '../../commons/Files/SelectOneFile';


//하나의 이용내역 정보
const MemUseList = (props) => {
 
  const list = props.list;

  const [url,setUrl] = useState();


  useEffect(()=>{

    SelectOneFile('0',184, 0).then(Res=>{
      setUrl("data:image/;base64,"+Res.URL);
      // setUrl(url);
    });

  },[])
 
  list['URL'] = url;
  return (
    <>
      <div class="col-md-3 mt-2 d-flex flex-column align-items-center align-content-center">
        <img src={list.URL} width="200px" height="auto"/><p/>
      </div>
      <div class="col-md-7 mt-1 align-items-center align-content-center">
        <h4>예약번호 : {list.RES_IDX}</h4><br/>
        주소 : {list.BOARD_ADDR}<br/>
        이용날짜 : {list.RES_DATE_START} ~ {list.RES_DATE_END}<br/>
        맡긴 동물 수 : {list.RES_CARE_NO}<br/>
        결제가격 : {list.PRICE} 원         
      </div>
    </>
  )
}

export default MemUseList