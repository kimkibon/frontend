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
        axios({
            method: 'post',
            url: "/GareBnB/Auth.do",
            params: { 'MEM_ID': id }
        }).then(Response => {
            console.log(Response)
            if (Response.data.MEM_LEVEL >= BOARD_LEVEL) {
                alert("권한이 없습니다.");
                navigate(-1);
                //mem_level 값과 page_level을 비교해서 권한이 없으면 뒤로가기
            } else {
                return ({
                    'MEM_LEVEL' : Response.data.MEM_LEVEL,
                    'MEM_IDX' : Response.data.MEM_IDX
                })
            } //권한을 만족하면 level과 idx를 세팅
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