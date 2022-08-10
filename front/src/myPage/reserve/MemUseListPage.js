import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InsertReviewModal from "../review/Modals/InsertReviewModal";
import Reviewcheck from "../review/Reviewcheck";
import MemUseList from "./MemUseList";
import Modal from 'react-bootstrap/Modal';


const MemUseListPage = () => {
    const [resComList, setResComList] = useState([]);
    const mem_id = localStorage.getItem("MEM_ID");


    //리뷰쓰기
    const [modalShow, setModalShow] = useState(false);
    const [boardno, setBoardno] = useState();
    const [residx, setResidx] = useState();


    //리뷰확인
    const [reviewShow, setReviewShow] = useState(false);


    //이용내역
    useEffect(() => {


        //로그인한 계정의 ID, LEVEL, IDX 가져오기
        //level 4보다 작은 계정들은 접근 가능
        //Auth(4 , navigate).then(Response => {
        //setAuthor(Response)
        axios({

            method: 'post',
            url: '/GareBnB/mypage/memuseList.do',
            contentType: "application/json;charset=UTF-8",
            params: {
                MEM_ID: mem_id

            }
        }).then(Response => {
            const list_review = Response.data.map(async list => {
                await Reviewcheck(list.RES_CLI_ID, list.RES_IDX).then(Res => {
                    list['review'] = Res
                })
                return list

            })

            Promise.all(list_review).then((data) => { setResComList(data) });

        });
        //})//auth

    }, [mem_id]);




    return (

        <div>

            <div className="container" >
                <hr />
                <h3>이용내역</h3>
                <hr />
                <InsertReviewModal show={modalShow} onHide={() => setModalShow(false)}
                    state={{ 'REVIEW_MEM_ID': mem_id, 'BOARD_NO': boardno, 'RES_IDX': residx }} />

                {resComList[0] !== undefined ? resComList.map((list) => {

                    const end_date = new Date(list.RES_DATE_END);//예약마지막날짜
                    const after_date = end_date.setDate(end_date.getDate() + 8);//8일 후

                    const review_check = list.review;   //리뷰 존재 유무

                    return (
                        <div className="container mt-5 mb-5">
                            <div className="d-flex justify-content-center row">
                                <div className="col-md-10">
                                    <div className="row p-2 bg-white border rounded align-items-center">
                                        <MemUseList list={list} />


                                        <div className="align-items-center align-content-center col-md-2 border-left mt-1">
                                            <div className="d-flex flex-column mt-4">


                                                {/* 리뷰확인 */}
                                                {review_check === 1 ?
                                                    <Link to={'Myreview'}
                                                        state={{ 'CLI_ID': list.RES_CLI_ID, 'RES_IDX': list.RES_IDX, 'after_date': after_date }}>
                                                        <button type="button" className="btn btn-primary m-1">리뷰확인</button></Link>
                                                    : <div>
                                                        <button type="button" className="btn btn-primary m-1" onClick={() => { setReviewShow(true) }}>리뷰확인</button>
                                                        <NoReviewModal show={reviewShow} onHide={() => setReviewShow(false)} />
                                                    </div>
                                                }




                                                {/* 리뷰쓰기 */}
                                                {new Date().getTime() < after_date ?
                                                    (review_check === 0 ?
                                                        <Link to=""><button type="button" className="btn btn-info m-1"
                                                            onClick={() => { setResidx(list.RES_IDX); setBoardno(list.RES_BOARD_NO); setModalShow(true); }}>리뷰쓰기</button></Link>
                                                        : <Link to="" className="disable-link"><button type="button" className="btn btn-outline-info m-1" disabled>리뷰쓰기</button></Link>)
                                                    : <Link to="" className="disable-link"><button type="button" className="btn btn-outline-primary m-1" disabled>리뷰쓰기</button></Link>}


                                                <Link to={'InsertReport'}
                                                    state={{ 'REPORT_ID': list.RES_CLI_ID, 'REPORT_RES_NO': list.RES_IDX, 'REPORT_MEM_IDX': list.RES_HOST_ID }}>
                                                    <button className="btn btn-danger m-1">신고하기</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                })
                : <div className="mt-5 mb-5 d-flex justify-content-center"><h4>이용내역이 없습니다.</h4></div>
            }
            </div>

        </div>
    )
}


//리뷰 없을 때 모달
const NoReviewModal = (props) => {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                작성한 리뷰가 존재하지 않습니다.
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary " onClick={props.onHide}>확인</button>
            </Modal.Footer>
        </Modal>
    )
}


export default MemUseListPage

