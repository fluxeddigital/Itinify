import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { buildState, format } from '../../utils';

const schema = [
    {
        name: 'category_id',
        type: 'string',
    },
    {
        name: 'category_name',
        type: 'string',
    },
    {
        name: 'event_id',
        type: 'string',
    },
    {
        name: 'event_name',
        type: 'string',
    },
    {
        name: 'name',
        type: 'string',
    },
    {
        name: 'long_description',
        type: 'string',
    },
    {
        name: 'short_description',
        type: 'string',
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
        axios.get(`/api/items/${ this.props.match.params.id }`).then(res => {
            res.data.data = format(res.data.data, schema);

            this.setState({
                item: {...this.state.item, ...res.data.data},
            });
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app/items');
        });
    };

    duplicate = async () => {
        await axios.post(`/api/items`, format(this.state.item, schema), {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            if (res) {
                toast.success('Duplicated!');

                this.props.history.push(`/app/items/${ res.data.data.id }`);
            };
        }).catch((err) => {
            if (err.response.data.errors) {
                return toast.error(err.response.data.errors[
                    Object.keys(err.response.data.errors)[0]
                ][0]);
            };

            toast.error('An error occurred, please try again later.');
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
                        <Link to={ `/app/items/${ this.state.item.id }/edit${ location.hash }` } className='btn btn-primary'>Edit</Link>
                        <span onClick={ this.duplicate } className='btn btn-primary ml-1'>Duplicate</span>
                    </div>
                </div>

                <ul className='list-group list-group-flush mb-4'>
                    <li className='list-group-item p-3'>
                        <div className='row'>
                            <div className='col'>
                                <form>
                                    <div>
                                        <div className='form-group'>
                                            <label htmlFor='name'>Name</label>
                                            <input value={ this.state.item.name } type='text' className='form-control' id='name' disabled />
                                        </div>

                                        { this.state.item.short_description.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/g, '') &&
                                            <div className='form-group'>
                                                <label htmlFor='short_description'>Short Description</label>
                                                <div id='short_description' className='card'>
                                                    <div className='card-body' dangerouslySetInnerHTML={ { __html: this.state.item.short_description } } />
                                                </div>
                                            </div>
                                        }

                                        { this.state.item.long_description.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/g, '') &&
                                            <div className='form-group'>
                                                <label htmlFor='long_description'>Long Description</label>
                                                <div id='long_description' className='card'>
                                                    <div className='card-body' dangerouslySetInnerHTML={ { __html: this.state.item.long_description } } />
                                                </div>
                                            </div>
                                        }

                                        <div className='form-row'>
                                            <div className='form-group col-md-6'>
                                                <label htmlFor='category'>Category</label>
                                                <Link to={ `/app/items/categories/${ this.state.item.category_id }` } className='d-block' id='category'>{ this.state.item.category_name }</Link>
                                            </div>

                                            <div className='form-group col-md-6'>
                                                <label htmlFor='event'>Event</label>
                                                <Link to={ `/app/events/${ this.state.item.event_id }` } className='d-block' id='event'>{ this.state.item.event_name }</Link>
                                            </div>
                                        </div>
                                    </div>
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