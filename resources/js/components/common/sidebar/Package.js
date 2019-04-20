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
                        <a href='#' className={ `nav-link${ location.hash != '#itinerary' && location.hash != '#flights' && location.hash != '#car-hire' && location.hash != '#passengers' && location.hash != '#transfers' && location.hash != '#restaurants' && location.hash != '#documents' && location.hash != '#customise' && location.hash != '#requirements' && location.hash != '#notes' ? ' active' : '' }` }>
                            <i className='material-icons'>description</i>
                            <span>Details</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#itinerary' className={ `nav-link${ location.hash == '#itinerary' ? ' active' : '' }` }>
                            <i className='material-icons'>list</i>
                            <span>Itinerary</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#flights' className={ `nav-link${ location.hash == '#flights' ? ' active' : '' }` }>
                            <i className='material-icons'>flight</i>
                            <span>Flights</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#car-hire' className={ `nav-link${ location.hash == '#car-hire' ? ' active' : '' }` }>
                            <i className='material-icons'>directions_car</i>
                            <span>Car Hire</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#passengers' className={ `nav-link${ location.hash == '#passengers' ? ' active' : '' }` }>
                            <i className='material-icons'>people</i>
                            <span>Passengers</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#transfers' className={ `nav-link${ location.hash == '#transfers' ? ' active' : '' }` }>
                            <i className='material-icons'>transfer_within_a_station</i>
                            <span>Transfers</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#restaurants' className={ `nav-link${ location.hash == '#restaurants' ? ' active' : '' }` }>
                            <i className='material-icons'>restaurant</i>
                            <span>Restaurants</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#documents' className={ `nav-link${ location.hash == '#documents' ? ' active' : '' }` }>
                            <i className='material-icons'>attach_file</i>
                            <span>Documents</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#customise' className={ `nav-link${ location.hash == '#customise' ? ' active' : '' }` }>
                            <i className='material-icons'>edit</i>
                            <span>Customise</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#requirements' className={ `nav-link${ location.hash == '#requirements' ? ' active' : '' }` }>
                            <i className='material-icons'>folder_special</i>
                            <span>Requirements</span>
                        </a>
                    </li>

                    <li className='nav-item cursor-pointer'>
                        <a href='#notes' className={ `nav-link${ location.hash == '#notes' ? ' active' : '' }` }>
                            <i className='material-icons'>note</i>
                            <span>Notes</span>
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