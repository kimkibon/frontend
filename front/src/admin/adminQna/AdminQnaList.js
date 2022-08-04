import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';


const AdminQnaList = () => {

  const [qnaList,setQnaList] = useState([]); // QNA_LIST db에서 가져오기 
  const [qnaListcopy,setQnaListcopy] = useState([]); // QNA_LIST db에서 가져오기 


    useEffect(() => {
      axios({ //통신으로 정보 받아오기
          method : 'post' , 
          url : '/GareBnB/Admin/qnaList.do' ,
          contentType:"application/json;charset=UTF-8"
      }).then(Response => {
          console.log(Response.data);
          setQnaList(Response.data);
          setQnaListcopy(Response.data);
          //응답이 들어왔을 때 SetQnaList 함수를 사용해서 
          //response의 data를 qnaList의 정보로 변경
      });
  },[]);
  
  
  
  //selectBox

    const [selected, setSelected] = useState([]); //선택된 값
    const handleSelected = (e)=> { //셀렉트박스 선택됐을때 ,, eventhandler
      //e.preventDefault(); //페이지가 자동 리프레시 되는 것을 막음
      console.log(e.target.value);
      setSelected(e.target.value); //e.target.value 값이 setSelected,, search에 들어감
    };
    
    const SelectBox = () => {
        if(selected === '2' ) {
          setQnaListcopy(qnaList);
      } else if(selected === '0'){
        const listData = qnaList.filter((list) =>
        list.QNA_STATE.includes('미답변'));
        setQnaListcopy(listData);
        console.log(listData);
      } else if (selected === '1'){
        const listData = qnaList.filter((list) =>
        list.QNA_STATE.includes('답변완료'));
        setQnaListcopy(listData);
        console.log(listData);
      }
      
      
      
      
    setSelected('');
  };
    

    

  return (
    <div className='container'>
    <hr/>
      <h3>QNA LIST</h3> 
    <hr/>
      
      <Table striped width="900px" height="30px" className="table table-hover">
        <thead>
          <tr>
            <td width="60px">문의번호</td>
            <td width="50px">아이디</td>
            <td width="200px">문의제목</td>
            <td width="100px">등록일</td>

            <td width="100px">
              <div class="form-group" onChange={handleSelected}>
              <select className="form-select">
                <option key={2} value="2">전체답변</option>
                <option key={0} value="0">미답변</option>
                <option key={1} value="1">답변완료</option>
              </select>
              <SelectBox/>
    </div>
            </td>
            
            <td width="50px"></td>
          </tr>
        </thead>
      
      {qnaListcopy.map((list)=> {
      return (
        <tbody>
                        <tr>
                        {/* onClick={handleDetail} */}
                        <td width="50px">{list.QNA_IDX}</td>
                        <td width="50px">{list.QNA_ID}</td>
                        <td width="200px">
                            <Link to = {"/admin/adminQnaDetail/"+list.QNA_IDX} state = {{'QNA_IDX' : list.QNA_IDX}}>
                                 {list.QNA_TITLE}
                            </Link>
                        </td>
                        <td width="100px">{list.QNA_DATE}</td>
                        <td width="70px">{list.QNA_STATE}</td>
                        <td width="50px">
                            {/* <button onClick={handleUpdate}> 삭제 </button> */}
                        </td>
                        </tr>
                    </tbody>
                    )
                  })}
      </Table> 

      
    </div>
  );
}

export default AdminQnaList;