import axios from 'axios';


//파일 업데이트 컴포넌트 (DELETE, INSERT, UPDATE)
async function FileDelete(MEM_IDX, FILE_BOARD_TYPE) {

    return (await new Promise((resolve, reject) => {

        axios({
            method: 'post',
            url: '/GareBnB/file/delete.do',
            params: {
                'BOARD_NO': MEM_IDX,
                'FILE_BOARD_TYPE': FILE_BOARD_TYPE,
                "FILE_MODIFY_NO": '0'
            },
            mode: 'cors'

        }).then(Response => {
            resolve(Response);
        }).catch((err) => {
            alert('호스트 정보 수정에 실패했습니다. 다시 시도해주세요.');
            reject(err);
        })
    })
    )
}

export default FileDelete