/* eslint-disable */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import ComQnaList from './ComQnaList'; //자식 컴포넌트
import InsertQna from './InsertQna';
import Auth from "../../login/Auth";

const QnaList = () => { //QnaList 함수 생성

    const [qnaList,setQnaList] = useState([]); //빈 배열 변수 선언 qnaList 만큼 ComQnaList.js를 뿌릴거임

    //Auth
    const mem_id = localStorage.getItem("MEM_ID");//로컬스토리지에서 로그인한 계정의 아이디 전달
    const [author, setAuthor] = useState({});
    const navigate = useNavigate();
    

    //함수 실행시 최초 한 번 실행되는 것
    useEffect(() => {
      // 로그인한 계정의 ID, LEVEL, IDX 가져오기 auth,,
      // level 4보다 작은 계정들은 접근 가능
      Auth(4 , navigate).then(Response => {
      setAuthor(Response)
        axios({ //통신으로 정보 받아오기
            method : 'post' ,
            url : '/GareBnB/mypage/memQna.do' ,
            contentType:"application/json;charset=UTF-8",
            params : {
                MEM_ID : mem_id ////auth로 받아옴
            }
        }).then(Response => {
            setQnaList(Response.data);
            //응답이 들어왔을 때 SetQnaList 함수를 사용해서 
            //response의 data를 qnaList의 정보로 변경
        });

       })//auth
    },[]);


    return (
        <div>
        <div className='container'>
          <hr/>
            <h3>QNA LIST</h3>
          <hr/>
              
              <Table striped width="920px" height="30px" >
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

            <div className='qnatable'>
            {/* qnaList불러오기 */}
            {qnaList[0]!==undefined && qnaList.map((list) => (
              <ComQnaList key={list.QNA_IDX} list={list}/>
            ))}
            </div>

            <hr/>
              <InsertQna/>
              {/* <Link to ={'DeleteQna'} state={{'QNA_IDX': qnaList.QNA_IDX}}>
                            <button>삭제</button>
              </Link> */}
            <hr/>
        </div>
        </div>

    );
};
export default QnaList;