import axios from "axios";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';


//예약상태
const ResState=(state)=>{
  switch(state){
    case 0: return '예약요청'
    case 1: return '예약승인'
    case 2: return '결제대기'
    case 3: return '결제/예약완료'
    case 4: return '예약취소'
    case 5: return '이용완료'
  }

}

//예약승인
const resApprove=(res_idx)=>{
  axios({
    method : 'post' ,
    url : '/GareBnB/host/mypage/resApprove.do' ,
    contentType:"application/json;charset=UTF-8",
    params : {
        RES_IDX : res_idx
    }
}).then(Response => {
    window.location.href="/myPage/host/hostReserve"
})
}

const mem_id = 'MEM_13';
const mem_idx = 13;

const HostReserveList = () => {
  const [resList, setResList] = useState([]);

  useEffect(() => {
    axios({

        method : 'post' ,
        url : '/GareBnB/host/mypage/resList.do' ,
        contentType:"application/json;charset=UTF-8",
        params : {
          MEM_ID : mem_id
        }
    }).then(Response => {
        //console.log(Response.data); 
        setResList(Response.data);
    });
  } ,[]);
  
  return (
    <div>
      <h1>예약 내역</h1>
      {resList[0] !==undefined && resList.map((list)=>{
        
        let resstate = list.RES_LEVEL;

        return(
        <div>
          <div>
            예약상태 : {ResState(resstate)}<br/>
            예약번호 : {list.RES_IDX}<br/>
            게시글제목 : {list.BOARD_TITLE}<br/>
            게시글 사진 : <br/>
            예약자이름 : {list.MEM_NAME}<br/>
            예약자전화번호 : {list.MEM_PHONE}<br/>
            이용날짜 : {list.RES_DATE_START} ~ {list.RES_DATE_END}<br/>
            맡긴 동물 수 : {list.RES_CARE_NO}<br/>
            가격 : {list.PRICE} 원<br/>

          </div>
          <p/>


          {/* 예약요청상태 */}
          {resstate === 0 && 
          <div>
            <Button variant="outline-dark" size="sm" 
              onClick={()=>{resApprove(list.RES_IDX)}}>예약승인</Button>
            <Button variant="outline-dark" size="sm" disabled>예약거절</Button>
          </div>}


          {/* 예약승인상태 *//* 결제대기상태 *//* 결제/예약완료상태 */}
          {[1,2,3,4].includes(resstate) && <button>신고하기</button>}


          {/* 예약취소상태 */}
          {resstate === 4 && (list.RES_REJ)!=null && <div><h1>예약이 취소되었습니다.</h1>
          </div>}

        </div>

        )

      })
      }

    </div>
  )
}

export default HostReserveList