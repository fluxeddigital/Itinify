import React, { Component } from 'react';

import Main from './Main';

class Client extends Component {
    constructor (props) {
        super(props);
    };

    back = () => {
        $('#Client').hide();
        $('#Main').show();
    };

    return = () => {
        $('#Main').hide();
        $('#Client').show();
    };

    componentDidMount () {
        $('#Main').hide();
    };

    render () {
        return (
            <div>
                <div id='Client'>
                    <li className='nav-item cursor-pointer'>
                        <a href='#' className={ `nav-link${ location.hash != '#contacts' ? ' active' : '' }` }>
                            <i className='material-icons'>description</i>
                            <span>Details</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#contacts' className={ `nav-link${ location.hash == '#contacts' ? ' active' : '' }` }>
                            <i className='material-icons'>people</i>
                            <span>Contacts</span>
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

export default Client;