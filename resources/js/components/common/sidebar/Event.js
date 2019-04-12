import React, { Component } from 'react';

import Main from './Main';

class Event extends Component {
    constructor (props) {
        super(props);
    };

    back = () => {
        $('#Event').hide();
        $('#Main').show();
    };

    return = () => {
        $('#Main').hide();
        $('#Event').show();
    };

    componentDidMount () {
        $('#Main').hide();
    };

    render () {
        return (
            <div>
                <div id='Event'>
                    <li className='nav-item cursor-pointer'>
                        <a href='#' className={ `nav-link${ location.hash != '#pack' && location.hash != '#conditions' ? ' active' : '' }` }>
                            <i className='material-icons'>description</i>
                            <span>Details</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#pack' className={ `nav-link${ location.hash == '#pack' ? ' active' : '' }` }>
                            <i className='material-icons'>tab</i>
                            <span>Pack</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#conditions' className={ `nav-link${ location.hash == '#conditions' ? ' active' : '' }` }>
                            <i className='material-icons'>check_box</i>
                            <span>Conditions</span>
                        </a>
                    </li>
                    
                    <li className='nav-item cursor-pointer'>
                        <a onClick={ this.back } className='nav-link'>
                            <i className='material-icons'>arrow_back</i>
                            <span>Back</span>
                        </a>
                    </li>
                </div>

                <div id='Main'>
                    <Main />

                    <li className='nav-item cursor-pointer'>
                        <a onClick={ this.return } className='nav-link'>
                            <i className='material-icons'>arrow_forward</i>
                            <span>Return</span>
                        </a>
                    </li>
                </div>
            </div>
        );
    };
};

export default Event;