import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MemUseList from "./MemUseList";


const MemUseListPage = () => {
    const [resComList, setResComList] = useState([]);

    //이용내역
    useEffect(() => {
        axios({

            method : 'post' ,
            url : '/GareBnB/mypage/memuseList.do' ,
            contentType:"application/json;charset=UTF-8",
            params : {
                MEM_ID : 'MEM_7'
        
            }
        }).then(Response => {
            setResComList(Response.data);

        });

    },[]);
  
    //신고

 

    //리뷰 체크
    const [check, setCheck] = useState(0);
    const reviewcheck=(mem_id, board_no)=>{
        let check = 0;
        axios({

            method : 'post' ,
            url : '/GareBnB/mypage/myReview.do' ,
            contentType:"application/json;charset=UTF-8",
            params : {
                MEM_ID : mem_id,
                BOARD_NO : board_no
        
            }
        }).then(Response => {
            Response.data ? check=1 : check=0
        });
        console.log(222,check);
        return check;
    } 


    return (
        
        <div>
            <h1>이용내역</h1>
            {resComList[0] !==undefined && resComList.map((list)=>{

                const end_date = new Date(list.RES_DATE_END);//예약마지막날짜
                const after_date = end_date.setDate(end_date.getDate()+8);//8일 후

                
                const check = reviewcheck(list.RES_CLI_ID, list.RES_BOARD_NO);
                console.log(check);

                return(
                <div>
                    <MemUseList list={list }/>
                    <button>신고하기</button>
                    
                    <Link to ={'Myreview'} state={{'CLI_ID': list.RES_CLI_ID, 'RES_BOARD_NO': list.RES_BOARD_NO,'after_date':after_date}}>
                        <button>리뷰확인</button></Link>                    
                    
                    {/* {new Date().getTime()<after_date ?
                     <Link to ={'InsertReview'} state={{'REVIEW_MEM_ID': list.RES_CLI_ID, 'BOARD_NO': list.RES_BOARD_NO}}>
                        <button>리뷰쓰기</button></Link>
                    : <input type='button' disabled value='리뷰쓰기'/>} */}
                    {check===1 ? <input type='button' disabled value='리뷰쓰기'/> 
                                : <Link to ={'InsertReview'} state={{'REVIEW_MEM_ID': list.RES_CLI_ID, 'BOARD_NO': list.RES_BOARD_NO}}>
                                    <button>리뷰쓰기</button></Link>}
                </div>
                )
            
            
            })}
        </div>
    )
}

export default MemUseListPage