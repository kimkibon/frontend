import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import ResRequestOnClick from './boardDetailComponent/ResRequestOnClick';

const ResRequest = (res) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [care, setCare] = useState(1)
  const [range, setRange] = useState(1);
  const [resRequest, setResRequest] = useState([]);
  const [cliRequest, setCliRequest] = useState('');
  const [ResReqShow, setResReqShow] = React.useState(false);


  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const req = (e) => {
    setCliRequest(e.target.value);
  }

  useEffect(() => {

    if (endDate !== null) {
      const date = (startDate.getTime() - endDate.getTime())
      setRange(Math.abs(date / (1000 * 60 * 60 * 24)) + 1)
    }

  }, [endDate])

  useEffect(() => {
    const request = {
      'RES_CLI_ID': 'MEM_ID',
      'MEM_ID': res.state.RES_HOST_ID,
      'BOARD_NO': res.state.RES_BOARD_NO,
      'RES_DATE_START': startDate.toISOString().slice(0,10).replace(/-/g,"/"),
      'RES_DATE_END': endDate.toISOString().slice(0,10).replace(/-/g,"/"),
      'RES_CARE_NO': care,
      'RES_REQ_DETAIL': (cliRequest)
    }

    setResRequest(request);
    
  }, [ResReqShow])

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
            {res.state.RES_BOARD_TITLE}
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
                          <span>{res.state.RES_HOST_NAME}</span>
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
                          <span>{res.state.RES_HOST_PHONE}</span>
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
                          <span>{res.state.RES_BOARD_ADDR1}<br/>{res.state.RES_BOARD_ADDR2}</span>
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
                                {[...Array(res.state)][0] !== undefined && [...Array(res.state.RES_CARE_NO)].map((n, index) => {
                                  return (
                                    <Dropdown.Item onClick={() => setCare(index + 1)} key={index}>{index + 1}마리</Dropdown.Item>
                                  )
                                })}
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
                          <span>{(res.state.RES_PRICE) * (range)} 원</span>
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
          <Button onClick={res.onHide}>취소</Button>
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
    </div>
  )
}

export default ResRequest