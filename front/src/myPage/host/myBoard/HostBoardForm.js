import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import Address from './Address';
import ImageUploadBox from './component/ImageUploadBox';
import InsertBoard from './component/InsertBoard'

const HostBoardForm = () => {
  const [insertModal, setInsertModal] = React.useState(false);
  const [showAddrModal, setShowAddrModal] = React.useState(false);
  const [insertFiles, setInsertFiles] = useState([]);
  const [insertBoard, setInsertBoard] = useState({
    'BOARD_HOST_ID': 'test_id',     // 로컬 스토리지에서 가져오기 테스트 코드 나중에 수정해야함
    'BOARD_HOST_IDX': '314',    // 어디서 가져오지 ? 서버에서 ? 테스트 코드 나중에 수정해야함
    'BOARD_TITLE': '',       // 입력 받음
    'BOARD_CONTENT': '',     // 입력 받음 
    'BOARD_ADDR1': '',       //입력 받음
    'BOARD_ADDR2': '',       //입력 받음
    'BOARD_POST': '',        //우편번호인가? 어디서 가져오지? 카카오 api 위치 정하기 ?
    'BOARD_PRICE': '',       // 입력 받음
    'BOARD_CARE_NO': '1',     //입력 받음
    'BOARD_MODIFY_NO': '0', // 인서트 보드 초기값 
    'BOARD_DATE_START': new Date().toISOString().slice(0, 10).replace(/-/g, "/"),  //모달 데이트 피커?
    'BOARD_DATE_END': new Date().toISOString().slice(0, 10).replace(/-/g, "/"),    //모달 데이트 피커 ? 
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // 일단 호스트 아이디로 호스트 정보를 가져온다?
  const {
    BOARD_HOST_ID,
    BOARD_HOST_IDX,
    BOARD_TITLE,
    BOARD_CONTENT,
    BOARD_ADDR1,
    BOARD_ADDR2,
    BOARD_POST,
    BOARD_PRICE,
    BOARD_CARE_NO,
    BOARD_DATE_START,
    BOARD_DATE_END
  } = insertBoard;
  //변수 초기화 

  const setAddrInfo = (data) => {
    setInsertBoard({
      ...insertBoard,
      'BOARD_ADDR1': data.BOARD_ADDR1,
      'BOARD_POST': data.BOARD_POST
    })
    setShowAddrModal(false)
    console.log(insertBoard)
  }

  const onChange = (dates) => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
    setInsertBoard({
      ...insertBoard,
      'BOARD_DATE_START': dates[0].toISOString().slice(0, 10).replace(/-/g, "/"),
      'BOARD_DATE_END': dates[1].toISOString().slice(0, 10).replace(/-/g, "/")
    })
  };
  //데이트피커 내용이 바뀌면 변수에 저장 

  const setItems = (e) => {
    const { name, value } = e.target;
    setInsertBoard({
      ...insertBoard,
      [name]: value
    })
    console.log(insertBoard)
  };

  //글 입력 내용이 변경되면 변수에 저장. 

  const getImages = (image) => {
    setInsertFiles(image)
  }
  // 미리보기로 만들어진 이미지를 저장 

  const insertOnClick = () => {

    if (insertBoard.BOARD_TITLE === '') {
      alert('제목을 입력해주세요.')
    } else {
      if (insertBoard.BOARD_POST === '') {
        alert('우편번호를 입력해주세요..')
      } else {
        if (insertBoard.BOARD_ADDR1 === '') {
          alert('주소를 입력해주세요.')
        } else {
          if (insertBoard.BOARD_ADDR2 === '') {
            alert('상세주소를 입력해주세요.')
          } else {
            if (insertBoard.BOARD_PRICE === '') {
              alert('가격을 입력해주세요.')
            } else {
              if (insertBoard.BOARD_CONTENT === '') {
                alert('소개글을 입력해주세요.')
              } else {
                if (insertFiles[1] === undefined) {
                  alert('사진을 두 장 이상 입력해주세요')
                } else {
                  setInsertModal(true);
                }
              }
            }
          }
        }
      }
    }
  }
  // 글 유효성 검사  

  return (
    <>

      <div className="container">


        <section className="row border border-primary">
          <div className="container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5">
              <div className="col-md-6">
                <div className='row'>
                  {/* 기능추가 예정 파일을 업로드 하면 미리보기 가능하도록  조건부 출력을 통해서 기본 이미지 추가*/}

                  <ImageUploadBox getImages={getImages} />
                </div>
              </div>
              <div className="col-md-6">
                <div className='row'>

                  <div className="input-group mb-3">
                    <span className="input-group-text">제목</span>
                    <input
                      type="text"
                      className="form-control"
                      name="BOARD_TITLE"
                      value={BOARD_TITLE}
                      onChange={(e) => setItems(e)}
                    />
                  </div>
                  <div className='col-sm-3'>
                    <div className='input-group mb-2'>
                      <span className="input-group-text">기간 선택</span>
                    </div>
                  </div>
                  <div className='col-sm-9'>
                    <div className='input-group- mb-4'>
                      {<ReactDatePicker
                        className='col-sm-12 btn btn-outline-secondary'
                        minDate={new Date()}
                        selected={startDate}
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                      />}
                    </div>
                  </div>

                  <div className='col-sm-6'>
                    <div className='input-group mb-2'>
                      <span className='input-group-text'>최대 케어링 수</span>
                    </div>
                  </div>

                  <div className='col-sm-6'>
                    <div className='input-group mb-4'>

                      <input
                        type="number"
                        aria-label="First name"
                        className="form-control"
                        name='BOARD_CARE_NO'
                        value={BOARD_CARE_NO}
                        onChange={(e) => setItems(e)}
                      />
                      <span className='input-group-text'>마리</span>



                    </div>
                  </div>

                  <div className='col-sm-3'>
                    <div className='input-group mb-2'>
                      <span className='input-group-text'>우편번호</span>
                    </div>
                  </div>

                  <div className='col-sm-9'>
                    <div className='input-group mb-4'>

                      <input
                        type="text"
                        aria-label="First name"
                        className="form-control"
                        name='BOARD_POST'
                        value={BOARD_POST}
                        readOnly
                      />

                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon"
                        onClick={() => setShowAddrModal(true)}
                      >
                        우편번호 찾기
                      </button>

                    </div>
                  </div>

                  <div className="input-group mb-3">
                    <span className='input-group-text'>주소</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="주소"
                      value={BOARD_ADDR1}
                      name="BOARD_ADDR1"
                      readOnly
                    />
                  </div>

                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="상세주소"
                      value={BOARD_ADDR2}
                      name="BOARD_ADDR2"
                      onChange={(e) => setItems(e)}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">￦</span>
                    <input
                      type="number"
                      className="form-control"
                      name="BOARD_PRICE"
                      value={BOARD_PRICE}
                      onChange={(e) => setItems(e)}
                    />

                    <span className="input-group-text">원/ 1일</span>
                  </div>
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      name="BOARD_CONTENT"
                      placeholder='소개글'
                      value={BOARD_CONTENT}
                      onChange={(e) => setItems(e)}
                      id='floatingTextArea'
                      style={{ height: 100 + 'px' }}
                    />
                    <label htmlFor="floatingTextArea">소개글</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className='row align-items-end'>
          <div className='col'>
            <button
              className="btn btn-outline-dark"
              type="button"
              onClick={() => insertOnClick()}>
              <i className="bi-cart-fill me-1"></i>
              등록하기
            </button>
          </div>
        </div>

        <InsertBoard
          insertBoard={insertBoard}
          insertFiles={insertFiles}
          fileType={'0'}
          postUrl={'/GareBnB/host/mypage/myboardPut.do'}
        />
        {/* 입력확인창 모달로 띄우기 !  */}
        <Modal
          show={showAddrModal}
          onHide={() => setShowAddrModal(false)}
        >
          <Address
            setAddrInfo={setAddrInfo}
          />
        </Modal>
        {/* 주소 검색 모달 */}
      </div>
    </>)
}

export default HostBoardForm