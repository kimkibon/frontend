import React from 'react'


//하나의 이용내역 정보
const MemUseList = (props) => {
  const {list}=props;

  return (

          <div>
            <h4>예약번호 : {list.RES_IDX}<br/>
                주소 : {list.BOARD_ADDR}<br/>
                이용날짜 : {list.RES_DATE_START} ~ {list.RES_DATE_END}<br/>
                맡긴 동물 수 : {list.RES_CARE_NO}<br/>
                결제가격 : {list.PRICE} 원
            </h4>
          </div>

  )
}

export default MemUseList