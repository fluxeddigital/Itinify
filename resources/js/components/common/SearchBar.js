import React, { Component } from 'react';

import { get } from '../../utils';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: null,
            query: '',
        };
    };
    
    onChangeHandler = async (e) => {
        this.search(e.target.value);
        
        this.setState({ query: e.target.value });
    };
    
    search = async (query) => {
        let results;

        await get(`/api/search?query=${ query }`).then(res => {
            if (res) {
                results = res.data;
            };
        });

        this.props.handler(results);
    };

    render () {
        return (
            <form className='main-navbar__search w-100 d-none d-md-flex d-lg-flex'>
                <div className='input-group input-group-seamless ml-3'>
                    <div className='input-group-prepend'>
                        <div className='input-group-text'>
                            <i className='fas fa-search'></i>
                        </div>
                    </div>
                    <input value={ this.state.query } onChange={e => this.onChangeHandler(e)} className='navbar-search form-control' type='text' placeholder='Search for something...' aria-label='Search' />
                </div>
            </form>
        );
    };
};

export default SearchBar;