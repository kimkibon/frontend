import axios from 'axios';


//파일 인서트 컴포넌트 
async function InsertFiles(file, BOARD_NO, index, BOARD_MODIFY_NO) {

    return (await new Promise((reject) => {

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
                'FILE_LEVEL': index,
                'BOARD_MODIFY_NO' : BOARD_MODIFY_NO
            },
            data: formData,
            mode: 'cors'

        }).then(Response => {
            console.log(Response.data)
        }).catch((err) => {
            alert('예약 요청에 실패했습니다. 다시 시도해주세요.');
            reject(err);
        })



    })


    )
}

export default InsertFiles