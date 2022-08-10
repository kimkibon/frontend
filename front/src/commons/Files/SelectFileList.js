import axios from 'axios'

async function SelectFileList(BOARD_TYPE, BOARD_NO , BOARD_MODIFY_NO) {
    
  return (await new Promise((resolve,reject)=>{

    axios({
      method : 'post',
      url : '/GareBnB/file/selectFiles.do',
      params : {
        'FILE_BOARD_TYPE' : BOARD_TYPE,
        'FILE_BOARD_IDX' : BOARD_NO,
        'FILE_MODIFY_NO' : BOARD_MODIFY_NO
      }
    }).then(Response => {
      resolve(Response.data);
    }).catch(err => {
      reject(err);
    });

  })

)}

export default SelectFileList