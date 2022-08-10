import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import SelectFileList from '../../commons/Files/SelectFileList';
import BoardReview from './BoardReview';
import Review from './boardDetailComponent/Review';
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/dropdown'
import Carousel from 'react-bootstrap/Carousel';
import ResRequest from './ResRequest';
import Detail from './boardDetailComponent/Detail';
import Refuse from './boardDetailComponent/Refuse';
import BoardDelete from './boardDetailComponent/BoardDelete';
import ConfirmBoard from './boardDetailComponent/ConfirmBoard';
import resDate from './boardDetailComponent/resDate';
import Auth from '../../login/Auth';


const BoardDetail = () => {

  const [boardDetail, setBoardDetail] = useState([]);
  const [file, setFile] = useState([]);
  const [review, setReview] = useState([]);
  const [host, setHost] = useState([]);
  const [resDates, setResDates] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [refuseModal, setRefuseModal] = React.useState(false);
  const [confirmModal, setConfirmModal] = React.useState(false);
  const [author, setAuthor] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  let param

  if (location.state === null) {
    //리스트에서 받아온 정보가 없을 경우 (url을 직접 입력해서 들어온 경우 리턴. auth 로 대체)
  } else {
    param = {
      'BOARD_NO': location.state.BOARD_NO,
      'BOARD_MODIFY_NO': location.state.BOARD_MODIFY_NO
    }
  }
  const state = {
    'RES_CLI_ID': localStorage.getItem("MEM_ID"),
    'RES_CARE_NO': boardDetail.BOARD_CARE_NO,
    'RES_REQ_DETAIL': '',
    'RES_BOARD_NO': boardDetail.BOARD_NO,
    'RES_HOST_ID': boardDetail.BOARD_HOST_ID,
    'RES_PRICE': boardDetail.BOARD_PRICE,
    'RES_BOARD_ADDR1': boardDetail.BOARD_ADDR1,
    'RES_BOARD_ADDR2': boardDetail.BOARD_ADDR2,
    'RES_BOARD_TITLE': boardDetail.BOARD_TITLE,
    'RES_HOST_PHONE': host.MEM_PHONE,
    'RES_HOST_NAME': host.MEM_NAME
  }
  //resRequest 컴포넌트로 전달할 정보 초기화 밑 저장. 

  useEffect(() => {

    Auth(4, navigate).then(Response => {
      // 탈퇴한 회원, 정지된 회원인 경우 권한 없음 표시
      setAuthor(Response)

      // cli mem_idx를 저장 
      axios({
        method: 'post',
        url: '/GareBnB/board/boardDetail.do',
        params: {
          'BOARD_NO': param.BOARD_NO,
          'BOARD_MODIFY_NO': param.BOARD_MODIFY_NO
        }
      }).then(Response => {
        setBoardDetail(Response.data);
      });
      //리스트에서 보드 넘버를 받아와서 보드디테일에 대한 기본 정보를 저장. 

      BoardReview(param.BOARD_NO).then(Response => {
        setReview(Response);
      }); //리뷰 정보를 받아와서 저장.

      SelectFileList('0', param.BOARD_NO, param.BOARD_MODIFY_NO).then(Response => {
        Response.map((base64) => {
          base64.URL = "data:image/;base64," + base64.URL //바이너리 변환된 이미지를 출력하기 위해 주석을 달아줌
        })
        Response.sort(function (a, b) {
          return a.FILE_LEVEL - b.FILE_LEVEL
        })
        setFile(Response);
      });
      //서버에서 파일을 받아와서 파일 레벨 순서로 정렬하고 저장
      Detail(param.BOARD_NO, param.BOARD_MODIFY_NO).then(Response => {
        setHost(Response);
      })
      //서버에서 호스트의 전화번호를 리턴받음. 

      resDate(param.BOARD_NO).then(Response => {
        setResDates(Response);
      })
      // 서버에서 예약 내역 시간을 리턴 받음
    }).catch(err => {

    })

  }, []) // param이 바뀔 때 마다 실행되도록 설정해서 무의미한 재실행을 막음. 
  return (
    <>

      <div className="container">


        <section className="row">
          <div className="container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-top">
              <div className="col-md-6">

                <Carousel>
                  {file.map(url => {
                    return (
                      <Carousel.Item key={url.FILE_LEVEL}>
                        <img
                          className="d-block w-100"
                          src={url.URL}
                          width='700px'
                          height='400px'
                          alt=""
                        />
                        {/* fileList 에서 받아온 정보를 표시.  */}
                      </Carousel.Item>
                    )
                  })}
                </Carousel>
                {/* 캐러셀 */}
              </div>

              <div className="col-md-6 text-end">
                <h1 className=" display-5 fw-bolder">{boardDetail.BOARD_TITLE}</h1>
                <div className="small mb-1">{boardDetail.BOARD_ADDR1} {boardDetail.BOARD_ADDR2}</div>
                <div className="fs-5 mb-5">
                  <span>{boardDetail.BOARD_PRICE}원/1일 [가격]</span>
                  <br />
                  <span>최대 {boardDetail.BOARD_CARE_NO} 마리</span>
                </div>
                <h5 className="text-start m-2 p-2">{boardDetail.BOARD_CONTENT}</h5>
                <div className="fs-5 mb-5 ">
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className='float-end d-inline-flex row'>
          <div className='btn-group'>
            {/* 클라이언트 예약 */}
            <>
              {((boardDetail.BOARD_HOST_ID !== localStorage.getItem('MEM_ID') && (boardDetail.BOARD_CONFIRM === 1))) &&
                <button className="btn btn-success" type="button" onClick={() => setModalShow(true)}>
                  예약하기
                </button>
              }
            </>
            {/* 모달창 온오프 */}

            {/* 호스트 게시글 수정 */}
            {(boardDetail.BOARD_HOST_ID === localStorage.getItem('MEM_ID') && (author.MEM_LEVEL <= 1)) &&

              <Link
                to='/myPage/host/hostBoardModify'
                state={{ 'boardDetail': boardDetail, 'file': file }}
                className='btn btn-info'
              >
                수정하기
              </Link>
            }

            {/* 게시글 수정 링크 */}

            {/* 어드민 확인 */}
            {((author.MEM_LEVEL === 0) && (author.MEM_LEVEL !== undefined) && (boardDetail.BOARD_CONFIRM !== 1)) &&
              <>
                <button className="btn btn-danger" type="button" onClick={() => setRefuseModal(true)}>
                  등록 거절
                </button>
                <button className="btn btn-primary" type="button" onClick={() => setConfirmModal(true)}>
                  등록 승인
                </button>
              </>
            }

            {/* 게시글 삭제 버튼 */}

            {((author.MEM_LEVEL === 0) || (localStorage.getItem('MEM_ID') === boardDetail.BOARD_HOST_ID)) &&
              <>
                <button className="btn btn-danger" type="button" onClick={() => setDeleteModal(true)}>
                  게시글 삭제
                </button>
              </>
            }
          </div>
        </div>
        {/* 테스트 코드 입니다.  */}
        {/* <div className='col-sm-6'>
          <Link to='/myPage/host/hostBoardModify' state={{ 'boardDetail': boardDetail, 'file': file }}>
            <button className="btn btn-outline-dark" type="button">
              수정하기
            </button>
          </Link>

          <button className="btn btn-danger" type="button" onClick={() => setDeleteModal(true)}>
            게시글 삭제
          </button>
          <button className="btn btn-danger" type="button" onClick={() => setRefuseModal(true)}>
            등록 거절
          </button>

          <button className="btn btn-primary" type="button" onClick={() => setConfirmModal(true)}>
            등록 승인
          </button>
        </div> */}
        {/* 여기까지 테스트 코드 입니다. */}

        <ResRequest
          show={modalShow}
          onHide={() => setModalShow(false)}
          state={{ 'resData': state, 'resDate': resDates }}
        />
        {/* 예약창을 모달로 띄움. */}

        <BoardDelete
          show={deleteModal}
          onHide={() => setDeleteModal(false)}
          state={param}
        />
        {/* 삭제 버튼 모달창 */}

        <ConfirmBoard
          show={confirmModal}
          onHide={() => setConfirmModal(false)}
          state={param}
        />
        {/* 등록 승인 모달창 */}

        <Refuse
          show={refuseModal}
          onHide={() => setRefuseModal(false)}
          state={param}
        />
        {/* 등록 거절 모달창 */}


        <div className='row'>
          <div className="col">
            <h2 className="fw-bolder mb-4">Reviews</h2>
          </div>
        </div>
        <Review prop={review} auth={author} />
        {/* 리뷰 리스트 출력 */}
      </div>
    </>
  )
}

export default BoardDetail