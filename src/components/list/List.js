import React from 'react'
import {API_URL} from '../Config'
import {handleResponse} from '../Helpers'
import Loading from '../common/Loading'
import Table from '../list/Table'
import Pagination from '../list/Pagination'

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            currencies: [],
            page: 1,
            totalPages: 0,
            error: null
        };

        this.handlePaginationClick = this.handlePaginationClick.bind(this)
    };

    componentDidMount() {
        this.fetchCurrencies()
    };

    fetchCurrencies() {
        const {page} = this.state;
        this.setState( {loading: true} )
        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
            .then(handleResponse)
            .then(data => {
                const {currencies, totalPages} = data;
                return this.setState({
                    currencies, 
                    loading: false, 
                    totalPages
                })
            })
            .catch(error => this.setState({
                error: error.errorMessage, 
                loading: false
            }))
    };

    handlePaginationClick(direction) {
        let nextPage = this.state.page;
        nextPage = (direction === 'next') ? nextPage + 1 : nextPage - 1;
        this.setState( {page: nextPage}, this.fetchCurrencies )
    };

    render() {
        const {loading, currencies, page, totalPages, error} = this.state;

        if (loading) {
            return (
                <div className='loading-container'>
                    <Loading />
                </div>
            )
        };

        if (error) {
            return (
                <div className='error'>
                    {error}
                </div>
            )
        };

        return (
            <div>
                <Table currencies={currencies} />
                <Pagination 
                    page={page} 
                    handlePaginationClick={this.handlePaginationClick} 
                    totalPages={totalPages} 
                />
            </div>
        )
    }
}

export default List