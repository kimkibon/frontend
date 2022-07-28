/* eslint-disable */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import ComQnaList from './ComQnaList'; //자식 컴포넌트
import InsertQna from './InsertQna';

const QnaList = () => { //QnaList 함수 생성

    const [qnaList,setQnaList] = useState([]); //빈 배열 변수 선언 qnaList 만큼 ComQnaList.js를 뿌릴거임
    
    //함수 실행시 최초 한 번 실행되는 것
    useEffect(() => {
        axios({ //통신으로 정보 받아오기
            method : 'post' ,
            url : '/GareBnB/mypage/memQna.do' ,
            contentType:"application/json;charset=UTF-8",
            params : {
                MEM_ID : 'ID2'
            }
        }).then(Response => {
            console.log(Response.data);
            setQnaList(Response.data);
            //응답이 들어왔을 때 SetQnaList 함수를 사용해서 
            //response의 data를 qnaList의 정보로 변경
        });
    },[]);


    return (
        <>
            <hr/>
            <h3>QNA LIST</h3>
            <hr/>
            <Table striped width="920px" height="30px">
              <tbody>
                <tr>
                  <td width="50px">IDX</td>
                  <td width="50px">ID</td>
                  <td width="200px">TITLE</td>
                  <td width="200px">CONTENT</td>
                  <td width="100px">DATE</td>
                  <td width="70px">STATE</td>
                  <td width="200px">COMMENT</td>
                  <td width="50px"></td>
                </tr>
              </tbody>
            </Table>          

          {/* qnaList불러오기 */}
          {qnaList[0]!==undefined && qnaList.map((list) => (
            <ComQnaList key={list.QNA_IDX} list={list}/>
          ))}

          {/* <Link to ={"/post/1"} className="btn btn-primary">
              문의하기 
          </Link> */}


        <hr/>
          <InsertQna/>
          {/* <Link to ={'DeleteQna'} state={{'QNA_IDX': qnaList.QNA_IDX}}>
                        <button>삭제</button>
          </Link> */}
        <hr/>
        </>

    );
};
export default QnaList;