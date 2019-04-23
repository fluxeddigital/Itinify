import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { buildState, format } from '../../../utils';

const schema = [
    {
        name: 'name',
        type: 'string',
    },
    {
        name: 'section',
        type: 'string',
        options: [
            'Itinerary',
            'Restaurants',
            'Transfers',
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
        axios.get(`/api/items/categories/${ this.props.match.params.id }`).then(res => {
            res.data.data = format(res.data.data, schema);

            this.setState({
                item: {...this.state.item, ...res.data.data},
            });
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app/items/categories');
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
                        <Link to={ `/app/items/categories/${ this.state.item.id }/edit${ location.hash }` } className='btn btn-primary'>Edit</Link>
                    </div>
                </div>

                <ul className='list-group list-group-flush mb-4'>
                    <li className='list-group-item p-3'>
                        <div className='row'>
                            <div className='col'>
                                <form>
                                    <div className='form-row'>
                                        <div className='form-group col-md-6'>
                                            <label htmlFor='name'>Name</label>
                                            <input value={ this.state.item.name } type='text' className='form-control' id='name' disabled />
                                        </div>

                                        <div className='form-group col-md-6'>
                                            <label htmlFor='section'>Section</label>
                                            <input value={ this.state.item.section } type='text' className='form-control' id='section' disabled />
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