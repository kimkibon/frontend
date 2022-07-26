import axios from 'axios'

async function Detail(BOARD_NO) {
    
  return (await new Promise((resolve,reject)=>{

    axios({
      method : 'post',
      url : '/GareBnB/mypage/resRequestDetail.do',
      params : {
        'BOARD_NO' : BOARD_NO
      }
    }).then(Response => {
      resolve(Response.data);
    }).catch(err => {
      reject(err);
    });

  })

)}

export default Detail