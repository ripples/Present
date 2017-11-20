import React from "react";
import {connect} from "react-redux";

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
                        <p><b>NOTE:</b> Only .mp4 videos are supported</p>
                        <input type="file" accept="video/mp4" name="lectureVideo" />
                        <br/>
                        Lecture Date: <input type="date" name="lectureDate" />
                        <br/>
                        <br/>
                        Course Id: <input type="text" name="courseId" value={this.props.courseId} readonly />
                        <br/>
                        <br/>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                <div className="col-md-3">
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        courseId: state.token.lis_course_section_sourcedid
    };
};

export default connect(mapStateToProps)(LectureUpload);