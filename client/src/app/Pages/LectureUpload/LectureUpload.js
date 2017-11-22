import React from "react";
import {connect} from "react-redux";

class LectureUpload extends React.Component {

    render(){
        return(
            <div className="container-fluid">
                <div className="col-md-3">
                </div>
                <div className="col-md-6">
                    { ((typeof(this.props.roles) !== "undefined" && this.props.roles.toLowerCase().includes("instructor")) ?
                        <div>
                            <h1>Lecture Upload</h1>
                            <form method="post" action="http://localhost:3001/api/lectureUpload" encType="multipart/form-data">
                                <h4>Please select a file to upload</h4>
                                <p><b>NOTE:</b> Only .mp4 videos are supported</p>
                                <input type="file" accept="video/mp4" name="lectureVideo" required/>
                                <br/>
                                Lecture Date: <input type="date" name="lectureDate" required/>
                                <br/>
                                <input type="text" name="courseId" value={this.props.courseId} readOnly required style={hideInput}/>
                                <br/>
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                    :
                        <div>
                            <h3>You are not an instructor for this course</h3>
                        </div>
                    )
                    }

                    {
                        (this.props.params.success === "success") ? 
                            <h3>The video was successfully uploaded.</h3>
                        : null 
                    }
                </div>
                <div className="col-md-3">
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        courseId: state.token.lis_course_section_sourcedid,
        roles: state.token.roles
    };
};

var hideInput = {
    visibility: "hidden"
}

export default connect(mapStateToProps)(LectureUpload);