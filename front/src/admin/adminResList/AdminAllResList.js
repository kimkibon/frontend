import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


//예약상태
const ResState=(state)=>{
    switch(state){
      case 0: return '예약요청'
      case 1: return '예약승인'
      case 2: return '결제대기'
      case 3: return '결제/예약완료'
      case 4: return '예약취소'
      case 5: return '이용완료'
    }
}

const AdminAllResList =() => {
    const [resList, setResList] = useState([]);
    useEffect(() => {
        axios({
            method : 'post' ,
            url : '/GareBnB/Admin/allresList.do' ,
            contentType:"application/json;charset=UTF-8",
        }).then(Response => {
            setResList(Response.data);
        });
    },[]);

    return (
        <div>
            <h1>예약 리스트</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">예약번호</th>
                        <th scope="col">예약자ID</th>
                        <th scope="col">호스트ID</th>
                        <th scope="col">게시글번호</th>
                        <th scope="col">예약상태</th>
                    </tr>
                </thead>

               
            {resList[0] !==undefined && resList.map((list)=>{
                return(
                    <tbody>
                        <tr>
                            <td><Link to={"./adminResInfo/"+list.RES_IDX}>{list.RES_IDX}</Link></td>
                            <td>{list.RES_CLI_ID}</td>
                            <td>{list.RES_HOST_ID}</td>
                            <td>{list.RES_BOARD_NO}_{list.RES_BOARD_MODIFY_NO}</td>
                            <td>{ResState(list.RES_LEVEL)}</td>
                        </tr>
                    </tbody>                    
                )
            })}

            </table>    
            
        </div>

    )
}
export default AdminAllResList;