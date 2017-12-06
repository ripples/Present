import React from "react";
import {connect} from "react-redux";
import {setDeleteLecture, clearDeleteLecture} from '../../Actions/lectureDeleteActions.js';
import {setCourseFiles} from '../../Actions/courseFilesActions.js';

class LectureDelete extends React.Component {
    

    componentWillUnmount(){
        this.props.clearDeleteLecture();
    }

    onSubmit(e){
        e.preventDefault();
        var request = {method: 'DELETE',
            headers: {"Content-Type": "application/json"},
            credentials: 'same-origin',
            body: JSON.stringify({lecture: this.props.deleteLecture,
                                courseId: this.props.courseId
                                })}

        fetch('/api/deleteLecture', request).then(() => {
            fetch(('/api/listofCourseLectures/' + this.props.courseId + '/' + this.props.roles + '/'), {
                credentials: 'same-origin'
            }).then(res => res.json()).then(cour => {
                this.props.setCourseFiles(cour);
            }).then(() => {
                this.props.router.push('/');
                this.props.router.push('/lectureDelete/success/');
            });
        });
    }

    onChange(e){
        this.props.setDeleteLecture(e.target.value);
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="col-md-3">
                </div>
                <div className="col-md-6">
                    { ((typeof(this.props.roles) !== "undefined" && this.props.roles.toLowerCase().includes("instructor")) ?
                        <div>
                            <h1 style = {headerStyle}>Lecture Delete</h1>
                            <form onSubmit={this.onSubmit.bind(this)}>
                                <h4 style = {titleStyle}>Please select a lecture to delete.</h4>
                                <p style = {noticeStyle}><b>NOTE:</b> Deleting a lecture is a permanent process</p>
                                {
                                    (typeof(this.props.lectures) !== "undefined") ?
                                        this.props.lectures.map((lec, i) => {
                                            var patt = /^\d\d-\d\d-\d\d\d\d--\d\d-\d\d-\d\d$/;
                                            if (patt.test(lec.name)) {
                                                return (
                                                    <div key={i} style = {lectureStyle}>
                                                        <input type="radio" name="lecture" value={lec.name} onChange={this.onChange.bind(this)} required/> {lec.name}
                                                    </div>
                                                )
                                            } else {
                                                return (<div key={i}></div>);
                                            }
                                        }) : null
                                    
                                }
                                <br/>
                                <div style = {acknowledgeStyle}>
                                    <input type="checkbox" ref="approve" required/> I have correctly selected the lecture I want to delete.
                                </div>
                                <br/>
                                <br/>
                                <input style = {submitStyle} type="submit" value="Delete"/>
                            </form>
                        </div>
                    :
                        <div>
                            <h3>You are not an instructor for this course.</h3>
                        </div>
                    )
                    }

                    {
                        (this.props.params.success === "success") ? 
                            <h3>The lecture was successfully deleted.</h3>
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
        lectures: state.courseFiles.children,
        deleteLecture: state.deleteLecture
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        clearDeleteLecture: () => dispatch(clearDeleteLecture()),
        setDeleteLecture: (lecture) => dispatch(setDeleteLecture(lecture)),
        setCourseFiles: (files) => dispatch(setCourseFiles(files))
    }
}

var headerStyle = {
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
    marginBottom: "30px"
}

var lectureStyle = {
    fontSize: "16px",
    marginBottom: "10px"
}

var acknowledgeStyle = {
    fontSize: "14px"
}

var submitStyle = {
    width: "50%",
    backgroundColor: "#ff0000",
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: "4px"
}

export default connect(mapStateToProps, mapDispatchToProps)(LectureDelete);
