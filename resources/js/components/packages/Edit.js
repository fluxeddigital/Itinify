import move from 'array-move';
import axios from 'axios';
import * as filestack from 'filestack-js';
import React, { Component } from 'react';
import Datetime from 'react-datetime';
import { Link } from 'react-router-dom';
import Select from 'react-select'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PhoneInput from 'react-telephone-input';
import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import set from 'lodash.set';

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
        options: [
            'Cold',
            'Hot',
        ],
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
            {
                name: 'visibility',
                type: 'string',
                options: [
                    'false',
                    'true',
                ],
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
        options: [
            'Accepted',
            'Declined',
            'Open',
        ],
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

class Edit extends Component {
    constructor (props) {
        super(props);

        this.state = {
            active: {
                itinerary: 0,
                flights: 0,
                carHire: 0,
                transfers: 0,
                restaurants: 0,
            },
            clients: [
                {
                    label: 'None',
                    value: null,
                },
            ],
            events: [
                {
                    label: 'None',
                    value: null,
                },
            ],
            item: buildState(schema),
            items: {},
            itemCategories: {},
            itineraryItemsOptions: {},
            itineraryCategoriesOptions: [],
            restaurantsItemsOptions: {},
            restaurantsCategoriesOptions: [],
            transfersItemsOptions: {},
            transfersCategoriesOptions: [],
            activeItemCategory: {
                'itinerary': 0,
                'transfers': 0,
                'restaurants': 0,
            },
        };
    };

    componentDidMount () {
        axios.get(`/api/packages/${ this.props.match.params.id }`).then(res => {
            res.data.data = format(res.data.data, schema);

            this.setState({
                clients: this.state.clients,
                events: this.state.events,
                item: {...this.state.item, ...res.data.data},
                items: this.state.items,
            });
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app/packages');
        });

        axios.get('/api/clients').then(res => {
            let prep = this.state;

            for (let i in res.data.data) {
                prep.clients.push({
                    label: res.data.data[i].name,
                    value: res.data.data[i].id,
                });
            };

            this.setState(prep);
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app/packages');
        });

        axios.get('/api/events').then(res => {
            let prep = this.state;

            for (let i in res.data.data) {
                prep.events.push({
                    label: res.data.data[i].name,
                    value: res.data.data[i].id,
                });
            };

            this.setState(prep);
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app/packages');
        });

        axios.get('/api/items').then(res => {
            let prep = this.state;

            for (let i in res.data.data) {
                prep.items[res.data.data[i].id] = {
                    name: res.data.data[i].name,
                    long_description: res.data.data[i].long_description,
                    short_description: res.data.data[i].short_description,
                };

                if (res.data.data[i].category_id) {
                    prep.itemCategories[res.data.data[i].category_id] = res.data.data[i].category_name;

                    if (res.data.data[i].category_section == 'Itinerary') {
                        if (! (res.data.data[i].category_id in prep.itineraryItemsOptions)) {
                            prep.itineraryItemsOptions[res.data.data[i].category_id] = [];

                            prep.itineraryCategoriesOptions.push({
                                label: res.data.data[i].category_name,
                                value: res.data.data[i].category_id,
                            });
                        };

                        prep.itineraryItemsOptions[res.data.data[i].category_id].push({
                            label: res.data.data[i].name,
                            value: res.data.data[i].id,
                        });
                    } else if (res.data.data[i].category_section == 'Transfers') {
                        if (! (res.data.data[i].category_id in prep.transfersItemsOptions)) {
                            prep.transfersItemsOptions[res.data.data[i].category_id] = [];

                            prep.transfersCategoriesOptions.push({
                                label: res.data.data[i].category_name,
                                value: res.data.data[i].category_id,
                            });
                        };

                        prep.transfersItemsOptions[res.data.data[i].category_id].push({
                            label: res.data.data[i].name,
                            value: res.data.data[i].id,
                        });
                    } else if (res.data.data[i].category_section == 'Restaurants') {
                        if (! (res.data.data[i].category_id in prep.restaurantsItemsOptions)) {
                            prep.restaurantsItemsOptions[res.data.data[i].category_id] = [];

                            prep.restaurantsCategoriesOptions.push({
                                label: res.data.data[i].category_name,
                                value: res.data.data[i].category_id,
                            });
                        };

                        prep.restaurantsItemsOptions[res.data.data[i].category_id].push({
                            label: res.data.data[i].name,
                            value: res.data.data[i].id,
                        });
                    } else {
                        prep.itineraryItemsOptions[0].push({
                            label: res.data.data[i].name,
                            value: res.data.data[i].id,
                        });

                        prep.transfersItemsOptions[0].push({
                            label: res.data.data[i].name,
                            value: res.data.data[i].id,
                        });

                        prep.restaurantsItemsOptions[0].push({
                            label: res.data.data[i].name,
                            value: res.data.data[i].id,
                        });
                    };
                };
            };

            this.setState(prep);
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app/packages');
        });

        $('.date').datepicker().on('changeDate', (element) => {
            this.onChangeHandler(element);
        });
    };

    Note = SortableElement(({ item, index }) => {
        return (
            <div className='bg-white border rounded p-3 mb-3'>
                <div className='form-row'>
                    <div className='form-group col-md-6'>
                        <label htmlFor={ `note-title-${ index }` }>Title</label>
                        <input name='title' value={ item.title } onChange={ e => this.onNoteChangeHandler(e, index) } type='text' className='form-control' id={ `note-title-${ index }` } />
                    </div>
    
                    <div className='form-group col-md-6'>
                        <label htmlFor={ `note-visibility-${ index }` }>Visibility</label>
                        <Select name='visibility' value={ { value: item.visibility, label: (item.visibility != 'true' ? 'Private' : 'Visible to Client') } } options={ [
                            { label: 'Private', value: 'false' },
                            { label: 'Visible to Client', value: 'true' },
                        ] } onChange={ this.onNoteSelectChangeHandler(index)('visibility') } className='form-control p-0' id={ `note-visibility-${ index }` } />
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor={ `note-content-${ index }` }>Content</label>
                    <Editor
                        apiKey={ document.head.querySelector('meta[name="tinymce-key"]').content }
                        textareaName='content'
                        value={ item.content }
                        onEditorChange={ this.onNoteEditorChangeHandler('content', index) }
                        plugins='print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help code'
                        toolbar='formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
                        init={ {
                            height: 300,
                        } }
                    />
                </div>

                <div>
                    <span onClick={ this.onDeleteNote(index, this) } className='btn btn-danger'>Delete</span>
                </div>
            </div>
        );
    });

    Document = SortableElement(({ item, index }) => {
        return (
            <div className='bg-white border rounded p-3 mb-3'>
                <div className='form-row'>
                    <div className='form-group col-md-6'>
                        <label htmlFor={ `document-title-${ index }` }>Title</label>
                        <input name='title' value={ item.title } onChange={ e => this.onDocumentChangeHandler(e, index) } type='text' className='form-control' id={ `document-title-${ index }` } />
                    </div>
    
                    <div className='form-group col-md-6'>
                        <label htmlFor={ `document-attachment-${ index }` }>Attachment</label>
                        <div className='mb-2'>
                            <span onClick={ this.pickDocumentAttachment(index) } className='btn btn-primary'>Upload</span>
                        </div>

                        { item.url &&
                            <a href={ item.url } target='blank'>Link</a>
                        }
                    </div>
                </div>

                <div>
                    <span onClick={ this.onDeleteDocument(index, this) } className='btn btn-danger'>Delete</span>
                </div>
            </div>
        );
    });

    Passenger = SortableElement(({ item, index }) => {
        return (
            <div className='bg-white border rounded p-3 mb-3'>
                <div className='form-row'>
                    <div className='form-group col-md-6'>
                        <label htmlFor={ `passenger-names-first-${ index }` }>First Name</label>
                        <input name='names.first' value={ item.names.first } onChange={ e => this.onPassengerChangeHandler(e, index) } type='text' className='form-control' id={ `passenger-names-first-${ index }` } />
                    </div>

                    <div className='form-group col-md-6'>
                        <label htmlFor={ `passenger-names-last-${ index }` }>Last Name</label>
                        <input name='names.last' value={ item.names.last } onChange={ e => this.onPassengerChangeHandler(e, index) } type='text' className='form-control' id={ `passenger-names-last-${ index }` } />
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor={ `passenger-birth-${ index }` }>Date of Birth</label>
                    <Datetime name='birth' value={ item.birth } onChange={ this.onPassengerDateChangeHandler('birth', index) } dateFormat='DD/MM/YYYY' timeFormat={ false } id={ `passenger-birth-${ index }` } />
                </div>

                <div>
                    <span onClick={ this.onDeletePassenger(index, this) } className='btn btn-danger'>Delete</span>
                </div>
            </div>
        );
    });

    Transfer = SortableElement(({ item, index }) => {
        return (
            <div className='bg-white border rounded p-3 mb-3'>
                <div onClick={ this.onOpenItemHandler('transfers', index) } className='cursor-pointer'>
                    { this.state.active.transfers != index &&
                        <div>
                            <h4>{ item.date } - { item.name }</h4>
                        </div>
                    }
                </div>

                { this.state.active.transfers == index &&
                    <div>
                        <label>Item</label>
                        <div className='form-row ml-2'>
                            <div className='form-group col-md-6'>
                                <label htmlFor={ `transfer-select-category-${ index }` }>Category</label>
                                <Select placeholder='Search category name...' options={ this.state.transfersCategoriesOptions } onChange={ this.onItemCategorySelectHandler('transfers') } className='form-control p-0' />
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor={ `transfer-select-name-${ index }` }>Name</label>
                                <Select options={ this.state.transfersItemsOptions[this.state.activeItemCategory.transfers] } onChange={ this.onItemSelectHandler('transfers', index) } className='form-control p-0' />
                            </div>
                        </div>

                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor={ `transfer-name-${ index }` }>Name</label>
                                <input name='name' value={ item.name } onChange={ e => this.onTransferChangeHandler(e, index) } type='text' className='form-control' id={ `transfer-name-${ index }` } />
                            </div>

                            <div className='form-group col-md-3'>
                                <label htmlFor={ `transfer-date-${ index }` }>Date</label>
                                <Datetime name='date' value={ item.date } onChange={ this.onTransferDateChangeHandler('date', index) } dateFormat='DD/MM/YYYY' timeFormat={ false } id={ `transfer-date-${ index }` } />
                            </div>

                            <div className='form-group col-md-3'>
                                <label htmlFor={ `transfer-time-${ index }` }>Time</label>
                                <Datetime name='time' value={ item.time } onChange={ this.onTransferTimeChangeHandler('time', index) } dateFormat={ false } timeFormat='HH:mm' id={ `transfer-time-${ index }` } />
                            </div>
                        </div>

                        <div className='form-group'>
                            <label htmlFor={ `transfer-description-short-${ index }` }>Short Description</label>
                            <Editor
                                apiKey={ document.head.querySelector('meta[name="tinymce-key"]').content }
                                textareaName='description.short'
                                value={ item.description.short }
                                onEditorChange={ this.onTransferEditorChangeHandler('description.short', index) }
                                plugins='print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help code'
                                toolbar='formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
                                init={ {
                                    height: 200,
                                } }
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor={ `transfer-description-long-${ index }` }>Long Description</label>
                            <Editor
                                apiKey={ document.head.querySelector('meta[name="tinymce-key"]').content }
                                textareaName='description.long'
                                value={ item.description.long }
                                onEditorChange={ this.onTransferEditorChangeHandler('description.long', index) }
                                plugins='print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help code'
                                toolbar='formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
                                init={ {
                                    height: 300,
                                } }
                            />
                        </div>

                        <div>
                            <span onClick={ this.onDeleteTransfer(index, this) } className='btn btn-danger'>Delete</span>
                        </div>
                    </div>
                }
            </div>
        );
    });

    Item = SortableElement(({ item, index }) => {
        return (
            <div className='bg-white border rounded p-3 mb-3'>
                <div onClick={ this.onOpenItemHandler('itinerary', index) } className='cursor-pointer'>
                    { this.state.active.itinerary != index &&
                        <div>
                            <h4>{ item.date } - { item.name }</h4>
                        </div>
                    }
                </div>

                { this.state.active.itinerary == index &&
                    <div>
                        <label>Item</label>
                        <div className='form-row ml-2'>
                            <div className='form-group col-md-6'>
                                <label htmlFor={ `item-select-category-${ index }` }>Category</label>
                                <Select placeholder='Search category name...' options={ this.state.itineraryCategoriesOptions } onChange={ this.onItemCategorySelectHandler('itinerary') } className='form-control p-0' />
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor={ `item-select-name-${ index }` }>Name</label>
                                <Select options={ this.state.itineraryItemsOptions[this.state.activeItemCategory.itinerary] } onChange={ this.onItemSelectHandler('itinerary', index) } className='form-control p-0' />
                            </div>
                        </div>

                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor={ `item-name-${ index }` }>Name</label>
                                <input name='name' value={ item.name } onChange={ e => this.onItemChangeHandler(e, index) } type='text' className='form-control' id={ `item-name-${ index }` } />
                            </div>

                            <div className='form-group col-md-3'>
                                <label htmlFor={ `item-date-${ index }` }>Date</label>
                                <Datetime name='date' value={ item.date } onChange={ this.onItemDateChangeHandler('date', index) } dateFormat='DD/MM/YYYY' timeFormat={ false } id={ `item-date-${ index }` } />
                            </div>

                            <div className='form-group col-md-3'>
                                <label htmlFor={ `item-time-${ index }` }>Time</label>
                                <Datetime name='time' value={ item.time } onChange={ this.onItemTimeChangeHandler('time', index) } dateFormat={ false } timeFormat='HH:mm' id={ `item-time-${ index }` } />
                            </div>
                        </div>

                        <div className='form-group'>
                            <label htmlFor={ `item-description-short-${ index }` }>Short Description</label>
                            <Editor
                                apiKey={ document.head.querySelector('meta[name="tinymce-key"]').content }
                                textareaName='description.short'
                                value={ item.description.short }
                                onEditorChange={ this.onItemEditorChangeHandler('description.short', index) }
                                plugins='print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help code'
                                toolbar='formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
                                init={ {
                                    height: 200,
                                } }
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor={ `transfer-description-long-${ index }` }>Long Description</label>
                            <Editor
                                apiKey={ document.head.querySelector('meta[name="tinymce-key"]').content }
                                textareaName='description.long'
                                value={ item.description.long }
                                onEditorChange={ this.onItemEditorChangeHandler('description.long', index) }
                                plugins='print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help code'
                                toolbar='formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
                                init={ {
                                    height: 300,
                                } }
                            />
                        </div>

                        <div>
                            <span onClick={ this.onDeleteItem(index, this) } className='btn btn-danger'>Delete</span>
                        </div>
                    </div>
                }
            </div>
        );
    });

    Hire = SortableElement(({ item, index }) => {
        return (
            <div className='bg-white border rounded p-3 mb-3'>
                <div onClick={ this.onOpenItemHandler('carHire', index) } className='cursor-pointer'>
                    { this.state.active.carHire != index &&
                        <div>
                            <h4>{ item.pickup.date } - { item.pickup.location }</h4>
                        </div>
                    }
                </div>

                { this.state.active.carHire == index &&
                    <div>
                        <div className='form-row'>
                            <div className='form-group col-md-4'>
                                <label htmlFor={ `car-hire-confirmation-number-${ index }` }>Confirmation Number</label>
                                <input name='confirmationNumber' value={ item.confirmationNumber } onChange={ e => this.onCarHireChangeHandler(e, index) } type='text' className='form-control' id={ `car-hire-confirmation-number-${ index }` } />
                            </div>

                            <div className='form-group col-md-4'>
                                <label htmlFor={ `car-hire-car-${ index }` }>Car</label>
                                <input name='car' value={ item.car } onChange={ e => this.onCarHireChangeHandler(e, index) } type='text' className='form-control' id={ `car-hire-car-${ index }` } />
                            </div>

                            <div className='form-group col-md-4'>
                                <label htmlFor={ `car-hire-provider-${ index }` }>Provider</label>
                                <Select name='provider' value={ { value: item.provider, label: carHireProviders[item.provider] } } options={ carHireProvidersOptions } onChange={ this.onCarHireSelectChangeHandler(index)('provider') } className='form-control p-0' id={ `car-hire-provider-${ index }` } />
                            </div>
                        </div>

                        <label>Pickup</label>
                        <div className='form-row pl-2'>
                            <div className='form-group col-md-6'>
                                <label htmlFor={ `car-hire-pickup-location-${ index }` }>Location</label>
                                <input name='pickup.location' value={ item.pickup.location } onChange={ e => this.onCarHireChangeHandler(e, index) } type='text' className='form-control' id={ `car-hire-pickup-location-${ index }` } />
                            </div>

                            <div className='form-group col-md-3'>
                                <label htmlFor={ `car-hire-pickup-date-${ index }` }>Date</label>
                                <Datetime name='pickup.date' value={ item.pickup.date } onChange={ this.onCarHireDateChangeHandler('pickup.date', index) } dateFormat='DD/MM/YYYY' timeFormat={ false } id={ `car-hire-pickup-date-${ index }` } />
                            </div>

                            <div className='form-group col-md-3'>
                                <label htmlFor={ `car-hire-pickup-time-${ index }` }>Time</label>
                                <Datetime name='pickup.time' value={ item.pickup.time } onChange={ this.onCarHireTimeChangeHandler('pickup.time', index) } dateFormat={ false } timeFormat='HH:mm' id={ `car-hire-pickup-time-${ index }` } />
                            </div>
                        </div>

                        <label>Dropoff</label>
                        <div className='form-row pl-2'>
                            <div className='form-group col-md-6'>
                                <label htmlFor={ `car-hire-dropoff-location-${ index }` }>Location</label>
                                <input name='dropoff.location' value={ item.dropoff.location } onChange={ e => this.onCarHireChangeHandler(e, index) } type='text' className='form-control' id={ `car-hire-dropoff-location-${ index }` } />
                            </div>

                            <div className='form-group col-md-3'>
                                <label htmlFor={ `car-hire-dropoff-date-${ index }` }>Date</label>
                                <Datetime name='dropoff.date' value={ item.dropoff.date } onChange={ this.onCarHireDateChangeHandler('dropoff.date', index) } dateFormat='DD/MM/YYYY' timeFormat={ false } id={ `car-hire-dropoff-date-${ index }` } />
                            </div>

                            <div className='form-group col-md-3'>
                                <label htmlFor={ `car-hire-dropoff-time-${ index }` }>Time</label>
                                <Datetime name='dropoff.time' value={ item.dropoff.time } onChange={ this.onCarHireTimeChangeHandler('dropoff.time', index) } dateFormat={ false } timeFormat='HH:mm' id={ `car-hire-dropoff-time-${ index }` } />
                            </div>
                        </div>

                        <div className='form-group'>
                            <label htmlFor={ `car-hire-description-${ index }` }>Description</label>
                            <Editor
                                apiKey={ document.head.querySelector('meta[name="tinymce-key"]').content }
                                textareaName='description'
                                value={ item.description }
                                onEditorChange={ this.onCarHireEditorChangeHandler('description', index) }
                                plugins='print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help code'
                                toolbar='formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
                                init={ {
                                    height: 200,
                                } }
                            />
                        </div>

                        <div>
                            <span onClick={ this.onDeleteCarHire(index, this) } className='btn btn-danger'>Delete</span>
                        </div>
                    </div>
                }
            </div>
        );
    });

    Flight = SortableElement(({ item, index }) => {
        return (
            <div className='bg-white border rounded p-3 mb-3'>
                <div onClick={ this.onOpenItemHandler('flights', index) } className='cursor-pointer'>
                    { this.state.active.flights != index &&
                        <div>
                            <h4>{ item.departure.date } - { airports[item.departure.airport] } - { airports[item.arrival.airport] }</h4>
                        </div>
                    }
                </div>

                { this.state.active.flights == index &&
                    <div>
                        <div className='form-row'>
                            <div className='form-group col-md-4'>
                                <label htmlFor={ `flight-number-${ index }` }>Number</label>
                                <input name='number' value={ item.number } onChange={ e => this.onFlightChangeHandler(e, index) } type='text' className='form-control' id={ `flight-number-${ index }` } />
                            </div>

                            <div className='form-group col-md-4'>
                                <label htmlFor={ `flight-locator-${ index }` }>Locator</label>
                                <input name='locator' value={ item.locator } onChange={ e => this.onFlightChangeHandler(e, index) } type='text' className='form-control' id={ `flight-locator-${ index }` } />
                            </div>

                            <div className='form-group col-md-4'>
                                <label htmlFor={ `flight-duration-${ index }` }>Duration</label>
                                <input name='duration' value={ item.duration } onChange={ e => this.onFlightChangeHandler(e, index) } type='text' className='form-control' id={ `flight-duration-${ index }` } />
                            </div>
                        </div>

                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor={ `flight-name-${ index }` }>Class</label>
                                <Select name='class' value={ { value: item.class, label: item.class } } options={ [
                                    { label: 'None', value: '' },
                                    { label: 'Economy', value: 'Economy' },
                                    { label: 'Economy Plus', value: 'Economy Plus' },
                                    { label: 'Business', value: 'Business' },
                                    { label: 'First Class', value: 'First Class' },
                                ] } onChange={ this.onFlightSelectChangeHandler(index)('class') } className='form-control p-0' id={ `flight-class-${ index }` } />
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor={ `flight-name-${ index }` }>Airline</label>
                                <Select name='airline' value={ { value: item.airline, label: airlines[item.airline] } } options={ airlinesOptions } onChange={ this.onFlightSelectChangeHandler(index)('airline') } className='form-control p-0' id={ `flight-airline-${ index }` } />
                            </div>
                        </div>
                        
                        <label>Departure</label>
                        <div className='form-row pl-2'>
                            <div className='form-group col-md-6'>
                                <label htmlFor={ `flight-departure-airport-${ index }` }>Airport</label>
                                <Select name='departure.airport' value={ { value: item.departure.airport, label: airports[item.departure.airport] } } options={ airportsOptions } onChange={ this.onFlightSelectChangeHandler(index)('departure.airport') } className='form-control p-0' id={ `flight-departure-airport-${ index }` } />
                            </div>

                            <div className='form-group col-md-3'>
                                <label htmlFor={ `flight-departure-date-${ index }` }>Date</label>
                                <Datetime name='departure.date' value={ item.departure.date } onChange={ this.onFlightDateChangeHandler('departure.date', index) } dateFormat='DD/MM/YYYY' timeFormat={ false } id={ `flight-departure-date-${ index }` } />
                            </div>

                            <div className='form-group col-md-3'>
                                <label htmlFor={ `flight-departure-time-${ index }` }>Time</label>
                                <Datetime name='departure.time' value={ item.departure.time } onChange={ this.onFlightTimeChangeHandler('departure.time', index) } dateFormat={ false } timeFormat='HH:mm' id={ `flight-departure-time-${ index }` } />
                            </div>
                        </div>

                        <label>Arrival</label>
                        <div className='form-row pl-2'>
                            <div className='form-group col-md-6'>
                                <label htmlFor={ `flight-arrival-airport-${ index }` }>Airport</label>
                                <Select name='arrival.airport' value={ { value: item.arrival.airport, label: airports[item.arrival.airport] } } options={ airportsOptions } onChange={ this.onFlightSelectChangeHandler(index)('arrival.airport') } className='form-control p-0' id={ `flight-arrival-airport-${ index }` } />
                            </div>

                            <div className='form-group col-md-3'>
                                <label htmlFor={ `flight-arrival-date-${ index }` }>Date</label>
                                <Datetime name='arrival.date' value={ item.arrival.date } onChange={ this.onFlightDateChangeHandler('arrival.date', index) } dateFormat='DD/MM/YYYY' timeFormat={ false } id={ `flight-arrival-date-${ index }` } />
                            </div>

                            <div className='form-group col-md-3'>
                                <label htmlFor={ `flight-arrival-time-${ index }` }>Time</label>
                                <Datetime name='arrival.time' value={ item.arrival.time } onChange={ this.onFlightTimeChangeHandler('arrival.time', index) } dateFormat={ false } timeFormat='HH:mm' id={ `flight-arrival-time-${ index }` } />
                            </div>
                        </div>

                        <div>
                            <span onClick={ this.onDeleteFlight(index, this) } className='btn btn-danger'>Delete</span>
                        </div>
                    </div>
                }
            </div>
        );
    });

    Restaurant = SortableElement(({ item, index }) => {
        return (
            <div className='bg-white border rounded p-3 mb-3'>
                <div onClick={ this.onOpenItemHandler('restaurants', index) } className='cursor-pointer'>
                    { this.state.active.restaurants != index &&
                        <div>
                            <h4>{ item.name }</h4>
                        </div>
                    }
                </div>

                { this.state.active.restaurants == index &&
                    <div>
                        <label>Item</label>
                        <div className='form-row ml-2'>
                            <div className='form-group col-md-6'>
                                <label htmlFor={ `restaurant-select-category-${ index }` }>Category</label>
                                <Select placeholder='Search category name...' options={ this.state.restaurantsCategoriesOptions } onChange={ this.onItemCategorySelectHandler('restaurant') } className='form-control p-0' />
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor={ `restaurant-select-name-${ index }` }>Name</label>
                                <Select options={ this.state.restaurantsItemsOptions[this.state.activeItemCategory.restaurant] } onChange={ this.onrestaurantsItemSelectHandler('restaurant', index) } className='form-control p-0' />
                            </div>
                        </div>

                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor={ `restaurant-name-${ index }` }>Name</label>
                                <input name='name' value={ item.name } onChange={ e => this.onRestaurantChangeHandler(e, index) } type='text' className='form-control' id={ `restaurant-name-${ index }` } />
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor={ `restaurant-phone-${ index }` }>Phone</label>
                                <PhoneInput name='phone' defaultCountry='gb' autoFormat={ false } flagsImagePath='/images/flags.png' value={ item.phone } onChange={ this.onRestaurantPhoneChangeHandler('phone', index) } classNames='w-100' listItemClassName='dropdown-item' id={ `restaurant-phone-${ index }` } />
                            </div>
                        </div>

                        <div className='form-group'>
                            <label htmlFor={ `car-hire-description-${ index }` }>Description</label>
                            <Editor
                                apiKey={ document.head.querySelector('meta[name="tinymce-key"]').content }
                                textareaName='description'
                                value={ item.description }
                                onEditorChange={ this.onRestaurantEditorChangeHandler('description', index) }
                                plugins='print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help code'
                                toolbar='formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
                                init={ {
                                    height: 200,
                                } }
                            />
                        </div>

                        <div className='row'>
                            <div className='col-6'>
                                <div className='form-group'>
                                    <label htmlFor={ `restaurant-address-line1-${ index }` }>Line 1</label>
                                    <input name='address.line1' value={ item.address.line1 } onChange={ e => this.onRestaurantChangeHandler(e, index) } type='text' className='form-control' id={ `restaurant-address-line1-${ index }` } />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor={ `restaurant-address-line2-${ index }` }>Line 2</label>
                                    <input name='address.line2' value={ item.address.line2 } onChange={ e => this.onRestaurantChangeHandler(e, index) } type='text' className='form-control' id={ `restaurant-address-line2-${ index }` } />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor={ `restaurant-address-line3-${ index }` }>Line 3</label>
                                    <input name='address.line3' value={ item.address.line3 } onChange={ e => this.onRestaurantChangeHandler(e, index) } type='text' className='form-control' id={ `restaurant-address-line3-${ index }` } />
                                </div>
                            </div>

                            <div className='col-6'>
                                <div className='form-group'>
                                    <label htmlFor={ `restaurant-address-city-${ index }` }>City</label>
                                    <input name='address.city' value={ item.address.city } onChange={ e => this.onRestaurantChangeHandler(e, index) } type='text' className='form-control' id={ `restaurant-address-city-${ index }` } />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor={ `restaurant-address-county-${ index }` }>County</label>
                                    <input name='address.county' value={ item.address.county } onChange={ e => this.onRestaurantChangeHandler(e, index) } type='text' className='form-control' id={ `restaurant-address-county-${ index }` } />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor={ `restaurant-address-postcode-${ index }` }>Postcode</label>
                                    <input name='address.postcode' value={ item.address.postcode } onChange={ e => this.onRestaurantChangeHandler(e, index) } type='text' className='form-control' id={ `restaurant-address-postcode-${ index }` } />
                                </div>
                            </div>
                        </div>

                        <div className='form-group'>
                            <label htmlFor={ `restaurant-address-country-${ index }` }>Country</label>
                            <input name='address.country' value={ item.address.country } onChange={ e => this.onRestaurantChangeHandler(e, index) } type='text' className='form-control' id={ `restaurant-address-country-${ index }` } />
                        </div>

                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor={ `restaurant-links-map-${ index }` }>Map Link</label>
                                <input name='links.map' value={ item.links.map } onChange={ e => this.onRestaurantChangeHandler(e, index) } type='text' className='form-control' id={ `restaurant-links-map-${ index }` } />
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor={ `restaurant-links-reservation-${ index }` }>Reservation Link</label>
                                <input name='links.reservation' value={ item.links.reservation } onChange={ e => this.onRestaurantChangeHandler(e, index) } type='text' className='form-control' id={ `restaurant-links-reservation-${ index }` } />
                            </div>
                        </div>

                        <div className='form-group'>
                            <label htmlFor={ `restaurant-logo-${ index }` }>Logo</label>
                            <div className='mb-2'>
                                <span onClick={ this.pickRestaurantLogo(index) } className='btn btn-primary'>Upload</span>
                            </div>

                            { item.logo &&
                                <img src={ item.logo } className='text-center mx-auto h-100 px-4 pb-4 d-block' />
                            }
                        </div>

                        <div>
                            <span onClick={ this.onDeleteRestaurant(index, this) } className='btn btn-danger'>Delete</span>
                        </div>
                    </div>
                }
            </div>
        );
    });

    Notes = SortableContainer(({ notes }) => {
        return (
            <div>
                { notes.map((item, i) =>
                    <this.Note key={ i } item={ item } index={ i } />
                )}
            </div>
        );
    });

    Itinerary = SortableContainer(({ itinerary }) => {
        return (
            <div>
                { itinerary.map((item, i) =>
                    <this.Item key={ i } item={ item } index={ i } />
                )}
            </div>
        );
    });

    Flights = SortableContainer(({ flights }) => {
        return (
            <div>
                { flights.map((item, i) =>
                    <this.Flight key={ i } item={ item } index={ i } />
                )}
            </div>
        );
    });

    CarHire = SortableContainer(({ carHire }) => {
        return (
            <div>
                { carHire.map((item, i) =>
                    <this.Hire key={ i } item={ item } index={ i } />
                )}
            </div>
        );
    });

    Passengers = SortableContainer(({ passengers }) => {
        return (
            <div>
                { passengers.map((item, i) =>
                    <this.Passenger key={ i } item={ item } index={ i } />
                )}
            </div>
        );
    });

    Transfers = SortableContainer(({ transfers }) => {
        return (
            <div>
                { transfers.map((item, i) =>
                    <this.Transfer key={ i } item={ item } index={ i } />
                )}
            </div>
        );
    });

    Restaurants = SortableContainer(({ restaurants }) => {
        return (
            <div>
                { restaurants.map((item, i) =>
                    <this.Restaurant key={ i } item={ item } index={ i } />
                )}
            </div>
        );
    });

    Documents = SortableContainer(({ documents }) => {
        return (
            <div>
                { documents.map((item, i) =>
                    <this.Document key={ i } item={ item } index={ i } />
                )}
            </div>
        );
    });

    delete = async () => {
        await axios.delete(`/api/packages/${ this.state.item.id }`).then(() => {
            toast.success('Deleted!');

            this.props.history.push('/app/packages');
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');
        });
    };
    
    onItemSelectHandler = (section, i) => {
        return (selected) => {
            let prep = this.state.item;

            prep[section][i].name = this.state.items[selected.value].name;

            prep[section][i].description.long = this.state.items[selected.value].long_description;

            prep[section][i].description.short = this.state.items[selected.value].short_description;

            this.setState({
                item: prep,
            });
        };
    };
    
    onrestaurantsItemSelectHandler = (section, i) => {
        return (selected) => {
            let prep = this.state.item;

            prep[section][i].name = this.state.items[selected.value].name;

            if (this.state.items[selected.value].long_description) {
                prep[section][i].description = this.state.items[selected.value].long_description;
            } else {
                prep[section][i].description = this.state.items[selected.value].short_description;
            };

            this.setState({
                item: prep,
            });
        };
    };
    
    onItemCategorySelectHandler = (section) => {
        return (selected) => {
            let prep = this.state.activeItemCategory;

            prep[section] = selected.value;

            this.setState({
                activeItemCategory: prep,
            });
        };
    };
    
    onOpenItemHandler = (section, i) => {
        return () => {
            let prep = this.state.active;

            prep[section] = i;
    
            this.setState({
                active: prep,
            });
        };
    };

    onRestaurantPhoneChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            prep.restaurants[i][name] = value;

            this.setState({
                address: this.state.address,
                events: this.state.events,
                interests: this.state.interests,
                item: prep,
            });
        };
    };
    
    onPassengerDateChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            if (value._isAMomentObject) {
                prep.passengers[i][name] = value.format("DD/MM/YYYY");
            } else {
                prep.passengers[i][name] = value;
            };
    
            this.setState({
                address: this.state.address,
                events: this.state.events,
                interests: this.state.interests,
                item: prep,
            });
        };
    };
    
    onTransferDateChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            if (value._isAMomentObject) {
                prep.transfers[i][name] = value.format("DD/MM/YYYY");
            } else {
                prep.transfers[i][name] = value;
            };
    
            this.setState({
                address: this.state.address,
                events: this.state.events,
                interests: this.state.interests,
                item: prep,
            });
        };
    };
    
    onTransferTimeChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            if (value._isAMomentObject) {
                prep.transfers[i][name] = value.format("HH:mm");
            } else {
                prep.transfers[i][name] = value;
            };
    
            this.setState({
                address: this.state.address,
                events: this.state.events,
                interests: this.state.interests,
                item: prep,
            });
        };
    };
    
    onItemDateChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            if (value._isAMomentObject) {
                prep.itinerary[i][name] = value.format("DD/MM/YYYY");
            } else {
                prep.itinerary[i][name] = value;
            };
    
            this.setState({
                address: this.state.address,
                events: this.state.events,
                interests: this.state.interests,
                item: prep,
            });
        };
    };
    
    onItemTimeChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            if (value._isAMomentObject) {
                prep.itinerary[i][name] = value.format("HH:mm");
            } else {
                prep.itinerary[i][name] = value;
            };
    
            this.setState({
                address: this.state.address,
                events: this.state.events,
                interests: this.state.interests,
                item: prep,
            });
        };
    };
    
    onFlightDateChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            if (value._isAMomentObject) {
                set(prep.flights[i], name, value.format("DD/MM/YYYY"));
            } else {
                set(prep.flights[i], name, value);
            };
    
            this.setState({
                address: this.state.address,
                events: this.state.events,
                interests: this.state.interests,
                item: prep,
            });
        };
    };
    
    onFlightTimeChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            if (value._isAMomentObject) {
                set(prep.flights[i], name, value.format("HH:mm"));
            } else {
                set(prep.flights[i], name, value);
            };
    
            this.setState({
                address: this.state.address,
                events: this.state.events,
                interests: this.state.interests,
                item: prep,
            });
        };
    };
    
    onCarHireDateChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            if (value._isAMomentObject) {
                set(prep.car_hire[i], name, value.format("DD/MM/YYYY"));
            } else {
                set(prep.car_hire[i], name, value);
            };
    
            this.setState({
                address: this.state.address,
                events: this.state.events,
                interests: this.state.interests,
                item: prep,
            });
        };
    };
    
    onCarHireTimeChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            if (value._isAMomentObject) {
                set(prep.car_hire[i], name, value.format("HH:mm"));
            } else {
                set(prep.car_hire[i], name, value);
            };
    
            this.setState({
                address: this.state.address,
                events: this.state.events,
                interests: this.state.interests,
                item: prep,
            });
        };
    };
    
    onChangeHandler = (element) => {
        let prep = this.state.item;

        set(prep, element.target.name, element.target.value);

        this.setState({
            clients: this.state.clients,
            events: this.state.events,
            item: prep,
            items: this.state.items,
        });
    };
    
    onNoteChangeHandler = (element, i) => {
        let prep = this.state.item;

        prep.notes[i][element.target.name] = element.target.value;

        this.setState({
            clients: this.state.clients,
            events: this.state.events,
            item: prep,
            items: this.state.items,
        });
    };
    
    onItemChangeHandler = (element, i) => {
        let prep = this.state.item;

        prep.itinerary[i][element.target.name] = element.target.value;

        this.setState({
            clients: this.state.clients,
            events: this.state.events,
            item: prep,
            items: this.state.items,
        });
    };
    
    onFlightChangeHandler = (element, i) => {
        let prep = this.state.item;

        prep.flights[i][element.target.name] = element.target.value;

        this.setState({
            clients: this.state.clients,
            events: this.state.events,
            item: prep,
            items: this.state.items,
        });
    };
    
    onCarHireChangeHandler = (element, i) => {
        let prep = this.state.item;

        set(prep.car_hire[i], element.target.name, element.target.value);

        this.setState({
            clients: this.state.clients,
            events: this.state.events,
            item: prep,
            items: this.state.items,
        });
    };
    
    onPassengerChangeHandler = (element, i) => {
        let prep = this.state.item;

        set(prep.passengers[i], element.target.name, element.target.value);

        this.setState({
            clients: this.state.clients,
            events: this.state.events,
            item: prep,
            items: this.state.items,
        });
    };
    
    onTransferChangeHandler = (element, i) => {
        let prep = this.state.item;

        prep.transfers[i][element.target.name] = element.target.value;

        this.setState({
            clients: this.state.clients,
            events: this.state.events,
            item: prep,
            items: this.state.items,
        });
    };
    
    onRestaurantChangeHandler = (element, i) => {
        let prep = this.state.item;

        set(prep.restaurants[i], element.target.name, element.target.value);

        this.setState({
            clients: this.state.clients,
            events: this.state.events,
            item: prep,
            items: this.state.items,
        });
    };
    
    onDocumentChangeHandler = (element, i) => {
        let prep = this.state.item;

        prep.documents[i][element.target.name] = element.target.value;

        this.setState({
            clients: this.state.clients,
            events: this.state.events,
            item: prep,
            items: this.state.items,
        });
    };

    onNoteEditorChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            prep.notes[i][name] = value;

            this.setState({
                clients: this.state.clients,
                events: this.state.events,
                item: prep,
                items: this.state.items,
            });
        };
    };

    onTransferEditorChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            set(prep.transfers[i], name, value)

            this.setState({
                clients: this.state.clients,
                events: this.state.events,
                item: prep,
                items: this.state.items,
            });
        };
    };

    onItemEditorChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            set(prep.itinerary[i], name, value)

            this.setState({
                clients: this.state.clients,
                events: this.state.events,
                item: prep,
                items: this.state.items,
            });
        };
    };

    onCarHireEditorChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            set(prep.car_hire[i], name, value)

            this.setState({
                clients: this.state.clients,
                events: this.state.events,
                item: prep,
                items: this.state.items,
            });
        };
    };

    onRestaurantEditorChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            set(prep.restaurants[i], name, value)

            this.setState({
                clients: this.state.clients,
                events: this.state.events,
                item: prep,
                items: this.state.items,
            });
        };
    };

    onItemEditorChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            prep.itinerary[i][name] = value;

            this.setState({
                clients: this.state.clients,
                events: this.state.events,
                item: prep,
                items: this.state.items,
            });
        };
    };

    onCarHireEditorChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            prep.car_hire[i][name] = value;

            this.setState({
                clients: this.state.clients,
                events: this.state.events,
                item: prep,
                items: this.state.items,
            });
        };
    };

    onTransferEditorChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            prep.transfers[i][name] = value;

            this.setState({
                clients: this.state.clients,
                events: this.state.events,
                item: prep,
                items: this.state.items,
            });
        };
    };

    onRestaurantEditorChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            prep.notes[i][name] = value;

            this.setState({
                clients: this.state.clients,
                events: this.state.events,
                item: prep,
                items: this.state.items,
            });
        };
    };

    onNotesSortEnd = ({ oldIndex, newIndex }) => {
        let prep = this.state.item;

        move.mutate(prep.notes, oldIndex, newIndex);

        this.setState({
            clients: this.state.clients,
            events: this.state.events,
            item: prep,
            items: this.state.items,
        });
    };

    onItinerarySortEnd = ({ oldIndex, newIndex }) => {
        let prep = this.state.item;

        move.mutate(prep.itinerary, oldIndex, newIndex);

        this.setState({
            clients: this.state.clients,
            events: this.state.events,
            item: prep,
            items: this.state.items,
        });
    };

    onFlightsSortEnd = ({ oldIndex, newIndex }) => {
        let prep = this.state.item;

        move.mutate(prep.flights, oldIndex, newIndex);

        this.setState({
            clients: this.state.clients,
            events: this.state.events,
            item: prep,
            items: this.state.items,
        });
    };

    onCarHiresSortEnd = ({ oldIndex, newIndex }) => {
        let prep = this.state.item;

        move.mutate(prep.car_hire, oldIndex, newIndex);

        this.setState({
            clients: this.state.clients,
            events: this.state.events,
            item: prep,
            items: this.state.items,
        });
    };

    onPassengersSortEnd = ({ oldIndex, newIndex }) => {
        let prep = this.state.item;

        move.mutate(prep.passengers, oldIndex, newIndex);

        this.setState({
            clients: this.state.clients,
            events: this.state.events,
            item: prep,
            items: this.state.items,
        });
    };

    onTransfersSortEnd = ({ oldIndex, newIndex }) => {
        let prep = this.state.item;

        move.mutate(prep.transfers, oldIndex, newIndex);

        this.setState({
            clients: this.state.clients,
            events: this.state.events,
            item: prep,
            items: this.state.items,
        });
    };

    onRestaurantsSortEnd = ({ oldIndex, newIndex }) => {
        let prep = this.state.item;

        move.mutate(prep.restaurants, oldIndex, newIndex);

        this.setState({
            clients: this.state.clients,
            events: this.state.events,
            item: prep,
            items: this.state.items,
        });
    };

    onDocumentsSortEnd = ({ oldIndex, newIndex }) => {
        let prep = this.state.item;

        move.mutate(prep.documents, oldIndex, newIndex);

        this.setState({
            clients: this.state.clients,
            events: this.state.events,
            item: prep,
            items: this.state.items,
        });
    };

    onDeleteNote (i, component) {
        return () => {
            let prep = component.state.item;

            prep.notes.splice(i, 1);

            component.setState({
                clients: component.state.clients,
                events: component.state.events,
                item: prep,
                items: component.state.items,
            });
        };
    };

    onDeleteItem (i, component) {
        return () => {
            let prep = component.state.item;

            prep.itinerary.splice(i, 1);

            component.setState({
                clients: component.state.clients,
                events: component.state.events,
                item: prep,
                items: component.state.items,
            });
        };
    };

    onDeleteFlight (i, component) {
        return () => {
            let prep = component.state.item;

            prep.flights.splice(i, 1);

            component.setState({
                clients: component.state.clients,
                events: component.state.events,
                item: prep,
                items: component.state.items,
            });
        };
    };

    onDeleteCarHire (i, component) {
        return () => {
            let prep = component.state.item;

            prep.car_hire.splice(i, 1);

            component.setState({
                clients: component.state.clients,
                events: component.state.events,
                item: prep,
                items: component.state.items,
            });
        };
    };

    onDeletePassenger (i, component) {
        return () => {
            let prep = component.state.item;

            prep.passengers.splice(i, 1);

            component.setState({
                clients: component.state.clients,
                events: component.state.events,
                item: prep,
                items: component.state.items,
            });
        };
    };

    onDeleteTransfer (i, component) {
        return () => {
            let prep = component.state.item;

            prep.transfers.splice(i, 1);

            component.setState({
                clients: component.state.clients,
                events: component.state.events,
                item: prep,
                items: component.state.items,
            });
        };
    };

    onDeleteRestaurant (i, component) {
        return () => {
            let prep = component.state.item;

            prep.restaurants.splice(i, 1);

            component.setState({
                clients: component.state.clients,
                events: component.state.events,
                item: prep,
                items: component.state.items,
            });
        };
    };

    onDeleteDocument (i, component) {
        return () => {
            let prep = component.state.item;

            prep.documents.splice(i, 1);

            component.setState({
                clients: component.state.clients,
                events: component.state.events,
                item: prep,
                items: component.state.items,
            });
        };
    };

    onCustomisationBannerChangeHandler = (result) => {
        let prep = this.state.item;

        prep.customisation.banner = result.filesUploaded[0].url;

        this.setState({
            clients: this.state.clients,
            events: this.state.events,
            item: prep,
            items: this.state.items,
        });
    };

    onDocumentAttachmentChangeHandler = (i) => {
        return (result) => {
            let prep = this.state.item;

            prep.documents[i].url = result.filesUploaded[0].url;

            this.setState({
                clients: this.state.clients,
                events: this.state.events,
                item: prep,
                items: this.state.items,
            });
        };
    };

    onRestaurantLogoChangeHandler = (i) => {
        return (result) => {
            let prep = this.state.item;

            prep.restaurants[i].logo = result.filesUploaded[0].url;

            this.setState({
                clients: this.state.clients,
                events: this.state.events,
                item: prep,
                items: this.state.items,
            });
        };
    };

    onNewNote (component) {
        return () => {
            let prep = component.state.item;

            prep.notes.push({
                title: '',
                content: '',
                visibility: false,
            });

            component.setState({
                clients: component.state.clients,
                events: component.state.events,
                item: prep,
                items: component.state.items,
            });
        };
    };

    onNewDocument (component) {
        return () => {
            let prep = component.state.item;

            prep.documents.push({
                title: '',
                url: '',
            });

            component.setState({
                clients: component.state.clients,
                events: component.state.events,
                item: prep,
                items: component.state.items,
            });
        };
    };

    onNewItem (component) {
        return () => {
            let prep = component.state.item;

            prep.itinerary.push({
                date: '',
                description: {
                    long: '',
                    short: '',
                },
                name: '',
                time: '',
            });

            component.setState({
                active: {
                    itinerary: component.state.item.itinerary.length - 1,
                    flights: component.state.active.flights,
                    carHire: component.state.active.carHire,
                    transfers: component.state.active.transfers,
                    restaurants: component.state.active.restaurants,
                },
                clients: component.state.clients,
                events: component.state.events,
                item: prep,
                items: component.state.items,
            });
        };
    };

    onNewFlight (component) {
        return () => {
            let prep = component.state.item;

            prep.flights.push({
                airline: '',
                arrival: {
                    airport: '',
                    date: '',
                    time: '',
                },
                class: '',
                departure: {
                    airport: '',
                    date: '',
                    time: '',
                },
                duration: '',
                locator: '',
                number: '',
            });

            component.setState({
                active: {
                    itinerary: component.state.active.itinerary,
                    flights: component.state.item.flights.length - 1,
                    carHire: component.state.active.carHire,
                    transfers: component.state.active.transfers,
                    restaurants: component.state.active.restaurants,
                },
                clients: component.state.clients,
                events: component.state.events,
                item: prep,
                items: component.state.items,
            });
        };
    };

    onNewCarHire (component) {
        return () => {
            let prep = component.state.item;

            prep.car_hire.push({
                car: '',
                confirmationNumber: '',
                description: '',
                dropoff: {
                    date: '',
                    location: '',
                    time: '',
                },
                pickup: {
                    date: '',
                    location: '',
                    time: '',
                },
                provider: '',
            });

            component.setState({
                active: {
                    itinerary: component.state.active.itinerary,
                    flights: component.state.active.flights,
                    carHire: component.state.item.car_hire.length -1,
                    transfers: component.state.active.transfers,
                    restaurants: component.state.active.restaurants,
                },
                clients: component.state.clients,
                events: component.state.events,
                item: prep,
                items: component.state.items,
            });
        };
    };

    onNewPassenger (component) {
        return () => {
            let prep = component.state.item;

            prep.passengers.push({
                names: {
                    first: '',
                    last: '',
                },
                birth: '',
            });

            component.setState({
                clients: component.state.clients,
                events: component.state.events,
                item: prep,
                items: component.state.items,
            });
        };
    };

    onNewTransfer (component) {
        return () => {
            let prep = component.state.item;

            prep.transfers.push({
                date: '',
                description: {
                    long: '',
                    short: '',
                },
                name: '',
                time: '',
            });

            component.setState({
                active: {
                    itinerary: component.state.active.itinerary,
                    flights: component.state.active.flights,
                    carHire: component.state.active.carHire,
                    transfers: component.state.item.transfers.length - 1,
                    restaurants: component.state.active.restaurants,
                },
                clients: component.state.clients,
                events: component.state.events,
                item: prep,
                items: component.state.items,
            });
        };
    };

    onNewRestaurant (component) {
        return () => {
            let prep = component.state.item;

            prep.restaurants.push({
                address: {
                    line1: '',
                    line2: '',
                    line3: '',
                    city: '',
                    county: '',
                    postcode: '',
                    country: '',
                },
                description: '',
                links: {
                    map: '',
                    reservation: '',
                },
                logo: '',
                name: '',
                phone: '',
            });

            component.setState({
                active: {
                    itinerary: component.state.active.itinerary,
                    flights: component.state.active.flights,
                    carHire: component.state.active.carHire,
                    transfers: component.state.active.transfers,
                    restaurants: component.state.item.restaurants.length - 1,
                },
                clients: component.state.clients,
                events: component.state.events,
                item: prep,
                items: component.state.items,
            });
        };
    };
    
    onSelectChangeHandler = (valueName, labelName = null) => {
        return (selected) => {
            let prep = this.state.item;

            set(prep, valueName, selected.value)

            if (labelName) {
                set(prep, labelName, selected.label);
            };

            this.setState({
                clients: this.state.clients,
                events: this.state.events,
                item: prep,
                items: this.state.items,
            });
        };
    };
    
    onFlightSelectChangeHandler = (index) => {
        return (valueName, labelName = null) => {
            return (selected) => {
                let prep = this.state.item;
    
                set(prep.flights[index], valueName, selected.value)
    
                if (labelName) {
                    set(prep.flights[index], labelName, selected.label);
                };
    
                this.setState({
                    clients: this.state.clients,
                    events: this.state.events,
                    item: prep,
                    items: this.state.items,
                });
            };
        };
    };
    
    onNoteSelectChangeHandler = (index) => {
        return (valueName, labelName = null) => {
            return (selected) => {
                let prep = this.state.item;
    
                set(prep.notes[index], valueName, selected.value)
    
                if (labelName) {
                    set(prep.notes[index], labelName, selected.label);
                };
    
                this.setState({
                    clients: this.state.clients,
                    events: this.state.events,
                    item: prep,
                    items: this.state.items,
                });
            };
        };
    };
    
    onCarHireSelectChangeHandler = (index) => {
        return (valueName, labelName = null) => {
            return (selected) => {
                let prep = this.state.item;
    
                set(prep.car_hire[index], valueName, selected.value)
    
                if (labelName) {
                    set(prep.car_hire[index], labelName, selected.label);
                };
    
                this.setState({
                    clients: this.state.clients,
                    events: this.state.events,
                    item: prep,
                    items: this.state.items,
                });
            };
        };
    };

    onEditorChangeHandler = (name) => {
        return (value) => {
            let prep = this.state.item;

            set(prep, name, value)

            this.setState({
                categories: this.state.categories,
                events: this.state.events,
                item: prep,
            });
        };
    };

    pickCustomisationBanner = () => {
        filestack.init(document.head.querySelector('meta[name="filestack-key"]').content).picker({
            onUploadDone: this.onCustomisationBannerChangeHandler,
            maxSize: 10 * 1024 * 1024,
            accept: 'image/*',
            uploadInBackground: false,
        }).open();
    };

    pickDocumentAttachment = (i) => {
        return () => {
            filestack.init(document.head.querySelector('meta[name="filestack-key"]').content).picker({
                onUploadDone: this.onDocumentAttachmentChangeHandler(i),
                uploadInBackground: false,
            }).open();
        };
    };

    pickRestaurantLogo = (i) => {
        return () => {
            filestack.init(document.head.querySelector('meta[name="filestack-key"]').content).picker({
                onUploadDone: this.onRestaurantLogoChangeHandler(i),
                maxSize: 10 * 1024 * 1024,
                accept: 'image/*',
                uploadInBackground: false,
            }).open();
        };
    };

    save = async () => {
        await axios.patch(`/api/packages/${ this.state.item.id }`, format(this.state.item, schema), {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            toast.success('Saved!');
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');
        });
    };

    render () {
        return (
            <div className='main-content-container container-fluid px-4'>
                <div className='page-header row no-gutters py-4'>
                    <div className='col-7 mb-0'>
                        <h3 className='page-title'>{ this.state.item.title }</h3>
                    </div>

                    <div className='col-5 text-right mb-0'>
                        <Link to={ `/app/packages/${ this.state.item.id + location.hash }` } className='btn btn-primary'>View</Link>
                        <a href={ `/portal/clients/${ this.state.item.client_id }/${ this.state.item.client_email }/packages/${ this.state.item.id }` } className='btn btn-primary ml-1'>View as Client</a>
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
                                                <label htmlFor='title'>Title</label>
                                                <input name='title' value={ this.state.item.title } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='title' />
                                            </div>

                                            <div className='form-row'>
                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='client'>Client</label>
                                                    <Select name='client_id' value={ { value: this.state.item.client_id, label: this.state.item.client_name } } options={ this.state.clients } onChange={ this.onSelectChangeHandler('client_id', 'client_name') } className='form-control p-0' id='client_id' />
                                                </div>

                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='event'>Event</label>
                                                    <Select name='event_id' value={ { value: this.state.item.event_id, label: this.state.item.event_name } } options={ this.state.events } onChange={ this.onSelectChangeHandler('event_id', 'event_name') } className='form-control p-0' id='event_id' />
                                                </div>
                                            </div>

                                            <div className='form-row'>
                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='issued'>Issued</label>
                                                    <input name='issued' value={ this.state.item.issued } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control date' id='issued' />
                                                </div>

                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='expires'>Expires</label>
                                                    <input name='expires' value={ this.state.item.expires } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control date' id='expires' />
                                                </div>
                                            </div>

                                            <div className='form-row'>
                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='status'>Status</label>
                                                    <Select name='status' value={ { value: this.state.item.status, label: this.state.item.status } } options={ [
                                                        { label: 'Accepted', value: 'Accepted' },
                                                        { label: 'Open', value: 'Open' },
                                                        { label: 'Declined', value: 'Declined' },
                                                    ] } onChange={ this.onSelectChangeHandler('status') } className='form-control p-0' id='status' />
                                                </div>

                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='lead_status'>Lead Status</label>
                                                    <Select name='lead_status' value={ { value: this.state.item.lead_status, label: this.state.item.lead_status } } options={ [
                                                        { label: 'Hot', value: 'Hot' },
                                                        { label: 'Cold', value: 'Cold' },
                                                    ] } onChange={ this.onSelectChangeHandler('lead_status') } className='form-control p-0' id='lead_status' />
                                                </div>
                                            </div>

                                            <div className='form-row'>
                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='accepted_at'>Accepted At</label>
                                                    <input name='accepted_at' value={ this.state.item.accepted_at } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control date' id='accepted_at' />
                                                </div>

                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='accepted_by'>Accepted By</label>
                                                    <input name='accepted_by' value={ this.state.item.accepted_by } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='accepted_by' />
                                                </div>
                                            </div>

                                            <div className='form-row'>
                                                <div className='form-group col-md-4'>
                                                    <label htmlFor='pricing.total'>Per Person</label>
                                                    <input name='pricing.person' value={ this.state.item.pricing.person } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='pricing-person' />
                                                </div>

                                                <div className='form-group col-md-4'>
                                                    <label htmlFor='pricing.total'>Total</label>
                                                    <input name='pricing.total' value={ this.state.item.pricing.total } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='pricing-total' />
                                                </div>

                                                <div className='form-group col-md-4'>
                                                    <label htmlFor='pricing.vat'>VAT Rate</label>
                                                    <input name='pricing.vat' value={ this.state.item.pricing.vat } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='pricing-vat' />
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    { location.hash == '#itinerary' &&
                                        <ul className='list-group list-group-flush'>
                                            <h4 className='page-title'>Itinerary</h4>

                                            <li className='list-group-item p-3'>
                                                <div>
                                                    <this.Itinerary itinerary={ this.state.item.itinerary } onSortEnd={ this.onItinerarySortEnd } lockAxis='y' pressDelay={ 200 } />

                                                    <div>
                                                        <span onClick={ this.onNewItem(this) } className='btn btn-block btn-new-item p-3'>New Item</span>
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
                                                    <this.Flights flights={ this.state.item.flights } onSortEnd={ this.onFlightsSortEnd } lockAxis='y' pressDelay={ 200 } />

                                                    <div>
                                                        <span onClick={ this.onNewFlight(this) } className='btn btn-block btn-new-item p-3'>New Flight</span>
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
                                                    <this.CarHire carHire={ this.state.item.car_hire } onSortEnd={ this.onCarHireSortEnd } lockAxis='y' pressDelay={ 200 } />

                                                    <div>
                                                        <span onClick={ this.onNewCarHire(this) } className='btn btn-block btn-new-item p-3'>New Car Hire</span>
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
                                                    <this.Passengers passengers={ this.state.item.passengers } onSortEnd={ this.onPassengersSortEnd } lockAxis='y' pressDelay={ 200 } />

                                                    <div>
                                                        <span onClick={ this.onNewPassenger(this) } className='btn btn-block btn-new-item p-3'>New Passenger</span>
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
                                                    <this.Transfers transfers={ this.state.item.transfers } onSortEnd={ this.onTransfersSortEnd } lockAxis='y' pressDelay={ 200 } />

                                                    <div>
                                                        <span onClick={ this.onNewTransfer(this) } className='btn btn-block btn-new-item p-3'>New Transfer</span>
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
                                                    <this.Restaurants restaurants={ this.state.item.restaurants } onSortEnd={ this.onRestaurantsSortEnd } lockAxis='y' pressDelay={ 200 } />

                                                    <div>
                                                        <span onClick={ this.onNewRestaurant(this) } className='btn btn-block btn-new-item p-3'>New Restaurant</span>
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
                                                    <this.Documents documents={ this.state.item.documents } onSortEnd={ this.onDocumentsSortEnd } lockAxis='y' pressDelay={ 200 } />

                                                    <div>
                                                        <span onClick={ this.onNewDocument(this) } className='btn btn-block btn-new-item p-3'>New Document</span>
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
                                                        <div className='my-2'>
                                                            <span onClick={ this.pickCustomisationBanner } className='btn btn-primary'>Upload</span>
                                                        </div>

                                                        { this.state.item.customisation.banner &&
                                                            <img src={ this.state.item.customisation.banner } id='customisation-banner' className='text-center mx-auto h-100 px-4 pb-4 d-block' />
                                                        }
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor='customisation-description'>Description</label>
                                                        <Editor
                                                            apiKey={ document.head.querySelector('meta[name="tinymce-key"]').content }
                                                            textareaName='customisation.description'
                                                            value={ this.state.item.customisation.description }
                                                            onEditorChange={ this.onEditorChangeHandler('customisation.description') }
                                                            plugins='print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help code'
                                                            toolbar='formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
                                                            init={ {
                                                                height: 200,
                                                            } }
                                                        />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor='customisation-welcome'>Welcome</label>
                                                        <Editor
                                                            apiKey={ document.head.querySelector('meta[name="tinymce-key"]').content }
                                                            textareaName='customisation.welcome'
                                                            value={ this.state.item.customisation.welcome }
                                                            onEditorChange={ this.onEditorChangeHandler('customisation.welcome') }
                                                            plugins='print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help code'
                                                            toolbar='formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
                                                            init={ {
                                                                height: 200,
                                                            } }
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    }

                                    { location.hash == '#requirements' &&
                                        <ul className='list-group list-group-flush'>
                                            <h4 className='page-title'>Requirements</h4>

                                            <li className='list-group-item p-3'>
                                                <div>
                                                    <div className='form-group'>
                                                        <label htmlFor='requirements-dietary'>Dietary</label>
                                                        <Editor
                                                            apiKey={ document.head.querySelector('meta[name="tinymce-key"]').content }
                                                            textareaName='requirements.dietary'
                                                            value={ this.state.item.requirements.dietary }
                                                            onEditorChange={ this.onEditorChangeHandler('requirements.dietary') }
                                                            plugins='print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help code'
                                                            toolbar='formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
                                                            init={ {
                                                                height: 200,
                                                            } }
                                                        />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor='requirements-other'>Other</label>
                                                        <Editor
                                                            apiKey={ document.head.querySelector('meta[name="tinymce-key"]').content }
                                                            textareaName='requirements.other'
                                                            value={ this.state.item.requirements.other }
                                                            onEditorChange={ this.onEditorChangeHandler('requirements.other') }
                                                            plugins='print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help code'
                                                            toolbar='formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
                                                            init={ {
                                                                height: 200,
                                                            } }
                                                        />
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
                                                    <this.Notes notes={ this.state.item.notes } onSortEnd={ this.onNotesSortEnd } lockAxis='y' pressDelay={ 200 } />

                                                    <div>
                                                        <span onClick={ this.onNewNote(this) } className='btn btn-block btn-new-item p-3'>New Note</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    }

                                    <span onClick={ this.save } className='btn btn-primary mr-2'>Save</span>
                                    <span onClick={ this.delete } className='btn btn-danger'>Delete</span>
                                </form>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    };
};

export default Edit;