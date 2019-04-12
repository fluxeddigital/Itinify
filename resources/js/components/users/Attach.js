import axios from 'axios';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import set from 'lodash.set';

class Attach extends Component {
    constructor (props) {
        super(props);

        this.state = {
            item: {
                id: '',
                email: '',
            },
        };
    };
    
    onChangeHandler = (element) => {
        let prep = this.state.item;

        set(prep, element.target.name, element.target.value);

        this.setState({ item: prep });
    };

    attach = async () => {
        await axios.patch(`/api/users/attach`, this.state.item, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            toast.success('Attached!');

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
                        <h3 className='page-title'>Attach User</h3>
                    </div>
                </div>

                <ul className='list-group list-group-flush mb-4'>
                    <li className='list-group-item p-3'>
                        <div className='row'>
                            <div className='col'>
                                <form>
                                    <div className='form-row'>
                                        <div className='form-group col-md-6'>
                                            <label htmlFor='id'>ID</label>
                                            <input name='id' value={ this.state.item.id } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='id' />
                                        </div>

                                        <div className='form-group col-md-6'>
                                            <label htmlFor='email'>Email</label>
                                            <input name='email' value={ this.state.item.email } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='email' />
                                        </div>
                                    </div>

                                    <span onClick={ this.attach } className='btn btn-primary mr-2'>Attach</span>
                                </form>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    };
};

export default Attach;