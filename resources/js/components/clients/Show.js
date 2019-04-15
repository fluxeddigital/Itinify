import axios from 'axios';
import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

class Show extends Component {
    constructor (props) {
        super(props);

        this.state = {
            events: [],
            item: {
                name: '',
                address: [],
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
        axios.get(`/api/clients/${ this.props.match.params.id }`).then(res => {
            Object.keys(res.data.data).forEach((key) => {
                if (res.data.data[key] === null) {
                    res.data.data[key] = '';
                };
            });

            this.setState({
                events: this.state.events,
                item: res.data.data,
            });

            for (let i in this.state.item.interests) {
                axios.get(`/api/events/${ this.state.item.interests[i] }`).then(res => {
                    let events = this.state.events;
    
                    events[this.state.item.interests[i]] = res.data.data;
    
                    this.setState({
                        events: events,
                        item: this.state.item,
                    });
                });
            };
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app/clients');
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
                        <Link to={ `/app/clients/${ this.state.item.id }/edit` } className='btn btn-primary'>Edit</Link>
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
                                                <input value={ this.state.item.name } type='text' className='form-control' id='name' disabled />
                                            </div>

                                            <div className='form-row'>
                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='email'>Email</label>
                                                    <input value={ this.state.item.email } type='text' className='form-control' id='email' disabled />
                                                </div>

                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='phone'>Phone</label>
                                                    <input value={ this.state.item.phone } type='text' className='form-control' id='phone' disabled />
                                                </div>
                                            </div>

                                            <div className='form-row'>
                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='status'>Status</label>
                                                    <input value={ this.state.item.status } type='text' className='form-control' id='status' disabled />
                                                </div>

                                                { this.state.item.interests &&
                                                    <div className='form-group col-md-6'>
                                                        <label htmlFor='interests'>Interests</label>
                                                        <div id='interests'>
                                                            { this.state.item.interests.map((item) => 
                                                                <p key={ item }>
                                                                    { this.state.events[item] &&
                                                                        <Link to={ `/app/events/${ item }` }>{ this.state.events[item].name }</Link>
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                }
                                            </div>

                                            <div className='form-group'>
                                                <label>Address</label>
                                                { this.state.item.address.map((item) => 
                                                    <input key={ item } value={ item } type='text' className='form-control my-1' disabled />
                                                )}
                                            </div>

                                            { this.state.item.logo &&
                                                <div className='form-group'>
                                                    <label htmlFor='logo'>Logo</label>
                                                    <img src={ this.state.item.logo.startsWith('http') ? this.state.item.logo : `/storage/${ this.state.item.logo }` } id='logo' className='text-center mx-auto h-100 px-4 pb-4 d-block' />
                                                </div>
                                            }
                                        </div>
                                    }

                                    { location.hash == '#contacts' &&
                                        <ul className='list-group list-group-flush mb-4'>
                                            <h4 className='page-title'>Contacts</h4>

                                            <li className='list-group-item p-3'>
                                                <div className='row'>
                                                    { this.state.item.contacts.map((item, i) => 
                                                        <div key={ i } className='col'>
                                                            <div>
                                                                <div className='form-row'>
                                                                    <div className='form-group col-md-6'>
                                                                        <label htmlFor={ `contact-name-${ i }` }>Name</label>
                                                                        <input value={ item.name } type='text' className='form-control' id={ `contact-name-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-6'>
                                                                        <label htmlFor={ `contact-email-${ i }` }>Email</label>
                                                                        <input value={ item.email } type='text' className='form-control' id={ `contact-email-${ i }` } disabled />
                                                                    </div>
                                                                </div>

                                                                <div className='form-row'>
                                                                    <div className='form-group col-md-6'>
                                                                        <label htmlFor={ `contact-mobile-${ i }` }>Mobile</label>
                                                                        <input value={ item.mobile } type='text' className='form-control' id={ `contact-mobile-${ i }` } disabled />
                                                                    </div>

                                                                    <div className='form-group col-md-6'>
                                                                        <label htmlFor={ `contact-phone-${ i }` }>Phone</label>
                                                                        <input value={ item.phone } type='text' className='form-control' id={ `contact-phone-${ i }` } disabled />
                                                                    </div>
                                                                </div>

                                                                <div className='form-group'>
                                                                    <label htmlFor={ `contact-birth-${ i }` }>Date of Birth</label>
                                                                    <input value={ item.birth } type='text' className='form-control' id={ `contact-birth-${ i }` } disabled />
                                                                </div>
                                                            </div>

                                                            <hr />
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