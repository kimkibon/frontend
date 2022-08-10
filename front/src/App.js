import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './index/Main';
import Header from './commons/Header';
import Footer from './commons/Footer';
import Join from './join/Join';
import MyPageIndex from './myPage/MyPageIndex';
import LoginIndex from './login/LoginIndex';
import BoardIndex from './board/BoardIndex';
import AdminIndex from './admin/AdminIndex';
import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import Sidebar from './commons/Sidebar';
import LogOutComponent from './commons/LogOutComponent';

function App() {
  const [open, setOpen] = useState(false);

  const openCollapse = () => {
    setOpen(!open);
  }

  return (
    <div>
      <BrowserRouter>

            <Header props={{'openCollapse' : openCollapse , 'open' : open}}/>
          
        <div className="container-fluid min-vh-100">
          <div className='row'>
            <Collapse className='col col-sm-2' in={open} dimension="width">
              <div className='z-index-2000 col-fluid' style={{ width: '300px' }} >
                <Sidebar />

              </div>
            </Collapse>
            <div className='col col-fluid'>
              <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/join/*' element={<Join />} />
                <Route path='/login/*' element={<LoginIndex />} />
                <Route path='/myPage/*' element={<MyPageIndex />} />
                <Route path='/LogOutComponent' element={<LogOutComponent/>}/>
                <Route path='/board/*' element={<BoardIndex />} />

                <Route path='/admin/*' element={<AdminIndex />} />
              </Routes>
            </div>
          </div>
        </div>


        <Footer />
      </BrowserRouter>



    </div>
  );
}

export default App;
