import React from 'react';
import './Review.css'

const Review = (review) => {
  return (
    <div className='wrapper'>
{review[0]!==undefined && review.map(view =>{return(
  <div className='speechbubble'>
    <p>
    {view.REVIEW_CONTENT}
      <span className='username'>{view.REVIEW_MEM_ID}</span>
    </p>
  </div>
  )})}
  {review[0]===undefined &&  
  <div>
       <div className='speechbubble'>
    <p>선장님께.

선장님. 저는 오랜 항해를 끝마치고 드디어 육지에 도착했어요.
      <span className='username'></span>      
    </p>
  </div> 
     <div className='speechbubble'>
     <p>
       <span className='username'></span>      
     </p>
   </div> 
   <div className='speechbubble'>
   <p>
     <span className='username'></span>      
   </p>
 </div> 
 </div>
 }
</div>
  )
}

export default Review