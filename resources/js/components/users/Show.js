import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

class Show extends Component {
    constructor (props) {
        super(props);

        this.state = {
            item: {
                email: '',
                first_name: '',
                last_name: '',
                password: 'password',
            },
        };
    };

    componentDidMount () {
        axios.get(`/api/users/${ this.props.match.params.id }`).then(res => {
            res.data.data = JSON.parse(JSON.stringify(res.data.data).replace('null', '""'));

            this.setState({
                item: {...this.state.item, ...res.data.data},
            });
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app/users');
        });
    };

    render () {
        return (
            <div className='main-content-container container-fluid px-4'>
                <div className='page-header row no-gutters py-4'>
                    <div className='col-10 mb-0'>
                        <h3 className='page-title'>{ this.state.item.first_name } { this.state.item.last_name }</h3>
                    </div>

                    <div className='col-2 text-right mb-0'>
                        <Link to={ `/app/users/${ this.state.item.id }/edit` } className='btn btn-primary'>Edit</Link>
                    </div>
                </div>

                <ul className='list-group list-group-flush mb-4'>
                    <li className='list-group-item p-3'>
                        <div className='row'>
                            <div className='col'>
                                <form>
                                    <div className='form-row'>
                                        <div className='form-group col-md-6'>
                                            <label htmlFor='first_name'>First Name</label>
                                            <input value={ this.state.item.first_name } type='text' className='form-control' id='first_name' disabled />
                                        </div>

                                        <div className='form-group col-md-6'>
                                            <label htmlFor='last_name'>Last Name</label>
                                            <input value={ this.state.item.last_name } type='text' className='form-control' id='last_name' disabled />
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='email'>Email</label>
                                        <input value={ this.state.item.email } type='email' className='form-control' id='email' disabled />
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='password'>Password</label>
                                        <input value={ this.state.item.password } type='password' className='form-control' id='password' disabled />
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