import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
 import {Button,Form} from 'react-bootstrap';
 import { useNavigate } from 'react-router-dom';
 import { useParams } from 'react-router-dom';
import AdminInsertReport from './AdminInsertReport';


const AdminReportDetail = () => {

    const {REPORT_IDX} = useParams();

    const [detail, setDetail] = useState([]);
    useEffect(() => {
      axios({ //통신으로 정보 받아오기 --memDetailQna.do 랑 겹침,,
              method : 'post' ,
              url : '/GareBnB/Admin/reportDetail.do' ,
              contentType:"application/json;charset=UTF-8",
              params : {
                  REPORT_IDX : REPORT_IDX
              }
          }).then(Response => {
              console.log(Response.data);
              setDetail(Response.data);
              //응답이 들어왔을 때 SetQnaList 함수를 사용해서 
              //response의 data를 detail의 정보로 변경
          });
      },[]);  



      const state = detail.REPORT_STATE;
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
     {state===0 ?<AdminInsertReport/>:
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