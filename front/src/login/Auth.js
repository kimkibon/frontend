import axios from "axios";

async function Auth(BOARD_LEVEL , navigate) {

    return (await new Promise((resolve, reject) => {
        const id = localStorage.getItem("MEM_ID");

        axios({
            method: 'post',
            url: "/GareBnB/Auth.do",
            params: { 'MEM_ID': id }
        }).then(Response => {
            if (Response.data.MEM_LEVEL > BOARD_LEVEL) {
                alert("권한이 없습니다.");
                navigate(-1);
            } else {
                return ({
                    'MEM_LEVEL' : Response.data.MEM_LEVEL,
                    'MEM_IDX' : Response.data.MEM_IDX
                })
            }
        }).then(data => {
            resolve(data);
        }).catch(err =>{
            navigate('/login/loginPage')
            alert("로그인을  해주세요")
        })
    })

    )
}

export default Auth;