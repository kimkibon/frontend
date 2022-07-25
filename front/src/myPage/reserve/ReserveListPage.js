import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledItemBoxDiv = styled.div`
  display:flex;
  justify-content:space-between;
  border:1px solid black;
  padding:10px;
  height:150px;
  margin:20px;
  align-items: center;
`;

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


const ReserveListPage = () => {
  const [resList, setResList] = useState([]);

  useEffect(() => {
    axios({

        method : 'post' ,
        url : '/GareBnB/mypage/memReserveList.do' ,
        contentType:"application/json;charset=UTF-8",
        params : {
          MEM_ID : 'MEM_1'
    
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
        <StyledItemBoxDiv>
          <div>
            예약상태 : {ResState(resstate)}<br/>
            예약번호 : {list.RES_IDX}<br/>
            주소 : {list.ADDR1}{list.ADDR2}<br/>
            이용날짜 : {list.RES_DATE_START} ~ {list.RES_DATE_END}<br/>
            맡긴 동물 수 : {list.RES_CARE_NO}<br/>
            결제할 가격 : {list.PRICE} 원<br/>
            {[2,3].includes(resstate) && <div>계좌번호: (관리자은행)123-1234567-1234</div>}
          </div>
          <div>
          {[1,2,3].includes(resstate) && <Link to ={'hostDetail'} state={{'hostId': list.HOST_ID}}><button>호스트회원정보보기</button></Link>}
          {resstate === 0 && <div><h3>요청대기</h3><Link to ={'resCancel'} state={{'res_idx': list.RES_IDX}}><button>예약취소</button></Link></div>}
          {resstate === 1 && 
              <div>
                <Link to ={'resConfirm'} state={{'res_idx': list.RES_IDX}}><button>예약확정</button></Link>
                <Link to ={'resCancel'} state={{'res_idx': list.RES_IDX}}><button>예약취소</button></Link>
              </div>
          }
          {resstate === 2 && <Link to ={'resCancel'} state={{'res_idx': list.RES_IDX}}><button>예약취소</button></Link>}
          {resstate === 4 && (list.RES_REJ)!=null && <div><h1>예약이 거절되었습니다.</h1><button onClick={()=>{alert(list.RES_REJ)}}>거절 사유 보기</button></div>}

          </div>
        </StyledItemBoxDiv>
        )

      })
      }

    </div>
  )
}

export default ReserveListPage