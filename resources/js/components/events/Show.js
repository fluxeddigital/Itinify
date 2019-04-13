import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

class Show extends Component {
    constructor (props) {
        super(props);

        this.state = {
            item: {
                name: '',
                banner: '',
                conditions: '',
                dates: {
                    starts: '',
                    ends: '',
                },
                description: '',
                location: '',
                logo: '',
                newsletter: {
                    mailchimp: {
                        list: '',
                    },
                },
                pack: [],
            },
        };
    };

    componentDidMount () {
        axios.get(`/api/events/${ this.props.match.params.id }`).then(res => {
            Object.keys(res.data.data).forEach((key) => {
                if (res.data.data[key] === null) {
                    res.data.data[key] = '';
                };
            });

            this.setState({
                item: res.data.data,
            });
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app/events');
        });
    };

    render () {
        return (
            <div className='main-content-container container-fluid px-4'>
                <div className='page-header row no-gutters py-4'>
                    <div className='col-10 mb-0'>
                        <h3 className='page-title'>{ this.state.item.name }</h3>
                    </div>

                    <div className='col-2 text-right mb-0'>
                        <Link to={ `/app/events/${ this.state.item.id }/edit` } className='btn btn-primary'>Edit</Link>
                    </div>
                </div>

                <ul className='list-group list-group-flush mb-4'>
                    <li className='list-group-item p-3'>
                        <div className='row'>
                            <div className='col'>
                                <form>
                                    { location.hash != '#conditions' && location.hash != '#pack' &&
                                        <div>
                                            { this.state.item.description &&
                                                <div className='form-group'>
                                                    <label htmlFor='description'>Description</label>
                                                    <div id='description' className='card mb-5'>
                                                        <div className='card-body' dangerouslySetInnerHTML={ { __html: this.state.item.description } } />
                                                    </div>
                                                </div>
                                            }

                                            <div className='form-row'>
                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='dates_starts'>Start Date</label>
                                                    <input value={ this.state.item.dates.starts } type='text' className='form-control' id='dates_starts' disabled />
                                                </div>

                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='dates_ends'>End Date</label>
                                                    <input value={ this.state.item.dates.ends } type='text' className='form-control' id='dates_ends' disabled />
                                                </div>
                                            </div>

                                            <div className='form-group'>
                                                <label htmlFor='location'>Location</label>
                                                <input value={ this.state.item.location } type='text' className='form-control' id='location' disabled />
                                            </div>

                                            <div className='form-group'>
                                                <label htmlFor='newsletter_mailchimp_list'>MailChimp List ID</label>
                                                <input value={ this.state.item.newsletter.mailchimp.list } type='text' className='form-control' id='newsletter_mailchimp_list' disabled />
                                            </div>

                                            <div className='form-row pb-4'>
                                                { this.state.item.banner &&
                                                    <div className='form-group col-lg-6'>
                                                        <label htmlFor='banner'>Banner</label>
                                                        <img src={ this.state.item.banner.startsWith('http') ? this.state.item.banner : `/storage/${ this.state.item.banner }` } id='banner' className='w-100 d-block' />
                                                    </div>
                                                }

                                                { this.state.item.logo &&
                                                    <div className='form-group col-lg-6'>
                                                        <label htmlFor='logo'>Logo</label>
                                                        <img src={ this.state.item.logo.startsWith('http') ? this.state.item.logo : `/storage/${ this.state.item.logo }` } id='logo' className='text-center mx-auto h-100 px-4 pb-4 d-block' />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    }

                                    { location.hash == '#pack' &&
                                        <div className='form-group'>
                                            <label htmlFor='pack'>Pack</label>
                                            <div id='pack' className='card mb-5'>
                                                <textarea value={ JSON.stringify(this.state.item.pack) } className='card-body' rows={ 20 } readOnly />
                                            </div>
                                        </div>
                                    }

                                    { location.hash == '#conditions' &&
                                        <div className='form-group'>
                                            <label htmlFor='conditions'>Conditions</label>
                                            <div id='conditions' className='card mb-5'>
                                                <div className='card-body' dangerouslySetInnerHTML={ { __html: this.state.item.conditions } } />
                                            </div>
                                        </div>
                                    }
                                </form>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    };
};

export default Show;