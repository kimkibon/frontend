import axios from "axios";
import { useEffect, useState } from "react";

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
            setResComList(Response.data);
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
                        게시글 사진 : <br/>
                        예약자이름 : {list.MEM_NAME}<br/>
                        예약자전화번호 : {list.MEM_PHONE}<br/>
                        이용날짜 : {list.RES_DATE_START} ~ {list.RES_DATE_END}<br/>
                        맡긴 동물 수 : {list.RES_CARE_NO}<br/>
                        가격 : {list.PRICE} 원<br/>
                        </h4>
                    </div>

                    <button>신고하기</button>
                           
                </div>
                )
            
            })}
        </div>
    )
}

export default HostUseList