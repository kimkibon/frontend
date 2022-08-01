import axios from 'axios';


//파일 삭제 컴포넌트 (실제로 삭제는 하지 않고, DEL_GB 만 업데이트)
async function DeleteFiles(file, MEM_IDX, index, FILE_BOARD_TYPE) {

    return (await new Promise((reject) => {

        let formData = new FormData();
        formData.append(index, file);
        axios({
            method: 'post',
            url: '/GareBnB/file/delete.do',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                'FILE_BOARD_IDX': MEM_IDX,
                'FILE_BOARD_TYPE': FILE_BOARD_TYPE,
                'FILE_LEVEL': index,
            },
            data: formData,
            mode: 'cors'

        }).then(Response => {
            console.log(Response.data)
        }).catch((err) => {
            alert('호스트 정보 수정에 실패했습니다. 다시 시도해주세요.');
            reject(err);
        })
    })
    )
}

export default DeleteFiles