import secret_key from './secret_sms';
import axios from 'axios';
import Cache from 'memory-cache';
import CryptoJS from 'crypto-js';

const date = Date.now().toString;  
const uri = secret_key.NCP_serviceID;
const secretKey = secret_key.NCP_secretKey;
const accessKey = secret_key.NCP_accessKey;
const method = 'POST';
const space =" ";
const newLine = "\n";
const url = 'https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages';
const url2 = '/sms/v2/services/${uri}/messages';

// 헤더생성
const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

// x-ncp-apigw-signature-v2 속성 설정을 위한 선언들
hmac.update(method);
hmac.update(space);
hmac.update(url2);
hmac.update(newLine);
hmac.update(date);
hmac.update(newLine);
hmac.update(accessKey);

const hash = hmac.finalize();
const signature = hash.toString(CryptoJS.enc.Base64);  //signature 선언

exports.send = async function(req, res){  //인증문자 발송 함수
    const phoneNumber = req.body.phoneNumber;  //핸드폰번호 받기

    Cache.del(phoneNumber); //캐시삭제?이건 왜해주는걸까

    const verifyCode = Math.floor(Math.random()*(999999-100000))+100000; //난수로 인증번호 설정

    Cache.put(phoneNumber, verifyCode.toString); //인증번호 캐시에 저장?

    axios({
        method: method,  //POST
        json: true,  //JSON으로 전송
        url: url,  //api url
        headers:{  //헤더(수정X)
            'Content-Type' : 'application/json',
            'x-ncp-iam-access-key': accessKey,
            'x-ncp-apigw-timestamp': date,
            'x-ncp-apigw-signature-vw': signature,
        },
        data:{  //데이터
            type:'SMS',  //SMS로 전송
            contentType:'COMM', //광고문자 아닌 일반문자 전송
            countryCode:'82', //대한민국
            from: '01039578057',  //발신번호(등록해놓음)
            content:'[KOO]인증번호 [${verifyCode}를 입력해주세요.',  //내용
            messages:[
                {
                    to: '${phoneNumber}'  //수신번호(숫자사이 - 없어야함)
                },
            ],
        },
    })
    .then(function (res){  //성공여부 확인
        res.send(response(baseResponse.SMS_SEND_SUCCESS));
    })
    .catch((err)=>{
        if(err.res==undefined){
            res.send(response(baseResponse.SMS_SEND_SUCCESS));
        }
        else res.send(errResponse(baseResponse.SMS_SEND_FAILURE));
    });
};
exports.verify=async function(req,res){ //인증문자 검증함수
        const phoneNumber= req.body.phoneNumber;  //사용자 입력폰번호
        const verifyCode = req.body.verifyCode;  //사용자 입력인증번호

        const CacheData = Cache.get(phoneNumber);  //캐시에 저장된 정보

        if(!CacheData){  //캐시에 저장된게 없을떄?(전송을 안했을떄?)
            return res.send(errResponse(baseResponse.FAILURE_SMS_AUTHENTICATION));
        }else if (CacheData!== verifyCode){  //캐시에 저장된 정보와 사용자가 입력한 인증번호가 다를시
            return res.send(errResponse(baseResponse.FAILURE_SMS_AUTHENTICATION));
        }else{  //인증ok시
            Cache.del(phoneNumber);
            return res.send(response(baseResponse.SMS_VERIFY_SUCCESS));
        }
};
