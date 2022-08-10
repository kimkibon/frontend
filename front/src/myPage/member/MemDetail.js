// 회원정보 보기 (수정하기 버튼), (회원 탈퇴) 도 같은 페이지에 보여야 함)
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import Auth from '../../login/Auth';

const MemDetail = () => {
    const Navigate = useNavigate();
    const [author, setAuthor] = useState({});
    const [memDetail, setMemDetail] = useState([]);
    const [insertModal, setInsertModal] = React.useState(false);
    const [memDelete, setmemDelete] = useState([]);
    const [originPw, setOriginPw] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {// 회원정보 보여주기
        Auth(4, Navigate).then(Response => {
            setAuthor(Response)
            axios({
                method: 'post',
                url: '/GareBnB/mypage/MemDetail.do',
                contentType: "application/json; charset=UTF-8",
                params: {
                    MEM_IDX: Response.MEM_IDX
                }
            })
                .then(Response => {
                    setMemDetail(Response.data);
                })
        })// auth
    }, []);

    const PWCHECK = () => {
        if (originPw === memDetail.MEM_PW) { // 비밀번호와 입력한 비밀번호가 일치하면 회원 탈퇴 진행
            alert("탈퇴가 완료되었습니다")
            onDeleteMem(memDetail.MEM_ID) // 탈퇴 진행 (레벨 6으로 업데이트)
            window.location.href = '../index/' // 메인 페이지로 이동 

        } else {
            alert("비밀번호를 다시 확인해주세요")
        }
    }

    const onDeleteMem = () => { // 회원 탈퇴
        axios({
            method: 'post',
            url: '/GareBnB/mypage/memDelete.do',
            contentType: "application/json; charset=UTF-8",
            params: {
                MEM_ID: localStorage.MEM_ID
            }
        })
            .then(Response => {
                setmemDelete(Response.data);
                window.location.href = '/';
            })
    };

    const handleShow = () => { // 모달창 열림
        setShow(true);
    }
    const handleClose = () => { // 모달창 닫힘
        setShow(false);
    }

    return (
        <div>
            <div className="container">
                <hr />
                <h3>회원정보 보기</h3>
                <hr /> <br /><br />

                <div className="row d-flex justify-content-end align-items-end ">
                    <label className="col-md-2 col-form-label">아이디</label>
                    <div className='col-md-4 text-center'>
                        <input type='text' value={memDetail.MEM_ID} className="form-control" readOnly></input></div>
                    <div className='col-md-4'></div>
                </div><br />

                <div className="row d-flex justify-content-end align-items-end">
                    <label className="col-md-2 col-form-label">이름</label>
                    <div className='col-md-4 text-center'>
                        <input type='text' value={memDetail.MEM_NAME} className="form-control" readOnly></input></div>
                    <div className='col-md-4'></div>
                </div><br />

                <div className="row d-flex justify-content-end align-items-end">
                    <label className="col-md-2 col-form-label">비밀번호</label>
                    <div className='col-md-4 text-center'>
                        <input type='text' value={memDetail.MEM_PW} className="form-control" readOnly></input></div>
                    <div className='col-md-4'></div>
                </div><br />

                <div className="row d-flex justify-content-end align-items-end">
                    <label className="col-md-2 col-form-label">휴대폰 번호</label>
                    <div className='col-md-4 text-center'>
                        <input type='text' value={memDetail.MEM_PHONE} className="form-control" readOnly></input></div>
                    <div className='col-md-4'></div>
                </div><br /><br />


                <div className="row">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className='col-md-3'>
                            <Button className="btn btn-primary " type="button">
                                <Link to={'../member/MemModify'} style={{ textDecoration: "none", color: "white" }} state={{ mem: memDetail }}>수정</Link>
                            </Button> &nbsp;

                        </div></div>
                    <div className="row d-flex justify-content-end align-items-end">
                        <div className='col-md-2'>
                            <button type="button" className="btn btn-link" style={{ color: "lightgray" }} onClick={handleShow}>탈퇴</button>
                        </div></div>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>정말로 탈퇴하시겠습니까?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ color: 'red' }}>
                            탈퇴 후에는 해당 아이디로 다시 가입할 수 없으며, <br /> 아이디와 데이터는 복구할 수 없습니다. <br /><br /></div>
                        <div>
                            <h5>비밀번호 재확인</h5></div>
                        <input type="password" placeholder='비밀번호를 입력하세요' onChange={e => setOriginPw(e.target.value)} className="form-control">
                        </input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>취소</Button>
                        <Button variant="light" onClick={PWCHECK} style={{ color: "white" }}>탈퇴</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    )
}

export default MemDetail 