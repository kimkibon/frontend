import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import SelectFileList from '../../commons/Files/SelectFileList';
import Carousel from 'react-bootstrap/Carousel';



const AdminHostConfirmDetail = () => {

  const [url, setUrl] = useState();
  const [file, setFile] = useState([]);
  const location = useLocation();

  const host_mem_idx = location.state.MEM_IDX

  const [getHostMem, setGetHostMem] = useState({ // MEM_IDX는 list에서 넘어온 값으로 초기값 지정
    MEM_IDX : host_mem_idx,
    MEM_ID : '',
    MEM_PW : '',
    MEM_NAME : '',
    MEM_PHONE : '',
    HOST_EMAIL : '',
    HOST_ADDR1 : '',
    HOST_ADDR2 : '',
    HOST_BANK : '',            
    HOST_ACCOUNT : '',  
    HOST_INTRO : ''
  });

 
   // 이미지 *************

 
  useEffect(() =>{ // 해당 MEM_IDX로 나머지 정보 가져옴
    axios({ 
    method : 'post',
    url : '/GareBnB/Admin/hostConfirmMemberDetail.do', 
    contentType:"application/json; charset=UTF-8",
    params : { 
        MEM_IDX : getHostMem.MEM_IDX
    }})
    .then(Response => {  
      console.log(Response.data);
      setGetHostMem(Response.data);
       // SelectFileList에서 여러 개의 파일을 map으로 가져와서 1개씩 보여줌
      SelectFileList('1', Response.data.MEM_IDX, '0').then(Response => {
        Response.map(base64 => {
          base64.URL = "data:image/;base64," + base64.URL //바이너리 변환된 이미지를 출력하기 위해 주석을 달아줌
        })
        Response.sort(function (a, b) {
          return a.FILE_LEVEL - b.FILE_LEVEL
        })
        setFile(Response);
      });
      })
      },[]); 

    const [hostConfirm , setHostConfirm] = useState();
    const hostResSuccess = () => { // 저장 버튼 클릭 시 update sql문 실행됨 (레벨 업데이트 - 승인)
    
      axios({
      method : 'post',
      url : '/GareBnB/Admin/HostConfirm.do',
      contentType:"apllication/json; charset=UTF-8",
      params : {
        MEM_IDX : getHostMem.MEM_IDX 
      } })
    .then(Response => {
      console.log(Response.data);
      setHostConfirm(Response.data);
      alert("승인")
    })
    }

    const [hostDeny , setHostDeny] = useState();
    const hostResFail = () => { // 저장 버튼 클릭 시 update sql문 실행됨 (레벨 업데이트 - 거절)
    
      axios({
      method : 'post',
      url : '/GareBnB/Admin/HostDeny.do',
      contentType:"apllication/json; charset=UTF-8",
      params : {
        MEM_IDX : getHostMem.MEM_IDX 
      } })
    .then(Response => {
      console.log(Response.data);
      setHostDeny(Response.data);
      alert("거절")
    })
    }
    getHostMem['URL'] = url;

  return (
    <article>
    <h1>호스트 회원 등록요청 상세보기</h1>
    <ul>
    <li>호스트 사진</li>
    {/* 캐러셀 */}
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
                
    <li>번호(IDX) : {getHostMem.MEM_IDX}</li>
    <li>아이디 :{getHostMem.MEM_ID} </li>
    <li>이름 : {getHostMem.MEM_NAME} </li>
    <li>휴대폰 번호 : {getHostMem.MEM_PHONE}</li>
    <li>이메일 : {getHostMem.HOST_EMAIL}</li>
    <li>주소 : {getHostMem.HOST_ADDR1} {getHostMem.HOST_ADDR2}</li>
    <li>계좌번호 : {getHostMem.HOST_BANK} {getHostMem.HOST_ACCOUNT}</li>
   

    <Link to = '/admin/adminHostConfirmList'><button onClick={hostResSuccess}>승인</button></Link> 
    <Link to = '/admin/adminHostConfirmList'><button onClick={hostResFail}>거절</button></Link>
    <Link to = '/admin/adminHostConfirmList'><button>취소</button></Link>
    </ul>
    </article>
);
  }

export default AdminHostConfirmDetail