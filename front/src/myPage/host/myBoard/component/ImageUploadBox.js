import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "react-bootstrap";
import ImagePreview from "./ImagePreview";

function ImageUploadBox({ max = 10 }) {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const uploadBoxRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        const uploadBox = uploadBoxRef.current;
        const input = inputRef.current;

        const handleFiles = (files) => {
            for (const file of files) {
                if (!file.type.startsWith("image/")) continue;
                const reader = new FileReader();
                reader.onloadend = (e) => {
                    const result = e.target.result;
                    if (result) {
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
                uploadedImages.splice(uploadedImages.findIndex(isDeleteImage), 1);
                setUploadedImages([...uploadedImages]);
            };
            return (
                <Carousel.Item key={index} >
                    <ImagePreview image={image} deleteFunc={deleteFunc} />
                </Carousel.Item>

            );
        });
        setPreviewImages(imageJSXs);
        console.log(uploadedImages);
        console.log(previewImages);
    }, [uploadedImages]);

    return (
        <div className="row">
            <label className="drag_or_click" htmlFor='id' ref={uploadBoxRef}>
                <Carousel >
                    {previewImages[0] === undefined && <img src="" alt="" width='700px' height='400px' /> }
                    {previewImages[0] !== undefined && previewImages}
                </Carousel>
                <div className="input-group">
                    <h3 className="input-group-text">드래그 또는 클릭하여 업로드</h3>
                </div>
            </label>
            <div className="input-group">
            <input type="file" multiple accept="image/*" id='id' ref={inputRef} />
            <div className="col-sm-9">

            </div>
            </div>
        </div>
    );
}

export default ImageUploadBox;