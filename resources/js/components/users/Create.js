import axios from 'axios';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import set from 'lodash.set';

class Create extends Component {
    constructor (props) {
        super(props);

        this.state = {
            item: {
                email: '',
                first_name: '',
                last_name: '',
                password: '',
            },
        };
    };
    
    onChangeHandler = (element) => {
        let prep = this.state.item;

        set(prep, element.target.name, element.target.value);

        this.setState({ item: prep });
    };

    create = async () => {
        await axios.post(`/api/users`, this.state.item, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            toast.success('Created!');

            this.props.history.push(`/app/users/${ res.data.data.id }`);
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');
        });
    };

    render () {
        return (
            <div className='main-content-container container-fluid px-4'>
                <div className='page-header row no-gutters py-4'>
                    <div className='mb-0'>
                        <h3 className='page-title'>Create User</h3>
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
                                            <input name='first_name' value={ this.state.item.first_name } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='first_name' />
                                        </div>

                                        <div className='form-group col-md-6'>
                                            <label htmlFor='last_name'>Last Name</label>
                                            <input name='last_name' value={ this.state.item.last_name } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='last_name' />
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='email'>Email</label>
                                        <input name='email' value={ this.state.item.email } onChange={ e => this.onChangeHandler(e) } type='email' className='form-control' id='email' />
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='password'>Password</label>
                                        <input name='password' value={ this.state.item.password } onChange={ e => this.onChangeHandler(e) } type='password' className='form-control' id='password' />
                                    </div>

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