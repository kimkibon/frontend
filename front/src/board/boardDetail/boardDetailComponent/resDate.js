import axios from 'axios';

async function resDate(BOARD_NO) {
  return (await new Promise((resolve, reject) => {

    axios({
      method: 'post',
      url: '/GareBnB/Board/ResList.do',
      params: { 'RES_BOARD_NO': BOARD_NO }

    }).then(Response => {

      Response.data.map(date => {
        date.start = new Date(date.start);
        date.end = new Date(date.end);
      })

      resolve(Response.data)

    }).catch(err => {
      reject(err);

    });

  })
  )
}

export default resDate