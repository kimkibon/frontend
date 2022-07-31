import React, { useEffect, useState } from 'react'
import SelectOneFile from '../../commons/Files/SelectOneFile';


//하나의 이용내역 정보
const MemUseList = (props) => {
 
  const list = props.list;

  const [url,setUrl] = useState();


  useEffect(()=>{

    SelectOneFile('0',list.RES_BOARD_NO).then(Res=>{
      setUrl("data:image/;base64,"+Res.URL);
      // setUrl(url);
    });

  },[])
 
  list['URL'] = url;
  return (
          
          <div class="border border-success p-2 mb-2">
            <ul class="list-group">
              <li class="list-group-item">
                <img src={list.URL}/><br/>
                <h4>예약번호 : {list.RES_IDX}<br/>
                  주소 : {list.BOARD_ADDR}<br/>
                  이용날짜 : {list.RES_DATE_START} ~ {list.RES_DATE_END}<br/>
                  맡긴 동물 수 : {list.RES_CARE_NO}<br/>
                  결제가격 : {list.PRICE} 원
              </h4>
              </li>
            </ul>
          </div>

  )
}

export default MemUseList