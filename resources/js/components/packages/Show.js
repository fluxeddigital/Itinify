import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { buildState, format } from '../../utils';

import { airlines, airlinesOptions, airlinesSet } from '../../data/airlines';
import { airports, airportsOptions, airportsSet } from '../../data/airports';
import { carHireProviders, carHireProvidersOptions, carHireProvidersSet } from '../../data/car-hire-providers';

const schema = [
    {
        name: 'client_id',
        type: 'string',
    },
    {
        name: 'client_name',
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
        name: 'title',
        type: 'string',
    },
    {
        name: 'accepted_at',
        type: 'string',
    },
    {
        name: 'accepted_by',
        type: 'string',
    },
    {
        name: 'car_hire',
        type: 'array',
        schema: [
            {
                name: 'car',
                type: 'string',
            },
            {
                name: 'confirmationNumber',
                type: 'string',
            },
            {
                name: 'description',
                type: 'string',
            },
            {
                name: 'dropoff',
                type: 'object',
                schema: [
                    {
                        name: 'date',
                        type: 'string',
                    },
                    {
                        name: 'location',
                        type: 'string',
                    },
                    {
                        name: 'time',
                        type: 'string',
                    },
                ]
            },
            {
                name: 'pickup',
                type: 'object',
                schema: [
                    {
                        name: 'date',
                        type: 'string',
                    },
                    {
                        name: 'location',
                        type: 'string',
                    },
                    {
                        name: 'time',
                        type: 'string',
                    },
                ]
            },
            {
                name: 'provider',
                type: 'string',
                options: carHireProvidersSet,
            },
        ],
    },
    {
        name: 'customisation',
        type: 'object',
        schema: [
            {
                name: 'banner',
                type: 'string',
            },
            {
                name: 'description',
                type: 'string',
            },
            {
                name: 'welcome',
                type: 'string',
            },
        ],
    },
    {
        name: 'documents',
        type: 'array',
        schema: [
            {
                name: 'title',
                type: 'string',
            },
            {
                name: 'url',
                type: 'string',
            },
        ],
    },
    {
        name: 'expires',
        type: 'string',
    },
    {
        name: 'flights',
        type: 'array',
        schema: [
            {
                name: 'airline',
                type: 'string',
                options: airlinesSet,
            },
            {
                name: 'arrival',
                type: 'object',
                schema: [
                    {
                        name: 'airport',
                        type: 'string',
                        options: airportsSet,
                    },
                    {
                        name: 'date',
                        type: 'string',
                    },
                    {
                        name: 'time',
                        type: 'string',
                    },
                ]
            },
            {
                name: 'class',
                type: 'string',
                options: [
                    '',
                    'Business',
                    'Economy',
                    'Economy Plus',
                    'First Class',
                ],
            },
            {
                name: 'departure',
                type: 'object',
                schema: [
                    {
                        name: 'airport',
                        type: 'string',
                        options: airportsSet,
                    },
                    {
                        name: 'date',
                        type: 'string',
                    },
                    {
                        name: 'time',
                        type: 'string',
                    },
                ]
            },
            {
                name: 'duration',
                type: 'string',
            },
            {
                name: 'locator',
                type: 'string',
            },
            {
                name: 'number',
                type: 'string',
            },
        ],
    },
    {
        name: 'issued',
        type: 'string',
    },
    {
        name: 'itinerary',
        type: 'array',
        schema: [
            {
                name: 'date',
                type: 'string',
            },
            {
                name: 'description',
                type: 'object',
                schema: [
                    {
                        name: 'long',
                        type: 'string',
                    },
                    {
                        name: 'short',
                        type: 'string',
                    },
                ],
            },
            {
                name: 'name',
                type: 'string',
            },
            {
                name: 'time',
                type: 'string',
            },
        ],
    },
    {
        name: 'lead_status',
        type: 'string',
    },
    {
        name: 'notes',
        type: 'array',
        schema: [
            {
                name: 'title',
                type: 'string',
            },
            {
                name: 'content',
                type: 'string',
            },
        ],
    },
    {
        name: 'passengers',
        type: 'array',
        schema: [
            {
                name: 'names',
                type: 'object',
                schema: [
                    {
                        name: 'first',
                        type: 'string',
                    },
                    {
                        name: 'last',
                        type: 'string',
                    },
                ],
            },
            {
                name: 'birth',
                type: 'string',
            },
        ],
    },
    {
        name: 'pricing',
        type: 'object',
        schema: [
            {
                name: 'person',
                type: 'string',
            },
            {
                name: 'total',
                type: 'string',
            },
            {
                name: 'vat',
                type: 'string',
            },
        ],
    },
    {
        name: 'requirements',
        type: 'object',
        schema: [
            {
                name: 'dietary',
                type: 'string',
            },
            {
                name: 'other',
                type: 'string',
            },
        ],
    },
    {
        name: 'restaurants',
        type: 'array',
        schema: [
            {
                name: 'address',
                type: 'object',
                schema: [
                    {
                        name: 'line1',
                        type: 'string',
                    },
                    {
                        name: 'line2',
                        type: 'string',
                    },
                    {
                        name: 'line3',
                        type: 'string',
                    },
                    {
                        name: 'city',
                        type: 'string',
                    },
                    {
                        name: 'county',
                        type: 'string',
                    },
                    {
                        name: 'postcode',
                        type: 'string',
                    },
                    {
                        name: 'country',
                        type: 'string',
                    },
                ],
            },
            {
                name: 'description',
                type: 'string',
            },
            {
                name: 'links',
                type: 'object',
                schema: [
                    {
                        name: 'map',
                        type: 'string',
                    },
                    {
                        name: 'reservation',
                        type: 'string',
                    },
                ],
            },
            {
                name: 'logo',
                type: 'string',
            },
            {
                name: 'name',
                type: 'string',
            },
            {
                name: 'phone',
                type: 'string',
            },
        ],
    },
    {
        name: 'status',
        type: 'string',
    },
    {
        name: 'transfers',
        type: 'array',
        schema: [
            {
                name: 'date',
                type: 'string',
            },
            {
                name: 'description',
                type: 'object',
                schema: [
                    {
                        name: 'long',
                        type: 'string',
                    },
                    {
                        name: 'short',
                        type: 'string',
                    },
                ],
            },
            {
                name: 'name',
                type: 'string',
            },
            {
                name: 'time',
                type: 'string',
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
        axios.get(`/api/packages/${ this.props.match.params.id }`).then(res => {
            res.data.data = format(res.data.data, schema);

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
                                    { location.hash != '#itinerary' && location.hash != '#flights' && location.hash != '#car-hire' && location.hash != '#passengers' && location.hash != '#transfers' && location.hash != '#restaurants' && location.hash != '#documents' && location.hash != '#customise' && location.hash != '#requirements' && location.hash != '#notes' &&
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

                                                                { item.description.short.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/g, '') &&
                                                                    <div className='form-group'>
                                                                        <label htmlFor={ `item-description-short-${ i }` }>Short Description</label>
                                                                        <div className='card'>
                                                                            <div className='card-body' dangerouslySetInnerHTML={ { __html: item.description.short } } id={ `item-description-short-${ i }` } />
                                                                        </div>
                                                                    </div>
                                                                }

                                                                { item.description.long.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/g, '') &&
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

                                                    <div>
                                                        { ! this.state.item.itinerary.length &&
                                                            <div className='alert alert-danger'>
                                                                No itinerary items found!
                                                            </div>
                                                        }
                                                    </div>
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
                                                                        <input value={ airlines[item.airline] } type='text' className='form-control' id={ `flight-airline-${ i }` } disabled />
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
                                                                        <input value={ airports[item.departure.airport] } type='text' className='form-control' id={ `flight-departure-location-${ i }` } disabled />
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
                                                                        <input value={ airports[item.arrival.airport] } type='text' className='form-control' id={ `flight-arrival-location-${ i }` } disabled />
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

                                                    <div>
                                                        { ! this.state.item.flights.length &&
                                                            <div className='alert alert-danger'>
                                                                No flights found!
                                                            </div>
                                                        }
                                                    </div>
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
                                                                        <input value={ carHireProviders[item.provider] } type='text' className='form-control' id={ `hire-provider-${ i }` } disabled />
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

                                                                { item.description.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/g, '') &&
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

                                                    <div>
                                                        { ! this.state.item.car_hire.length &&
                                                            <div className='alert alert-danger'>
                                                                No hires found!
                                                            </div>
                                                        }
                                                    </div>
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

                                                    <div>
                                                        { ! this.state.item.passengers.length &&
                                                            <div className='alert alert-danger'>
                                                                No passengers found!
                                                            </div>
                                                        }
                                                    </div>
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

                                                                { item.description.short.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/g, '') &&
                                                                    <div className='form-group'>
                                                                        <label htmlFor={ `transfer-description-short-${ i }` }>Short Description</label>
                                                                        <div className='card'>
                                                                            <div className='card-body' dangerouslySetInnerHTML={ { __html: item.description.short } } id={ `transfer-description-short-${ i }` } />
                                                                        </div>
                                                                    </div>
                                                                }

                                                                { item.description.long.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/g, '') &&
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

                                                    <div>
                                                        { ! this.state.item.transfers.length &&
                                                            <div className='alert alert-danger'>
                                                                No transfers found!
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    }

                                    { location.hash == '#restaurants' &&
                                        <ul className='list-group list-group-flush'>
                                            <h4 className='page-title'>Restaurants</h4>

                                            <li className='list-group-item p-3'>
                                                <div>
                                                    { this.state.item.restaurants.map((item, i) => 
                                                        <div key={ i }>
                                                            <div className='bg-white border rounded p-3 mb-3'>
                                                                <div className='form-row'>
                                                                    <div className='form-group col-md-6'>
                                                                        <label htmlFor={ `restaurant-name-${ i }` }>Name</label>
                                                                        <input value={ item.name } type='text' className='form-control' id={ `restaurant-name-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-6'>
                                                                        <label htmlFor={ `restaurant-phone-${ i }` }>Phone</label>
                                                                        <input value={ item.phone } type='text' className='form-control' id={ `restaurant-phone-${ i }` } disabled />
                                                                    </div>
                                                                </div>

                                                                { item.description.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/g, '') &&
                                                                    <div className='form-group'>
                                                                        <label htmlFor={ `restaurant-description-${ i }` }>Description</label>
                                                                        <div className='card'>
                                                                            <div className='card-body' dangerouslySetInnerHTML={ { __html: item.description } } id={ `restaurant-description-${ i }` } />
                                                                        </div>
                                                                    </div>
                                                                }

                                                                <div className='form-group'>
                                                                    <label>Address</label>
                                                                    <div className='border rounded'>
                                                                        { item.address.line1 &&
                                                                            <input value={ item.address.line1 } type='text' className='form-control border-0 rounded-0' disabled />
                                                                        }
                                                                        { item.address.line2 &&
                                                                            <input value={ item.address.line2 } type='text' className='form-control border-0 rounded-0' disabled />
                                                                        }
                                                                        { item.address.line3 &&
                                                                            <input value={ item.address.line3 } type='text' className='form-control border-0 rounded-0' disabled />
                                                                        }
                                                                        { item.address.city &&
                                                                            <input value={ item.address.city } type='text' className='form-control border-0 rounded-0' disabled />
                                                                        }
                                                                        { item.address.county &&
                                                                            <input value={ item.address.county } type='text' className='form-control border-0 rounded-0' disabled />
                                                                        }
                                                                        { item.address.postcode &&
                                                                            <input value={ item.address.postcode } type='text' className='form-control border-0 rounded-0' disabled />
                                                                        }
                                                                        { item.address.country &&
                                                                            <input value={ item.address.country } type='text' className='form-control border-0 rounded-0' disabled />
                                                                        }
                                                                    </div>
                                                                </div>

                                                                <div className='form-row'>
                                                                    <div className='form-group col-md-6'>
                                                                        <Link to={ item.links.map } className='d-block'>Map Link</Link>
                                                                    </div>

                                                                    <div className='form-group col-md-6'>
                                                                        <Link to={ item.links.reservation } className='d-block'>Map Link</Link>
                                                                    </div>
                                                                </div>

                                                                { item.logo &&
                                                                    <div className='form-group'>
                                                                        <label htmlFor={ `restaurant-logo-${ i }` }>Logo</label>
                                                                        <img src={ item.logo } id={ `restaurant-logo-${ i }` } className='text-center mx-auto h-100 px-4 pb-4 d-block' />
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div>
                                                        { ! this.state.item.restaurants.length &&
                                                            <div className='alert alert-danger'>
                                                                No restaurants found!
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    }

                                    { location.hash == '#documents' &&
                                        <ul className='list-group list-group-flush'>
                                            <h4 className='page-title'>Documents</h4>

                                            <li className='list-group-item p-3'>
                                                <div>
                                                    { this.state.item.documents.map((item, i) => 
                                                        <div key={ i }>
                                                            <div className='bg-white border rounded p-3 mb-3'>
                                                                <div className='form-row'>
                                                                    <div className='form-group col-md-6'>
                                                                        <Link to={ item.url } className='d-block'>{ item.title }</Link>
                                                                    </div>

                                                                    <div className='form-group col-md-6'>
                                                                        <label htmlFor={ `document-passenger-${ i }` }>Passenger</label>
                                                                        <input value={ item.passenger } type='text' className='form-control' id={ `document-passenger-${ i }` } disabled />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div>
                                                        { ! this.state.item.passengers.length &&
                                                            <div className='alert alert-danger'>
                                                                No documents found!
                                                            </div>
                                                        }
                                                    </div>
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
                                                        <div>
                                                            { this.state.item.customisation.description.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/g, '') &&
                                                                <div className='form-group'>
                                                                    <label htmlFor='customisation-description'>Description</label>
                                                                    <div className='card'>
                                                                        <div className='card-body' dangerouslySetInnerHTML={ { __html: this.state.item.customisation.description } } id='customisation-description' />
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    }

                                                    { this.state.item.customisation.welcome &&
                                                        <div>
                                                            { this.state.item.customisation.welcome.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/g, '') &&
                                                                <div className='form-group'>
                                                                    <label htmlFor='customisation-welcome'>Welcome</label>
                                                                    <div className='card'>
                                                                        <div className='card-body' dangerouslySetInnerHTML={ { __html: this.state.item.customisation.welcome } } id='customisation-welcome' />
                                                                    </div>
                                                                </div>
                                                            }
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
                                                        <div>
                                                            { this.state.item.requirements.dietary.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/g, '') &&
                                                                <div className='form-group'>
                                                                    <label htmlFor='requirements-dietary'>Dietary</label>
                                                                    <div className='card'>
                                                                        <div className='card-body' dangerouslySetInnerHTML={ { __html: this.state.item.requirements.dietary } } id='requirements-dietary' />
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    }

                                                    { this.state.item.requirements.other &&
                                                        <div>
                                                            { this.state.item.requirements.other.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/g, '') &&
                                                                <div className='form-group'>
                                                                    <label htmlFor='requirements-other'>Other</label>
                                                                    <div className='card'>
                                                                        <div className='card-body' dangerouslySetInnerHTML={ { __html: this.state.item.requirements.other } } id='requirements-other' />
                                                                    </div>
                                                                </div>
                                                            }

                                                            <div>
                                                                { ! this.state.item.requirements.other.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/g, '') &&
                                                                    <div>
                                                                        { this.state.item.requirements.dietary &&
                                                                            <div>
                                                                                { ! this.state.item.requirements.dietary.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/g, '') &&
                                                                                    <div className='alert alert-danger'>
                                                                                        No requirements found!
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                        }

                                                                        { ! this.state.item.requirements.dietary &&
                                                                            <div className='alert alert-danger'>
                                                                                No requirements found!
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    }

                                                    <div>
                                                        { ! this.state.item.requirements.dietary && ! this.state.item.requirements.other &&
                                                            <div className='alert alert-danger'>
                                                                No requirements found!
                                                            </div>
                                                        }
                                                    </div>
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

                                                                { item.content.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/g, '') &&
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

                                                    <div>
                                                        { ! this.state.item.notes.length &&
                                                            <div className='alert alert-danger'>
                                                                No notes found!
                                                            </div>
                                                        }
                                                    </div>
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