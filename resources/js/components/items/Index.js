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
            items: [],
            loading: true,
        };
    };

    componentDidMount () {
        axios.get('/api/items').then(res => {
            this.setState({
                items: res.data.data,
                loading: false,
            });
        });
    };

    render () {
        const { items } = this.state;

        const columns = [
            {
                text: 'Name',
                dataField: 'name',
                sort: true,
            },
            {
                text: 'Category',
                dataField: 'category_name',
                sort: true,
            },
            {
                text: 'Event',
                dataField: 'event_name',
                sort: true,
            },
        ];

        return (
            <div className='main-content-container container-fluid px-4'>
                <div className='page-header row no-gutters py-4'>
                    <div className='text-center text-sm-left'>
                        <h3 className='page-title'>Items</h3>
                    </div>
                </div>

                <div className='col'>
                    <TableProvider keyField='id' columns={ columns } data={ items } bootstrap4 search>
                        {
                            props => (
                                <div>
                                    <div className='row mb-3'>
                                        <div className='col-3 col-md-6 col-lg-3'>
                                            <Link to='/app/items/create' className='btn btn-primary'>Create</Link>

                                            <Link to='/app/items/categories' className='btn btn-primary ml-2'>Categories</Link>
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
                                                    this.props.history.push(`/app/items/${ row.id }`);
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