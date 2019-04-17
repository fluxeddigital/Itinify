import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    constructor (props) {
        super(props);

        this.state = {
            clients: {
                count: [],
                last10: [],
                total: 0,
            },
            events: {
                last10: [],
                total: 0,
            },
            packages: {
                count: [],
                last10: [],
                total: 0,
            },
        };
    };

    componentDidMount () {
        axios.get('/api/stats').then(res => {
            res.data.clients.last10 = Object.keys(res.data.clients.last10).map(function(key) {
                return res.data.clients.last10[key];
            });

            res.data.events.last10 = Object.keys(res.data.events.last10).map(function(key) {
                return res.data.events.last10[key];
            });
            
            res.data.packages.last10 = Object.keys(res.data.packages.last10).map(function(key) {
                return res.data.packages.last10[key];
            });

            this.setState({
                clients: {
                    count: res.data.clients.count,
                    last10: res.data.clients.last10,
                    total: res.data.clients.total,
                },
                events: {
                    last10: res.data.events.last10,
                    total: res.data.events.total,
                },
                packages: {
                    count: res.data.packages.count,
                    last10: res.data.packages.last10,
                    total: res.data.packages.total,
                },
            });

            window.OverviewUsers = new Chart(document.getElementById('overview'), {
                data: {
                    datasets: [{
                        label: 'Clients',
                        data: this.state.clients.count,
                        backgroundColor: 'rgba(150,213,80,0.1)',
                        borderColor: 'rgba(150,213,80,1)',
                    }, {
                        label: 'Packages',
                        data: this.state.packages.count,
                        backgroundColor: 'rgba(0,123,255,0.1)',
                        borderColor: 'rgba(0,123,255,1)',
                    }],
                    labels: Array.from(new Array(29), function(_, i) {
                        return -28 + i;
                    }),
                },
                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            gridLines: false,
                            ticks: {
                                callback: function(tick, index) {
                                    return index % 7 !== 0 ? '' : tick;
                                }
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                suggestedMax: 45,
                                callback: function(tick, index, ticks) {
                                    if (tick === 0) {
                                        return tick;
                                    }
                                    return tick > 999 ? (tick / 1000).toFixed(1) + 'K' : tick;
                                }
                            }
                        }]
                    },
                    tooltips: {
                        custom: false,
                        mode: 'nearest',
                        intersect: false
                    }
                },
                type: 'LineWithLine',
            }).render();
        });
    };

    render () {
        return (
            <div className='main-content-container container-fluid px-4'>
                <div className='page-header row no-gutters py-4'>
                    <div className='col-12 col-sm-4 text-center text-sm-left mb-0'>
                        <h3 className='page-title'>Dashboard</h3>
                    </div>
                </div>

                <div className='row'>
                    <div className='col mb-4'>
                        <div className='card card-small'>
                            <div className='card-header border-bottom'>
                                <h6 className='m-0'>Overview - Past 28 Days</h6>
                            </div>

                            <div className='card-body pt-0'>
                                <canvas id='overview' height='130' className='mw-100'></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-4 mb-4'>
                        <div className='stats-small stats-small--1 card card-small'>
                            <div className='card-body p-0 d-flex'>
                                <div className='d-flex flex-column m-auto'>
                                    <div className='stats-small__data text-center'>
                                        <span className='stats-small__label text-uppercase'>Clients</span>
                                        <h6 className='stats-small__value count my-3'>{ this.state.clients.total }</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className='card card-small'>
                            <div className='card-header border-bottom'>
                                <h6 className='m-0'>Recently Created Clients</h6>
                            </div>

                            <div className='card-body p-0'>
                                <ul className='list-group list-group-small list-group-flush'>
                                    { this.state.clients.last10.map(item => (
                                        <li key={ item.id } className='list-group-item d-flex px-3'>
                                            <span className='text-semibold text-fiord-blue'><Link to={ {pathname: `/app/clients/${ item.id }` } }>{ item.name }</Link></span>
                                            <span className='ml-auto text-right text-semibold text-reagent-gray'>{ item.created_at }</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='card-footer border-top'>
                                <div className='row'>
                                    <div className='col view-report'>
                                        <Link to='/app/clients'>More Clients...</Link>
                                    </div>
                                    <div className='col text-right view-report'>
                                        <Link to='/app/clients/create'>New Client &rarr;</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-4 mb-4'>
                        <div className='stats-small stats-small--1 card card-small'>
                            <div className='card-body p-0 d-flex'>
                                <div className='d-flex flex-column m-auto'>
                                    <div className='stats-small__data text-center'>
                                        <span className='stats-small__label text-uppercase'>Events</span>
                                        <h6 className='stats-small__value count my-3'>{ this.state.events.total }</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className='card card-small'>
                            <div className='card-header border-bottom'>
                                <h6 className='m-0'>Recently Created Events</h6>
                            </div>

                            <div className='card-body p-0'>
                                <ul className='list-group list-group-small list-group-flush'>
                                    { this.state.events.last10.map(item => (
                                        <li key={ item.id } className='list-group-item d-flex px-3'>
                                            <span className='text-semibold text-fiord-blue'><Link to={ {pathname: `/app/events/${ item.id }` } }>{ item.name }</Link></span>
                                            <span className='ml-auto text-right text-semibold text-reagent-gray'>{ item.created_at }</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='card-footer border-top'>
                                <div className='row'>
                                    <div className='col view-report'>
                                        <Link to='/app/events'>More Events...</Link>
                                    </div>
                                    <div className='col text-right view-report'>
                                        <Link to='/app/events/create'>New Event &rarr;</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-4 mb-4'>
                        <div className='stats-small stats-small--1 card card-small'>
                            <div className='card-body p-0 d-flex'>
                                <div className='d-flex flex-column m-auto'>
                                    <div className='stats-small__data text-center'>
                                        <span className='stats-small__label text-uppercase'>Packages</span>
                                        <h6 className='stats-small__value count my-3'>{ this.state.packages.total }</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className='card card-small'>
                            <div className='card-header border-bottom'>
                                <h6 className='m-0'>Recently Created Packages</h6>
                            </div>

                            <div className='card-body p-0'>
                                <ul className='list-group list-group-small list-group-flush'>
                                    { this.state.packages.last10.map(item => (
                                        <li key={ item.id } className='list-group-item d-flex px-3'>
                                            <span className='text-semibold text-fiord-blue'><Link to={ {pathname: `/app/packages/${ item.id }` } }>{ item.title }</Link> - <Link to={ {pathname: `/app/clients/${ item.client.id }` } }>{ item.client.name }</Link></span>
                                            <span className='ml-auto text-right text-semibold text-reagent-gray'>{ item.created_at }</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='card-footer border-top'>
                                <div className='row'>
                                    <div className='col view-report'>
                                        <Link to='/app/packages'>More Packages...</Link>
                                    </div>
                                    <div className='col text-right view-report'>
                                        <Link to='/app/packages/create'>New Package &rarr;</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Dashboard;