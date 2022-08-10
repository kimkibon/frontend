import axios from "axios";
import { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import Payment from "./payment/Payment";
import SelectOneFile from "../../commons/Files/SelectOneFile";
import './resstyle.css'
import HostDetailModal from "./Modals/HostDetailModal";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ReserveCancel from "./ResCancel";


//예약상태
// const ResState = (state) => {
//   switch (state) {
//     case 0: return '예약요청'
//     case 1: return '예약승인'
//     case 2: return '결제대기'
//     case 3: return '결제/예약완료'
//     case 4: return '예약취소'
//   }

// }

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

      method: 'post',
      url: '/GareBnB/mypage/memReserveList.do',
      contentType: "application/json;charset=UTF-8",
      params: {
        MEM_ID: mem_id//////////////////////////////////     

      }
    }).then(Response => {
      const url = Response.data.map(async list => {

        //예약-게시글 메인 이미지 가져오기
        await SelectOneFile('0', list.RES_BOARD_NO, list.RES_BOARD_MODIFY_NO).then(Res => {
          list['URL'] = "data:image/;base64," + Res.URL
        });
        return list;
      })

      Promise.all(url).then((data) => { setResList(data) });
      //setResList(Response.data);

    });

    //})//auth
  }, []);


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
      <div className="stepper-wrapper">
        <div className={a}>
          <div className="step-counter">1</div>
          <div className="step-name">예약요청</div>
        </div>
        <div className={b}>
          <div className="step-counter">2</div>
          <div className="step-name">예약승인</div>
        </div>
        <div className={c}>
          <div className="step-counter">3</div>
          <div className="step-name">결제대기</div>
        </div>
        <div className={d}>
          <div className="step-counter">4</div>
          <div className="step-name">결제/예약완료</div>
        </div>
      </div>
    )
  }


//////////모달!!!!!!!!!!!!!!!!!!!!
//////////////hostid 셋팅
  const [modalShow, setModalShow] = useState(false);
  const [cancelmodalShow, setCancelmodalShow] = useState(false);

  const [hostt, setHostt] = useState();

  const hostModal=(host)=>{
    setHostt(host);
    setModalShow(true);

  }

  
  return (
    <div>
    <div className="container">
      <hr/>
        <h3>예약내역</h3>
      <hr/>

      <HostDetailModal show={modalShow} onHide={() => setModalShow(false)} state={{ 'hostId': hostt }}/>


      {resList[0] !== undefined ? resList.map((list,index) => {
        let resstate = list.RES_LEVEL;
        return (
          <div className="container mt-5 mb-5" key={index}>
      
            <div className="d-flex justify-content-center row">
              <div className="col-md-10">

                {stateChange(resstate)}


                <div className="row p-2 bg-white border rounded align-items-center">

                  <div className="col-md-3 mt-1 mt-2 d-flex flex-column align-items-center align-content-center">
                  <Link to='/board/detail' state={{ 'BOARD_NO': list.RES_BOARD_NO,'BOARD_MODIFY_NO':list.RES_BOARD_MODIFY_NO }}>
                    <img className="img-fluid img-responsive rounded product-image" src={list.URL} width="200px" height="auto" /><p />
                  </Link>
                    
                    {[1, 2, 3].includes(resstate) && 
                      <button 
                      type="button" 
                      className="btn btn-warning" 
                      onClick={() => hostModal(list.HOST_ID)}
                      >
                        호스트정보
                      </button>
                      }                  
                  
                  </div>


                  <div className="col-md-7 mt-1">
                    예약번호 {list.RES_IDX}<br/>

                      <h4>{list.BOARD_TITLE}</h4><br/>
                    
                    <table>                  
                        <tr>
                          <td width={30+'%'}>주소</td>
                          <td>{list.ADDR1}{list.ADDR2}</td>

                        </tr>
                        <tr>
                          <td>이용날짜</td>
                          <td>{list.RES_DATE_START} ~ {list.RES_DATE_END}</td>
                        </tr>
                        <tr>
                          <td>동물 수</td>
                          <td>{list.RES_CARE_NO}</td>
                        </tr>
                        <tr>
                          <td>가격</td>
                          <td>{list.PRICE} 원</td>
                        </tr>
                        <tr>
                          <td>요청사항</td>
                          <td>{list.REQ_DETAIL}</td>
                        </tr>
                      
                    </table>
                  </div>
                  <div className="align-items-center align-content-center col-md-2">
                    <div className="d-flex flex-column mt-4">

                      {/* 예약승인상태 */}
                      {resstate === 1 &&
                        <div>
                          <Link to={'resConfirm'} state={{ 'res_idx': list.RES_IDX }}><button type="button" className="btn btn-primary m-1">예약확정</button></Link>
                        </div>
                      }


                      {/* 예약요청상태 */}
                      {resstate === 0 &&
                        <div>
                          <button type="button" className="btn btn-outline-primary m-1" disabled>요청대기</button>
                        </div>}   



                      {[0, 1, 2].includes(resstate) &&
                      <div>
                        {/* 모달 */}
                        <ReserveCancel show={cancelmodalShow} onHide={() => setCancelmodalShow(false)} state={{ 'RES_IDX': list.RES_IDX }}/>
                        <button type="button" className="btn btn-secondary m-1" onClick={()=>{setCancelmodalShow(true)}}>예약취소</button>
                      </div>}
                        
         

                      {/* 결제대기상태 */}
                      {resstate === 2 &&
                        <Payment price={list.PRICE} title={list.BOARD_TITLE} booker={mem_id} res_idx={list.RES_IDX} />
                      }

                      

                      {/* 예약취소상태 */}
                      {resstate === 4 && <div>예약이 취소되었습니다.<p /></div>}
                      {resstate === 4 && (list.RES_REJ) != null &&
                      
                        <OverlayTrigger trigger="click" placement="bottom"
                        overlay={
                          <Popover id='popover-positioned-bottom'>
                            <Popover.Header as="h3">{list.HOST_ID}</Popover.Header>
                            <Popover.Body>
                              {list.RES_REJ}
                            </Popover.Body>
                          </Popover>
                        }>
                          <button type="button" className="btn btn-warning m-1">거절사유</button>
                      </OverlayTrigger>}
                        
                    </div>
                  </div>

                </div>
                <p />
              </div>
            </div>
          </div>

        )

      })
      : <div className="mt-5 mb-5 d-flex justify-content-center"><h4>예약내역이 없습니다.</h4></div>
      }
      </div>
    </div>
  )
}

export default ReserveListPage