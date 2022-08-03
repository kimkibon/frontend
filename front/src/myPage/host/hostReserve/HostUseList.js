import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SelectOneFile from "../../../commons/Files/SelectOneFile";

const HostUseList = () => {
    //auth
    const mem_id = localStorage.getItem("MEM_ID");


    const [resComList, setResComList] = useState([]);
    


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

                await SelectOneFile('0',list.RES_BOARD_NO,list.RES_BOARD_MODIFY_NO).then(Res=>{
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
                    <div className="container mt-5 mb-5">
                        <div className="d-flex justify-content-center row">
                            <div className="col-md-10">
                                <div className="row p-2 bg-white border rounded">
                                    <div className="col-md-3 mt-2 d-flex flex-column align-items-center align-content-center">
                                    <img className="img-fluid img-responsive rounded product-image" src={list.URL} width="200px" height="auto"/>
                                    </div>

                                    <div className="col-md-7 mt-1">
                                        <h5>예약번호 : {list.RES_IDX}</h5><br/>
                                        게시글제목 : {list.BOARD_TITLE}<br/>
                                        예약자ID : {list.RES_CLI_ID}<br/>
                                        이용날짜 : {list.RES_DATE_START} ~ {list.RES_DATE_END}<br/>
                                        맡긴 동물 수 : {list.RES_CARE_NO}<br/>
                                        세부 요청 사항 : {list.RES_REQ_DETAIL}<br/>
                                        결제금액 : {list.PRICE} 원<br/>
                                        결제날짜 : {list.PAY_DATE}<br/>
                                    </div>

                                    <div className="align-items-center align-content-center col-md-2 border-left mt-1">
                                        <div className="d-flex flex-column mt-4">
                                            <Link to ={'InsertReport'} 
                                            state={{'REPORT_ID': mem_id, 'REPORT_RES_NO': list.RES_IDX,'REPORT_MEM_IDX':list.RES_CLI_ID}}>
                                                <button className="btn btn-danger">신고하기</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <p/>
                            </div>
                        </div>
                    </div>
                )
            
            })}
        </div>
    )
}

export default HostUseList