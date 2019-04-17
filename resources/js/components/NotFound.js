import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    constructor (props) {
        super(props);
    };

    render () {
        return (
            <div className="error">
                <div className="error__content">
                    <h2>404</h2>

                    <h3>This page could not be found!</h3>

                    <p>Please check your URL or try again later.</p>

                    <Link to='/app' className="btn btn-accent btn-pill">&larr; Go Back</Link>
                </div>
            </div>
        );
    };
};

export default NotFound;