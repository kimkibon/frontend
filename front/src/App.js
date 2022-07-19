import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Main from './index/Main';
import Header from './commons/Header';
import Footer from './commons/Footer';
import Join from './join/Join';
import MyPageIndex from './myPage/MyPageIndex';
import LoginIndex from './login/LoginIndex';
import BoardIndex from './board/BoardIndex';
import IndexList from './index/IndexList';
import AdminIndex from './admin/AdminIndex';

function App() {
  return (
    <div>
    
    
    
    <BrowserRouter>
    <Header/>
    <IndexList/>
    <Routes>
    
      <Route path = '/' element = {<Main/>}/>
      <Route path='/join/*' element ={<Join/>}/>
      <Route path='/login/*' element={<LoginIndex/>}/>
      <Route path='/myPage/*' element={<MyPageIndex/>}/>
      <Route path='/board/*' element={<BoardIndex/>}/>
      <Route path='/admin/*' element={<AdminIndex/>}/>
      
    </Routes>
    <Footer/>
    </BrowserRouter>
    
    
    </div>
  );
}

export default App;
