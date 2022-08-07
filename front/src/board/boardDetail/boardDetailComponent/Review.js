import axios from 'axios';
import React from 'react';
import { Rating } from 'react-simple-star-rating';

//board_detail 에서 받아온 리뷰 정보를 출력하는 컴포넌트 

const Review = (review) => {
  // boardDetail 컴포넌트에서 변수를 받아옴. 

  const deleteReview = (reviewIDX) => {
    axios({
      method: 'post',
      url: 'GareBnB/Admin/deleteReview.do',
      params: {
        'REVIEW_IDX': reviewIDX
      }
    }).then(
      alert('리뷰가 삭제되었습니다.')
    )
  }

  return (
    <div className="container px-4 px-lg-5 mt-5">
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
                      <p>
                        <Rating initialValue={(view.SCORE) * 20} readonly  size='20px' className='mb-2'  />
                      </p>
                    </div>
                  </div>
                  <div className='row'>
                    <div><br /></div>
                    <div className='col col-sm-11'>
                      <span>{view.REVIEW_CONTENT}</span>
                    </div>
                    {review.auth.MEM_LEVEL === 0 &&
                      <div className='col col-sm-1'>
                        <button className='btn - btn-danger' onClick={() => deleteReview(view.REVIEW_IDX)}>
                          삭제
                        </button>
                      </div>
                    }
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
                    <p className='text-right'>날짜 </p>
                    <p> 별점 
                      <Rating initialValue={(0) * 20} readonly size='20px' className='mb-2' />
                    </p>
                  </div>
                </div>
                <div className='row'>
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