import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode';

const HostAddress = (props) => {
    const setAddrInfo = props.setAddrInfo;

    const onCompletePost=(data)=>{
        const post = data.zonecode;
        const addr = data.jibunAddress;

        setAddrInfo({
            'HOST_POST' : post ,
            'HOST_ADDR1' : addr
        })
        console.log(data);
        
    }

    return (

            <Modal.Body>
                <DaumPostcode
                    onComplete={onCompletePost}
                    autoClose
                />
            </Modal.Body>

    )
}

export default HostAddress