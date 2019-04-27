import React, { Component } from 'react';

import Main from './Main';

class Clients extends Component {
    constructor (props) {
        super(props);
    };

    back = () => {
        $('#Clients').hide();
        $('#Main').show();
    };

    return = () => {
        $('#Main').hide();
        $('#Clients').show();
    };

    componentDidMount () {
        $('#Main').hide();
    };

    render () {
        return (
            <div>
                <div id='Clients'>
                    <li className='nav-item cursor-pointer'>
                        <a href='#' className={ `nav-link${ location.hash != '#leads' && location.hash != '#customers' ? ' active' : '' }` }>
                            <i className='material-icons'>list</i>
                            <span>All</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#leads' className={ `nav-link${ location.hash == '#leads' ? ' active' : '' }` }>
                            <i className='material-icons'>edit</i>
                            <span>Leads</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#customers' className={ `nav-link${ location.hash == '#customers' ? ' active' : '' }` }>
                            <i className='material-icons'>event_note</i>
                            <span>Clients</span>
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

export default Clients;