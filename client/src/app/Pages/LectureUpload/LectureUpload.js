import React from "react";
import {connect} from "react-redux";
import {setLectureFile, setLectureDate, clearUpload} from "../../Actions/lectureUploadActions.js";
import {setCourseFiles} from '../../Actions/courseFilesActions.js';

class LectureUpload extends React.Component {

    setFile(e){
        this.props.setLectureFile(e.target.files[0]);
    }

    setDate(e){
        this.props.setLectureDate(e.target.value);
    }

    submit(){

        var formData = new FormData();
        formData.append('attachment', this.props.lectureUpload.lectureFile);
        formData.append('data', JSON.stringify({
            lectureDate: this.props.lectureUpload.lectureDate,
            courseId: this.props.courseId
        }));

        fetch('/api/lectureUpload', {method: "POST", body: formData, credentials: 'same-origin'}).then(
            fetch(('/api/listofCourseLectures/' + this.props.courseId), {
            credentials: 'same-origin'
        }).then(res => res.json()).then(cour => {
            this.props.setCourseFiles(cour);
        }).then(() => {
            this.props.router.push('/');
            this.props.router.push('/lectureUpload/success/');
        }));
    }

    componentWillUnmount(){
        this.props.clearUpload();
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="col-md-3">
                </div>
                <div className="col-md-6">
                    { ((typeof(this.props.roles) !== "undefined" && this.props.roles.toLowerCase().includes("instructor")) ?
                        <div>
                            <h1>Lecture Upload</h1>
                            <form onSubmit={this.submit.bind(this)}>
                                <h4>Please select a file to upload</h4>
                                <p><b>NOTE:</b> Only .mp4 videos are supported</p>
                                <input type="file" accept="video/mp4" name="lectureVideo" onChange={this.setFile.bind(this)} required/>
                                <br/>
                                Lecture Date: <input type="date" name="lectureDate" onChange={this.setDate.bind(this)} required/>
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
        roles: state.token.roles,
        lectureUpload: state.lectureUpload
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    
        return {
            setLectureFile: (file) => dispatch(setLectureFile(file)),
            setLectureDate: (date) => dispatch(setLectureDate(date)),
            clearUpload: () => dispatch(clearUpload()),
            setCourseFiles: (files) => dispatch(setCourseFiles(files))
        }
    }

var hideInput = {
    visibility: "hidden"
}

export default connect(mapStateToProps, mapDispatchToProps)(LectureUpload);
