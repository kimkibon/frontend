import React from 'react';

//board_detail 에서 받아온 리뷰 정보를 출력하는 컴포넌트 

const Review = (review) => {
  // boardDetail 컴포넌트에서 변수를 받아옴. 
  return (
    <div className="container px-4 px-lg-5 mt-5">
      <h2 className="fw-bolder mb-4">Reviews</h2>
      <div className="row">
        {review.prop[0] !== undefined && review.prop.map(view => {
          return (
            <div className="col mb-6">
            <div className="card h-100">
              <div className="card-body p-4">
                <div className='row'>
                  <div className='col-sm-9'>
                    <div className="text-left">
                      <h5 className="fw-bolder">{view.REVIEW_MEM_ID}</h5>
                    </div>
                  </div>
                  <div className='col sm-3'>
                    <span className='text-right'>{view.REVIEW_DATE}</span>
                    <div>{view.SCORE}</div>
                  </div>
                </div>
                <div className='row'>
                  <div><br/></div>
                  <div className='col'>
                    <span>{view.REVIEW_CONTENT}</span>
                  </div>
                </div>
              </div>
              <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
              </div>
            </div>

          </div>
          )
        })}
        {review.prop[0] === undefined &&
          <div className="col mb-5">
            <div className="card h-100">
              <div className="card-body p-4">
                <div className='row'>
                  <div className='col-sm-9'>
                    <div className="text-left">
                      <h5 className="fw-bolder">아직 리뷰가 없습니다.</h5>
                    </div>
                  </div>
                  <div className='col sm-3'>
                    <span className='text-right'>날짜 , 별점</span>
                  </div>
                </div>
                <div className='row'>
                  <div><br/></div>
                  <div className='col'>
                    <span>첫 리뷰를 작성해주세요!</span>
                  </div>
                </div>
              </div>
              <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
              </div>
            </div>

          </div>
        }

      </div>
    </div>
  )
}

export default Review