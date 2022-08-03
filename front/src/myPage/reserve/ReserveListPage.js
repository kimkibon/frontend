import axios from "axios";
import { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import Payment from "./payment/Payment";
import SelectOneFile from "../../commons/Files/SelectOneFile";
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

const ReserveListPage = () => {
  const [resList, setResList] = useState([]); //예약리스트 받아오는 변수

  //auth
  const mem_id = localStorage.getItem("MEM_ID");//로컬스토리지에서 로그인한 계정의 아이디 전달
  //const [author, setAuthor] = useState({});
  //const navigate = useNavigate();

  useEffect(() => {

    //로그인한 계정의 ID, LEVEL, IDX 가져오기
    //level 4보다 작은 계정들은 접근 가능
    //Auth(4 , navigate).then(Response => {
      //setAuthor(Response)
    
      //예약리스트가져오기
      axios({

          method : 'post' ,
          url : '/GareBnB/mypage/memReserveList.do' ,
          contentType:"application/json;charset=UTF-8",
          params : {
            MEM_ID : 'MEM_2'//mem_id//////////////////////////////////     
      
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
    if(state===0){
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
    else if(state===1){
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
    else if(state===2){
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
    else if(state===3){
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
    else if(state===4){
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
      <h1>예약내역</h1>
      {resList[0] !==undefined && resList.map((list)=>{
        
        let resstate = list.RES_LEVEL;
        return(
          <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-center row">
                <div className="col-md-10">

                  
                  {stateChange(resstate)}
                  
                  
                    <div className="row p-2 bg-white border rounded">

                        <div className="col-md-3 mt-1" mt-2 d-flex flex-column align-items-center="true" align-content-center="true">
                          <img className="img-fluid img-responsive rounded product-image" src={list.URL} width="200px" height="auto"/><p/>
                          
                          {[1,2,3].includes(resstate) && <Link to ={'hostDetail'} state={{'hostId': list.HOST_ID}}><button type="button" className="btn btn-success">호스트정보</button></Link>}

                        </div>
                        <div className="col-md-7 mt-1">
                            <h5>예약번호  {list.RES_IDX}</h5><br/>
                            주소 : {list.ADDR1}{list.ADDR2}<br/>
                            이용날짜 : {list.RES_DATE_START} ~ {list.RES_DATE_END}<br/>
                            맡긴 동물 수 : {list.RES_CARE_NO}<br/>
                            가격 : {list.PRICE} 원<br/>
                            세부 요청 사항 : {list.REQ_DETAIL}<br/>
                        </div>
                        <div className="col-md-2 border-left mt-1" align-items-center="true" align-content-center="true">
                          <div className="d-flex flex-column mt-4">
                            {[0,1,2].includes(resstate) && 
                                                <Link to ={'resCancel'} state={{'res_idx': list.RES_IDX}}>
                                                  <button type="button" className="btn btn-primary">예약취소</button>
                                                </Link>}

                            
                            {/* 예약요청상태 */}
                            {resstate === 0 && 
                              <div>
                                <button type="button" className="btn btn-outline-primary" disabled>요청대기</button>
                                
                              </div>}


                            {/* 예약승인상태 */}
                            {resstate === 1 && 
                                <div>
                                  <Link to ={'resConfirm'} state={{'res_idx': list.RES_IDX}}><button type="button" className="btn btn-primary">예약확정</button></Link>
                                </div>
                            }


                            {/* 결제대기상태 */}
                            {resstate === 2 && 
                                <Payment price={list.PRICE} title={list.BOARD_TITLE} booker={mem_id} res_idx={list.RES_IDX}/>
                            }


                            {/* 예약취소상태 */}
                            {resstate === 4 && <div>예약이 취소되었습니다.<p/></div>}
                            {resstate === 4 && (list.RES_REJ)!=null && 
                              <div>
                               <button type="button" className="btn btn-warning" onClick={()=>{alert(list.RES_REJ)}}>거절사유</button>
                              </div>}


                          </div>
                        </div>
                        
                    </div>
                    <p/>
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