import axios from 'axios'

async function Detail(BOARD_NO, BOARD_MODIFY_NO) {
    
  return (await new Promise((resolve,reject)=>{

    axios({
      method : 'post',
      url : '/GareBnB/mypage/resRequestDetail.do',
      params : {
        'BOARD_NO' : BOARD_NO,
        'BOARD_MODIFY_NO' : BOARD_MODIFY_NO
      }
    }).then(Response => {
      resolve(Response.data);
    }).catch(err => {
      reject(err);
    });

  })

)}

export default Detail

//보드 디테일에서 가져올 수 없는 정보들 (전화번호)를 서버에 요청함