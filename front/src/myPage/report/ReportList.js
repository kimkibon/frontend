/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ComReportList from './ComReportList';
import Auth from "../../login/Auth";

const ReportList = () => {

  const [reportList, setReportList] = useState([]); //빈 배열 변수 선언 reportList 만큼 ComReportList.js를 뿌릴거임

  //Auth
  const mem_id = localStorage.getItem("MEM_ID");//로컬스토리지에서 로그인한 계정의 아이디 전달
  const [author, setAuthor] = useState({});
  const navigate = useNavigate();


  //함수 실행시 최초 한 번 실행되는 것
  useEffect(() => {
    Auth(4, navigate).then(Response => {
      setAuthor(Response)

      axios({ //통신으로 정보 받아오기
        method: 'post',
        url: '/GareBnB/mypage/memReportList.do',
        contentType: "application/json;charset=UTF-8",
        params: {
          MEM_ID: mem_id
        }
      }).then(Response => {
        setReportList(Response.data);
        //응답이 들어왔을 때 SetReportList 함수를 사용해서 
        //response의 data를 reportList 정보로 변경
      });
    })//auth
  }, []);




  return (
    <div>
      <div className='container'>
        <hr />
        <h3> REPORT LIST </h3>
        <hr />
        <Table striped width="920px" height="30px">
          <tbody>
            <tr>
              <td width="50px">IDX</td>
              <td width="70px">ID</td>
              <td width="200px">TITLE</td>
              <td width="100px">DATE</td>
              <td width="70px">STATE</td>
              <td width="70px"></td>
            </tr>
          </tbody>
        </Table>

        {/* ReportList불러오기 */}
        {reportList[0] !== undefined && reportList.map((list) => (
          <ComReportList key={list.REPORT_IDX} list={list} />
        ))}
      </div>
    </div>
  );
};
export default ReportList;