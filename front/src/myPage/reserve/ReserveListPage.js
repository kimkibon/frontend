import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Payment from "./payment/Payment";
import SelectOneFile from "../../commons/Files/SelectOneFile";
import Auth from "../../login/Auth";
import './resstyle.css'

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

//const mem_id = 'MEM_2';
//const mem_idx = 2;

const ReserveListPage = () => {
  const [resList, setResList] = useState([]); //예약리스트 받아오는 변수

  //auth
  const [author, setAuthor] = useState({});
  const navigate = useNavigate();

  useEffect(() => {

    //로그인한 계정의 ID, LEVEL, IDX 가져오기
    //level 4보다 작은 계정들은 접근 가능
    //Auth(4 , navigate).then(Response => {
    //  setAuthor(Response)

      //예약리스트가져오기
      axios({

          method : 'post' ,
          url : '/GareBnB/mypage/memReserveList.do' ,
          contentType:"application/json;charset=UTF-8",
          params : {
            MEM_ID : 'MEM_2'//localStorage.getItem('MEM_ID')     //로컬스토리지에서 로그인한 계정의 아이디 전달
      
          }
      }).then(Response => {
          const url = Response.data.map(async list =>{
            
            //예약-게시글 메인 이미지 가져오기
            await SelectOneFile('0',list.RES_BOARD_NO,list.RES_BOARD_MODIFY_NO).then(Res=>{
              list['URL'] = "data:image/;base64,"+Res.URL
            });
            return list;
          })
          //console.log(url);

          Promise.all(url).then((data)=>{setResList(data)}); 
          //setResList(Response.data);
  
        });

    //})//auth
  } ,[]);


  //getElementId 사용 또는 ref 사용 반드시!중복 너무 많아
  const stateChange=(state)=>{
    if(state==0){
      return(
        <div class="stepper-wrapper">
        <div class="stepper-item completed">
          <div class="step-counter">1</div>
          <div class="step-name">예약요청</div>
        </div>
        <div class="stepper-item active">
          <div class="step-counter">2</div>
          <div class="step-name">예약승인</div>
        </div>
        <div class="stepper-item">
          <div class="step-counter">3</div>
          <div class="step-name">결제대기</div>
        </div>
        <div class="stepper-item">
          <div class="step-counter">4</div>
          <div class="step-name">결제/예약완료</div>
        </div>
      </div>       
      )
    }
    else if(state==1){
      return(
        <div class="stepper-wrapper">
        <div class="stepper-item completed">
          <div class="step-counter">1</div>
          <div class="step-name">예약요청</div>
        </div>
        <div class="stepper-item completed">
          <div class="step-counter">2</div>
          <div class="step-name">예약승인</div>
        </div>
        <div class="stepper-item active">
          <div class="step-counter">3</div>
          <div class="step-name">결제대기</div>
        </div>
        <div class="stepper-item">
          <div class="step-counter">4</div>
          <div class="step-name">결제/예약완료</div>
        </div>
      </div>        
      )
    }
    else if(state==2){
      return(
        <div class="stepper-wrapper">
        <div class="stepper-item completed">
          <div class="step-counter">1</div>
          <div class="step-name">예약요청</div>
        </div>
        <div class="stepper-item completed">
          <div class="step-counter">2</div>
          <div class="step-name">예약승인</div>
        </div>
        <div class="stepper-item completed">
          <div class="step-counter">3</div>
          <div class="step-name">결제대기</div>
        </div>
        <div class="stepper-item active">
          <div class="step-counter">4</div>
          <div class="step-name">결제/예약완료</div>
        </div>
      </div>        
      )
    }
    else if(state==3){
      return(
        <div class="stepper-wrapper">
        <div class="stepper-item completed">
          <div class="step-counter">1</div>
          <div class="step-name">예약요청</div>
        </div>
        <div class="stepper-item completed">
          <div class="step-counter">2</div>
          <div class="step-name">예약승인</div>
        </div>
        <div class="stepper-item completed">
          <div class="step-counter">3</div>
          <div class="step-name">결제대기</div>
        </div>
        <div class="stepper-item completed">
          <div class="step-counter">4</div>
          <div class="step-name">결제/예약완료</div>
        </div>
      </div>        
      )
    }
    else if(state==4){
      return(
        <div class="stepper-wrapper">
        <div class="stepper-item">
          <div class="step-counter">1</div>
          <div class="step-name">예약요청</div>
        </div>
        <div class="stepper-item">
          <div class="step-counter">2</div>
          <div class="step-name">예약승인</div>
        </div>
        <div class="stepper-item">
          <div class="step-counter">3</div>
          <div class="step-name">결제대기</div>
        </div>
        <div class="stepper-item">
          <div class="step-counter">4</div>
          <div class="step-name">결제/예약완료</div>
        </div>
      </div>        
      )
    }

  }


  return (
    <div>
      <h1>예약 내역</h1>
      {resList[0] !==undefined && resList.map((list)=>{
        
        let resstate = list.RES_LEVEL;
        return(
          <div class="container mt-5 mb-5">
            <div class="d-flex justify-content-center row">
                <div class="col-md-10">

                  
                  {stateChange(resstate)}
                  
                  
                    <div class="row p-2 bg-white border rounded">

                        <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" src={list.URL}/><p/>
                          {resstate === 4 && (list.RES_REJ)!=null && 
                              <div>
                               <button type="button" class="btn btn-warning" onClick={()=>{alert(list.RES_REJ)}}>거절사유보기</button>
                              </div>}
                          {[1,2,3].includes(resstate) && <Link to ={'hostDetail'} state={{'hostId': list.HOST_ID}}><button type="button" class="btn btn-success">호스트정보</button></Link>}

                        </div>
                        <div class="col-md-7 mt-1">
                        예약상태 : {ResState(resstate)}<br/>
                            <h5>예약번호  {list.RES_IDX}</h5>
                            주소 : {list.ADDR1}{list.ADDR2}<br/>
                            이용날짜 : {list.RES_DATE_START} ~ {list.RES_DATE_END}<br/>
                            맡긴 동물 수 : {list.RES_CARE_NO}<br/>
                            가격 : {list.PRICE} 원<br/>
                        </div>
                        <div class="align-items-center align-content-center col-md-2 border-left mt-1">
                          <div class="d-flex flex-column mt-4">
                            {[0,1,2].includes(resstate) && 
                                                <Link to ={'resCancel'} state={{'res_idx': list.RES_IDX}}>
                                                  <button type="button" class="btn btn-primary">예약취소</button>
                                                </Link>}

                            
                            {/* 예약요청상태 */}
                            {resstate === 0 && 
                              <div>
                                <button type="button" class="btn btn-outline-primary" disabled>요청대기</button>
                                
                              </div>}


                            {/* 예약승인상태 */}
                            {resstate === 1 && 
                                <div>
                                  <Link to ={'resConfirm'} state={{'res_idx': list.RES_IDX}}><button type="button" class="btn btn-primary">예약확정</button></Link>
                                </div>
                            }


                            {/* 결제대기상태 */}
                            {/* {resstate === 2 && 
                                <Payment price={list.PRICE} title={list.BOARD_TITLE} booker={localStorage.getItem('MEM_ID')} res_idx={list.RES_IDX}/>
                            } */}


                            {/* 예약취소상태 */}
                            {resstate === 4 && <div>예약이 취소되었습니다.<p/>
                            </div>}

                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
        
        )

      })
      }

    </div>
  )
}

export default ReserveListPage