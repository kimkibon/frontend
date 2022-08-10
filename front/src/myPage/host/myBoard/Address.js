import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode';

const Address = (props) => {
    const setAddrInfo = props.setAddrInfo;

    const onCompletePost=(data)=>{
        const post = data.zonecode;
        const addr = data.jibunAddress;

        setAddrInfo({
            'BOARD_POST' : post ,
            'BOARD_ADDR1' : addr
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

export default Address