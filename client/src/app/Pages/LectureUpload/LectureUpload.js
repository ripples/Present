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
                            <h1 style = {headerStyle}>Lecture Upload</h1>
                            <form method="post" action="http://localhost:3001/api/lectureUpload" encType="multipart/form-data">
                                <h4 style = {titleStyle}>Please select a file to upload</h4>
                                <p style = {noticeStyle}><b>NOTE:</b> Only .mp4 videos are supported</p>
                                <input style={inputStyle} type="file" accept="video/mp4" name="lectureVideo" required/>
                                <br/>
                                <div style = {lectureDateStyle} >Lecture Date: <input type="date" name="lectureDate" required/></div>
                                <br/>
                                <input type="text" name="courseId" value={this.props.courseId} readOnly required style={hideInput}/>
                                <br/>
                                <input style = {submitStyle} type="submit" value="Submit" />
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

var headerStyle= {
	fontWeight: "bold",
    fontSize: "36px",
    marginBottom: "40px"
}

var titleStyle = {
    fontSize: "24px",
    marginBottom: "20px"
}

var noticeStyle = {
    fontSize: "20px",
    marginBottom: "110px"
}

var inputStyle = {
    marginBottom: "25px",
    marginLeft: "280px",
    fontSize: "16px",
    outline: "none",
    position: "relative"
}

var lectureDateStyle = {
    fontSize: "16px"
}

var submitStyle = {
    width: "50%",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: "4px"
}

export default connect(mapStateToProps)(LectureUpload);