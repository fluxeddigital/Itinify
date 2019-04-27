import axios from 'axios';
import * as filestack from 'filestack-js';
import React, { Component } from 'react';
import PhoneInput from 'react-telephone-input';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Link } from 'react-router-dom';
import Select from 'react-select'
import {Elements, StripeProvider} from 'react-stripe-elements';
import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import set from 'lodash.set';

import StripeForm from './common/StripeForm';

import { buildState, format } from '../utils';

const schema = [
    {
        name: 'name',
        type: 'string',
    },
    {
        name: 'about',
        type: 'object',
        schema: [
            {
                name: 'description',
                type: 'string',
            },
            {
                name: 'social',
                type: 'object',
                schema: [
                    {
                        name: 'facebook',
                        type: 'string',
                    },
                    {
                        name: 'instagram',
                        type: 'string',
                    },
                    {
                        name: 'linkedin',
                        type: 'string',
                    },
                    {
                        name: 'twitter',
                        type: 'string',
                    },
                ],
            },
        ],
    },
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
        name: 'customisation',
        type: 'object',
        schema: [
            {
                name: 'css',
                type: 'string',
            },
            {
                name: 'tracking',
                type: 'string',
            }
        ],
    },
    {
        name: 'email',
        type: 'string',
    },
    {
        name: 'emails',
        type: 'object',
        schema: [
            {
                name: 'package',
                type: 'object',
                schema: [
                    {
                        name: 'subject',
                        type: 'string',
                    },
                    {
                        name: 'content',
                        type: 'string',
                    }
                ],
            },
            {
                name: 'packageAccepted',
                type: 'object',
                schema: [
                    {
                        name: 'subject',
                        type: 'string',
                    },
                    {
                        name: 'content',
                        type: 'string',
                    }
                ],
            },
            {
                name: 'packageDeclined',
                type: 'object',
                schema: [
                    {
                        name: 'subject',
                        type: 'string',
                    },
                    {
                        name: 'content',
                        type: 'string',
                    }
                ],
            },
            {
                name: 'welcome',
                type: 'object',
                schema: [
                    {
                        name: 'subject',
                        type: 'string',
                    },
                    {
                        name: 'content',
                        type: 'string',
                    }
                ],
            },
        ],
    },
    {
        name: 'feefo',
        type: 'object',
        schema: [
            {
                name: 'apiKey',
                type: 'string',
            },
            {
                name: 'merchantIdentifier',
                type: 'string',
            },
            {
                name: 'password',
                type: 'string',
            },
            {
                name: 'username',
                type: 'string',
            }
        ],
    },
    {
        name: 'industry',
        type: 'string',
    },
    {
        name: 'logo',
        type: 'string',
    },
    {
        name: 'mailchimp',
        type: 'object',
        schema: [
            {
                name: 'apiKey',
                type: 'string',
            }
        ],
    },
    {
        name: 'nexmo',
        type: 'object',
        schema: [
            {
                name: 'key',
                type: 'string',
            },
            {
                name: 'secret',
                type: 'string',
            },
            {
                name: 'smsFrom',
                type: 'string',
            }
        ],
    },
    {
        name: 'phone',
        type: 'string',
    },
    {
        name: 'stripe_token',
        type: 'string',
    },
    {
        name: 'vat_number',
        type: 'string',
    },
];

class Company extends Component {
    constructor (props) {
        super(props);

        this.state = {
            address: '',
            invoices: [],
            item: buildState(schema),
        };
    };

    componentDidMount () {
        axios.get(`/api/companies/${ document.head.querySelector('meta[name="company-id"]').content }`).then(res => {
            res.data.data = format(res.data.data, schema);

            this.setState({
                item: {...this.state.item, ...res.data.data},
            });
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app');
        });

        axios.get(`/api/companies/${ document.head.querySelector('meta[name="company-id"]').content }/invoices`).then(res => {
            this.setState({
                invoices: res.data,
            });
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app');
        });
    };

    delete = async () => {
        await axios.delete(`/api/companies/${ document.head.querySelector('meta[name="company-id"]').content }`).then(() => {
            toast.success('Deleted!');

            this.props.history.push('/app');
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');
        });
    };
    
    onAddressChangeHandler = (value) => {
        this.setState({
            address: value,
            item: this.state.item,
        });
    };
    
    onChangeHandler = (element) => {
        let prep = this.state.item;

        set(prep, element.target.name, element.target.value);

        this.setState({
            item: prep,
        });
    };

    onEditorChangeHandler = (name) => {
        return (value) => {
            let prep = this.state.item;

            set(prep, name, value)

            this.setState({ item: prep });
        };
    };

    onStripeChangeHandler = (token) => {
        let prep = this.state.item;

        set(prep, 'stripe_token', token)

        this.setState({ item: prep });

        this.save();
    };
    
    onPhoneChangeHandler = (name) => {
        return (value) => {
            let prep = this.state.item;

            set(prep, name, value);

            this.setState({
                item: prep,
            });
        };
    };

    onLogoChangeHandler = (result) => {
        let prep = this.state.item;

        prep.logo = result.filesUploaded[0].url;

        this.setState({
            item: prep,
        });
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
                        item: prep,
                    });
                };
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

    save = async () => {
        await axios.patch(`/api/companies/${ this.state.item.id }`, format(this.state.item, schema), {
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
                    <div className='col-10 mb-0'>
                        <h3 className='page-title'>{ this.state.item.name }</h3>
                    </div>
                </div>

                <ul className='list-group list-group-flush mb-4'>
                    <li className='list-group-item p-3'>
                        <div className='row'>
                            <div className='col'>
                                <form>
                                    { location.hash != '#customisation' && location.hash != '#integrations' && location.hash != '#billing' &&
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
                                                    <PhoneInput name='phone' defaultCountry='gb' autoFormat={ false } flagsImagePath='/images/flags.png' value={ this.state.item.phone } onChange={ this.onPhoneChangeHandler('phone') } classNames='w-100' listItemClassName='dropdown-item' id='phone' />
                                                </div>
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
                                                    <img src={ this.state.item.logo } id='logo' className='text-center mx-auto h-100 px-4 pb-4 d-block' />
                                                }
                                            </div>

                                            <div className='form-row'>
                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='industry'>Industry</label>
                                                    <input name='industry' value={ this.state.item.industry } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='industry' />
                                                </div>

                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='vatNumber'>VAT Number</label>
                                                    <input name='vat_number' value={ this.state.item.vat_number } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='vatNumber' />
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    { location.hash == '#customisation' &&
                                        <ul className='list-group list-group-flush'>
                                            <h4 className='page-title'>Customisation</h4>

                                            <li className='list-group-item p-3'>
                                                <div className='form-group'>
                                                    <label htmlFor='customisation-css'>CSS</label>
                                                    <textarea name='customisation.css' value={ this.state.item.customisation.css } onChange={ e => this.onChangeHandler(e) } className='form-control' rows='10' id='customisation-css' />
                                                </div>

                                                <div className='form-group'>
                                                    <label htmlFor='customisation-tracking'>Tracking</label>
                                                    <textarea name='customisation.tracking' value={ this.state.item.customisation.tracking } onChange={ e => this.onChangeHandler(e) } className='form-control' rows='10' id='customisation-tracking' />
                                                </div>

                                                <div className='form-group'>
                                                    <label htmlFor='emails'>Emails</label>
                                                    <div className='pl-3' id='emails'>
                                                        <div className='form-group'>
                                                            <label htmlFor='emails-package'>Package</label>
                                                            <div className='pl-3' id='emails-package'>
                                                                <div className='form-group'>
                                                                    <label htmlFor='emails-package-subject'>Subject</label>
                                                                    <input name='emails.package.subject' value={ this.state.item.emails.package.subject } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='emails-package-subject' />
                                                                </div>

                                                                <div className='form-group'>
                                                                    <label htmlFor='emails-package-content'>Content</label>
                                                                    <textarea name='emails.package.content' value={ this.state.item.emails.package.content } onChange={ e => this.onChangeHandler(e) } className='form-control' rows='10' id='emails-package-content' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='form-group'>
                                                            <label htmlFor='emails-packageAccepted'>Package Accepted</label>
                                                            <div className='pl-3' id='emails-packageAccepted'>
                                                                <div className='form-group'>
                                                                    <label htmlFor='emails-packageAccepted-subject'>Subject</label>
                                                                    <input name='emails.packageAccepted.subject' value={ this.state.item.emails.packageAccepted.subject } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='emails-packageAccepted-subject' />
                                                                </div>

                                                                <div className='form-group'>
                                                                    <label htmlFor='emails-packageAccepted-content'>Content</label>
                                                                    <textarea name='emails.packageAccepted.content' value={ this.state.item.emails.packageAccepted.content } onChange={ e => this.onChangeHandler(e) } className='form-control' rows='10' id='emails-packageAccepted-content' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='form-group'>
                                                            <label htmlFor='emails-packageDeclined'>Package Declined</label>
                                                            <div className='pl-3' id='emails-packageDeclined'>
                                                                <div className='form-group'>
                                                                    <label htmlFor='emails-packageDeclined-subject'>Subject</label>
                                                                    <input name='emails.packageDeclined.subject' value={ this.state.item.emails.packageDeclined.subject } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='emails-packageDeclined-subject' />
                                                                </div>

                                                                <div className='form-group'>
                                                                    <label htmlFor='emails-packageDeclined-content'>Content</label>
                                                                    <textarea name='emails.packageDeclined.content' value={ this.state.item.emails.packageDeclined.content } onChange={ e => this.onChangeHandler(e) } className='form-control' rows='10' id='emails-packageDeclined-content' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='form-group'>
                                                            <label htmlFor='emails-welcome'>Welcome</label>
                                                            <div className='pl-3' id='emails-welcome'>
                                                                <div className='form-group'>
                                                                    <label htmlFor='emails-welcome-subject'>Subject</label>
                                                                    <input name='emails.welcome.subject' value={ this.state.item.emails.welcome.subject } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='emails-welcome-subject' />
                                                                </div>

                                                                <div className='form-group'>
                                                                    <label htmlFor='emails-welcome-content'>Content</label>
                                                                    <textarea name='emails.welcome.content' value={ this.state.item.emails.welcome.content } onChange={ e => this.onChangeHandler(e) } className='form-control' rows='10' id='emails-welcome-content' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    }

                                    { location.hash == '#integrations' &&
                                        <ul className='list-group list-group-flush'>
                                            <h4 className='page-title'>Integrations</h4>

                                            <li className='list-group-item p-3'>
                                                <div className='form-group'>
                                                    <label htmlFor='feefo'>Feefo</label>
                                                    <div className='pl-3' id='feefo'>
                                                        <div className='row'>
                                                            <div className='form-group col-6'>
                                                                <label htmlFor='feefo-apiKey'>API Key</label>
                                                                <input name='feefo.apiKey' value={ this.state.item.feefo.apiKey } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='feefo-apiKey' />
                                                            </div>

                                                            <div className='form-group col-6'>
                                                                <label htmlFor='feefo-merchantIdentifier'>Merchant Identifier</label>
                                                                <input name='feefo.merchantIdentifier' value={ this.state.item.feefo.merchantIdentifier } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='feefo-merchantIdentifier' />
                                                            </div>
                                                        </div>

                                                        <div className='row'>
                                                            <div className='form-group col-6'>
                                                                <label htmlFor='feefo-username'>Username</label>
                                                                <input name='feefo.username' value={ this.state.item.feefo.username } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='feefo-username' />
                                                            </div>

                                                            <div className='form-group col-6'>
                                                                <label htmlFor='feefo-password'>Password</label>
                                                                <input name='feefo.password' value={ this.state.item.feefo.password } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='feefo-password' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='form-group'>
                                                    <label htmlFor='mailchimp-apiKey'>MailChimp API Key</label>
                                                    <input name='mailchimp.apiKey' value={ this.state.item.mailchimp.apiKey } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='mailchimp-apiKey' />
                                                </div>

                                                <div className='form-group'>
                                                    <label htmlFor='nexmo'>Nexmo</label>
                                                    <div className='pl-3' id='nexmo'>

                                                        <div className='row'>
                                                            <div className='form-group col-6'>
                                                                <label htmlFor='nexmo-key'>Key</label>
                                                                <input name='nexmo.key' value={ this.state.item.nexmo.key } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='nexmo-key' />
                                                            </div>

                                                            <div className='form-group col-6'>
                                                                <label htmlFor='nexmo-secret'>Secret</label>
                                                                <input name='nexmo.secret' value={ this.state.item.nexmo.secret } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='nexmo-secret' />
                                                            </div>
                                                        </div>

                                                        <div className='form-group'>
                                                            <label htmlFor='nexmo-smsFrom'>SMS From</label>
                                                            <input name='nexmo.smsFrom' value={ this.state.item.nexmo.smsFrom } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='nexmo-smsFrom' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    }

                                    { location.hash == '#billing' &&
                                        <ul className='list-group list-group-flush'>
                                            <h4 className='page-title'>Billing</h4>

                                            <li className='list-group-item p-3'>
                                                { ! this.state.item.free &&
                                                    <div>
                                                        <StripeProvider apiKey={ document.head.querySelector('meta[name="stripe-key"]').content }>
                                                            <Elements>
                                                                <StripeForm changeHandler={ this.onStripeChangeHandler } />
                                                            </Elements>
                                                        </StripeProvider>

                                                        <table className="table mb-0 mt-2">
                                                            <thead className="bg-light">
                                                                <tr>
                                                                    <th scope="col" className="border-0">Date</th>
                                                                    <th scope="col" className="border-0">Amount</th>
                                                                    <th scope="col" className="border-0"></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                { this.state.invoices.map((item, i) =>
                                                                    <tr key={ i }>
                                                                        <td>{ item.date }</td>
                                                                        <td>{ item.amount }</td>
                                                                        <td><a href={ `/invoices/${item.id}` } target='_blank'>Download</a></td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                }

                                                { this.state.item.free &&
                                                    <h5>This is a free account!</h5>
                                                }
                                            </li>
                                        </ul>
                                    }

                                    { location.hash != '#billing' &&
                                        <div>
                                            <span onClick={ this.save } className='btn btn-primary mr-2'>Save</span>
                                            <span onClick={ this.delete } className='btn btn-danger'>Delete</span>
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

export default Company;