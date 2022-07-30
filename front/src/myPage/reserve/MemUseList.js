import React, { useEffect, useState } from 'react'
import SelectOneFile from '../../commons/Files/SelectOneFile';


//하나의 이용내역 정보
const MemUseList = (props) => {
  const [uselist, setUselist] = useState(props);

  //이미지 파일 불러오기
  useEffect(() => {
    
    const url = uselist.map(async list =>{

      await SelectOneFile('0',list.RES_BOARD_NO).then(Res=>{
        list['URL'] = "data:image/;base64,"+Res.URL
      });
      return list;

    })
    console.log(url);

    Promise.all(url).then((data)=>{setUselist(data)});
  } ,[]);
  return (
          
          <div class="border border-success p-2 mb-2">
            <ul class="list-group">
              <li class="list-group-item">
                <h4>예약번호 : {uselist.RES_IDX}<br/>
                  주소 : {uselist.BOARD_ADDR}<br/>
                  이용날짜 : {uselist.RES_DATE_START} ~ {uselist.RES_DATE_END}<br/>
                  맡긴 동물 수 : {uselist.RES_CARE_NO}<br/>
                  결제가격 : {uselist.PRICE} 원
              </h4>
              </li>
            </ul>
          </div>

  )
}

export default MemUseList