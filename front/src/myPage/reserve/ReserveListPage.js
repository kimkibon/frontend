import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Payment from "./payment/Payment";

//예약상태
const ResState=(state)=>{
  switch(state){
    case 0: return '예약요청'
    case 1: return '예약승인'
    case 2: return '결제대기'
    case 3: return '결제/예약완료'
    case 4: return '예약취소'
  }

}

const mem_id = 'MEM_1';
const mem_idx = 1;

const ReserveListPage = () => {
  const [resList, setResList] = useState([]);

  useEffect(() => {
    axios({

        method : 'post' ,
        url : '/GareBnB/mypage/memReserveList.do' ,
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
            주소 : {list.ADDR1}{list.ADDR2}<br/>
            이용날짜 : {list.RES_DATE_START} ~ {list.RES_DATE_END}<br/>
            맡긴 동물 수 : {list.RES_CARE_NO}<br/>
            가격 : {list.PRICE} 원<br/>

          </div>
          <div>
          {[1,2,3].includes(resstate) && <Link to ={'hostDetail'} state={{'hostId': list.HOST_ID}}><Button variant="success" size="sm">호스트정보</Button></Link>}
          {[0,1,2].includes(resstate) && 
                              <Link to ={'resCancel'} state={{'res_idx': list.RES_IDX}}>
                                <Button variant="secondary" size="sm" active>예약취소</Button>
                              </Link>}

          
          {/* 예약요청상태 */}
          {resstate === 0 && 
            <div>
              <Button variant="outline-dark" size="sm" disabled>요청대기</Button>
              
            </div>}


          {/* 예약승인상태 */}
          {resstate === 1 && 
              <div>
                <Link to ={'resConfirm'} state={{'res_idx': list.RES_IDX}}><button>예약확정</button></Link>
              </div>
          }


          {/* 결제대기상태 */}
          {resstate === 2 && 
              <Payment price={list.PRICE} title={list.BOARD_TITLE} booker={mem_id} res_idx={list.RES_IDX}/>
          }


          {/* 예약취소상태 */}
          {resstate === 4 && (list.RES_REJ)!=null && <div><h1>예약이 취소되었습니다.</h1>
          <Button variant="warning" size="sm" onClick={()=>{alert(list.RES_REJ)}}>거절 사유 보기</Button>
          </div>}

          </div>
        </div>
        )

      })
      }

    </div>
  )
}

export default ReserveListPage