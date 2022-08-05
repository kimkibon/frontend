import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import {AiFillAlert, AiFillDatabase, AiFillCarryOut, AiFillEye, AiFillNotification, AiFillInteraction, AiOutlineDown} from "react-icons/ai";
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Offside =()=> {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        MENU
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>MENU</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>myPage</Accordion.Header>
                  <Accordion.Body>
                      <Link to='/myPage/ReserveListPage' className='text-decoration-none'>
                        <span className='title'>RESERVATION</span>
                      </Link><br/>

                    <Link to="/myPage/memUseListPage" className='text-decoration-none'>
                      <span className='title'>이용내역</span>
                    </Link><br/>

                    <Link to="/myPage/qna" className='text-decoration-none'>
                      <span className='title'> QNA </span>
                    </Link><br/>

                  
                    
                  </Accordion.Body>
                </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>

                </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          
        </Offcanvas.Body>

      </Offcanvas>
    </>
  );
}

//render(<Offside/>);
export default Offside;