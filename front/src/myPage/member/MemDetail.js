
// 회원정보 보기 (수정하기 버튼), (회원 탈퇴) 도 같은 페이지에 보여야 함)
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Auth from '../../login/Auth';
import { Modal } from 'react-bootstrap';

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
            console.log(author)
            axios({
                method: 'post',
                url: '/GareBnB/mypage/MemDetail.do',
                contentType: "application/json; charset=UTF-8",
                params: {
                    MEM_IDX: Response.MEM_IDX
                }
            })
                .then(Response => {
                    console.log(Response.data);
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
            alert("비밀번호가 일치하지 않습니다")
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
                console.log(Response.data);
                setmemDelete(Response.data);
                // 메인페이지로 이동하는 링크 작성!!!
            })
    };

    const handleShow = () => { // 모달창 열림
        setShow(true);
    }
    const handleClose = () => { // 모달창 닫힘
        setShow(false);
        // 메인페이지로 이동하는 링크 작성!!!!!
    }


    return (

        <div className="container px-4 px-lg-5 my-5">
            <h1>회원정보 보기</h1>
            <div className='row'>
                <label for="staticEmail" class="col-md-4 col-form-label">아이디</label>
                <div className='col-md-8'>
                    <input type='text' value={memDetail.MEM_ID} class="form-control"></input></div>
            </div>

            <div className='row'>
                <label for="staticEmail" class="col-md-4 col-form-label">이름</label>
                <div className='col-md-8'>
                    <input type='text' value={memDetail.MEM_NAME} class="form-control"></input></div>
            </div>

            <div className='row'>
                <label for="staticEmail" class="col-md-4 col-form-label">비밀번호(임시)</label>
                <div className='col-md-8'>
                    <input type='text' value={memDetail.MEM_PW} class="form-control"></input></div>
            </div>

            <div className='row'>
                <label for="staticEmail" class="col-md-4 col-form-label">휴대폰 번호</label>
                <div className='col-md-8'>
                    <input type='text' value={memDetail.MEM_PHONE} class="form-control"></input></div>
            </div>

            <div class="row">
                <div className='col-lg-6 col-sm-12 text-lg-start'>
                    <Button className="btn btn-light" type="button" >
                        <Link to={'../member/MemModify'} style={{ textDecoration: "none" }} state={{ mem: memDetail }}>수정하기</Link>

                    </Button>
                </div>
                <div className='col-lg-6 col-sm-12 text-lg-end'>
                    <Button className="btn btn-light" type="button" onClick={handleShow}>
                        탈퇴하기
                    </Button>
                </div>


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>정말로 탈퇴하시겠습니까?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        비밀번호를 입력하신 후, 탈퇴 버튼을 클릭하시면 탈퇴 처리가 완료됩니다.
                        <input type="password" placeholder='비밀번호를 입력하세요' onChange={e => setOriginPw(e.target.value)} >
                        </input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={PWCHECK}>탈퇴</Button>
                        <Button variant="secondary" onClick={handleClose}>취소</Button>
                    </Modal.Footer>
                </Modal>


            </div>
        </div>

    )
}

export default MemDetail 