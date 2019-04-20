import axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select'
import { toast } from 'react-toastify';
import set from 'lodash.set';

import { buildState, format } from '../../../utils';

const schema = [
    {
        name: 'name',
        type: 'string',
    },
    {
        name: 'section',
        type: 'string',
        options: [
            'Car Hire',
            'Flights',
            'Itinerary',
            'Restaurants',
            'Transfers',
        ],
    },
];

class Create extends Component {
    constructor (props) {
        super(props);

        this.state = {
            item: buildState(schema),
        };
    };
    
    onChangeHandler = (element) => {
        let prep = this.state.item;

        set(prep, element.target.name, element.target.value);

        this.setState({ item: prep });
    };
    
    onSelectChangeHandler = (valueName, labelName = null) => {
        return (selected) => {
            let prep = this.state.item;

            set(prep, valueName, selected.value)

            if (labelName) {
                set(prep, labelName, selected.label);
            };

            this.setState({ item: prep });
        };
    };

    create = async () => {
        await axios.post(`/api/items/categories`, format(this.state.item, schema), {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            toast.success('Created!');

            this.props.history.push(`/app/items/categories/${ res.data.data.id }`);
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
                                            <Select name='section' value={ { value: this.state.item.section, label: this.state.item.section } } options={ [
                                                { label: 'Itinerary', value: 'Itinerary' },
                                                { label: 'Car Hire', value: 'Car Hire' },
                                                { label: 'Flights', value: 'Flights' },
                                                { label: 'Restaurants', value: 'Restaurants' },
                                                { label: 'Transfers', value: 'Transfers' },
                                            ] } onChange={ this.onSelectChangeHandler('section') } className='form-control p-0' id='section' />
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