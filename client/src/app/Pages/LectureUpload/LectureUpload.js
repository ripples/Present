import React from "react";

class LectureUpload extends React.Component {

    render(){
        return(
            <div className="container-fluid">
                <div className="col-md-3">
                </div>
                <div className="col-md-6">
                    <h1>Lecture Upload</h1>
                    <form method="post" action="http://localhost:3001/api/lectureUpload" encType="multipart/form-data">
                        <h4>Please select a file to upload</h4>
                        <input type="file" accept="video/mp4" name="lectureVideo" />
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
                <div className="col-md-3">
                </div>
            </div>
        );
    }
}

export default LectureUpload;