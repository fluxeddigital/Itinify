import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import set from 'lodash.set';

import { buildState, format } from '../../utils';

const schema = [
    {
        name: 'email',
        type: 'string',
    },
    {
        name: 'first_name',
        type: 'string',
    },
    {
        name: 'last_name',
        type: 'string',
    },
    {
        name: 'password',
        type: 'string',
    },
];

class Edit extends Component {
    constructor (props) {
        super(props);

        this.state = {
            item: buildState(schema),
        };
    };

    componentDidMount () {
        axios.get(`/api/users/${ this.props.match.params.id }`).then(res => {
            res.data.data = format(res.data.data, schema);

            this.setState({
                item: {...this.state.item, ...res.data.data},
            });
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app/users');
        });
    };

    delete = async () => {
        await axios.delete(`/api/users/${ this.state.item.id }`).then(() => {
            toast.success('Deleted!');

            this.props.history.push('/app/users');
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');
        });
    };
    
    onChangeHandler = (element) => {
        let prep = this.state.item;

        set(prep, element.target.name, element.target.value);

        this.setState({ item: prep });
    };

    save = async () => {
        await axios.patch(`/api/users/${ this.state.item.id }`, format(this.state.item, schema), {
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
                        <h3 className='page-title'>{ this.state.item.first_name } { this.state.item.last_name }</h3>
                    </div>

                    <div className='col-2 text-right mb-0'>
                        <Link to={ `/app/users/${ this.state.item.id + location.hash }` } className='btn btn-primary'>View</Link>
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