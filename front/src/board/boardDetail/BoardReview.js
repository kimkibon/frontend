import axios from 'axios';

async function BoardReview (BOARD_NO) {

  return (await new Promise((resolve , reject)=>{
    
      axios({
        method : 'post',
        url : '/GareBnB/board/boardReview.do',
        params : {'BOARD_NO' : BOARD_NO}
      }).then(Response=>{
        resolve(Response.data);
      }).catch(err => {
        reject(err);
      });

    })

  )}

export default BoardReview