import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';


const AdminReportList = () => {

  const [reportList, setReportList] = useState([]);
  const [reportListcopy, setReportListcopy] = useState([]);

  useEffect(() => {
    axios({ //통신으로 정보 받아오기
      method: 'post',
      url: '/GareBnB/Admin/reportList.do',
      contentType: "application/json;charset=UTF-8"
    }).then(Response => {
      setReportList(Response.data);
      setReportListcopy(Response.data);
      //응답이 들어왔을 때 SetReportList 함수를 사용해서 
      //response의 data를 reportList의 정보로 변경
    });
  }, []);



  //selectBox
  const [selected, setSelected] = useState([]); //선택된 값 
  const handleSelected = (e) => { //셀렉트박스 선택됐을때 ,, eventhandler
    //e.preventDefault(); //페이지가 자동 리프레시 되는 것을 막음
    setSelected(e.target.value); //e.target.value 값이 setSelected,, search에 들어감
  };

  const SelectBox = () => {
    if (selected === '2') {
      setReportListcopy(reportList);
    } else if (selected === '0') {
      const listData = reportList.filter((list) =>
        list.REPORT_STATE.includes('미답변'));
      setReportListcopy(listData);
    } else if (selected === '1') {
      const listData = reportList.filter((list) =>
        list.REPORT_STATE.includes('답변완료'));
      setReportListcopy(listData);
    }
    setSelected('');
  };




  return (
    <div className='container'>
      <hr />
      <h3>REPORT LIST</h3>
      <hr />

      <Table striped width="900px" height="30px" className="table table-hover">
        <thead>
          <tr align='center'>
            <td width="10%">번호</td>
            <td width="20%">아이디</td>
            <td width="30%">신고제목</td>
            <td width="20%">등록일</td>

            <td width="20%">
              <div className="form-group" onChange={handleSelected}>
                <select className="form-select">
                  <option key={2} value="2">전체답변</option>
                  <option key={0} value="0">미답변</option>
                  <option key={1} value="1">답변완료</option>
                </select>
                <SelectBox />
              </div>
            </td>
          </tr>
        </thead>

        {reportListcopy[0] !== undefined && reportListcopy.map((list) => {
          return (
            <tbody>
              <tr align='center' onClick={() => { window.location.href = "/admin/adminReportDetail/" + list.REPORT_IDX }}>
                {/* onClick={handleDetail} */}
                <td>{list.REPORT_IDX}</td>
                <td>{list.REPORT_ID}</td>
                <td>
                  {list.REPORT_TITLE}
                </td>
                <td>{list.REPORT_DATE}</td>
                <td>{list.REPORT_STATE}</td>
              </tr>
            </tbody>
          )
        })}
      </Table>


    </div>
  );
}

export default AdminReportList;