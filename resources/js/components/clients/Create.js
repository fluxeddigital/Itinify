import move from 'array-move';
import axios from 'axios';
import * as filestack from 'filestack-js';
import React, { Component } from 'react';
import Datetime from 'react-datetime'
import PlacesAutocomplete from 'react-places-autocomplete';
import Select from 'react-select'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { toast } from 'react-toastify';
import set from 'lodash.set';

class Create extends Component {
    constructor (props) {
        super(props);

        this.state = {
            address: '',
            events: [],
            item: {
                name: '',
                address: {
                    line1: '',
                    line2: '',
                    line3: '',
                    city: '',
                    county: '',
                    postcode: '',
                    country: '',
                },
                contacts: [{
                    birth: '',
                    email: '',
                    mobile: '',
                    name: '',
                    phone: '',
                }],
                email: '',
                interests: [],
                logo: '',
                phone: '',
                status: '',
            },
        };
    };

    componentDidMount () {
        axios.get('/api/events').then(res => {
            let events = res.data.data;

            for (let i in events) {
                events[i] = {
                    label: events[i].name,
                    value: events[i].id,
                };
            };

            this.setState({
                address: this.state.address,
                events: events,
                item: this.state.item,
            });
        });
    };

    Contact = SortableElement(({ item, index }) => {
        return (
            <div className='bg-white border rounded p-3 mb-3'>
                <div className='form-row'>
                    <div className='form-group col-md-6'>
                        <label htmlFor={ `contact-name-${ index }` }>Name</label>
                        <input name='name' value={ item.name } onChange={ e => this.onContactChangeHandler(e, index) } type='text' className='form-control' id={ `contact-name-${ index }` } />
                    </div>
    
                    <div className='form-group col-md-6'>
                        <label htmlFor={ `contact-email-${ index }` }>Email</label>
                        <input name='email' value={ item.email } onChange={ e => this.onContactChangeHandler(e, index) } type='text' className='form-control' id={ `contact-email-${ index }` } />
                    </div>
                </div>
    
                <div className='form-row'>
                    <div className='form-group col-md-6'>
                        <label htmlFor={ `contact-mobile-${ index }` }>Mobile</label>
                        <input name='mobile' value={ item.mobile } onChange={ e => this.onContactChangeHandler(e, index) } type='text' className='form-control' id={ `contact-mobile-${ index }` } />
                    </div>
    
                    <div className='form-group col-md-6'>
                        <label htmlFor={ `contact-phone-${ index }` }>Phone</label>
                        <input name='phone' value={ item.phone } onChange={ e => this.onContactChangeHandler(e, index) } type='text' className='form-control' id={ `contact-phone-${ index }` } />
                    </div>
                </div>
    
                <div className='form-group'>
                    <label htmlFor={ `contact-birth-${ index }` }>Date of Birth</label>
                    <Datetime name='birth' value={ item.birth } onChange={ this.onContactDateChangeHandler('birth', index) } dateFormat='DD/MM/YYYY' timeFormat={ false } id={ `contact-birth-${ index }` } />
                </div>

                <div>
                    <span onClick={ this.onDeleteContact(index, this) } className='btn btn-danger'>Delete</span>
                </div>
            </div>
        );
    });

    Contacts = SortableContainer(({ contacts }) => {
        return (
            <div>
                { contacts.map((item, i) =>
                    <this.Contact key={ i } item={ item } index={ i } />
                )}
            </div>
        );
    });
    
    onAddressChangeHandler = (value) => {
        this.setState({
            address: value,
            events: this.state.events,
            item: this.state.item,
        });
    };
    
    onChangeHandler = (element) => {
        let prep = this.state.item;

        set(prep, element.target.name, element.target.value);

        this.setState({
            address: this.state.address,
            events: this.state.events,
            item: prep,
        });
    };
    
    onContactChangeHandler = (element, i) => {
        let prep = this.state.item;

        prep.contacts[i][element.target.name] = element.target.value;

        this.setState({
            address: this.state.address,
            events: this.state.events,
            item: prep,
        });
    };
    
    onContactDateChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            if (value._isAMomentObject) {
                prep.contacts[i][name] = value.format("DD/MM/YYYY");
            } else {
                prep.contacts[i][name] = value;
            };
    
            this.setState({
                address: this.state.address,
                events: this.state.events,
                item: prep,
            });
        };
    };

    onContactsSortEnd = ({ oldIndex, newIndex }) => {
        let prep = this.state.item;

        move.mutate(prep.contacts, oldIndex, newIndex);

        this.setState({
            address: this.state.address,
            events: this.state.events,
            item: prep,
        });
    };

    onDeleteContact (i, component) {
        return () => {
            let prep = component.state.item;

            prep.contacts.splice(i, 1);

            component.setState({
                address: component.state.address,
                events: component.state.events,
                item: prep,
            });
        };
    };

    onLogoChangeHandler = (result) => {
        let prep = this.state.item;

        prep.logo = result.filesUploaded[0].url;

        this.setState({
            address: this.state.address,
            events: this.state.events,
            item: prep,
        });
    };
    
    onMultiSelectChangeHandler = (name) => {
        return (selected) => {
            let arr = [];

            for (let i in selected) {
                arr.push(selected[i].value);
            };

            let prep = this.state.item;

            set(prep, name, arr)

            this.setState({
                address: this.state.address,
                events: this.state.events,
                item: prep,
            });
        };
    };

    onNewContact (component) {
        return () => {
            let prep = component.state.item;

            prep.contacts.push({
                name: '',
                birth: '',
                email: '',
                mobile: '',
                phone: '',
            });

            component.setState({
                address: component.state.address,
                events: component.state.events,
                item: prep,
            });
        };
    };

    onSelectAddressHandler (component) {
        return (address, placeId) => {
            new google.maps.places.PlacesService(new google.maps.Map(
                document.getElementById('map'))
            ).getDetails({
                placeId: placeId,
                fields: ['address_components']
            }, function(place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    let prep = component.state.item;

                    let address = {};

                    for (let i in place.address_components) {
                        address[place.address_components[i].types[0]] = place.address_components[i].long_name;
                    };

                    if (address.street_number) {
                        prep.address.line1 = `${ address.street_number } ${ address.route }`;
                    } else {
                        prep.address.line1 = address.route;
                    };
                    
                    prep.address.city = address.postal_town || address.locality;
                    prep.address.county = address.administrative_area_level_2;
                    prep.address.postcode = address.postal_code;
                    prep.address.country = address.country;

                    component.setState({
                        address: component.state.address,
                        events: component.state.events,
                        item: prep,
                    });
                };
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
                address: this.state.address,
                events: this.state.events,
                interests: this.state.interests,
                item: prep,
            });
        };
    };

    pickLogo = () => {
        filestack.init(document.head.querySelector('meta[name="filestack-key"]').content).picker({
            onUploadDone: this.onLogoChangeHandler,
            maxSize: 10 * 1024 * 1024,
            accept: 'image/*',
            uploadInBackground: false,
        }).open();
    };

    create = async () => {
        await axios.post(`/api/clients`, this.state.item, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            toast.success('Created!');

            this.props.history.push(`/app/clients/${ res.data.data.id }`);
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
                    <div className='mb-0'>
                        <h3 className='page-title'>Create Client</h3>
                    </div>
                </div>

                <ul className='list-group list-group-flush mb-4'>
                    <li className='list-group-item p-3'>
                        <div className='row'>
                            <div className='col'>
                                <form>
                                    { location.hash != '#contacts' && location.hash != '#notes' &&
                                        <div>
                                            <div className='form-group'>
                                                <label htmlFor='name'>Name</label>
                                                <input name='name' value={ this.state.item.name } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='name' />
                                            </div>

                                            <div className='form-row'>
                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='email'>Email</label>
                                                    <input name='email' value={ this.state.item.email } onChange={ e => this.onChangeHandler(e) } type='email' className='form-control' id='email' />
                                                </div>

                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='phone'>Phone</label>
                                                    <input name='phone' value={ this.state.item.phone } onChange={ e => this.onChangeHandler(e) } type='tel' className='form-control' id='phone' />
                                                </div>
                                            </div>

                                            <div className='form-row'>
                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='status'>Status</label>
                                                    <Select name='status' value={ { value: this.state.item.status, label: this.state.item.status } } options={ [
                                                        { label: 'Hot', value: 'Hot' },
                                                        { label: 'Cold', value: 'Cold' },
                                                    ] } onChange={ this.onSelectChangeHandler('status') } className='form-control p-0' id='status' />
                                                </div>

                                                { this.state.events &&
                                                    <div className='form-group col-md-6'>
                                                        <label htmlFor='interests'>Interests</label>
                                                        <div id='interests'>
                                                            <Select
                                                                name='interests'
                                                                options={ this.state.events }
                                                                onChange={ this.onMultiSelectChangeHandler('interests') }
                                                                isMulti
                                                                className='form-control p-0' id='interests'
                                                            />
                                                        </div>
                                                    </div>
                                                }
                                            </div>

                                            <div className='form-group'>
                                                <label htmlFor='address'>Address</label>
                                                <div className='pl-3' id='address'>
                                                    <PlacesAutocomplete
                                                        value={ this.state.address }
                                                        onChange={ this.onAddressChangeHandler }
                                                        onSelect={ this.onSelectAddressHandler(this) }
                                                    >
                                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                            <div className='mb-3'>
                                                                <div className='form-group mb-0'>
                                                                    <label htmlFor='address'>Address Lookup</label>
                                                                    <input {...getInputProps({
                                                                        placeholder: 'Search Places...',
                                                                        className: `form-control rounded-0 rounded-top ${ loading || suggestions.length ? '' : 'rounded-bottom' }`,
                                                                    })} id='address' />
                                                                </div>
                                                                
                                                                <ul className='list-group'>
                                                                    {loading && <li className='list-group-item border rounded-0 disabled'>Loading...</li> }

                                                                    {suggestions.map(suggestion => {
                                                                        return (
                                                                            <li {...getSuggestionItemProps(suggestion)} className={ `list-group-item border rounded-0 cursor-pointer${ suggestion.active ? ' active' : '' }` }>
                                                                                { suggestion.description }
                                                                            </li>  
                                                                        );
                                                                    })}
                                                                </ul>

                                                                <span className='d-none' id='map'></span>
                                                            </div>
                                                        )}
                                                    </PlacesAutocomplete>

                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            <div className='form-group'>
                                                                <label htmlFor='line1'>Line 1</label>
                                                                <input name='address.line1' value={ this.state.item.address.line1 } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='line1' />
                                                            </div>

                                                            <div className='form-group'>
                                                                <label htmlFor='line2'>Line 2</label>
                                                                <input name='address.line2' value={ this.state.item.address.line2 } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='line2' />
                                                            </div>

                                                            <div className='form-group'>
                                                                <label htmlFor='line3'>Line 3</label>
                                                                <input name='address.line3' value={ this.state.item.address.line3 } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='line3' />
                                                            </div>
                                                        </div>

                                                        <div className='col-6'>
                                                            <div className='form-group'>
                                                                <label htmlFor='city'>City</label>
                                                                <input name='address.city' value={ this.state.item.address.city } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='city' />
                                                            </div>

                                                            <div className='form-group'>
                                                                <label htmlFor='county'>County</label>
                                                                <input name='address.county' value={ this.state.item.address.county } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='county' />
                                                            </div>

                                                            <div className='form-group'>
                                                                <label htmlFor='postcode'>Postcode</label>
                                                                <input name='address.postcode' value={ this.state.item.address.postcode } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='postcode' />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor='country'>Country</label>
                                                        <input name='address.country' value={ this.state.item.address.country } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='country' />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='form-group'>
                                                <label htmlFor='logo'>Logo</label>
                                                <div className='my-2'>
                                                    <span onClick={ this.pickLogo } className='btn btn-primary'>Upload</span>
                                                </div>

                                                { this.state.item.logo &&
                                                    <img src={ this.state.item.logo.startsWith('http') ? this.state.item.logo : `/${ this.state.item.logo }` } id='logo' className='text-center mx-auto h-100 px-4 pb-4 d-block' />
                                                }
                                            </div>
                                        </div>
                                    }

                                    { location.hash == '#contacts' &&
                                        <ul className='list-group list-group-flush mb-4'>
                                            <h4 className='page-title'>Contacts</h4>

                                            <li className='list-group-item p-3'>
                                                <div>
                                                    <this.Contacts contacts={ this.state.item.contacts } onSortEnd={ this.onContactsSortEnd } lockAxis='y' pressDelay='200' />

                                                    <div>
                                                        <span onClick={ this.onNewContact(this) } className='btn btn-primary'>New Contact</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    }

                                    <span onClick={ this.create } className='btn btn-primary mr-2'>Create</span>
                                </form>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    };
};

export default Create;