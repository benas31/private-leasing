import React, { useState } from "react";
import { Button } from "@material-ui/core";

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [uploadedFile, setUploadedFile] = useState({});

  const handleUpload = (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("file", file)
    fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    })
      .then(handleResponse)
      .then((data) => {
        console.log(data);
      });
  }

  const handleResponse = (response) => {
    return response.text().then((data) => {
      return data;
    });
  };


  return (
    <>
      <form>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])} />
        <br />
      </form>

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={(e) => handleUpload(e)}
      >
        Upload
      </Button>
    </>
  )
};

export default FileUpload;
