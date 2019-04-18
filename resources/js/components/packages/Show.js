import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

class Show extends Component {
    constructor (props) {
        super(props);

        this.state = {
            item: {
                client_id: '',
                client_name: '',
                event_id: '',
                event_name: '',
                title: '',
                accepted_at: '',
                accepted_by: '',
                car_hire: [],
                customisation: {
                    banner: '',
                    description: '',
                    welcome: '',
                },
                expires: '',
                flights: [],
                issued: '',
                itinerary: [],
                lead_status: '',
                notes: [],
                passengers: [],
                pricing: {
                    person: '',
                    total: '',
                    vat: '',
                },
                requirements: {
                    dietary: '',
                    other: '',
                },
                restaurants: [],
                status: '',
                transfers: [],
            },
        };
    };

    componentDidMount () {
        axios.get(`/api/packages/${ this.props.match.params.id }`).then(res => {
            res.data.data = JSON.parse(JSON.stringify(res.data.data).replace('null', '""'));

            this.setState({
                item: {...this.state.item, ...res.data.data},
            });
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app/packages');
        });
    };

    render () {
        return (
            <div className='main-content-container container-fluid px-4'>
                <div className='page-header row no-gutters py-4'>
                    <div className='col-10 mb-0'>
                        <h3 className='page-title'>{ this.state.item.title }</h3>
                    </div>

                    <div className='col-2 text-right mb-0'>
                        <Link to={ `/app/packages/${ this.state.item.id }/edit${ location.hash }` } className='btn btn-primary'>Edit</Link>
                    </div>
                </div>

                <ul className='list-group list-group-flush mb-4'>
                    <li className='list-group-item p-3'>
                        <div className='row'>
                            <div className='col'>
                                <form>
                                    { location.hash != '#itinerary' && location.hash != '#flights' && location.hash != '#car-hire' && location.hash != '#passengers' && location.hash != '#transfers' && location.hash != '#restaurants' && location.hash != '#customise' && location.hash != '#requirements' && location.hash != '#notes' &&
                                        <div>
                                            <div className='form-group'>
                                                <label htmlFor='name'>Title</label>
                                                <input value={ this.state.item.title } type='text' className='form-control' id='name' disabled />
                                            </div>

                                            <div className='form-row'>
                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='client'>Client</label>
                                                    <Link to={ `/app/clients/${ this.state.item.client_id }` } className='d-block' id='client'>{ this.state.item.client_name }</Link>
                                                </div>

                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='event'>Event</label>
                                                    <Link to={ `/app/events/${ this.state.item.event_id }` } className='d-block' id='event'>{ this.state.item.event_name }</Link>
                                                </div>
                                            </div>

                                            <div className='form-row'>
                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='issued'>Issued</label>
                                                    <input value={ this.state.item.issued } type='text' className='form-control' id='issued' disabled />
                                                </div>

                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='expires'>Expires</label>
                                                    <input value={ this.state.item.expires } type='text' className='form-control' id='expires' disabled />
                                                </div>
                                            </div>

                                            <div className='form-row'>
                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='status'>Status</label>
                                                    <input value={ this.state.item.status } type='text' className='form-control' id='status' disabled />
                                                </div>

                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='lead_status'>Lead Status</label>
                                                    <input value={ this.state.item.lead_status } type='text' className='form-control' id='lead_status' disabled />
                                                </div>
                                            </div>

                                            <div className='form-row'>
                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='accepted_at'>Accepted At</label>
                                                    <input value={ this.state.item.accepted_at } type='text' className='form-control' id='accepted_at' disabled />
                                                </div>

                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='accepted_by'>Accepted By</label>
                                                    <input value={ this.state.item.accepted_by } type='text' className='form-control' id='accepted_by' disabled />
                                                </div>
                                            </div>

                                            <div className='form-row'>
                                                <div className='form-group col-md-4'>
                                                    <label htmlFor='pricing.total'>Per Person</label>
                                                    <input value={ this.state.item.pricing.person } type='text' className='form-control' id='pricing.total' disabled />
                                                </div>

                                                <div className='form-group col-md-4'>
                                                    <label htmlFor='pricing.total'>Total</label>
                                                    <input value={ this.state.item.pricing.total } type='text' className='form-control' id='pricing.total' disabled />
                                                </div>

                                                <div className='form-group col-md-4'>
                                                    <label htmlFor='pricing.vat'>VAT Rate</label>
                                                    <input value={ this.state.item.pricing.vat } type='text' className='form-control' id='pricing.vat' disabled />
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    { location.hash == '#notes' &&
                                        <ul className='list-group list-group-flush mb-4'>
                                            <h4 className='page-title'>Notes</h4>

                                            <li className='list-group-item p-3'>
                                                <div>
                                                    { this.state.item.notes.map((item, i) => 
                                                        <div key={ i }>
                                                            <div className='bg-white border rounded p-3 mb-3'>
                                                                <div className='form-row'>
                                                                    <div className='form-group col-md-6'>
                                                                        <label htmlFor={ `note-title-${ i }` }>Title</label>
                                                                        <input value={ item.title } type='text' className='form-control' id={ `note-title-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-6'>
                                                                        <label htmlFor={ `note-visibility-${ i }` }>Visibility</label>
                                                                        <input value={ item.visibility } type='text' className='form-control' id={ `note-visibility-${ i }` } disabled />
                                                                    </div>
                                                                </div>

                                                                { item.content &&
                                                                    <div className='form-group'>
                                                                        <label htmlFor={ `note-content-${ i }` }>Content</label>
                                                                        <div id='description' className='card mb-5'>
                                                                            <div className='card-body' dangerouslySetInnerHTML={ { __html: item.content } } id={ `note-content-${ i }` } />
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        </ul>
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