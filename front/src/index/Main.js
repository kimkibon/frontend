import React from 'react'
import homeImage from '../commons/images/homeImage.png';
import '../commons/style.css'

const Main = () => {
  return (
    <div>
        {/* <!--Banner Area Start --> */}
        <section class="banner-area">
          <div class="banner-area__img">
            <img src={homeImage} alt="banner-img" class="img-fluid"/>
                <div class="banner-area__content">
                      <div className='context'>
                        <h2>Premium care for
                            premium people.</h2>
                      </div>
                        {/* <button type="button" class="Search-Button">찾아보기</button> */}
                          <a href='/board'>
                            <button type="button" class="btn2 btn-outline-warning">Search</button>
                          </a>
                </div>
          </div>
        </section>
    </div>
    
  )
}

export default Main