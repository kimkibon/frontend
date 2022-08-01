/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ComReportList from './ComReportList';

const ReportList = () => {

  const [reportList,setReportList] = useState([]); //빈 배열 변수 선언 reportList 만큼 ComReportList.js를 뿌릴거임
    
    //함수 실행시 최초 한 번 실행되는 것
    useEffect(() => {
        axios({ //통신으로 정보 받아오기
            method : 'post' ,
            url : '/GareBnB/mypage/memReportList.do' ,
            contentType:"application/json;charset=UTF-8",
            params : {
                MEM_ID : 'MEM_7'
            }
        }).then(Response => {
            console.log(Response.data);
            setReportList(Response.data);
            //응답이 들어왔을 때 SetReportList 함수를 사용해서 
            //response의 data를 reportList 정보로 변경
        });
    },[]);




  return (
        <>
            <hr/>
            <h3> 신고 내역 </h3>
            <hr/>
            <Table striped width="900px" height="30px">
              <tbody>
                <tr>
                  <td width="50px">IDX</td>
                  <td width="70px">STATE</td>
                  <td width="200px">TITLE</td>
                  <td width="200px">CONTENT</td>
                  <td width="100px">DATE</td>
                  <td width="90px"></td>
                </tr>
              </tbody>
            </Table>          

          {/* ReportList불러오기 */}
          {reportList[0]!==undefined && reportList.map((list) => (
            <ComReportList key={list.REPORT_IDX} list={list}/>
          ))}
          </>
  );
};
export default ReportList;