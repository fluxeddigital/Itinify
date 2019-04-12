import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Main extends Component {
    constructor (props) {
        super(props);
    };

    render () {
        return (
            <div>
                <li className='nav-item'>
                    <NavLink to='/app' className='nav-link' activeClassName='active' exact>
                        <i className='material-icons'>dashboard</i>
                        <span>Dashboard</span>
                    </NavLink>
                </li>

                <li className='nav-item'>
                    <NavLink to='/app/clients' className='nav-link' activeClassName='active'>
                        <i className='material-icons'>people</i>
                        <span>Clients</span>
                    </NavLink>
                </li>

                <li className='nav-item'>
                    <NavLink to='/app/packages' className='nav-link' activeClassName='active'>
                        <i className='material-icons'>library_books</i>
                        <span>Packages</span>
                    </NavLink>
                </li>

                <li className='nav-item'>
                    <NavLink to='/app/events' className='nav-link' activeClassName='active'>
                        <i className='material-icons'>event</i>
                        <span>Events</span>
                    </NavLink>
                </li>
                
                <li className='nav-item'>
                    <NavLink to='/app/items' className='nav-link' activeClassName='active'>
                        <i className='material-icons'>list</i>
                        <span>Items</span>
                    </NavLink>
                </li>
                
                <li className='nav-item'>
                    <NavLink to='/app/users' className='nav-link' activeClassName='active'>
                        <i className='material-icons'>people</i>
                        <span>Users</span>
                    </NavLink>
                </li>
                
                <li className='nav-item'>
                    <NavLink to='/app/settings' className='nav-link' activeClassName='active'>
                        <i className='material-icons'>settings</i>
                        <span>Settings</span>
                    </NavLink>
                </li>
            </div>
        );
    };
};

export default Main;