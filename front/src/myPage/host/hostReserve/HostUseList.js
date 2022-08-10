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
            <div className="container">
            <hr/>
                <h3>이용내역</h3>
            <hr/>
            {resComList[0] !==undefined ? resComList.map((list)=>{
                
                return(
                    <div className="container mt-5 mb-5">
                        <div className="d-flex justify-content-center row">
                            <div className="col-md-10">
                                <div className="row p-2 bg-white border rounded  align-items-center">
                                    <div className="col-md-3 mt-2 d-flex flex-column align-items-center align-content-center">
                                    <img className="img-fluid img-responsive rounded product-image" src={list.URL} width="200px" height="auto"/>
                                    </div>

                                    <div className="col-md-7 mt-1">
                                        예약번호 {list.RES_IDX}<br/>
                                        <h4>{list.BOARD_TITLE}</h4><br/>
                                        <table>                  
                                            <tr>
                                                <td width={30+'%'}>예약자ID</td>
                                                <td>{list.RES_CLI_ID}</td>
                                            </tr>
                                            <tr>
                                                <td>예약자 이름</td>
                                                <td>{list.MEM_NAME}</td>
                                            </tr>
                                            <tr>
                                                <td>예약자 번호</td>
                                                <td>{list.MEM_PHONE}</td>
                                            </tr>
                                            <tr>
                                                <td>이용날짜</td>
                                                <td>{list.RES_DATE_START} ~ {list.RES_DATE_END}</td>
                                            </tr>
                                            <tr>
                                                <td>동물 수</td>
                                                <td>{list.RES_CARE_NO}</td>
                                            </tr>
                                            <tr>
                                                <td>가격</td>
                                                <td>{list.PRICE} 원</td>
                                            </tr>
                                            <tr>
                                                <td>요청사항</td>
                                                <td>{list.REQ_DETAIL}</td>
                                            </tr>
                                            
                                        </table>
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
            
            })
            :<div className="mt-5 mb-5 d-flex justify-content-center"><h4>이용내역이 없습니다.</h4></div>
        }
            </div>
        </div>
    )
}

export default HostUseList