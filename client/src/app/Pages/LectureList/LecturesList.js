import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LecturesList extends Component {

    constructor(props) {
		super(props);
		this.state = {};
	  }

    componentDidMount() {
		fetch('/listofCourseLectures').then(res => res.json()).then(cour => 
            {
                cour.children.map((cours) => {
                    if(cours.name === this.props.courseId){
                        this.setState({course: cours});
                        //return value is arbitrary, created to stop warning that map function returns nothing
                        return 1;
                    }
                    return 0;
                });
            });
	  }

    render(){
        return(
            <div>
                <h1>Lecture Dates:</h1>
                {(typeof this.state.course !== "undefined") ?  
                    this.state.course.children.map((course, i) =>{
                        return (
                            <div key = {i}>
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