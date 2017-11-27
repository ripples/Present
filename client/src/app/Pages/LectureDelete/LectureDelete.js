import React from "react";
import {connect} from "react-redux";
import {setDeleteLecture, clearDeleteLecture} from '../../Actions/lectureDeleteActions.js';

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

        fetch('/api/deleteLecture', request).then((response) => {
            return response.text()
          }).then((data) => console.log(data)).catch((err) => console.log(err));
    }

    onChange(e){
        this.props.setDeleteLecture(e.target.value);
    }

    render(){
        console.log(this.props.deleteLecture);
        return(
            <div className="container-fluid">
                <div className="col-md-3">
                </div>
                <div className="col-md-6">
                    { ((typeof(this.props.roles) !== "undefined" && this.props.roles.toLowerCase().includes("instructor")) ?
                        <div>
                            <h1>Lecture Delete</h1>
                            <form onSubmit={this.onSubmit.bind(this)}>
                                <h4>Please select a lecture to delete.</h4>
                                <p><b>NOTE:</b> Deleting a lecture is a permanent process</p>
                                {
                                    (typeof(this.props.lectures) !== "undefined") ?
                                        this.props.lectures.map((lec, i) => {
                                            var patt = /^\d\d-\d\d-\d\d\d\d--\d\d-\d\d-\d\d$/;
                                            if (patt.test(lec.name)) {
                                                return (
                                                    <div key={i}>
                                                        <input type="radio" name="lecture" value={lec.name} onChange={this.onChange.bind(this)} required /> {lec.name}
                                                    </div>
                                                )
                                            } else {
                                                return (<div key={i}></div>);
                                            }
                                        }) : null
                                    
                                }
                                <br/>
                                <input type="checkbox" required/> I have correctly selected the lecture I want to delete.
                                <br/>
                                <br/>
                                <input type="submit" value="Delete"/>
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
        setDeleteLecture: (lecture) => dispatch(setDeleteLecture(lecture))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LectureDelete);
