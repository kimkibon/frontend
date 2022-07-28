import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './index/Main';
import Header from './commons/Header';
import Footer from './commons/Footer';
import Join from './join/Join';
import MyPageIndex from './myPage/MyPageIndex';
import LoginIndex from './login/LoginIndex';
import BoardIndex from './board/BoardIndex';
import AdminIndex from './admin/AdminIndex';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './commons/Sidebar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className='row'>
          <Header />
        </div>
        <div className='row'>
          <div className='col col-sm-3'>
            <Sidebar />
          </div>
          <div className='col col-sm-9'>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/join/*' element={<Join />} />
              <Route path='/login/*' element={<LoginIndex />} />
              <Route path='/myPage/*' element={<MyPageIndex />} />
              <Route path='/board/*' element={<BoardIndex />} />
              <Route path='/admin/*' element={<AdminIndex />} />
            </Routes>
          </div>
        </div>


        <div className='row'>
          <div className='col'>
            <Footer />
          </div>
        </div>

        {/* <Col>
            <Sidebar/>
            </Col> */}


      </BrowserRouter>




      {/* <Col>1 of 2</Col>
        <Col>2 of 2</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>*/}

    </div>

  );
}

export default App;
