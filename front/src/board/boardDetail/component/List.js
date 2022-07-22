import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../component/card.css'
const List = (boardList) => {

  return (

    <div>
        {boardList.map(list => {return (
        <ul key = {list.BOARD_NO}>
            <li>
            <Link to={'Detail/'} state={{'BOARD_NO' : list.BOARD_NO}} className="card">
              <img src={list.URL} className="card__image" alt="" />
              <div className="card__overlay">
                <div className="card__header">
                  <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
                  <img className="card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" />
                  <div className="card__header-text">
                    <h3 className="card__title">Jessica Parker</h3>            
                    <span className="card__status">1 hour ago</span>
                  </div>
                </div>
                <p className="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
              </div>
            </Link>      
          </li>
          </ul>
        )})}
    </div>

  )
}

export default List