import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import SelectFileList from '../../commons/Files/SelectFileList';
import BoardReview from './BoardReview';
import DatePicker from '../../commons/datePicker/DatePicker';
import Review from './boardDetailComponent/Review';
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/dropdown'
import Carousel from 'react-bootstrap/Carousel';
import Dropdown from 'react-bootstrap/Dropdown';


const BoardDetail = () => {

  const [boardDetail, setBoardDetail] = useState([]);
  const [file, setFile] = useState([]);
  const [review, setReview] = useState([]);
  const [care, setCare] = useState(1);

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
    console.log([...Array(boardDetail.BOARD_CARE_NO)]);
  }, [care])



  return (
    <>

      <div className="container">


        <section className="row border border-primary">
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
                      </Carousel.Item>
                    )
                  })}
                </Carousel>

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
                <div className="d-flex">

                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 예약창을 모달로 띄워야하나? */}
        <div className="row border border-primary p-2 bg-light">
          <div className="col-md-8 themed-grid-col">
            <div className='row'>
              <div className='col-md-3'>
              <button className="btn btn-outline-dark" type="button" data-bs-toggle="modal" data-bs-target="#dateModal">
                {resDate.RES_START_DATE}
              </button>
              </div>
              <div className='col-md-3'>
              <button className="btn btn-outline-dark" type="button" data-bs-toggle="modal" data-bs-target="#dateModal">
                {resDate.RES_END_DATE}
              </button>
              </div>
              <div className='col-md-4'>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {care} 마리
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {file[0] !== undefined && [...Array(boardDetail.BOARD_CARE_NO)].map((n, index) => {
                    return (
                      <Dropdown.Item onClick={() => setCare(index + 1)} key={index}>{index + 1}마리</Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
              </div>
            </div>
          </div>
          <div className='col-md-4 themed-grid-col text-end'>
            <Link to="/board/res" state={{
              'RES_CLI_ID': '',
              'RES_CARE_NO': care,
              'RES_START_DATE': resDate.RES_START_DATE,
              'RES_END_DATE': resDate.RES_END_DATE,
              'RES_REQ_DETAIL': '',
              'RES_BOARD_NO': boardDetail.BOARD_NO,
              'MEM_ID': boardDetail.BOARD_HOST_ID,
              'RES_PRICE': boardDetail.BOARD_PRICE,
              'RES_DATE_RANGE': resDate.RES_DATE_RANGE,
              'RES_BOARD_ADDR1': boardDetail.BOARD_ADDR1,
              'RES_BOARD_ADDR2': boardDetail.BOARD_ADDR2
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
                <h5 className="modal-title" id="dateModal">날짜 선택</h5>
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