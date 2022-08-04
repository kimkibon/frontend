import React, { useEffect, useState } from 'react'
import SelectOneFile from '../../commons/Files/SelectOneFile';


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
      <div class="col-md-3 mt-2 d-flex flex-column align-items-center align-content-center">
        <img src={list.URL} width="200px" height="auto"/><p/>
      </div>
      <div class="col-md-7 mt-1 align-items-center align-content-center">
                  예약번호 {list.RES_IDX}<br/>
                  <h4>{list.BOARD_TITLE}</h4><br/>
                    <table>                  
                        <tr>
                          <td>주소</td>
                          <td>{list.ADDR1}{list.ADDR2}</td>

                        </tr>
                        <tr>
                          <td>이용날짜</td>
                          <td>{list.RES_DATE_START} ~ {list.RES_DATE_END}</td>
                        </tr>
                        <tr>
                          <td>맡긴 동물 수</td>
                          <td>{list.RES_CARE_NO}</td>
                        </tr>
                        <tr>
                          <td>결제금액</td>
                          <td>{list.PRICE} 원</td>
                        </tr>
                        <tr>
                          <td>세부 요청 사항</td>
                          <td>{list.REQ_DETAIL}</td>
                        </tr>
                      
                    </table>          
      </div>
    </>
  )
}

export default MemUseList