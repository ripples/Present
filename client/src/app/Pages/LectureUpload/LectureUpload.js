import React from "react";
import {connect} from "react-redux";

export default class LectureUpload extends React.Component {

    uploadVideo(){
        console.log("submit")
    }


    render(){
        return(
            <div className="container-fluid">
                <div className="col-md-3">
                </div>
                <div className="col-md-6">
                    <h1>Lecture Upload</h1>
                    <form>
                        <h4>Please select a file to upload</h4>
                        <input type="file" accept="video/mp4" name="lectureVideo" />
                        <input type="submit" value="Submit" onClick={this.uploadVideo} />
                    </form>
                </div>
                <div className="col-md-3">
                </div>
            </div>
        );
    }
}