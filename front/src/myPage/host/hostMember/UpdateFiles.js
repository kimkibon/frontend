import axios from 'axios';


//파일 업데이트 컴포넌트 (DELETE, INSERT, UPDATE)
async function UpdateFiles(file, MEM_IDX, index, FILE_BOARD_TYPE) {

    return (await new Promise((reject) => {

        let formData = new FormData();
        formData.append(index, file);
        axios({
            method: 'post',
            url: '/GareBnB/file/update.do',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                'BOARD_NO': MEM_IDX,
                'FILE_BOARD_TYPE': FILE_BOARD_TYPE,
                'FILE_LEVEL': index,
                "FILE_MODIFY_NO" : '0'
            },
            data: formData,
            mode: 'cors'

        }).catch((err) => {
            alert('호스트 정보 수정에 실패했습니다. 다시 시도해주세요.');
            reject(err);
        })
    })
    )
}

export default UpdateFiles