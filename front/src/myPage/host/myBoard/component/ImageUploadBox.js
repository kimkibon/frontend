import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "react-bootstrap";
import ImagePreview from "./ImagePreview";
import dragImage from "../../../../commons/images/dragImage.jpeg"

function ImageUploadBox(props) {
    const max = 10;
    const [uploadedImages, setUploadedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [imageFile, setImageFile] = useState([]);
    const uploadBoxRef = useRef();
    const inputRef = useRef();
    // 기본 변수 초기화 

    useEffect(() => {
        if (props.beforeImages !== undefined) {
            props.beforeImages.map(file => {
                setImageFile((imageFile) => [...imageFile, file]);
                setUploadedImages((uploadedImages) => [...uploadedImages, file.URL]);
            })
        }
    }, [props.beforeImages])

    useEffect(() => {
        const uploadBox = uploadBoxRef.current;
        const input = inputRef.current;

        const handleFiles = (files) => {
            for (const file of files) {
                const fileName = file.name.toString();
                if (!file.type.startsWith("image/")) continue;
                const reader = new FileReader();
                reader.onloadend = (e) => {
                    const result = e.target.result;
                    if (result) {
                        const resultSet = { FILE_NAME: fileName, URL: result }
                        setImageFile((imageFile) => [...imageFile, resultSet]);
                        setUploadedImages((state) => [...state, result].slice(0, max));
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        //블로그 보고 가져온거라서 정확한 작동방법은 잘 모르겠습니다....

        const changeHandler = (event) => {
            const files = event.target.files;
            handleFiles(files);
        };

        // onChange() 이벤트 발생시 handleFiles를 호출 

        const dropHandler = (event) => {
            event.preventDefault();
            event.stopPropagation();
            const files = event.dataTransfer.files;
            handleFiles(files);
        };

        //아이템(이미지) 드롭 이벤트 발생시 handleFiles 를 호출

        const dragOverHandler = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };

        uploadBox.addEventListener("drop", dropHandler);
        uploadBox.addEventListener("dragover", dragOverHandler);
        input.addEventListener("change", changeHandler);

        //이벤트리스너 추가 

        return () => {
            uploadBox.removeEventListener("drop", dropHandler);
            uploadBox.removeEventListener("dragover", dragOverHandler);
            input.removeEventListener("change", changeHandler);
        };

    }, [max]);

    useEffect(() => {
        const imageJSXs = uploadedImages.map((image, index) => {
            const isDeleteImage = (element) => {
                return element === image;
            };
            const deleteFunc = () => {
                const DeleteIndex = uploadedImages.findIndex(isDeleteImage)
                uploadedImages.splice(DeleteIndex, 1);
                imageFile.splice(DeleteIndex, 1);
                setUploadedImages([...uploadedImages]);
                setImageFile([...imageFile]);
            };

            //삭제 버튼을 눌렀을 경우 작동하는 이벤트 추가

            props.getImages(imageFile)
            return (
                <Carousel.Item key={index} >
                    <ImagePreview image={image} deleteFunc={deleteFunc} />
                </Carousel.Item>
            );

            //변환된 이미지를 화면에 표시 

        });
        setPreviewImages(imageJSXs);
    }, [uploadedImages]);


    return (
        <div className="row">
            <label className="drag_or_click" htmlFor='id' ref={uploadBoxRef}>
                <Carousel>
                    {uploadedImages[0] !== undefined && previewImages}
                    <Carousel.Item>
                        <div className="card">
                            <img
                                alt=""
                                src={dragImage}
                                className="card-img d-block w-100"
                                width='700px'
                                height='400px'
                            />
                        </div>
                    </Carousel.Item>
                </Carousel>
            </label>
            <div className="input-group d-none">
                <input
                    className="d-lg-none"
                    type="file"
                    multiple="multiple"
                    accept="image/*"
                    id='id'
                    ref={inputRef}
                    files={imageFile}
                />
            </div>
        </div>
    );
}

export default ImageUploadBox;