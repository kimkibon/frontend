import axios from 'axios';

async function resDate(BOARD_NO) {
  return (await new Promise((resolve, reject) => {

    axios({
      method: 'post',
      url: '/GareBnB/Board/ResList.do',
      params: { 'RES_BOARD_NO': BOARD_NO }

    }).then(Response => {
      const exDate = [];

      Response.data.map(date =>{
        exDate.push({'start' : new Date(date.RES_DATE_START) , 'end' : new Date(date.RES_DATE_END)})
      })
      resolve(exDate)

    }).catch(err => {
      reject(err);

    });

  })
  )
}

export default resDate