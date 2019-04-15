import axios from 'axios';
import * as filestack from 'filestack-js';
import React, { Component } from 'react';
import Select from 'react-select'
import { toast } from 'react-toastify';
import set from 'lodash.set';

class Create extends Component {
    constructor (props) {
        super(props);

        this.state = {
            events: {},
            item: {
                name: '',
                address: [
                    '',
                    '',
                    '',
                    '',
                ],
                contacts: [],
                email: '',
                interests: [],
                logo: '',
                phone: '',
                status: '',
            },
        };
    };

    componentDidMount () {
        $('.date').datepicker().on('changeDate', (element) => {
            this.onChangeHandler(element);
        });
    };
    
    onAddressChangeHandler = (element, i) => {
        let prep = this.state.item;

        prep.address[i] = element.target.value;

        this.setState({
            events: this.state.events,
            item: prep,
        });
    };
    
    onChangeHandler = (element) => {
        let prep = this.state.item;

        set(prep, element.target.name, element.target.value);

        this.setState({
            events: this.state.events,
            item: prep,
        });
    };
    
    onContactChangeHandler = (element, i) => {
        let prep = this.state.item;

        prep.contacts[i][element.target.name] = element.target.value;

        this.setState({
            events: this.state.events,
            item: prep,
        });
    };

    onLogoChangeHandler = (result) => {
        let prep = this.state.item;

        prep.logo = result.filesUploaded[0].url;

        this.setState({
            events: this.state.events,
            item: prep,
        });
    };

    onNewAddressLine (component) {
        return () => {
            let prep = component.state.item;

            prep.address.push('');

            component.setState({
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
                events: this.state.events,
                item: prep,
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
                events: this.state.events,
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
                                    { location.hash != '#contacts' &&
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

                                                { this.state.item.interests &&
                                                    <div className='form-group col-md-6'>
                                                        <label htmlFor='interests'>Interests</label>
                                                        <div id='interests'>
                                                            { this.state.item.interests.map((item, i) => 
                                                                <p key={ i }>
                                                                    { this.state.events[i] &&
                                                                        <Link to={ `/app/events/${ item }` }>{ this.state.events[i].name }</Link>
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                }
                                            </div>

                                            <div className='form-group'>
                                                <label>Address</label>
                                                { this.state.item.address.map((item, i) => 
                                                    <input key={ i } value={ item } onChange={ e => this.onAddressChangeHandler(e, i) } type='text' className='form-control my-1' />
                                                )}

                                                <div>
                                                    <span onClick={ this.onNewAddressLine(this) } className='btn btn-primary'>New Line</span>
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
                                                    { this.state.item.contacts.map((item, i) => 
                                                        <div key={ i }>
                                                            <div>
                                                                <div className='form-row'>
                                                                    <div className='form-group col-md-6'>
                                                                        <label htmlFor={ `contact-name-${ i }` }>Name</label>
                                                                        <input name='name' value={ item.name } onChange={ e => this.onContactChangeHandler(e, i) } type='text' className='form-control' id={ `contact-name-${ i }` } />
                                                                    </div>

                                                                    <div className='form-group col-md-6'>
                                                                        <label htmlFor={ `contact-email-${ i }` }>Email</label>
                                                                        <input name='email' value={ item.email } onChange={ e => this.onContactChangeHandler(e, i) } type='text' className='form-control' id={ `contact-email-${ i }` } />
                                                                    </div>
                                                                </div>

                                                                <div className='form-row'>
                                                                    <div className='form-group col-md-6'>
                                                                        <label htmlFor={ `contact-mobile-${ i }` }>Mobile</label>
                                                                        <input name='mobile' value={ item.mobile } onChange={ e => this.onContactChangeHandler(e, i) } type='text' className='form-control' id={ `contact-mobile-${ i }` } />
                                                                    </div>

                                                                    <div className='form-group col-md-6'>
                                                                        <label htmlFor={ `contact-phone-${ i }` }>Phone</label>
                                                                        <input name='phone' value={ item.phone } onChange={ e => this.onContactChangeHandler(e, i) } type='text' className='form-control' id={ `contact-phone-${ i }` } />
                                                                    </div>
                                                                </div>

                                                                <div className='form-group'>
                                                                    <label htmlFor={ `contact-birth-${ i }` }>Date of Birth</label>
                                                                    <input name='birth' value={ item.birth } onChange={ e => this.onContactChangeHandler(e, i) } type='text' className='form-control date' id={ `contact-birth-${ i }` } />
                                                                </div>
                                                            </div>

                                                            <hr />
                                                        </div>
                                                    )}

                                                    <div>
                                                        <span onClick={ this.onNewContact(this) } className='btn btn-primary'>New Contact</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    }

                                    <span onClick={ this.create } className='btn btn-primary mr-2'>Create</span>

                                    <script src={ `https://maps.googleapis.com/maps/api/js?key=${ document.head.querySelector('meta[name="maps-key"]').content }&libraries=places&callback=initAutocomplete` }></script>
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