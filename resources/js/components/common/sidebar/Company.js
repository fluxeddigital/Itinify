import React, { Component } from 'react';

import Main from './Main';

class Package extends Component {
    constructor (props) {
        super(props);
    };

    back = () => {
        $('#Package').hide();
        $('#Main').show();
    };

    return = () => {
        $('#Main').hide();
        $('#Package').show();
    };

    componentDidMount () {
        $('#Main').hide();
    };

    render () {
        return (
            <div>
                <div id='Package'>
                    <li className='nav-item cursor-pointer'>
                        <a href='#' className={ `nav-link${ location.hash != '#customisation' && location.hash != '#integrations' && location.hash != '#billing' ? ' active' : '' }` }>
                            <i className='material-icons'>description</i>
                            <span>Details</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#customisation' className={ `nav-link${ location.hash == '#customisation' ? ' active' : '' }` }>
                            <i className='material-icons'>edit</i>
                            <span>Customisation</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#integrations' className={ `nav-link${ location.hash == '#integrations' ? ' active' : '' }` }>
                            <i className='material-icons'>attach_file</i>
                            <span>Integrations</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#billing' className={ `nav-link${ location.hash == '#billing' ? ' active' : '' }` }>
                            <i className='material-icons'>note</i>
                            <span>Billing</span>
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

export default Package;