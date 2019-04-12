import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';

import Navbar from './common/Navbar';
import SearchResults from './common/SearchResults';
import Sidebar from './common/Sidebar/Index';

import Dashboard from './Dashboard';
import ClientsIndex from './clients/Index';
import EventsIndex from './events/Index';
import EventsCreate from './events/Create';
import EventsShow from './events/Show';
import EventsEdit from './events/Edit';
import ItemsIndex from './items/Index';
import ItemCategoriesIndex from './items/categories/Index';
import ItemCategoriesCreate from './items/categories/Create';
import ItemCategoriesShow from './items/categories/Show';
import ItemCategoriesEdit from './items/categories/Edit';
import PackagesIndex from './packages/Index';
import UsersIndex from './users/Index';
import UsersAttach from './users/Attach';
import UsersCreate from './users/Create';
import UsersShow from './users/Show';
import UsersEdit from './users/Edit';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: null,
        };
    };

    componentDidMount () {
        toast.configure({
            autoClose: 1000,
        });
    };

    search = (results) => {
        this.setState({
            searchResults: results,
        });
    };

    render () {
        return (
            <BrowserRouter>
                <Sidebar />

                <main className='main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3'>
                    <Navbar search={ this.search } />

                    <div className={ this.state.searchResults ? 'd-none' : '' }>
                        <Switch>
                            <Route exact path='/app' component={ Dashboard } />

                            <Route exact path='/app/clients' component={ ClientsIndex } />

                            <Route exact path='/app/events' component={ EventsIndex } />
                            <Route exact path='/app/events/create' component={ EventsCreate } />
                            <Route exact path='/app/events/:id' component={ EventsShow } />
                            <Route exact path='/app/events/:id/edit' component={ EventsEdit } />

                            <Route exact path='/app/items' component={ ItemsIndex } />

                            <Route exact path='/app/items/categories' component={ ItemCategoriesIndex } />
                            <Route exact path='/app/items/categories/create' component={ ItemCategoriesCreate } />
                            <Route exact path='/app/items/categories/:id' component={ ItemCategoriesShow } />
                            <Route exact path='/app/items/categories/:id/edit' component={ ItemCategoriesEdit } />

                            <Route exact path='/app/packages' component={ PackagesIndex } />

                            <Route exact path='/app/users' component={ UsersIndex } />
                            <Route exact path='/app/users/attach' component={ UsersAttach } />
                            <Route exact path='/app/users/create' component={ UsersCreate } />
                            <Route exact path='/app/users/:id' component={ UsersShow } />
                            <Route exact path='/app/users/:id/edit' component={ UsersEdit } />
                        </Switch>
                    </div>

                    <div className={ this.state.searchResults ? '' : 'd-none' }>
                        <SearchResults results={ this.state.searchResults } />
                    </div>
                </main>
            </BrowserRouter>
        );
    };
};

ReactDOM.render(<App />, document.getElementById('app'));