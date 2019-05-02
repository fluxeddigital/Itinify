import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { buildState, format } from '../../utils';

const schema = [
    {
        name: 'name',
        type: 'string',
    },
    {
        name: 'banner',
        type: 'string',
    },
    {
        name: 'conditions',
        type: 'string',
    },
    {
        name: 'dates',
        type: 'object',
        schema: [
            {
                name: 'ends',
                type: 'string',
            },
            {
                name: 'starts',
                type: 'string',
            },
        ],
    },
    {
        name: 'description',
        type: 'string',
    },
    {
        name: 'location',
        type: 'string',
    },
    {
        name: 'logo',
        type: 'string',
    },
    {
        name: 'newsletter',
        type: 'object',
        schema: [
            {
                name: 'mailchimp',
                type: 'object',
                schema: [
                    {
                        name: 'list',
                        type: 'string',
                    },
                ],
            },
        ],
    },
    {
        name: 'pack',
        type: 'array',
        schema: [
            {
                name: 'title',
                type: 'string',
            },
            {
                name: 'type',
                type: 'string',
                options: [
                    'faqs',
                    'html',
                    'team',
                ],
            },
            {
                name: 'faqs',
                type: 'array',
                schema: [
                    {
                        name: 'question',
                        type: 'string',
                    },
                    {
                        name: 'answer',
                        type: 'string',
                    },
                ],
            },
            {
                name: 'html',
                type: 'string',
            },
            {
                name: 'team',
                type: 'array',
                schema: [
                    {
                        name: 'name',
                        type: 'string',
                    },
                    {
                        name: 'email',
                        type: 'string',
                    },
                    {
                        name: 'image',
                        type: 'string',
                    },
                    {
                        name: 'linkedin',
                        type: 'string',
                    },
                    {
                        name: 'location',
                        type: 'string',
                    },
                    {
                        name: 'position',
                        type: 'string',
                    },
                    {
                        name: 'phoneNumbers',
                        type: 'object',
                        schema: [
                            {
                                name: 'mobile',
                                type: 'string',
                            },
                            {
                                name: 'office',
                                type: 'object',
                                schema: [
                                    {
                                        name: 'number',
                                        type: 'string',
                                    },
                                    {
                                        name: 'ext',
                                        type: 'string',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

class Show extends Component {
    constructor (props) {
        super(props);

        this.state = {
            item: buildState(schema),
        };
    };

    componentDidMount () {
        axios.get(`/api/events/${ this.props.match.params.id }`).then(res => {
            res.data.data = format(res.data.data, schema);

            this.setState({
                item: {...this.state.item, ...res.data.data},
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
                    <div className='col-9 mb-0'>
                        <h3 className='page-title'>{ this.state.item.name }</h3>
                    </div>

                    <div className='col-3 text-right mb-0'>
                        <Link to={ `/app/events/${ this.state.item.id }/edit${ location.hash }` } className='btn btn-primary'>Edit</Link>
                    </div>
                </div>

                <ul className='list-group list-group-flush mb-4'>
                    <li className='list-group-item p-3'>
                        <div className='row'>
                            <div className='col'>
                                <form>
                                    { location.hash != '#conditions' && location.hash != '#pack' &&
                                        <div>
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

                                            { this.state.item.description.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/g, '') &&
                                                <div className='form-group'>
                                                    <label htmlFor='description'>Description</label>
                                                    <div id='description' className='card mb-5'>
                                                        <div className='card-body' dangerouslySetInnerHTML={ { __html: this.state.item.description } } />
                                                    </div>
                                                </div>
                                            }

                                            <div className='form-row pb-4'>
                                                { this.state.item.banner &&
                                                    <div className='form-group col-lg-6'>
                                                        <label htmlFor='banner'>Banner</label>
                                                        <img src={ this.state.item.banner } id='banner' className='w-100 d-block' />
                                                    </div>
                                                }

                                                { this.state.item.logo &&
                                                    <div className='form-group col-lg-6'>
                                                        <label htmlFor='logo'>Logo</label>
                                                        <img src={ this.state.item.logo } id='logo' className='text-center mx-auto h-100 px-4 pb-4 d-block' />
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
                                        <div>
                                            { this.state.item.conditions.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/g, '') &&
                                                <div className='form-group'>
                                                    <label htmlFor='conditions'>Conditions</label>
                                                    <div id='conditions' className='card'>
                                                        <div className='card-body' dangerouslySetInnerHTML={ { __html: this.state.item.conditions } } />
                                                    </div>
                                                </div>
                                            }
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