import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import SelectFileList from '../../commons/Files/SelectFileList';
import BoardReview from './BoardReview';
import Review from './boardDetailComponent/Review';
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/dropdown'
import Carousel from 'react-bootstrap/Carousel';
import ResRequest from './ResRequest';
import Detail from './boardDetailComponent/Detail';


const BoardDetail = () => {

  const [boardDetail, setBoardDetail] = useState([]);
  const [file, setFile] = useState([]);
  const [review, setReview] = useState([]);
  const [host, setHost] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  const location = useLocation();

  let param

  if (location.state === null) {
    //리스트에서 받아온 정보가 없을 경우 (url을 직접 입력해서 들어온 경우 리턴. auth 로 대체)
  } else {
    param = location.state.BOARD_NO;
  }
  console.log('로드')
  const state = {
    'RES_CLI_ID': '',
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
    axios({
      method: 'post',
      url: '/GareBnB/board/boardDetail.do',
      params: {
        'BOARD_NO': param
      }
    }).then(Response => {
      setBoardDetail(Response.data);
    });
    //리스트에서 보드 넘버를 받아와서 보드디테일에 대한 기본 정보를 저장. 

    BoardReview(param).then(Response => {
      setReview(Response);
    }); //리뷰 정보를 받아와서 저장.

    SelectFileList('0', param).then(Response => {
      Response.map(base64 => {
        base64.URL = "data:image/;base64," + base64.URL //바이너리 변환된 이미지를 출력하기 위해 주석을 달아줌
      })
      Response.sort(function (a, b) {
        return a.FILE_LEVEL - b.FILE_LEVEL
      })
      setFile(Response);
    });
    //서버에서 파일을 받아와서 파일 레벨 순서로 정렬하고 저장
    Detail(param).then(Response => {
      setHost(Response);
    })
    //서버에서 호스트의 전화번호를 리턴받음. 
  }, [param]) // param이 바뀔 때 마다 실행되도록 설정해서 무의미한 재실행을 막음. 
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
                <h1 className=" display-5 fw-bolder">{boardDetail.BOARD_TITLE} 제목</h1>
                <div className="small mb-1">{boardDetail.BOARD_ADDR1}-{boardDetail.BOARD_ADDR2} [주소]</div>
                <div className="fs-5 mb-5">
                  <span>{boardDetail.BOARD_PRICE}원/1일 [가격]</span>
                  <br />
                  <span>최대 {boardDetail.BOARD_CARE_NO} 마리</span>
                </div>
                <p className="text-start lead">{boardDetail.BOARD_CONTENT}컨텐츠</p>
                <div className="fs-5 mb-5 ">
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className='row align-items-end'>
                  
          <div className='col-lg col-sm-12 text-lg-end text-center'>
            <button className="btn btn-outline-dark" type="button" onClick={() => setModalShow(true)}>
              <i className="bi-cart-fill me-1"></i>
              예약하기
            </button>
            {/* 모달창 온오프 */}
          </div>

        </div>

        <ResRequest
          show={modalShow}
          onHide={() => setModalShow(false)}
          state={state}
        />

        {/* 예약창을 모달로 띄움. */}

        <div className="row">
          <Review prop={review} />
        </div>
        {/* 리뷰 리스트 출력 */}
      </div>
    </>
  )
}

export default BoardDetail