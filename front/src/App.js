import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './index/Main';
import Header from './commons/Header';
import Footer from './commons/Footer';
import Join from './join/Join';
import MyPageIndex from './myPage/MyPageIndex';
import LoginIndex from './login/LoginIndex';
import BoardIndex from './board/BoardIndex';
import AdminIndex from './admin/AdminIndex';
import { useState, useEffect } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import Sidebar from './commons/Sidebar';
import AdminSidebar from './commons/AdminSidebar';
import Auth from './login/Auth';

function App() {
  const [open, setOpen] = useState(false);

  // Auth
  const mem_id = localStorage.getItem("MEM_ID");
  const [memberLevel, setMemberLevel] = useState({
    MEM_LEVEL:''
  });
  console.log(mem_id);
  const {MEM_LEVEL} = memberLevel;
 
  //level 1 -> 호스트,,,,
  useEffect(() => { // 레벨 4 이하인(일반,호스트,관리자) 접근 가능. MEM_IDX 받아오기
    Auth(4).then(Res => {
          setMemberLevel({
            ...memberLevel,
            'MEM_LEVEL': Res.MEM_LEVEL,
            })
          })
  }, []);
  console.log(memberLevel);

  return (
    <div>
      <BrowserRouter>
      <div className='row'>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        click
      </Button>
        <Header />
</div>
        <div className="container-fluid min-vh-100">
          <div className='row'>
            <Collapse className='col col-sm-2'  in={open} dimension="width">
              <div className='z-index-2000'>
                {MEM_LEVEL === 0?<AdminSidebar style={{ width: '300px' }}/>
                :<Sidebar style={{ width: '300px' }}/>}
                
              </div>
            </Collapse>
            <div className='col'>
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
        </div>


        <Footer />
      </BrowserRouter>



    </div>
  );
}

export default App;
