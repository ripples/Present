import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navbar extends Component {

    render(){
        return(
            <div>
                <h1>Welcome to Lecture Viewer 2</h1>
                <Link to="/"><button>Lecture List</button></Link>
                <Link to="/"><button>Calendar</button></Link>
            </div>
        );
    }
}
