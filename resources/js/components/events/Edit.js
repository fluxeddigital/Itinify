import move from 'array-move';
import axios from 'axios';
import * as filestack from 'filestack-js';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PhoneInput from 'react-telephone-input';
import { toast } from 'react-toastify';
import set from 'lodash.set';
import { Editor } from '@tinymce/tinymce-react';

import { buildState, format } from '../../utils';

const schema = [
    {
        name: 'name',
        type: 'string',
    },
    {
        name: 'banner',
        type: 'string',
    },
    {
        name: 'conditions',
        type: 'string',
    },
    {
        name: 'dates',
        type: 'object',
        schema: [
            {
                name: 'ends',
                type: 'string',
            },
            {
                name: 'starts',
                type: 'string',
            },
        ],
    },
    {
        name: 'description',
        type: 'string',
    },
    {
        name: 'location',
        type: 'string',
    },
    {
        name: 'logo',
        type: 'string',
    },
    {
        name: 'newsletter',
        type: 'object',
        schema: [
            {
                name: 'mailchimp',
                type: 'object',
                schema: [
                    {
                        name: 'list',
                        type: 'string',
                    },
                ],
            },
        ],
    },
    {
        name: 'pack',
        type: 'array',
        schema: [
            {
                name: 'title',
                type: 'string',
            },
            {
                name: 'type',
                type: 'string',
                options: [
                    'faqs',
                    'html',
                    'team',
                ],
            },
            {
                name: 'faqs',
                type: 'array',
                schema: [
                    {
                        name: 'question',
                        type: 'string',
                    },
                    {
                        name: 'answer',
                        type: 'string',
                    },
                ],
            },
            {
                name: 'html',
                type: 'string',
            },
            {
                name: 'team',
                type: 'array',
                schema: [
                    {
                        name: 'name',
                        type: 'string',
                    },
                    {
                        name: 'email',
                        type: 'string',
                    },
                    {
                        name: 'image',
                        type: 'string',
                    },
                    {
                        name: 'linkedin',
                        type: 'string',
                    },
                    {
                        name: 'location',
                        type: 'string',
                    },
                    {
                        name: 'position',
                        type: 'string',
                    },
                    {
                        name: 'phone',
                        type: 'object',
                        schema: [
                            {
                                name: 'mobile',
                                type: 'string',
                            },
                            {
                                name: 'office',
                                type: 'object',
                                schema: [
                                    {
                                        name: 'number',
                                        type: 'string',
                                    },
                                    {
                                        name: 'extension',
                                        type: 'string',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

const itemTypes = {
    faqs: 'FAQs',
    html: 'HTML',
    team: 'Team',
};

class Edit extends Component {
    constructor (props) {
        super(props);

        this.state = {
            activeItem: 0,
            item: buildState(schema),
        };
    };

    componentDidMount () {
        axios.get(`/api/events/${ this.props.match.params.id }`).then(res => {
            res.data.data = format(res.data.data, schema);

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

    Item = SortableElement(({ item, index }) => {
        return (
            <div className='bg-white border rounded p-3 mb-3'>
                <div onClick={ this.onOpenItemHandler(index) } className='cursor-pointer'>
                    { this.state.activeItem != index &&
                        <div>
                            { item.title &&
                                <h4>{ item.title } - { itemTypes[item.type] }</h4>
                            }

                            { ! item.title && 
                                <h4>Untitled</h4>
                            }
                        </div>
                    }
                </div>

                { this.state.activeItem == index &&
                    <div>
                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor={ `item-title-${ index }` }>Title</label>
                                <input name='title' value={ item.title } onChange={ e => this.onItemChangeHandler(e, index) } type='text' className='form-control' id={ `item-name-${ index }` } />
                            </div>
            
                            <div className='form-group col-md-6'>
                                <label htmlFor={ `item-type-${ index }` }>Type</label>
                                <Select name='type' value={ { value: item.type, label: itemTypes[item.type] } } options={ [
                                    { label: 'HTML', value: 'html' },
                                    { label: 'FAQs', value: 'faqs' },
                                    { label: 'Team', value: 'team' },
                                ] } onChange={ this.onItemSelectChangeHandler(index)('type') } className='form-control p-0' id={ `item-type-${ index }` } />
                            </div>
                        </div>

                        { item.type == 'faqs' &&
                            <div className='form-group'>
                                <label htmlFor={ `item-faqs-${ index }` }>FAQs</label>
                                <div>
                                    <this.FAQs faqs={ this.state.item.pack[index].faqs } itemIndex={ index } onSortEnd={ this.onFAQsSortEnd(index) } lockAxis='y' pressDelay={ 200 } />

                                    <div>
                                        <span onClick={ this.onNewFAQ(index, this) } className='btn btn-block btn-new-item p-3'>New FAQ</span>
                                    </div>
                                </div>
                            </div>
                        }

                        { item.type == 'html' &&
                            <div className='form-group'>
                                <label htmlFor={ `item-content-${ index }` }>HTML</label>
                                <Editor
                                    apiKey={ document.head.querySelector('meta[name="tinymce-key"]').content }
                                    textareaName='html'
                                    value={ item.html }
                                    onEditorChange={ this.onItemEditorChangeHandler('html', index) }
                                    plugins='print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help code'
                                    toolbar='formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
                                    init={ {
                                        height: 300,
                                    } }
                                />
                            </div>
                        }

                        { item.type == 'team' &&
                            <div className='form-group'>
                                <label htmlFor={ `item-team-${ index }` }>Team</label>
                                <div>
                                    <this.Team team={ this.state.item.pack[index].team } itemIndex={ index } onSortEnd={ this.onTeamSortEnd(index) } lockAxis='y' pressDelay={ 200 } />

                                    <div>
                                        <span onClick={ this.onNewMember(index, this) } className='btn btn-block btn-new-item p-3'>New Member</span>
                                    </div>
                                </div>
                            </div>
                        }

                        <div>
                            <span onClick={ this.onDeleteItem(index, this) } className='btn btn-danger'>Delete</span>
                        </div>
                    </div>
                }
            </div>
        );
    });

    FAQ = SortableElement(({ itemIndex, item, index }) => {
        return (
            <div className='bg-white border rounded p-3 mb-3'>
                <div className='form-group'>
                    <label htmlFor={ `faq-question-${ itemIndex }-${ index }` }>Question</label>
                    <input name='question' value={ item.question } onChange={ e => this.onFAQChangeHandler(e, index, itemIndex) } type='text' className='form-control' id={ `faq-question-${ itemIndex }-${ index }` } />
                </div>

                <div className='form-group'>
                    <label htmlFor={ `faq-question-${ itemIndex }-${ index }` }>Answer</label>
                    <Editor
                        apiKey={ document.head.querySelector('meta[name="tinymce-key"]').content }
                        textareaName='answer'
                        value={ item.answer }
                        onEditorChange={ this.onFAQEditorChangeHandler('answer', index, itemIndex) }
                        plugins='print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help code'
                        toolbar='formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat'
                        init={ {
                            height: 200,
                        } }
                    />
                </div>

                <div>
                    <span onClick={ this.onDeleteFAQ(itemIndex, index, this) } className='btn btn-danger'>Delete</span>
                </div>
            </div>
        );
    });

    FAQs = SortableContainer(({ itemIndex, faqs }) => {
        return (
            <div>
                { faqs.map((item, i) =>
                    <this.FAQ key={ i } item={ item } itemIndex={ itemIndex } index={ i } />
                )}
            </div>
        );
    });

    Team = SortableContainer(({ itemIndex, team }) => {
        return (
            <div>
                { team.map((item, i) =>
                    <this.Member key={ i } item={ item } itemIndex={ itemIndex } index={ i } />
                )}
            </div>
        );
    });

    Member = SortableElement(({ itemIndex, item, index }) => {
        return (
            <div className='bg-white border rounded p-3 mb-3'>
                <div className='form-row'>
                    <div className='form-group col-md-6'>
                        <label htmlFor={ `member-name-${ itemIndex }-${ index }` }>Name</label>
                        <input name='name' value={ item.name } onChange={ e => this.onMemberChangeHandler(e, index, itemIndex) } type='text' className='form-control' id={ `member-name-${ itemIndex }-${ index }` } />
                    </div>

                    <div className='form-group col-md-6'>
                        <label htmlFor={ `member-email-${ itemIndex }-${ index }` }>Email</label>
                        <input name='email' value={ item.email } onChange={ e => this.onMemberChangeHandler(e, index, itemIndex) } type='email' className='form-control' id={ `member-email-${ itemIndex }-${ index }` } />
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-group col-md-4'>
                        <label htmlFor={ `member-position-${ itemIndex }-${ index }` }>Position</label>
                        <input name='position' value={ item.position } onChange={ e => this.onMemberChangeHandler(e, index, itemIndex) } type='text' className='form-control' id={ `member-position-${ itemIndex }-${ index }` } />
                    </div>

                    <div className='form-group col-md-4'>
                        <label htmlFor={ `member-location-${ itemIndex }-${ index }` }>Location</label>
                        <input name='location' value={ item.location } onChange={ e => this.onMemberChangeHandler(e, index, itemIndex) } type='text' className='form-control' id={ `member-location-${ itemIndex }-${ index }` } />
                    </div>

                    <div className='form-group col-md-4'>
                        <label htmlFor={ `member-linkedin-${ itemIndex }-${ index }` }>LinkedIn Profile URL</label>
                        <input name='linkedin' value={ item.linkedin } onChange={ e => this.onMemberChangeHandler(e, index, itemIndex) } type='text' className='form-control' id={ `member-linkedin-${ itemIndex }-${ index }` } />
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-group col-md-6'>
                        <label htmlFor={ `member-phone-mobile-${ index }` }>Mobile Number</label>
                        <PhoneInput name='phone.mobile' defaultCountry='gb' autoFormat={ false } flagsImagePath='/images/flags.png' value={ item.phone.mobile } onChange={ this.onMemberPhoneChangeHandler('phone.mobile', index, itemIndex) } classNames='w-100' listItemClassName='dropdown-item' id={ `member-phone-mobile-${ index }` } />
                    </div>

                    <div className='form-group col-md-4'>
                        <label htmlFor={ `member-phone-office-number-${ index }` }>Office Number</label>
                        <PhoneInput name='phone.office.number' defaultCountry='gb' autoFormat={ false } flagsImagePath='/images/flags.png' value={ item.phone.office.number } onChange={ this.onMemberPhoneChangeHandler('phone.office.number', index, itemIndex) } classNames='w-100' listItemClassName='dropdown-item' id={ `member-phone-office-number-${ index }` } />
                    </div>

                    <div className='form-group col-md-2'>
                        <label htmlFor={ `member-phone-office-extension-${ index }` }>Extension</label>
                        <input name='phone.office.extension' value={ item.phone.office.extension } onChange={ e => this.onMemberChangeHandler(e, index, itemIndex) } type='text' className='form-control' id={ `member-phone-office-extension-${ itemIndex }-${ index }` } />
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor={ `member-image-${ index }` }>Image</label>
                    <div className='mb-2'>
                        <span onClick={ this.pickMemberImage(index, itemIndex) } className='btn btn-primary'>Upload</span>
                    </div>

                    { item.image &&
                        <img src={ item.image } className='text-center mx-auto h-100 px-4 pb-4 d-block' />
                    }
                </div>

                <div>
                    <span onClick={ this.onDeleteMember(itemIndex, index, this) } className='btn btn-danger'>Delete</span>
                </div>
            </div>
        );
    });

    Pack = SortableContainer(({ pack }) => {
        return (
            <div>
                { pack.map((item, i) =>
                    <this.Item key={ i } item={ item } index={ i } />
                )}
            </div>
        );
    });

    onNewItem (component) {
        return () => {
            let prep = component.state.item;

            prep.pack.push({
                title: '',
                type: '',
            });

            component.setState({
                item: format(prep, schema),
            });
        };
    };

    onDeleteItem (i, component) {
        return () => {
            let prep = component.state.item;

            prep.pack.splice(i, 1);

            component.setState({
                item: prep,
            });
        };
    };
    
    onOpenItemHandler = (i) => {
        return () => {
            this.setState({
                activeItem: i,
            });
        };
    };

    onNewFAQ (item, component) {
        return () => {
            let prep = component.state.item;

            prep.pack[item].faqs.push({
                question: '',
                answer: '',
            });

            component.setState({
                item: format(prep, schema),
            });
        };
    };

    onDeleteFAQ (item, i, component) {
        return () => {
            let prep = component.state.item;

            prep.pack[item].faqs.splice(i, 1);

            component.setState({
                item: prep,
            });
        };
    };
    
    onFAQChangeHandler = (element, i, itemIndex) => {
        let prep = this.state.item;

        prep.pack[itemIndex].faqs[i][element.target.name] = element.target.value;

        this.setState({
            item: prep,
        });
    };

    onFAQEditorChangeHandler = (name, i, itemIndex) => {
        return (value) => {
            let prep = this.state.item;

            prep.pack[itemIndex].faqs[i][name] = value;

            this.setState({
                item: prep,
            });
        };
    };

    onNewMember (item, component) {
        return () => {
            let prep = component.state.item;

            prep.pack[item].team.push({
                name: '',
                email: '',
                image: '',
                location: '',
                linkedin: '',
                phone: {
                    mobile: '',
                    office: {
                        number: '',
                        extension: '',
                    },
                },
                position: '',
            });

            component.setState({
                item: format(prep, schema),
            });
        };
    };

    onDeleteMember (item, i, component) {
        return () => {
            let prep = component.state.item;

            prep.pack[item].team.splice(i, 1);

            component.setState({
                item: prep,
            });
        };
    };
    
    onMemberChangeHandler = (element, i, itemIndex) => {
        let prep = this.state.item;

        set(prep.pack[itemIndex].team[i], element.target.name, element.target.value);

        this.setState({
            item: prep,
        });
    };

    pickMemberImage = (i, itemIndex) => {
        return () => {
            filestack.init(document.head.querySelector('meta[name="filestack-key"]').content).picker({
                onUploadDone: this.onMemberImageChangeHandler(i, itemIndex),
                maxSize: 10 * 1024 * 1024,
                accept: 'image/*',
                uploadInBackground: false,
            }).open();
        };
    };

    onMemberImageChangeHandler = (i, itemIndex) => {
        return (result) => {
            let prep = this.state.item;

            prep.pack[itemIndex].team[i].image = result.filesUploaded[0].url;

            this.setState({
                item: prep,
            });
        };
    };

    onMemberPhoneChangeHandler = (name, i, itemIndex) => {
        return (value) => {
            let prep = this.state.item;

            set(prep.pack[itemIndex].team[i], name, value);

            this.setState({
                item: prep,
            });
        };
    };

    onItemEditorChangeHandler = (name, i) => {
        return (value) => {
            let prep = this.state.item;

            if (typeof prep.pack[i] !== 'undefined') {
                prep.pack[i][name] = value;
            };

            this.setState({
                item: prep,
            });
        };
    };
    
    onItemSelectChangeHandler = (index) => {
        return (valueName, labelName = null) => {
            return (selected) => {
                let prep = this.state.item;
    
                set(prep.pack[index], valueName, selected.value)
    
                if (labelName) {
                    set(prep.pack[index], labelName, selected.label);
                };
    
                this.setState({
                    item: prep,
                });
            };
        };
    };
    
    onItemChangeHandler = (element, i) => {
        let prep = this.state.item;

        prep.pack[i][element.target.name] = element.target.value;

        this.setState({
            item: prep,
        });
    };

    onPackSortEnd = ({ oldIndex, newIndex }) => {
        let prep = this.state.item;

        move.mutate(prep.pack, oldIndex, newIndex);

        this.setState({
            item: prep,
        });
    };

    onFAQsSortEnd = (index) => {
        return ({ oldIndex, newIndex }) => {
            let prep = this.state.item;

            move.mutate(prep.pack[i].faqs, oldIndex, newIndex);

            this.setState({
                item: prep,
            });
        };
    };

    onTeamSortEnd = (index) => {
        return ({ oldIndex, newIndex }) => {
            let prep = this.state.item;

            move.mutate(prep.pack[i].team, oldIndex, newIndex);

            this.setState({
                item: prep,
            });
        };
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
        await axios.patch(`/api/events/${ this.state.item.id }`, format(this.state.item, schema), {
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
                        <Link to={ `/app/events/${ this.state.item.id + location.hash }` } className='btn btn-primary'>View</Link>
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

                                            <div className='form-group'>
                                                <label htmlFor='description'>Description</label>
                                                <Editor
                                                    apiKey={ document.head.querySelector('meta[name="tinymce-key"]').content }
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

                                            <div className='form-row pb-4'>
                                                <div className='form-group col-lg-6'>
                                                    <label htmlFor='banner'>Banner</label>

                                                    <div className='my-2'>
                                                        <span onClick={ this.pickBanner } className='btn btn-primary'>Upload</span>
                                                    </div>
                                                    { this.state.item.banner &&
                                                        <img src={ this.state.item.banner } id='banner' className='w-100 d-block' />
                                                    }
                                                </div>

                                                <div className='form-group col-lg-6'>
                                                    <label htmlFor='logo'>Logo</label>

                                                    <div className='my-2'>
                                                        <span onClick={ this.pickLogo } className='btn btn-primary'>Upload</span>
                                                    </div>

                                                    { this.state.item.logo &&
                                                        <img src={ this.state.item.logo } id='logo' className='text-center mx-auto h-100 px-4 pb-4 d-block' />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    { location.hash == '#pack' &&
                                        <ul className='list-group list-group-flush'>
                                            <h4 className='page-title'>Pack</h4>

                                            <li className='list-group-item p-3'>
                                                <div>
                                                    <this.Pack pack={ this.state.item.pack } onSortEnd={ this.onPackSortEnd } lockAxis='y' pressDelay={ 200 } />

                                                    <div>
                                                        <span onClick={ this.onNewItem(this) } className='btn btn-block btn-new-item p-3'>New Item</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    }

                                    { location.hash == '#conditions' &&
                                        <div className='form-group'>
                                            <label htmlFor='conditions'>Conditions</label>
                                            <Editor
                                                apiKey={ document.head.querySelector('meta[name="tinymce-key"]').content }
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