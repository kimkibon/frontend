import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import SelectFileList from '../../commons/Files/SelectFileList';
import BoardReview from './BoardReview';
import DatePicker from '../../commons/datePicker/DatePicker';
import Review from './boardDetailComponent/Review';
import 'bootstrap/js/dist/carousel'
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/dropdown'

const BoardDetail = () => {

  const [boardDetail, setBoardDetail] = useState([]);
  const [file, setFile] = useState([]);
  const [review, setReview] = useState([]);
  const [care, setCare] = useState();

  const [resDate, setResDate] = useState(
    {
      RES_START_DATE: new Date().toISOString().split("T", 1)[0],
      RES_END_DATE: new Date().toISOString().split("T", 1)[0]
    }
  );

  const location = useLocation();
  let param

  if (location.state === null) {
    // window.history.back();
  } else {
    param = location.state.BOARD_NO;
  }

  const highFunction = (res) => {
    console.log(res);
    setResDate(res);
  }



  useEffect(() => {
    axios({
      method: 'post',
      url: '/GareBnB/board/boardDetail.do',
      params: {
        'BOARD_NO': param
      }
    }).then(Response => {
      console.log(Response.data)
      setBoardDetail(Response.data);
    });

    BoardReview(param).then(Response => {
      setReview(Response);
      console.log(Response);
    });

    SelectFileList('0', param).then(Response => {
      Response.map(base64 => {
        base64.URL = "data:image/;base64," + base64.URL
      })
      Response.sort(function (a, b) {
        return a.FILE_LEVEL - b.FILE_LEVEL
      })
      setFile(Response);
      console.log(Response);
    });
  }, [param])

  useEffect(() => {
    console.log(care);
  }, [care])



  return (
    <>

      <div className="container">


        <section className="row border border-primary">
          <div className="container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-top">
              <div className="col-md-6">

                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  </div>
                  <div className="carousel-inner">
                   
                    <div className="carousel-item active">
                      <img src="https://via.placeholder.com/700x300" width='700px' height='400px' className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item active">
                      <img src="https://via.placeholder.com/700x300" width='700px' height='400px' className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item active">
                      <img src="https://via.placeholder.com/700x300" width='700px' height='400px' className="d-block w-100" alt="..." />
                    </div>
                    
                     {/* 파일 맵으로 반복하기 */}
                    {file.map(url=>{return(
                    <div className="carousel-item">
                      <img key={url.FILE_LEVEL} src={url.URL} width='700px' height='400px' className="d-block w-100" alt="..." />
                    </div>
                    )})}
                    {/* 여기까지 파일 맵 */}
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>

              </div>

              <div className="col-md-6 text-end">
                <h1 className=" display-5 fw-bolder">{boardDetail.BOARD_TITLE} 제목</h1>
                <div className="small mb-1">{boardDetail.BOARD_ADDR1}-{boardDetail.BOARD_ADDR2} [주소]</div>
                <div className="fs-5 mb-5">
                  <span>{boardDetail.BOARDPRICE}원/1일 [가격]</span>
                  <br />
                  <span>최대 {boardDetail.BOARD_CARE_NO} 마리</span>
                </div>
                <p className="text-start lead">{boardDetail.BOARD_CONTENT}컨텐츠</p>
                <div className="d-flex">

                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 예약창을 모달로 띄워야하나? */}
        <div className="row border border-primary p-2 bg-light justify-content-md-center ">
          <div className="col-xxl-8 themed-grid-col">
            <button className="btn btn-outline-dark" type="button" data-bs-toggle="modal" data-bs-target="#dateModal">
              {resDate.RES_START_DATE}
            </button>
            <button className="btn btn-outline-dark" type="button" data-bs-toggle="modal" data-bs-target="#dateModal">
              {resDate.RES_END_DATE}
            </button>
            <input className='btn btn-outline-dark' onChange={(event) => setCare(event.target.value)} type='number' min='1' max={boardDetail.BOARD_CARE_NO} />
            <Link to="/board/res" state={{
              'RES_CARE_NO': care,
              'RES_START_DATE': resDate.RES_START_DATE,
              'RES_END_DATE': resDate.RES_END_DATE,
              'RES_REQ_DETAIL': '',
              'RES_BOARD_NO': boardDetail.BOARD_NO,
              'MEM_ID': boardDetail.HOST_ID,
              'RES_PRICE': boardDetail.BOARD_PRICE,
              'RES_DATE_RANGE': resDate.RES_DATE_RANGE,
              'RES_BOARD_ADDR1': boardDetail.BOARD_ADDR1,
              'RES_BOARD_ADDR2': boardDetail.RES_BOARD_ADDR2
            }}>
              <button className="btn btn-outline-dark" type="button">
                <i className="bi-cart-fill me-1"></i>
                예약하기
              </button>
            </Link>
          </div>
        </div>

        <div className="modal fade" id="dateModal" tabIndex="-1" aria-labelledby="dateModal" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="dateModal">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <DatePicker propFunction={highFunction} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">창 닫기</button>
              </div>
            </div>
          </div>
        </div>

        {/* 예약창을 모달로 띄워야하나? */}

        {/* 예약창은 대충 된거같음 */}
        <div className="row">
          <Review prop={review} />
        </div>
        {/* 예약 */}
      </div>
    </>
  )
}

export default BoardDetail