import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "react-bootstrap";
import ImagePreview from "./ImagePreview";

function ImageUploadBox(props) {
    const max = 10;
    const [uploadedImages, setUploadedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [imageFile, setImageFile] = useState([]);
    const uploadBoxRef = useRef();
    const inputRef = useRef();
    const formData = new FormData();

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
                        const resultSet = { fileName: fileName, url: result }
                        setImageFile((imageFile) => [...imageFile, resultSet]);
                        setUploadedImages((state) => [...state, result].slice(0, max));
                    }
                };
                reader.readAsDataURL(file);
            }
        };

        const changeHandler = (event) => {
            const files = event.target.files;
            handleFiles(files);

        };

        const dropHandler = (event) => {
            event.preventDefault();
            event.stopPropagation();
            const files = event.dataTransfer.files;
            handleFiles(files);
        };

        const dragOverHandler = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };

        uploadBox.addEventListener("drop", dropHandler);
        uploadBox.addEventListener("dragover", dragOverHandler);
        input.addEventListener("change", changeHandler);

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
            props.getImages(imageFile)
            return (
                <Carousel.Item key={index} >
                    <ImagePreview image={image} deleteFunc={deleteFunc} />
                </Carousel.Item>
            );
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
                                className="card-img d-block w-100"
                                width='700px'
                                height='400px'
                            />
                            <div className="card-img-overlay">
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <h1 className="input-group-text">
                                            드래그 또는 클릭하여 업로드
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </label>
            <div className="input-group">
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