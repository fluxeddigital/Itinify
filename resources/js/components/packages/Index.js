import axios from 'axios';
import React, { Component } from 'react';
import Table from 'react-bootstrap-table-next';
import TableProvider, { Search } from 'react-bootstrap-table2-toolkit';
import PaginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const { SearchBar } = Search;

class Index extends Component {
    constructor (props) {
        super(props);

        this.state = {
            acceptedPackages: [],
            loading: true,
            hotlist: [],
            openPackages: [],
            packages: [],
        };
    };

    componentDidMount () {
        axios.get('/api/packages').then(res => {
            let acceptedPackages = [];

            for (let item of res.data.data) {
                if (item.status == 'Accepted') {
                    acceptedPackages.push(item);
                };
            };

            let openPackages = [];

            for (let item of res.data.data) {
                if (item.status == 'Open') {
                    openPackages.push(item);
                };
            };

            this.setState({
                acceptedPackages: acceptedPackages,
                loading: false,
                openPackages: openPackages,
                packages: res.data.data,
            });
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app');
        });

        axios.get('/api/packages/hotlist').then(res => {
            this.setState({
                hotlist: res.data.data,
            });
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app');
        });
    };

    render () {
        const columns = [
            {
                text: 'Title',
                dataField: 'title',
                sort: true,
            }, {
                text: 'Client',
                dataField: 'client_name',
                sort: true,
            }, {
                text: 'Event',
                dataField: 'event_name',
                sort: true,
            }, {
                text: 'Lead Status',
                dataField: 'lead_status',
                sort: true,
            }
        ];

        return (
            <div className='main-content-container container-fluid px-4'>
                <div className='page-header row no-gutters py-4'>
                    <div className='text-center text-sm-left'>
                        <h3 className='page-title'>Packages</h3>
                    </div>
                </div>

                <div className='col'>
                    <TableProvider keyField='id' columns={ columns } data={ (location.hash != '#accepted' && location.hash != '#open' && location.hash != '#hotlist' ? this.state.packages : (location.hash != '#accepted' && location.hash != '#hotlist' ? this.state.openPackages : (location.hash == '#hotlist' ? this.state.hotlist : this.state.acceptedPackages))) } bootstrap4 search>
                        {
                            props => (
                                <div>
                                    <div className='row mb-3'>
                                        <div className='col-3 col-md-6 col-lg-3'>
                                            <Link to='/app/packages/create' className='btn btn-primary'>Create</Link>
                                        </div>

                                        <div className='col-6 d-none d-lg-block'></div>

                                        <div className='col-9 col-md-6 col-lg-3 text-right'>
                                            <SearchBar delay={ 0 } { ...props.searchProps } />
                                        </div>
                                    </div>

                                    <div>
                                        <Table
                                            { ...props.baseProps }
                                            pagination={ PaginationFactory({
                                                withFirstAndLast: true,
                                                alwaysShowAllBtns: true,
                                                sizePerPage: 25,
                                            }) }
                                            rowEvents={ {
                                                onClick: (e, row, rowIndex) => {
                                                    this.props.history.push(`/app/packages/${ row.id }`);
                                                },
                                              } }
                                            classes='table-borderless mb-0'
                                            headerClasses='bg-light'
                                            hover
                                            rowClasses='cursor-pointer'
                                            striped
                                            wrapperClasses='card card-small rounded p-0 mb-3'
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </TableProvider>
                                        
                    <div className='text-center'>
                        <SyncLoader
                            loading={this.state.loading}
                        />
                    </div>
                </div>
            </div>
        );
    };
};

export default Index;