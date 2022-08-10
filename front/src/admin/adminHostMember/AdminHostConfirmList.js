import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const AdminHostConfirmList = () => {

  const [hostResList, setHostResList] = useState([]); // 전체 회원 리스트 db에서 가져오기 

  useEffect(() => { // 전체 회원 리스트이므로, params 생략
    axios({
      method: 'post',
      url: '/GareBnB/Admin/hostConfirmList.do',
      contentType: "application/json; charset=UTF-8"
    })
      .then(Response => {
        setHostResList(Response.data);
      });
  }, []);

  return (
    <div>
      <div className='container'>

        <hr />
        <h3>호스트 등록 요청 리스트</h3>
        <hr />

        <Table striped width="900px" height="30px" className="table table-hover">
          <thead>
            <tr align='center'>
              <td width="20%">번호(IDX)</td>
              <td width="20%">이름</td>
              <td width="30%">아이디</td>
              <td width="30%">휴대폰 번호</td>
            </tr>
          </thead>

          {hostResList[0] !== undefined ? hostResList.map((list) => {
            return (
              <tbody key={list.MEM_IDX}>
                <tr align='center' onClick={() => { window.location.href = '/admin/AdminHostConfirmDetail/' + list.MEM_IDX }}>
                  <td> {list.MEM_IDX}</td>
                  <td>{list.MEM_NAME}</td>
                  <td>{list.MEM_ID}</td>
                  <td>{list.MEM_PHONE}</td>
                </tr>
              </tbody>
            )
          })
            : <div className="mt-5 mb-5 d-flex justify-content-center"><h4>호스트 전환 요청 회원이 없습니다.</h4></div>
          }

        </Table>
      </div>
    </div>
  )
}

export default AdminHostConfirmList