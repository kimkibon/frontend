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
        <header>
          <Header />
        </header>
  
        <div class="container-fluid min-vh-100">
          <div class="row">        
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
 
 
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>

    

    </div>
  );
}

export default App;
