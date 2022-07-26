import axios from 'axios'

async function Reviewcheck(mem_id ,board_no) {

  return( new Promise((resolve,reject)=>{

    axios({
        method : 'post' ,
        url : '/GareBnB/mypage/myReview.do' ,
        contentType:"application/json;charset=UTF-8",
        params : {
            MEM_ID : mem_id,
            BOARD_NO : board_no
    
        }
    })
    .then(Response => {
        Response.data ? resolve(1) : resolve(0)
    }).catch(err =>{
      reject(err);
    });

  })

)}

export default Reviewcheck
