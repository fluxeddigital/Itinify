import move from 'array-move';
import axios from 'axios';
import * as filestack from 'filestack-js';
import set from 'lodash.set';
import React, { Component } from 'react';
import Datetime from 'react-datetime';
import Select from 'react-select'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';

class Create extends Component {
    constructor (props) {
        super(props);

        this.state = {
            clients: [],
            events: [],
            item: {
                name: '',
                email: '',
                logo: '',
                notes: [],
                phone: '',
                status: '',
            },
            items: [],
        };
    };

    componentDidMount () {
        axios.get('/api/events').then(res => {
            let events = res.data.data;

            for (let i in events) {
                events[i] = {
                    label: events[i].name,
                    value: events[i].id,
                };
            };

            this.setState({
                events: events,
                item: this.state.item,
            });
        });
    };

    Note = SortableElement(({ item, index }) => {
        return (
            <div className='bg-white border rounded p-3 mb-3'>
                <div className='form-row'>
                    <div className='form-group col-md-6'>
                        <label htmlFor={ `note-title-${ index }` }>Title</label>
                        <input name='title' value={ item.title } onChange={ e => this.onNoteChangeHandler(e, index) } type='text' className='form-control' id={ `note-title-${ index }` } />
                    </div>
    
                    <div className='form-group col-md-6'>
                        <label htmlFor={ `note-visibility-${ index }` }>Visibility</label>
                        <input name='visibility' value={ item.visibility } onChange={ e => this.onNoteChangeHandler(e, index) } type='text' className='form-control' id={ `note-visibility-${ index }` } />
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor={ `note-content-${ index }` }>Content</label>
                    <Editor
                        // apiKey='API_KEY'
                        textareaName='content'
                        value={ item.content }
                        onEditorChange={ this.onNoteEditorChangeHandler('content', index) }
                        plugins='print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help code'
                        toolbar='formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
                        init={ {
                            height: 300,
                        } }
                    />
                </div>

                <div>
                    <span onClick={ this.onDeleteNote(index, this) } className='btn btn-danger'>Delete</span>
                </div>
            </div>
        );
    });

    Notes = SortableContainer(({ notes }) => {
        return (
            <div>
                { notes.map((item, i) =>
                    <this.Note key={ i } item={ item } index={ i } />
                )}
            </div>
        );
    });
    
    onChangeHandler = (element) => {
        let prep = this.state.item;

        set(prep, element.target.name, element.target.value);

        this.setState({
            clients: this.state.events,
            events: this.state.events,
            item: prep,
            items: this.state.events,
        });
    };
    
    onNoteChangeHandler = (element, i) => {
        let prep = this.state.item;

        prep.notes[i][element.target.name] = element.target.value;

        this.setState({
            clients: this.state.events,
            events: this.state.events,
            item: prep,
            items: this.state.events,
        });
    };

    onNoteEditorChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            prep.notes[i][name] = value;

            this.setState({
                clients: this.state.events,
            events: this.state.events,
            item: prep,
            items: this.state.events,
            });
        };
    };

    onNotesSortEnd = ({ oldIndex, newIndex }) => {
        let prep = this.state.item;

        move.mutate(prep.notes, oldIndex, newIndex);

        this.setState({
            clients: this.state.events,
            events: this.state.events,
            item: prep,
            items: this.state.events,
        });
    };

    onDeleteNote (i, component) {
        return () => {
            let prep = component.state.item;

            prep.notes.splice(i, 1);

            component.setState({
                clients: component.state.events,
                events: component.state.events,
                item: prep,
                items: component.state.events,
            });
        };
    };

    onLogoChangeHandler = (result) => {
        let prep = this.state.item;

        prep.logo = result.filesUploaded[0].url;

        this.setState({
            clients: this.state.events,
            events: this.state.events,
            item: prep,
            items: this.state.events,
        });
    };

    onNewNote (component) {
        return () => {
            let prep = component.state.item;

            prep.notes.push({
                title: '',
                content: '',
                visibility: false,
            });

            component.setState({
                clients: component.state.events,
                events: component.state.events,
                item: prep,
                items: component.state.events,
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
                clients: this.state.events,
                events: this.state.events,
                item: prep,
                items: this.state.events,
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
        await axios.post(`/api/packages`, this.state.item, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            toast.success('Created!');

            this.props.history.push(`/app/packages/${ res.data.data.id }`);
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
                        <h3 className='page-title'>Create Package</h3>
                    </div>
                </div>

                <ul className='list-group list-group-flush mb-4'>
                    <li className='list-group-item p-3'>
                        <div className='row'>
                            <div className='col'>
                                <form>
                                    { location.hash != '#itinerary' && location.hash != '#flights' && location.hash != '#car-hire' && location.hash != '#passengers' && location.hash != '#transfers' && location.hash != '#restaurants' && location.hash != '#customise' && location.hash != '#requirements' && location.hash != '#notes' &&
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
                                            </div>

                                            <div className='form-row'>
                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='status'>Status</label>
                                                    <Select name='status' value={ { value: this.state.item.status, label: this.state.item.status } } options={ [
                                                        { label: 'Hot', value: 'Hot' },
                                                        { label: 'Cold', value: 'Cold' },
                                                    ] } onChange={ this.onSelectChangeHandler('status') } className='form-control p-0' id='status' />
                                                </div>
                                            </div>

                                            <div className='form-group'>
                                                <label htmlFor='logo'>Logo</label>
                                                <div className='my-2'>
                                                    <span onClick={ this.pickLogo } className='btn btn-primary'>Upload</span>
                                                </div>

                                                { this.state.item.logo &&
                                                    <img src={ this.state.item.logo } id='logo' className='text-center mx-auto h-100 px-4 pb-4 d-block' />
                                                }
                                            </div>
                                        </div>
                                    }

                                    { location.hash == '#notes' &&
                                        <ul className='list-group list-group-flush'>
                                            <h4 className='page-title'>Notes</h4>

                                            <li className='list-group-item p-3'>
                                                <div>
                                                    <this.Notes notes={ this.state.item.notes } onSortEnd={ this.onNotesSortEnd } lockAxis='y' pressDelay={ 200 } />

                                                    <div>
                                                        <span onClick={ this.onNewNote(this) } className='btn btn-primary'>New Note</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    }

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