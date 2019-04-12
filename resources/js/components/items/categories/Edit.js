import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import set from 'lodash.set';

class Edit extends Component {
    constructor (props) {
        super(props);

        this.state = {
            item: {
                name: '',
                section: '',
            },
        };
    };

    componentDidMount () {
        axios.get(`/api/items/categories/${this.props.match.params.id}`).then(res => {
            Object.keys(res.data.data).forEach((key) => {
                if (res.data.data[key] === null) {
                    res.data.data[key] = '';
                };
            });

            this.setState({
                item: { ...this.state, ...res.data.data },
            });
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app/items/categories');
        });
    };

    delete = async () => {
        await axios.delete(`/api/items/categories/${ this.state.item.id }`).then(() => {
            toast.success('Deleted!');

            this.props.history.push('/app/items/categories');
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
        await axios.patch(`/api/items/categories/${ this.state.item.id }`, this.state.item, {
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

                    <div className='col-2 text-right mb-0'>
                        <Link to={ `/app/items/categories/${ this.state.item.id }` } className='btn btn-primary'>View</Link>
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