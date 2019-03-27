import React from 'react'
import {API_URL} from '../Config'
import {handleResponse} from '../Helpers'
import {withRouter} from 'react-router-dom'
import Loading from './Loading'
import './Search.css'

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            searchResults: [],
            searchQuery: '',
            loading: false
        };

        this.handleChange = this.handleChange.bind(this)
    };

    handleChange(event) {
        const searchQuery = event.target.value;
        this.setState( {searchQuery} )
        if (!searchQuery) {
            return ''
        }
        this.setState( {loading: true} )
        fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
            .then(handleResponse)
            .then(data => {
                this.setState( {searchResults: data, loading: false} )
            })
    };
    
    renderSearchResults() {
        const {searchQuery, searchResults, loading} = this.state;
        
        if (!searchQuery) {
            return ''
        };

        if (searchResults.length > 0) {
            return (
                <div className='Search-result-container'>
                    {searchResults.map(result => (
                        <div className='Search-result' key={result.id}>
                            {result.name} ({result.symbol})
                        </div>
                    ))}
                </div>
            )
        };

        if (!loading) {
            return (
                <div className='Search-result-container'>
                    <div className='Search-result'>No Results Found</div>
                </div>
            )
        }
    };

    render() {
        const {loading} = this.state;
        return (
            <div className='Search'>
                <span className='Search-icon' />
                <input 
                    className='Search-input' 
                    type='text' 
                    placeholder='Currency Name' 
                    onChange={this.handleChange} 
                />
                {loading && <div className='Search-loading'><Loading height='12px' width='12px' /></div>}
                {this.renderSearchResults()}
            </div>
        )
    }
}

export default withRouter(Search)