import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'packages',
        };
    };

    clientsTab = () => {
        this.setState({
            activeTab: 'clients',
        });
    };

    eventsTab = () => {
        this.setState({
            activeTab: 'events',
        });
    };

    packagesTab = () => {
        this.setState({
            activeTab: 'packages',
        });
    };

    render () {
        if (this.props.results) {
            return (
                <div className='main-content-container container-fluid px-4'>
                    <div className='page-header row no-gutters py-4'>
                        <div className='col-12 col-sm-4 text-center text-sm-left mb-4 mb-sm-0'>
                            <h3 className='page-title'>Search Results</h3>
                        </div>

                        <div className='col-12 col-sm-4 d-flex align-items-center'>
                            <div className='btn-group btn-group-sm btn-group-toggle d-inline-flex mb-4 mb-sm-0 mx-auto' role='group' aria-label='Categories'>
                                <a className={ `btn btn-white${ this.state.activeTab == 'packages' ? ' active' : '' }` } onClick={ this.packagesTab }>Packages</a>
                                <a className={ `btn btn-white${ this.state.activeTab == 'clients' ? ' active' : '' }` } onClick={ this.clientsTab }>Clients</a>
                                <a className={ `btn btn-white${ this.state.activeTab == 'events' ? ' active' : '' }` } onClick={ this.eventsTab }>Events</a>
                            </div>
                        </div>
                    </div>

                    <div className={ this.state.activeTab == 'packages' ? '' : 'd-none'}>
                        <h1>Packages</h1>

                        <hr />

                        <div className='rows'>
                            { this.props.results.packages.map((item) => 
                                <div key={ item.id } className='col-12 mb-4'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <h6 className='card-title'>Client: <Link to={ `/app/clients/${ item.client.id }` }>{ item.client.name }</Link></h6>
                                            <h4 className='card-title'><Link to={ `/app/packages/${ item.id }` }>{ item.title }</Link></h4>
                                            <p className='card-text'><strong>Event:</strong> <Link to={ `/app/events/${ item.event.id }` }>{ item.event.name }</Link></p>
                                            <p className='card-text'><strong>Arrive:</strong> { item.event.starts } | <strong>Depart:</strong> { item.event.ends }</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        { this.props.results.packages.length == 0 &&
                            <div className='alert alert-danger'>
                                No packages found!
                            </div>
                        }
                    </div>

                    <div className={ this.state.activeTab == 'clients' ? '' : 'd-none' }>
                        <h1>Clients</h1>

                        <hr />

                        <div className='row'>
                            { this.props.results.clients.map((item) => 
                                <div key={ item.id } className='col-lg-3 col-md-6 col-sm-12 mb-4'>
                                    <div className='card h-100'>
                                        { item.logo &&
                                            <div className='card-img-top p-5'>
                                                <img src={ `/${ item.logo }` } className='card-img-top' />
                                            </div>
                                        }

                                        <div className='card-body'>
                                            <h4 className='card-title'><Link to={ `/app/clients/${ item.id }` }>{ item.name }</Link></h4>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        { this.props.results.clients.length == 0 &&
                            <div className='alert alert-danger'>
                                No clients found!
                            </div>
                        }
                    </div>

                    <div className={ this.state.activeTab == 'events' ? '' : 'd-none'}>
                        <h1>Events</h1>

                        <hr />

                        <div className='row'>
                            { this.props.results.events.map((item) => 
                                <div key={ item.id } className='col-lg-3 col-md-6 col-sm-12 mb-4'>
                                    <div className='card h-100'>
                                        {item.logo &&
                                            <div className='card-img-top p-5'>
                                                <img src={ `/${ item.logo }` } className='card-img-top' />
                                            </div>
                                        }

                                        <div className='card-body'>
                                            <h4 className='card-title'><Link to={ `/app/events/${ item.id }` }>{ item.name }</Link></h4>
                                            <p className='card-text'><strong>Starts:</strong> { item.starts } | <strong>Ends:</strong> { item.ends }</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        { this.props.results.events.length == 0 &&
                            <div className='alert alert-danger'>
                                No events found!
                            </div>
                        }
                    </div>
                </div>
            );
        } else {
            return null;
        };
    };
};

export default SearchResults;