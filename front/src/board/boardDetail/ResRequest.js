import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import ResRequestOnClick from './boardDetailComponent/ResRequestOnClick';

// 예약 정보를 입력하는 컴포넌트
//데이트피커를 사용해서 날짜 정보 저장, 모달로 불러오기 때문에 모달창

const ResRequest = (res) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date()); // 날짜 정보 초기화
  const [care, setCare] = useState(1) //케어링 수 초기화
  const [range, setRange] = useState(1); //날짜 정보 초기화 
  const [resRequest, setResRequest] = useState([]);  //입력 변수 저장
  const [cliRequest, setCliRequest] = useState(''); //클라이언트 요청사항 초기화
  const [ResReqShow, setResReqShow] = React.useState(false); // 모달창 온오프 변수 
  const resData = res.state.resData;

  const onChange = (dates) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  };

  // 데이트피커에서 날짜를 선택 했을 때 정보를 저장

  const req = (e) => {
    setCliRequest(e.target.value);
  }

  // 클라이언트의 요청사항을 저장

  useEffect(() => {

    if (endDate !== null) {
      const date = (startDate.getTime() - endDate.getTime())
      setRange(Math.abs(date / (1000 * 60 * 60 * 24)) + 1)
    }

  }, [endDate])

  useEffect(() => {

    const request = {
      'RES_CLI_ID': localStorage.getItem('MEM_ID'),
      'MEM_ID': resData.RES_HOST_ID,
      'BOARD_NO': resData.RES_BOARD_NO,
      'RES_DATE_START': startDate.toISOString().slice(0,10).replace(/-/g,"/"),
      'RES_DATE_END': endDate.toISOString().slice(0,10).replace(/-/g,"/"),
      'RES_CARE_NO': care,
      'RES_REQ_DETAIL': (cliRequest)
    }

    setResRequest(request);
    
  }, [ResReqShow])

  //예약하기 버튼을 눌렀을 때 입력된 변수 세팅

  return (
    <div>
      <Modal
        {...res}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {resData.RES_BOARD_TITLE}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container'>
            <div className='row'>
              <div className="col mb-12">
                <div className="card h-80">
                  <div className="card-body p-4">
                    <div className='row'>
                      <div className='col-sm-3'>
                        <div className="text-left">
                          <br />
                          <span>호스트</span>
                        </div>
                      </div>
                      <div className='col-sm-9'>
                        <div className='text-end'>
                          <br />
                          <span>{resData.RES_HOST_NAME}</span>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-sm-3'>
                        <div className="text-left">
                          <br />
                          <span>호스트<br/>전화번호</span>
                        </div>
                      </div>
                      <div className='col-sm-9'>
                        <div className='text-end'>
                          <br />
                          <span>{resData.RES_HOST_PHONE}</span>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-sm-3'>
                        <div className="text-left">
                          <br />
                          <span>주소</span>
                        </div>
                      </div>
                      <div className='col-sm-9'>
                        <div className='text-end'>
                          <br />
                          <span>{resData.RES_BOARD_ADDR1}<br/>{resData.RES_BOARD_ADDR2}</span>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-sm-3'>
                        <div className="text-left">
                          <br />
                          <span>기간</span>
                        </div>
                      </div>
                      <div className='col-sm-9'>
                        <div className='text-end'>
                          <br />
                          <span>
                            {<DatePicker
                              className='col-sm-9'
                              minDate={new Date()}
                              selected={startDate}
                              onChange={onChange}
                              startDate={startDate}
                              endDate={endDate}
                              selectsRange
                              excludeDateIntervals={res.state.resDate}
                              dateFormat = {'yyyy년 MM월 dd일'}
                            />}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-sm-3'>
                        <div className="text-left">
                          <br />
                          <span>케어링</span>
                        </div>
                      </div>
                      <div className='col-sm-9'>
                        <div className='text-end'>
                          <br />
                          <span>
                            <Dropdown>
                              <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {care} 마리
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {[...Array(resData)][0] !== undefined && [...Array(resData.RES_CARE_NO)].map((n, index) => {
                                  return (
                                    <Dropdown.Item onClick={() => setCare(index + 1)} key={index}>{index + 1}마리</Dropdown.Item>
                                  )
                                })}
                                {/* 케어링 수는 어레이가 아닌 숫자, 리턴 내부에서는 for문을 사용할 수 없기 때문에 변칙을 사용 */}
                              </Dropdown.Menu>
                            </Dropdown>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-sm-3'>
                        <div className="text-left">
                          <br />
                          <span>가격</span>
                        </div>
                      </div>
                      <div className='col-sm-9'>
                        <div className='text-end'>
                          <br />
                          <span>{(resData.RES_PRICE) * (range)} 원</span>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-sm-3'>
                        <div className="text-left">
                          <br />
                          <span>요청사항</span>
                        </div>
                      </div>
                      <div className='col-sm-9'>
                        <div className='text-end'>
                          <br />
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <textarea onChange={(e) => { req(e) }} value={cliRequest}></textarea>
                    </div>

                  </div>
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={res.onHide}>취소</Button>
          <Button variant="primary" onClick={() => setResReqShow(true)}>
            예약하기
          </Button>
        </Modal.Footer>
      </Modal>

      <ResRequestOnClick
        show={ResReqShow}
        onHide={() => setResReqShow(false)}
        props={resRequest} 
      /> 
      {/* 최종 예약 확인 모달 */}
    </div>
  )
}

export default ResRequest