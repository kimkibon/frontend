import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ResRequest = () => {
  const res = useLocation().state;

 useEffect(() => {
   
  console.log(location)


 }, [])
 
console.log()
  return (<div className="col mb-5">
  <div className="card h-100">
    <div className="card-body p-4">
      <div className='row'>
        <div className='col-sm-3'>
          <div className="text-left">
            <h5 className="fw-bolder">{}</h5>
          </div>
        </div>
        <div className='col sm-9'>
          <span className='text-right'>날짜 , 별점</span>
        </div>
      </div>

    </div>
    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
    </div>
  </div>

</div>
  )
}

export default ResRequest