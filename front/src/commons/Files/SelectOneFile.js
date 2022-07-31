import axios from 'axios'

async function SelectOneFile(BOARD_TYPE ,BOARD_NO, FILE_MODIFY_NO) {

  return( new Promise((resolve,reject)=>{
  
    axios({
      method : 'post',
      url : '/GareBnB/file/selectOneFile.do',
      params : {
        'FILE_BOARD_TYPE' : BOARD_TYPE,
        'FILE_BOARD_IDX' : BOARD_NO,
        'FILE_LEVEL' : '0',
        'FILE_MODIFY_NO' : FILE_MODIFY_NO
      }
    })
    .then(Response => {
      resolve(Response.data[0]);
    }).catch(err =>{
      reject(err);
    });

  })

)}

export default SelectOneFile