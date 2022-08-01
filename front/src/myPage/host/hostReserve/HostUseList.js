import axios from "axios";
import { useEffect, useState } from "react";
import SelectOneFile from "../../../commons/Files/SelectOneFile";

const HostUseList = () => {
    const [resComList, setResComList] = useState([]);
    const mem_id = 'MEM_12';


    //이용내역
    useEffect(() => {
        axios({

            method : 'post' ,
            url : '/GareBnB/host/mypage/resFinishList.do' ,
            contentType:"application/json;charset=UTF-8",
            params : {
                MEM_ID : mem_id
        
            }
        }).then(Response => {
            
            //파일 불러오기
            const url = Response.data.map(async list =>{

                await SelectOneFile('0',list.RES_BOARD_NO).then(Res=>{
                list['URL'] = "data:image/;base64,"+Res.URL
                });
                return list;
            })
            Promise.all(url).then((data)=>{setResComList(data)}); 
            //setResComList(Response.data);
        });

    },[]);
  
    //신고


    return (
        
        <div>
            <h1>이용내역</h1>
            {resComList[0] !==undefined && resComList.map((list)=>{
                
                return(
                <div>
                    <div>
                        <h4>
                        예약번호 : {list.RES_IDX}<br/>
                        게시글제목 : {list.BOARD_TITLE}<br/>
                        게시글 사진 : <img src={list.URL}/><br/>
                        예약자ID : {list.RES_CLI_ID}<br/>
                        이용날짜 : {list.RES_DATE_START} ~ {list.RES_DATE_END}<br/>
                        맡긴 동물 수 : {list.RES_CARE_NO}<br/>
                        세부 요청 사항 : {list.RES_REQ_DETAIL}<br/>
                        결제금액 : {list.PRICE} 원<br/>
                        결제날짜 : {list.PAY_DATE}<br/>
                        </h4>
                    </div>

                    <Link to ={'HostInsertReport'} 
                        state={{'REPORT_ID': mem_id, 'REPORT_RES_NO': list.RES_IDX,'REPORT_MEM_IDX':list.RES_CLI_ID}}>
                        <button>신고하기</button></Link>
                           
                </div>
                )
            
            })}
        </div>
    )
}

export default HostUseList