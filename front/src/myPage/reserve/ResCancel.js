import axios from 'axios';
import { useLocation} from 'react-router-dom';

//예약취소
const ReserveCancel =() => {

    const location = useLocation();

    return (
        axios({
            method : 'post' ,
            url : '/GareBnB/mypage/ResCancel.do' ,
            contentType:"application/json;charset=UTF-8",
            params : {
                RES_IDX : location.state.res_idx
            }
        }).then(Response => {
            window.location.href="./"
        })
        
        

    )
}
export default ReserveCancel;