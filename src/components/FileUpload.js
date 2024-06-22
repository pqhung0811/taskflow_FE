import React, { useState } from "react";
import { BsX } from "react-icons/bs";
import Helper from "../helpers";
const FileUpload = ({ handleAddFile = () => {}, onClose = () => {} }) => {
  const [selectedfile, SetSelectedFile] = useState("");

  const filesizes = Helper.convertFileSize;

  const InputChange = (e) => {
    let reader = new FileReader();
    const { files } = e.target;

    let file = files[0];

    reader.onloadend = () => {
      SetSelectedFile({
        filename: files[0].name,
        filetype: files[0].type,
        fileimage: reader.result,
        datetime: files[0].lastModifiedDate.toLocaleString("en-IN"),
        filesize: filesizes(files[0].size),
      });
    };
    if (files[0]) {
      reader.readAsDataURL(file);
    }
  };

  const FileUploadSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const file = form?.elements?.fileShare?.files[0];
    if (file) await handleAddFile(file);
    // form reset on submit
    form.reset();
    if (selectedfile !== "") {
      onClose()
    } else {
      alert("Please select file");
    }
  };

  return (
    <div className="fileupload-view">
      <div className="row justify-content-center m-0">
        <div className="col-md-6">
          <div className="card tf-card mt-5">
            <div className="card-body tf-card-body">
              <div className="kb-modal-close" onClick={onClose}>
                <BsX />
              </div>
              <div className="kb-data-box">
                <div className="kb-modal-data-title">
                  <div className="kb-data-title">
                    <h6>File Upload</h6>
                  </div>
                </div>
                <form onSubmit={FileUploadSubmit}>
                  <div className="kb-file-upload">
                    <div className="file-upload-box">
                      <input
                        name="fileShare"
                        type="file"
                        id="fileupload"
                        className="file-upload-input"
                        onChange={InputChange}
                      />
                      <span>
                        Drag and drop or{" "}
                        <span className="file-link">Choose your file</span>
                      </span>
                    </div>
                  </div>
                  <div className="kb-attach-box mb-3">
                    {selectedfile !== "" ? (
                      <div className="file-atc-box">
                        {selectedfile.filename.match(
                          /.(jpg|jpeg|png|gif|svg)$/i
                        ) ? (
                          <div className="file-image">
                            {" "}
                            <img src={selectedfile.fileimage} alt="" />
                          </div>
                        ) : (
                          <div className="file-image">
                            <i className="far fa-file-alt"></i>
                          </div>
                        )}
                        <div className="file-detail">
                          <h6>{selectedfile.filename}</h6>
                          <p>
                            <p>Size : {selectedfile.filesize}</p>
                            <p>
                              Modified Time : {selectedfile.datetime}
                            </p>
                          </p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="kb-buttons-box">
                    <button
                      type="submit"
                      className="btn btn-primary form-submit"
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
