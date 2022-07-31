import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import ImageUploadBox from '../host/myBoard/component/ImageUploadBox';
import HostAddress from './HostAddress';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const MemChange = () => {

  // MEM_IDX 불러오는 기능있어야함

  const [insertModal, setInsertModal] = React.useState(false);
  const [showAddrModal, setShowAddrModal] = React.useState(false);
  const [insertHostFiles, setInsertHostFiles] = useState([]);

  const [insertHost, setInsertHost] = useState({    
    MEM_IDX : 6,
    HOST_EMAIL : '',
    HOST_POST : '',
    HOST_ADDR1 : '',
    HOST_ADDR2 : '',
    HOST_JUMIN1 : '',
		HOST_JUMIN2 : '',
		HOST_INTRO : '',
		HOST_ACCOUNT : '',
		HOST_BANK : ''
  });  

  const {     
    MEM_IDX,
    HOST_EMAIL,
    HOST_POST,
    HOST_ADDR1,
    HOST_ADDR2,
    HOST_JUMIN1,
    HOST_JUMIN2,
    HOST_INTRO,
    HOST_ACCOUNT,
    HOST_BANK } = insertHost;

    const setAddrInfo = (data) => {
      setInsertHost({
        ...insertHost,
        'HOST_ADDR1': data.HOST_ADDR1,
        'HOST_POST': data.HOST_POST
      })
      setShowAddrModal(false)
      console.log(insertHost)
    }
  

  const onChange = (e) => {    
    const { value, name } = e.target;  
    setInsertHost({      
      ...insertHost, // 기존의 input 객체를 복사한 뒤      
      [name]: value // name 키를 가진 값을 value 로 설정    
    });  
    console.log(insertHost)
  };
  // const getImages = (image) => {
  //   setInsertHostFiles(image)
  // }
  //  // 미리보기로 만들어진 이미지를 저장 

//    const insertOnClick = () => {

//     if (insertHost.HOST_EMAIL === '') {
//       alert('제목을 입력해주세요.')
//     } else {
//       if (insertHost.HOST_POST === '') {
//         alert('우편번호를 입력해주세요..')
//       } else {
//         if (insertHost.HOST_ADDR1 === '') {
//           alert('주소를 입력해주세요.')
//         } else {
//           if (insertHost.HOST_ADDR2 === '') {
//             alert('상세주소를 입력해주세요.')
//           } else {
//             if (insertHost.HOST_JUMIN1 === '') {
//               alert('가격을 입력해주세요.')
//             } else {
//               if (insertHost.HOST_JUMIN2 === '') {
//                 alert('소개글을 입력해주세요.')
//               } else {
//                 if (insertHost.HOST_INTRO === '') {
//                   alert('소개글을 입력해주세요.')
//                 } else {
//                   if (insertHost.HOST_BANK === '') {
//                     alert('소개글을 입력해주세요.')
//                   } else {
//                     if (insertHost.HOST_ACCOUNT === '') {
//                       alert('소개글을 입력해주세요.')
//                     } else {
//                 if (insertHostFiles[1] === undefined) {
//                   alert('사진을 두 장 이상 입력해주세요')
//                 } else {
//                   setInsertModal(true);
//                 }
//               }
//             }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
  // 글 유효성 검사  

  const Send = () => {
  axios({
    method : 'post' ,
    url : '/GareBnB/mypage/memChange.do' ,
    contentType:"application/json;charset=UTF-8",
    params : insertHost
  //insertHost 리턴으로 MEM_IDX를 받아옴
  })}

  return (
    <div>
     <h3>이메일주소 : </h3>
      <input name="HOST_EMAIL" placeholder="Enter email" onChange={onChange} value={HOST_EMAIL} />
      <br/>
   
     
      <h3>우편번호 : </h3>
      <input name="HOST_POST" placeholder="Enter POST" onChange={onChange} value={HOST_POST} />
      <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon"
            onClick={() => setShowAddrModal(true)}>
            우편번호 찾기
      </button>
      <h3>기본주소 : </h3>
      <input name="HOST_ADDR1" placeholder="Enter email" onChange={onChange} value={HOST_ADDR1} />
      <br/>
      <h3>상세주소 : </h3>
      <input name="HOST_ADDR2" placeholder="Enter email" onChange={onChange} value={HOST_ADDR2} />
      <br/>
      <h3>주민 등록 번호 : </h3>
      <input name="HOST_JUMIN1" placeholder="Enter email" onChange={onChange} value={HOST_JUMIN1} /> -  
      <input name="HOST_JUMIN2" placeholder="Enter email" onChange={onChange} value={HOST_JUMIN2} />
      <br/>

      <h3>본인 소개 : </h3>
      <input name="HOST_INTRO" placeholder="Enter email" onChange={onChange} value={HOST_INTRO} />
      <br/>

        {/* 입력확인창 모달로 띄우기 !  */}
        <Modal
          show={showAddrModal}
          onHide={() => setShowAddrModal(false)}
        >
          <HostAddress
            setAddrInfo={setAddrInfo}
          />
        </Modal>
        {/* 주소 검색 모달 */}

      {/* 사진 첨부 */}

      <h3>은행 : </h3>
      <input name="HOST_BANK" placeholder="Enter email" onChange={onChange} value={HOST_BANK} />
      <br/>
      <h3>계좌번호 : </h3>
      <input name="HOST_ACCOUNT" placeholder="Enter email" onChange={onChange} value={HOST_ACCOUNT} />
      <br/>

      <button onClick={Send}>등록하기</button>
    
    </div>
    
  )
}

export default MemChange

