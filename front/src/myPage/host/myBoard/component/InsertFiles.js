import axios from 'axios';

async function InsertFiles(file, BOARD_NO , index) {

    return (await new Promise((resolve, reject) => {

       
            let formData = new FormData();
            formData.append(index, file);
            axios({
                method: 'post',
                url: '/GareBnB/file/insert.do',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    'BOARD_NO': BOARD_NO,
                    'FILE_BOARD_TYPE': '0',
                    'FILE_LEVEL': index
                },
                data: formData,
                mode: 'cors'

            }).then(Response => {
                console.log(Response.data)
                // navigate('/')
            }).catch((err) => {
                alert('예약 요청에 실패했습니다. 다시 시도해주세요.');
                reject(err);
            })
        


    })


    )
}

export default InsertFiles