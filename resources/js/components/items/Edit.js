import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select'
import { toast } from 'react-toastify';
import set from 'lodash.set';
import { Editor } from '@tinymce/tinymce-react';

class Edit extends Component {
    constructor (props) {
        super(props);

        this.state = {
            categories: [
                {
                    label: 'None',
                    value: null,
                },
            ],
            events: [
                {
                    label: 'None',
                    value: null,
                },
            ],
            item: {
                category_id: '',
                category_name: '',
                event_id: '',
                event_name: '',
                name: '',
                long_description: '',
                short_description: '',
            },
        };
    };

    componentDidMount () {
        axios.get(`/api/items/${ this.props.match.params.id }`).then(res => {
            res.data.data = JSON.parse(JSON.stringify(res.data.data).replace('null', '""'));

            this.setState({
                item: {...this.state.item, ...res.data.data},
            });
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app/items');
        });

        axios.get('/api/items/categories').then(res => {
            let prep = this.state;

            for (let i in res.data.data) {
                prep.categories.push({
                    label: res.data.data[i].name,
                    value: res.data.data[i].id,
                });
            };

            this.setState(prep);
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app/items');
        });

        axios.get('/api/events').then(res => {
            let prep = this.state;

            for (let i in res.data.data) {
                prep.events.push({
                    label: res.data.data[i].name,
                    value: res.data.data[i].id,
                });
            };

            this.setState(prep);
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app/items');
        });
    };

    delete = async () => {
        await axios.delete(`/api/items/${ this.state.item.id }`).then(() => {
            toast.success('Deleted!');

            this.props.history.push('/app/items');
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');
        });
    };
    
    onChangeHandler = (element) => {
        let prep = this.state.item;

        set(prep, element.target.name, element.target.value);

        this.setState({ item: prep });
    };

    onEditorChangeHandler = (name) => {
        return (value) => {
            let prep = this.state.item;

            set(prep, name, value)

            this.setState({ item: prep });
        };
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

    save = async () => {
        await axios.patch(`/api/items/${ this.state.item.id }`, this.state.item, {
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
                        <Link to={ `/app/items/${ this.state.item.id }` } className='btn btn-primary'>View</Link>
                    </div>
                </div>

                <ul className='list-group list-group-flush mb-4'>
                    <li className='list-group-item p-3'>
                        <div className='row'>
                            <div className='col'>
                                <form>
                                    <div>
                                        <div className='form-group'>
                                            <label htmlFor='name'>Name</label>
                                            <input name='name' value={ this.state.item.name } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='name' />
                                        </div>

                                        <div className='form-group'>
                                            <label htmlFor='short_description'>Short Description</label>
                                            <Editor
                                                // apiKey='API_KEY'
                                                textareaName='short_description'
                                                value={ this.state.item.short_description }
                                                onEditorChange={ this.onEditorChangeHandler('short_description') }
                                                plugins='print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help code'
                                                toolbar='formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
                                                init={ {
                                                    height: 200,
                                                } }
                                            />
                                        </div>

                                        <div className='form-group'>
                                            <label htmlFor='long_description'>Long Description</label>
                                            <Editor
                                                // apiKey='API_KEY'
                                                textareaName='long_description'
                                                value={ this.state.item.long_description }
                                                onEditorChange={ this.onEditorChangeHandler('long_description') }
                                                plugins='print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help code'
                                                toolbar='formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
                                                init={ {
                                                    height: 500,
                                                } }
                                            />
                                        </div>

                                        <div className='form-row'>
                                            <div className='form-group col-md-6'>
                                                <label htmlFor='category_id'>Category</label>
                                                <Select name='category_id' value={ { value: this.state.item.category_id, label: this.state.item.category_name } } options={ this.state.categories } onChange={ this.onSelectChangeHandler('category_id', 'category_name') } className='form-control p-0' id='category_id' />
                                            </div>

                                            <div className='form-group col-md-6'>
                                                <label htmlFor='event_id'>Event</label>
                                                <Select name='event_id' value={ { value: this.state.item.event_id, label: this.state.item.event_name } } options={ this.state.events } onChange={ this.onSelectChangeHandler('event_id', 'event_name') } className='form-control p-0' id='event_id' />
                                            </div>
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