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
            clients: [],
            customers: [],
            leads: [],
            loading: true,
        };
    };

    componentDidMount () {
        axios.get('/api/clients').then(res => {
            let customers = [];
            let leads = [];

            for (let client of res.data.data) {
                if (client.type == 'customer') {
                    customers.push(client);
                } else if (client.type == 'lead') {
                    leads.push(client);
                };
            };

            this.setState({
                clients: res.data.data,
                customers: customers,
                leads: leads,
                loading: false,
            });
        }).catch((err) => {
            toast.error('An error occurred, please try again later.');

            this.props.history.push('/app');
        });
    };

    render () {
        const { clients } = this.state;

        const columns = [
            {
                text: 'Name',
                dataField: 'name',
                sort: true,
            },
            {
                text: 'Email',
                dataField: 'email',
                sort: true,
            },
        ];

        return (
            <div className='main-content-container container-fluid px-4'>
                <div className='page-header row no-gutters py-4'>
                    <div className='text-center text-sm-left'>
                        <h3 className='page-title'>Clients</h3>
                    </div>
                </div>

                <div className='col'>
                    <TableProvider keyField='id' columns={ columns } data={ (location.hash != '#leads' && location.hash != '#customers' ? this.state.clients : (location.hash != '#leads' ? this.state.customers : this.state.leads)) } bootstrap4 search>
                        {
                            props => (
                                <div>
                                    <div className='row mb-3'>
                                        <div className='col-3 col-md-6 col-lg-3'>
                                            <Link to='/app/clients/create' className='btn btn-primary'>Create</Link>
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
                                                    this.props.history.push(`/app/clients/${ row.id }`);
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