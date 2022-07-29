import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

//테스트용 파일입니다. 

const ResRequestDetail = () => {
    
  const onSubmit = async (e) => {
    e.preventDefault();
    e.persist();

    let files = e.target.profile_files.files;
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(i, files[i]);
    }

    const postSurvey = await axios({
      method: "POST",
      url: '/GareBnB/file/insert.do',
      mode: "cors",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      params : {
        'BOARD_NO' : '314' ,
        'FILE_BOARD_TYPE' : 0
      }
    });

    console.log(postSurvey);
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input
        type="file"
        name="profile_files"
        multiple="multiple"
      />

      <button type="submit">제출</button>
    </form>
  );
};

export default ResRequestDetail;

