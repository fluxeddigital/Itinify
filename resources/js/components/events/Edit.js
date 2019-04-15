import axios from 'axios';
import * as filestack from 'filestack-js';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import set from 'lodash.set';
import { Editor } from '@tinymce/tinymce-react';

class Edit extends Component {
    constructor (props) {
        super(props);

        this.state = {
            item: {
                name: '',
                banner: '',
                conditions: '',
                dates: {
                    starts: '',
                    ends: '',
                },
                description: '',
                location: '',
                logo: '',
                newsletter: {
                    mailchimp: {
                        list: '',
                    },
                },
                pack: [],
            },
        };
    };

    componentDidMount () {
        axios.get(`/api/events/${ this.props.match.params.id }`).then(res => {
            res.data.data = JSON.parse(JSON.stringify(res.data.data).replace('null', '""'));

            this.setState({
                item: {...this.state.item, ...res.data.data},
            });
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app/events');
        });

        $('.date').datepicker().on('changeDate', (element) => {
            this.onChangeHandler(element);
        });
    };

    delete = async () => {
        await axios.delete(`/api/events/${ this.state.item.id }`).then(() => {
            toast.success('Deleted!');

            this.props.history.push('/app/events');
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');
        });
    };

    onBannerChangeHandler = (result) => {
        let prep = this.state.item;

        prep.banner = result.filesUploaded[0].url;

        this.setState({ item: prep });
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

    onLogoChangeHandler = (result) => {
        let prep = this.state.item;

        prep.logo = result.filesUploaded[0].url;

        this.setState({ item: prep });
    };

    pickBanner = () => {
        filestack.init(document.head.querySelector('meta[name="filestack-key"]').content).picker({
            onUploadDone: this.onBannerChangeHandler,
            maxSize: 10 * 1024 * 1024,
            accept: 'image/*',
            uploadInBackground: false,
        }).open();
    };

    pickLogo = () => {
        filestack.init(document.head.querySelector('meta[name="filestack-key"]').content).picker({
            onUploadDone: this.onLogoChangeHandler,
            maxSize: 10 * 1024 * 1024,
            accept: 'image/*',
            uploadInBackground: false,
        }).open();
    };

    save = async () => {
        await axios.patch(`/api/events/${ this.state.item.id }`, this.state.item, {
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
                        <Link to={ `/app/events/${ this.state.item.id }` } className='btn btn-primary'>View</Link>
                    </div>
                </div>

                <ul className='list-group list-group-flush mb-4'>
                    <li className='list-group-item p-3'>
                        <div className='row'>
                            <div className='col'>
                                <form>
                                    { location.hash != '#conditions' && location.hash != '#pack' &&
                                        <div>
                                            <div className='form-group'>
                                                <label htmlFor='name'>Name</label>
                                                <input name='name' value={ this.state.item.name } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='name' />
                                            </div>

                                            <div className='form-group'>
                                                <label htmlFor='description'>Description</label>
                                                <Editor
                                                    // apiKey='API_KEY'
                                                    textareaName='description'
                                                    value={ this.state.item.description }
                                                    onEditorChange={ this.onEditorChangeHandler('description') }
                                                    plugins='print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help code'
                                                    toolbar='formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
                                                    init={ {
                                                        height: 500,
                                                    } }
                                                />
                                            </div>

                                            <div className='form-row'>
                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='dates_starts'>Start Date</label>
                                                    <input name='dates.starts' value={ this.state.item.dates.starts } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control date' id='dates_starts' />
                                                </div>

                                                <div className='form-group col-md-6'>
                                                    <label htmlFor='dates_ends'>End Date</label>
                                                    <input name='dates.ends' value={ this.state.item.dates.ends } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control date' id='dates_ends' />
                                                </div>
                                            </div>

                                            <div className='form-group'>
                                                <label htmlFor='location'>Location</label>
                                                <input name='location' value={ this.state.item.location } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='location' />
                                            </div>

                                            <div className='form-group'>
                                                <label htmlFor='newsletter_mailchimp_list'>MailChimp List ID</label>
                                                <input name='newsletter.mailchimp.list' value={ this.state.item.newsletter.mailchimp.list } onChange={ e => this.onChangeHandler(e) } type='text' className='form-control' id='newsletter_mailchimp_list' />
                                            </div>

                                            <div className='form-row pb-4'>
                                                <div className='form-group col-lg-6'>
                                                    <label htmlFor='banner'>Banner</label>

                                                    <div className='my-2'>
                                                        <span onClick={ this.pickBanner } className='btn btn-primary'>Upload</span>
                                                    </div>
                                                    { this.state.item.banner &&
                                                        <img src={ this.state.item.banner.startsWith('http') ? this.state.item.banner : `/storage/${ this.state.item.banner }` } id='banner' className='w-100 d-block' />
                                                    }
                                                </div>

                                                <div className='form-group col-lg-6'>
                                                    <label htmlFor='logo'>Logo</label>

                                                    <div className='my-2'>
                                                        <span onClick={ this.pickLogo } className='btn btn-primary'>Upload</span>
                                                    </div>

                                                    { this.state.item.logo &&
                                                        <img src={ this.state.item.logo.startsWith('http') ? this.state.item.logo : `/storage/${ this.state.item.logo }` } id='logo' className='text-center mx-auto h-100 px-4 pb-4 d-block' />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    { location.hash == '#pack' &&
                                        <div className='form-group'>
                                            <label htmlFor='pack'>Pack</label>
                                            <div id='pack' className='card mb-5'>
                                                <textarea name='pack' id='pack' value={ JSON.stringify(this.state.item.pack) } onChange={ e => this.onChangeHandler(e) } className='card-body' rows={ 20 } />
                                            </div>
                                        </div>
                                    }

                                    { location.hash == '#conditions' &&
                                        <div className='form-group'>
                                            <label htmlFor='conditions'>Conditions</label>
                                            <Editor
                                                // apiKey='API_KEY'
                                                textareaName='conditions'
                                                value={ this.state.item.conditions }
                                                onEditorChange={ this.onEditorChangeHandler('conditions') }
                                                plugins='print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help code'
                                                toolbar='formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
                                                init={ {
                                                    height: 800,
                                                } }
                                            />
                                        </div>
                                    }

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