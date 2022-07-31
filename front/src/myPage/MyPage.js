import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../commons/Sidebar';
import ReserveListPage from './reserve/ReserveListPage';

const MyPage = () => {
  return (
      <div>
          <ReserveListPage/>
      </div>

  )
}

export default MyPage