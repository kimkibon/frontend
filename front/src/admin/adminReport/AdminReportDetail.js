import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
 import Table from 'react-bootstrap/Table';
 import {Button,Form} from 'react-bootstrap';
 import { useNavigate } from 'react-router-dom';


const AdminReportDetail = () => {

    const location = useLocation();
    const report_idx = location.state.REPORT_IDX;
    //console.log(qna_idx);

    const [detail, setDetail] = useState([]);
    useEffect(() => {
      axios({ //통신으로 정보 받아오기 --memDetailQna.do 랑 겹침,,
              method : 'post' ,
              url : '/GareBnB/Admin/reportDetail.do' ,
              contentType:"application/json;charset=UTF-8",
              params : {
                  REPORT_IDX : report_idx
              }
          }).then(Response => {
              console.log(Response.data);
              setDetail(Response.data);
              //응답이 들어왔을 때 SetQnaList 함수를 사용해서 
              //response의 data를 detail의 정보로 변경
          });
      },[]);  



      //-------comment 업데이트
      const [reportUpdate , setReportUpdate] = useState({
        comment : ''
      });

      const handleChange = (e) => { //이벤트 e 선언 폼의 text들이 change 될 때마다 e의 값이 넘어감
        const {name,value} = e.target
        setReportUpdate ({
          ...reportUpdate, //...기존의 qnaUpdate 값에
        [name]:value
        })
        //console.log(form); //form 얘한테 comment가 담겨있음
      };
      
      //입력 버튼 클릭 시 update 실행해주는 함수 (레벨 미답변->답변완료
     
      const adminUpdateReport = (e) => { 
        e.preventDefault();
        axios({
        method : 'post',
        url : '/GareBnB/Admin/reportComment.do',
        contentType:"apllication/json; charset=UTF-8",
        params : {
          REPORT_COMMENT : (reportUpdate.comment),  //입력된 값이 넘어가야함
          REPORT_IDX : report_idx
        }
      }).then(Response => {
        console.log(Response.data);
        setReportUpdate(Response.data);
      });
      window.location.reload();
      }


      // QNA_답변 폼  
      const state = detail.REPORT_STATE;
      //console.log(state);
      const CommentForm =() => {
        return(
        <div className='commentF'>
        <Form onSubmit={adminUpdateReport}>
        <Form.Group controlId="formBasicEmail">
        <Form.Label>답변하기</Form.Label>
        <Form.Control type="text" placeholder="답변내용을 등록하세요" 
        onChange={handleChange} name="comment" value={reportUpdate.comment} />
      </Form.Group>

      <Button variant="primary" type="submit">
        입력하기
      </Button>
      </Form>
      </div>
        )
      }

      const navigate = useNavigate();
      
  
     return (

      <div className='container'>
      <div className='top'>
          <h5>상세보기</h5>
        <hr/>

        <div className='dtitle'>
          <h2>{detail.REPORT_TITLE}</h2>
        </div>

        <div className='row'>
          <div className='col-lg-10'>{detail.REPORT_ID}</div>
          <div className='col-lg-2'>{detail.REPORT_DATE}</div>
        </div>
      </div>

      <hr/>
      <div className="con mt-3">
          {detail.REPORT_CONTENT}
      </div>

      <hr/>


      {/* 
                  상태 : {detail.REPORT_STATE}<br/>
                  번호 : {detail.REPORT_IDX}<br/> */}
      <br/>


    <div>
     {state===0 ? <h1><CommentForm/></h1>:
      <>
      <label htmlFor="exampleTextarea" className="form-label mt-4"><h3>문의답변</h3></label>
      <div className="card border-success mb-3">
        <div className="card-body">
          <p className="card-text">{detail.REPORT_COMMENT}</p>
        </div>
      </div>
      <div className='col-lg-12 text-lg-center'>
        <button type="button" className="btn btn-success"  
        onClick={(e)=>{ e.preventDefault(); navigate(-1); }}>확인</button>
      </div> 
      </>
      }
      </div>  
    </div>
    
    

//     <div className='container'>
//       <hr/>
//       <h1>상세보기</h1>
//       <hr/>

//       <Table width="500px" height="30px" >
//           <tbody>
//             <tr>
//               <td width="100px" color='black'>IDX</td>
//               <td width="400px">{detail.REPORT_IDX}</td>
//             </tr>
//             <tr>
//               <td width="100px">ID</td>
//               <td width="400px">{detail.REPORT_ID}</td>
//             </tr>
//             <tr>
//               <td width="100px">TITLE</td>
//               <td width="400px">{detail.REPORT_TITLE}</td>
//             </tr>
//             <tr>
//               <td width="100px">CONTENT</td>
//               <td width="400px">{detail.REPORT_CONTENT}</td>
//             </tr>
//             <tr>
//               <td width="100px">STATE</td>
//               <td width="400px">{detail.REPORT_STATE}</td>
//             </tr>
//             <tr>
//               <td width="100px">DATE</td>
//               <td width="400px">{detail.REPORT_DATE}</td>
//             </tr> 
//           </tbody>
                
//       </Table> 

// {/* REPORT_STATE 값이 0인경우에만 나오게,, 아니면 TEXTAREA로 */}
//     <div>
//      {state===0 ? <h1><CommentForm/></h1>:
//       <>
//       <label htmlFor="exampleTextarea" className="form-label mt-4"><h3>문의답변</h3></label>
//       <div className="card border-success mb-3">
//         <div className="card-body">
//           <p className="card-text">{detail.REPORT_COMMENT}</p>
//         </div>
//       </div>
//       </>
//       }
//       <div className='col-lg-12 text-lg-center'>
//         <button type="button" className="btn btn-success"  
//         onClick={(e)=>{ e.preventDefault(); navigate(-1); }}>확인</button>
//       </div> 
//       </div>  
//     </div>          
  );
};

export default AdminReportDetail;