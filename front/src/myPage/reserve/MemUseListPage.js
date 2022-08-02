import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reviewcheck from "../review/Reviewcheck";
import MemUseList from "./MemUseList";


const MemUseListPage = () => {
    const [resComList, setResComList] = useState([]);
    const mem_id = 'MEM_7';
    //이용내역
    useEffect(() => {
        axios({

            method : 'post' ,
            url : '/GareBnB/mypage/memuseList.do' ,
            contentType:"application/json;charset=UTF-8",
            params : {
                MEM_ID : mem_id
        
            }
        }).then(Response => {
            const list_review = Response.data.map(async list=>{
                await Reviewcheck(list.RES_CLI_ID, list.RES_BOARD_NO).then(Res=>{
                    list['review'] = Res
                })
                return list

            })
            
            Promise.all(list_review).then((data)=>{setResComList(data)});

        });

    },[]);
  
    //신고


    return (
        
        <div>
            <h1>이용내역</h1>
            {resComList[0] !==undefined && resComList.map((list)=>{

                const end_date = new Date(list.RES_DATE_END);//예약마지막날짜
                const after_date = end_date.setDate(end_date.getDate()+8);//8일 후

                const review_check = list.review;   //리뷰 존재 유무
                
                return(
                    <div class="container mt-5 mb-5">
                        <div class="d-flex justify-content-center row">
                            <div class="col-md-10">
                                <div class="row p-2 bg-white border rounded">
                                    <MemUseList list={list }/>
                                    

                                    <div class="align-items-center align-content-center col-md-2 border-left mt-1">
                                        <div class="d-flex flex-column mt-4">
                                            <Link to ={'InsertReport'} 
                                                state={{'REPORT_ID': list.RES_CLI_ID, 'REPORT_RES_NO': list.RES_IDX,'REPORT_MEM_IDX':list.RES_HOST_ID}}>
                                                <button>신고하기</button></Link>
                                            
                                            <Link to ={'Myreview'} 
                                                state={{'CLI_ID': list.RES_CLI_ID, 'RES_BOARD_NO': list.RES_BOARD_NO,'after_date':after_date,'reviewcheck':review_check}}>
                                                <button>리뷰확인</button></Link>                    
                                            
                                            {new Date().getTime()<after_date ?
                                                                        (review_check===0 ? 
                                                                                        <Link to ={'InsertReview'} state={{'REVIEW_MEM_ID': list.RES_CLI_ID, 'BOARD_NO': list.RES_BOARD_NO}}>
                                                                                        <button>리뷰쓰기</button></Link>
                                                                                            :<input type='button' disabled value='리뷰쓰기'/>)
                                                                            :<input type='button' disabled value='리뷰쓰기'/>}
                                        </div>
                                    </div>            
                                </div>
                            </div>
                        </div>
                    </div>
                )
            
            })}
        </div>
    )
}

export default MemUseListPage


