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

                                    { location.hash == '#itinerary' &&
                                        <ul className='list-group list-group-flush'>
                                            <h4 className='page-title'>Itinerary</h4>

                                            <li className='list-group-item p-3'>
                                                <div>
                                                    { this.state.item.itinerary.map((item, i) => 
                                                        <div key={ i }>
                                                            <div className='bg-white border rounded p-3 mb-3'>
                                                                <div className='form-row'>
                                                                    <div className='form-group col-md-6'>
                                                                        <label htmlFor={ `item-name-${ i }` }>Name</label>
                                                                        <input value={ item.name } type='text' className='form-control' id={ `item-name-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-6'>
                                                                        <label htmlFor={ `item-date-${ i }` }>Date</label>
                                                                        <input value={ item.date } type='text' className='form-control' id={ `item-date-${ i }` } disabled />
                                                                    </div>
                                                                </div>

                                                                { item.description.short &&
                                                                    <div className='form-group'>
                                                                        <label htmlFor={ `item-description-short-${ i }` }>Short Description</label>
                                                                        <div className='card'>
                                                                            <div className='card-body' dangerouslySetInnerHTML={ { __html: item.description.short } } id={ `item-description-short-${ i }` } />
                                                                        </div>
                                                                    </div>
                                                                }

                                                                { item.description.long &&
                                                                    <div className='form-group'>
                                                                        <label htmlFor={ `item-description-long-${ i }` }>Long Description</label>
                                                                        <div className='card'>
                                                                            <div className='card-body' dangerouslySetInnerHTML={ { __html: item.description.long } } id={ `item-description-long-${ i }` } />
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

                                    { location.hash == '#flights' &&
                                        <ul className='list-group list-group-flush'>
                                            <h4 className='page-title'>Flights</h4>

                                            <li className='list-group-item p-3'>
                                                <div>
                                                    { this.state.item.flights.map((item, i) => 
                                                        <div key={ i }>
                                                            <div className='bg-white border rounded p-3 mb-3'>
                                                                <div className='form-row'>
                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `flight-number-${ i }` }>Number</label>
                                                                        <input value={ item.number } type='text' className='form-control' id={ `flight-number-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `flight-airline-${ i }` }>Airline</label>
                                                                        <input value={ item.airline } type='text' className='form-control' id={ `flight-airline-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `flight-class-${ i }` }>Class</label>
                                                                        <input value={ item.class } type='text' className='form-control' id={ `flight-class-${ i }` } disabled />
                                                                    </div>
                                                                </div>

                                                                <label htmlFor={ `flight-departure-${ i }` }>Departure</label>
                                                                <div className='form-row pl-3' id={ `flight-departure-${ i }` }>
                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `flight-departure-location-${ i }` }>Location</label>
                                                                        <input value={ item.departure.location } type='text' className='form-control' id={ `flight-departure-location-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `flight-departure-date-${ i }` }>Date</label>
                                                                        <input value={ item.departure.date } type='text' className='form-control' id={ `flight-departure-date-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `flight-departure-time-${ i }` }>Time</label>
                                                                        <input value={ item.departure.time } type='text' className='form-control' id={ `flight-departure-time-${ i }` } disabled />
                                                                    </div>
                                                                </div>

                                                                <label htmlFor={ `flight-arrival-${ i }` }>Arrival</label>
                                                                <div className='form-row pl-3' id={ `flight-arrival-${ i }` }>
                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `flight-arrival-location-${ i }` }>Location</label>
                                                                        <input value={ item.arrival.location } type='text' className='form-control' id={ `flight-arrival-location-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `flight-arrival-date-${ i }` }>Date</label>
                                                                        <input value={ item.arrival.date } type='text' className='form-control' id={ `flight-arrival-date-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `flight-arrival-time-${ i }` }>Time</label>
                                                                        <input value={ item.arrival.time } type='text' className='form-control' id={ `flight-arrival-time-${ i }` } disabled />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        </ul>
                                    }

                                    { location.hash == '#car-hire' &&
                                        <ul className='list-group list-group-flush'>
                                            <h4 className='page-title'>Car Hire</h4>

                                            <li className='list-group-item p-3'>
                                                <div>
                                                    { this.state.item.car_hire.map((item, i) => 
                                                        <div key={ i }>
                                                            <div className='bg-white border rounded p-3 mb-3'>
                                                                <div className='form-row'>
                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `hire-confirmation-number-${ i }` }>Confirmation Number</label>
                                                                        <input value={ item.confirmationNumber } type='text' className='form-control' id={ `hire-confirmation-number-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `hire-car-${ i }` }>Car</label>
                                                                        <input value={ item.car } type='text' className='form-control' id={ `hire-car-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `hire-provider-${ i }` }>Provider</label>
                                                                        <input value={ item.provider } type='text' className='form-control' id={ `hire-provider-${ i }` } disabled />
                                                                    </div>
                                                                </div>

                                                                <label htmlFor={ `hire-pickup-${ i }` }>Pickup</label>
                                                                <div className='form-row pl-3' id={ `hire-pickup-${ i }` }>
                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `hire-pickup-location-${ i }` }>Location</label>
                                                                        <input value={ item.pickup.location } type='text' className='form-control' id={ `hire-pickup-location-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `hire-pickup-date-${ i }` }>Date</label>
                                                                        <input value={ item.pickup.date } type='text' className='form-control' id={ `hire-pickup-date-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `hire-pickup-time-${ i }` }>Time</label>
                                                                        <input value={ item.pickup.time } type='text' className='form-control' id={ `hire-pickup-time-${ i }` } disabled />
                                                                    </div>
                                                                </div>

                                                                <label htmlFor={ `hire-dropoff-${ i }` }>Dropoff</label>
                                                                <div className='form-row pl-3' id={ `hire-dropoff-${ i }` }>
                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `hire-dropoff-location-${ i }` }>Location</label>
                                                                        <input value={ item.dropoff.location } type='text' className='form-control' id={ `hire-dropoff-location-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `hire-dropoff-date-${ i }` }>Date</label>
                                                                        <input value={ item.dropoff.date } type='text' className='form-control' id={ `hire-dropoff-date-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `hire-dropoff-time-${ i }` }>Time</label>
                                                                        <input value={ item.dropoff.time } type='text' className='form-control' id={ `hire-dropoff-time-${ i }` } disabled />
                                                                    </div>
                                                                </div>

                                                                { item.description &&
                                                                    <div className='form-group'>
                                                                        <label htmlFor={ `hire-description-${ i }` }>Description</label>
                                                                        <div className='card'>
                                                                            <div className='card-body' dangerouslySetInnerHTML={ { __html: item.description } } id={ `hire-description-${ i }` } />
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

                                    { location.hash == '#passengers' &&
                                        <ul className='list-group list-group-flush'>
                                            <h4 className='page-title'>Passengers</h4>

                                            <li className='list-group-item p-3'>
                                                <div>
                                                    { this.state.item.passengers.map((item, i) => 
                                                        <div key={ i }>
                                                            <div className='bg-white border rounded p-3 mb-3'>
                                                                <div className='form-row'>
                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `passenger-names-first-${ i }` }>First Name</label>
                                                                        <input value={ item.names.first } type='text' className='form-control' id={ `passenger-names-first-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `passenger-names-last-${ i }` }>Last Name</label>
                                                                        <input value={ item.names.last } type='text' className='form-control' id={ `passenger-names-last-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-4'>
                                                                        <label htmlFor={ `passenger-birth-${ i }` }>Date of Birth</label>
                                                                        <input value={ item.birth } type='text' className='form-control' id={ `passenger-birth-${ i }` } disabled />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        </ul>
                                    }

                                    { location.hash == '#transfers' &&
                                        <ul className='list-group list-group-flush'>
                                            <h4 className='page-title'>Transfers</h4>

                                            <li className='list-group-item p-3'>
                                                <div>
                                                    { this.state.item.transfers.map((item, i) => 
                                                        <div key={ i }>
                                                            <div className='bg-white border rounded p-3 mb-3'>
                                                                <div className='form-row'>
                                                                    <div className='form-group col-md-6'>
                                                                        <label htmlFor={ `transfer-name-${ i }` }>Name</label>
                                                                        <input value={ item.name } type='text' className='form-control' id={ `transfer-name-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-6'>
                                                                        <label htmlFor={ `transfer-date-${ i }` }>Date</label>
                                                                        <input value={ item.date } type='text' className='form-control' id={ `transfer-date-${ i }` } disabled />
                                                                    </div>
                                                                </div>

                                                                { item.description.short &&
                                                                    <div className='form-group'>
                                                                        <label htmlFor={ `transfer-description-short-${ i }` }>Short Description</label>
                                                                        <div className='card'>
                                                                            <div className='card-body' dangerouslySetInnerHTML={ { __html: item.description.short } } id={ `transfer-description-short-${ i }` } />
                                                                        </div>
                                                                    </div>
                                                                }

                                                                { item.description.long &&
                                                                    <div className='form-group'>
                                                                        <label htmlFor={ `transfer-description-long-${ i }` }>Long Description</label>
                                                                        <div className='card'>
                                                                            <div className='card-body' dangerouslySetInnerHTML={ { __html: item.description.long } } id={ `transfer-description-long-${ i }` } />
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

                                    { location.hash == '#customise' &&
                                        <ul className='list-group list-group-flush'>
                                            <h4 className='page-title'>Customisation</h4>

                                            <li className='list-group-item p-3'>
                                                <div>
                                                    <div className='form-group'>
                                                        <label htmlFor='customisation-banner'>Banner Image</label>
                                                        <input value={ this.state.item.customisation.banner } type='text' className='form-control' id='customisation-banner' disabled />
                                                    </div>

                                                    { this.state.item.customisation.description &&
                                                        <div className='form-group'>
                                                            <label htmlFor='customisation-description'>Description</label>
                                                            <div className='card'>
                                                                <div className='card-body' dangerouslySetInnerHTML={ { __html: this.state.item.customisation.description } } id='customisation-description' />
                                                            </div>
                                                        </div>
                                                    }

                                                    { this.state.item.customisation.welcome &&
                                                        <div className='form-group'>
                                                            <label htmlFor='customisation-welcome'>Welcome</label>
                                                            <div className='card'>
                                                                <div className='card-body' dangerouslySetInnerHTML={ { __html: this.state.item.customisation.welcome } } id='customisation-welcome' />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </li>
                                        </ul>
                                    }

                                    { location.hash == '#requirements' &&
                                        <ul className='list-group list-group-flush'>
                                            <h4 className='page-title'>Requirements</h4>

                                            <li className='list-group-item p-3'>
                                                <div>
                                                    { this.state.item.requirements.dietary &&
                                                        <div className='form-group'>
                                                            <label htmlFor='requirements-dietary'>Dietary</label>
                                                            <div className='card'>
                                                                <div className='card-body' dangerouslySetInnerHTML={ { __html: this.state.item.requirements.dietary } } id='requirements-dietary' />
                                                            </div>
                                                        </div>
                                                    }

                                                    { this.state.item.requirements.other &&
                                                        <div className='form-group'>
                                                            <label htmlFor='requirements-other'>Other</label>
                                                            <div className='card'>
                                                                <div className='card-body' dangerouslySetInnerHTML={ { __html: this.state.item.requirements.other } } id='requirements-other' />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </li>
                                        </ul>
                                    }

                                    { location.hash == '#notes' &&
                                        <ul className='list-group list-group-flush'>
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
                                                                        <div className='card'>
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