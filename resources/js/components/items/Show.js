import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

class Show extends Component {
    constructor (props) {
        super(props);

        this.state = {
            item: {
                category_id: '',
                category_name: '',
                event_id: '',
                event_name: '',
                name: '',
                long_description: '',
                short_description: '',
            },
        };
    };

    componentDidMount () {
        axios.get(`/api/items/${ this.props.match.params.id }`).then(res => {
            res.data.data = JSON.parse(JSON.stringify(res.data.data).replace('null', '""'));

            this.setState({
                item: {...this.state.item, ...res.data.data},
            });
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app/items');
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
                        <Link to={ `/app/items/${ this.state.item.id }/edit` } className='btn btn-primary'>Edit</Link>
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

                                        { this.state.item.short_description &&
                                            <div className='form-group'>
                                                <label htmlFor='short_description'>Short Description</label>
                                                <div id='short_description' className='card mb-5'>
                                                    <div className='card-body' dangerouslySetInnerHTML={ { __html: this.state.item.short_description } } />
                                                </div>
                                            </div>
                                        }

                                        { this.state.item.long_description &&
                                            <div className='form-group'>
                                                <label htmlFor='long_description'>Long Description</label>
                                                <div id='long_description' className='card mb-5'>
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