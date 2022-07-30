import axios from 'axios';
import { useNavigate } from 'react-router-dom';


//파일 인서트 컴포넌트 
async function InsertHostFiles(file, MEM_IDX, index) {

    const navigate = useNavigate();

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
                'MEM_IDX': MEM_IDX,
                'FILE_BOARD_TYPE': '1',
                'FILE_LEVEL': index
            },
            data: formData,
            mode: 'cors'

        }).then(Response => {
            console.log(Response.data)
            navigate('/') // 메인 화면으로 이동
        }).catch((err) => {
            alert('호스트 전환에 실패했습니다. 다시 시도해주세요.');
            reject(err);
        })



    })


    )
}

export default InsertHostFiles