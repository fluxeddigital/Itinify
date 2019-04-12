import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Main from './Main';
import Event from './Event.js';
import Package from './Package.js';

class Sidebar extends Component {
    constructor (props) {
        super(props);
    };

    render () {
        return (
            <aside className='main-sidebar col-12 col-md-3 col-lg-2 px-0'>
                <div className='main-navbar'>
                    <nav className='navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0'>
                        <Link className='navbar-brand w-100 mr-0' to='/app'>
                            <div className='text-center w-100'>
                                <img style={ { height: '100%' } } src='/images/logo.png' alt='Itinify' />
                            </div>
                        </Link>

                        <a className='toggle-sidebar d-sm-inline d-md-none d-lg-none'>
                            <i className='material-icons'>&#xE5C4;</i>
                        </a>
                    </nav>
                </div>

                <form action='#' className='main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none'>
                    <div className='input-group input-group-seamless ml-3'>
                        <div className='input-group-prepend'>
                            <div className='input-group-text'>
                                <i className='fas fa-search'></i>
                            </div>
                        </div>
                        <input className='navbar-search form-control' type='text' placeholder='Search for something...' aria-label='Search' />
                    </div>
                </form>

                {document.head.querySelector('meta[name="company-logo"]').content &&
                    <div className='main-navbar'>
                        <nav className='navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0'>
                            <Link className='navbar-brand w-100 mr-0' to={ `/app/companies/${ document.head.querySelector('meta[name="company-id"]') }` }>
                                <div className='text-center w-100'>
                                    <img style={ { height: '100%' } } src={ document.head.querySelector('meta[name="company-logo"]').content.startsWith('http') ? document.head.querySelector('meta[name="company-logo"]').content : `/storage/${ document.head.querySelector('meta[name="company-logo"]').content }` }/>
                                </div>
                            </Link>
                        </nav>
                    </div>
                }
                
                <div className='nav-wrapper'>
                    <ul className='nav flex-column'>
                        <Switch>
                            <Route path='/app/events/:id' component={ Event } />

                            <Route path='/app/packages/:id' component={ Package } />

                            <Route component={ Main } />
                        </Switch>
                    </ul>
                </div>
            </aside>
        );
    };
};

export default Sidebar;