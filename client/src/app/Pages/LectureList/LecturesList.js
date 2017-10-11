import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LecturesList extends Component {

    render(){
        return(
            <div>
                <h1>A list of lecture dates will go here</h1>
                <h2>and each one will be a video page</h2>
                <Link to={ "/Lecture/" }>
                	<button type = "button"/>
                </Link>
            </div>
        );
    }
}