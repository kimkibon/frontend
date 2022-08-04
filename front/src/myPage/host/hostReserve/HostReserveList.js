import axios from "axios";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import SelectOneFile from "../../../commons/Files/SelectOneFile";


//예약상태
// const ResState=(state)=>{
//   switch(state){
//     case 0: return '예약요청'
//     case 1: return '예약승인'
//     case 2: return '결제대기'
//     case 3: return '결제/예약완료'
//     case 4: return '예약취소'
//     case 5: return '이용완료'
//   }

// }

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


const HostReserveList = () => {
  const [resList, setResList] = useState([]);
  const mem_id = localStorage.getItem("MEM_ID");

  useEffect(() => {

    //호스트의 예약리스트 select
    axios({

        method : 'post' ,
        url : '/GareBnB/host/mypage/resList.do' ,
        contentType:"application/json;charset=UTF-8",
        params : {
          MEM_ID : mem_id
        }
    }).then(Response => {
      
      //파일 불러오기
        const url = Response.data.map(async list =>{

          await SelectOneFile('0',list.RES_BOARD_NO,list.RES_BOARD_MODIFY_NO).then(Res=>{
            list['URL'] = "data:image/;base64,"+Res.URL
          });
          return list;
        })
        Promise.all(url).then((data)=>{setResList(data)}); 
    });
  } ,[]);
  

  //거절사유입력
  const reject=(rej_content,res_idx)=>{
    axios({

      method : 'post' ,
      url : '/GareBnB/host/mypage/resRejectPut.do' ,
      contentType:"application/json;charset=UTF-8",
      params : {
        RES_REJ : rej_content,
        RES_IDX : res_idx
      }
  }).then(Response => {
      window.location.href="/myPage/host/hostReserve"
  });
  }



  //예약 상태에 따른 step bar 변화
  const stateChange = (state) => {
    let a, b, c, d

    switch (state) {
      case 0:
        a = 'stepper-item completed'
        b = 'stepper-item active'
        c = 'stepper-item'
        d = 'stepper-item'
        break;
      case 1:
        a = 'stepper-item completed'
        b = 'stepper-item completed'
        c = 'stepper-item active'
        d = 'stepper-item'
        break;
      case 2:
        a = 'stepper-item completed'
        b = 'stepper-item completed'
        c = 'stepper-item completed'
        d = 'stepper-item active'
        break;
      case 3:
        a = 'stepper-item completed'
        b = 'stepper-item completed'
        c = 'stepper-item completed'
        d = 'stepper-item completed'
        break;
      case 4:
        a = 'stepper-item'
        b = 'stepper-item'
        c = 'stepper-item'
        d = 'stepper-item'
        break;

      default:
        break;
    }

    return (
      <div class="stepper-wrapper">
        <div class={a}>
          <div class="step-counter">1</div>
          <div class="step-name">예약요청</div>
        </div>
        <div class={b}>
          <div class="step-counter">2</div>
          <div class="step-name">예약승인</div>
        </div>
        <div class={c}>
          <div class="step-counter">3</div>
          <div class="step-name">결제대기</div>
        </div>
        <div class={d}>
          <div class="step-counter">4</div>
          <div class="step-name">결제/예약완료</div>
        </div>
      </div>
    )
  }



  return (
    <div>
      <h1>예약내역</h1>
      {resList[0] !==undefined && resList.map((list)=>{
        
        let resstate = list.RES_LEVEL;

        return(
          <div class="container mt-5 mb-5">
            <div class="d-flex justify-content-center row">
                <div class="col-md-10">

                  {stateChange(resstate)}

                  <div class="row p-2 bg-white border rounded">
                    <div class="col-md-3 mt-2 d-flex flex-column align-items-center align-content-center">
                      <img class="img-fluid img-responsive rounded product-image" src={list.URL} width="200px" height="auto"/>
                    </div>  

                    <div class="col-md-7 mt-1">
                    <h5>예약번호 : {list.RES_IDX}</h5><br/>
                      게시글제목 : {list.BOARD_TITLE}<br/>
                      예약자이름 : {list.MEM_NAME}<br/>
                      예약자전화번호 : {list.MEM_PHONE}<br/>
                      이용날짜 : {list.RES_DATE_START} ~ {list.RES_DATE_END}<br/>
                      맡긴 동물 수 : {list.RES_CARE_NO}<br/>
                      가격 : {list.PRICE} 원<br/>
                      세부 요청 사항 : {list.RES_REQ_DETAIL}<br/>
                    </div>
                    
                    <div class="align-items-center align-content-center col-md-2 border-left mt-1">
                        <div class="d-flex flex-column mt-4">
                          {/* 예약요청상태 */}
                          {resstate === 0 && 
                          <div>
                            <button type="button" class="btn btn-primary" 
                              onClick={()=>{resApprove(list.RES_IDX)}}>예약승인</button><p/>
                            <button type="button" class="btn btn-primary" 
                            onClick={()=>{
                              const rej = prompt("거절 메세지를 입력하세요");
                              reject(rej, list.RES_IDX);
                            }}>예약거절</button>
                          </div>}


                          {/* 예약취소상태 */}
                          {resstate === 4 && <div>예약이 취소되었습니다.<p/></div>}


                          {/* 예약승인상태 *//* 결제대기상태 *//* 결제/예약완료상태 */}
                          {[1,2,3,4].includes(resstate) && 
                            <Link to ={'HostInsertReport'} 
                            state={{'REPORT_ID': mem_id, 'REPORT_RES_NO': list.RES_IDX,'REPORT_MEM_IDX':list.RES_CLI_ID}}>
                              <button class="btn btn-danger">신고하기</button>
                            </Link>
                          }


                         
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

export default HostReserveList