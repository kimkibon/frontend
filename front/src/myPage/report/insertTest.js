// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom';

// const InsertReport = () => {

//   const location = useLocation();
//   const report_id = location.state.REPORT_ID;
//   const report_res_no = location.state.REPORT_RES_NO; //res_idx 받아옴
//   const report_mem_idx = location.state.REPORT_MEM_IDX;

//   console.log(report_id);
//   console.log(report_res_no);
//   console.log(report_mem_idx);


//   const [inputs, setInputs] = useState({    
//     title: '',    
//     report_content: ''  
//   });   

//   const { title, report_content } = inputs;

//   const onChange = (e) => {    
//     const { value, name } = e.target;  
//     setInputs({      
//       ...inputs, // 기존의 input 객체를 복사한 뒤      
//       [name]: value // name 키를 가진 값을 value 로 설정    
//     });  
//   };


//   const insertreport = (e)=>{
//     e.preventDefault();

//     axios({
//       method : 'post' ,
//       url : '/GareBnB/mypage/memReportInsert.do' ,
//       contentType:"application/json;charset=UTF-8",
//       params : {
//         REPORT_TITLE : title,
//         REPORT_ID : report_id,
//         REPORT_CONTENT : report_content,
//         REPORT_MEM_IDX : report_mem_idx,
//         REPORT_RES_NO : report_res_no,
//       }
//     }).then(Response => {
//         window.location.href="/myPage/report"
//     });
//   }

//   return (
//     <div>
//       <h3>신고하기</h3>
//       <h3>제목 : </h3>
//       <input name="title" placeholder="제목" onChange={onChange} value={title} />
//       <br/>
//       <h3>내용 : </h3>      
//       <input name="report_content" placeholder="후기" onChange={onChange} value={report_content}/>
//       <button onClick={insertreport}>등록하기</button>
//     </div>
    
//   )


// }

// export default InsertReport;