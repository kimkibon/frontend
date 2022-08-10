import axios from "axios";

async function Auth(BOARD_LEVEL , navigate) {

    // BOARD_LEVEL 의 접근권한 
    // 0 = 관리자 
    // 1 = 호스트 
    // 2 = 일반회원
    // 3 = 호스트 대기중 일반회원
    // 4 = 호스트 거절된 일반회워 
    // 5 = 탈퇴한 회원
    // 6 = 정지된 회원 

    return (await new Promise((resolve, reject) => {
        if(localStorage.getItem("MEM_ID") === undefined){

            navigate('/login/loginPage')
            //스토리지에 멤버 아이디가 저장되어 있지 않으면 로그인 페이지로 이동
        } else {
            const id = localStorage.getItem("MEM_ID")
            const jwt = localStorage.getItem("JWT");
        axios({
            method: 'post',
            url: "/GareBnB/Auth.do",
            params: { 'JWT': jwt , 'BOARD_LEVEL' : BOARD_LEVEL}
        }).then(Response => {
            const MEM_ID = Response.data.MEM_ID;
            const MEM_LEVEL = Number(Response.data.MEM_LEVEL);
            const MEM_IDX = Number(Response.data.MEM_IDX);
            return({
                'MEM_ID' : MEM_ID ,
                'MEM_LEVEL' : MEM_LEVEL,
                'MEM_IDX' : MEM_IDX
            });
        }).then(data => {
            resolve(data);
        }).catch(err =>{
            console.log(err)
            navigate('/login/loginPage')
            alert("로그인을  해주세요")
        })
    }
    })

    )
}

export default Auth;