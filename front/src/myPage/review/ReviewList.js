import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ReviewList = (props) => {

  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    axios({
      method: 'post',
      url: '/GareBnB/board/boardReview.do',
      contentType: "application/json;charset=UTF-8",
      params: {
        BOARD_NO: props

      }
    }).then(Response => {
      setReviewList(Response.data);
    });
  }, [props]);
  return (
    <div>
      <h2>후기</h2>
      {reviewList[0] !== undefined && reviewList.map((list) => {
        return (
          <div>
            {list.REVIEW_MEM_ID}님의 후기<br />
            평점 : {list.SCORE} 작성일자 : {list.REVIEW_DATE}<br />
            {list.REVIEW_CONTENT}<br />
          </div>
        )

      })}

    </div>
  )
}

export default ReviewList