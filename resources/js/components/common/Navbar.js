import axios from 'axios';
import React, { Component } from 'react';

import SearchBar from './SearchBar';

class Navbar extends Component {
    constructor(props) {
        super(props);
    };

    logout = () => {
        axios.post('/logout');

        window.location.replace('/login');
    };

    render () {
        return (
            <div className='main-navbar sticky-top bg-white'>
                <nav className='navbar align-items-stretch navbar-light flex-md-nowrap p-0'>
                    <SearchBar handler={ this.props.search } />

                    <ul className='navbar-nav border-left flex-row '>
                        <li className='nav-item dropdown'>
                            <a className='nav-link dropdown-toggle text-nowrap px-3 h-100' data-toggle='dropdown' href='#' role='button' aria-haspopup='true' aria-expanded='false'>
                                <span className='d-inline-flex align-items-center h-100'>{ document.head.querySelector('meta[name="user-name"]').content }</span>
                            </a>

                            <div className='dropdown-menu dropdown-menu-small'>
                                <a className='dropdown-item' href='user-profile-lite.html'>
                                    <i className='material-icons'>person</i> Profile
                                </a>

                                <a className='dropdown-item' href='components-blog-posts.html'>
                                    <i className='material-icons'>live_help</i> Support
                                </a>

                                <div className='dropdown-divider'></div>
                                
                                <a className='dropdown-item text-danger btn' onClick={ this.logout }>
                                    <i className='material-icons text-danger'>exit_to_app</i> Logout
                                </a>
                            </div>
                        </li>
                    </ul>

                    <nav className='nav'>
                        <a className='nav-link nav-link-icon toggle-sidebar d-md-inline d-lg-none text-center border-left btn' data-toggle='collapse' data-target='.header-navbar' aria-expanded='false' aria-controls='header-navbar'>
                            <i className='material-icons'>&#xE5D2;</i>
                        </a>
                    </nav>
                </nav>
            </div>
        );
    };
};

export default Navbar;