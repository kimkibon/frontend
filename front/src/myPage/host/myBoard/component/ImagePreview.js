import React from "react";

//이미지 프리뷰 하기 위한 컴포넌트 
function ImagePreview({ image, deleteFunc }) {
    return (
        <div className="card">
            <img
                src={image}
                alt="preview"
                className="card-img d-block w-100"
                width='700px'
                height='400px'
            />
            <div className="card-img-overlay">
                <div className="row">
                    <div className="col-sm-1">
                        <br/>
                    </div>
                    <div className="col-sm-11">
                        <button
                            className="btn btn-danger card-title"
                            onClick={() => deleteFunc()}
                        >
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImagePreview