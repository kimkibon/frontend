import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ImageUploadBox from '../myBoard/component/ImageUploadBox';
import { Modal } from 'react-bootstrap';
import HostAddress from '../../member/HostAddress';
import ModifyHost from './ModifyHost';

// 회원정보 보기 - 수정(HostInfo -> 수정하기 버튼 눌러야 페이지 확인 가능)

const HostModify = () => {

  const location = useLocation();
  const mem = location.state.mem;   // HostInfo의 member 정보를 HostModify로 넘겨줌 (mem)
  const hostfile = location.state.file; // hostfile : HostInfo의 사진 정보

  const [insertModal, setInsertModal] = React.useState(false);
  const [showAddrModal, setShowAddrModal] = React.useState(false);
  const [insertFiles, setInsertFiles] = useState([]);

  const [hostModify , setHostModify] = useState ({ // hostModify 초기값으로 mem의 값 지정
    MEM_ID : mem.MEM_ID,
    MEM_IDX : mem.MEM_IDX,
    MEM_PW : mem.MEM_PW, 
    MEM_NAME : mem.MEM_NAME, 
    MEM_PHONE : mem.MEM_PHONE,
    HOST_EMAIL : mem.HOST_EMAIL,
    HOST_POST : mem.HOST_POST,
    HOST_ADDR1 : mem.HOST_ADDR1,
    HOST_ADDR2 : mem.HOST_ADDR2,
    HOST_INTRO : mem.HOST_INTRO,
    HOST_BANK : mem.HOST_BANK,
    HOST_ACCOUNT : mem.HOST_ACCOUNT
  });
 
  const { MEM_ID, MEM_IDX, MEM_PW, MEM_NAME, MEM_PHONE, HOST_EMAIL,
    HOST_POST, HOST_ADDR1, HOST_ADDR2, HOST_INTRO, HOST_BANK, HOST_ACCOUNT} = hostModify;


  const onChange = (e) => { // 수정하면 복사된 hostModify name & value가 setHostModify 입력됨 
    const {name, value} = e.target;
    setHostModify( {
      ...hostModify, 
      [name] : value
    });
  };

  const setAddrInfo = (data) => {
    setHostModify({
      ...hostModify,
      'HOST_ADDR1': data.HOST_ADDR1,
      'HOST_POST': data.HOST_POST
    })
    setShowAddrModal(false)
    console.log(hostModify)
  }

     // 미리보기로 만들어진 이미지를 저장 
  const getImages = (image) => {
    setInsertFiles(image);
   }

   const updateOnClick = () => {

    if (hostModify.HOST_EMAIL === '') {
      alert('이메일을 입력해주세요.')
    } else {
      if (hostModify.HOST_POST === '') {
        alert('우편번호를 입력해주세요..')
      } else {
        if (hostModify.HOST_ADDR1 === '') {
          alert('주소를 입력해주세요.')
        } else {
          if (hostModify.HOST_ADDR2 === '') {
            alert('상세주소를 입력해주세요.')
          } else {
            if (hostModify.HOST_JUMIN1 === '') {
              alert('주민등록번호 앞자리를 입력해주세요.')
            } else {
              if (hostModify.HOST_JUMIN2 === '') {
                alert('주민등록번호 뒷자리(1자리)를 입력해주세요.')
              } else {
                if (hostModify.HOST_INTRO === '') {
                  alert('소개글을 입력해주세요.')
                } else {
                  if (hostModify.HOST_BANK === '') {
                    alert('은행명을 입력해주세요.')
                  } else {
                    if (hostModify.HOST_ACCOUNT === '') {
                      alert('계좌번호를 입력해주세요.')
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
      }
    }
  }

  return (
    <div>
      <h1>회원정보 수정</h1>
      <h5>이름, 비밀번호, 휴대폰번호는 일반회원 페이지에서 수정하실 수 있습니다.</h5>
      
      <ul>
      <h3>호스트 사진 : </h3>
          {/* 사진 첨부 */}
      <ImageUploadBox getImages={getImages} beforeImages={hostfile}/>
      <li>아이디 : {MEM_ID} </li>
      <li>이름 : {MEM_NAME} </li>
      <li>비밀번호 : {MEM_PW} </li>
      <li>휴대폰 번호 : {MEM_PHONE}</li>
      <li>이메일 : <input name="HOST_EMAIL" value={HOST_EMAIL} onChange={onChange}></input></li>
      <li>우편번호 : 
        <input name="HOST_POST" placeholder="우편번호 입력" onChange={onChange} value={HOST_POST} />
        <button
        className="btn btn-outline-secondary"
        type="button"
        id="button-addon"
        onClick={() => setShowAddrModal(true)}>
        우편번호 찾기
        </button></li>
      <li>기본주소 : <input name="HOST_ADDR1" value={HOST_ADDR1} onChange={onChange}></input></li>
      <li>상세주소 : <input name="HOST_ADDR2" value={HOST_ADDR2} onChange={onChange}></input></li>
      <li>소개글 : <input name="HOST_INTRO" value={HOST_INTRO} onChange={onChange}></input></li>
      <li>은행 : <input name="HOST_BANK" value={HOST_BANK} onChange={onChange}></input></li>
      <li>계좌번호 : <input name="HOST_ACCOUNT" value={HOST_ACCOUNT} onChange={onChange}></input></li>
      </ul>
      <ModifyHost
          show={insertModal}
          onHide={() => setInsertModal(false)}
          props={{
            'hostModify': hostModify,
            'deleteFiles' : hostfile,
            'insertFiles': insertFiles,
            'fileType': '1',
          }}/>

         {/* 입력확인창 모달로 띄우기 !  */} {/* 주소 검색 모달 */}
         <Modal
          show={showAddrModal}
          onHide={() => setShowAddrModal(false)}>
          <HostAddress
            setAddrInfo={setAddrInfo}/>
         </Modal>

         <button onClick={(e) => {
          e.preventDefault();
          updateOnClick();
          }}>  정보 수정 완료</button>  &emsp; &emsp; 
         <button><Link to = '../hostInfo'>취소</Link></button>
 
     
     </div>
  )
  }


export default HostModify