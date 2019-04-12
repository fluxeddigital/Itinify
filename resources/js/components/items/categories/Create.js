import axios from 'axios';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import set from 'lodash.set';

class Create extends Component {
    constructor (props) {
        super(props);

        this.state = {
            item: {
                name: '',
                section: '',
            },
        };
    };
    
    onChangeHandler = (element) => {
        let prep = this.state.item;

        set(prep, element.target.name, element.target.value);

        this.setState({ item: prep });
    };

    create = async () => {
        await axios.post(`/api/items/categories`, this.state.item, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            toast.success('Created!');

            this.props.history.push(`/app/items/categories/${ res.data.data.id }`);
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');
        });
    };

    render () {
        return (
            <div className='main-content-container container-fluid px-4'>
                <div className='page-header row no-gutters py-4'>
                    <div className='mb-0'>
                        <h3 className='page-title'>Create Item Category</h3>
                    </div>
                </div>

                <ul className='list-group list-group-flush mb-4'>
                    <li className='list-group-item p-3'>
                        <div className='row'>
                            <div className='col'>
                                <form>
                                <div className='form-row'>
                                        <div className='form-group col-md-6'>
                                            <label htmlFor='name'>Name</label>
                                            <input name='name' value={ this.state.item.name } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='name' />
                                        </div>

                                        <div className='form-group col-md-6'>
                                            <label htmlFor='section'>Section</label>
                                            <select name='section' value={ this.state.item.section } onChange={ e => this.onChangeHandler(e) } className='form-control' id='section'>
                                                <option value='Itinerary'>Itinerary</option>
                                                <option value='Transfers'>Transfers</option>
                                                <option value='Restaurants'>Restaurants</option>
                                            </select>
                                        </div>
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