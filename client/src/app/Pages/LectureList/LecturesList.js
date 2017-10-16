import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LecturesList extends Component {

    constructor(props) {
		super(props);
		this.state = {
		  courses: {}
		};
	  }

    componentDidMount() {
		fetch('/listofCourseLectures')
            .then(res => res.json())
                .then(cour => 
                {
                    cour.children.map((cours) => {
                        if(cours.name === this.props.courseId){
                            this.setState({course: cours});
                        }
                    });
                    
                    
                });
	  }

    render(){
        return(
            <div>
                <h1>Lecture Dates:</h1>
                
                {(typeof this.state.course !== "undefined") ?  
                    this.state.course.children.map((course) =>{
                        return (
                            <div>
                                <Link to={ "course/" + this.props.courseId + "/lecture/" + course.name }>
                                    <button type = "button">{course.name}</button>
                                </Link>
                            </div>
                        )
                        
                    } ) : null
                }
            </div>
        );
    }
}