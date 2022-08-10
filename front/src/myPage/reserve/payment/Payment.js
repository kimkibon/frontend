import axios from "axios";
import { useEffect } from "react";


const Payment = (props) => {

  const price = props.price;
  const title = props.title;
  const booker = props.booker;
  //const phone = props.phone;
  const res_idx = props.res_idx;

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    }
  }, []);


  function onClickPayment() {
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init('imp42206385');

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'kakaopay',                               // PG사
      pay_method: 'card',                           // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호 = 예약번호
      amount: price,                                // 결제금액
      name: title,                                  // 주문명
      buyer_name: booker,                           // 구매자 이름
      //booker_phone: phone,                        // 구매자 전화번호
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response) {
    const {
      success,
      error_msg,
      paid_at,  //결제날짜
      pg_provider,  //pg사
      paid_amount,    //결제가격
      pay_method


    } = response;


    if (success) {
      alert('결제 성공');
      var date = new Date(paid_at * 1000);
      axios({

        method: 'post',
        url: '/GareBnB/mypage/resPay.do',
        contentType: "application/json;charset=UTF-8",
        params: {
          RES_IDX: res_idx,
          PAY_DATE: date.toISOString().slice(0, 10).replace(/-/g, "/"),
          PG: pg_provider,
          PAY_PRICE: paid_amount,
          PAY_METHOD: pay_method
        }
      }).then(Response => {

        window.location.href = '/myPage/ReserveListPage';
      });

    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }

  return (
    <div>
      <button type="button" className="btn btn-danger m-1" onClick={onClickPayment}>결제하기</button>
    </div>
  );
}

export default Payment;