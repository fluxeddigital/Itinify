import React, { Component } from 'react';

import Main from './Main';

class Packages extends Component {
    constructor (props) {
        super(props);
    };

    back = () => {
        $('#Packages').hide();
        $('#Main').show();
    };

    return = () => {
        $('#Main').hide();
        $('#Packages').show();
    };

    componentDidMount () {
        $('#Main').hide();
    };

    render () {
        return (
            <div>
                <div id='Packages'>
                    <li className='nav-item cursor-pointer'>
                        <a href='#' className={ `nav-link${ location.hash != '#open' && location.hash != '#accepted' ? ' active' : '' }` }>
                            <i className='material-icons'>list</i>
                            <span>All</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#open' className={ `nav-link${ location.hash == '#open' ? ' active' : '' }` }>
                            <i className='material-icons'>description</i>
                            <span>Proposals</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#accepted' className={ `nav-link${ location.hash == '#accepted' ? ' active' : '' }` }>
                            <i className='material-icons'>folder_special</i>
                            <span>Itineraries</span>
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

export default Packages;